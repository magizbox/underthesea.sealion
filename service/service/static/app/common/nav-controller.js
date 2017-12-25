/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state, $stateParams) {

  $scope.currState = $state.$current.name;

  $scope.parent = $state.$current.parent.name;
  var listItem = [
    {
      name: 'WS',
      value: 'ws',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'PO',
      value: 'po',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'CH',
      value: 'ch',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'NER',
      value: 'ner',
      icon: 'icon-disc icon text-success'
    },
    {
      name: 'TC',
      value: 'classification',
      icon: 'icon-list icon text-info-dker'
    }
  ];
  if ($scope.parent == "detailDocument") {
    $scope.listItemMenu = _.map(listItem, function (item) {
      item["uisref"] = $scope.parent + "." + item.value + "({id: " + $stateParams.id + "})";
      return item;
    });
  }
  else if ($scope.parent == "detailTagDialogueCorpus") {
    $scope.listItemMenu = _.map(listItem, function (item) {
      item["uisref"] = $scope.parent + "." + item.value + "({dialogueId: " + $stateParams.dialogueId + "})";
      return item;
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

  console.log($state);

  $scope.activeMenu = function (item) {
    $scope.currState = $scope.parent + "." + item.value;
  };


});