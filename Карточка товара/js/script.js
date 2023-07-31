$(function() {
  let card_product = {
    selectors: {
      category_show:            ".category .category_title, .category > svg",
      category_modal:           ".category_modal",
      category_modal_close:     ".category_modal .close_modal",

      characteristics_tab:      ".characteristics_tab",
      characteristics_content:  ".desc_item",

      like:                     ".like",

      grade:                    ".callback svg",
      grade_box:                ".callback",

      image:                    ".images_card .image",
      imageShow:                ".images_card .image_main",

      titleH1:                  ".card_title h1",
      money:                    ".money .val",
      moneyOld:                 ".money_old .val",
    },
    init: function(){
      let _this = this;

      if ($(_this.selectors.titleH1).height() > 85) {
        $(_this.selectors.titleH1).css({
          "margin-top": "-37px",
        })
      }
      $(_this.selectors.money+", "+_this.selectors.moneyOld).each(function(){
        $(this).text(_this.prettify($(this).text()));
      });


      $(_this.selectors.category_show).on("click", function(){
        _this.show(_this.selectors.category_modal, 300);
      });
      $(_this.selectors.category_modal_close).on("click", function(){
        _this.hide(_this.selectors.category_modal, 300);
      });

      $(_this.selectors.characteristics_tab).on("click", function(){
        $(_this.selectors.characteristics_tab).removeClass("active");
        $(_this.selectors.characteristics_content).removeClass("active");

        $(this).addClass("active");
        $($(this).attr("rel")).addClass("active");
      });

      $(_this.selectors.like).on("click", function(){
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
        }
        else{
          $(this).addClass("active");
        }
      });

      $(_this.selectors.grade).hover(function(){
        var val = +$(this).attr("data-val");
        $(_this.selectors.grade).each(function(index){
          if (+$(this).attr("data-val") <= val) {
            $(this).css({
              fill: "#FBDE47",
            });
          }
          else{
            $(this).css({
              fill: "none",
            });
          }
        });
      });
      $(_this.selectors.grade_box).mouseleave(function(){
        $(_this.selectors.grade).css({
          fill: "none",
        });
      });
      $(_this.selectors.image).on("click", function(){
        let imageURL = $(this).children("img").attr("src");

        $(_this.selectors.image).removeClass("active");
        $(this).addClass("active");
        $(_this.selectors.imageShow).children("img").attr("src", imageURL);
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

  card_product.init();

  let sliderSimilar = new BrobirSlider();
  sliderSimilar.init(
    ".similar_items",
    4,
    2,
    [],
    true,
    "row",
  );
  let sliderCard = new BrobirSlider();
  sliderCard.init(
    ".images_card .images_slider",
    2,
    1,
    [],
    true,
    "column",
  );
});
