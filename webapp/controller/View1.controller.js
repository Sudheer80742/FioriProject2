sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, DateFormat) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            var model = new JSONModel({
                "data": [
                    { "key": "1", "value": "select" },
                    { "key": "2", "value": "daywise" },
                    { "key": "3", "value": "weekwise" },
                    { "key": "4", "value": "monthwise" },
                    { "key": "5", "value": "yearwise" }
                ]
            });
            this.getView().setModel(model);

            var oData = new JSONModel({ dates: [] });
            this.getView().setModel(oData, "newData");
        },

        onSelectChange: function (oEvent) {
            this._sSelectedKey = oEvent.getSource().getSelectedKey();
            var startDate = new Date(this.byId("startDate").getValue());
            var endDate = new Date(this.byId("endDate").getValue());
            var datesBetween = [];
            var oDateFormat = DateFormat.getDateInstance({ pattern:"EEEE dd MMM yyyy" });

            if (!startDate || !endDate || startDate > endDate) {
                console.error("Invalid date range.");
                return;
            }

            switch (this._sSelectedKey) {
                case "2": 
                    var currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        datesBetween.push(oDateFormat.format(currentDate));
                        currentDate.setDate(currentDate.getDate() + 1);
                    }
                    break;

                case "3":
                    var currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        datesBetween.push(oDateFormat.format(currentDate));
                        currentDate.setDate(currentDate.getDate() + 7);
                    }
                    break;

                case "4": 
                    var currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        datesBetween.push(oDateFormat.format(currentDate));
                        currentDate.setMonth(currentDate.getMonth() + 1); 
                    }
                    break;

                case "5":
                    var currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                        datesBetween.push(oDateFormat.format(currentDate));
                        currentDate.setFullYear(currentDate.getFullYear() + 1); 
                    }
                    break;

                default:
                    console.log("Please select a valid option.");
                    return;
            }
            this.getView().getModel("newData").setProperty("/dates", datesBetween);
        },
        onDiff(oEvent){
            var startDate = new Date(this.byId("startDate").getValue());
            var endDate = new Date(this.byId("endDate").getValue());
            this.byId("val1").setValue((endDate-startDate)/1000*60*60*24)
        },
        onNav2(){
            this.getOwnerComponent().getRouter().navTo("RouteView2")
        }
    });
});
