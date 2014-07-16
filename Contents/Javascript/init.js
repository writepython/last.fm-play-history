
include("Framework/kontx/1.1/src/all.js");

include("Javascript/core/preferences.js");
include("Javascript/core/snippetableview.js");

include("Javascript/views/snippet.js");
include("Javascript/views/dynamicsnippet.js");
include("Javascript/views/sidebar.js");
include("Javascript/views/subview1.js");
include("Javascript/views/subview2.js");

KONtx.application.init({
	views: [
		{ id: 'view-Main', viewClass: MainView },
		{ id: 'view-Sub1', viewClass: Sub1View },
//		{ id: 'view-Sub2', viewClass: Sub2View },
		{ id: 'view-Settings', viewClass: KONtx.views.AboutBox },
		{ id: 'snippet-main', viewClass: StaticSnippetView },
	],
	defaultViewId: 'view-Main',
	settingsViewId: 'view-Settings',
});

$preferences.getProfileSnippetConfsHandler.subscribeTo(KONtx.application, ['getProfileSnippetConfs'], $preferences);
