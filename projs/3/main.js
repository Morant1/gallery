'use strict';

var NUM_OF_CELLS = 16;
var gSortedNums;
var gCopyNums;
var gCopyNums2;
var gInterval;
var gElRandom;
var gTargetNum;
var gTargets = [];
var gIntervalSpeed = 5000;
var gIsGameOn = false;


function addDifficulties() {
    if (gIsGameOn) {
        if (NUM_OF_CELLS === 16) {
            NUM_OF_CELLS = 25;
        } else {
            NUM_OF_CELLS = 36;
            var elSpeed = document.querySelector('.difficult');
            elSpeed.textContent = 'Most difficult';
            elSpeed.style.color = 'red';
        }

        clearInterval(gInterval);
        initGame();
    }

}

function addSpeed() {

    if (gIsGameOn) {
        var elSpeed = document.querySelector('.speed');
        if (gIntervalSpeed !== 0) {
            gIntervalSpeed -= 1000;
            elSpeed.textContent = `${gIntervalSpeed.toString().slice(0,1)} Seconds`;
        }
        if (gIntervalSpeed === 1000) {
            elSpeed.textContent = 'The Fastest';
            elSpeed.style.color = 'red';
        }

    }

}

function initGame() {
    gIsGameOn = true;
    gSortedNums = createSortedNums();
    gCopyNums = gSortedNums.slice();
    gCopyNums2 = gSortedNums.slice();
    renderTable();
    gInterval = setInterval(renderTable, gIntervalSpeed);
    console.log("enter")

}

function closeGame() {
    clearInterval(gInterval);
    gIsGameOn = false;
    gTargets = [];
    var elTable = document.querySelector('.board');
    elTable.innerHTML = '';
    var elRandom = document.querySelector('.random_number');
    elRandom.innerText = '';
    var elSpeed = document.querySelector('.speed');
    elSpeed.textContent = 'Add Speed';
    elSpeed.style.color = 'black';
    NUM_OF_CELLS = 16;
    var elSpeed = document.querySelector('.difficult');
    elSpeed.textContent = 'Add Difficulty';
    elSpeed.style.color = 'black';


}


function createSortedNums() { //Create Array [1...16]
    var nums = [];
    for (var i = 1; i < NUM_OF_CELLS + 1; i++) {
        nums.push(i);

    }
    return nums;
}



function getRandomIntFromNums(nums) { //Take random number from array

    var random = Math.floor(Math.random() * nums.length);
    return random;

}


function renderTable() {
    gElRandom = document.querySelector('.random_number');
    gElRandom.innerText = gCopyNums2[getRandomIntFromNums(gCopyNums2)];
    var strHTML = '';
    var rowLen = Math.sqrt(NUM_OF_CELLS);
    for (var i = 0; i < rowLen; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < rowLen; j++) {
            var randomNum = getRandomIntFromNums(gCopyNums);
            strHTML += `\t<td><button class="${gTargets.includes(gCopyNums[randomNum]) ? 'clicked' : ''} button" onclick="catchEvent(this)"  style="background-color:${getRandomColor()};">${gCopyNums[randomNum]}</button></td>\n`;
            gCopyNums.splice(randomNum, 1);
        }
        strHTML += '</tr>\n';
    }


    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHTML;

    if (!catchEvent()) {
        gCopyNums = gSortedNums.slice();
    }

}



function getRandomColor() {
    var letters = 'BCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 4)];
    }
    return color;
}



function catchEvent() {
    window.onclick = function (e) {

        if (e.target.matches('.button')) {
            gTargetNum = +(e.target.innerText);
            console.log(gTargetNum)
            if (gTargetNum === +(gElRandom.innerText)) {
                e.target.classList.add('clicked');

                if (gTargets.indexOf(gTargetNum) === -1) gTargets.push(gTargetNum);
                if (gTargets.length === NUM_OF_CELLS) closeGame();

                var index = gCopyNums2.indexOf(gTargetNum);
                if (index !== -1) gCopyNums2.splice(index, 1);

                if (gCopyNums2.length === 0) {
                    gElRandom.innerText = "YOU WON!!!";
                    gElRandom.style.color = 'red';

                }

            }

        }
        return true
    }
    return false
}