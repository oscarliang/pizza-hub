const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for db files
config.resolver.assetExts = config.resolver.assetExts
    .filter(ext => ext !== 'svg')
    .concat('db');

// Add support for TypeScript files
config.resolver.sourceExts.push('ts', 'tsx', 'cjs');

// Add web platform support
config.resolver.platforms = ['ios', 'android', 'web'];

// Add path aliases
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    '@': './',
    'react-native$': 'react-native-web',
};

// Add SVG transformer
config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

// Add SVG to asset extensions
config.resolver.assetExts.push('svg');
config.resolver.sourceExts.push('svg');

module.exports = config; 