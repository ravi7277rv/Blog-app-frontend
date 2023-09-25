import { useRouter } from 'next/router';
import React, { createContext, use, useEffect, useState } from 'react'


export const UserContext = createContext();

const UserProvider = ({children}) => {

    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [allowView, setAllowView] = useState(false);
    

    useEffect(() => {

        let user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"))
        if(user)setUserData(user)
            
        if(user)setAllowView(true)
        
        
    },[]);

    function logout(){
        setUserData(null);
        setAllowView(false)
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        router.push("/")
    }

    return(
        <UserContext.Provider value={{
                userData, setUserData, logout, allowView, setAllowView 
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
