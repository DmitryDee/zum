$(document).ready(function(){
  // helper
  function setData(){
    var curSlide = $('.slick-current .success-slider__item').attr('data-year');
     $('.cur-year').text(curSlide);
  }

  function nextYear(){
    $('.success-slider__year-holder').slick({
      infinite: true,
      fade: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.success-slider__items-list'
    });  
  }

  $('.success-slider__items-list').slick({
    infinite: true,
    fade: true,
    dots: false,
    draggable: false,
    arrows: true,
    asNavFor: '.success-slider__year-holder',
    appendArrows: $('.success-slider__year-nav'),
    prevArrow: "<span class=\"arrow arrow_prev-year\"></span>",
    nextArrow: "<span class=\"arrow arrow_next-year\"></span>",
    responsive: [
      {
        breakpoint: 375,
        settings: {
          arrows: false,
        }
      }
    ]
  });

  $('.arrow').on('click', function(){
    setData();
  });

  $('.success-slider__items-list').on('swipe', function(event, slick, direction){
    setData();
  });
  
  $('.achievements__tab-item').click(function(e){
    var active = $(this).hasClass('tab-item_active');
    var tab = $(this).attr('data-tab');
    var descrNode = $(this).parents('.achievements').find('.achievements__descr');
    if(!active){
      $(this).parent().find('.achievements__tab-item').removeClass('tab-item_active');
      $(this).addClass('tab-item_active');
      for(var i = 0; i < descrNode.length; i++){
        var descr = $(descrNode[i]);
        if(descr.attr('data-index') == tab) {
          descr.fadeIn();
          descr.addClass('achievements__descr_active');
        } else {
          descr.fadeOut();
          descr.removeClass('achievements__descr_active');
        }
      }
    }    
  });

  nextYear();
});
