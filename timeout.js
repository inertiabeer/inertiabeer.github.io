function runTasks(options) {
    // 请实现此处代码
    var duration=options.duration;
    var promiseA = new Promise(function(resolve, reject) {

        setTimeout(function() {
            if(resultA) {
                resolve('success');
            }
            else {
                reject('fail');
            }
        }, duration);
    });
    Promise.all([promiseA]).then(function(){},function(){
        timeout();
    })

  }
  
  /* callback(error, result) */
  function asyncFuncA(param1, param2, callback) { /* async code */ }
  function asyncFuncB(callback) { /* async code */ }
  function asyncFuncC(param1, callback) { /* async code */ }
  runTasks({
    duration: 1000,
    tasks: [
      [asyncFuncA, 'foo', 'bar'],
      asyncFuncB,
      [asyncFuncC, 'baz']
    ],
    done: function(resultA, resultB, resultC) {
      console.log(resultA, resultB, resultC);
    },
    fail: function(err) {
      console.error(err);
    },
    timeout: function() {
      console.log('timeout');
    }
  });