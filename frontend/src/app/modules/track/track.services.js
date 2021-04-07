import angular from 'angular';

class TrackService {
  constructor($http) {
    this.count = 0;
    this.$http = $http;
  }

  sayHello() {
    this.count = this.count + 1;
    console.log(this.count);
  }
}

const trackModule = angular.module('app.main.track');

TrackService.$inject = ['$http'];

trackModule.service('TrackService', TrackService);
