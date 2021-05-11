// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: {
    experiments: {
      syncWebAssembly: true,
    },
    target: "web",
    resolve: {
      fallback: {
        fs: false,
        path: false,
        module: false,
        crypto: false,
        worker_threads: false,
      },

      alias: {
        // Alias for using source of BootstrapVue
        "bootstrap-vue$": "bootstrap-vue/src/index.js",
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // Exclude transpiling `node_modules`, except `bootstrap-vue/src`
          exclude: /node_modules\/(?!bootstrap-vue\/src\/)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  },
};
