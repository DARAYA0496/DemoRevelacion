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

  try {
    if (req.method === 'GET') {
      // Obtener el conteo acumulado y estadísticas
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
      return res.status(200).json(
        stats || {
          totalBoyVotes: 0,
          totalGirlVotes: 0,
          boyPercentage: 50,
          girlPercentage: 50,
        }
      );
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { team, fingerprint = null } = body;

      if (!team || (team !== 'boy' && team !== 'girl')) {
        return res.status(400).json({ error: 'Equipo inválido. Debe ser "boy" o "girl".' });
      }

      await sql`
        INSERT INTO quick_votes (team, voter_fingerprint)
        VALUES (${team}, ${fingerprint});
      `;

      // Retornar las estadísticas actualizadas tras el voto
      const [updatedStats] = await sql`
        SELECT
          total_boy_votes AS "totalBoyVotes",
          total_girl_votes AS "totalGirlVotes",
          boy_percentage AS "boyPercentage",
          girl_percentage AS "girlPercentage"
        FROM v_event_dashboard;
      `;

      return res.status(200).json(updatedStats);
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error: any) {
    console.error('Error en /api/vote:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
