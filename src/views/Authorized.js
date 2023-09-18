import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => {
  if (localStorage.getItem("fit_token")) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}
