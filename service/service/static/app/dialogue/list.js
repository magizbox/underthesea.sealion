app.controller("ListDialogueCorpusCtrl", function ($scope, DialogueCorpus, STATUSES, QUALITIES, $stateParams, $state) {
    var query = {};
    DialogueCorpus.query(query).then(function (data) {
        $scope.corpora = data;
    });
    $scope.delete = function (corpusId) {
        DialogueCorpus.delete({id: corpusId}).$promise.then(function () {
            $state.reload();
        })
    };
    $scope.openEdit = function(corpus){
        $scope.tmp = $.extend({}, corpus);
    };

    $scope.updateCorpus = function(){
        DialogueCorpus.update({"id": $scope.tmp.id}, $scope.tmp).$promise.then(function(){
            window.location.reload();
        });
    }
});