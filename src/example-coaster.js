import * as THREE from "three";

export {exampleCoasterPath};


var exampleCoasterPath = function() {

    // up a hill
    // flatten out, turn right
    // drop down, come back up & turn right
    // drop into dip, turn further right
    // larger hill
    // final dip, flatten back out
    // turn right to meet initial

    // points:
    // 0, 20, 0
    // 5, 20, 0
    // 10, 25, 0
    // 20, 35, 0
    // 25, 40, 0
    // 35, 40, 0
    // 35, 40, 10
    

    var out = new THREE.CurvePath();

    out.add(new THREE.LineCurve3(new THREE.Vector3(-10, 20, 0), new THREE.Vector3(0, 20, 0)));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 20, 0), new THREE.Vector3(5, 20, 0), new THREE.Vector3(10, 25, 0)
    ));
    out.add(new THREE.LineCurve3(new THREE.Vector3(10, 25, 0), new THREE.Vector3(20, 35, 0)));
    out.add(new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(20, 35, 0), new THREE.Vector3(25, 40, 0), new THREE.Vector3(30, 40, 0)
    ));



    return out;


}