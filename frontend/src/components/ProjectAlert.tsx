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
        </div>
    );
};

export default ProjectAlert;
