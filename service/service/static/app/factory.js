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
    resource.query = function () {
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            var documents = _.map(data["results"], function (document) {
                document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
                document["hasAct"] = document["act"] != "[]" && document["act"] != "";
                document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
                return document;
            });
            return Promise.resolve(documents);
        });
    };
    resource.pagination = function () {
        params = arguments[0];
        return resource._query.apply(null, arguments).$promise.then(function (data) {
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

app.factory('DialogueDocument', function ($resource) {
    var resource = $resource('/api/dialogue_documents/:id/', {
        'filter': '@filter'
    }, {
        '_query': {method: 'GET'},
        '_get': {method: 'GET'},
        'update': {method: 'PUT'}
    });
    resource.query = function () {
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            var documents = _.map(data["results"], function (document) {
                document["hasSentiment"] = document["sentiment"] != "[]" && document["sentiment"] != "";
                document["hasAct"] = document["act"] != "[]" && document["act"] != "";
                document["hasCategory"] = document["category"] != "[]" && document["category"] != "";
                return document;
            });
            return Promise.resolve(documents);
        });
    };
    resource.pagination = function () {
        params = arguments[0];
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            var output = {};
            output["totalItems"] = data["count"];
            output["itemsPerPage"] = params["limit"];
            output["currentPage"] = Math.floor(params["offset"] / params["limit"]) + 1;
            return Promise.resolve(output);
        });
    };
    resource.get = function () {
        // call the original get method via the _get alias, chaining $then to facilitate
        // processing the data
        return resource._get.apply(null, arguments).$promise.then(function (data) {
            try {
                data["auto_act"] = JSON.parse(data["auto_act"]);
                if(!Array.isArray(data["auto_act"])){
                    data["auto_act"] = [];
                }
            } catch(e){
                data["auto_act"] = [];
            }
            return Promise.resolve(data);
        });
    };
    return resource;
});

app.factory('Dialogue', function ($resource, DialogueDocument) {
    DialogueDocumentService = DialogueDocument;
    var resource = $resource('/api/dialogues/:id/', {
        'filter': '@filter'
    }, {
        '_query': {method: 'GET'},
        'update': {method: 'PUT'}
    });
    resource.query = function () {
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            dialogues = data.results;
            return new Promise(function (fulfill, reject) {
                var p = _.map(dialogues, function (dialogue) {
                    var docId = JSON.parse(dialogue.content)[0];
                    return DialogueDocumentService.get({"id": docId});
                });
                Promise.all(p).then(function (documents) {
                    var output = _.zip(dialogues, documents);
                    dialogues = _.map(output, function (item) {
                        var dialogue = item[0];
                        var comments = _.flatten(JSON.parse(dialogue.content)).length - 1;
                        dialogue["text"] = item[1].text;
                        dialogue["comments"] = comments;
                        return dialogue;
                    });
                    fulfill(dialogues);
                });
            })
        });
    };

    resource.getDocuments = function () {
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            function merge(ids, data) {
                var output = [];
                for (var i = 0; i < ids.length; i++) {
                    if (_.isArray(ids[i])) {
                        output.push(merge(ids[i], data))
                    } else {
                        output.push(data[ids[i]])
                    }
                }
                return output;
            }

            return new Promise(function (fulfill, reject) {
                documentIds = JSON.parse(data["content"]);
                ids = _.flatten(documentIds);
                var r = _.map(ids, function (id) {
                    return DialogueDocumentService.get({"id": id});
                });
                Promise.all(r).then(function (data) {
                    data = data.reduce(function (map, obj) {
                        map[obj["id"]] = obj;
                        return map;
                    }, {});
                    var output = merge(documentIds, data);
                    fulfill(output);
                });
            })
        });
    };
    resource.pagination = function () {
        params = arguments[0];
        return resource._query.apply(null, arguments).$promise.then(function (data) {
            var output = {};
            output["totalItems"] = data["count"];
            output["itemsPerPage"] = params["limit"];
            output["currentPage"] = Math.floor(params["offset"] / params["limit"]) + 1;
            return Promise.resolve(output);
        });
    };
    return resource;
});

app.factory('Params', function () {
    return function (params, defaults) {
        var output = defaults;
        for (var key in defaults) {
            if (params[key]) {
                output[key] = params[key];
            }
        }
        return output;
    }
});

