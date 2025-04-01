/**	
	* Template Name: Kindle
	* Version: 1.0	
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS
	
	1. FIXED MENU
	2. MENU SMOOTH SCROLLING
	3. GOOGLE MAP
	4. READER TESTIMONIALS ( SLICK SLIDER )
	5. MOBILE MENU CLOSE 
	
**/



(function( $ ){


	/* ----------------------------------------------------------- */
	/*  1. FIXED MENU
	/* ----------------------------------------------------------- */


		jQuery(window).bind('scroll', function () {
    		if ($(window).scrollTop() > 150) {

		        $('#mu-header').addClass('mu-fixed-nav');
		        
			    } else {
			    $('#mu-header').removeClass('mu-fixed-nav');
			}
		});

		
	/* ----------------------------------------------------------- */
	/*  2. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */ 

		//MENU SCROLLING WITH ACTIVE ITEM SELECTED

		// Cache selectors
		var lastId,
		topMenu = $(".mu-menu"),
		topMenuHeight = topMenu.outerHeight()+13,
		// All list items
		menuItems = topMenu.find('a[href^=\\#]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

		// Bind click handler to menu items
		// so we can get a fancy scroll animation
		menuItems.click(function(e){
		  var href = $(this).attr("href"),
		      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+22;
		  jQuery('html, body').stop().animate({ 
		      scrollTop: offsetTop
		  }, 1500);
		  e.preventDefault();
		});

		// Bind to scroll
		jQuery(window).scroll(function(){
		   // Get container scroll position
		   var fromTop = $(this).scrollTop()+topMenuHeight;
		   
		   // Get id of current scroll item
		   var cur = scrollItems.map(function(){
		     if ($(this).offset().top < fromTop)
		       return this;
		   });
		   // Get the id of the current element
		   cur = cur[cur.length-1];
		   var id = cur && cur.length ? cur[0].id : "";
		   
		   if (lastId !== id) {
		       lastId = id;
		       // Set/remove active class
		       menuItems
		         .parent().removeClass("active")
		         .end().filter("[href=\\#"+id+"]").parent().addClass("active");
		   }           
		})


	/* ----------------------------------------------------------- */
	/*  3. GOOGLE MAP
	/* ----------------------------------------------------------- */ 
		    
	    $('#mu-google-map').click(function () {

		    $('#mu-google-map iframe').css("pointer-events", "auto");

		});
		
		$("#mu-google-map").mouseleave(function() {

		  $('#mu-google-map iframe').css("pointer-events", "none"); 

		});
		
		

	/* ----------------------------------------------------------- */
	/*  4. READER TESTIMONIALS (SLICK SLIDER)
	/* ----------------------------------------------------------- */

		$('.mu-testimonial-slide').slick({
			arrows: false,
			dots: true,
			infinite: true,
			speed: 500,
			autoplay: true,
			cssEase: 'linear'
		});

	/* ----------------------------------------------------------- */
	/*  5. MOBILE MENU CLOSE 
	/* ----------------------------------------------------------- */ 

		jQuery('.mu-menu').on('click', 'li a', function() {
		  $('.mu-navbar .in').collapse('hide');
		});



	
	
})( jQuery );


  
/*Scripts para modal y PayPal -->*/

   // Abrir y cerrar el modal
   // Elementos del DOM
   const modal = document.getElementById('paymentModal');
   const modalTitle = document.getElementById('modalTitle');
   const modalInfo = document.getElementById('modalInfo');
   const paypalContainer = document.getElementById('paypal-button-container');

   // Función para renderizar el botón de PayPal según la información del producto
   function renderPayPalButton(product) {
	 // Limpiar el contenedor para evitar renderizaciones previas
	 paypalContainer.innerHTML = '';
	 paypal.Buttons({
	   createOrder: function(data, actions) {
		 return actions.order.create({
		   purchase_units: [{
			 description: product.name,
			 amount: {
			   currency_code: product.currency,
			   value: product.price
			 }
		   }]
		 });
	   },
	   onApprove: function(data, actions) {
		 return actions.order.capture().then(function(details) {
		   alert('Pago completado por ' + details.payer.name.given_name + ' para ' + product.name);
		   modal.style.display = 'none';
		 });
	   },
	   onError: function(err) {
		 console.error(err);
		 alert('Ocurrió un error durante el pago.');
	   }
	 }).render('#paypal-button-container');
   }

   // Función que abre el modal y actualiza la información del producto
   function openPaymentModal(product) {
	 modalTitle.textContent = 'Completa tu pago para ' + product.name;
	 modalInfo.textContent = 'Precio: ' + product.price + ' ' + product.currency;
	 renderPayPalButton(product);
	 modal.style.display = 'block';
   }

   // Event listener para el botón de la sección "mu-hero"
   const openModalHero = document.getElementById('openModal');
   if (openModalHero) {
	 openModalHero.addEventListener('click', function(e) {
	   e.preventDefault();
	   // Configuración del producto para la sección hero (puedes modificar estos valores)
	   const productHero = {
		 name: 'La Fórmula para Emprender',
		 price: '9.99',
		 currency: 'USD'
	   };
	   openPaymentModal(productHero);
	 });
   }

   // Event listener para los botones de la sección "mu-pricing"
   const orderButtons = document.querySelectorAll('.mu-order-btn');
   orderButtons.forEach(function(btn) {
	 btn.addEventListener('click', function(e) {
	   e.preventDefault();
	   const product = {
		 name: btn.getAttribute('data-product'),
		 price: btn.getAttribute('data-price'),
		 currency: btn.getAttribute('data-currency')
	   };
	   openPaymentModal(product);
	 });
   });

   // Cerrar el modal con el botón "×"
   const closeModalSpan = document.querySelector('.modal-content .close');
   closeModalSpan.addEventListener('click', function() {
	 modal.style.display = 'none';
   });

   // Cerrar el modal al hacer clic fuera del contenido
   window.addEventListener('click', function(event) {
	 if (event.target === modal) {
	   modal.style.display = 'none';
	 }
   });
	   