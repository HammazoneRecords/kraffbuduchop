import { useState, useEffect } from 'react';
import { Menu, X, Play, Instagram, Youtube, ExternalLink } from 'lucide-react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

/* ─── Palette ─────────────────────────────────────────────────────────── */
const C = {
  void:    '#080808',
  pit:     '#0F0F0F',
  card:    '#161616',
  wire:    '#272727',
  fire:    '#E8501A',
  fireL:   '#FF6B35',
  fireDim: 'rgba(232,80,26,0.09)',
  ash:     '#EAE2D8',
  muted:   'rgba(234,226,216,0.52)',
  dim:     'rgba(234,226,216,0.24)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

/* ─── Data ────────────────────────────────────────────────────────────── */
const TRACKS = [
  { id: 1, title: 'Sinna',           duration: '2:58', videoId: '4I6ryGEFcpw', views: '19M views' },
  { id: 2, title: 'SleepWalk',       duration: '2:44', videoId: '81T0NMvtJhE', views: '' },
  { id: 3, title: 'Dinero',          duration: '3:02', videoId: 'u-17ZM-lRIo', views: '' },
  { id: 4, title: 'CalmC',           duration: '2:51', videoId: 'nHDkZk56p94', views: '' },
  { id: 5, title: 'OG Bobby Johnson',duration: '2:39', videoId: 'TEMlcy5_z-U', views: '' },
  { id: 6, title: 'Rum Behavior',    duration: '3:10', videoId: 'hub8Q45jjmU', views: '' },
];

const NAV_LINKS = ['Music', 'Videos', 'About', 'Merch'];

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 40);
    el.addEventListener('scroll', h, { passive: true });
    return () => el.removeEventListener('scroll', h);
  }, []);

  const go = (id: string) => { onNav(id); setOpen(false); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(8,8,8,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s',
      borderBottom: scrolled ? `1px solid ${C.wire}` : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => go('hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 2, color: C.ash }}>KRAFF</span>
          <span style={{ fontFamily: FF.display, fontSize: 14, letterSpacing: 3, color: C.fire, marginTop: 4 }}>BUDUCHOP</span>
        </button>

        <div className="hidden md:flex" style={{ gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ fontFamily: FF.ui, fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: C.muted, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.fire)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.ash }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: C.pit, borderTop: `1px solid ${C.wire}`, padding: '16px 24px 24px' }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: FF.display, fontSize: 30, letterSpacing: 2, color: C.ash, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderBottom: `1px solid ${C.wire}` }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────── */
function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', padding: '120px 24px 80px', overflow: 'hidden' }}>
      {/* Fire orb */}
      <div style={{ position: 'absolute', top: '30%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,80,26,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,80,26,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 900 }}>
        {/* Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 28, height: 2, background: C.fire }} />
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.fire }}>St. Ann, Jamaica · BuduChop</span>
        </div>

        {/* Name block */}
        <div style={{ marginBottom: 8 }}>
          <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(88px, 20vw, 210px)', lineHeight: 0.82, letterSpacing: 4, color: C.ash }}>
            KRAFF
          </h1>
        </div>
        <p style={{ fontFamily: FF.display, fontSize: 'clamp(22px, 5vw, 52px)', letterSpacing: 8, color: C.fire, marginBottom: 32 }}>
          BUDU CHOP
        </p>

        {/* Views badge — Sinna */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: C.fireDim, border: `1px solid rgba(232,80,26,0.22)`, padding: '8px 18px', marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.fire }} />
          <span style={{ fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.fire }}>Sinna — 19M Views</span>
        </div>

        <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, maxWidth: 480, lineHeight: 1.8, marginBottom: 40 }}>
          Trap-dancehall from the North Coast. St. Ann's rising force — 667K YouTube subscribers and still climbing.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 48 }}>
          <button onClick={() => onNav('music')} style={{
            fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
            background: C.fire, color: '#fff', border: 'none', padding: '14px 36px', cursor: 'pointer', transition: 'opacity 0.2s',
          }} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Stream Now
          </button>
          <button onClick={() => onNav('videos')} style={{
            fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
            background: 'transparent', color: C.ash, border: `1px solid ${C.wire}`, padding: '14px 36px', cursor: 'pointer', transition: 'border-color 0.2s',
          }} onMouseEnter={e => (e.currentTarget.style.borderColor = C.fire)} onMouseLeave={e => (e.currentTarget.style.borderColor = C.wire)}>
            Watch Videos
          </button>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { href: 'https://www.instagram.com/kraff_1buduchop/', icon: <Instagram size={20} /> },
            { href: 'https://www.youtube.com/@KraffGad', icon: <Youtube size={20} /> },
          ].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ color: C.dim, transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.fire)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Stats strip — bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.wire}`, padding: '16px 24px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        {[{ n: '667K', l: 'YouTube' }, { n: '251K', l: 'Instagram' }, { n: '19M', l: 'Sinna Views' }, { n: 'St. Ann', l: 'Jamaica' }].map(s => (
          <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 2, color: C.fire }}>{s.n}</span>
            <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Music ───────────────────────────────────────────────────────────── */
function MusicSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="music" style={{ padding: '100px 24px', background: C.pit, borderTop: `3px solid ${C.fire}` }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>Tracks</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 3, color: C.ash, marginTop: 6, lineHeight: 1 }}>MUSIC</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {TRACKS.map((t, i) => (
            <button key={t.id} onClick={() => setActiveVideo(activeVideo === t.videoId ? null : t.videoId)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
                background: activeVideo === t.videoId ? C.fireDim : 'transparent',
                border: `1px solid ${activeVideo === t.videoId ? 'rgba(232,80,26,0.25)' : 'transparent'}`,
                borderLeft: activeVideo === t.videoId ? `3px solid ${C.fire}` : '3px solid transparent',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%',
              }}
              onMouseEnter={e => { if (activeVideo !== t.videoId) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; } }}
              onMouseLeave={e => { if (activeVideo !== t.videoId) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; } }}>
              <span style={{ fontFamily: FF.ui, fontSize: 12, color: activeVideo === t.videoId ? C.fire : C.dim, width: 22, flexShrink: 0 }}>
                {activeVideo === t.videoId ? <Play size={14} fill={C.fire} color={C.fire} /> : String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ flex: 1, fontFamily: FF.ui, fontSize: 17, fontWeight: 600, letterSpacing: 0.5, color: activeVideo === t.videoId ? C.fire : C.ash }}>{t.title}</span>
              {t.views && <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 1, color: C.fire, marginRight: 8 }}>{t.views}</span>}
              <span style={{ fontFamily: FF.body, fontSize: 12, color: C.dim, flexShrink: 0 }}>{t.duration}</span>
            </button>
          ))}
        </div>

        {activeVideo && (
          <div style={{ marginTop: 12, position: 'relative', paddingBottom: '56.25%', background: C.void, border: `1px solid ${C.wire}` }}>
            <iframe key={activeVideo}
              src={`https://www.youtube.com/embed/${activeVideo}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Videos ──────────────────────────────────────────────────────────── */
function VideosSection() {
  return (
    <section id="videos" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>Watch</span>
            <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 3, color: C.ash, marginTop: 6, lineHeight: 1 }}>VIDEOS</h2>
          </div>
          <a href="https://www.youtube.com/@KraffGad" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: C.fire, textDecoration: 'none', borderBottom: `1px solid ${C.fire}`, paddingBottom: 2 }}>
            <Youtube size={14} /> Full Channel
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {TRACKS.slice(0, 4).map(t => (
            <div key={t.id} style={{ background: C.card, overflow: 'hidden' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                <iframe src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
              </div>
              <div style={{ padding: '12px 16px', borderLeft: `3px solid ${C.fire}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: C.ash }}>{t.title}</p>
                {t.views && <p style={{ fontFamily: FF.body, fontSize: 11, color: C.fire, marginTop: 2 }}>{t.views}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ───────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: C.pit }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>The Artist</span>
          <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 3, color: C.ash, marginTop: 6, lineHeight: 1 }}>ABOUT</h2>
        </div>

        <div style={{ display: 'grid', gap: 40 }}>
          <div>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>
              <strong style={{ color: C.ash }}>Kraff</strong> (Tevin Randall) emerged from St. Ann Parish on Jamaica's North Coast — a region carving its own identity in dancehall. His sound blends the trap energy of the digital era with the rhythmic weight of classic dancehall, producing a style he calls <strong style={{ color: C.fire }}>BuduChop</strong>.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.85, marginBottom: 20 }}>
              "Sinna" became the landmark — 19 million views and a signal that the North Coast had arrived. Signed to <strong style={{ color: C.ash }}>10K Projects</strong>, Kraff has collaborated with Skeng, Valiant, and SVM while building a fanbase — the <strong style={{ color: C.fire }}>Budu Dem</strong> — that follows the sound wherever it goes.
            </p>
            <p style={{ fontFamily: FF.body, fontSize: 16, color: C.muted, lineHeight: 1.85 }}>
              667K YouTube subscribers. 453M+ total views. Still rising.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Real Name', value: 'Tevin Randall' },
              { label: 'Label', value: '10K Projects' },
              { label: 'From', value: 'St. Ann, Jamaica' },
              { label: 'Genre', value: 'Trap-Dancehall' },
              { label: 'YouTube', value: '667K Subscribers' },
              { label: 'Instagram', value: '251K Followers' },
            ].map(s => (
              <div key={s.label} style={{ padding: '14px 18px', background: C.card, borderLeft: `3px solid ${C.fire}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 3 }}>{s.label}</p>
                <p style={{ fontFamily: FF.ui, fontSize: 15, fontWeight: 600, letterSpacing: 0.5, color: C.ash }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Merch ───────────────────────────────────────────────────────────── */
function MerchSection() {
  return (
    <section id="merch" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>BuduChop Store</span>
        <h2 style={{ fontFamily: FF.display, fontSize: 'clamp(48px,8vw,80px)', letterSpacing: 3, color: C.ash, marginTop: 6, lineHeight: 1, marginBottom: 24 }}>MERCH</h2>
        <p style={{ fontFamily: FF.body, fontSize: 15, color: C.muted, marginBottom: 40 }}>Official BuduChop merchandise coming soon.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: `1px solid rgba(232,80,26,0.25)`, padding: '14px 32px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.fire }} />
          <span style={{ fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>Coming Soon</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding: '56px 24px 100px', borderTop: `3px solid ${C.fire}`, background: C.pit, textAlign: 'center' }}>
      <p style={{ fontFamily: FF.display, fontSize: 30, letterSpacing: 4, color: C.ash, marginBottom: 2 }}>KRAFF</p>
      <p style={{ fontFamily: FF.display, fontSize: 16, letterSpacing: 6, color: C.fire, marginBottom: 22 }}>BUDU CHOP</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 28 }}>
        {[
          { href: 'https://www.instagram.com/kraff_1buduchop/', icon: <Instagram size={18} /> },
          { href: 'https://www.youtube.com/@KraffGad', icon: <Youtube size={18} /> },
        ].map(s => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: C.dim, transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.fire)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
            {s.icon}
          </a>
        ))}
      </div>
      <a href="https://www.youtube.com/@KraffGad" target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FF.ui, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: C.fire, textDecoration: 'none', marginBottom: 28 }}>
        <ExternalLink size={12} /> Watch on YouTube
      </a>
      <p style={{ fontFamily: FF.body, fontSize: 11, color: C.dim }}>
        © 2025 Kraff. All rights reserved. Built by{' '}
        <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer" style={{ color: C.fire, textDecoration: 'none' }}>MindWave JA</a>.
      </p>
    </footer>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="scroll-root" style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 40 }}>
      <Nav onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <MusicSection />
      <VideosSection />
      <AboutSection />
      <MerchSection />
      <Footer />
      <WorkingDraftBanner artist="Kraff" />
    </div>
  );
}
