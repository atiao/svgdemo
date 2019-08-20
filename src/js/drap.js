$(function () {
    var offsetX = 0;
    var offsetY = 0;
    //第一步：鼠标点下时获取鼠标落下的位置
    $("div").mousedown(function (ev) {
        offsetX = ev.clientX - $(this).offset().left;
        offsetY = ev.clientY - $(this).offset().top;

        var _this = this;
        //第二步：在document下div跟随鼠标移动
        $(document).mousemove(function (ev) {
            $(_this).css({
                left: ev.clientX - offsetX,
                top: ev.clientY - offsetY
            })
        })
    })
    //第三步：在document下 鼠标抬起，取消跟随事件
    $(document).mouseup(function () {
        $(document).off("mousemove");
    })
})