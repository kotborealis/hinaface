const config = require('chen.js').config.resolve();
const {promisify} = require('util');
const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
const unlinkAsync = promisify(fs.unlink);
const renameAsync = promisify(fs.rename);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const path = require('path');

http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
	const form = new formidable.IncomingForm();
	form.multiples = true;
	form.hash = 'md5';

	form.parse(req, async (err, fields, files) => {
		const _ = [];
		for(let key in files){
			const file = files[key];

			if(file.size > config.upload.max_size){
				await unlinkAsync(file.path);
				return null;
			}

			const name = file.hash + '.' + file.name.split('.').pop();
			await renameAsync(file.path, path.join(__dirname, config.upload.dir, name));
			_.push(name);
		};

		res.end(JSON.stringify(_.map(name => {
			if(name === null) return name;
			return config.public.path + name;
		})));
	});
}).listen(config.http.port);

const cleanup = async () => {
	const files = await readdirAsync(path.join(__dirname, config.upload.dir));
	files.filter(i => i[0] !== '.').forEach(async file => {
		const file_path = path.join(__dirname, config.upload.dir, file);
		const stats = await statAsync(file_path);
		if(!stats.isFile()){
			return;
		}

		const now = Date.now();
		const endTime = new Date(stats.ctime).getTime() + config.cleanup.age * 1000;

		if(now > endTime){
			await unlinkAsync(file_path);
		}
	});
};

// setInterval(cleanup, config.cleanup.interval * 1000);

process.on('unhandledRejection', console.error.bind(console));