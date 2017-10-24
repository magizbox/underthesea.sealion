app.controller("NewDialogueCorpusCtrl", function ($scope, $stateParams, DialogueCorpus, $state) {

    $scope.corpus = {
        "title": "",
        "description": ""
    };

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "TITLE_MISSING": false,
            "DESCRIPTION_MISSING": false
        };
    };

    $scope.hideMessages();

    $scope.save = function () {
        if (!$scope.corpus.title) {
            $scope.MESSAGES.TEXT_MISSING = true;
            return
        }

        $scope.hideMessages();
        DialogueCorpus.save($scope.corpus).$promise.then(function (corpus) {
            $state.go("detailDialogueCorpus", {"id": corpus.id});
        })
    }
});