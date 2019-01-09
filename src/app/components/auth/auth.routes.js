import angular from 'angular';

import authSectionView from './auth.html';
import { APP_ROUTES } from 'Config/app-routes';

const authModule = angular.module('app.auth');

authModule.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $routeProvider.when(APP_ROUTES.LOGIN, {
      template: authSectionView,
      isLogin: true
    });

    $routeProvider.when(APP_ROUTES.REGISTER, {
      template: authSectionView,
      isLogin: false
    });

    $routeProvider.otherwise({ redirectTo: APP_ROUTES.LOGIN });
  }
]);
