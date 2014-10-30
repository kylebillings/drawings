/*$(document).ready(function getDribbbleShots() {
	$.jribbble.getShotsByPlayerId("thejenyuan", function(playerShots) {
		var html = [];
		$.each(playerShots.shots, function(i, shot) {
			html.push('<div class="shot"><a href="' + shot.url + '" target="_blank">');
			html.push('<img class="shot-image" src="' + shot.image_url + '" ');
			html.push('alt="' + shot.title + '"></a></div>');
		});
		$('#dribbble-feed').html(html.join(''))
	}, {
		page : 1,
		per_page : 4
	})
}); */
$('a[href^="http://"]').attr('target', '_blank');
(function() {
	var $K = $('#posts').css("position", "relative");
	var rsz_i = undefined;
	var rsz = function() {
		if (rsz_i != undefined)
			clearTimeout(rsz_i);
		rsz_i = setTimeout(real_rsz, 100)
	};
	var first = true;
	var real_rsz = function() {
		var C = Math.ceil($("#posts-container").width() / 320);
		var w = Math.ceil($("#posts-container").width() / C);
		console.log("rsz", C, w);
		$(".entry").css({
			"width" : w + "px",
		});
		setTimeout(function() {
			var col = 0, y = [], h = 0;
			$(".entry").each(function() {
				if (!y[col])
					y[col] = 0;
				$(this).css({
					"position" : "absolute",
					"left" : (col * w) + "px",
					"top" : y[col] + "px"
				});
				y[col] += $(this).height();
				h = Math.max(h, y[col]);
				col += 1;
				if (col >= C)
					col = 0
			});
			$("#posts").css("height", h + "px");
			if (first) {
				first = false;
				setTimeout(real_rsz, 150)
			}
//            alert("@@@");
//            $(".photo").css("visibility","visible");
            $(".photo").css("display","block")
		}, 150)
	};
	$K.imagesLoaded(function() {
		$(window).on("resize", rsz);
		rsz()
	});
	$K.infinitescroll({
		navSelector : '#pagination',
		nextSelector : '#pagination a#older',
		itemSelector : ".entry",
		debug: true,
		// autoTrigger:false,
		loading : {
			finishedMsg : function() {
			// if($(window).height() >= $(document).height()){
			// $(document).trigger('retrieve.infscr'); 
			// };

			}
		},
		dataType: "json",
		template:function(data){
			alert (data);  //for test.
		}
	}, function(newElements) {
		var $newElems = $(newElements).css("opacity", "0").css("pointer-events", "none");
		$('#infscr-loading').fadeIn();
		$('.photoset-grid').photosetGrid({
			highresLinks : true,
			rel : $('.photoset-grid').attr('data-id'),
			gutter : '5px',
			onComplete : function() {
			}
		});
		// $('.photoset-grid').each(function() {
		// 	$(this).magnificPopup({
		// 		delegate : 'a',
		// 		type : 'image',
		// 		gallery : {
		// 			enabled : true
		// 		},
		// 		removalDelay : 200,
		// 		mainClass : 'mfp-fade'
		// 	});
		// }); 


		$("p").remove(":contains('Source:'),:contains('via ')");
		var $newElemsIDs = $newElems.map(function() {
			return this.id;
		}).get(); 
		$newElems.imagesLoaded(function() {
			$('#infscr-loading').fadeOut("medium");
			$newElems.css("opacity", "1").css("pointer-events", "auto");
			$(window).on("resize", rsz);
			rsz();
			$K.masonry('appended', $newElems, true);
			console.log($newElems, $newElemsIDs);
			// Tumblr.LikeButton.get_status_by_post_ids($newElemsIDs);
		});
	});
})(); 


var pop_pic = function(){
	  // $.magnificPopup.instance.arrowLeft=
	$("#posts").magnificPopup({
						delegate : '.lightbox-button',
						type : 'image',
						gallery : {
							enabled : true,
							 tCounter: "", //'<span class="mfp-counter">%curr% of %total%</span>'
							  markup:  
					            '<div class="mfp-close"></div>'+
					            '<div class="mfp-img"></div>'+
					            '<div class="mfp-bottom-bar">'+
					              '<div class="mfp-title"></div>'+
					              '<div class="mfp-counter"></div>'+
					            '</div>'
						}, 
						removalDelay : 200,
						mainClass : 'mfp-fade', 
						image: {
						  markup: '<div class="mfp-figure">'+
						            '<div class="mfp-close"></div>'+
						            '<div class="mfp-img"></div>'+
						            '<div class="mfp-bottom-bar">'+
						              '<div class="mfp-title"></div>'+ 
						              '<div class="mfp-counter"></div>'+
						            '</div>'+
						          '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button

						  cursor: 'mfp-zoom-out-cur', // Class that adds zoom cursor, will be added to body. Set to null to disable zoom out cursor. 
						  
						  titleSrc: 'title', // Attribute of the target element that contains caption for the slide.
						  // Or the function that should return the title. For example:
						  // titleSrc: function(item) {
						  //   return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
						  // }

						  verticalFit: true, // Fits image in area vertically

						  tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
						}

		  }); 

}

pop_pic();






