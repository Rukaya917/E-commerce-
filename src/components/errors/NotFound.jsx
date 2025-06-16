import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


function NotFound() {
    return (
        <div className="loadingM">
            <div style={{textAlign: "center"}}>
                <FontAwesomeIcon icon={faFaceFrownOpen} size="7x"/>
                <br /><br />
                <h1>404</h1>
                <br />
                <h3>Page not found <Link to="/" className="text-success fs-4">Back to Home</Link> </h3>
            </div>
        </div>
        );
}

export default NotFound;