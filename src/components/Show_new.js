import React,{useEffect,useState} from 'react'
import {Link}from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';

import firebase from '../Firebase';
import  '../App.css'

let ObjType ={
    Sname:'',
    Fname:"",
    Mname:"",
    photo:"",
    surName:"",
    mt:"",
    religion:"",
    cast:"",
    dob:"",
    plb:"",
    city:"",
    tal:"",
    dist:"",
    Lschool:"",
    Foccupation:"",
    Moccupation:"",
    Fincome:"",
    Mincome:"",
    Raddress:"",
    Rno:"",
    Mno:"",
    Oaddress:"",
    Ono:"",
    Mno:"",
    agree1:"",
    agree2:"",
    bc: " ",
    lc:''
  } 
export default function Show(props) {

    let refDb= firebase.firestore().collection("school").doc(props.match.params.id);


    const [currentData, setcurrentData] = useState({...ObjType});

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

  const string =renderToStaticMarkup(<PdfPrint currentData={{...currentData}}/>);
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

     <div className=" card bg-light pb-5  shadow-lg p-3 mb-5 bg-light rounded  "  id="N" >
        <div className=" card-header d-flex justify-content-between ">
               <div className="">Student Detail</div> 
              <Link to="/"><button className="btn btn-primary">Home </button></Link>
           </div>

  <div className="NN card-body text-center" >

<div class="container">
 <div className="row">
 <div className="col-9"></div>
   <div className="col-3">
   
   </div> 
 </div>
    <div  style={{ border:'1px solid black' ,position:'absolute' ,right:'8%'}}>
      <img src={currentData.photo.toString()} alt="Student Image" style={{ width:100,height:100}}/>
    </div>
   <div class="row ">
    <div class="col-4 text-nowrap " style={{borderRight:'1px solid black',textAlign:'right'}}>
    <div className="mt-2 mr-3 border-bottom ">First Name :</div>
    <div className="mt-1 mr-3 border-bottom">Father' Name :</div>
    <div className="mt-1 mr-3 border-bottom">Mother's name :</div>
    <div className="mt-1 mr-3 border-bottom">Surname :</div>
    <div className="mt-1 mr-3 border-bottom">Mother Tongue :</div>
    <div className="mt-1 mr-3 border-bottom">Religion :</div>
    <div className="mt-1 mr-3 border-bottom">Caste :</div>
    <div className="mt-1 mr-3 border-bottom">Sub Caste :</div>
    <div className="mt-1 mr-3">Date of Birth :</div>
    <div className="mt-1 mr-3 border-bottom">Place Of Birth :</div>
    <div className="mt-1 mr-3 border-bottom">City :</div>
    <div className="mt-1 mr-3 border-bottom">Tal :</div>
    <div className="mt-1 mr-3 border-bottom">District :</div>
    <div className="mt-1 mr-3 border-bottom">State :</div>
    <div className="mt-1 mr-3 border-bottom">Last School Attended :</div>
    <div className="mt-1 mr-3 border-bottom">Father's Profession/Business :</div>
    <div className="mt-1 mr-3 border-bottom">Mother's Profession/Business :</div>
    <div className="mt-1 mr-3 border-bottom">Father's Annual Income :</div>
    <div className="mt-1 mr-3 border-bottom">Mother's Annual Income :</div>
    <div className="mt-1 mr-3 border-bottom">Residential Address :</div>
    <div className="mt-1 mr-3 border-bottom">Residential Phone No :</div>
    <div className="mt-1 mr-3 border-bottom">Mobile No :</div>
    <div className="mt-1 mr-3 border-bottom">Office Address :</div>
    <div className="mt-1 mr-3 border-bottom">Office Phone No :</div>
    <div className="mt-1 mr-3 border-bottom">Original Birth Certificate Attached :</div>
    <div className="mt-1 mr-3 border-bottom">Original L/C and  Result Attached :</div>
    </div>
    <div class="col-6 col-sm-6 " style={{borderLeft:'1px solid black',position:'relative',left:5}}>
      <div className="mt-2 mr-5 border-bottom">{currentData.Sname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Fname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Mname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.surName}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.mt}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.religion}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.cast }</div> 
      <div className="mt-1 mr-5 border-bottom">{'-'}</div> 
      <div className="mt-1 mr-5 border-bottom   ">{currentData.dob}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.plb}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.city}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.tal}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.dist}</div> 
      <div className="mt-1 mr-5 border-bottom">{'-'}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Lschool}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Foccupation }</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Moccupation}</div> 
      <div className="mt-1 mr-5 border-bottom ">{currentData.Fincome}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Mincome}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Raddress}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Rno}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Mno}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Oaddress}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Ono}</div> 
      <div className="mt-1 mr-5 border-bottom">{ currentData.bc?currentData.bc:'please select the option'}</div> 
      <div className="mt-1 mr-5 border-bottom">{ currentData.lc?currentData.lc:'please select the option'}</div> 
    
    </div>
    
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
    <table id="basic-table" >
  <thead>
    <tr>
      <th>ID</th>
      <th>First name</th>
      <th>Last name</th>
      <th>Email</th>
      <th>Country</th>
      <th>IP-address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="right">1</td>
      <td>Donna</td>
      <td>Moore</td>
      <td>dmoore0@furl.net</td>
      <td>China</td>
      <td>211.56.242.221</td>
    </tr>
    <tr>
      <td align="right">2</td>
      <td>Janice</td>
      <td>Henry</td>
      <td>jhenry1@theatlantic.com</td>
      <td>Ukraine</td>
      <td>38.36.7.199</td>
    </tr>
    <tr>
      <td align="right">3</td>
      <td>Ruth</td>
      <td>Wells</td>
      <td>rwells2@constantcontact.com</td>
      <td>Trinidad and Tobago</td>
      <td>19.162.133.184</td>
    </tr>
    <tr>
      <td align="right">4</td>
      <td>Jason</td>
      <td>Ray</td>
      <td>jray3@psu.edu</td>
      <td>Brazil</td>
      <td>10.68.11.42</td>
    </tr>
    <tr>
      <td align="right">5</td>
      <td>Jane</td>
      <td>Stephens</td>
      <td>jstephens4@go.com</td>
      <td>United States</td>
      <td>47.32.129.71</td>
    </tr>
    <tr>
      <td align="right">6</td>
      <td>Adam</td>
      <td>Nichols</td>
      <td>anichols5@com.com</td>
      <td>Canada</td>
      <td>18.186.38.37</td>
    </tr>
  </tbody>
</table>
      </div>
    ); 
}