/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/dt/Plugin','sap/ui/rta/Utils','sap/ui/rta/controlAnalyzer/ControlAnalyzerFactory'],function(P,U,C){"use strict";var S=P.extend("sap.ui.rta.plugin.Selection",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});S.prototype.registerElementOverlay=function(o){var e=o.getElementInstance();var s=C.getControlAnalyzerFor(e).isEditable(e);o.setSelectable(s);o.attachBrowserEvent("click",this._onClick,this);o.attachBrowserEvent("keydown",this._onKeyDown,this);o.attachBrowserEvent("mousedown",this._onMouseDown,this);};S.prototype.deregisterElementOverlay=function(o){o.detachBrowserEvent("click",this._onClick,this);o.detachBrowserEvent("keydown",this._onKeyDown,this);o.detachBrowserEvent("mousedown",this._onMouseDown,this);};S.prototype._onKeyDown=function(e){var o=U.getFocusedOverlay();if(e.keyCode===jQuery.sap.KeyCodes.ENTER){if((o)&&(!o.isSelected())){o.setSelected(true);e.stopPropagation();}}else if((e.keyCode===jQuery.sap.KeyCodes.ARROW_UP)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o){var p=o.getParentElementOverlay();if((p)&&(p.isSelectable())){p.focus();e.stopPropagation();}}}else if((e.keyCode===jQuery.sap.KeyCodes.ARROW_DOWN)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o){var f=U.getFirstFocusableChildOverlay(o);if(f){f.focus();e.stopPropagation();}}}else if((e.keyCode===jQuery.sap.KeyCodes.ARROW_LEFT)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o){var a=U.getPreviousFocusableSiblingOverlay(o);if(a){a.focus();e.stopPropagation();}}}else if((e.keyCode===jQuery.sap.KeyCodes.ARROW_RIGHT)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o){var n=U.getNextFocusableSiblingOverlay(o);if(n){n.focus();e.stopPropagation();}}}};S.prototype._onMouseDown=function(e){if(sap.ui.Device.browser.name=="ie"){var o=sap.ui.getCore().byId(e.currentTarget.id);if(o.isSelectable()){o.focus();e.stopPropagation();}else{o.getDomRef().blur();}e.preventDefault;}};S.prototype._onClick=function(e){var o=sap.ui.getCore().byId(e.currentTarget.id);if(o.isSelectable()){o.setSelected(!o.getSelected());e.preventDefault();e.stopPropagation();}};return S;},true);