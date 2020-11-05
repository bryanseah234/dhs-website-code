jQuery(document).ready(function($){

	// Preload
	// ========================================================================================
	$('a[href^="mailto:"]').on('click', stoppreload);

	var i = 0;
	function stoppreload(e){
		$(window).unbind('beforeunload');
		var cd = setInterval(function () {
			// Unbind beforeunload for 1 second
			if (i < 1) {
				i++;
			} else {
				preload();
				i = 0;
				clearInterval(cd);
			}
		}, 1000);
	};

	preload();
	function preload(){
		$(window).bind({
			beforeunload: function() {
			  $('#preloader').delay(300).fadeIn(300);
			},
			load: function() {
			  $('#preloader').fadeOut(300);
			}
		});
	}



	$('#announcement-slider').slick({
    	autoplay: true,
    	autoplaySpeed: 5000,
    	accessibility: true,
   		mobileFirst: true,
  		infinite: true,
  		dots: true,
  		speed: 1000,
  		appendDots:$('#dot-wrapper'),
  		prevArrow: $('#prev-btn'),
  		nextArrow: $('#next-btn')
    });

    $('#close-btn').click(function() {
    	if ($('.announcements-wrapper').hasClass("show-bar")) {
    		$('.announcements-wrapper').removeClass("show-bar");
	    	$('.announcements-wrapper').addClass("hide-bar");
    	}
    })

    $('#announcement-toggle').click(function() {
    	if ($('.announcements-wrapper').hasClass("hide-bar")) {
    		$('.announcements-wrapper').removeClass("hide-bar");
	    	$('.announcements-wrapper').addClass("show-bar");
    	}
    })


	// For Screen Width More Than 1025px
	// ========================================================================================
	monitorView();
	function monitorView() { if ( window.innerWidth >= 1025 ) {

		// Maximage Slider
		$('#maximage').maximage({
			cycleOptions: {
				fx: 'scrollHorz',
				speed: 1000,
				timeout: 5000,
				easing: 'easeOutQuad',
				prev: '#maximage-prev',
				next: '#maximage-next',
				pager: '#maximage-pager',
				pause: 0
			},
			onFirstImageLoaded: function(){
				$('#cycle-loader').hide();
				$('#maximage').fadeIn('fast');
			},
			fillElement: '#inner-wrapper',
			backgroundSize: 'contain',
			cssTransitions: false
		});
		// ##End


		// Navigation Toggle
		function navSlidOut(){
			$("#navigation-right").animate({ width: 550 });
			$("#navigation-right").addClass("expanded");
			$("#inner-wrapper").animate({ left: 550 });
			$('#maximage').cycle('pause');
			$("body").css("overflow-y","hidden");
			$(".nicescroll-rails").css("visibility","visible");
		}

		function navSlidIn(){
			$("#navigation-right").animate({ width: 0 });
			$("#navigation-right").removeClass("expanded");
			$("#inner-wrapper").animate({ left: 0 });
			$('#maximage').cycle('resume');
			$("div.overlay-black").remove();
			$("body").css("overflow-y","auto");
			$(".nicescroll-rails").css("visibility","hidden");
		}
		// ##End


		// Navigation Scrollbar
		$("#navigation-right").niceScroll({
			touchbehavior: false,
			cursorcolor: "#bcbeef",
			cursorborder: "none",
			cursorborderradius: "0",
			cursoropacitymax: 1,
			cursorwidth: 5,
			background: "#656a94",
			autohidemode: "leave",
			horizrailenabled: false
		});
		// ##End


		// Replicate and Create Fixed Nenu Items From Main Menu
		$("#navigation-wrapper > ul > li span").not("ul li ul li span").each(function( index ) {
			var strTitle = $( this ).text();
			var MenuID = strTitle.replace(" ", "-").toLowerCase();
			var fixedMenuID = "fixedMenu-" + MenuID;
			var thisObject = $(this);
			thisObject.parent().parent().addClass(fixedMenuID);

			$("#navigation-fixed ul").append('<li class="fixed-menu-item" id="'+fixedMenuID+'"><a>'+$ ( this ).text()+ '</a></li>');
			// create click event for each item
			$("#" + fixedMenuID).on( "click", function() {
				if($(this).hasClass("active")){
					navSlidIn();
					currentFixedMenu();
					$(this).removeClass("active");
				}else{
					// remove previous active item and set clicked item as active
					$("li.fixed-menu-item").removeClass("active current");
					$(this).addClass("active");
					//hide all sub-menu and show active sub-menu
					$("#navigation-wrapper > ul> li").not(" ul li ul li").hide();
					if($("#navigation-right").hasClass("expanded")){
						$("li."+fixedMenuID).fadeIn();
					}else{
						navSlidOut();
						$("li."+fixedMenuID).delay(300).fadeIn();
						$('<div class="overlay-black"></div>').hide().prependTo( "#inner-wrapper" ).fadeIn('fast');
					}
				}
				// slide in when overlay clicked
				$(".overlay-black").on( "click", function() {
					navSlidIn();
					currentFixedMenu();
					$("#" + fixedMenuID).removeClass("active");
				});
			});

			// Add Class For Current Fixed Menu
			currentFixedMenu();
			function currentFixedMenu(){
				var strBcrumb = $(".breadcrumbs span:nth-child(2)").text();
				$( "li.fixed-menu-item" ).each(function() {
					if ( strBcrumb == $(this).text() ) {
						$(this).addClass( "current" );
					}
				});
			}

		});
		// ##End


		// Menu Image Wrapper
		$( ".menu-item a .menu-image" ).wrap( '<div class="menu-image-wrapper"></div>' );


	}}; // ##End For Screen More Than 1025px





	// For Screen Width Less Than 1025px
	// ========================================================================================
	mobileView();
	function mobileView() { if ( window.innerWidth < 1025 ) {



		// Maximage Slider
		$('#maximage').cycle({
			fx: 'fade',
			speed: 300,
			timeout: 5000,
			prev: '#maximage-prev',
			next: '#maximage-next',
			pager: '#maximage-pager',
			pause: 0,
			fit: 1,
			containerResize: 0,
			width: '100%',
			before: onBefore,
		    after: onAfter
		});

		function onBefore() {
			$(this).parent().find('div.current').removeClass('current');
			var slideHeight = $(this).height();
			$('#maximage').animate({ height: slideHeight });
		}
		function onAfter() {
			$(this).addClass('current');
		}
		// ##End


		// Move Navigation Wrapper and Clone Logo Image
		$("#navigation-wrapper").insertAfter("#navigation-logo");
		//$("#navigation-icon").insertAfter("#navigation-mobile-btn");
		$("#navigation-logo a").clone().appendTo("#navigation-mobile-logo");

		// ##End


		// Mobile Navigation Toggle
		function navSlidOutMobile(){
			$("#navigation-header").animate({ left: 0 });
			$("#navigation-mobile").animate({ left: 250 }).addClass("fixed clicked");
			$("#inner-wrapper").animate({ left: 250 }).addClass("fixed");
			$('<div class="overlay-black"></div>').hide().prependTo( "#inner-wrapper" ).fadeIn('fast');
			$("#back-to-top").hide();
			$('#maximage').cycle('pause');
		}

		function navSlidInMobile(){
			$("#navigation-header").animate({ left: -250 });
			$("#navigation-mobile").animate({ left: 0 }, function(){ $(this).removeClass("fixed"); });
			$("#navigation-mobile").removeClass("clicked");
			$("#inner-wrapper").animate({ left: 0 }, function(){
				$(this).removeClass("fixed");
				$('body').scrollTop(0);
			});
			$("div.overlay-black").remove();
			$("#back-to-top").show();
			$('#maximage').cycle('resume');
		}
		// ##End


		// Mobile Navigation Button Function
		$("#navigation-mobile-btn").on( "click", function() {
			if($(this).hasClass("active")){
				navSlidInMobile();
				$(this).removeClass("active");
			} else {
				navSlidOutMobile();
				$(this).addClass("active");
			}
		});
		// ##End


		// Highlight Current Menu Parent
		$('#navigation li li[class*=current-][class*=ancestor]').addClass("current-menu-item");
		$('#navigation li li[class*=current-][class*=ancestor]').parentsUntil( $("#navigation"), "li" ).addClass("current-menu-ancestor");
		// ##End


		// Mobile Wide Table
		$( ".page-content table" ).wrap( '<div class="table-mobile"></div>' );
		$( ".table-mobile" ).before( '<p class="table-swipe">Swipe <b>left</b> or <b>right</b> to view full content</p>' );
		// ##End

		$('.menu-item-has-children', '#navigation').append('<span class="submenu-toggle">&#xe900;</span>');
		$('.submenu-toggle').on('click', function(e){

			var $this = $(this);

			if ($this.hasClass('open')) {
				$this.removeClass('open');
				$this.parent('.menu-item').children('.sub-menu').slideUp();
			} else {
				$('.sub-menu').slideUp();
				$('.submenu-toggle').removeClass('open');
				$this.addClass('open');
				$this.parent('.menu-item').children('.sub-menu').slideDown();
			}

		});

		$('#mobile-search').on('click', function() {
			var $this = $(this);

			if($this.hasClass('toggled')) {
				$this.removeClass('toggled');
				$this.find('>span').html('&#xe986;');
				$('#mobile-search-box').slideUp('fast');
			} else {
				$this.addClass('toggled');
				$this.find('>span').html('&#xe901;');
				$('#mobile-search-box').slideDown('fast');
			}
		});

		// $('.search-button', '#mobile-search-box').on('click', function() {
			// $('#mobile-search').trigger('click');
		// });

		// $('#site-search', '#mobile-search-box').on('keypress', function(e){
		// 	if (e.keyCode === 13) {
		// 		$('#mobile-search').trigger('click');
		// 	}
		// });

	}}; // ##End For Screen Less Than 1025px





	// jQuery Tooltip
	$("#navigation-icon a.icon-calender").tooltip({
		tooltipClass: "navigation-icon",
		position: {
			my: "center top+20",
			at: "center bottom",
			using: function( position, feedback ) {
			  $( this ).css( position );
			  $( "<div>" )
				.addClass( "arrow first" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		},
		close: function (event, ui) {
			$(".ui-helper-hidden-accessible").remove();
		}
	});

	$("#navigation-icon a.icon-mic, #navigation-icon a.icon-note").tooltip({
		tooltipClass: "navigation-icon",
		position: {
			my: "center top+20",
			at: "center bottom",
			using: function( position, feedback ) {
			  $( this ).css( position );
			  $( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		},
		close: function (event, ui) {
			$(".ui-helper-hidden-accessible").remove();
		}
	});
	// ##End


	// Back To Top
	if ($('#back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#back-to-top').addClass('show');
				} else {
					$('#back-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 500);
		});
	}
	// ##End


	// Toggle For Read More Content
	$('.toggle-more').click( function() {
		var thisParent = $(this).parent();
		$(this).toggleClass("rotate");
	    $(this).siblings('.toggle-content').slideToggle( 500, function(){
			if($(this).is(":visible")){
				$('html,body').animate({ scrollTop: $(this).offset().top-50 });
			} else {
				$('html,body').animate({ scrollTop: thisParent.offset().top-10 });
			}
		});
	});
	// ##End


	// Navigation Active Icon
	activeIcon();
	function activeIcon() {
		if ( document.location.href.indexOf('whats-new') > -1 ) {
			$("#navigation-icon .icon-calender").addClass("active");
		} else if ( document.location.href.indexOf('principals-message') > -1 ) {
			$("#navigation-icon .icon-mic").addClass("active");
		} else if ( document.location.href.indexOf('booking-of-pac') > -1 ) {
			$("#navigation-icon .icon-note").addClass("active");
		}
	}
	// ##End


	// Gallery Slideshow
	$('.gallery-slideshow').append(
		'<div class="slideshow-buttons">' +
		    '<div class="slideshow-control prev"> <span class="icon-arrow-left"></span> </div>' +
			'<div class="slideshow-control next"> <span class="icon-arrow-right"></span> </div>' +
			'<div class="slideshow-caption"></div>' +
		'</div>'
	);

    $('.gallery-slideshow .gallery').cycle({
		speed: 600,
		timeout: 5000,
		fx: 'scrollHorz',
		slides: '> figure',
		easing: 'easeOutQuad',
		caption: '.slideshow-caption',
		next: '.slideshow-control.next',
		prev: '.slideshow-control.prev',
		swipe: true,
		log: false
	});

	galleryClear();
	function galleryClear() {
		var gTitleHeight = $(".news-header").height();
		var gHeight = $(".gallery-slideshow .gallery img:first-child").height();
		if ( gTitleHeight >= gHeight ) {
			$('.gallery-clear').show();
		} else {
			$('.gallery-clear').hide();
		}
	}

	$('.slideshow-control').hover( function() {
		$('.slideshow-caption').addClass( "hover" );
	}, function() {
		$('.slideshow-caption').removeClass( "hover" );
	});
	// ##End


	// Essential Grid Only One Filter Selection Per Click
	$("#whats-new-grid .esg-filterbutton, #campus-life-grid .esg-filterbutton").on( "click", function() {
		if($(this).hasClass("selected")){
			$(this).siblings('.esg-filterbutton').addClass("deactivated");
		} else {
			$(this).siblings('.esg-filterbutton').removeClass("deactivated");
		}
	});
	$(".eg-search-submit, .eg-search-clean").on( "click", function() {
		$('.esg-filterbutton').removeClass("deactivated");
	});
	// ##End



	// Resize
	// ========================================================================================
	var prevWidth = window.innerWidth;
	var resizeTimer;
	$(window).on('resize', function(e) {
		galleryClear();
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			var currentWdith = window.innerWidth;

			if (prevWidth < 1025 && currentWdith >= 1025){
				location.reload();
				$('#preloader').fadeIn(0);
				//console.log ("Monitor");
			}

			if (prevWidth >= 1025 && currentWdith < 1025){
				location.reload();
				$('#preloader').fadeIn(0);
				//console.log ("Mobile");
			}

			prevWidth = currentWdith;
		});
	});
	// ##End

});

