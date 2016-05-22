'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdir = require('mkdirp');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stupendous ' + chalk.red('kit frontend workflow') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'Your project name: ',
      validate: function (str) {
        return str.length > 0;
      }
    }, {
      type: 'input',
      name: 'folder',
      message: 'Components folder: ',
      default: ''
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.path = 'src/components/' + this.props.folder + this.props.componentName.toLowerCase();
    }.bind(this));
  },

  writing: function () {
    mkdir(this.path);
    mkdir(this.path + '/__tests__');
    mkdir(this.path + '/assets');
    mkdir(this.path + '/styles');

    this.template('index.ejs', this.path + '/index.jsx', {
      componentName: this.props.componentName
    });

    this.template('index.less.ejs', this.path + 'less/index.less', {
      componentName: this.props.componentName.toLowerCase()
    });
    this.copy('variables.less', this.path + 'less/variables.less');

    this.template('component.test.ejs', this.path + '/__tests__/' + this.props.componentName.toLowerCase() + '.js', {
      componentName: this.props.componentName
    });

    this.template('component.md.ejs', this.path + this.props.componentName.toLowerCase() + '.md', {
      componentName: this.props.componentName
    });
  },

  install: function () {
    this.installDependencies();
  }
});
