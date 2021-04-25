
function addLootEvent(lootEvent){
  let db = new Localbase('db');
  db.collection('lootEvent').add({
    id: lootEvent.id,
    order: lootEvent.order,
    cal : lootEvent.cal,
    totalPlayers: lootEvent.totalPlayers,
    loot:{
      id:    lootEvent.loot.id,
      value: lootEvent.loot.value,
      name:  lootEvent.loot.name
    },
    players: lootEvent.players,
    initialPayments:lootEvent.initialPayments,
    finalPayments: lootEvent.loot.finalPayments,
    debt: lootEvent.debt
  })
}

function addLootEvent2(lootEvent, players, finalPayments){
  let db = new Localbase('db');
  db.collection('lootEvent').add({
    id: lootEvent.id,
    order: lootEvent.order,
    cal : lootEvent.cal,
    totalPlayers: lootEvent.totalPlayers,
    loot:{
      id:    lootEvent.loot.id,
      value: lootEvent.loot.value,
      name:  lootEvent.loot.name
    },
    players: players,
    initialPayments:lootEvent.initialPayments,
    finalPayments: finalPayments,
    debt: lootEvent.debt
  })
}



async function getLootEvents(lootEvents2){
  console.log('getLootEvents Loot');
  let db = new Localbase('db');
  await db.collection('lootEvent').get().then(lootEvent => {
    if(lootEvent.length > 0){
      lootEvents2 = lootEvent;
    }
  })
  console.log(lootEvents2);
  return lootEvents2;
}



function deleteLastLoot(){
  let db = new Localbase('db');
  db.collection('lootEvent').get().then(loot => {
      var last = loot.pop();
      db.collection('lootEvent').doc({ id:  last.id }).delete().then(
        refresh()
      )
  })
}

async function getPlayer(players){
  let db = new Localbase('db');
  await  db.collection('players').get().then(users => {
    if(users.length != 0){
      players = users;  
    }else{
      players.push({id: 0, name: 'Player 1', active: true});
      players.push({id: 1, name: 'Player 2', active: true});
      addPlayer(players[0]);
      addPlayer(players[1]);
    }
  }) 
  //console.log(players);
  return players;
}

function addPlayer(player){
  let db = new Localbase('db');
  db.collection('players').add({
    id: player.id,
    name: player.name,
    active: true ,
  })
}

async function updatePlayer(player){
  let db = new Localbase('db');
  await db.collection('players').doc({ name: player.name}).update({
    name: player.newName,
  })
}

async function deleteDataBase(){
  
  var txt;
  var r = confirm("Tem certeza que deseja limpar os dados ?");
  if (r == true) {
    const body = document.body;
  let db = new Localbase('db');
  try {
    await db.delete();
    modalClose('mymodalcenteredConfig');
    var alert = body.querySelector('#alertSection');
    alert.setAttribute("class","w-7/12");  
    reloadPage();
    //alert.setAtribute("class","");
  } catch (error) {
    window.alert(`Erro : ${error}`);
  }
  } else {
    txt = "You pressed Cancel!";
  }
  
  
}