class AppBarService {
  constructor($http) {
    this.$http = $http;

    this.appBarData = { };
  }
}

AppBarService.$inject = ['$http'];

export { AppBarService };

export default AppBarService;
