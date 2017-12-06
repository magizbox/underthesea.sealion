/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state, $stateParams) {

  console.log($state);
  $scope.currState = $state.$current.name;

  var parent = $state.$current.parent.name;
  if (parent == "detailDocument") {
    $scope.listItemMenu = [
      {
        name: 'Syntax',
        value: 'detailDocument.syntax',
        uisref: 'detailDocument.syntax({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'Text Classification',
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