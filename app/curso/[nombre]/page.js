export default function CursoPage({ params }) {
  const nombreCurso = decodeURIComponent(params.nombre);

  const estudiantes = Array.from({ length: 35 }, (_, i) => ({
    numero: i + 1,
    nombre: `Estudiante ${i + 1}`,
    lectura: 0,
    escritura: 0,
    oralidad: 0,
  }));

  return (
    <main style={{ fontFamily: "Arial", padding: 24, background: "#f4f6f8", minHeight: "100vh" }}>
      <a href="/" style={{ color: "black" }}>← Volver</a>

      <h1>{nombreCurso}</h1>
      <p>35 estudiantes máximo por aula.</p>

      <button style={{ padding: 12, borderRadius: 8, border: "none", background: "black", color: "white" }}>
        ➕ Registrar clase
      </button>

      <h2>Estudiantes</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {estudiantes.map((e) => (
          <div key={e.numero} style={{ background: "white", padding: 16, borderRadius: 12 }}>
            <h3>{e.numero}. {e.nombre}</h3>
            <p>📖 Lectura: {e.lectura}%</p>
            <p>✍️ Escritura: {e.escritura}%</p>
            <p>🎤 Oralidad: {e.oralidad}%</p>
          </div>
        ))}
      </div>
    </main>
  );
}
