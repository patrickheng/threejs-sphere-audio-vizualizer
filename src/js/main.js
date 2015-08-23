var webgl, gui, audio, stats, guiConfig, sphereMaterial;

guiConfig = {
	sphereSize    : {
		treble: 0.05, medium: 0.01, bass: 0.01
	}, sphereColor: {
		treble: 0x3facc3, medium: 0xe67e22, bass: 0x2ecc71
	}
}

sphereMaterial = {
	"treble" : new THREE.LineDashedMaterial({
		color: guiConfig.sphereColor.treble,
		dashSize: 1,
		scale: 1,
		gapSize: 1.5,
		lineWidth: 10
	}),
		"medium" : new THREE.LineDashedMaterial({
		color: guiConfig.sphereColor.medium,
		dashSize: 1,
		scale: 1,
		gapSize: 1.5,
		lineWidth: 10
	}),
		"bass" : new THREE.LineDashedMaterial({
		color: guiConfig.sphereColor.bass,
		dashSize: 1,
		scale: 1,
		gapSize: 1.5,
		lineWidth: 10
	})
}

window.onload = function() {
	init();
};

function init() {



	webgl = new Webgl(window.innerWidth, window.innerHeight);
	audio = new Audio();

	// DAT.GUI
	gui = new dat.GUI();
	gui.close();

	var shpereSizeFolder = gui.addFolder('Spheres Sizes');
	var shpereColorFolder = gui.addFolder('Spheres Colors');

	shpereSizeFolder.add(guiConfig.sphereSize, "treble").min(0).max(0.2).step(0.01);
	shpereSizeFolder.add(guiConfig.sphereSize, "medium").min(0).max(0.1).step(0.01);
	shpereSizeFolder.add(guiConfig.sphereSize, "bass").min(0).max(0.1).step(0.01);
	shpereSizeFolder.open();

	shpereColorFolder.addColor(guiConfig.sphereColor, 'bass').onChange(function(){
		sphereMaterial.bass.color.setHex(dec2hex(guiConfig.sphereColor.bass));
		console.log(sphereMaterial.bass.color);
	});
	shpereColorFolder.addColor(guiConfig.sphereColor, 'medium').onChange(function(){
		sphereMaterial.medium.color.setHex(dec2hex(guiConfig.sphereColor.medium));
		console.log(sphereMaterial.medium.color);
	});
	shpereColorFolder.addColor(guiConfig.sphereColor, 'treble').onChange(function(){
		sphereMaterial.treble.color.setHex(dec2hex(guiConfig.sphereColor.treble));
		console.log(sphereMaterial.treble.color);
	});
	shpereColorFolder.open();

	// Add stats
	stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms, 2: mb
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';



	document.getElementById('webgl').appendChild(webgl.renderer.domElement);
	document.body.appendChild(stats.domElement);

	window.addEventListener('resize', resizeHandler, true);

	animate();
}

function resizeHandler() {
	webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {

	stats.begin();
	requestAnimationFrame(animate);
	webgl.render();
	stats.end();
}

function dec2hex(i) {
	var result = "0x000000";
	if(i >= 0 && i <= 15) {
		result = "0x00000" + i.toString(16);
	}
	else if(i >= 16 && i <= 255) {
		result = "0x0000" + i.toString(16);
	}
	else if(i >= 256 && i <= 4095) {
		result = "0x000" + i.toString(16);
	}
	else if(i >= 4096 && i <= 65535) {
		result = "0x00" + i.toString(16);
	}
	else if(i >= 65535 && i <= 1048575) {
		result = "0x0" + i.toString(16);
	}
	else if(i >= 1048575) {
		result = '0x' + i.toString(16);
	}
	if(result.length == 8) {
		return result;
	}
}