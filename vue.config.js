// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");

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
        vm: false,
        util: false,
        //util: require.resolve("util/"),
      },

      alias: {
        // Alias for using source of BootstrapVue
        "bootstrap-vue$": "bootstrap-vue/src/index.js",
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify("PRODUCTION"),
      }),
    ],
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
