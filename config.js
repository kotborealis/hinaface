require('chen.js').env();

module.exports = {
	http: {
		port: process.env.HTTP_PORT || 80
	},
	upload: {
		path: process.env.UPLOAD_PATH || './content',
		public_path: process.env.UPLOAD_PUBLIC_PATH || '/content',
		max_size: process.env.UPLOAD_MAX_SIZE || 500 * 1024 * 1024 // 500 mb
	},
	cleanup: {
		age: process.env.CLEANUP_AGE || 60 * 24 * 10, // 10 days
		interval: process.env.CLEANUP_INTERVAL || 60 * 60, // 1 hour
	}
};