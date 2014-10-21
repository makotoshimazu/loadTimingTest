function appendPerformance() {
  var load_time = window.performance.now();
  var timing = window.performance.timing;
  var result = '(' + load_time + ', ' + (timing.loadEventEnd - timing.navigationStart) + ') ';
  var textNode = document.createTextNode(result);
  document.getElementById('status').appendChild(textNode);
  console.log('readyState: ', document.readyState);
}

function fetch(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      switch (xhr.readyState) {
      case 4:
        if ((200 <= xhr.status && xhr.status < 300) || (xhr.status == 304)) {
          console.log('respond!');
          resolve(xhr.responseText);
        } else {
          console.log('fail!: ', xhr.status, xhr);
          reject();
        }
        break;
      }
    };
    xhr.send();
  });
}


function manyfetch(n) {
  if (n <= 0) return new Promise(function(resolve, _) { resolve(); });
  return new Promise(function(resolve, _) {
    fetch('blank.html')
      .then(function() {
        return manyfetch(n - 1);
      }).then(function() {
        resolve();
      });
  });
}

window.onload = appendPerformance;

manyfetch(1000).then(function() {
  console.log('finished!');
  appendPerformance();
});
