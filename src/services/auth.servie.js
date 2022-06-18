import http from "../http_common";

class AuthDataService {

    register(data) {
        return http.post("api/account/register", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    login(data){
        return http
            .post("api/account/login", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    }
    googleLogin(data) {
        return http.post("api/account/GoogleExternalLogin", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
     
    
}

export default new AuthDataService();