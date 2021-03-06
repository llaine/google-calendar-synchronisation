/**
 * Fonction qui va appeler un callback, une fois que le "DOM" s'est totalement
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