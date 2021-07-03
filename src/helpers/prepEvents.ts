import { getPlayer } from './crudPlayer'
//import GetData from './GetData'
/**
 * This function converts all input on different coins to gold.
 * @param coins
 * @returns totalValue
 */

export function getTotal(): number {
  let totalValue = 0
  if (navigator.language.startsWith('pt')) {
    totalValue += getValue('Platina') * 10
    totalValue += getValue('Ouro')
    totalValue += getValue('Electrum') / 2
    totalValue += getValue('Prata') / 10
    totalValue += getValue('Cobre') / 100
    // Divide Itens value by 2
    totalValue += getValue('Itens') / 2
  } else {
    totalValue += getValue('Platinum') * 10
    totalValue += getValue('Gold')
    totalValue += getValue('Electrum') / 2
    totalValue += getValue('Silver') / 10
    totalValue += getValue('Copper') / 100
    // Divide Itens value by 2
    totalValue += getValue('Itens') / 2
  }

  return totalValue
  // alert(total)
}

function getValue(id): number {
  const coin = document.getElementById(id) as HTMLInputElement
  let value = 0
  try {
    value = parseFloat(coin.value)
  } catch (error) {
    return 0
  }

  if (isNaN(value)) {
    return 0
  }
  return value
}

export async function getInicialPayment(): Promise<any> {
  const initial = []
  const players: any = await getPlayer()
  // eslint-disable-next-line no-console
  for (let index = 0; index < players.length; index++) {
    const input = document.getElementById(
      `${players[index].name}`
    ) as HTMLInputElement
    let initialValue = 0
    try {
      initialValue = parseFloat(input.value)
    } catch (error) {
      initialValue = 0
    }
    isNaN(initialValue) ? (initialValue = 0) : initialValue
    initial.push({ idPlayer: index, value: initialValue })
  }
  return initial
  //return
}

export async function createFinalPayments(): Promise<any> {
  const final = []
  const players: any = await getPlayer()
  for (let index = 0; index < players.length; index++) {
    final.push({ idPlayer: index, value: 0 })
  }
  return final
}

export async function createDebt(): Promise<any> {
  const debt = []
  const players: any = await getPlayer()
  for (let index = 0; index < players.length; index++) {
    for (let index2 = 0; index2 < players.length; index2++) {
      if (index != index2) {
        debt.push({
          idOwner: index,
          idTarget: index2,
          value: 0,
          payAll: false,
        })
      }
    }
  }
  return debt
}
