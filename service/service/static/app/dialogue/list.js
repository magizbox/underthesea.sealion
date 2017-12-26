app.controller("ListDialogueCorpusCtrl", function ($scope, DialogueCorpus, STATUSES, QUALITIES, $stateParams, $state, $uibModal) {
  $scope.query = {};

  $scope.listTask = [
    {
      name: 'Word Segmentation',
      value: 'WS'
    },
    {
      name: 'POS Tagging',
      value: 'PO'
    },
    {
      name: 'Chunking',
      value: 'CH'
    },
    {
      name: 'Named Entity Recognition',
      value: 'NE'
    },
    {
      name: 'Dialog Acts',
      value: 'DA'
    },

    {
      name: 'Category',
      value: 'CA'
    },

    {
      name: 'Sentiment',
      value: 'SA'
    }
  ];

  $scope.getListDialogueCorpus = function () {
    DialogueCorpus.query($scope.query).then(function (data) {
      _.each(data, function (item) {
        if (item.tasks && item.tasks.length > 0) {
          item.tasks = _.chain(item.tasks.split(","))
            .map(function (task) {
              return _.indexOf(_.pluck($scope.listTask, 'value'), task);
            })
            .sortBy()
            .map(function (index) {
              return $scope.listTask[index].value;
            })
            .value();
        }

      });
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
          return {
            dialogueInfo: dialogue,
            listTask: $scope.listTask
          };
        }
      },
      controller: function ($scope, $uibModalInstance, data) {
        $scope.selectedTask = {};
        $scope.tmp = angular.copy(data.dialogueInfo);

        $scope.listTaskModal = data.listTask;
        if ($scope.tmp.tasks && $scope.tmp.tasks.length > 0) {
          _.each($scope.tmp.tasks, function (item) {
            $scope.selectedTask[item] = true;
          });
        }
        $scope.save = function () {

          var listSelectedTask = _.chain($scope.selectedTask)
            .pick(function (value, key, object) {
              return value == true;
            })
            .allKeys()
            .map(function (task) {
              return _.indexOf(_.pluck($scope.listTaskModal, 'value'), task);
            })
            .sortBy()
            .map(function (index) {
              return $scope.listTaskModal[index].value;
            }).value();
          $scope.tmp.tasks = listSelectedTask.toString();
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