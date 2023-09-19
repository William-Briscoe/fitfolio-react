import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Homepage } from "./home/homepage"
import { NewWorkoutForm } from "./workouts/NewWorkoutForm"
import { EditWorkout } from "./workouts/EditWorkoutForm"
import { ManageExercises } from "./exercises/manageExercises"
import { EditExercise } from "./exercises/editExercise"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path='/' element={<Homepage />}/>
                <Route path="/workout/new" element={<NewWorkoutForm/>}/>
                <Route path="/editworkout/:workoutId" element={<EditWorkout/>}/>
                <Route path="/exercises" element={<ManageExercises/>}/>
                <Route path="/editExercise/:workoutId" element={<EditExercise/>}/>
            </Route>
        </Routes>
    </>
}
