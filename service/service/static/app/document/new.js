app.controller("NewDocumentCtrl", function ($scope, $stateParams, Document, $state, Corpus) {

    $scope.showStatus = function () {
        var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
        return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
    };
    $scope.corpusId = $stateParams["corpusId"];
    $scope.doc = {
        "text": "",
        "status": "NEW",
        "quality": "POOR",
        "corpus": $scope.corpusId
    };

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "TEXT_MISSING": false,
            "AMR_MISSING": false
        };
    };
    Corpus.get({"id": $scope.corpusId}, function(corpus){
        $scope.corpus = corpus;
    });

    $scope.hideMessages();

    $scope.save = function () {
        if (!$scope.doc.text) {
            $scope.MESSAGES.TEXT_MISSING = true;
        } else {
            $scope.hideMessages();
            Document.save($scope.doc).$promise.then(function (doc) {
                $state.go("detailDocument", {"id": doc.id});
            })
        }
    };

    $scope.saveAndCreateNew = function () {
        if (!$scope.doc.text) {
            $scope.MESSAGES.TEXT_MISSING = true;
        } else {
            $scope.hideMessages();
            Document.save($scope.doc).$promise.then(function (doc) {
                $state.go("newDocument",
                    {"corpusId": $scope.corpusId},
                    {reload: true});
            })
        }
    }
});