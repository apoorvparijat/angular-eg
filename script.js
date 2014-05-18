var app = angular.module('angularTut', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('calculator', {
        url: '/calculator',
        controller: 'calculatorCtrl',
        templateUrl: '/templates/calculator.html'
    })
    .state('calculator.scientific', {
        url: '/scientific',
        views: {
            'scientific@': {
                templateUrl: '/templates/scientific.html'
            }
        }
    })
    .state('todo', {
        url: '/todo',
        controller: 'todoCtrl',
        templateUrl: '/templates/todo.html',
        resolve: {
            todolist: ['$http', function ($http) {
                return $http.get('/data.json'); // returns a promise object
            }]
        }
    });
}]);


app.controller('calculatorCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.firstNo = 10;
    $scope.secondNo = 20;


    $scope.add = function() {
        $scope.answer = eval($scope.firstNo) + eval($scope.secondNo);
    }

    $scope.$watch('firstNo', $scope.add);
    $scope.$watch('secondNo', $scope.add);
}]);


app.controller('todoCtrl', ['$scope', 'todolist', function($scope, todolist) {
    console.log(todolist);
    $scope.todos = todolist.data;
}]);