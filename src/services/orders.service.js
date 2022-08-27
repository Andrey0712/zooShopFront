import http from "../http_common";

class OrdersService {
    get_list() {
        return http.get("api/orders/list");
    }
    checkStatus(data) {
        return http.post("api/orders/changeStatus", data);
    }
    trashStatus(data) {
        return http.post("api/orders/changeStatus", data);
    }
    // listItems(data) {
    //     console.log("listItems servise", data);
    //     return http.post("api/orders/listItemOrder", data);
    // }
    // edit(data) {
    //     return http.post("api/account/edit", data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    // }
            
}

export default new OrdersService();