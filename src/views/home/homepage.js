import { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { getUsersWorkouts } from "../../managers/WorkoutManager"
import { useNavigate } from "react-router-dom"

export const Homepage=()=>{
    const navigate = useNavigate()
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
            <button onClick={()=>{
                navigate({ pathname: "/workout/new" })
            }}>Start a new Workout!</button>
            {
                usersWorkouts.map(workout =>{
                    return <section key={`workout-${workout.id}`} className="workout">
                        <div>{workout.date}</div>
                        <div>{workout.exercise.label}</div>
                        <div>weight: {workout.weight}</div>
                        <div>Reps: {workout.reps_distance}</div>
                        <div>Sets: {workout.sets_time}</div>
                        <button onClick={()=>{
                            navigate({ pathname: `/editworkout/${workout.id}` })
                        }}>Edit</button>
                        <button>delete</button>
                    </section>
                })
            }
        </article>
    )
}