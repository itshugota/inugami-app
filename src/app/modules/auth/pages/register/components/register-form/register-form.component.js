import angular from 'angular';

import registerFormTemplate from './register-form.html';

import facebookIcon from 'Assets/images/facebook.svg';
import googleIcon from 'Assets/images/google-plus.svg';

const authModule = angular.module('app.auth');

authModule.component('registerForm', {
  template: registerFormTemplate,
  controller: function() {
    let vm = this;

    vm.facebookIconUrl = facebookIcon;
    vm.googleIconUrl = googleIcon;
  }
});
