import React,{useState,useEffect,useRef} from 'react'
import firebase from '../Firebase'

const storage =firebase.storage();
const storageRef =storage.ref();
var metadata = {
  contentType: 'image/jpeg'
};


export default  function Create(props) {
  let db = firebase.firestore().collection("school");
    const imgRef = useRef(null);
    let studenObj={}
    const [studentData, setStudentData] = useState({name:' ',address:' ',contact:'',photo:''})
    const [bar, setbar] = useState(0);
    const [state, setstate] = useState(false);


    useEffect(() => {
       console.log('mounted create with useeffect');
       return ()=>{
       } 
     },[])







   function SubmitData(e) {
       e.preventDefault();
      const {Sname,Fname,Mname,
            surName,mt,religion,caste,dob,
            plb,city,tal,dist,Lschool,Foccupation,
         Moccupation,Fincome,Mincome,Raddress,Rno,Mno,Oaddress,Ono,agree1,agree2,bc,lc,
         Scaste,state,uid,Sclass
      
      
               } = e.target.elements;
      let newData ={
                    Sname:Sname.value,
                    Fname:Fname.value,
                    Mname:Mname.value,
                    photo:studentData.photo,
                    surName:surName.value,
                    mt:mt.value,
                    religion:religion.value,
                    caste:caste.value,
                    dob:dob.value,
                    plb:plb.value,
                    city:city.value,
                    tal:tal.value,
                    dist:dist.value,
                    Lschool:Lschool.value,
                    Foccupation:Foccupation.value,
                    Moccupation:Moccupation.value,
                    Fincome:Fincome.value,
                    Mincome:Mincome.value,
                    Raddress:Raddress.value,
                    Rno:Rno.value,
                    Mno:Mno.value,
                    Oaddress:Oaddress.value,
                    Ono:Ono.value,
                    Mno:Mno.value,
                    agree1:agree1.value,
                    agree2:agree2.value,
                    bc:bc.value,
                    lc:lc.value,
                    Scaste:Scaste.value,
                    state:state.value,
                    Sclass:Sclass.value,
                    uid:uid.value
                  } 
     
      
      db.add(newData)
            .then(()=>{ console.log('data is added');
               alert('data is saved');
              props.history.push('/');
            })
            .catch(()=>{ console.log('error occured');
            }) ;
   }  
  
   function onUpload(){
     let file=imgRef.current.files[0];
     
     if(!file){
       alert('please select a file');
      }else{
        
        setstate(true);
      var FileSize = imgRef.current.files[0].size / 1024 / 1024; // in MB

     if (FileSize > 1) {
            alert('File size exceeds 1 MB');
        } else {

          
          
          
      alert('please wait file is uploading ');     
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setbar(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        }
      }, function(error) {
        
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
          
          case 'storage/canceled':
          // User canceled the upload
          break;
          
          
          case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        setStudentData({photo:downloadURL});
      });
    });
  }
  }
   }
   
   
    return (
        <div>
          <div className="card  mt-2  ">
          
              <div className="card-body create-form m-4 shadow-lg p-3 mb-5 bg-white rounded">
                    <form className="form mx-5"  onSubmit={SubmitData}>
                         <div className="form-row">

                         <div className="form-group col-md-6">
                           <label htmlFor="name">Enter UID No.</label>
                           <input type="number" name="uid" className=" form-control" required placeholder="Enter" />                    
                           </div>

                          <div className="form-group col-md-6">
                           <label htmlFor="name">Class</label>
                           <input type="text" name="Sclass" className=" form-control" required placeholder="Enter "/>                    
                          </div>
                           
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Student First  Name</label>
                           <input type="text" name="Sname" className=" form-control" required placeholder="Enter" />                    
                           </div>

                          <div className="form-group col-md-6">
                           <label htmlFor="name">Father's First Name</label>
                           <input type="text" name="Fname" className=" form-control" required placeholder="Enter "/>                    
                          </div>
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's First  Name</label>
                           <input type="text" name="Mname" className=" form-control" required placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name"> Surname</label>
                           <input type="text" name="surName" className=" form-control" required placeholder="Enter "/>                    
                           </div>                          

                           <div className="form-group col-md-3">
                           <label htmlFor="name">Mother Tounge</label>
                           <input type="text" name="mt" className=" form-control" required placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-3">
                           <label htmlFor="name">Religion</label>
                           <input type="text" name="religion" className=" form-control" required placeholder="Enter "/>                    
                           </div>

                           
                           <div className="form-group col-md-3">
                           <label htmlFor="name">Caste</label>
                           <input type="text" name="caste" className=" form-control" required placeholder="Enter "/>                    
                           </div>
                            
                            <div className="form-group col-md-3">
                           <label htmlFor="name">Sub Caste</label>
                           <input type="text" name="Scaste" className=" form-control" required placeholder="Enter "/>                    
                           </div>
                           

                           

                           

                           
                            
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Date Of Birth</label>
                           <input type="date" name="dob" className=" form-control" required placeholder="Enter "/>                    
                           </div>
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Place Of Birth</label>
                           <input type="text" name="plb" className=" form-control" required placeholder="Enter "/>                    
                           </div>
                           
                           
                           <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">City</label>
                           <input type="text" name="city" className=" form-control" required placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">Tal</label>
                           <input type="text" name="tal" className=" form-control" required placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">District</label>
                           <input type="text" name="dist" className=" form-control" required placeholder="Enter "/>                    
                           </div>
                          
                          <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">State</label>
                           <input type="text" name="state" className=" form-control" required placeholder="Enter "/>                    
                           </div>



                           <div className="form-group  col-md-7 mr-auto  ">
                           
                           <label htmlFor="name">Last School Attended (if Any)</label>
                           <input type="text" name="Lschool" className=" form-control" required placeholder="Enter " />                    
                           
                           </div> 
                           
                           
                           
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Father Occupation/Business/Profession</label>
                           <input type="text" name="Foccupation" className=" form-control" required placeholder="Enter "/>                    
                            </div>
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Mother Occupation/Busines/Profession</label>
                           <input type="text" name="Moccupation" className=" form-control" required placeholder="Enter "/>                    
                           </div>                           
                           
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Fathers Annual Income</label>
                           <input type="text" name="Fincome" className=" form-control" required placeholder="Enter "/>                    
                            </div>

                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's Annual Income</label>
                           <input type="text" name="Mincome" className=" form-control" required placeholder="Enter "/>                    
                            </div>


                           <label htmlFor="name">Residential Address</label>
                           <textarea className="form-control " name="Raddress"  required  jplaceholder="enter address" ></textarea>
                            
                            
                            
                                

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Residential Phone No.</label>
                           <input type="number" name="Rno" className=" form-control"   placeholder="Enter "/>                    
                            </div>
                            


                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mobile No.</label>
                           <input type="number" name="Mno" className=" form-control" required  placeholder="Enter "/>                    
                            </div>

                            

                            <div className="form-group col-md-6">
                            
                           <label htmlFor="name">Office Address</label>
                           <textarea className="form-control " name="Oaddress"  placeholder="enter address" ></textarea>
                            
                            
                            </div>

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Office Phone No</label>
                           <input type="number" name="Ono" className=" form-control" placeholder="Enter "/>                    
                            </div>

 
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck" name="agree1" value="agree1" required />
                              <label className="custom-control-label" htmlFor="customCheck">i agree to abide by the rules and regulations of the school</label>
                             </div>
                          
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" name="agree2" value="agree2" required  />
                              <label className="custom-control-label" htmlFor="customCheck1">i certify that above statement is correct to the best of my knowledge and belief.</label>
                             </div>



                            <div className="form-group col-md-12">
                            
                        
                          

                      
                       
                        <div className="input-group-text mt-2 "> The Original Birth Certificate is attatched yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="bc" value="yes"  required/>yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="bc" value="no" required />No
                          </label>
                       </div>
                      </div>
                            </div>

                            <div className="form-group col-md-12">
                            
                        <div className="input-group-text mt-2 "> Leaving Certificate and Evaluation Result is attached: yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="lc" value="yes"  required />yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="lc" value="no" required />No
                          </label>
                       </div>
                      </div>

                            </div>





{/* 
                           <label htmlFor="name">Address</label>
                           <textarea className="form-control " name="address"  placeholder="enter address" ></textarea>
                           <label htmlFor="name">Contact</label>
                           <input type="number" name="contact" className="form htmlForm-control" placeholder="Enter Contact"/>                     */}
                                    
                           
                            <div className="form-group col-md-12">
                            
                            <label htmlFor="photo">Upload a Photo</label>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" ref={imgRef}  id="inputGroupFile02" required/>
                                  <label className="custom-file-label"   aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                  <button className="btn btn-primary " type="button" disabled={state} onClick={onUpload} id="inputGroupFileAddon02">Upload</button>
                                 </div>
                              </div>

                           <div className="progress">
                               <div className="progress-bar progress-bar-striped" role="progressbar" style={{width:bar*15}} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{bar}%</div>
                             </div>
  
                            </div>
                        
                           <div className="text-center mt-4">
                            <button  type="submit" disabled={!studentData.photo} className="btn btn-primary ">Submit</button>

                           </div>
                         </div>
                    </form> 
              </div> 
          </div>
        </div>
    ); 
}