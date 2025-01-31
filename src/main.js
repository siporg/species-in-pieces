let preloaderTimeout = 2200
preLoader()

let app
let animalanimationstate = 0
let currentChartNumber = 0
let browservar = 0
let slideshowvar = 0
let finishedAnimals = 29
newAnimal = 0
let prevAnimal = 0
let skipped = 0
let forcelinesshift = 50
let resizingPublicVariable = 1

$(document).ready(function () {
  // FIRE INITIAL FUNCTIONS
  sizeshards()
  detectBrowser()
  // SOUNDS DATA
  SOUNDS.init()
  setTimeout(function () {
    $('.level-one, .loading').removeClass('hidden-startup')
  }, 130)

  $('.start-experience, .skip-intro a').on('click', function (e) {
    skipped = 1
    startexperience()
  })

  $('.all-animals-btn').on('click', function (e) {
    turnoffslideshow()
    turnOnAnimalNav()
  })

  $('.all-animals-off-btn').on('click', function (e) {
    turnoffanimalnav()
  })

  $('.main-nav li:nth-child(2) a').on('click', function (e) {
    if ($('body.slideshow-on').length) {
      turnoffslideshow()
    } else {
      startslideshow()
    }
  })

  $('.main-nav li:nth-child(3)').on('click', function (e) {
    if ($('.main-nav li:nth-child(3).muted').length) {
      soundManager.unmute()
      $(this).removeClass('muted')
      $('.main-nav li:nth-child(3) .popout').addClass('text-change')
      setTimeout(function () {
        $('.main-nav li:nth-child(3) .popout').removeClass('text-change')
        $('.main-nav li:nth-child(3) .popout').text('Get that racket off')
      }, 150)
    } else {
      soundManager.mute()
      $(this).addClass('muted')
      $('.main-nav li:nth-child(3) .popout').addClass('text-change')
      setTimeout(function () {
        $('.main-nav li:nth-child(3) .popout').removeClass('text-change')
        $('.main-nav li:nth-child(3) .popout').text('Beautify with sound')
      }, 150)
    }
  })

  $('footer .about').on('click', function (e) {
    overlayContent = '.overlay .about'
    overlayprocess()
  })

  $('footer .how').on('click', function (e) {
    overlayContent = '.overlay .how'
    overlayprocess()
  })

  $('footer .sources').on('click', function (e) {
    overlayContent = '.overlay .sources'
    overlayprocess()
  })

  $('footer .share').on('click', function (e) {
    overlayContent = '.overlay .sharing-goodies'
    overlayprocess()
  })

  $('footer .footer-nav').on('click', function (e) {
    $('footer').toggleClass('mobile-footer-active')
  })

  $('.animalinfo .wallpaper').on('click', function (e) {
    overlayContent = '.overlay .download'
    let headerWithAnimal = 'Give the ' + animalNames[newAnimal] + ' a digital home by downloading a desktop wallpaper.'
    $('.overlay .download h2').text(headerWithAnimal)
    let downloadLink1 = '/img/assets/wallpapers/2560x1600/2560x1600_' + animalList[newAnimal] + '.png'
    let downloadLink2 = '/img/assets/wallpapers/1920x1080/1920x1080_' + animalList[newAnimal] + '.png'
    let downloadLink3 = '/img/assets/wallpapers/1366x768/1366x768_' + animalList[newAnimal] + '.png'
    let downloadLink4 = '/img/assets/wallpapers/1024x1024/1024x1024_' + animalList[newAnimal] + '.png'

    $('.overlay .download img').attr('src', downloadLink3)
    $('.overlay .download li:nth-child(1) a').attr('href', downloadLink1)
    $('.overlay .download li:nth-child(2) a').attr('href', downloadLink2)
    $('.overlay .download li:nth-child(3) a').attr('href', downloadLink3)
    $('.overlay .download li:nth-child(4) a').attr('href', downloadLink4)
    overlayprocess()
  })

  $('.overlay .close').on('click', function (e) {
    animationstatequestion()
    $('.overlay').toggleClass('active')
    setTimeout(function () {
      $('.overlay div').removeClass('active')
    }, 500)
  })

  //MAIN NAV HIT AREAS HOVER
  $('.hover-detector div').on('mouseover', function (allAnimalsDetectHover) {
    $('.shard-wrap .shard').not(this).removeClass('active')
    $('.level-one').addClass('shadow-active')
    let indexClass = $(this).index() + 1
    $('.shard-wrap:nth-child(' + indexClass + ') .shard').addClass('active')
    $('.animal-nav-content ul li:nth-child(' + indexClass + ')').addClass('active')
    $('.animal-nav-content .title-content').addClass('inactive')

    let hoveringAnimal = $(this).attr('data-animalClick')
    // Which animal being hovered over
    // $('.animal-nav-content').addClass(hoveringAnimal);
    // Add a class to the overall content div

    $('.animal-nav-content').attr('animal', hoveringAnimal)

    $('.animal-nav-content div').each(function () {
      if ($(this).hasClass(hoveringAnimal)) {
        $(this).addClass('active')
      } else {
        $(this).removeClass('active')
      }
    })
  })

  $('.content-info .close').on('click', function (e) {
    $('body .content-wrap').removeClass('show')
    setTimeout(function () {
      $('body').toggleClass('smash')
    }, 120)
    setTimeout(function () {
      $('.content-wrap').hide()
    }, 300)
    setTimeout(function () {
      $('.shadow').removeClass('inactive')
    }, 1000)

    animationstatequestion()
  })

  $('.prev a').on('click', function (e) {
    previousAnimalProcess()
  })

  $('.next a').on('click', function (e) {
    nextAnimalProcess()
  })

  $('.why-endangered').on('click', function (e) {
    turnoffslideshow()
    smashanimalprocess()
  })

  $('.throbbing').on('mouseover', function (e) {
    $(this).removeClass('throbbing')
  })

  //MAIN NAV HIT AREAS AWAY
  $('.hover-detector').on('mouseout', function (allAnimalsDetectHover) {
    $('.shard-wrap .shard').removeClass('active')
    $('.level-one').removeClass('shadow-active')
    $('.level-one').addClass('shadow-inactive')
    $('.animal-nav-content ul li').removeClass('active')
    $('.animal-nav-content .title-content').removeClass('inactive')
    setTimeout(function () {
      $('.level-one').removeClass('shadow-inactive')
    }, 100)
  })

  //MAIN NAV HIT AREAS CLICK
  $('.hover-detector div').on('click', function (e) {
    $('.hover-detector div').removeClass('active-animal')
    prevAnimal = ''
    newAnimal = animalList.indexOf($(this).attr('data-animalClick'))
    nextorprevanimal()

    $('.animal-nav-content div').each(function () {
      $(this).removeClass('active')
    })
    turnoffanimalnav()
  })

  //MAIN NAV HIT AREAS CLICK
  $('.animal-nav-content ul li').on('click', function (e) {
    newAnimal = $(this).index()
    turnoffanimalnav()
    nextorprevanimal()
    if ($('.nowebkitbrowser').length) {
      nowebkitnextorprevanimal()
    }
  })

  $('.videoturnon').on('click', function (e) {
    soundManager.setVolume('ambientloop', 26)
    $('.content-wrap .videos').toggleClass('video-show')
    $('.content-wrap .videos iframe').attr('src', animalVideo[newAnimal] + '&autoplay=1')
    setTimeout(function () {
      $('.content-wrap .videos').toggleClass('video-show-ul')
    }, 2)
    setTimeout(function () {
      $('body').toggleClass('video-on')
    }, 550)
  })

  $('.js-close-video').on('click', function (e) {
    $('.content-wrap .videos').toggleClass('video-show-ul')
    setTimeout(function () {
      $('.content-wrap .videos').toggleClass('video-show')
      $('body').toggleClass('video-on')
      $('.content-wrap .videos iframe').attr('src', 'zero')
      $('.content-wrap .videos iframe').attr('src', animalVideo[newAnimal])
    }, 120)
    setTimeout(function () {
      soundManager.setVolume('ambientloop', 100)
    }, 200)
  })

  $('.statistics-on-btn').on('click', function (e) {
    $('.content-wrap').addClass('statistics-on')
    $('.statistics .chart').addClass('chart-info-delays')

    currentChartNumber = 1
    chartquery()
    activeChartLinks($('.statistics .stats-ui li:nth-child(2) .line-link'))
    setTimeout(function () {
      $('.statistics .chart').removeClass('chart-info-delays')
    }, 1000)
  })

  $('.animalinfo .direct-stats').on('click', function (e) {
    smashanimalprocess()
    setTimeout(function () {
      $('.content-wrap').addClass('statistics-on')

      currentChartNumber = 1
      chartquery()
      activeChartLinks($('.statistics .stats-ui li:nth-child(2) .line-link'))
    }, 400)
  })

  $('.statistics .nav-btn').on('click', function (e) {
    $('.content-wrap').removeClass('statistics-on')
    currentChartNumber = 1
    activeChartLinks($(this))
  })

  $('.statistics .stats-ui li:nth-child(2) .line-link').on('click', function (e) {
    currentChartNumber = 1
    activeChartLinks($(this))
  })

  $('.statistics .stats-ui li:nth-child(3) .line-link').on('click', function (e) {
    $('statistics .statistics li .line-link').removeClass('active')
    currentChartNumber = 2
    activeChartLinks($(this))
  })

  $('.statistics .stats-ui li:nth-child(4) .line-link').on('click', function (e) {
    currentChartNumber = 3
    activeChartLinks($(this))
  })

  $('.random-animal-btn').on('click', function (e) {
    turnoffanimalnav()
    randomAnimal()
  })

  $('.chromebrowser .nav-btn, .chromebrowser .why-endangered, .chromebrowser .box-link').on('mouseenter', function (e) {
    SOUNDS.play('hover')
  })

  $(
    '.chromebrowser .hover-detector div, .chromebrowser .line-link, .chromebrowser .ctas a, .chromebrowser .animalinfo a'
  ).on('mouseenter', function (allAnimalsDetectHover) {
    SOUNDS.play('softhover')
  })

  $('body').each(function () {
    animalStates($(this))
  })
  $('body').each(function () {
    animalStatesSecondLevel($(this))
  })
  $('body').each(function () {
    animalStatesShimmer($(this))
  })

  $('.browser-statement .close').on('click', function (e) {
    $('.browser-statement').addClass('inactive')
  })

  $('.nowebkitbrowser .next a, .nowebkitbrowser .prev a').on('click', function (e) {
    nowebkitnextorprevanimal()
  })

  sizeshards()
})

$(window).resize(function () {
  if ($('.touch').length) {
  } else {
    if ($('.preloader-layer-2').length || $('.all-animals').length) {
      $('.resize-hider').addClass('active')
      resizingPublicVariable += 1
      let resizingVariable = resizingPublicVariable

      setTimeout(function () {
        if (resizingVariable == resizingPublicVariable) {
          $('.resize-hider').removeClass('active')
        }
      }, 240)
    }
  }

  sizeshards()
})

$('body').bind('mousewheel', function (e) {
  if ($('.animal-animations-on').length) {
    if (e.originalEvent.wheelDelta / 1000 > 0) {
      previousAnimalProcess()
    } else {
      nextAnimalProcess()
    }
  }
})

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    soundManager.setVolume('ambientloop', 13)
  } else {
    soundManager.setVolume('ambientloop', 100)
  }
})

$(document).keydown(function (e) {
  switch (e.which) {
    case 37: // left
      animalPrevKey()
      break

    case 38: // up
      animalPrevKey()
      break

    case 39: // right
      animalNextKey()
      break

    case 40: // down
      animalNextKey()
      break

    case 32: // down
      animalSmashKey()
      break

    default:
      return // exit this handler for other keys
  }
})

SOUNDS = {
  btn: $('<a>').attr('href', '#').attr('id', 'toggle-mute').addClass('toggle-mute').text(''),
  looping: null,
  fading: null,

  init: function () {
    soundManager.setup({
      url: 'swf/',
      debugMode: false,
      waitForWindowLoad: false,
      useHighPerformance: true,
      useHTML5Audio: true,
      flashVersion: 9,
      multiShot: true,
      onready: SOUNDS.onSoundManagerReady,
      ontimeout: function () {},
    })
  },
  onSoundManagerReady: function () {
    soundManager.createSound({
      id: 'ambientloop',
      url: '/audio/ambient-loop-piano.mp3',
      autoLoad: true,
      multiShot: true,

      onload: function () {
        SOUNDS.playLoop('ambientloop', 44500)
      },
    })

    soundManager.createSound({
      id: 'hover',
      url: '/audio/hover_ui.mp3',
      autoLoad: true,
      onload: function () {
        // this.setVolume(75);
      },
    })

    soundManager.createSound({
      id: 'softhover',
      url: '/audio/hover_ui.mp3',
      autoLoad: true,
      onload: function () {
        this.setVolume(50)
      },
    })

    soundManager.createSound({
      id: 'smashpiano',
      url: '/audio/smash.mp3',
      autoLoad: true,
      onload: function () {
        this.setVolume(30)
      },
    })
  },
  play: function (soundId, vol) {
    soundManager.play(soundId)
  },
  playLoop: function (soundId, length) {
    if (SOUNDS[soundId + 'looping']) return
    SOUNDS[soundId + 'looping'] = true

    SOUNDS.play(soundId)
    SOUNDS['looping' + soundId] = setInterval(function () {
      SOUNDS.play(soundId)
    }, length)
  },
  stopLoop: function (soundId) {
    clearInterval(SOUNDS['looping' + soundId])
    SOUNDS[soundId + 'looping'] = false
  },
  setVolume: function (soundId, volume) {
    let s = soundManager.getSoundById(soundID)
    s.setVolume(volume)
  },
  fadeIn: function (soundID) {
    if (SOUNDS.fading == 'out') return

    let s = soundManager.getSoundById(soundID)
    if (!s) return
    let vol = s.volume

    // console.log('FADE IN: ', vol);

    if (vol >= 100) {
      SOUNDS.fading = ''
      return false
    }

    SOUNDS.fading = 'in'

    s.setVolume(Math.min(100, vol + 10))
    setTimeout(function () {
      SOUNDS.fadeIn(soundID)
    }, 50)
  },
  fadeOut: function (soundID) {
    if (SOUNDS.fading == 'in') return

    let s = soundManager.getSoundById(soundID)
    if (!s) return
    let vol = s.volume

    // console.log('FADE OUT: ', vol);

    if (vol <= 40) {
      SOUNDS.fading = ''
      return false
    }

    SOUNDS.fading = 'out'

    s.setVolume(Math.max(0, vol - 10))
    setTimeout(function () {
      SOUNDS.fadeOut(soundID)
    }, 50)
  },
  toggleMute: function (e) {
    e.preventDefault()
    SOUNDS.btn.hasClass('muted') ? SOUNDS.unmute() : SOUNDS.mute()
  },
  mute: function (soundId) {
    soundManager.mute(soundId)
    SOUNDS.btn.addClass('muted')
  },
  unmute: function (soundId) {
    soundManager.unmute(soundId)
    SOUNDS.btn.removeClass('muted')
  },
}

function detectBrowser() {
  $('html').addClass('nowebkitbrowser')
  /* Get browser */
  $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase())

  /* Detect Chrome */
  if ($.browser.chrome) {
    if ($('.small-nav').length) {
      $('html').removeClass('nowebkitbrowser')
      $('html').addClass('webkitbrowser')
      $.browser.safari = false
    } else {
      $('html').removeClass('nowebkitbrowser')
      $('html').addClass('webkitbrowser')
      $('html').addClass('chromebrowser')

      /* Finally, if it is Chrome then jQuery thinks it's 
           Safari so we have to tell it isn't */
      $.browser.safari = false
    }
  }

  /* Detect Safari */
  if ($.browser.safari) {
    $('html').addClass('webkitbrowser')
    $('html').removeClass('nowebkitbrowser')
  }

  if (navigator.appVersion.indexOf('Mac') != -1) {
  } else {
    // CODE FOR PC
    $('body').addClass('performance-boost')
  }
}

function preLoader(e) {
  let preload = [
    '/img/blood.png',
    '/img/textured-ui/green-texture.png',
    '/img/bg/grad-bg.png',
    '/img/textured-ui/green-texture-circle.png',
    '/img/textured-ui/black-texture.png',
    '/img/textured-ui/red-texture.png',
    '/img/textured-ui/red-texture-2.png',
    '/img/textured-ui/mini-texture.png',
    '/img/textured-ui/repeat-white.png',
    '/img/textured-ui/white-texture.png',
    '/img/textured-ui/social.png',
    '/img/textured-ui/threat.png',
    '/img/textured-ui/mute-1.png',
    '/img/textured-ui/mute-2.png',
    '/img/textured-ui/popout-left.png',
    '/img/textured-ui/popout-right.png',
    '/img/textured-ui/popout-mid.png',
    '/img/textured-ui/play-icon.png',
    '/img/textured-ui/popout-red-end.png',
    '/img/textured-ui/popout-red-mid.png',
  ]

  let promises = []

  for (let i = 0; i < preload.length; i++) {
    ;(function (url, promise) {
      let img = new Image()
      img.onload = function () {
        promise.resolve()
      }
      img.src = url
    })(preload[i], (promises[i] = $.Deferred()))
  }
  $.when.apply($, promises).done(function () {
    setTimeout(function () {
      if ($('.nowebkitbrowser').length || $(window).width() < 700) {
        $('body').addClass('thirty-pieces-titles')
      } else {
        startupSequence()
      }
    }, preloaderTimeout)
  })
}

function sizeshards() {
  $('.wrap').each(function () {
    let polygonswidth = $(window).width() * 0.99

    let polygonsheight = polygonswidth * 0.7
    let halfpolwidth = -1 * (polygonswidth / 2)
    let halfpolheight = -1 * (polygonsheight / 2) - 0

    $(this).each(function () {
      $(this).css({
        width: polygonswidth,
        height: polygonsheight,
        'margin-top': halfpolheight,
        'margin-left': halfpolwidth,
      })
    })
  })

  if ($(window).width() < 700 || $('html.touch').length || $('.nowebkitbrowser').length) {
    $('html').addClass('small-nav')
  } else if ($('html.webkitbrowser').length) {
    $('html').removeClass('small-nav')
  }
}

function startupSequence(e) {
  $('body').addClass('start-up-seq')

  introinterval = 3100
  setTimeout(function () {
    $('.intro-sequence p:nth-child(1), .intro-sequence').addClass('active')
    setTimeout(function () {
      if (skipped == 0) {
        $('#animalchanger').addClass('vaquita-shards')
      }
    }, 2600)
    setTimeout(function () {
      if (skipped == 0) {
        $('.intro-sequence p.active').removeClass('active')
        $('.intro-sequence p:nth-child(2)').addClass('active')
      }

      setTimeout(function () {
        if (skipped == 0) {
          $('.intro-sequence p.active').removeClass('active')
          $('.intro-sequence p:nth-child(3)').addClass('active')
        }

        setTimeout(function () {
          if (skipped == 0) {
            $('.intro-sequence p.active').removeClass('active')
            $('.intro-sequence p:nth-child(4)').addClass('active')
            $('#animalchanger').removeClass('vaquita-shards')
          }
          setTimeout(function () {
            $('.intro-sequence p.active').removeClass('active')
          }, introinterval)
        }, 4000)
      }, introinterval)
    }, introinterval)
  }, 1400)

  setTimeout(function () {
    if (skipped == 0) {
      $('body').addClass('thirty-pieces-titles')
    }
  }, 15500)
}

function startexperience(e) {
  $('body').addClass('titles-out')
  setTimeout(function () {
    $('body').removeClass('thirty-pieces-titles preloader titles-out start-up-seq')
    $('.intro-sequence').hide()
    prevAnimal = 2
    nextorprevanimal()
    animationstatequestion()
    setTimeout(function () {
      $('body').removeClass('preloader-layer-2')
    }, 1400)

    if ($('.nowebkitbrowser').length) {
      nowebkitnextorprevanimal()
    }
  }, 400)

  if ($('.nowebkitbrowser').length) {
    $('.main-nav').addClass('no-mute')
  }
}

function overlayprocess(e) {
  turnoffslideshow()
  $('body').removeClass('animal-animations-on')
  animationstateaddition()
  $(overlayContent).toggleClass('active')
  setTimeout(function () {
    $('.overlay').toggleClass('active')
  }, 10)
}

function animalPrevKey(e) {
  if ($('.smash').length || $('.all-animals').length || $('.preloader-layer-2').length || $('.overlay.active').length) {
  } else {
    previousAnimalProcess()
  }
}

function animalNextKey(e) {
  if ($('.smash').length || $('.all-animals').length || $('.preloader-layer-2').length || $('.overlay.active').length) {
  } else {
    nextAnimalProcess()
  }
}

function animalSmashKey(e) {
  if ($('.smash').length || $('.all-animals').length || $('.preloader-layer-2').length || $('.overlay.active').length) {
  } else {
    turnoffslideshow()
    smashanimalprocess()
  }
}

function nextAnimalProcess(e) {
  $('body').removeClass('animal-animations-on')
  turnoffslideshow()
  // GET THE INDEX OF THE CURRENT ANIMAL BY SEEING WHERE IN THE ANIMAL ARRAY THE CURRENT CLASS IS
  prevAnimal = animalList.indexOf($('#animalchanger').attr('class'))
  newAnimal = prevAnimal + 1

  if (newAnimal == 30) {
    newAnimal = 0
  }
  nextorprevanimal()
  animationstatequestion()
}

function previousAnimalProcess(e) {
  $('body').removeClass('animal-animations-on')
  turnoffslideshow()
  // GET THE INDEX OF THE CURRENT ANIMAL BY SEEING WHERE IN THE ANIMAL ARRAY THE CURRENT CLASS IS
  prevAnimal = animalList.indexOf($('#animalchanger').attr('class'))
  newAnimal = prevAnimal - 1
  if (newAnimal == -1) {
    newAnimal = 29
  }

  nextorprevanimal()
  animationstatequestion()
}

function nextorprevanimal(e) {
  setTimeout(function () {
    $('.shadow').removeClass('inactive')
  }, 200)
  if (prevAnimal > newAnimal) {
    $('.wrap').addClass('right-to-left')
    $('.wrap.left-to-right').removeClass('left-to-right')
  } else {
    $('.wrap').addClass('left-to-right')
    $('.wrap.right-to-left').removeClass('right-to-left')
  }

  $('#animalchanger').attr('class', animalList[newAnimal]) // SETS THE ANIMAL CLASS TO BE INDEX +1
  $('.next .popout').attr('popanimal', animalList[newAnimal])
  $('.prev .popout').attr('popanimal', animalList[newAnimal])
  $('.popout').addClass('text-change')
  $('.animalinfo').addClass('text-change')

  $('.content-wrap .content-info .infos ul li:nth-child(1) span').html(animalScientificName[newAnimal])
  $('.content-wrap .content-info .infos ul li:nth-child(3) span').html(animalRange[newAnimal])
  $('.content-wrap .content-info .infos p:nth-child(3)').html(animalCopyOne[newAnimal])
  $('.content-wrap .content-info .infos p:nth-child(4)').html(animalCopyTwo[newAnimal])
  $('.content-wrap .content-info .infos p:nth-child(5)').html(animalCopyThree[newAnimal])

  $('.content-wrap .content-info .ctas li:nth-child(3)').html(animalCharity[newAnimal])

  setTimeout(function () {
    $('.animalinfo h2').text(animalNames[newAnimal])
    $('.animalinfo li:nth-child(1) span').text(newAnimal + 1)
    $('.popout').removeClass('text-change')
    $('.animalinfo').removeClass('text-change')

    if (newAnimal == 0) {
      $('.prev .popout').text(animalNames[29])
      $('.next .popout').text(animalNames[1])
    } else if (newAnimal == 29) {
      $('.prev .popout').text(animalNames[28])
      $('.next .popout').text(animalNames[0])
    } else {
      $('.prev .popout').text(animalNames[newAnimal - 1])
      $('.next .popout').text(animalNames[newAnimal + 1])
    }
  }, 150)
}

function animationstatequestion(e) {
  // ADD 1 TO CURRENT ANIMATION STATE
  animalanimationstate += 1
  let tempvariable = animalanimationstate // SET THE LOCAL VAR TO THE SAME

  animalanimationstimeoutnext = setTimeout(function () {
    if (tempvariable == animalanimationstate) {
      // ASK IF THE LOCAL VAR WHEN SENT IS THE SAME AS THE STATE NOW
      $('body').addClass('animal-animations-on')
    }
  }, 2000)
}

function animationstateaddition(e) {
  animalanimationstate += 1
}

function smashanimalprocess(e) {
  if ($('.chromebrowser').length) {
    SOUNDS.play('smashpiano')
  }
  $('body .content-wrap').show()
  $('body .content-wrap .content').addClass('copy-delays')
  $('body').removeClass('animal-animations-on')
  animationstateaddition()
  currentChartNumber = 1
  chartquery()
  $('.shadow').addClass('inactive')

  setTimeout(function () {
    $('body .content-wrap').addClass('show')
    $('body .chart').addClass('show')
  }, 10)
  setTimeout(function () {
    $('body .content-wrap .content').removeClass('copy-delays')
  }, 1200)

  $('body').toggleClass('smash')
}

function turnOnAnimalNav() {
  prevAnimal = $('#animalchanger').attr('class')
  $('.all-animals-off-btn .popout span').text(animalNames[newAnimal])
  $('#animalchanger').removeClass()
  $('body').addClass('all-animals')
  $('body').removeClass('animal-animations-on')
  animationstateaddition()
  $('.shadow').addClass('inactive')
  $('.hover-detector').removeClass('inactive')
  $('.animal-nav-content').removeClass('inactive')
  $('body').addClass('earlyburst')
  setTimeout(function () {
    $('body').removeClass('earlyburst')
  }, 500)
  setTimeout(function () {
    $('.hover-detector div:nth-child(' + (newAnimal + 1) + ')').addClass('active-animal')
  }, 700)
  setTimeout(function () {
    $('.hover-detector').addClass('active')
    $('.animal-nav-content').addClass('active')
  }, 5)
}

function turnoffanimalnav() {
  if (prevAnimal != '') {
    $('#animalchanger').attr('class', prevAnimal)
  }
  $('body').removeClass('all-animals')
  $('body').addClass('slow-polygons')
  animationstatequestion()
  $('.hover-detector').removeClass('active')
  $('.hover-detector div').removeClass('active-animal')
  $('.animal-nav-content').removeClass('active')
  setTimeout(function () {
    $('.animal-nav-content').addClass('inactive')
    $('.hover-detector').addClass('inactive')
  }, 500)
  setTimeout(function () {
    $('.shadow').removeClass('inactive')
  }, 1000)
  setTimeout(function () {
    $('body').removeClass('slow-polygons')
  }, 1500)
}

function activeChartLinks(e) {
  $('.statistics .active').removeClass('active')
  e.addClass('active')
  chartquery()
}

function chartquery() {
  $('.statistics .stats-ui').removeClass('one two three four')
  $('.statistics .chart').removeClass('show-chart-1 show-chart-2 show-chart-3')
  $('.statistics .stats-ui').addClass(animalChart[newAnimal][0])
  $('.chart').addClass('remove-stats')

  if ($('.statistics-on').length) {
    let chartnumberclass = 'show-chart-' + currentChartNumber
    $('.statistics .chart').addClass(chartnumberclass)
  }

  statisticschangetimeout = setTimeout(function () {
    $('.statistics .stats-ui li:nth-child(2) a span').text(animalChart[newAnimal][1][1])
    $('.statistics .stats-ui li:nth-child(3) a span').text(animalChart[newAnimal][2][1])
    $('.statistics .stats-ui li:nth-child(4) a span').text(animalChart[newAnimal][3][1])

    $('.statistics .chart').removeClass('one-stat four-stats five-stats six-stats eight-stats')
    $('.statistics .chart').addClass(animalChart[newAnimal][currentChartNumber][0])

    setTimeout(function () {
      $('.content-wrap .statistics .chart .chart-bg div').each(function () {
        $(this).css({
          top: '50%',
        })
      })
    }, 20)

    $('.statistics .chart-info p:nth-child(1) span').html(animalChart[newAnimal][currentChartNumber][2])
    $('.statistics .chart-info p:nth-child(2) span').html(animalChart[newAnimal][currentChartNumber][3])
    $('.statistics .chart-info p:nth-child(3) span').html(animalChart[newAnimal][currentChartNumber][4])
    $('.statistics .chart-info p:nth-child(4) span').html(animalChart[newAnimal][currentChartNumber][5])
    $('.statistics .chart-info p:nth-child(5) span').html(animalChart[newAnimal][currentChartNumber][6])
    $('.statistics .chart-info p:nth-child(6) span').html(animalChart[newAnimal][currentChartNumber][7])
    $('.statistics .chart-info p:nth-child(7) span').html(animalChart[newAnimal][currentChartNumber][8])
    $('.statistics .chart-info p:nth-child(8) span').html(animalChart[newAnimal][currentChartNumber][9])
    $('.statistics .chart-info p:nth-child(9) span').html(animalChart[newAnimal][currentChartNumber][10])
    $('.chart').removeClass('remove-stats')
  }, 200)
}

function startslideshow() {
  $('body').addClass('slideshow-on')
  $('.main-nav li:nth-child(2) a').addClass('stop')
  $('.main-nav li:nth-child(2) .popout').addClass('text-change')
  setTimeout(function () {
    $('.main-nav li:nth-child(2) .popout').removeClass('text-change')
    $('.main-nav li:nth-child(2) .popout').text('stop')
  }, 150)
  slideshowvar = slideshowvar + 1
  slideshowquery()
}

function turnoffslideshow() {
  slideshowvar += 1
  $('.main-nav li:nth-child(2) a').removeClass('stop')
  $('.main-nav li:nth-child(2) .popout').addClass('text-change')
  setTimeout(function () {
    $('.main-nav li:nth-child(2) .popout').removeClass('text-change')
    $('.main-nav li:nth-child(2) .popout').text('Cycle Through')
  }, 150)
  $('.slideshow-on').removeClass('slideshow-on')
  animationstatequestion()
}

function slideshowquery(e) {
  randomAnimal()
  // ADD 1 TO CURRENT SLIDESHOW STATE
  slideshowvar += 1

  let tempslideshowvar = slideshowvar // SET THE LOCAL VAR TO THE SAME

  setTimeout(function () {
    if (tempslideshowvar == slideshowvar) {
      // ASK IF THE LOCAL VAR WHEN SENT IS THE SAME AS THE STATE NOW
      slideshowquery()
    }
  }, 2900)
}

function randomAnimal(e) {
  $('body').removeClass('animal-animations-on')
  newAnimal = Math.floor(Math.random() * finishedAnimals)
  nextorprevanimal()
  if ($('.nowebkitbrowser').length) {
    nowebkitnextorprevanimal()
  }
}

function animalStates(e) {
  setInterval(function () {
    e.removeClass('state-four')
    setTimeout(function () {
      e.addClass('state-two')
    }, 1000)
    setTimeout(function () {
      e.removeClass('state-two')
      e.addClass('state-three')
    }, 2000)
    setTimeout(function () {
      e.removeClass('state-three')
      e.addClass('state-four')
    }, 3000)
  }, 4000)
}

function animalStatesSecondLevel(e) {
  setInterval(function () {
    setTimeout(function () {
      e.addClass('two-state-two')
    }, 1000)
    setTimeout(function () {
      e.removeClass('two-state-two')
    }, 1100)
    setTimeout(function () {
      e.addClass('two-state-two')
    }, 1400)
    setTimeout(function () {
      e.removeClass('two-state-two')
    }, 1500)
  }, 3000)
}

function animalStatesShimmer(e) {
  setInterval(function () {
    setTimeout(function () {
      e.addClass('shimmer')
    }, 4000)
    setTimeout(function () {
      e.removeClass('shimmer')
    }, 6000)
  }, 7000)
}

function nowebkitnextorprevanimal(e) {
  $('.wrap .shard-wrap.active').removeClass('active')
  $('.wrap .shard-wrap:nth-child(' + (newAnimal + 1) + ')').addClass('active')
}
