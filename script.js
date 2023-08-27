let XP = 0 ;
let Health = 100 ;
let Gold = 50 ;
let currentWeapon = 0 ;
let sellWeapon = 0 ;
let fighting = 1;
let monsterHealth ;
let inventory = {Stick: 1} ;

const but1 = document.querySelector("#button1")
const but2 = document.querySelector("#button2")
const but3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterName")
const monsterHealthText = document.querySelector("#monsterHealth")

const locations = [
  { // locations[0] --> Town Square
    name: "town square", 
    but_texts: ["Go to store", "Go to cave", "Fight dragon"], 
    but_funcs: [GoStore, GoCave, FightDragon], 
    text: "You are now in Town Square.."
  }, 
  { // locations[1] --> Store
    name: "store", 
    but_texts: ["Eat", "Weapons", "Exit store"], 
    but_funcs: [BuyHealth, BuyWeapon, GoTown], 
    text: "You entered Kalakkan Stores.."
  },
  { // locations[2] --> Cave
    name: "cave", 
    but_texts: ["Fight Slime", "Fight Beast", "Go back"], 
    but_funcs: [FightSlime, FightBeast, GoTown], 
    text: "You entered an unusually dark cave. \nYou spot some monsters noticing you!"
  },
  { // locations[3] --> Fight
    name: "fight", 
    but_texts: ["Attack", "Dodge", "Run away"], 
    but_funcs: [Attack, Dodge, RunAway], 
    text: "FIGHT NIGHT!\nThe monster is staring deeply at your soul. It wants you DEAD!\nAnd you are about to collapse to the floor, but you hold yourself together.\n\n"
  },
  { // locations[4] --> Kill
    name: "kill", 
    but_texts: ["Intimidate others", "Fight again", "Exit cave"], 
    but_funcs: [Intimidate, Fight, GoTown], 
    text: "You defeated a monster. You feel proud seeing its blood flow inside the cave. However some monsters did watch you defeat it. They are raging to attack you.\n"
  },
  { // locations[5] --> Lose
    name: "lose", 
    but_texts: ["Restart", "Survive with 10 health", "End game"], 
    but_funcs: [Restart, Survive, EndGame], 
    text: "You unfortunately lost the battle with the monster. However you manage to escape its sight to prevent it from consuming you.\nYou now have 3 options:\n1. Restart the game with 100 health, 50 gold and 1 weapon\n2. Start the game with 10 health, same gold, same weapons you currently have\n3. End the game"
  }
]

const weapons = [
  {
    name: "Stick", 
    power: 5, 
    cost: 20, 
    sell: 8, 
    feature: "You can now try throwing or swinging with this stick when you fight monsters. It wont hurt them much tho :(", 
    attacks: [
      {
        name: "Swing", 
        desc: "You wildly swing with your stick and try hurting the monster. It was a very weak attack as it didnt hurt the monster at all.", 
        damage: 3
      }, 
      {
        name: "Throw", 
        desc: "You throw a stick and it hits the monsters eyes. Good shot, but the monster recovers quickly.", 
        damage: 5
      }
    ]
  },
  {
    name: "Rod", 
    power: 15, 
    cost: 25, 
    sell: 10, 
    feature: "You can now swing with this rod to attack the monster when fighting. Use this when they are not expecting your move for better damage.", 
    attacks: [
      {
        name: "Poke", 
        desc: "You poke the monster away using the rod. It has now backed away realizing the rod, if used correctly, has the potential to cause some damage.", 
        damage: 3
      }, 
      {
        name: "Swing", 
        desc: "You swing with your rod using all your might and try hurting the monster. The monster sighs! You managed to hurt the monster and now its raging preparing for its next attack.", 
        damage: 8
      }, 
      {
        name: "Throw", 
        desc: "You throw the rod and hits the monsters chest. It is struggling to breathe for a few seconds as it is visibly hurt.", 
        damage: 15
      }
    ]
  },
  {
    name: "Pocket Knife", 
    power: 30, 
    cost: 30, 
    sell: 12, 
    feature: "You can start drawing blood now if you wisely attack with this pocket knife. Since this knife is not that sharp, using it on sensitive areas can hurt the monsters badly :)", 
    attacks: [
      {
        name: "Cut", 
        desc: "You manage to cut some layers of the monsters skin and it is weak now.", 
        damage: 10
      }, 
      {
        name: "Slice", 
        desc: "The monster nears you and you manage to swing your knife to slice through its neck. Boom! There is blood! The monster backs off holding its neck to stop losing more blood.", 
        damage: 20
      }, 
      {
        name: "Pierce", 
        desc: "The monster is visibly scared and backs off after realizing you have a knife. You run towards it as fast as you can and pierces through the monster's belly. It falls behind holding its belly to stop losing more blood, despite the blood flowing out at a very fast rate.", 
        damage: 30
      }
    ]
  },
  {
    name: "Rifle", 
    power: 50, 
    cost: 60, 
    sell: 45, 
    feature: "You can start firing now and initiate long range attacks to minimize the hits you take. This rifle is fully loaded with 8 bullets to aid you in your future attacks.", 
    attacks: [
      {
        name: "Shoot1", 
        desc: "You aim monster's head with your rifle. Shoot! and it misses. You hit its hand and its bleeding heavily!", 
        damage: 20
      }, 
      {
        name: "Shoot2", 
        desc: "You aim its chest with your rifle. Shoot! And you completely miss. It realizes keeping you alive for long can cause heavy damage in the coming seconds. It wants you dead ASAP!!", 
        damage: 2
      }, 
      {
        name: "Shoot3", 
        desc: "You aim its forehead with your rifle. You pull the trigger. And Boom! Right in its head. It collapses back trying to recover from the heavy blow. It is bleeding heavily!", 
        damage: 50
      }
    ]
  },
  {
    name: "Katana", 
    power: 75, 
    cost: 100, 
    sell: 75, 
    feature: "You are nearing the end-game here. This stuff has the potential to chop off a monsters head with a wild swing!", 
    attacks: [
      {
        name: "Swing", 
        desc: "You swing with your heavy katana. You manage to scrape of its skin despite its evasive actions. It is planning a heavy attack next up :|", 
        damage: 45
      }, 
      {
        name: "Swing2", 
        desc: "You swing your katana, but its weight was too much for you to handle. You completely miss the monster. But it is held back terrified of your potential!", 
        damage: 1
      },
      {
        name: "Slice", 
        desc: "You wildly swing your katana across the monsters body. You see a piece of its meat fly up in the air. It jumps to the side following through the evasive action it took. The monster is down! Bleeding like a fountain!", 
        damage: 75
      }
    ]
  },
  {
    name: "Flame thrower", 
    power: 100, 
    cost: 200, 
    sell: 165, 
    feature: "The most powerful weapon of this town. It can single handedly win you the toughest battles you are going to undertake!!", 
    attacks: [
      {
        name: "Ignite", 
        desc: "You ignite the flame thrower and focusses its fire towards the monster's body. It survived severe burns and is held back.", 
        damage: 50
      }, 
      {
        name: "lowGas", 
        desc: "You try igniting the flame thrower, but it isnt producing fire. Seems like it is out of gas or a mechanical defect is the cause.", 
        damage: 0
      }, 
      {
        name: "Flame", 
        desc: "You start the flame thrower. And it produces a huge cloud of fire, bigger than the monster. Its body is completely on fire, it is shivering and trying to put out the fire in its body! You walk back anticipating it can use the fire to jump into you.", 
        damage: 100
      }
    ]
  }
]


const store_items = [
  {
    name: "health",
    but_texts: ["Buy Apple (20)", "Buy beef (25)", "Go back to store"], 
    but_funcs: [BuyApple, BuyBeef, GoStore], 
    text: "1. Apple yields 10 health. \n 2. Beef yields 25 health."
  }, 
  {
    name: "weapon", 
    but_texts: ["Pay", "Sell", "Go back to store"], 
    but_funcs: [PayWeapon, SellWeapon, GoStore], 
    text: "Pay: Buy a " + weapons[currentWeapon+1].name + " for " + weapons[currentWeapon+1].cost + " gold. \nSell: Sell a " + weapons[sellWeapon].name + " for " + weapons[sellWeapon].sell + " gold."
  }
]

const monsters = [
  {
    name: "Slime",
    level: 5, 
    health: 15, 
    maxGold: 10, 
    attacks: [
      {
        name: "Jump", 
        desc: "The slime jumps onto you and tries to ingest you with its weak poison. You manage to let it go and escapes from it poisoning you.", 
        damage: 10
      }, 
      {
        name: "Hold", 
        desc: "The slime approaches you rapidly and manages to get hold of you. It bangs your head with both its hands and bites your hand. That was a possible poison injection. You escape its hold and pushes it away. You plan to launch another attack.", 
        damage: 15
      }, 
      {
        name: "Sting", 
        desc: "The slime comes at you rapidly. It manages to engulf your body somehow. It bites you and you still cant get away from it. It springs back after devouring you and you struggle to stand up straight after a heavy dose of its poison.", 
        damage: 20
      }, 
    ]
  }, 
  {
    name: "Beast",
    level: 15, 
    health: 60, 
    maxGold: 40, 
    attacks: [
      {
        name: "Jump", 
        desc: "The fanged beast jumps out to attack you. It flies rapidly, but you manage to push it away using your bare hands.", 
        damage: 15
      }, 
      {
        name: "Hold", 
        desc: "The beast tries to get hold of you and it does! You seem blank for a second after realizing how strong it is. With all your might, you throw it away before it poisoning you.", 
        damage: 30
      }, 
      {
        name: "Sting", 
        desc: "The beast is raging. It uses its maximum strength to get hold of you and it stings you with its tail, injecting a ridiculous dose of poison onto your body!", 
        damage: 40
      }, 
    ]
  }, 
  {
    name: "Dragon",
    level: 25, 
    health: 300, 
    maxGold: 75, 
    attacks: [
      {
        name: "Jump", 
        desc: "The dragon was about to jump onto you. You manage to scare it using your weapon.", 
        damage: 10
      }, 
      {
        name: "Hold", 
        desc: "The dragon jumps and get hold of the weapon in your hand. It swats you using its powerful tail. You get the knife from your inventory and poke its legs. It screams and let go of your weapon", 
        damage: 35
      },  
      {
        name: "Fire1", 
        desc: "The dragon is starting to breathe fire now. You see this and try to run away from it. You think you have escaped its sight, but the dragon catches you inactive. You spot this early and jumps back. You have the chance of launching a great attack to hurt the dragon which is fingertips away from you..", 
        damage: 50
      }, 
      {
        name: "Fire2", 
        desc: "The dragon is starting to breathe fire now. You see this and try to run away from it. You think you have escaped its sight, but the dragon catches you inactive. It lifts you up using its fingers and breathes fire onto your soul. The dragon itself couldnt handle the heat and throws you into the ground", 
        damage: 80
      }
    ]
  }
]

// Initializing buttons
but1.onclick = GoStore
but2.onclick = GoCave
but3.onclick = FightDragon

function update(location){
  monsterStats.style.display = 'none';
  functions = location.but_funcs ;
  texts = location.but_texts ;
  but1.innerText = texts[0] ;
  but2.innerText = texts[1] ;
  but3.innerText = texts[2] ;  // Go to town square
  text.innerText = location.text ;
  but1.onclick = functions[0] ; 
  but2.onclick = functions[1] ;
  but3.onclick = functions[2] ;
}

function GoStore(){
  console.log("Going to store..")
  update(locations[1])
}

function GoCave(){
  console.log("Going to cave..")
  update(locations[2])
}



function BuyHealth(){
  console.log("Buying health")
  update(store_items[0])
}

function BuyWeapon(){
  console.log("Buying weapons")
  update(store_items[1])
}

function GoTown(){
  console.log("Going to town square")
  update(locations[0])
}

function BuyApple(){  // cost = 20, health = 10
  if (Gold >= 20){
    Gold -= 20
    Health += 10
    goldText.innerText = Gold
    healthText.innerText = Health
    text.innerText += "\nYou ate apples, it gave you 10 health."
  }
  else{
    text.innerText = "Insufficient funds!"
  }
  
}

function chooseRandom(arr){
  return arr[(Math.floor(Math.random() * arr.length))]
}

function BuyBeef(){   // cost = 25, health = 25
  if (Gold >= 25){
    Gold -= 25
    Health += 25
    goldText.innerText = Gold
    healthText.innerText = Health
    text.innerText += "\nYou ate beef and no one was watching, it gave you 25 health."
  }
  else{
    text.innerText = "Insufficient funds!"
  }
}

function PayWeapon(){
  if (Gold >= weapons[currentWeapon+1].cost) {
    currentWeapon ++
    Gold -= weapons[currentWeapon].cost
    text.innerText = "You bought a " + weapons[currentWeapon].name + "."
  }
}

function SellWeapon(){
  if (sellWeapon != currentWeapon){
    text.innerText = "You sold a " + weapons[sellWeapon].name + " for " + weapons[sellWeapon].sell + " gold."
    
  }
  else {
    text.innerText = "You cannot sell your only weapon! The monsters can attack you in any moment!"
  }
} 

function chance(val){
  return Math.random() > (1 - val)
}

function fight(curr_monster){
  update(locations[3])
  now_fighting = curr_monster
  monsterStats.style.display = "block"
  monsterNameText.innerText = monsters[now_fighting].name
  monsterHealthText.innerText = monsters[now_fighting].health
  monsterHealth = monsters[now_fighting].health
}


function FightSlime(){
  console.log("Fighting slime..")
  fighting = 0
  fight(0)
}

function FightBeast(){
  console.log("Fighting beast..")
  fighting = 1
  fight(1)
}

function FightDragon(){
  if (currentWeapon > 3){
    console.log("Fighting dragon..")
    fighting = 2
    fight(2)
  }
  else {
    text.innerText = "You arent adivised to fight a dragon with the weapons you currently have! Fight other monsters in order to gain your experience and wealth.."
  }
}

async function win(){
  text.innerText += "You clearly put all your might into that attack as the monster drops dead on the floor!!!\n\n"
  GoldWon = Math.floor(Math.random() * monsters[fighting].maxGold) + Math.floor(Math.random() * XP)
  XPgained = Math.floor(Math.random() * (monsters[fighting].level * 2))
  text.innerText += "You find " + GoldWon + " gold the monster had!\n\n"
  text.innerText += "You gained " + XPgained + " XP from this battle.\n\n"
  Gold += GoldWon
  goldText.innerText = Gold
  XP += XPgained
  xpText.innerText = XP
  await sleep(3)
  update(locations[4])
}

async function lose(){
  text.innerText += "The monster shows no mercy, as it destroys you with a powerful move. You lose the battle!\n\n"
  GoldLost = Math.floor(Math.random() * monsters[fighting].maxGold)
  XPLost = Math.floor(Math.random() * monsters[fighting].level)
  if (GoldLost > Gold){
    GoldLost = Gold
  }
  if (XPLost > XP) {
    XPLost = XP
  }
  text.innerText += "The monster manages to steal " + GoldLost + " gold from your pockets\n\n"
  text.innerText += "You lost " + XPLost + " XP from this battle.\n\n"
  Gold -= GoldLost
  goldText.innerText = Gold
  XP -= XPLost
  xpText.innerText = XP
  await sleep(3)
  update(locations[5]) 
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

async function Attack(){
  // The player attacks
  currAttack = chooseRandom(weapons[currentWeapon].attacks)
  text.innerText += currAttack.desc
  text.innerText += "\n\n"
  monsterHealth -= currAttack.damage
  if (monsterHealth <= 0) {
    win()
    return
  }
  monsterHealthText.innerText = monsterHealth
  await sleep(2)
  // The monster attacks
  currAttack = chooseRandom(monsters[fighting].attacks)
  text.innerText += currAttack.desc
  text.innerText += "\n\n"
  Health -= currAttack.damage
  if (Health <= 0) {
    lose()
  }
  healthText.innerText = Health
  
}

async function Dodge(){
  // The monster attacks
  currAttack = chooseRandom(monsters[fighting].attacks)
  text.innerText += currAttack.desc
  text.innerText += "\n\n"
  Health -= currAttack.damage
  healthText.innerText = Health
  if (Health <= 0) {
    lose()
    return
  }
  await sleep(2)
  // The player attacks
  currAttack = chooseRandom(weapons[currentWeapon].attacks)
  text.innerText += currAttack.desc
  text.innerText += "\n\n"
  monsterHealth -= currAttack.damage
  monsterHealth.innerText = monsterHealth
  if (monsterHealth <= 0) {
    win()
  }
}

async function RunAway(){
  text.innerText = "You chose to run away! The monster is following you and it is raging..\n"
  if (chance(0.8)){
    await sleep(2)
    text.innerText += "You manage to escape it by the barest of margins and run out of the cave!"
    await sleep(1)
    update(locations[0])
  }
  else {
    await sleep(2)
    text.innerText += "You run as fast as you can, but the monster catches up to you and it knocks you down on the floor! As you are still trapped in this cave, you have no options but to fight this beast.."
  }
}

async function Intimidate(){
  text.innerText += "You intimidate the monsters around you and they are shocked to see you defeat one of them..\n"
  if (chance(0.8)){
    await sleep(2)
    text.innerText += "The monsters seem scared and are backing off from your sight as they acknowledge your threat toward their lives. You exit the cave!"
    await sleep(4)
    update(locations[0])
  }
  else {
    await sleep(2)
    text.innerText += "One of the monsters is annoyed by you mocking them after you killed one of its own!\n"
    await sleep(2)
    rand_chance = math.random()
    if (rand_chance < 0.5 ){
      now_fighting = 0
    }
    else if (rand_chance < 0.8){
      now_fighting = 1
    }
    else {
      now_fighting = 2
    }
    text.innerText += "You have to now fight a " + monsters[now_fighting].name + "!!"
    fight(now_fighting)
  }
}

function Fight(){
  text.innerText += "You choose to fight another " + monsters[fighting] + "!"
  fight(fighting)
}

function Restart(){
  Health = 100
  XP = 0
  Gold = 50
  currentWeapon = 1
  sellWeapon = 1
  healthText.innerText = Health
  xpText.innerText = XP
  gold.innerText = Gold
  update(locations[0])
}

function Survive(){
  Health = 10
  healthText.innerText = Health
  update(locations[0])
}

function EndGame(){
  text.innerText = "Thanks for playing! Hope you are returning into a monster-less reality :)"
}