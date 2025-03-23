module.exports = function (api) {
    api.cache(true);

    const isWeb = process.env.PLATFORM === 'web';

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@': './',
                        'react-native$': 'react-native-web',
                    },
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            ],
            isWeb && [
                'transform-inline-environment-variables',
                {
                    include: ['PLATFORM', 'EXPO_OS', 'EXPO_ROUTER_APP_ROOT', 'EXPO_ROUTER_ABS_APP_ROOT']
                }
            ],
            // Define environment variables when not available
            isWeb && [
                'babel-plugin-transform-define',
                {
                    'process.env.EXPO_OS': 'web',
                    'process.env.PLATFORM': 'web',
                    'process.env.EXPO_ROUTER_APP_ROOT': 'app',
                    'process.env.EXPO_ROUTER_ABS_APP_ROOT': process.cwd ? `${process.cwd()}/app` : '/app'
                }
            ]
        ].filter(Boolean),
    };
}; 