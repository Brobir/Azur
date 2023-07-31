function BrobirSlider() {
  this.selectors        = {
    items:  '.slider-items',
    item:   '.slider-item',
    track:  '.slider-track',
    prev:   '.btnPrev',
    next:   '.btnNext',
    dots:   '.slider-dots',
    dot:    '.slider-dot',
  }
  this.position         = 0;
  this.sliderToShow     = 0;
  this.sliderToScroll   = 0;
  this.itemsCount       = 0;
  this.itemSize         = 0;
  // this.itemHeight       = 0;
  this.moveScroll       = 0;
  this.items            = "";
  this.track            = "";
  this.item             = "";
  this.btnNext          = "";
  this.btnPrev          = "";
  this.dots             = "";
  this.sensitivity      = 20;
  this.swipeStart       = null;
  this.swipePosition    = null;
  this.dotAction        = 1;
  this.direction        = "";

  this.initParam        = function(elem, sliderToShow, sliderToScroll, media, fixWidth, direction){
    let _this = this;

    _this.sliderToShow =  sliderToShow;
    _this.sliderToScroll = sliderToScroll;

    if(media != null){
      _this.mediaSlider(media);
    }

    _this.items   = $(elem +" "+ _this.selectors.items);
    _this.track   = $(elem +" "+ _this.selectors.track);
    _this.item    = $(elem +" "+ _this.selectors.item);
    _this.btnNext = $(elem +" "+ _this.selectors.next);
    _this.btnPrev = $(elem +" "+ _this.selectors.prev);
    _this.dots    = $(elem +" "+ _this.selectors.dots);

    if(fixWidth === true){

      switch (direction) {
        case "row":
          _this.itemSize = _this.items.width() / _this.sliderToShow;

          $(_this.item).each(function(){
            $(_this.item).css({
              width: _this.itemSize,
            });
          });
          break;
        case "column":
          _this.itemSize = _this.items.height() / _this.sliderToShow;

          $(_this.item).each(function(){
            $(_this.item).css({
              height: _this.itemSize,
            });
          });
          break;
      }
    }
    else{
      switch (direction) {
        case "row":
          _this.itemSize = _this.item.width();
          break;
        case "column":
          _this.itemSize = _this.item.height();
          break;

      }
    }
    _this.itemsCount =  _this.item.length
    _this.moveScroll = _this.sliderToScroll * _this.itemSize;
    _this.direction  = direction;
  };

  this.init             = function(elem, sliderToShow = 3, sliderToScroll = 2, media = null, fixWidth = true, direction = "row"){
    let _this = this;

    _this.initParam(elem, sliderToShow, sliderToScroll, media, fixWidth, direction);
    _this.addDots();

    _this.btnPrev.on('touchstart click', function(){
      if(!(_this.btnPrev.hasClass("disabled"))){
        _this.prev();
      }

      return false
    });
    _this.btnNext.on('touchstart click', function(){
      if(!(_this.btnNext.hasClass("disabled"))){
        _this.next();
      }

      return false
    });

    _this.dots.children(_this.selectors.dot).on('touchstart click', function(){
      if(!($(this).hasClass("active"))){
        _this.moveDot(this);
      }

      return false
    });

    _this.items.on("touchstart", function (e) {
       _this.TouchStart(e);
     });

    _this.items.on("touchmove", function (e) {
      _this.TouchMove(e);
    });

    _this.items.on("touchend", function (e) {
      _this.TouchEnd(e);
    });

    _this.items.on("mousedown", function (e) {
      _this.MausStart(e);

      _this.items.bind("mouseup mouseleave", function (e) {
        _this.MausEnd(e);

        _this.items.unbind("mouseup mouseleave");
      });
    });


    let saved_width = $(window).width();

    $(window).resize(function(){
      if(media != null && $(window).width() != saved_width){
        _this.initParam(elem, sliderToShow, sliderToScroll, media, fixWidth, direction);

        _this.position = 0;
        _this.movePosition();
      }
    });
    _this.checkBtn();


  };

  this.prev             = function(){
    let _this = this;

    let itemLeft = Math.abs(_this.position) / _this.itemSize;

    _this.position += itemLeft >= _this.sliderToScroll ? _this.moveScroll : itemLeft * _this.itemSize;

    if (_this.dotAction != 1) {
      _this.dotAction -= 1;
    }

    _this.movePosition();
  };

  this.next             = function(){
    let _this = this;

    let itemLeft = _this.itemsCount - (Math.abs(_this.position) + _this.sliderToShow * _this.itemSize) / _this.itemSize;

    if(itemLeft >= _this.sliderToScroll){
        _this.position -= _this.moveScroll;
    }
    else if(itemLeft < 0){
      _this.position = 0;
    }
    else{
      _this.position -= itemLeft * _this.itemSize;
    }
    if ($(_this.selectors.dot).length != _this.dotAction) {
      _this.dotAction += 1;
    }

    _this.movePosition();
  };

  this.movePosition     = function(){
    let _this = this;

    switch (_this.direction) {
      case "row":
        _this.track.css({
          transform: `translateX(${_this.position}px)`,
        });
        break;
      case "column":
        _this.track.css({
          transform: `translateY(${_this.position}px)`,
        });
        break;
    }

    _this.checkBtn();
  };

  this.addDots          = function(){
    let _this = this;
    for (var i = 1; i <= Math.ceil(_this.item.length/_this.sliderToScroll); i++) {
      this.dots.append($("<div class='slider-dot' data-value='"+i+"'>"));
    }
  };

  this.moveDot          = function(dotElem){
    let _this = this;
    letdotAction = +$(dotElem).attr('data-value');
    let itemLeft = 0;
    let k = 0;

    if (letdotAction == 1) {
      itemLeft = Math.abs(_this.position) / _this.itemSize;
      _this.position += itemLeft * _this.itemSize;
    }
    else if (letdotAction == $(_this.selectors.dot).length) {
      itemLeft = _this.itemsCount - (Math.abs(_this.position) + _this.sliderToShow * _this.itemSize) / _this.itemSize;
      _this.position -= itemLeft * _this.itemSize;
    }
    else {
      k = +$(_this.selectors.dot+".active").attr('data-value') - letdotAction;
      _this.position += k*_this.moveScroll;
    }
    _this.dotAction = letdotAction;
    _this.movePosition();
  };

  this.checkBtn         = function(){
    let _this = this;

    _this.btnPrev.removeClass("disabled");
    _this.btnNext.removeClass("disabled");
    _this.dots.children(_this.selectors.dot).removeClass("active");

    _this.dots.children(_this.selectors.dot+"[data-value='"+_this.dotAction+"']").addClass("active");

    if(_this.position === 0){
      _this.btnPrev.addClass("disabled");
    }
    else if(_this.position <= -((_this.itemsCount - _this.sliderToShow) * _this.itemSize)){
      _this.btnNext.addClass("disabled");
    }


  };

  this.mediaSlider      = function(media){
    let _this = this;

      let widthBody = $("body").width();

      media.forEach(function(item, i, arr){
        if(item[0] > widthBody){
          _this.sliderToShow =  item[1][0];
          _this.sliderToScroll = item[1][1];
        }
      });
  };

  this.TouchStart       = function(e){
    let _this = this;

    _this.swipeStart = { x: e.originalEvent.changedTouches[0].clientX, y: e.originalEvent.changedTouches[0].clientY };
    _this.swipePosition = { x: _this.swipeStart.x, y: _this.swipeStart.y };
  };

  this.TouchMove        = function(e){
    let _this = this;

    _this.swipePosition = { x: e.originalEvent.changedTouches[0].clientX, y: e.originalEvent.changedTouches[0].clientY };
  };

  this.TouchEnd         = function(e){
    let _this = this;

    _this.CheckAction();

    _this.swipeStart = null;
    _this.swipePosition = null;
  };

  this.MausStart        = function(e){
    let _this = this;

    _this.swipeStart = { x: e.clientX, y: e.clientY };
    _this.swipePosition = { x: _this.swipeStart.x, y: _this.swipeStart.y };
  };

  this.MausEnd          = function(e){
    let _this = this;

    _this.swipePosition = { x: e.clientX, y: e.clientY };
    _this.CheckAction();

    _this.swipeStart = null;
    _this.swipePosition = null;
  };

  this.CheckAction      = function(){
    let _this = this;

    var d = {
      x: _this.swipeStart.x - _this.swipePosition.x,
      y: _this.swipeStart.y - _this.swipePosition.y
    };

    if(Math.abs(d.x) > Math.abs(d.y) && _this.direction == "row") {
      if(Math.abs(d.x) > _this.sensitivity) {
        if(d.x > 0) {
          _this.next();
        }
        else {
          _this.prev();
        }
      }
    }
    else if(Math.abs(d.y) > Math.abs(d.x) && _this.direction == "column") {
      if(Math.abs(d.y) > _this.sensitivity) {
        if(d.y > 0) {
          _this.next();
        }
        else {
          _this.prev();
        }
      }
    }
  };
}
