$(function () {
	$('body #fix-menu').load('/_navi.html');

	var $mainSlider = $('.main-slider');
	owlLoopfixed($mainSlider, {
		items: 1,
		lazyLoad: true,
		navText: ['<i class="black-nav prev"></i>','<i class="black-nav next"></i>'],
		nav: true,
		animateOut: "fadeOut",
		animateIn: "fadeIn"
	});

	var $new = $('.new .slider');
	owlLoopfixed($new, {
		nav: false,
		margin: 20,
		stagePadding: 3,
		responsive : {
			0 : {
				items: 1
			},
			470 : {
				items: 2
			},
			680 : {
				items: 3
			},
			920 : {
				items: 4
			}
		}
	});
	owlCustNav($new);

	var $brandSlider = $('.brand-box .slider');
	owlLoopfixed($brandSlider, {
		nav: false,
		margin: 10,
		dots: false,
		responsive : {
			0 : {
				items: 1
			},
			470 : {
				items: 2
			},
			680 : {
				items: 3
			},
			920 : {
				items: 5
			}
		}
	});
	owlCustNav($brandSlider);
	
	$.fn.spin.presets.spinner = {
	  lines: 15 // The number of lines to draw
	, length: 32 // The length of each line
	, width: 5 // The line thickness
	, radius: 28 // The radius of the inner circle
	, scale: 0.25 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, opacity: 0.05 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1.7 // Rounds per second
	, trail: 60 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 5 // The z-index (defaults to 2000000000)
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'absolute' // Element positioning
	};
	$('.main-slider .owl-item').spin('spinner', '#EB1680');

	$('.filter input, .filter select, .deliveries_s input').styler();

	$('.deliveries_s label').on('click', function(){
	    $('.deliveries_s label').removeClass('active_label');
	    $('.deliveries_s label div.jq-radio').removeClass('checked');

		$(this).addClass('active_label');
		$(this).find('div.jq-radio').addClass('checked');
	});

	$("#age_sl").slider({});
	$("#price_sl").slider({});
	//$("input[type=number]").stepper();

	$("#price_sl").on("slide", function(slideEvt) {
		a = slideEvt.value;
		current = a.toString().split(",");
		$('#price_min').val(current[0]);
		$('#price_max').val(current[1]);
	});	
	
	$("#age_sl").on("slide", function(slideEvt) {
		a = slideEvt.value;
		current = a.toString().split(",");
		$('#age_min').val(current[0]);
		$('#age_max').val(current[1]);
	});

	$('.toggle-menu-btn').on('click', function(){
		var $menu = $('.headerfix_menu');
		tex = $('.toggle-menu-btn .touch-text').text();
		if(tex=='Показать каталог')
			$('.toggle-menu-btn .touch-text').text('Скрыть каталог');
		else
			$('.toggle-menu-btn .touch-text').text('Показать каталог');
		
		$(this).toggleClass('active');
		$menu.fadeOut(300, function(){
			$menu.toggleClass('fixed-menu').fadeIn(300);
		});
	});

	// фильтр в категории
	var $toggle = $('.toggle');
	$toggle.find('.toggle-content').not('.open').hide();
	$toggle.find('h3').after('<span class="plus"></span>');
	$toggle.each(function(){
		if ($(this).find('.toggle-content').hasClass('open'))
			$(this).find('span.plus').removeClass('plus').addClass('min');
	});
	
	$toggle.find('span').on("click", function(){
		$(this).toggleClass('plus').toggleClass('min');
		$(this).parent().find('.toggle-content').stop().slideToggle("slow");
	});
	
	// переключатель вида категории */
	var $gw = $('.grid-view');
	$gw.find('.grid-2').click(function(){
		$('body').removeClass().addClass('type_b');
	});
	$gw.find('.grid-1').click(function(){
		$('body').removeClass().addClass('type_a');
	});
	// cookie для вида категории */
	var blockStateCookie = $.cookie('grid_view');
	// проверям их, если нет, создаем 1 - классический вид */
	if (blockStateCookie == undefined) {
		$.cookie('grid_view', '1', { expires: 3 });
	}
	// записываем куки */
	$gw.find('.grid-1').click(function(){
		$.cookie('grid_view', '1', { expires: 3 });
	});
	$gw.find('.grid-2').click(function(){
		$.cookie('grid_view', '2', { expires: 3 });
	});
	// куки записаны, добавим класс для body */
	if (blockStateCookie == '1') $('body').removeClass().addClass('type_a');
	if (blockStateCookie == '2') $('body').removeClass().addClass('type_b');

	var $left = $('.left-col');
	var $filter = $('.filter');
	$('.filter-button').click(function(){
		$(this).toggleClass('active');
		$left.fadeToggle('fast', function(){
			$filter.toggleClass('active');
		});
	}); 
	
	$.fn.toggleChecked = function() {
		return this.each(function() {
			this.checked = !this.checked;
		});
	};
	// filter clear
	$('button.filter-btn-clear').click(function() {
		$(this).parents('div.filter').find('input').prop( "checked", false ).trigger('refresh');
		return false;
	});

});

function owlLoopfixed($elem, opt) {
	var $elemLength = $elem.children('div').length;
	var $loopElem;

	if ($elemLength > 1) $loopElem = true
		else $loopElem = false;
	opt["loop"] = $loopElem;
	$elem.owlCarousel(opt);
}
function owlCustNav($elem) {
	$elem.parent().find('span.nav-next').click(function() {
		$elem.trigger('next.owl.carousel');
	})
	$elem.parent().find('span.nav-prev').click(function() {
		$elem.trigger('prev.owl.carousel', [300]);
	})
};


