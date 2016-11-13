'use strict';

angular

.module('starter')

.factory('CourseService', CourseService);

CourseService.$inject = ['$http'];

function CourseService($http) {

	return {
		getdata : getdata
	}

	function getdata(data) {
		return $http({
                    method : 'GET',
                    url    : API_ENDPOINT.home
                })
		
	}

}