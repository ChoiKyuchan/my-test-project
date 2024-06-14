sap.ui.define([
    "sap/ui/model/resource/ResourceModel",
    "sap/dm/dme/podfoundation/control/PropertyEditor"
], function (ResourceModel, PropertyEditor) {
    "use strict";
    
    var oFormContainer;

    return PropertyEditor.extend( "dongkuk.custom.plugin.ckcplugin.builder.PropertyEditor" ,{

		constructor: function(sId, mSettings){
			PropertyEditor.apply(this, arguments);
			
			this.setI18nKeyPrefix("customComponentListConfig.");
			this.setResourceBundleName("dongkuk.custom.plugin.ckcplugin.i18n.builder");
			this.setPluginResourceBundleName("dongkuk.custom.plugin.ckcplugin.i18n.i18n");
		},
		
		addPropertyEditorContent: function(oPropertyFormContainer){
			var oData = this.getPropertyData();
			
			this.addSwitch(oPropertyFormContainer, "backButtonVisible", oData);
			this.addSwitch(oPropertyFormContainer, "closeButtonVisible", oData);
						
			this.addInputField(oPropertyFormContainer, "title", oData);
			this.addInputField(oPropertyFormContainer, "text", oData);

            oFormContainer = oPropertyFormContainer;
		},
		
		getDefaultPropertyData: function(){
			return {
				
				"backButtonVisible": true,
				"closeButtonVisible": true,
                "title": "ckcplugin",
				"text": "ckcplugin"
                
			};
		}

	});
});