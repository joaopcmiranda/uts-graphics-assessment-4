import * as THREE from "three";

const { LineCurve3, QuadraticBezierCurve3, Vector3, CurvePath } = THREE;
type CurvePath = THREE.CurvePath<Vector3>;
type Vector3 = THREE.Vector3;

const exampleCoasterPath = (): CurvePath => {

    // up hill
    // turn right
    // turn right
    // big dip, then small dip
    // turn right
    // turn right & reconnect

    const out = new CurvePath<Vector3>();

    out.add(new LineCurve3(new Vector3(-20, 20, 0), new Vector3(0, 20, 0)));
    out.add(new QuadraticBezierCurve3(
        new Vector3(0, 20, 0), new Vector3(5, 20, 0), new Vector3(10, 25, 0)
    ));
    out.add(new LineCurve3(new Vector3(10, 25, 0), new Vector3(20, 35, 0)));
    out.add(new QuadraticBezierCurve3(
        new Vector3(20, 35, 0), new Vector3(25, 40, 0), new Vector3(30, 40, 0)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(30, 40, 0), new Vector3(35, 40, 0), new Vector3(35, 40, 10)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(35, 40, 10), new Vector3(35, 40, 20), new Vector3(30, 30, 20)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(30, 30, 20), new Vector3(20, 10, 20), new Vector3(10, 20, 20)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(10, 20, 20), new Vector3(5, 25, 20), new Vector3(-5, 15, 20)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(-5, 15, 20), new Vector3(-10, 10, 20), new Vector3(-15, 15, 20)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(-15, 15, 20), new Vector3(-20, 20, 20), new Vector3(-25, 20, 20)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(-25, 20, 20), new Vector3(-30, 20, 20), new Vector3(-30, 20, 10)
    ));
    out.add(new QuadraticBezierCurve3(
        new Vector3(-30, 20, 10), new Vector3(-30, 20, 0), new Vector3(-20, 20, 0)
    ));

    return out;
};
export {exampleCoasterPath};


