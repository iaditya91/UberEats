var test = {
    test1: null,
    test2: 'somestring',
    test3: '',
  }
  
//   function clean(obj) {
//     for (var propName in obj) {
//       if (obj[propName] === '' || obj[propName] === undefined) {
//         delete obj[propName];
//       }
//     }
//     return obj
//   }
  
//   console.log(test);
//   console.log(clean(test));

  for (var propName in test) {
    if (test[propName] === '' || test[propName] === undefined) {
      delete test[propName];
    }
  }
  console.log(test)