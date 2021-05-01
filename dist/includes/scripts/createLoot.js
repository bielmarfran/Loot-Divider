
var total = 0;
var players = [];
var lootEvents = [];


  async function getValues(key){
    try {
      console.log('getValues')
      players = await getPlayer(players);
      if(players.length != 0){
        createInputFields(players);
      }
      lootEvents = await getLootEvents(lootEvents);
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
      //console.log(value)
      if ( isNaN(value)) {
        return 0
      } else {
        return value
      }
  }




  function checkExist(id){
    var exist = !! document.getElementById(id);
    //console.log(id,exist);
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


  async function cleanEvent(key){
    lootEvents = await getLootEvents(lootEvents);
    players = await getPlayer(players);
    //console.log(JSON.stringify(lootEvents));
      if(lootEvents.length  ==  0 ){

        console.log(players)
        if(document.getElementById("lootName").innerHTML == 'Loot'){
          document.getElementById("lootName").innerHTML = 'Loot 0';
        }
        var initial = getInicialPayment();
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
          initialPayments:initial,
          finalPayments:final,
          debt: debt
         }
         addLootEvent(lootEvent);

        myFunction2(lootEvent,0,key)  
      }else{

        let lastElement =  lootEvents.slice(-1);

        //console.log(lastElement[0]);
        if(document.getElementById("lootName").innerHTML == 'Loot'){
          document.getElementById("lootName").innerHTML = `Loot ${lastElement[0].id+1}` ;
        }
        var initial = getInicialPayment();
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
          initialPayments:initial,
          finalPayments:final,
          debt: debt
         }
         addLootEvent(lootEvent);
         myFunction2(lootEvent,lastElement[0].id+1,key);
         
      }  
      clearInputAll();
  }


  function getInicialPayment(){
    var initial = [];
    for (let index = 0; index < players.length; index++) {
      var initialValue = parseFloat(document.getElementById("input"+players[index].id).value);
      isNaN(initialValue) ? initialValue =  0 : initialValue;
      initial.push({idPlayer: index, value: initialValue}); 
    }
    return initial;
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
      lastLootEvent.initialPayments.forEach( item =>{
        item.value = 0;
      })


    
    }else{   
      //console.log(lootEvents, index)  
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
    console.log("setFinalPay -----------------------------")
    let count  = 0 ;
    lootEvent.finalPayments.forEach(finalPayment => {

      if(!over[finalPayment.idPlayer].status){
        console.log("setFinalPay If 1",partShare)
        var id = finalPayment.idPlayer ;
        var extra = 0 ;
        if(partShare[id].ExtraPay > 0){
          extra = partShare[id].ExtraPay;
        }
        finalPayment.value = partShare[id].partFinal + extra; 
        if( finalPayment.value + extra <= 0){
          finalPayment.value = 0;
          console.log("Dentro -----------------------------")
          var totalDebt = 0 ;
          lootEvent.debt.forEach(debtItem => {
            debtItem.idOwner == finalPayment.idPlayer  ? totalDebt +=debtItem.value : totalDebt += 0;
          })
          totalDebt != 0 ?   finalPayment.value = - (totalDebt) : finalPayment.value += 0;
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
      console.log("setFinalPay END -----------------------------")
 
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
        if((lastLootEvent.finalPayments[item.id].value + holder) < 0 &&  item.part < Math.abs((lastLootEvent.finalPayments[item.id].value + holder)) ){       
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


  function payParts(item, lastLootEvent, partShare, over, lootEvent){
    console.log('payParts','ID : '+item.id);
      var countDebt = 0 ;
      lootEvent.debt.forEach(debtItem => {   
       if(debtItem.idOwner == item.id && debtItem.value > 0){
        countDebt ++;
       }
     })
     //console.log(countDebt);
     var debtPayment = item.partFinal / countDebt;
     console.log('payParts 3','ID : '+item.id,debtPayment);
     var count = 0;
     while(item.partFinal > 0){
      console.log('payParts 3','PART : '+item.part);
      
      lootEvent.debt.every((debtItem, index) => {
        console.log('payParts 4');
        count ++;
        if(count > 30){
          debugger
          throw new Error("Something went badly wrong!");
        }
        if(debtItem.idOwner == item.id && debtItem.value > 0){
         if (debtItem.value < debtPayment) {
          console.log('payParts 5', debtPayment, item.partFinal );
          if(item.partFinal - debtPayment < 0){        
            item.partFinal = 0;
            return false;

          }else{
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
          }
       
         }else{
          console.log('payParts 6', debtPayment.toFixed(2), item.partFinal.toFixed(2) );
           if(item.partFinal > 0){
             if(item.partFinal  >= debtPayment){
              console.log('payParts 7');
              item.partFinal -= debtPayment;
              if(over[item.id].value < 0){
                over[item.id].value += debtPayment;
              }       
              if(over[item.id].value > 0){
                over[item.id].value = 0;
              }

              partShare[debtItem.idTarget].ExtraPay += debtPayment;
              item.ExtraPay -= debtItem.value;
              debtItem.value -= debtPayment;
             }else if(debtPayment.toFixed(2) === item.partFinal.toFixed(2)){
              console.log('payParts 8 - else if');
              item.partFinal -= debtPayment;
              partShare[debtItem.idTarget].ExtraPay += debtPayment;
              item.ExtraPay -= debtItem.value;
              debtItem.value -= debtPayment;

             }
            //console.log(item.part);
           }else{
            return false;
           }

         }
        }
 
        return true;
      })
     }
     console.log('payParts END','ID : '+item.id);
  }
  

  function setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent){
    var count = 0 ;
    console.log(JSON.stringify(partShare));

    lootEvent.debt.forEach((item,index) => {
      item.value = lastLootEvent.debt[index].value;
    })
        
    //console.log(JSON.stringify(lootEvent.debt));

    over.forEach(item => {
      if(!item.status){
        var restHolder = 0 ;
        console.log('A---',lootEvent.initialPayments[count].value,share, fullShare, partShare[count].part);
        if (lootEvent.initialPayments[count].value > share) {
          restHolder = fullShare - lootEvent.initialPayments[count].value ;
        }else{
          restHolder = fullShare -  lootEvent.initialPayments[count].value - partShare[count].part;    
          
        }
        console.log('B---',restHolder);
        over.forEach(item2 => {
          if(item2.status){
            var debt = lootEvent.debt;
            var idHolder = item.id;
            var index = debt.findIndex(function (item) {

             if(idHolder != item2.id)
              return item.idOwner == item2.id  && item.idTarget ==  idHolder ;
            });  
           console.log('C--',restHolder, item2.part, idHolder);
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

    var payments = mydata.initialPayments;
    var initialPayments = payments.map(function(payments) {
      var debt = -(payments.value - fullShare);
      if(payments.value == fullShare ){
        debt = 0
      }
      return payments.value >= fullShare ? {id: payments.idPlayer ,status: true, value: debt } : {id: payments.idPlayer ,status : false, value: payments.value };
  });
   
    return initialPayments;
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
      lootEvent.initialPayments.forEach(initialPayments => {
        let p = {id: initialPayments.idPlayer , part: fullShare - initialPayments.value, partFinal: 0 };
        partShare.push(p);
      })
     
    }else{
      if(total == 0){
        lootEvent.initialPayments.forEach(initialPayments => {
          var holder = 0;
          if(initialPayments.value > 0){
            holder = fullShare -  initialPayments.value;
          }
          let p = {id: initialPayments.idPlayer , part: holder, partFinal: 0 };
          partShare.push(p);
        })
      }else{
        var count = 0 ; 
        var count2 = 0 ;
        console.log('AXB',total);
        lootEvent.initialPayments.forEach(initialPayments => {
          if(!over[count].status){
            if(initialPayments.value >= total){
              let p = {id: initialPayments.idPlayer , part: 0 , partFinal: 0 };
              partShare.push(p);
            }else{
              count2 ++;
            }  
          }else{
            let p = {id: initialPayments.idPlayer , part: 0 , partFinal: 0 };
            partShare.push(p);
          }
          count ++;
        })
      var count = 0;
      //console.log("Count2 "+count2)
      lootEvent.initialPayments.forEach(initialPayments => {
        if(!over[count].status){
          if(initialPayments.value < total){
            if(initialPayments.value > 0){
              if(initialPayments.value < total/count2){
                let p = {id: initialPayments.idPlayer , part: (total-initialPayments.value)/count2, partFinal: 0 };
                partShare.push(p);
                total = total - (total-initialPayments.value)/count2;
                count2 --;
              }else{
                console.log(fullShare, initialPayments.value)
                if( fullShare - initialPayments.value  >= total - (fullShare - initialPayments.value )){
                  let p = {id: initialPayments.idPlayer , part: 0, partFinal: 0 };
                  partShare.push(p);
                  count2 --;
                }else{
                  let p = {id: initialPayments.idPlayer , part: -( initialPayments.value - fullShare), partFinal: 0 };
                  partShare.push(p);
                  total = total - (fullShare - initialPayments.value );
                  count2 --;
                }
    
    
              }
          
    
            }
          }
        }
         count ++;
        })
        var count = 0;
        lootEvent.initialPayments.forEach(initialPayments => {
          if(!over[count].status){
            if(initialPayments.value == 0){
                let p = {id: initialPayments.idPlayer , part: (total-initialPayments.value)/count2 , partFinal: 0 };
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


