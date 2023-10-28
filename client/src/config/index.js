const environmenUrls = new Map();

environmenUrls.set('localhost', 'http://localhost:8080');

export default environmenUrls.get(window.location.hostname);