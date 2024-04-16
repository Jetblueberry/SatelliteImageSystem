const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // Define the module rules
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, // Extracts CSS to files
                'css-loader', // Interprets @import and url() like import/require() and resolves them

            ],
        },
      ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
  ],
  // Other webpack configuration settings...
  devServer: {
    static: {
      directory: path.join(__dirname, 'path_to_your_static_files'),
    },
    // Other devServer settings...
  },
};
