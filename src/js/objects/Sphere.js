var Sphere = (function(){

    var ani = 0;

    function Sphere(type, material){
        THREE.Object3D.call(this);

		var color = 0x3facc8;
		this.type = type;
		var sphereGeometry = new THREE.SphereGeometry(0);


        this.mesh = new THREE.Line(this.geo2line(sphereGeometry), sphereMaterial[this.type], THREE.LinePieces);
        this.add(this.mesh);
    }


    Sphere.prototype = new THREE.Object3D;
    Sphere.prototype.constructor = Sphere;

    Sphere.prototype.update = function() {
		var audioDataFullTab = audio.getAudioData();
		var audioData, coef;

		switch(this.type) {
			case 'bass' :
				audioData = audioDataFullTab[0];
				break;
			case 'medium' :
				audioData = audioDataFullTab[1];
				break;
			case 'treble' :
				audioData = audioDataFullTab[2];
				break;
		}

        var randomScaleValue = getRandomArbitrary(-0.1,0.1);
        var randomPositionValue = getRandomArbitrary(-2,2);
        this.mesh.rotation.x += 0.1;
        this.mesh.rotation.y += 0.1;
        this.mesh.rotation.z += 0.1;

        this.mesh.position.x += randomPositionValue;
        this.mesh.position.y += randomPositionValue;
        this.mesh.position.z += randomPositionValue;
		
        this.mesh.scale.x  = audioData*guiConfig.sphereSize[this.type];
        this.mesh.scale.y  = audioData*guiConfig.sphereSize[this.type];
        this.mesh.scale.z  = audioData*guiConfig.sphereSize[this.type];


        if ((ani < 1) && (ani > 0)) {
            ani += .03;
            this.mesh.material.dashSize = ani;
        } else if (ani > 1) {
            ani *= -1;
            ani += .03;
            this.mesh.material.dashSize = ani * -1;
        } else {
            ani += .03;
            this.mesh.material.dashSize = ani * -1;
        }
    };


    Sphere.prototype.geo2line = function(geo) {

        var geometry = new THREE.Geometry();
        var vertices = geometry.vertices;

        for (i = 0; i < geo.faces.length; i++) {

            var face = geo.faces[i];

            if (face instanceof THREE.Face3) {

                vertices.push(geo.vertices[face.a].clone());
                vertices.push(geo.vertices[face.b].clone());
                vertices.push(geo.vertices[face.b].clone());
                vertices.push(geo.vertices[face.c].clone());
                vertices.push(geo.vertices[face.c].clone());
                vertices.push(geo.vertices[face.a].clone());

            } else if (face instanceof THREE.Face4) {

                vertices.push(geo.vertices[face.a].clone());
                vertices.push(geo.vertices[face.b].clone());
                vertices.push(geo.vertices[face.b].clone());
                vertices.push(geo.vertices[face.c].clone());
                vertices.push(geo.vertices[face.c].clone());
                vertices.push(geo.vertices[face.d].clone());
                vertices.push(geo.vertices[face.d].clone());
                vertices.push(geo.vertices[face.a].clone());

            }

        }

        geometry.computeLineDistances();

        return geometry;
    };

    return Sphere;
})();
