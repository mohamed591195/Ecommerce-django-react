const path = require('path');

module.exports = {
    entry: './o_store/frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, './o_store/frontend/static'),
        filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }]
            }
        ]
    }
}