sap.ui.define([
    "dongkuk/custom/plugin/ckcplugin/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController,
    JSONModel,
    MessageToast) {
    "use strict";
    let podConfigs = {};
    return BaseController.extend("dongkuk.custom.plugin.ckcplugin.controller.MainView", {
        onInit: function () {
            BaseController.prototype.onInit.apply(this, arguments);
            podConfigs = this._getConfiguration()
        },
        onBeforeRenderingPlugin: function () {

        },
        onAfterRendering: function () {

        },
        onAfterPodConfigsLoad: function (configs) {
            
        },

        onItemPress: function(oEvent) {
            console.log(oEvent);
            console.log('----------- oEvent ----------------');
            console.log('002 ' + oEvent.getSource());
            console.log('003 ' + oEvent.getParameter("listItem"));
            console.log('004 ' + oEvent.getParameter("listItem").getTitle());
            console.log('005 ' + oEvent.getParameter("listItem").getCustomData());
            console.log('006 ' + this.getView());
            console.log('007 ' + this.getView().getParent());
            console.log('008 ' + this.createId("detail1"));
            console.log('009 ' + this.getView().byId("splitApp").getDetailPages()[0]);
            console.log('------------ getView ---------------');
            console.dir(this.getView());
            console.log('------------ getView.getParent ---------------');
            console.dir(this.getView().getParent());

            var oApp = this.getView().byId("splitApp");
            const title = oEvent.getParameter("listItem").getTitle();
            if(title === 'Inventory Management') {
                //oApp.to(oApp.getDetailPages()[0]);
                this.byId("splitApp").toDetail(this.createId("detail1"));
                this.byId("detail1").getController().onInit();
            }else if(title === 'Test Page') {
                // oApp.to(oApp.getDetailPages()[1]);
                this.byId("splitApp").toDetail(this.createId("detail2"));
            }
        },

        onExit: function () {
            BaseController.prototype.onExit.apply(this, arguments);

        }
    });
});