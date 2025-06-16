import React from "react";
import '../assets/styles/FreeShippingNotice.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faCircleCheck} from '@fortawesome/free-solid-svg-icons';


function FreeShippingNotice({mode, cartTotal}) {
    let message = "";
    if (mode === "static") {
        message=(
            <div className="scroll-container" >
                <div className="scroll-text ">
                    <span>
                    <FontAwesomeIcon icon={faTruckFast} className=" me-2"/>
                    Spend $100 to get free shipping
                    </span>
                    <span>
                    <FontAwesomeIcon icon={faTruckFast} className=" me-2"/>
                    Spend $100 to get free shipping
                    </span>
                    <span>
                    <FontAwesomeIcon icon={faTruckFast} className=" me-2"/>
                    Spend $100 to get free shipping
                    </span>
                </div>
            </div>
        );
    }
    else if (mode === "cart"){
        if (cartTotal>=100) {
            message = (
                <span className="fw-bold">
                    <FontAwesomeIcon icon={faCircleCheck} className="me-2" size="lg"/>
                    You got free shipping
                </span>
            )
            
        }
        else {
            const diff = 100-cartTotal;
            message = (
                <span className="fw-bold">
                    <FontAwesomeIcon icon={faTruckFast} className="me-2" size="l"/>
                    Free shipping if you spend ${diff.toFixed(2)} more!
                </span>
            )
        }
    }else if (mode === "shipping") {
        function getShippingFee(cartTotal) {
            return cartTotal < 100 ? 10 : 0;
    }
        const fee = getShippingFee(cartTotal);
        message = fee === 0 ? "FREE": `$${fee}`;
    }
        return (
            <div className=  {`free-shipping ${mode}`} style={{ marginTop: "20px" }}>
                <p>{message}</p>
            </div>
        );
}

export default FreeShippingNotice;