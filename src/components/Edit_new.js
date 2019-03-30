import React, { useEffect, useState, useCallback, useRef } from 'react'
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
    lc:''
  } 

export default function Edit(props) {

    const [currentData, setcurrentData] = useState({...ObjType})
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
         
        setcurrentData(doc.data());


    }

    function SubmitData(e) {
        e.preventDefault();
        let { Sname,Fname,Mname,
            surName,mt,religion,caste,dob,
            plb,city,tal,dist,Lschool,Foccupation,
         Moccupation,Fincome,Mincome,Raddress,Rno,Mno,Oaddress,Ono,agree1,agree2,bc,lc
      
      } = e.target.elements;

        let photo=currentData.photo;
        
        let newData ={
            Sname:Sname.value,
            Fname:Fname.value,
            Mname:Mname.value,
            photo:currentData.photo,
            surName:surName.value,
            mt:mt.value,
            religion:religion.value,
            cast:caste.value,
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
            lc:lc.value
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
                            
                            setcurrentData({photo:downloadURL});
                            console.log(currentData.photo);
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
        console.log(currentData.photo);
         
    }
        


    return (
        <div>
            <div className="card  shadow-lg p-3 mb-5 bg-white rounded  ">
                <div className="card-body">
                    {/* <form className="form" onSubmit={SubmitData}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className=" form-control"
                            placeholder="Enter Name" required
                            value={currentData.Fname}
                            onChange={(e) => {handleChange(e)}}
                        />

                        <label htmlFor="name">Address</label>
                        <textarea className="form-control " name="address"
                            placeholder="enter address"
                            value={currentData.address}
                            onChange={(e) => {handleChange(e)}}
                            required></textarea>

                        <label htmlFor="name">Contact</label>
                        <input type="number" name="contact" className="form form-control"
                            placeholder="Enter Contact"

                            value={currentData.contact}
                            onChange={(e) => { setcurrentData({ contact: e.target.value }) }}
                            required />

                        <label htmlFor="name">Fee</label>
                        <input type="number" name="fee" className="form form-control" placeholder="Enter fee" required />

                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" ref={imgRef} id="inputGroupFile02" required />
                                <label className="custom-file-label" aria-describedby="inputGroupFileAddon02">Choose file</label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-primary " type="button" disabled={state} onClick={onUpload} id="inputGroupFileAddon02">Upload</button>
                            </div>
                        </div>

                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: bar *15}} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{bar}%</div>
                        </div>



                        <div className="text-center">
                            <button type="submit" disabled={!state} className="btn btn-primary ">Submit</button>
                        </div>

                    </form> */}

                     <form className="form mx-5"  onSubmit={SubmitData}>
                         <div className="form-row">
 
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Student First  Name</label>
                           <input type="text" name="Sname" value={currentData.Sname}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter"/>                    
                           </div>

                          <div className="form-group col-md-6">
                           <label htmlFor="name">Father's First Name</label>
                           <input type="text" name="Fname" value={currentData.Fname}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                          </div>
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's First  Name</label>
                           <input type="text" name="Mname" value={currentData.Mname}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name"> Surname</label>
                           <input type="text" name="surName" value={currentData.surName}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>                          

                           <div className="form-group col-md-4">
                           <label htmlFor="name">Mother Tounge</label>
                           <input type="text" name="mt" value={currentData.mt}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div> 
                           
                           <div className="form-group col-md-4">
                           <label htmlFor="name">Religion</label>
                           <input type="text" name="religion" value={currentData.religion}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>

                           
                           <div className="form-group col-md-4">
                           <label htmlFor="name">Caste</label>
                           <input type="text" name="caste" value={currentData.cast}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>

                           

                           

                           

                           
                            
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Date Of Birth</label>
                           <input type="date" name="dob" value={currentData.dob}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Place Of Birth</label>
                           <input type="text" name="plb" value={currentData.plb}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>
                           
                           
                           <div className="form-group col-md-4 col-sm-4">
                           <label htmlFor="name">City</label>
                           <input type="text" name="city" value={currentData.city}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-4 col-sm-4">
                           <label htmlFor="name">Tal</label>
                           <input type="text" name="tal" value={currentData.tal}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>                           

                            <div className="form-group col-md-4 col-sm-4">
                           <label htmlFor="name">District</label>
                           <input type="text" name="dist" value={currentData.dist}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>

                           <div className="form-group  col-md-7 mr-auto  ">
                           
                           <label htmlFor="name">Last School Attended (if Any)</label>
                           <input type="text" name="Lschool" value={currentData.Lschool}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter " />                    
                           
                           </div> 
                           
                           
                           
                           
                           <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Father Occupation/Business/Profession</label>
                           <input type="text" name="Foccupation" value={currentData.Foccupation}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                            </div>
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Detail's Of Mother Occupation/Busines/Profession</label>
                           <input type="text" name="Moccupation"  value={currentData.Moccupation}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                           </div>                           
                           
                           
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Fathers Annual Income</label>
                           <input type="text" name="Fincome" value={currentData.Fincome}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                            </div>

                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mother's Annual Income</label>
                           <input type="text" name="Mincome" value={currentData.Mincome}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                            </div>


                           <label htmlFor="name">Residential Address</label>
                           <textarea className="form-control " name="Raddress" value={currentData.Raddress}  onChange={(e) => {handleChange(e)}}  placeholder="enter address" ></textarea>
                            
                            
                            
                                

                            <div className="form-group col-md-6">
                           <label htmlFor="name">Residential Phone No.</label>
                           <input type="number" name="Rno" value={currentData.Rno}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
                            </div>
                            


                            
                            <div className="form-group col-md-6">
                           <label htmlFor="name">Mobile No.</label>
                           <input type="number" name="Mno" value={currentData.Mno}  onChange={(e) => {handleChange(e)}} className=" form-control" placeholder="Enter "/>                    
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
                              <input type="checkbox" className="custom-control-input" id="customCheck" name="agree1" value="agree1"  onChange={(e) => {handleChange(e)}}  />
                              <label className="custom-control-label" htmlFor="customCheck">i agree to abide by the rules and regulations of the school</label>
                             </div>
                          
                            <div className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" id="customCheck1" name="agree2"  value="agree2"  onChange={(e) => {handleChange(e)}}   />
                              <label className="custom-control-label" htmlFor="customCheck1">i certify that above statement is correct to the best of my knowledge and belief.</label>
                             </div>



                            <div className="form-group col-md-12">
                            
                        
                          

                      
                       
                        <div className="input-group-text mt-2 "> The Original Birth Certificate is attatched yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="bc" value="yes"  onChange={(e) => {handleChange(e)}}  />yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="bc" value="no"  onChange={(e) => {handleChange(e)}}  />No
                          </label>
                       </div>
                      </div>
                            </div>

                            <div className="form-group col-md-12">
                            
                        <div className="input-group-text mt-2 "> Leaving Certificate and Evaluation Result is attached: yes/no

                           <div className="form-check-inline mx-2 ">
                             <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="lc" value="yes"  onChange={(e) => {handleChange(e)}} />yes
                             </label>
                              </div>
                           <div className="form-check-inline">
                            <label className="form-check-label">
                             <input type="radio" className="form-check-input" name="lc" value="no"  onChange={(e) => {handleChange(e)}} />No
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