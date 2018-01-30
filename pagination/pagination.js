function showPage(currentpage, totalpage) {
    var currentpage = parseInt(currentpage);
    NOWPAGE = currentpage;
    var str = '<a class="active">' + currentpage + '</a>';

    // 处理数字
    for (var i = 1; i <= 3; i++) {
        if (currentpage - i > 1) {
            str = '<a>' + (currentpage - i) + '</a>' + str;
        }
        if (currentpage + i < totalpage) {
            str = str + '<a>' + (currentpage + i) + '</a>';
        }
    }

    // 处理"..."逻辑
    if (currentpage - 4 > 1) {
        str = '<span>' + "..." + '</span>' + str;
    }
    if (currentpage + 4 < totalpage) {
        str = str + '<span>' + "..." + '</span>';
    }

    // 处理"前一页"和"后一页"逻辑
    if (currentpage > 1) {
        str = '<span class="pre button">' + '前一页' + '</span>' + '<a>' + 1 + '</a>' + str;
    }
    if (currentpage < totalpage) {
        str = str + '<a>' + totalpage + '</a>' + '<span class="next button">' + '后一页' + '</span>';
    }

    // 处理开始
    $('.pagination-container').html(str);
}

function ajaxNewData(pagenumber) {
    $.ajax({
        url: 'http://node.zeroyh.cn/api/test',
        data: {
            page: pagenumber
        },
        success: function(resdata) {
            console.log('请求成功');
            $('.content').html('第' + resdata.data.page + '页的数据');
            showPage(pagenumber, TOTALPAGE);
        }
    })
}

function bindEvent() {
    $(document).off('click', '.pagination-container a').on('click', '.pagination-container a', function() {
        var nowpage = $(this).html();
        ajaxNewData(nowpage);
    });

    $(document).off('click', '.pre').on('click', '.pre', function() {
        ajaxNewData(NOWPAGE-1);
    });

    $(document).off('click', '.next').on('click', '.next', function() {
        ajaxNewData(NOWPAGE+1);
    });
}


// 初始化
var TOTALPAGE = 100;
var NOWPAGE = 1;
$('.content').html(NOWPAGE);

bindEvent();

showPage(NOWPAGE, TOTALPAGE);