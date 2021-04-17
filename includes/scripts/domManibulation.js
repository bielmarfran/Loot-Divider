

function createInputFields(players){

    const body = document.body;
    var count = 0 ;
    for (let index = 0; index < players.length; index++) {
         
      if(index % 2 == 0){
        count = index;
        if(!checkExist("div"+index)){
          const div = document.createElement("div");  
          div.setAttribute("class","flex flex-wrap -mx-3 mb-2"); 
          div.setAttribute("id","div"+index);  
          body.querySelector('#mainModal2').appendChild(div);
        }

      }
      if(!checkExist("div2-"+index)){
        const div2 = document.createElement("div");  
        div2.setAttribute("class","w-full md:w-2/4 px-3 mb-6 md:mb-0"); 
        div2.setAttribute("id","div2-"+index); 
        body.querySelector('#div'+count).appendChild(div2);
      }
    

      if(!checkExist("label"+index)){
        const label = document.createElement("label");  
        label.setAttribute("class","labelInput"); 
        label.setAttribute("for",""); 
        label.setAttribute("id","label"+index); 
        label.innerHTML = players[index].name;
        body.querySelector('#div2-'+index).appendChild(label);
      }
      

      if(!checkExist("input"+players[index].id)){
        const input = document.createElement("input");  
        input.setAttribute("class","inputIndex"); 
        input.setAttribute("onchange",`sumAll(this.id)`); 
        input.setAttribute("type","number"); 
        input.setAttribute("min","0"); 
        input.setAttribute("value","0"); 
        input.setAttribute("id","input"+players[index].id); 
        input.setAttribute("step","1"); 
        input.setAttribute("pattern","\d+"); 
        body.querySelector('#div2-'+index).appendChild(input);
      }
      
    }

}
  
async function openModal(key) {
    var show;
    if(key === 'mymodalcentered2' || key === 'mymodalcenteredConfig'){
      show = true;
    }else{
      show = await getValues(key);  
    }
    if(show){
      document.getElementById(key).showModal(); 
      document.body.setAttribute('style', 'overflow: hidden;'); 
      document.getElementById(key).children[0].scrollTop = 0; 
      document.getElementById(key).children[0].classList.remove('opacity-0'); 
      document.getElementById(key).children[0].classList.add('opacity-100');
      }


    
}

function modalClose(key) {

    document.getElementById(key).children[0].classList.remove('opacity-100');
    document.getElementById(key).children[0].classList.add('opacity-0');
    setTimeout(function () {
        document.getElementById(key).close();
        document.body.removeAttribute('style');
    }, 100);
}

function setRows(event, position){
  console.log('setRows',event);
    //let table = document.getElementById("rowTbody");
    const body = document.body;
    
    const rowTr = document.createElement("tr"); 
    rowTr.setAttribute("class","rowTableTr flex-no wrap");     
    rowTr.setAttribute("id","row"+position);
    body.querySelector(`#rowTbody`).appendChild(rowTr);

    //console.log(event.lootEvent);

    let cellLootName = rowTr.insertCell(0);
    cellLootName.setAttribute("class"," rowTableTd");  
    //console.log(event);
    cellLootName.innerHTML = event.loot.name;

    let cellLootValue = rowTr.insertCell(1);
    cellLootValue.setAttribute("class"," rowTableTd");  
    cellLootValue.innerHTML =  formatReturn(event.loot.value);

    for (let index = 0; index < event.totalPlayers ; index++) {
      let cell2 = rowTr.insertCell(index+2);
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
           
      if(index == event.totalPlayers-1){
        cell2.setAttribute("style",`margin-top:${event.totalPlayers-1}px`);//
      }
      
    }
}   

function setHeadersInitial(players){
    console.log('setHeadersInitial',players);
    var tHead = document.getElementById("tHead");
    tHead.innerHTML = "";
    const body = document.body;
    let table = document.getElementById("tHead");

    const rowTr = document.createElement("tr"); 
    rowTr.setAttribute("class","flex-no wrap headerTableSize");     
    rowTr.setAttribute("id","tr"+0);
    body.querySelector(`#tHead`).appendChild(rowTr);


    const cellLootName = document.createElement("th"); 
    cellLootName.setAttribute("class","headerStyle");
    cellLootName.innerHTML = `Nome do Loot `;
    body.querySelector(`#tr${0}`).appendChild(cellLootName);

    const cellLootValue = document.createElement("th"); 
    cellLootValue.setAttribute("class","headerStyle");  
    cellLootValue.innerHTML = "Valor do Loot";
    body.querySelector(`#tr${0}`).appendChild(cellLootValue);
   
    for (let index = 0; index < players.length; index++) {
      const th = document.createElement("th");  
      th.setAttribute("class","headerStyle");
      //th.setAttribute("ondblclick",`updatePlayerName('${players[index].name}')`)
      th.innerHTML = players[index].name + `
      <svg xmlns="http://www.w3.org/2000/svg" onclick="updatePlayerName('${players[index].name}')" class="h-5 w-5  inline 	float-right ml-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>`;
      th.setAttribute("id",`head ${0} ${index}`);
      body.querySelector(`#tr${0}`).appendChild(th);
    }     
    
}
  
function setHeaders2(event, players){
    console.log('setHeaders2',event);

    if(event.id != 0){
        const body = document.body;
        let table = document.getElementById("tHead");
    
        const rowTr = document.createElement("tr"); 
        rowTr.setAttribute("class","flex-no wrap headerTableSize");     
        rowTr.setAttribute("id","tr"+event.id);
        body.querySelector(`#tHead`).appendChild(rowTr);
    
    
        const cellLootName = document.createElement("th"); 
        cellLootName.setAttribute("class","headerStyle");
        cellLootName.innerHTML = "Nome do Loot";
        body.querySelector(`#tr${event.id}`).appendChild(cellLootName);
    
        const cellLootValue = document.createElement("th"); 
        cellLootValue.setAttribute("class","headerStyle");  
        cellLootValue.innerHTML = "Valor do Loot";
        body.querySelector(`#tr${event.id}`).appendChild(cellLootValue);
       
        for (let index = 0; index < event.totalPlayers; index++) {
    
          const th = document.createElement("th");  
          th.setAttribute("class","headerStyle");
          th.setAttribute("ondblclick",`updatePlayerName('${event.players[index].name}')`)
          th.innerHTML = players[index].name;
          th.setAttribute("id",`head ${event.id} ${index}`);
          body.querySelector(`#tr${event.id}`).appendChild(th);
        }     
    }else{
        setHeadersInitial(players);
    }
  
    
}

function clearInputAll(){
    clearInput('platinium',0);
    clearInput('gold',0);
    clearInput('electron',0);
    clearInput('silver',0);
    clearInput('copper',0);
    clearInput('itens',0);
  
    players.forEach((item,index) =>{
      clearInput(`input${index}`,0);
    })
  
}

function clearInput(key,value){
  //console.log(key);
  document.getElementById(key).value = value;
}


async function clearTable(){
    var tHead = document.getElementById("tHead");
    tHead.innerHTML = "";
    var tBody = document.getElementById("rowTbody");
    tBody.innerHTML = "";
} 