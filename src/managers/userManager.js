export const getCurrentUser = ()=>{
    return fetch("http://localhost:8000/users", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    })
        .then(res=>res.json())
}