import {USERS} from "../constants/actionTypes";
import usersService from "../services/user.service";

export const getUsers = () => async (dispatch) => {
    try {
        const res = await usersService.get_list();
        dispatch({
            type: USERS,
            data: res.data
        });
    } catch(err) {
        console.log(err);
    }
}