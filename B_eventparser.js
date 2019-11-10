function taskParser(strings) {
  const res = [];

  for (let i = 0, l = strings.length; i < l; i++) {
    // для поиска события
    const beginEvent = strings[i].indexOf('\"');
    const endEvent = strings[i].indexOf('\"', beginEvent+1);
    const event = (beginEvent !== -1 && endEvent !== -1) ? strings[i].slice(beginEvent+1, endEvent) : null;

    // для поиска даты
    const beginDate = strings[i].indexOf('(');
    const endDate = strings[i].indexOf(')');
    const dateOfString = (beginDate !== -1 && endDate !== -1) ? strings[i].slice(beginDate+1, endDate) : null;
    const date = dateOfString && getDate(dateOfString);

    if (date !== null && event !== null) {
      const dateMatch = strings[i].match(/\d{2}[\/?\.]\d{2}[\/?\.]\d{2,4}/)[0].split('/').join('.');
      const eventFromString = `\"${event}\": ${dateMatch}`
      res.push(eventFromString);
    }
  }

  function getDate(dateOfString) {
    let stringArr;
    if (dateOfString.indexOf('.') !== -1) {
      stringArr = dateOfString.split('.');
    } else if (dateOfString.indexOf('/') !== -1) {
      stringArr = dateOfString.split('/');
    }
    
    const everyIsNumber = stringArr.length === 3 && stringArr.every((item) => isNumber(item) && item.length <= 4);
    const isDate = stringArr[0] <= 31 && stringArr[1] <= 12;
    if (everyIsNumber && isDate) {
      return stringArr.join('.');
    }
    return null;
  }

  function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

  return res.join('\n');
}

function tasker2(strings) {
  const res = [];

  for (let i = 0, l = strings.length; i < l; i++) {
    const dateMatch = strings[i].match(/\d{2}[\/?\.]\d{2}[\/?\.]\d{2,4}/);
    const eventMatch = strings[i].match(/("|')([^"']+)/);

    if (dateMatch && eventMatch) {
      res.push(eventMatch[0] + ": " + dateMatch[0])
    }
  }

  return res.join('\n');
}


const entry = [  
  "В это воскресенье (22.09.2019) будет великолепное время, чтобы \"Пробежать марафон\".",  
  "А вот \"Садить деревья\" стоит на следующий день (23/09/19), ведь будет стоять жара."  
];

// '"Пробежать марафон": 22.09.2019\n"Садить деревья": 23.09.19';
// "Садить деревья": 23.09.19

console.log(tasker(entry));