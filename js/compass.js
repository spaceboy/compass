class Functile {
    
    static each (a, f) {
        if (a.hasOwnProperty("length")) {
            for (var i = 0, l = a.length; i < l; ++i) {
                f(a[i], i, a);
            }
        } else {
            for (var i in a) {
                f(a[i], i, a);
            }
        }
    }
}

class Compass {

    interval = 1000;

    pointer;

    constructor (pointer) {
        this.pointer = pointer;
        this.show();
        //window.setInterval(this.show.bind(this), this.interval);
    };

    /*
        Return  time for timezone without daylight saving time correction.
        @return Date
    */
    getTimezoneTime () {
        var d = new Date();
        return new Date(
            d.getTime() -
                (
                    (
                        new Date(d.getFullYear() + "-01-01").getTimezoneOffset()
                        - d.getTimezoneOffset())
                    * 60000
                )
        );
    };

    /*
    Namíříme malou ručičku směrem na slunce a rozdělíme menší úhel mezi malou ručičkou a dvanáctkou, tímto směrem je jih, naproti je sever.
    V letě je čas posunutý, a proto musíte vždy jednu hodinu ubrat.
    Dále pozor v době od 6 hodin odpoledne až do 6 hodin ráno musíte dělit ten větší úhel mezi malou ručičkou a dvanáctkou.
    */

    show () {
        var d = this.getTimezoneTime();
        var h = d.getHours() + (d.getMinutes() / 60);

        // Compass body angle:
        var cAngle = (h % 12) * -30;

        // Pointer angle:
        var smaller = (h >= 6 && h <= 18);
        var pAngle = ((cAngle / 2) + 180) % 360;

        /*
        console.log(d.getHours(), d.getMinutes());
        console.log(h);
        console.log(cAngle);
        console.log(pAngle);
        */

        // Rotate pointer:
        var rot = ":rotate(" + pAngle + "deg)";
        var style = [];
        Functile.each(
            [
                "transform",
                "-ms-transform",
                "-moz-transform",
                "-webkit-transform",
                "-o-transform"
            ],
            function (el) {
                style.unshift(el + rot);
            }
        );
        this.pointer.setAttribute("style", style.join(";") + "; display: block;");
    };
}

new Compass(document.getElementById("pointer"));
