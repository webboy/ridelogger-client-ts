// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default [
    // ESM build
    {
        input: 'src/index.ts',         // Your main entry file
        output: {
            file: 'dist/index.esm.js',   // Where to put the ESM build
            format: 'es',
            sourcemap: true
        },
        external: [
            'axios',
            'dotenv',
            'node:process'
            // anything else you don't want to bundle
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig.json' })
        ]
    },

    // CJS build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.cjs.js',   // Where to put the CJS build
            format: 'cjs',
            sourcemap: true
        },
        external: [
            'axios',
            'dotenv',
            'node:process'
            // anything else you don't want to bundle
        ],
        plugins: [
            typescript({ tsconfig: './tsconfig.json' })
        ]
    }
];
