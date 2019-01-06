import angular from 'angular';

const app = angular.module('inugami-app');

app.controller('LoginController', function() {
  let vm = this;
  vm.header = 'Welcome to Login Page!';
});
