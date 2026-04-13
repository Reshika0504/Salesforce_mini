const API_BASE_URL = "https://salesforce-mini-backend.onrender.com/api";

export const apiRequest = async (path, options = {}) => {
    const token = localStorage.getItem("crm_token");

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
};
