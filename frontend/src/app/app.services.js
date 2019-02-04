import angular from 'angular';

import { AuthService } from './shared/services/auth.service';
import { AppBarService } from './shared/services/app-bar.service';
import { ToDoService } from './shared/services/to-do.service';

const app = angular.module('app');

app.service('AuthService', AuthService);
app.service('AppBarService', AppBarService);
app.service('ToDoService', ToDoService);
