import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import firebase from './Firebase';
import './App.css'
export default function App(props) {
   const [data, setData] = useState([]);
    let db= firebase.firestore().collection("school");    
    
    useEffect(() => {
        console.log('running useeffect');
        let unsubscribe=  db.onSnapshot(getData);
              
        return ()=>{
          unsubscribe();
        }
        
   },[])
  

   function onLogout() {
      // firebase.auth().app.auth().signOut();
      firebase.auth().signOut();
    
   }

   function getData(querySnapShot) {
   let dataArray=[];  
    querySnapShot.forEach((doc)=>{
          //  console.log(doc.data());
           let newData={
               id:doc.id,
               ...doc.data()
           }
           dataArray.push(newData); 
       }); 
       
       setData(dataArray);
   }

    return(
         
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title text-center bg-gradient-primary ">

       <div className="card N shadow p-1 mb-3 bg-white rounded  ">
           <div className="card-body ">
              Disha English Medium School,Ichalkaranji
            </div>
           </div>
            </h3>
          </div>
          <div className="panel-body">
           <div className="d-flex justify-content-between">
            <h4><Link to="/create" className="btn btn-primary">Add Student</Link></h4>
            <h4 className="btn btn-danger" onClick={onLogout}>Logout</h4>
             </div> 

            <table className="table table-stripe table-hover table-bordered shadow-lg p-3 mb-5 bg-white rounded">
              <thead className="thead-dark">
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data,i) =>
                  <tr key={i}>
                  <td>{i+1}</td>
                    <td>  <Link to={`/show/${data.id}`}>{data.Sname}</Link> </td>
                    <td>{data.Raddress}</td>
                    <td>{data.Mno}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
       
    );
}