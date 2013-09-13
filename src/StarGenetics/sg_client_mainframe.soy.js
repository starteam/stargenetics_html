// This file was automatically generated from sg_client_mainframe.soy.
// Please don't edit this file by hand.

define(['require','exports','lib/soyutils'],function(require,exports,soy){
 var sg_client_mainframe= sg_client_mainframe ? sg_client_mainframe : {};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_main\'><button class=\'sg_open_ps\'>Open</button></div><div class=\'sg_main\'><button class=\'sg_open_ps\'>Close</button></div><div class=\'sg_workspace\' id=\'', soy.$$escapeHtml(opt_data.config.element_id + '_workspace'), '\'>Workspace</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.workspace = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_workspace_title\'>StarGenetics Title</div>');
  sg_client_mainframe.strains(opt_data, output);
  sg_client_mainframe.experiment(null, output);
  sg_client_mainframe.all_experiments(null, output);
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.strains = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_strains_title\'>Strains</div>');
  var strainList14 = opt_data.strains;
  var strainListLen14 = strainList14.length;
  for (var strainIndex14 = 0; strainIndex14 < strainListLen14; strainIndex14++) {
    var strainData14 = strainList14[strainIndex14];
    output.append('<div class=\'sg_strain_box\'><div class=\'sg_strain_title\'>', soy.$$escapeHtml(strainData14['name']), '</div><div class=\'sg_strain_visual\'>', soy.$$escapeHtml(strainData14['visual']), '</div></div>');
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_box\'><div class=\'sg_experiment_heading\'>');
  sg_client_mainframe.experiment_heading(null, output);
  output.append('</div><div class=\'sg_experiment_parents\'></div><div class=\'sg_experiment_summary\'></div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.experiment_heading = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiment_title_group\'><div class=\'sg_experiment_title\'>Title</div><div class=\'sg_experiment_commands\'><button>Mate</button><button>Save</button><button>Discard</button></div></div><div class=\'sg_experiment_parents\'><div class=\'sg_experiment_parent\'>P1</div><div class=\'sg_experiment_parent\'>P2</div></div>');
  return opt_sb ? '' : output.toString();
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
sg_client_mainframe.all_experiments = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_experiments_history_box\'><div class=\'sg_experiment_heading\'>');
  sg_client_mainframe.experiment_heading(null, output);
  output.append('</div><div class=\'sg_experiment_parents\'></div><div class=\'sg_experiment_summary\'></div></div>');
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
