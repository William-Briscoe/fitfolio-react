import { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { deleteWorkout, getUsersWorkouts } from "../../managers/WorkoutManager"
import { useNavigate } from "react-router-dom"
import { getExercises } from "../../managers/ExerciseManager"

export const Homepage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [usersWorkouts, setUsersWorkouts] = useState([])
    const [filteredWorkouts, setFilteredWorkouts] = useState([])
    const [exercises, setExercises] = useState([])
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedExercise, setSelectedExercise] = useState(null)


    const dateOptions = []

    usersWorkouts.map(workout => {
        if (!dateOptions.includes(workout.date)) {
            dateOptions.push(workout.date)
        }
    })

    //here we induce the loading state and grab the current 
    //users user object using the id grabbed from useParams()
    useEffect(() => {
        setLoading(true)
        getCurrentUser().then(data => {
            setCurrentUser(data)
        })
        getExercises().then(data => {
            setExercises(data)
        })
    }, [])


    //use effect to use the user id to fetch this users workouts
    //once the workouts are set we stop loading state
    useEffect(() => {

        if (currentUser.id) {

            getUsersWorkouts(currentUser.id).then(data => {
                let newlyFilteredWorkouts = data

                if (selectedDate) {
                    newlyFilteredWorkouts = newlyFilteredWorkouts.filter(workout => {
                        return workout.date === selectedDate
                    })
                }

                if (selectedExercise) {
                    newlyFilteredWorkouts = newlyFilteredWorkouts.filter(workout => {
                        return workout.exercise.id === parseInt(selectedExercise)
                    })
                }
                setFilteredWorkouts(newlyFilteredWorkouts)
                // setFilteredWorkouts(filteredWorkouts.sort(function(a,b){
                //     var c = new Date(a.date);
                //     var d = new Date(b.date);
                //     return c-d;
                //     }))
                setUsersWorkouts(data)
            })
        }

        setTimeout(() => {
            setLoading(false)

        }, 500)
    }, [currentUser, selectedDate, selectedExercise])



    useEffect(() => {
        console.log('rerender??')
    }, [usersWorkouts])

    const handleDelete = (id) => {
        deleteWorkout(id)
            .then((response) => {
                if (response.ok) {
                    getUsersWorkouts(currentUser.id)
                        .then(data => { setUsersWorkouts(data) })
                } else {
                    console.error("Failed to delete")
                }
            })
    }


    return (
        <article className="p-3">
            {
                loading ? <div>Loading...</div>
                    :
                    <>
                        <button onClick={() => {
                            navigate({ pathname: "/workout/new" })
                        }}>Start a new Workout!</button>
                        <select
                            value={selectedDate || ""}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            <option value="">Filter by Date</option>
                            {dateOptions.map((date) => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedExercise || ''}
                            onChange={(e) => setSelectedExercise(e.target.value)}
                        >
                            <option value="">Filter by Exercise</option>
                            {exercises.map((exercise) => (
                                <option key={exercise.id} value={exercise.id}>
                                    {exercise.label}
                                </option>
                            ))}
                        </select>

                        {
                            filteredWorkouts.map(workout => {
                                let iscardio = false
                                
                                {
                                    exercises.map(exercise => {
                                        if (workout.exercise.id === exercise.id) {
                                            if(exercise.exercise_types.find(e=>e.id === 1)){
                                                iscardio = true
                                            }
                                        }
                                    })
                                }
                                return (
                                    iscardio ? <>
                                        <section key={`workout-${workout.id}`} className="workout">
                                            <div>{workout.date}</div>
                                            <div>{workout.exercise.label}</div>
                                            <div>weight(lbs): {workout.weight}</div>
                                            <div>Distance(miles): {workout.reps_distance}</div>
                                            <div>Time(min): {workout.sets_time}</div>
                                            <button onClick={() => {
                                                navigate({ pathname: `/editworkout/${workout.id}` })
                                            }}>Edit</button>
                                            <button onClick={() => {
                                                handleDelete(workout.id)
                                            }}>delete</button>
                                        </section>
                                    </>
                                        :
                                        <><section key={`workout-${workout.id}`} className="workout">
                                            <div>{workout.date}</div>
                                            <div>{workout.exercise.label}</div>
                                            <div>weight(lbs): {workout.weight}</div>
                                            <div>Reps: {workout.reps_distance}</div>
                                            <div>Sets: {workout.sets_time}</div>
                                            <button onClick={() => {
                                                navigate({ pathname: `/editworkout/${workout.id}` })
                                            }}>Edit</button>
                                            <button onClick={() => {
                                                handleDelete(workout.id)
                                            }}>delete</button>
                                        </section></>
                                )
                            })
                        }
                    </>
            }

        </article>
    )
}