function go_do() {
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

    var imgsrc = "http://076dd0a50e0c1255009e-bd4b8aabaca29897bc751dfaf75b290c.r40.cf1.rackcdn.com/images/files/000/004/445/original/original.0";

    var inject = '<img src="' + imgsrc +'" id="critter" style="'+
        'position:absolute;'+
        'width:39px;'+
        'height:45px;'+
        'top:0px;'+
        'left:0px;'+
        'z-index:99999;'+
        '">';

    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
    var elems = [];

    var ps = $('p');
    ps.each(function(i, v) {
        var st = $(v).text();
        if (st.match(/^\s*$/))
            return;
        st = st.replace(/[ ]{2,}/gi," ");
        st = st.replace(/\n /,"\n");
        var l = st.split(' ').length;
        if (v.offsetWidth !== 0 || v.offsetHeight !== 0)
            elems.push(v);
    });

    var as = $('a');
    as.each(function(i, v) {
        var st = $(v).text();
        if (st.match(/^\s*$/))
            return;
        st = st.replace(/[ ]{2,}/gi," ");
        st = st.replace(/\n /,"\n");
        var l = st.split(' ').length;
        if (v.offsetWidth !== 0 || v.offsetHeight !== 0)
            elems.push(v);
    });

    var imgs = $('img');
    imgs.each(function(i, v) {
        if (v.offsetWidth !== 0 || v.offsetHeight !== 0)
            elems.push(v);
    });

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

        console.log("moving to nom");
        $('#critter').animate({
            left: pos[0],
            top: pos[1]
        }, 2000, function() {
            $(elems[0]).animate({opacity: 0.0}, 2000);
            $('#critter').animate({
                left: "+="+(elems[0].offsetWidth-50),
                top: "+="+(elems[0].offsetHeight-50)
            }, 2000, function() {
                elems[0].remove();
                elems.shift();
                foo();
            });
        });
    }
    foo();
}

go_do();
