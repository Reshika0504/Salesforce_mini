import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { login, token } = useAuth();
  const [form, setForm] = useState({
    tenantSlug: "acme",
    email: "admin@acme.com",
    password: "password123",
  });
  const [error, setError] = useState("");

  if (token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(form);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="eyebrow">Multi-tenant SaaS CRM</p>
        <h1>Sign in to your workspace</h1>
        <p className="muted">Use the seeded `acme` tenant and demo users after running the seed script.</p>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            <span>Tenant slug</span>
            <input
              name="tenantSlug"
              value={form.tenantSlug}
              onChange={(e) => setForm({ ...form, tenantSlug: e.target.value })}
            />
          </label>
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
