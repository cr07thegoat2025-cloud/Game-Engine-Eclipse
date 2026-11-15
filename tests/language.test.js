const test = require('node:test');
const assert = require('node:assert/strict');
const ECL = require('../language/eclipse-language.js');

test('creates objects and assigns properties', () => {
  const result = ECL.run([
    'create a player named Hero',
    "set Hero's speed to 8",
    "set Hero's color to yellow",
    'move Hero to 0, 1, 0'
  ].join('\n'));
  assert.equal(result.objects.size, 1);
  assert.equal(result.objects.get('Hero').properties.speed, 8);
  assert.equal(result.objects.get('Hero').properties.color, 'yellow');
  assert.deepEqual(result.objects.get('Hero').position, [0, 1, 0]);
});

test('registers event declarations and emits messages', () => {
  const result = ECL.run([
    'create a player named Hero',
    'when the player presses SPACE, make Hero jump',
    'show "Hello Eclipse!"'
  ].join('\n'));
  assert.equal(result.events.length, 1);
  assert.equal(result.log[0], 'Hello Eclipse!');
});

test('reports unsupported instructions with line numbers', () => {
  assert.throws(
    () => ECL.run('show "first line"\nthis sentence is not a command'),
    error => error instanceof ECL.ECLParseError && /Line 2:/.test(error.message)
  );
});

test('rejects references to objects that do not exist', () => {
  assert.throws(
    () => ECL.run("set Missing's speed to 5"),
    error => error instanceof ECL.ECLParseError && /Line 1:/.test(error.message)
  );
});
