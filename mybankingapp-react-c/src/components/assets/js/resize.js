$.fn.adjustTextSize = function(set_max_size, min_size) {
  min_size = min_size || 12; // if no value then set a default one
  var string, width, line, initFontSize, returnFontSize, ratio;

  return this.each(function() {
    // Store the object
    var $this = $(this);

    var resizer = function() {
      string = $this;
      string.html(
        '<span style="white-space: nowrap;">' + string.html() + "</span>"
      );

      width = string.width();
      line = $(string.children("span"));
      initFontSize = parseInt(string.css("font-size"));
      ratio = width / line.width();

      returnFontSize = initFontSize * ratio;

      if (set_max_size && returnFontSize > initFontSize) {
        returnFontSize = initFontSize;
      }

      if (min_size && returnFontSize < min_size) {
        returnFontSize = min_size;
      }

      string.css("font-size", returnFontSize);
      while (line.width() >= width) {
        if (min_size && returnFontSize <= min_size) {
          string.html(line.html());
          return false;
        }
        string.css("font-size", --returnFontSize);
      }
      string.html(line.html());
    };

    // Call once to set.
    resizer();

    // Call on resize. Opera debounces their resize by default.
    $(window).on("resize orientationchange", resizer);
  });
};
$(".js-adjust-text").adjustTextSize(false, 12);
$(".js-adjust-text-limit").adjustTextSize(true, 30);
