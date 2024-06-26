import { useEffect, useState } from "react"
import { getCurrentUser } from "../../managers/userManager"
import { deleteWorkout, getUsersWorkouts } from "../../managers/WorkoutManager"
import { useNavigate } from "react-router-dom"
import { getExercises } from "../../managers/ExerciseManager"
import "./homepage.css"

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
                setFilteredWorkouts(newlyFilteredWorkouts.reverse())
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
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <article className="p-3 home">
            {loading ? (
                <div class="d-flex justify-content-center align-items-center">Loading...</div>
            ) : (
                <>
                    <div className="header">

                        <button class= "btn start-workout"
                            onClick={() => {
                                navigate({ pathname: "/workout/new" })
                            }}
                        >
                            Start a new Workout!
                        </button>
                        <div className="filters">
                            <select className="dropdown"
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
                            <select className="dropdown"
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
                        </div>
                    </div>
                    {/* Group workouts by date and display under respective h2 */}
                    {Array.from(new Set(filteredWorkouts.map((workout) => workout.datesplit.month + "/" + workout.datesplit.day + "/" + workout.datesplit.year ))).map((date) => (
                        <div className="date-section" key={date}>
                            <h2>{date}</h2>
                            <div className="row">
                                {filteredWorkouts
                                    .filter((workout) => workout.datesplit.month + "/" + workout.datesplit.day + "/" + workout.datesplit.year === date)
                                    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest to oldest
                                    .map((workout) => {
                                        let iscardio = false

                                        {
                                            exercises.map((exercise) => {
                                                if (workout.exercise.id === exercise.id) {
                                                    if (exercise.exercise_types.find((e) => e.id === 1)) {
                                                        iscardio = true
                                                    }
                                                }
                                            })
                                        }
                                        return (
                                            <div key={`workout-${workout.id}`} className="col-md-4">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{workout.exercise.label}</h5>
                                                        <p className="card-text"><strong>{workout.weight} lbs</strong></p>
                                                        {iscardio ? (
                                                            <>
                                                                <>{workout.reps_distance > 1 ?(
                                                                    <p className="card-text"><strong>{workout.reps_distance} miles</strong> in</p>
                                                                ) : (
                                                                    <p className="card-text"><strong>{workout.reps_distance} mile</strong> in</p>
                                                                )}
                                                                </>
                                                                {workout.sets_time > 1 ? (
                                                                    <p className="card-text"><strong>{workout.sets_time} minutes</strong></p>
                                                                ) : (
                                                                    <p className="card-text"><strong>{workout.sets_time} minute</strong></p>
                                                                )
                                    }
                                                            </>
                                                        ) : (<>
                                                        {workout.sets_time > 1 ? (
                                                                <p className="card-text"><strong>{workout.sets_time} sets</strong> of</p>
                                                            ) : (
                                                                <p className="card-text"><strong>{workout.sets_time} set</strong> of</p>
                                                            )}
                                                            {workout.reps_distance > 1 ? (
                                                                <p className="card-text"><strong>{workout.reps_distance} repitions</strong></p>
                                                            ) : (
                                                                <p className="card-text"><strong>{workout.reps_distance} repition</strong></p>
                                                            )}
                                                            
                                                        </>)}
                                                        <div className="card-actions">
                                                            <button
                                                                className="edit btn"
                                                                onClick={() => {
                                                                    navigate({ pathname: `/editworkout/${workout.id}` })
                                                                }}
                                                            >
                                                                <i class='fa fa-edit'></i>
                                                            </button>
                                                            <button
                                                                className="delete btn"
                                                                onClick={() => {
                                                                    handleDelete(workout.id)
                                                                }}
                                                            >
                                                                <i class="fa fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </article>
    </>)
}