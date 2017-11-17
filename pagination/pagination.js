;
(function($, window, document, undefined) {
    "use strict";

    function Pagination(ele, opt) {
        this.$element = ele;
        this.defaults = {
            currentIndex: 0, //当前页码
            pageSize: 6, //每页条数
            itemCount: 100, //总条数
            maxButtonCount: 7, //最多展示的button
            prevText: "上一页",//上翻按钮文案
            nextText: "下一页",//下凡按钮文案
            buildPageUrl: null,//给a标签写入url  用于整体页面渲染的翻页
            clickPageCallBack: null//点击按钮后的回调函数 用于一个月内的局部翻页
        };
        this.options = $.extend(this.defaults, opt || {});
    }

    Pagination.prototype = {
        init: function() {
            this.paginationsHtml();//渲染html
        },
        paginationsHtml: function() {
            var options = this.options,//options 选项定义
                tpl = [];//模板数组
            // 定义总页数
            options.pageAllCount = Math.ceil(options.itemCount / options.pageSize);

            // 上一页按钮
            if( options.currentIndex > 0 ){
                tpl.push('<a page="' + (options.currentIndex - 1) + '" class="flip">' + options.prevText + '</a>');
            }else{
                tpl.push('<span class="flip noPage">'+options.prevText+'</span>');
            }
            // 定义参数 作为区分
            var showMidel = options.currentIndex - Math.floor(options.maxButtonCount /2)+1;


            console.log('showMidel===========>',showMidel);

            var endIndex = Math.min(options.pageCount, Math.max(0, showMidel) + options.maxButtonCount) - 1,
                startIndex = Math.max(0, endIndex - options.maxButtonCount + 1);

            // 分成三段的情况下的第一段
            if(showMidel > 0){
                tpl.push("<a page='" + 0 + "'>1</a> ");
                tpl.push("<span>...</span>");
            }
            // 分成三段的抢矿下的第二段
            for(var i=startIndex; i < endIndex; i++){
                if (options.currentIndex == i) {
                    tpl.push('<span class="curPage">' + (i + 1) + '</span>');
                } else {
                    tpl.push('<a page="' + i + '">' + (i + 1) + '</a>');
                }
            }

            // 分成三段的抢矿下的第二段
            if(endIndex < options.pageCount-1 ){
                tpl.push("<span>...</span> ");
                tpl.push("<a page='" + (options.pageCount - 1) + "'>" + options.pageCount + "</a> ");
            }
            // 下一页按钮
            if( options.currentIndex < options.pageAllCount-1 ){
                tpl.push('<a page="' + (options.currentIndex + 1) + '" class="flip">' + options.nextText + '</a>');
            }else{
                tpl.push('<span class="flip noPage">'+options.nextText+'</span>');
            }
            this.$element.html(tpl.join(""));
        }
    }

    $.fn.extend({
        pagination: function(opt) {
            var pagination = new Pagination(this, opt);
            return pagination.init();
        }
    })
})(jQuery, window, document)