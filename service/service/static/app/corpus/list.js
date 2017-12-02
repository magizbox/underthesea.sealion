app.controller("ListCorpusCtrl", function ($scope, Corpus, STATUSES, QUALITIES, $stateParams, $state) {
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
  var query = {};
  $scope.selectedTask = {};
  if ($scope.status != "ALL") {
    query["status"] = $scope.status;
  }
  if ($scope.quality != "ALL") {
    query["quality"] = $scope.quality;
  }
  $scope.getListCorpus = function () {
    Corpus.query(query).then(function (data) {
      _.each(data, function (item) {
        item.tasks = item.tasks.split(",");
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

  $scope.openEdit = function (corpus) {
    $scope.tmp = $.extend({}, corpus);
    _.each($scope.tmp.tasks, function (item) {
      $scope.selectedTask[item] = true;
    });
  };

  $scope.updateCorpus = function () {
    var list = _.chain($scope.selectedTask)
      .pick(function (value, key, object) {
        return value == true;
      })
      .allKeys().value();
    $scope.tmp["tasks"] = list.toString();
    Corpus.update({"id": $scope.tmp.id}, $scope.tmp).$promise.then(function () {
      $("#myModal").modal('hide');
      $scope.getListCorpus();
    });
  };
});