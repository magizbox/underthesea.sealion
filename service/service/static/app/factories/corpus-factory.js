/**
 * Created by crawler on 25/12/2017.
 */
app.factory('Corpus', function ($resource) {
  var resource = $resource('/api/corpora/:id/', {'filter': '@filter'}, {
    '_query': {method: 'GET'},
    'update': {method: 'PUT'}
  });
  resource.query = function () {
    return resource._query.apply(null, arguments).$promise.then(function (data) {
      return Promise.resolve(data);
    });
  };

  return resource;
});