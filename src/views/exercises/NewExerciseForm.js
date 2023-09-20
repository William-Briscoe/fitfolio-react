import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getExerciseTypes, createExercise } from "../../managers/ExerciseManager"

export const NewExerciseForm = () => {
    const navigate = useNavigate()
    const { exerciseId } = useParams()
    const newTypesArray = []
    const [loading, setloading] = useState(true)
    const [exerciseTypes, setExerciseTypes] = useState([])
    const [checkedState, setCheckedState] = useState([])
    const [currentExercise, setCurrentExercise] = useState({
        label: '',
        exercise_types: []
    })

    useEffect(() => {

        getExerciseTypes().then(data => {
            setExerciseTypes(data)
        })
        
        .then(setTimeout(() => {
            setloading(false)
        }, 1000))
        
    }, [])

    useEffect(()=>{
        if((exerciseTypes.length != 0) ){
            if(checkedState.length == 0){
                //debugger
                setCheckedState(new Array(exerciseTypes.length).fill(false))
                console.log(checkedState)
            } else {
            }
        }else{
            getExerciseTypes().then(data => {
                setExerciseTypes(data)
        })
    }}, [exerciseTypes])


    const changeChecked = (position) => {
        const updatedCheckedState = checkedState.map((type, index) =>
            index === position ? !type : type
        )

        setCheckedState(updatedCheckedState)
    }


    const changeExerciseState = (domEvent) => {
        const copy = { ...currentExercise }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentExercise(copy)
    }

    const handleSubmit = ()=>{
        const finalTypesArray = []

        checkedState.map((state, index)=>{
            if(state === true){
                finalTypesArray.push((index + 1))
            }
            return null
        })

        const newExercise = {
            label: currentExercise.label,
            exercise_types: finalTypesArray
        }

        createExercise(newExercise)
        

    }



    return (
        <>
            {
                (localStorage.getItem('fit_staff')) ?
                    <>
                        {
                            loading ? <div>Loading...</div>
                            :
                            <form className="editExerciseForm">
                        <fieldset className="edit-title">
                            <div className="form-group">
                                <label htmlFor="label">Exercise Name: </label>
                                <input type="text" name="label"
                                    value={currentExercise.label}
                                    onChange={changeExerciseState} />
                            </div>
                        </fieldset>
                        <fieldset className="edit-types">
                            <div>Select your tags for this exercise:</div>
                            <ul className="tpyes-boxes">
                                {
                                    exerciseTypes.map(type => {
                                        return (<li key={type.id}>
                                            <input 
                                            name="exercise_type" 
                                            type="checkbox" 
                                            checked={checkedState[(type.id - 1)]}
                                            onChange={()=>{changeChecked((type.id - 1))}} />
                                            <label htmlFor="type-label">{type.label}</label>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                        </fieldset>
                        <button onClick={(e)=>{
                            e.preventDefault()
                            handleSubmit()
                            
                            navigate({ pathname: `/exercises` })
                        }}>Submit</button>
                    </form>
                        }
                    </>
                    :
                    <div>404 go away</div>
            }
        </>
    )
}