import Localbase from 'localbase'
import GetData from './GetData'

export async function deleteDataBase() {
  const data = await GetData()
  const r = confirm(data[0].confirmDeleteDatabase)
  if (r === true) {
    //const { body } = document;
    const db = new Localbase('db')
    try {
      await db.collection('lootEvent').delete()
      await db.collection('players').delete()
      //const alert = body.querySelector('#alertSection');
      //alert.setAttribute('class', 'w-7/12');
      // alert.setAtribute("class","");
      return true
    } catch (error) {
      window.alert(`Erro : ${error}`)
      return false
    }
  }
  return false
}
