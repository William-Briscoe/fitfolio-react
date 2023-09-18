import { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getUsersWorkouts } from "../../managers/WorkoutManager"

export const Homepage=()=>{
    const [currentUser, setCurrentUser] =useState({})
    const [usersWorkouts, setUsersWorkouts] = useState([])

    useEffect(()=>{
        getCurrentUser().then(data=>{
            setCurrentUser(data)
        })
    }, [])

    useEffect(()=>{
        getUsersWorkouts(currentUser.id).then(data=>{
            setUsersWorkouts(data)
        })
    }, [currentUser])


    return(
        <article className="usersworkouts">
            {
                usersWorkouts.map(workout =>{
                    return <section key={`workout-${workout.id}`} className="workout">
                        <div>{workout.date}</div>
                        <div>{workout.exercise.label}</div>
                        <div>weight: {workout.weight}</div>
                        <div>Reps: {workout.reps_distance}</div>
                        <div>Sets: {workout.sets_time}</div>
                    </section>
                })
            }
        </article>
    )
}