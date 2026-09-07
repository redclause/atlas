import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Bookmark, Building2, Compass, Globe2, Layers3, MapPin, Search, Sparkles, Star, Tag, Wrench, X } from 'lucide-react';
import './styles.css';

const categories = [
  { id:'companies', label:'Companies', icon:Building2, text:'Organizations, startups and institutions.' },
  { id:'brands', label:'Brands', icon:Tag, text:'Brands across fashion, beauty, food, tech and more.' },
  { id:'tools', label:'Tools & software', icon:Wrench, text:'Useful apps, platforms and digital tools.' },
  { id:'places', label:'Places', icon:MapPin, text:'Cities, destinations, museums and places worth knowing.' },
  { id:'topics', label:'Topics', icon:Layers3, text:'Ideas, disciplines and subjects to explore.' },
  { id:'resources', label:'Resources', icon:Compass, text:'Courses, publications, books and useful websites.' },
];

const records = [
  {id:'openai',type:'companies',name:'OpenAI',meta:'Artificial intelligence · United States',description:'AI research and technology organization building models and products for general-purpose intelligence.',tags:['AI','Research','Software'],featured:true},
  {id:'mistral',type:'companies',name:'Mistral AI',meta:'Artificial intelligence · France',description:'European AI company focused on efficient, capable foundation models and developer products.',tags:['AI','Models','Europe']},
  {id:'stripe',type:'companies',name:'Stripe',meta:'Financial technology · Ireland / United States',description:'Technology infrastructure for businesses that accept payments and operate online.',tags:['Fintech','Payments','Software']},
  {id:'apple',type:'brands',name:'Apple',meta:'Technology · United States',description:'Technology brand known for personal devices, operating systems and digital services.',tags:['Hardware','Software','Design'],featured:true},
  {id:'patagonia',type:'brands',name:'Patagonia',meta:'Outdoor · United States',description:'Outdoor clothing and equipment brand with a strong focus on product durability and environmental responsibility.',tags:['Outdoor','Clothing','Sustainability']},
  {id:'figma',type:'tools',name:'Figma',meta:'Design software · Web',description:'Collaborative interface design and prototyping platform used by product teams.',tags:['Design','Collaboration','UI']},
  {id:'notion',type:'tools',name:'Notion',meta:'Productivity · Web / Desktop / Mobile',description:'Flexible workspace for notes, documents, databases and team knowledge.',tags:['Productivity','Notes','Teams']},
  {id:'paris',type:'places',name:'Paris',meta:'France · Europe',description:'Capital city known for architecture, museums, design, food and a dense cultural landscape.',tags:['City','Culture','Architecture'],featured:true},
  {id:'lisbon',type:'places',name:'Lisbon',meta:'Portugal · Europe',description:'Atlantic capital combining historic neighborhoods, contemporary culture and a distinctive urban landscape.',tags:['City','Travel','Culture']},
  {id:'astronomy',type:'topics',name:'Astronomy',meta:'Science · Space',description:'The study of celestial objects, cosmic systems and the physical processes shaping the universe.',tags:['Science','Space','Physics']},
  {id:'urbanism',type:'topics',name:'Urbanism',meta:'Cities · Architecture · Planning',description:'The study and practice of shaping cities, neighborhoods, public space and urban systems.',tags:['Cities','Planning','Design']},
  {id:'mdn',type:'resources',name:'MDN Web Docs',meta:'Developer resource · Web',description:'Reference and learning material for web standards, APIs, HTML, CSS and JavaScript.',tags:['Web','Documentation','Development']},
];

const typeLabel = Object.fromEntries(categories.map(c => [c.id,c.label]));

function App(){
  const [query,setQuery] = useState('');
  const [active,setActive] = useState('all');
  const [saved,setSaved] = useState(()=>JSON.parse(localStorage.getItem('atlas-saved')||'[]'));
  const [selected,setSelected] = useState(null);

  const results = useMemo(()=>{
    const q=query.trim().toLowerCase();
    return records.filter(r => (active==='all'||r.type===active) && (!q || [r.name,r.meta,r.description,...r.tags].join(' ').toLowerCase().includes(q)));
  },[query,active]);

  function toggleSave(id){
    const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    setSaved(next); localStorage.setItem('atlas-saved',JSON.stringify(next));
  }

  return <div className="app">
    <header className="nav"><a className="logo" href="#top"><span className="logo-mark">A</span><span>Atlas</span></a><nav><a href="#explore">Explore</a><a href="#categories">Categories</a><a href="#journal">Journal</a></nav><button className="saved" onClick={()=>setActive('saved')}><Bookmark size={16}/> Saved <span>{saved.length}</span></button></header>

    <main id="top">
      <section className="hero">
        <div className="eyebrow"><Globe2 size={15}/> A discovery platform for the curious</div>
        <h1>A map of everything<br/><em>worth discovering.</em></h1>
        <p className="hero-copy">Explore companies, brands, tools, places, topics and resources — connected so one discovery naturally leads to the next.</p>
        <div className="searchbox"><Search size={21}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Atlas — try “AI tools”, “Paris”, “design”…"/><kbd>⌘ K</kbd></div>
        <div className="quick"><span>Try:</span>{['AI','French brands','Design tools','Astronomy','Cities'].map(x=><button key={x} onClick={()=>setQuery(x)}>{x}</button>)}</div>
      </section>

      <section className="featured" id="explore"><div className="section-head"><div><span className="label">Featured discoveries</span><h2>Start somewhere interesting.</h2></div><button className="text-link" onClick={()=>{setQuery('');setActive('all')}}>View all <ArrowRight size={16}/></button></div><div className="feature-grid">{records.filter(r=>r.featured).map(r=><article className="feature-card" key={r.id} onClick={()=>setSelected(r)}><div className="feature-icon"><Sparkles size={18}/></div><span>{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.description}</p><div className="card-foot"><small>{r.meta}</small><ArrowRight size={17}/></div></article>)}</div></section>

      <section className="directory" id="categories"><div className="section-head"><div><span className="label">Explore Atlas</span><h2>Choose a direction.</h2></div></div><div className="category-grid">{categories.map(c=>{const Icon=c.icon;return <button className={`category ${active===c.id?'active':''}`} key={c.id} onClick={()=>{setActive(c.id);document.getElementById('results')?.scrollIntoView({behavior:'smooth'})}}><span className="cat-icon"><Icon size={19}/></span><span><strong>{c.label}</strong><small>{c.text}</small></span><ArrowRight size={16}/></button>})}</div></section>

      <section className="results" id="results"><div className="section-head"><div><span className="label">Discovery index</span><h2>{active==='all'?'Explore everything':typeLabel[active] || 'Saved discoveries'}</h2></div><span className="count">{results.length} discoveries</span></div>{active==='saved' ? <div className="result-grid">{records.filter(r=>saved.includes(r.id)).map(r=><ResultCard key={r.id} r={r} saved={saved} toggleSave={toggleSave} open={setSelected}/>)}</div> : <div className="result-grid">{results.map(r=><ResultCard key={r.id} r={r} saved={saved} toggleSave={toggleSave} open={setSelected}/>)}{!results.length&&<div className="empty"><Search size={28}/><h3>Nothing found yet.</h3><p>Try a broader topic, category or name.</p></div>}</div>}</section>

      <section className="journal" id="journal"><div><span className="label">Atlas Journal</span><h2>Ideas that help you<br/>see the world differently.</h2></div><div className="journal-list"><Journal title="How discovery becomes a knowledge graph" text="Why connected information is more useful than isolated lists."/><Journal title="What makes a great directory?" text="The difference between collecting links and creating useful context."/><Journal title="From search to exploration" text="Designing interfaces that encourage curiosity without getting in the way."/></div></section>
    </main>
    <footer><div className="logo"><span className="logo-mark">A</span><span>Atlas</span></div><p>Discover. Explore. Connect.</p><span>© 2026 Atlas</span></footer>

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><span className="label">{typeLabel[selected.type]}</span><h2>{selected.name}</h2><p className="modal-meta">{selected.meta}</p><p>{selected.description}</p><div className="tags">{selected.tags.map(t=><span key={t}>{t}</span>)}</div><button className="save-large" onClick={()=>toggleSave(selected.id)}>{saved.includes(selected.id)?'Saved to Atlas':'Save discovery'} <Bookmark size={16}/></button></div></div>}
  </div>
}

function ResultCard({r,saved,toggleSave,open}){return <article className="result-card"><button className="result-main" onClick={()=>open(r)}><div className="result-avatar">{r.name.slice(0,1)}</div><div><span className="result-type">{typeLabel[r.type]}</span><h3>{r.name}</h3><p>{r.description}</p><small>{r.meta}</small><div className="tags">{r.tags.map(t=><span key={t}>{t}</span>)}</div></div></button><button className={`bookmark ${saved.includes(r.id)?'on':''}`} onClick={()=>toggleSave(r.id)} aria-label="Save"><Bookmark size={17}/></button></article>}
function Journal({title,text}){return <article><div><span className="journal-num">01</span><h3>{title}</h3><p>{text}</p></div><ArrowRight size={18}/></article>}

window.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('.searchbox input')?.focus()}});
createRoot(document.getElementById('root')).render(<App/>);
