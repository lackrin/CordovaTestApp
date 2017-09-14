/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
*/
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","sap/rules/ui/parser/businessLanguage/lib/parsingBackendMediator","sap/rules/ui/parser/ruleBody/lib/ruleServices","sap/rules/ui/parser/resources/common/lib/resourcesConvertor","sap/rules/ui/parser/resources/vocabulary/lib/vocabularyDataProviderInitiator","sap/rules/ui/parser/infrastructure/messageHandling/lib/responseCollector","sap/rules/ui/library"],function(q,E,P,R,r,a,b){"use strict";var c=E.extend("sap.rules.ui.services.ExpressionLanguage",{metadata:{library:"sap.rule.ui",properties:{},publicMethods:["setData","validateExpression","getSuggestions","getExpressionMetadata"]}});c.prototype._isDataExist=function(){if(!this._data){return false;}return true;};c.prototype._removeResultTags=function(d){var i;var e=JSON.parse(JSON.stringify(d));if(e.DataObjects&&e.DataObjects.results){e.DataObjects=e.DataObjects.results;for(i=0;i<e.DataObjects.length;i++){if(e.DataObjects[i].Attributes&&e.DataObjects[i].Attributes.results){e.DataObjects[i].Attributes=e.DataObjects[i].Attributes.results;}if(e.DataObjects[i].Associations&&e.DataObjects[i].Associations.results){e.DataObjects[i].Associations=e.DataObjects[i].Associations.results;}}}if(e.DecisionTable){if(e.DecisionTable.DecisionTableColumns&&e.DecisionTable.DecisionTableColumns.results){e.DecisionTable.DecisionTableColumns=e.DecisionTable.DecisionTableColumns.results;}if(e.DecisionTable.DecisionTableRows&&e.DecisionTable.DecisionTableRows.results){e.DecisionTable.DecisionTableRows=e.DecisionTable.DecisionTableRows.results;for(i=0;i<e.DecisionTable.DecisionTableRows.length;i++){if(e.DecisionTable.DecisionTableRows[i].Cells&&e.DecisionTable.DecisionTableRows[i].Cells.results){e.DecisionTable.DecisionTableRows[i].Cells=e.DecisionTable.DecisionTableRows[i].Cells.results;}}}}return e;};c.prototype._initRuntimeService=function(){if(!this._runtimeService){var v=this._removeResultTags(this._data);this._vocabularyName=v.Id;var i={"connection":null,"vocaLoadingType":"json","resourceID":this._vocabularyName,"resourceContent":v};var d=a.lib;var e=new d.vocaDataProviderInitiatorLib();this._runtimeService=e.init(i);}};c.prototype._initBackendParser=function(){if(!this._backendParser){var d=P.lib;this._backendParser=new d.parsingBackendMediatorLib();}};c.prototype._init=function(){this._initRuntimeService();this._initBackendParser();};c.prototype._reset=function(){this._runtimeService=null;this._backendParser=null;this._initBackendParser();};c.prototype.setData=function(d){this._data=d;this._reset();};c.prototype._initResponseCollector=function(s){var d=b.lib.ResponseCollector;var o=d.getInstance();o.clear();o.addSubject(s);return d;};c.prototype.validateRule=function(o){if(!this._isDataExist()){return null;}this._init();var C={content:this._removeResultTags(o)};var d=this._initResponseCollector("Rule Validation");var e=d.getInstance();var m="************* RULE: "+JSON.stringify(C.content)+"\n\n\n\n"+"*************    VOCABULARY: "+JSON.stringify(this._data)+"\n\n\n\n";e.trace(d.severity().debug,m);e.setOpMessage("RuleValidation","failure");var f=R.lib.validateRule(C.content,this._vocabularyName,this._runtimeService);if(f.status=="Success"){e.setOpMessage("RuleValidation","success");}e.setOutput(f);var g=e.build();return g;};c.prototype.validateExpression=function(e,d,C,t){if(!this._isDataExist()){return null;}this._init();this._initResponseCollector("Parsing");if(!C){C=false;}if(t===undefined||t===null){t=true;}var f={isCollection:C,tokensOutput:t};var p=this._backendParser.parseExpression(e,sap.rules.ui.BackendParserRequest.Validate,this._runtimeService,null,d,this._vocabularyName,f);var g={};g.status=p.status;if(g.status==="Error"){g.errorDetails=p.errorDetails;g.cursorPosition=p.cursorPosition;}else{g.actualReturnType=p.actualReturnType;}if(t){g.tokens=p.tokens;}return g;};c.prototype.getSuggestions=function(e,d,C,t){if(!this._isDataExist()){return null;}this._init();this._initResponseCollector("Parsing");if(!C){C=false;}if(t===undefined||t===null){t=true;}var f={"isCollection":C,"tokensOutput":t};var p=this._backendParser.parseExpression(e,sap.rules.ui.BackendParserRequest.Suggests,this._runtimeService,null,d,this._vocabularyName,f);var g={};g.suggs=p.suggs;if(t){g.tokens=p.tokens;}return g;};c.prototype.getSuggestionsByCategories=function(e,f){e=e?e:"";var s=this.getSuggestions(e,"All",false).suggs;s=s?s:[];if(!f){return s;}var o=[];for(var i=0;i<f.length;i++){var d=f[i];for(var j=0;j<s.length;j++){if(d.tokenType===undefined||d.tokenType===s[j].tokenType||d.hasOwnProperty('tokenType')===false){if(s[j].hasOwnProperty('info')===false){if((d.hasOwnProperty('tokenCategory')===false&&d.hasOwnProperty('tokenBusinessType')===false)||(d.tokenCategory===undefined&&d.tokenBusinessType===undefined)){o.push(s[j]);}}else if((d.tokenCategory===undefined||d.tokenCategory===s[j].info.category||d.hasOwnProperty('tokenCategory')===false)&&(d.tokenBusinessType===undefined||d.tokenBusinessType===s[j].info.type||d.hasOwnProperty('tokenBusinessType')===false)){o.push(s[j]);}}}}return o;};c.prototype.getExpressionMetadata=function(e){if(!this._isDataExist()){return null;}this._init();this._initResponseCollector("Parsing");var p=this._backendParser.parseExpression(e,sap.rules.ui.BackendParserRequest.GetMetadata,this._runtimeService,null,null,this._vocabularyName,null);var d={};d.tokens=p.tokens;return d;};c.prototype.getResultInfo=function(s){if(!this._isDataExist()){return null;}this._init();var o=null;o=this._runtimeService.getOutput(this._vocabularyName,s,null);if(o&&o.name){this._getResultRequiredParamIds(o);}return o;};c.prototype._getResultRequiredParamIds=function(o){var i,j,k;var d=JSON.parse(JSON.stringify(this._data));if(d.DataObjects&&d.DataObjects.results){d.DataObjects=d.DataObjects.results;for(i=0;i<d.DataObjects.length;i++){if(d.DataObjects[i].Attributes&&d.DataObjects[i].Attributes.results&&(d.DataObjects[i].Name==o.name)&&(d.DataObjects[i].Usage=="RESULT")&&o.requiredParams){d.DataObjects[i].Attributes=d.DataObjects[i].Attributes.results;for(j=0;j<d.DataObjects[i].Attributes.length;j++){for(k=0;k<o.requiredParams.length;k++){if(o.requiredParams[k].name===d.DataObjects[i].Attributes[j].Name){o.requiredParams[k].paramId=d.DataObjects[i].Attributes[j].Id;}}}return;}}}return;};return c;},true);