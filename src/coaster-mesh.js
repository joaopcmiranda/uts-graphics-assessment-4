import * as THREE from "three";


export {createCoasterMesh};

var halfTrackWidth = 1;
// half track width to avoid /2 later (may change?)
var trackRadius = 0.3;
var trackMaterial = new THREE.MeshStandardMaterial(); // change later


var crossbarSpacing = 5;
// really more approximate spacing, to avoid two oddly close / far crossbars at the "end" of a closed loop
var crossbarRadius = 0.2;
var crossbarMaterial = new THREE.MeshStandardMaterial(); // change later


var supportSpacing = 8;
// approximate spacing
var supportRadius = 0.2;
var supportWidth = 5;
var supportMaterial = new THREE.MeshStandardMaterial(); // change later


var createCoasterMesh = function (path) {
    // take a path, create the appropriate meshes
    // takes a single CurvePath



    // Generate side track curves

    var leftTrackPath = new THREE.CurvePath();

    var rightTrackPath = new THREE.CurvePath();

    for (let i = 0; i < path.curves.length; i++) {


        if (path.curves[i].v0 === undefined) { 
            // line curves have no v0
            // this feels cursed but javascript has forced my hand


            // Line curve: v1, v2

            // get direction from v1 to v2
            let dir = new THREE.Vector3().subVectors(path.curves[i].v2, path.curves[i].v1);
            dir.normalize();

            // get perpendicular direction to track: cross with up vector
            // should be pointing "right" from the track
            let perp = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));
            perp.normalize();

            // add paths offset by perp distance
            
            let rightV1 = path.curves[i].v1.clone();
            rightV1.addScaledVector(perp, halfTrackWidth);

            let rightV2 = path.curves[i].v2.clone();
            rightV2.addScaledVector(perp, halfTrackWidth);

            rightTrackPath.add(new THREE.LineCurve3(rightV1, rightV2));


            let leftV1 = path.curves[i].v1.clone();
            leftV1.addScaledVector(perp, -halfTrackWidth);

            let leftV2 = path.curves[i].v2.clone();
            leftV2.addScaledVector(perp, -halfTrackWidth);

            leftTrackPath.add(new THREE.LineCurve3(leftV1, leftV2));
            

        } else {
            // Quadratic curve: v0, v1, v2

            // get direction from v0 to v1
            let dir1 = new THREE.Vector3().subVectors(path.curves[i].v1, path.curves[i].v0);
            dir1.normalize();

            // get perpendicular direction to track: cross with up vector
            // should be pointing "right" from the track
            let perp1 = new THREE.Vector3().crossVectors(dir1, new THREE.Vector3(0, 1, 0));
            perp1.normalize();


            // get direction from v1 to v2
            let dir2 = new THREE.Vector3().subVectors(path.curves[i].v2, path.curves[i].v1);
            dir2.normalize();

            // get perpendicular direction to track: cross with up vector
            // should be pointing "right" from the track
            let perp2 = new THREE.Vector3().crossVectors(dir2, new THREE.Vector3(0, 1, 0));
            perp2.normalize();


            // add paths offset by perp distance

            let rightV0 = path.curves[i].v0.clone();
            rightV0.addScaledVector(perp1, halfTrackWidth);

            let rightV1 = path.curves[i].v1.clone();
            rightV1.addScaledVector(perp1, halfTrackWidth);
            rightV1.addScaledVector(perp2, halfTrackWidth);

            let rightV2 = path.curves[i].v2.clone();
            rightV2.addScaledVector(perp2, halfTrackWidth);

            rightTrackPath.add(new THREE.QuadraticBezierCurve3(rightV0, rightV1, rightV2));

            let leftV0 = path.curves[i].v0.clone();
            leftV0.addScaledVector(perp1, -halfTrackWidth);

            let leftV1 = path.curves[i].v1.clone();
            leftV1.addScaledVector(perp1, -halfTrackWidth);
            leftV1.addScaledVector(perp2, -halfTrackWidth);

            let leftV2 = path.curves[i].v2.clone();
            leftV2.addScaledVector(perp2, -halfTrackWidth);

            leftTrackPath.add(new THREE.QuadraticBezierCurve3(leftV0, leftV1, leftV2));

            

        }
    }

    var leftTrackModel = new THREE.Mesh(
        new THREE.TubeGeometry(leftTrackPath, 64, trackRadius),
        trackMaterial
    );

    var rightTrackModel = new THREE.Mesh(
        new THREE.TubeGeometry(rightTrackPath, 64, trackRadius),
        trackMaterial
    );


    // Generate crossbars

    var nCrossbars = Math.floor(path.getLength() / crossbarSpacing);

    var crossbarMeshes = [];

    for (let i = 0; i < nCrossbars; i++) {

        let crossbarGeom = new THREE.BoxGeometry(halfTrackWidth * 2, crossbarRadius, crossbarRadius);
        // may replace box geometry with a better one later
        // box is just easy since you can directly set its width
        crossbarMeshes[i] = new THREE.Mesh(crossbarGeom, crossbarMaterial);

        crossbarMeshes[i].lookAt(path.getTangent((i + 0.5) / nCrossbars));
        let newPosition = path.getPointAt((i + 0.5) / nCrossbars);
        // i + 0.5 avoids the crossbars being placed directly on the ends of the path
        // effectively, you divide the track into i equally spaced regions,
        // then place crossbars in the middle of each region
        crossbarMeshes[i].position.x = newPosition.x;
        crossbarMeshes[i].position.y = newPosition.y;
        crossbarMeshes[i].position.z = newPosition.z;

    }
    


    // TODO: Generate supports

    var nSupports = Math.floor(path.getLength() / supportSpacing);


    var supportMeshes = [];

    for (let i = 0; i < nSupports; i++) {
        // supports look like crossbar just below track with poles reaching down to ground
        // TubeGeometry probably

        let centrePoint = path.getPointAt((i + 0.5) / nSupports);
        let forwardDir = path.getTangent((i + 0.5) / nSupports);
        let rightDir = new THREE.Vector3().crossVectors(forwardDir, new THREE.Vector3(0, 1, 0));
        rightDir.normalize();

        let point1 = new THREE.Vector3(centrePoint.x - (rightDir.x * supportWidth/2), 0, centrePoint.z - (rightDir.z * supportWidth/2));
        let point2 = new THREE.Vector3(centrePoint.x - (rightDir.x * supportWidth/2), centrePoint.y - (trackRadius/2), centrePoint.z - (rightDir.z * supportWidth/2));
        let point3 = new THREE.Vector3(centrePoint.x + (rightDir.x * supportWidth/2), centrePoint.y - (trackRadius/2), centrePoint.z + (rightDir.z * supportWidth/2));
        let point4 = new THREE.Vector3(centrePoint.x + (rightDir.x * supportWidth/2), 0, centrePoint.z + (rightDir.z * supportWidth/2));

        let supportCurve = new THREE.CurvePath();
        supportCurve.add(new THREE.LineCurve3(point1, point2));
        supportCurve.add(new THREE.LineCurve3(point2, point3));
        supportCurve.add(new THREE.LineCurve3(point3, point4));

        let supportGeom = new THREE.TubeGeometry(supportCurve, 64, supportRadius);

        supportMeshes[i] = new THREE.Mesh(supportGeom, supportMaterial);

    }





    // Group everything up and return it as one object

    var output = new THREE.Group();

    output.add(leftTrackModel);
    output.add(rightTrackModel);

    for (let i = 0; i < crossbarMeshes.length; i++) {
        output.add(crossbarMeshes[i]);
    }

    for (let i = 0; i < supportMeshes.length; i++) {
        output.add(supportMeshes[i]);
    }


    return output;


};

