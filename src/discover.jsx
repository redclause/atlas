import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Bird, Cat, Dog, Fish, Globe2, PawPrint, Rabbit, Search, Turtle } from 'lucide-react';
import { categories, getCategory, getRecord, getRelated, journalEntries, records, typeLabel } from './data';
import { countries, getCountry, getCountryRecords } from './countries';
import { enrichRecord, getImageTitles } from './petDetails';
import { contentScale } from './contentScale';
import { imageFor } from './imageRegistry';
import { loadSaved, saveSaved } from './storage';
import './styles.css';
import './discover.css';

const icons = { dogs: Dog, cats: Cat, birds: Bird, 'small-animals': Rabbit, 'fish-aquatic': Fish, reptiles: Turtle };
const richRecords = records.map(enrichRecord);
const byId = new Map(richRecords.map((r) => [r.id, r]));
const quickSearches = ['Labrador Retriever', 'Maine Coon', 'Budgerigar', 'Guinea Pig', 'Betta', 'Swallows'];

function route() {
  const parts = (window.location.pathname.replace(/\/+$/, '') || '/').split('/').filter(Boolean);
  if (parts[0] === 'pet' || parts[0] === 'entity') return { page: 'pet', id: parts[1] };
  if (parts[0] === 'category') return { page: 'category', id: parts[1] };
  if (parts[0] === 'country') return { page: 'country', id: parts[1] };
  if (parts[0] === 'countries') return { page: 'countries' };
  if (parts[0] === 'saved') return { page: 'saved' };
  if (parts[0] === 'explore') return { page: 'explore' };
  return { page: 'home' };
}
function go(to) { window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function useAnimalImage(record) {
  const [source, setSource] = useState('');
  const stable = imageFor(record);
  useEffect(() => {
    let active = true;
    setSource('');
    // First-party asset is always attempted first. During the migration period,
    // Wikimedia is only a temporary source fallback; it is never the canonical URL.
    const local = new Image();
    local.onload = () => { if (active) setSource(stable.path); };
    local.onerror = async () => {
      const titles = getImageTitles(record);
      for (const title of titles) {
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`);
          if (!res.ok) continue;
          const data = await res.json();
          const image = data?.originalimage?.source || data?.thumbnail?.source;
          if (image) { if (active) setSource(image); return; }
        } catch {}
      }
    };
    local.src = stable.path;
    return () => { active = false; };
  }, [record.id, stable.path]);
  return { source, stable };
}
function AnimalImage({ record, className = '' }) {
  const [failed, setFailed] = useState(false);
  const { source, stable } = useAnimalImage(record);
  useEffect(() => setFailed(false), [record.id]);
  if (!source || failed) return <div className={`animal-image animal-image-fallback ${className}`} aria-label={`${record.name} illustration`}><PawPrint size={30}/><span>{record.name}</span></div>;
  return <img className={`animal-image ${className}`} src={source} alt={`${record.name}`} loading="lazy" onError={() => setFailed(true)} data-canonical-image={stable.path} />;
}
function CountryImage({ country, className = '' }) { const record = byId.get(country.recordIds[0]); return record ? <AnimalImage record={record} className={className}/> : <div className={`animal-image animal-image-fallback ${className}`}><Globe2/></div>; }

function Header({ savedCount }) { return <header className="nav"><a className="logo" href="/" onClick={(e)=>{e.preventDefault();go('/')}}><span className="logo-mark">P</span><span>discover.pet</span></a><nav><a href="/explore" onClick={(e)=>{e.preventDefault();go('/explore')}}>Explore</a><a href="/countries" onClick={(e)=>{e.preventDefault();go('/countries')}}>Countries</a><a href="/#categories">Animals</a><a href="/#journal">Guides</a></nav><button className="saved" onClick={()=>go('/saved')}><Bookmark size={16}/> Saved <span>{savedCount}</span></button></header>; }
function SearchBox({ value, setValue }) { return <form className="searchbox" onSubmit={(e)=>{e.preventDefault();go(`/explore${value.trim()?`?q=${encodeURIComponent(value.trim())}`:''}`)}}><Search size={20}/><input aria-label="Search animals" value={value} onChange={e=>setValue(e.target.value)} placeholder="Search breeds, species, habits or care…"/><kbd>⌘ K</kbd></form>; }

function Home({ query, setQuery }) { return <><section className="hero"><div className="eyebrow"><PawPrint size={15}/> A clear guide to life with animals</div><h1>Understand the animal<br/><em>before you choose one.</em></h1><p className="hero-copy">Explore breeds and species, learn their habits, discover where they come from and understand the everyday care they need.</p><SearchBox value={query} setValue={setQuery}/><div className="quick"><span>Try:</span>{quickSearches.map(x=><button key={x} onClick={()=>go(`/explore?q=${encodeURIComponent(x)}`)}>{x}</button>)}</div></section><section className="featured"><div className="section-head"><div><span className="label">Featured animal guides</span><h2>Start with a species you know.</h2></div><button className="text-link" onClick={()=>go('/explore')}>View all <ArrowRight size={16}/></button></div><div className="feature-grid">{richRecords.filter(r=>r.featured).map(r=><article className="feature-card" key={r.id} onClick={()=>go(`/pet/${r.id}`)}><AnimalImage record={r} className="feature-image"/><span>{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.overview}</p><div className="card-foot"><small>{r.meta}</small><ArrowRight size={17}/></div></article>)}</div></section><CountrySection/><section className="directory" id="categories"><div className="section-head"><div><span className="label">Explore animals</span><h2>Choose a direction.</h2></div></div><div className="category-grid">{categories.map(c=>{const Icon=icons[c.id]||PawPrint;return <button className="category" key={c.id} onClick={()=>go(`/category/${c.id}`)}><span className="cat-icon"><Icon size={19}/></span><span><strong>{c.label}</strong><small>{c.text}</small></span><ArrowRight size={16}/></button>})}</div></section><section className="journal" id="journal"><div><span className="label">Pet Journal</span><h2>Useful ideas for<br/>better animal care.</h2><p className="scale-note">The knowledge layer currently indexes {contentScale.totalIndexedItems.toLocaleString()} structured items and is designed to scale past 10,000.</p></div><div className="journal-list">{journalEntries.map((e,i)=><article key={e.id}><div><span className="journal-num">{String(i+1).padStart(2,'0')}</span><h3>{e.title}</h3><p>{e.text}</p></div><ArrowRight size={18}/></article>)}</div></section></>; }
function CountrySection(){return <section className="directory country-directory"><div className="section-head"><div><span className="label">Discover by origin</span><h2>Animals have stories tied to places.</h2><p>Explore breeds by country, region and history.</p></div><button className="text-link" onClick={()=>go('/countries')}>All countries <ArrowRight size={16}/></button></div><div className="country-grid">{countries.slice(0,3).map(c=><CountryCard country={c} key={c.id}/>)}</div></section>}
function CountryCard({country}){return <button className="country-card" onClick={()=>go(`/country/${country.id}`)}><CountryImage country={country}/><div className="country-overlay"><span className="country-flag">{country.flag}</span><strong>{country.name}</strong><small>{country.recordIds.length} profiles · {country.regions.slice(0,3).join(' · ')}</small></div></button>}

function Results({ results, saved, toggleSave }){return <div className="result-grid">{results.map(r=><article className="result-card" key={r.id}><button className="result-main" onClick={()=>go(`/pet/${r.id}`)}><AnimalImage record={r} className="result-avatar"/><div><span className="result-type">{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.overview}</p><small>{r.meta}</small><div className="tags">{r.tags.map(t=><span key={t}>{t}</span>)}</div></div></button><button className={`bookmark ${saved.includes(r.id)?'on':''}`} onClick={()=>toggleSave(r.id)} aria-label="Save guide"><Bookmark size={17}/></button></article>)}</div>}

function Explore({query,setQuery,results,saved,toggleSave}){return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={()=>go('/')}><ArrowLeft size={16}/> Home</button><span className="label">Animal discovery index</span><h1>Explore pets & animals.</h1><p>Search breeds and species, then follow related animals, countries and care topics.</p><SearchBox value={query} setValue={setQuery}/></div><Results results={results} saved={saved} toggleSave={toggleSave}/>{!results.length&&<Empty/>}</section>}
function CategoryPage({category,results,saved,toggleSave}){const Icon=icons[category.id]||PawPrint;return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={()=>go('/')}><ArrowLeft size={16}/> Home</button><div className="category-hero-icon"><Icon size={22}/></div><span className="label">{category.label}</span><h1>{category.label}.</h1><p>{category.text}</p></div><Results results={results} saved={saved} toggleSave={toggleSave}/>{!results.length&&<Empty/>}</section>}
function Empty(){return <div className="empty"><PawPrint size={25}/><h2>No guides found.</h2><p>Try another breed, species or care term.</p></div>}

function App(){const [r,setR]=useState(route);const [query,setQuery]=useState(()=>new URLSearchParams(location.search).get('q')||'');const [saved,setSaved]=useState(loadSaved);useEffect(()=>{const f=()=>{setR(route());setQuery(new URLSearchParams(location.search).get('q')||'')};addEventListener('popstate',f);return()=>removeEventListener('popstate',f)},[]);useEffect(()=>saveSaved(saved),[saved]);const q=query.trim().toLowerCase();const filtered=useMemo(()=>richRecords.filter(x=>!q||[x.name,x.meta,x.overview,x.habits,x.dailyCare,x.note,...x.tags].join(' ').toLowerCase().includes(q)),[q]);const category=r.page==='category'?getCategory(r.id):null;const results=category?filtered.filter(x=>x.type===category.id):filtered;const savedRecords=richRecords.filter(x=>saved.includes(x.id));const toggleSave=id=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);return <div className="app"><Header savedCount={saved.length}/><main id="top">{r.page==='home'&&<Home query={query} setQuery={setQuery}/>} {r.page==='explore'&&<Explore query={query} setQuery={setQuery} results={results} saved={saved} toggleSave={toggleSave}/>} {r.page==='category'&&category&&<CategoryPage category={category} results={results} saved={saved} toggleSave={toggleSave}/>} {r.page==='countries'&&<CountriesPage/>} {r.page==='country'&&getCountry(r.id)&&<CountryPage country={getCountry(r.id)} saved={saved} toggleSave={toggleSave}/>} {r.page==='saved'&&<SavedPage records={savedRecords} saved={saved} toggleSave={toggleSave}/>} {r.page==='pet'&&getRecord(r.id)&&<PetPage record={byId.get(r.id)} saved={saved} toggleSave={toggleSave}/>}</main><footer><a className="logo" href="/" onClick={e=>{e.preventDefault();go('/')}}><span className="logo-mark">P</span><span>discover.pet</span></a><p>Learn. Care. Understand.</p><span>© 2026 discover.pet</span></footer></div>}
function CountriesPage(){return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={()=>go('/')}><ArrowLeft size={16}/> Home</button><span className="label">Global animal origins</span><h1>Discover by country.</h1><p>Find breeds and species through geography, history, regions and animal traditions.</p></div><div className="country-grid country-grid-large">{countries.map(c=><CountryCard country={c} key={c.id}/>)}</div></section>}
function CountryPage({country}){const rs=getCountryRecords(country,richRecords);return <section className="results-page"><div className="country-hero"><button className="back-link" onClick={()=>go('/countries')}><ArrowLeft size={16}/> Countries</button><CountryImage country={country}/><div><span className="country-flag">{country.flag}</span><span className="label">Country guide</span><h1>{country.name}.</h1><p>{country.intro}</p><div className="country-regions">{country.regions.map(x=><span key={x}>{x}</span>)}</div></div></div><div className="section-head results-head"><div><span className="label">Breeds & animals</span><h2>Profiles connected to {country.name}</h2></div></div><Results results={rs} saved={[]} toggleSave={()=>{}}/></section>}
function SavedPage({records:rs,saved,toggleSave}){return <section className="results-page"><div className="page-hero"><button className="back-link" onClick={()=>go('/')}><ArrowLeft size={16}/> Home</button><span className="label">Your collection</span><h1>Saved guides.</h1><p>Keep animal profiles you want to revisit.</p></div><Results results={rs} saved={saved} toggleSave={toggleSave}/></section>}
function PetPage({record,saved,toggleSave}){const related=getRelated(record,6).map(x=>byId.get(x.id||x)).filter(Boolean);return <section className="pet-page"><button className="back-link" onClick={()=>go('/explore')}><ArrowLeft size={16}/> Explore</button><div className="pet-hero"><AnimalImage record={record} className="pet-cover"/><div className="pet-intro"><span className="label">{typeLabel[record.type]}</span><h1>{record.name}.</h1><p className="pet-meta">{record.meta}</p><p className="lead">{record.overview}</p><button className={`save-large ${saved.includes(record.id)?'saved-state':''}`} onClick={()=>toggleSave(record.id)}><Bookmark size={17}/> {saved.includes(record.id)?'Saved':'Save guide'}</button></div></div><div className="pet-layout"><div><section className="content-section"><span className="label">Behavior</span><h2>How does {record.name} behave?</h2><p>{record.habits}</p></section><section className="content-section"><span className="label">Daily care</span><h2>What does everyday care look like?</h2><p>{record.dailyCare}</p></section>{record.note&&<div className="important"><strong>Important context</strong><p>{record.note}</p></div>}<section className="content-section"><span className="label">Explore further</span><h2>Related guides</h2><div className="highlight-list">{related.map(x=><button key={x.id} onClick={()=>go(`/pet/${x.id}`)}><strong>{x.name}</strong><p>{x.overview}</p></button>)}</div></section></div><aside><div className="side-card"><span className="label">Knowledge index</span><h3>More to discover</h3><dl><dt>Profile</dt><dd>{record.name}</dd><dt>Knowledge entries</dt><dd>{contentScale.knowledgeEntries / Math.max(contentScale.animalProfiles,1)} topic paths</dd><dt>Questions</dt><dd>{contentScale.questionEntries / Math.max(contentScale.animalProfiles,1)} question paths</dd></dl></div></aside></div></section>}

createRoot(document.getElementById('root')).render(<App/>);
