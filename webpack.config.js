const path = require('path'); 

module.exports = { 
    mode: 'development', 
    entry: './scripts/main.tsx', 
    devtool: 'inline-source-map', 
    output: { 
        path: path.join(__dirname, '/dist'), 
        filename: 'bundle.js' 
    }, 
    devtool: 'inline-source-map', 
    devServer: { static: '.', }, 
    module: { 
        rules: [
            { 
                test: /\.jsx?$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ] 
    }, 
    resolve: { 
        extensions: ['.tsx', '.ts', '.js'], 
    },
    optimization: {
        minimize: false
    }
}