  export default class LootEvent {
    constructor(id ,order, totalPlayers , Player, Loot) {
        this.id = id;
        this.order = order;
        this.totalPlayers = totalPlayers;
        this.loot = Loot;
        this. players = Player;
        this.initialPayments = [];
        this.finalPayments = [];
        this.debt = []

      }
  };