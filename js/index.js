'use strict';

// Slideshow 1
$(function () {
  $("#slider1").responsiveSlides({
    maxwidth: 1600,
    speed: 600
  });
});

// Copyright button
$(function () {
  // Slideshow 1
  $("#copyButton").bind('click', function(ev) {
    $('#copyData').toggle();
  });
});
