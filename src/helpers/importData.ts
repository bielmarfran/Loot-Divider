import Localbase from 'localbase'
import { addLootEvent2 } from '../helpers/crudEvent'
import { addPlayer } from '../helpers/crudPlayer'
//import { returnHtmlElement } from '../helpers/generic'

export async function importData(importFile: any): Promise<boolean> {
  //

  const r = confirm('Essa operacao ira remover os dados atuais, Continuar ?')
  if (r == true) {
    const data = importFile
    if (data.lootEvent == null && data.player == null) {
      window.alert('Os dados inseridos são inválidos, cancelando a importação.')
      //let element = returnHtmlElement('file-selector')
      //element.value = []
    } else {
      const db = new Localbase('db')
      //await db.delete();
      //db = new Localbase('db');
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
