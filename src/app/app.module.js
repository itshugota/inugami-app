import angular from 'angular';

import 'angular-material';
import '@uirouter/angularjs';

import './modules/auth/auth.module';

const app = angular.module('app', ['ngMaterial', 'app.auth']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.definePalette('inugamiPalette', {
    '50': 'e7edfe',
    '100': 'c3d1fe',
    '200': '9cb3fd',
    '300': '7495fc',
    '400': '567efb',
    '500': '3867fa',
    '600': '325ff9',
    '700': '2b54f9',
    '800': '244af8',
    '900': '1739f6',
    A100: 'ffffff',
    A200: 'f4f5ff',
    A400: 'c1c9ff',
    A700: 'a7b2ff',

    contrastDefaultColor: 'light',
    contrastDarkColors: ['50', '100', '200', '300', '400', 'A100', 'A200', 'A400', 'A700'],
    contrastLightColors: ['500', '600', '700', '800', '900']
  });

  $mdThemingProvider.theme('default').primaryPalette('inugamiPalette');
});
