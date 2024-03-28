import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import "./FitFolio.css"


export const Fitfolio = () => (
    <>
        <div>
            <NavBar />
            <div className="fitfolio">
                <ApplicationViews />
            </div>
        </div>
        <div className="footer">footer</div>
    </>
)

