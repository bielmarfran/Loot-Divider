
var lootEvents = [];
var players = [];
var updatePlayerName2 = {status:false};


document.addEventListener('DOMContentLoaded', async function() {    

    await refresh();
    if (window.FileList && window.File && window.FileReader) {
      document.getElementById('file-selector').addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file.type) {
          window.alert('Error: The File.type property does not appear to be supported on this browser.')
          document.getElementById('file-selector').value = [];
          return;
        }
        if (!file.type.match('text.*')) {
          window.alert('Error: The selected file does not appear to be an image..') 
          document.getElementById('file-selector').value = [];
          return;
        }
        console.log(file);
        const reader = new FileReader();
        reader.addEventListener('load', event => {
          
          var x = JSON.parse(event.target.result);
          console.log(x);
          //console.log(event.target.result);
        });
        reader.readAsText(file);
      });
    }


}, false);

async function refresh(){
  await clearTable();
  await createTable();
  showAllData(lootEvents);
}

async function createTable(){
  //console.log('updateUI')
  await getPlayer2();
  console.log(players);
  await getLootEvents2();
  setHeadersInitial(players);
  
}



async function updateTable(lootEvent){
  await getPlayer2();
  setHeaders2(lootEvent, players);
  setRows(lootEvent, lootEvent.id);
}


 async function getPlayer2(){
  players = await getPlayer(players);
       
  }

  async function getLootEvents2(){
    let db = new Localbase('db');
    lootEvents = [];
    await db.collection('lootEvent').get().then(lootEvent2 => {
      if(lootEvent2.length > 0){
        //console.log(lootEvent2);
        lootEvent2.forEach( item => {
          console.log('d')
          lootEvents.push(item)
        })
      }
    })
  }


  async function addPlayer2(){
    console.log('Inside addPlayer');
    let db = new Localbase('db');

    var playerName = document.getElementById("textBoxPlayerName").value;
    var index = players.findIndex(element => element.name == playerName);
    console.log(index);
    var t = playerName.trim();
    if(!!playerName && t.length > 0){
      if(index == -1){
        if(updatePlayerName2.status){
          console.log('updatePlayerName');
          updatePlayerName2.newName = playerName;

          await updatePlayer(updatePlayerName2);
          await refresh();
          modalClose('mymodalcentered2');
          updatePlayerName2.status = false;
          document.getElementById("textBoxPlayerName").value = "";
        }else{
          players.push({ id: players.length,name: playerName,active: true });
          addPlayer(players[players.length-1])
          getPlayer2();
          insertPlayerOldEvents(players.length, playerName);
          modalClose('mymodalcentered2');
          document.getElementById("textBoxPlayerName").value = "";
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
      }else{
        setHeadersInitial(players);
      }
  })
  events.forEach( event => {
   event.totalPlayers ++;
   event.players.push({id: id,name:name, active:false})
   event.initialPayments.push({idPlayer: id, value:0})
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
      initialPayments:event.initialPayments,
      finalPayments:event.finalPayments,
      debt:event.debt,
    })
    
  })
  refresh();
  }


  function updatePlayerName(name){


    
    try {
      console.log(name);     
    } catch (error) {
      console.log(error);
    }
    updatePlayerName2 = { status:true, name:name};
    openModal('mymodalcentered2')

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

 
  function showAllData(lootEvents){
    //console.log("showAllData");
    lootEvents.forEach((event, index) => {
      setHeaders2(event, players);
      setRows(event, index);
    })

  }
  

