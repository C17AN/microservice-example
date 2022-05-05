const express = require("express");
const http = require("http");
const https = require("https");
const axios = require("axios");
const dotenv = require('dotenv');
const fs = require("fs");
dotenv.config()
const app = express();

//
// Throws an error if the any required environment variables are missing.
//

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts environment variables to globals for convenience.
//
const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => {
    const forwardRequest = await axios.get('http://localhost:5000/video', {
        params: {
            path: "SampleVideo_1280x720_1mb.mp4"
        }
    })
    const { videoSource } = forwardRequest.data

    console.log(videoSource)
    fs.createReadStream(videoSource).pipe(res)
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online`);
});