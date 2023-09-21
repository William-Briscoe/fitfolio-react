import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            {
                (localStorage.getItem("fit_token") !== null) ? <>
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                navigate('/')
                            }}
                        >Home</button>
                    </li>
                    {(localStorage.getItem('fit_staff') !== null) ?
                        <li className="navbar__item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    navigate('/exercises')
                                }}>Exercise Management</button>
                        </li>
                        :
                        <></>
                    }
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("fit_token")
                                localStorage.removeItem("fit_staff")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li></> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
