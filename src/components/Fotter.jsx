import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faGoogle, faXTwitter  } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-dark text-success pt-5 pb-4">
            <div className="container">

                <div className="row text-center text-md-start justify-content-center">

                    <div className="col-auto mb-4">
                        <h5 className="text-uppercase fw-bold">ShopEase</h5>
                        <p className="small">Empowering Your Everyday Shopping</p>
                    </div>

                    <div className="d-none d-md-block border-end border-light" style={{ height: "100px", width: "1px" }}></div>

                    <div className="col-auto mb-4" style={{ minWidth: "120px" }}>
                        <h6 className="text-uppercase fw-bold">Shop</h6>
                        <ul className="list-unstyled">
                            <li className="text-light text-decoration-none">Products</li>
                            <li className="text-light text-decoration-none">Categories</li>
                            <li className="text-light text-decoration-none">Best Sellers</li>
                        </ul>
                    </div>

                    <div className="col-auto mb-4" style={{ minWidth: "120px" }}>
                        <h6 className="text-uppercase fw-bold">Company</h6>
                        <ul className="list-unstyled">
                            <li className="text-light text-decoration-none">Help Center</li>
                            <li className="text-light text-decoration-none">Careers</li>
                            <li className="text-light text-decoration-none">Track Order</li>
                        </ul>
                    </div>

                    <div className="col-auto mb-4" style={{ minWidth: "120px" }}>
                        <h6 className="text-uppercase fw-bold">Connect</h6>
                        <ul className="list-unstyled">
                            <li className="text-light text-decoration-none">About Us</li>
                            <li className="text-light text-decoration-none">Careers</li>
                            <li className="text-light text-decoration-none">Blog</li>
                        </ul>
                    </div>

                </div>
                    <hr style={{ borderTop: "1px solid #f8f9fa", opacity: 1, margin: "2rem 0" }}/>

                    <div className="d-flex justify-content-center gap-3 mb-3">
                        <div className="fs-5"><FontAwesomeIcon icon={faFacebook} size="lg"/></div>
                        <div className="fs-5"><FontAwesomeIcon icon={faInstagram} size="lg"/></div>
                        <div className="fs-5"><FontAwesomeIcon icon={faGoogle} size="lg"/></div>
                        <div className="fs-5"><FontAwesomeIcon icon={faXTwitter} size="lg"/></div>
                    </div>
                    <div className="text-center">
                        <p className="mb-0">&copy; 2025 ShopEase. All rights reserved.</p>
                    </div>
            </div>
        </footer>
    )
}

export default Footer;