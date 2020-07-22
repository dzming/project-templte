(function() {
  if (Number.parseInt === undefined) {
    Number.parseInt = window.parseInt;
  }
  if (Number.parseFloat === undefined) {
    Number.parseFloat = window.parseFloat;
  }

  if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, "classList", {
      get() {
        const self = this;

        function update(fn) {
          return function(value) {
            const classes = self.className.split(/\s+/g),
              index = classes.indexOf(value);

            fn(classes, index, value);
            self.className = classes.join(" ");
          };
        }

        return {
          add: update(function(classes, index, value) {
            if (!~index) {
              classes.push(value);
            }
          }),

          remove: update(function(classes, index) {
            if (~index) {
              classes.splice(index, 1);
            }
          }),

          toggle: update(function(classes, index, value) {
            if (~index) {
              classes.splice(index, 1);
            } else {
              classes.push(value);
            }
          }),

          contains(value) {
            return !!~self.className.split(/\s+/g).indexOf(value);
          },

          item(i) {
            return self.className.split(/\s+/g)[i] || null;
          },
        };
      },
    });
  }

  let lastTime = 0;
  const vendors = ["ms", "moz", "webkit", "o"];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
})();
