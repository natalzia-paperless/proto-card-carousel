$(function(){
  var SCREEN_WIDTH = $(window).width();

  var lastScrollPos = $(window).scrollLeft(),
      s = lastScrollPos/SCREEN_WIDTH
      currentSlide = s > .5 ? Math.round(s) : Math.floor(s);

  $(window).scrollLeft(SCREEN_WIDTH);

  $(window).unbind('scrollstop', scrollStopHandler).bind('touchstart', function() {
    if (lastScrollPos === -1) {
      lastScrollPos = $(window).scrollLeft();
    }

    $('html, body').stop();
    $(window).bind('scrollstop', scrollStopHandler);
  });

  function scrollStopHandler() {
    var currentScrollLeft = $(window).scrollLeft();
    var slideNum = currentScrollLeft/SCREEN_WIDTH;
    var deltaScroll = currentScrollLeft - lastScrollPos;
    var newSlideNum = -1;
    if (Math.abs(deltaScroll) < SCREEN_WIDTH) {
      if (deltaScroll >= 0) {
        newSlideNum = currentSlide + 1;
      } else {
        newSlideNum = currentSlide - 1;
      }
    } else {
      newSlideNum = slideNum % 1 > .5 ? Math.round(slideNum) : Math.floor(slideNum);
    }

    $('html, body').stop().animate({scrollLeft: newSlideNum*SCREEN_WIDTH}, 250, "easeInOutQuint");
    currentSlide = newSlideNum;
    $(window).unbind('scrollstop', scrollStopHandler);
    lastScrollPos = -1;
  }

});
