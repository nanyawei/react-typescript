'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name : 'WIP:      工作进度'
    },
    {
      value: 'feat',
      name : 'feat:     新的功能'
    },
    {
      value: 'fix',
      name : 'fix:      修复 bug'
    },
    {
      value: 'refactor',
      name : 'refactor: 重构（即不是新增功能，也不是修改bug的代码变动）'
    },
    {
      value: 'docs',
      name : 'docs:     文档'
    },
    {
      value: 'style',
      name: 'style:    代码样式'
    },
    {
      value: 'test',
      name : 'test:     测试'
    },
    {
      value: 'chore',
      name : 'chore:    不修改 src 目录或测试文件的更改。比如更新构建任务，包管理器'
    },
    {
      value: 'types',
      name: 'types:    typescript types'
    },
    {
      value: 'polish',
      name: 'polish:   改进代码（范围比重构小，可能只是一个代码块的改进）'
    },
    {
      value: 'pref',
      name: 'preform:  性能'
    },
    {
      value: 'revert',
      name: 'revert:   回滚到某个版本的提交'
    },
    {
      value: 'tips',
      name: 'tips:     增加提示信息（如错误提示等）'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};