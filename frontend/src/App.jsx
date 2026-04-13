import { Navigate, Route, Routes } from "react-router-dom";
import { EntityPage } from "./components/EntityPage";
import { Layout } from "./components/Layout";
import { ProtectedRoute, RoleRoute } from "./components/ProtectedRoute";
import { AuditLogsPage } from "./pages/AuditLogsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";

const leadFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email" },
  { name: "company", label: "Company" },
  { name: "source", label: "Source" },
  { name: "status", label: "Status" },
];

const contactFields = [
  { name: "name", label: "Name", required: true },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "company", label: "Company" },
  { name: "title", label: "Title" },
];

const dealFields = [
  { name: "title", label: "Title", required: true },
  { name: "value", label: "Value", type: "number" },
  { name: "stage", label: "Stage" },
  { name: "expectedCloseDate", label: "Expected Close", type: "date" },
];

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route
          path="leads"
          element={<EntityPage title="Lead" endpoint="/crm/leads" fields={leadFields} createPayload={{ status: "new" }} />}
        />
        <Route
          path="contacts"
          element={<EntityPage title="Contact" endpoint="/crm/contacts" fields={contactFields} createPayload={{}} />}
        />
        <Route
          path="deals"
          element={<EntityPage title="Deal" endpoint="/crm/deals" fields={dealFields} createPayload={{ stage: "new" }} />}
        />
        <Route
          path="audit-logs"
          element={
            <RoleRoute roles={["admin", "manager"]}>
              <AuditLogsPage />
            </RoleRoute>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
