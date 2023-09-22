import { useEffect, useState } from "react"
import { deleteExercise, getExercises } from "../../managers/ExerciseManager"
import { useNavigate } from "react-router-dom"

export const ManageExercises = () => {
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getExercises().then(data => {
            setExercises(data)
        })
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])


    const handleDelete = (id) => {
        deleteExercise(id)
            .then((response) => {
                if (response.ok) {
                    getExercises()
                        .then(data => { setExercises(data) })
                } else {
                    console.error("Failed to delete")
                }
            })
    }

    return (
        <>
            {localStorage.getItem("fit_staff") ? (
                <form className="exerciseManagement">
                    {loading ? (
                        <div class="d-flex justify-content-center align-items-center">Loading...</div>
                    ) : (
                        <>
                            <button
                                className="btn btn-success"
                                onClick={() => {
                                    navigate({ pathname: `/exercise/new` })
                                }}
                            >
                                Create an exercise
                            </button>
                            <div className="row">
                                {exercises.map((exercise) => {
                                    return (
                                        <div
                                            key={`exercise-${exercise.id}`}
                                            className="col-md-3 mb-3"
                                        >
                                            <div className="card border d-flex flex-column h-100">
                                                <section className="card-body flex-fill">
                                                    <h4 className="exercise-title">{exercise.label}</h4>
                                                    <div className="exercise-tags">
                                                        Tags:
                                                        {exercise.exercise_types.map((type) => {
                                                            return (
                                                                <div
                                                                    className="exercise-type"
                                                                    key={type.id}
                                                                >
                                                                    {type.label}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            navigate({
                                                                pathname: `/editExercise/${exercise.id}`,
                                                            })
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            handleDelete(exercise.id)
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </section>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </form>
            ) : (
                <div>404 go away</div>
            )}
        </>
    )
}