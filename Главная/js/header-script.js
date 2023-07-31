$(function() {
    let main = {
      showTime: function(elem, time){
        $(elem).fadeIn({
          duration: time,
          queue: false,
        });
      },
      hideTime: function(elem, time){
        $(elem).fadeOut({
          duration: time,
          queue: false,
        });
      },
      show: function(elem){
        $(elem).show();
      },
      hide: function(elem){
        $(elem).hide();
      },
    }

    let navMenu = {
      selected: {
        header_scroll:                ".header_scroll",
        header:                       ".header_info, .header_top, .header_bottom",
        header_info:                  ".header_info",
        header_top:                   ".header_top",
        header_bottom:                ".header_bottom",

        header_scroll_track:          ".header_scroll_animateWindow",

        header_scroll_menu:           ".header_scroll .header_scroll_menu",
        header_scroll_menu_a:         ".header_scroll .header_scroll_menu li",
        header_scroll_menu_show:      ".header_scroll .header_scroll_menuShow",

        header_scroll_search:         ".header_scroll .header_scroll_search",
        header_scroll_search_input:   ".header_scroll .header_scroll_search input",

        header_search:                ".header_bottom .header_bottom_search input",
        header_search_form:           ".header_bottom .header_bottom_search .searchForm",
        header_search_button:         ".header_bottom .header_bottom_search .searchForm .inputActive",
      },
      init: function(){
        let _this = this;
        let checkTime = false;

        if ($(window).scrollTop() >= 75) {
          main.showTime(_this.selected.header_scroll, 200);
          main.hide(_this.selected.header);
        }

        $(window).scroll(function() {
          if ($(this).scrollTop() >= 75) {
            main.showTime(_this.selected.header_scroll, 200);
            main.hide(_this.selected.header);
          }
          else {
            main.hideTime(_this.selected.header_scroll, 0);
            main.show(_this.selected.header);
          }
        });

        // $(_this.selected.header_search).focus(function () {
        //   $(this).addClass("active");
        //
        //   $(this).animate({
        //       width: "575px",
        //     },
        //     {
        //       duration: 300,
        //       easing: "linear",
        //       queue: false,
        //     }
        //   );
        // });
        // $(_this.selected.header_search).blur(function () {
        //   $(this).removeClass("active");
        //
        //   $(this).animate({
        //       width: "385px",
        //     },
        //     {
        //       duration: 300,
        //       easing: "linear",
        //       queue: false,
        //     }
        //   );
        // });

        $(_this.selected.header_scroll_menu_show).click(function(){
          $(_this.selected.header_scroll).removeClass("activeSearch");
          $(_this.selected.header_scroll).addClass("activeMenu");

          var item1 = $(_this.selected.header_scroll_menu+" .pageMenu_item2").html();
          var item2 = $(_this.selected.header_scroll_menu+" .pageMenu_item3").html();

          $(_this.selected.header_scroll_menu+" .pageMenu_item2").html(item2);
          $(_this.selected.header_scroll_menu+" .pageMenu_item3").html(item1);

          // main.hideTime(_this.selected.header_scroll_menu_show, 300);
          // _this.animateMenu(-336);
          checkTime = true;

          if (checkTime === true) {
            setTimeout(function(){

              $(_this.selected.header_scroll_menu+" .pageMenu_item2").html(item1);
              $(_this.selected.header_scroll_menu+" .pageMenu_item3").html(item2);

              checkTime = false;
              $(_this.selected.header_scroll).removeClass("activeMenu");
              // main.showTime(_this.selected.header_scroll_menu_show, 300);
              // _this.animateMenu(0);

            }, 4000);
          }
        });

        $(_this.selected.header_scroll_search_input).focus(function () {
          $(_this.selected.header_scroll).removeClass("activeSearch");
          $(_this.selected.header_scroll).removeClass("activeMenu");

          $(_this.selected.header_scroll).addClass("activeSearch");
        });
        $(_this.selected.header_scroll_search_input).blur(function () {
          $(_this.selected.header_scroll).removeClass("activeSearch");
          $(_this.selected.header_scroll).removeClass("activeMenu");
        });

        $(_this.selected.header_search).focus(function () {
          $(_this.selected.header_search_form).addClass("active");
          $(_this.selected.header_search_button).show(300);
        });
        $(_this.selected.header_search).blur(function () {
          $(_this.selected.header_search_form).removeClass("active");
          $(_this.selected.header_search_button).hide(300);
        });
      },
      // Сделал плавность через CSS
      // animateMenu: function(marginLeft){
      //   let _this = this;
      //
      //   $(_this.selected.header_scroll_search).animate(
      //     {
      //       marginLeft: marginLeft,
      //     },
      //     {
      //       duration: 300,
      //       easing: "linear",
      //       queue: false,
      //     }
      //   );
      // },
      // animateSearch: function(width){
      //   let _this = this;
      //
      //   $(_this.selected.header_scroll_search).animate(
      //     {
      //       width: width,
      //     },
      //     {
      //       duration: 300,
      //       easing: "linear",
      //       queue: false,
      //     }
      //   );
      // },
    }

    let citySelect = {
      selected: {
        header_top_city:     ".header_top_city",
        header_top_city_ul:  ".header_top_city ul",

        citys:                ".header_top_city li",
        citysActive:          ".header_top_city li.active",
      },
      init: function(){
        let _this = this;

        $(_this.selected.citys).on("click", function(){
          $(_this.selected.citys).removeClass("active");
          $(this).addClass("active");
        });
      },
    };

    citySelect.init();
    navMenu.init();
});
