export function formatReturn(value) {
  let returnValue
  returnValue = getGold(value)
  returnValue += getSilver(value)

  return returnValue
}

function getGold(value) {
  const gold = Math.trunc(value)
  return gold + ' gp '
}

function getSilver(value) {
  let strResponse = ''
  let silver = value.toFixed(2)

  silver = silver.substr(silver.lastIndexOf('.') + 1, 1)
  if (silver > 0) {
    strResponse = silver + ' sp '
  }
  let copper = value.toFixed(2)

  copper = copper.substring(copper.length - 1)
  if (copper > 0) {
    strResponse += copper + ' cp '
  }

  return strResponse
}

export function clearInputAll() {
  clearInput('Platinum', 0)
  clearInput('Gold', 0)
  clearInput('Electrum', 0)
  clearInput('Silver', 0)
  clearInput('Cooper', 0)
  clearInput('Itens', 0)
}

function clearInput(key, value) {
  const input = document.getElementById(key) as HTMLInputElement
  input.value = value
}
