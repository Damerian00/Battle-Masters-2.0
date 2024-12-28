// imports of JSON
import * as armorShop from '/assets/json/armorShop.json';
import * as weaponShop from '/assets/json/weaponShop.json';

//intialized variables and locate classes
let viewPort, heroScreen, merchShop, battle, stats, ctext, player, enemyStats, opponent;
let armorShop = armorShop;
let weaponShop = weaponShop;
viewPort= document.querySelector('.viewport');
heroScreen = document.querySelector('.heroScreen');
merchShop = document.querySelector('.merchantPortal');
battle = document.querySelector('.battle');
stats = document.querySelector('.stats');

function gameStart(){
    console.log("welcome");
}