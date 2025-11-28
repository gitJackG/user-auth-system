import { Link } from "react-router-dom";
import "./Disclaimer.css";

const Disclaimer = () => {
    return (
        <div className="disclaimer-container">
            <div className="disclaimer-card">
                <h1 className="disclaimer-title">Project Disclaimer</h1>

                <div className="disclaimer-notice">
                    <strong>Important:</strong> This application is for demonstration purposes only.
                </div>

                <p className="disclaimer-intro">
                    This project is a portfolio piece designed to showcase full-stack development skills using the MERN stack (MongoDB, Express, React, Node.js).
                </p>

                <section className="disclaimer-section">
                    <h2 className="disclaimer-subtitle">Security Notice</h2>
                    <ul className="disclaimer-list">
                        <li><strong>Do not use real passwords:</strong> Although it uses industry-standard hashing (Bcrypt), you should treat this as a testing environment.</li>
                        <li><strong>Data Persistence:</strong> Data on this platform may be periodically wiped or reset.</li>
                        <li><strong>No SLA:</strong> There is no guarantee of uptime or service availability.</li>
                    </ul>
                </section>

                <section className="disclaimer-section">
                    <h2 className="disclaimer-subtitle">Features Demonstrated</h2>
                    <ul className="disclaimer-list">
                        <li>Secure Authentication (JWT, HttpOnly Cookies)</li>
                        <li>OAuth Integration (Google, GitHub, Discord, Facebook)</li>
                        <li>Email Verification & Password Reset</li>
                        <li>Session Management</li>
                    </ul>
                </section>

                <Link to="/" className="disclaimer-back-link">
                    ← Back to Application
                </Link>
            </div>
        </div>
    );
};

export default Disclaimer;
