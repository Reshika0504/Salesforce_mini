import { useState } from "react";
import { apiRequest } from "../api/client";
import { useFetch } from "../hooks/useFetch";

const renderCell = (item, field) => {
  const value = item[field];
  if (field === "value") return `$${Number(value || 0).toLocaleString()}`;
  if (typeof value === "object" && value?.name) return value.name;
  return value || "-";
};

export const EntityPage = ({ title, endpoint, fields, createPayload }) => {
  const { data, error, loading, setData } = useFetch(endpoint);
  const [form, setForm] = useState(createPayload || {});
  const [submitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const created = await apiRequest(endpoint, {
        method: "POST",
        body: JSON.stringify(form),
      });
      setData((current) => ({ ...current, items: [created, ...(current?.items || [])] }));
      setForm(createPayload || {});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="panel-grid">
      <article className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Create new</p>
            <h2>{title}</h2>
          </div>
        </div>
        <form className="form-grid" onSubmit={onSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              <input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name] || ""}
                onChange={onChange}
                placeholder={field.placeholder || ""}
                required={field.required}
              />
            </label>
          ))}
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : `Add ${title}`}
          </button>
        </form>
      </article>

      <article className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Paginated records</p>
            <h2>{title} list</h2>
          </div>
          {data?.pagination && <span>{data.pagination.total} total</span>}
        </div>
        {loading ? <p>Loading...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field.name}>{field.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item) => (
                <tr key={item._id}>
                  {fields.map((field) => (
                    <td key={field.name}>{renderCell(item, field.name)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};
