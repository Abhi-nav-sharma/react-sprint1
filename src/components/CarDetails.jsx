import { useEffect, useState } from "react"

export default function CarDetails(){
    const [cars,setCars]=useState([])
    const [isLoading, setIsLoading]= useState(false)
    const getCars= ()=>{
        return axios.get('https://json-server-mocker-kittu.herokuapp.com/cars')
    }
    useEffect(()=>{
        getCars()
        .then((res)=>{
            console.log(res)
            setCars(res)
        })
    })
    return(
        <div>

        </div>
    )
}