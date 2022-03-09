const express = require("express");
const fs = require("fs");

const app = express();

if (!process.env.PORT) {
    throw new Error("환경 변수 PORT가 설정되지 않았습니다.");
}

const PORT = process.env.PORT;

app.get("/video", (req, res) => {

    //
    // Original video from here:
    // https://sample-videos.com
    //
    const path = "../videos/SampleVideo_1280x720_1mb.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}, point your browser at http://localhost:3000/video`);
});
