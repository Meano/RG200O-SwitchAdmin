// ==UserScript==
// @name         RG200O
// @namespace    https://www.meano.net/
// @version      1.0
// @description  RG200O光猫辅助脚本!
// @author       Meano
// @match        http://192.168.1.1/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.8.2.js
// ==/UserScript==

// JavaScript Document

function getCfg2(cmd, req, call)
{
	if (!hideLoadIconFlag){loadPicShow();};
	if (cmd == "" || cmd == "undefined" )
	{
		if (!hideLoadIconFlag)
		{
			loadPicHide()
		}
		return;
	}
	if (cmd.indexOf(".json") != -1)
	{
		$.getJSON(noCache(cmd),
		   req,
		   function(jsonObj)
		 {
            switch(cmd){
                case "accountLvGet.json":
                    jsonObj.accountLv = "0";
                    break;
                case "mainCfgGet.json":
                    jsonObj.accountLv = "0";
                    jsonObj.superAdmin = "1";
                    jsonObj.fwupgrade.support = "1";
                    break;
                case "wanCfgGet.json":
                    jsonObj.ctrlCfg.curUser = "CUAdmin";
                    jsonObj.ctrlCfg.isUser = "0"
                    break;
            }
            if(jsonObj.accountLv != "0"){
                jsonObj.accountLv = "0";
            }
            if(jsonObj.loginedType != "1"){
                jsonObj.loginedType = "1";
            }
				pageTimeoutHandler.resetCheck();
				processDebugFuncHook(jsonObj);
				if ((supportMobileUi == "1") && isMobDev())
				{
					g_jsonObjForMob = jsonObj;
				}
		   		if (!hideLoadIconFlag)
				{
					loadPicHide()
				}
				if(call)
				{
					call(jsonObj);
					synHandle.setUpdateCfgFlag(cmd, true);
				}
			}); //end $.getJSON
	}
	else if (cmd.indexOf(".txt") != -1)
	{
		$.get(noCache(cmd),
		   req,
		   function(txt)
		   {
			   pageTimeoutHandler.resetCheck();
				if (!hideLoadIconFlag)
				{
					loadPicHide()
				}
				if(call)
				{
					call(txt);
					synHandle.setUpdateCfgFlag(cmd, true);
				}
		});
	}
	else
	{
		alert("Unsupport Config File Type.");
		return;
	}
	//display content
	/*
	if ("none" == $("body").css("display"))
	{
		setTimeout("showWholePage()", 100);
	}
	*/

}

$(document).ready(function() {
    getCfg = getCfg2;
});
