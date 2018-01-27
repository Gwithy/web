
var PageTransferFlowPriceAdd = function(){
    return {
        defaultOption: {
            basePath:"",
            action : "",
            transferFlowPriceForm : null
            
        },
        init :function ()
        {
            mini.parse();
            this.basePath = PageMain.basePath;
            this.transferFlowPriceForm = new mini.Form("transferFlowPriceFormAdd");
        },
        funSetData : function(data)
        {
        	var row = data.row;
        	this.action = data.action;
        	this.transferFlowPriceForm.setData(row);
        	if(this.action == "oper")
        	{
        		
        		mini.get("layout_transferFlowPrice_add").updateRegion("south", { visible: false });//$(".mini-toolbar").hide();
        		var fields = this.transferFlowPriceForm.getFields();
                for (var i = 0, l = fields.length; i < l; i++)
                {
                    var c = fields[i];
                    if (c.setReadOnly) c.setReadOnly(true);     //只读
                    if (c.setIsValid) c.setIsValid(true);      //去除错误提示
                }
        	}
        },
        funSave : function()
        {
        	this.transferFlowPriceForm.validate();
            if (!this.transferFlowPriceForm.isValid()) 
            {
                 var errorTexts = form.getErrorTexts();
                 for (var i in errorTexts) 
                 {
                     mini.alert(errorTexts[i]);
                     return;
                 }
            }
            
            var me = this;
            var obj = this.transferFlowPriceForm.getData(true);
            $.ajax({
               url : PageMain.defaultOption.httpUrl + "/transferFlowPrice/" + me.action + "?a="+Math.random(),
               type : 'POST',
               data : obj,
               dataType: 'json',
               success: function (data) 
               {
            	   if (data.success)
                   {
                       mini.alert("操作成功", "提醒", function(){
                           if(data.success)
                           {
                               PageMain.funCloseWindow("save");
                           }
                       });
                   }
                   else
                   {
                       PageMain.funShowMessageBox(data.msg);
                   }
               },
               error: function (jqXHR, textStatus, errorThrown) 
               {
            	   PageMain.funShowMessageBox("操作出现异常");
               }
           });
        },
        funCancel : function()
        {
        	PageMain.funCloseWindow("cancel");
        }
    }
}();

$(function(){
	PageTransferFlowPriceAdd.init();
});