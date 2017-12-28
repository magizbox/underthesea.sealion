/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state, $stateParams, DialogueCorpus, Corpus) {

  $scope.currState = $state.$current.name;
  $scope.nestedState = $state.$current.nested;
  $scope.parent = $state.$current.parent.name;
  var listItem = [
    {
      name: 'WS',
      value: $scope.parent + '.ws',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'PO',
      value: $scope.parent + '.po',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'CH',
      value: $scope.parent + '.ch',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'NER',
      value: $scope.parent + '.ner',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'TC',
      value: $scope.parent + '.classification',
      icon: 'icon-list icon text-info-dker'
    }
  ];
  if ($scope.parent == "detailDocument") {
    Corpus.get({id: $stateParams.idCorpus}, function (corpus) {
      var tasks = corpus.tasks.split(",");
      $scope.listItemMenu = _.chain(listItem)
        .filter(function (item) {
          return _.contains(tasks, item.name) || item.name == 'TC';
        })
        .map(function (item2) {
          item2["uisref"] = item2.value + "({idCorpus:" + $stateParams.idCorpus + ", idDocument: " + $stateParams.idDocument + "})";
          return item2;
        }).value();
    });
  }
  else if ($scope.parent == "detailTagDialogueCorpus") {
    DialogueCorpus.get({id: $stateParams.dialogueId}, function (corpus) {
      $scope.tasks = corpus.tasks.split(",");
      $scope.listItemMenu = _.chain(listItem)
        .filter(function (item1) {
          return item1.name != 'TC' && _.contains($scope.tasks, item1.name);
        })
        .map(function (item2) {
          item2["uisref"] = item2.value + "({dialogueId: " + $stateParams.dialogueId + "})";
          return item2;
        })
        .value();
    });

  } else {

    $scope.listItemMenu = [
      {
        name: 'Corpora',
        value: 'listCorpus',
        uisref: 'listCorpus',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'Dialogue Corpora',
        value: 'listDialogueCorpus',
        uisref: 'listDialogueCorpus',
        icon: 'icon-list icon text-info-dker'
      }
    ];
  }
  ;

  $scope.activeMenu = function (item) {
    $scope.currState = item.value;
  };


});