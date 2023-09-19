export const getUsersWorkouts = (userId)=>{
    return fetch(`http://localhost:8000/workouts?user=${userId}`, {
        headers: {
            "Authorization": `token ${localStorage.getItem("fit_token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleWorkout = (id) =>{
    return fetch(`http://localhost:8000/workouts/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    })
    .then(response =>response.json())
}

export const createWorkout = (workout)=>{
    return fetch("http://localhost:8000/workouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        },
        body: JSON.stringify(workout)
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Failed to create workout")
        }
        else{
        return response.json()}
    })
}

export const updateWorkout = (workout, id) =>{
    return fetch(`http://localhost:8000/workouts/${id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        },
        body: JSON.stringify(workout)
    })
    .then(response => {
        console.log("API Response:", response)
        response.json()})
}


export const deleteWorkout = (id) =>{
    return fetch(`http://localhost:8000/workouts/${id}`,{
        method: 'DELETE',
        headers: {
            "Authorization": `Token ${localStorage.getItem("fit_token")}`
        }
    }).then(res=>res.json())
}