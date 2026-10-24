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
      const rows = await sql`
        SELECT
          id,
          guest_name AS "guestName",
          phone,
          attending,
          guests_count AS "guestsCount",
          team_vote AS "teamVote",
          dietary_or_notes AS "dietaryOrNotes",
          message_for_baby AS "messageForBaby",
          created_at AS "createdAt"
        FROM rsvp_confirmations
        ORDER BY created_at DESC
        LIMIT 50;
      `;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        guestName,
        phone = '',
        attending = 'yes',
        guestsCount = 1,
        teamVote,
        dietaryOrNotes = '',
        messageForBaby = '',
        fingerprint = null,
      } = body;

      if (!guestName || !teamVote) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (nombre y voto).' });
      }

      const [inserted] = await sql`
        INSERT INTO rsvp_confirmations (
          guest_name,
          phone,
          attending,
          guests_count,
          team_vote,
          dietary_or_notes,
          message_for_baby
        ) VALUES (
          ${guestName.trim()},
          ${phone.trim()},
          ${attending},
          ${attending === 'yes' ? Number(guestsCount) : 0},
          ${teamVote},
          ${dietaryOrNotes.trim()},
          ${messageForBaby.trim()}
        )
        RETURNING
          id,
          guest_name AS "guestName",
          phone,
          attending,
          guests_count AS "guestsCount",
          team_vote AS "teamVote",
          dietary_or_notes AS "dietaryOrNotes",
          message_for_baby AS "messageForBaby",
          created_at AS "createdAt";
      `;

      // Si el usuario tenía un voto preliminar en quick_votes, lo eliminamos
      // para evitar duplicar el voto (1 en la encuesta + 1 en el formulario)
      if (fingerprint) {
        await sql`
          DELETE FROM quick_votes WHERE voter_fingerprint = ${fingerprint};
        `;
      }

      return res.status(201).json(inserted);
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error: any) {
    console.error('Error en /api/rsvp:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
