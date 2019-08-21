import $ from "jquery";
import SVG from "svg";

var isPrint = false;
var mouseStartX, mouseStartY,
    isPencil, isGraph, isText, isErase, isClear, isMove, isColor,
    draw,rect;

$(document).ready(function () {
    var $pencil = $('.a-pencil');
    var $graph = $('.a-graph');
    var $text = $('.a-text');
    var $eraser = $('.a-eraser');
    var $clear = $('.a-clear');
    var $move = $('.a-move');
    var $color = $('.a-color');

    draw = SVG('drawing');

    // rect = draw.rect(200,100)
    draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z').move(200,100)
    if (SVG.supported) {
    } else {
        alert('SVG not supported')
    }
    $pencil.click(function () {
        // alert(444)
        isPencil = true;
    })
    $move.click(function () {
        isMove = true;
        isPencil = false;
        console.log(isMove, isPencil)
    })
});
var m,path;
$(document).mousedown(function (e) {
    isPrint = true
    mouseStartX = e.offsetX
    mouseStartY = e.offsetY;
    console.log('isPencil', isPencil)
    if (isPrint && isPencil) {
        var group = draw.group().addClass('group')
        m = "M" + mouseStartX + "," + mouseStartY ;
        path = group.path(m).stroke({ color: 'red', width: 10 }).fill('none').addClass('group')

    }
})

$(document).mousemove(function (e) {
    if (isPrint && isPencil) {
        var x = e.offsetX;
        var y = e.offsetY;
        m += 'L' + x + ',' + y
        path.plot(m)
    }
})

$(document).on('touchstart', function (e) {
    console.log(e, $(e.target)[0].tagName, $(e.target))
    var tagName = $(e.target)[0].tagName
    if (tagName == 'BUTTON') {
        return
    }
    if(tagName == "svg") {
        var touch = e.originalEvent.targetTouches[0]
        isPrint = true
        mouseStartX = touch.pageX
        mouseStartY = touch.pageY;
        console.log('isPencil', isPencil)
        if (isPrint && isPencil) {
            var group = draw.group().addClass('group')
            m = "M" + mouseStartX + "," + mouseStartY;
            path = group.path(m).stroke({ color: 'green', width: 1 }).fill('none').addClass('group')
        }
        if(isErase) {

        }
    }
})
$(document).on('touchmove', function(e) {
    // e.preventDefault();
    var touch = e.originalEvent.targetTouches[0]
    if (isPrint && isPencil) {
        var x = touch.pageX;
        var y = touch.pageY;
        m += 'L' + x + ',' + y
        path.plot(m)
    }
})

$(document).on('touchend', function (e) {
    isPencil = false
})
window.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, { passive: false })

$(document).mouseup(function (e) {
    isPrint = false
    isPencil = false
})

$(document).delegate('path.group', 'touchstart', function (e) {
    console.log(444,e.target,$(this))
    if(isMove) {
        // $(this).move(100,200)
        // $(this).move(33,44)
        console.log('path',path)
        path.draggable()
    }
    // $(this).remove()
})
var offsetX = 0;
var offsetY = 0;
$(document).delegate('path.group', 'mousedown', function (e) {
    console.log(4444,$(this),555,e.target)
    var stMouseX = e.offsetX;
    var stMouseY = e.offsetY;
    var stClientX = $(this).offsetTop
    var stClientY = $(this).offsetLeft
    console.log(7777, stMouseX, $(this), stClientX)
    if(isMove) {
        console.log(555, e.clientX, $(this).offset().left)
        $(this).mousemove(function(e) {
            var endMouseX = e.offsetX;
            var endMouseY = e.offsetY;
            var diffX = stMouseX - endMouseX;
            var diffY = stMouseY - endMouseY;
            console.log(7777, diffX, diffY, stMouseX, endMouseX,path)
            path.move(diffX, diffY)
            // $(this).css({
            //     left: e.clientX - offsetX,
            //     top: e.clientY - offsetY
            // })

        })
        // $(document).delegate('rect', function (e) {
        //     $(this).off("mousemove")
        // })
    }
})
