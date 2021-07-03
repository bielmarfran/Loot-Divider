import Localbase from 'localbase'
import { addLootEvent2 } from '../helpers/crudEvent'
import { addPlayer } from '../helpers/crudPlayer'
import GetData from './GetData'
//import { returnHtmlElement } from '../helpers/generic'

export async function importData(importFile: any): Promise<boolean> {
  //
  const data = await GetData()
  const r = confirm(data[0].confirmOperation)
  if (r == true) {
    const data = importFile
    if (data.lootEvent == null && data.player == null) {
      window.alert(data[0].cancelOperation)
      //let element = returnHtmlElement('file-selector')
      //element.value = []
    } else {
      const db = new Localbase('db')
      db.config.debug = false
      //await db.delete();
      //db = new Localbase('db');
      db.config.debug = false
      await db.collection('lootEvent').delete()
      data.lootEvent.forEach(async (event) => {
        //console.log(event)
        await addLootEvent2(event, event.players, event.finalPayments)
      })
      await db.collection('players').delete()
      data.player.forEach(async (player) => {
        await addPlayer(player)
      })
      return true
      //reloadPage();
    }
  }
  return false
}
