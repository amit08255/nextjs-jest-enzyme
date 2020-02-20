const path = require('path');

//Used to set folders as alias to directly use in nextjs
const nextConfiguration = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    NODE_ENV: process.env.NODE_ENV
  },
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components'); //folder alias 1
    return config;
  }
}

module.exports = nextConfiguration;