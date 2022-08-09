import http from "../http_common";

class CartService {

    add(data) {
        console.log("serviseCart", data);
        return http.post("api/carts/add", data);
    }

    list() {
        return http.get("api/carts/list");
    }
    plus(data) {
        return http.post("api/carts/quantityPlus", data);
    }
    minus(data) {
        return http.post("api/carts/quantityMinus", data);
    }
    del_cartProd(data){
        return http
            .post("api/carts/delete", data);
    } 
    del_cart(){
        return http
            .post("api/carts/deleteCart");
    } 
}

export default new CartService();