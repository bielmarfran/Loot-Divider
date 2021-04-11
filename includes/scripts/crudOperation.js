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
  console.log(players);
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