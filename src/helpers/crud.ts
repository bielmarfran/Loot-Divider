import Localbase from 'localbase'

export async function deleteDataBase() {
  const r = confirm('Tem certeza que deseja limpar os dados ?')
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
