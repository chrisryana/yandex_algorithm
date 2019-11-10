const searchers = [  
  ["Mallory", "Everest", "Mont Blanc", "Pillar Rock"],  
  ["Mawson", "South Pole", "New Hebrides"],  
  ["Hillary", "Everest", "South Pole"]  
];

function getToponim(arr) {
  const allPoints = arr.reduce((acc, item) => {
    acc = [...acc, ...item.slice(1)];
    acc = Array.of(...new Set(acc))
    return acc;
  }, []);

  const res = allPoints.map((point) => {
    const searchersOnPoint = [];
    searchers.forEach((searcher) => {
      if (searcher.includes(point)) searchersOnPoint.push(searcher[0])
    })
    return [point, ...searchersOnPoint]
  })

  return res;
}

console.log(getToponim(searchers));