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
  };

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

        $scope.save = function () {
          DialogueCorpus.save($scope.corpus).$promise.then(function (corpus) {
            $uibModalInstance.close();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });

    modalInstance.result.then(function () {
      $scope.getListDialogueCorpus();
    }, function (err) {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  }

  $scope.openEditDialogueCorpusModal = function (dialogue) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './static/app/dialogue/edit.html',
      size: 'md',
      resolve: {
        data: function () {
          return dialogue;
        }
      },
      controller: function ($scope, $uibModalInstance, data) {

        $scope.tmp = angular.copy(data);
        $scope.save = function () {
          DialogueCorpus.update({"id": $scope.tmp.id}, $scope.tmp).$promise.then(function () {
            $uibModalInstance.close();
          });
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });

    modalInstance.result.then(function () {
      $scope.getListDialogueCorpus();
    }, function (err) {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  };

});