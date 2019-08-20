var isPrint = false;
var mouseStartX, mouseStartY,
    isPencil, isGraph, isText, isErase, isClear, isMove, isColor,
    $pencil, $graph, $text, $eraser, $clear, $move, $color;

function isCurSelect(e) {
    var name = e.target.name;
    console.log('name',name)
}
$(document).ready(function () {
    $pencil = $('.a-pencil');
    $graph = $('.a-graph');
    $text = $('.a-text');
    $eraser = $('.a-eraser');
    $clear = $('.a-clear');
    $move = $('.a-move');
    $color = $('.a-color');
    $('button').click(function(e) {
        isCurSelect(e)
    })
    if (SVG.supported) {
        draw = SVG('drawing');

    } else {
        alert('SVG not supported')
    }

    $eraser.click(function () {
        console.log(5555)
        isPrint = false
        isErase = true
    })

    var g = document.getElementsByTagName('g')
    g.addEventListener('click', function (params) {
        console.log(g)
    },true)

    $($('[id^=SvgjsG]')[0]).click(function() {
        console.log(444)
        if (isErase) {
            $(this).remove()
        }
    })

    $($('[id^=SvgjsG]')[0]).on('click', function (params) {
        alert(999)
    })
});
var m,group;
$(document).mousedown(function (e) {
    console.log('$(id[^= SvgjsG)', $('[id^=SvgjsG]')[0],e.target.ownerDocument)
    console.log(e.target)
    console.log('X：' + e.offsetX + '\n Y:' + e.offsetY);
    // var path = draw.path('M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z').stroke({color: 'green'}).fill('none')
    // var array = path.array()
    // var border = array.bbox()
    // console.log('path.arry', border)
    $($('[id^=SvgjsG]')[0]).click(function() {
        console.log(555,this)
    })
    isPrint = true
    mouseStartX = e.offsetX
    mouseStartY = e.offsetY;
    if(!isErase) {

        group = draw.group()
    }
    m = "M" + mouseStartX + "," + mouseStartY + ' L ' + mouseStartX + "," + mouseStartY;
    // draw.path(m).stroke({ color: 'green', width: 1 }).fill('none')
})

var arrpoint = []
$(document).mousemove(function (e) {
    // var draw = SVG('drawing')
    // var rect = draw.rect(300, 100)
    isPencil = true;
    if (isPrint && isPencil) {
    //     console.log(e.target)
        var x = e.offsetX;
        var y = e.offsetY;
    //     arrpoint.push(x+ ','+y)
    //     arrpoint.forEach(function (val,i) {
    //         if(i< arrpoint.length) {
    //             m += val + ' '
    //         }
    //     })
    //     $('path').attr('d', m)
        // console.log('cccc',m,x,y,arrpoint)
        // draw.path(m).stroke({ color: 'green', width:1 }).fill('none')
        
        var line = group.line(mouseStartX, mouseStartY, x, y).stroke({ width: 1 })
        mouseStartX = x
        mouseStartY = y
    }
})

$(document).mouseup(function (e) {
    upX = e.offsetX
    upY = e.offsetY
    // m = m + 'L'+upX+upY
    // $('path').attr('d', m)
    isPrint = false
    isPencil = true
})

$('svg').delegate('g','click', function (params) {
    console.log(555444)
    alert(444)
})

// SVG.on(window, 'click', function (params) {
//     // alert(666)
//     console.log(this)
// })