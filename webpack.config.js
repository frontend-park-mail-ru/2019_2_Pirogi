const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                loader: 'sass-loader',

            },
            {
                // Для включения в css файлов шрифтов и картинок
                test: /\.(jp.*g|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
};
