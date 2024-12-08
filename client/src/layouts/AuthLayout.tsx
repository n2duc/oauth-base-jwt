import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full">
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  )
}

export default AuthLayout