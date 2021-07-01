import Localbase from 'localbase'
import { LootEvent } from '../types'

export async function addLootEvent(lootEvent: LootEvent): Promise<void> {
  const db = new Localbase('db')
  db.collection('lootEvent').add({
    id: lootEvent.id,
    order: lootEvent.order,
    cal: lootEvent.cal,
    totalPlayers: lootEvent.totalPlayers,
    loot: {
      id: lootEvent.loot.id,
      value: lootEvent.loot.value,
      name: lootEvent.loot.name,
    },
    players: lootEvent.players,
    initialPayments: lootEvent.initialPayments,
    finalPayments: lootEvent.finalPayments,
    debt: lootEvent.debt,
  })
}

export async function addLootEvent2(
  lootEvent,
  players,
  finalPayments
): Promise<void> {
  const db = new Localbase('db')
  db.collection('lootEvent').add({
    id: lootEvent.id,
    order: lootEvent.order,
    cal: lootEvent.cal,
    totalPlayers: lootEvent.totalPlayers,
    loot: {
      id: lootEvent.loot.id,
      value: lootEvent.loot.value,
      name: lootEvent.loot.name,
    },
    players,
    initialPayments: lootEvent.initialPayments,
    finalPayments,
    debt: lootEvent.debt,
  })
}

export async function getLootEvents(): Promise<any> {
  let lootEvents2: any = []
  //console.log('getLootEvents Loot');
  const db = new Localbase('db')
  await db
    .collection('lootEvent')
    .get()
    .then((lootEvent) => {
      if (lootEvent.length > 0) {
        lootEvents2 = lootEvent
      }
    })
  return lootEvents2
}

export async function deleteLastLoot(): Promise<void> {
  const db = new Localbase('db')
  await db
    .collection('lootEvent')
    .get()
    .then(async (loot: any) => {
      if (loot.length > 0) {
        const last = loot.pop()
        await db.collection('lootEvent').doc({ id: last.id }).delete()
      } else {
        alert('Erro')
      }
    })
}

export async function updatePlayer(player: {
  name: any
  newName: any
}): Promise<void> {
  const db = new Localbase('db')
  await db.collection('players').doc({ name: player.name }).update({
    name: player.newName,
  })
}
