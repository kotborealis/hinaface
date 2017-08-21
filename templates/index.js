const config = require('chen.js').config.resolve();

const gen = (config) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hinaface</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
<div class="container">
    <div class="jumbotron">
        <h1><img src="./hinaface.png" height="256"/>~</h1>
        <p class="lead">Max upload size is ${config.upload.max_size / 1024 / 1024}MiB</p>
        <form id="upload-form" enctype="multipart/form-data" method="post" action="${config.public.upload}">
            <button id="upload-btn" class="btn" type="button">Select or drop file(s)</button>
            <input type="file" id="upload-input" name="files[]" multiple>
            <input type="submit" value="Submit">
        </form>
        <ul id="upload-filelist"></ul>
    </div>
</div>
</body>
<script src="./index.js"></script>
</html>
`;

console.log("AAAAAA");
require('fs').writeFileSync('./static/index.html', gen(config));