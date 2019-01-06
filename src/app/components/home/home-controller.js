import angular from 'angular';

const app = angular.module('inugami-app');

app.controller('HomeController', function() {
  let vm = this;
  vm.header = 'Welcome to Home Page!';
});
