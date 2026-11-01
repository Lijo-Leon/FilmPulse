import { useEffect } from "react";
import { activatePremiumAPI } from "../services/allAPIs";
import { Link } from "react-router-dom";

function PaymentError() {

    return (
        <div className="text-white bg-black min-h-screen text-center pt-30">
            <div>
                <h1 className="text-[180px] mt-15 font1">Payment Error</h1>
                <p className="text-6xl text-[#ccc]/80 -mt-9 font1 tracking-wider" style={{wordSpacing:"2px"}}>Some <span className="text-[cyan]">Error</span> has been occured</p>
                <div className="w-full flex items-center justify-center text-center">
                    <Link to={'/home'}><p className="text-2xl text-[#ccc]/80 font3 mt-9 hover:text-[cyan]/80 transition-all duration-200 hover:border-[c] border-b border-[#ccc] w-55 pb-[5px]" style={{ wordSpacing: "2px" }}>Go to Home Page</p></Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentError;
