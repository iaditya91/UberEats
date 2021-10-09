/* eslint-disable */
import React, { useState } from 'react';
import AppBar from '../components/AppBar';
import { uploadFile } from 'react-s3';
import {awsConf} from '../config/awsConfig';

export default function fileupload() {
    const doupload = (events)=>{
        console.log(events.target.files[0])
        uploadFile(events.target.files[0], awsConf).then((data)=>{
            console.log(data.location)
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