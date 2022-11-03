// JavaScript Document

$(document).on('ready', function() {
	  var owl = $("#owl-demo");
	 
	  owl.owlCarousel({
		  autoPlay: 4000,
		  items : 4, //10 items above 1000px browser width
		  itemsDesktop : [1920,4], //5 items between 1000px and 901px
		  itemsDesktopSmall : [900,3], // betweem 900px and 601px
		  itemsTablet: [600,2], //2 items between 600 and 0
		  itemsMobile : [380,1] 
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
});

// TESTIMONIAL CAROUSEL

$(document).on('ready', function() {
	  var owl = $("#owl-demo1,#owl-demo3");
	 
	  owl.owlCarousel({
		  autoPlay: 4000,
		  items : 1, //10 items above 1000px browser width
		  itemsDesktop : [1920,1], //5 items between 1000px and 901px
		  itemsDesktopSmall : [900,1], // betweem 900px and 601px
		  itemsTablet: [600,1], //2 items between 600 and 0
		  itemsMobile : [380,1] 
	  });
	 
	  // Custom Navigation Events
	  $(".next").click(function(){
		owl.trigger('owl.next');
	  })
	  $(".prev").click(function(){
		owl.trigger('owl.prev');
	  })
	  $(".play").click(function(){
		owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	  })
	  $(".stop").click(function(){
		owl.trigger('owl.stop');
	  })
	 
});




    $(document).on('ready', function() {
     
      var owl = $("#owl-demo2");
     
      owl.owlCarousel({
		   autoPlay: 4000,
        itemsCustom : [
        [0, 1],
        [450, 2],
        [600, 3],
        [700, 3],
        [1000, 4],
        [1200, 6],
        [1400, 6],
        [1600, 6]
      ]
      });
     
      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
      $(".play").click(function(){
        owl.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
      })
      $(".stop").click(function(){
        owl.trigger('owl.stop');
      })
     
    });

