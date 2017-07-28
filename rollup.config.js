import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';

export default {
    entry: 'src/index.ts',
    format: 'umd',
    moduleName: 'test',
    dest: 'dist/test.js',
    plugins: [
        builtins(),
        resolve({
            customResolveOptions: 'node_modules',
            jsnext: true
        }),
        commonjs({
            // https://github.com/rollup/rollup-plugin-commonjs#custom-named-exports
            namedExports: {
                
            }
        }),
        typescript({
            typescript: require('typescript')
        }),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: true
        })
    ]
}