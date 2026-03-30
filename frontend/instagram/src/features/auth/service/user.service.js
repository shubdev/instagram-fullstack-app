import axios from "axios";

export const register = async () => {

    const response = await axios.post("http://localhost/api/auth/register", {
        username, email, fullname, password
    }, { withCredentials: true })
    //withcredentials: true - “withCredentials: true is used in HTTP requests to include cookies or authentication credentials, especially in cross-origin requests. It is commonly used for session-based authentication where cookies need to be sent from the frontend to the backend.”

    return response.data
}


export async function login({ usernameOrEmail, password }) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(usernameOrEmail)
    const payload = { password }


    if (isEmail) {
        payload.email = usernameOrEmail
    } else {
        payload.username = usernameOrEmail
    }

    const response = await axios.post("http://localhost:3000/api/auth/login", payload, { withCredentials: true })

    return response.data
}

export async function getMe() {

    const response = await axios.get("http://localhost:3000/api/auth/me", { withCredentials: true })

    const data = response.data

    return data
}
