# Hinaface

Small file upload server for friends and stupid crap. Max file size is 500mb by default.

## Installation

* Install required npm dependencies.
* Configure nginx to proxy some path to `./content` folder
* Configure `UPLOAD_PUBLIC_PATH` env var in `.env` file according to previous step
* Configure nginx to proxy some path to server's port (change it in config)
* Run server