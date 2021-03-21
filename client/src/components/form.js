import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './form.css'
function Form() {
    const [data,setdata]=useState({
      name:"", 
      leave_type:"",
      start:Date.now(),
      end:Date.now(), 
      days:0,
      remaining_days:0,
      remarks:""
      })

      
    const form_submit = (e) =>{
        // alert('submitting form ')
        e.preventDefault()
        console.log(data)
        axios.post('/add',data)
        .then(()=>{console.log('successfully added record ')})
        .catch(()=>{console.log('not able to successfully added record ')})

        setdata({
            name:"", 
            leave_type:"",
            start:Date.now(),
            end:Date.now(), 
            days:0,
            remaining_days:0,
            remarks:""}
        )
        // setTimeout(() => {
        //     document.getElementById("show_data").click()
        // }, 1000);

    }

    const handlechange = (e) =>{
     let name = e.target.name;
     let value = e.target.value;

    setdata({...data,[name]:value});
    }


    useEffect(() => {
       
       const date1 = new Date(data.end);
       const date2 = new Date(data.start);
       if(date2 === date1)
       {
        setdata({...data,days:1}) 
       }
       else{
        const diffTime = Math.abs(date1-date2)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setdata({...data,days:diffDays+1}) 
       }
    }, [data.start,data.end])

    
    return (
        <div>
            <form>  
            <div>
            <div>  
            <label for="name">Name</label>  
            <input name="name" value={data.name} onChange={handlechange}   type="text" /> 
            </div>
            <label for="leave_type">Leave Type</label>
            <select name="leave_type" onChange={handlechange}>
                <option value="Paternity">Paternity</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Casual">Casual</option>
                <option value="Earned">Earned</option>
                <option value="Medical">Medical leave</option>
                <option value="Client Holiday">Client Holiday</option>
            </select>
            {/* <input name="leave_type" value={data.leave_type} onChange={handlechange}   type="text" /> */}
            </div>
            <div>
            <label for="start">Start Date</label>
            <input name="start" value={data.start} onChange={handlechange} type="date" />
            </div>
            <div>
            <label for="end">End Date</label>
            <input name="end" value={data.end} onChange={handlechange} type="date" />
            </div>
            <div>
            <label for="days">Days applied </label>
            <input name="days" value={data.days} onChange={handlechange} type="number" disabled />
            </div>
            <div>
            <label for="remaining_days">Balance remaining</label>
            <input name="remaining_days" value={data.remaining_days} onChange={handlechange} type="number" />
            </div>
            <div>
            <label for="remarks">Remarks</label>
            <input name="remarks" value={data.remarks} onChange={handlechange}   type="text" />
            </div>
            <button onClick={(e)=>form_submit(e)}>Submit data</button>
            </form>
        </div>
    )
}

export default Form
