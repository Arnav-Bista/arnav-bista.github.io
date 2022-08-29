"use-strict";

const TILE_STRUCTURE = [
    "div",
    "div",
    "p",
    "img",
    "div",
    "div",
    "MultiImg",
    "div",
    "p",
    "div",
];

const TILE_CLASS = [
    "tile",
    "tile-header",
    "",
    "",
    "tile-body",
    "multi-image",
    "",
    "tile-body-detail",
    "type",
    "photo-credits",
];

const TILE_INNER = [
    "",
    "",
    "title",
    "",
    "",
    "",
    "",
    "",
    "description",
    "imgCredits",
];

function createTile(data) {
    let arr = [TILE_STRUCTURE.length];
    for (let i = 0; i < TILE_STRUCTURE.length; i++) {
        if (TILE_STRUCTURE[i] === "MultiImg") {
            let temp;
            arr[i] = document.createElement("div");
            arr[i].className = "multi-img";
            let suff = data.language.length > 1 ? "-icon.svg" : ".svg";
            for (let j = 0; j < data.language.length; j++) {
                temp = document.createElement("img");
                temp.src = "./assets/images/" + data.language[j] + suff;
                arr[i].appendChild(temp);
            }
            continue;
        }
        arr[i] = document.createElement(TILE_STRUCTURE[i]);
        if (TILE_CLASS[i] !== "") {
            arr[i].className = TILE_CLASS[i];
        }
        if (TILE_STRUCTURE[i] === "img") {
            arr[i].src = "./assets/images/" + data.img;
        }
        if (TILE_INNER[i] === "imgCredits") {
            arr[i].innerHTML = "Photo by " + data[TILE_INNER[i]];
        } else if (TILE_INNER[i]) {
            arr[i].innerHTML = data[TILE_INNER[i]];
        }
    }
    // Make sure to skip the multi img
    // TODO: make it more smart :p
    arr[7].appendChild(arr[8]);
    arr[7].appendChild(arr[9]);
    arr[4].appendChild(arr[6]);
    arr[4].appendChild(arr[7]);
    arr[1].appendChild(arr[2]);
    arr[0].appendChild(arr[1]);
    arr[0].appendChild(arr[3]);
    arr[0].appendChild(arr[4]);
    arr[0].setAttribute(`onclick`, `location.href="${data.link}"`);
    arr[0].setAttribute("style", "cursor: pointer;");
    return arr[0];
}

function builder(data) {
    let mainDiv = document.getElementsByClassName("main-content")[0];
    let ul;
    let div;
    let a;
    let tile;
    let li;
    for (let i = 0; i < data.sections.length; i++) {
        ul = document.createElement("ul");
        if (data.sections[i].data.length === 0) {
            continue;
        }
        div = document.createElement("div");
        a = document.createElement("a");
        a.innerHTML = data.sections[i].title;
        for (let j = 0; j < data.sections[i].data.length; j++) {
            li = document.createElement("li");
            tile = createTile(data.sections[i].data[j]);
            li.appendChild(tile);
            ul.appendChild(li);
        }
        div.appendChild(a);
        div.appendChild(ul);
        div.className = "section";
        // div.setAttribute(`onclick`, `location.href="${data.sections[i]}"`);
        // div.setAttribute("style", "cursor: pointer;");
        mainDiv.appendChild(div);
    }
}

fetch("../assets/data/home.json")
    .then((response) => response.json())
    .then((data) => builder(data));