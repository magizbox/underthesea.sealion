window.app = angular.module("myApp", ['ui.router', 'ngResource', 'xeditable', 'ui.bootstrap', 'nlp.elements', 'ui-notification', 'cfp.hotkeys']);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

window.nlpElements = angular.module('nlp.elements', ['xeditable']);

app.constant("SERVICE_URL", "http://localhost:8000/api/");

app.constant("STATUSES", [
    {
        "text": "New",
        "value": "NEW"
    },
    {
        "text": "Annotating",
        "value": "ANNOTATING"
    },
    {
        "text": "Annotated",
        "value": "ANNOTATED"
    },
    {
        "text": "Reviewing",
        "value": "REVIEWING"
    },
    {
        "text": "Reviewed",
        "value": "REVIEWED"
    }
]);

app.constant("QUALITIES", [
    {
        "text": "Poor",
        "value": "POOR"
    },
    {
        "text": "Acceptable",
        "value": "ACCEPTABLE"
    },
    {
        "text": "Perfect!",
        "value": "PERFECT"
    }
]);

app.directive("mwConfirmClick", [
    function () {
        return {
            priority: -1,
            restrict: 'A',
            scope: {confirmFunction: "&mwConfirmClick"},
            link: function (scope, element, attrs) {
                element.bind('click', function (e) {
                    // message defaults to "Are you sure?"
                    var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
                    // confirm() requires jQuery
                    if (confirm(message)) {
                        scope.confirmFunction();
                    }
                });
            }
        }
    }
]);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});