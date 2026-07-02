const cursos = [
  { nombre: "8° Básico", estudiantes: 35 },
  { nombre: "1° Medio", estudiantes: 35 },
  { nombre: "2° Medio", estudiantes: 35 },
  { nombre: "3° Medio", estudiantes: 35 },
  { nombre: "4° Medio", estudiantes: 35 },
  { nombre: "PyA", estudiantes: 35 },
  { nombre: "1NM EPJA", estudiantes: 35 },
  { nombre: "2NM EPJA", estudiantes: 35 },
  { nombre: "Orientación", estudiantes: 35 },
];

export default function Home() {
  return (
    <main
      style={{
        fontFamily: "Arial",
        padding: 24,
        background: "#f4f6f8",
        minHeight: "100vh",
      }}
    >
      <h1>📚 Rúbricas Formativas</h1>
      <p>Seguimiento de lectura, escritura y comunicación oral.</p>

      <h2>Mis cursos</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {cursos.map((curso) => (
          <a
            key={curso.nombre}
            href={`/curso/${encodeURIComponent(curso.nombre)}`}
            style={{
              display: "block",
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              color: "black",
              textDecoration: "none",
            }}
          >
            <h3>{curso.nombre}</h3>
            <p>{curso.estudiantes} estudiantes máximo</p>
            <p>📖 Lectura · ✍️ Escritura · 🎤 Oralidad</p>
          </a>
        ))}
      </div>
    </main>
  );
}
