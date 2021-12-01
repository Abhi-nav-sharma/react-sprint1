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
    const [order,setOrder]=useState('')
    const [showBuyForm,setShowBuyForm]= useState(false)
    const [customerName,setCustomerName]= useState('')
    const [customerPh,setCustomerPh]= useState('')
    const [purchaseId,setPurchaseId]=useState('')
    const [success,setSuccess]= useState(false)
    const getCars= ()=>{
        return axios.get('https://json-server-mocker-kittu.herokuapp.com/cars')
    }
    const handleFilter=(filter)=>{
        console.log(filter)
        setYear(filter.year)
        setType(filter.type)
    }
    const handleSort=(val)=>{
        setOrder(val)
    }
    const handlePurchase=(id)=>{
        setShowBuyForm(true)
        setPurchaseId(id)
    }
    const handleName=(e)=>{
        setCustomerName(e.target.value)
    }
    const handlePh = (e)=>{
        setCustomerPh(e.target.value)
    }
    const completePurchase=()=>{
        setIsLoading(true)
        for(let car of cars){
            if(car.id===purchaseId){
                const payload={
                    name:customerName,
                    phone:customerPh,
                    carName: car.name
                }
                const config = {
                    url:'https://json-server-mocker-kittu.herokuapp.com/orders',
                    method:'post',
                    data:payload
                }
                return axios(config)
                .then((res)=>{
                    setIsLoading(false)
                    setSuccess(true)
                })
            }
        }
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
    if(success){
        return(
            <div><h1>Order Complete</h1></div>
        )
    }
    if(showBuyForm){
        return(
            <div>
                Name:<input type='text' placeholder='Enter Name' value={customerName} onChange={handleName}></input><br/>
                Phone Number:<input type='text' placeholder='Enter PhoneNumber' value={customerPh} onChange={handlePh}></input><br/>
                <button onClick={completePurchase}>Buy</button>
            </div>
        )
    }
    return(
        <div>
            <h1>Cars</h1>
            <Filter onSubmit={handleFilter}/>
            Sort By:
            <button onClick={()=>handleSort('asc')}>Price: Low to High</button>
            <button onClick={()=>handleSort('desc')}>Price: High to Low</button>
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
            .sort((a,b)=>{
                if(order==='asc'){
                    return (a.price-b.price)
                }
                else if(order==='desc'){
                    return (b.price-a.price)
                }
            })
            .map((car)=>{
                return <CarCard data={car} key={car.id} clickBuy={handlePurchase}/>
            })}
        </div>
    )
}