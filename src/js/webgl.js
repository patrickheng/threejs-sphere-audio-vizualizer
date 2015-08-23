var Webgl = (function() {

    function Webgl(width, height) {

        var self = this;

        // Basic three.js setup
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.z = 800;

        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x0);



        this.spheres = [];
        this.spheresNb = 0;
        this.spheresLimit = 60;

		var audioCategories = ['bass','medium','treble']

        this.interval = setInterval(function(){
			var randomType = audioCategories[Math.floor(Math.random() * audioCategories.length)];

            self.spheres[self.spheresNb] = new Sphere(randomType);
            self.spheres[self.spheresNb].position.set(
                getRandomArbitrary(-400, 400),
                getRandomArbitrary(-400, 400),
                getRandomArbitrary(-400, 400));

            self.scene.add(self.spheres[self.spheresNb]);

            self.spheresNb++;

            self.render();

            if(self.spheresNb >= self.spheresLimit) {
                clearInterval(self.interval);
            }
        }, 700);
    };


    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.camera.lookAt(this.scene.position);
    };

    Webgl.prototype.render = function() {
        this.renderer.render(this.scene, this.camera);

        for (var i = 0; i < this.spheres.length; i++) {
            this.spheres[i].update();
        };

        var timer = Date.now() * 0.0010;

        this.camera.position.x += Math.sin(timer)*5;
        this.camera.position.y += Math.cos(timer)*5;
        this.camera.position.z += Math.sin(timer)*5;
        this.camera.lookAt(this.scene.position);


    };

    return Webgl;

})();

// Generics functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};
