
var Sub1View = new KONtx.Class({
	ClassName: 'Sub1View',
	
	// see Javascript/core/snippetableview.js
	Extends: SnippetableView,

	createView: function() {
		this.controls.backbutton = new KONtx.control.BackButton({
			label: "Subview #1",
		}).appendTo(this);
		this.controls.label = new KONtx.element.Text({
			styles: {
				fontSize: KONtx.utility.scale(24),
				vAlign: "center",
				hAlign: "center",
				color: "#FFFFFF"
			},
		}).appendTo(this);
	},
	
	updateView: function() {
		this.parent();
		this.controls.label.setText("Foo = " + this.persist.foo);
	},
	
	_getSnippetId: function() {
		// this is an example of a way to make a unique snippet id
		// if you copy the pattern, make sure that it is globally unique
		return "psnip-sview1-" + this.persist.foo;
	},
	
	checkIsDockSnippet: function() {
		return $preferences.isDockSnippet(this._getSnippetId());
	},
	
	addSnippet: function() {
		$preferences.addSnippet(this._getSnippetId(), { destinationId: this.config.viewId, label: "View #1 w/ Foo = " + this.persist.foo, customData: { foo: this.persist.foo } });
	},
	
	removeSnippet: function() {
		$preferences.removeSnippet(this._getSnippetId());
	}
});
