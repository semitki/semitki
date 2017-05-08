'use strict'

let editGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #edit": "edit"
  },



  edit: (ev) => {

    let id = $("#edit-id").val();
    let dialog = new editGroupsView({title: new Array(S.collection.get("groups").get(id).toJSON())});

    let model = S.collection.get("groups").get(id);
        model.set({name: $("#input_name").val(),
                  description: $("#input_description").val(),});


    S.collection.get("groups").add(model)
      .sync("update", model, {
        url: S.fixUrl(model.url()),
        headers: S.addAuthorizationHeader().headers,
        success: function(model, response) {
         //S.collection.get("groups").fetch(model)
          console.log("EditedGroups")
          //Cerramos modal
          $('#dialog-crud').modal('hide')
          //Abrimos modal de success
          bootbox.alert({
            message: "Group Edited",
            size: 'small',
            className: 'rubberBand animated'
          });
          let groupView = new GroupsView();
          groupView.render();
        },
        error: function(model, response) {
          console.log("error EditedGroup")
          console.log("status = "+model.status)
          console.log("response = "+model.responseText)
          /*HAY QUE ITERAR responseJSON, 
          si es que tiene datos, cada uno de las propiedades del objeto es un campo del model con error, 
          cada una de las propiedades muestra sus errores en un Array, por lo que hay que iterarlos .
          Ejemplo, si queremos grabar una CAMPAIGN sin colocar nada en name y descripcion, 
          esto es lo que presenta responseJSON
          Object {name: Array(1), description: Array(1)}
          Que indica un objeto con dos propiedades, name y description, 
          cada una con un arreglo de 1 posicion, es decir un error.
          description:Array(1)
              0:"This field may not be blank."
          name:Array(1)
              0:"This field may not be blank."

          Este tipo de error hay que mostrarlo en pantalla, y obvio no cerrar el modal. 
          Este tipo de error deberia ser manejado desde bootstrap haciendo los elementos requeridos
          Sin embargo, aun asi pueden presentarse otro tipo de errores, por lo que se tiene que programar 
          esta parte.
          */
        }
  });
  },

  render: function(){
    let template = $("#group-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});