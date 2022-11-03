$(function () { // map 1
    
    $(window).on('scroll', function () {
        
        if (checkVisible($("#map"))) {

            const box = document.getElementById('preload-imgs-one');
            const box2 = document.getElementById('preload-imgs-two');

            if (box.childNodes.length === 0) {
                map_functions();
            } 
            if (box2.childNodes.length === 0) {
                map_two();
            } 

        }
    });

    if (checkVisible($("#map"))) {
        map_functions();
        map_two();
    }

    function checkVisible(elm, eval) {
        eval = eval || "object visible";
        var viewportHeight = $(window).height(), // Viewport Height
            scrolltop = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if (eval == "object visible") return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;
        if (eval == "above") return y < viewportHeight + scrolltop;
    }

    function map_functions() { 

        /*-----------------------------------------------------*/
		/*----------------------- Map 1 -----------------------*/
		/*-----------------------------------------------------*/

        var num = 300; // the total number of images 

        // Preload all the images into hidden div
        for (var i=1 ; i<=num ; i++) {
            var img = document.createElement('img');
            img.src = 'assets/map/12-Tribes-3D- (' + i + ').png';
            document.getElementById('preload-imgs-one').appendChild(img);
        }

        // Control swipes using jquery.touchSwipe.min.js
        // http://labs.rampinteractive.co.uk/touchSwipe/
        var swipeOptions=
        {
            triggerOnTouchEnd : true,	
            swipeStatus : swipeStatus,
            allowPageScroll:"vertical",
            threshold: 1000			
        }

        $(function()
        {				
            imgs = $(".map-image-one .img-container"); // the element that will be swipeable
            imgs.swipe( swipeOptions );
        });

        function swipeStatus(event, phase, direction, distance) {
            var duration = 0;
            if(direction == "left") {
                changeImg(distance);
            }
            else if (direction == "right") {
                changeImgR(-distance);
            }
        }

        function changeImg (imgNum) {

            // divide by 8 (or any number) to spread 
            // it out so it doesn't load new img 
            // every single px of swipe distance
            imgNum = Math.floor(imgNum/2); 

            if (imgNum < 1) {
                imgNum += num;
            }
            if (imgNum > num) {
                imgNum -= num;
            }

            // change the image src
            document.getElementById("myImgOne").src='assets/map/12-Tribes-3D- ('+imgNum+').png';
        }

        function changeImgR (imgNum) {

            // divide by 8 (or any number) to spread 
            // it out so it doesn't load new img 
            // every single px of swipe distance
            imgNum = Math.floor(imgNum/2); 

            var num2 = -Math.abs(num); 
            if (imgNum > num2) {
                imgNum += num;
            }
            if (imgNum <= num2) {
                imgNum += num*2;
            }

            // change the image src
            document.getElementById("myImgOne").src='assets/map/12-Tribes-3D- ('+imgNum+').png';
        }

        /*-----------------------------------------------------*/
		/*----------------------- Zoom  -----------------------*/
        /*-----------------------------------------------------*/
        
        var scale = 1,
        panning = false,
        pointX = 0,
        pointY = 0,
        start = { x: 0, y: 0 },
        zoom = document.getElementById("zoom");
        zoomtwo = document.getElementById("zoomtwo");

        function setTransform() {
            zoom.style.transform = "scale(" + scale + ")";
            zoomtwo.style.transform = "scale(" + scale + ")";
        }

        function setTransformTwo() {
            zoomtwo.style.transform = "scale(" + scale + ")";
        }

        zoom.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }

        zoom.onmouseup = function (e) {
            panning = false;
        }

        zoom.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            setTransform();
        }

        zoomtwo.onmousedown = function (e) {
            e.preventDefault();
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        }

        zoomtwo.onmouseup = function (e) {
            panning = false;
        }

        zoomtwo.onwheel = function (e) {
            e.preventDefault();
            var xs = (e.clientX - pointX) / scale,
                ys = (e.clientY - pointY) / scale,
                delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;

            setTransformTwo();
        }

    }

    function map_two() { 
         /*-----------------------------------------------------*/
		/*----------------------- Map 2 -----------------------*/
		/*-----------------------------------------------------*/

        var num = 240; // the total number of images 

        // Preload all the images into hidden div
        for (var i=1 ; i<=num ; i++) {
            var img = document.createElement('img');
            img.src = 'assets/map2/12-Tribes-3D- ('+i+').png';
            document.getElementById('preload-imgs-two').appendChild(img);
        }

        // Control swipes using jquery.touchSwipe.min.js
        // http://labs.rampinteractive.co.uk/touchSwipe/
        var swipeOptions=
        {
            triggerOnTouchEnd : true,	
            swipeStatus : swipeStatus,
            allowPageScroll:"vertical",
            threshold: 1000			
        }

        $(function()
        {				
            imgs = $(".map-image-two .img-container"); // the element that will be swipeable
            imgs.swipe( swipeOptions );
        });

        function swipeStatus(event, phase, direction, distance) {
            var duration = 0;
            if(direction == "left") {
                changeImg(distance);
            }
            else if (direction == "right") {
                changeImgR(-distance);
            }
        }

        function changeImg (imgNum) {

            // divide by 8 (or any number) to spread 
            // it out so it doesn't load new img 
            // every single px of swipe distance
            imgNum = Math.floor(imgNum/2); 

            if (imgNum < 1) {
                imgNum += num;
            }
            if (imgNum > num) {
                imgNum -= num;
            }

            // change the image src
            document.getElementById("myImgTwo").src='assets/map2/12-Tribes-3D- ('+imgNum+').png';
        }

        function changeImgR (imgNum) {

            // divide by 8 (or any number) to spread 
            // it out so it doesn't load new img 
            // every single px of swipe distance
            imgNum = Math.floor(imgNum/2); 

            var num2 = -Math.abs(num); 
            if (imgNum > num2) {
                imgNum += num;
            }
            if (imgNum <= num2) {
                imgNum += num*2;
            }

            // change the image src
            document.getElementById("myImgTwo").src='assets/map2/12-Tribes-3D- ('+imgNum+').png';
        }
    }

    
})

