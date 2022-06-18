import userService from "../services/user.service";


export const EditUser = (updateUser) => async (dispatch)=>{

    try {

      const res=await userService.edit(updateUser);
      console.log("Result update :",res.data);

      return Promise.resolve(res);  

    }
    catch(err) {

        const errors=err.response;
        console.log("Error from update:",err.response);
        return Promise.reject(errors.data);

    }
}