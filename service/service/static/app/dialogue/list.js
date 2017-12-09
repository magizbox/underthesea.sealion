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
            $uibModalInstance.close();
          })
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
  };

});