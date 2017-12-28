app.controller("ListAMRCtrl", function ($scope, Document, STATUSES, QUALITIES, $stateParams) {
    $scope.STATUSES = STATUSES;
    $scope.QUALITIES = QUALITIES;
    $scope.status = $stateParams.status ? $stateParams.status : 'ALL';
    $scope.quality = $stateParams.quality ? $stateParams.quality : 'ALL';

    var query = {};
    if($scope.status != "ALL"){
        query["status"] = $scope.status;
    }
    if($scope.quality != "ALL"){
        query["quality"] = $scope.quality;
    }
    Document.query(query).then(function(data){
        $scope.docs = data;
    });

    $scope.updateStatus = function(value){
        $scope.status = value;
    };

    $scope.updateQuality = function(value){
        $scope.quality = value;
    };
});