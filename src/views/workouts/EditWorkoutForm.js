import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getCurrentUser } from "../../managers/userManager"
import { getExercises } from "../../managers/ExerciseManager"
import { createWorkout, getSingleWorkout, updateWorkout } from "../../managers/WorkoutManager"

export const EditWorkout = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [exercises, setExercises] = useState({})
    const [loading, setloading] = useState(true)
    const { workoutId } = useParams()
    const [isCardio, setIsCardio] = useState(false)
    const [exerciseChosen, setExerciseChosen] = useState(0)


    //object to be sent to api for POST
    const [currentWorkout, setCurrentWorkout] = useState({
        reps_distance: 0,
        sets_time: 0,
        weight: 0,
        exercise: 0
    })

    useEffect(() => {
        setloading(true)
        getCurrentUser().then(data => {
            setCurrentUser(data)
        })
        getExercises().then(data => {
            setExercises(data)
        })
        getSingleWorkout(workoutId).then(data => {
            setCurrentWorkout({
                reps_distance: data.reps_distance,
                sets_time: data.sets_time,
                weight: data.weight,
                exercise: data.exercise.id
            })
        })
        setTimeout(() => {
            setloading(false)
        }, 1000)
    }, [])


    useEffect(() => {
        if(loading === false){
        exercises.map(exercise => {
            if (parseInt(currentWorkout.exercise) === exercise.id) {
                if (exercise.exercise_types.find(e => e.id === 1)) {
                    setIsCardio(true)
                }else{
                    setIsCardio(false)
                }
            }
        })}
    }, [exerciseChosen])


    //function to update current workout with user input
    const changeWorkoutState = (domEvent) => {
        const copy = { ...currentWorkout }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentWorkout(copy)
        if (domEvent.target.name === "exercise") {
            setExerciseChosen(parseInt(domEvent.target.value))
        }
    }



    //**maybe implement a dropdown like this later https://www.robinwieruch.de/react-dropdown/**
    return (
        <form className="workoutform">
            {
                loading ? <div class="d-flex justify-content-center align-items-center">loading...</div>
                    :
                    <>
                        <h2 className="workoutform__title">Edit your workout</h2>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="exercise">Choose your exercise: </label>
                                <select
                                    id="exerciseid"
                                    name="exercise"
                                    value={currentWorkout.exercise}
                                    onChange={changeWorkoutState}
                                >
                                    <option key={0} value={0}>select an exercise</option>
                                    {exercises.map((exercise) => (
                                        <option key={exercise.id} value={exercise.id}>
                                            {exercise.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>
                        {
                            isCardio ?
                                <>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="weight">Weight in lbs: </label>
                                            <input type="number" name="weight"
                                                value={currentWorkout.weight}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="reps_distance">Distance in miles: </label>
                                            <input type="number" name="reps_distance"
                                                value={currentWorkout.reps_distance}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="sets_time">Time in minutes: </label>
                                            <input type="number" name="sets_time"
                                                value={currentWorkout.sets_time}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                </>
                                :
                                <>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="weight">Weight in lbs: </label>
                                            <input type="number" name="weight"
                                                value={currentWorkout.weight}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="reps_distance">Repetitions: </label>
                                            <input type="number" name="reps_distance"
                                                value={currentWorkout.reps_distance}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-group">
                                            <label htmlFor="sets_time">Sets: </label>
                                            <input type="number" name="sets_time"
                                                value={currentWorkout.sets_time}
                                                onChange={changeWorkoutState} />
                                        </div>
                                    </fieldset>
                                </>
                        }
                        <button type="submit"
                            class="btn btn-success"
                            onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                const newWorkout = {
                                    reps_distance: parseInt(currentWorkout.reps_distance),
                                    sets_time: parseInt(currentWorkout.sets_time),
                                    weight: parseInt(currentWorkout.weight),
                                    exercise: parseInt(currentWorkout.exercise)
                                }
                                
                                // Send POST request to your API
                                updateWorkout(newWorkout, workoutId)
                                    .then(() => navigate("/"))
                            }}
                        >Save</button>
                    </>
            }

        </form>
    )
}