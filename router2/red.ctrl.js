
var module = angular.module("colorApp");
module.controller("RedCtrl", RedCtrlCtor)

function RedCtrlCtor()
{
	this.myColor = 'red'
	this.clickme = function()
	{
		alert('clicked')
	}
}