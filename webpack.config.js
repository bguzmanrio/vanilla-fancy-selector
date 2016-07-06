module.exports = (function () {

    return {
        entry: './main.js',
        output: {
            path: './dist/',
            filename: 'js/[name].min.js'
        },
        resolve: {
            extensions: ['', '.js', '.sass']
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel', // 'babel-loader' is also a legal name to reference
                    query: {
                        presets: ['es2015']
                    }
				        }
            ]
        },
        stats: {
            colors: true
        }
    };

})();
