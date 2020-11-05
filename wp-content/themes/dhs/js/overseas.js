jQuery(document).ready(function($){
	//var max_child = $(".oversea_query div").children().length;
	/*
	for(var i=0; i<max_child; i++) {
		
		var class_val = $(".oversea_query div").eq(i).attr("class");	
		console.log(class_val);
		var res = class_val.split(" ");
		
		
		var year = res[0].split("trip_year_");
		//var country = res[1].split("trip_country_");
		//var category = res[2].split("trip_category_");
		//console.log(category[1] );
		
		$("#"+year[1]+"_div").append();
	}
	*/
	//take out the divs and append them to the year first
	var current_year = $(".year_btn_div:first").attr("title");
	var year_country = [];
	$(".oversea_query div").each(function() {
        var class_val = $(this).attr("class");
		//console.log(class_val);
		var res = class_val.split(" ");
		var year = res[0].split("trip_year_");
		var country = res[1].split("trip_country_");
		var category = res[2].split("trip_category_");
		
		//add type of country into the array with the year too
		
			var arraytemp = [country[1],year[1],category[1]];
			year_country.push(arraytemp);	
			//console.log(arraytemp[0]+","+arraytemp[1]+","+arraytemp[2]);
			
		//move the div to the correct years.
		$("#"+year[1]+"_div").append($(this));
    });
	//remove the empty div
	$(".oversea_query").remove();
	
	//for each type of country create a div
	for(var i = 0; i < year_country.length; i++) {
		
		//if the country doesn't exist, create it
		if(!$("#"+year_country[i][1]+"_div"+" .country_"+year_country[i][0])[0]) {
			//making sure the blanks are replaced
			var makesure_country = year_country[i][0].replace('_', ' ');
			$("#"+year_country[i][1]+"_div").append("<div id='"+year_country[i][1]+"_"+year_country[i][0]+"' class='country_"+year_country[i][0]+" country'><div class='country_name'>"+makesure_country+"</div></div>");
		}
	
		//if that category category doesn't exist, create it
		if(!$("#"+year_country[i][1]+"_div"+" .country_"+year_country[i][0]+" .category_"+year_country[i][2])[0]) {
			
			var makesure_category = year_country[i][2].replace('_', ' ');
			$("#"+year_country[i][1]+"_div"+" .country_"+year_country[i][0]).append("<div class='category_type category_"+year_country[i][2]+"'><div class='category_title'>"+makesure_category+"</div></div>");
	
		}
	}
	
	//rearrange category alphabet
	$(".country").each(function() {
		
		//console.log($(this).attr("class"));
		var $divc = $(this).children(".category_type");
		var $countryname = $(this).children(".country_name");
		var AOD = $divc.sort(function (a, b) {
					
					var A_category = ''+$(a).find(".category_title").text().toLowerCase();
					var B_category = ''+$(b).find(".category_title").text().toLowerCase();
					
					if(A_category > B_category) return 1;
					if(A_category < B_category) return -1;
					return 0;
			});
			
		$(this).html(AOD);
		$(this).prepend($countryname);
	});
	
	//move the corresponding title to the correct year, country and course
	$(".year_div").children().children().each(function() {
		
		var thisclass =  $(this).attr("class");
		//check if this is not a country div
		if(thisclass.indexOf("trip_") >= 0) {
			
			//check for year
			var res = thisclass.split(" ");
			var year = res[0].split("trip_year_");
			var country = res[1].split("trip_country_");
			var category = res[2].split("trip_category_");
		
			$(this).appendTo("#"+year[1]+"_div"+" .country_"+$(this).attr("title")+" .category_"+category[1]);
		}
	})
	
	
	//arrange country alphabetically
	$(".year_div > div").each(function() {
		
		var $divs = $(this).children(".country");
		var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
			
			var A_country = ''+$(a).find(".country_name").text().toLowerCase();
			var B_country = ''+$(b).find(".country_name").text().toLowerCase();
			
			if(A_country > B_country) return 1;
			if(A_country < B_country) return -1;
			return 0;
		});
		$(this).html(alphabeticallyOrderedDivs);
		
		var thisid =  $(this).attr("id")
		var res = thisid.split("_div");

		$(this).prepend("<div class='year_title'><h3>"+res[0]+"</h3></div>");
	});
	
	$('.year_btn_div:first').addClass('active');
	
	$("#year_buttons div").click(function() {
        current_year = $(this).attr("title");
		$("#year_buttons div").removeClass("active");
		$(this).addClass("active");
		show_current_year();
    });
	
	//scroll to selected country
	$('#world_map_div a').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500);
				target.effect("highlight", {color:'#d9d9d9'}, 1500);
				return false;
			}
		}
	});
	
	function show_current_year() {	
		//hide all other years
		$(".year_div > div").each(function() {
			
			if($(this).attr("id") != current_year+"_div") {
				$(this).css("display","none");	
			}else {
				$(this).css("display","block");
			}
		});
		
		//hide dots that is not on the current years
		$('#world_map_div > div').each(function() {
			
			var thisid = $(this).attr("id");
			var thiscountry = thisid.split("_dot");
			$(this).children('a').attr("href","#"+current_year+"_"+thiscountry[0]);
			
			if(!$("#"+current_year+"_"+thiscountry[0])[0]) {
				 $(this).css("display","none");
			}else {
				$(this).css("display","block");
			}
		});
	}
	
	show_current_year();
	
	// Click on Year and scroll to div in mobile view
	yearScroll();
	function yearScroll() {
		if ( $(window).width() <= 767 ){
			$(".year_btn_div").removeClass("active");
			$(".year_btn_div").click( function(){
				$('html, body').animate({
					scrollTop: $(".year_div").offset().top
				}, 500);
				return false;
			});
		}
	}
	
});