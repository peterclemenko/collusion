var graphCallback = null;
var connectionsCallback = null;


unsafeWindow.onGraph = function onGraph(cb) {
  graphCallback = cb;
  self.port.emit("initGraph");
};

unsafeWindow.onConnections = function onConnections(cb){
	connectionsCallback = cb;
	self.port.emit('initConnections');
}

unsafeWindow.setCollusionSounds = function setCollusionSounds(flag){
    console.log('set collusion sounds: ', flag);
    self.port.emit('setCollusionSounds', flag);
};

/* Called by add-on to set the last value of saved sounds pref to checkbox */
self.port.on('initSounds', function(flag){
    console.log('soundsFlag restored: ', flag);
    unsafeWindow.document.getElementById('play-sounds').checked = !!flag;
    
});


/* resetGraph effectively wipes out the graph in storage
 * because after it is called, an empty graph is passed
 * to 'self.port.on("log")'.
 */
unsafeWindow.resetGraph = function resetGraph() {
	// version 0
    self.port.emit('reset');
};

unsafeWindow.resetConnections = function resetConnections(){
	// version 1.0
	self.port.emit('resetConnections');
};

unsafeWindow.importGraph = function importGraph(data) {
	// version 0
	self.port.emit('import', data);
};

unsafeWindow.importConnections = function importConnections(data){
	// version 1.0
	self.port.emit('importConnections', data);
};

unsafeWindow.saveGraph = function saveGraph(data) {
	// version 0
    self.port.emit('save', data);
};

unsafeWindow.saveConnections = function saveConnections(data){
	// version 1.0
	self.port.emit('saveConnections', data);
};

unsafeWindow.getSavedGraph = function getSavedGraph() {
	// version 0
    self.port.emit('getSavedGraph');
};

unsafeWindow.getSavedConnections = function getSavedConnections(){
	// version 1.0
	self.port.emit('getSavedConnections');
}

unsafeWindow.whitelistDomain = function whitelistDomain(domain) {
  self.port.emit('whitelistDomain', {"domain": domain});
};

unsafeWindow.shareGraph = function shareGraph() {
	// version 0
    self.port.emit('uploadGraph');
};

unsafeWindow.shareConnections = function shareConnections(){
	// version 1.0
	self.port.emit('shareConnections');
}

self.port.on("initGraph", function(graphjson) {
  graph = JSON.parse(graphjson);
  if (graphCallback) {
    self.port.emit('save', JSON.stringify(graph)); // WTF? Why are we re-stringifying?
    graphCallback(graph);
  }
});

self.port.on('initConnections', function(connectionsjson){
	connections = JSON.parse(connectionsjson);
	if (connectionsCallback){
		self.port.emit('saveConnections', connectionsjson);
		connectionsCallback(connections);
	}
	
});

self.port.on("getSavedGraph", function(saved_graph) {
	// version 0
    self.port.emit('import', saved_graph);
    window.location.reload();
});

self.port.on('getSavedConnections', function(saved_connections){
	// version 1.0
	self.port.emit('import_connections', saved_connections);
	window.location.reload();
});

