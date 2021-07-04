export interface LootEvent {
  id: number
  order: number
  cal: boolean
  totalPlayers: number
  loot: Loot
  players: Player[]
  initialPayments: any[]
  finalPayments: any[]
  debt: any[]
}

export interface Player {
  id: number
  name: string
  active: boolean
}
export interface Loot {
  id: number
  value: number
  name: string
}

export interface InitialPayments {
  idPlayer: number
  value: number
}

export interface Debt {
  idPlayer: number
  value: number
}

export interface FinalPayments {
  idOwner: number
  idTarget: number
  value: number
}
