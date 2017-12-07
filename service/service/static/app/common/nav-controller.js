/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state, $stateParams) {

  $scope.currState = $state.$current.name;

  var parent = $state.$current.parent.name;
  if (parent == "detailDocument" || parent == "detailDocument.syntax") {
    $scope.listItemMenu = [
      {
        name: 'WS',
        value: 'detailDocument.syntax.ws',
        uisref: 'detailDocument.syntax.ws({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'PO',
        value: 'detailDocument.syntax.po',
        uisref: 'detailDocument.syntax.po({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'CH',
        value: 'detailDocument.syntax.ch',
        uisref: 'detailDocument.syntax.ch({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'NER',
        value: 'detailDocument.syntax.ner',
        uisref: 'detailDocument.syntax.ner({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'TC',
        value: 'detailDocument.classification',
        uisref: 'detailDocument.classification({id: ' + $stateParams.id + '})',
        icon: 'icon-list icon text-info-dker'
      }
    ];
  }
  else {
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
  };

  $scope.activeMenu = function (item) {
    $scope.currState = item.value;
  };




});