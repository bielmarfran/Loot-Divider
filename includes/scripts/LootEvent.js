 var Loot = class Loot {
    constructor(id, value, name) {
      this.id = id;
      this.value = value;
      this.name = name;
    }
  };
 
  var Debt = class Debt {
    constructor(idOwner, idTarget, value) {
      this.idOwner = idOwner;
      this.idTarget = idTarget;
      this.value = value;
    }
  };

  var Payment = class Payment {
    constructor(id, value, idPlayer) {
      this.id = id;
      this.idPlayer = idPlayer;
      this.value = value;
    }
  };

  var Player = class Player {
    constructor(id, value) {
      this.id = id;
      this.name = name;
    }
  };

  export default class LootEvent {
    constructor(id ,order, totalPlayers , Player, Loot) {
        this.id = id;
        this.order = order;
        this.totalPlayers = totalPlayers;
        this.loot = Loot;
        this. players = Player;
        this.inicialPayments = [];
        this.finalPayments = [];
        this.debt = []

      }
  };