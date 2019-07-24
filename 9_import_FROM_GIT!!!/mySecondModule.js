const mySecondModule = angular.module("mySecondModule", []);

mySecondModule.controller("HelloCtrl", HelloCtrl);

function HelloCtrl() {
    this.helloMessage = "I'm from the myHelloModule module";

}