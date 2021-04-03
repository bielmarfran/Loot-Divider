//const { Result } = require("postcss");
import  Loot  from './Loot';
import  Debt  from './Debt';

var lootEvents = [];

document.addEventListener('DOMContentLoaded', async function() {    
    var table = document.getElementById("tableLoot");
    myFunction();
    //const loot = new Loot('01','500');
    //console.log(loot);

}, false);


function myFunction() {

    fetch('../../players.json')
      .then(results => results.json())
      .then(data => myFunction2(data));

      
  }

  function myFunction2(data){
    //console.log(data);
    const body = document.body;
    let table = document.getElementById("tableLoot");

    var lootEvent = data;

    var totalPlayers = lootEvent.totalPlayers;
    var limit = lootEvent.loot.value;
    var fullShare = limit/totalPlayers;

    const over = overLimit(data,fullShare);
    
    var total = totalNow(lootEvent, over, fullShare)
    var overTotal = over.filter(item => {
      return item.status 
    });
   
    var share = total/(lootEvent.players.length - overTotal.length);

    partOfDebt(over);
    //console.log( over);
    var partShare = partOfShare(lootEvent, total, over)

    console.log(partShare);

    setFinalPay(lootEvent, over, share, partShare);

    setDebt(lootEvent, over, share, fullShare, partShare)

    console.log( lootEvent);



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
  }

  function overLimit(data, fullShare){
    var mydata = data;

    var payments = mydata.inicialPayments;
    var inicialPayments = payments.map(function(payments) {
      var debt = -(payments.value - fullShare);
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
    item.status ? item.part = Math.abs((item.value/(totalDebt/100)))/100 : item.part = 0;

})
    //console.log(totalDebt)
  }

  function partOfShare(lootEvent, total, over){
    var count = 0 ;
    var count2 = 0 ;
    var partShare = [];
    lootEvent.inicialPayments.forEach(inicialPayments => {
      if(!over[count].status){
        if(inicialPayments.value >= total){
          let p = {id: inicialPayments.idPlayer , part: 0 };
          partShare.push(p);
        }else{
          count2 ++;
        }  
      }else{
        let p = {id: inicialPayments.idPlayer , part: 0 };
        partShare.push(p);
      }
    count ++;
  })
  var count = 0;
  console.log("Count2 "+count2)
    lootEvent.inicialPayments.forEach(inicialPayments => {
      if(!over[count].status){
        if(inicialPayments.value < total){
          if(inicialPayments.value > 0){
            let p = {id: inicialPayments.idPlayer , part: (total-inicialPayments.value)/count2 };
            partShare.push(p);
            total = total - (total-inicialPayments.value)/count2;
            count2 --;
          }

        }  
      }
      count ++;
    })
    var count = 0;
    lootEvent.inicialPayments.forEach(inicialPayments => {
      if(!over[count].status){
        if(inicialPayments.value < total){
          if(inicialPayments.value == 0){
            let p = {id: inicialPayments.idPlayer , part: (total-inicialPayments.value)/count2 };
            partShare.push(p);
          }

        }  
      }
      count ++;
    })

    console.log(partShare)
    return partShare;
  }


  function setDebt(lootEvent, over, share, fullShare, partShare){
    var count = 0 ;
    over.forEach(item => {
      if(!item.status){
        var restHolder = 0 ;
        console.log('Teste : '+share, lootEvent.inicialPayments[count].value);
        if (lootEvent.inicialPayments[count].value > share) {
          restHolder = fullShare - lootEvent.inicialPayments[count].value - partShare[count].part;
        }else{
          restHolder = fullShare - partShare[count].part; ;
          //restHolder = 0;
        }
       
        over.forEach(item2 => {
          if(item2.status){
            var debt = lootEvent.debt;
            var idHolder = item.id;
            var index = debt.findIndex(function (item) {
              //console.log('Item id :'+idHolder, 'Item2 id :'+item2.id);
             if(idHolder != item2.id)
              return item.idOwner == item2.id  && item.idTarget ==  idHolder ;
            });
           //console.log(index);
           lootEvent.debt[index].value = restHolder * item2.part;
          }
           
    
       })
      }else{
        //console.log('Teste', item.value);
      }
      count++;
      
  })
  }

  function setFinalPay(lootEvent, over, share, partShare){

    
      let count  = 0 ;
      lootEvent.finalPayments.forEach(finalPayment => {
        if(!over[count].status){
          finalPayment.value = partShare[count].part; 
        }    
        else{
          finalPayment.value = over[count].value;
        }
        count++;  
      })
  console.table(lootEvent.finalPayments);
  }


  function debtPayment(){

  }

  function getDebt(idOwner, idTarget){
    
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