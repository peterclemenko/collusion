var CollusionAddon = (function() {
  var self = {
    isInstalled: function() {
      return ('onGraph' in window);
    },
    onGraph: window.onGraph,
	onConnections: window.onConnections,
    importGraph: window.importGraph,
	importConnections: window.importConnections, // version 1.0
    resetGraph: window.resetGraph,
	resetConnections: window.resetConnections,
    saveGraph: window.saveGraph,
	saveConnections: window.saveConnections,
    getSavedGraph: window.getSavedGraph, // version 0
	getSavedConnections: window.getSavedConnections, // version 1.0
    whitelistDomain: window.whitelistDomain,
    getPanelDimensions: window.getPanelDimensions,
    shareGraph: window.shareGraph,
	shareConnections: window.shareConnections
  };

  return self;
})();
