module.exports = {
  default: {
    require: [
      'world.ts',
      'tests/testHooks.ts',
      'step-definitions/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: ['progress'],
  }
};

  