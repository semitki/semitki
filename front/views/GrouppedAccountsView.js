'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.related = new ConnectedSortable({
      templateId: "#connected-sortable-template",
      targetId: "#related",
      relatedTable: "#related-table",
    });
    this.available = new ConnectedSortable({
      templateId: "#connected-sortable-template",
      targetId: "#available",
      relatedTable: "#related-table",
    });
    this.navigation.render();
    this.footer.render();
    return this;
  },


  events: {
    "change #group": "filteraccount"
  },


  filteraccount: function() {
    if ($("#group").val() !== "") {
      let related = {
        items: S.collection.get("groups").get($("#group").val())
          .attributes.related
      };
      console.log(related);
      this.related.data = related;
      this.related.render();
    }
    return this;
  },


  render: function () {

    let data = {
      groups: S.collection.get("groups").toJSON(),
    };

    let template = $("#grouppedaccounts").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    this.related.render();
    this.available.render();

    return this;
  },

});
