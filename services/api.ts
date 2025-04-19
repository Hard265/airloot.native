import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    timeout: 10000,
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token.access}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await getToken();
            if (token) {
                const response = await axios.post("/token/refresh/", {
                    refresh: token.refresh,
                });
                if (response.status === 200) {
                    const newToken = {
                        access: response.data.access,
                        refresh: response.data.refresh,
                    };
                    await setToken(newToken);
                    api.defaults.headers.common.Authorization = `Bearer ${newToken.access}`;
                    return api(originalRequest);
                }
            }
        }
        return Promise.reject(error);
    },
);

type Token = {
    access: string;
    refresh: string;
    email?: string;
};

export async function getToken(): Promise<Token | null> {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
        return JSON.parse(token);
    }
    return null;
}

export function setToken(token: Token): Promise<void> {
    return SecureStore.setItemAsync("token", JSON.stringify(token)); // Store email along with token
}

export function deleteToken() {
    return SecureStore.deleteItemAsync("token", {
        requireAuthentication: true,
    });
}
export default api;
