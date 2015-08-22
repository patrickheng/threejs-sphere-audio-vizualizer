var webgl, gui;



window.onload = function() {
    var ctx = new AudioContext();
    var audio = document.getElementById('myAudio');
    var audioSrc = ctx.createMediaElementSource(audio);
    var analyser = ctx.createAnalyser();
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)

    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    // loop
    function renderFrame() {
        requestAnimationFrame(renderFrame);
        // update data in frequencyData
        analyser.getByteFrequencyData(frequencyData);
        // render frame based on values in frequencyData
        // console.log(frequencyData)
    }

    audio.play();
    renderFrame();
    init();
};


function init() {
    webgl = new Webgl(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(webgl.renderer.domElement);

    gui = new dat.GUI();
    gui.close();

  	window.addEventListener('resize', resizeHandler, true);

    animate();
}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    webgl.render();
}
