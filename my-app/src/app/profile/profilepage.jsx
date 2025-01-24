import React from 'react';
import './profilepage.css';

const ProfilePage = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">Arbeit</div>
        <nav>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Privacy</li>
            <li className="active">Analytics</li>
            <li>Application Forms</li>
            <li>Users</li>
          </ul>
        </nav>
        <button className="pro-btn">Upgrade to PRO Features</button>
        <button className="support-btn">Start 30 Day Free Trial</button>
      </aside>
      <main className="main-content">
        <div className="container">
          <header className="header">
            <button className="unpublish-btn">Unpublish</button>
            <button className="share-btn">Share</button>
            <div className="user-email">dineshkorukonda05@gmail.com</div>
          </header>
          <section className="analytics">
            <h2>Analytics</h2>
            <p>Here's your analytics over the past 30 days</p>
            <div className="analytics-cards">
              <div className="card">
                <h3>Past 30 Days Revenue</h3>
                <p>$0.00 USD</p>
              </div>
              <div className="card">
                <h3>Active Subscribers</h3>
                <p>0</p>
              </div>
              <div className="card">
                <h3>MRR</h3>
                <p>$0.00 USD</p>
              </div>
              <div className="card">
                <h3>Subscribers To Win Back</h3>
                <p>Coming soon</p>
              </div>
            </div>
          </section>
          <section className="overview">
            <h3>Overview</h3>
            <p>No recent transactions</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;