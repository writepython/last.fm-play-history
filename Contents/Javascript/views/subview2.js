
var Sub2View = new KONtx.Class({
	ClassName: 'Sub2View',
	
	// see Javascript/core/snippetableview.js
	Extends: SnippetableView,
	
	createView: function() {
		this.controls.backbutton = new KONtx.control.BackButton({
			label: "Subview #2",
		}).appendTo(this);
		
		this.controls.label = new KONtx.element.Text({
			label: "Hello World!",
			styles: {
				fontSize: KONtx.utility.scale(24),
				vAlign: "center",
				hAlign: "center",
				color: "#FFFFFF"
			},
		}).appendTo(this);
	},
	
	_getSnippetId: function() {
		// this is an example of a way to make a unique snippet id
		// if you copy the pattern, make sure that it is globally unique
		return "psnip-sview2";
	},
	
	checkIsDockSnippet: function() {
		return $preferences.isDockSnippet(this._getSnippetId());
	},
	
	addSnippet: function() {
		$preferences.addSnippet(this._getSnippetId(), { destinationId: this.config.viewId, label: "View #2" });
	},
	
	removeSnippet: function() {
		$preferences.removeSnippet(this._getSnippetId());
	}
});
