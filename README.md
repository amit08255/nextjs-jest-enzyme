
<p align="center">

  <h3 align="center">NextJS Sample Project with Jest and Enzyme</h3>

  <p align="center">
    This is simple project designed in NextJS to demonstrate how testing framework Jest can be implemented in NextJS with Enzyme.
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)
* [Setting Module Alias](#setting-module-alias)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)


<!-- ABOUT THE PROJECT -->
## About The Project

This is simple project designed in NextJS to demonstrate how testing framework Jest can be implemented in NextJS with Enzyme. It contains a basic sample test for index route.

### Built With
This project is designed with technologies listed below - 
* [Next.JS](https://nextjs.org)
* [React](https://reactjs.org)
* [Jest](https://jestjs.io)
* [Enzyme](https://airbnb.io/enzyme/)



<!-- GETTING STARTED -->
## Getting Started

First you need to install **NodeJS** and **npm** on your computer.
Then to get started with this project, you just need to clone or download this repository on your computer.


### Installation

1. Clone the repo
```sh
git clone https://github.com/amit08255/nextjs-jest-enzyme.git
```
2. Install NPM packages
```sh
npm install
```



<!-- USAGE EXAMPLES -->
## Usage

To run the project type below command in terminal (starts development server) -
```sh
npm run dev
```

To build the project and start production server use below commands -
```sh
npm run build
```

```sh
npm start
```

To run test with Jest use below command -
```sh
npm run test
```


## Setting Module Alias

If you wish to use module path without absolute file path such as - `../../../components/Homepage`, you need to use module alias. To setup module alias, first create a file - `next.config.js` in project root folder and add module alias like below --

```js
const path = require('path');
//Used to set folders as alias to directly use in nextjs

const nextConfiguration = {

  //set nextjs config, allows you to access NodeJS env parameters with SSR
  publicRuntimeConfig: {
    // Will be available on both server and client
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    NODE_ENV: process.env.NODE_ENV
  },


  //setting up module alias for folders - components, containers and constants
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components'); //folder alias 1
    config.resolve.alias['containers'] = path.join(__dirname, 'containers'); //folder alias 2
    config.resolve.alias['constants'] = path.join(__dirname, 'constants'); //folder alias 3
    return config;
  }
}

module.exports = nextConfiguration;
```

Now setup module alias in `jest.config.js` like below --

```js
module.exports = {
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
    "moduleFileExtensions": [
      "js",
      "jsx",
      "json",
      "node"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "enzyme.js"
    ],
    "moduleNameMapper": {
      "components/(.*)": "<rootDir>/components/$1",
      "containers/(.*)": "<rootDir>/containers/$1",
      "^constants/(.*)": "<rootDir>/constants/$1"
    },
    "testPathIgnorePatterns": ["<rootDir>/.next/", "<rootDir>/node_modules/"]
  }
```

Above config specifies alias for three directories -- `components`, `containers`, and `constants` where alias for `constants` folder works only when path start with `constants`.


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Amit Kumar - [@amit08255](https://twitter.com/amit08255) - amitcute3@gmail.com

Project Link: [https://github.com/amit08255/nextjs-jest-enzyme](https://github.com/amit08255/nextjs-jest-enzyme)

