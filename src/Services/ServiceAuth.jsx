

 export const SaveToken = (token) => {
    
    const tokenUser = localStorage.setItem("tokenUser", token);

    return tokenUser;
}

export const GetToken = () => {
    const tokenUser = localStorage.getItem("tokenUser");

    return tokenUser;
}

