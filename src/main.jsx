import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Bird, Cat, Dog, Fish, Globe2, PawPrint, Rabbit, Search, Sparkles, Turtle, X } from 'lucide-react';
import { categories, getCategory, getRecord, getRelated, journalEntries, records, typeLabel } from './data';
import { loadSaved, saveSaved } from './storage';
import './styles.css';

const categoryIcons = { dogs: Dog, cats: Cat, birds: Bird, 'small-animals': Rabbit, 'fish-aquatic': Fish, reptiles: Turtle };
const quickSearches = ['Labrador Retriever', 'Maine Coon', 'Budgerigar', 'Guinea Pig', 'Betta', 'Swallows'];

function parseRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'pet' && parts[1]) return { page: 'entity', id: parts[1] };
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
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [saved, setSaved] = useState(loadSaved);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute());
      setQuery(new URLSearchParams(window.location.search).get('q') || '');
    };
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
    navigate(`/pet/${record.id}`);
  }

  function submitSearch() {
    navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((record) => !q || [record.name, record.meta, record.description, record.habits, record.dailyCare, record.note, ...record.tags].join(' ').toLowerCase().includes(q));
  }, [query]);

  const category = route.page === 'category' ? getCategory(route.id) : null;
  const categoryResults = category ? filtered.filter((record) => record.type === category.id) : filtered;
  const savedRecords = records.filter((record) => saved.includes(record.id));

  return (
    <div className="app">
      <Header savedCount={saved.length} />
      <main id="top">
        {route.page === 'home' && <Home query={query} setQuery={setQuery} openRecord={openRecord} submitSearch={submitSearch} />}
        {route.page === 'explore' && <Explore query={query} setQuery={setQuery} submitSearch={submitSearch} results={categoryResults} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
        {route.page === 'category' && category && <CategoryPage category={category} results={categoryResults} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
        {route.page === 'saved' && <SavedPage records={savedRecords} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />}
      </main>
      {selected && <EntityModal record={selected} saved={saved} toggleSave={toggleSave} openRecord={openRecord} close={() => { setSelected(null); if (route.page === 'entity') navigate('/explore'); }} />}
      <footer><a className="logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}><span className="logo-mark">P</span><span>discover.pet</span></a><p>Learn. Care. Understand.</p><span>© 2026 discover.pet</span></footer>
    </div>
  );
}

function Header({ savedCount }) {
  return <header className="nav">
    <a className="logo" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}><span className="logo-mark">P</span><span>discover.pet</span></a>
    <nav><a href="/explore" onClick={(e) => { e.preventDefault(); navigate('/explore'); }}>Explore</a><a href="/#categories">Animals</a><a href="/#journal">Guides</a></nav>
    <button className="saved" onClick={() => navigate('/saved')}><Bookmark size={16}/> Saved <span>{savedCount}</span></button>
  </header>;
}

function Home({ query, setQuery, openRecord, submitSearch }) {
  return <>
    <section className="hero">
      <div className="eyebrow"><PawPrint size={15}/> A clear guide to life with animals</div>
      <h1>Understand the animal<br/><em>before you choose one.</em></h1>
      <p className="hero-copy">Explore breeds and species, learn everyday habits, understand daily care and discover what makes each animal different.</p>
      <SearchBox query={query} setQuery={setQuery} onSubmit={submitSearch} />
      <div className="quick"><span>Try:</span>{quickSearches.map((item) => <button key={item} onClick={() => { setQuery(item); navigate(`/explore?q=${encodeURIComponent(item)}`); }}>{item}</button>)}</div>
    </section>
    <section className="featured"><div className="section-head"><div><span className="label">Featured animal guides</span><h2>Start with a species you know.</h2></div><button className="text-link" onClick={() => navigate('/explore')}>View all <ArrowRight size={16}/></button></div><div className="feature-grid">{records.filter((record) => record.featured).map((record) => <article className="feature-card" key={record.id} onClick={() => openRecord(record)}><div className="feature-icon"><Sparkles size={18}/></div><span>{typeLabel[record.type]}</span><h3>{record.name}</h3><p>{record.description}</p><div className="card-foot"><small>{record.meta}</small><ArrowRight size={17}/></div></article>)}</div></section>
    <CategorySection />
    <section className="journal" id="journal"><div><span className="label">Pet Journal</span><h2>Useful ideas for<br/>better animal care.</h2></div><div className="journal-list">{journalEntries.map((entry, index) => <article key={entry.id}><div><span className="journal-num">{String(index + 1).padStart(2, '0')}</span><h3>{entry.title}</h3><p>{entry.text}</p></div><ArrowRight size={18}/></article>)}</div></section>
  </>;
}

function SearchBox({ query, setQuery, onSubmit }) {
  return <form className="searchbox" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}><Search size={21}/><input aria-label="Search discover.pet" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search breeds, species, habits or care…"/><kbd>⌘ K</kbd></form>;
}

function CategorySection() {
  return <section className="directory" id="categories"><div className="section-head"><div><span className="label">Explore animals</span><h2>Choose a direction.</h2></div></div><div className="category-grid">{categories.map((category) => { const Icon = categoryIcons[category.id] || PawPrint; return <button className="category" key={category.id} onClick={() => navigate(`/category/${category.id}`)}><span className="cat-icon"><Icon size={19}/></span><span><strong>{category.label}</strong><small>{category.text}</small></span><ArrowRight size={16}/></button>; })}</div></section>;
}

function Explore({ query, setQuery, submitSearch, results, saved, toggleSave, openRecord }) {
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><span className="label">Animal discovery index</span><h1>Explore pets & animals.</h1><p>Search breeds and species, then follow related animals and care topics.</p><SearchBox query={query} setQuery={setQuery} onSubmit={submitSearch} /></div><Results results={results} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!results.length && <Empty />}</section>;
}

function CategoryPage({ category, results, saved, toggleSave, openRecord }) {
  const Icon = categoryIcons[category.id] || PawPrint;
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><div className="category-hero-icon"><Icon size={22}/></div><span className="label">{category.label}</span><h1>{category.label}.</h1><p>{category.text}</p></div><Results results={results} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!results.length && <Empty />}</section>;
}

function SavedPage({ records: savedRecords, saved, toggleSave, openRecord }) {
  return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={() => navigate('/')}><ArrowLeft size={16}/> Home</button><span className="label">Your collection</span><h1>Saved guides.</h1><p>Keep animal profiles you want to revisit.</p></div><Results results={savedRecords} saved={saved} toggleSave={toggleSave} openRecord={openRecord} />{!savedRecords.length && <Empty title="Nothing saved yet." text="Open an animal guide and use Save guide to build your personal collection." />}</section>;
}

function Results({ results, saved, toggleSave, openRecord }) {
  return <><div className="section-head results-head"><h2>{results.length} {results.length === 1 ? 'guide' : 'guides'}</h2></div><div className="result-grid">{results.map((record) => <ResultCard key={record.id} r={record} saved={saved} toggleSave={toggleSave} open={openRecord}/>)}</div></>;
}

function ResultCard({ r, saved, toggleSave, open }) {
  return <article className="result-card"><button className="result-main" onClick={() => open(r)}><div className="result-avatar" aria-hidden="true">{r.name.slice(0, 1)}</div><div><span className="result-type">{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.description}</p><small>{r.meta}</small><div className="tags">{r.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></button><button className={`bookmark ${saved.includes(r.id) ? 'on' : ''}`} onClick={() => toggleSave(r.id)} aria-label={saved.includes(r.id) ? `Remove ${r.name} from saved` : `Save ${r.name}`}><Bookmark size={17}/></button></article>;
}

function Empty({ title = 'Nothing found yet.', text = 'Try a breed, species, habit or broader category.' }) {
  return <div className="empty"><Search size={28}/><h3>{title}</h3><p>{text}</p></div>;
}

function EntityModal({ record, saved, toggleSave, openRecord, close }) {
  const related = getRelated(record);
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="entity-title"><button className="close" onClick={close} aria-label="Close"><X/></button><span className="label">{typeLabel[record.type]}</span><h2 id="entity-title">{record.name}</h2><p className="modal-meta">{record.meta}</p><p>{record.description}</p><div className="guide-grid"><section><strong>Typical habits</strong><p>{record.habits}</p></section><section><strong>Daily care</strong><p>{record.dailyCare}</p></section></div>{record.note && <div className="care-note"><strong>Important note</strong><p>{record.note}</p></div>}<div className="tags">{record.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="save-large" onClick={() => toggleSave(record.id)}>{saved.includes(record.id) ? 'Saved guide' : 'Save guide'} <Bookmark size={16}/></button>{related.length > 0 && <div className="related"><strong>Related guides</strong><div className="related-list">{related.slice(0, 4).map((item) => <button key={item.id} onClick={() => openRecord(item)}>{item.name}<ArrowRight size={14}/></button>)}</div></div>}</div></div>;
}

createRoot(document.getElementById('root')).render(<App/>);
