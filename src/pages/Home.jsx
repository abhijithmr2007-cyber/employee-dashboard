import React, { useEffect, useMemo, useState } from "react";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`The server returned status ${response.status}.`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("The employee list could not be read.");
        }

        setEmployees(data);
        setStatus("success");
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(
            "We couldn’t load the employee list. Please check your connection and try again.",
          );
          setStatus("error");
        }
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return employees;

    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query),
    );
  }, [employees, searchTerm]);

  return (
    <section>
      <div className="page-heading mb-4">
        <span className="eyebrow">PEOPLE &amp; ORGANIZATION</span>
        <h1 className="display-6 fw-bold mt-2 mb-2">Employee Dashboard</h1>
        <p className="text-secondary mb-0">
          Browse the employee directory and find a team member.
        </p>
      </div>

      <div className="card dashboard-card border-0 shadow-sm">
        <div className="card-header bg-white border-0 p-3 p-md-4 pb-0">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="h5 mb-1">Employee directory</h2>
              <p className="text-secondary small mb-0">
                {status === "success"
                  ? `${filteredEmployees.length} employee${filteredEmployees.length === 1 ? "" : "s"}`
                  : "Employee contact details"}
              </p>
            </div>
            <div className="search-field">
              <label className="visually-hidden" htmlFor="employee-search">
                Search by name or email
              </label>
              <input
                className="form-control"
                id="employee-search"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name or email"
                type="search"
                value={searchTerm}
              />
            </div>
          </div>
        </div>

        {status === "loading" && (
          <div
            className="d-flex align-items-center justify-content-center gap-3 py-5 text-secondary"
            role="status"
          >
            <span className="spinner-border spinner-border-sm text-primary" />
            <span>Loading employees…</span>
          </div>
        )}

        {status === "error" && (
          <div className="alert alert-warning m-3 mt-4" role="alert">
            {error}
          </div>
        )}

        {status === "success" && (
          <div className="table-responsive mt-3">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-3 ps-md-4" scope="col">
                    ID
                  </th>
                  <th scope="col">Name</th>
                  <th className="pe-3 pe-md-4" scope="col">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="ps-3 ps-md-4 text-secondary">
                      {employee.id}
                    </td>
                    <td className="fw-medium">{employee.name}</td>
                    <td className="pe-3 pe-md-4">
                      <a className="email-link" href={`mailto:${employee.email}`}>
                        {employee.email}
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td className="py-5 text-center text-secondary" colSpan="3">
                      No employees match “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
