
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
  if( lootEvent.id == 0){
    setHeaders(lootEvent, lootEvent.id);
  }
  setRows(lootEvent, lootEvent.id);
}

async function getPlayer2(){
    let db = new Localbase('db');
    console.log('getPlayer Divide')
    await db.collection('players').get().then(users => {
      if(users.length == 0){
        db.collection('players').add({
          id: 0,
          name: 'Elator',
        })
        db.collection('players').add({
          id: 1,
          name: 'Platey',
        })
        db.collection('players').add({
          id: 2,
          name: 'Gabriel',
        })
        /*db.collection('players').add({
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
    if(updatePlayerName.status){
      db.collection('players').doc({ name: updatePlayerName.name}).update({
        name: playerName,
      })
    }else{
    
      db.collection('players').add({
        id: players.length,
        name: playerName,
      })
    }


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

    //let row = document.getElementById("tr"+position);//+index

    let cellLootName = row.insertCell(0);
    cellLootName.setAttribute("class","headerStyle");
    cellLootName.innerHTML = "Loot Name";

    let cellLootValue = row.insertCell(1);
    cellLootValue.setAttribute("class"," headerStyle");  
    cellLootValue.innerHTML = "Loot Value";

   
    for (let index = 0; index < event.totalPlayers; index++) {
      let cell = row.insertCell(index+2);
      cell.setAttribute("class","headerStyle");
      cell.setAttribute("ondblclick",`updatePlayerName('${event.players[index].name}')`)
      cell.innerHTML = players[index].name;
      cell.setAttribute("id","head")
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
      
      if(event.finalPayments[index].value < 0 ){
        cell2.setAttribute("class"," rowTableTdNegative");  
      }else{
        cell2.setAttribute("class"," rowTableTd");  
      }
      cell2.innerHTML = formatReturn(event.finalPayments[index].value) ;
      
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

