var Webgl = (function() {

    function Webgl(width, height) {

        var self = this;

        // Basic three.js setup
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.z = 500;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xecf0f1);


        this.spheres = [];
        this.spheresNb = 0;
        this.spheresLimit = 20;

        this.interval = setInterval(function(){

            self.spheres[self.spheresNb] = new Sphere(0x3facc8);
            self.spheres[self.spheresNb].position.set(
                getRandomArbitrary(-300, 300), 
                getRandomArbitrary(-300, 300), 
                getRandomArbitrary(-300, 300));

            self.scene.add(self.spheres[self.spheresNb]);

            self.spheresNb++;

            self.render();

            if(self.spheresNb >= self.spheresLimit) {
                clearInterval(self.interval);
            }
        }, 100);
    };


    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.render = function() {
        this.renderer.render(this.scene, this.camera);

        for (var i = 0; i < this.spheres.length; i++) {
            this.spheres[i].update();
        };

    };

    return Webgl;

})();

// Generics functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};
