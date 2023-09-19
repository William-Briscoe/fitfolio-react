import { useEffect, useState } from "react"
import { getExercises } from "../../managers/ExerciseManager"
import { useNavigate } from "react-router-dom"

export const ManageExercises = () =>{
    const [exercises, setExercises] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        getExercises().then(data=>{
            setExercises(data)
        })
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])


    return(<>{
        (localStorage.getItem('fit_staff')) ?
        
    
        <form className="exerciseManagement">
            {
                loading ? <div>Loading...</div>
                :
                
                <div>
                    {
                        exercises.map(exercise=>{
                            return(
                                <section key={`exercise-${exercise.id}`} className="exercise">
                                <h4 className="exercise-title">{exercise.label}</h4>
                                <div className="exercise-tags">Tags:
                                {
                                    exercise.exercise_types.map(type=>{
                                        return <div className="exercise-type" key={type.id}>{type.label}</div>
                                    })
                                }
                                </div>
                                
                                <button onClick={()=>{
                                    navigate({ pathname: `/editExercise/${exercise.id}` })
                                }}>Edit</button>
                                <button onClick={()=>{
                                    
                                }}>delete</button>
                            </section>
                            )
                        })
                    }
                </div>
            }
        </form>
        :
        <div>404 go away</div>
        }</>
    )
}