
var DynamicSnippetView = new KONtx.Class({
	ClassName: 'DynamicSnippetView',
	
	// Pay close attention to the fact this extends from ProfileSnippetView and not SnippetView or AnchorSnippetView
	// This is required for all dynamically added snippets as snippets are profile (aka user) specific and 
	// when another profile logs onto the TV they have their own set of snippets which need to be loaded
	Extends: KONtx.system.ProfileSnippetView,
		
	initView: function() {
		// we have to catch the snippet activation event and do our custom behavior
		this._handleActivateSnippet.subscribeTo(this, ['onActivateSnippet'], this);
	},
	
	_handleActivateSnippet: function(event) {
		// here we stop the default behavior and indicate that we are authoritative for this event and not to send it anywhere else
		event.preventDefault();
		event.stopPropagation();
		
		// This is a special case of KONtx.application.loadView() which is used here because we aren't allowed to call loadView right now
		// The details of how it works isn't important to you, just focus on the parameters
		// param1 = the event which you received as the single parameter to this function. This is REQUIRED and will break otherwise
		// param2 = the view ID of what you want loaded. This is the same thing as the first parameter to loadView()
		// param3 = the custom data object you want to pass to the view. This is th same thing as the second parameter to loadView()
		KONtx.application.setHostResultToViewId(event, this.config.data.destinationId, this.config.data.customData);
	},
	
	createView: function() {
		// you could of course do a lot more customization inside the view than this
		// but this is just a basic example
		this.controls.label = new KONtx.element.Text({
			label: "Last.fm Play History",
			styles: {
				fontSize: KONtx.utility.scale(20),
				vOffset: KONtx.utility.scale(20),
				hAlign: "center",
				color: "#FFFFFF"
			},
		}).appendTo(this);
		
		this.controls.label2 = new KONtx.element.Text({
			label: this.config.data.label,
			styles: {
				fontSize: KONtx.utility.scale(20),
				vOffset: KONtx.utility.scale(45),
				hAlign: "center",
				color: "#FFFFFF"
			},
		}).appendTo(this);
	},
	
	updateView: function() {
		// we have no dynamic data in this snippet, so no need to update. If you did (like the Finance widget for example), you would have code here
	}
});
