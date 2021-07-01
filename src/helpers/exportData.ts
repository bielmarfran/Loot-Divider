export {}
import Localbase from 'localbase'

function download(content, fileName, contentType) {
  // eslint-disable-next-line prefer-const
  let a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}
//download(jsonData, 'json.txt', 'text/plain');

export async function exportData(): Promise<void> {
  // eslint-disable-next-line prefer-const
  let data = { player: '', lootEvent: '' }
  const db = new Localbase('db')
  await db
    .collection('players')
    .get()
    .then((users) => {
      if (users.length != 0) {
        //data.push(users)
        data.player = users
      }
    })
  await db
    .collection('lootEvent')
    .get()
    .then((lootEvent) => {
      if (lootEvent.length > 0) {
        //= JSON.stringify(lootEvent);
        data.lootEvent = lootEvent
        //
      }
    })

  const db2 = JSON.stringify(data)
  download(db2, 'lootDB', 'json')
  //console.log(data);
}
