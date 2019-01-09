import angular from 'angular';

import { APP_ROUTES } from 'Config/app-routes';

const authModule = angular.module('app.auth');

authModule.controller('RegisterController', function() {
  let vm = this;

  vm.loginPageUrl = APP_ROUTES.LOGIN;
});
