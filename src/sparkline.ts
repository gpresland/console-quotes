// var sparkline = function(input) {
//   var numbers = input.split(/[\s,]+/);
//   var bar = [0,1,2,3,4,5,6].map(function (n) { return String.fromCharCode(9601+n);});
//   var min = Math.min.apply(Math, numbers);
//   var max = Math.max.apply(Math, numbers);
//   var div = (max - min) / (bar.length - 1)
//   if (min === max) return Array(numbers.length).join(_.last(bar))
//   return numbers.map(function (p) {return bar[Math.round(((p - min) / div))]}).join('');
// }

// data = [
//   '1 2 3 4 5 6 7 8 7 6 5 4 3 2 1',
//   '1.5, 0.5 3.5, 2.5 5.5, 4.5 7.5, 6.5'
// ];

// data.forEach(function (input) {
//   console.log('Input: ' + input);
//   console.log('Sparkline:' + sparkline(input));
// });
