var app = angular.module('app1', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.importer']);

app.controller('MainCtrl1', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    debugger;
    $scope.data = [];
    $scope.gridOptions = {
        enableGridMenu: true,
        data: 'data',
        importerDataAddCallback: function (grid, newObjects) {
            debugger;
            $scope.data = $scope.data.concat(newObjects);
        },
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        }
    };
}]);
