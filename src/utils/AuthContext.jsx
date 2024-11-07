import { useContext, createContext, useState, useEffect } from "react";
import { account } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { ID} from 'appwrite';

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        checkUserStatus()
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true)
        try{
            const response = await account.createEmailPasswordSession
            (
                userInfo.email, 
                userInfo.password
            )
            const accountDetails = await account.get();
            setUser(accountDetails)
        }catch(error){
            console.error(error)
        }
        setLoading(false)
        }

    const logoutUser = async () => {
        await account.deleteSession('current')
        setUser(null)
    }

    const registerUser = async (userInfo) => {
        setLoading(true)

        try{
        const response = await account
        .create
        (
            ID.unique(), 
            userInfo.email, 
            userInfo.password1, 
            userInfo.name
        );
    
        // await account
        // .createEmailPasswordSession
        // (
        //     userInfo.email, 
        //     userInfo.password1
        // )
        // const accountDetails = await account.get();
        //     setUser(accountDetails)
            navigate('/login')
        }catch(error){
            console.error(error)
        }
        setLoading(false)
    }

    const checkUserStatus = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const contextData = {
        user,
        loginUser,
        registerUser,
        logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

// custom hook
export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext