
var Sub1View = new KONtx.Class({
	ClassName: 'Sub1View',
	
	// see Javascript/core/snippetableview.js
	Extends: SnippetableView,

	createView: function() {
		this.controls.backbutton = new KONtx.control.BackButton({
			label: "Play History",
		}).appendTo(this);

		this.controls.label = new KONtx.element.Text({
			wrap: true,
			styles: {
				fontSize: KONtx.utility.scale(16),
				width: this.width,
				vAlign: "top",
				hAlign: "left",
				vOffset: 33,
				color: "#FFFFFF"
			},
		}).appendTo(this);
	},
	
	fetchData: function() {
		var u = new URL();
		u.location = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=writepython&api_key=d44fcea4e2a564b4986245ed24796ca3&format=json&limit=15";
		u.fetchAsync(this.handleFetchResponse.bindTo(this));
	},

	handleFetchResponse: function(u) {
		// do whatever you need to do to format the data and store in "result"
		var json = JSON.parse(u.result);
		var recent_tracks = json.recenttracks.track
		var text = ""
//for each(var entry in playlist.entries)
		for (i = 0; i < recent_tracks.length; i++) {
			text += i+1 + ". " + recent_tracks[i].artist["#text"] + " - " + recent_tracks[i].name + "\n";
		}

		this.controls.label.setText(text);
	},

	updateView: function() {
		this.fetchData();
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
		$preferences.addSnippet(this._getSnippetId(), { destinationId: this.config.viewId, label: "Play History" });
	},
	
	removeSnippet: function() {
		$preferences.removeSnippet(this._getSnippetId());
	}
});
