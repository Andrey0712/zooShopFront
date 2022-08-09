import http from "../http_common";

class CheckOut {

    add(data) {
        console.log("servise", data);
        return http.post("api/orders/add", data);
    }
}
export default new CheckOut();