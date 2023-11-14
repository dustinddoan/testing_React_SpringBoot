// setup-jest.js (CommonJS syntax)
const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextDecoder, TextEncoder });
