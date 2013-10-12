function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function feedme(n) {
    post_to_url("/html/feed/" + n, { loc: document.location });
}

function evolveme(n) {
    post_to_url("/html/evolve/" + n, {});
}

function breedwith(a,b) {
    if (b === undefined) {
        return post_to_url("/html/breed/" + a, {});
    } else {
        return post_to_url("/html/breed/" + a + "/" + b, {});
    }
}


function animate_evolve() {
    var frames = 4;
    function f(cb) {
        $("#oldspecies").animate({height:160, width:100}, 500, function () {
            $("#oldspecies").animate({height:100, width:160}, 500, function () {
                frames -= 1;
                if (frames != 0) f(cb);
                else cb();
            });
        });
    }
    function g(cb) {
        $("#oldspecies").animate({height:0, width:0}, 600, function () {
            setTimeout(function () {
                // Now go to animating the new one!
                $("#oldspecies").css("display", "none");
                cb();
            }, 200);
        });
    }
    f(function () {
        g(function () {
            $(".starburst-animate")
                .css("height", "0px")
                .css("width", "0px")
                .css("visibility", "visible");
            $("#newspecies").css("display", "block");
            
            $(".starburst-animate").animate({height:140, width:140}, 500)
                .css("overflow", "visible");
            
            $("#newspecies").animate({height:128, width:128}, 500, function () {
                setTimeout(function () {
                    window.location.href = "/html/my/team";
                }, 3000);
            });
        });
    });
}

function add_team_member() {
    var name = prompt("Name your critter!", "Joshua");
    if (name !== "" && name !== null && name !== undefined)
        post_to_url("/html/my/team/push", { name: name }, "post");
}
