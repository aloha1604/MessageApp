
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-type": "application/json",
    },
})

export default {
    getProducts(perPage, page) {
        let data = apiClient.get("/products?_limit=" + perPage + "&_page=" + page);
        console.log(data)
        return data;
    },
    getProduct(id) {
        return apiClient.get("/products/" + id);
    },
    getAllProducts() {
        let data = apiClient.get("/products");
        console.log('dang vao call api')
        console.log(data)
        return data;
    }
};