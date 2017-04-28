'use strict'

let GrouppedAccountsRelatedView = Backbone.View.extend({
  tagName: "div",
  className: "col-xs-6",

  initialize: function () {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
  },



  render: function () {
    let data = {
      groups: S.collection.get("groups").toJSON()
    };
    if (S.collection.get("related")!== undefined) {
      data.groupped = S.collection.get("related").toJSON()

    }
    Handlebars.registerHelper('lookup2', function (collection, id) {
      var collectionLength = collection.length;

      for (var i = 0; i < collectionLength; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }

      }

      return null;
    });
    let template = $("#grouppedaccounts-related").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
     $("#related").html(this.$el);
    return this;

  }
});
