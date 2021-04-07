import angular from 'angular';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import urlJoin from 'url-join';

import { BACKEND_SERVER_BASE_URL } from 'Config/const';

class AuthService {
  constructor($http, $cacheFactory, $localStorage) {
    this.$http = $http;
    this.$cacheFactory = $cacheFactory;
    this.$localStorage = $localStorage;
  }

  setUpToken(authToken) {
    this.$localStorage.jwtToken = authToken;
    this.$http.defaults.headers.common.Authorization = 'Bearer ' + authToken;
  }

  async login(email, password) {
    try {
      const response = await this.$http.post(urlJoin(BACKEND_SERVER_BASE_URL, '/api/auth/login'), { email, password });

      const { authToken } = response.data.details;

      this.setUpToken(authToken);
    } catch (err) {
      console.error(err);

      return err.data.errors;
    }
  }

  async register(name, email, password) {
    try {
      const response = await this.$http.post(urlJoin(BACKEND_SERVER_BASE_URL, '/api/auth/register'), { name, email, password });

      const { authToken } = response.data.details;

      this.setUpToken(authToken);
    } catch (err) {
      console.error(err);

      return err.data.errors;
    }
  }

  loginWithGoogle(authToken) {
    this.setUpToken(authToken);
  }

  logout() {
    delete this.$localStorage.jwtToken;
    this.$http.defaults.headers.common.Authorization = '';

    angular.forEach(
      this.$cacheFactory.info(),
      function(ob, key) {
        this.$cacheFactory.get(key).removeAll();
      }.bind(this)
    );
  }

  isAuthenticated() {
    const jwtToken = this.$localStorage.jwtToken;
    if (jwtToken) {
      const decodedToken = jwtDecode(jwtToken);

      const currentTime = moment() / 1000;
      if (decodedToken.exp > currentTime) {
        this.$http.defaults.headers.common.Authorization = 'Bearer ' + this.$localStorage.jwtToken;
        return true;
      }
    }

    return false;
  }

  getCurrentUser() {
    if (this.isAuthenticated()) {
      const jwtToken = this.$localStorage.jwtToken;
      return jwtDecode(jwtToken);
    }

    return null;
  }
}

AuthService.$inject = ['$http', '$cacheFactory', '$localStorage'];

export { AuthService };

export default AuthService;
