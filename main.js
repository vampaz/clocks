(function (window) {
    'use strict';

    window.addEventListener("DOMContentLoaded", function (ev) {

        init();

    });

    window.addEventListener("optimizedResize", function() {
        init();
    });


    function init() {
        var clockSrc = document.getElementById('clock').innerText;
        var wrapper = document.querySelector('.wrapper');
        var n = getGrid();
        console.log(n)
        makeClocks(clockSrc, wrapper, n);
    }

    function makeClocks(template, el, n) {
        var clocksHtml = '';

        for (var i = n; i >= 1; i--) {
            clocksHtml += template;

        }

        el.innerHTML = clocksHtml;
    }

    function getGrid() {
        var dims = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };

        var size = 60;
        var count = {
            x: Math.floor(dims.w / size),
            y: Math.floor(dims.h / size)
        };

        document.styleSheets[0].insertRule(".clock-wrapper { width: " + size + "px; height: " + size + "px }", 1);

        return count.x * count.y;
    }

    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");


}(window));
