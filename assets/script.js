$(document).ready(function() {
  let curPlaying = 1;
  let audioState = 0;
  let audioArr = $('audio');
  let curSpeed = 1.0;
  let loop = false;

  $.each(audioArr, function(index) {
    $(this).on('play', function() {
      if (curPlaying != -1 && curPlaying != index) {
        audioArr[curPlaying].pause();
      }
      setTimeout(function() {
        $('#playPauseAudio').addClass('playing');
        curPlaying = index;
        audioState = 1;
        $('#playingFile').text($('.audio-tracks li').eq(index).find('span').text());
      }, 10);
    });
    $(this).on('pause', function() {
      $('#playPauseAudio').removeClass('playing');
      audioState = 0;
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
    if (curSpeed >= 1.5) return;
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
    $('[data-audio-content]').toggle();
  });

});