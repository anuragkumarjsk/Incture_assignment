import React,{useState,useEffect} from 'react'
import './form.css'
import axios from 'axios'
function ModifyRecords() {
    const [query_name,set_query_name]=useState("")
    const [update,set_update]=useState(false)
    const [data,setdata]=useState({
        name:"", 
        leave_type:"",
        start:Date.now(),
        end:Date.now(), 
        days:0,
        remaining_days:0,
        remarks:""
        })

    let update_rec = () => {
        set_update(true)
        axios.get(`/find/${query_name}`)
        .then((d)=>{  

            console.log("state before",data)
            console.log(d.data)
            var p = {...d.data}
            console.log('data recieved',p)
            setdata(p)
            // setdata(...d.data) 
            if(d.data)
            { set_update(true)}
            else
            { set_update(false)}
     
        })
        .catch((e)=>{
            console.log(e)
        })
        }


    let handle_change =(e)=>{
        set_query_name(e.target.value)
       }

    let handlechange =(e) =>{
        let name = e.target.name;
        let value = e.target.value;
       setdata({...data,[name]:value});   
       }   

       let form_submit=(e)=>{
       axios.put(`/update/${query_name}`,data)
       .then(()=>{console.log('updated successfully')})
       .catch((e)=>{console.log(e)})
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
                    <div className="row" style={{width:"100vw",backgroundColor:"lightblue" }}>
                        <div className="col"><input name="query_name" value={query_name} onChange={handle_change} type="text"/></div>
                        <div className="col"><span>{"<---------"}enter the name of the record to be updated</span></div>
                        <div className="col"><button onClick={update_rec}>update</button></div>
                    </div>
                        {update && <form style={{width:"60vw",backgroundColor:"lightblue" }}>

                        <div>
                        <div>  
                        <label for="name">Name</label>  
                        <input name="name" value={data.name} onChange={handlechange}   type="text" /> 
                        </div>

                        <label for="leave_type">Leave Type</label>
                        <input name="leave_type" value={data.leave_type} onChange={handlechange}   type="text" />
                        </div>
                        {/* <div>from :  <b>{data.start.substring(0,10)}</b> _ to :<b>{data.end.substring(0,10)}</b></div> */}
                        <div>
                        <label for="start">New Start Date</label>
                        <input name="start"  placeholder="yyyy-mm-dd"  value={data.start} onChange={handlechange} type="date" />
                        </div>
                        <div>
                        <label for="end">New End Date</label>
                        <input name="end" placeholder="yyyy-mm-dd" value={data.end} onChange={handlechange} type="date" />
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
                    }
        </div>
    )
}

export default ModifyRecords
