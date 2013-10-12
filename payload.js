var imgsrc = "http://076dd0a50e0c1255009e-bd4b8aabaca29897bc751dfaf75b290c.r40.cf1.rackcdn.com/images/files/000/004/445/original/original.0";

var inject = '<img src="' + imgsrc +'" id="critter">';

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function go_do() {
    var ps = $('p');

    $( $.parseHTML(inject) ).prependTo("body");
    var elems = [];
    ps.each(function(i, v) {
        var st = $(v).text();
        if (st.match(/^\s*$/))
            return;
        st = st.replace(/[ ]{2,}/gi," ");
        st = st.replace(/\n /,"\n");
        var l = st.split(' ').length;
        v.innerHTML += " (" + l + ")";
        elems.push(v);
    });

    elems = shuffle(elems);
    
    function foo() {
        if (elems.length === 0) return;

        console.log(elems[0].offsetLeft);
        $('#critter').animate({
            left: elems[0].offsetLeft,
            top: elems[0].offsetTop
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
