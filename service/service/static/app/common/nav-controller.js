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
        uisref: 'detailDocument.syntax({id: ' + $stateParams.id + '})',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'Text Classification',
        uisref: 'detailDocument.classification({id: ' + $stateParams.id + '})',
        icon: 'icon-list icon text-info-dker'
      }
    ];
  }
  else {
    $scope.listItemMenu = [
      {
        name: 'Corpora',
        uisref: 'listCorpus',
        icon: 'icon-disc icon text-success'
      },
      {
        name: 'Dialogue Corpora',
        uisref: 'listDialogueCorpus',
        icon: 'icon-list icon text-info-dker'
      }
    ];
  }


});