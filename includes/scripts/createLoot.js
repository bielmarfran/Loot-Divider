/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* "allowForLoopAfterthoughts": true */

// eslint-disable-next-line no-var
var total = 0;
// eslint-disable-next-line no-var
var players = [];
// eslint-disable-next-line no-var
var lootEvents = [];

async function getValues(key) {
  try {
    console.log('getValues');
    players = await getPlayer(players);
    if (players.length != 0) {
      createInputFields(players);
    }
    lootEvents = await getLootEvents(lootEvents);
    total = await getTotal();

    if (total < (players.length) / 100 || total === 0) {
      // create = false;
      window.alert('Insira o minimo');
      return false;
    }
    //
    if (document.getElementById('grid-first-name').value === undefined || document.getElementById('grid-first-name').value === '') {
      document.getElementById('grid-first-name').value = 'Loot';
    }

    document.getElementById('lootName').innerHTML = document.getElementById('grid-first-name').value;

    document.getElementById('lootValue').innerHTML = total;

    return true;
  } catch (error) {
    window.alert(`Erro${error}`);
  }
}

function getValue(id) {
  const value = parseFloat(document.getElementById(id).value);
  // console.log(value)
  if (isNaN(value)) {
    return 0;
  }
  return value;
}

function getTotal() {
  let totalValue = 0;

  totalValue += (getValue('platinium') * 10);
  totalValue += getValue('gold');
  totalValue += (getValue('electron') / 2);
  totalValue += (getValue('silver') / 10);
  totalValue += (getValue('copper') / 100);
  // Divide Itens value by 2
  totalValue += (getValue('itens') / 2);

  return totalValue;
  // alert(total)
}

function checkExist(id) {
  const exist = !!document.getElementById(id);
  // console.log(id,exist);
  return exist;
}

function sumAll(id) {
  let sum = 0;

  for (let index = 0; index < players.length; index++) {
    sum += parseFloat(document.getElementById(`input${players[index].id}`).value);
  }
  if (sum > total) {
    document.getElementById(id).value = 0;
  }
  sum = 0;
}

async function cleanEvent(key) {
  lootEvents = await getLootEvents(lootEvents);
  players = await getPlayer(players);
  // console.log(JSON.stringify(lootEvents));
  if (lootEvents.length === 0) {
    if (document.getElementById('lootName').innerHTML === 'Loot') {
      document.getElementById('lootName').innerHTML = 'Loot 0';
    }
    const initial = getInicialPayment();
    const final = createFinalPayments();
    const debt = createDebt();
    const lootEvent = {
      id: 0,
      order: 1,
      cal: false,
      totalPlayers: players.length,
      loot: {
        id: 0,
        value: total,
        name: document.getElementById('lootName').innerHTML,
      },
      players,
      initialPayments: initial,
      finalPayments: final,
      debt,
    };
    addLootEvent(lootEvent);

    myFunction2(lootEvent, 0, key);
  } else {
    const lastElement = lootEvents.slice(-1);

    // console.log(lastElement[0]);
    if (document.getElementById('lootName').innerHTML == 'Loot') {
      document.getElementById('lootName').innerHTML = `Loot ${lastElement[0].id + 1}`;
    }
    const initial = getInicialPayment();
    const final = createFinalPayments();
    const debt = createDebt();
    const lootEvent = {
      id: lastElement[0].id + 1,
      order: lastElement[0].order + 1,
      cal: false,
      totalPlayers: players.length,
      loot: {
        id: lastElement[0].id + 1,
        value: total,
        name: document.getElementById('lootName').innerHTML,
      },
      players,
      initialPayments: initial,
      finalPayments: final,
      debt,
    };
    addLootEvent(lootEvent);
    myFunction2(lootEvent, lastElement[0].id + 1, key);
  }
  clearInputAll();
}

function getInicialPayment() {
  const initial = [];
  for (let index = 0; index < players.length; index++) {
    let initialValue = parseFloat(document.getElementById(`input${players[index].id}`).value);
    isNaN(initialValue) ? initialValue = 0 : initialValue;
    initial.push({ idPlayer: index, value: initialValue });
  }
  return initial;
}

function createFinalPayments() {
  const final = [];
  for (let index = 0; index < players.length; index++) {
    final.push({ idPlayer: index, value: 0 });
  }
  return final;
}

function createDebt() {
  const debt = [];
  for (let index = 0; index < players.length; index++) {
    for (let index2 = 0; index2 < players.length; index2++) {
      if (index != index2) {
        debt.push({
          idOwner: index, idTarget: index2, value: 0, payAll: false,
        });
      }
    }
  }
  return debt;
}

function myFunction2(event, index, key) {
  const { body } = document;
  // let table = document.getElementById("tableLoot");

  const lootEvent = (event);
  // console.log("myFunction2",JSON.stringify(lootEvent))
  let lastLootEvent = [];
  if (index === 0) {
    lastLootEvent = JSON.parse(JSON.stringify(event));
    lastLootEvent.loot.value = 0;
    lastLootEvent.loot.name = '';
    lastLootEvent.initialPayments.forEach((item) => {
      item.value = 0;
    });
  } else {
    lastLootEvent = lootEvents[index - 1];
  }

  const { totalPlayers } = lootEvent;
  // console.log(lootEvent);
  const limit = lootEvent.loot.value;
  const fullShare = limit / totalPlayers;

  // console.log("TTT",fullShare);

  const over = overLimit(lootEvent, fullShare);

  const total = totalNow(lootEvent, over, fullShare);
  const overTotal = over.filter((item) => item.status);

  const share = total / (lootEvent.totalPlayers - overTotal.length);

  partOfDebt(over);

  console.log(over);
  let partShare = partOfShare(lootEvent, total, over, share, fullShare, overTotal);

  function compareID(a, b) {
    return a.id - b.id;
  }

  partShare = partShare.sort(compareID);

  partShare.forEach((item) => {
    item.partFinal = item.part;
    item.ExtraPay = 0;
    // console.log(JSON.stringify(item, lastLootEvent, partShare));
  });

  setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent);

  if (lootEvents.length > 0) {
    partShare.forEach((item) => {
      pay(item, lootEvent, lastLootEvent, partShare, over);
    });
    partShare.forEach((item) => {
      console.log(item.payAll);
      if (item.payAll !== true) { pay2(item, lootEvent, lastLootEvent, partShare, over); }
    });

    partOfDebt(over);
  }

  setFinalPay(lootEvent, over, partShare);

  if (lootEvent.cal === false) {
    const db = new Localbase('db');
    lootEvent.cal = true;

    db.collection('lootEvent').doc({ id: lootEvent.id }).update({
      finalPayments: lootEvent.finalPayments,
      debt: lootEvent.debt,
      cal: true,
    });
  }

  updateTable(lootEvent);

  modalClose(key);

  console.log('FIM', lootEvent);
}

function setFinalPay(lootEvent, over, partShare) {
  let count = 0;
  lootEvent.finalPayments.forEach((finalPayment) => {
    if (!over[finalPayment.idPlayer].status) {
      console.log('setFinalPay If 1', partShare);
      var id = finalPayment.idPlayer;
      var extra = 0;
      if (partShare[id].ExtraPay > 0) {
        extra = partShare[id].ExtraPay;
      }
      finalPayment.value = partShare[id].partFinal + extra;
      if (finalPayment.value + extra <= 0) {
        finalPayment.value = 0;
        console.log('Dentro -----------------------------');
        var totalDebt = 0;
        lootEvent.debt.forEach((debtItem) => {
          debtItem.idOwner == finalPayment.idPlayer ? totalDebt += debtItem.value : totalDebt += 0;
        });
        totalDebt != 0 ? finalPayment.value = -(totalDebt) : finalPayment.value += 0;
        // finalPayment.value = finalPayment.value + extra;
      }
      // console.log(finalPayment.value , finalPayment.idPlayer, partShare[finalPayment.idPlayer].part);
    } else {
      var extra = 0;
      var id = finalPayment.idPlayer;
      if (partShare[id].ExtraPay > 0) {
        extra = partShare[id].ExtraPay;
      }
      console.log(JSON.stringify(lootEvent.debt));
      var totalDebt = 0;
      lootEvent.debt.forEach((debtItem) => {
        // console.log('BUMFD',debtItem.idOwner , finalPayment.idPlayer )
        debtItem.idOwner == finalPayment.idPlayer ? totalDebt += debtItem.value : totalDebt += 0;//
      });
      console.log('BUMFD', totalDebt);
      totalDebt != 0 ? finalPayment.value = -(totalDebt) : finalPayment.value = 0;
      finalPayment.value += extra;
    }

    count++;
  });
}

function pay(item, lootEvent, lastLootEvent, partShare, over) {
  // item.payment = false;
  if (item.part > 0) {
    // console.log(item.id,over[item.id].value, item.part);
    let holder = 0;
    if (over[item.id].value < 0) {
      holder = lover[item.id].value;
    }
    if ((lastLootEvent.finalPayments[item.id].value + holder) < 0
    && item.part >= Math.abs((lastLootEvent.finalPayments[item.id].value + holder))) {
      payAll(item, lastLootEvent, partShare, over, lootEvent);
    } else if ((lastLootEvent.finalPayments[item.id].value + holder) < 0
    && item.part < Math.abs((lastLootEvent.finalPayments[item.id].value + holder))) {
      payParts(item, lastLootEvent, partShare, over, lootEvent);
    }
  } else {
    lootEvent.finalPayments[item.id].value += lastLootEvent.finalPayments[item.id].value;
  }
}

function pay2(item, lootEvent, lastLootEvent, partShare, over) {
  if (item.ExtraPay > 0) {
    let holder = 0;
    if (lastLootEvent.finalPayments[item.id].value < 0) {
      holder = lastLootEvent.finalPayments[item.id].value;
    }

    if ((holder + over[item.id].value) < 0
    && item.part >= Math.abs((holder + over[item.id].value))) {
      item.partFinal = item.part;
      item.part = 0;
      console.warn('payAll');
      payAll(item, lastLootEvent, partShare, over, lootEvent);
    } else if ((holder + over[item.id].value) < 0
    && item.part < Math.abs((holder + over[item.id].value))) {
      item.partFinal = item.part;
      item.part = 0;
      if (item.ExtraPay > 0) {
        item.partFinal += item.ExtraPay;
        item.ExtraPay = 0;
        item.f;
      }

      console.warn('payParts', item);
      payParts(item, lastLootEvent, partShare, over, lootEvent);
    }
  }
}

function payAll(item, lastLootEvent, partShare, over, lootEvent) {
  console.log('payAll', `ID : ${item.id}`);
  lootEvent.debt.forEach((debtItem) => {
    if (debtItem.idOwner === item.id && debtItem.value > 0) {
      item.partFinal -= debtItem.value;
      if (over[item.id].value < 0) {
        over[item.id].value += debtItem.value;
      }
      if (over[item.id].value > 0) {
        over[item.id].value = 0;
      }
      // console.log(item);
      partShare[debtItem.idTarget].ExtraPay += debtItem.value;
      // item.ExtraPay -= debtItem.value;
      debtItem.value = 0;
      item.payAll = true;
    }
  });
}

function payParts(item, lastLootEvent, partShare, over, lootEvent) {
  console.log('payParts', `ID : ${item.id}`);
  let countDebt = 0;
  lootEvent.debt.forEach((debtItem) => {
    if (debtItem.idOwner === item.id && debtItem.value > 0) {
      countDebt++;
    }
  });
  let debtPayment = item.partFinal / countDebt;
  while (item.partFinal > 0) {
    console.warn('Still Have Funds to Pay');

    lootEvent.debt.forEach((debtItem) => {
      if (debtItem.idOwner == item.id) {
        if (debtPayment.toFixed > debtItem.value) { debtPayment = debtItem.value; }

        item.partFinal -= debtPayment;
        partShare[debtItem.idTarget].ExtraPay += debtPayment;
        item.ExtraPay -= debtItem.value;
        debtItem.value -= debtPayment;
      }
    });
  }
}

function setDebt(lootEvent, over, share, fullShare, partShare, lastLootEvent) {
  let count = 0;
  console.log(JSON.stringify(partShare));

  lootEvent.debt.forEach((item, index) => {
    item.value = lastLootEvent.debt[index].value;
  });

  // console.log(JSON.stringify(lootEvent.debt));

  over.forEach((item) => {
    if (!item.status) {
      let restHolder = 0;
      console.log('A---', lootEvent.initialPayments[count].value, share, fullShare, partShare[count].part);
      if (lootEvent.initialPayments[count].value > share) {
        restHolder = fullShare - lootEvent.initialPayments[count].value;
      } else {
        restHolder = fullShare - lootEvent.initialPayments[count].value - partShare[count].part;
      }
      console.log('B---', restHolder);
      over.forEach((item2) => {
        if (item2.status) {
          const { debt } = lootEvent;
          const idHolder = item.id;
          const index = debt.findIndex((item) => {
            if (idHolder !== item2.id) {
              return item.idOwner === item2.id && item.idTarget === idHolder;
            }
          });
          console.log('C--', restHolder, item2.part, idHolder);
          lootEvent.debt[index].value += (restHolder * item2.part);//
          console.log(lootEvent.debt[index].value);

          // console.log(JSON.stringify(lootEvent.debt));
        }
      });
    } else {

    }
    count++;
  });
}

function overLimit(data, fullShare) {
  const mydata = data;

  const payments = mydata.initialPayments;
  const initialPayments = payments.map((payments) => {
    let debt = -(payments.value - fullShare);
    if (payments.value == fullShare) {
      debt = 0;
    }
    return payments.value >= fullShare ? { id: payments.idPlayer, status: true, value: debt } : { id: payments.idPlayer, status: false, value: payments.value };
  });

  return initialPayments;
}

function totalNow(mydata, over, fullShare) {
  let total = mydata.loot.value;
  if (over.length > 0) {
    over.forEach((item) => {
      item.status ? total += item.value - fullShare : total -= item.value;
    });
  }
  return total;
}

function partOfDebt(over) {
  let totalDebt = 0;
  over.forEach((item) => {
    item.status ? totalDebt -= item.value : totalDebt -= 0;
  });
  over.forEach((item) => {
    if (item.status) {
      if (item.value == 0) {
        item.part = 0;
      } else {
        item.part = Math.abs((item.value / (totalDebt / 100))) / 100;
      }
    } else {
      item.part = 0;
    }
  });
  // console.log(totalDebt)
}

function partOfShare(lootEvent, total, over, share, fullShare, overTotal) {
  const partShare = [];
  if (overTotal.length == 0) {
    lootEvent.initialPayments.forEach((initialPayments) => {
      const p = { id: initialPayments.idPlayer, part: fullShare - initialPayments.value, partFinal: 0 };
      partShare.push(p);
    });
  } else if (total == 0) {
    lootEvent.initialPayments.forEach((initialPayments) => {
      let holder = 0;
      if (initialPayments.value > 0) {
        holder = fullShare - initialPayments.value;
      }
      const p = { id: initialPayments.idPlayer, part: holder, partFinal: 0 };
      partShare.push(p);
    });
  } else {
    var count = 0;
    let count2 = 0;
    console.log('AXB', total);
    lootEvent.initialPayments.forEach((initialPayments) => {
      if (!over[count].status) {
        if (initialPayments.value >= total) {
          const p = { id: initialPayments.idPlayer, part: 0, partFinal: 0 };
          partShare.push(p);
        } else {
          count2++;
        }
      } else {
        const p = { id: initialPayments.idPlayer, part: 0, partFinal: 0 };
        partShare.push(p);
      }
      count++;
    });
    var count = 0;
    // console.log("Count2 "+count2)
    lootEvent.initialPayments.forEach((initialPayments) => {
      if (!over[count].status) {
        if (initialPayments.value < total) {
          if (initialPayments.value > 0) {
            if (initialPayments.value < total / count2) {
              const p = { id: initialPayments.idPlayer, part: (total - initialPayments.value) / count2, partFinal: 0 };
              partShare.push(p);
              total -= (total - initialPayments.value) / count2;
              count2--;
            } else {
              console.log(fullShare, initialPayments.value);
              if (fullShare - initialPayments.value >= total - (fullShare - initialPayments.value)) {
                const p = { id: initialPayments.idPlayer, part: 0, partFinal: 0 };
                partShare.push(p);
                count2--;
              } else {
                const p = { id: initialPayments.idPlayer, part: -(initialPayments.value - fullShare), partFinal: 0 };
                partShare.push(p);
                total -= (fullShare - initialPayments.value);
                count2--;
              }
            }
          }
        }
      }
      count++;
    });
    var count = 0;
    lootEvent.initialPayments.forEach((initialPayments) => {
      if (!over[count].status) {
        if (initialPayments.value == 0) {
          const p = { id: initialPayments.idPlayer, part: (total - initialPayments.value) / count2, partFinal: 0 };
          partShare.push(p);
        }
      }
      count++;
    });
  }

  // console.log(partShare)
  return partShare;
}
