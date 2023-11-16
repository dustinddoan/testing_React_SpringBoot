import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from "../../util/hook";
import { getUserToken } from "../../module/user/userSlice";

const Auth = ({children}) => {
    const navigate = useNavigate();
    const token = useAppSelector(getUserToken);
    console.log('token: ', token)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [navigate, token])


    return (
        <>{token && children}</>
    )
}

export default Auth;