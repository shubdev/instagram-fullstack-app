import { useDispatch } from "react-redux"
import { register, login, getMe } from "../service/user.service.js"
import { setUser } from "../user.slice";

//pure hook ka kam bad frontend me data store karna hay 
//backend se data ko forentend me store kar rahe hay.


export const useUser = () => {

    const dispatch = useDispatch();

    async function handleRegister({ username, email, fullname, password }) {

        const data = await register({ username, email, fullname, password })

        dispatch(setUser(data.user))  //backend se data ko forentend me store kar rahe hay.

    }

    async function handleLogin({ usernameOrEmail, password }) {

        const data = await login({ usernameOrEmail, password })

        dispatch(setUser(data.user))

        return data
    }

    async function handleGetMe() {
        const data = await getMe()
        dispatch(setUser(data.user))
    }


    return { handleRegister, handleLogin, handleGetMe }
}


