(function() {
    angular.module('app', ['ui.bootstrap'])
        .controller('InterviewCtrl', function($scope, $http, $uibModal) {
            $http.get('/interview').then(function(req) {
                $scope.interviews = req.data;
                //console.log($scope.interviews);
            });
            $scope.showQuestions = function(interview) {
                $uibModal.open({
                    templateUrl: 'questions.html',
                    controller: function($scope) {
                        //$scope.questions = interview.questions;
                        $scope.totalItems = interview.questions.length;
                        $scope.itemsPerPage = 4;
                        console.log($scope.totalItems);

                        $scope.questions = interview.questions.slice(0, $scope.itemsPerPage);

                        $scope.pageChanged = function() {
                            console.log($scope.currentPage)
                            $scope.questions = [];
                            var startingQuestion = ($scope.currentPage - 1) * ($scope.itemsPerPage);

                            for (var x = 0; x < $scope.itemsPerPage; x++) {
                                if(startingQuestion+x<interview.questions.length)
                                $scope.questions.push(interview.questions[startingQuestion + x]);
                            }
                            console.log($scope.questions);
                        }

                    }
                })
            }
        })
})();
