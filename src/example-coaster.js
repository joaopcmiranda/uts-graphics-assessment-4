import * as THREE from "three";

export {exampleCoasterPath};


var exampleCoasterPath = function() {

    // up hill
    // turn right
    // turn right
    // big dip, then small dip
    // turn right
    // turn right & reconnect
    

    var out = new THREE.CurvePath();

    out.add(new THREE.LineCurve3(new THREE.Vector3(-20, 20, 0), new THREE.Vector3(0, 20, 0)));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 20, 0), new THREE.Vector3(5, 20, 0), new THREE.Vector3(10, 25, 0)
    ));
    out.add(new THREE.LineCurve3(new THREE.Vector3(10, 25, 0), new THREE.Vector3(20, 35, 0)));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(20, 35, 0), new THREE.Vector3(25, 40, 0), new THREE.Vector3(30, 40, 0)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(30, 40, 0), new THREE.Vector3(35, 40, 0), new THREE.Vector3(35, 40, 10)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(35, 40, 10), new THREE.Vector3(35, 40, 20), new THREE.Vector3(30, 30, 20)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(30, 30, 20), new THREE.Vector3(20, 10, 20), new THREE.Vector3(10, 20, 20)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(10, 20, 20), new THREE.Vector3(5, 25, 20), new THREE.Vector3(-5, 15, 20)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-5, 15, 20), new THREE.Vector3(-10, 10, 20), new THREE.Vector3(-15, 15, 20)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-15, 15, 20), new THREE.Vector3(-20, 20, 20), new THREE.Vector3(-25, 20, 20)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-25, 20, 20), new THREE.Vector3(-30, 20, 20), new THREE.Vector3(-30, 20, 10)
    ));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-30, 20, 10), new THREE.Vector3(-30, 20, 0), new THREE.Vector3(-20, 20, 0)
    ));



    return out;


}