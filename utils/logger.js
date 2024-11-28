export function log(message) {
	const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0]; // Format YYYY-MM-DD HH:mm:ss
	console.log(`[${timestamp}] ${message}`);
}

export function warn(message) {
	const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
	console.warn(`[${timestamp}] [WARNING] ${message}`);
}

export function error(message) {
	const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
	console.error(`[${timestamp}] [ERROR] ${message}`);
}
