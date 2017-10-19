app.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory('Document', function ($resource) {
    var resource = $resource('/api/documents/:id/', {
        'filter': '@filter'
    }, {
        '_query': {method: 'GET'},
        'update': {method: 'PUT'}
    });
    resource.query = function(){
        return resource._query.apply(null, arguments).$promise.then(function(data){
            var documents = _.map(data["results"], function(document){
                document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
                document["hasAct"] = document["act"] != "[]" && document["act"] != "";
                document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
                return document;
            });
            return Promise.resolve(documents);
        });
    };
    resource.pagination = function(){
        params = arguments[0];
        return resource._query.apply(null, arguments).$promise.then(function(data){
            var output = {};
            output["totalItems"] = data["count"];
            output["itemsPerPage"] = params["limit"];
            output["currentPage"] = Math.floor(params["offset"] / params["limit"]) + 1;
            return Promise.resolve(output);
        });
    };
    return resource;
});

app.factory('Corpus', function ($resource) {
    var resource = $resource('/api/corpora/:id/', { 'filter': '@filter' }, {
        '_query': {method: 'GET'},
        'update': {method: 'PUT'}
    });
    resource.query = function(){
        return resource._query.apply(null, arguments).$promise.then(function(data){
            return Promise.resolve(data["results"]);
        });
    };
    return resource;
});

app.factory('Params', function(){
    return function(params, defaults){
        var output = defaults;
        for(var key in defaults){
            if(params[key]){
                output[key] = params[key];
            }
        }
        return output;
    }
});
