import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/contacts", label: "Contacts" },
  { to: "/deals", label: "Deals" },
  { to: "/audit-logs", label: "Audit Logs", roles: ["admin", "manager"] },
];

export const Layout = () => {
  const { logout, user, tenant } = useAuth();

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <span className="brand-mark">MS</span>
          <div>
            <strong>{tenant?.name || "Mini Salesforce"}</strong>
            <p>Multi-tenant CRM</p>
          </div>
        </Link>
        <nav className="nav">
          {navItems
            .filter((item) => !item.roles || item.roles.includes(user?.role))
            .map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Role-based dashboard</p>
            <h1>{user?.role ? `${user.role} workspace` : "CRM Workspace"}</h1>
          </div>
          <div className="user-card">
            <div>
              <strong>{user?.name}</strong>
              <p>{user?.email}</p>
            </div>
            <button onClick={logout}>Logout</button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};
