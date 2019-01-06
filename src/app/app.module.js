import angular from 'angular';
import ngRoute from 'angular-route';
import ngMaterial from 'angular-material';

const app = angular.module('inugami-app', [ngRoute, ngMaterial]);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('indigo')
    .accentPalette('red');
});

require('./app.routes');
require('./sections/login/login.ctrl');
require('./components/home/home-controller');
