sap.ui.define([
    "dongkuk/custom/plugin/ckcplugin/controller/BaseController",
    "dongkuk/custom/plugin/ckcplugin/data/apiStorageLocations",
    "dongkuk/custom/plugin/ckcplugin/data/apiInventories",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController,
    apiStorageLocations,
    apiInventories,
    JSONModel,
    MessageToast) {
    "use strict";
    let podConfigs = {};
    let apis = {
        get_sfcDetails: "sfc/v1/sfcdetail",
        get_inventories: "inventory/v1/inventories",
        get_storageLocations: "inventory/v1/storageLocations",
        post_inventoriesTransfer: "inventory/v1/inventories/transfer"
    }
    return BaseController.extend("dongkuk.custom.plugin.ckcplugin.controller.MainView", {
        onInit: function () {
            BaseController.prototype.onInit.apply(this, arguments);
            podConfigs = this._getConfiguration()
            //this.getView().byId("idBackButton").setVisible(podConfigs.backButtonVisible);
            //this.getView().byId("closeButton").setVisible(podConfigs.closeButtonVisible);
            //this.getView().byId("headerTitle").setText(podConfigs.title);

            //Example of calling public API
            var TestJsonData = new JSONModel();
             console.log('api call start');
            this.getLocal(apis.get_storageLocations,{
               plant: this.getPlant()
            }).then(res=>{
                MessageToast.show('storageLocations 조회 성공');
                console.log('storageLocations api call 성공 : ' + JSON.stringify(res));

                TestJsonData.setData(res);
                this.getView().setModel(TestJsonData, "apiStorageLocations");

                console.log(res);
                
            }).catch(error=>{
                MessageToast.show(error.message)
                console.log('storageLocations api call 실패 -> JSON file read : ' + JSON.stringify(error));

                TestJsonData = new JSONModel(apiStorageLocations);
                this.getView().setModel(TestJsonData, "apiStorageLocations");

                console.log(TestJsonData);
            })
            
            // $.ajax({
            //     url: 'http://localhost:4000/',
            //     method: "GET",
            //     data: { api: 'get_storageLocations',
            //             plant: 'P_SECT',
            //           },
            //     dataType : "json",
            //     success: (resolve)=>{
            //         TestJsonData.setData(resolve);
            //         this.getView().setModel(TestJsonData, "apiStorageLocations");    
            //     },
            //     error: (oError)=>{console.log(oError);},
            //   });


            console.log('api call end');
            
        },
        onBeforeRenderingPlugin: function () {

        },
        onAfterRendering: function () {

        },
        onAfterPodConfigsLoad: function (configs) {
            
        },

        isSubscribingToNotifications: function () {
            var bNotificationsEnabled = false;
            return bNotificationsEnabled;
        },

        getCustomNotificationEvents: function (sTopic) {
            //return ["template"];
        },

        getNotificationMessageHandler: function (sTopic) {

            //if (sTopic === "template") {
            //    return this._handleNotificationMessage;
            //}
            return null;
        },

        _handleNotificationMessage: function (oMsg) {
            var sMessage = "Message not found in payload 'message' property";
            if (oMsg && oMsg.parameters && oMsg.parameters.length > 0) {
                for (var i = 0; i < oMsg.parameters.length; i++) {

                    switch (oMsg.parameters[i].name) {
                        case "template":

                            break;
                        case "template2":
                    }
                }
            }

        },
        onBackButtonPress: function (oEvent) {
            MessageToast.show('Back Button Pressed!')
        },
        onClickAlertButton: function (oEvent) {
            /*var TestJsonData = new JSONModel();
            
            this.get(apis.get_sfcDetails,{
                plant: this.getPlant(),
                sfc:"S000000124"
            }).then(res=>{
                TestJsonData.setData(res)
                MessageToast.show('S000000124 조회 완료')
            }).catch(MessageToast.show('조회 불가'))

            this.getView().setModel(TestJsonData, "apiData");*/
        },

        onRadioButtonASelect: function (oEvent) {
            //console.log('onRadioButtonASelect click!!');
            //this.onSelectComboaaa(this.getView().byId("comboLoc").getValue());
        },

        onSelectComboaaa: function(param) {
            //MessageToast.show(param.toUpperCase());
        },

        onClickMoveButton: function (oEvent) {
            console.log('onClickMoveButton click!!');

            var oModel = this.getView().getModel("apiInventories");
            var oContent = oModel.getProperty("/content");

            var oTable = this.getView().byId("testTable");
            var aItems = oTable.getItems();
            var selIndex = -1;
            
            aItems.forEach(function (oItem, iIndex) 
            {
                var oRadioButton = oItem.getCells()[0]; // 선택 셀이 첫번째임 (라디오버튼)
             
                if (oRadioButton.getSelected()) 
                {
                    selIndex = iIndex; // 선택 Index
                }
            });
            
            //alert(oContent[selIndex].quantityOnHand.unitOfMeasure.internalUnitOfMeasure);

            let transLocId = (this.getView().byId("transLocId").getValue()).toUpperCase();
            let transQuantity = (this.getView().byId("transQuantity").getValue());
            console.log('move storageLocation = ' + transLocId);
            console.log('move transQuantity = ' + transQuantity);

            this.postLocal(apis.post_inventoriesTransfer,{
                plant: this.getPlant(),
                inventoryId: oContent[selIndex].inventoryId,
                lastModifiedDateTime: oContent[selIndex].modifiedDateTime,
                //quantity: {unitOfMeasure: {internalUnitOfMeasure: oContent[selIndex].quantityOnHand.unitOfMeasure.internalUnitOfMeasure}, value:oContent[selIndex].quantityOnHand.value},
                quantity: {unitOfMeasure: {internalUnitOfMeasure: oContent[selIndex].quantityOnHand.unitOfMeasure.internalUnitOfMeasure}, value:transQuantity},
                storageLocation: transLocId,
             }).then(res=>{
                 console.log(JSON.stringify(res));
             }).catch(error=>{
                 console.log(JSON.stringify(error));
             })

             this.onSelectCombo(this.getView().byId("comboLoc").getValue()); // 이동 후 재조회
             console.log('post api 처리완료');
        },

        onSelectCombo: function(param) {
            //MessageToast.show(param.getSource().getSelectedKey());
            console.log('typeof(param) = ' + typeof(param));

            let sLoc;
            if(typeof(param) === 'string') {
                console.log('이동 후 재조회');
                sLoc = param;
            } else {
                sLoc = param.getSource().getSelectedKey();
            }
            MessageToast.show(sLoc);

            var TestJsonData = new JSONModel();
            console.log('api call start');
            this.getLocal(apis.get_inventories,{
               plant: this.getPlant(),
               storageLocation: sLoc,
            }).then(res=>{
                console.log('inventories api call 성공 : ' + JSON.stringify(res));

                TestJsonData.setData(res);
                this.getView().setModel(TestJsonData, "apiInventories");

                console.log(res);
            }).catch(error=>{
                console.log('inventories api call 실패 -> JSON file read : ' + JSON.stringify(error));

                TestJsonData = new JSONModel(apiInventories);
                this.getView().setModel(TestJsonData, "apiInventories");

                console.log(TestJsonData);
            })
            console.log('api call end');

        },

        onExit: function () {
            BaseController.prototype.onExit.apply(this, arguments);

        }
    });
});