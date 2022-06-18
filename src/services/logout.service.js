export const logoutservice={
    logout
};

function logout(){
    localStorage.removeItem('Current user');
    
}