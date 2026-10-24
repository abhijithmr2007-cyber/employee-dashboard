import React, { useState } from "react";

const initialForm = {
  name: "",
  designation: "",
  location: "",
  salary: "",
};

function EmployeeForm() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setSuccess(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!formElement.reportValidity()) return;
    if (!Number.isFinite(Number(form.salary)) || Number(form.salary) <= 0) {
      return;
    }

    setForm(initialForm);
    setSuccess(true);
  }

  function handleReset() {
    setForm(initialForm);
    setSuccess(false);
  }

  return (
    <section className="form-page">
      <div className="page-heading mb-4">
        <span className="eyebrow">PEOPLE &amp; ORGANIZATION</span>
        <h1 className="display-6 fw-bold mt-2 mb-2">Employee Form</h1>
        <p className="text-secondary mb-0">
          Enter employee details below. This form is for demonstration only.
        </p>
      </div>

      <div className="card form-card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h2 className="h5 mb-1">Employee details</h2>
          <p className="text-secondary small mb-4">
            All fields are required.
          </p>

          {success && (
            <div className="alert alert-success" role="status">
              Employee details submitted successfully. The form has been
              cleared.
            </div>
          )}

          <form onReset={handleReset} onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  autoComplete="name"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  required
                  type="text"
                  value={form.name}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="designation">
                  Designation
                </label>
                <input
                  className="form-control"
                  id="designation"
                  name="designation"
                  onChange={handleChange}
                  required
                  type="text"
                  value={form.designation}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  autoComplete="address-level2"
                  className="form-control"
                  id="location"
                  name="location"
                  onChange={handleChange}
                  required
                  type="text"
                  value={form.location}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="salary">
                  Salary
                </label>
                <div className="input-group">
                  <span className="input-group-text" aria-hidden="true">
                    $
                  </span>
                  <input
                    className="form-control"
                    id="salary"
                    min="0.01"
                    name="salary"
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    required
                    step="any"
                    type="number"
                    value={form.salary}
                  />
                </div>
                <div className="form-text">Enter a positive amount.</div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
              <button className="btn btn-primary px-4" type="submit">
                Submit
              </button>
              <button className="btn btn-outline-secondary px-4" type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EmployeeForm;
