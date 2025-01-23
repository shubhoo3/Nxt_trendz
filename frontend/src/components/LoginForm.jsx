import { useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate() // Use useNavigate instead of useHistory

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        navigate('/') // Replace history.replace with navigate
    }

    const onSubmitFailure = errorMsg => {
        setShowSubmitError(true)
        setErrorMsg(errorMsg)
    }

    const submitForm = async event => {
        event.preventDefault()
        const userDetails = { username, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            onSubmitSuccess(data.jwt_token)
        } else {
            onSubmitFailure(data.error_msg)
        }
    }

    const renderPasswordField = () => (
        <>
            <label className="text-xs font-bold text-gray-700" htmlFor="password">
                PASSWORD
            </label>
            <input
                type="password"
                id="password"
                className="mt-2 p-3 border border-gray-300 rounded-md text-sm text-gray-700"
                value={password}
                onChange={onChangePassword}
                placeholder="Password"
            />
        </>
    )

    const renderUsernameField = () => (
        <>
            <label className="text-xs font-bold text-gray-700" htmlFor="username">
                USERNAME
            </label>
            <input
                type="text"
                id="username"
                className="mt-2 p-3 border border-gray-300 rounded-md text-sm text-gray-700"
                value={username}
                onChange={onChangeUsername}
                placeholder="Username"
            />
        </>
    )

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen w-11/12 max-w-4xl mx-auto">
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="w-40 mt-12 mb-8 md:hidden"
                alt="website logo"
            />
            <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="w-72 md:w-3/5 max-w-md flex-shrink-0 mb-8"
                alt="website login"
            />
            <form className="flex flex-col items-center p-8 border rounded-lg w-full max-w-sm shadow-lg md:w-80" onSubmit={submitForm}>
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    className="w-48 mb-6 hidden md:block"
                    alt="website logo"
                />
                <div className="w-full mb-6">{renderUsernameField()}</div>
                <div className="w-full mb-6">{renderPasswordField()}</div>
                <button
                    type="submit"
                    className="w-full py-3 text-white bg-blue-600 rounded-lg text-sm font-bold"
                >
                    Login
                </button>
                {showSubmitError && (
                    <p className="mt-2 text-xs text-red-500">{`*${errorMsg}`}</p>
                )}
            </form>
        </div>
    )
}

export default LoginForm
