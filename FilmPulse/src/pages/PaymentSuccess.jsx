import { useEffect } from "react";
import { activatePremiumAPI } from "../services/allAPIs";
import { Link } from "react-router-dom";

function PaymentSuccess() {

    useEffect(() => {
        const activatePremium = async () => {
            try {
                const token = JSON.parse(sessionStorage.getItem("token"));

                if (!token) return;

                const reqHeader = {
                    Authorization: `Bearer ${token}`
                };

                const response = await activatePremiumAPI(reqHeader);
                console.log("ACTIVATE RESPONSE:", response.data);

                const user = JSON.parse(sessionStorage.getItem("userDetails"));
                user.subscriber = true;
                sessionStorage.setItem("userDetails", JSON.stringify(user));

            } catch (error) {
                console.error("Activate premium failed:", error?.response?.data);
            }
        };

        activatePremium();
    }, []);

    return (
        <div className="text-white bg-black min-h-screen text-center pt-30">
            <div>
                <h1 className="text-[180px] mt-15 font1">Payment Successful</h1>
                <p className="text-6xl text-[#ccc]/80 -mt-9 font1 tracking-wider" style={{ wordSpacing: "2px" }}>You are now a <span className="text-[cyan]">Premium</span> user</p>
                <div className="w-full flex items-center justify-center text-center">
                    <Link to={'/home'}><p className="text-2xl text-[#ccc]/80 font3 mt-9 hover:text-[cyan]/80 transition-all duration-200 hover:border-[c] border-b border-[#ccc] w-55 pb-[5px]" style={{ wordSpacing: "2px" }}>Go to Home Page</p></Link>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
