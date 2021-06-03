import React, { useEffect }from "react"
import {getUsers} from "../../store/users"
import { useSelector, useDispatch } from "react-redux"

const Main = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getUsers())
    }, [])

    return (
        <div>
            main page!!!!
        </div>
    )
}


export default Main
