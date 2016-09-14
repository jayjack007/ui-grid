//var app =  angular.module('MyApp', [
//  'ui.grid'
//]);

//app.controller('bodyController', ['$scope', function ($scope) {
//    $scope.myData = [{ name: "Moroni", age: 50 },
//                     { name: "Tiancum", age: 43 },
//                     { name: "Jacob", age: 27 },
//                     { name: "Nephi", age: 29 },
//                     { name: "Enos", age: 34 }];
//    $scope.gridOptions = { data: 'myData' };// $scope.myData is also acceptable but will not update properly. OK to use the object if you don't care about updating the data in the grid.
//}]);





//var app = angular.module('app', ['ngTouch', 'ui.grid']);

//app.controller('MainCtrl', ['$scope', function ($scope) {

//    $scope.myData = [
//      {
//          "firstName": "Cox",
//          "lastName": "Carney",
//          "company": "Enormo",
//          "employed": true
//      },
//      {
//          "firstName": "Lorraine",
//          "lastName": "Wise",
//          "company": "Comveyer",
//          "employed": false
//      },
//      {
//          "firstName": "Nancy",
//          "lastName": "Waters",
//          "company": "Fuelton",
//          "employed": false
//      }
//    ];
//}]);





var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
    var today = new Date();
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
        if (col.filters[0].term) {
            return 'header-filtered';
        } else {
            return '';
        }
    };

    $scope.gridOptions = {

        enableFiltering: true,
        enableGridMenu: true,
        enableSelectAll: true,
        exporterCsvFilename: 'myFile.csv',
        exporterPdfDefaultStyle: { fontSize: 9 },
        exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
        exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
        exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
        exporterPdfFooter: function (currentPage, pageCount) {
            return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
        },
        exporterPdfCustomFormatter: function (docDefinition) {
            docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
            docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
            return docDefinition;
        },
        exporterPdfOrientation: 'portrait',
        exporterPdfPageSize: 'LETTER',
        exporterPdfMaxGridWidth: 500,
        exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
        },
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
          // default
          { field: 'name', headerCellClass: $scope.highlightFilteredHeader },
          // pre-populated search field
          {
              field: 'gender', filter: {
                  //term: '1',
                  type: uiGridConstants.filter.SELECT,
                  selectOptions: [{ value: '1', label: 'male' }, { value: '2', label: 'female' }, { value: '3', label: 'unknown' }, { value: '4', label: 'not stated' }, { value: '5', label: 'a really long value that extends things' }]
              },
              cellFilter: 'mapGender', headerCellClass: $scope.highlightFilteredHeader
          },
          //// no filter input
          //{
          //    field: 'company', enableFiltering: false, filter: {
          //        noTerm: true,
          //        condition: function (searchTerm, cellValue) {
          //            return cellValue.match(/a/);
          //        }
          //    }
          //},
           { field: 'company', headerCellClass: $scope.highlightFilteredHeader },
          // specifies one of the built-in conditions
          // and a placeholder for the input
          {
              field: 'email',
              filter: {
                  condition: uiGridConstants.filter.ENDS_WITH,
                  placeholder: 'ends with'
              }, headerCellClass: $scope.highlightFilteredHeader
          },
          // custom condition function
          {
              field: 'phone',
              filter: {
                  condition: function (searchTerm, cellValue) {
                      var strippedValue = (cellValue + '').replace(/[^\d]/g, '');
                      return strippedValue.indexOf(searchTerm) >= 0;
                  }
              }, headerCellClass: $scope.highlightFilteredHeader
          },
          // multiple filters
          {
              field: 'age', filters: [
              {
                  condition: uiGridConstants.filter.GREATER_THAN,
                  placeholder: 'greater than'
              },
              {
                  condition: uiGridConstants.filter.LESS_THAN,
                  placeholder: 'less than'
              }
              ], headerCellClass: $scope.highlightFilteredHeader
          },
          // date filter
          {
              field: 'mixedDate', cellFilter: 'date', width: '15%', filter: {
                  condition: uiGridConstants.filter.LESS_THAN,
                  placeholder: 'less than',
                  //term: nextWeek
              }, headerCellClass: $scope.highlightFilteredHeader
          },
          {

              field: 'mixedDate', displayName: "Long Date", cellFilter: 'date:"longDate"', filterCellFiltered: true, width: '15%',
          }
        ]
    };

    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
     .success(function (data) {
         //  var data = [
         //{
         //    "name": "Coxgfd",
         //    "gender": "male",
         //    "company": "Enormoretg",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "1"

         //},
         //{
         //    "name": "Cox",
         //    "gender": "female",
         //    "company": "Enormoqw",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "-5"
         //},
         //{
         //    "name": "Cox",
         //    "gender": "female",
         //    "company": "Enormore",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "-11"
         //},
         //{
         //    "name": "Cox",
         //    "gender": "male",
         //    "company": "Enormohgfh",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "2"
         //},
         //{
         //    "name": "Cox",
         //    "gender": "female",
         //    "company": "Enormwerewro",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "4"
         //},
         //{
         //    "name": "Cox",
         //    "gender": "male",
         //    "company": "Enormwerqgreo",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "55"
         //},
         //{
         //    "name": "Cox",
         //    "gender": "male",
         //    "company": "Enormdsfao",
         //    "email": true,
         //    "phone": "123455",
         //    "age": "9"
         //}
         //  ];
         //  debugger;
         $scope.gridOptions.data = data;
         $scope.gridOptions.data[0].age = -5;

         data.forEach(function addDates(row, index) {
             row.mixedDate = new Date();
             row.mixedDate.setDate(today.getDate() + (index % 14));
             row.gender = row.gender === 'male' ? '1' : '2';
         });
     });

    $scope.toggleFiltering = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };
}])
.filter('mapGender', function () {
    var genderHash = {
        1: 'male',
        2: 'female'
    };

    return function (input) {
        if (!input) {
            return '';
        } else {
            return genderHash[input];
        }
    };
});
