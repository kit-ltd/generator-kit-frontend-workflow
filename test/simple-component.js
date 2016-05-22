'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-kit-frontend-workflow:simple-component', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/simple-component'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
