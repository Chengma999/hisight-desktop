
const TerserPlugin = require('terser-webpack-plugin');
export default function (webpackConfig) {


  if (process.env.NODE_ENV === 'production'){

    webpackConfig.plugins.splice(4,1)

  }
      console.log(webpackConfig.plugins)
  return {
    ...webpackConfig,
    // optimization: {
    //   minimizer: [new TerserPlugin()],
    // },
    externals(context, request, callback) {
      let isExternal = false;
      const load = [
        'electron',
      ];
      if (load.includes(request)) {
        isExternal = `require("${request}")`;
      }
      callback(null, isExternal);
    },

  };
}
