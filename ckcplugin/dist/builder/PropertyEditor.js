sap.ui.define(["sap/ui/model/resource/ResourceModel","sap/dm/dme/podfoundation/control/PropertyEditor"],function(t,e){"use strict";var i;return e.extend("dongkuk.custom.plugin.ckcplugin.builder.PropertyEditor",{constructor:function(t,i){e.apply(this,arguments);this.setI18nKeyPrefix("customComponentListConfig.");this.setResourceBundleName("dongkuk.custom.plugin.ckcplugin.i18n.builder");this.setPluginResourceBundleName("dongkuk.custom.plugin.ckcplugin.i18n.i18n")},addPropertyEditorContent:function(t){var e=this.getPropertyData();this.addSwitch(t,"backButtonVisible",e);this.addSwitch(t,"closeButtonVisible",e);this.addInputField(t,"title",e);this.addInputField(t,"text",e);i=t},getDefaultPropertyData:function(){return{backButtonVisible:true,closeButtonVisible:true,title:"ckcplugin",text:"ckcplugin"}}})});
//# sourceMappingURL=PropertyEditor.js.map