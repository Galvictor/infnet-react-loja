import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://dummyjson.com",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
    }
);

export const fetchUsers = async (limit = 5, skip = 0) => {
    try {
        const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
        throw error;
    }
};


export const updateUser = async () => {
};

export const deleteUser = async () => {
};

export const login = async (credentials) => {
    try {
        const response = await api.post("/user/login", credentials);
        return response.data;
    } catch (error) {
        console.error("Erro ao logar:", error.message);
        throw error;
    }
};

export const fetchProducts = async (skip = 0, limit = 10) => {
    try {
        const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
        return {
            products: response.data.products,
            total: response.data.total
        };
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        throw error;
    }
};
