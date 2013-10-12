//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function get_elems() {
    var elems = [];

    ['p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'span'].forEach(function(tag) {
        var ps = $(tag);
        ps.each(function(i, v) {
            var st = $(v).text();
            if (st.match(/^\s*$/))
                return;
            if (v.offsetWidth !== 0 || v.offsetHeight !== 0)
                elems.push(v);
        });
    });

    var imgs = $('img');
    imgs.each(function(i, v) {
        if (v.offsetWidth !== 0 || v.offsetHeight !== 0)
            elems.push(v);
    });

    return elems;
}

function analyze_page(elems) {
    function pic_points(p, elem) {
        if (elem.tagName.toLowerCase() == "img") {
            return elem.offsetHeight * elem.offsetWidth / 1024 + p;
        }
        return p;
    }
    function text_points(p, elem) {
        var len = $(elem).text().length;
        // st = st.replace(/[ ]{2,}/gi," ");
        // st = st.replace(/\n /,"\n");
        // var l = st.split(' ').length;
        return p + len / 10;
    }

    var points = {
        "pics": elems.reduce(pic_points, 0),
        "text": elems.reduce(text_points, 0)
    };
    // var acc = 0;
    // for (k in points) acc += points[k];
    // for (k in points) {
    //     points[k] /= 1.0*acc;
    // }
    return points;
}

function go_do(image) {
    console.log($.fn.jquery);

    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            curleft = obj.offsetLeft
            curtop = obj.offsetTop
            while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
            }
        }

        return [curleft,curtop];
    }

    var imgsrc = image;

    var inject = '<img src="' + imgsrc +'" id="critter" style="'+
        'position:absolute;'+
        'width:2in;'+
        'height:2in;'+
        'top:0px;'+
        'left:0px;'+
        'z-index:99999;'+
        '">';

    var elems = get_elems();

    elems.sort(function(a,b){
        return findPos(a)[1] - findPos(b)[1];
    });
    
    $(inject).prependTo("body");

    function foo() {
        if (elems.length === 0) return;
        var pos = findPos(elems[0]);
        if (elems[0].offsetWidth === 0 && elems[0].offsetHeight === 0) {
            elems.shift();
            return foo();
        }

        var dist = Math.pow(pos[0] - $('#critter')[0].offsetLeft, 2)
            + Math.pow(pos[1] - $('#critter')[0].offsetTop, 2);
        var t = Math.max(300, Math.sqrt(dist));

        $('#critter').animate({
            left: pos[0],
            top: pos[1]
        }, t, function() {
            var wdist = elems[0].offsetWidth-50;
            var hdist = elems[0].offsetHeight-50;
            if (wdist < 0) wdist = 0;
            if (hdist < 0) hdist = 0;
            var dist = wdist*wdist + hdist*hdist;
            var t = Math.max(500, Math.sqrt(dist)*2);

            $(elems[0]).animate({opacity: 0.0}, t);
            $('#critter').animate({
                left: "+="+wdist,
                top: "+="+hdist
            }, t, function() {
                elems[0].remove();
                elems.shift();
                foo();
            });
        });
    }
    foo();
}

alert(JSON.stringify(analyze_page(get_elems())));
