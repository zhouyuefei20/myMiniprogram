export function sum(arr){
  var sum = 0;
  for (var i in arr) {
    sum += arr[i];
  }
  return sum;
}