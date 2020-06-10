const envPreset = [
  '@babel/preset-env',
  {
    // 只导入需要的polyfill
    useBuiltIns: 'usage',
    // 指定corejs版本
    corejs: 3,
    // 禁用模块化方案
    modules: false
  }
];

module.exports = function (api) {
  api.cache(true);

  const presets = [
    '@babel/preset-typescript',
    envPreset
  ];

  const plugins = ['@babel/plugin-transform-runtime'];

  return {
    presets,
    plugins,
    env: {
      development: {
        presets:[['@babel/preset-react', { development: true }]],
        plugins: ['react-hot-loader/babel']
      },
      production: {
        presets:['@babel/preset-react'],
        plugins: [
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-react-inline-elements'
        ]
      }
    }
  }
}