import { createRoot } from "react-dom/client"
import "./index.css"
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter } from "react-router-dom"
import { Fitfolio } from "./fitfolio"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Fitfolio/>
    </BrowserRouter>
)
