import path from 'path';
const __dirname = path.resolve(path.dirname(''));
export default {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, './dist/js/')
    },
    stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        optimizationBailout: true,
        colors: {
            green: '\u001b[32m',
        }
    },
    watch: true,
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    }
};