
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
  * [Adding Module Alias in Typescript](#adding-module-alias-in-typescript)
* [Module Alias Resolution Fixes](#module-alias-resolution-fixes)
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
* [TypeScript](https://www.typescriptlang.org/)
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


### Adding Module Alias in Typescript

If you wish to use module alias with typescript modules like - server.ts (which uses config file - `server.tsconfig.json`), then you will need to add `paths` in your `tsconfig.json` file like below --

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "esModuleInterop": true,
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "strict": true,
        "outDir": "dist",
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "removeComments": false,
        "preserveConstEnums": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "paths": {
            "components/*": ["./components/*"]
          },
        "typeRoots": ["./node_modules/@types"],
        "lib": ["dom", "es2015", "es2016"]
    },
    "exclude": [
        "node_modules"
      ],
    "include": [
        "server.ts"
    ]
}
```


## Module Alias Resolution Fixes

### Problem
When the directory structure of your Node.js **application** (not library!) has some depth, you end up with a lot of annoying relative paths in your require calls like:
```js
const Article = require('../../../../app/models/article');
```
Those suck for maintenance and they're ugly.

### Possible solutions
Ideally, I'd like to have the same basepath from which I `require()` all my modules. Like any other language environment out there. I'd like the `require()` calls to be first-and-foremost relative to my application entry point file, in my case `app.js`.


### 0. The Alias
1. Install the [module-alias](https://www.npmjs.com/package/module-alias) package:  
    ```
    npm i --save module-alias
    ```

2. Add paths to your `package.json` like this:  
    ```js
    {
        "_moduleAliases": {
            "@lib": "app/lib",
            "@models": "app/models"
        }
    }
    ```

3. In your entry-point file, before any `require()` calls:  
    ```js
    require('module-alias/register')
    ```

4. You can now require files like this:  
    ```js
    const Article = require('@models/article');
    ```


### 1. The Global
1. In your entry-point file, before any `require()` calls:
    ```js
    global.__base = __dirname + '/';
    ```

2. In your very/far/away/module.js:

    ```js
    const Article = require(`${__base}app/models/article`);
    ```


### 2. The Module
1. Install some module:

    ```sh
    npm install app-module-path --save
    ```

2. In your entry-point file, before any `require()` calls:

    ```js
    require('app-module-path').addPath(`${__dirname}/app`);
    ```

3. In your very/far/away/module.js:

    ```js
    const Article = require('models/article');
    ```

Naturally, there are a ton of unmaintained 1-star modules available on npm: [0](https://github.com/patrick-steele-idem/app-module-path-node), [1](https://github.com/Gaafar/pkg-require), [2](https://github.com/oknoorap/global-path), [3](https://github.com/sultan99/sexy-require), [4](https://gitlab.com/jez9999/requirebase), [5](https://github.com/aichholzer/attract)


### 3. The Hack
Courtesy of [@joelabair](https://github.com/joelabair). Effective without the need to specify the `NODE_PATH` outside your application, making it more fool proof. However, since this relies on a private Node.js core method, this is also a hack that might stop working on the previous or next version of node.

In your `app.js`, before any `require()` calls:
```js
process.env.NODE_PATH = __dirname;
require('module').Module._initPaths();
```

### 4. The Wrapper
Courtesy of [@a-ignatov-parc](https://github.com/a-ignatov-parc). Another simple solution which increases obviousness, simply wrap the `require()` function with one relative to the path of the application's entry point file.

Place this code in your `app.js`, again before any require() calls:

```js
global.rootRequire = name => require(`${__dirname}/${name}`);
```

You can then require modules like this:
```js
const Article = rootRequire('app/models/article');
```

Another option is to always use the initial `require()` function, basically the same trick without a wrapper. Node.js creates a new scoped `require()` function for every new module, but there's always a reference to the initial global one. Unlike most other solutions this is actually a documented feature. It can be used like this:
```js
const Article = require.main.require('app/models/article');
```

Since Node.js v10.12.0 there's a `module.createRequireFromPath()` function available in the stdard library:
```js
const { createRequireFromPath } = require('module')
const requireUtil = createRequireFromPath('../src/utils')

requireUtil('./some-tool')
```

### Conclusion
**0. The Alias**  
Great solution, and a well maintained and popular package on npm. The `@`-syntax also looks like something special is going on, which will tip off the next developer whats going on. You might need extra steps for this solution to work with linting and unit testing though.

**1. The Global**  
You're effectively swapping `../../../` for `__base +` which is only slightly better if you ask me. However it's very obvious for the next developer what's exactly happening. That's a big plus compared to the other *magical* solutions around here.

**2. The Module**  
Great and simple solution. Does not touch other require calls to `node_modules`.

**3. The Hack**  
Most simple solution of all. Use at your own risk.

**4. The Wrapper**  
Great and non-hacky solution. Very obvious what it does, especially if you pick the `require.main.require()` one.


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

