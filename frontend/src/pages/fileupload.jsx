/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import S3FileUpload from 'react-s3';
 
//Optional Import
// import reactS3, { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'iaubereatsimages',
    dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIAVJYQSTCNRORFZMUT',
    secretAccessKey: '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',
}

export default function fileupload() {
    const doupload = (events)=>{
        console.log(events.target.files[0])
        S3FileUpload.uploadFile(events.target.files[0], config).then((data)=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
      <div>
        <AppBar/>
        <input type="file" onChange={doupload}/>
      </div>
    );
  }