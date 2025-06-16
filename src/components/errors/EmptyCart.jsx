import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping} from '@fortawesome/free-solid-svg-icons';

function EmptyCart() {
    return (
        <div className="bg-light ">
        <span className="fw-bold">
            <FontAwesomeIcon icon={faCartShopping} className="me-2" size="lg"/>
            Your cart is empty
        </span>
    </div>
    );
}

export default  EmptyCart;