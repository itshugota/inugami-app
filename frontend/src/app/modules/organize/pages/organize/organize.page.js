import angular from 'angular';

import organizePageTemplate from './organize.html';

import doFirstIcon from 'Assets/images/alarm.svg';
import scheduleIcon from 'Assets/images/calendar.svg';
import delegateIcon from 'Assets/images/push-button.svg';
import eliminateIcon from 'Assets/images/closed-paper-bin.svg';
import wolfHowlingBackground from 'Assets/images/wolf-howling-background.svg';

import { Category } from 'Enums/category.enum';

const organizeModule = angular.module('app.main.organize');

organizeModule.component('organizePage', {
  template: organizePageTemplate,
  controller: function($scope, $timeout, ToDoService, AppBarService) {
    let vm = this;

    vm.backgroundUrl = wolfHowlingBackground;

    vm.categories = [];

    if (ToDoService.isFirstTime) {
      vm.showLoadingScreen = true;
    } else {
      vm.showLoadingScreen = false;
    }

    vm.initializeToDos = async function() {
      let doFirstToDos;
      let scheduleToDos;
      let delegateToDos;
      let eliminateToDos;

      try {
        doFirstToDos = await ToDoService.getToDos(Category.DO_FIRST, AppBarService.appBarData.statusFilter);
        scheduleToDos = await ToDoService.getToDos(Category.SCHEDULE, AppBarService.appBarData.statusFilter);
        delegateToDos = await ToDoService.getToDos(Category.DELEGATE, AppBarService.appBarData.statusFilter);
        eliminateToDos = await ToDoService.getToDos(Category.ELIMINATE, AppBarService.appBarData.statusFilter);

        if (AppBarService.appBarData.toDoFilter) {
          doFirstToDos = doFirstToDos.filter(toDo => toDo.name.includes(AppBarService.appBarData.toDoFilter));
          scheduleToDos = scheduleToDos.filter(toDo => toDo.name.includes(AppBarService.appBarData.toDoFilter));
          delegateToDos = delegateToDos.filter(toDo => toDo.name.includes(AppBarService.appBarData.toDoFilter));
          eliminateToDos = eliminateToDos.filter(toDo => toDo.name.includes(AppBarService.appBarData.toDoFilter));
        }
      } catch (err) {
        console.error(err);
        doFirstToDos = [];
        scheduleToDos = [];
        delegateToDos = [];
        eliminateToDos = [];
      }

      vm.categories = [
        {
          name: Category.DO_FIRST,
          title: 'Do First',
          iconUrl: doFirstIcon,
          toolbarClass: 'red-background',
          tooltip: {
            header: 'Take immediate action',
            description: 'Crucial for achieving your objectives'
          },
          toDos: doFirstToDos
        },
        {
          name: Category.SCHEDULE,
          title: 'Schedule',
          iconUrl: scheduleIcon,
          toolbarClass: 'green-background',
          tooltip: {
            header: 'Allocate future time',
            description: 'Avoid tasks becoming urgent by doing them in advance'
          },
          toDos: scheduleToDos
        },
        {
          name: Category.DELEGATE,
          title: 'Delegate',
          iconUrl: delegateIcon,
          toolbarClass: 'dark-blue-background',
          tooltip: {
            header: 'Try to delegate or reduce',
            description: "Urgent, but don't contribute to reaching your objectives"
          },
          toDos: delegateToDos
        },
        {
          name: Category.ELIMINATE,
          title: 'Eliminate',
          iconUrl: eliminateIcon,
          toolbarClass: 'green-background--faded',
          tooltip: {
            header: "Don't do these",
            description: 'Stay focused on your objectives'
          },
          toDos: eliminateToDos
        }
      ];

      $scope.$digest();
    };

    $timeout(function() {
      vm.showLoadingScreen = false;
    }, 4000);

    ToDoService.registerObserverCallback(vm.initializeToDos);

    vm.$onInit = function() {
      vm.initializeToDos();
    };
  }
});
