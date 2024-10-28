sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (
    Controller,
    JSONModel
) {
    "use strict";

    return Controller.extend("project2.controller.View2", {
        onInit() {
            var oData = new JSONModel({
                Names: [{ name: "Sudheer", id: 64, parentDetails: [{ Parentname: "suresh", age: 48 }, { Parentname: "kumari", age: 43 }] },
                { name: "ramya", id: 55, parentDetails: [] }, // Example with no parentDetails
                { name: "lakshmi", id: 39, parentDetails: [{ Parentname: "john", age: 35 }] },
                { name: "vanitha", id: 57 }
                ]
            })
            this.getView().setModel(oData);
            var oFirstItemPath = "/Names/0";
            this.byId("idsimpleform").bindElement({ path: oFirstItemPath });
        },
        onStandardListItemPress(oEvent) {
            var oArgue = oEvent.getSource().getBindingContext().getPath()
            this.byId("idsimpleform").bindElement({ path: oArgue })
        },
        onAdding() {
            var id = this.byId("id1").getValue()
            var name = this.byId("name1").getValue();
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            oData.Names.push({ name: name, id: id })
            oModel.setData(oData)
        }
    });
});