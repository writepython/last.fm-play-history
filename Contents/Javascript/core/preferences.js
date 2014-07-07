
// helper class to handle preferences storage
// including version control
$preferences = function() {
	var options = {};
	
	// this should get incremented each time you change the format of what gets saved
	var current_options_version = 1;
	
	var staticInit = function() {
		fetchConfig();
	}();
	
	function fetchConfig() {
		try {
			options = JSON.parse(platform.currentAppData.get("options"));
		} catch(e) {
			initConfig();
		}
		
		if(options.version != current_options_version) {
			// you really should do a data migration here instead of just throwing away people's existing config
			// this is just a sample though
			initConfig();
		}		
	}
	
	// this should get modified to the structure of what you save into the preferences
	function initConfig() {
		options = {
			'version': current_options_version,
			'snippets': {}
		}
	};
	
	function saveConfig() {
		try {
			platform.currentAppData.set("options", JSON.stringify(options));
		} catch (e) {
			log("\n\n!!!!!!!!!!!!!!!!!Error saving config preferences!\n!!!!!!!!!!!!!!!!!!!!!!\n\n");
		}
	}
	
	// public callable methods
	return {
		'getProfileSnippetConfsHandler': function() {
			fetchConfig();
			var snippets = [];
			for each(var snippet in options.snippets) {
				// preferences shouldn't try to stringify the viewClass, so tacking that on now
				snippet.viewClass = DynamicSnippetView;
				snippets.push(snippet);
			}
			KONtx.application.setProfileSnippetViews(snippets);
		},
		'isDockSnippet': function(snippetId) {
			fetchConfig();
			return snippetId in options.snippets;
		},
		'addSnippet': function(snippetId, snippetData) {
			fetchConfig();
			if(snippetId in options.snippets) {
				log("attempt to add duplicate snippet!");
				return;
			}
			snippetData = snippetData || {};
			options.snippets[snippetId] = { id: snippetId, data: snippetData };
			saveConfig();
			
			// we shouldn't save a view class into the preferences store, so tacking that on now
			var config = options.snippets[snippetId];
			config.viewClass = DynamicSnippetView;
			
			KONtx.application.addViewConfig(config);
		},
		'removeSnippet': function(snippetId) {
			fetchConfig();
			if(!(snippetId in options.snippets)) {
				log("attempt to remove non-existant snippet!");
				return;
			}
			options.snippets[snippetId] = null;
			delete options.snippets[snippetId];
			saveConfig();
			KONtx.application.removeView(snippetId);
		}
	}
}();
