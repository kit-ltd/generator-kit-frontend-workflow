'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var mkdir = require('mkdirp');

function makeProjectName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return name;
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the astounding ' + chalk.red('kit frontend workflow') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your project name: ',
      default: makeProjectName(path.basename(process.cwd())),
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Description: ',
      default: ' '
    }, {
      type: 'input',
      name: 'repo',
      message: 'Repository: ',
      default: 'Kit.team/' + makeProjectName(path.basename(process.cwd()))
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = {};

      this.props.projectName = props.projectName;
      this.props.repo = props.repo;
      this.props.description = props.description;
    }.bind(this));
  },

  install: function () {
    this.installDependencies();
  },

  makeDirs: function () {
    mkdir('docs');
    mkdir('tools');
    mkdir('build');
    mkdir('data');
    mkdir('__tests__');

    mkdir('src');
    mkdir('src/core');
    mkdir('src/routes');
    mkdir('src/stores');
    mkdir('src/public');
    mkdir('src/actions');
    mkdir('src/componets');

    mkdir('src/components/views');
    mkdir('src/components/blocks');
    mkdir('src/components/modules');
    mkdir('src/components/elements');
    mkdir('src/components/behaviors');
    mkdir('src/components/collections');
  },

  makeConfigs: function () {
    this.template('_package.ejs', 'package.json', {
      projectName: this.props.projectName,
      description: this.props.description,
      repo: this.props.repo
    });

    this.template('README.md.ejs', 'README.md', {
      projectName: this.props.projectName,
      description: this.props.description
    });

    this.template('src/public/index.html.ejs', 'src/public/index.html', {
      projectName: this.props.projectName
    });
  },

  copyConfig: function () {
    this.copy('_gitignore', '.gitignore');
    this.copy('_babelrc', '.babelrc');
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_eslintrc.json', '.eslinrc.json');
    this.copy('LICENSE.txt', 'LICENSE.txt');

    this.copy('tools/_eslintrc', 'tools/.eslintrc');
    this.copy('tools/webpack.config.js', 'tools/webpack.config.js');

    this.copy('src/public/favicon.ico');
    this.copy('src/public/humans.txt');
    this.copy('src/public/robots.txt');

    this.copy('src/client.js');
    this.copy('src/server.js');

    this.copy('src/components/app/index.jsx');
    this.copy('src/routes/index.jsx');
  }
});
