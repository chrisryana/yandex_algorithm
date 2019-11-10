module.exports = function(string) {
  if (typeof string !== 'string') return null;
  const morze = ['-----', '.----', '..---', '...--', '....-', '.....', '-....', '--...', '---..', '----.'];
  const numGroups = string.split('   ');
  const numGroupsArray = [];

  for (let i = 0; i < numGroups.length; i++) {
    const numGroup = numGroups[i].split(' ');
    let decodeString = '';
    for (j = 0; j < numGroup.length; j++) {
      if (numGroup[j][0] === 'T') {
        numGroup[j] = getReverseString(numGroup[j]);
      }
      else if (numGroup[j][0] === 'E') {
        numGroup[j] = changeSumbolsPlace(numGroup[j]);
      }
      const findIndex = morze.findIndex((item) => item === numGroup[j]);
      decodeString += findIndex !== -1 ? findIndex : '';
    }
    numGroupsArray.push(decodeString);
  }
  return numGroupsArray.join(' ') || null;
}

const getReverseString = (string) => {
  const symbols = string.split('').slice(1);
  const reverseSymbols = symbols.reverse();
  const reverseString = reverseSymbols.join('');
  
  return reverseString;
}

const changeSumbolsPlace = (string) => {
  const symbols = string.split('').slice(1);
  const c = symbols[0];
  symbols[0] = symbols[symbols.length-1];
  symbols[symbols.length-1] = c;
  return symbols.join('');
}

const res = decode('--... ...-- ---.. .----');
console.log(res);