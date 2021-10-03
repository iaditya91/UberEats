/* eslint-disable */
import React, { useState } from 'react';
import { uploadFile } from 'react-s3';

const S3_BUCKET = 'ubereats-store';
const ACCESS_KEY = 'AKIAY2ASLR3QV3TZDHRY';
const SECRET_ACCESS_KEY = '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';
const REGION = 'us-east-1';

const config = {
  bucketName: S3_BUCKET,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
};

const MediaUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default MediaUploader;
