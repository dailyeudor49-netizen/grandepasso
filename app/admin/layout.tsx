import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PASS = process.env.ADMIN_PASS || "VitaNovaLino753!";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (token === ADMIN_PASS) {
    return <>{children}</>;
  }

  // Not authenticated — show login form
  async function login(formData: FormData) {
    "use server";
    const pass = formData.get("pass") as string;
    if (pass === ADMIN_PASS) {
      const c = await cookies();
      c.set("admin_token", ADMIN_PASS, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/admin",
      });
      redirect("/admin");
    }
    redirect("/admin?err=1");
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f6f6f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", border: "1px solid #e1e1e1", borderRadius: 12, padding: 32, width: "100%", maxWidth: 360, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
          Accesso Admin
        </h2>
        <form action={login}>
          <input
            type="password"
            name="pass"
            placeholder="Password"
            required
            style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14, marginBottom: 14, fontFamily: "'Inter', sans-serif", boxSizing: "border-box" }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: "10px 20px", background: "#1B5E6B", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
