import { Link } from "react-router-dom";
import "./ProjectAlert.css";

const ProjectAlert = () => {
    return (
        <div className="project-alert">
            <div className="project-alert-content">
                <span className="project-alert-text">
                    This is a demo project. Do not use real passwords.
                </span>
                <Link to="/disclaimer" className="project-alert-link">
                    Learn More →
                </Link>
            </div>
            <div className="project-alert-content">
                <span className="project-alert-text">
                    Please be aware that if you are opening this for the first time it can take up to a minute to load because the backend is hosted on render free tier.
                </span>
            </div>
        </div>
    );
};

export default ProjectAlert;
