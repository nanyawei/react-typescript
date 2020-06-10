import { Configuration } from "webpack";

declare module 'speed-measure-webpack-plugin' {
  const { Configuration, Plugin } = require('webpack');

  // 查看官方文档，需要哪些选项就声明哪些选项就行
  interface SpeedMeasurePluginOptions {
    disable: boolean;
    outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void);
    outputTarget: string | ((outputObj: string) => void);
    pluginNames: object;
    granularLoaderData: boolean;
  }

  // 继承 Plugin 类， Plugin 都有apply方法
  class SpeedMeasurePlugin extends Plugin {
    constructor(options?: Partial<SpeedMeasurePluginOptions>);
    warp(webpackConfig: Configuration): Configuration;
  }

  export = SpeedMeasurePlugin;

}