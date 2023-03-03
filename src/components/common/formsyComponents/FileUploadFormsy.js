import React, { useRef } from "react";


function GenericFileUpload({onFileSelectSuccess, onFileSelectError}) {
  
  const fileRef = useRef(null)

  const handleFileInput = (e) => {

    const file = e.target.files[0]

    if(file.size > 20480){
      onFileSelectError({error: "File size cannot exceed 20MB"})
    }
    else{
      onFileSelectSuccess(file)
    }
  }

  return (
    <div className="file-uploader" >
        <input type="file" onChange={(e)=>handleFileInput(e)} />
        {/* <button onClick={e=>fileRef.current && fileRef.current.click()} className="fileUploadButton" /> */}
    </div>
  )
}

export default GenericFileUpload;
