import express from "express";
import config from "server/config";
import path from "path";
import serveStatic from "serve-static";

const app = express();

app.use(serveStatic("static/", { index: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd() + "/dist/client/client.html"));
});

app.get("/CV", (req, res) => {
    res.sendFile(path.join(process.cwd() + "/dist/cv/cv.html"));
});

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}!`);
});