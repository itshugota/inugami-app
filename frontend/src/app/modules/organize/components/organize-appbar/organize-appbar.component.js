import angular from 'angular';

import organizeAppbarTemplate from './organize-appbar.html';

import { ToDoStatus } from 'Enums/todo-status.enum';

const organizeModule = angular.module('app.main.organize');

organizeModule.component('organizeAppbar', {
  bindings: {
    appbarData: '='
  },
  template: organizeAppbarTemplate,
  controller: ['$element', 'ToDoService', 'AppBarService', function($element, ToDoService, AppBarService) {
    let vm = this;

    vm.appbarTitle = 'Organize To-dos';

    vm.appBarService = AppBarService;

    vm.isActiveSelected = true;

    vm.selectActiveToDos = function() {
      vm.appBarService.appBarData.statusFilter = ToDoStatus.ACTIVE;
      vm.isActiveSelected = true;
      ToDoService.notifyObservers();
    };

    vm.changeNameFilter = function() {
      ToDoService.notifyObservers();
    };

    vm.selectCompletedToDos = function() {
      vm.appBarService.appBarData.statusFilter = ToDoStatus.COMPLETED;
      vm.isActiveSelected = false;
      ToDoService.notifyObservers();
    };

    $element.addClass('layout-row layout-align-start-center full-width');

    vm.$onInit = function() {
      AppBarService.appBarData = {
        statusFilter: ToDoStatus.ACTIVE
      };
    };
  }]
});
