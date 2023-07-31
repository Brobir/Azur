$(function() {
  let catalog_product = {
    selectors: {
      category_show:            ".category .category_title, .category > svg",
      category_modal:           ".category_modal",
      category_modal_close:     ".category_modal .close_modal",
      val_money:                ".money .val, .money_old .val",
    },
    init: function(){
      let _this = this;

      $(_this.selectors.category_show).on("click", function(){
        _this.show(_this.selectors.category_modal, 300);
      });
      $(_this.selectors.category_modal_close).on("click", function(){
        _this.hide(_this.selectors.category_modal, 300);
      });
      $(_this.selectors.val_money).each(function(index, val){
        $(val).text(_this.prettify($(val).text()));
      });
    },
    show: function(elem, time){
      $(elem).fadeIn(time);
    },
    hide: function(elem, time){
      $(elem).fadeOut(time);
    },
    prettify: function(num) {
      var n = num.toString();
      var separator = " ";
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }
  }

  let catalog_range = {
    selectors: {
      priceMin:             "#priceMin",
      priceMax:             "#priceMax",
      slider_range:         "#slider-range",
    },
    init: function(){
      let _this = this;
      let priceMin = 0;
      let priceMax = 0;

      $(_this.selectors.slider_range).slider({
    		range: true,
        animate: "fast",
    		min: +$(_this.selectors.slider_range).attr("data-priceMin"),
    		max: +$(_this.selectors.slider_range).attr("data-priceMax"),
    		values: [ +$(_this.selectors.slider_range).attr("data-priceMin"), +$(_this.selectors.slider_range).attr("data-priceMax") ],
    		step: 1,
    		slide: function(event, ui) {
          $(_this.selectors.priceMin).val("От "+ui.values[0]);
          $(_this.selectors.priceMax).val("До "+ui.values[1]);
    		}
    	});

      $(_this.selectors.priceMin).val("От "+$(_this.selectors.slider_range).slider("values", 0));
      $(_this.selectors.priceMax).val("До "+$(_this.selectors.slider_range).slider("values", 1));

      $(_this.selectors.priceMin+", "+_this.selectors.priceMax).on("input", function(){
        _this.validate();
        if("#"+$(this).attr("id") == _this.selectors.priceMin){
          _this.validateMin();
        }
        if("#"+$(this).attr("id") == _this.selectors.priceMax){
          _this.validateMax();
        }
        priceMin = _this.replace($(_this.selectors.priceMin).val());
        priceMax = _this.replace($(_this.selectors.priceMax).val());
        $(_this.selectors.slider_range).slider("values", [priceMin, priceMax]);
      });
      $(_this.selectors.priceMin).blur(function(){
        if (_this.replace($(this).val()) == "") {
          $(_this.selectors.priceMin).val("От "+(+$(_this.selectors.slider_range).attr("data-priceMin")));
          $(_this.selectors.slider_range).slider("values", [+$(_this.selectors.slider_range).attr("data-priceMin"), priceMax]);
        }
      });
      $(_this.selectors.priceMax).blur(function(){
        if (_this.replace($(this).val()) == "") {
          $(_this.selectors.priceMax).val("До "+(+$(_this.selectors.slider_range).attr("data-priceMax")));
          $(_this.selectors.slider_range).slider("values", [priceMin, +$(_this.selectors.slider_range).attr("data-priceMax")]);
        }
      });
    },
    replace: function(val){
      var val = val.replace(/[^-\d]/g,"");
      if (val) {
        return +val;
      }
      else{
        return false;
      }
    },
    validate: function(){
      let _this = this;

      if (+$(_this.selectors.slider_range).attr("data-priceMin") > _this.replace($(_this.selectors.priceMin).val())) {
        $(_this.selectors.priceMin).val("От "+(+$(_this.selectors.slider_range).attr("data-priceMin")));
      }
      if (+$(_this.selectors.slider_range).attr("data-priceMax") < _this.replace($(_this.selectors.priceMax).val())) {
        $(_this.selectors.priceMax).val("До "+(+$(_this.selectors.slider_range).attr("data-priceMax")));
      }
    },
    validateMin: function(){
      let _this = this;

      if (_this.replace($(_this.selectors.priceMin).val()) > _this.replace($(_this.selectors.priceMax).val())) {
        $(_this.selectors.priceMin).val("От "+_this.replace($(_this.selectors.priceMax).val()));
      }
    },
    validateMax: function(){
      let _this = this;

      if (_this.replace($(_this.selectors.priceMax).val()) < _this.replace($(_this.selectors.priceMin).val())) {
        $(_this.selectors.priceMax).val("До "+_this.replace($(_this.selectors.priceMin).val()));
      }
    },
  }

  catalog_product.init();
  catalog_range.init();
});
