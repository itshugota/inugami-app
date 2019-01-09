import angular from 'angular';

angular.module('app.auth', ['ui.router']);

require('./components/auth-layout/auth-layout.component');
require('./pages/login/login.page');
require('./pages/register/register.page');
require('./auth.routes');
