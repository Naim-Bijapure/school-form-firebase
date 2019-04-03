import React,{useEffect,useState} from 'react'
import {Link}from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import  'jspdf-autotable';

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
    caste:"",
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
    lc:'',
    Scaste:'',
    state:'',
    Sclass:'',
    uid:''
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
        // const input = document.getElementById('N');

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

  // const string =renderToStaticMarkup(<PdfPrint currentData={{...currentData}}/>);
  // const doc = new jsPDF("p", "mm", "a4",true);
  
//  doc.fromHTML(string);

 
 //Change text color
//  doc.save("pdf");
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

 PdfPrint(currentData);
 
} 



    return(

     <div className=" card bg-light pb-5  shadow-lg p-3 mb-5 bg-light rounded  "  id="N" >
        <div className=" card-header d-flex justify-content-between ">
               <div className="">Student Detail</div> 
              <Link to="/"><button className="btn btn-primary">Home </button></Link>
           </div>

  <div className="show-form card-body text-center" >

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
    <div className="mt-2 mr-3 border-bottom ">UID No. :</div>
    <div className="mt-2 mr-3 border-bottom ">Student Class :</div>
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
      <div className="mt-2 mr-5 border-bottom">{currentData.uid}</div> 
      <div className="mt-2 mr-5 border-bottom">{currentData.Sclass}</div> 
      <div className="mt-2 mr-5 border-bottom">{currentData.Sname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Fname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Mname}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.surName}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.mt}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.religion}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.caste }</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.Scaste }</div> 
      <div className="mt-1 mr-5 border-bottom ">{currentData.dob}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.plb}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.city}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.tal}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.dist}</div> 
      <div className="mt-1 mr-5 border-bottom">{currentData.state }</div> 
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


function PdfPrint(currentData) {

 var columns = [
	{ title: "Field", dataKey: "A" },
	{ title: "Details", dataKey: "B" },

];

// var rows = [
// 	{ A: "name", B: `${currentData.Sname}`},
// 	{ A: "Father's name", B: `${currentData.Fname}` }
// ]; 
var rows=[    {A:"1 . First Name :"   ,  B:`${currentData.Sname}`},
    {A:"2. Father' Name :"   ,  B:`${currentData.Fname}`},
    {A:"3. Mother's name :"   ,  B:`${currentData.Mname}`},
    {A:"4. Surname :"   ,  B:`${currentData.surName}`},
    {A:"5. Mother Tongue :"   ,  B:`${currentData.mt}`},
    {A:"6. Religion :"   ,  B:`${currentData.religion}`},
    {A:"7. Caste :"   ,  B:`${currentData.caste}`},
    {A:"8. Sub Caste :"   ,  B:`${currentData.Scaste}`},
    {A:"9. Date of Birth :"   ,  B:`${currentData.dob}`},
    {A:"10. Place Of Birth :"   ,  B:`${currentData.plb}`},
    {A:"11. City :"   ,  B:`${currentData.city}`},
    {A:"12. Tal :"   ,  B:`${currentData.tal}`},
    {A:"13. District :"   ,  B:`${currentData.dist}`},
    {A:"14. State :"   ,  B:`${currentData.state}`},
    {A:"15. Last School Attended :"   ,  B:`${currentData.Lschool}`},
    {A:"16. Father's Profession/Business :"   ,  B:`${currentData.Foccupation}`},
    {A:"17. Mother's Profession/Business :"   ,  B:`${currentData.Moccupation}`},
    {A:"18. Father's Annual Income :"   ,  B:`${currentData.Fincome}`},
    {A:"19. Mother's Annual Income :"   ,  B:`${currentData.Mincome}`},
    {A:"20.Residential Address :"   ,  B:`${currentData.Raddress}`},
    {A:"21. Residential Phone No :"   ,  B:`${currentData.Rno}`},
    {A:"22. Mobile No :"   ,  B:`${currentData.Mno}`},
    {A:"23. Office Address :"   ,  B:`${currentData.Oaddress}`},
    {A:"24. Office Phone No :"   ,  B:`${currentData.Ono}`},
    {A:"25. Original Birth Certificate Attached:",  B:`${currentData.bc}`},
    {A:"26. Original L/C and  Result Attached:"   ,  B:`${currentData.lc}`}
 ]


// var doc = new jsPDF('p', 'pt');
// Document of 210mm wide and 297mm high
// new jsPDF('p', 'mm', [297, 210]);
// Document of 297mm wide and 210mm high
//  var doc= new jsPDF('l', 'mm', [297, 210]);
// Document of 5 inch width and 3 inch high
 var doc = new jsPDF('p', 'mm', 'legal');

doc.addFont('ArialMS', 'Arial', 'normal','Times New Roman');
doc.setFont('Times New Roman');
 
  doc.setFontSize(10);
  doc.setTextColor(40);
  doc.text("DISHA EDUCATIONAL SOCIETY'S", 70, 13);

  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text("Disha English Medium School, Ichalkaranji", 40, 20);
  doc.setFontSize(15);
  doc.setTextColor(40);
  doc.text("Admission form", 80, 25);
 
  doc.setFontSize(13);
  doc.setTextColor(40);
  doc.text("Respected principal,", 10, 30);

   doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text(`Kindly admit my child :-  ${currentData.Sname} ${currentData.Fname}  ${currentData.surName} `, 10, 40);

 doc.setFontSize(14);
  doc.setTextColor(40);
  doc.text(`${currentData.Sclass}  in class`,62 , 45);

 doc.setFontSize(14);
  doc.setTextColor(40);
  
  doc.text(`for the acadmic year ${new Date().getFullYear()} - ${new Date().getFullYear()+1}  `, 60, 50);
 


  doc.setFontSize(15);
  doc.setTextColor(40);
  doc.text(`UID NO : ${currentData.uid}  `, 10, 60);




 
 
  doc.setFontStyle('normal');
  doc.setDrawColor(0);
  doc.setFillColor(0, 0, 0);
  doc.rect(160 ,30, 35, 35);
  
 
  doc.autoTable(columns, rows, {
    startY: doc.autoTableEndPosY() + 70,
    margin: { horizontal: 15 },
    styles: { overflow: 'linebreak',font:'Times New Roman',fontSize:10},
    bodyStyles: { valign: 'top' },
    columnStyles: { email: { columnWidth: 'wrap' } },
    theme: "striped"
  });

  
  doc.save(`${currentData.Sname}.pdf`);
 
}