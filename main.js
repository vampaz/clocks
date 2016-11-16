(function (window) {
    'use strict';

    var clockSize = 60;
    var clockSrc;
    var wrapper;

    window.addEventListener("DOMContentLoaded", function (ev) {
        init();
    });

    function init() {
        clockSrc = document.getElementById('clock').innerText;
        wrapper = document.querySelector('.wrapper');

        makeClocks(clockSrc, wrapper, getGrid(clockSize));
        document.styleSheets[0].insertRule(".clock-wrapper { width: " + clockSize + "px; height: " + clockSize + "px }", 1);
    }

    function makeClocks(template, el, n) {
        var clocksHtml = '';
        for (var i = n; i >= 1; i--) {
            clocksHtml += template;
        }
        el.innerHTML = clocksHtml;
    }

    function getGrid(size) {
        var docDims = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };

        var gridDims = size || 60;

        var count = Math.floor(docDims.w / gridDims) * Math.floor(docDims.h / gridDims);
        console.log(count);
        return count;
    }

    var throttle = function (type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function () {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function (time) {
                console.log(time)
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle("resize", "optimizedResize");

    window.addEventListener("optimizedResize", function () {
        init();
    });

}(window));
