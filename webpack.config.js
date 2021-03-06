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
    // without resolve webpack gave errors ???
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            "jquery-ui": "jquery-ui-dist/jquery-ui.js"
        }
    },
    devServer: {
        inline: true,
        progress: true,
        historyApiFallback: true,
        stats: "errors-only"
    }
};
