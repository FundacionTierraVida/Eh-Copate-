
var app = angular.module('ehCopate', []);


app.controller( 'headerCtrl', function( $scope ) {
    $scope.urlHeader = 'templates/navbarHeader.html';
});


//function mainController($scope, $http) {
app.controller( 'mainController', function($scope, $http) {
    $scope.formData = {};

    // Cuando se cargue la página, pide del API todos los objetos
    $http.get('/api/projects')
        .success(function(data) {
            $scope.projects = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // Cuando se añade un nuevo objeto, manda el texto a la API
    $scope.createProject = function(){
        $http.post('/api/projects', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };

    // Borra un objeto despues de checkearlo como acabado
    $scope.deleteProject = function(id) {
        $http.delete('/api/projects/' + id)
            .success(function(data) {
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});

