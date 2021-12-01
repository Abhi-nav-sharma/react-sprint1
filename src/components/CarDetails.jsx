import { useEffect, useState } from "react"
import CarCard from "./CarCard"
import axios from 'axios'
export default function CarDetails(){
    const [cars,setCars]=useState([])
    const [isLoading, setIsLoading]= useState(true)
    const [isError,setIsError]= useState(false)
    const getCars= ()=>{
        return axios.get('https://json-server-mocker-kittu.herokuapp.com/cars')
    }
    useEffect(()=>{
        getCars()
        .then((res)=>{
            setCars(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            setIsError(true)
        })
    },[])
    if(isLoading){
        return(
            <div><h1>...Loading</h1></div>
        )
    }
    if(isError){
        return(
            <div><h1>Sorry, Something went wrong</h1></div>
        )
    }
    return(
        <div>
            <h1>Cars</h1>
            {cars.map((car)=>{
                return <CarCard data={car} key={car.id}/>
            })}
        </div>
    )
}