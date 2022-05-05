const express = require("express");
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config()
const region = process.env.AWS_REGION;

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region
});

const app = express();


if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}


const PORT = process.env.PORT;

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

var bucketParams = {
    Bucket: 'bootstraping-msa',
};


console.log(`Serving videos from S3 Bucket ${bucketParams}.`);


app.get("/video", (req, res) => {
    const videoPath = req.query.path;
    const videoSource = `https://${bucketParams.Bucket}.s3.${region}.amazonaws.com/${videoPath}`
    let videoSize = 0;
    console.log(`Streaming video from path ${videoPath}.`);

    s3.headObject(bucketParams, function (err, data) {
        console.log(data)
        if (err) {
            console.log("버킷 접근 실패")
            res.status(500).send("버킷 접근 실패");
            return;
        } else {
            res.status(200).json({ videoSource })
        }
    });
});


//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online on ${PORT} `);
});
