//noinspection JSUnresolvedVariable
module.exports = {
    entry: {
        app: ["./src/Index.jsx"]
    },
    output: {
        filename: "./build/[name].bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devServer: {        
        inline: true,
        progress: true,
        historyApiFallback: true,
        stats: "errors-only"
    }
};
