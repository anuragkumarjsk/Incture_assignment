import axios from 'axios'
import { json } from 'body-parser'
import React,{useEffect,useState} from 'react'
import './form.css'

function ShowRecords() {
    const [loaded,setloaded]=useState(false)
    const [query_name,set_query_name]=useState("")
    const [database, setdatabase] = useState([
       { name:"",
        leave_type:"",
        start:null,
        end:null, 
        days:0,
        remaining_days:0,
        remarks:""}
    ])


    // const fetch_data=async()=>{
    //     try{
    //       let ref = await fetch('/show')
    //     ref = await ref.json();
    //     console.log(ref)
    //     setdatabase(ref);
    //     }
    //     catch(e){
    //      console.error(e);
    //     } 
    //   }
    //   useMemo(() => {
    //      fetch_data()   
    //   }, [])




    const show_records=async()=>{
        try{
            const data = await axios.get('/show').then((d)=>{
                setdatabase(d)
            })
        }
        catch(e){
            console.log('err' , e)
        }
        setloaded(true)
    }   

    useEffect(() => {
        setloaded(false)
            setTimeout(() => {
            document.getElementById("show_data").click()
        }, 1000);
    }, [])

  

    let handle_change =(e)=>{
     set_query_name(e.target.value)
    }


    let delete_rec = () => {
        axios.delete(`/delete/${query_name}`)
        .then(()=>console.log('deleted record successfully') )
        .then(()=>show_records)
        .catch( e => console.log(e))
       
        setTimeout(() => {
            document.getElementById("show_data").click()
        }, 1000);
        set_query_name('')
    }

    

    return (
        <div>
            <button id="show_data" onClick={show_records}>show data</button>
                    {/* {JSON.stringify(database.data)} */}
                   
                    <table style={{width:"100vw",backgroundColor:"lightblue"}}>
                        <thead>
                        <tr>
                        <th>Name</th>
                        <th>leave type</th>
                        <th>start</th>
                        <th>end</th>
                        <th>days</th>
                        <th>balance</th>
                        <th>remarks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loaded && database.data.map((k,indx)=> (<tr key={indx}>
                            <td>{k.name}</td>
                            <td>{k.leave_type}</td>
                            <td>{k.start.substring(0,10)}</td>
                            <td>{k.end.substring(0,10)}</td>
                            <td>{k.days}</td>
                            <td>{k.remaining_days}</td>
                            <td>{k.remarks}</td>
                            </tr>) )
                        }
                        </tbody>
                    </table>
                    <hr></hr>
                    <div className="row" style={{width:"100vw",backgroundColor:"lightblue" }}>
                        <div className="col"><input name="query_name" value={query_name} onChange={handle_change} type="text"/></div>
                        <div className="col"><span>{"<---------"}enter the name of the record to be deleted</span></div>
                        <div className="col"><button onClick={delete_rec}>delete</button></div>
                    </div>
                    
        </div>
    )
}

export default ShowRecords
