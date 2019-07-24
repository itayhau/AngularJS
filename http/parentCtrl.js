
module.controller("parentCtrl", ParentCtrl)

//let value1 

// DI dependency injection - IOC
function ParentCtrl($scope, $rootScope, $http) {

    let self = $scope
    $scope.todos = []
    $http.get('https://jsonplaceholder.typicode.com/posts').then( function(resp) {
        console.log(resp.data)
        self.todos = resp.data
    },function(err) {
        console.losg(err)
    })
}
