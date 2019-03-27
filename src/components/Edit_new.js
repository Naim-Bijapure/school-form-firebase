import React, { useEffect, useState, useCallback, useRef } from 'react'
import firebase from '../Firebase'


const storage = firebase.storage();
const storageRef = storage.ref();
var metadata = {
    contentType: 'image/jpeg'
};



export default function Edit(props) {
    const [currentData, setcurrentData] = useState({ name: ' ', address: '', contact: '', photo:'' })
    const dbUpdate = firebase.firestore().collection('school').doc(props.match.params.id);
    const imgRef = useRef(null)
    const [bar, setbar] = useState(0);
    const [state, setstate] = useState(false);
    useEffect(() => {
        getCurrentData();

    }, [])





    async function getCurrentData() {

        const doc = await dbUpdate.get();
        
        setcurrentData(doc.data());


    }

    function SubmitData(e) {
        e.preventDefault();
        let { name, address, contact } = e.target.elements;
        let photo=currentData.photo;
        console.log(photo);
        
        dbUpdate.set({
            name: name.value,
            address: address.value,
            contact: contact.value,
            photo:photo

        }).then((doc) => {
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




    return (
        <div>
            <div className="card  shadow-lg p-3 mb-5 bg-white rounded  ">
                <div className="card-body">
                    <form className="form" onSubmit={SubmitData}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className=" form-control"
                            placeholder="Enter Name" required
                            value={currentData.name}
                            onChange={(e) => { setcurrentData({ name: e.target.value }) }}
                        />

                        <label htmlFor="name">Address</label>
                        <textarea className="form-control " name="address"
                            placeholder="enter address"
                            value={currentData.address}
                            onChange={(e) => { setcurrentData({ address: e.target.value }) }}
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

                    </form>
                </div>
            </div>
        </div>
    )
}