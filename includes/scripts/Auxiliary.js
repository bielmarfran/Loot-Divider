
  function teste(){
    window.alert("teste");
  }

  function getValues(){
    try {
      var total = getTotal();
      window.alert(total);
    } catch (error) {
      window.alert("Erro");
    }
    //
    
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
  