import { useEffect } from "react"
import { useLocation } from "react-router"
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Error = () => {
    const location = useLocation()

    //TODO
    //Create an order

    return (
        <div style={{height:"100vh",display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
            Your Order couldn't be processed. Please try again
            <Link className="link" to="/"><button style={{padding:10, marginTop:20}}>Go to Homepage</button></Link>
        </div>
    )
}

export default Error