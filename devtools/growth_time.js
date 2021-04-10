//https://stackoverflow.com/questions/24027711/is-it-better-to-use-one-or-multiple-requestanimationframe-for-multiple-canvas-ob
// t = time (elapsed), b = initialValue, c = change(FinalValue - initialValue), duration)
var easeArray = [
    //0 - simple linear tweening - no easing, no acceleration
    function linearTween(t, b, c, d) {
        return c*t/d + b;
    },
    //1 - quadratic easing in - accelerating from zero velocity
    function easeInQuad(t, b, c, d) {
        t /= d;
        return c*t*t + b;
    },
    //2 - quadratic easing out - decelerating to zero velocity
    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t*(t-2) + b;
    },
    //3 - quadratic easing in/out - acceleration until halfway, then deceleration
    function easeInOutQuad(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    },
    //4 - cubic easing in - accelerating from zero velocity
    function easeInCubic(t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    },
    //5 - cubic easing out - decelerating to zero velocity
    function easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t + 1) + b;
    },
    //6 - cubic easing in/out - acceleration until halfway, then deceleration
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    },
    //7 - quartic easing in - accelerating from zero velocity
    function easeInQuart(t, b, c, d) {
        t /= d;
        return c*t*t*t*t + b;
    },
    //8 - quartic easing out - decelerating to zero velocity
    function easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t*t*t*t - 1) + b;
    },
    //9 - quartic easing in/out - acceleration until halfway, then deceleration
    function easeInOutQuart(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
        t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
    },
    //10 - quintic easing in - accelerating from zero velocity
    function easeInQuint(t, b, c, d) {
        t /= d;
        return c*t*t*t*t*t + b;
    },
    //11 - quintic easing out - decelerating to zero velocity
    function easeOutQuint(t, b, c, d) {
        t /= d;
        t--;
        return c*(t*t*t*t*t + 1) + b;
    },
    //12 - quintic easing in/out - acceleration until halfway, then deceleration
    function easeInOutQuint(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t*t*t + 2) + b;
    },
    //13 - sinusoidal easing in - accelerating from zero velocity
    function easeInSine(t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    //14 - sinusoidal easing out - decelerating to zero velocity
    function easeOutSine(t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    //15 - sinusoidal easing in/out - accelerating until halfway, then decelerating
    function easeInOutSine(t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    //16 - exponential easing in - accelerating from zero velocity
    function easeInExpo(t, b, c, d) {
        return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
    },
    //17 - exponential easing out - decelerating to zero velocity
    function easeOutExpo(t, b, c, d) {
        return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
    },
    //18 - exponential easing in/out - accelerating until halfway, then decelerating
    function easeInOutExpo(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
        t--;
        return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
    },
    //19 - circular easing in - accelerating from zero velocity
    function easeInCirc(t, b, c, d) {
        t /= d;
        return -c * (Math.sqrt(1 - t*t) - 1) + b;
    },
    //20 - circular easing out - decelerating to zero velocity
    function easeOutCirc(t, b, c, d) {
        t /= d;
        t--;
        return c * Math.sqrt(1 - t*t) + b;
    },
    //21 - circular easing in/out - acceleration until halfway, then deceleration
    function easeInOutCirc(t, b, c, d) {
        t /= d/2;
        if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        t -= 2;
        return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
    }
]