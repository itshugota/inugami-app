import angular from 'angular';

import 'angular-route';

angular.module('app.auth', ['ngRoute']);

require('./components/login/login.controller');
require('./components/register/register.controller');
require('./directives/auth.directives');
require('./auth.routes');
require('./auth.controller');
