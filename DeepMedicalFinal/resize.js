// var ratio; 
// var left; 
// resize(); 

// $(window).resize(function() {resize();}); 

// function resize() 
// { 
//     ratio = window.innerHeight/$('body').innerHeight(); 
//     if (window.innerWidth/$('body').innerWidth() < ratio) { 
//      ratio = window.innerWidth/$('body').innerWidth(); 
//     } 
//     ratio -= .04; 
//     $('body').css('-ms-zoom', ratio); 
//     $('body').css('-moz-transform', 'scale(' + ratio + ')'); 
//     $('body').css('-o-transform', 'scale(' + ratio + ')'); 
//     $('body').css('-webkit-transform', 'scale(' + ratio + ')'); 
//     $('body').css('transform', 'scale(' + ratio + ')'); 
//     left = ($(window).innerWidth() - $('body').outerWidth() * ratio)/2; 
//     $('body').css('left', left); 
// } 

const getWindowInfo = () => {
	const windowInfo = {
		width: window.innerWidth,
		hight: window.innerHeight
	}
	console.log(windowInfo);
};

window.addEventListener('resize', getWindowInfo);