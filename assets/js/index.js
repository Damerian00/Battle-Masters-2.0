// imports of JSON
// import armorShop from '/assets/json/armorShop.json' with { type: "json" };
// import weaponShop from '/assets/json/weaponShop.json' with { type: "json" };

//create JS classes 


//intialized variables and locate html classes
let viewPort, heroScreen, merchShop, battle, stats, ctext, player, enemyStats, opponent, displayPort, selection,tName, tClass, tWeap, tArm, tHealth, mPortal;

// Hero Object Template
let heroSelected = {
    name: 'Player',
    class: '',
    // currently equiped armor. armors have name;mobility;amount
    currentArmor: {},
    // list of armor objects player owns
    armors: [],
    //current weapon equipped by player. weapons have multiple attack options attackDmg : [min, max]; bonusDmg [min,max or none] calcDmg() returns totalDmg; bonus ? min, max : 0  
    currentWeapon: [],
    // list of weapon objects player owns
    weapons : [],
    health: 100
}

// Enemy Object Template
let enemySelected= {
    name:'',
    dmg :[],
    debuff: 0,
    mobility : 0
}

let weaponShop = [
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Basic Elemental Staff",
        "attackName" : ["Fire Bolt", "Artic Freeze"],
        "attackDmg" : [[1,8],[4,6]],
        "bonusDmg" : [[1,3],["none"]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Basic Nature Staff",
        "attackName" : ["Wisp Bolt", "Leech Health"],
        "attackDmg" : [[1,6],[4,10]],
        "bonusDmg" : [["none"],[0,1.1]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Rogue"],
        "type" : "Dual Wielding Daggers",
        "name": "Basic Daggers",
        "attackName" : ["Dual Swipe", "Sweet Spot"],
        "attackDmg" : [[1,4],[8,12]],
        "bonusDmg" : [["none"],[1,3]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Rogue"],
        "type" : "Bow and Arrow",
        "name": "Wooden Bow",
        "attackName" : ["Basic Shot", "Stunning Shot"],
        "attackDmg" : [[1,6],[1,4]],
        "bonusDmg" : [["none"],["none"]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Warrior"],
        "type" : "Shielded",
        "name": "Stone Mace and Wooden Shield",
        "attackName" : ["Basic Attack", "Shield Bash"],
        "attackDmg" : [[1,8],[1,4]],
        "bonusDmg" : [["none"],["none"]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Warrior"],
        "type" : "Two-Handed",
        "name": "Two-Handed Iron Sword",
        "attackName" : ["Two-handed Swing", "Power Attack"],
        "attackDmg" : [[1,10],[10,20]],
        "bonusDmg" : [["none"],[1,3]],
        "descr" : "",
        "cost": 0
    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Pyro Staff",
        "attackName" : ["Fire Bolt", "Conflagrate"],
        "attackDmg" : [[1,8],[4,6]],
        "bonusDmg" : [[1,3],[0.25,1]],
        "descr" : "fires fire bolts to build up daMagician on enemy then when activate sets enemy ablaze per mark of fire for that many turns",
        "cost": 10
    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Hydro Staff",
        "attackName" : ["Hyrdo Spray", "Glaciate"],
        "attackDmg" : [[1,6],[4,10]],
        "bonusDmg" : [[1],[0.25,1]],
        "descr" : "sprays water causing minbor daMagician that when frozen causes major daMagician and holds enemy in stasis until it breaks free after certain amount of turns based on marks",
        "cost": 10
    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Dryad Staff",
        "attackName" : ["Needle Spray", "Entangle"],
        "attackDmg" : [[1,8],[4,6]],
        "bonusDmg" : [[1,3],[0.25,1]],
        "descr" : "sprays needles that clings to enemy, needles grow to pierce and restrict enemy based on needles attached for a set amount of turns equal to needles on enemy",
        "cost": 10
    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Staff",
        "name": "Lich Staff",
        "attackName" : ["Acid Spray", "Life Steal"],
        "attackDmg" : [[1,6],[4,10]],
        "bonusDmg" : [[1],[0.25,1]],
        "descr" : "sprays acid to expose skin, absorbs life essence to heal self from exposed skin",
        "cost": 10
    },    
    {
        "classRestrict" : ["Rogue"],
        "type" : "Dual Wielding Daggers",
        "name": "+1 Daggers",
        "attackName" : ["Dual Swipe", "Sweet Spot"],
        "attackDmg" : [[2,5],[9,13]],
        "bonusDmg" : [["none"],[2,4]],
        "descr" : "",
        "cost": 10
    },
    {
        "classRestrict" : ["Rogue"],
        "type" : "Bow and Arrow",
        "name": "Composite Bow",
        "attackName" : ["Basic Shot", "Stunning Shot"],
        "attackDmg" : [[2,7],[1,5]],
        "bonusDmg" : [["none"],["none"]],
        "descr" : "",
        "cost": 10
    }
];
let armorShop = [
    {
        "classRestrict" : ["Magician","Rogue","Warrior"],
        "type" : "Clothing",
        "name": "Basic Clothing",
        "Defense" : 0,
        "mobility" : 3,
        "cost": 0

    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Clothing",
        "name": "Apprentice Robe",
        "Defense" : 1,
        "mobility" : 3,
        "cost":  10

    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Clothing",
        "name": "Mobility Robe",
        "Defense" : 0,
        "mobility" : 4,
        "cost" : 20

    }, 
    {
        "classRestrict" : ["Magician"],
        "type" : "Clothing",
        "name": "Bulwark Robe",
        "Defense" : 2,
        "mobility" : 2,
        "cost" : 50

    },
    {
        "classRestrict" : ["Magician"],
        "type" : "Clothing",
        "name": "Master Robe",
        "Defense" : 5,
        "mobility" : 5,
        "cost" : 550

    },
    {
        "classRestrict" : ["Rogue","Warrior"],
        "type" : "Light Armor",
        "name": "Leather Vest",
        "Defense" : 3,
        "mobility" : 2,
        "cost" : 0

    },
    {
        "classRestrict" : ["Rogue","Warrior"],
        "type" : "Light Armor",
        "name": "Leather Tunic",
        "Defense" : 4,
        "mobility" : 2,
        "cost" : 10

    },
    {
        "classRestrict" : ["Warrior"],
        "type" : "Generic Heavy Armor",
        "name": "Iron Armor",
        "Defense" : 4,
        "mobility" : 0,
        "cost" : 0

    },
    {
        "classRestrict" : ["Warrior"],
        "type" : "Heavy Armor",
        "name": "Chain Mail Armor",
        "Defense" : 5,
        "mobility" : 0,
        "cost" : 10

    },
    {
        "classRestrict" : ["Warrior"],
        "type" : "Heavy Armor",
        "name": "Steel Armor",
        "Defense" : 6,
        "mobility" : 1,
        "cost" : 100

    }

    
];
class fighter {
    #health = 100;
    constructor(name){
        this.name = name;
    }
    getHealth(){
        return this.#health;
    }
    subHealth(val){
        val = (val < 0)? 0: val;
        this.#health -= val;
        if (this.#health <=0){
            this.#health = 0;
            //winLoss function
        }
    }
    addHealth(val){
        this.#health = (this.#health + val > 100)? 100: this.#health + val;
    }
    getName(){
        return this.name;
    }
}

// hero class holds players values and extends fighter
class hero extends fighter {
    dmgPerRound = 0;
    totalDmg = 0;
    bonusDmg = 0;
    constructor (name,heroClass,armor,attack1, attack2){
        super(name);
        name = name;
        this.heroClass = heroClass;
        this.armor = armor;
        this.attack1 = attack1;
        this.attack2 = attack2;
    }
    getHeroClass(){
        return this.heroClass;
    }
    getArmor(){
        return this.armor.name;
    }
    addArmorDefense(amt){
        this.armor.amount += amt;
    }
    calcDmg(attack){
        if (disabled == true){
            disabled = false;
        }
        if (attack == 'no'){
            return;
        }
        this.dmgPerRound = 0;
        if (attack == "a1"){
            this.dmgPerRound = Math.floor(Math.random() *((this.attack1.attack.attackDmg[1] + 1)-this.attack1.attack.attackDmg[0]))+this.attack1.attack.attackDmg[0];
            return this.dmgPerRound;
        }else {
            // toggles cooldown on special attacks
            disabled = true;
            this.dmgPerRound = Math.floor(Math.random() *((this.attack2.attack.attackDmg[1] + 1)-this.attack2.attack.attackDmg[0]))+this.attack2.attack.attackDmg[0];
            return this.dmgPerRound; 
        } 
    }
    calcBonus(){
        if (this.attack1.attack.bonusDmg[0] !== "none"){
            this.bonusDmg = Math.floor(Math.random() *((this.attack1.attack.bonusDmg[1]+ 1)-this.attack1.attack.bonusDmg[0]))+this.attack1.attack.bonusDmg[0]; 
            this.totalDmg += this.bonusDmg;
            return this.bonusDmg;
        }else{
            this.bonusDmg = Math.floor(Math.random() *((this.attack2.attack.bonusDmg[1] +1)-this.attack2.attack.bonusDmg[0]))+this.attack2.attack.bonusDmg[0];
            this.totalDmg +=this.bonusDmg;
            return this.bonusDmg;
        }
    }
}

// enemy class extends fighter class to create opponent to fight
class enemy extends fighter {
    debuff = 0;
    edmgPerRound = 0;
    etotalDmg = 0;
    constructor(name,mobility,attack){
        super(name)
        name=name;
        this.mobility = mobility;
        this.attack = attack; 
    } 
    calcDmg(){
        this.edmgPerRound = Math.floor(Math.random() *((this.attack[1]+1)-this.attack[0] +1))+this.attack[0];
        // console.log("enemy does", this.dmgPerRound, this.totalDmg)
        this.etotalDmg += this.edmgPerRound
        return this.edmgPerRound;    
    }
}
//intiate elements
function intitate(){
    viewPort= document.querySelector('.viewport');
    heroScreen = document.querySelector('.heroScreen');
    merchShop = document.querySelector('.merchantPortal');
    battle = document.querySelector('.battle');
    stats = document.querySelector('.stats');
    selection = document.querySelector('.selection')
    tName = document.querySelector('.tName');
    tClass = document.querySelector('.tClass');
    tWeap = document.querySelector('.tWeap');
    tArm = document.querySelector('.tArm');
    tHealth = document.querySelector('.tHealth');
    mPortal= document.querySelector('.merchantPortal')
}

function addButtons(id, txt, val){
    let button = document.createElement("button")
    let node = document.createTextNode(txt)
    button.appendChild(node);
    button.setAttribute("id", id);
    button.setAttribute("value", val);
    return button;
}

function createElement(el, c, i, txt, val){
    let element = document.createElement(el);
    if (c !== undefined){
        element.classList.add(c);
    }
    if (i !== undefined){
        element.setAttribute("id", i);
    }
    if (txt !== undefined){
        let node = document.createTextNode(txt)
        element.appendChild(node);
    }
    if(val !== undefined){
        element.setAttribute("value", val);
    }
    return element;
}

//functions
function gameStart(){
    intitate();
    let par = createElement("p", "displayPort");
    viewPort.appendChild(par).innerHTML = `Welcome noble champion to Battle Masters, a turn based game. This game will allow you to create a champion to do battle against various enemy types. You will have the option to choose the hero class as well as what gear they will use in combat. Prior to choosing who you shall battle. Defeating each enemy in battle grants you more gold to spend on upgrading your arsenal in the merchant shop. Please click on the button below to begin";`;
    document.querySelector('#btn').classList.add("hidden")
    let btn = createElement("button", undefined, "start", "Player Creation", "Player Creation")
    viewPort.appendChild(btn).addEventListener("click", choosePlayer);

   
}

function choosePlayer(){
    document.querySelector('#start').remove();
    document.querySelector('.userInterface').classList.remove('hidden');
    if (true){
        createHero();
    }else{
        loadSaves();
    }
    //load saved
    //create new
    displayPort = document.querySelector('.displayPort');
    displayPort.innerHTML= `Please choose a Hero Class. You have three options to choose from: Warrior, Magician, and a Rogue. Please click on each option to view the class description and then click on visit shop to make your selection and advance to the merchant shop where you will choose your armaments.`;
    
}
function loadSaves(){
    console.log('Loading Saves...');

}
function createHero (i){
    if (i == 'remind'){
        displayPort.innerHTML = 'You must select a class to continue.'
        }
    let warBtn = createElement("button", "Warrior", "Warrior", "Warrior", "Warrior" );
    let MagicianBtn = createElement("button", "Magician", "Magician", "Magician", "Magician" );
    let rgBtn = createElement("button", "Rogue", "Rogue", "Rogue", "Rogue" )
    selection.appendChild(warBtn).addEventListener("click", describeHero);
    selection.appendChild(MagicianBtn).addEventListener("click", describeHero);
    selection.appendChild(rgBtn).addEventListener("click", describeHero);
    let ontoSHop = createElement("button", "shop", undefined, "Visit Shop", "shop");
    selection.appendChild(ontoSHop).addEventListener("click", merchantShop);
}

function describeHero (event){
    let e = event.target;
    let choice;
    const heroDescription = 
    [
        {
            "name" : "Warrior",
            "desc" : `Warriors are the best at defense and can equip the heaviest of armors they can also provide some pretty good offensive daMagician with their weapons. They have 2 weapon proficiencies to choose from: One handed weapon and shield or a two-handed weapon. They can also wear all armor types.` 
        },
        {
            "name" : "Magician",
            "desc" : `Magicians don't wear armor, however, with the powerful magic they wield it sort of makes up for that minor indiscretion. They can specialize in one of two schools of magic:  elemental or nature to wreak havoc on their foes.` 
        },
        {
            "name" : "Rogue",
            "desc" : `Rogues provide a good balance between the two. They can don light armors, and They can specialize in dual daggers or bow and arrow to deliver precise attacks that may cause lethal daMagician to their opponents.` 
        }

    ]
    for (let i = 0; i<heroDescription.length; i++){
        if (heroDescription[i].name === e.value){
            choice = i;
            break;
        }
    }
    displayPort.innerHTML = heroDescription[choice].desc;
    heroSelected.class = heroDescription[choice].name;
    
}

function merchantShop(){
    selection.innerHTML = '';
    if (heroSelected.class == ''){
        createHero('remind');
        return;
    }
    console.log(heroSelected);
    tClass.innerHTML= heroSelected.class;
    document.querySelector('.descrHero').classList.remove('hidden');
    document.querySelector('.merchantPortal').classList.remove('hidden');
    // create the shop
    addArmors()
}
// function to add armors based on what is in the armor shop
function addArmors (){
    let container = createElement("div","armorContainer")
    mPortal.appendChild(container);
    // filters armor array by which classs can use it
    let filteredArmor = armorShop.filter((item) => item.classRestrict.includes(heroSelected.class))
    // creates the items in the shop: includes name, stats, and price
    console.log(filteredArmor)
    for (let i=0;i<filteredArmor.length; i++){
        let item = (createElement("div", "item"));
        item.appendChild(createElement("header")).appendChild(createElement("p", undefined, undefined, "Name: ")).appendChild(createElement("p",undefined,undefined,filteredArmor[i].name));
        item.appendChild(createElement("section")).appendChild(createElement("p", undefined, undefined, `Defense: ${filteredArmor[i].Defense}` )).appendChild(createElement("p", undefined, undefined, `Mobility: ${filteredArmor[i].mobility}`)).appendChild(createElement("p", undefined, undefined, `Cost: ${filteredArmor[i].cost}`))
        item.appendChild(createElement("footer")).appendChild(createElement("button", undefined, undefined, `Puchase ${filteredArmor[i].name}`, filteredArmor[i].name));
        container.appendChild(item);
              
    }

}