const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // Define the module rules
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, // Extracts CSS to files
                {
                  loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 0, // Adjust this based on your needs
                        sourceMap: true, // Enable if you need source maps
                        modules: {
                          auto: /\.module\.\w+$/i, // Enable CSS Modules only for `.module.css` files
                      },
                    },
                },
                {
                  loader: 'raw-loader'
                }
            ],
            include: /\.module\.css$/,
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
