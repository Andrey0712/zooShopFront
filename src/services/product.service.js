import http from "../http_common";

class ProductsService {
    get_list_prod() {
        return http.get("api/product/list");
    }
    get_rahunok() {
        return http.get("api/product/getfile");
    }
    registerProd(data) {
        return http.post("api/product/add", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    editProd(data) {
        return http.post("api/product/editProduct", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    get_list_prod_search(data) {
        //console.log("hello", data);
        return http.get("api/product/listBySearch?name="+data.product);
    }
    // get_list_prod_category(data) {
    //     console.log("hello", data);
    //     return http.post("api/product/listByCatecory", data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // }
    get_list_prod_category(data) {
        //console.log("category", data.product);
        return http.get("api/product/listByCatecory?name="+data.product);
    }

    del_Prod(data){
        //console.log("service", data.product.id);
        return http
            .post("api/product/delete", data.product.id);
    } 
}

export default new ProductsService();