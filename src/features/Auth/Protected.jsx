import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Utils/AuthSlice";

function Protected(props) {
    const dispatch = useDispatch();
    const store_token = useSelector((state) => state.auth.JWTtoken);
    const storage_token = localStorage.getItem("token");

    if(!store_token) {
        const user = {
            name : localStorage.getItem('name'),
            email : JSON.parse(storage_token).email,
            token : localStorage.getItem('encodedToken'),
            id : JSON.parse(storage_token).id
        }
        dispatch(setCredentials(user));
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default Protected;
