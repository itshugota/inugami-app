import angular from 'angular';

const app = angular.module('inugami-app');

import loginSectionView from './sections/login/login.tpl.html';

app.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', { template: loginSectionView });
  }
]);
