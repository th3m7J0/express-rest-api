const dotenv = require('dotenv');
// load .env
const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const { parsed: envs } = result;

module.exports = envs;
