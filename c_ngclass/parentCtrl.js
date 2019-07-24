
module.controller("parentCtrl", ParentCtrl)

//let value1 

// DI dependency injection - IOC
function ParentCtrl($scope, $rootScope) {
    $scope.name = ''
    $scope.id = ''
    $scope.ph = ''

    $scope.getClass = function() {
        return $scope.id == '' ? 'missing' : 'ok'
    }
}
