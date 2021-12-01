import { useEffect, useState } from "react"
import CarCard from "./CarCard"
import axios from 'axios'
import Filter from "./Filter"
export default function CarDetails(){
    const [cars,setCars]=useState([])
    const [isLoading, setIsLoading]= useState(true)
    const [isError,setIsError]= useState(false)
    const [year,setYear]=useState('')
    const [type,setType]= useState('')
    const getCars= ()=>{
        return axios.get('https://json-server-mocker-kittu.herokuapp.com/cars')
    }
    const handleFilter=(filter)=>{
        console.log(filter)
        setYear(filter.year)
        setType(filter.type)
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
            <Filter onSubmit={handleFilter}/>
            {cars.filter((car)=>{
                let showByyear= true
                if(year!==''){
                    showByyear= car.year===year?true:false
                }
                return showByyear
            })
            .filter((car)=>{
                let showByType= true
                if(type!==''){
                    showByType= car.type===type?true:false
                }
                return showByType
            })
            .map((car)=>{
                return <CarCard data={car} key={car.id}/>
            })}
        </div>
    )
}