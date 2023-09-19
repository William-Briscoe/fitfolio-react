export const getExercises = () => {
    return fetch("http://localhost:8000/exercises", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    })
        .then(response => response.json())
}


export const getSingleExercise = (id) =>{
    return fetch(`http://localhost:8000/exercises/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    })
    .then(response =>response.json())
}