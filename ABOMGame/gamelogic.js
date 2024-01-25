function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(radians) {
    return radians * (180 / Math.PI);
  }

function createMap(w, h, bg = ".", fg = "#") {
    var map = [];
    map.push(fg.repeat(w));
    for (var i = 0; i < h - 2; i++) {
        map.push(fg + bg.repeat(w - 2) + fg);
    }
    map.push(fg.repeat(w));
    return map;
}
var canMove = true;
var map1 = `                                                                                                 +---------------------+-----------+
                                                                                                 |                     |           |
                                                                                                 |  +------------+     +-----------+
                                                                                                 |                                 |
     +----------------+                                                                          |                          T      |
     |                |                                                                          |  +------------+                 |
     |                |                                                                          |                                 |
     |                +--------------------------------------------------------------------+----------------------------+          |
     |                                                                                     |     |                                 |
     |       V                                                                             |     |                                 |
     |                                                                                     v     v                      +----------+
     |                +-------------+   +----------------------+   +-------------+      T                               |
     |                |             |   |                      |   |             |         ^     ^                      |
     |                |             |   |                      |   |             |         |     |                      |
     +----------------+             |   |                      |   |             |         |     |                      |         +
                                    |   |                      |   |             +---------+-----+-------------+        |    X    |
                                    |   |                      |   |                                           |        |         |
              +--+--+--+--+--+--+---+   +----------------+ +---+   +--+--------------------------------------+ |        |  X   X  +---+
              |  |  |  |  |  |  |   |   |                | |          |                                      | |        +XXX  XXX X   XX  +-----------------+
              |  v  |  |  |  |  |   +> <+     +------+   | |          |                                      | |       +  XXXXXXXX     XXX|    +------------|
              |     |  |  |  |  |           +-+  ||  +-+ | |          |                                      | |       |    XXXXXX   T    |X   |           ||
              |     |  |  |  |  |           | |  ||  | | | |          +--------------------------------------+ |       |  X   X     +----------+     XX XX ||
              |     |  v  |  |  |           +-+  ++  +-+ | |                             T                   | |   X+--+                 X| X  |      X X  ||
              |     |     |  v  |            T|      |   | |                                                 | |  XX    X   +---------+XXX|XX  +------------|
              |     |     v     |           +-+      +-+ | |                                                 | |     X    V +XX      XX   X---------X-------+
              |     |           v           | | +--+ | | | |                                                 | |   T            ?   X
              | T   v                       +-+------+-+ | |                                                 | |X         X   X  + XX           X     X
              |                                          | +-----+ +-------+   +-----+ +-----+   +-----------+ | X  X   X   XXXXX|X XX     X
              +------------------------------------------+ |               |   |             |   |           | |   XX+       ? XX++ X X
                                                           |               |   |             |   +           | |  XXX+--+-+   XXX   XX           X
+-------------------------------------------------+        |      T        |   |             |       T V     | |        |    V     X
|                        XXXXXXXXXXXXXXXXX        |        |               |   |             |   +           | |        |      X  X
|                         XXXXXXXXXXXXXX          |        |               |   |           T |   |           | |        |  XXXX XX
|   +----------+         XXXXXXXXXXXXX            |        +---------------+---+-------------+---+-----------+ |        |XXX
|   |       I  |          X X XXXXXXX             |                                                            |        |XX
|   |          v        XX       XX XX            +------------------------------------------------------------+        |
|   |            T       X    T                       X           X  X     X    X     X           X                     |
|   |          ^           X                   X              X           X                   X               T         |
|   |          |                                X       X        X  X             X          X X   X                    |
|   +----------+                                  +---------------------------------------------------------------------+
|                                    X            |
|                                                 |
+-------------------------------------------------+
`.split("\n");
var playerX = 26;
var playerY = 13;
var prevChar = " ";
var displayWidth = 20;
var displayHeight = 15;
function displayMap(map, startX=Math.max(0, playerX - displayWidth / 2), startY=Math.max(0, playerY - displayHeight / 2), width=displayWidth, height=displayHeight) {
    var displayContent = map.slice(startY, startY + height)
        .map(function (row) {
            return row.substring(startX, startX + width);
        })
        .join("\n");

    document.getElementById("display").innerHTML = displayContent;
}


function changeLine(map, coords, newchar) {
    map[coords[1]] = map[coords[1]].substring(0, coords[0]) + newchar + map[coords[1]].substring(coords[0] + 1);
    return map;
}

function movePlayer(direction, currentMap) {

    if (!canMove) {
        return;
    }

    canMove = false;
    setTimeout(function () {
        canMove = true;
    }, 50); // Set the delay in milliseconds

    var collstr = "#-+|X%dpP";
    var dialogue = document.getElementById("dialogue");
    dialogue.style.display = "none";
    // Remove the player from the current position
    currentMap[playerY] = currentMap[playerY].substring(0, playerX) + prevChar + currentMap[playerY].substring(playerX + 1);

    // Update player coordinates based on the direction
    if (direction === "left" && playerX > 0 && !(collstr.includes(currentMap[playerY][playerX - 1]))) {
        playerX--;
    } else if (direction === "right" && playerX < currentMap[playerY].length - 1 && !(collstr.includes(currentMap[playerY][playerX + 1]))) {
        playerX++;
    } else if (direction === "up" && playerY > 0 && !(collstr.includes(currentMap[playerY - 1][playerX]))) {
        playerY--;
    } else if (direction === "down" && playerY < currentMap.length - 1 && !(collstr.includes(currentMap[playerY + 1][playerX]))) {
        playerY++;
    }

    // Place the player in the new position
    prevChar = currentMap[playerY][playerX];
    if (prevChar == "#" || prevChar == "T") {
        dialogue.style.display = "";
        dialogue.innerHTML = dialogueObjects[playerY + "," + playerX];
        console.log(playerY, playerX);
    }
    currentMap[playerY] = currentMap[playerY].substring(0, playerX) + "P" + currentMap[playerY].substring(playerX + 1);

    // Update the displayed map
    displayMap(currentMap);
}


var musicPlaying = false;


// DIALOGUE //

var dialogueObjects = {
  // TEXT
  "16,26": `What seems to be a highly damaged garage. The halting barriers and scanning devices to your right are highly damaged.`,
  "66,30": `In the radiation lab, you can tell what eradicated life in this area. All forms of devices are clicking inside your suit.`,
  "91,32": `The weapons bay is almost completely empty. Not that you needed ammunition, but did they have that many dangers to face?`,
  "101,30": `"Please save us from this madness."`,
  "115,25": `The entire side of the wall has been completely destroyed. Blood and rubble stain the ground. What caused this?`,
  "32,22": `The elevator seems to be running on auxiliary power. A lever with a light above it is seen inside.`,
  "45,23": `It's a standard Worldsoc humvee. Extra armor plating, better engine, and a better turret on top.<br>It seemed to be under maintenance.`,
  "89,22": `Looked like a lab where samples of whatever needed to be tested on were put under the microscope.<br>It's wrecked.`,
  "88,11": `A double-sided security gate. It was just wide enough for you to pass through.<br>Not that it would matter, with the entire facility being decommissioned.`,
  "124,4": `The cafeteria was empty, left in the midst of a pizza Friday lunch.<br>It was rotting.`,
  "133,20": `The remnants of a Leopard 2A6 main battle tank. The turret was decapitated and set back on the engine of the tank.<br>Whatever caused this might still be around.`,
  "110,37": `The hallway stretches on for a while. Blood and corpses line the floor.`,
  "30,36": `An enormous mass of flesh, bodies, and carcasses; a mass grave.`,
  
  // BODIES
  "103,30": `A woman lies on the ground, her body cut 43 times. The entire top portion of her head was missing, eaten by a creature of some sorts.<br>Her mouth was stuck in an expression of pain.`,
  "122,24": `A male security guard wearing a standard uniform would be stuck against the wall, rebar piercing his chest.<br>His left arm was still hanging onto the metal.`,
  "125,28": `The body is unrecognizable, only an arm sticking out from underneath the concrete.`,

  //UNKNOWNS
  "128,25": `This creature was abhorrent to look at. The body didn't look like it could move at all.<br>Large, scythe-esque arms formed at the wrist and extended for meters.<br>It might even be able to pierce your armor.`,
  "125,28": `The mass of flesh looked more like a clump of faces and bodies rather than a collective, composed being.<br>It writhed and still flinched when you walked close to it, and you saw a pair of eyes look at your visor.<br>Without hesitation, you exterminated it.`  
}

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowLeft":
            movePlayer("left", map1);
            break;
        case "ArrowRight":
            movePlayer("right", map1);
            break;
        case "ArrowUp":
            movePlayer("up", map1);
            break;
        case "ArrowDown":
            movePlayer("down", map1);
            break;
    }
});

displayMap(map1);