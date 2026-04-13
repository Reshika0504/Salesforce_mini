import { useFetch } from "../hooks/useFetch";

export const AuditLogsPage = () => {
  const { data, error, loading } = useFetch("/audit-logs");

  if (loading) return <p>Loading audit logs...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <article className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Compliance and traceability</p>
          <h2>Audit logs</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Entity</th>
              <th>User</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item._id}>
                <td>{item.action}</td>
                <td>{item.entityType}</td>
                <td>{item.userId?.name || "Unknown"}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
};
