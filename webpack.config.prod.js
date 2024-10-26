const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(commonConfig, {
    mode: "production",
    devtool: "source-map",
    // plugins: [new BundleAnalyzerPlugin({
    //     AnalyserMode: 'static',
    //     openAnalyzer: false,
    //     reportFilename:'report.html'
    // })],
    optimization: {
        minimizer:true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/
                }
            }
        }
      },
})