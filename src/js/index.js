import SVG from "svg";
;
let drawer = (function() {
    if (!SVG.supported) {
        alert('当前浏览器不支持svg');
        return;
    }
    let _options = {
        inSvg: false,
        isPencil: false,
        isErase: false,
        isClear: false,
        btns: ['pencil', 'erase', 'clear','color','graph'],
        color: 'red',
        width: 1,
        draw: null,
        stX: 0,
        stY: 0,
        endX: 0,
        endY: 0,
        m: '',
        path: null
    }
    let _drawer_api = {
        init: function (id) {
            _options.draw = SVG(id);
            this.createBtns(id);
            this.listen(id);
            window.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, { passive: false })
        },
        createBtns: function (id) {
            //添加操作按钮
            let $drawBox = document.getElementById(id);
            let $btnsBox = document.createElement('div');
            $btnsBox.setAttribute('class', 'd-btns');
            $drawBox.appendChild($btnsBox);
            _options.btns.forEach((val, i) => {
                var $node = document.createElement('button');
                $node.click(function (e) {
                    console.log('e', e)
                })
                $node.setAttribute('class', `d-${val}`);
                $node.setAttribute('name', val);
                $node.innerHTML = val;
                $btnsBox.append($node);
            });
        },
        listen: function (id) {
            document.getElementById(id).addEventListener('touchstart', this.touchStart,false);
            document.getElementById(id).addEventListener('touchmove', this.touchMove, false);
            document.getElementById(id).addEventListener('touchend', this.touchEnd, false);
        },
        touchStart: function (e) {
            let tagName = e.target.tagName;
            if (tagName == 'BUTTON') {
                let name = e.target.name
                console.log('button')
                switch (name) {
                    case "pencil":
                        _options.isPencil = true
                        break;
                    case "erase":
                        _options.isErase = true
                        break;
                    case "clear":
                        _options.isClear = true
                        var set = _options.draw.set();
                        console.log('set', set)
                        set.clear()
                        break;
                    case "color":
                        console.log('color')
                        _options.color = 'green'
                        break;
                    case "graph":
                        
                        break;

                    default:
                        break;
                }
            } else if (tagName == 'svg') {
                console.log('svg', e.changedTouches)
                _options.inSvg = true;
                let touch = e.changedTouches[0];
                _options.stX = touch.pageX;
                _options.stY = touch.pageY;
                if (_options.isPencil) {
                    let group = _options.draw.group().addClass('group');
                    _options.m = `M${_options.stX},${_options.stY}`
                    _options.path = group.path(_options.m).stroke({ color: _options.color, width: _options.width}).fill('none').addClass('path')
                } 
                

            } else if (tagName == 'path') {
                if (_options.isErase) {
                    // e.target
                    let id = e.target.id;
                    let tagName = e.target.tagName;
                    console.log('path', 4444, tagName, id, e, document.getElementsByTagName('g'))
                    // e.target.parentNode.remove();
                }
                
            }

            console.log('listen,tourch', e, e.target.tagName, _options.isErase)

        },
        touchMove: function (e) {
            let touch = e.changedTouches[0]
            if (_options.inSvg && _options.isPencil) {
                let x = touch.pageX;
                let y = touch.pageY
                _options.m += `L${x},${y}`
                _options.path.plot(_options.m)
            }
        },
        touchEnd: function (e) {
            _options.inSvg = false;
        },
        pencil: function() {
            console.log('pencil',this)
        },
        erase: function(e) {
            console.log('erase', e)
            // document.getElementsByTagName('path').addEventListener('touchstart', function (e) {
            //     console.log('erase', this)
            //     if(_options.isClear) {
                    
            //     }
            // })
        },
        clear: function() {
            console.log('clear',this)
        },
        color: function() {
            console.log('color', this)
        },

    }

    return _drawer_api;
})();

drawer.init('drawing')