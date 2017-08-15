const config = require('chen.js').config.resolve();
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
	const form = new formidable.IncomingForm();
	form.multiples = true;
	form.hash = 'md5';

	form.parse(req, (err, fields, files) => {
		const _ = Object.keys(files).map(key => files[key]).map(file => {
			if(file.size > config.upload.max_size){
				fs.unlinkSync(file.path);
				return null;
			}

			const name = file.hash + '.' + file.name.split('.').pop();
			fs.renameSync(file.path, path.join(__dirname, config.upload.dir, name));
			return name;
		});

		res.end(JSON.stringify(_.map(name => {
			if(name === null) return name;
			return config.public.path + name;
		})));
	});
}).listen(config.http.port);