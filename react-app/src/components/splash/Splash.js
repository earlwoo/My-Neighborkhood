import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"



const Splash = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    if (user) {
        history.push("/main")
    }

    return (
        <div>
            Splash Page
        </div>
    )
}


export default Splash
