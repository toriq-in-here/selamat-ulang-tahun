/* ==========================================================
   Bagian 2 (surat ucapan) - dipanggil dari effect.js lewat
   window.startStage2() setelah tulisan HBD tampil di bagian 1.
   ========================================================== */
(function () {
  var started = false;

  function byId(id) { return document.getElementById(id); }
  function show(el) { el.classList.remove('d-none'); }
  function hide(el) { el.classList.add('d-none'); }

  // Tampilkan "Ketuk untuk melanjutkan", lalu jalankan cb pada ketukan berikutnya
  function waitTap(cb) {
    var tap = byId('tap');
    show(tap);
    document.addEventListener('click', function () {
      hide(tap);
      cb();
    }, { once: true });
  }

  // Ketik teks dengan TypeIt; kalau pustakanya gagal dimuat, tampilkan teks langsung
  function typeInto(selector, strings, startDelay, speed, onDone) {
    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      if (onDone) onDone();
    }
    try {
      new TypeIt(selector, {
        strings: strings,
        startDelay: startDelay,
        speed: speed,
        afterComplete: done
      }).go();
    } catch (e) {
      document.querySelector(selector).innerHTML = strings.join('<br>');
      done();
    }
    return done;
  }

  // ---------- Slide 1: gambar Happy Birthday ----------
  function slideSatu() {
    var s = byId('slideSatu');
    show(s);
    setTimeout(function () {
      waitTap(function () {
        s.classList.remove('animate__slow');
        s.classList.replace('animate__slideInDown', 'animate__backOutDown');
        setTimeout(function () {
          hide(s);
          slideDua();
        }, 1000);
      });
    }, 7000);
  }

  // ---------- Slide 2: surat bagian pertama ----------
  function slideDua() {
    var s = byId('slideDua');
    show(s);
    var ready = typeInto('#teks1', [
      'Hari ini, hari dimana seorang perempuan lahir yang bernama Aulia Belinda Celestine Muliawan.',
      'Semoga hal-hal yang membuat kamu runtuh turut menjadi alasan kamu untuk tetap tumbuh.',
      'Semoga dunia senantiasa menjaga kamu dimanapun kamu berada.',
      'Semoga hari-hari kamu selalu diiringi cinta yang tak pernah ada batasnya.',
      'Semoga setiap langkahmu dimudahkan hingga tercapai apa yang kamu inginkan.'
    ], 4000, 75, function () {
      waitTap(function () {
        s.classList.replace('animate__zoomInDown', 'animate__fadeOutLeft');
        s.classList.remove('animate__slow');
        setTimeout(function () {
          s.remove();
          slideTiga();
        }, 1000);
      });
    });
    // cadangan: kalau penanda "selesai mengetik" tidak datang, tetap lanjut
    setTimeout(ready, 60000);
  }

  // ---------- Slide 3: surat bagian kedua ----------
  function slideTiga() {
    var s = byId('slideTiga');
    show(s);
    var ready = typeInto('#teks2', [
      'Semoga semesta selalu membahagiakan kamu bagimanapun caranya dan kamu selalu dikeliling orang-orang yang baik dan sayang kamu.',
      ' ',
      'barakallah fi umrik, terima kasih sudah bertahan sampai sejauh ini.',
      ' ',
      '- Wish all you the best'
    ], 2000, 75, function () {
      waitTap(function () {
        s.classList.replace('animate__fadeInRight', 'animate__fadeOut');
        setTimeout(function () {
          s.remove();
          slideEmpat();
        }, 1000);
      });
    });
    setTimeout(ready, 60000);
  }

  // ---------- Slide 4: "Kamu suka nggak?" ----------
  function slideEmpat() {
    var s = byId('slideEmpat');
    show(s);

    // tombol "Gak!" bikin kotak pindah posisi secara acak
    byId('gak').addEventListener('click', function () {
      var maxShift = Math.max(0, (window.innerHeight - s.offsetHeight) / 2 - 40);
      s.style.top = Math.round((Math.random() * 2 - 1) * maxShift) + 'px';
    });

    byId('suka').addEventListener('click', function () {
      s.classList.replace('animate__fadeInDown', 'animate__bounceOut');
      s.classList.remove('animate__delay-2s');
      setTimeout(function () {
        s.remove();
        setTimeout(slideLima, 500);
      }, 1000);
    });
  }

  // ---------- Slide 5: hati + "Terimakasih." ----------
  function slideLima() {
    var heart = byId('slideLima');
    var trims = byId('trims');
    show(heart);

    setTimeout(function () {
      show(trims);
      typeInto('#trims', ['Terimakasih.'], 1000, 150);
    }, 1000);

    setTimeout(function () {
      heart.classList.remove('animate__slow');
      heart.classList.replace('animate__bounceIn', 'animate__fadeOut');
      trims.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(function () {
        hide(heart);
        hide(trims);
        slideEnam();
      }, 1000);
    }, 9000);
  }

  // ---------- Penutup: tombol putar ulang ----------
  function slideEnam() {
    show(byId('slideEnam'));
    byId('replay').addEventListener('click', function (e) {
      e.stopPropagation();
      window.location.reload();
    });
  }

  // ---------- Titik masuk dari bagian 1 ----------
  window.startStage2 = function () {
    if (started) return;
    started = true;

    // ganti lagu: pakai elemen audio yang sama (sudah "terbuka" oleh klik Play Music)
    var song = document.querySelector('.song');
    if (song) {
      try {
        song.pause();
        song.src = 'music/monokrom.mp3';
        song.load();
        var p = song.play();
        if (p && p.catch) {
          p.catch(function () {
            // diblokir browser -> mulai di ketukan pertama
            document.addEventListener('click', function () { song.play(); }, { once: true });
          });
        }
      } catch (e) {}
    }

    $('body').addClass('stage2-on');
    $('#stage2').fadeIn(1500, function () {
      // bagian 1 sudah tertutup penuh -> sembunyikan supaya animasinya berhenti
      $('.balloons').stop(true);
      $('.container, .balloons, .balloon-border, .loading').hide();
      confetti();
      slideSatu();
    });
  };

  // ---------- Confetti ----------
  var onlyOnKonami = false;

  function confetti() {
    // Globals
    var $window = $(window),
      random = Math.random,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      PI2 = PI * 2,
      timer = undefined,
      frame = undefined,
      confetti = [];

    var runFor = 2000
    var isRunning = true

    setTimeout(() => {
      isRunning = false
    }, runFor);

    // Settings
    var particles = 150,
      spread = 20,
      sizeMin = 5,
      sizeMax = 12 - sizeMin,
      eccentricity = 10,
      deviation = 100,
      dxThetaMin = -.1,
      dxThetaMax = -dxThetaMin - dxThetaMin,
      dyMin = .13,
      dyMax = .18,
      dThetaMin = .4,
      dThetaMax = .7 - dThetaMin;

    var colorThemes = [
      function () {
        return color(200 * random() | 0, 200 * random() | 0, 200 * random() | 0);
      },
      function () {
        var black = 200 * random() | 0;
        return color(200, black, black);
      },
      function () {
        var black = 200 * random() | 0;
        return color(black, 200, black);
      },
      function () {
        var black = 200 * random() | 0;
        return color(black, black, 200);
      },
      function () {
        return color(200, 100, 200 * random() | 0);
      },
      function () {
        return color(200 * random() | 0, 200, 200);
      },
      function () {
        var black = 256 * random() | 0;
        return color(black, black, black);
      },
      function () {
        return colorThemes[random() < .5 ? 1 : 2]();
      },
      function () {
        return colorThemes[random() < .5 ? 3 : 5]();
      },
      function () {
        return colorThemes[random() < .5 ? 2 : 4]();
      }
    ];

    function color(r, g, b) {
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    // Cosine interpolation
    function interpolation(a, b, t) {
      return (1 - cos(PI * t)) / 2 * (b - a) + a;
    }

    // Create a 1D Maximal Poisson Disc over [0, 1]
    var radius = 1 / eccentricity,
      radius2 = radius + radius;

    function createPoisson() {
      // domain is the set of points which are still available to pick from
      // D = union{ [d_i, d_i+1] | i is even }
      var domain = [radius, 1 - radius],
        measure = 1 - radius2,
        spline = [0, 1];
      while (measure) {
        var dart = measure * random(),
          i, l, interval, a, b, c, d;

        // Find where dart lies
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
          a = domain[i], b = domain[i + 1], interval = b - a;
          if (dart < measure + interval) {
            spline.push(dart += a - measure);
            break;
          }
          measure += interval;
        }
        c = dart - radius, d = dart + radius;

        for (i = domain.length - 1; i > 0; i -= 2) {
          l = i - 1, a = domain[l], b = domain[i];
          // c---d          c---d  Do nothing
          //   c-----d  c-----d    Move interior
          //   c--------------d    Delete interval
          //         c--d          Split interval
          //       a------b
          if (a >= c && a < d)
            if (b > d) domain[l] = d; // Move interior (Left case)
            else domain.splice(l, 2); // Delete interval
          else if (a < c && b > c)
            if (b <= d) domain[i] = c; // Move interior (Right case)
            else domain.splice(i, 0, c, d); // Split interval
        }

        for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
          measure += domain[i + 1] - domain[i];
      }

      return spline.sort();
    }

    var container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '0';
    container.style.overflow = 'visible';
    container.style.zIndex = '100001';

    // Confetto constructor
    function Confetto(theme) {
      this.frame = 0;
      this.outer = document.createElement('div');
      this.inner = document.createElement('div');
      this.outer.appendChild(this.inner);

      var outerStyle = this.outer.style,
        innerStyle = this.inner.style;
      outerStyle.position = 'absolute';
      outerStyle.width = (sizeMin + sizeMax * random()) + 'px';
      outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
      innerStyle.width = '100%';
      innerStyle.height = '100%';
      innerStyle.backgroundColor = theme();

      outerStyle.perspective = '50px';
      outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
      this.axis = 'rotate3D(' +
        cos(360 * random()) + ',' +
        cos(360 * random()) + ',0,';
      this.theta = 360 * random();
      this.dTheta = dThetaMin + dThetaMax * random();
      innerStyle.transform = this.axis + this.theta + 'deg)';

      this.x = $window.width() * random();
      this.y = -deviation;
      this.dx = sin(dxThetaMin + dxThetaMax * random());
      this.dy = dyMin + dyMax * random();
      outerStyle.left = this.x + 'px';
      outerStyle.top = this.y + 'px';

      // Create the periodic spline
      this.splineX = createPoisson();
      this.splineY = [];
      for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
        this.splineY[i] = deviation * random();
      this.splineY[0] = this.splineY[l] = deviation * random();

      this.update = function (height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        // Compute spline and convert to polar
        var phi = this.frame % 7777 / 7777,
          i = 0,
          j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
          this.splineY[i],
          this.splineY[j],
          (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + 'px';
        outerStyle.top = this.y + rho * sin(phi) + 'px';
        innerStyle.transform = this.axis + this.theta + 'deg)';
        return this.y > height + deviation;
      };
    }


    function poof() {
      if (!frame) {
        // Append the container
        document.body.appendChild(container);

        // Add confetti

        var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
          count = 0;

        (function addConfetto() {

          if (onlyOnKonami && ++count > particles)
            return timer = undefined;

          if (isRunning) {
            var confetto = new Confetto(theme);
            confetti.push(confetto);

            container.appendChild(confetto.outer);
            timer = setTimeout(addConfetto, spread * random());
          }
        })(0);


        // Start the loop
        var prev = undefined;
        requestAnimationFrame(function loop(timestamp) {
          var delta = prev ? timestamp - prev : 0;
          prev = timestamp;
          var height = $window.height();

          for (var i = confetti.length - 1; i >= 0; --i) {
            if (confetti[i].update(height, delta)) {
              container.removeChild(confetti[i].outer);
              confetti.splice(i, 1);
            }
          }

          if (timer || confetti.length)
            return frame = requestAnimationFrame(loop);

          // Cleanup
          document.body.removeChild(container);
          frame = undefined;
        });
      }
    }

    if (!onlyOnKonami) poof();
  };

})();
