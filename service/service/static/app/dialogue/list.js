app.controller("ListDialogueCorpusCtrl", function ($scope, DialogueCorpus, STATUSES, QUALITIES, $stateParams, $state, $uibModal) {
  $scope.query = {};
  $scope.getListDialogueCorpus = function () {
    DialogueCorpus.query($scope.query).then(function (data) {
      $scope.corpora = data;
    });
  };

  $scope.getListDialogueCorpus();
  $scope.delete = function (corpusId) {
    DialogueCorpus.delete({id: corpusId}).$promise.then(function () {
      $state.reload();
    })
  };
  $scope.openEdit = function (corpus) {
    $scope.tmp = $.extend({}, corpus);
  };

  $scope.updateCorpus = function () {
    DialogueCorpus.update({"id": $scope.tmp.id}, $scope.tmp).$promise.then(function () {
      window.location.reload();
    });
  }
  $scope.openNewDialogueCorpusModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './static/app/dialogue/new.html',
      size: 'md',
      controller: function ($scope, $uibModalInstance, Corpus) {
        $scope.corpus = {
          title: '',
          description: ''
        };
        $scope.save = function () {
          $scope.checkNull = _.every([$scope.corpus.title, $scope.corpus.description], function (item) {
            return item.length > 0;
          });
          if ($scope.checkNull) {
            Corpus.save($scope.corpus).$promise.then(function (corpus) {
              $uibModalInstance.close();
            });
          }
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

});