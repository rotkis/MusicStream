import React from 'react';
import { usePlayer } from '../contexts/PlayerContext';

export default function FilaReproducao() {
  const { queue, currentMusic, play } = usePlayer();

  // Músicas que vêm DEPOIS da atual na fila
  const currentIndex = queue.findIndex((m) => m.id === currentMusic?.id);
  const proximas = currentIndex >= 0 ? queue.slice(currentIndex + 1) : [];

  if (!currentMusic || proximas.length === 0) return null;

  const formatDuration = (secs) => {
    if (!secs) return '';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>⏭</span>
        <span>Próximas músicas</span>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 500,
          color: 'var(--text-muted)',
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 99,
          padding: '2px 10px',
          marginLeft: 4,
        }}>
          {proximas.length} na fila
        </span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {proximas.slice(0, 10).map((m, i) => (
          <div
            key={`${m.id}-${i}`}
            onClick={() => play(m, queue.slice(queue.findIndex(q => q.id === m.id)))}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 14px',
              borderRadius: 10,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
              animation: `fadeIn 0.3s ease both`,
              animationDelay: `${i * 0.04}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200,241,53,0.06)';
              e.currentTarget.style.borderColor = 'rgba(200,241,53,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            {/* Número na fila */}
            <span style={{
              minWidth: 22,
              textAlign: 'center',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
            }}>
              {i + 1}
            </span>

            {/* Ícone */}
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1a2200, #2a3800)',
              border: '1px solid rgba(200,241,53,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              flexShrink: 0,
            }}>
              🎵
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: 'var(--text)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {m.title}
              </div>
              <div style={{
                fontSize: '0.77rem',
                color: 'var(--text-muted)',
                marginTop: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {m.artist}
              </div>
            </div>

            {/* Duração */}
            {m.durationSeconds && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                {formatDuration(m.durationSeconds)}
              </span>
            )}

            {/* Play icon on hover */}
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', flexShrink: 0, opacity: 0.7 }}>▶</span>
          </div>
        ))}

        {proximas.length > 10 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', marginTop: 8 }}>
            + {proximas.length - 10} músicas na fila
          </p>
        )}
      </div>
    </section>
  );
}
