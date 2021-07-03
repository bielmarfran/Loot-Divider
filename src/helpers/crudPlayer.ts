import Localbase from 'localbase'

export async function getPlayer(): Promise<any> {
  let players: any = []
  const db = new Localbase('db')
  db.config.debug = false
  await db
    .collection('players')
    .get()
    .then(async (users) => {
      if (users.length != 0) {
        players = users
      }
    })
  // console.log(players);
  return players
}
export async function addDefaultPlayers() {
  const players: any = []
  const db = new Localbase('db')
  db.config.debug = false
  await db
    .collection('players')
    .get()
    .then(async (users) => {
      if (users.length == 0) {
        players.push({ id: 0, name: 'Player 1', active: true })
        players.push({ id: 1, name: 'Player 2', active: true })
        await addPlayer(players[0])
        await addPlayer(players[1])
      }
    })
}

export async function addPlayer(player): Promise<void> {
  const db = new Localbase('db')
  db.config.debug = false
  await db
    .collection('players')
    .get()
    .then((players) => {
      if (players.name == player.name) {
        return false
      }
    })

  await db.collection('players').add({
    id: player.id,
    name: player.name,
    active: true,
  })
  return
}

export async function updatePlayer(player: {
  status?: boolean
  newName: any
  name?: any
}): Promise<void> {
  const db = new Localbase('db')
  db.config.debug = false
  await db.collection('players').doc({ name: player.name }).update({
    name: player.newName,
  })
  return
}
