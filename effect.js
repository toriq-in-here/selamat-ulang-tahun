$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
	// ukuran balon menyesuaikan lebar layar (maks 100px, 8 balon harus muat)
	function balloonSize(){
		return Math.max(30, Math.min(100, Math.floor(($(window).width() - 16) / 8)));
	}
	function applyBalloonSize(){
		var s = balloonSize(), h = Math.round(s * 1.83);
		$('.balloons').css({width: s, height: h, 'background-size': s + 'px ' + h + 'px'});
		$('.balloons h2').css({'font-size': Math.round(s * 0.5), 'margin-top': Math.round(s * 0.2)});
	}
	function layoutHBD(animate){
		var s = balloonSize(), vw = $(window).width() / 2;
		var top = 240;
		if (s < 100) {
			var b = $('.bannar')[0];
			top = b ? Math.round(b.getBoundingClientRect().bottom) + 10 : 150;
		}
		var ids = ['#b11','#b22','#b33','#b44','#b55','#b66','#b77','#b88'];
		for (var i = 0; i < ids.length; i++) {
			var pos = {top: top, left: vw - 4 * s + i * s};
			if (animate) { $(ids[i]).animate(pos, 500); } else { $(ids[i]).stop().css(pos); }
		}
	}
	function randPos(){
		var s = balloonSize();
		return {left: Math.max(0, ($(window).width() - s)) * Math.random(), bottom: $(window).height() * 0.5 * Math.random()};
	}
	applyBalloonSize();
	var hbdDone = false;
		$(window).resize(function(){
			applyBalloonSize();
			if (hbdDone) { layoutHBD(false); }
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	function loopOne() {
		var p = randPos();
		$('#b1').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var p = randPos();
		$('#b2').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var p = randPos();
		$('#b3').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var p = randPos();
		$('#b4').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var p = randPos();
		$('#b5').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var p = randPos();
		$('#b6').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var p = randPos();
		$('#b7').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopSeven();
		loopEight();
		});
	}

	function loopEight() {
		var p = randPos();
		$('#b8').animate({left:p.left,bottom:p.bottom},10000,function(){
			loopEight();
		});
	}

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		$('#b8').addClass('balloons-rotate-behaviour-two');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		loopEight();
		
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		 vw = $(window).width()/2;

		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22')
		$('#b3').attr('id','b33')
		$('#b4').attr('id','b44')
		$('#b5').attr('id','b55')
		$('#b6').attr('id','b66')
		$('#b7').attr('id','b77');
		$('#b8').attr('id','b88')
		hbdDone = true;
		layoutHBD(true);
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow');

		// setelah tulisan HBD AULIA tampil sebentar, lanjut ke bagian kedua (surat ucapan)
		setTimeout(function(){
			if (window.startStage2) { window.startStage2(); }
		}, 7000);
	});
});




//alert('hello');