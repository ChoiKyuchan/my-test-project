sap.ui.define([
    "sap/dm/dme/controller/BrowseBase",
    "sap/dm/dme/formatter/ObjectTypeFormatter"
], function(BrowseBase, ObjectTypeFormatter) {
    "use strict";

    let ComponentBrowseType = BrowseBase.extend("sap.dm.dme.browse.ComponentBrowse", {

        objectTypeFormatter: ObjectTypeFormatter,

        /**
         * @override
         */
        createResultData: function(oBindingContext) {
            return {
                ref: oBindingContext.getProperty("ref"),
                name: oBindingContext.getProperty("material"),
                version: oBindingContext.getProperty("version")
            };
        }
    });

    return {

        /**
         * Instantiates and opens value help dialog.
         * @param {sap.ui.core.Element} oParentControl - value help dialog will be set as dependent to it.
         * @param {String} sDefaultSearchValue - default value placed in a search field and a list is filtered by.
         * @param fnSelectionCallback - callback function called when user selects item in a list.
         */
        open: function(oParentControl, sDefaultSearchValue, fnSelectionCallback) {
            return new ComponentBrowseType("componentBrowse", {
                sFragmentName: "sap.dm.dme.browse.view.ComponentBrowse",
                oParentControl: oParentControl,
                sDefaultSearchValue: sDefaultSearchValue,
                fnSelectionCallback: fnSelectionCallback,
                oFilterSettings: {
                    aLiveSearchProperties: ["material"]
                }
            });
        }
    };
});