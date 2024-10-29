sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (
    Controller,
	JSONModel,
	MessageToast
) {
    "use strict";

    return Controller.extend("project2.controller.View2", {
        onInit() {
            var oData = new JSONModel({
                Names: [{ name: "Sudheer", id: 64, parentDetails: [{ Parentname: "suresh", age: 48 }, { Parentname: "kumari", age: 43 }] ,Status:""},
                { name: "ramya", id: 55, parentDetails: [],Status:"" }, // Example with no parentDetails
                { name: "lakshmi", id: 39, parentDetails: [{ Parentname: "john", age: 35 }] ,Status:""},
                { name: "vanitha", id: 57 , parentDetails: [] ,Status:""}
                ]
            })
            this.getView().setModel(oData);
            var oFirstItemPath = "/Names/0";
            this.byId("idsimpleform").bindElement({ path: oFirstItemPath });
        },
        onStandardListItemPress(oEvent) {
            this.byId("1").setLayout("TwoColumnsMidExpanded")
            this.oArgue= oEvent.getSource().getBindingContext().getPath()
            this.byId("idsimpleform").bindElement(this.oArgue)
        },
        onAdding() {
            var id = this.byId("id1").getValue()
            var name = this.byId("name1").getValue();
            var oModel = this.getView().getModel();
            var oData = oModel.getData();
            oData.Names.push({ name: name, id: id })
            oModel.setData(oData)
        },
        onTabAdd(oEvent) {
            var sPath = oEvent.getSource().getParent().getBindingContext().getPath() + '/parentDetails';
            this.byId("1").setLayout("ThreeColumnsEndExpanded")
            var oModel = this.getView().getModel();
            var aParentDetails = oModel.getProperty(sPath);
            aParentDetails.push({ Parentname: "sunny", age: 22 });
            oModel.setProperty(sPath, aParentDetails);
        },
        close(oEvent){
           var id= oEvent.getSource().getId()
           switch(true){
            case id.endsWith("22"):
                this.byId("1").setLayout("OneColumn")
                break
            case id.endsWith("33"):
                this.byId("1").setLayout("TwoColumnsMidExpanded")
                break
            
           }
        },
        onButtonPress1(oEvent){
            var sPath = this.oArgue+"/Status"
            var oModel = this.getView().getModel();
            oModel.setProperty(sPath,"Approved");
                MessageToast.show("Data Approved")
                console.log(oModel.getProperty(sPath))
           },
           onButtonPress2(oEvent){
            var sPath = this.oArgue+"/Status"
            var oModel = this.getView().getModel();
            oModel.setProperty(sPath,"Rejected");
                MessageToast.show("Data Rejected")
           },
    });
});