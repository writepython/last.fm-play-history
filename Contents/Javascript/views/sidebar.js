
var MainView = new KONtx.Class({
	ClassName: 'MainView',
	
	Extends: KONtx.system.SidebarView,

	createView: function() {
		this.controls.button1 = new KONtx.control.TextButton({
			label: "Load Subview #1 w/ foo = 33",
			guid: "button1",
			events: {
				onSelect: function(event) {
					KONtx.application.loadView('view-Sub1', { foo: 99 });
				}
			},
			styles: {
				width: Theme.viewSpecs.SIDE_BAR.width,
				height: KONtx.utility.scale(35),
				vOffset: 0,
			}
		}).appendTo(this);
		
		this.controls.button2 = new KONtx.control.TextButton({
			label: "Load Subview #1 w/ foo = 42",
			guid: "button2",
			events: {
				onSelect: function(event) {
					KONtx.application.loadView('view-Sub1', { foo: 42 });
				}
			},
			styles: {
				width: Theme.viewSpecs.SIDE_BAR.width,
				height: KONtx.utility.scale(35),
				vOffset: KONtx.utility.scale(35),
			}
		}).appendTo(this);
		
		this.controls.button3 = new KONtx.control.TextButton({
			label: "Load Subview #2",
			guid: "button3",
			events: {
				onSelect: function(event) {
					KONtx.application.loadView('view-Sub2');
				}
			},
			styles: {
				width: Theme.viewSpecs.SIDE_BAR.width,
				height: KONtx.utility.scale(35),
				vOffset: KONtx.utility.scale(70),
			}
		}).appendTo(this);
		
		new KONtx.control.EmptySpace({
			styles: {
				vOffset: KONtx.utility.scale(105),
				height: Theme.viewSpecs.SIDE_BAR.height - KONtx.utility.scale(105),
			},
		}).appendTo(this);
	}
});
