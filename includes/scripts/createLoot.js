
var total = 0;
var players = [];
var lootEvents = [];
//var create = true;





  async function getValues(key){
    try {
      console.log('getValues')
      const t  = await getPlayer();
      const t2 = await getLootEvents();
      total    = await getTotal();

      if(total < (players.length)/100 || total == 0){
        //create = false;
        window.alert("Insira o minimo");
        return false;
      }
      //
      if(document.getElementById("grid-first-name").value === undefined || document.getElementById("grid-first-name").value  === '' ){
        document.getElementById("grid-first-name").value = 'Loot';
      }

      document.getElementById("lootName").innerHTML  = document.getElementById("grid-first-name").value;

      document.getElementById("lootValue").innerHTML = total;
      
      return true;
    } catch (error) {
      window.alert("Erro" + error);
      
    }
  }

  
  function getTotal(){

    var total = 0;

      total += (getValue('platinium')*10);
      total += getValue('gold');
      total += (getValue('electron')/2);
      total += (getValue('silver')/10);
      total += (getValue('copper')/100);
      //Divide Itens value by 2
      total += (getValue('itens')/2);
  

  
    console.log(total)
    return total
    //alert(total)
  }

  function getValue(id){

    var value = parseFloat(document.getElementById(id).value);
    console.log(value)
    if ( isNaN(value)) {
      return 0
    } else {
      return value
    }
  }


  function getPlayer(){
    let db = new Localbase('db');
    db.collection('players').get().then(users => {
      if(users.length != 0){
        players = users;
        createInputFields();
        
      }
     
    })
    return true;
  }

  function getLootEvents(){
    console.log('getLootEvents Loot');
    let db = new Localbase('db');
    db.collection('lootEvent').get().then(lootEvent2 => {
      if(lootEvent2.length > 0){
        lootEvents = lootEvent2.slice();
        let lastElement =  lootEvents.slice(-1);
        console.log(lastElement);
      }
    })
  }
  
  function createInputFields(){

    const body = document.body;
    var count = 0 ;
    for (let index = 0; index < players.length; index++) {
     
      
      if(index == 0){
        count = 0;
        if(!checkExist("div"+index)){
          const div = document.createElement("div");  
          div.setAttribute("class","flex flex-wrap -mx-3 mb-2"); 
          div.setAttribute("id","div"+index)

          body.querySelector("#mainModal2").appendChild(div);
        }
        

      }else if(index == 3){
        count = 3;
        if(!checkExist("div"+index)){
          const div = document.createElement("div");  
          div.setAttribute("class","flex flex-wrap -mx-3 mb-2"); 
          div.setAttribute("id","div"+index);  
          body.querySelector('#mainModal2').appendChild(div);
        }

      }else if(index == 6){
        count = 6;
        if(!checkExist("div"+index)){
          const div = document.createElement("div");  
          div.setAttribute("class","flex flex-wrap -mx-3 mb-2"); 
          div.setAttribute("id","div"+index); 
          body.querySelector('#mainModal2').appendChild(div);
        }

      }

      const div2 = document.createElement("div");  
      div2.setAttribute("class","w-full md:w-1/3 px-3 mb-6 md:mb-0"); 
      div2.setAttribute("id","div2-"+index); 
      body.querySelector('#div'+count).appendChild(div2);

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
  
  function checkExist(id){
    var exist = !! document.getElementById(id);
    console.log(exist);
    return exist;
  }

  function sumAll(id){
    var sum = 0;

    for (let index = 0; index < players.length; index++) {
      sum += parseFloat(document.getElementById("input"+players[index].id).value); 

    }
    if(sum > total){
      window.alert(sum +" | "+total);
      document.getElementById(id).value = 0 ;
    }
    sum = 0;
  }

  function createEvent(){
    
    window.alert('key');
  }

 function cleanEvent(key){

      if(lootEvents.length  ==  0 ){
        if(document.getElementById("lootName").innerHTML == 'Loot'){
          document.getElementById("lootName").innerHTML = 'Loot 0';
        }
        var inicial = getInicialPayment();
        var final = createFinalPayments();
        var debt = createDebt();
        var lootEvent = {
          id: 0,
          order: 1,
          cal : false,
          totalPlayers: players.length,
          loot:{
            id: 0,
            value: total,
            name:   document.getElementById("lootName").innerHTML
          },
          players: players,
          inicialPayments:inicial,
          finalPayments:final,
          debt: debt
         }

        let db = new Localbase('db');
        db.collection('lootEvent').add({
          id: 0,
          order: 1,
          cal : false,
          totalPlayers: players.length,
          loot:{
            id: 0,
            value: total,
            name:   document.getElementById("lootName").innerHTML
          },
          players: players,
          inicialPayments:inicial,
          finalPayments:final,
          debt
        })
        myFunction2(lootEvent,0,key)  
      }else{

        let lastElement =  lootEvents.slice(-1);

        console.log(lastElement[0]);
        if(document.getElementById("lootName").innerHTML == 'Loot'){
          document.getElementById("lootName").innerHTML = `Loot ${lastElement[0].id+1}` ;
        }
        var inicial = getInicialPayment();
        var final = createFinalPayments();
        var debt = createDebt();
        var lootEvent = {
          id: lastElement[0].id+1,
          order: lastElement[0].order+1,
          cal : false,
          totalPlayers: players.length,
          loot:{
            id: lastElement[0].id+1,
            value: total,
            name:   document.getElementById("lootName").innerHTML
          },
          players: players,
          inicialPayments:inicial,
          finalPayments:final,
          debt: debt
         }

        console.log(lootEvent);
        let db = new Localbase('db');
        db.collection('lootEvent').add({
          id: lastElement[0].id+1,
          order: lastElement[0].order+1,
          cal : false,
          totalPlayers: players.length,
          loot:{
            id: lastElement[0].id+1,
            value: total,
            name:   document.getElementById("lootName").innerHTML
          },
          players: players,
          inicialPayments:inicial,
          finalPayments:final,
          debt: debt
         })
         myFunction2(lootEvent,lastElement[0].id+1,key)
         
      }  
   
  }

  function getInicialPayment(){
    var inicial = [];
    for (let index = 0; index < players.length; index++) {
      var inicialValue = parseFloat(document.getElementById("input"+players[index].id).value);
      isNaN(inicialValue) ? inicialValue =  0 : inicialValue;
      inicial.push({idPlayer: index, value: inicialValue}); 
    }
    return inicial;
  }

  function createFinalPayments(){
    var final = [];
    for (let index = 0; index < players.length; index++) {
      final.push({idPlayer: index, value: 0}); 
    }
    return final;
  }

  function createDebt(){
    var debt = [];
    for (let index = 0; index < players.length; index++) {
      for (let index2 = 0; index2 < players.length; index2++) {
        if(index != index2){
          debt.push({idOwner:index, idTarget:index2, value: 0})
        }
       
      } 
    }
    return debt;
  }



  function myFunction2(event, index, key){
   
    const body = document.body;
    //let table = document.getElementById("tableLoot");

    var lootEvent = (event);
    //console.log("myFunction2",JSON.stringify(lootEvent))
    var lastLootEvent = [];
    if(index == 0){
      lastLootEvent = JSON.parse(JSON.stringify(event));
      console.log(lastLootEvent);
      lastLootEvent.loot.value = 0;
      lastLootEvent.loot.name = "";
      lastLootEvent.inicialPayments.forEach( item =>{
        item.value = 0;
      })


    
    }else{   
      console.log(lootEvents, index)  
      lastLootEvent = lootEvents[index-1];
      console.log(lastLootEvent)
    }


    var totalPlayers = lootEvent.totalPlayers;
    //console.log(lootEvent);
    var limit = lootEvent.loot.value;
    var fullShare = limit/totalPlayers;

   //console.log("TTT",fullShare);

    const over = overLimit(lootEvent,fullShare);
    
    var total = totalNow(lootEvent, over, fullShare)
    var overTotal = over.filter(item => {
      return item.status 
    });
   
    var share = total/(lootEvent.totalPlayers - overTotal.length);


    partOfDebt(over);

    console.log( over);
    var partShare = partOfShare(lootEvent, total, over, share, fullShare, overTotal)



    function compareID(a, b) {

      return a.id - b.id;
    }

    partShare = partShare.sort(compareID);

    partShare.forEach(item => {
      item.partFinal = item.part;
      item.ExtraPay = 0;
      //console.log(JSON.stringify(item, lastLootEvent, partShare));
    })

   


    setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent);
    

    if(lootEvents.length > 0){
      partShare.forEach(item => {
          pay(item, lootEvent , lastLootEvent, partShare, over);

        
      })
      console.log("-----------------------");
      partShare.forEach(item => {
          pay2(item, lootEvent , lastLootEvent, partShare, over);
        
      })

      partOfDebt(over);
    }

    setFinalPay(lootEvent, over, partShare, lastLootEvent);
    if(lootEvent.cal == false){
      let db = new Localbase('db');
      lootEvent.cal = true;

      db.collection('lootEvent').doc({ id: lootEvent.id}).update({
        finalPayments: lootEvent.finalPayments,
        debt: lootEvent.debt,
        cal: true
      })
    }
    updateTable(lootEvent);
    modalClose(key);
    console.log("FIM", lootEvent);
    
  }

  
  function setFinalPay(lootEvent, over, partShare, lastLootEvent){

    let count  = 0 ;
    lootEvent.finalPayments.forEach(finalPayment => {

      if(!over[finalPayment.idPlayer].status){
        var id = finalPayment.idPlayer ;
        var extra = 0 ;
        if(partShare[id].ExtraPay > 0){
          extra = partShare[id].ExtraPay;
        }
        finalPayment.value = partShare[id].partFinal + extra; 
        if( finalPayment.value + extra == 0){
          var totalDebt = 0 ;
          lootEvent.debt.forEach(debtItem => {
            debtItem.idOwner == finalPayment.idPlayer  ? totalDebt +=debtItem.value : totalDebt += 0;
          })
          totalDebt != 0 ?   finalPayment.value = - (totalDebt) : finalPayment.value = 0;
          //finalPayment.value = finalPayment.value + extra;
        }
        //console.log(finalPayment.value , finalPayment.idPlayer, partShare[finalPayment.idPlayer].part);          
      }    
      else{
        var extra = 0 ;
        var id = finalPayment.idPlayer ;
        if(partShare[id].ExtraPay > 0){
          extra = partShare[id].ExtraPay;
        }
        console.log(JSON.stringify(lootEvent.debt));
        var totalDebt = 0 ;
        lootEvent.debt.forEach(debtItem => {
          //console.log('BUMFD',debtItem.idOwner , finalPayment.idPlayer )
          debtItem.idOwner == finalPayment.idPlayer ?   totalDebt +=debtItem.value  : totalDebt += 0;//
        })
        console.log('BUMFD',totalDebt)
        totalDebt != 0 ?   finalPayment.value = - (totalDebt) : finalPayment.value = 0;
        finalPayment.value += extra;
      }

      count++;  
    })
      //if(lootEvent.finalPayments[0].idPlayer == 0){
     //   lootEvent.finalPayments[0].value = over[0].value;
      //}

  }

  function pay(item, lootEvent ,  lastLootEvent, partShare, over){
    //item.payment = false;
    if(item.part > 0){
      //console.log(item.id,over[item.id].value, item.part);
      var holder = 0;
      if(over[item.id].value  < 0){
        holder = lover[item.id].value;
      }
      if ((lastLootEvent.finalPayments[item.id].value + holder) < 0  &&  item.part >= Math.abs((lastLootEvent.finalPayments[item.id].value +holder)) ){
        payAll(item, lastLootEvent, partShare, over, lootEvent);
      }else{
        if((lastLootEvent.finalPayments[item.id].value + holder)< 0 &&  item.part < Math.abs((lastLootEvent.finalPayments[item.id].value + holder)) ){       
          payParts(item,lastLootEvent, partShare, over, lootEvent);
        }   
      }
    }else{ 

        lootEvent.finalPayments[item.id].value +=  lastLootEvent.finalPayments[item.id].value;   
      
    }
  }
  
  function pay2(item, lootEvent ,  lastLootEvent, partShare, over){

    if(item.ExtraPay > 0){
      //console.log(item.id, over[item.id].value, item.part);
      var holder = 0;
      if(lastLootEvent.finalPayments[item.id].value  < 0){
        holder = lastLootEvent.finalPayments[item.id].value;
      }

      if ((holder + over[item.id].value) < 0  &&  item.part >= Math.abs((holder + over[item.id].value)) ){
        item.partFinal = item.part;
        item.part = 0;
        payAll(item, lastLootEvent, partShare, over, lootEvent);
      }else{
       
        if((holder + over[item.id].value) < 0 &&  item.part < Math.abs((holder + over[item.id].value)) ){ 
          item.partFinal = item.part;
          item.part = 0;
          payParts(item,lastLootEvent, partShare, over, lootEvent);

        }   
      }
    }
  }


  function payAll(item, lastLootEvent, partShare, over, lootEvent){
    console.log('payAll','ID : '+item.id);
    lootEvent.debt.forEach(debtItem => {
            
      if(debtItem.idOwner == item.id && debtItem.value > 0){
        
        item.partFinal -= debtItem.value;
        if(over[item.id].value < 0){
          over[item.id].value += debtItem.value;
        }
        if(over[item.id].value > 0){
          over[item.id].value = 0;
        }
        //console.log(item);
        partShare[debtItem.idTarget].ExtraPay += debtItem.value;
        //item.ExtraPay -= debtItem.value;
        debtItem.value = 0 ;
        
      }
    })
  }

  function payParts(item,lastLootEvent, partShare, over, lootEvent){
    console.log('payParts','ID : '+item.id);
      //console.log("debtPayment Parts 2");
      var countDebt = 0 ;
      lootEvent.debt.forEach(debtItem => {   
       if(debtItem.idOwner == item.id && debtItem.value > 0){
        countDebt ++;
       }
     })
     //console.log(countDebt);
     
     
     var debtPayment = item.partFinal / countDebt;
     console.log('payParts 2','ID : '+item.id,debtPayment);
     var count =0;
     while(item.partFinal > 0){
      console.log('payParts 3','PART : '+item.part);
       count ++;
      lootEvent.debt.every(debtItem => {
        if(debtItem.idOwner == item.id && debtItem.value > 0){
         if (debtItem.value < debtPayment) {
          item.partFinal -= debtPayment;
          if(over[item.id].value < 0){
            over[item.id].value += debtPayment;
          }
          //console.log(item);
          partShare[debtItem.idTarget].ExtraPay += debtPayment;
          item.ExtraPay -= debtItem.value;
          debtItem.value -= 0;
          countDebt --;
          return false;
         }else{
           if(item.partFinal > 0){
            //console.log(item.part);
            item.partFinal -= debtPayment;
            if(over[item.id].value < 0){
              over[item.id].value += debtPayment;
            }       
            if(over[item.id].value > 0){
              over[item.id].value = 0;
            }
            
            //console.log(item);
            partShare[debtItem.idTarget].ExtraPay += debtPayment;
            item.ExtraPay -= debtItem.value;
            debtItem.value -= debtPayment;
           }

         }
        }
       
        if(count == 5){
          //throw new Error('This is not an error. This is just to abort javascript');
        }
        return true;
      })
     }
     console.log('payParts 4','ID : '+item.id);
  }
  

  function setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent){
    var count = 0 ;
    //console.log(partShare);
    //console.log(over);
    console.log(fullShare);

    lootEvent.debt.forEach((item,index) => {
      item.value = lastLootEvent.debt[index].value;
    })
        
    console.log(JSON.stringify(lootEvent.debt));

    over.forEach(item => {
      if(!item.status){
        var restHolder = 0 ;
        if (lootEvent.inicialPayments[count].value > share) {
          restHolder = fullShare - lootEvent.inicialPayments[count].value - partShare[count].part;
        }else{

          restHolder = fullShare -  lootEvent.inicialPayments[count].value - partShare[count].part;    
          
        }
       
        over.forEach(item2 => {
          if(item2.status){
            var debt = lootEvent.debt;
            var idHolder = item.id;
            var index = debt.findIndex(function (item) {

             if(idHolder != item2.id)
              return item.idOwner == item2.id  && item.idTarget ==  idHolder ;
            });  
           console.log('A---',restHolder, item2.part, idHolder);
           lootEvent.debt[index].value += (restHolder * item2.part) ;//
           console.log(lootEvent.debt[index].value )

           //console.log(JSON.stringify(lootEvent.debt));
          
          }
       })
      }else{
       
      }
      count++;
      
    })
  }


  function overLimit(data, fullShare){
    var mydata = data;

    var payments = mydata.inicialPayments;
    var inicialPayments = payments.map(function(payments) {
      var debt = -(payments.value - fullShare);
      if(payments.value == fullShare ){
        debt = 0
      }
      return payments.value >= fullShare ? {id: payments.idPlayer ,status: true, value: debt } : {id: payments.idPlayer ,status : false, value: payments.value };
  });
   
    return inicialPayments;
  }


  function totalNow(mydata, over, fullShare){
    var total = mydata.loot.value;
    if(over.length > 0){
        over.forEach(item => {
          item.status ? total += item.value - fullShare : total -=item.value ;

      })
    }
    return total;
  }


  function partOfDebt(over){
    var totalDebt = 0;
    over.forEach(item => {
      item.status ? totalDebt -= item.value : totalDebt -= 0;

    })
    over.forEach(item => {
      if(item.status){
        if(item.value == 0){
          item.part = 0;
        }else{
          item.part = Math.abs((item.value/(totalDebt/100)))/100
        }            
      }else{
        item.part = 0
      }


})
    //console.log(totalDebt)
  }


  function partOfShare(lootEvent, total, over, share , fullShare, overTotal){
    var partShare = [];
    if(overTotal.length == 0){
      lootEvent.inicialPayments.forEach(inicialPayments => {
        let p = {id: inicialPayments.idPlayer , part: fullShare - inicialPayments.value, partFinal: 0 };
        partShare.push(p);
      })
     
    }else{
      if(total == 0){
        lootEvent.inicialPayments.forEach(inicialPayments => {
          var holder = 0;
          if(inicialPayments.value > 0){
            holder = fullShare -  inicialPayments.value;
          }
          let p = {id: inicialPayments.idPlayer , part: holder, partFinal: 0 };
          partShare.push(p);
        })
      }else{
        var count = 0 ; 
        var count2 = 0 ;
        console.log('AXB',total);
        lootEvent.inicialPayments.forEach(inicialPayments => {
          if(!over[count].status){
            if(inicialPayments.value >= total){
              let p = {id: inicialPayments.idPlayer , part: 0 , partFinal: 0 };
              partShare.push(p);
            }else{
              count2 ++;
            }  
          }else{
            let p = {id: inicialPayments.idPlayer , part: 0 , partFinal: 0 };
            partShare.push(p);
          }
          count ++;
        })
      var count = 0;
      //console.log("Count2 "+count2)
      lootEvent.inicialPayments.forEach(inicialPayments => {
        if(!over[count].status){
          if(inicialPayments.value < total){
            if(inicialPayments.value > 0){
              if(inicialPayments.value < total/count2){
                let p = {id: inicialPayments.idPlayer , part: (total-inicialPayments.value)/count2, partFinal: 0 };
                partShare.push(p);
                total = total - (total-inicialPayments.value)/count2;
                count2 --;
              }else{
                console.log(fullShare, inicialPayments.value)
                if( fullShare - inicialPayments.value  >= total - (fullShare - inicialPayments.value )){
                  let p = {id: inicialPayments.idPlayer , part: 0, partFinal: 0 };
                  partShare.push(p);
                  count2 --;
                }else{
                  let p = {id: inicialPayments.idPlayer , part: -( inicialPayments.value - fullShare), partFinal: 0 };
                  partShare.push(p);
                  total = total - (fullShare - inicialPayments.value );
                  count2 --;
                }
    
    
              }
          
    
            }
          }
        }
         count ++;
        })
        var count = 0;
        lootEvent.inicialPayments.forEach(inicialPayments => {
          if(!over[count].status){
            if(inicialPayments.value == 0){
                let p = {id: inicialPayments.idPlayer , part: (total-inicialPayments.value)/count2 , partFinal: 0 };
                partShare.push(p);
            } 
          }
          count ++;
        })
      }
     
    }
    


    //console.log(partShare)
    return partShare;
  }






  async function openModal(key) {
    var show;
    if(key === 'mymodalcentered2'){
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

