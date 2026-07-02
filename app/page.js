const cursos = [
  "8° Básico",
  "1° Medio",
  "2° Medio",
  "3° Medio",
  "4° Medio",
  "PyA",
  "1NM EPJA",
  "2NM EPJA",
  "Orientación",
];

export default function Home() {
  return (
    <main style={{ fontFamily: "Arial", padding: 24, background: "#f4f6f8", minHeight: "100vh" }}>
      <h1>📚 Rúbricas Formativas</h1>
      <p>Seguimiento de lectura, escritura y comunicación oral.</p>

      <h2>Mis cursos</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {cursos.map((curso) => (
          <div
            key={curso}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{curso}</h3>
            <p>📖 Lectura · ✍️ Escritura · 🎤 Oralidad</p>
          </div>
        ))}
      </div>
    </main>
  );
}
