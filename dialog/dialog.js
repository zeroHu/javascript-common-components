;(function($, window, document, undefined) {
    function Dialog(ele, opt) {
        this.$element = ele;
        this.sendOpt = opt;
        this.defaults = {
            id: "dialog-wrapper",//定义 id name
            msg: "你打开了dialog",//提示message
            cls: "dialog-wrapper",// class name
            closebtn: ".close",//关闭class name
            auto: false,//是否自动消失
            modal: true,//是否需要 mask 灰色透明蒙层
            buttons: {
                // 点击确定
                openfun: function() {
                    console.log('你点击了确定');
                },
                // 点击取消
                closefun: function() {
                    console.log('你点击了取消');
                }
            }
        }
        this.options = $.extend({},this.defaults,opt);
    }
    Dialog.prototype = {
        dialog:function(){
            var that = this;
            var tpl = '<div class="dialog-wrapper-style '+that.options.cls+'" id="'+that.options.id+'">'+
                        '<div class="dialog-mask"></div>'+
                        '<div class="dialog-content">'+
                            '<span class="close">x</span>'+
                            '<div class="msg">'+that.options.msg+'</div>'+
                            '<div class="dialog-comfirm" style="display:none;">确定</div>'+
                            '<div class="dialog-cancel" style="display:none;">取消</div>'+
                        '</div>'
                      '</div>';
            // 插入dom
            $('body').append(tpl);
            // 关闭弹窗
            $('.dialog-wrapper-style .close').click(function(){
                that.removeDialog();
            });
            // 是否需要modal
            if(!that.options.modal){
                that.removeMask();
            }
            // 自动关闭
            if(that.options.auto){
                setTimeout(function(){
                    that.removeDialog();
                },1500);
                that.removeCloseBtn();
            }
            // 判断 确定取消按钮出现或者隐藏的逻辑
            if(that.sendOpt && that.sendOpt.buttons && that.sendOpt.buttons.openfun){
                $('.dialog-comfirm').show().on('click',function(){
                    that.options.buttons.openfun();
                    that.removeDialog();
                });
            }
            if(that.sendOpt && that.sendOpt.buttons && that.sendOpt.buttons.closefun){
                $('.dialog-cancel').show().on('click',function(){
                    that.options.buttons.closefun();
                    that.removeDialog();
                });
            }
        },
        removeDialog:function(){
            $('.dialog-wrapper-style').remove();
        },
        removeCloseBtn:function(){
            $('.dialog-content .close').remove();
        },
        removeMask:function(){
            $('.dialog-mask').remove();
        }
    };
    // 写jquery 插件Dialogs
    $.extend({
        Dialogs:function(opt){
            var dialogs = new Dialog(this,opt);
            return dialogs.dialog();
        }
    });
})(jQuery, window, document)