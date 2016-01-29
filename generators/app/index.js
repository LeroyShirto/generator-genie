'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var GenieGenerator = yeoman.generators.Base.extend({
  
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  
  init: function() {
    this.log(yosay('Welcome to the \n' + chalk.red('Home Genie Package\n') + ' generator!'));
    this.templatedata = {};
  },
  
  askFor: function() {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'type',
      message: 'What type of Genie package do you want to create?',
      choices: [{
            name: 'Basic Empty Package',
            value: 'basicEmpty'
          }
      ]
    }];
    
    this.prompt(prompts, function(props) {
      this.type = props.type;

      done();
    }.bind(this));
  },
  
  askForName: function() {
    var done = this.async();
    var app = '';
    switch (this.type) {
      case 'basicEmpty':
        app = 'BasicEmptyPackage';
        break;
    }
    var prompts = [{
      name: 'authorsName',
      message: 'Who are you? This is used for the author name. eg. John Smith',
      default: app,
      store: true
    },{
      name: 'packageName',
      message: 'What\'s the name of your Genie package?',
      default: app
    },{
      name: 'packageDescription',
      message: 'What\'s the short description of your Genie package?',
      default: app
    },{
      name: 'packageHomePageURL',
      message: 'Enter a URL for the packages home page.',
      default: app
    }];
    
    this.prompt(prompts, function(props) {
      this.templatedata.authorsName = props.authorsName;
      this.templatedata.packageName = props.packageName;
      this.templatedata.packageDescription = props.packageDescription;
      this.templatedata.packageHomePageURL = props.packageHomePageURL;
      this.packageName = props.packageName;
      
      done();
    }.bind(this));
  },

  writing: function () {
    this.sourceRoot(path.join(__dirname, './templates/projects'));

    switch (this.type) {

      case 'basicEmpty':
        this.template(this.sourceRoot() + '/README.md', this.packageName + '/README.md', this.templatedata); 
        this.sourceRoot(path.join(__dirname, './templates/projects/' + this.type));
        this.template(this.sourceRoot() + '/package.json', this.packageName + '/package.json', this.templatedata);       
        break;
      default:
        this.log('Unknown project type');
    }
  },

  end: function() {
    this.log('\r\n');
    this.log('Your project is now created, you can use the following commands to get going');
    this.log(chalk.green('    cd "' + this.packageName + '"'));
    
    this.log('\r\n');
  }
});

module.exports = GenieGenerator;