module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/graphpack/config/index.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/config/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const cosmiconfig = __webpack_require__(/*! cosmiconfig */ "cosmiconfig");
const webpack = __webpack_require__(/*! webpack */ "webpack");
const defaultConfig = __webpack_require__(/*! ./webpack.config */ "./node_modules/graphpack/config/webpack.config.js");
const explorer = cosmiconfig('graphpack').search();
const loadServerConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};
  return {
    port: Number(process.env.PORT),
    ...userConfig.server
  };
};
const loadWebpackConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};
  if (typeof userConfig.webpack === 'function') {
    return userConfig.webpack({
      config: defaultConfig,
      webpack
    });
  }
  return {
    ...defaultConfig,
    ...userConfig.webpack
  };
};
exports.loadServerConfig = loadServerConfig;
exports.loadWebpackConfig = loadWebpackConfig;

/***/ }),

/***/ "./node_modules/graphpack/config/webpack.config.js":
/*!*********************************************************!*\
  !*** ./node_modules/graphpack/config/webpack.config.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FriendlyErrorsWebpackPlugin = __webpack_require__(/*! friendly-errors-webpack-plugin */ "friendly-errors-webpack-plugin");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
const webpack = __webpack_require__(/*! webpack */ "webpack");
const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");
const isDev = "development" !== 'production';
const isWebpack = typeof __webpack_require__.m === 'object';
const hasBabelRc = fs.existsSync(path.resolve('babel.config.js'));
if (hasBabelRc && !isWebpack) {
  console.info('🐠 Using babel.config.js defined in your app root');
}
module.exports = {
  devtool: 'source-map',
  entry: {
    // We take care of setting up entry file under lib/index.js
    index: ['graphpack']
  },
  // When bundling with Webpack for the backend you usually don't want to bundle
  // its node_modules dependencies. This creates an externals function that
  // ignores node_modules when bundling in Webpack.
  externals: [nodeExternals({
    whitelist: [/^graphpack$/]
  })],
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.(gql|graphql)/,
      use: 'graphql-tag/loader'
    }, {
      test: /\.(js|ts)$/,
      use: [{
        loader: /*require.resolve*/(/*! babel-loader */ "babel-loader"),
        options: {
          babelrc: true,
          cacheDirectory: true,
          presets: hasBabelRc ? undefined : [/*require.resolve*/(/*! babel-preset-graphpack */ "babel-preset-graphpack")]
        }
      }]
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  optimization: {
    noEmitOnErrors: true
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), './build'),
    sourceMapFilename: '[name].map'
  },
  performance: {
    hints: false
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }), new webpack.EnvironmentPlugin({
    DEBUG: false,
    GRAPHPACK_SRC_DIR: path.resolve(process.cwd(), 'src'),
    NODE_ENV: 'development'
  }), new FriendlyErrorsWebpackPlugin({
    clearConsole: isDev
  })],
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: 'minimal',
  target: 'node'
};

/***/ }),

/***/ "./node_modules/graphpack/lib/server.js":
/*!**********************************************!*\
  !*** ./node_modules/graphpack/lib/server.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _srcFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./srcFiles */ "./node_modules/graphpack/lib/srcFiles.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./node_modules/graphpack/config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);




if (!(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"] && Object.keys(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"]).length > 0)) {
  throw Error(`Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`);
}
const createServer = config => {
  const {
    applyMiddleware,
    port: serverPort,
    ...options
  } = config;
  const port = Number(process.env.PORT) || serverPort || 4000;
  // Pull out fields that are not relevant for the apollo server

  // Use apollo-server-express when middleware detected
  if (applyMiddleware && applyMiddleware.app && typeof applyMiddleware.app.listen === 'function') {
    const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"](options);
    server.applyMiddleware(applyMiddleware);
    return applyMiddleware.app.listen({
      port
    }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
  }

  // Use apollo-server
  const server = new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"](options);
  return server.listen({
    port
  }).then(({
    url
  }) => console.log(`🚀 Server ready at ${url}`));
};
const startServer = async () => {
  // Load server config from graphpack.config.js
  const config = await Object(_config__WEBPACK_IMPORTED_MODULE_3__["loadServerConfig"])();
  createServer({
    ...config,
    context: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["context"],
    resolvers: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"],
    typeDefs: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["typeDefs"]
  });
};
startServer();

/***/ }),

/***/ "./node_modules/graphpack/lib/srcFiles.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/lib/srcFiles.js ***!
  \************************************************/
/*! exports provided: importFirst, context, resolvers, typeDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importFirst", function() { return importFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
const importFirst = req => req.keys().map(mod => req(mod).default || req(mod))[0];

// Optionally import modules
const context = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$"));
const resolvers = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$"));
const typeDefs = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$"));

/***/ }),

/***/ "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$":
/*!**********************************************************!*\
  !*** ./src sync ^\.\/(context|context\/index)\.(js|ts)$ ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$":
/*!**************************************************************!*\
  !*** ./src sync ^\.\/(resolvers|resolvers\/index)\.(js|ts)$ ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./resolvers.js": "./src/resolvers.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$":
/*!********************************************************************!*\
  !*** ./src sync ^\.\/(schema|schema\/index)\.(gql|graphql|js|ts)$ ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./schema.graphql": "./src/schema.graphql"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$";

/***/ }),

/***/ "./src/datasources/characters.js":
/*!***************************************!*\
  !*** ./src/datasources/characters.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Characters; });
const gameOfThronesApi = __webpack_require__(/*! ./gameOfThronesApi */ "./src/datasources/gameOfThronesApi.js");
class Characters {
  async getAllCharacters() {
    const characters = await gameOfThronesApi.get("/Characters");
    return Array.isArray(characters.data) ? characters.data.map(character => this.characterReducer(character)) : [];
  }
  async getCharacterById(id) {
    const characters = await gameOfThronesApi.get(`/Characters/${id}`);
    return this.characterReducer(characters.data);
  }
  characterReducer(character) {
    return {
      id: character.id || 0,
      firstName: character.firstName,
      lastName: character.lastName,
      fullName: character.fullName,
      title: character.title,
      family: character.family,
      image: character.image,
      imageUrl: character.imageUrl
    };
  }
}

/***/ }),

/***/ "./src/datasources/continents.js":
/*!***************************************!*\
  !*** ./src/datasources/continents.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Continents; });
const gameOfThronesApi = __webpack_require__(/*! ./gameOfThronesApi */ "./src/datasources/gameOfThronesApi.js");
class Continents {
  async getAllContinents() {
    const continents = await gameOfThronesApi.get("/Continents");
    return Array.isArray(continents.data) ? continents.data.map(continent => this.continentReducer(continent)) : [];
  }
  async getContinentById(id) {
    const continents = await gameOfThronesApi.get(`/Continents/${id}`);
    return this.continentReducer(continents.data);
  }
  continentReducer(continent) {
    return {
      id: continent.id || 0,
      name: continent.name
    };
  }
}

/***/ }),

/***/ "./src/datasources/gameOfThronesApi.js":
/*!*********************************************!*\
  !*** ./src/datasources/gameOfThronesApi.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const axios = __webpack_require__(/*! axios */ "axios");
module.exports = axios.create({
  baseURL: "https://ThronesApi.com/api/v2"
});

/***/ }),

/***/ "./src/datasources/houses.js":
/*!***********************************!*\
  !*** ./src/datasources/houses.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Houses; });
// Définition des données dans une constante pour l'immutabilité
const HOUSES = [{
  id: 1,
  name: "House Stark",
  words: "Winter is Coming"
}, {
  id: 2,
  name: "House Targaryen",
  words: "Fire and Blood"
}, {
  id: 3,
  name: "House Baratheon",
  words: "Ours is the Fury"
}, {
  id: 4,
  name: "House Greyjoy",
  words: "We Do Not Sow"
}];
class Houses {
  constructor() {
    this.data = HOUSES;
  }
  getAllHouses() {
    return this.data;
  }
  getHouseById(id) {
    return this.data.find(house => house.id === parseInt(id));
  }
  addHouse(house) {
    const existingHouse = this.data.find(h => h.id === parseInt(house.id));
    if (existingHouse) {
      throw new Error(`Une maison avec l'ID ${house.id} existe déjà`);
    }

    // Si l'ID n'existe pas, ajoute la nouvelle maison
    this.data.push({
      ...house,
      id: parseInt(house.id) // Assure que l'ID est un nombre
    });
    return this.data;
  }
  updateHouse(id, updates) {
    const houseId = parseInt(id);

    // Recherche de la maison
    const houseIndex = this.data.findIndex(house => house.id === houseId);

    // Vérification si la maison existe
    if (houseIndex === -1) {
      throw new Error(`Maison avec l'ID ${id} non trouvée`);
    }

    // Mise à jour de la maison
    this.data[houseIndex] = {
      ...this.data[houseIndex],
      ...updates,
      id: houseId // Préserve l'ID original
    };
    return this.data;
  }
  deleteHouse(id) {
    const index = this.data.findIndex(house => house.id === id);
    if (index === -1) throw new Error("House not found");
    this.data.splice(index, 1);
    return this.data;
  }
  houseReducer(house) {
    return {
      id: house.id,
      name: house.name,
      words: house.words
    };
  }
}

/***/ }),

/***/ "./src/resolvers.js":
/*!**************************!*\
  !*** ./src/resolvers.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datasources_characters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasources/characters */ "./src/datasources/characters.js");
/* harmony import */ var _datasources_houses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasources/houses */ "./src/datasources/houses.js");
/* harmony import */ var _datasources_continents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datasources/continents */ "./src/datasources/continents.js");



let characters = new _datasources_characters__WEBPACK_IMPORTED_MODULE_0__["default"]();
let houses = new _datasources_houses__WEBPACK_IMPORTED_MODULE_1__["default"]();
let continents = new _datasources_continents__WEBPACK_IMPORTED_MODULE_2__["default"]();
const resolvers = {
  Query: {
    characters: () => characters.getAllCharacters(),
    character: (_, {
      id
    }) => characters.getCharacterById(id),
    houses: () => houses.getAllHouses(),
    house: (_, {
      id
    }) => houses.getHouseById(id),
    continents: () => continents.getAllContinents(),
    continent: (_, {
      id
    }) => continents.getContinentById(id)
  },
  Mutation: {
    createHouse: (_, {
      id,
      name,
      words
    }) => {
      return houses.addHouse({
        id,
        name,
        words
      });
    },
    updateHouse: (_, {
      id,
      name,
      words
    }) => {
      return houses.updateHouse(id, {
        name,
        words
      });
    },
    deleteHouse: (_, {
      id
    }) => {
      return houses.deleteHouse(id);
    }
  }
};
/* harmony default export */ __webpack_exports__["default"] = (resolvers);

/***/ }),

/***/ "./src/schema.graphql":
/*!****************************!*\
  !*** ./src/schema.graphql ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"character"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"characters"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Character"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"house"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"House"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"houses"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"House"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"continent"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Continent"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"continents"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Continent"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Create a new house","block":true},"name":{"kind":"Name","value":"createHouse"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"words"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"House"}}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Update an existing house","block":true},"name":{"kind":"Name","value":"updateHouse"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"words"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"House"}}}},"directives":[]},{"kind":"FieldDefinition","description":{"kind":"StringValue","value":"Delete a house","block":true},"name":{"kind":"Name","value":"deleteHouse"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"House"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Character"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"firstName"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"lastName"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"fullName"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"family"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"image"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"imageUrl"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"House"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"words"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Continent"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]}],"loc":{"start":0,"end":777}};
    doc.loc.source = {"body":"type Query {\r\n  character(id: String!): Character\r\n  characters: [Character]\r\n\r\n  house(id: String!): House\r\n  houses: [House]\r\n\r\n  continent(id: String!): Continent\r\n  continents: [Continent]\r\n}\r\n\r\ntype Mutation {\r\n  \"\"\"\r\n  Create a new house\r\n  \"\"\"\r\n  createHouse(id: ID!, name: String!, words: String!): [House]!\r\n\r\n  \"\"\"\r\n  Update an existing house\r\n  \"\"\"\r\n  updateHouse(id: ID!, name: String!, words: String!): [House]!\r\n\r\n  \"\"\"\r\n  Delete a house\r\n  \"\"\"\r\n  deleteHouse(id: ID!): [House]!\r\n}\r\n\r\ntype Character {\r\n  id: ID!\r\n  firstName: String\r\n  lastName: String\r\n  fullName: String\r\n  title: String\r\n  family: String\r\n  image: String\r\n  imageUrl: String\r\n}\r\n\r\ntype House {\r\n  id: ID!\r\n  name: String\r\n  words: String\r\n}\r\n\r\ntype Continent {\r\n  id: ID!\r\n  name: String\r\n}\r\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi graphpack ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! graphpack */"./node_modules/graphpack/lib/server.js");


/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "babel-loader":
/*!*******************************!*\
  !*** external "babel-loader" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-loader");

/***/ }),

/***/ "babel-preset-graphpack":
/*!*****************************************!*\
  !*** external "babel-preset-graphpack" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-preset-graphpack");

/***/ }),

/***/ "cosmiconfig":
/*!******************************!*\
  !*** external "cosmiconfig" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cosmiconfig");

/***/ }),

/***/ "friendly-errors-webpack-plugin":
/*!*************************************************!*\
  !*** external "friendly-errors-webpack-plugin" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("friendly-errors-webpack-plugin");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })

/******/ });
//# sourceMappingURL=index.map