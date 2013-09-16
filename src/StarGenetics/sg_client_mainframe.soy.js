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
  output.append('<div class=\'sg_workspace\'><div class=\'sg_workspace_title\'>StarGenetics Title</div>');
  sg_client_mainframe.strains({strains: opt_data.model.ui.strains}, output);
  sg_client_mainframe.new_experiment({experiment: opt_data.model.ui.new_experiment}, output);
  sg_client_mainframe.experiment(null, output);
  output.append('<div class=\'sg_experiments_history_box\'><div class=\'sg_experiment_heading\'></div><div class=\'sg_experiment_parents\'></div><div class=\'sg_experiment_summary\'></div></div></div>');
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
  output.append('<div class=\'sg_strains_box\'><div class=\'sg_title_box\'>Strains', (opt_data.strains.expanded) ? '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.strains.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'strains\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.strains.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'strains\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'strains\' data-expanded=\'true\'>Expand</button>', '</div>');
  if (opt_data.strains.expanded) {
    if (opt_data.strains.propertiesVisible) {
      output.append('<table><thead><td class=\'sg_s_col_head sg_s_row_head\'>Name</td>');
      var strainList38 = opt_data.strains.list;
      var strainListLen38 = strainList38.length;
      for (var strainIndex38 = 0; strainIndex38 < strainListLen38; strainIndex38++) {
        var strainData38 = strainList38[strainIndex38];
        output.append('<td class=\'sg_strain_box sg_s_row_head\'>', soy.$$escapeHtml(strainData38['name']), '</td>');
      }
      output.append('</thead>');
      if (opt_data.strains.visualsVisible) {
        output.append('<tr><td class=\'sg_s_col_head\'>Visual</td>');
        var strainList47 = opt_data.strains.list;
        var strainListLen47 = strainList47.length;
        for (var strainIndex47 = 0; strainIndex47 < strainListLen47; strainIndex47++) {
          var strainData47 = strainList47[strainIndex47];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData47['visual']), '</td>');
        }
        output.append('</tr>');
      }
      var propertyList53 = opt_data.strains.propertiesList;
      var propertyListLen53 = propertyList53.length;
      for (var propertyIndex53 = 0; propertyIndex53 < propertyListLen53; propertyIndex53++) {
        var propertyData53 = propertyList53[propertyIndex53];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData53), '</td>');
        var strainList57 = opt_data.strains.list;
        var strainListLen57 = strainList57.length;
        for (var strainIndex57 = 0; strainIndex57 < strainListLen57; strainIndex57++) {
          var strainData57 = strainList57[strainIndex57];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData57.properties[propertyData53]), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList66 = opt_data.strains.list;
      var strainListLen66 = strainList66.length;
      for (var strainIndex66 = 0; strainIndex66 < strainListLen66; strainIndex66++) {
        var strainData66 = strainList66[strainIndex66];
        output.append('<div class=\'sg_strain_box sg_s_strain_box\'><div class=\'sg_strain_title\'>', soy.$$escapeHtml(strainData66['name']), '</div>', (opt_data.strains.visualsVisible) ? '<div class=\'sg_strain_visual\'>' + soy.$$escapeHtml(strainData66['visual']) + '</div>' : '', '</div>');
      }
    }
  } else {
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
sg_client_mainframe.new_experiment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>New Experiment', (opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'new_experiment\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Expand</button>', '&nbsp;<button>Clear</button><button>Mate</button></div>', (opt_data.experiment.expanded) ? '<div class=\'sg_experiment_parents\'><div class=\'sg_experiment_parent\'>Drop strain here</div><div class=\'sg_experiment_parent\'>Drop strain here</div></div>' : '', '</div>');
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
  output.append('<div class=\'sg_experiment_box\'><div class=\'sg_title_box\'>Experiment 1<button>Expand</button><button>Show Visuals</button><button>Show Properties</button>&nbsp;<button>Rename</button><button>Add progenies</button></div></div><div class=\'sg_experiment_box\'><div class=\'sg_title_box\'>Experiment 2<button>Expand</button><button>Show Visuals</button><button>Show Properties</button>&nbsp;<button>Rename</button><button>Add progenies</button></div></div>');
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
  output.append('<div class=\'sg_experiments_history_box\'><div class=\'sg_experiment_heading\'></div><div class=\'sg_experiment_parents\'></div><div class=\'sg_experiment_summary\'></div></div>');
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
