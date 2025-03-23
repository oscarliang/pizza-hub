module.exports = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: ['db', 'svg'],
        sourceExts: ['ts', 'tsx', 'cjs', 'svg'],
    },
}; 