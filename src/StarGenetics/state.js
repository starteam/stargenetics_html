define(["require", "exports"], function(require, exports) {
    var StudentIDWidgetState = (function () {
        function StudentIDWidgetState(config) {
            this.element_id = config.element_id;
            this.student_id = config.StudentID;
        }
        Object.defineProperty(StudentIDWidgetState.prototype, "id", {
            get: function () {
                return this.student_id;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(StudentIDWidgetState.prototype, "uid", {
            get: function () {
                return this.element_id;
            },
            enumerable: true,
            configurable: true
        });
        return StudentIDWidgetState;
    })();
    exports.StudentIDWidgetState = StudentIDWidgetState;

    var StarGeneticsAppWidgetState = (function () {
        function StarGeneticsAppWidgetState(config) {
            this.element_id = config.element_id;
        }
        Object.defineProperty(StarGeneticsAppWidgetState.prototype, "uid", {
            get: function () {
                return this.element_id;
            },
            enumerable: true,
            configurable: true
        });
        return StarGeneticsAppWidgetState;
    })();
    exports.StarGeneticsAppWidgetState = StarGeneticsAppWidgetState;

    var StarGeneticsState = (function () {
        function StarGeneticsState() {
        }
        StarGeneticsState.prototype.setStudentID = function (config) {
            this.StudentIDWidgetState = new StudentIDWidgetState(config);
            return this.StudentIDWidgetState;
        };

        StarGeneticsState.prototype.setApp = function (config) {
            this.StarGeneticsAppWidgetState = new StarGeneticsAppWidgetState(config);
            return this.StarGeneticsAppWidgetState;
        };

        Object.defineProperty(StarGeneticsState.prototype, "student_id", {
            get: function () {
                var sid = this.StudentIDWidget;
                return sid ? sid.id : "__NOT_SET__";
            },
            enumerable: true,
            configurable: true
        });
        return StarGeneticsState;
    })();
    exports.StarGeneticsState = StarGeneticsState;

    var StarGeneticsGlobalState = (function () {
        function StarGeneticsGlobalState() {
            this.state = {};
        }
        StarGeneticsGlobalState.prototype.get_state = function (config) {
            var Group = config['Group'] || 'default';
            if (!this.state[Group]) {
                this.state[Group] = new StarGeneticsState();
            }
            var my_state = this.state[Group];
            return my_state;
        };
        return StarGeneticsGlobalState;
    })();
    exports.StarGeneticsGlobalState = StarGeneticsGlobalState;
});
//@ sourceMappingURL=state.js.map
