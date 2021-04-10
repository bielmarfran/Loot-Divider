
var lootEvents = [];
var players = [];
var updatePlayerName;


document.addEventListener('DOMContentLoaded', async function() {    
    var table = document.getElementById("tableLoot");

    await createTable();
    myFunction();

}, false);

async function createTable(){
  console.log('updateUI')
  await getPlayer2();
  await getLootEvents2();
          
  
}


async function updateTable(lootEvent){
  await getPlayer2();
  if( lootEvent.id == 0){
    setHeaders(lootEvent, lootEvent.id);
  }
  setRows(lootEvent, lootEvent.id);
}

async function updateTable2(lootEvent){
  await getPlayer2();
  var tHead = document.getElementById("tHead");
  tHead.innerHTML = "";
  var tBody = document.getElementById("rowTbody");
  tBody.innerHTML = "";
  setHeaders(lootEvent, lootEvent.id);
  setRows(lootEvent, lootEvent.id);

}

async function getPlayer2(){
    let db = new Localbase('db');
    console.log('getPlayer Divide')
    await db.collection('players').get().then(users => {
      if(users.length == 0){
        db.collection('players').add({
          id: 0,
          name: 'Player 1',
          active: true ,
        })
        db.collection('players').add({
          id: 1,
          name: 'Player 2',
          active: true ,
        })
        /*
        db.collection('players').add({
          id: 2,
          name: 'Gabriel',
          alive: true ,
        })
        db.collection('players').add({
          id: 3,
          name: 'Julio',
        })*/
      }else{
        players = users;
      }
    })
    
  }

  async function getLootEvents2(){
    let db = new Localbase('db');
    await db.collection('lootEvent').get().then(lootEvent2 => {
      if(lootEvent2.length > 0){
        console.log(lootEvent2);
        lootEvent2.forEach( item => {
          console.log('d')
          lootEvents.push(item)
        })
      }
    })
  }


  function addPlayer(){
    let db = new Localbase('db');
    var playerName = document.getElementById("textBoxPlayerName").value;
    var index = players.findIndex(element => element.name == playerName);
    console.log(index);
    var t = playerName.trim();
    if(!!playerName && t.length > 0){
      if(index == -1){
        if(updatePlayerName.status){
          db.collection('players').doc({ name: updatePlayerName.name}).update({
            name: playerName,
          })
          updatePlayerName = false;
        }else{
          var size;
          if(players.length == 0){
            size = 2;
          }else{
            size = players.length;
          }
          db.collection('players').add({
            id: size,
            name: playerName,
            active: true ,
          })
          getPlayer2();
          insertPlayerOldEvents(players.length, playerName);
          modalClose('mymodalcentered2');
        }
      }else{
        window.alert("Os nomes devem unicos");
        document.getElementById("textBoxPlayerName").value = "";
        document.getElementById("textBoxPlayerName").focus();
      }
    }else{
      window.alert("Nome vazio");
      document.getElementById("textBoxPlayerName").focus();
    }
  }

 async function insertPlayerOldEvents(id, name){
  var events = [];
  let db = new Localbase('db');
  await db.collection('lootEvent').get().then(lootEvent2 => {
      if(lootEvent2.length > 0){
        lootEvent2.forEach( item => {
          events.push(item)
        })
      }
  })
  events.forEach( event => {
   event.totalPlayers ++;
   event.players.push({id: id,name:name, active:false})
   event.inicialPayments.push({idPlayer: id, value:0})
   event.finalPayments.push({idPlayer: id, value:0})
    var oldDebt = JSON.parse(JSON.stringify(events[0].debt));
    console.log(oldDebt);
   event.debt = [];
    for (let index = 0; index <event.players.length; index++) {
      for (let index2 = 0; index2 <event.players.length; index2++) {
        if(index != index2){
           event.debt.push({idOwner:index, idTarget:index2, value: 0})
          }     
      } 
    }
    oldDebt.forEach(item => {
      var index =event.debt.findIndex(function (item2) {
        //if(idHolder != item2.id)
         return item.idOwner == item2.idOwner  && item.idTarget ==  item2.idTarget ;
       });
      event.debt[index].value = item.value;

    })
    console.log(events);
    db.collection('lootEvent').doc({ id: event.id}).update({
      totalPlayers:event.totalPlayers,
      players:event.players,
      inicialPayments:event.inicialPayments,
      finalPayments:event.finalPayments,
      debt:event.debt,
    })
    updateTable2(event);
  })

  }


  function updatePlayerName(name){
    console.log(name);
    updatePlayerName = { status:true, name:name};
    openModal('mymodalcentered2')

  }


  function myFunction() {
  console.log("showAllData", lootEvents);
  showAllData(lootEvents);
  //lootEvents.forEach( (item,index)=> {

    //myFunction2(item,index)

  
  //});
  
  
    //fetch('../../players.json')
      //.then(results => results.json())
      //.then(data => myFunction2(data))
      
  }


  function formatReturn(value){

    let returnValue ;
    returnValue = getGold(value);
    returnValue += getSilver(value);
 
    return  returnValue;
  }
 
 
  function getGold(value){

    let gold = Math.trunc(value);

    return gold +" gp "

  }


  function getSilver(value){
    let strResponse = '';
    let silver =  value.toFixed(2);
    
    silver = silver.substr(silver.lastIndexOf(".")+1, 1)
    //console.log(silver);
    if (silver > 0) {
      strResponse = silver +" sp ";
    }
    let copper = value.toFixed(2);

    copper = copper.substring(copper.length - 1)
    //console.log(copper);
    if (copper > 0) {
      strResponse += copper +" cp ";
    }

    return strResponse


  }

  function setHeaders(event, position){
    console.log(event)
    let table = document.getElementById("tHead");
    let row = table.insertRow(event.id);
    row.setAttribute("class","flex-no wrap headerTableSize");     
    row.setAttribute("id","tr"+event.id);



    let cellLootName = row.insertCell(0);
    cellLootName.setAttribute("class","headerStyle");
    cellLootName.innerHTML = "Loot Name";

    let cellLootValue = row.insertCell(1);
    cellLootValue.setAttribute("class","headerStyle");  
    cellLootValue.innerHTML = "Loot Value";

   
    for (let index = 0; index < event.totalPlayers; index++) {
      const body = document.body;
      const th = document.createElement("th");  
      th.setAttribute("class","headerStyle");
      th.setAttribute("ondblclick",`updatePlayerName('${event.players[index].name}')`)
      th.innerHTML = players[index].name;
      th.setAttribute("id",`head ${event.id} ${index}`);
      body.querySelector(`#tr${event.id}`).appendChild(th);
    }     
    

  }

  function setRows(event, position){

    let table = document.getElementById("rowTbody");

    let row = table.insertRow(position);
    row.setAttribute("class"," rowTableTr flex-no wrap");     
    row.setAttribute("id","row"+position);

    console.log(event.lootEvent);

    let cellLootName = row.insertCell(0);
    cellLootName.setAttribute("class"," rowTableTd");  
    console.log(event);
    cellLootName.innerHTML = event.loot.name;

    let cellLootValue = row.insertCell(1);
    cellLootValue.setAttribute("class"," rowTableTd");  
    cellLootValue.innerHTML =  formatReturn(event.loot.value);

    for (let index = 0; index < event.totalPlayers ; index++) {
      let cell2 = row.insertCell(index+2);
      if(event.players[index].active){
        if(event.finalPayments[index].value < 0 ){
          cell2.setAttribute("class"," rowTableTdNegative");  
        }else{
          cell2.setAttribute("class"," rowTableTd");  
        }
        cell2.innerHTML = formatReturn(event.finalPayments[index].value) ;
      }else{
        cell2.setAttribute("class"," rowTableTdNotActive");  
        cell2.innerHTML = '-';
      }
     
     
      
    }
  }   
  
    
  function showAllData(lootEvents){
    console.log("showAllData");
    lootEvents.forEach((event, index) => {
      //console.log(JSON.stringify(event));
      setHeaders(event, index);
      setRows(event, index);
    })

  }

    //let total = getTotal();

    /*
   
    */

