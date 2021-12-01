export default function CarCard(props){
    const {name,type,year,price,image}=props.data
    return(
        <div style={{margin:'20px auto',width:'500px',border:'5px solid lightgray'}}>
            <div style={{display:'flex',flexDirection:'row',
            gap:'20px',padding:'20px'}}>
                <div style={{flexBasis:'150px'}}>
                    <img src= {image} alt='car.png'/>
                </div>
                <div style={{textAlign:'center',flexBasis:'150px'}}>
                    <h3 style={{color:'blue',}}>{name}</h3>
                    <p style={{fontWeight:'500'}}>{type}</p>
                    <p style={{fontWeight:'500',color:'grey'}}>{year}</p>
                </div>
                <div>
                    <h2 style={{color:"green",marginTop:'55px'}}>₹{price}</h2>
                </div>
            </div>
            <div style={{textAlign:'right',borderTop:'1px solid black'}}>
                <button style={{color:'green',backgroundColor:'lightgreen',fontSize:'15px',height:'30px',border:'2px solid green',cursor:'pointer'}}>Buy Now</button>
            </div>
        </div>
    )
}