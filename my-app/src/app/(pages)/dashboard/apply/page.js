'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './apply.css';
import './page.css';

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jobId = searchParams.get('jobId');
    if (jobId) {
      fetchJobDetails(jobId);
    }
  }, [searchParams]);

  const fetchJobDetails = async (jobId) => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ jobId: jobId.toString() })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch job details');
      }
      
      setJob(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching job details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!job) {
    return <div className="not-found">Job not found</div>;
  }

  return (
    <div className="apply-container">
      <div className="apply-header">
        <div className="job-overview">
          <div className="company-logo">
            {job.logo ? (
              <img src={job.logo} alt={`${job.company} logo`} />
            ) : (
              <span>{job.company[0]}</span>
            )}
          </div>
          <div className="job-title-section">
            <h1>{job.title}</h1>
            <div className="company-name">{job.company}</div>
            <div className="job-id">#{job.jobId}</div>
          </div>
        </div>
        <div className="job-meta">
          <div className="meta-item">
            <span className="icon">📍</span>
            <span>{job.location}</span>
          </div>
          <div className="meta-item">
            <span className="icon">💼</span>
            <span>{job.jobType}</span>
          </div>
          <div className="meta-item">
            <span className="icon">🏢</span>
            <span>{job.department}</span>
          </div>
          {!job.hideSalary && (
            <div className="meta-item">
              <span className="icon">💰</span>
              <span>${job.salaryMin} - ${job.salaryMax}</span>
            </div>
          )}
        </div>
      </div>

      <div className="apply-content">
        <div className="job-details">
          <section className="detail-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          <section className="detail-section">
            <h2>Requirements</h2>
            <ul className="requirements-list">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </section>

          {job.benefits && (
            <section className="detail-section">
              <h2>Benefits</h2>
              <ul className="benefits-list">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="apply-form-section">
          <div className="apply-card">
            <h2>Apply for this position</h2>
            <form className="apply-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="resume">Resume</label>
                <input type="file" id="resume" accept=".pdf,.doc,.docx" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="coverLetter">Cover Letter (Optional)</label>
                <textarea id="coverLetter" rows="4"></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 