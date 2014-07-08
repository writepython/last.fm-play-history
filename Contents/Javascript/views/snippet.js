
var StaticSnippetView = new KONtx.Class({
	ClassName: 'StaticSnippetView',
	
	// Pay attention to the fact this one extends from AnchorSnippetView
	// That is because this snippet always exists in all profiles and 
	// isn't a "custom" one added per user action
	Extends: KONtx.system.AnchorSnippetView,
		
	createView: function() {
		this.controls.text = new KONtx.element.Text({
			// What is shown in the dock
			label: "Last.fm User Play History",
			styles: {
				fontSize: KONtx.utility.scale(20),
				vAlign: "center",
				hAlign: "center",
				color: "#FFFFFF"
			},
		}).appendTo(this);
	},
});
