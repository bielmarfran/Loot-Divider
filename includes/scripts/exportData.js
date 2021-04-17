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
