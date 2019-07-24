
module.controller("parentCtrl", ParentCtrl)

//let value1 

// DI dependency injection - IOC
function ParentCtrl($scope, $rootScope, $http) {

    //let self = $scope
    $scope.todos = []
    this.a = 5;
    $scope.b = 12

    $http.get('https://jsonplaceholder.typicode.com/posts').then(
    (resp) => {
        console.log(resp.data)
        $scope.todos = resp.data 

    },function(err) {
        console.losg(err)
    })
}
