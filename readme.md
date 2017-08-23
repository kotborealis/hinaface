![Hinaface](https://raw.githubusercontent.com/kotborealis/hinaface/master/static/hinaface.png)

# Hinaface

Small file upload server for friends and stupid crap. Max file size is 500mb by default.

## Installation

* Install required npm dependencies.
* Configure nginx to proxy some path to `./content` folder
* Configure `public.path` according to previous step
* Configure nginx to proxy some path to server's port (change it in config)
* Configure `public.upload` according to previous step
* Run `npm build` to generate `index.html`
* Run server