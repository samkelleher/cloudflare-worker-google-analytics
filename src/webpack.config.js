const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

const isRelease = true;

module.exports = {
    target: "webworker",
    entry: "./src/worker.js",

    mode: !isRelease ? "development" : "production",

    plugins: [
        new webpack.DefinePlugin({
            GA_TRACKING_ID: JSON.stringify(process.env.GA_TRACKING_ID),
        }),
        new webpack.BannerPlugin(`GOOGLE ANALYTICS FOR ${process.env.GA_TRACKING_ID}`)
    ]

};
