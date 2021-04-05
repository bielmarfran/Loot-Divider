//const { Result } = require("postcss");
import  Loot  from './Loot';
import  Debt  from './Debt';

var lootEvents = [];
var players = [];
let db = new Localbase('db');

document.addEventListener('DOMContentLoaded', async function() {    
    var table = document.getElementById("tableLoot");
    
    getLootEvents();
    getPlayer();
   
    //const loot = new Loot('01','500');
    //console.log(loot);

}, false);

function getPlayer(){

  db.collection('players').get().then(users => {
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
      db.collection('players').add({
        id: 3,
        name: 'Julio',
      })
    }else{
      players = users;
      //console.table(players);

    }
  })
  
}

function getLootEvents(){
  
  db.collection('lootEvent').get().then(lootEvent2 => {
    if(lootEvent2.length > 0){

      lootEvents = lootEvent2.slice();
     // console.log(lootEvents);
      myFunction();
    }
  })
}

function myFunction() {

    fetch('../../players.json')
      .then(results => results.json())
      .then(data => myFunction2(data))
      
  }

  function myFunction2(data){
    //console.log(data);
    const body = document.body;
    let table = document.getElementById("tableLoot");

    var lootEvent = data;
    var lastLootEvent = [];
    if(lootEvents.length > 0){
      //console.log( "-----------",lootEvents)
      lastLootEvent = lootEvents[lootEvents.length -1].lootEvent;
      
      lootEvent.id = lastLootEvent.id + 1;
      lootEvent.order = lastLootEvent.order + 1;
    }else{     
      lootEvent.id = 0;
      lootEvent.order = 0;
    }
   
    //lootEvent = cleanStart(lootEvent);

    var totalPlayers = players.length;
    //console.log(lootEvent);
    var limit = lootEvent.loot.value;
    var fullShare = limit/totalPlayers;

    console.log("TTT",fullShare);

    const over = overLimit(data,fullShare);
    
    var total = totalNow(lootEvent, over, fullShare)
    var overTotal = over.filter(item => {
      return item.status 
    });
   
    var share = total/(lootEvent.players.length - overTotal.length);


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
        //while(item.part == 0 && item.ExtraPay > 0){
          pay(item, lootEvent , lastLootEvent, partShare, over);
        //}
        
      })
      console.log("-----------------------");
      partShare.forEach(item => {
        //while(item.part == 0 && item.ExtraPay > 0){
          pay2(item, lootEvent , lastLootEvent, partShare, over);
        //}
        
      })

      partOfDebt(over);
      /*
      partShare.forEach(item => {
        //while(item.part == 0 && item.ExtraPay > 0){
          pay(item, lootEvent , lastLootEvent, partShare, over);
        //}
        
      })*/
      
      //console.log(lastLootEvent);
    }

    
    //console.log(JSON.stringify(lootEvent.debt));
    //console.log(lootEvent.debt);
    console.table(partShare)
    //console.table(lootEvent.debt);
    //console.table(over);
    


    setFinalPay(lootEvent, over, partShare, lastLootEvent);

    console.table(lootEvent.finalPayments);


    //setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent )


    //db.collection('lootEvent').add({
    // lootEvent
    //})
    
    //lootEvents.push(lootEvent);

    //console.table((lootEvent.finalPayments));
    console.log(lootEvent);
    

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
          console.log('BUMFD',debtItem.idOwner , finalPayment.idPlayer )
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
      console.log(item.id,over[item.id].value, item.part);
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

  function cleanStart(lootEvent){
   
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

 function formatReturn(value){

   let returnValue ;
   returnValue = getGold(value);
   returnValue += getSilver(value);

   return  returnValue;
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

  function getGold(value){

    let gold = Math.trunc(value);

    return gold +" gp "

  }

  function getSilver(value){
    let strResponse;
    let silver =  value.toFixed(2);
    console.log(silver);
    silver = silver.substr(silver.lastIndexOf(".")+1, 1)
    console.log(silver);
    if (silver > 0) {
      strResponse = silver +" sp ";
    }
    let copper = silver;
    copper = copper.substring(copper.length - 1)
    console.log(copper);
    if (copper > 0) {
      strResponse += copper +" cp ";
    }

    return strResponse


  }

  function teste(){
    alert("teste");
  }

  

    //let total = getTotal();

    /*
    if(total <= 0){
      alert("Erro");
    }else{
      let share = total / 4;
      //console.log(mydata);
      for (var index = mydata.players.length; index > 0; index--) {
        //console.log(index);      
        let row = document.getElementById("tr"+index);
        for (let index = 0; index < mydata.players.length; index++) {
          let cell = row.insertCell(2);
          cell.setAttribute("class","headerStyle");
          cell.setAttribute("ondblclick","teste()")
          cell.innerHTML = mydata.players[index].name;
          cell.setAttribute("id","head")
        }  
      }

      let table = document.getElementById("rowTbody");
      for (let index = 0; index < 1; index++) {
        let row = table.insertRow(0);
        row.setAttribute("class"," rowTableTr flex-no wrap");  
        row.setAttribute("id","row"+index);
        for (let index = 0; index < mydata.players.length; index++) {
          let cell2 = row.insertCell(0);
          cell2.setAttribute("class"," rowTableTd");  
          cell2.innerHTML = share;
          
        }
      }
  
    }
    */