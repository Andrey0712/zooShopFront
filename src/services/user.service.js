import http from "../http_common";

class UsersService {
    get_list() {
        return http.get("api/account/users");
    }
    del_user(data){
        return http
            .post("api/account/delete", data);
    } 
    edit(data) {
        return http.post("api/account/edit", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
            
}

export default new UsersService();