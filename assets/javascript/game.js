'use strict';

// Global variabls
let wins = 0;
let losses = 0;
let targetNum = 0;
let userNum = [0];
let crystals = [0, 0, 0, 0];
let crystalClicked = 0;
let reducedArray = 0;

$(document).ready(function() {
    newGame();
});

const newGame = function() {
    randomNumGen();
    resetDOM();
    gameLevel();
};

const randomNumGen = function() {
    targetNum = Math.floor(Math.random() * 101) + 19;
    for (let i = 0; i < 5; i++) {
        crystals[i] = Math.floor(Math.random() * 12);
    }
};

const resetDOM = function() {
    $('.wins').text(wins);
    $('.losses').text(losses);
    userNum[0] = 0;
    $('.users-num').text(userNum[0]);
    $('.target-num').text(targetNum);
};

const gameLevel = function() {
    $('.crystal').click(function() {
        crystalClicked = parseInt($(this).attr("value"));
        userNum.push(crystals[crystalClicked]);
        reducedArray = userNum.reduce(function(accu, elem) {
            return accu + elem;
        }, 0);
        userNum = [];
        userNum[0] = reducedArray;
        $('.users-num').text(userNum[0]);
        if (userNum[0] === targetNum) {
            wins++;
            if (wins > 1) {
                $('.crystal').off('click');
                finalWin();
                return;
            };
            $('.crystal').off('click');
            newGame();
        } else if (userNum[0] > targetNum) {
            losses++;
            if (losses > 10) {
                $('.crystal').off('click');
                gameOver();
                return;
            };
            $('.crystal').off('click');
            newGame();
        }
    });
};

const gameOver = function() {
    $(".wins").empty();
    $(".losses").text("Game Over");
};

const finalWin = function() {
    $(".losses").empty();
    $(".wins").text("You Won!");
};