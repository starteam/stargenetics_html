define(["require", "exports"], function(require, exports) {
    

    var $ = jQuery;

    var q;
    var app;

    function testSuite(qunit, jsappwidget) {
        console.info("running tests");
        q = qunit;
        app = jsappwidget;
        open_ps();
        liststrains();
        expandstrains();
        collapsestrains();
        expandstrains();
        expandnewexperiment();
        collapsenewexperiment();
        expandnewexperiment();
    }
    exports.testSuite = testSuite;

    function open_ps() {
        q.test("open", function () {
            app.open({
                onsuccess: function () {
                    console.info("Open passed");
                    q.ok(true);
                },
                onerror: function () {
                    console.info("Open failed");
                    q.ok(false);
                }
            });
        });
    }

    function liststrains() {
        q.test("liststrains", function () {
            app.list_strains({
                onsuccess: function () {
                    console.info("test_liststrains passed");
                    q.ok(true);
                },
                onerror: function () {
                    console.info("test_liststrains failed");
                    q.ok(false);
                }
            });
        });
    }

    function expand(kind, expanded) {
        q.test("expand " + kind, function () {
            var expand = $('.sg_expand[data-kind="' + kind + '"][data-expanded="' + expanded + '"]');
            q.equal(expand.size(), 1, "need at one sg_expand");
            expand.click();
        });
    }

    function expandstrains() {
        expand('strains', 'true');
    }

    function collapsestrains() {
        expand('strains', 'false');
    }

    function expandnewexperiment() {
        expand('new_experiment', 'true');
    }

    function collapsenewexperiment() {
        expand('new_experiment', 'false');
    }
});
//@ sourceMappingURL=suite.js.map
