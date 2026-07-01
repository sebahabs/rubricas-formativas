import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Mic, PenLine, Plus, Users, BarChart3, Save } from 'lucide-react';
import './style.css';

const DIMENSIONS = {
  lectura: { label: 'Lectura', icon: BookOpen, items: ['Localiza información', 'Infiere información', 'Interpreta el texto', 'Evalúa/reflexiona', 'Vocabulario en contexto'] },
  escritura: { label: 'Escritura', icon: PenLine, items: ['Planifica ideas', 'Organiza el texto', 'Coherencia', 'Cohesión', 'Ortografía', 'Adecuación al propósito'] },
  oralidad: { label: 'Comunicación oral', icon: Mic, items: ['Expresa ideas con claridad', 'Fundamenta opiniones', 'Escucha activamente', 'Respeta turnos', 'Presenta con seguridad'] }
};
const cursosIniciales = ['8° Básico', '1° Medio', '2° Medio', '3° Medio', '4° Medio', 'PyA', '1NM EPJA', '2NM EPJA', 'Orientación'];
const estudiantesDemo = ['Ana González','Benjamín Campos','Camila Moreno','Diego Rojas','Fernanda López','Juan Pérez','Martina Soto','Tomás Valdés'];

function loadData(){
  const saved = localStorage.getItem('rubricas_formativas_v1');
  if(saved) return JSON.parse(saved);
  return { cursos: cursosIniciales.map((nombre, i)=>({ id: crypto.randomUUID(), nombre, estudiantes: i<5 ? estudiantesDemo.map(n=>({id: crypto.randomUUID(), nombre:n})) : [], clases: [] })) };
}
function pct(n,d){ return d ? Math.round((n/d)*100) : 0; }
function estadoClass(v){ return v===2?'ok':v===1?'mid':'low'; }
function App(){
  const [data,setData]=useState(loadData);
  const [cursoId,setCursoId]=useState(data.cursos[0]?.id);
  const curso=data.cursos.find(c=>c.id===cursoId) || data.cursos[0];
  const [tab,setTab]=useState('registrar');
  const [clase,setClase]=useState({titulo:'Clase formativa', dimension:'lectura'});
  const [scores,setScores]=useState({});
  const saveAll=(next)=>{ setData(next); localStorage.setItem('rubricas_formativas_v1', JSON.stringify(next)); };
  const addStudent=()=>{ const nombre=prompt('Nombre del estudiante:'); if(!nombre) return; saveAll({...data,cursos:data.cursos.map(c=>c.id===curso.id?{...c,estudiantes:[...c.estudiantes,{id:crypto.randomUUID(),nombre}]}:c)}); };
  const addCourse=()=>{ const nombre=prompt('Nombre del curso:'); if(!nombre) return; const nc={id:crypto.randomUUID(),nombre,estudiantes:[],clases:[]}; saveAll({...data,cursos:[...data.cursos,nc]}); setCursoId(nc.id); };
  const guardarClase=()=>{
    const items=DIMENSIONS[clase.dimension].items;
    const nueva={id:crypto.randomUUID(), fecha:new Date().toISOString(), titulo:clase.titulo||'Clase formativa', dimension:clase.dimension, items, scores};
    saveAll({...data,cursos:data.cursos.map(c=>c.id===curso.id?{...c,clases:[...c.clases,nueva]}:c)});
    setScores({}); alert('Clase guardada.');
  };
  const resumen=useMemo(()=>{
    const r={}; curso.estudiantes.forEach(e=>{r[e.id]={nombre:e.nombre,total:0,max:0,dim:{lectura:[0,0],escritura:[0,0],oralidad:[0,0]}}});
    curso.clases.forEach(cl=>{ Object.entries(cl.scores||{}).forEach(([eid,vals])=>{ Object.values(vals).forEach(v=>{ if(v!==undefined){ r[eid].total+=v; r[eid].max+=2; r[eid].dim[cl.dimension][0]+=v; r[eid].dim[cl.dimension][1]+=2; } }); }); });
    return Object.values(r).sort((a,b)=>a.nombre.localeCompare(b.nombre));
  },[curso]);
  const currentItems=DIMENSIONS[clase.dimension].items;
  return <main>
    <header><div><h1>Rúbricas Formativas</h1><p>Lectura · Escritura · Comunicación oral</p></div><button onClick={()=>localStorage.setItem('rubricas_formativas_v1',JSON.stringify(data))}><Save size={18}/> Guardar</button></header>
    <section className="layout">
      <aside><button className="add" onClick={addCourse}><Plus size={16}/> Curso</button>{data.cursos.map(c=><button key={c.id} onClick={()=>setCursoId(c.id)} className={c.id===curso.id?'active':''}>{c.nombre}<span>{c.estudiantes.length}</span></button>)}</aside>
      <div className="panel">
        <div className="courseTop"><h2>{curso.nombre}</h2><div><button onClick={()=>setTab('registrar')} className={tab==='registrar'?'sel':''}>Registrar clase</button><button onClick={()=>setTab('resumen')} className={tab==='resumen'?'sel':''}><BarChart3 size={16}/> Resumen</button><button onClick={addStudent}><Users size={16}/> Estudiante</button></div></div>
        {tab==='registrar' ? <div>
          <div className="formrow"><input value={clase.titulo} onChange={e=>setClase({...clase,titulo:e.target.value})} placeholder="Nombre de la clase o actividad"/><select value={clase.dimension} onChange={e=>setClase({...clase,dimension:e.target.value})}>{Object.entries(DIMENSIONS).map(([k,d])=><option key={k} value={k}>{d.label}</option>)}</select></div>
          <p className="hint">Toca 0, 1 o 2 por indicador: 0 = no logrado, 1 = en desarrollo, 2 = logrado.</p>
          <div className="tablewrap"><table><thead><tr><th>Estudiante</th>{currentItems.map(i=><th key={i}>{i}</th>)}</tr></thead><tbody>{curso.estudiantes.map(e=><tr key={e.id}><td>{e.nombre}</td>{currentItems.map(item=>{const val=scores[e.id]?.[item]; return <td key={item}><div className="chips">{[0,1,2].map(v=><button key={v} className={val===v?estadoClass(v):''} onClick={()=>setScores({...scores,[e.id]:{...(scores[e.id]||{}),[item]:v}})}>{v}</button>)}</div></td>})}</tr>)}</tbody></table></div>
          <button className="primary" onClick={guardarClase}>Guardar clase</button>
        </div> : <div className="cards">{resumen.map(e=><article key={e.nombre} className="card"><h3>{e.nombre}</h3><div className="bigpct">{pct(e.total,e.max)}%</div>{Object.entries(DIMENSIONS).map(([k,d])=><div className="barline" key={k}><span>{d.label}</span><div className="bar"><i style={{width:pct(e.dim[k][0],e.dim[k][1])+'%'}}></i></div><b>{pct(e.dim[k][0],e.dim[k][1])}%</b></div>)}</article>)}</div>}
      </div>
    </section>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);
