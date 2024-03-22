import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./Auth.css"


export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("fit_token", res.token)
                    if (res.is_staff === true) {
                        localStorage.setItem('fit_staff', res.is_staff)
                    }
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleLogin}>
                
                    <div className="col logo">
                        <h1>FitFolio</h1>
                        <h2>Please sign in</h2>
                    </div>
                    <div className="col userinfo">
                        <fieldset>
                            {/* <label htmlFor="inputUsername"> Username: </label> */}
                            <input ref={username} type="username" id="username" className="form-control" placeholder="Username" required autoFocus />
                        </fieldset>
                        <fieldset>
                            {/* <label htmlFor="inputPassword"> Password </label> */}
                            <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                        </fieldset>
                        <fieldset>
                            <button className="sign-in-button" type="submit">Sign In</button>
                        </fieldset>
                    </div>
                
            </form>

            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
