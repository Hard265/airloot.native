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

// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const token = await SessionStore.prototype.getToken();
//             if (token) {
//                 const response = await axios.post("/token/refresh/", {
//                     refresh: token.refresh,
//                 });
//                 if (response.status === 200) {
//                     const newToken = {
//                         access: response.data.access,
//                         refresh: response.data.refresh,
//                     };
//                     await SessionStore.prototype.setToken(newToken);
//                     api.defaults.headers.common.Authorization = `Bearer ${newToken.access}`;
//                     return api(originalRequest);
//                 }
//             }
//         }
//         return Promise.reject(error);
//     },
// );
export default api;

async function getToken(): Promise<{ access: string; refresh: string } | null> {
    const token = await SecureStore.getItemAsync("token");
    return token ? JSON.parse(token) : null;
}
