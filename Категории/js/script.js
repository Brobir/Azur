$(function() {
  let category = {
    selectors: {
      subcategory_item: ".subcategory_itemBox",
      shadow_box:       ".shadow_box",
      more:             ".more",
    },
    init: function(){
      let _this = this;

      // $(_this.selectors.subcategory_item).hover(
      //   function(){
      //     if (!$(this).hasClass("showSubcategory")) {
      //       _this.activeHoverIn(this);
      //     }
      //   },
      //   function(){
      //     if (!$(this).hasClass("showSubcategory")) {
      //       _this.activeHoverOut(this);
      //     }
      //   },
      // );
      $(_this.selectors.more).on("click", function(){
        _this.activeShow(this);
      });
      $(_this.selectors.shadow_box).on("click", function(){
        _this.activeHide(this);
      });
    },

    empty: function(){
      let _this = this;

      // $(_this.selectors.subcategory_item).removeClass("active");
      $(_this.selectors.subcategory_item).removeClass("showSubcategory");
    },
    showShadow: function(time){
      let _this = this;

      $(_this.selectors.shadow_box).fadeIn({
        duration: time,
        queue: false,
      });
    },
    hideShadow: function(time){
      let _this = this;

      $(_this.selectors.shadow_box).fadeOut({
        duration: time,
        queue: false,
      });
    },

    // activeHoverIn: function(elem){
    //   let _this = this;
    //
    //   _this.empty();
    //   $(elem).addClass("active");
    //   // _this.showShadow(200);
    // },
    // activeHoverOut: function(elem){
    //   let _this = this;
    //
    //   _this.empty();
    //   // _this.hideShadow(200);
    // },

    activeShow: function(elem){
      let _this = this;

      _this.empty();
      $(elem).closest(_this.selectors.subcategory_item).addClass("showSubcategory");
      _this.showShadow(200);
    },
    activeHide: function(elem){
      let _this = this;

      _this.empty();
      _this.hideShadow(200);
    },
  }

  category.init();
});
