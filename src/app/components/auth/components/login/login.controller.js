import angular from 'angular';

import { APP_ROUTES } from 'Config/app-routes';

const authModule = angular.module('app.auth');

authModule.controller('LoginController', function() {
  let vm = this;

  vm.registerPageUrl = APP_ROUTES.REGISTER;
});
