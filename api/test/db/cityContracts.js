const { test } = require('ava');
const cityContract = require('../../src/db/models/cityContracts');
const { promisify, inspect } = require('util');

const testModelData = {
  city: 'hjsad',
  price: 7.234453,
};

test('cityContracts model validation', async (t) => {
  const c = new cityContract(testModelData);

  await c.validate((error) => {
    if(error) {
      t.fail(inspect(error.errors));
    } else {
      t.pass();
    }
  })
});

test('cityContracts color validation', (t) => {
  const changedModelData = testModelData;

  const c = new cityContract(changedModelData);

  c.color = '#ABCDEF';
  t.falsy(c.validateSync());

  c.color = '#abcdef';
  t.falsy(c.validateSync());

  c.color = '#123456';
  t.falsy(c.validateSync());

  c.color = '#abcdeG';
  t.truthy(c.validateSync());

  c.color = '#(/&bgasdksll';
  t.truthy(c.validateSync());

  c.color = '123323';
  t.truthy(c.validateSync());
});

test('cityContracts model price', async (t) => {
  const c = new cityContract(testModelData);

  await c.validate((error) => {
    if(error) {
      t.fail(inspect(error.errors));
    } else {
      t.is(c.price.toString().length, 4);
    }
  })
});
