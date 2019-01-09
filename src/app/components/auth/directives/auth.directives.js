import angular from 'angular';

import leftContainerView from './left-container.html';
import rightContainerView from './right-container.html';
import loginFormView from '../components/login/login-form.html';
import loginFooterLinkView from '../components/login/login-footer-link.html';
import registerFormView from '../components/register/register-form.html';
import registerFooterLinkView from '../components/register/register-footer-link.html';

const authModule = angular.module('app.auth');

authModule.directive('leftContainer', function() {
  return {
    restrict: 'E',
    template: leftContainerView
  };
});

authModule.directive('rightContainer', function() {
  return {
    restrict: 'E',
    template: rightContainerView
  };
});

authModule.directive('authForm', [
  '$route',
  function($route) {
    return {
      restrict: 'E',
      template: () => ($route.current.$$route.isLogin ? loginFormView : registerFormView)
    };
  }
]);

authModule.directive('footerLink', [
  '$route',
  function($route) {
    return {
      restrict: 'E',
      template: () => ($route.current.$$route.isLogin ? loginFooterLinkView : registerFooterLinkView)
    };
  }
]);
