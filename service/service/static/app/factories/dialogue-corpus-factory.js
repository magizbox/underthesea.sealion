/**
 * Created by crawler on 25/12/2017.
 */
app.factory('DialogueCorpus', function ($resource) {
  var resource = $resource('/api/dialogue_corpora/:id/', {'filter': '@filter'}, {
    '_query': {method: 'GET'},
    'update': {method: 'PUT'}
  });
  resource.query = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      return Promise.resolve(data["results"]);
    });
  };
  return resource;
});