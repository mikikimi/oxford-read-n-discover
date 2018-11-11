$(document).ready(function() {
  let curPlaying = 0;
  let audioState = 0;
  let audioArr = $('audio');
  let curSpeed = 1.0;
  let loop = false;

  $.each(audioArr, function(index) {
    $(this).on('play', function() {
      if (curPlaying != -1 && curPlaying != index) {
        audioArr[curPlaying].pause();
      }
      curPlaying = index;
      let $this = $(this);
      $this.addClass('isFixedTop');
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
    let $this= $(this);
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

  $('[data-toggle-audio]').on('click', function(){
    $('[data-audio-content]').toggleClass('expanded');
  });

});