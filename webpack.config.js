const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        library: 'react-custom-components',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [
      'react',
      'react-dom'
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
       plugins: [
             new TSConfigPathsPlugin({
                 configFile: path.resolve(__dirname, './tsconfig.json'),
             }),
           ],
   },    
    module: {
        rules: [
          { 
            test: /\.(ts|js)x?$/, 
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          { 
            test: /\.s[ac]ss$/i, 
            use: [
              'style-loader', 
              'css-loader', 
              'sass-loader'
            ]
          }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
          patterns: [
            { from: "./package.json", to: "package.json" },
          ],
        }),
    ]
}