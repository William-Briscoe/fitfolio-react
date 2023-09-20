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

export const updateExercise = (exercise, id) =>{
    return fetch(`http://localhost:8000/exercises/${id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        },
        body: JSON.stringify(exercise)
    })
    .then(response => {
        console.log("API Response:", response)
        response.json()})
}



export const getExerciseTypes = () =>{
    return fetch("http://localhost:8000/exerciseTypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    })
        .then(response => response.json())
}