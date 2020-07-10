
export function option(x,y){
  var conbind=x.map(function(item,index){
    return { x: Number(item.replace("月", '')),y:y[index]};
  });
  var sort = conbind.sort(function (a, b) {
    return (a.x - b.x)
  });
  return {
    xAxis: {
      type: 'category',
      data: sort.map(item => { return item.x+'月'})
    },
    yAxis: {
      type: 'value',
      name: '（单位：k）'
    },
    series: [{
      data: sort.map(item => { return item.y}),
      type: 'line',
      itemStyle: { normal: { label: { show: true } } }
    }]
  };
}

