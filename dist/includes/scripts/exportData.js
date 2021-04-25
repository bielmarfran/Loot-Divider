function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
//download(jsonData, 'json.txt', 'text/plain');

async function exportData(){
    var data = { player: '' , lootEvent: ''};
    let db = new Localbase('db');
    await  db.collection('players').get().then(users => {
        if(users.length != 0){
            //data.push(users) 
            data.player = users;
        }
    }) 
    await db.collection('lootEvent').get().then(lootEvent => {
      if(lootEvent.length > 0){
         //= JSON.stringify(lootEvent);
         data.lootEvent = lootEvent;
        //
      }
    })

    var db2 = JSON.stringify(data);
    download(db2,"lootDB","json");
    console.log(data);
}

async function importData(){
    //

    var r = confirm("Essa operacao ira remover os dados atuais, Continuar ?");
    if (r == true) {
        var data = MY.x;
        if(data.lootEvent == null && data.player == null){
            window.alert("Os dados inseridos são inválidos, cancelando a importação.");
            document.getElementById('file-selector').value = [];
        }else{
            let db = new Localbase('db');
            //await db.delete();
            //db = new Localbase('db');
            await db.collection('lootEvent').delete()
            data.lootEvent.forEach(event => {
                //console.log(event)
                addLootEvent2(event, event.players, event.finalPayments);
            });
            await db.collection('players').delete();
            data.player.forEach(player => { 
                addPlayer(player);

            });
          
            reloadPage();
        }

    }else{

    }

}

