
// If enough of you like this pattern here, we will include this as a stock view type in the Framework
// so please let us know if that's the case via the forums

var SnippetableView = new KONtx.Class({
	ClassName: 'SnippetableView',
	
	Extends: KONtx.system.SidebarView,
	
	updateView: function() {
		this._setFavActionIndicator();
	},
	
	_setFavActionIndicator: function() {
		if(this.checkIsDockSnippet && this.checkIsDockSnippet.call) {
			if(this.checkIsDockSnippet()) {
				// this enables the filled in star in the bottom row of buttons in the sidebar
				// it's purpose is to indicate it's already a snippet and by pressing yellow you will delete it from being a snippet
				KONtx.HostEventManager.send('setFavAction', { viewID: this.config.viewId, action: 'delete' });
			} else {
				// this enables the empty star in the bottom row of buttons in the sidebar
				// it's purpose is to indicate it's not already a snippet and by pressing yellow you will add it as a snippet
				KONtx.HostEventManager.send('setFavAction', { viewID: this.config.viewId, action: 'add' });
			}
		}
	},
	
	favbutton: function(event) {
		this.parent(event);
		
		switch(event.payload.action) {
			case 'app-fav-add': 
				var dialog = new KONtx.dialogs.Alert({
					title: "Add Custom Bookmark",
					message: "Would you like to add a bookmark to the dock which will take you directly here in the future?",
					buttons: [
						{ label: "Ok", callback: (function() {
							this.addSnippet();
							this._setFavActionIndicator();
						}).bindTo(this) },
						{ label: "Cancel" }
					]
				});
				break;
			case 'app-fav-delete':
				var dialog = new KONtx.dialogs.Alert({
					title: "Delete Custom Bookmark",
					message: "Would you like to remove the bookmark from the dock which you added which takes you directly to here?",
					buttons: [
						{ label: "Cancel" },
						{ label: "Ok", callback: (function() {
							this.removeSnippet();
							this._setFavActionIndicator();
						}).bindTo(this) }
					]
				});
				break;
			default:
				return;
		}
		dialog.show();
	}
});
