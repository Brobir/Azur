$(function() {

  let dadata = {
    selectors: {
      inn: "#innId"
    },

    url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party",
    token: "d401f53a3636a8c16443dc39b832aafb93abba28",

    init: function(){
      let _this = this;
      let query = "";
      let options = {};

      $(_this.selectors.inn).on("blur", function(){
        query = $(this).val();

        let options = {
          method: "POST",
          mode: "cors",
          count: 100,
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": "Token " + _this.token
          },
          body: JSON.stringify({query: query})
        }
        _this.query(_this.url, options);
      });


    },
    query: function(url, options){
      fetch(url, options)
      .then(response => response.text())
      .then(result => console.log(jQuery.parseJSON(result)))
      .catch(error => console.log("error", error));
    }
  }

  dadata.init();




});
