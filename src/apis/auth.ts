import axios from "axios";

// const API_URL = "http://localhost:3000/api/auth";

export const signup = async (name: string, email: string, password: string, role: string, bio: string, skills: string) => {
    try {
        const response = await axios.post(`/api/auth/signup`,
            {
                name,
                email,
                password,
                role,
                bio,
                skills
            }
        );
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`/api/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
      const response = await axios.post(`/api/auth/logout`, {}, { withCredentials: true });
      return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}