import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import "./FitFolio.css"


export const Fitfolio = () => (
    <>
        <div className="p-3 fitfolio">
            <NavBar />
            <ApplicationViews />
        </div>
        <div className="footer">footer</div>
    </>
)

