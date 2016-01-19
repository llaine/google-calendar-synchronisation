/**
 * Pseudo jQuery like
 * Juste pour avoir a éviter de devoir appeler document.querySelectorAll
 * et $ à la place.
 * @param elem
 * @returns {NodeList|*}
 */
export function $(elem) {
  return document.querySelectorAll(elem) && document.querySelectorAll(elem)[0];
}

/**
 * Fonction qui va appeler un callback, une fois que le "DOM" c'est totalement
 * render
 * @param cb
 */
export function onDomReady(cb) {
  document.onreadystatechange = function () {
    var state = document.readyState;
    if (state == 'complete') {
      cb()
    }
  }
}

/**
 * Append une ligne à la div #output
 * @param message
 */
export function append(message) {
  var ul = document.getElementById('output');
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(message + '\n'));
  ul.appendChild(li);
}