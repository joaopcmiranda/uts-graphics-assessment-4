import * as THREE from "three";


export {setupCartController};
export {updateCartPosition};


// Things to go on the GUI
var gravity = 100;
var friction = 0.005;
var lift_speed = 10;




var progress = 0;
var velocity = 0;
var track_length = 1;


var setupCartController = function(track) {
    // To be run once at the start
    // takes a CurvePath track
    track_length = track.getLength();
}



var updateCartPosition = function(track, delta) {
    // To be run every frame


    // Update velocity based on gravity & how steep the track we're on is
    let slope = track.getTangent(progress / track_length).y;
    
    // velocity -= gravity * slope * delta;
    velocity -= gravity * slope * 0.01; // test
    
    // friction
    velocity *= (1 - (friction));


    // Velocity is at least lift hill speed

    velocity = Math.max(velocity, lift_speed);


    // Move our progress based on velocity
    // progress += velocity * delta;
    progress += velocity * 0.01; // test

    // We want to make sure (progress / track_length) is within [0, 1]
    // so progress needs to be within [0, track_length]
    progress = progress % track_length;


    // console.log(delta);

    return progress; // for rendering the cart / moving the camera elsewhere

}