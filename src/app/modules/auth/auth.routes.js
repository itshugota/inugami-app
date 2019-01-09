import angular from 'angular';

import { APP_ROUTES } from 'Config/app-routes';

const authModule = angular.module('app.auth');

authModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', `${APP_ROUTES.AUTH.URL}${APP_ROUTES.AUTH.CHILDREN.LOGIN.URL}`);
    $urlRouterProvider.when('/', `${APP_ROUTES.AUTH.URL}${APP_ROUTES.AUTH.CHILDREN.LOGIN.URL}`);

    $urlRouterProvider.otherwise('/auth/login');

    $stateProvider
      .state('auth', {
        abstract: true,
        url: APP_ROUTES.AUTH.URL,
        component: 'authLayout'
      })
      .state('auth.login', {
        url: APP_ROUTES.AUTH.CHILDREN.LOGIN.URL,
        views: {
          form: { component: 'loginForm' },
          footer: { component: 'loginFooterLink' }
        }
      })
      .state('auth.register', {
        url: APP_ROUTES.AUTH.CHILDREN.REGISTER.URL,
        views: {
          form: { component: 'registerForm' },
          footer: { component: 'registerFooterLink' }
        }
      });
  }
]);
