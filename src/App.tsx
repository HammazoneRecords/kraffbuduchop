import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Youtube, ChevronDown, ShoppingBag } from 'lucide-react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

const C = {
  void:    '#080808',
  pit:     '#0F0F0F',
  card:    '#161616',
  wire:    '#1E1E1E',
  fire:    '#E8501A',
  fireL:   '#FF6B35',
  fireDim: 'rgba(232,80,26,0.09)',
  ash:     '#EAE2D8',
  muted:   'rgba(234,226,216,0.50)',
  dim:     'rgba(234,226,216,0.22)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

const TRACKS = [
  { id: 1, title: 'Sinna',           duration: '2:58', videoId: '4I6ryGEFcpw', note: '19M VIEWS' },
  { id: 2, title: 'SleepWalk',       duration: '2:44', videoId: '81T0NMvtJhE', note: '' },
  { id: 3, title: 'Dinero',          duration: '3:02', videoId: 'u-17ZM-lRIo', note: '' },
  { id: 4, title: 'CalmC',           duration: '2:51', videoId: 'nHDkZk56p94', note: '' },
  { id: 5, title: 'OG Bobby Johnson',duration: '2:39', videoId: 'TEMlcy5_z-U', note: '' },
  { id: 6, title: 'Rum Behavior',    duration: '3:10', videoId: 'hub8Q45jjmU', note: '' },
];

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { label: 'Music',    path: '/'          },
    { label: 'BuduChop', path: '/buduchop'  },
    { label: 'Merch',    path: '/merch'      },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${C.wire}`,
      height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
    }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 3, color: C.ash }}>KRAFF</span>
        <span style={{ fontFamily: FF.display, fontSize: 11, letterSpacing: 5, color: C.fire }}>BUDUCHOP</span>
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {links.map(l => (
          <button key={l.path} onClick={() => navigate(l.path)}
            style={{
              fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase',
              padding: '6px 16px', background: pathname === l.path ? C.fireDim : 'transparent',
              color: pathname === l.path ? C.fire : C.dim,
              border: `1px solid ${pathname === l.path ? 'rgba(232,80,26,0.3)' : 'transparent'}`,
              cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (pathname !== l.path) (e.currentTarget as HTMLButtonElement).style.color = C.ash; }}
            onMouseLeave={e => { if (pathname !== l.path) (e.currentTarget as HTMLButtonElement).style.color = C.dim; }}>
            {l.label}
          </button>
        ))}
        <div style={{ width: 1, height: 16, background: C.wire, margin: '0 8px' }} />
        {[{ href: 'https://www.instagram.com/kraff_1buduchop/', icon: <Instagram size={15} /> }, { href: 'https://www.youtube.com/@KraffGad', icon: <Youtube size={15} /> }].map(s => (
          <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
            style={{ color: C.dim, padding: '0 6px', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.fire)}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
            {s.icon}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Main music player page ──────────────────────────────────────────── */
function MusicPage() {
  const [active, setActive] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const t = TRACKS[active];

  return (
    <div style={{ position: 'fixed', inset: 0, top: 52, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.void }}>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LEFT — YouTube player */}
        <div style={{ flex: '0 0 62%', position: 'relative', background: '#000' }}>
          <iframe key={t.videoId}
            src={`https://www.youtube.com/embed/${t.videoId}?rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 28px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', pointerEvents: 'none' }}>
            <p style={{ fontFamily: FF.display, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: 3, color: '#fff', lineHeight: 1 }}>{t.title}</p>
            {t.note && <p style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 4, color: C.fire, marginTop: 6 }}>{t.note}</p>}
          </div>
        </div>

        {/* RIGHT — track list */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${C.wire}`, overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {TRACKS.map((tr, i) => {
              const isActive = i === active;
              return (
                <button key={tr.id} onClick={() => setActive(i)}
                  style={{
                    display: 'grid', gridTemplateColumns: '56px 1fr auto', alignItems: 'center',
                    width: '100%', padding: '0 20px 0 0', height: 72,
                    background: isActive ? 'rgba(232,80,26,0.10)' : 'transparent',
                    borderBottom: `1px solid ${C.wire}`,
                    borderLeft: isActive ? `4px solid ${C.fire}` : '4px solid transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
                  <span style={{ fontFamily: FF.display, fontSize: 32, letterSpacing: 1, color: isActive ? C.fire : C.wire, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', borderRight: `1px solid ${C.wire}`, marginRight: 16, transition: 'color 0.15s' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontFamily: FF.ui, fontSize: 15, fontWeight: 700, letterSpacing: 1, color: isActive ? C.ash : C.muted, transition: 'color 0.15s' }}>{tr.title.toUpperCase()}</span>
                    {tr.note && <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, color: C.fire }}>{tr.note}</span>}
                  </span>
                  <span style={{ fontFamily: FF.body, fontSize: 12, color: C.dim }}>{tr.duration}</span>
                </button>
              );
            })}
          </div>

          {/* Info drawer */}
          <div style={{ borderTop: `1px solid ${C.wire}`, flexShrink: 0 }}>
            <button onClick={() => setInfoOpen(o => !o)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>Artist Info</span>
              <ChevronDown size={14} style={{ color: C.dim, transform: infoOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </button>
            {infoOpen && (
              <div style={{ padding: '0 20px 20px' }}>
                <p style={{ fontFamily: FF.body, fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
                  Kraff (Tevin Randall) — trap-dancehall from St. Ann. "Sinna" hit 19M views. "BuduChop" is his sound, his fanbase, and his brand. Signed to 10K Projects.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[{ n: '667K', l: 'YouTube' }, { n: '251K', l: 'Instagram' }, { n: '453M+', l: 'Total Views' }, { n: 'St. Ann', l: 'Jamaica' }].map(s => (
                    <div key={s.l} style={{ padding: '10px 12px', background: C.pit, borderLeft: `2px solid ${C.fire}` }}>
                      <p style={{ fontFamily: FF.display, fontSize: 18, letterSpacing: 1, color: C.fire, lineHeight: 1 }}>{s.n}</p>
                      <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginTop: 2 }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderTop: `1px solid ${C.wire}`, background: C.pit }}>
        <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: C.dim }}>kraffbuduchop.com</span>
        <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>© 2025 Kraff · </span>
      </div>
      
      <WorkingDraftBanner artist="Kraff" />
    </div>
  );
}

/* ─── BuduChop brand extension — kitchen knives & machetes ───────────── */
const BUDU_BLADES = [
  {
    name: 'The BuduChop Chef Knife',
    sub: '8" high-carbon blade. Full tang. Pakkawood handle.',
    tag: 'Signature',
    price: 'TBA',
  },
  {
    name: 'The Sinna Cutlass',
    sub: '18" machete. Kraff signature etched on the flat. Leather sheath.',
    tag: '19M Edition',
    price: 'TBA',
  },
  {
    name: 'The BuduChop Cleaver',
    sub: 'Heavy 7" kitchen cleaver. Through bone. Through anything.',
    tag: 'Limited',
    price: 'TBA',
  },
  {
    name: 'The BuduChop Knife Set',
    sub: '5-piece set. Chef knife, bread knife, santoku, paring knife, cleaver. Magnetic block included.',
    tag: 'Full Set',
    price: 'TBA',
  },
];

function BuduChopPage() {
  return (
    <div style={{ background: '#0A0806', color: C.ash, minHeight: '100vh', paddingTop: 52, overflowX: 'hidden' }}>

      {/* Hero */}
      <section style={{ minHeight: 'calc(85vh - 52px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '80px 48px 60px', position: 'relative', overflow: 'hidden', borderBottom: `3px solid ${C.fire}`, background: 'linear-gradient(160deg, #0A0806 60%, #140E08 100%)' }}>
        {/* CHOP watermark */}
        <div style={{ position: 'absolute', bottom: 0, right: -20, fontFamily: FF.display, fontSize: 'clamp(160px,32vw,360px)', color: 'rgba(232,80,26,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: -4 }}>
          CHOP
        </div>
        {/* Left edge accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: `linear-gradient(to bottom, ${C.fire}, transparent)` }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', color: C.fire, marginBottom: 20 }}>By Kraff · St. Ann, Jamaica</p>
          <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(72px,14vw,160px)', lineHeight: 0.85, letterSpacing: 4, color: C.ash, marginBottom: 24 }}>
            BUDU<br />CHOP
          </h1>
          <div style={{ width: 48, height: 3, background: C.fire, marginBottom: 24 }} />
          <p style={{ fontFamily: FF.body, fontSize: 17, color: C.muted, maxWidth: 520, lineHeight: 1.8, marginBottom: 16 }}>
            Kitchen knives. Cutlass machetes. The "chop" in BuduChop was never just a word.
          </p>
          <p style={{ fontFamily: FF.body, fontSize: 15, color: C.dim, maxWidth: 480, lineHeight: 1.7 }}>
            Forged for the kitchen. Built for the yard. Jamaican steel with a BuduChop signature — each blade designed by Kraff, numbered, and released in limited drops.
          </p>
        </div>
      </section>

      {/* 3 Products */}
      <section style={{ padding: '64px 48px', background: C.pit }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.fire, marginBottom: 6 }}>The Blades</p>
              <h2 style={{ fontFamily: FF.display, fontSize: 52, letterSpacing: 3, color: C.ash, lineHeight: 1 }}>THE COLLECTION</h2>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(232,80,26,0.25)`, padding: '10px 20px' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.fire }} />
              <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>First Drop — Coming Soon</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
            {BUDU_BLADES.map((blade, i) => (
              <div key={i} style={{ background: '#111', border: `1px solid ${C.wire}`, overflow: 'hidden' }}>
                {/* Product image area */}
                <div style={{ aspectRatio: '4/3', background: `linear-gradient(135deg, #0E0A06 0%, #1A1208 100%)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  {/* Blade silhouette — pure CSS */}
                  <div style={{ position: 'relative', width: 180, height: 24 }}>
                    <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '75%', height: '100%', background: 'linear-gradient(to right, #444, #888, #CCC, #888)', clipPath: 'polygon(0 50%, 98% 0, 100% 50%, 98% 100%)', opacity: 0.6 }} />
                    <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '30%', height: '60%', background: '#5A3A1A', borderRadius: 2, opacity: 0.7 }} />
                  </div>
                  <div style={{ position: 'absolute', top: 12, left: 12, background: C.fire, padding: '3px 10px' }}>
                    <span style={{ fontFamily: FF.ui, fontSize: 8, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#fff' }}>{blade.tag}</span>
                  </div>
                  <span style={{ position: 'absolute', bottom: 10, fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,80,26,0.4)' }}>Coming Soon</span>
                </div>
                {/* Details */}
                <div style={{ padding: '18px 20px', borderTop: `2px solid ${C.fire}` }}>
                  <p style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 1, color: C.ash, marginBottom: 8, lineHeight: 1.1 }}>{blade.name.toUpperCase()}</p>
                  <p style={{ fontFamily: FF.body, fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>{blade.sub}</p>
                  <p style={{ fontFamily: FF.ui, fontSize: 12, letterSpacing: 2, color: C.fire }}>Price {blade.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 48px 100px', borderTop: `3px solid ${C.fire}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ fontFamily: FF.display, fontSize: 24, letterSpacing: 4, color: C.ash, marginBottom: 2 }}>BUDU CHOP</p>
          <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.dim }}>A Kraff Brand · kraffbuduchop.com/buduchop</p>
        </div>
        <p style={{ fontFamily: FF.body, fontSize: 11, color: C.dim }}>© 2025 Kraff.</p>
      </footer>
      <WorkingDraftBanner artist="Kraff" />
    </div>
  );
}

/* ─── Merch page ──────────────────────────────────────────────────────── */
const MERCH_ITEMS = [
  { name: 'BuduChop OG Hoodie', type: 'Hoodie',   price: 'TBA', desc: 'Heavy 400gsm. BuduChop logo front, Kraff signature on sleeve.' },
  { name: 'Sinna Tee — Black',  type: 'T-Shirt',  price: 'TBA', desc: '"Sinna" graphic tee. 100% cotton. Oversized fit.' },
  { name: 'Kraff Dad Cap',      type: 'Headwear', price: 'TBA', desc: 'Embroidered KRAFF front. Adjustable strap. Structured crown.' },
];

function MerchPage() {
  return (
    <div style={{ background: C.void, color: C.ash, minHeight: '100vh', paddingTop: 52, overflowX: 'hidden' }}>
      <section style={{ padding: '64px 48px 40px', borderBottom: `1px solid ${C.wire}` }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.fire, marginBottom: 8 }}>Official Store</p>
        <h1 style={{ fontFamily: FF.display, fontSize: 72, letterSpacing: 3, color: C.ash, lineHeight: 1, marginBottom: 16 }}>MERCH</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(232,80,26,0.25)`, padding: '8px 18px' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.fire }} />
          <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.fire }}>Store Coming Soon</span>
        </div>
      </section>

      <section style={{ padding: '48px', background: C.pit }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3 }}>
          {MERCH_ITEMS.map((item, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.wire}`, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <ShoppingBag size={40} style={{ color: C.fire, opacity: 0.09 }} />
                <span style={{ position: 'absolute', bottom: 12, fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(232,80,26,0.35)' }}>Photo Coming</span>
              </div>
              <div style={{ padding: '16px 18px', borderTop: `2px solid ${C.fire}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: C.dim, marginBottom: 4 }}>{item.type}</p>
                <p style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 1, color: C.ash, marginBottom: 8, lineHeight: 1 }}>{item.name.toUpperCase()}</p>
                <p style={{ fontFamily: FF.body, fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                <p style={{ fontFamily: FF.ui, fontSize: 12, letterSpacing: 2, color: C.fire }}>Price {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '40px 48px 100px', borderTop: `1px solid ${C.wire}` }}>
        <p style={{ fontFamily: FF.body, fontSize: 11, color: C.dim }}>© 2025 Kraff.</p>
      </footer>
      <WorkingDraftBanner artist="Kraff" />
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */


export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"          element={<MusicPage />} />
        <Route path="/buduchop"  element={<BuduChopPage />} />
        <Route path="/merch"     element={<MerchPage />} />
      </Routes>
    </BrowserRouter>
  );
}
