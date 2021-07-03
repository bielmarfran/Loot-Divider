import { getPlayer, addPlayer, updatePlayer } from './crudPlayer'
import { returnHtmlElement } from './generic'
import Localbase from 'localbase'
// eslint-disable-next-line prefer-const
let updatePlayerName2 = { status: false, newName: '', name: '' }

/**
 * This function is called when chaging a player name or adding a new player.
 * @param edit Boolean , true for change name, false for new player
 * @param oldName The current name of the player
 * @returns true if the process is sucefful ,false if fails
 */
export async function editPlayer(edit, oldName) {
  // eslint-disable-next-line prefer-const
  let players: any = await getPlayer()

  //console.log('Inside addPlayer');
  //let db = new Localbase('db');
  //db.config.debug = false
  updatePlayerName2.name = oldName
  edit === true ? (updatePlayerName2.status = true) : ''
  const inputPlayerName = await returnHtmlElement('Player Name')
  const playerName = inputPlayerName.value

  const index = players.findIndex((element) => element.name == playerName)

  //console.log(index);

  const playerNameTrim = playerName.trim()

  if (!!playerName && playerNameTrim.length > 0) {
    if (index == -1) {
      if (updatePlayerName2.status) {
        await updatePlayerName(playerName, inputPlayerName)
      } else {
        await createPlayer(players, playerName, inputPlayerName)
      }
    } else {
      window.alert('Os nomes devem unicos')
      inputPlayerName.value = ''
      inputPlayerName.focus()
      return false
    }
  } else {
    window.alert('Nome vazio')
    inputPlayerName.focus()
    return false
  }
  return true
}

async function updatePlayerName(playerName: string, inputPlayerName) {
  //console.log('updatePlayerName');

  updatePlayerName2.newName = playerName

  await updatePlayer(updatePlayerName2)
  //await refresh();

  //modalClose('mymodalcentered2');

  updatePlayerName2.status = false
  inputPlayerName.value = ''
}

async function createPlayer(players, playerName: string, inputPlayerName) {
  players.push({ id: players.length, name: playerName, active: true })

  await addPlayer(players[players.length - 1])

  players = await getPlayer()

  await insertPlayerOldEvents(players.length, playerName)

  //modalClose('mymodalcentered2');

  inputPlayerName.value = ''
}

async function insertPlayerOldEvents(id, name) {
  // eslint-disable-next-line prefer-const
  let events = []
  const db = new Localbase('db')
  db.config.debug = false
  await db
    .collection('lootEvent')
    .get()
    .then((lootEvent2) => {
      if (lootEvent2.length > 0) {
        lootEvent2.forEach((item) => {
          events.push(item)
        })
      } else {
        //setHeadersInitial(players);
      }
    })
  events.forEach((event) => {
    event.totalPlayers++
    event.players.push({ id: id, name: name, active: false })
    event.initialPayments.push({ idPlayer: id, value: 0 })
    event.finalPayments.push({ idPlayer: id, value: 0 })
    const oldDebt = JSON.parse(JSON.stringify(events[0].debt))
    event.debt = []
    for (let index = 0; index < event.players.length; index++) {
      for (let index2 = 0; index2 < event.players.length; index2++) {
        if (index != index2) {
          event.debt.push({ idOwner: index, idTarget: index2, value: 0 })
        }
      }
    }
    oldDebt.forEach(async (item) => {
      const index = event.debt.findIndex(function (item2) {
        //if(idHolder != item2.id)
        return item.idOwner == item2.idOwner && item.idTarget == item2.idTarget
      })
      event.debt[index].value = item.value
    })

    //console.log(events);

    db.collection('lootEvent').doc({ id: event.id }).update({
      totalPlayers: event.totalPlayers,
      players: event.players,
      initialPayments: event.initialPayments,
      finalPayments: event.finalPayments,
      debt: event.debt,
    })
  })
  //refresh();
}
