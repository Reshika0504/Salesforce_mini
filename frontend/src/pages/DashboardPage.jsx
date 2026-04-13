import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";

export const DashboardPage = () => {
  const { data, error, loading } = useFetch("/dashboard");
  const { user } = useAuth();

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const cards = [
    { label: "Leads", value: data.summary.leadCount },
    { label: "Contacts", value: data.summary.contactCount },
    { label: "Deals", value: data.summary.dealCount },
    { label: "Pipeline Value", value: `$${data.summary.totalDealValue.toLocaleString()}` },
  ];

  return (
    <section className="stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Tenant-isolated analytics</p>
          <h2>{user?.role === "admin" ? "Administrative control center" : "Revenue workspace overview"}</h2>
          <p className="muted">
            Each metric and activity item is scoped by `tenantId`, with JWT claims enforcing isolation.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <article key={card.label} className="stat-card">
            <p>{card.label}</p>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>

      <article className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Audit stream</p>
            <h2>Recent activity</h2>
          </div>
        </div>
        <div className="activity-list">
          {data.recentActivity.map((item) => (
            <div key={item._id} className="activity-item">
              <strong>{item.action}</strong>
              <span>{item.userId?.name || "Unknown user"}</span>
              <time>{new Date(item.createdAt).toLocaleString()}</time>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};
