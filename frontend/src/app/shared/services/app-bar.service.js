class AppBarService {
  constructor($http, ToDoService) {
    this.$http = $http;

    console.log(ToDoService);

    this.appBarData = { };
  }
}

export { AppBarService };

export default AppBarService;
