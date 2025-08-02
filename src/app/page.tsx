import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
      }}
    >
      <h1 style={{marginBottom: "2rem", fontWeight: 600}}>Bienvenido</h1>
      <div style={{display: "flex", gap: "1rem"}}>
        <Link href="/register">
          <button
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "6px",
              border: "none",
              background: "#0070f3",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </Link>
        <Link href="/login">
          <button
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "6px",
              border: "1px solid #0070f3",
              background: "#fff",
              color: "#0070f3",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}
