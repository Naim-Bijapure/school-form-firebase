import React, { useEffect, useState, useCallback, useRef } from 'react'
import moment from 'moment'
import firebase from '../Firebase'


const storage = firebase.storage();
const storageRef = storage.ref();
var metadata = {
    contentType: 'image/jpeg'
};

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
    lc:'',
    dobDay:'',
    dobMonth:'',
    dobYear:'',
    MQualification:'',
    FQualification:''
    
  } 

export default function Edit(props) {

    const [currentData, setcurrentData] = useState({...ObjType})
    const [currentPhoto, setcurrentPhoto] = useState('')
    const dbUpdate = firebase.firestore().collection('school').doc(props.match.params.id);
    const imgRef = useRef(null)
    const [bar, setbar] = useState(0);
    const [state, setstate] = useState(false);
    useEffect(() => {
        getCurrentData();

    }, [])






    async function getCurrentData() {

        const doc = await dbUpdate.get();
        console.log('loaded current data is',doc.data());
        setcurrentPhoto(doc.data().photo);
        setcurrentData(doc.data());


    }

    function SubmitData(e) {
        e.preventDefault();
        let { Sname,Fname,Mname,
            surName,mt,religion,caste,dob,
            plb,city,tal,dist,Lschool,Foccupation,
         Moccupation,Fincome,Mincome,Raddress,Rno,Mno,Oaddress,Ono,agree1,agree2,bc,lc,
         Scaste,state,Sclass,uid,dobDay,dobMonth,dobYear,Adate,MQualification,FQualification
      
      } = e.target.elements;


        let photo=currentData.photo;
        
        let newData ={
            Sname:Sname.value,
            Fname:Fname.value,
            Mname:Mname.value,
            photo:currentPhoto,
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
            uid:uid.value,
            dobDay:dobDay.value,
            dobMonth:dobMonth.value,
            dobYear:dobYear.value,
            Adate:Adate.value,
            MQualification:MQualification.value,
            FQualification:FQualification.value
          } 
         

        
         
        dbUpdate.set({...newData}).then((doc) => {
            console.log('updated successfully');

            props.history.push("/show/" + props.match.params.id)
        })
            .catch(() => {
                console.log('error ');

            });


    }

    function onUpload() {
        let file = imgRef.current.files[0];

        if (!file) {
            alert('please select a file');
        } else {

            setstate(true);
            var FileSize = imgRef.current.files[0].size / 1024 / 1024; // in MB

            if (FileSize > 1) {
                alert('File size exceeds 1 MB');
            } else {





                var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
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
                    }, function (error) {

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
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            // console.log('File available at', downloadURL);
                            
                            // setcurrentData({photo:downloadURL});
                            setcurrentPhoto(downloadURL);
                            console.log(currentPhoto);
                        });
                    });
            }
        }
    }

    function handleChange(e) {
        let name=e.target.name;
        let value= e.target.value
        setcurrentData({[name]:value});         
        
        

    }
                
    function run() {
        console.log(currentPhoto);
         
    }
        


    return (
        <div>
            <div className="card Edit-form  shadow-lg p-3 mb-5 bg-white rounded  ">
                <div className="card-body">

                     <form className="form mx-5"  onSubmit={SubmitData}>
                         <div className="form-row">
                        
                        <div className="form-group col-md-4">
                           <label htmlFor="name">Enter UID No.</label>
                           <input type="number" name="uid" className=" form-control"  value={currentData.uid}  onChange={(e) => {handleChange(e)}} required placeholder="Enter" />                    
                           </div>

                          <div className="form-group col-md-4">
                           <label htmlFor="name">Admission Date.</label>
                           <input type="date" name="Adate" className=" form-control" value={currentData.Adate} disabled={true}  onChange={(e) => {handleChange(e)}} required placeholder="Enter " />                    
                           </div> 

                          <div className="form-group col-md-4">
                           <label htmlFor="name">Class</label>
                           {/* <input type="text" name="Sclass"  value={currentData.Sclass}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                     */}
                           <select className="custom-select" name="Sclass" id="inputGroupSelect01" value={currentData.Sclass}  onChange={(e) => {handleChange(e)}}  >
                               <option selected >Choose...</option>
                                  <option value="Nursery">Nursery</option>
                                  <option value="L.K.G">L.K.G</option>
                                  <option value="U.K.G">U.K.G</option>
                                  <option value="1st">1st</option>
                                  <option value="2nd">2nd</option>
                                  <option value="3rd">3rd</option>
                                  <option value="4th">4th</option>
                                  <option value="5th">5th</option>
                                  <option value="6th">6th</option>
                                  <option value="7th">7th</option>
                                  <option value="8th">8th</option>
                                  <option value="9th">9th</option>
                                  <option value="10th">10th</option>
                                </select>
                          </div>
                           
                            
                           
                           <div className="form-group col-md-4">
                           <label htmlFor="name">Student First  Name</label>
                           <input type="text" name="Sname" value={currentData.Sname}  onChange={(e) => {handleChange(e)}} className=" form-control" required  jplaceholder="Enter"/>                    
                           </div>

                          <div className="form-group col-md-6">
                           <label htmlFor="name">Father's First Name</label>
                           <input type="text" name="Fname" value={currentData.Fname}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                          </div>
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's First  Name</label>
                           <input type="text" name="Mname" value={currentData.Mname}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name"> Surname</label>
                           <input type="text" name="surName" value={currentData.surName}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div>                          

                           <div className="form-group col-md-3">
                           <label htmlFor="name">Mother Tounge</label>
                           <input type="text" name="mt" value={currentData.mt}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-3">
                           <label htmlFor="name">Religion</label>
                           <input type="text" name="religion" value={currentData.religion}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>

                           
                           <div className="form-group col-md-3">
                           <label htmlFor="name">Caste</label>
                           <input type="text" name="caste" value={currentData.caste}  onChange={(e) => {handleChange(e)}} className=" form-control" required  jplaceholder="Enter "/>                    
                           </div>
                           
                           <div className="form-group col-md-3">
                           <label htmlFor="name"> Sub Caste</label>
                           <input type="text" name="Scaste" value={currentData.Scaste}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div>


                           
                            <div className="form-group col-md-3">
                           <label htmlFor="name">Date Of Birth</label>
                           <input type="date" name="dob" value={currentData.dob}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div>

                            <div className="form-group col-md-3">
                            <label htmlFor="name">Date Of Birth (in Words)</label>
                           <input type="text" name="dobDay" value={currentData.dobDay} onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter Day  "/>                    
                           </div>
                           <div className="form-group col-md-3">
                            <label htmlFor="name">Month</label>
                           <input type="text" name="dobMonth" value={currentData.dobMonth}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter Month  "/>                    
                           </div>
                           <div className="form-group col-md-3">
                            <label htmlFor="name">Year</label>
                           <input type="text" name="dobYear" value={currentData.dobYear}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter Year "/>                    
                           </div>

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Place Of Birth</label>
                           <input type="text" name="plb" value={currentData.plb}  onChange={(e) => {handleChange(e)}} className=" form-control" required  placeholder="Enter "/>                    
                           </div>
                           <div className="form-group  col-md-6   ">
                           
                           <label htmlFor="name">Last School Attended (if Any)</label>
                           <input type="text" name="Lschool" value={currentData.Lschool}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter " />                    
                           
                           </div>  
                           
                           <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">City</label>
                           <input type="text" name="city" value={currentData.city}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">Tal</label>
                           <input type="text" name="tal" value={currentData.tal}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">District</label>
                           <input type="text" name="dist" value={currentData.dist}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>

                           <div className="form-group col-md-3 col-sm-3">
                           <label htmlFor="name">State</label>
                           <input type="text" name="state" value={currentData.state}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>                           



                         
                           
                           
                           
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Father Occupation/Business/Profession</label>
                           <input type="text" name="Foccupation" value={currentData.Foccupation}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                            </div>
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Mother Occupation/Busines/Profession</label>
                           <input type="text" name="Moccupation"  value={currentData.Moccupation}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                           </div>                           

                           <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Father's Qualification</label>
                           <input type="text" name="FQualification" className=" form-control" value={currentData.FQualification}  onChange={(e) => {handleChange(e)}} required placeholder="Enter "/>                    
                           </div>

                           <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Mother's Qualification</label>
                           <input type="text" name="MQualification" className=" form-control" value={currentData.MQualification}  onChange={(e) => {handleChange(e)}} required placeholder="Enter "/>                    
                           </div>


                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Fathers Annual Income</label>
                           <input type="text" name="Fincome" value={currentData.Fincome}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                            </div>

                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's Annual Income</label>
                           <input type="text" name="Mincome" value={currentData.Mincome}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                            </div>


                           <label htmlFor="name">Residential Address</label>
                           <textarea className="form-control " name="Raddress" value={currentData.Raddress}  onChange={(e) => {handleChange(e)}}  required placeholder="enter address" ></textarea>
                            
                            
                            
                                

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Residential Phone No.</label>
                           <input type="number" name="Rno" value={currentData.Rno}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                            </div>
                            


                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mobile No.</label>
                           <input type="number" name="Mno" value={currentData.Mno}  onChange={(e) => {handleChange(e)}} className=" form-control" required placeholder="Enter "/>                    
                            </div>

                            

                            <div className="form-group col-md-6">
                            
                           <label htmlFor="name">Office Address</label>
                           <textarea className="form-control " name="Oaddress" value={currentData.Oaddress}  onChange={(e) => {handleChange(e)}}  placeholder="enter address" ></textarea>
                            
                            
                            </div>

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Office Phone No</label>
                           <input type="number" name="Ono" value={currentData.Ono}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                            </div>

 
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck" name="agree1" value="agree1"  onChange={(e) => {handleChange(e)}}  required />
                              <label className="custom-control-label" htmlFor="customCheck">i agree to abide by the rules and regulations of the school</label>
                             </div>
                          
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" name="agree2"  value="agree2"  onChange={(e) => {handleChange(e)}}   required />
                              <label className="custom-control-label" htmlFor="customCheck1">i certify that above statement is correct to the best of my knowledge and belief.</label>
                             </div>



                            <div className="form-group col-md-12">
                            
                        
                          

                      
                       
                        <div className="input-group-text mt-2 "> The Original Birth Certificate is attatched yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="bc" value="yes"  onChange={(e) => {handleChange(e)}} required  />yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="bc" value="no"  onChange={(e) => {handleChange(e)}} required  />No
                          </label>
                       </div>
                      </div>
                            </div>

                            <div className="form-group col-md-12">
                            
                        <div className="input-group-text mt-2 "> Leaving Certificate and Evaluation Result is attached: yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="lc" value="yes"  onChange={(e) => {handleChange(e)}} required />yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="lc" value="no"  onChange={(e) => {handleChange(e)}} required />No
                          </label>
                       </div>
                      </div>

                            </div>





{/* 
                           <label htmlFor="name">Address</label>
                           <textarea className="form-control " name="address"  required placeholder="enter address" ></textarea>
                           <label htmlFor="name">Contact</label>
                           <input type="number" name="contact" className="form htmlForm-control" placeholder="Enter Contact"/>                     */}
                                    
                            <div className="form-group col-md-12">
                            
                           
                            <label htmlFor="photo">Upload a New Photo</label>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                  <input type="file" className="custom-file-input" ref={imgRef}  id="inputGroupFile02" />
                                  <label className="custom-file-label"   aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                  <button className="btn btn-primary " type="button" disabled={state} onClick={onUpload} id="inputGroupFileAddon02">Upload</button>
                                 </div>
                              </div>

                           <div className="progress">
                               <div className="progress-bar progress-bar-striped" role="progressbar" style={{width:bar*10}} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{bar}%</div>
                             </div>
  
                            </div>
                        
                           <div className="text-center mt-4">
                            <button  type="submit" className="btn btn-primary ">Submit</button>
                           

                            
                           </div>
                         </div>
                    </form>
                </div>
            </div>
        </div>
    )
}