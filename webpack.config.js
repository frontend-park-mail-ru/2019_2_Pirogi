module.exports = {
    entry: './src/js/app.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                // Для включения в css файлов шрифтов и картинок
                test: /\.(jp?g|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000',
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
