app.controller("ListCorpusCtrl", function ($scope, Corpus, STATUSES, QUALITIES, $stateParams, $state, $uibModal) {
  $scope.STATUSES = STATUSES;
  $scope.QUALITIES = QUALITIES;
  $scope.status = $stateParams.status ? $stateParams.status : 'ALL';
  $scope.quality = $stateParams.quality ? $stateParams.quality : 'ALL';

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
  $scope.query = {
    limit: 10,
    offset: 0,
    page: 1
  };
  if ($scope.status != "ALL") {
    $scope.query["status"] = $scope.status;
  }
  if ($scope.quality != "ALL") {
    $scope.query["quality"] = $scope.quality;
  }
  $scope.getListCorpus = function () {
    $scope.query.offset = ($scope.query.page - 1) * $scope.query.limit;
    Corpus.query($scope.query).then(function (data) {
      _.each(data.results, function (item) {
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

  $scope.getListCorpus();

  $scope.delete = function (corpusId) {
    Corpus.delete({id: corpusId}).$promise.then(function () {
      $state.reload();
    })
  };

  $scope.openNewCorpusModal = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './static/app/corpus/new.html',
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

    modalInstance.result.then(function (data) {
      $scope.getListCorpus();
    }, function (err) {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  };

  $scope.openEditCorpusModal = function (corpus) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: './static/app/corpus/edit.html',
      size: 'md',
      resolve: {
        data: function () {
          return {
            corpusInfo: corpus,
            listTask: $scope.listTask
          };
        }
      },
      controller: function ($scope, $uibModalInstance, Corpus, data) {
        $scope.selectedTask = {};
        $scope.tmp = $.extend({}, data.corpusInfo);
        if ($scope.tmp.tasks && $scope.tmp.tasks.length > 0) {
          _.each($scope.tmp.tasks, function (item) {
            $scope.selectedTask[item] = true;
          });
        }
        $scope.listTaskModal = data.listTask;
        $scope.updateCorpus = function () {
          console.log($scope.tmp);
          $scope.checkEdit = _.every([$scope.tmp.title, $scope.tmp.description], function (item) {
            return item.length > 0;
          });
          if ($scope.checkEdit) {
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

            $scope.tmp["tasks"] = listSelectedTask.toString();
            Corpus.update({"id": $scope.tmp.id}, $scope.tmp).$promise.then(function () {
              $uibModalInstance.close();
            });
          }
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
    });
    //
    modalInstance.result.then(function (data) {
      $scope.getListCorpus();
    }, function (err) {
      // $log.info('modal-component dismissed at: ' + new Date());
    });
  };


});