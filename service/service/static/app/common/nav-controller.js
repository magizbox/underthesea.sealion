/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state) {

  console.log($state);
  $scope.currState = $state.$current.name;
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


});