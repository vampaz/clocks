(function (window) {
    'use strict';

    const clockSize = 60;
    let clockSrc;
    let wrapper;

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
        let clocksHtml = '';
        for (let i = n; i >= 1; i--) {
            clocksHtml += template;
        }
        el.innerHTML = clocksHtml;
    }

    function getGrid(size) {
        let docDims = {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        };

        let gridDims = size || 60;

        return Math.floor(docDims.w / gridDims) * Math.floor(docDims.h / gridDims);
    }

    let throttle = function (type, name, obj) {
        obj = obj || window;
        let running = false;
        let func = function () {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function () {
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
