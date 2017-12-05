/**
 * Created by crawler on 05/12/2017.
 */
app.controller("NavController", function ($scope, $state) {

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
  ]
});