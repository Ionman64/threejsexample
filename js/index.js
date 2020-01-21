"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
    const container = document.getElementById("canvas");
    const width = getClientWidth();
    const height = getClientHeight();
    window.engine = new Engine();
    engine.init(container, width, height);
});

function getClientHeight() {
    return window.innerHeight;
}

function getClientWidth() {
    return window.innerWidth;
}


class Engine {
    renderer = null;
    scene = null;
    camera = null;
    light = null;
    stats = null;
    init(canvas, width, height) {

        const view_angle = 45;
        const aspect = width/height;
        const near = 1;
        const far = 10000;

        if (window.WebGL2RenderingContext) {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
        }
        else {
            alert("Please upgrade your browser");
            return;
        }

        
        this.camera = new THREE.PerspectiveCamera(view_angle, aspect, near, far);

        this.scene = new THREE.Scene();

        this.light = new THREE.AmbientLight(0xffffff);

        this.scene.add(this.camera);

        this.renderer.setSize(width, height);
        canvas.appendChild(this.renderer.domElement);

        this.scene.add(this.light);

        this.addStartElements(this.scene);

        this.stats = new Stats();
        this.stats.setMode(0);

        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.left = "0px";
        this.stats.domElement.style.top = "0px";
        canvas.appendChild(this.stats.domElement);
        
        requestAnimationFrame(this.render);
    }
    addStartElements(scene) {
        const RADIUS = 50;
        const SEGMENTS = 16;
        const RINGS = 16;

        const sphereMaterial =
        new THREE.MeshLambertMaterial(
            {
            color: 0xCC0000
            });

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!
        const sphere = new THREE.Mesh(

        new THREE.BoxGeometry(
            20,20,20
        ),

        sphereMaterial);

        // Move the Sphere back in Z so we
        // can see it.
        sphere.position.z = -300;
        sphere.name = "box";

        // Finally, add the sphere to the scene.
        scene.add(sphere);
    }
    render() {
        var engine = window.engine;

        const box = engine.scene.getObjectByName("box");

        box.rotation.y += 0.01;
        box.rotation.x += 0.01;
        // Draw!
        engine.renderer.render(engine.scene, engine.camera);

        // Schedule the next frame.
        requestAnimationFrame(engine.render);

        engine.stats.update();
    }
}
