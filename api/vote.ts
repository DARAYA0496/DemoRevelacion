import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({
      error: 'DATABASE_URL no está configurada en las variables de entorno.',
    });
  }

  const sql = neon(databaseUrl);

  const sanitizeStats = (stats: any) => {
    const boyVotes = Number(stats?.totalBoyVotes || 0);
    const girlVotes = Number(stats?.totalGirlVotes || 0);
    const total = boyVotes + girlVotes;
    const boyPercent = total > 0 ? Math.round((boyVotes / total) * 100) : 50;
    const girlPercent = total > 0 ? 100 - boyPercent : 50;

    return {
      familiesAttending: Number(stats?.familiesAttending || 0),
      totalGuestsConfirmed: Number(stats?.totalGuestsConfirmed || 0),
      familiesDeclined: Number(stats?.familiesDeclined || 0),
      totalBoyVotes: boyVotes,
      totalGirlVotes: girlVotes,
      boyPercentage: boyPercent,
      girlPercentage: girlPercent,
    };
  };

  try {
    if (req.method === 'GET') {
      const [stats] = await sql`
        SELECT
          families_attending AS "familiesAttending",
          total_guests_confirmed AS "totalGuestsConfirmed",
          families_declined AS "familiesDeclined",
          total_boy_votes AS "totalBoyVotes",
          total_girl_votes AS "totalGirlVotes",
          boy_percentage AS "boyPercentage",
          girl_percentage AS "girlPercentage"
        FROM v_event_dashboard;
      `;
      return res.status(200).json(sanitizeStats(stats));
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { team, fingerprint = null } = body;

      if (!team || (team !== 'boy' && team !== 'girl')) {
        return res.status(400).json({ error: 'Equipo inválido. Debe ser "boy" o "girl".' });
      }

      if (fingerprint) {
        // Si el usuario ya votó con este dispositivo, actualizamos su voto para no duplicar
        const existing = await sql`
          SELECT id FROM quick_votes WHERE voter_fingerprint = ${fingerprint} LIMIT 1;
        `;
        if (existing.length > 0) {
          await sql`
            UPDATE quick_votes
            SET team = ${team}, created_at = CURRENT_TIMESTAMP
            WHERE voter_fingerprint = ${fingerprint};
          `;
        } else {
          await sql`
            INSERT INTO quick_votes (team, voter_fingerprint)
            VALUES (${team}, ${fingerprint});
          `;
        }
      } else {
        await sql`
          INSERT INTO quick_votes (team, voter_fingerprint)
          VALUES (${team}, NULL);
        `;
      }

      const [updatedStats] = await sql`
        SELECT
          total_boy_votes AS "totalBoyVotes",
          total_girl_votes AS "totalGirlVotes",
          boy_percentage AS "boyPercentage",
          girl_percentage AS "girlPercentage"
        FROM v_event_dashboard;
      `;

      return res.status(200).json(sanitizeStats(updatedStats));
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error: any) {
    console.error('Error en /api/vote:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
