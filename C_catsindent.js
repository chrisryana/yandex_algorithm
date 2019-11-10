const entry1 = {  
  "id": 185,  
  "name": "Murzick",  
  "birthday": 1164210686  
}

const entry2 = {  
  "id": 96,  
  "name": "Ferdinand",  
  "birthday": 1429648740  
}

const div = document.getElementById('barcode');

function renderBarcode(catInfo, element) {
  const separator = '<div style="width: 1px; border: 3px solid black"></div>';
  const squereBlack = '<div style="width: 8px; height: 8px; background-color: black"></div>';
  const squereWhite = '<div style="width: 8px; height: 8px; background-color: white"></div>';
  const content = [];
  const summContent = [];


  for (let nameLength = catInfo.name.length; nameLength < 11; nameLength ++) {
    catInfo.name += ' ';
  }
  const asciName = catInfo.name.split('').map((symb) => symb.charCodeAt(0).toString(2));
  const codeName = toEightSymb(asciName, 8);
  const codeId = toEightSymb([catInfo.id.toString(2)], 8);
  const codeBirthD = toEightSymb([catInfo.birthday.toString(2)], 32);

  const code = codeName.join('') + codeId.join() + codeBirthD;

  for (let i = 0, l = code.length; i < l; i++) {
    if (+code[i] === 0) {
      content.push(squereWhite);
    } else if (+code[i] === 1) {
      content.push(squereBlack);
    }
  }

  for (let i = 0, l = code.length, sum = 0; i <= l; i++) {
    if (i%16 === 0 && i !== 0) {
      if (sum%2 === 0) {
        summContent.push(squereWhite);
      } else {
        summContent.push(squereBlack);
      }
      sum = +code[i];
    } else {
      sum += +code[i];
    }
  }

  function toEightSymb(string, base) {
    return string.map((item) => {
      for (let itemLength = item.length; itemLength < base; itemLength++) {
        item = '0' + item;
      }
      return item;
    });
  }

  element.innerHTML = '<div style="display: flex; width: 100%; height: 100%; align-items: stretch">' + separator + '<div style="display: flex; flex-wrap: wrap; width: 128px; height: 100%">' + content.join('') + '</div>' + separator + '<div style="display: flex; flex-direction: column">' + summContent.join('') + '</div>' + separator + '</div>';
}

renderBarcode(entry1, div);