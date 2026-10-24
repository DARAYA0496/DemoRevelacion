-- ============================================================================
-- ESQUEMA POSTGRESQL PURO PARA NEONDB (Serverless Postgres)
-- Proyecto: Invitación Revelación de Género (¿Osito o Osita?)
-- Compatible 100% con el SQL Editor de Neon (console.neon.tech)
-- ============================================================================

-- 1. Extensión para generación de UUIDs (habilitada en Postgres 13+ / NeonDB)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tipos ENUM personalizados para garantizar integridad de datos
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
        CREATE TYPE attendance_status AS ENUM ('yes', 'no');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'team_gender') THEN
        CREATE TYPE team_gender AS ENUM ('boy', 'girl');
    END IF;
END$$;

-- 3. Tabla Principal: Confirmaciones de Asistencia (RSVP)
CREATE TABLE IF NOT EXISTS rsvp_confirmations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guest_name VARCHAR(120) NOT NULL CHECK (char_length(trim(guest_name)) >= 2),
    phone VARCHAR(30) DEFAULT '',
    attending attendance_status NOT NULL DEFAULT 'yes',
    guests_count SMALLINT NOT NULL DEFAULT 1 CHECK (guests_count >= 0 AND guests_count <= 20),
    team_vote team_gender NOT NULL,
    dietary_or_notes TEXT DEFAULT '',
    message_for_baby TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para acelerar consultas del muro de deseos y conteos por equipo
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_confirmations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_team_vote ON rsvp_confirmations (team_vote);
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp_confirmations (attending);

-- 4. Tabla Secundaria: Votos Rápidos en la sección "¿Team Osito o Team Osita?"
CREATE TABLE IF NOT EXISTS quick_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team team_gender NOT NULL,
    voter_fingerprint VARCHAR(64) UNIQUE DEFAULT NULL, -- Garantiza 1 voto por dispositivo
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_quick_votes_team ON quick_votes (team);

-- 5. Vista de Estadísticas en Tiempo Real (Sin duplicados: 1 persona = 1 voto)
CREATE OR REPLACE VIEW v_event_dashboard AS
WITH rsvp_stats AS (
    SELECT
        COUNT(*) FILTER (WHERE attending = 'yes') AS families_attending,
        COALESCE(SUM(guests_count) FILTER (WHERE attending = 'yes'), 0) AS total_guests_confirmed,
        COUNT(*) FILTER (WHERE attending = 'no') AS families_declined,
        COUNT(*) FILTER (WHERE team_vote = 'boy') AS rsvp_boy_votes,
        COUNT(*) FILTER (WHERE team_vote = 'girl') AS rsvp_girl_votes
    FROM rsvp_confirmations
),
poll_stats AS (
    SELECT
        COUNT(*) FILTER (WHERE team = 'boy') AS quick_boy_votes,
        COUNT(*) FILTER (WHERE team = 'girl') AS quick_girl_votes
    FROM quick_votes
)
SELECT
    r.families_attending::INT AS families_attending,
    r.total_guests_confirmed::INT AS total_guests_confirmed,
    r.families_declined::INT AS families_declined,
    (r.rsvp_boy_votes + p.quick_boy_votes)::INT AS total_boy_votes,
    (r.rsvp_girl_votes + p.quick_girl_votes)::INT AS total_girl_votes,
    CASE
        WHEN (r.rsvp_boy_votes + p.quick_boy_votes + r.rsvp_girl_votes + p.quick_girl_votes) = 0 THEN 50
        ELSE ROUND(
            ((r.rsvp_boy_votes + p.quick_boy_votes)::NUMERIC /
            NULLIF(r.rsvp_boy_votes + p.quick_boy_votes + r.rsvp_girl_votes + p.quick_girl_votes, 0)::NUMERIC) * 100
        )::INT
    END AS boy_percentage,
    CASE
        WHEN (r.rsvp_boy_votes + p.quick_boy_votes + r.rsvp_girl_votes + p.quick_girl_votes) = 0 THEN 50
        ELSE ROUND(
            ((r.rsvp_girl_votes + p.quick_girl_votes)::NUMERIC /
            NULLIF(r.rsvp_boy_votes + p.quick_boy_votes + r.rsvp_girl_votes + p.quick_girl_votes, 0)::NUMERIC) * 100
        )::INT
    END AS girl_percentage
FROM rsvp_stats r
CROSS JOIN poll_stats p;
