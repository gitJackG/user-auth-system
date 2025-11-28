import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="notfound-container">
            <div className="notfound-card">
                <h1 className="notfound-title">404</h1>
                <p className="notfound-message">Page not found</p>
                <p className="notfound-description">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="notfound-link">
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
