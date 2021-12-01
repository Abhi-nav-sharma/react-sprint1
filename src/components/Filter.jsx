import { useState } from "react"

export default function Filter({onSubmit}){
    const [state,setState]=useState({
        year:'',
        type:''
    })
    const handleInput=(e)=>{
        let {name,value}=e.target
        setState({...state,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        onSubmit(state)
    }
    return(
        <form onSubmit={handleSubmit}>
            <select name='year' value={state.year} onChange={handleInput}>
                <option value='' key='1'>Show All</option>
                <option value='2019' key='2019'>2019</option>
                <option value='2020' key='2020'>2020</option>
                <option value='2021' key='2021'>2021</option>
            </select>
            <select name='type' value={state.type} onChange={handleInput}>
                <option value='' key='1'>Show All</option>
                <option value='SUV' key='SUV'>SUV</option>
                <option value='Sedan' key='Sedan'>Sedan</option>
                <option value='Hatchback' key='HatchBack'>Hatchback</option>
            </select>
            <input value='Filter' type='submit'></input>
        </form>
    )
}