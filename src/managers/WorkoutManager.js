export const getUsersWorkouts = (userId)=>{
    return fetch(`http://localhost:8000/workouts?user=${userId}`, {
        headers: {
            "Authorization": `token ${localStorage.getItem("fit_token")}`
        }
    })
        .then(res => res.json())
}