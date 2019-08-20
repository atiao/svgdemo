import $ from "jquery";
import SVG from "svg";
import '@svgdotjs/svg.draggable.js'
var isPrint = false;
var mouseStartX, mouseStartY,
    isPencil, isGraph, isText, isErase, isClear, isMove, isColor,
    draw;

function isCurSelect(e) {
    var name = e.target.name;
    console.log('name',name)
}
$(document).ready(function () {
    var $pencil = $('.a-pencil');
    var $graph = $('.a-graph');
    var $text = $('.a-text');
    var $eraser = $('.a-eraser');
    var $clear = $('.a-clear');
    var $move = $('.a-move');
    var $color = $('.a-color');
    $('button').click(function(e) {
        isCurSelect(e)
    })
    if (SVG.supported) {
        draw = SVG('drawing');

    } else {
        alert('SVG not supported')
    }
    $pencil.click(function () {
        isPencil = true;
    })
    $move.click(function () {
        console.log(555222)
        isMove = true;
        isPencil = false;
    })
});
var m,path;
$(document).mousedown(function (e) {
    console.log(e.target)
    console.log('X：' + e.offsetX + '\n Y:' + e.offsetY);
    // var path = draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z').stroke({color: 'green'}).fill('none')
    // var array = path.array()
    // var border = array.bbox()
    // console.log('path.arry', border)
    isPrint = true
    mouseStartX = e.offsetX
    mouseStartY = e.offsetY;
    var group = draw.group().addClass('group')
    if(isPrint && isPencil) {
        m = "M" + mouseStartX + "," + mouseStartY ;
        path = group.path(m).stroke({ color: 'green', width: 10 }).fill('none')

    }
    // group.rect(100,100)
    // return
    // m = "M" + mouseStartX + "," + mouseStartY + ' L ' + mouseStartX + "," + mouseStartY;
})
var arrpoint = []
$(document).mousemove(function (e) {
    // var draw = SVG('drawing')
    // var rect = draw.rect(300, 100)
    // isPencil = true;
    // return
    if (isPrint && isPencil) {
        console.log(e.target)
        var x = e.offsetX;
        var y = e.offsetY;
        m += 'L' + x + ',' + y
        // arrpoint.push(x+ ','+y)
        // arrpoint.forEach(function (val,i) {
        //     if(i< arrpoint.length) {
        //         m += val + ' '
        //     }
        // })
        // $('path').attr('d', m)
        path.plot(m)
        // console.log('cccc',m,x,y,arrpoint)
        // draw.path(m).stroke({ color: 'green', width:1 }).fill('none')
        // var line = draw.line(mouseStartX, mouseStartY, x, y).stroke({ width: 1 })
        // mouseStartX = x
        // mouseStartY = y
    }
})

$(document).mouseup(function (e) {
    // upX = e.offsetX
    // upY = e.offsetY
    // m = m + 'L'+upX+upY
    // $('path').attr('d', m)
    isPrint = false
})

$(document).delegate('path', 'click', function (e) {
    console.log(444,e.target,$(this))
    if(isMove) {
        // $(this).move(100,200)
        $(this).move(33,44)
    }
    // $(this).remove()
})

// $('.group').click(function(){
//     console.log(5555)
// })