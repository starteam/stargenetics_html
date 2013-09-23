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
  sg_client_mainframe.all_experiments({experiments: opt_data.model.ui.experiments}, output);
  output.append('</div>');
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
          output.append('<td class=\'sg_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData47['id']), '"><div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'', soy.$$escapeHtml(strainData47['id']), '\'></canvas></div></td>');
        }
        output.append('</tr>');
      }
      var propertyList55 = opt_data.strains.propertiesList;
      var propertyListLen55 = propertyList55.length;
      for (var propertyIndex55 = 0; propertyIndex55 < propertyListLen55; propertyIndex55++) {
        var propertyData55 = propertyList55[propertyIndex55];
        output.append('<tr><td class=\'sg_s_col_head\'>', soy.$$escapeHtml(propertyData55), '</td>');
        var strainList59 = opt_data.strains.list;
        var strainListLen59 = strainList59.length;
        for (var strainIndex59 = 0; strainIndex59 < strainListLen59; strainIndex59++) {
          var strainData59 = strainList59[strainIndex59];
          output.append('<td class=\'sg_strain_box\'>', soy.$$escapeHtml(strainData59.properties[propertyData55].text), '</td>');
        }
        output.append('</tr>');
      }
      output.append('</table>');
    } else {
      var strainList68 = opt_data.strains.list;
      var strainListLen68 = strainList68.length;
      for (var strainIndex68 = 0; strainIndex68 < strainListLen68; strainIndex68++) {
        var strainData68 = strainList68[strainIndex68];
        output.append('<div class=\'sg_strain_box sg_s_strain_box\' data-kind=\'strains\' data-id="', soy.$$escapeHtml(strainData68['id']), '"><div class=\'sg_strain_title\'>', soy.$$escapeHtml(strainData68['name']), '</div>', (opt_data.strains.visualsVisible) ? '<div class=\'sg_strain_visual\'><canvas data-kind=\'strains\' data-id=\'' + soy.$$escapeHtml(strainData68['id']) + '\'></canvas></div>' : '', '</div>');
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
  output.append('<div class=\'sg_new_experiment_box\'><div class=\'sg_title_box\'>New Experiment', (opt_data.experiment.expanded) ? '<button class=\'sg_expand\' data-kind=\'new_experiment\' data-expanded=\'false\'>Collaps</button>' + ((opt_data.experiment.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'new_experiment\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((opt_data.experiment.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'new_experiment\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'new_experiment\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (opt_data.experiment.canclearparents) ? '<button class=\'sg_clear_parents\' data-kind="new_experiment">Clear</button>' : '', (opt_data.experiment.canmate) ? '<button class=\'sg_new_experiment_mate\'>Mate</button>' : '', '</div>', (opt_data.experiment.expanded) ? '<div class=\'sg_experiment_parents\'>' + ((opt_data.experiment.parents.length < 1) ? '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>' : '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'' + soy.$$escapeHtml(opt_data.experiment.parents[0].id) + '\'>' + soy.$$escapeHtml(opt_data.experiment.parents[0].name) + '</div>') + ((opt_data.experiment.parents.length < 2) ? '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>' : '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'' + soy.$$escapeHtml(opt_data.experiment.parents[1].id) + '\'>' + soy.$$escapeHtml(opt_data.experiment.parents[1].name) + '</div>') + '</div>' : '', '</div>');
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
  var experimentList132 = opt_data.experiments.list;
  var experimentListLen132 = experimentList132.length;
  for (var experimentIndex132 = 0; experimentIndex132 < experimentListLen132; experimentIndex132++) {
    var experimentData132 = experimentList132[experimentIndex132];
    output.append('<div class=\'sg_experiment_box\'><div class=\'sg_title_box\'>', soy.$$escapeHtml(experimentData132.name), (experimentData132.expanded) ? '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\' data-expanded=\'false\'>Collaps</button>' + ((experimentData132.visualsVisible) ? '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\'  data-expanded-visuals=\'false\'>Hide Visuals</button>' : '<button class=\'sg_strain_expand_visuals\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\' data-expanded-visuals=\'true\'>Show Visuals</button>') + ((experimentData132.propertiesVisible) ? '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\' data-expanded-properties=\'false\'>Hide Properties</button>' : '<button class=\'sg_strain_expand_properties\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\' data-expanded-properties=\'true\'>Show Properties</button>') : '<button class=\'sg_expand\' data-kind=\'' + soy.$$escapeHtml(experimentData132.id) + '\'  data-expanded=\'true\'>Expand</button>', '&nbsp;', (experimentData132.canclearparents) ? '<button class=\'sg_rename\' data-kind="' + soy.$$escapeHtml(experimentData132.id) + '">Rename</button>' : '', (experimentData132.canmate) ? '<button class=\'sg_experiment_mate\'>Add progenies</button>' : '', '</div>');
    if (experimentData132.expanded) {
      output.append('<div class=\'sg_experiment_parents\'>', (experimentData132.parents.length < 1) ? '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>' : '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'' + soy.$$escapeHtml(experimentData132.parents[0].id) + '\'>' + soy.$$escapeHtml(experimentData132.parents[0].name) + '</div>', (experimentData132.parents.length < 2) ? '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\'>Drop strain here</div>' : '<div class=\'sg_experiment_parent\' data-kind=\'new_experiment\' data-id=\'' + soy.$$escapeHtml(experimentData132.parents[1].id) + '\'>' + soy.$$escapeHtml(experimentData132.parents[1].name) + '</div>', '</div><div class=\'sg_experiment_progeny_list\'>');
      var oList194 = experimentData132.list;
      var oListLen194 = oList194.length;
      for (var oIndex194 = 0; oIndex194 < oListLen194; oIndex194++) {
        var oData194 = oList194[oIndex194];
        output.append('<div class=\'sg_experiment_progeny\' data-strain=\'', soy.$$escapeHtml(oData194.id), '\' data-kind=\'', soy.$$escapeHtml(experimentData132.id), '\'>', soy.$$escapeHtml(oData194.name), '</div>');
      }
      output.append('</div>');
    }
    output.append('</div>');
  }
  return opt_sb ? '' : output.toString();
};
for(var i in sg_client_mainframe) { exports[i] = sg_client_mainframe[i] };
});
