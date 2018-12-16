$(document).ready(function() {
  let curPlaying = 0;
  let audioState = 0;
  let audioArr = $('audio');
  let curSpeed = 1.0;
  let loop = false;

  let myLazyLoad = new LazyLoad({
    elements_selector: "img"
  });


  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  const itemList = $('ul.list li');
  let itemHeight;
  let scrollGap;

  setTimeout(function() {
    console.clear();
    itemHeight = itemList.eq(1).outerHeight();
    console.log(itemHeight);
    $('html, body').animate({
      scrollTop: itemList.eq(0).offset().top
    }, 100);

    setTimeout(function() {
      scrollGap = itemHeight > $(window).outerHeight() - 10 ? $(window).outerHeight() - 10 : itemHeight;
    }, 101);
  }, 1000);

  $('.btn-prev').on('click', function() {
    scrollTo();
  });

  $('.btn-next').on('click', function() {
    scrollTo(true);
  });

  $(document).on('keydown', function(e) {
    if (e.key == "ArrowDown" || e.key == "ArrowUp") {
      e.preventDefault();
      scrollTo(e.key == "ArrowDown");
    }
  });

  function scrollTo(next) {
    const currentScroll = document.body.scrollTop;

    if (currentScroll <= itemList.eq(0).offset().top) {
      $('html, body').animate({
        scrollTop: itemList.eq(0).offset().top
      }, 0);
    } else {
      $('html, body').animate({
        scrollTop: next ? (currentScroll + scrollGap) : (currentScroll - scrollGap)
      }, 0);
    }
  }
  $.each(audioArr, function(index) {
    $(this).on('play', function() {
      if (curPlaying != -1 && curPlaying != index) {
        audioArr[curPlaying].pause();
      }
      curPlaying = index;
      let $this = $(this);
      $this.addClass('isFixedTop');
      $this.parent().addClass('isFixedTop');
      setTimeout(function() {
        $('#playPauseAudio').addClass('playing');
        audioState = 1;
        $('#playingFile').text($('.audio-tracks li').eq(index).find('span, p').text());
      }, 10);
    });
    $(this).on('pause', function() {
      $('#playPauseAudio').removeClass('playing');
      if (curPlaying !== index) {
        $(this).removeClass('isFixedTop');
        $(this).parent().removeClass('isFixedTop');
      }
      audioState = 0;
    });
    $(this).on('ended', function() {
      if (curPlaying >= audioArr.length - 1) return;
      curPlaying++;
      audioArr[curPlaying].play();
    });
  });

  $('#playPauseAudio').on('click', function() {
    if (audioState == 0) {
      if (curPlaying == -1) {
        curPlaying = 0;
      }
      audioArr[curPlaying].play();
    } else {
      $.each(audioArr, function() {
        if (!this.paused) {
          this.pause();
        }
      });
    }
  });

  $('#btnIncrease').on('click', function() {
    if (curSpeed >= 1.8) return;
    curSpeed += 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each(audioArr, function() {
      this.playbackRate = curSpeed;
    });
  });

  $('#btnDecrease').on('click', function() {
    if (curSpeed <= 0.6) return;
    curSpeed -= 0.1;
    $('#curSpeed').text(curSpeed.toFixed(1));
    $.each(audioArr, function() {
      this.playbackRate = curSpeed;
    });
  });

  $('#btnLoop').on('click', function() {
    let $this = $(this);
    if (!loop) {
      $this.addClass('active');
      loop = true;
      $.each(audioArr, function() {
        this.loop = true;
      });
    } else {
      $this.removeClass('active');
      loop = false;
      $.each(audioArr, function() {
        this.loop = false;
      });
    }
  });

  $('#stepBackward').on('click', function() {
    if (curPlaying <= 0) return;

    if (curPlaying != -1) {
      audioArr[curPlaying].pause();
    }

    curPlaying--;
    audioArr[curPlaying].play();
  });

  $('#stepForward').on('click', function() {
    if (curPlaying >= audioArr.length - 1) return;

    if (curPlaying != -1) {
      audioArr[curPlaying].pause();
    }
    curPlaying++;
    audioArr[curPlaying].play();
  });

  $('#toTop').on('click', function() {
    $('html,body').animate({
      scrollTop: 0
    }, 100);
  });


  $('#triggerPlay').on('submit', function(e) {
    e.preventDefault();

    let num = parseInt($('#numOfTrack').val()) - 1;
    if (num < 0 || num === curPlaying || num > audioArr.length - 1) return;

    audioArr[curPlaying].pause();
    curPlaying = num;
    audioArr[curPlaying].play();
  });

  $('[data-toggle-audio]').on('click', function() {
    $('[data-audio-content]').toggleClass('expanded');
  });

});