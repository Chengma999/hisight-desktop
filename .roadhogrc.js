export default{
  "entry": "./src/renderer/*.js",
  "outputPath": "./app/dist",
  "publicPath":"./",
  "define": {
    "$dirname": "__dirname"
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  }

}
