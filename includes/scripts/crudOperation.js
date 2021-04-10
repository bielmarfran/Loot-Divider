function deleteLastLoot(){
    let db = new Localbase('db');
    db.collection('lootEvent').get().then(loot => {
        var last = loot.pop();
        db.collection('lootEvent').doc({ id:  last.id }).delete().then(
          refresh()
        )
      })
}