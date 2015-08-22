var webgl, gui, audio;

window.onload = function() {
    init();
};


function init() {
    webgl = new Webgl(window.innerWidth, window.innerHeight);
	audio = new Audio();
    document.getElementById('webgl').appendChild(webgl.renderer.domElement);

    //gui = new dat.GUI();
    //gui.close();

  	window.addEventListener('resize', resizeHandler, true);

    animate();
}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    webgl.render();
	//audio.getAudioData();
}
