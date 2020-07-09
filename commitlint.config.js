module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'WIP',
      'feat',
      'fix',
      'refactor',
      'docs',
      'style',
      'test',
      'chore',
      'types',
      'polish',
      'pref',
      'revert',
      'tips'
    ]],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
};