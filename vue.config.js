const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        // target: "http://localhost:3000"
        target: "http://localhost:3333"
        // target: "http://192.168.193.236:3000"
      }
    }
  }
};
