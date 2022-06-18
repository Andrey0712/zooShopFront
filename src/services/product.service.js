import http from "../http_common";

class ProductsService {
    get_list_prod() {
        return http.get("api/Product/list");
    }
    registerProd(data) {
        return http.post("api/Product/add", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
            
}

export default new ProductsService();