import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { Footer } from "./components/footer/Footer"
import "./FitFolio.css"


export const Fitfolio = () => (
    <>
        <div>
            <NavBar />
            <div className="fitfolio">
                <ApplicationViews />
            </div>
        </div>
        <Footer/>
    </>
)

