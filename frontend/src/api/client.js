const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = rawApiBaseUrl.endsWith("/api") ? rawApiBaseUrl : `${rawApiBaseUrl}/api`;

export const apiRequest = async (path, options = {}) => {
    const token = localStorage.getItem("crm_token");

    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? {Authorization: `Bearer ${token}`} : {}),
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({message: "Request failed"}));
            throw new Error(error.message || "Request failed");
        }

        return response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error(
                `Cannot reach API at ${API_BASE_URL}. Check frontend VITE_API_BASE_URL and backend server.`
            );
        }

        throw error;
    }
};
