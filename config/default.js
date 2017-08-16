module.exports = {
	http: {
		port: 8088
	},
	public: {
		path: 'http://127.0.0.1:8080/'	
	},
	upload: {
		dir: './content',
		max_size: 500 * 1024 * 1024 // 500 mb
	},
	cleanup: {
		age: 60 * 24 * 4, // seconds
		interval: 60 // seconds
	}
}