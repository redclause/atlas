import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, Bookmark, Building2, Compass, Globe2, Layers3, MapPin, Search, Sparkles, Tag, Wrench, X } from 'lucide-react';
import { categories, getCategory, getRecord, journalEntries, records, typeLabel } from './data';
import { loadSaved, saveSaved } from './storage';
import './styles.css';

const categoryIcons = { companies: Building2, brands: Tag, tools: Wrench, places: MapPin, topics: Layers3, resources: Compass };
const quickSearches = ['AI', 'French brands', 'Design tools', 'Astronomy', 'Cities'];

function parseRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'entity' && parts[1]) return { page: 'entity', id: parts[1] };
  if (parts[0] === 'category' && parts[1]) return { page: 'category', id: parts[1] };
  if (parts[0] === 'saved') return { page: 'saved' };
  if (parts[0] === 'explore') return { page: 'explore' };
  return { page: 'home' };
}

function navigate(to) {
  window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function App() {
  const [route, setRoute] = useState(parseRoute);
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(loadSaved);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onPopState = () => setRoute(parseRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => saveSaved(saved), [saved]);

  useEffect(() => {
    const entity = route.page === 'entity' ? getRecord(route.id) : null;
    setSelected(entity);
    if (route.page === 'entity' && !entity) navigate('/explore');
  }, [route]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector('.searchbox input')?.focus();
      }
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function toggleSave(id) {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function openRecord(record) {
    setSelected(record);
    navigate(`/entity/${record.id}`);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((record) => !q || [record.name, record.meta, record.description, ...record.tags].join(' ').toLowerCase().includes(q));
  }, [query]);

  const category = route.page === 'category' ? getCategory(route.id) : null;
  const categoryResults = category ? filtered.filter((record) => record.type === category.id) : filtered;
  const savedRecords = records.filter((record) => saved.includes(record.id));

  return (
    <div className="app">
      <Header savedCount={saved.length} />
      <main id="top">
        {route.page === 'home' && <Home query={query} setQuery={setQuery} openRecord={openRecord} />}
        {route.page === 'explore' && <Explore query={query} setQuery={setQuery} results={categoryResults} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
        {route.page === 'category' && category && <CategoryPage category={category} results={categoryResults} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
        {route.page === 'saved' && <SavedPage records={savedRecords} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
      </main>
      {selected && <EntityModal record={selected} saved={saved} toggleSave={toggleSave} close={() => { setSelected(null); if (route.page === 'entity') navigate('/explore'); }} />}
      <footer><a className="logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}><span className="logo-mark">A</span><span>Atlas</span></a><p>Discover. Explore. Connect.</p><span>© 2026 Atlas</span></footer>
    </div>
  );
}

function Header({ savedCount }) {
  return <header className="nav">
    <a className="logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}><span className="logo-mark">A</span><span>Atlas</span></a>
    <nav><a href="/explore" onClick={(e) => { e.preventDefault(); navigate('/explore'); }}>Explore</a><a href="/#categories">Categories</a><a href="/#journal">Journal</a></nav>
    <button className="saved" onClick={() => navigate('/saved')}><Bookmark size={16}/> Saved <span>{savedCount}</span></button>
  </header>;
}

function Home({ query, setQuery, openRecord }) {
  return <>
    <section className="hero">
      <div className="eyebrow"><Globe2 size={15}/> A discovery platform for the curious</div>
      <h1>A map of everything<br/><em>worth discovering.</em></h1>
      <p className="hero-copy">Explore companies, brands, tools, places, topics and resources — connected so one discovery naturally leads to the next.</p>
      <SearchBox query={query} setQuery={setQuery} onSubmit={() => navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ''}`)} />
      <div className="quick"><span>Try:</span>{quickSearches.map((item) => <button key={item} onClick={() => { setQuery(item); navigate(`/explore?q=${encodeURIComponent(item)}`); }}>{item}</button>)}</div>
    </section>
    <section className="featured"><div className="section-head"><div><span className="label">Featured discoveries</span><h2>Start somewhere interesting.</h2></div><button className="text-link" onClick={() => navigate('/explore')}>View all <ArrowRight size={16}/></button></div><div className="feature-grid">{records.filter((record) => record.featured).map((record) => <article className="feature-card" key={record.id} onClick={() => openRecord(record)}><div className="feature-icon"><Sparkles size={18}/></div><span>{typeLabel[record.type]}</span><h3>{record.name}</h3><p>{record.description}</p><div className="card-foot"><small>{record.meta}</small><ArrowRight size={17}/></div></article>)}</div></section>
    <CategorySection />
    <section className="journal" id="journal"><div><span className="label">Atlas Journal</span><h2>Ideas that help you<br/>see the world differently.</h2></div><div className="journal-list">{journalEntries.map((entry, index) => <article key={entry.id}><div><span className="journal-num">{String(index + 1).padStart(2, '0')}</span><h3>{entry.title}</h3><p>{entry.text}</p></div><ArrowRight size={18}/></article>)}</div></section>
  </>;
}

function SearchBox({ query, setQuery, onSubmit }) {
  return <form className="searchbox" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}><Search size={21}/><input aria-label="Search Atlas" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Atlas — try “AI tools”, “Paris”, “design”…"/><kbd>⌘ K</kbd></form>;
}

function CategorySection() {
  return <section className="directory" id="categories"><div className="section-head"><div><span className="label">Explore Atlas</span><h2>Choose a direction.</h2></div></div><div className="category-grid">{categories.map((category) => { const Icon = categoryIcons[category.id]; return <button className="category" key={category.id} onClick={() => navigate(`/category/${category.id}`)}><span className="cat-icon"><Icon size={19}/></span><span><strong>{category.label}</strong><small>{category.text}</small></span><ArrowRight size={16}/></button>; })}</div></section>;
}

function Explore({ query, setQuery, results, saved, toggleSave, openRecord }) {
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><span className="label">Discovery index</span><h1>Explore everything.</h1><p>Search across the Atlas knowledge base and follow the connections.</p><SearchBox query={query} setQuery={setQuery} onSubmit={() => {}} /></div><Results results={results} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!results.length && <Empty />}</section>;
}

function CategoryPage({ category, results, saved, toggleSave, openRecord }) {
  const Icon = categoryIcons[category.id];
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><div className="category-hero-icon"><Icon size={22}/></div><span className="label">{category.label}</span><h1>{category.label}.</h1><p>{category.text}</p></div><Results results={results} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!results.length && <Empty />}</section>;
}

function SavedPage({ records: savedRecords, saved, toggleSave, openRecord }) {
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><span className="label">Your Atlas</span><h1>Saved discoveries.</h1><p>Keep the places, ideas and organizations you want to return to.</p></div><Results results={savedRecords} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!savedRecords.length && <Empty title="Nothing saved yet." text="Open a discovery and use Save discovery to build your personal Atlas." />}</section>;
}

function Results({ results, saved, toggleSave, openRecord }) {
  return <><div className="section-head results-head"><h2>{results.length} {results.length === 1 ? 'discovery' : 'discoveries'}</h2></div><div className="result-grid">{results.map((record) => <ResultCard key={record.id} r={record} saved={saved} toggleSave={toggleSave} open={openRecord}/>)}</div></>;
}

function ResultCard({ r, saved, toggleSave, open }) {
  return <article className="result-card"><button className="result-main" onClick={() => open(r)}><div className="result-avatar" aria-hidden="true">{r.name.slice(0, 1)}</div><div><span className="result-type">{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.description}</p><small>{r.meta}</small><div className="tags">{r.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></button><button className={`bookmark ${saved.includes(r.id) ? 'on' : ''}`} onClick={() => toggleSave(r.id)} aria-label={saved.includes(r.id) ? `Remove ${r.name} from saved` : `Save ${r.name}`}><Bookmark size={17}/></button></article>;
}

function Empty({ title = 'Nothing found yet.', text = 'Try a broader topic, category or name.' }) {
  return <div className="empty"><Search size={28}/><h3>{title}</h3><p>{text}</p></div>;
}

function EntityModal({ record, saved, toggleSave, close }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="entity-title"><button className="close" onClick={close} aria-label="Close"><X/></button><span className="label">{typeLabel[record.type]}</span><h2 id="entity-title">{record.name}</h2><p className="modal-meta">{record.meta}</p><p>{record.description}</p><div className="tags">{record.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="save-large" onClick={() => toggleSave(record.id)}>{saved.includes(record.id) ? 'Saved to Atlas' : 'Save discovery'} <Bookmark size={16}/></button></div></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
