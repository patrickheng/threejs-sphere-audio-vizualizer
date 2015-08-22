var Sphere = (function(){

    var ani = 0;

    function Sphere(){
        THREE.Object3D.call(this);

        var sphereGeometry = new THREE.SphereGeometry(0);
        var material = new THREE.MeshBasicMaterial({color: 0x3facc8, wireframe: true});

        
        var sphereMaterialDashed = new THREE.LineDashedMaterial({
            color: 0x833ea0,
            dashSize: 1,
            scale: 1,
            gapSize: 1.5,
            lineWidth: 10
        });


        this.mesh = new THREE.Line(this.geo2line(sphereGeometry), sphereMaterialDashed, THREE.LinePieces);
        this.add(this.mesh);
    }


    Sphere.prototype = new THREE.Object3D;
    Sphere.prototype.constructor = Sphere;

    Sphere.prototype.update = function() {
        var randomScaleValue = getRandomArbitrary(-0.1,0.1);
        var randomPositionValue = getRandomArbitrary(-1,1);
        console.log(this);
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
        this.mesh.rotation.z += 0.01;

        this.mesh.position.x += randomPositionValue;
        this.mesh.position.y += randomPositionValue;
        this.mesh.position.z += randomPositionValue;

        this.mesh.scale.x    += randomScaleValue;
        this.mesh.scale.y    += randomScaleValue;
        this.mesh.scale.z    += randomScaleValue;


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