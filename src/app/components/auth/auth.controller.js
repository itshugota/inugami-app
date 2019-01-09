import angular from 'angular';

import whiteLogo from 'Assets/images/wolf-white-face.svg';
import mainLogo from 'Assets/images/logo.svg';
import facebookIcon from 'Assets/images/facebook.svg';
import googleIcon from 'Assets/images/google-plus.svg';

const authModule = angular.module('app.auth');

authModule.controller('AuthController', function($location) {
  let vm = this;

  vm.leftContainerContent = {
    logoUrl: whiteLogo,
    title: 'Welcome',
    subtitle: "It's time to organize your to-do list!",
    features: ['Utilize the Eisenhower matrix', 'Track your goals with ease', 'Share your work to the world']
  };

  vm.rightContainerContent = {
    logoUrl: mainLogo,
    logoText: 'Inugami',
    facebookIconUrl: facebookIcon,
    googleIconUrl: googleIcon
  };
});
