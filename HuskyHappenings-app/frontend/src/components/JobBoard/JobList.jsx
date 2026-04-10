import React from "react";

function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString();
}

export default function JobList({ jobs }) {
  if (!jobs || jobs.length === 0) {
    return <p className="empty-state">No jobs posted yet.</p>;
  }

  return (
    <div className="job-card-grid">
      {jobs.map((job) => (
        <div className="job-card" key={job.id}>
          <div className="job-card-top">
            <div>
              <h3>{job.title}</h3>
              <p className="job-company">{job.company}</p>
            </div>
            <span className="job-badge">{job.status}</span>
          </div>

          <p className="job-description">
            {job.description || "No description provided."}
          </p>

          <div className="job-meta">
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Method:</strong> {job.applicationMethod}</p>
            {job.contactEmail && <p><strong>Email:</strong> {job.contactEmail}</p>}
            {job.applicationURL && <p><strong>Link:</strong> {job.applicationURL}</p>}
            <p><strong>Deadline:</strong> {formatDateTime(job.deadline)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
