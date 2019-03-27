import React,{useEffect,useState} from 'react'
import {Link}from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';

import firebase from '../Firebase';
import  '../App.css'

export default function Show(props) {
     console.log(props.match.params.id);
        let refDb= firebase.firestore().collection("school").doc(props.match.params.id);
    const [currentData, setcurrentData] = useState({});

     useEffect(() => {
         refDb.get().then((doc)=>{
             if (doc.exists) {
                 setcurrentData(doc.data()); 
                console.log('exists',doc.data());
                 
             }else{
                 console.log('not exists');
                 
             }
         });       
     },[])
      
    function onDelete(id) {
     let yesOrno= window.confirm('do you want to delete');
     if (yesOrno) {
       
       firebase.firestore().collection("school").doc(props.match.params.id).delete()
       .then(()=>{ 
         console.log('document deleted successfully');
         alert('data is deleted successfully');
         props.history.push('/'); 
        })
        .catch(()=>{
          console.log('error occured');
          
        });
          
      }

      }
 
      function OnPrint(){
        const input = document.getElementById('N');

// html2Canvas(input)
//   .then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//   })
// ;

// html2canvas(input)
//   .then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     console.log(imgData)  ;
    

//     // const pdf = new jsPDF();
//   const pdf = new jsPDF("p", "mm", "a4",true);
//     pdf.addImage(imgData, 'PNG', 0, 0);
//     pdf.save("download.pdf");  
//   });
// ;

  const string =renderToStaticMarkup(<PdfPrint name={currentData.name} address={currentData.address}/>);
  const pdf = new jsPDF("p", "mm", "a4",true);
     

   pdf.fromHTML(string);
  pdf.save("pdf");

// console.log(string);

  // pdf.fromHTML(string, 15, 15, {
  //   'width': 500,
  //   'hight':500
  // }, function (dispose) {
  //   console.log(dispose);
    
  // });
  // pdf.save('thisMotion.pdf');

// html2canvas(document.querySelector('#N'), 
// 								{scale: 0}
// 						 ).then(canvas => {
// 			let pdf = new jsPDF('p', 'mm', 'a4');
// 			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
// 			pdf.save("n.pdf");
// });


  
} 



    return(

 <div className="card bg-light pb-5  shadow-lg p-3 mb-5 bg-light rounded  "  id="N" >
<div className=" card-header d-flex justify-content-between ">
  <div className="">Student Detail</div> 
<Link to="/"><button className="btn btn-primary">Home </button></Link>
  </div>
  <div className="card-body text-center" >
    {/* <h5 className="card-title">Card title</h5> */}
    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}


<div className="my-form"  >
  <div className="my-form-col-1" >
     
  <div>Name :</div>
  <div>Address :</div>
  <div>Contact :</div>
  <div>fee :</div>
  
  </div> 
    <div className="my-form-col-2" >
    <div> <img src={currentData.photo} style={{width:100,height:100}} alt="student img"/></div>
  <div>{currentData.name}</div>
  <div>{currentData.address}</div>
  <div>{currentData.contact}</div>
  <div>data</div>
    </div> 
</div>

 </div>
  <div className="card-footer  d-flex justify-content-around">
    <Link to={`/edit/${props.match.params.id}`} className="btn btn-primary">Edit</Link>
    <button className="btn btn-danger" onClick={()=>{onDelete(props.match.params.id)}}>Delete</button>
    <button className="btn btn-info" onClick={OnPrint}  >Print</button>
  </div>
</div>
    
     ); 
}


function PdfPrint(props) {
    return(
      <div id="print"> 
      <h1>{props.name}</h1>
    <table  style={{color:'red'}}>
<tr>
  <td>Name</td>
  <td>{props.name}</td>
</tr>
  
   </table> 

      </div>
    ); 
}