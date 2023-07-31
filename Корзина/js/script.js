$(function() {
  let basket_item_value = {
    selectors: {
      basket_item_value:  ".basket_item_value",
      minus:              ".minus",
      value:              ".value",
      plus:               ".plus",
      money_val:          ".money_value",
    },

    value: 0,

    // initParam: function(){
    //   let _this = this;
    //
    //   _this.value = +$(_this.selectors.value).text();
    // },
    init: function(){
      let _this = this;
      let value = 0;

      // _this.initParam();

      $(_this.selectors.minus).on("click", function(){
        value = +$(this).siblings(_this.selectors.value).text();

        if (value > 0) {
          $(this).siblings(_this.selectors.value).text(--value)
        }

      });
      $(_this.selectors.plus).on("click", function(){
        value = +$(this).siblings(_this.selectors.value).text();
        $(this).siblings(_this.selectors.value).text(++value);
      });

      $(_this.selectors.money_val).each(function(index, val){
        $(val).text(_this.prettify($(val).text()));
      });
    },
    // action: function(typeAction){
    //   let _this = this;
    //
    //   switch (typeAction) {
    //     case true:
    //       _this.value++;
    //       break;
    //     case false:
    //       _this.value--;
    //       break;
    //   }
    // },
    prettify: function(num) {
      var n = num.toString();
      var separator = " ";
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }
  }

  let basket_tab = {
    selectors: {
      tabs:               ".basket_tabs",
      tab:                ".basket_tabs li",
      tab_content:        ".basket_type_content",

      stap_organization:  "#organization button[name='next']",
      organization_item:  ".basket_organization_item",
      tab_content:        ".basket_type_content",
      tab_desc:           ".item_content span",

      step:               ".step",
      step_title:         ".step_title",

      inputText:              "input[type='text']",
      inputRadio:             "input[type='radio']",
    },
    init: function(){
      let _this = this;
      let step = 1;

      $(_this.selectors.tab).on("click", function(){
        $(_this.selectors.tab_content).removeClass("active");
        $(_this.selectors.tab).removeClass("active");

        $($(this).attr("rel")).addClass("active");
        $(this).addClass("active");
      });

      $(_this.selectors.step+", "+_this.selectors.step_title+", "+_this.selectors.stap_organization).on("click", function(){
        $(_this.selectors.organization_item).removeClass("active");
        $(_this.selectors.step).removeClass("active");
        $(_this.selectors.step_title).removeClass("active");

        $($(this).attr("rel")).addClass("active");
        $(this).addClass("active");

        $(_this.selectors.step+"[data-step='"+$(this).attr("data-step")+"']").addClass("active");
        $(_this.selectors.step_title+"[data-step='"+$(this).attr("data-step")+"']").addClass("active");
      });

      $(_this.selectors.step+", "+_this.selectors.step_title).on("click", function(){
        $(_this.selectors.organization_item).removeClass("active");
        $(_this.selectors.step).removeClass("active");
        $(_this.selectors.step_title).removeClass("active");

        $($(this).attr("rel")).addClass("active");
        $(this).addClass("active");

        $(_this.selectors.step+"[data-step='"+$(this).attr('data-step')+"']").addClass("active");
        $(_this.selectors.step_title+"[data-step='"+$(this).attr("data-step")+"']").addClass("active");

      });

      $(_this.selectors.inputText).on("input", function(){
        $(_this.selectors.tab_desc+"[data-nameInput='"+$(this).attr("name")+"'] > span").text($(this).val());
      })
      $(_this.selectors.inputRadio).on("input", function(){
        console.log($(this).attr("name"));
        $(_this.selectors.tab_desc+"[data-nameInput='"+$(this).attr("name")+"']").text($(this).siblings("label").text());
      })
    },
  }

  basket_tab.init();
  basket_item_value.init();
});
