//
//
// 本文件属于Edraw Mindmaster Online项目，著作权所属深圳市亿图软件有限公司。
// 思维导图形状主体功能
//
// Created by Ethan on 2017/11/28
// Copyright @ 2017 - 2018 深圳市亿图软件有限公司(edrawsoft.cn). 保留所有版权.
// 
//
var egMath = /** @class */ (function () {
    function egMath() {
    }
    egMath.log2 = function (x) {
        return Math.log(x) * Math.LOG2E;
    };
    egMath.clamp = function (value, min, max) {
        return value < min ? min : value > max ? max : value;
    };
    egMath.ellipsePoint = function (box, angle) {
        if (box.height < 0.1)
            box.height = 0.1;
        if (angle > 360 || angle < -360)
            angle -= Math.floor(angle / 360) * 360;
        if (angle < -180)
            angle += 360;
        if (angle > 180)
            angle -= 360;
        angle = angle * Math.PI / 180;
        var pt = new egPoint(), realAngle = Math.atan(Math.tan(angle) * box.width / box.height);
        if (angle < 0 && realAngle > 0)
            realAngle -= Math.PI;
        else if (angle > 0 && realAngle < 0)
            realAngle += Math.PI;
        pt.x = box.width * 0.5 * Math.cos(realAngle) + box.x + box.width * 0.5;
        pt.y = box.height * 0.5 * Math.sin(realAngle) + box.y + box.height * 0.5;
        return pt;
    };
    egMath.integrate = function (f, a, b, n) {
        var x = egMath.abscissas[n - 2], w = egMath.weights[n - 2], A = (b - a) * 0.5, B = A + a, i = 0, m = (n + 1) >> 1, sum = n & 1 ? w[i++] * f(B) : 0;
        while (i < m) {
            var Ax = A * x[i];
            sum += w[i++] * (f(B + Ax) + f(B - Ax));
        }
        return A * sum;
    };
    egMath.solveCubic = function (a, b, c, d, roots, min, max) {
        var f = egMath.getNormalizationFactor(Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d)), x, b1, c2, qd, q;
        if (f) {
            a *= f;
            b *= f;
            c *= f;
            d *= f;
        }
        function evaluate(x0) {
            x = x0;
            var tmp = a * x;
            b1 = tmp + b;
            c2 = b1 * x + c;
            qd = (tmp + b1) * x + c2;
            q = c2 * x + d;
        }
        if (Math.abs(a) < egMath.EPSILON) {
            a = b;
            b1 = c;
            c2 = d;
            x = Infinity;
        }
        else if (Math.abs(d) < egMath.EPSILON) {
            b1 = b;
            c2 = c;
            x = 0;
        }
        else {
            evaluate(-(b / a) / 3);
            var t = q / a, r = Math.pow(Math.abs(t), 1 / 3), s = t < 0 ? -1 : 1, td = -qd / a, rd = td > 0 ? 1.324717957244746 * Math.max(r, Math.sqrt(td)) : r, x0 = x - s * rd;
            if (x0 !== x) {
                do {
                    evaluate(x0);
                    x0 = qd === 0 ? x : x - q / qd / (1 + egMath.MACHINE_EPSILON);
                } while (s * x0 > s * x);
                if (Math.abs(a) * x * x > Math.abs(d / x)) {
                    c2 = -d / x;
                    b1 = (c2 - c) / x;
                }
            }
        }
        var count = egMath.solveQuadratic(a, b1, c2, roots, min, max), boundless = min == null;
        if (isFinite(x) && (count === 0
            || count > 0 && x !== roots[0] && x !== roots[1])
            && (boundless || x > min - egMath.EPSILON && x < max + egMath.EPSILON))
            roots[count++] = boundless ? x : egMath.clamp(x, min, max);
        return count;
    };
    egMath.solveQuadratic = function (a, b, c, roots, min, max) {
        var x1, x2 = Infinity;
        if (Math.abs(a) < egMath.EPSILON) {
            if (Math.abs(b) < egMath.EPSILON)
                return Math.abs(c) < egMath.EPSILON ? -1 : 0;
            x1 = -c / b;
        }
        else {
            b *= -0.5;
            var D = egMath.getDiscriminant(a, b, c);
            if (D && Math.abs(D) < egMath.MACHINE_EPSILON) {
                var f = egMath.getNormalizationFactor(Math.abs(a), Math.abs(b), Math.abs(c));
                if (f) {
                    a *= f;
                    b *= f;
                    c *= f;
                    D = egMath.getDiscriminant(a, b, c);
                }
            }
            if (D >= -egMath.MACHINE_EPSILON) {
                var Q = D < 0 ? 0 : Math.sqrt(D), R = b + (b < 0 ? -Q : Q);
                if (R === 0) {
                    x1 = c / a;
                    x2 = -x1;
                }
                else {
                    x1 = R / a;
                    x2 = c / R;
                }
            }
        }
        var count = 0, boundless = min == null, minB = min - egMath.EPSILON, maxB = max + egMath.EPSILON;
        if (isFinite(x1) && (boundless || x1 > minB && x1 < maxB))
            roots[count++] = boundless ? x1 : egMath.clamp(x1, min, max);
        if (x2 !== x1
            && isFinite(x2) && (boundless || x2 > minB && x2 < maxB))
            roots[count++] = boundless ? x2 : egMath.clamp(x2, min, max);
        return count;
    };
    egMath.getDiscriminant = function (a, b, c) {
        function split(v) {
            var x = v * 134217729, y = v - x, hi = y + x, lo = v - hi;
            return [hi, lo];
        }
        var D = b * b - a * c, E = b * b + a * c;
        if (Math.abs(D) * 3 < E) {
            var ad = split(a), bd = split(b), cd = split(c), p = b * b, dp = (bd[0] * bd[0] - p + 2 * bd[0] * bd[1]) + bd[1] * bd[1], q = a * c, dq = (ad[0] * cd[0] - q + ad[0] * cd[1] + ad[1] * cd[0])
                + ad[1] * cd[1];
            D = (p - q) + (dp - dq);
        }
        return D;
    };
    egMath.findRoot = function (f, df, x, a, b, n, tolerance) {
        for (var i = 0; i < n; i++) {
            var fx = f(x), dx = fx / df(x), nx = x - dx;
            if (Math.abs(dx) < tolerance)
                return nx;
            if (fx > 0) {
                b = x;
                x = nx <= a ? (a + b) * 0.5 : nx;
            }
            else {
                a = x;
                x = nx >= b ? (a + b) * 0.5 : nx;
            }
        }
        return x;
    };
    egMath.getNormalizationFactor = function () {
        var vals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vals[_i] = arguments[_i];
        }
        var norm = Math.max.apply(Math, vals);
        return norm && (norm < 1e-8 || norm > 1e8)
            ? Math.pow(2, -Math.round(egMath.log2(norm)))
            : 0;
    };
    egMath.isZero = function (val) {
        return val >= -egMath.EPSILON && val <= egMath.EPSILON;
    };
    egMath.pointEqual1 = function (ptf1, ptf2) {
        return (Math.abs(ptf1.x - ptf2.x) < 1 && Math.abs(ptf1.y - ptf2.y) < 1);
    };
    egMath.distance = function (ptf1, ptf2) {
        return Math.sqrt((ptf1.x - ptf2.x) * (ptf1.x - ptf2.x) + (ptf1.y - ptf2.y) * (ptf1.y - ptf2.y));
    };
    egMath.lineSide = function (ptfS, ptfE, ptfT) {
        var end = (ptfS.x - ptfT.x) * (ptfE.y - ptfT.y) - (ptfS.y - ptfT.y) * (ptfE.x - ptfT.x);
        if (end < 1.0 && end > -1.0) {
            if (egMath.clamp(ptfT.x, ptfE.x, ptfS.x))
                return eLineSide.eSideInter;
            else
                return eLineSide.eSideOuter;
        }
        else if (end > 0) {
            return eLineSide.eSideCW;
        }
        return eLineSide.eSideACW;
    };
    egMath.intNoise_1D = function (x) {
        x = (x << 13) ^ x;
        return (1.0 - ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0);
    };
    egMath.smoothNoise_1D = function (x) {
        //return (intNoise_1D(x) / 2 + intNoise_1D(x - 1) / 4 + intNoise_1D(x + 1) / 4);
        return egMath.intNoise_1D(x); //不做平滑处理
    };
    egMath.cosineInterpolate_1D = function (a, b, x) {
        var ft = x * 3.1415927, f = (1 - Math.cos(ft)) * 0.5;
        return (a * (1 - f) + b * f);
    };
    egMath.cubicInterpolate_1D = function (v0, v1, v2, v3, x) {
        var fp = (v3 - v2) - (v0 - v1), fq = (v0 - v1) - fp, fr = v2 - v0, fs = v1;
        return (fp * x * x * x + fq * x * x + fr * x + fs);
    };
    egMath.interpolateNoise_1D = function (x) {
        var integerX = Math.floor(x), fractionX = x - integerX;
        //余弦插值
        var v1 = egMath.smoothNoise_1D(integerX), v2 = egMath.smoothNoise_1D(integerX + 1);
        return egMath.cosineInterpolate_1D(v1, v2, fractionX);
        //立方插值
        //qreal v0 = smoothNoise_1D(integerX - 1);
        //qreal v1 = smoothNoise_1D(integerX);
        //qreal v2 = smoothNoise_1D(integerX + 1);
        //qreal v3 = smoothNoise_1D(integerX + 1);
        //return cubicInterpolate_1D(v0, v1, v2, v3, fractionX);
    };
    egMath.perlinNoise_1D = function (x) {
        var total = 0, persistence = 0.1, //持续度
        numOctaves = 4; //倍频
        for (var i = 0; i < numOctaves; i++) {
            var frequency = Math.pow(2, i), //频率
            amplitude = Math.pow(persistence, i); //幅度
            total = total + egMath.interpolateNoise_1D(x * frequency) * amplitude;
        }
        return total;
    };
    egMath.abscissas = [
        [0.5773502691896257645091488],
        [0, 0.7745966692414833770358531],
        [0.3399810435848562648026658, 0.8611363115940525752239465],
        [0, 0.5384693101056830910363144, 0.9061798459386639927976269],
        [0.2386191860831969086305017, 0.6612093864662645136613996, 0.9324695142031520278123016],
        [0, 0.4058451513773971669066064, 0.7415311855993944398638648, 0.9491079123427585245261897],
        [0.1834346424956498049394761, 0.5255324099163289858177390, 0.7966664774136267395915539, 0.9602898564975362316835609],
        [0, 0.3242534234038089290385380, 0.6133714327005903973087020, 0.8360311073266357942994298, 0.9681602395076260898355762],
        [0.1488743389816312108848260, 0.4333953941292471907992659, 0.6794095682990244062343274, 0.8650633666889845107320967, 0.9739065285171717200779640],
        [0, 0.2695431559523449723315320, 0.5190961292068118159257257, 0.7301520055740493240934163, 0.8870625997680952990751578, 0.9782286581460569928039380],
        [0.1252334085114689154724414, 0.3678314989981801937526915, 0.5873179542866174472967024, 0.7699026741943046870368938, 0.9041172563704748566784659, 0.9815606342467192506905491],
        [0, 0.2304583159551347940655281, 0.4484927510364468528779129, 0.6423493394403402206439846, 0.8015780907333099127942065, 0.9175983992229779652065478, 0.9841830547185881494728294],
        [0.1080549487073436620662447, 0.3191123689278897604356718, 0.5152486363581540919652907, 0.6872929048116854701480198, 0.8272013150697649931897947, 0.9284348836635735173363911, 0.9862838086968123388415973],
        [0, 0.2011940939974345223006283, 0.3941513470775633698972074, 0.5709721726085388475372267, 0.7244177313601700474161861, 0.8482065834104272162006483, 0.9372733924007059043077589, 0.9879925180204854284895657],
        [0.0950125098376374401853193, 0.2816035507792589132304605, 0.4580167776572273863424194, 0.6178762444026437484466718, 0.7554044083550030338951012, 0.8656312023878317438804679, 0.9445750230732325760779884, 0.9894009349916499325961542]
    ];
    egMath.weights = [
        [1],
        [0.8888888888888888888888889, 0.5555555555555555555555556],
        [0.6521451548625461426269361, 0.3478548451374538573730639],
        [0.5688888888888888888888889, 0.4786286704993664680412915, 0.2369268850561890875142640],
        [0.4679139345726910473898703, 0.3607615730481386075698335, 0.1713244923791703450402961],
        [0.4179591836734693877551020, 0.3818300505051189449503698, 0.2797053914892766679014678, 0.1294849661688696932706114],
        [0.3626837833783619829651504, 0.3137066458778872873379622, 0.2223810344533744705443560, 0.1012285362903762591525314],
        [0.3302393550012597631645251, 0.3123470770400028400686304, 0.2606106964029354623187429, 0.1806481606948574040584720, 0.0812743883615744119718922],
        [0.2955242247147528701738930, 0.2692667193099963550912269, 0.2190863625159820439955349, 0.1494513491505805931457763, 0.0666713443086881375935688],
        [0.2729250867779006307144835, 0.2628045445102466621806889, 0.2331937645919904799185237, 0.1862902109277342514260976, 0.1255803694649046246346943, 0.0556685671161736664827537],
        [0.2491470458134027850005624, 0.2334925365383548087608499, 0.2031674267230659217490645, 0.1600783285433462263346525, 0.1069393259953184309602547, 0.0471753363865118271946160],
        [0.2325515532308739101945895, 0.2262831802628972384120902, 0.2078160475368885023125232, 0.1781459807619457382800467, 0.1388735102197872384636018, 0.0921214998377284479144218, 0.0404840047653158795200216],
        [0.2152638534631577901958764, 0.2051984637212956039659241, 0.1855383974779378137417166, 0.1572031671581935345696019, 0.1215185706879031846894148, 0.0801580871597602098056333, 0.0351194603317518630318329],
        [0.2025782419255612728806202, 0.1984314853271115764561183, 0.1861610000155622110268006, 0.1662692058169939335532009, 0.1395706779261543144478048, 0.1071592204671719350118695, 0.0703660474881081247092674, 0.0307532419961172683546284],
        [0.1894506104550684962853967, 0.1826034150449235888667637, 0.1691565193950025381893121, 0.1495959888165767320815017, 0.1246289712555338720524763, 0.0951585116824927848099251, 0.0622535239386478928628438, 0.0271524594117540948517806]
    ];
    egMath.TOLERANCE = 1e-6;
    egMath.EPSILON = 1e-12;
    egMath.MACHINE_EPSILON = 1.12e-16;
    egMath.CURVETIME_EPSILON = 4e-7;
    egMath.GEOMETRIC_EPSILON = 2e-7;
    egMath.WINDING_EPSILON = 2e-7;
    egMath.TRIGONOMETRIC_EPSILON = 1e-7;
    egMath.CLIPPING_EPSILON = 1e-7;
    egMath.KAPPA = 4 * (Math.sqrt(2) - 1) / 3;
    return egMath;
}());
var egFormatter = /** @class */ (function () {
    function egFormatter(preci) {
        if (preci === void 0) { preci = 5; }
        this._precision = preci;
        this._multiplier = Math.pow(10, this._precision);
    }
    egFormatter.prototype.number = function (val) {
        return Math.round(val * this._multiplier) / this._multiplier;
    };
    egFormatter.prototype.pair = function (val1, val2, separator) {
        return this.number(val1) + (separator || ',') + this.number(val2);
    };
    egFormatter.prototype.point = function (pt, separator) {
        return this.number(pt.x) + (separator || ',') + this.number(pt.y);
    };
    egFormatter.prototype.size = function (sz, separator) {
        return this.number(sz.width) + (separator || ',') + this.number(sz.height);
    };
    egFormatter.prototype.rect = function (rect, separator) {
        return this.number(rect.x) + (separator || ',') + this.number(rect.y) + (separator || ',')
            + this.number(rect.width) + (separator || ',') + this.number(rect.height);
    };
    return egFormatter;
}());
egFormatter.inst = new egFormatter(5);
var egRect = /** @class */ (function () {
    //EDRect(x, y, width, height)
    //EDRect(EDRect)
    //EDRect()
    function egRect() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var count = args.length;
        if (count === 1 && args[0] instanceof egRect) {
            this.setRect(args[0]);
        }
        else if (count == 2 && args[0] instanceof egPoint) {
            var minx = Math.min(args[0].x, args[1].x), maxx = Math.max(args[0].x, args[1].x), miny = Math.min(args[0].y, args[1].y), maxy = Math.max(args[0].y, args[1].y);
            this._x = minx;
            this._y = miny;
            this._width = maxx - minx;
            this._height = maxy - miny;
        }
        else if (count === 4) {
            this._x = args[0];
            this._y = args[1];
            this._width = args[2];
            this._height = args[3];
        }
        else
            this.reset();
    }
    Object.defineProperty(egRect.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egRect.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egRect.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (w) {
            this._width = w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egRect.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (h) {
            this._height = h;
        },
        enumerable: false,
        configurable: true
    });
    egRect.prototype.top = function () {
        return this._y;
    };
    egRect.prototype.left = function () {
        return this._x;
    };
    egRect.prototype.moveLeft = function (x) {
        this.x = x;
    };
    egRect.prototype.moveRight = function (x) {
        this.x = x - this._width;
    };
    egRect.prototype.moveTop = function (x) {
        this.y = x;
    };
    egRect.prototype.moveTopLeft = function (pt) {
        this.x = pt.x;
        this.y = pt.y;
    };
    egRect.prototype.set = function (x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        return this;
    };
    egRect.prototype.setRect = function (rect) {
        this._x = rect.x;
        this._y = rect.y;
        this._width = rect.width;
        this._height = rect.height;
        return this;
    };
    egRect.prototype.assign = function (rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
    };
    egRect.prototype.clone_ = function () {
        return new egRect(this.x, this.y, this.width, this.height);
    };
    egRect.prototype.equals = function (rc) {
        return rc === this
            || rc && this.x === rc.x && this.y === rc.y
                && this.width === rc.width && this.height === rc.height
            || false;
    };
    egRect.prototype.toString = function () {
        var f = egFormatter.inst;
        return '{ x: ' + f.number(this.x)
            + ', y: ' + f.number(this.y)
            + ', width: ' + f.number(this.width)
            + ', height: ' + f.number(this.height)
            + ' }';
    };
    egRect.prototype.isEmpty = function () {
        return this._width < 1e-12 || this._height < 1e-12 || false;
    };
    egRect.prototype.getArea = function () {
        return this.width * this.height;
    };
    egRect.prototype.reset = function () {
        this._x = this._y = this._width = this._height = 0;
    };
    egRect.prototype.right = function () {
        return this._x + this._width;
    };
    egRect.prototype.bottom = function () {
        return this._y + this._height;
    };
    egRect.prototype.containsPt = function (pt) {
        return pt.x >= this._x && pt.x <= this._x + this._width
            && pt.y >= this._y && pt.y <= this._y + this._height;
    };
    //containsRect(rect: egRect): boolean {
    //    return rect.x >= this.x && rect.y >= this.y
    //        && rect.x + rect.width <= this.x + this.width
    //        && rect.y + rect.height <= this.y + this.height;
    //}
    egRect.prototype.intersect = function (rect) {
        var x1 = Math.max(this.x, rect.x), y1 = Math.max(this.y, rect.y), x2 = Math.min(this.x + this.width, rect.x + rect.width), y2 = Math.min(this.y + this.height, rect.y + rect.height);
        return new egRect(x1, y1, x2 - x1, y2 - y1);
    };
    egRect.prototype.intersects = function (rect) {
        return rect.x + rect.width > this.x
            && rect.y + rect.height > this.y
            && rect.x < this.x + this.width
            && rect.y < this.y + this.height;
    };
    egRect.prototype.touches = function (rect) {
        return rect.x + rect.width >= this.x
            && rect.y + rect.height >= this.y
            && rect.x <= this.x + this.width
            && rect.y <= this.y + this.height;
    };
    egRect.prototype.unite = function (rect) {
        if (rect.width <= 0 || rect.height <= 0)
            return new egRect(this);
        else if (this.width <= 0 || this.height <= 0)
            return new egRect(rect);
        var x1 = Math.min(this.x, rect.x), y1 = Math.min(this.y, rect.y), x2 = Math.max(this.x + this.width, rect.x + rect.width), y2 = Math.max(this.y + this.height, rect.y + rect.height);
        return new egRect(x1, y1, x2 - x1, y2 - y1);
    };
    egRect.prototype.united = function (rect) {
        if (rect.width <= 0 || rect.height <= 0)
            return;
        else if (this.width <= 0 || this.height <= 0)
            this.setRect(rect);
        else {
            var x1 = Math.min(this.x, rect.x), y1 = Math.min(this.y, rect.y), x2 = Math.max(this.x + this.width, rect.x + rect.width), y2 = Math.max(this.y + this.height, rect.y + rect.height);
            this.x = x1;
            this.y = y1;
            this.width = x2 - x1;
            this.height = y2 - y1;
        }
    };
    egRect.prototype.include = function (pt) {
        var x1 = Math.min(this.x, pt.x), y1 = Math.min(this.y, pt.y), x2 = Math.max(this.x + this.width, pt.x), y2 = Math.max(this.y + this.height, pt.y);
        return new egRect(x1, y1, x2 - x1, y2 - y1);
    };
    egRect.prototype.expand = function (arg) {
        var hor = 0, ver = 0;
        if (typeof arg === 'number')
            hor = ver = arg;
        else if (arg instanceof egSize) {
            hor = arg.width;
            ver = arg.height;
        }
        return new egRect(this.x - hor / 2, this.y - ver / 2, this.width + hor, this.height + ver);
    };
    egRect.prototype.adjust = function (x1, y1, x2, y2) {
        this.x += x1;
        this.y += y1;
        this.width += x2 - x1;
        this.height += y2 - y1;
        return this;
    };
    egRect.prototype.translate = function (offx, offy) {
        this.x += offx;
        this.y += offy;
    };
    egRect.prototype.topLeft = function () {
        return new egPoint(this.x, this.y);
    };
    egRect.prototype.topRight = function () {
        return new egPoint(this.x + this._width, this.y);
    };
    egRect.prototype.bottomLeft = function () {
        return new egPoint(this.x, this.y + this._height);
    };
    egRect.prototype.bottomRight = function () {
        return new egPoint(this.x + this._width, this.y + this._height);
    };
    egRect.prototype.center = function () {
        return new egPoint(this._x + this._width * 0.5, this._y + this._height * 0.5);
    };
    egRect.prototype.size = function () {
        return new egSize(this._width, this._height);
    };
    egRect.prototype.moveCenter = function (pt) {
        this._x = pt.x - this._width * 0.5;
        this._y = pt.y - this._height * 0.5;
        return this;
    };
    egRect.prototype.zoom = function (rate) {
        return new egRect(this._x * rate, this._y * rate, this._width * rate, this._height * rate);
    };
    egRect.prototype.pin = function () {
        return new egPoint(this.x + this.width / 2, this.y + this.height / 2);
    };
    egRect.prototype.toPath = function () {
        var path = new EDPath();
        path.moveTo(this.x, this.y);
        path.lineTo(this.x + this.width, this.y);
        path.lineTo(this.x + this.width, this.y + this.height);
        path.lineTo(this.x, this.y + this.height);
        path.closeSubpath();
        return path;
    };
    return egRect;
}());
var egSize = /** @class */ (function () {
    function egSize(arg0, arg1) {
        if (typeof arg0 === 'number') {
            this._width = arg0;
            this._height = arg1 && typeof arg1 === 'number' ? arg1 : arg0;
        }
        else if (Array.isArray(arg0)) {
            this._width = arg0[0];
            this._height = arg0.length > 1 ? arg0[1] : arg0[0];
        }
    }
    Object.defineProperty(egSize.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (w) {
            this._width = w;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egSize.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (h) {
            this._height = h;
        },
        enumerable: false,
        configurable: true
    });
    egSize.prototype.set = function (width, height) {
        this._width = width;
        this._height = height;
        return this;
    };
    egSize.prototype.isEmpty = function () {
        return this.width < 1 || this.height < 1;
    };
    egSize.prototype.equals = function (size) {
        return size === this || size && (this.width === size.width
            && this.height === size.height
            || Array.isArray(size) && this.width === size[0]
                && this.height === size[1]) || false;
    };
    egSize.prototype.clone_ = function () {
        return new egSize(this.width, this.height);
    };
    egSize.prototype.add = function (arg) {
        if (arg instanceof egSize)
            return new egSize(this.width + arg.width, this.height + arg.height);
        else if (typeof arg === 'number')
            return new egSize(this.width + arg, this.height + arg);
    };
    egSize.prototype.multiply = function (arg) {
        if (arg instanceof egSize)
            return new egSize(this.width * arg.width, this.height * arg.height);
        else if (typeof arg === 'number')
            return new egSize(this.width * arg, this.height * arg);
    };
    return egSize;
}());
var egMargin = /** @class */ (function () {
    function egMargin(left, top, right, bottom) {
        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;
    }
    Object.defineProperty(egMargin.prototype, "left", {
        get: function () {
            return this._left;
        },
        set: function (v) {
            this._left = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egMargin.prototype, "right", {
        get: function () {
            return this._right;
        },
        set: function (v) {
            this._right = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egMargin.prototype, "top", {
        get: function () {
            return this._top;
        },
        set: function (v) {
            this._top = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egMargin.prototype, "bottom", {
        get: function () {
            return this._bottom;
        },
        set: function (v) {
            this._bottom = v;
        },
        enumerable: false,
        configurable: true
    });
    egMargin.prototype.set = function (left, top, right, bottom) {
        this._left = left;
        this._top = top;
        this.right = right;
        this._bottom = bottom;
    };
    egMargin.prototype.assign_ = function (other) {
        this.left = other.left;
        this.top = other.top;
        this.right = other.right;
        this.bottom = other.bottom;
    };
    egMargin.prototype.isEmpty = function () {
        return this._left == 0 && this._right == 0 && this._top == 0 && this._bottom == 0;
    };
    egMargin.prototype.clone_ = function () {
        return new egMargin(this._left, this._top, this._right, this._bottom);
    };
    return egMargin;
}());
var egPoint = /** @class */ (function () {
    function egPoint(x, y) {
        if (x instanceof egPoint) {
            this._x = x.x;
            this._y = x.y;
        }
        else {
            this._x = x ? x : 0;
            this._y = y ? y : 0;
        }
    }
    Object.defineProperty(egPoint.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(egPoint.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
        },
        enumerable: false,
        configurable: true
    });
    egPoint.prototype.set = function (x, y) {
        this._x = x;
        this._y = y;
        return this;
    };
    egPoint.prototype.setPt = function (pt) {
        this.x = pt.x;
        this.y = pt.y;
        return this;
    };
    egPoint.prototype.equals = function (pt) {
        return this === pt || pt
            && (this.x === pt.x && this.y === pt.y
                || Array.isArray(pt)
                    && this.x === pt[0] && this.y === pt[1])
            || false;
    };
    egPoint.prototype.equals2 = function (pt, tolerance) {
        if (tolerance === void 0) { tolerance = 1e-5; }
        return this === pt || pt && Math.abs(pt.x - this.x) < tolerance && Math.abs(pt.y - this.y) < tolerance || false;
    };
    egPoint.prototype.clone_ = function () {
        return new egPoint(this.x, this.y);
    };
    egPoint.prototype.toString = function () {
        return egFormatter.inst.point(this);
    };
    egPoint.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    egPoint.prototype.setLength = function (length) {
        var scale = length / this.getLength();
        this.set(this.x * scale, this.y * scale);
    };
    egPoint.prototype.getAngle = function (pt) {
        return this.getAngleInRadians.apply(this, pt) * 180 / Math.PI;
    };
    egPoint.prototype.setAngle = function (angle) {
        this.setAngleInRadians.call(this, angle * Math.PI / 180);
    };
    egPoint.prototype.getAngleInRadians = function (pt) {
        if (!pt) {
            return this.isZero()
                ? 0
                : Math.atan2(this.y, this.x);
        }
        else {
            var div = this.getLength() * pt.getLength();
            if (egMath.isZero(div)) {
                return NaN;
            }
            else {
                var a = this.dot(pt) / div;
                return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
            }
        }
    };
    egPoint.prototype.setAngleInRadians = function (angle) {
        if (!this.isZero()) {
            var length = this.getLength();
            this.set(Math.cos(angle) * length, Math.sin(angle) * length);
        }
    };
    egPoint.prototype.getQuadrant = function () {
        return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
    };
    egPoint.prototype.getDirectedAngle = function (pt) {
        return Math.atan2(this.cross(pt), this.dot(pt)) * 180 / Math.PI;
    };
    egPoint.prototype.getDistance = function (pt, squared) {
        var x = pt.x - this.x, y = pt.y - this.y, d = x * x + y * y;
        return squared ? d : Math.sqrt(d);
    };
    egPoint.prototype.normalize = function (length) {
        if (length === undefined)
            length = 1;
        var current = this.getLength(), scale = current !== 0 ? length / current : 0, point = new egPoint(this.x * scale, this.y * scale);
        return point;
    };
    egPoint.prototype.rotate = function (angle, center) {
        if (angle === 0)
            return this.clone_();
        angle = angle * Math.PI / 180;
        var point = center ? this.subtract(center) : this, sin = Math.sin(angle), cos = Math.cos(angle);
        point = new egPoint(point.x * cos - point.y * sin, point.x * sin + point.y * cos);
        return center ? point.add(center) : point;
    };
    egPoint.prototype.translated = function (x, y) {
        this.x += x;
        this.y += y;
    };
    egPoint.prototype.transform = function (mx) {
        return mx ? mx.transformPoint(this) : this;
    };
    egPoint.prototype.add = function (pt) {
        return new egPoint(this.x + pt.x, this.y + pt.y);
    };
    egPoint.prototype.subtract = function (pt) {
        return new egPoint(this.x - pt.x, this.y - pt.y);
    };
    egPoint.prototype.multiply = function (v) {
        if (v instanceof egPoint)
            return new egPoint(this.x * v.x, this.y * v.y);
        else
            return new egPoint(this.x * v, this.y * v);
    };
    egPoint.prototype.divide = function (v) {
        if (v instanceof egPoint)
            return new egPoint(this.x / v.x, this.y / v.y);
        else if (v instanceof egSize)
            return new egPoint(this.x / v.width, this.y / v.height);
        else
            return new egPoint(this.x / v, this.y / v);
    };
    egPoint.prototype.modulo = function (v) {
        if (v instanceof egPoint)
            return new egPoint(this.x % v.x, this.y % v.y);
        else
            return new egPoint(this.x % v, this.y % v);
    };
    egPoint.prototype.negate = function () {
        return new egPoint(-this.x, -this.y);
    };
    egPoint.prototype.isInside = function (rc) {
        return rc.containsPt(this);
    };
    egPoint.prototype.isClose = function (pt, tolerance) {
        if (tolerance === void 0) { tolerance = 0.1; }
        return this.getDistance(pt) < tolerance;
        //return Math.abs(this.x - pt.x) < tolerance && Math.abs(this.y - pt.y) < tolerance;
    };
    egPoint.prototype.isCollinear = function (pt) {
        return egPoint.isCollinear(this.x, this.y, pt.x, pt.y);
    };
    egPoint.prototype.isOrthogonal = function (pt) {
        return egPoint.isOrthogonal(this.x, this.y, pt.x, pt.y);
    };
    egPoint.prototype.isZero = function () {
        return egMath.isZero(this.x) && egMath.isZero(this.y);
    };
    egPoint.prototype.isNaN = function () {
        return isNaN(this.x) || isNaN(this.y);
    };
    egPoint.prototype.dot = function (pt) {
        return this._x * pt._x + this._y * pt._y;
    };
    egPoint.prototype.cross = function (pt) {
        return this._x * pt._y - this._y * pt._x;
    };
    egPoint.prototype.project = function (pt) {
        var scale = pt.isZero() ? 0 : this.dot(pt) / pt.dot(pt);
        return new egPoint(pt.x * scale, pt.y * scale);
    };
    egPoint.min = function (pt1, pt2) {
        return new egPoint(Math.min(pt1.x, pt2.x), Math.min(pt1.y, pt2.y));
    };
    egPoint.max = function (pt1, pt2) {
        return new egPoint(Math.max(pt1.x, pt2.x), Math.max(pt1.y, pt2.y));
    };
    egPoint.prototype.random = function () {
        return new egPoint(Math.random(), Math.random());
    };
    egPoint.isCollinear = function (x1, y1, x2, y2) {
        return Math.abs(x1 * y2 - y1 * x2)
            <= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
                * 1e-7;
    };
    egPoint.isOrthogonal = function (x1, y1, x2, y2) {
        return Math.abs(x1 * x2 + y1 * y2)
            <= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
                * 1e-7;
    };
    egPoint.prototype.round = function () {
        return new egPoint(Math.round(this.x), Math.round(this.y));
    };
    return egPoint;
}());
//3 x 3 transform 
var egMatrix = /** @class */ (function () {
    function egMatrix() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var count = args.length;
        if (count === 1) {
            if (args[0] instanceof egMatrix)
                this.set(args[0]._a, args[0]._b, args[0]._c, args[0]._d, args[0]._tx, args[0]._ty);
        }
        else if (count === 6) {
            this.set(args[0], args[1], args[2], args[3], args[4], args[5]);
        }
        else
            this.reset();
    }
    egMatrix.prototype.reset = function () {
        this._a = this._d = 1;
        this._b = this._c = this._tx = this._ty = 0;
    };
    egMatrix.prototype.set = function (a, b, c, d, tx, ty) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._d = d;
        this._tx = tx;
        this._ty = ty;
    };
    egMatrix.prototype.clone_ = function () {
        return new egMatrix(this);
    };
    egMatrix.prototype.equals = function (max) {
        return max === this || max && this._a === max._a && this._b === max._b
            && this._c === max._c && this._d === max._d && this._tx === max._tx && this._ty === max._ty
            || false;
    };
    egMatrix.prototype.toString = function () {
        var f = egFormatter.inst;
        return '[[' + [f.number(this._a), f.number(this._c),
            f.number(this._tx)].join(', ') + '], ['
            + [f.number(this._b), f.number(this._d),
                f.number(this._ty)].join(', ') + ']]';
    };
    egMatrix.prototype.toCSSString = function () {
        return 'matrix(' + this._a + ',' + this._b + ',' + this._c + ',' + this._d + ',' + this._tx + ',' + this._ty + ')';
    };
    egMatrix.prototype.translate = function (x, y) {
        var tx, ty;
        if (tx instanceof egPoint) {
            tx = x.x;
            ty = x.y;
        }
        else {
            tx = x;
            ty = y;
        }
        this._tx += tx * this._a + ty * this._c;
        this._ty += tx * this._b + ty * this._d;
        return this;
    };
    egMatrix.prototype.translated = function (x, y) {
        return this.clone_().translate(x, y);
    };
    egMatrix.prototype.scale = function (sx, sy, cpt) {
        if (cpt)
            this.translate(cpt);
        this._a *= sx;
        this._b *= sx;
        this._c *= sy;
        this._d *= sy;
        if (cpt)
            this.translate(cpt.negate());
        return this;
    };
    egMatrix.prototype.scaled = function (sx, sy, cpt) {
        return this.clone_().scale(sx, sy, cpt);
    };
    egMatrix.prototype.rotate = function (angle) {
        angle *= Math.PI / 180;
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var a = this._a;
        var b = this._b;
        var c = this._c;
        var d = this._d;
        this._a = cos * a + sin * c;
        this._b = cos * b + sin * d;
        this._c = -sin * a + cos * c;
        this._d = -sin * b + cos * d;
        return this;
    };
    egMatrix.prototype.rotateAt = function (angle, cpt) {
        return this.translate(-cpt.x, -cpt.y).rotate(angle).translate(cpt.x, cpt.y);
    };
    egMatrix.prototype.shear = function (x, y, cpt) {
        if (cpt)
            this.translate(cpt);
        var a = this._a, b = this._b;
        this._a += y * this._c;
        this._b += y * this._d;
        this._c += x * a;
        this._d += x * b;
        if (cpt)
            this.translate(cpt.negate());
        return this;
    };
    egMatrix.prototype.skew = function (x, y, cpt) {
        var toRadians = Math.PI / 180;
        var sx = Math.tan(x * toRadians), sy = Math.tan(y * toRadians);
        return this.shear(sx, sy, cpt);
    };
    egMatrix.prototype.prepend = function (mx) {
        if (mx) {
            var a1 = this._a, b1 = this._b, c1 = this._c, d1 = this._d, a2 = mx._a, b2 = mx._c, c2 = mx._b, d2 = mx._d, tx2 = mx._tx, ty2 = mx._ty;
            this._a = a2 * a1 + c2 * c1;
            this._c = b2 * a1 + d2 * c1;
            this._b = a2 * b1 + c2 * d1;
            this._d = b2 * b1 + d2 * d1;
            this._tx += tx2 * a1 + ty2 * c1;
            this._ty += tx2 * b1 + ty2 * d1;
        }
        return this;
    };
    egMatrix.prototype.append = function (mx) {
        if (mx) {
            var a1 = this._a, b1 = this._b, c1 = this._c, d1 = this._d, tx1 = this._tx, ty1 = this._ty, a2 = mx._a, b2 = mx._c, c2 = mx._b, d2 = mx._d, tx2 = mx._tx, ty2 = mx._ty;
            this._a = a2 * a1 + b2 * b1;
            this._c = a2 * c1 + b2 * d1;
            this._b = c2 * a1 + d2 * b1;
            this._d = c2 * c1 + d2 * d1;
            this._tx = a2 * tx1 + b2 * ty1 + tx2;
            this._ty = c2 * tx1 + d2 * ty1 + ty2;
        }
        return this;
    };
    egMatrix.prototype.appended = function (mx) {
        return this.clone_().append(mx);
    };
    egMatrix.prototype.prepended = function (mx) {
        return this.clone_().prepend(mx);
    };
    egMatrix.prototype.invert = function () {
        var a = this._a, b = this._b, c = this._c, d = this._d, tx = this._tx, ty = this._ty, det = a * d - b * c, res = null;
        if (det && !isNaN(det) && isFinite(tx) && isFinite(ty)) {
            this._a = d / det;
            this._b = -b / det;
            this._c = -c / det;
            this._d = a / det;
            this._tx = (c * ty - d * tx) / det;
            this._ty = (b * tx - a * ty) / det;
            res = this;
        }
        return res;
    };
    egMatrix.prototype.inverted = function () {
        return this.clone_().invert();
    };
    egMatrix.prototype._shiftless = function () {
        return new egMatrix(this._a, this._b, this._c, this._d, 0, 0);
    };
    egMatrix.prototype._orNullIfIdentity = function () {
        return this.isIdentity() ? null : this;
    };
    egMatrix.prototype.isIdentity = function () {
        return this._a === 1 && this._b === 0 && this._c === 0 && this._d === 1
            && this._tx === 0 && this._ty === 0;
    };
    egMatrix.prototype.isInvertible = function () {
        var det = this._a * this._d - this._c * this._b;
        return det && !isNaN(det) && isFinite(this._tx) && isFinite(this._ty);
    };
    egMatrix.prototype.isSingular = function () {
        return !this.isInvertible();
    };
    egMatrix.prototype.transformPoint = function (pt) {
        var x = pt.x * this._a + pt.y * this._c + this._tx, y = pt.x * this._b + pt.y * this._d + this._ty;
        return new egPoint(x, y);
    };
    egMatrix.prototype.transformPoints = function (pts) {
        var x, y;
        for (var i = 0, l = pts.length; i < l; i++) {
            x = pts[i].x * this._a + pts[i].y * this._c + this._tx;
            y = pts[i].x * this._b + pts[i].y * this._d + this._ty;
            pts[i].x = x;
            pts[i].y = y;
        }
        return pts;
    };
    egMatrix.prototype.transformXY = function (x, y) {
        var x1 = x * this._a + y * this._c + this._tx, y1 = x * this._b + y * this._d + this._ty;
        return new Array(x1, y1);
    };
    egMatrix.prototype.transformCoords = function (src, dst, count) {
        for (var i = 0, max = 2 * count; i < max; i += 2) {
            var x = src[i], y = src[i + 1];
            dst[i] = x * this._a + y * this._c + this._tx;
            dst[i + 1] = x * this._b + y * this._d + this._ty;
        }
        return dst;
    };
    egMatrix.prototype._transformCorners = function (rect) {
        var x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height, coords = [x1, y1, x2, y1, x2, y2, x1, y2];
        return this.transformCoords(coords, coords, 4);
    };
    egMatrix.prototype.transformBounds = function (bounds) {
        var coords = this._transformCorners(bounds), min = coords.slice(0, 2), max = min.slice();
        for (var i = 2; i < 8; i++) {
            var val = coords[i], j = i & 1;
            if (val < min[j]) {
                min[j] = val;
            }
            else if (val > max[j]) {
                max[j] = val;
            }
        }
        var dest = new egRect();
        return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    };
    return egMatrix;
}());
var egBezier = /** @class */ (function () {
    function egBezier(arg, pt2, pt3, pt4) {
        this._x1 = this._y1 = this._x2 = this._y2 = this._x3 = this._y3 = this._x4 = this._y4 = 0;
        if (arg) {
            if (arg instanceof egBezier) {
                this._x1 = arg._x1;
                this._y1 = arg._y1;
                this._x2 = arg._x2;
                this._y2 = arg._y2;
                this._x3 = arg._x3;
                this._y3 = arg._y3;
                this._x4 = arg._x4;
                this._y4 = arg._y4;
            }
            else if (arg instanceof egPoint) {
                this._x1 = arg.x;
                this._y1 = arg.y;
                this._x2 = pt2.x;
                this._y2 = pt2.y;
                this._x3 = pt3.x;
                this._y3 = pt3.y;
                this._x4 = pt4.x;
                this._y4 = pt4.y;
            }
        }
    }
    egBezier.prototype.pt1 = function () {
        return new egPoint(this._x1, this._y1);
    };
    egBezier.prototype.pt2 = function () {
        return new egPoint(this._x2, this._y2);
    };
    egBezier.prototype.pt3 = function () {
        return new egPoint(this._x3, this._y3);
    };
    egBezier.prototype.pt4 = function () {
        return new egPoint(this._x4, this._y4);
    };
    egBezier.prototype.parameterSplitLeft = function (t) {
        var left = new egBezier();
        left._x1 = this._x1;
        left._y1 = this._y1;
        left._x2 = this._x1 + t * (this._x2 - this._x1);
        left._y2 = this._y1 + t * (this._y2 - this._y1);
        left._x3 = this._x2 + t * (this._x3 - this._x2); // temporary holding spot
        left._y3 = this._y2 + t * (this._y3 - this._y2); // temporary holding spot
        this._x3 = this._x3 + t * (this._x4 - this._x3);
        this._y3 = this._y3 + t * (this._y4 - this._y3);
        this._x2 = left._x3 + t * (this._x3 - left._x3);
        this._y2 = left._y3 + t * (this._y3 - left._y3);
        left._x3 = left._x2 + t * (left._x3 - left._x2);
        left._y3 = left._y2 + t * (left._y3 - left._y2);
        left._x4 = this._x1 = left._x3 + t * (this._x2 - left._x3);
        left._y4 = this._y1 = left._y3 + t * (this._y2 - left._y3);
        return left;
    };
    egBezier.prototype.bezierOnInterval = function (t0, t1) {
        var bezier = new egBezier(this);
        if (t0 == 0 && t1 == 1)
            return bezier;
        bezier.parameterSplitLeft(t0);
        var trueT = (t1 - t0) / (1 - t0), result = bezier.parameterSplitLeft(trueT);
        return result;
    };
    //convert arc to bezier points
    egBezier.arcToBezier = function (rect, startAngle, sweepLength, curves) {
        if (isNaN(rect.x) || isNaN(rect.y) || isNaN(rect.width) || isNaN(rect.height)
            || isNaN(startAngle) || isNaN(sweepLength)) {
            console.log("Edraw: Err 121");
            return new egPoint();
        }
        if (rect.isEmpty()) {
            return new egPoint();
        }
        var x = rect.x, y = rect.y, w = rect.width, w2 = rect.width * 0.5, w2k = w2 * egMath.KAPPA, h = rect.height, h2 = rect.height * 0.5, h2k = h2 * egMath.KAPPA, points = [
            new egPoint(x + w, y + h2),
            // 0 -> 270 degrees
            new egPoint(x + w, y + h2 + h2k),
            new egPoint(x + w2 + w2k, y + h),
            new egPoint(x + w2, y + h),
            // 270 -> 180 degrees
            new egPoint(x + w2 - w2k, y + h),
            new egPoint(x, y + h2 + h2k),
            new egPoint(x, y + h2),
            // 180 -> 90 degrees
            new egPoint(x, y + h2 - h2k),
            new egPoint(x + w2 - w2k, y),
            new egPoint(x + w2, y),
            // 90 -> 0 degrees
            new egPoint(x + w2 + w2k, y),
            new egPoint(x + w, y + h2 - h2k),
            new egPoint(x + w, y + h2)
        ];
        if (sweepLength > 360)
            sweepLength = 360;
        else if (sweepLength < -360)
            sweepLength = -360;
        // Special case fast paths
        if (startAngle == 0.0) {
            if (sweepLength == 360.0) {
                for (var i = 11; i >= 0; --i)
                    curves.push(points[i]);
                return points[12];
            }
            else if (sweepLength == -360.0) {
                for (var i = 1; i <= 12; ++i)
                    curves.push(points[i]);
                return points[0];
            }
        }
        var startSegment = Math.floor(startAngle / 90), endSegment = Math.floor((startAngle + sweepLength) / 90), startT = (startAngle - startSegment * 90) / 90, endT = (startAngle + sweepLength - endSegment * 90) / 90, delta = sweepLength > 0 ? 1 : -1;
        if (delta < 0) {
            startT = 1 - startT;
            endT = 1 - endT;
        }
        // avoid empty start segment
        if (egMath.isZero(startT - 1)) {
            startT = 0;
            startSegment += delta;
        }
        // avoid empty end segment
        if (egMath.isZero(endT)) {
            endT = 1;
            endSegment -= delta;
        }
        startT = egBezier.arcAngle(startT * 90);
        endT = egBezier.arcAngle(endT * 90);
        var splitAtStart = !egMath.isZero(startT), splitAtEnd = !egMath.isZero(endT - 1), end = endSegment + delta;
        // empty arc?
        if (startSegment == end) {
            var quadrant = 3 - ((startSegment % 4) + 4) % 4, j = 3 * quadrant;
            return delta > 0 ? points[j + 3] : points[j];
        }
        var startPoint = egMath.ellipsePoint(rect, -startAngle), endPoint = egMath.ellipsePoint(rect, -startAngle - sweepLength);
        for (var i = startSegment; i != end; i += delta) {
            var quadrant = 3 - ((i % 4) + 4) % 4, j = 3 * quadrant, b = undefined;
            if (delta > 0)
                b = new egBezier(points[j + 3], points[j + 2], points[j + 1], points[j]);
            else
                b = new egBezier(points[j], points[j + 1], points[j + 2], points[j + 3]);
            // empty arc?
            if (startSegment == endSegment && egMath.isZero(startT - endT))
                return startPoint;
            if (i == startSegment) {
                if (i == endSegment && splitAtEnd)
                    b = b.bezierOnInterval(startT, endT);
                else if (splitAtStart)
                    b = b.bezierOnInterval(startT, 1);
            }
            else if (i == endSegment && splitAtEnd) {
                b = b.bezierOnInterval(0, endT);
            }
            // push control points
            curves.push(b.pt2());
            curves.push(b.pt3());
            curves.push(b.pt4());
        }
        if (curves.length > 0)
            curves[curves.length - 1] = endPoint;
        return startPoint;
    };
    egBezier.arcAngle = function (angle) {
        if (egMath.isZero(angle))
            return 0;
        if (egMath.isZero(angle - 90))
            return 1;
        var radians = Math.PI * angle / 180, cosAngle = Math.cos(radians), sinAngle = Math.sin(radians);
        // initial guess
        var tc = angle / 90;
        // do some iterations of newton's method to approximate cosAngle
        // finds the zero of the function b.pointAt(tc).x() - cosAngle
        tc -= ((((2 - 3 * egMath.KAPPA) * tc + 3 * (egMath.KAPPA - 1)) * tc) * tc + 1 - cosAngle) // value
            / (((6 - 9 * egMath.KAPPA) * tc + 6 * (egMath.KAPPA - 1)) * tc); // derivative
        tc -= ((((2 - 3 * egMath.KAPPA) * tc + 3 * (egMath.KAPPA - 1)) * tc) * tc + 1 - cosAngle) // value
            / (((6 - 9 * egMath.KAPPA) * tc + 6 * (egMath.KAPPA - 1)) * tc); // derivative
        // initial guess
        var ts = tc;
        // do some iterations of newton's method to approximate sinAngle
        // finds the zero of the function b.pointAt(tc).y() - sinAngle
        ts -= ((((3 * egMath.KAPPA - 2) * ts - 6 * egMath.KAPPA + 3) * ts + 3 * egMath.KAPPA) * ts - sinAngle)
            / (((9 * egMath.KAPPA - 6) * ts + 12 * egMath.KAPPA - 6) * ts + 3 * egMath.KAPPA);
        ts -= ((((3 * egMath.KAPPA - 2) * ts - 6 * egMath.KAPPA + 3) * ts + 3 * egMath.KAPPA) * ts - sinAngle)
            / (((9 * egMath.KAPPA - 6) * ts + 12 * egMath.KAPPA - 6) * ts + 3 * egMath.KAPPA);
        // use the average of the t that best approximates cosAngle
        // and the t that best approximates sinAngle
        var t = 0.5 * (tc + ts);
        return t;
    };
    return egBezier;
}());
var egLine = /** @class */ (function () {
    function egLine() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var asVector = false;
        if (args.length >= 4) {
            this._px = args[0];
            this._py = args[1];
            this._vx = args[2];
            this._vy = args[3];
            asVector = args[4];
        }
        else {
            this._px = args[0].x;
            this._py = args[0].y;
            this._vx = args[1].x;
            this._vy = args[1].y;
            asVector = args[2];
        }
        if (!asVector) {
            this._vx -= this._px;
            this._vy -= this._py;
        }
    }
    egLine.prototype.getPoint = function () {
        return new egPoint(this._px, this._py);
    };
    egLine.prototype.getVector = function () {
        return new egPoint(this._vx, this._vy);
    };
    egLine.prototype.getLength = function () {
        return this.getVector().getLength();
    };
    egLine.prototype.intersect = function (line, isInfinite) {
        return egLine.intersect(this._px, this._py, this._vx, this._vy, line._px, line._py, line._vx, line._vy, true, isInfinite);
    };
    egLine.prototype.getSide = function (point, isInfinite) {
        return egLine.getSide(this._px, this._py, this._vx, this._vy, point.x, point.y, true, isInfinite);
    };
    egLine.prototype.getDistance = function (point) {
        return Math.abs(egLine.getSignedDistance(this._px, this._py, this._vx, this._vy, point.x, point.y, true));
    };
    egLine.prototype.isCollinear = function (line) {
        return egPoint.isCollinear(this._vx, this._vy, line._vx, line._vy);
    };
    egLine.prototype.isOrthogonal = function (line) {
        return egPoint.isOrthogonal(this._vx, this._vy, line._vx, line._vy);
    };
    egLine.intersect = function (p1x, p1y, v1x, v1y, p2x, p2y, v2x, v2y, asVector, isInfinite) {
        if (!asVector) {
            v1x -= p1x;
            v1y -= p1y;
            v2x -= p2x;
            v2y -= p2y;
        }
        var cross = v1x * v2y - v1y * v2x;
        if (!egMath.isZero(cross)) {
            var dx = p1x - p2x, dy = p1y - p2y, u1 = (v2x * dy - v2y * dx) / cross, u2 = (v1x * dy - v1y * dx) / cross, epsilon = 1e-12, uMin = -epsilon, uMax = 1 + epsilon;
            if (isInfinite
                || uMin < u1 && u1 < uMax && uMin < u2 && u2 < uMax) {
                if (!isInfinite) {
                    u1 = u1 <= 0 ? 0 : u1 >= 1 ? 1 : u1;
                }
                return new egPoint(p1x + u1 * v1x, p1y + u1 * v1y);
            }
        }
    };
    egLine.getSide = function (px, py, vx, vy, x, y, asVector, isInfinite) {
        if (!asVector) {
            vx -= px;
            vy -= py;
        }
        var v2x = x - px, v2y = y - py, ccw = v2x * vy - v2y * vx;
        if (ccw === 0 && !isInfinite) {
            ccw = (v2x * vx + v2x * vx) / (vx * vx + vy * vy);
            if (ccw >= 0 && ccw <= 1)
                ccw = 0;
        }
        return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
    };
    egLine.getSignedDistance = function (px, py, vx, vy, x, y, asVector) {
        if (!asVector) {
            vx -= px;
            vy -= py;
        }
        return vx === 0 ? vy > 0 ? x - px : px - x
            : vy === 0 ? vx < 0 ? y - py : py - y
                : ((x - px) * vy - (y - py) * vx) / Math.sqrt(vx * vx + vy * vy);
    };
    return egLine;
}());
var egSegment = /** @class */ (function () {
    //egSegment()
    //egSegment(egSegment)
    //egSegment(x: number, y: number)
    //egSegment(pt?: egPoint, ptIn?: egPoint, ptOut?: egPoint)
    //egSegment(a, b, c, d, e, f)
    function egSegment() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var count = args.length;
        if (count === 1 && args[0] instanceof egSegment) {
            this._point = new egPoint(args[0], args[1]);
            this._handleIn = new egPoint();
            this._handleOut = new egPoint();
        }
        else if (count === 2 && typeof args[0] === 'number') {
            this._point = new egPoint(args[0], args[1]);
            this._handleIn = new egPoint();
            this._handleOut = new egPoint();
        }
        else if (count <= 3) {
            this._point = new egPoint(args[0] ? args[0] : null);
            this._handleIn = new egPoint(args[1] ? args[1] : null);
            this._handleOut = new egPoint(args[2] ? args[2] : null);
        }
        else if (count === 6 && typeof args[0] === "number") {
            this._point = new egPoint(args[0], args[1]);
            this._handleIn = new egPoint(args[2], args[3]);
            this._handleOut = new egPoint(args[4], args[5]);
        }
        else {
            this._point = new egPoint();
            this._handleIn = new egPoint();
            this._handleOut = new egPoint();
        }
        this._visited = false;
        this._contour = false;
        this._state = 0;
        this._index = 0;
        this._path = null;
        this._intersection = null;
    }
    egSegment.prototype.clone_ = function () {
        return new egSegment(this._point, this._handleIn, this._handleOut);
    };
    egSegment.prototype.getPoint = function () {
        return this._point;
    };
    egSegment.prototype.setPoint = function (pt) {
        this._point.set(pt.x, pt.y);
    };
    egSegment.prototype.getHandleIn = function () {
        return this._handleIn;
    };
    egSegment.prototype.setHandleIn = function (pt) {
        this._handleIn.set(pt.x, pt.y);
    };
    egSegment.prototype.getHandleOut = function () {
        return this._handleOut;
    };
    egSegment.prototype.setHandleOut = function (pt) {
        this._handleOut.set(pt.x, pt.y);
    };
    egSegment.prototype.hasHandles = function () {
        return !this._handleIn.isZero() || !this._handleOut.isZero();
    };
    egSegment.prototype.clearHandles = function () {
        this._handleIn.set(0, 0);
        this._handleOut.set(0, 0);
    };
    egSegment.prototype.getIndex = function () {
        return this._index !== undefined ? this._index : -1;
    };
    egSegment.prototype.getPath = function () {
        return this._path || null;
    };
    egSegment.prototype.getCurve = function () {
        var path = this._path, index = this._index;
        if (path) {
            if (index > 0 && !path._closed
                && index === path._segments.length - 1)
                index--;
            return path.getCurves()[index] || null;
        }
        return null;
    };
    egSegment.prototype.getLocation = function () {
        var curve = this.getCurve();
        return curve
            ? new egCurveLocation(curve, this === curve._segment1 ? 0 : 1)
            : null;
    };
    egSegment.prototype.getNext = function () {
        var segments = this._path && this._path._segments;
        return segments && (segments[this._index + 1]
            || this._path._closed && segments[0]) || null;
    };
    egSegment.prototype.getPrevious = function () {
        var segments = this._path && this._path._segments;
        return segments && (segments[this._index - 1]
            || this._path._closed && segments[segments.length - 1]) || null;
    };
    //type = 1 is "catmull-rom", type == 2 is "geometric"
    egSegment.prototype.smooth = function (_first, _last, type, factor) {
        var prev = this.getPrevious(), next = this.getNext(), p0 = (prev || this)._point, p1 = this._point, p2 = (next || this)._point, d1 = p0.getDistance(p1), d2 = p1.getDistance(p2);
        if (!type || type === 1) {
            var a = factor === undefined ? 0.5 : factor, d1_a = Math.pow(d1, a), d1_2a = d1_a * d1_a, d2_a = Math.pow(d2, a), d2_2a = d2_a * d2_a;
            if (!_first && prev) {
                var A = 2 * d2_2a + 3 * d2_a * d1_a + d1_2a, N = 3 * d2_a * (d2_a + d1_a);
                this.setHandleIn(N !== 0
                    ? new egPoint((d2_2a * p0._x + A * p1._x - d1_2a * p2._x) / N - p1._x, (d2_2a * p0._y + A * p1._y - d1_2a * p2._y) / N - p1._y)
                    : new egPoint());
            }
            if (!_last && next) {
                var A = 2 * d1_2a + 3 * d1_a * d2_a + d2_2a, N = 3 * d1_a * (d1_a + d2_a);
                this.setHandleOut(N !== 0
                    ? new egPoint((d1_2a * p2._x + A * p1._x - d2_2a * p0._x) / N - p1._x, (d1_2a * p2._y + A * p1._y - d2_2a * p0._y) / N - p1._y)
                    : new egPoint());
            }
        }
        else if (type === 2) {
            if (prev && next) {
                var vector = p0.subtract(p2), t = factor === undefined ? 0.4 : factor, k = t * d1 / (d1 + d2);
                if (!_first)
                    this.setHandleIn(vector.multiply(k));
                if (!_last)
                    this.setHandleOut(vector.multiply(k - t));
            }
        }
        else {
        }
    };
    egSegment.prototype.isFirst = function () {
        return this._index === 0;
    };
    egSegment.prototype.isLast = function () {
        var path = this._path;
        return path && this._index === path._segments.length - 1 || false;
    };
    egSegment.prototype.reverse = function () {
        var tmpIn = this._handleIn.clone_();
        this._handleIn.setPt(this._handleOut);
        this._handleOut.setPt(tmpIn);
    };
    egSegment.prototype.reversed = function () {
        return new egSegment(this._point, this._handleOut, this._handleIn);
    };
    egSegment.prototype.remove = function () {
        return this._path ? !!this._path.removeSegment(this._index) : false;
    };
    egSegment.prototype.equals = function (segment) {
        return segment === this || segment
            && this._point.equals(segment._point)
            && this._handleIn.equals(segment._handleIn)
            && this._handleOut.equals(segment._handleOut)
            || false;
    };
    egSegment.prototype.toString = function () {
        var parts = ['point: ' + this._point];
        if (!this._handleIn.isZero())
            parts.push('handleIn: ' + this._handleIn);
        if (!this._handleOut.isZero())
            parts.push('handleOut: ' + this._handleOut);
        return '{ ' + parts.join(', ') + ' }';
    };
    egSegment.prototype.transform = function (matrix) {
        this._transformCoordinates(matrix, new Array(6), true);
    };
    egSegment.prototype.interpolate = function (from, to, factor) {
        var u = 1 - factor, v = factor, point1 = from._point, point2 = to._point, handleIn1 = from._handleIn, handleIn2 = to._handleIn, handleOut2 = to._handleOut, handleOut1 = from._handleOut;
        this._point.set(u * point1._x + v * point2._x, u * point1._y + v * point2._y);
        this._handleIn.set(u * handleIn1._x + v * handleIn2._x, u * handleIn1._y + v * handleIn2._y);
        this._handleOut.set(u * handleOut1._x + v * handleOut2._x, u * handleOut1._y + v * handleOut2._y);
    };
    egSegment.prototype._transformCoordinates = function (matrix, coords, change) {
        var point = this._point, handleIn = !change || !this._handleIn.isZero()
            ? this._handleIn : null, handleOut = !change || !this._handleOut.isZero()
            ? this._handleOut : null, x = point._x, y = point._y, i = 2;
        coords[0] = x;
        coords[1] = y;
        if (handleIn) {
            coords[i++] = handleIn._x + x;
            coords[i++] = handleIn._y + y;
        }
        if (handleOut) {
            coords[i++] = handleOut._x + x;
            coords[i++] = handleOut._y + y;
        }
        if (matrix) {
            matrix.transformCoords(coords, coords, i / 2);
            x = coords[0];
            y = coords[1];
            if (change) {
                point._x = x;
                point._y = y;
                i = 2;
                if (handleIn) {
                    handleIn._x = coords[i++] - x;
                    handleIn._y = coords[i++] - y;
                }
                if (handleOut) {
                    handleOut._x = coords[i++] - x;
                    handleOut._y = coords[i++] - y;
                }
            }
            else {
                if (!handleIn) {
                    coords[i++] = x;
                    coords[i++] = y;
                }
                if (!handleOut) {
                    coords[i++] = x;
                    coords[i++] = y;
                }
            }
        }
        return coords;
    };
    egSegment.segsEquals = function (segs1, segs2) {
        if (segs1 === segs2)
            return true;
        if (segs1.length !== segs2.length)
            return false;
        for (var i = 0; i < segs1.length; i++) {
            if (!segs1[i].equals(segs2[i]))
                return false;
        }
        return true;
    };
    return egSegment;
}());
var egCurve = /** @class */ (function () {
    //egCurve()
    //egCurve(seg1, seg2)
    //egCurve(path, seg1, seg2)
    //egCurve(array<number>(8))
    //egCurve([segment1, segment2])
    //egCurve([point1, handle1, handle2, point2])
    //egCurve(pt1, hand1, hand2, pt2)
    //egCurve(a,.....,h)
    function egCurve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        var count = arguments.length, seg1, seg2, point1, point2, handle1, handle2;
        if (count === 3) {
            this._path = arg0;
            seg1 = arg1;
            seg2 = arg2;
        }
        else if (count === 0) {
            seg1 = new egSegment();
            seg2 = new egSegment();
        }
        else if (count === 1) {
            if ('segment1' in arg0) {
                seg1 = new egSegment(arg0.segment1);
                seg2 = new egSegment(arg0.segment2);
            }
            else if ('point1' in arg0) {
                point1 = arg0.point1;
                handle1 = arg0.handle1;
                handle2 = arg0.handle2;
                point2 = arg0.point2;
            }
            else if (Array.isArray(arg0)) {
                point1 = [arg0[0], arg0[1]];
                point2 = [arg0[6], arg0[7]];
                handle1 = [arg0[2] - arg0[0], arg0[3] - arg0[1]];
                handle2 = [arg0[4] - arg0[6], arg0[5] - arg0[7]];
            }
        }
        else if (count === 2) {
            seg1 = new egSegment(arg0);
            seg2 = new egSegment(arg1);
        }
        else if (count === 4) {
            point1 = arg0;
            handle1 = arg1;
            handle2 = arg2;
            point2 = arg3;
        }
        else if (count === 8) {
            point1 = [arg0, arg1];
            point2 = [arg6, arg7];
            handle1 = [arg2 - arg0, arg3 - arg1];
            handle2 = [arg4 - arg6, arg5 - arg7];
        }
        this._segment1 = seg1 || new egSegment(point1, null, handle1);
        this._segment2 = seg2 || new egSegment(point2, handle2, null);
    }
    egCurve.prototype._changed = function () {
        this._length = this._bounds = undefined;
    };
    egCurve.prototype.clone_ = function () {
        return new egCurve(this._segment1, this._segment2);
    };
    egCurve.prototype.toString = function () {
        var parts = ['point1: ' + this._segment1._point];
        if (!this._segment1._handleOut.isZero())
            parts.push('handle1: ' + this._segment1._handleOut);
        if (!this._segment2._handleIn.isZero())
            parts.push('handle2: ' + this._segment2._handleIn);
        parts.push('point2: ' + this._segment2._point);
        return '{ ' + parts.join(', ') + ' }';
    };
    egCurve.prototype.remove = function () {
        var removed = false;
        if (this._path) {
            var segment2 = this._segment2, handleOut = segment2._handleOut;
            removed = segment2.remove();
            if (removed)
                this._segment1._handleOut.set(handleOut.x, handleOut.y);
        }
        return removed;
    };
    egCurve.prototype.getPoint1 = function () {
        return this._segment1._point;
    };
    egCurve.prototype.setPoint1 = function (pt) {
        this._segment1._point.set(pt.x, pt.y);
    };
    egCurve.prototype.getPoint2 = function () {
        return this._segment2._point;
    };
    egCurve.prototype.setPoint2 = function (pt) {
        this._segment2._point.set(pt.x, pt.y);
    };
    egCurve.prototype.getHandle1 = function () {
        return this._segment1._handleOut;
    };
    egCurve.prototype.setHandle1 = function (pt) {
        this._segment1._handleOut.set(pt.x, pt.y);
    };
    egCurve.prototype.getHandle2 = function () {
        return this._segment2._handleIn;
    };
    egCurve.prototype.setHandle2 = function (pt) {
        this._segment2._handleIn.set(pt.x, pt.y);
    };
    egCurve.prototype.getPath = function () {
        return this._path;
    };
    egCurve.prototype.getIndex = function () {
        return this._segment1._index;
    };
    egCurve.prototype.getNext = function () {
        var curves = this._path && this._path._curves;
        return curves && (curves[this._segment1._index + 1]
            || this._path._closed && curves[0]) || null;
    };
    egCurve.prototype.getPrevious = function () {
        var curves = this._path && this._path._curves;
        return curves && (curves[this._segment1._index - 1]
            || this._path._closed && curves[curves.length - 1]) || null;
    };
    egCurve.prototype.isFirst = function () {
        return this._segment1._index === 0;
    };
    egCurve.prototype.isLast = function () {
        var path = this._path;
        return path && this._segment1._index === path._curves.length - 1
            || false;
    };
    egCurve.prototype.getValues = function (matrix) {
        return egCurve.getValues(this._segment1, this._segment2, matrix);
    };
    egCurve.prototype.getPoints = function () {
        var coords = this.getValues(), points = [];
        for (var i = 0; i < 8; i += 2)
            points.push(new egPoint(coords[i], coords[i + 1]));
        return points;
    };
    egCurve.prototype.getLength = function () {
        if (this._length == null)
            this._length = egCurve.getLength(this.getValues(), 0, 1);
        return this._length;
    };
    egCurve.prototype.getArea = function () {
        return egCurve.getArea(this.getValues());
    };
    egCurve.prototype.getLine = function () {
        return new egLine(this._segment1._point, this._segment2._point);
    };
    egCurve.prototype.getPart = function (from, to) {
        return new egCurve(egCurve.getPart(this.getValues(), from, to));
    };
    egCurve.prototype.getPartLength = function (from, to) {
        return egCurve.getLength(this.getValues(), from, to);
    };
    egCurve.prototype.getIntersectionscurve = function (curve) {
        return egCurve._getIntersections(this.getValues(), curve && curve !== this ? curve.getValues() : null, this, curve, [], {});
    };
    egCurve.prototype.divideAt = function (location) {
        return this.divideAtTime(location && location._curve === this
            ? location._time : location);
    };
    egCurve.prototype.divideAtTime = function (time, _setHandles) {
        var tMin = 4e-7, tMax = 1 - tMin, res = null;
        if (time >= tMin && time <= tMax) {
            var parts = egCurve.subdivide(this.getValues(), time), left = parts[0], right = parts[1], setHandles = _setHandles || this.hasHandles(), segment1 = this._segment1, segment2 = this._segment2, path = this._path;
            if (setHandles) {
                segment1._handleOut.set(left[2] - left[0], left[3] - left[1]);
                segment2._handleIn.set(right[4] - right[6], right[5] - right[7]);
            }
            var x = left[6], y = left[7], segment = new egSegment(new egPoint(x, y), setHandles && new egPoint(left[4] - x, left[5] - y), setHandles && new egPoint(right[2] - x, right[3] - y));
            if (path) {
                path.insert(segment1._index + 1, segment);
                res = this.getNext();
            }
            else {
                this._segment2 = segment;
                this._changed();
                res = new egCurve(segment, segment2);
            }
        }
        return res;
    };
    egCurve.prototype.splitAt = function (location) {
        return this._path ? this._path.splitAt(location) : null;
    };
    egCurve.prototype.splitAtTime = function (t) {
        return this.splitAt(this.getLocationAtTime(t));
    };
    egCurve.prototype.divide = function (offset, isTime) {
        return this.divideAtTime(offset === undefined ? 0.5 : isTime ? offset
            : this.getTimeAt(offset));
    };
    egCurve.prototype.split = function (offset, isTime) {
        return this.splitAtTime(offset === undefined ? 0.5 : isTime ? offset
            : this.getTimeAt(offset));
    };
    egCurve.prototype.reversed = function () {
        return new egCurve(this._segment2.reversed(), this._segment1.reversed());
    };
    egCurve.prototype.clearHandles = function () {
        this._segment1._handleOut.set(0, 0);
        this._segment2._handleIn.set(0, 0);
    };
    egCurve.getValues = function (seg1, seg2, matrix) {
        var p1 = seg1._point, h1 = seg1._handleOut, h2 = seg2._handleIn, p2 = seg2._point, values = [
            p1._x, p1._y,
            p1._x + h1._x, p1._y + h1._y,
            p2._x + h2._x, p2._y + h2._y,
            p2._x, p2._y
        ];
        if (matrix)
            matrix.transformCoords(values, values, 4);
        return values;
    };
    egCurve.subdivide = function (v, t) {
        var p1x = v[0], p1y = v[1], c1x = v[2], c1y = v[3], c2x = v[4], c2y = v[5], p2x = v[6], p2y = v[7];
        if (t === undefined)
            t = 0.5;
        var u = 1 - t, p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y, p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y, p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y, p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y, p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y, p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
        return [
            [p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y],
            [p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y]
        ];
    };
    egCurve.solveCubic = function (v, coord, val, roots, min, max) {
        var p1 = v[coord], c1 = v[coord + 2], c2 = v[coord + 4], p2 = v[coord + 6], c = 3 * (c1 - p1), b = 3 * (c2 - c1) - c, a = p2 - p1 - c - b;
        return egMath.solveCubic(a, b, c, p1 - val, roots, min, max);
    };
    egCurve.getTimeOf = function (v, point) {
        var p1 = new egPoint(v[0], v[1]), p2 = new egPoint(v[6], v[7]), epsilon = 1e-12, t = point.isClose(p1, epsilon) ? 0
            : point.isClose(p2, epsilon) ? 1
                : null;
        if (t !== null)
            return t;
        var coords = [point.x, point.y], roots = [], geomEpsilon = 2e-7;
        for (var c = 0; c < 2; c++) {
            var count = egCurve.solveCubic(v, c, coords[c], roots, 0, 1);
            for (var i = 0; i < count; i++) {
                t = roots[i];
                if (point.isClose(egCurve.getPoint(v, t), geomEpsilon))
                    return t;
            }
        }
        return point.isClose(p1, geomEpsilon) ? 0
            : point.isClose(p2, geomEpsilon) ? 1
                : null;
    };
    egCurve.getNearestTime = function (v, point) {
        if (egCurve.isStraight(v)) {
            var p1x = v[0], p1y = v[1], p2x = v[6], p2y = v[7], vx = p2x - p1x, vy = p2y - p1y, det = vx * vx + vy * vy;
            if (det === 0)
                return 0;
            var u = ((point.x - p1x) * vx + (point.y - p1y) * vy) / det;
            return u < 1e-12 ? 0
                : u > 0.999999999999 ? 1
                    : egCurve.getTimeOf(v, new egPoint(p1x + u * vx, p1y + u * vy));
        }
        var count = 100, minDist = Infinity, minT = 0;
        function refine(t) {
            if (t >= 0 && t <= 1) {
                var dist = point.getDistance(egCurve.getPoint(v, t), true);
                if (dist < minDist) {
                    minDist = dist;
                    minT = t;
                    return true;
                }
            }
        }
        for (var i = 0; i <= count; i++)
            refine(i / count);
        var step = 1 / (count * 2);
        while (step > 4e-7) {
            if (!refine(minT - step) && !refine(minT + step))
                step /= 2;
        }
        return minT;
    };
    egCurve.getPart = function (v, from, to) {
        var flip = from > to;
        if (flip) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        if (from > 0)
            v = egCurve.subdivide(v, from)[1];
        if (to < 1)
            v = egCurve.subdivide(v, (to - from) / (1 - from))[0];
        return flip
            ? [v[6], v[7], v[4], v[5], v[2], v[3], v[0], v[1]]
            : v;
    };
    egCurve.isFlatEnough = function (v, flatness) {
        var p1x = v[0], p1y = v[1], c1x = v[2], c1y = v[3], c2x = v[4], c2y = v[5], p2x = v[6], p2y = v[7], ux = 3 * c1x - 2 * p1x - p2x, uy = 3 * c1y - 2 * p1y - p2y, vx = 3 * c2x - 2 * p2x - p1x, vy = 3 * c2y - 2 * p2y - p1y;
        return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
            <= 16 * flatness * flatness;
    };
    egCurve.getArea = function (v) {
        var p1x = v[0], p1y = v[1], c1x = v[2], c1y = v[3], c2x = v[4], c2y = v[5], p2x = v[6], p2y = v[7];
        return 3 * ((p2y - p1y) * (c1x + c2x) - (p2x - p1x) * (c1y + c2y)
            + c1y * (p1x - c2x) - c1x * (p1y - c2y)
            + p2y * (c2x + p1x / 3) - p2x * (c2y + p1y / 3)) / 20;
    };
    egCurve.getBounds = function (v) {
        var min = v.slice(0, 2), max = min.slice(), roots = [0, 0];
        for (var i = 0; i < 2; i++)
            egCurve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6], i, 0, min, max, roots);
        return new egRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    };
    egCurve._addBounds = function (v0, v1, v2, v3, coord, padding, min, max, roots) {
        function add(value, padding) {
            var left = value - padding, right = value + padding;
            if (left < min[coord])
                min[coord] = left;
            if (right > max[coord])
                max[coord] = right;
        }
        padding /= 2;
        var minPad = min[coord] - padding, maxPad = max[coord] + padding;
        if (v0 < minPad || v1 < minPad || v2 < minPad || v3 < minPad ||
            v0 > maxPad || v1 > maxPad || v2 > maxPad || v3 > maxPad) {
            if (v1 < v0 != v1 < v3 && v2 < v0 != v2 < v3) {
                add(v0, padding);
                add(v3, padding);
            }
            else {
                var a = 3 * (v1 - v2) - v0 + v3, b = 2 * (v0 + v2) - 4 * v1, c = v1 - v0, count = egMath.solveQuadratic(a, b, c, roots), tMin = 4e-7, tMax = 1 - tMin;
                add(v3, 0);
                for (var i = 0; i < count; i++) {
                    var t = roots[i], u = 1 - t;
                    if (tMin < t && t < tMax)
                        add(u * u * u * v0
                            + 3 * u * u * t * v1
                            + 3 * u * t * t * v2
                            + t * t * t * v3, padding);
                }
            }
        }
    };
    egCurve._isStraight = function (l, h1, h2) {
        if (h1.isZero() && h2.isZero()) {
            return true;
        }
        else {
            var v = l.getVector(), epsilon = 2e-7;
            if (v.isZero()) {
                return false;
            }
            else if (l.getDistance(h1) < epsilon
                && l.getDistance(h2) < epsilon) {
                var div = v.dot(v), p1 = v.dot(h1) / div, p2 = v.dot(h2) / div;
                return p1 >= 0 && p1 <= 1 && p2 <= 0 && p2 >= -1;
            }
        }
        return false;
    };
    egCurve.isStraight = function (v) {
        return egCurve._isStraight(new egLine(v[0], v[1], v[6], v[7]), new egPoint(v[2] - v[0], v[3] - v[1]), new egPoint(v[4] - v[6], v[5] - v[7]));
    };
    egCurve.prototype.isStraight = function () {
        var seg1 = this._segment1, seg2 = this._segment2;
        return egCurve._isStraight(new egLine(seg1._point, seg2._point), seg1._handleOut, seg2._handleIn);
    };
    egCurve._isLinear = function (l, h1, h2) {
        var third = l.getVector().divide(3);
        return h1.equals(third) && h2.negate().equals(third);
    };
    egCurve.isLinear = function (v) {
        var p1x = v[0], p1y = v[1], p2x = v[6], p2y = v[7];
        return egCurve._isLinear(new egLine(v[0], v[1], v[6], v[7]), new egPoint(v[2] - v[0], v[3] - v[1]), new egPoint(v[4] - v[6], v[5] - v[7]));
    };
    egCurve.prototype.isLinear = function () {
        var seg1 = this._segment1, seg2 = this._segment2;
        return egCurve._isLinear(new egLine(seg1._point, seg2._point), seg1._handleOut, seg2._handleIn);
    };
    egCurve.hasHandles = function (v) {
        var isZero = egMath.isZero;
        return !(isZero(v[0] - v[2]) && isZero(v[1] - v[3])
            && isZero(v[4] - v[6]) && isZero(v[5] - v[7]));
    };
    egCurve.prototype.hasHandles = function () {
        return !this._segment1._handleOut.isZero()
            || !this._segment2._handleIn.isZero();
    };
    egCurve.prototype.isCollinear = function (curve) {
        return curve && this.isStraight() && curve.isStraight()
            && this.getLine().isCollinear(curve.getLine());
    };
    egCurve.prototype.isHorizontal = function () {
        return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).y)
            < 1e-7;
    };
    egCurve.prototype.isVertical = function () {
        return this.isStraight() && Math.abs(this.getTangentAtTime(0.5).x)
            < 1e-7;
    };
    egCurve.prototype.getLocationAt = function (offset, _isTime) {
        return this.getLocationAtTime(_isTime ? offset : this.getTimeAt(offset));
    };
    egCurve.prototype.getLocationAtTime = function (t) {
        return t != null && t >= 0 && t <= 1
            ? new egCurveLocation(this, t)
            : null;
    };
    egCurve.prototype.getTimeAt = function (offset, start) {
        return egCurve.getTimeAt(this.getValues(), offset, start);
    };
    //getParameterAt: '#getTimeAt',
    egCurve.prototype.getOffsetAtTime = function (t) {
        return this.getPartLength(0, t);
    };
    egCurve.prototype.getLocationOf = function (pt) {
        return this.getLocationAtTime(this.getTimeOf(pt));
    };
    egCurve.prototype.getOffsetOf = function (pt) {
        var loc = this.getLocationOf.apply(this, pt);
        return loc ? loc.getOffset() : null;
    };
    egCurve.prototype.getTimeOf = function (pt) {
        return egCurve.getTimeOf(this.getValues(), pt);
    };
    //getParameterOf: '#getTimeOf',
    egCurve.prototype.getNearestLocation = function (point) {
        var values = this.getValues(), t = egCurve.getNearestTime(values, point), pt = egCurve.getPoint(values, t);
        return new egCurveLocation(this, t, pt, null, point.getDistance(pt));
    };
    egCurve.prototype.getNearestPoint = function (point) {
        var loc = this.getNearestLocation.apply(this, point);
        return loc ? loc.getPoint() : loc;
    };
    egCurve.prototype.getPointAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getPoint(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getTangentAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getTangent(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getNormalAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getNormal(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getWeightedTangentAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getWeightedTangent(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getWeightedNormalAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getWeightedNormal(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getCurvatureAt = function (location, _isTime) {
        var values = this.getValues();
        return egCurve.getCurvature(values, _isTime ? location
            : egCurve.getTimeAt(values, location));
    };
    egCurve.prototype.getPointAtTime = function (time) {
        return egCurve.getPoint(this.getValues(), time);
    };
    egCurve.prototype.getTangentAtTime = function (time) {
        return egCurve.getTangent(this.getValues(), time);
    };
    egCurve.prototype.getNormalAtTime = function (time) {
        return egCurve.getNormal(this.getValues(), time);
    };
    egCurve.prototype.getWeightedTangentAtTime = function (time) {
        return egCurve.getWeightedTangent(this.getValues(), time);
    };
    egCurve.prototype.getWeightedNormalAtTime = function (time) {
        return egCurve.getWeightedNormal(this.getValues(), time);
    };
    egCurve.prototype.getCurvatureAtTime = function (time) {
        return egCurve.getCurvature(this.getValues(), time);
    };
    egCurve._getLengthIntegrand = function (v) {
        var p1x = v[0], p1y = v[1], c1x = v[2], c1y = v[3], c2x = v[4], c2y = v[5], p2x = v[6], p2y = v[7], ax = 9 * (c1x - c2x) + 3 * (p2x - p1x), bx = 6 * (p1x + c2x) - 12 * c1x, cx = 3 * (c1x - p1x), ay = 9 * (c1y - c2y) + 3 * (p2y - p1y), by = 6 * (p1y + c2y) - 12 * c1y, cy = 3 * (c1y - p1y);
        return function (t) {
            var dx = (ax * t + bx) * t + cx, dy = (ay * t + by) * t + cy;
            return Math.sqrt(dx * dx + dy * dy);
        };
    };
    egCurve._getIterations = function (a, b) {
        return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
    };
    egCurve._evaluate = function (v, t, type, normalized) {
        if (t == null || t < 0 || t > 1)
            return null;
        var p1x = v[0], p1y = v[1], c1x = v[2], c1y = v[3], c2x = v[4], c2y = v[5], p2x = v[6], p2y = v[7], isZero = egMath.isZero;
        if (isZero(c1x - p1x) && isZero(c1y - p1y)) {
            c1x = p1x;
            c1y = p1y;
        }
        if (isZero(c2x - p2x) && isZero(c2y - p2y)) {
            c2x = p2x;
            c2y = p2y;
        }
        var cx = 3 * (c1x - p1x), bx = 3 * (c2x - c1x) - cx, ax = p2x - p1x - cx - bx, cy = 3 * (c1y - p1y), by = 3 * (c2y - c1y) - cy, ay = p2y - p1y - cy - by, x, y;
        if (type === 0) {
            x = t === 0 ? p1x : t === 1 ? p2x
                : ((ax * t + bx) * t + cx) * t + p1x;
            y = t === 0 ? p1y : t === 1 ? p2y
                : ((ay * t + by) * t + cy) * t + p1y;
        }
        else {
            var tMin = 4e-7, tMax = 1 - tMin;
            if (t < tMin) {
                x = cx;
                y = cy;
            }
            else if (t > tMax) {
                x = 3 * (p2x - c2x);
                y = 3 * (p2y - c2y);
            }
            else {
                x = (3 * ax * t + 2 * bx) * t + cx;
                y = (3 * ay * t + 2 * by) * t + cy;
            }
            if (normalized) {
                if (x === 0 && y === 0 && (t < tMin || t > tMax)) {
                    x = c2x - c1x;
                    y = c2y - c1y;
                }
                var len = Math.sqrt(x * x + y * y);
                if (len) {
                    x /= len;
                    y /= len;
                }
            }
            if (type === 3) {
                var x2 = 6 * ax * t + 2 * bx, y2 = 6 * ay * t + 2 * by, d = Math.pow(x * x + y * y, 3 / 2);
                x = d !== 0 ? (x * y2 - y * x2) / d : 0;
                y = 0;
            }
        }
        return type === 2 ? new egPoint(y, -x) : new egPoint(x, y);
    };
    egCurve.getLength = function (v, a, b, ds) {
        if (a === undefined)
            a = 0;
        if (b === undefined)
            b = 1;
        if (egCurve.isStraight(v)) {
            var c = v;
            if (b < 1) {
                c = egCurve.subdivide(c, b)[0];
                a /= b;
            }
            if (a > 0) {
                c = egCurve.subdivide(c, a)[1];
            }
            var dx = c[6] - c[0], dy = c[7] - c[1];
            return Math.sqrt(dx * dx + dy * dy);
        }
        return egMath.integrate(ds || egCurve._getLengthIntegrand(v), a, b, egCurve._getIterations(a, b));
    };
    egCurve.getTimeAt = function (v, offset, start) {
        if (start === undefined)
            start = offset < 0 ? 1 : 0;
        if (offset === 0)
            return start;
        var abs = Math.abs, epsilon = 1e-12, forward = offset > 0, a = forward ? start : 0, b = forward ? 1 : start, ds = egCurve._getLengthIntegrand(v), rangeLength = egCurve.getLength(v, a, b, ds), diff = abs(offset) - rangeLength;
        if (abs(diff) < epsilon) {
            return forward ? b : a;
        }
        else if (diff > epsilon) {
            return null;
        }
        var guess = offset / rangeLength, length = 0;
        function f(t) {
            length += egMath.integrate(ds, start, t, egCurve._getIterations(start, t));
            start = t;
            return length - offset;
        }
        return egMath.findRoot(f, ds, start + guess, a, b, 32, 1e-12);
    };
    egCurve.getPoint = function (v, t) {
        return egCurve._evaluate(v, t, 0, false);
    };
    egCurve.getTangent = function (v, t) {
        return egCurve._evaluate(v, t, 1, true);
    };
    egCurve.getWeightedTangent = function (v, t) {
        return egCurve._evaluate(v, t, 1, false);
    };
    egCurve.getNormal = function (v, t) {
        return egCurve._evaluate(v, t, 2, true);
    };
    egCurve.getWeightedNormal = function (v, t) {
        return egCurve._evaluate(v, t, 2, false);
    };
    egCurve.getCurvature = function (v, t) {
        return egCurve._evaluate(v, t, 3, false).x;
    };
    egCurve._addLocation = function (locations, param, v1, c1, t1, p1, v2, c2, t2, p2, overlap) {
        var excludeStart = !overlap && param.excludeStart, excludeEnd = !overlap && param.excludeEnd, tMin = 4e-7, tMax = 1 - tMin;
        if (t1 == null)
            t1 = egCurve.getTimeOf(v1, p1);
        if (t1 !== null && t1 >= (excludeStart ? tMin : 0) &&
            t1 <= (excludeEnd ? tMax : 1)) {
            if (t2 == null)
                t2 = egCurve.getTimeOf(v2, p2);
            if (t2 !== null && t2 >= (excludeEnd ? tMin : 0) &&
                t2 <= (excludeStart ? tMax : 1)) {
                var renormalize = param.renormalize;
                if (renormalize) {
                    var res = renormalize(t1, t2);
                    t1 = res[0];
                    t2 = res[1];
                }
                var loc1 = new egCurveLocation(c1, t1, p1 || egCurve.getPoint(v1, t1), overlap), loc2 = new egCurveLocation(c2, t2, p2 || egCurve.getPoint(v2, t2), overlap), flip = loc1.getPath() === loc2.getPath()
                    && loc1.getIndex() > loc2.getIndex(), loc = flip ? loc2 : loc1, include = param.include;
                loc1._intersection = loc2;
                loc2._intersection = loc1;
                if (!include || include(loc)) {
                    //console.log(loc.toString());
                    egCurveLocation.insert(locations, loc, true);
                }
            }
        }
    };
    egCurve._addCurveIntersections = function (v1, v2, c1, c2, locations, param, tMin, tMax, uMin, uMax, flip, recursion, calls) {
        if (++recursion >= 48 || ++calls > 4096)
            return calls;
        var q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7], getSignedDistance = egLine.getSignedDistance, d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]), d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]), factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9, dMin = factor * Math.min(0, d1, d2), dMax = factor * Math.max(0, d1, d2), dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]), dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]), dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]), dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]), hull = egCurve._getConvexHull(dp0, dp1, dp2, dp3), top = hull[0], bottom = hull[1], tMinClip, tMaxClip;
        if (d1 === 0 && d2 === 0
            && dp0 === 0 && dp1 === 0 && dp2 === 0 && dp3 === 0
            || (tMinClip = egCurve._clipConvexHull(top, bottom, dMin, dMax)) == null
            || (tMaxClip = egCurve._clipConvexHull(top.reverse(), bottom.reverse(), dMin, dMax)) == null)
            return calls;
        var tMinNew = tMin + (tMax - tMin) * tMinClip, tMaxNew = tMin + (tMax - tMin) * tMaxClip;
        if (Math.max(uMax - uMin, tMaxNew - tMinNew)
            < 1e-9) {
            var t = (tMinNew + tMaxNew) / 2, u = (uMin + uMax) / 2;
            v1 = c1.getValues();
            v2 = c2.getValues();
            egCurve._addLocation(locations, param, flip ? v2 : v1, flip ? c2 : c1, flip ? u : t, null, flip ? v1 : v2, flip ? c1 : c2, flip ? t : u, null);
        }
        else {
            v1 = egCurve.getPart(v1, tMinClip, tMaxClip);
            if (tMaxClip - tMinClip > 0.8) {
                if (tMaxNew - tMinNew > uMax - uMin) {
                    var parts = egCurve.subdivide(v1, 0.5), t = (tMinNew + tMaxNew) / 2;
                    calls = egCurve._addCurveIntersections(v2, parts[0], c2, c1, locations, param, uMin, uMax, tMinNew, t, !flip, recursion, calls);
                    calls = egCurve._addCurveIntersections(v2, parts[1], c2, c1, locations, param, uMin, uMax, t, tMaxNew, !flip, recursion, calls);
                }
                else {
                    var parts = egCurve.subdivide(v2, 0.5), u = (uMin + uMax) / 2;
                    calls = egCurve._addCurveIntersections(parts[0], v1, c2, c1, locations, param, uMin, u, tMinNew, tMaxNew, !flip, recursion, calls);
                    calls = egCurve._addCurveIntersections(parts[1], v1, c2, c1, locations, param, u, uMax, tMinNew, tMaxNew, !flip, recursion, calls);
                }
            }
            else {
                calls = egCurve._addCurveIntersections(v2, v1, c2, c1, locations, param, uMin, uMax, tMinNew, tMaxNew, !flip, recursion, calls);
            }
        }
        return calls;
    };
    egCurve._getConvexHull = function (dq0, dq1, dq2, dq3) {
        var p0 = [0, dq0], p1 = [1 / 3, dq1], p2 = [2 / 3, dq2], p3 = [1, dq3], dist1 = dq1 - (2 * dq0 + dq3) / 3, dist2 = dq2 - (dq0 + 2 * dq3) / 3, hull;
        if (dist1 * dist2 < 0) {
            hull = [[p0, p1, p3], [p0, p2, p3]];
        }
        else {
            var distRatio = dist1 / dist2;
            hull = [
                distRatio >= 2 ? [p0, p1, p3]
                    : distRatio <= 0.5 ? [p0, p2, p3]
                        : [p0, p1, p2, p3],
                [p0, p3]
            ];
        }
        return (dist1 || dist2) < 0 ? hull.reverse() : hull;
    };
    egCurve._clipConvexHull = function (hullTop, hullBottom, dMin, dMax) {
        if (hullTop[0][1] < dMin) {
            return egCurve._clipConvexHullPart(hullTop, true, dMin);
        }
        else if (hullBottom[0][1] > dMax) {
            return egCurve._clipConvexHullPart(hullBottom, false, dMax);
        }
        else {
            return hullTop[0][0];
        }
    };
    egCurve._clipConvexHullPart = function (part, top, threshold) {
        var px = part[0][0], py = part[0][1];
        for (var i = 1, l = part.length; i < l; i++) {
            var qx = part[i][0], qy = part[i][1];
            if (top ? qy >= threshold : qy <= threshold) {
                return qy === threshold ? qx
                    : px + (threshold - py) * (qx - px) / (qy - py);
            }
            px = qx;
            py = qy;
        }
        return null;
    };
    egCurve._addCurveLineIntersections = function (v1, v2, c1, c2, locations, param) {
        var flip = egCurve.isStraight(v1), vc = flip ? v2 : v1, vl = flip ? v1 : v2, lx1 = vl[0], ly1 = vl[1], lx2 = vl[6], ly2 = vl[7], ldx = lx2 - lx1, ldy = ly2 - ly1, angle = Math.atan2(-ldy, ldx), sin = Math.sin(angle), cos = Math.cos(angle), rvc = [];
        for (var i = 0; i < 8; i += 2) {
            var x = vc[i] - lx1, y = vc[i + 1] - ly1;
            rvc.push(x * cos - y * sin, x * sin + y * cos);
        }
        var roots = [], count = egCurve.solveCubic(rvc, 1, 0, roots, 0, 1);
        for (var i = 0; i < count; i++) {
            var tc = roots[i], pc = egCurve.getPoint(vc, tc), tl = egCurve.getTimeOf(vl, pc);
            if (tl !== null) {
                var pl = egCurve.getPoint(vl, tl), t1 = flip ? tl : tc, t2 = flip ? tc : tl;
                if (!param.excludeEnd || t2 > egMath.CURVETIME_EPSILON) {
                    egCurve._addLocation(locations, param, v1, c1, t1, flip ? pl : pc, v2, c2, t2, flip ? pc : pl);
                }
            }
        }
    };
    egCurve._addLineIntersection = function (v1, v2, c1, c2, locations, param) {
        var pt = egLine.intersect(v1[0], v1[1], v1[6], v1[7], v2[0], v2[1], v2[6], v2[7]);
        if (pt) {
            egCurve._addLocation(locations, param, v1, c1, null, pt, v2, c2, null, pt);
        }
    };
    egCurve._getIntersections = function (v1, v2, c1, c2, locations, param) {
        if (!v2) {
            return egCurve._getSelfIntersection(v1, c1, locations, param);
        }
        var epsilon = 2e-7, c1p1x = v1[0], c1p1y = v1[1], c1p2x = v1[6], c1p2y = v1[7], c2p1x = v2[0], c2p1y = v2[1], c2p2x = v2[6], c2p2y = v2[7], c1s1x = (3 * v1[2] + c1p1x) / 4, c1s1y = (3 * v1[3] + c1p1y) / 4, c1s2x = (3 * v1[4] + c1p2x) / 4, c1s2y = (3 * v1[5] + c1p2y) / 4, c2s1x = (3 * v2[2] + c2p1x) / 4, c2s1y = (3 * v2[3] + c2p1y) / 4, c2s2x = (3 * v2[4] + c2p2x) / 4, c2s2y = (3 * v2[5] + c2p2y) / 4, min = Math.min, max = Math.max;
        if (!(max(c1p1x, c1s1x, c1s2x, c1p2x) + epsilon >
            min(c2p1x, c2s1x, c2s2x, c2p2x) &&
            min(c1p1x, c1s1x, c1s2x, c1p2x) - epsilon <
                max(c2p1x, c2s1x, c2s2x, c2p2x) &&
            max(c1p1y, c1s1y, c1s2y, c1p2y) + epsilon >
                min(c2p1y, c2s1y, c2s2y, c2p2y) &&
            min(c1p1y, c1s1y, c1s2y, c1p2y) - epsilon <
                max(c2p1y, c2s1y, c2s2y, c2p2y)))
            return locations;
        var overlaps = egCurve.getOverlaps(v1, v2);
        if (overlaps) {
            for (var i = 0; i < 2; i++) {
                var overlap = overlaps[i];
                egCurve._addLocation(locations, param, v1, c1, overlap[0], null, v2, c2, overlap[1], null, true);
            }
            return locations;
        }
        var straight1 = egCurve.isStraight(v1), straight2 = egCurve.isStraight(v2), straight = straight1 && straight2, before = locations.length;
        if (straight)
            egCurve._addLineIntersection(v1, v2, c1, c2, locations, param);
        else if (straight1 || straight2)
            egCurve._addCurveLineIntersections(v1, v2, c1, c2, locations, param);
        else
            egCurve._addCurveIntersections(v1, v2, c1, c2, locations, param, 0, 1, 0, 1, false, 0, 0);
        if (straight && locations.length > before)
            return locations;
        var c1p1 = new egPoint(c1p1x, c1p1y), c1p2 = new egPoint(c1p2x, c1p2y), c2p1 = new egPoint(c2p1x, c2p1y), c2p2 = new egPoint(c2p2x, c2p2y);
        if (c1p1.isClose(c2p1, epsilon))
            egCurve._addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 0, c2p1);
        if (!param.excludeStart && c1p1.isClose(c2p2, epsilon))
            egCurve._addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 1, c2p2);
        if (!param.excludeEnd && c1p2.isClose(c2p1, epsilon))
            egCurve._addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 0, c2p1);
        if (c1p2.isClose(c2p2, epsilon))
            egCurve._addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 1, c2p2);
        return locations;
    };
    egCurve._getSelfIntersection = function (v1, c1, locations, param) {
        var p1x = v1[0], p1y = v1[1], h1x = v1[2], h1y = v1[3], h2x = v1[4], h2y = v1[5], p2x = v1[6], p2y = v1[7];
        var line = new egLine(p1x, p1y, p2x, p2y, false), side1 = line.getSide(new egPoint(h1x, h1y), true), side2 = line.getSide(new egPoint(h2x, h2y), true);
        if (side1 === side2) {
            var edgeSum = (p1x - h2x) * (h1y - p2y)
                + (h1x - p2x) * (h2y - p1y);
            if (edgeSum * side1 > 0)
                return locations;
        }
        var ax = p2x - 3 * h2x + 3 * h1x - p1x, bx = h2x - 2 * h1x + p1x, cx = h1x - p1x, ay = p2y - 3 * h2y + 3 * h1y - p1y, by = h2y - 2 * h1y + p1y, cy = h1y - p1y, ac = ay * cx - ax * cy, ab = ay * bx - ax * by, bc = by * cx - bx * cy;
        if (ac * ac - 4 * ab * bc < 0) {
            var roots = [], tSplit, count = egMath.solveCubic(ax * ax + ay * ay, 3 * (ax * bx + ay * by), 2 * (bx * bx + by * by) + ax * cx + ay * cy, bx * cx + by * cy, roots, 0, 1);
            if (count > 0) {
                for (var i = 0, maxCurvature = 0; i < count; i++) {
                    var curvature = Math.abs(c1.getCurvatureAtTime(roots[i]));
                    if (curvature > maxCurvature) {
                        maxCurvature = curvature;
                        tSplit = roots[i];
                    }
                }
                var parts = egCurve.subdivide(v1, tSplit);
                param.excludeEnd = true;
                param.renormalize = function (t1, t2) {
                    return [t1 * tSplit, t2 * (1 - tSplit) + tSplit];
                };
                egCurve._getIntersections(parts[0], parts[1], c1, c1, locations, param);
            }
        }
        return locations;
    };
    egCurve.getOverlaps = function (v1, v2) {
        var abs = Math.abs, timeEpsilon = 4e-7, geomEpsilon = 2e-7, straight1 = egCurve.isStraight(v1), straight2 = egCurve.isStraight(v2), straightBoth = straight1 && straight2;
        function getSquaredLineLength(v) {
            var x = v[6] - v[0], y = v[7] - v[1];
            return x * x + y * y;
        }
        var flip = getSquaredLineLength(v1) < getSquaredLineLength(v2), l1 = flip ? v2 : v1, l2 = flip ? v1 : v2, line = new egLine(l1[0], l1[1], l1[6], l1[7]);
        if (line.getDistance(new egPoint(l2[0], l2[1])) < geomEpsilon &&
            line.getDistance(new egPoint(l2[6], l2[7])) < geomEpsilon) {
            if (!straightBoth &&
                line.getDistance(new egPoint(l1[2], l1[3])) < geomEpsilon &&
                line.getDistance(new egPoint(l1[4], l1[5])) < geomEpsilon &&
                line.getDistance(new egPoint(l2[2], l2[3])) < geomEpsilon &&
                line.getDistance(new egPoint(l2[4], l2[5])) < geomEpsilon) {
                straight1 = straight2 = straightBoth = true;
            }
        }
        else if (straightBoth) {
            return null;
        }
        if (straight1 !== straight2) {
            return null;
        }
        var v = [v1, v2], pairs = [];
        for (var i = 0, t1 = 0; i < 2 && pairs.length < 2; i += t1 === 0 ? 0 : 1, t1 = t1 ^ 1) {
            var t2 = egCurve.getTimeOf(v[i ^ 1], new egPoint(v[i][t1 === 0 ? 0 : 6], v[i][t1 === 0 ? 1 : 7]));
            if (t2 != null) {
                var pair = i === 0 ? [t1, t2] : [t2, t1];
                if (pairs.length === 0 ||
                    abs(pair[0] - pairs[0][0]) > timeEpsilon &&
                        abs(pair[1] - pairs[0][1]) > timeEpsilon)
                    pairs.push(pair);
            }
            if (i === 1 && pairs.length === 0)
                break;
        }
        if (pairs.length !== 2) {
            pairs = null;
        }
        else if (!straightBoth) {
            var o1 = egCurve.getPart(v1, pairs[0][0], pairs[1][0]), o2 = egCurve.getPart(v2, pairs[0][1], pairs[1][1]);
            if (abs(o2[2] - o1[2]) > geomEpsilon ||
                abs(o2[3] - o1[3]) > geomEpsilon ||
                abs(o2[4] - o1[4]) > geomEpsilon ||
                abs(o2[5] - o1[5]) > geomEpsilon)
                pairs = null;
        }
        return pairs;
    };
    return egCurve;
}());
var egCurveLocation = /** @class */ (function () {
    function egCurveLocation(curve, time, point, _overlap, _distance) {
        if (time > 0.9999996) {
            var next = curve.getNext();
            if (next) {
                time = 0;
                curve = next;
            }
        }
        this._path = null;
        this._setCurve(curve);
        this._time = time;
        this._offset = null;
        this._point = point || curve.getPointAtTime(time);
        this._overlap = _overlap;
        this._distance = _distance;
        this._intersection = this._next = this._previous = null;
    }
    egCurveLocation.prototype._setCurve = function (curve) {
        if (!curve) {
            console.log("Error!");
        }
        var path = curve._path;
        this._path = path;
        this._version = path ? path._version : 0;
        this._curve = curve;
        this._segment = null;
        this._segment1 = curve._segment1;
        this._segment2 = curve._segment2;
    };
    egCurveLocation.prototype._setSegment = function (segment) {
        this._setCurve(segment.getCurve());
        this._segment = segment;
        this._time = segment === this._segment1 ? 0 : 1;
        this._point = segment._point.clone_();
    };
    egCurveLocation.prototype.getSegment = function () {
        var curve = this.getCurve(), segment = this._segment;
        if (!segment) {
            var time = this.getTime();
            if (time === 0) {
                segment = curve._segment1;
            }
            else if (time === 1) {
                segment = curve._segment2;
            }
            else if (time != null) {
                segment = curve.getPartLength(0, time)
                    < curve.getPartLength(time, 1)
                    ? curve._segment1
                    : curve._segment2;
            }
            this._segment = segment;
        }
        return segment;
    };
    egCurveLocation.prototype.getCurve = function () {
        var path = this._path, that = this;
        if (path && path._version !== this._version) {
            this._time = this._curve = this._offset = null;
        }
        function trySegment(segment) {
            var curve = segment && segment.getCurve();
            if (curve && (that._time = curve.getTimeOf(that._point))
                != null) {
                that._setCurve(curve);
                that._segment = segment;
                return curve;
            }
        }
        return this._curve
            || trySegment(this._segment)
            || trySegment(this._segment1)
            || trySegment(this._segment2.getPrevious());
    };
    egCurveLocation.prototype.getPath = function () {
        var curve = this.getCurve();
        return curve && curve._path;
    };
    egCurveLocation.prototype.getIndex = function () {
        var curve = this.getCurve();
        return curve && curve.getIndex();
    };
    egCurveLocation.prototype.getTime = function () {
        var curve = this.getCurve(), time = this._time;
        return curve && time == null
            ? this._time = curve.getTimeOf(this._point)
            : time;
    };
    egCurveLocation.prototype.getOffset = function () {
        var offset = this._offset;
        if (offset == null) {
            offset = 0;
            var path = this.getPath(), index = this.getIndex();
            if (path && index != null) {
                var curves = path.getCurves();
                for (var i = 0; i < index; i++)
                    offset += curves[i].getLength();
            }
            this._offset = offset += this.getCurveOffset();
        }
        return offset;
    };
    egCurveLocation.prototype.getCurveOffset = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getPartLength(0, time);
    };
    egCurveLocation.prototype.getIntersection = function () {
        return this._intersection;
    };
    egCurveLocation.prototype.getDistance = function () {
        return this._distance;
    };
    egCurveLocation.prototype.divide = function () {
        var curve = this.getCurve(), res = null;
        if (curve) {
            res = curve.divideAtTime(this.getTime());
            if (res)
                this._setSegment(res._segment1);
        }
        return res;
    };
    egCurveLocation.prototype.split = function () {
        var curve = this.getCurve();
        return curve ? curve.splitAtTime(this.getTime()) : null;
    };
    egCurveLocation.prototype.equals = function (loc, _ignoreOther) {
        var res = this === loc, epsilon = 2e-7;
        if (!res && loc instanceof egCurveLocation
            && this.getPath() === loc.getPath()
            && this.getPoint().isClose(loc.getPoint(), epsilon)) {
            var c1 = this.getCurve(), c2 = loc.getCurve(), abs = Math.abs, diff = abs(((c1.isLast() && c2.isFirst() ? -1 : c1.getIndex())
                + this.getTime()) -
                ((c2.isLast() && c1.isFirst() ? -1 : c2.getIndex())
                    + loc.getTime()));
            res = (diff < 4e-7
                || ((diff = abs(this.getOffset() - loc.getOffset())) < epsilon
                    || abs(this.getPath().getLength() - diff) < epsilon))
                && (_ignoreOther
                    || (!this._intersection && !loc._intersection
                        || this._intersection && this._intersection.equals(loc._intersection, true)));
        }
        return res;
    };
    egCurveLocation.prototype.toString = function () {
        var parts = [], point = this.getPoint(), f = egFormatter.inst;
        if (point)
            parts.push('point: ' + point);
        var index = this.getIndex();
        if (index != null)
            parts.push('index: ' + index);
        var time = this.getTime();
        if (time != null)
            parts.push('time: ' + f.number(time));
        if (this._distance != null)
            parts.push('distance: ' + f.number(this._distance));
        return '{ ' + parts.join(', ') + ' }';
    };
    egCurveLocation.prototype.isTouching = function () {
        var inter = this._intersection;
        if (inter && this.getTangent().isCollinear(inter.getTangent())) {
            var curve1 = this.getCurve(), curve2 = inter.getCurve();
            return !(curve1.isStraight() && curve2.isStraight()
                && curve1.getLine().intersect(curve2.getLine()));
        }
        return false;
    };
    egCurveLocation.prototype.isCrossing = function () {
        var inter = this._intersection;
        if (!inter)
            return false;
        var t1 = this.getTime(), t2 = inter.getTime(), tMin = 4e-7, tMax = 1 - tMin, t1Inside = t1 > tMin && t1 < tMax, t2Inside = t2 > tMin && t2 < tMax;
        if (t1Inside && t2Inside)
            return !this.isTouching();
        var c2 = this.getCurve(), c1 = t1 <= tMin ? c2.getPrevious() : c2, c4 = inter.getCurve(), c3 = t2 <= tMin ? c4.getPrevious() : c4;
        if (t1 >= tMax)
            c2 = c2.getNext();
        if (t2 >= tMax)
            c4 = c4.getNext();
        if (!c1 || !c2 || !c3 || !c4)
            return false;
        function isInRange(angle, min, max) {
            return min < max
                ? angle > min && angle < max
                : angle > min || angle < max;
        }
        var lenghts = [];
        if (!t1Inside)
            lenghts.push(c1.getLength(), c2.getLength());
        if (!t2Inside)
            lenghts.push(c3.getLength(), c4.getLength());
        var pt = this.getPoint(), offset = Math.min.apply(Math, lenghts) / 64, v2 = t1Inside ? c2.getTangentAtTime(t1)
            : c2.getPointAt(offset).subtract(pt), v1 = t1Inside ? v2.negate()
            : c1.getPointAt(-offset).subtract(pt), v4 = t2Inside ? c4.getTangentAtTime(t2)
            : c4.getPointAt(offset).subtract(pt), v3 = t2Inside ? v4.negate()
            : c3.getPointAt(-offset).subtract(pt), a1 = v1.getAngle(), a2 = v2.getAngle(), a3 = v3.getAngle(), a4 = v4.getAngle();
        return !!(t1Inside
            ? (isInRange(a1, a3, a4) !== isInRange(a2, a3, a4)) &&
                (isInRange(a1, a4, a3) !== isInRange(a2, a4, a3))
            : (isInRange(a3, a1, a2) !== isInRange(a4, a1, a2)) &&
                (isInRange(a3, a2, a1) !== isInRange(a4, a2, a1)));
    };
    egCurveLocation.prototype.hasOverlap = function () {
        return !!this._overlap;
    };
    egCurveLocation.insert = function (locations, loc, merge) {
        var length = locations.length, l = 0, r = length - 1;
        function search(index, dir) {
            for (var i = index + dir; i >= -1 && i <= length; i += dir) {
                var loc2 = locations[((i % length) + length) % length];
                if (!loc.getPoint().isClose(loc2.getPoint(), 2e-7))
                    break;
                if (loc.equals(loc2))
                    return loc2;
            }
            return null;
        }
        while (l <= r) {
            var m = (l + r) >>> 1, loc2 = locations[m], found;
            if (merge && (found = loc.equals(loc2) ? loc2
                : (search(m, -1) || search(m, 1)))) {
                if (loc._overlap) {
                    found._overlap = found._intersection._overlap = true;
                }
                return found;
            }
            var path1 = loc.getPath(), path2 = loc2.getPath();
            var diff = path1 === path2
                ? (loc.getIndex() + loc.getTime())
                    - (loc2.getIndex() + loc2.getTime())
                : 0; //TODO //: path1._id - path2._id;
            if (diff < 0) {
                r = m - 1;
            }
            else {
                l = m + 1;
            }
        }
        locations.splice(l, 0, loc);
        return loc;
    };
    egCurveLocation.expand = function (locations) {
        var expanded = locations.slice();
        for (var i = locations.length - 1; i >= 0; i--) {
            egCurveLocation.insert(expanded, locations[i]._intersection, false);
        }
        return expanded;
    };
    egCurveLocation.prototype.getPoint = function () {
        return this._point;
    };
    //getPoint(): egPoint {
    //    var curve = this.getCurve(),
    //        time = this.getTime();
    //    return time != null && curve && curve.getPointAt(time, true);
    //}
    egCurveLocation.prototype.getTangent = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getTangentAt(time, true);
    };
    egCurveLocation.prototype.getNormal = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getNormalAt(time, true);
    };
    egCurveLocation.prototype.getWeightedTangent = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getWeightedTangentAt(time, true);
    };
    egCurveLocation.prototype.getWeightedNormal = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getWeightedNormalAt(time, true);
    };
    egCurveLocation.prototype.getCurvature = function () {
        var curve = this.getCurve(), time = this.getTime();
        return time != null && curve && curve.getCurvatureAt(time, true);
    };
    return egCurveLocation;
}());
var egPathIt = /** @class */ (function () {
    function egPathIt(path, flatness, maxRecursion, ignoreStraight, matrix) {
        var curves = [], parts = [], length = 0, minSpan = 1 / (maxRecursion || 32), segments = path._segments, segment1 = segments[0], segment2;
        function addCurve(segment1, segment2) {
            var curve = egCurve.getValues(segment1, segment2, matrix);
            curves.push(curve);
            computeParts(curve, segment1._index, 0, 1);
        }
        function computeParts(curve, index, t1, t2) {
            if ((t2 - t1) > minSpan
                && !(ignoreStraight && egCurve.isStraight(curve))
                && !egCurve.isFlatEnough(curve, flatness || 0.25)) {
                var halves = egCurve.subdivide(curve, 0.5), tMid = (t1 + t2) / 2;
                computeParts(halves[0], index, t1, tMid);
                computeParts(halves[1], index, tMid, t2);
            }
            else {
                var dx = curve[6] - curve[0], dy = curve[7] - curve[1], dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0) {
                    length += dist;
                    parts.push({
                        offset: length,
                        curve: curve,
                        index: index,
                        time: t2,
                    });
                }
            }
        }
        for (var i = 1, l = segments.length; i < l; i++) {
            segment2 = segments[i];
            addCurve(segment1, segment2);
            segment1 = segment2;
        }
        if (path._closed)
            addCurve(segment2, segments[0]);
        this.curves = curves;
        this.parts = parts;
        this.length = length;
        this.index = 0;
    }
    return egPathIt;
}());
var egPathFitter = /** @class */ (function () {
    function egPathFitter(path) {
        var points = this.points = [], segments = path._segments, closed = path._closed;
        for (var i = 0, prev, l = segments.length; i < l; i++) {
            var point = segments[i]._point;
            if (!prev || !prev.equals(point)) {
                points.push(prev = point.clone_());
            }
        }
        if (closed) {
            points.unshift(points[points.length - 1]);
            points.push(points[1]);
        }
        this.closed = closed;
    }
    egPathFitter.prototype.fit = function (error) {
        var points = this.points, length = points.length, segments = null;
        if (length > 0) {
            segments = [new egSegment(points[0])];
            if (length > 1) {
                this.fitCubic(segments, error, 0, length - 1, points[1].subtract(points[0]), points[length - 2].subtract(points[length - 1]));
                if (this.closed) {
                    segments.shift();
                    segments.pop();
                }
            }
        }
        return segments;
    };
    egPathFitter.prototype.fitCubic = function (segments, error, first, last, tan1, tan2) {
        var points = this.points;
        if (last - first === 1) {
            var pt1 = points[first], pt2 = points[last], dist = pt1.getDistance(pt2) / 3;
            this.addCurve(segments, [pt1, pt1.add(tan1.normalize(dist)),
                pt2.add(tan2.normalize(dist)), pt2]);
            return;
        }
        var uPrime = this.chordLengthParameterize(first, last), maxError = Math.max(error, error * error), split, parametersInOrder = true;
        for (var i = 0; i <= 4; i++) {
            var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
            var max = this.findMaxError(first, last, curve, uPrime);
            if (max.error < error && parametersInOrder) {
                this.addCurve(segments, curve);
                return;
            }
            split = max.index;
            if (max.error >= maxError)
                break;
            parametersInOrder = this.reparameterize(first, last, uPrime, curve);
            maxError = max.error;
        }
        var tanCenter = points[split - 1].subtract(points[split + 1]);
        this.fitCubic(segments, error, first, split, tan1, tanCenter);
        this.fitCubic(segments, error, split, last, tanCenter.negate(), tan2);
    };
    egPathFitter.prototype.addCurve = function (segments, curve) {
        var prev = segments[segments.length - 1];
        prev.setHandleOut(curve[1].subtract(curve[0]));
        segments.push(new egSegment(curve[3], curve[2].subtract(curve[3])));
    };
    egPathFitter.prototype.generateBezier = function (first, last, uPrime, tan1, tan2) {
        var epsilon = 1e-12, abs = Math.abs, points = this.points, pt1 = points[first], pt2 = points[last], C = [[0, 0], [0, 0]], X = [0, 0];
        for (var i = 0, l = last - first + 1; i < l; i++) {
            var u = uPrime[i], t = 1 - u, b = 3 * u * t, b0 = t * t * t, b1 = b * t, b2 = b * u, b3 = u * u * u, a1 = tan1.normalize(b1), a2 = tan2.normalize(b2), tmp = points[first + i]
                .subtract(pt1.multiply(b0 + b1))
                .subtract(pt2.multiply(b2 + b3));
            C[0][0] += a1.dot(a1);
            C[0][1] += a1.dot(a2);
            C[1][0] = C[0][1];
            C[1][1] += a2.dot(a2);
            X[0] += a1.dot(tmp);
            X[1] += a2.dot(tmp);
        }
        var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1], alpha1, alpha2;
        if (abs(detC0C1) > epsilon) {
            var detC0X = C[0][0] * X[1] - C[1][0] * X[0], detXC1 = X[0] * C[1][1] - X[1] * C[0][1];
            alpha1 = detXC1 / detC0C1;
            alpha2 = detC0X / detC0C1;
        }
        else {
            var c0 = C[0][0] + C[0][1], c1 = C[1][0] + C[1][1];
            if (abs(c0) > epsilon) {
                alpha1 = alpha2 = X[0] / c0;
            }
            else if (abs(c1) > epsilon) {
                alpha1 = alpha2 = X[1] / c1;
            }
            else {
                alpha1 = alpha2 = 0;
            }
        }
        var segLength = pt2.getDistance(pt1), eps = epsilon * segLength, handle1, handle2;
        if (alpha1 < eps || alpha2 < eps) {
            alpha1 = alpha2 = segLength / 3;
        }
        else {
            var line = pt2.subtract(pt1);
            handle1 = tan1.normalize(alpha1);
            handle2 = tan2.normalize(alpha2);
            if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
                alpha1 = alpha2 = segLength / 3;
                handle1 = handle2 = null;
            }
        }
        return [pt1,
            pt1.add(handle1 || tan1.normalize(alpha1)),
            pt2.add(handle2 || tan2.normalize(alpha2)),
            pt2];
    };
    egPathFitter.prototype.reparameterize = function (first, last, u, curve) {
        for (var i = first; i <= last; i++) {
            u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
        }
        for (var i = 1, l = u.length; i < l; i++) {
            if (u[i] <= u[i - 1])
                return false;
        }
        return true;
    };
    egPathFitter.prototype.findRoot = function (curve, point, u) {
        var curve1 = [], curve2 = [];
        for (var i = 0; i <= 2; i++) {
            curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
        }
        for (var i = 0; i <= 1; i++) {
            curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
        }
        var pt = this.evaluate(3, curve, u), pt1 = this.evaluate(2, curve1, u), pt2 = this.evaluate(1, curve2, u), diff = pt.subtract(point), df = pt1.dot(pt1) + diff.dot(pt2);
        if (Math.abs(df) < 1e-6)
            return u;
        return u - diff.dot(pt1) / df;
    };
    egPathFitter.prototype.evaluate = function (degree, curve, t) {
        var tmp = curve.slice();
        for (var i = 1; i <= degree; i++) {
            for (var j = 0; j <= degree - i; j++) {
                tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
            }
        }
        return tmp[0];
    };
    egPathFitter.prototype.chordLengthParameterize = function (first, last) {
        var u = [0];
        for (var i = first + 1; i <= last; i++) {
            u[i - first] = u[i - first - 1]
                + this.points[i].getDistance(this.points[i - 1]);
        }
        for (var i = 1, m = last - first; i <= m; i++) {
            u[i] /= u[m];
        }
        return u;
    };
    egPathFitter.prototype.findMaxError = function (first, last, curve, u) {
        var index = Math.floor((last - first + 1) / 2), maxDist = 0;
        for (var i = first + 1; i < last; i++) {
            var P = this.evaluate(3, curve, u[i - first]);
            var v = P.subtract(this.points[i]);
            var dist = v.x * v.x + v.y * v.y;
            if (dist >= maxDist) {
                maxDist = dist;
                index = i;
            }
        }
        return {
            error: maxDist,
            index: index
        };
    };
    return egPathFitter;
}());
var egHitResult = /** @class */ (function () {
    function egHitResult(type, path, opts) {
        this.type = type;
        if (path instanceof egPath) {
            this.xpath = path._parent;
            this.path = path;
        }
        else {
            this.xpath = path;
        }
        if (opts) {
            if (opts.loc)
                this.loc = opts.loc;
            if (opts.point)
                this.point = opts.point;
            if (opts.seg)
                this.seg = opts.seg;
        }
    }
    return egHitResult;
}());
var egStyle = /** @class */ (function () {
    function egStyle(args) {
        this.fill = args && args.fillColor || true;
        this.stroke = args && args.strokeColor || true;
        this.evenodd = args && args.evenodd || true;
        this.strokeWidth = args && args.strokeWidth || 1;
        this.strokeCap = args && args.strokeCap || 'butt';
        this.strokeJoin = args && args.strokeJoin || 'bevel';
        this.miterLimit = args && args.miterLimit || 10;
    }
    return egStyle;
}());
var egBoundOpt = /** @class */ (function () {
    function egBoundOpt(stroke, fill, internal, handle) {
        this._handle = handle === undefined ? false : handle;
        this._stroke = stroke === undefined ? false : stroke;
        this._fill = fill === undefined ? true : fill;
        this._internal = internal === undefined ? false : internal;
    }
    return egBoundOpt;
}());
var egHitOpt = /** @class */ (function () {
    function egHitOpt(fill, stroke, curves, evenodd, tolerance) {
        this._tolerance = tolerance;
        this._fill = fill;
        this._stroke = stroke;
        this._curves = curves;
        this._evenodd = evenodd;
    }
    return egHitOpt;
}());
var egPF = {
    Clockwise: 0x0001,
    AntiClockwise: 0x0002,
    OverlapsOnly: 0x0004,
    ValidOverlap: 0x0008,
};
var XPath = /** @class */ (function () {
    function XPath() {
        this._evenodd = true;
        this._children = [];
        this._bounds = undefined;
    }
    XPath.prototype.assign_ = function (path) {
        this._evenodd = path._evenodd;
        this._bounds = path._bounds && path._bounds.clone_() || undefined;
        for (var i = 0; i < path._children.length; i++) {
            var p = path._children[i].clone_();
            p._parent = this;
            p._index = i;
            this._children.push(p);
        }
    };
    XPath.prototype.clone_ = function () {
        var copy = new XPath();
        copy.assign_(this);
        return copy;
    };
    XPath.prototype.isEmpty = function () {
        return this._children.length === 0;
    };
    XPath.prototype.getFirstChild = function () {
        return this._children && this._children[0] || null;
    };
    XPath.prototype.getLastChild = function () {
        return this._children && this._children[this._children.length - 1] || null;
    };
    XPath.prototype.removeChild = function (path) {
        this._children.splice(path._index, 1);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i]._index = i;
            if (!this._children[i].isFlags(egPF.Clockwise | egPF.AntiClockwise) || this._children[i].isFlags(egPF.Clockwise) != (this._children[i]._index === 0))
                this._children[i].setClockwise(this._children[i]._index === 0);
        }
    };
    XPath.prototype.removeChildren = function (start, end) {
        start = start || 0;
        end = end || this._children.length;
        this._children.splice(start, end - start);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i]._index = i;
            if (!this._children[i].isFlags(egPF.Clockwise | egPF.AntiClockwise) || this._children[i].isFlags(egPF.Clockwise) != (this._children[i]._index === 0))
                this._children[i].setClockwise(this._children[i]._index === 0);
        }
    };
    XPath.prototype.addChild = function (path, index) {
        index = index || this._children.length;
        path._parent = this;
        this._children.splice(index, 0, path);
        for (var i = 0; i < this._children.length; i++)
            this._children[i]._index = i;
        if (!path.isFlags(egPF.Clockwise | egPF.AntiClockwise))
            path.setClockwise(path._index === 0);
    };
    XPath.prototype.addChildren = function (paths, index) {
        index = index || this._children.length;
        var args = Array(index, 0).concat(paths);
        this._children.splice.apply(this._children, args);
        for (var i = 0; i < this._children.length; i++) {
            this._children[i]._index = i;
            this._children[i]._parent = this;
        }
        for (var i = 0; i < paths.length; i++) {
            if (!paths[i].isFlags(egPF.Clockwise | egPF.AntiClockwise))
                paths[i].setClockwise(paths[i]._index === 0);
        }
    };
    XPath.prototype.setChildren = function (paths) {
        this.removeChildren();
        this.addChildren(paths);
    };
    XPath.prototype.getCurves = function () {
        var children = this._children, curves = [];
        for (var i = 0, l = children.length; i < l; i++)
            curves = curves.concat(children[i].getCurves());
        //curves.push.apply(curves, children[i].getCurves());
        return curves;
    };
    XPath.prototype.reduce = function (simplify) {
        var children = this._children;
        for (var i = children.length - 1; i >= 0; i--) {
            var path = children[i].reduce(simplify);
            if (path.isEmpty())
                path.remove();
        }
        return this;
    };
    XPath.prototype.reverse = function () {
        for (var i = 0, l = this._children.length; i < l; i++) {
            this._children[i].reverse();
        }
    };
    XPath.prototype.flatten = function (flatness) {
        for (var i = 0, l = this._children.length; i < l; i++) {
            this._children[i].flatten(flatness);
        }
    };
    XPath.prototype.simplify = function (tolerance) {
        var res = false;
        for (var i = 0, l = this._children.length; i < l; i++) {
            res = this._children[i].simplify(tolerance) || res;
        }
        return res;
    };
    XPath.prototype.smooth = function (xtype, xfactor, xfrom, xto) {
        for (var i = 0, l = this._children.length; i < l; i++) {
            this._children[i].smooth(xtype, xfactor, xfrom, xto);
        }
    };
    XPath.prototype.isClockwise = function () {
        var child = this.getFirstChild();
        return child && child.isClockwise();
    };
    XPath.prototype.setClockwise = function (clockwise) {
        if (this.isClockwise() !== clockwise)
            this.reverse();
    };
    XPath.prototype.getBounds = function (opt, style, mx) {
        var res = new egRect(), st = style || new egStyle();
        for (var i = 0, l = this._children.length; i < l; i++) {
            res = res.unite(this._children[i].getBounds(opt, st, null));
        }
        return res;
    };
    XPath.prototype.contains = function (point, evenodd) {
        var winding = point.isInside(this.getBounds(new egBoundOpt(false, false, true, true)))
            && this._getWinding(point);
        return !!(evenodd ? winding & 1 : winding);
    };
    XPath.prototype.getIntersections = function (path, include, returnFirst) {
        var self = this === path || !path;
        if (!self && !this.getBounds().touches(path.getBounds()))
            return [];
        var curves1 = this.getCurves(), curves2 = self ? curves1 : path.getCurves(), length1 = curves1.length, length2 = self ? length1 : curves2.length, values2 = [], arrays = [], locations, pathx;
        for (var i = 0; i < length2; i++)
            values2[i] = curves2[i].getValues();
        for (var i = 0; i < length1; i++) {
            var curve1 = curves1[i], values1 = self ? values2[i] : curve1.getValues(), path1 = curve1.getPath();
            if (path1 !== pathx) {
                pathx = path1;
                locations = [];
                arrays.push(locations);
            }
            if (self) {
                egCurve._getSelfIntersection(values1, curve1, locations, {
                    include: include,
                    excludeStart: length1 === 1 &&
                        curve1.getPoint1().equals(curve1.getPoint2())
                });
            }
            for (var j = self ? i + 1 : 0; j < length2; j++) {
                if (returnFirst && locations.length)
                    return locations;
                var curve2 = curves2[j];
                egCurve._getIntersections(values1, values2[j], curve1, curve2, locations, {
                    include: include,
                    excludeStart: self && curve1.getPrevious() === curve2,
                    excludeEnd: self && curve1.getNext() === curve2
                });
            }
        }
        locations = [];
        for (var i = 0, l = arrays.length; i < l; i++) {
            locations.push.apply(locations, arrays[i]);
        }
        return locations;
    };
    XPath.prototype.getCrossings = function (path) {
        return this.getIntersections(path, function (inter) {
            return inter._overlap || inter.isCrossing();
        });
    };
    XPath.prototype.getNearestLocation = function (point) {
        var curves = this.getCurves(), minDist = Infinity, minLoc = null;
        for (var i = 0, l = curves.length; i < l; i++) {
            var loc = curves[i].getNearestLocation(point);
            if (loc._distance < minDist) {
                minDist = loc._distance;
                minLoc = loc;
            }
        }
        return minLoc;
    };
    XPath.prototype.getNearestPoint = function (point) {
        var loc = this.getNearestLocation.apply(this, point);
        return loc ? loc.getPoint() : loc;
    };
    XPath.prototype.interpolate = function (from, to, factor) {
        var itemsFrom = from._children, itemsTo = to._children, items = this._children;
        if (!itemsFrom || !itemsTo || itemsFrom.length !== itemsTo.length) {
            throw new Error('Edraw Err 101');
        }
        var current = items.length, length = itemsTo.length;
        if (current < length) {
            for (var i = current; i < length; i++) {
                this.addChild(new egPath());
            }
        }
        else if (current > length) {
            this.removeChildren(length, current);
        }
        for (var i = 0; i < length; i++) {
            items[i].interpolate(itemsFrom[i], itemsTo[i], factor);
        }
    };
    //static _operators = {
    //    unite: { 1: true },
    //    intersect: { 2: true },
    //    subtract: { 1: true },
    //    exclude: { 1: true }
    //};
    XPath._preparePath = function (path, resolve) {
        var res = path.clone_().reduce(true);
        //.transform(null, true, true);
        return resolve ? res.resolveCrossings() : res;
    };
    XPath._createResult = function (paths, reduce, path1, path2) {
        var result = new XPath();
        result.addChildren(paths);
        if (reduce)
            result = result.reduce(true);
        //result.insertAbove(path2 && path1.isSibling(path2)
        //    && path1.getIndex() < path2.getIndex() ? path2 : path1);
        //result.copyAttributes(path1, true);
        return result;
    };
    //intersect 1
    //unite 2
    //subtract 3
    //exclude 4
    XPath._computeBoolean = function (path1, path2, operation) {
        var operator = operation;
        if (path1._children.length === 1 && !path1._children[0]._closed)
            return XPath._computeOpenBoolean(path1, path2, operator);
        var _path1 = XPath._preparePath(path1, true), _path2 = path2 && path1 !== path2 && XPath._preparePath(path2, true);
        if (_path2 && (operator === 3 || operator === 4)
            !== (_path2.isClockwise() !== _path1.isClockwise()))
            _path2.reverse();
        var crossings = XPath._divideLocations(egCurveLocation.expand(_path1.getCrossings(_path2))), segments = [], monoCurves = [];
        function collect(paths) {
            for (var i = 0, l = paths.length; i < l; i++) {
                var path = paths[i];
                segments.push.apply(segments, path._segments);
                monoCurves.push.apply(monoCurves, path._getMonoCurves());
                path._overlapsOnly = path._validOverlapsOnly = true;
            }
        }
        collect(_path1._children || [_path1]);
        if (_path2)
            collect(_path2._children || [_path2]);
        for (var i = 0, l = crossings.length; i < l; i++) {
            XPath._propagateWinding(crossings[i]._segment, _path1, _path2, monoCurves, operator);
        }
        for (var i = 0, l = segments.length; i < l; i++) {
            var segment = segments[i], inter = segment._intersection;
            if (segment._winding == null) {
                XPath._propagateWinding(segment, _path1, _path2, monoCurves, operator);
            }
            if (!(inter && inter._overlap)) {
                var path = segment._path;
                path._overlapsOnly = false;
                if ((segment._winding === 1 && operator > 1) || (operator === 1 && segment._winding === 2))
                    path._validOverlapsOnly = false;
            }
        }
        return XPath._createResult(XPath._tracePaths(segments, operator), true, path1, path2);
    };
    XPath._computeOpenBoolean = function (path1, path2, operator) {
        if (!path2 || path2._children.length === 1 && !path2._children[0]._closed
            || operator !== 3 && operator !== 1) //!subtract && !intersect
            return null;
        var _path1 = XPath._preparePath(path1, false), _path2 = XPath._preparePath(path2, false), crossings = _path1.getCrossings(_path2), sub = operator === 3, //subtract,
        paths = [];
        function addPath(path) {
            if (_path2.contains(path.getPointAt(path.getLength() / 2), _path2._evenodd) !== sub) {
                paths.unshift(path);
                return true;
            }
        }
        var path11 = _path1._children[0]; //only one path and not closed.
        for (var i = crossings.length - 1; i >= 0; i--) {
            var path = crossings[i].split();
            if (path) {
                if (addPath(path))
                    path.getFirstSegment().setHandleIn(new egPoint(0, 0));
                path11.getLastSegment().setHandleOut(new egPoint(0, 0));
            }
        }
        addPath(path11);
        //CHECK
        return XPath._createResult(paths, false, path1, path2);
    };
    XPath._linkIntersections = function (from, to) {
        var prev = from;
        while (prev) {
            if (prev === to)
                return;
            prev = prev._previous;
        }
        while (from._next && from._next !== to)
            from = from._next;
        if (!from._next) {
            while (to._previous)
                to = to._previous;
            from._next = to;
            to._previous = from;
        }
    };
    XPath._divideLocations = function (locations, include) {
        var results = include && [], tMin = 4e-7, tMax = 1 - tMin, noHandles = false, clearCurves = [], prevCurve, prevTime;
        for (var i = locations.length - 1; i >= 0; i--) {
            var loc = locations[i];
            if (include) {
                if (!include(loc))
                    continue;
                results.unshift(loc);
            }
            var curve = loc._curve, time = loc._time, origTime = time, segment;
            if (curve !== prevCurve) {
                noHandles = !curve.hasHandles();
            }
            else if (prevTime >= tMin && prevTime <= tMax) {
                time /= prevTime;
            }
            if (time < tMin) {
                segment = curve._segment1;
            }
            else if (time > tMax) {
                segment = curve._segment2;
            }
            else {
                var newCurve = curve.divideAtTime(time, true);
                if (noHandles)
                    clearCurves.push(curve, newCurve);
                segment = newCurve._segment1;
            }
            loc._setSegment(segment);
            var inter = segment._intersection, dest = loc._intersection;
            if (inter) {
                XPath._linkIntersections(inter, dest);
                var other = inter;
                while (other) {
                    XPath._linkIntersections(other._intersection, inter);
                    other = other._next;
                }
            }
            else {
                segment._intersection = dest;
            }
            prevCurve = curve;
            prevTime = origTime;
        }
        for (var i = 0, l = clearCurves.length; i < l; i++) {
            clearCurves[i].clearHandles();
        }
        return results || locations;
    };
    XPath._getWinding = function (point, curves, horizontal) {
        var epsilon = 2e-7, px = point.x, py = point.y, windLeft = 0, windRight = 0, length = curves.length, roots = [], abs = Math.abs;
        if (horizontal) {
            var yTop = -Infinity, yBottom = Infinity, yBefore = py - epsilon, yAfter = py + epsilon;
            for (var i = 0; i < length; i++) {
                var values = curves[i].values, count = egCurve.solveCubic(values, 0, px, roots, 0, 1);
                for (var j = count - 1; j >= 0; j--) {
                    var y = egCurve.getPoint(values, roots[j]).y;
                    if (y < yBefore && y > yTop) {
                        yTop = y;
                    }
                    else if (y > yAfter && y < yBottom) {
                        yBottom = y;
                    }
                }
            }
            yTop = (yTop + py) / 2;
            yBottom = (yBottom + py) / 2;
            if (yTop > -Infinity)
                windLeft = XPath._getWinding(new egPoint(px, yTop), curves).winding;
            if (yBottom < Infinity)
                windRight = XPath._getWinding(new egPoint(px, yBottom), curves).winding;
        }
        else {
            var xBefore = px - epsilon, xAfter = px + epsilon, prevWinding, prevXEnd, windLeftOnCurve = 0, windRightOnCurve = 0, isOnCurve = false;
            for (var i = 0; i < length; i++) {
                var curve = curves[i], winding = curve.winding, values = curve.values, yStart = values[1], yEnd = values[7];
                if (curve.last) {
                    prevWinding = curve.last.winding;
                    prevXEnd = curve.last.values[6];
                    isOnCurve = false;
                }
                if (py >= yStart && py <= yEnd || py >= yEnd && py <= yStart) {
                    if (winding) {
                        var x = py === yStart ? values[0]
                            : py === yEnd ? values[6]
                                : egCurve.solveCubic(values, 1, py, roots, 0, 1) === 1
                                    ? egCurve.getPoint(values, roots[0]).x
                                    : null;
                        if (x != null) {
                            if (x >= xBefore && x <= xAfter) {
                                isOnCurve = true;
                            }
                            else if ((py !== yStart || winding !== prevWinding)
                                && !(py === yStart
                                    && (px - x) * (px - prevXEnd) < 0)) {
                                if (x < xBefore) {
                                    windLeft += winding;
                                }
                                else if (x > xAfter) {
                                    windRight += winding;
                                }
                            }
                        }
                        prevWinding = winding;
                        prevXEnd = values[6];
                    }
                    else if ((px - values[0]) * (px - values[6]) <= 0) {
                        isOnCurve = true;
                    }
                }
                if (isOnCurve && (i >= length - 1 || curves[i + 1].last)) {
                    windLeftOnCurve += 1;
                    windRightOnCurve -= 1;
                }
            }
            if (windLeft === 0 && windRight === 0) {
                windLeft = windLeftOnCurve;
                windRight = windRightOnCurve;
            }
        }
        return {
            winding: Math.max(abs(windLeft), abs(windRight)),
            contour: (!windLeft) !== (!windRight)
        };
    };
    XPath._propagateWinding = function (segment, path1, path2, monoCurves, operator) {
        var chain = [], start = segment, totalLength = 0, winding;
        var curveTemp = segment.getCurve(); // 线段终点是最右边的线段
        do {
            var curve1 = segment.getCurve(), length = curve1 && curve1.getLength();
            chain.push({ segment: segment, curve: curve1, length: length });
            totalLength += length;
            if (curveTemp._segment2._point._x <= curve1._segment2._point._x) {
                curveTemp = curve1;
            }
            segment = segment.getNext();
        } while (segment && !segment._intersection && segment !== start);
        var length = totalLength / 2;
        for (var j = 0, l = chain.length; j < l; j++) {
            var entry = chain[j], curveLength = entry.length;
            if (length <= curveLength) {
                var curve = entry.curve, path = curve._path, parent = path._parent, t = curve.getTimeAt(length), pt = curve.getPointAtTime(t), hor = Math.abs(curve.getTangentAtTime(t).y)
                    < 1e-7;
                // pt = curve._segment2._point;
                // console.log(t);
                // console.log("%c%s", "color:green", "oldPoint" + pt)
                if (t >= 1 || 2e-7 > t) // 倾斜的矩形使用最右边的点
                    pt = curveTemp._segment2._point;
                // console.log("%c%s","color:green","newPoint"+curveTemp._segment2._point)
                path = parent;
                // console.log(pt);
                //operator === "subtract"
                winding = !(operator === 3 && path2 && (path === path1 && path2._getWinding(pt, hor) ||
                    path === path2 && !path1._getWinding(pt, hor)))
                    ? XPath._getWinding(pt, monoCurves, hor)
                    : { winding: 0 };
                break;
            }
            length -= curveLength;
        }
        console.log("chain.length: " + chain.length + " winding: " + winding.winding);
        for (var j = chain.length - 1; j >= 0; j--) {
            var seg = chain[j].segment;
            seg._winding = winding.winding;
            seg._contour = winding.contour;
        }
    };
    XPath._tracePaths = function (segments, operator) {
        var paths = [], start, otherStart;
        function isValid(seg, excludeContour) {
            return !!(seg && !seg._visited && (!operator
                || (operator === 1 && seg._winding === 2) || (operator > 1 && seg._winding === 1)
                || !excludeContour && operator === 2 && seg._contour)); //operator === "unite"
        }
        function isStart(seg) {
            return seg === start || seg === otherStart;
        }
        function findBestIntersection(inter, exclude) {
            if (!inter._next)
                return inter;
            while (inter) {
                var seg = inter._segment, nextSeg = seg.getNext(), nextInter = nextSeg && nextSeg._intersection;
                if (seg !== exclude && (isStart(seg) || isStart(nextSeg)
                    || !seg._visited && !nextSeg._visited
                        && (!operator || isValid(seg) && (isValid(nextSeg)
                            || nextInter && isValid(nextInter._segment)))))
                    return inter;
                inter = inter._next;
            }
            return null;
        }
        for (var i = 0, l = segments.length; i < l; i++) {
            var path = null, finished = false, seg = segments[i], inter = seg._intersection, handleIn;
            if (!seg._visited && seg._path._overlapsOnly) {
                var path1 = seg._path, path2 = inter._segment._path, segments1 = path1._segments, segments2 = path2._segments;
                if (egSegment.segsEquals(segments1, segments2)) {
                    if ((operator === 2 || operator === 1) //unite || intersect
                        && path1.getArea()) {
                        paths.push(path1.clone_());
                    }
                    for (var j = 0, k = segments1.length; j < k; j++) {
                        segments1[j]._visited = segments2[j]._visited = true;
                    }
                }
            }
            if (!isValid(seg, true)
                || !seg._path._validOverlapsOnly && inter && inter._overlap)
                continue;
            start = otherStart = null;
            while (true) {
                inter = inter && findBestIntersection(inter, seg) || inter;
                var other = inter && inter._segment;
                if (isStart(seg)) {
                    finished = true;
                }
                else if (other) {
                    if (isStart(other)) {
                        finished = true;
                        seg = other;
                    }
                    else if (isValid(other, isValid(seg, true))) {
                        if (operator
                            && (operator === 1 || operator === 3)) { //intersect || subtract
                            seg._visited = true;
                        }
                        seg = other;
                    }
                }
                if (finished || seg._visited) {
                    seg._visited = true;
                    break;
                }
                if (seg._path._validOverlapsOnly && !isValid(seg))
                    break;
                if (!path) {
                    path = new egPath();
                    start = seg;
                    otherStart = other;
                }
                var next = seg.getNext();
                path.add(new egSegment(seg._point, handleIn, next && seg._handleOut));
                seg._visited = true;
                seg = next || seg._path.getFirstSegment();
                handleIn = next && next._handleIn;
                inter = seg._intersection;
            }
            if (finished) {
                path.getFirstSegment().setHandleIn(handleIn);
                path.setClosed(true);
            }
            else if (path) {
                var area = path.getArea(true);
                if (Math.abs(area) >= 2e-7) {
                    console.error('Boolean operation resulted in open path', 'segments =', path._segments.length, 'length =', path.getLength(), 'area=', area);
                }
                path = null;
            }
            if (path && (path._segments.length > 8
                || !egMath.isZero(path.getArea()))) {
                paths.push(path);
                path = null;
            }
        }
        return paths;
    };
    XPath.prototype._getWinding = function (point, horizontal) {
        return XPath._getWinding(point, this._getMonoCurves(), horizontal).winding;
    };
    XPath.prototype.unite = function (path) {
        return XPath._computeBoolean(this, path, 2); //'unite'
    };
    XPath.prototype.intersect = function (path) {
        return XPath._computeBoolean(this, path, 1); //'intersect'
    };
    XPath.prototype.subtract = function (path) {
        return XPath._computeBoolean(this, path, 3); //'subtract'
    };
    XPath.prototype.exclude = function (path) {
        return XPath._computeBoolean(this, path, 4); //'exclude'
    };
    XPath.prototype.divide = function (path) {
        //CHECK
        //return XPath._createResult([this.subtract(path),
        //    this.intersect(path)], true, this, path);
        return [this.subtract(path),
            this.intersect(path)];
    };
    XPath.prototype.resolveCrossings = function () {
        var children = this._children, paths = children;
        function hasOverlap(seg) {
            var inter = seg && seg._intersection;
            return inter && inter._overlap;
        }
        var hasOverlaps = false, hasCrossings = false, intersections = this.getIntersections(null, function (inter) {
            return inter._overlap && (hasOverlaps = true)
                || inter.isCrossing() && (hasCrossings = true);
        });
        intersections = egCurveLocation.expand(intersections);
        if (hasOverlaps) {
            var overlaps = XPath._divideLocations(intersections, function (inter) {
                return inter._overlap;
            });
            for (var i = overlaps.length - 1; i >= 0; i--) {
                var seg = overlaps[i]._segment, prev = seg.getPrevious(), next = seg.getNext();
                if (seg._path && hasOverlap(prev) && hasOverlap(next)) {
                    seg.remove();
                    prev._handleOut.set(0, 0);
                    next._handleIn.set(0, 0);
                    var curve = prev.getCurve();
                    if (curve.isStraight() && curve.getLength() === 0)
                        prev.remove();
                }
            }
        }
        if (hasCrossings) {
            XPath._divideLocations(intersections, !hasOverlaps ? null : function (inter) {
                var curve1 = inter.getCurve(), curve2 = inter._intersection._curve, seg = inter._segment;
                if (curve1 && curve2 && curve1._path && curve2._path) {
                    return true;
                }
                else if (seg) {
                    seg._intersection = null;
                }
            });
            var tmpSegs = [];
            for (var i = 0; i < paths.length; i++) {
                tmpSegs = tmpSegs.concat(paths[i]._segments);
            }
            paths = XPath._tracePaths(tmpSegs, null);
        }
        var length = paths.length;
        if (length > 1) {
            paths = paths.slice().sort(function (a, b) {
                return b.getBounds().getArea() - a.getBounds().getArea();
            });
            var first = paths[0], items = [first], excluded = {}, windings = [];
            if (!this._evenodd) {
                for (var j = 0; j < paths.length; j++) {
                    windings.push(paths[j].isClockwise() ? 1 : -1);
                }
            }
            for (var i = 1; i < length; i++) {
                var path = paths[i], point = path.getInteriorPoint(this._evenodd), isContained = false, container = null, exclude = false;
                for (var j = i - 1; j >= 0 && !container; j--) {
                    if (paths[j].contains(point, this._evenodd)) {
                        if (!this._evenodd && !isContained) {
                            windings[i] += windings[j];
                            if (windings[i] && windings[j]) {
                                exclude = excluded[i] = true;
                                break;
                            }
                        }
                        isContained = true;
                        container = !excluded[j] && paths[j];
                    }
                }
                if (!exclude) {
                    path.setClockwise(container ? !container.isClockwise()
                        : first.isClockwise());
                    items.push(path);
                }
            }
            paths = items;
            length = items.length;
        }
        if (paths !== children)
            this.setChildren(paths);
        return this;
    };
    XPath.prototype._getMonoCurves = function () {
        var children = this._children, monoCurves = [];
        for (var i = 0, l = children.length; i < l; i++)
            monoCurves.push.apply(monoCurves, children[i]._getMonoCurves());
        return monoCurves;
    };
    XPath.prototype._hitTestSelf = function (point, options) {
        if (options._fill && this.contains(point, options._evenodd))
            return new egHitResult('fill', this);
        else
            return null;
    };
    XPath.prototype._hitTestChildren = function (point, options, style) {
        var res = null;
        options._fill = false;
        for (var i = 0, l = this._children.length; i < l; i++) {
            res = this._children[i]._hitTestSelf(point, options, style);
            if (res)
                break;
        }
        return res;
    };
    XPath.prototype.hitTest = function (point, options, style) {
        if (this.isEmpty()) {
            return null;
        }
        var tolerance = Math.max(options._tolerance || 0.1, 1e-5), tolerPadding = new egSize(egPath._getStrokePadding(tolerance));
        if (!point || !this._children &&
            !this.getBounds(new egBoundOpt(true, false, true, true))
                .expand(tolerPadding.multiply(2)).containsPt(point)) {
            return null;
        }
        //var checkSelf = !(options.guides && !this._guide
        //    || options.selected && !this.isSelected()
        //    || options.type && options.type !== Base.hyphenate(this._class)
        //    || options.class && !(this instanceof options.class)),
        //    callback = options.match,
        //    that = this,
        //    bounds,
        //    res;
        //function match(hit) {
        //    return !callback || hit && callback(hit) ? hit : null;
        //}
        //function checkBounds(type, part) {
        //    var pt = bounds['get' + part]();
        //    if (point.subtract(pt).divide(tolerancePadding).length <= 1) {
        //        return new egHitResult(type, that,
        //            { name: Base.hyphenate(part), point: pt });
        //    }
        //}
        //if (checkSelf && (options.center || options.bounds) && this._parent) {
        //    bounds = this.getInternalBounds();
        //    if (options.center) {
        //        res = checkBounds('center', 'Center');
        //    }
        //    if (!res && options.bounds) {
        //        var points = [
        //            'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
        //            'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
        //        ];
        //        for (var i = 0; i < 8 && !res; i++) {
        //            res = checkBounds('bounds', points[i]);
        //        }
        //    }
        //    res = match(res);
        //}
        var res = this._hitTestSelf(point, options) ||
            this._hitTestChildren(point, options, style) || null;
        return res;
    };
    XPath.prototype.splitAt = function (offset) {
        var length = 0;
        if (offset < 0) {
            offset = -offset;
            for (var i = this._children.length - 1; i >= 0; i--) {
                length += this._children[i].getLength();
                if (offset < length)
                    return this._children[i].splitAt(length - offset);
            }
        }
        else {
            for (var i = 0; i < this._children.length; i++) {
                length += this._children[i].getLength();
                if (offset < length)
                    return this._children[i].splitAt(offset);
            }
        }
        return null;
    };
    XPath.prototype.toCanvas = function (ctx) {
        for (var k = 0; k < this._children.length; k++) {
            var path = this._children[k];
            if (path._segments.length > 1) {
                var seg1 = path._segments[0], seg2 = seg1;
                for (var i = 0, l = path._segments.length - 1; i < l; i++) {
                    seg1 = seg2;
                    seg2 = path._segments[i + 1];
                    var startPt = seg1._point, outPt = seg1._handleOut, endPt = seg2._point, inPt = seg2._handleIn;
                    if (i === 0)
                        ctx.moveTo(startPt.x, startPt.y);
                    if (outPt._x !== 0 || outPt._y !== 0 || inPt._x !== 0 || inPt._y !== 0)
                        ctx.bezierCurveTo(startPt.x + outPt.x, startPt.y + outPt.y, endPt.x + inPt.x, endPt.y + inPt.y, endPt.x, endPt.y);
                    else
                        ctx.lineTo(endPt.x, endPt.y);
                }
                if (path.isClosed()) {
                    seg1 = seg2;
                    seg2 = path._segments[0];
                    var startPt = seg1._point, outPt = seg1._handleOut, endPt = seg2._point, inPt = seg2._handleIn;
                    if (outPt._x !== 0 || outPt._y !== 0 || inPt._x !== 0 || inPt._y !== 0)
                        ctx.bezierCurveTo(startPt.x + outPt.x, startPt.y + outPt.y, endPt.x + inPt.x, endPt.y + inPt.y, endPt.x, endPt.y);
                    else
                        ctx.lineTo(endPt.x, endPt.y);
                    ctx.closePath();
                }
            }
        }
    };
    return XPath;
}());
var egPath = /** @class */ (function () {
    function egPath(arg) {
        this._closed = false;
        this._flags = 0;
        this._overlapsOnly = undefined;
        this._validOverlapsOnly = undefined;
        this._version = 0;
        this._index = 0;
        this._area = undefined;
        this._parent = undefined;
        this._segments = [];
        this._curves = undefined;
        this._monoCurves = undefined;
        if (arg) {
            if (arg.closed)
                this._closed = arg.closed;
            if (arg.parent)
                this._parent = arg.parent;
        }
    }
    egPath.prototype.assign_ = function (path) {
        if (path) {
            this._closed = path._closed;
            for (var i = 0; i < path._segments.length; i++) {
                var seg = path._segments[i].clone_();
                seg._path = this;
                seg._index = i;
                this._segments.push(seg);
            }
            //this._clockwise = path._clockwise;
            //this._length = path._length;
            //this._area = path._area;
            //if (path._curves) {
            //    for (let i = 0; i < path._curves.length; i++)
            //        this._curves.push(path._curves[i].clone_());
            //}
            //if (path._monoCurves) {
            //    for (let i = 0; i < path._monoCurves.length; i++)
            //        this._monoCurves.push(path._monoCurves[i]);
            //}
        }
    };
    egPath.prototype.clone_ = function () {
        var copy = new egPath();
        copy.assign_(this);
        return copy;
    };
    egPath.prototype.addFlags = function (flag) {
        this._flags |= flag;
    };
    egPath.prototype.removeFlags = function (flag) {
        this._flags &= ~flag;
    };
    egPath.prototype.isFlags = function (flag) {
        return (this._flags & flag) != 0;
    };
    //------------XPath
    egPath.prototype.contains = function (point, evenodd) {
        var winding = point.isInside(this.getBounds(new egBoundOpt(false, false, true, true)))
            && this._getWinding(point);
        return !!(evenodd ? winding & 1 : winding);
    };
    egPath.prototype.getNearestLocation = function (point) {
        var curves = this.getCurves(), minDist = Infinity, minLoc = null;
        for (var i = 0, l = curves.length; i < l; i++) {
            var loc = curves[i].getNearestLocation(point);
            if (loc._distance < minDist) {
                minDist = loc._distance;
                minLoc = loc;
            }
        }
        return minLoc;
    };
    egPath.prototype.remove = function () {
        if (this._parent)
            this._parent.removeChild(this);
    };
    egPath.prototype._getWinding = function (point, horizontal) {
        return XPath._getWinding(point, this._getMonoCurves(), horizontal).winding;
    };
    egPath.prototype.interpolate = function (from, to, factor) {
        var itemsFrom = from._segments, itemsTo = to._segments, items = this._segments;
        if (!itemsFrom || !itemsTo || itemsFrom.length !== itemsTo.length) {
            throw new Error('Edraw Err 102');
        }
        var current = items.length, length = itemsTo.length;
        if (current < length) {
            for (var i = current; i < length; i++) {
                this.add(new egSegment());
            }
        }
        else if (current > length) {
            this.removeSegments(length, current);
        }
        for (var i = 0; i < length; i++) {
            items[i].interpolate(itemsFrom[i], itemsTo[i], factor);
        }
        this.setClosed(from._closed);
    };
    //-------------End
    egPath.prototype.equals = function (item) {
        return this._closed === item._closed
            && egSegment.segsEquals(this._segments, item._segments);
    };
    egPath.prototype.getSegments = function () {
        return this._segments;
    };
    egPath.prototype.setSegments = function (segments) {
        this._segments.length = 0;
        this._curves = undefined;
        if (segments && segments.length > 0)
            this._add(segments);
    };
    egPath.prototype.getFirstSegment = function () {
        return this._segments[0];
    };
    egPath.prototype.getLastSegment = function () {
        return this._segments[this._segments.length - 1];
    };
    egPath.prototype.getCurves = function () {
        var curves = this._curves, segments = this._segments;
        if (!curves) {
            var length = this._countCurves();
            curves = this._curves = new Array(length);
            for (var i = 0; i < length; i++)
                curves[i] = new egCurve(this, segments[i], segments[i + 1] || segments[0]);
        }
        return curves;
    };
    egPath.prototype.getFirstCurve = function () {
        return this.getCurves()[0];
    };
    egPath.prototype.getLastCurve = function () {
        var curves = this.getCurves();
        return curves[curves.length - 1];
    };
    egPath.prototype.isClosed = function () {
        return this._closed;
    };
    egPath.prototype.setClosed = function (closed) {
        if (this._closed != (closed = !!closed)) {
            this._closed = closed;
            if (this._curves) {
                var length = this._curves.length = this._countCurves();
                if (closed)
                    this._curves[length - 1] = new egCurve(this, this._segments[length - 1], this._segments[0]);
            }
        }
    };
    egPath.prototype.getPathData = function (_matrix, _precision) {
        if (_precision === void 0) { _precision = 5; }
        var segments = this._segments, length = segments.length, f = new egFormatter(_precision), coords = new Array(6), first = true, curX, curY, prevX, prevY, inX, inY, outX, outY, parts = [];
        function addSegment(segment, skipLine) {
            segment._transformCoordinates(_matrix, coords);
            curX = coords[0];
            curY = coords[1];
            if (first) {
                parts.push('M' + f.pair(curX, curY));
                first = false;
            }
            else {
                inX = coords[2];
                inY = coords[3];
                if (inX === curX && inY === curY
                    && outX === prevX && outY === prevY) {
                    if (!skipLine)
                        parts.push('l' + f.pair(curX - prevX, curY - prevY));
                }
                else {
                    parts.push('c' + f.pair(outX - prevX, outY - prevY)
                        + ' ' + f.pair(inX - prevX, inY - prevY)
                        + ' ' + f.pair(curX - prevX, curY - prevY));
                }
            }
            prevX = curX;
            prevY = curY;
            outX = coords[4];
            outY = coords[5];
        }
        if (length === 0)
            return '';
        for (var i = 0; i < length; i++)
            addSegment(segments[i]);
        if (this._closed && length > 0) {
            addSegment(segments[0], true);
            parts.push('z');
        }
        return parts.join('');
    };
    egPath.prototype.isEmpty = function () {
        return this._segments.length === 0;
    };
    egPath.prototype._transformContent = function (matrix) {
        var coords = new Array(6);
        for (var i = 0, l = this._segments.length; i < l; i++)
            this._segments[i]._transformCoordinates(matrix, coords, true);
        return true;
    };
    egPath.prototype._add = function (segs, index) {
        var segments = this._segments, curves = this._curves, amount = segs.length, append = index == null, index = append ? segments.length : index;
        for (var i = 0; i < amount; i++) {
            var segment = segs[i];
            if (segment._path)
                segment = segs[i] = segment.clone_();
            segment._path = this;
            segment._index = index + i;
        }
        if (append) {
            segments.push.apply(segments, segs);
        }
        else {
            segments.splice.apply(segments, Array(index, 0).concat(segs));
            for (var i = index + amount, l = segments.length; i < l; i++)
                segments[i]._index = i;
        }
        if (curves) {
            var total = this._countCurves(), start = index > 0 && index + amount - 1 === total ? index - 1
                : index, insert = start, end = Math.min(start + amount, total);
            //CHECK
            //if (segs._curves) {
            //    curves.splice.apply(curves, [start, 0].concat(segs._curves));
            //    insert += segs._curves.length;
            //}
            for (var i = insert; i < end; i++)
                curves.splice(i, 0, new egCurve(this, null, null));
            this._adjustCurves(start, end);
        }
        return segs;
    };
    egPath.prototype._adjustCurves = function (start, end) {
        var segments = this._segments, curves = this._curves, curve;
        for (var i = start; i < end; i++) {
            curve = curves[i];
            curve._path = this;
            curve._segment1 = segments[i];
            curve._segment2 = segments[i + 1] || segments[0];
            curve._changed();
        }
        if (curve = curves[this._closed && start === 0 ? segments.length - 1
            : start - 1]) {
            curve._segment2 = segments[start] || segments[0];
            curve._changed();
        }
        if (curve = curves[end]) {
            curve._segment1 = segments[end];
            curve._changed();
        }
    };
    egPath.prototype._countCurves = function () {
        var length = this._segments.length;
        return !this._closed && length > 0 ? length - 1 : length;
    };
    egPath.prototype.add = function (seg) {
        return Array.isArray(seg)
            ? this._add(seg)[0]
            : this._add(new Array(seg))[0];
    };
    egPath.prototype.insert = function (index, seg) {
        return Array.isArray(seg)
            ? this._add(seg, index)[0]
            : this._add(new Array(seg), index)[0];
    };
    egPath.prototype.addSegment = function (seg) {
        return this._add(new Array(seg))[0];
    };
    egPath.prototype.insertSegment = function (index, seg) {
        return this._add(new Array(seg), index)[0];
    };
    egPath.prototype.addSegments = function (segs) {
        return this._add(segs);
    };
    egPath.prototype.insertSegments = function (index, segs) {
        return this._add(segs, index);
    };
    egPath.prototype.removeSegment = function (index) {
        return this.removeSegments(index, index + 1)[0] || null;
    };
    egPath.prototype.removeSegments = function (start, end, _includeCurves) {
        start = start || 0;
        end = end !== undefined ? end : this._segments.length;
        var segments = this._segments, curves = this._curves, count = segments.length, removed = segments.splice(start, end - start), amount = removed.length;
        if (!amount)
            return removed;
        for (var i = 0; i < amount; i++) {
            var segment = removed[i];
            segment._index = segment._path = null;
        }
        for (var i = start, l = segments.length; i < l; i++)
            segments[i]._index = i;
        if (curves) {
            var index = start > 0 && end === count + (this._closed ? 1 : 0)
                ? start - 1
                : start, curves = curves.splice(index, amount);
            for (var i = curves.length - 1; i >= 0; i--)
                curves[i]._path = null;
            //CHECK
            //if (_includeCurves)
            //    removed._curves = curves.slice(1);
            this._adjustCurves(index, index);
        }
        return removed;
    };
    egPath.prototype.hasHandles = function () {
        var segments = this._segments;
        for (var i = 0, l = segments.length; i < l; i++) {
            if (segments[i].hasHandles())
                return true;
        }
        return false;
    };
    egPath.prototype.clearHandles = function () {
        var segments = this._segments;
        for (var i = 0, l = segments.length; i < l; i++)
            segments[i].clearHandles();
    };
    egPath.prototype.getLength = function () {
        if (this._length == null) {
            var curves = this.getCurves(), length = 0;
            for (var i = 0, l = curves.length; i < l; i++)
                length += curves[i].getLength();
            this._length = length;
        }
        return this._length;
    };
    egPath.prototype.getArea = function (_closed) {
        var cached = _closed === undefined, area = this._area;
        if (!cached || area == null) {
            var segments = this._segments, count = segments.length, closed = cached ? this._closed : _closed, last = count - 1;
            area = 0;
            for (var i = 0, l = closed ? count : last; i < l; i++) {
                area += egCurve.getArea(egCurve.getValues(segments[i], segments[i < last ? i + 1 : 0]));
            }
            if (cached)
                this._area = area;
        }
        return area;
    };
    egPath.prototype.isClockwise = function () {
        if (this.isFlags(egPF.Clockwise | egPF.AntiClockwise))
            return this.isFlags(egPF.Clockwise);
        return this.getArea() >= 0;
    };
    egPath.prototype.setClockwise = function (clockwise) {
        if (this._closed) {
            if (this.isClockwise() != (clockwise = !!clockwise))
                this.reverse();
            this.addFlags(clockwise ? egPF.Clockwise : egPF.AntiClockwise);
            this.removeFlags(clockwise ? egPF.AntiClockwise : egPF.Clockwise);
        }
    };
    egPath.prototype.splitAt = function (location) {
        var loc = typeof location === 'number'
            ? this.getLocationAt(location) : location, index = loc && loc.getIndex(), //CHECK
        time = loc && loc._time, tMin = 4e-7, tMax = 1 - tMin;
        if (time >= tMax) {
            index++;
            time = 0;
        }
        var curves = this.getCurves();
        if (index >= 0 && index < curves.length) {
            if (time >= tMin) {
                curves[index++].divideAtTime(time);
            }
            var segs = this.removeSegments(index, this._segments.length, true), path;
            if (this._closed) {
                this.setClosed(false);
                path = this;
            }
            else {
                path = new egPath(); //Item.NO_INSERT  CHECK
                this._parent.addChild(path, this._index + 1);
                path._closed = this._closed;
                path._flags = this._flags;
            }
            path._add(segs, 0);
            this.addSegment(segs[0]);
            return path;
        }
        return null;
    };
    egPath.prototype.split = function (index, time) {
        var curve, location = time === undefined ? index
            : (curve = this.getCurves()[index])
                && curve.getLocationAtTime(time);
        return location != null ? this.splitAt(location) : null;
    };
    egPath.prototype.join = function (path, tolerance) {
        var epsilon = tolerance || 0;
        if (path && path !== this) {
            var segments = path._segments, last1 = this.getLastSegment(), last2 = path.getLastSegment();
            if (!last2)
                return this;
            if (last1 && last1._point.isClose(last2._point, epsilon))
                path.reverse();
            var first2 = path.getFirstSegment();
            if (last1 && last1._point.isClose(first2._point, epsilon)) {
                last1.setHandleOut(first2._handleOut);
                this._add(segments.slice(1));
            }
            else {
                var first1 = this.getFirstSegment();
                if (first1 && first1._point.isClose(first2._point, epsilon))
                    path.reverse();
                last2 = path.getLastSegment();
                if (first1 && first1._point.isClose(last2._point, epsilon)) {
                    first1.setHandleIn(last2._handleIn);
                    this._add(segments.slice(0, segments.length - 1), 0);
                }
                else {
                    this._add(segments.slice());
                }
            }
            if (path._closed)
                this._add([segments[0]]);
            path.remove();
        }
        var first = this.getFirstSegment(), last = this.getLastSegment();
        if (first !== last && first._point.isClose(last._point, epsilon)) {
            first.setHandleIn(last._handleIn);
            last.remove();
            this.setClosed(true);
        }
        return this;
    };
    egPath.prototype.reduce = function (simplify) {
        var curves = this.getCurves(), tolerance = simplify ? 2e-7 : 0;
        for (var i = curves.length - 1; i >= 0; i--) {
            var curve = curves[i];
            if (!curve.hasHandles() && (curve.getLength() < tolerance
                || simplify && curve.isCollinear(curve.getNext())))
                curve.remove();
        }
        return this;
    };
    egPath.prototype.reverse = function () {
        this._segments.reverse();
        for (var i = 0, l = this._segments.length; i < l; i++) {
            var segment = this._segments[i];
            var handleIn = segment._handleIn;
            segment._handleIn = segment._handleOut;
            segment._handleOut = handleIn;
            segment._index = i;
        }
        this._curves = null;
        if (this.isFlags(egPF.Clockwise)) {
            this.addFlags(egPF.AntiClockwise);
            this.removeFlags(egPF.Clockwise);
        }
        else if (this.isFlags(egPF.AntiClockwise)) {
            this.addFlags(egPF.Clockwise);
            this.removeFlags(egPF.AntiClockwise);
        }
    };
    egPath.prototype.flatten = function (flatness) {
        var iterator = new egPathIt(this, flatness || 0.25, 256, true), parts = iterator.parts, length = parts.length, segments = [];
        for (var i = 0; i < length; i++) {
            segments.push(new egSegment(parts[i].curve.slice(0, 2)));
        }
        if (!this._closed && length > 0) {
            segments.push(new egSegment(parts[length - 1].curve.slice(6)));
        }
        this.setSegments(segments);
    };
    egPath.prototype.simplify = function (tolerance) {
        var segments = new egPathFitter(this).fit(tolerance || 2.5);
        if (segments)
            this.setSegments(segments);
        return !!segments;
    };
    //type == 1 is "catmull-rom",
    //type == 2 is "geometric"
    //type == 3 is "asymmetric"
    //type == 4 is "continuous"
    //{ type: number,
    //  from: segment,
    //  to: segment,
    //  factor: number }
    egPath.prototype.smooth = function (xtype, xfactor, xfrom, xto) {
        var that = this, type = xtype || 3, segments = this._segments, length = segments.length, closed = this._closed;
        //value egCurve || number
        function getIndex(value, _default) {
            var index = value && value._index;
            if (index != null) {
                var path = value._path;
                if (path && path !== that)
                    throw new Error('Edraw Err 105');
                if (_default && value instanceof egCurve)
                    index++;
            }
            else {
                index = typeof value === 'number' ? value : _default;
            }
            return Math.min(index < 0 && closed
                ? index % length
                : index < 0 ? index + length : index, length - 1);
        }
        var loop = closed && xfrom === undefined && xto === undefined, from = getIndex(xfrom, 0), to = getIndex(xto, length - 1);
        if (from > to) {
            if (closed) {
                from -= length;
            }
            else {
                var tmp = from;
                from = to;
                to = tmp;
            }
        }
        if (type == 3 || type == 4) {
            var asymmetric = type === 3, min = Math.min, amount = to - from + 1, n = amount - 1, padding = loop ? min(amount, 4) : 1, paddingLeft = padding, paddingRight = padding, knots = [];
            if (!closed) {
                paddingLeft = min(1, from);
                paddingRight = min(1, length - to - 1);
            }
            n += paddingLeft + paddingRight;
            if (n <= 1)
                return;
            for (var i = 0, j = from - paddingLeft; i <= n; i++, j++) {
                knots[i] = segments[(j < 0 ? j + length : j) % length]._point;
            }
            var x = knots[0]._x + 2 * knots[1]._x, y = knots[0]._y + 2 * knots[1]._y, f = 2, n_1 = n - 1, rx = [x], ry = [y], rf = [f], px = [], py = [];
            for (var i = 1; i < n; i++) {
                var internal = i < n_1, a = internal ? 1 : asymmetric ? 1 : 2, b = internal ? 4 : asymmetric ? 2 : 7, u = internal ? 4 : asymmetric ? 3 : 8, v = internal ? 2 : asymmetric ? 0 : 1, m = a / f;
                f = rf[i] = b - m;
                x = rx[i] = u * knots[i]._x + v * knots[i + 1]._x - m * x;
                y = ry[i] = u * knots[i]._y + v * knots[i + 1]._y - m * y;
            }
            px[n_1] = rx[n_1] / rf[n_1];
            py[n_1] = ry[n_1] / rf[n_1];
            for (var i = n - 2; i >= 0; i--) {
                px[i] = (rx[i] - px[i + 1]) / rf[i];
                py[i] = (ry[i] - py[i + 1]) / rf[i];
            }
            px[n] = (3 * knots[n]._x - px[n_1]) / 2;
            py[n] = (3 * knots[n]._y - py[n_1]) / 2;
            for (var i = paddingLeft, max = n - paddingRight, j = from; i <= max; i++, j++) {
                var segment = segments[j < 0 ? j + length : j], pt = segment._point, hx = px[i] - pt._x, hy = py[i] - pt._y;
                if (loop || i < max)
                    segment.setHandleOut(new egPoint(hx, hy));
                if (loop || i > paddingLeft)
                    segment.setHandleIn(new egPoint(-hx, -hy));
            }
        }
        else {
            for (var i = from; i <= to; i++) {
                segments[i < 0 ? i + length : i].smooth(!loop && i === from, !loop && i === to, xtype, xfactor);
            }
        }
    };
    egPath.prototype._hitTestSelf = function (point, options, style) {
        var that = this, segments = this._segments, numSegments = segments.length, closed = this._closed, strokePadding = options._tolerance;
        var hitStroke = options._stroke, hitFill = options._fill, fillRule = options._evenodd, hitCurves = options._curves, join = style ? style.strokeJoin : 'round', cap = style ? style.strokeCap : 'round', miterLimit = style ? style.miterLimit : 10, strokeWidth = style ? style.strokeWidth : 1, area, loc, res, strokeRadius = hitStroke ? strokeWidth * 0.5
            : hitFill && options._tolerance > 0 || hitCurves ? 0 : null;
        if (strokeRadius !== null) {
            if (strokeRadius > 0) {
                miterLimit *= strokeRadius;
                strokePadding += strokeRadius;
            }
            else {
                join = cap = 'round';
            }
        }
        //    join, cap, miterLimit,
        //    area, loc, res,
        //    hitStroke = options.stroke && style._stroke,
        //    hitFill = options.fill && style._fill,
        //    hitCurves = options.curves,
        //    fillRule = style && style._fillRule,
        //    strokeRadius = hitStroke
        //        ? style._strokeWidth / 2
        //        : hitFill && options.tolerance > 0 || hitCurves
        //            ? 0 : null;
        //if (strokeRadius !== null) {
        //    if (strokeRadius > 0) {
        //        join = style._strokeJoin;
        //        cap = style._strokeCap;
        //        miterLimit = strokeRadius * style._miterLimit;
        //        strokePadding = strokePadding.add(
        //            egPath._getStrokePadding(strokeRadius, strokeMatrix));
        //    } else {
        //        join = cap = 'round';
        //    }
        //}
        function isCloseEnough(pt, padding) {
            return point.subtract(pt).getLength() <= padding;
        }
        //function checkSegmentPoint(seg, pt, name) {
        //    if (!options.selected || pt.isSelected()) {
        //        var anchor = seg._point;
        //        if (pt !== anchor)
        //            pt = pt.add(anchor);
        //        if (isCloseEnough(pt, strokePadding)) {
        //            return new egHitResult(name, that, {
        //                segment: seg,
        //                point: pt
        //            });
        //        }
        //    }
        //}
        //function checkSegmentPoints(seg, ends) {
        //    return (ends || options.segments)
        //        && checkSegmentPoint(seg, seg._point, 'segment')
        //        || (!ends && options.handles) && (
        //            checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
        //            checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
        //}
        function addToArea(point) {
            area.add(point);
        }
        function checkSegmentStroke(segment) {
            if (join !== 'round' || cap !== 'round') {
                area = new egPath({ internal: true, closed: true });
                if (closed || segment._index > 0
                    && segment._index < numSegments - 1) {
                    if (join !== 'round' && (segment._handleIn.isZero()
                        || segment._handleOut.isZero()))
                        egPath._addBevelJoin(segment, join, strokeRadius, miterLimit, null, null, addToArea, true);
                }
                else if (cap !== 'round') {
                    egPath._addSquareCap(segment, cap, strokeRadius, null, null, addToArea, true);
                }
                if (!area.isEmpty()) {
                    var loc;
                    return area.contains(point)
                        || (loc = area.getNearestLocation(point))
                            && isCloseEnough(loc.getPoint(), options._tolerance);
                }
            }
            return isCloseEnough(segment._point, strokePadding);
        }
        //if (options.ends && !options.segments && !closed) {
        //    if (res = checkSegmentPoints(segments[0], true)
        //        || checkSegmentPoints(segments[numSegments - 1], true))
        //        return res;
        //} else if (options.segments || options.handles) {
        //    for (var i = 0; i < numSegments; i++)
        //        if (res = checkSegmentPoints(segments[i]))
        //            return res;
        //}
        if (strokeRadius !== null) {
            loc = this.getNearestLocation(point);
            if (loc) {
                var time = loc.getTime();
                if (time === 0 || time === 1 && numSegments > 1) {
                    if (!checkSegmentStroke(loc.getSegment()))
                        loc = null;
                }
                else if (!isCloseEnough(loc.getPoint(), strokePadding)) {
                    loc = null;
                }
            }
            //if (!loc && join === 'miter' && numSegments > 1) {
            //    for (var i = 0; i < numSegments; i++) {
            //        var segment = segments[i];
            //        if (point.getDistance(segment._point) <= miterLimit
            //            && checkSegmentStroke(segment)) {
            //            loc = segment.getLocation();
            //            break;
            //        }
            //    }
            //}
        }
        return !loc && hitFill && this.contains(point, fillRule)
            || loc && !hitStroke && !hitCurves
            ? new egHitResult('fill', this)
            : loc
                ? new egHitResult(hitStroke ? 'stroke' : 'curve', this, {
                    loc: loc,
                    point: loc.getPoint()
                })
                : null;
    };
    egPath.prototype.getLocationOf = function (pt) {
        var curves = this.getCurves();
        for (var i = 0, l = curves.length; i < l; i++) {
            var loc = curves[i].getLocationOf(pt);
            if (loc)
                return loc;
        }
        return null;
    };
    egPath.prototype.getOffsetOf = function (pt) {
        var loc = this.getLocationOf.apply(this, pt);
        return loc ? loc.getOffset() : null;
    };
    egPath.prototype.getLocationAt = function (offset) {
        var curves = this.getCurves(), length = 0;
        if (offset < 0)
            offset += this.getLength();
        for (var i = 0, l = curves.length; i < l; i++) {
            var start = length, curve = curves[i];
            length += curve.getLength();
            if (length > offset) {
                return curve.getLocationAt(offset - start);
            }
        }
        if (curves.length > 0 && offset <= this.getLength())
            return new egCurveLocation(curves[curves.length - 1], 1);
        return null;
    };
    egPath.prototype.getCurrentSegment = function (that) {
        var segments = that._segments;
        if (segments.length === 0)
            throw new Error("Edraw Err 110");
        return segments[segments.length - 1];
    };
    egPath.prototype.moveTo = function (pt) {
        var segments = this._segments;
        if (segments.length === 1)
            this.removeSegment(0);
        if (!segments.length)
            this._add([new egSegment(pt)]);
    };
    egPath.prototype.moveToXY = function (x, y) {
        var segments = this._segments;
        if (segments.length === 1)
            this.removeSegment(0);
        if (!segments.length)
            this._add([new egSegment(x, y)]);
    };
    egPath.prototype.lineTo = function (pt) {
        this._add([new egSegment(pt)]);
    };
    egPath.prototype.lineToXY = function (x, y) {
        this._add([new egSegment(x, y)]);
    };
    egPath.prototype.cubicCurveTo = function (handle1, handle2, pt) {
        var current = this.getCurrentSegment(this);
        current.setHandleOut(handle1.subtract(current._point));
        this._add([new egSegment(pt, handle2.subtract(pt))]);
    };
    egPath.prototype.quadraticCurveTo = function (handle, pt) {
        var current = this.getCurrentSegment(this)._point;
        this.cubicCurveTo(handle.add(current.subtract(handle).multiply(1 / 3)), handle.add(pt.subtract(handle).multiply(1 / 3)), pt);
    };
    egPath.prototype.curveTo = function (through, pt, t) {
        var tr = t === undefined ? 0.5 : t, t1 = 1 - tr, current = this.getCurrentSegment(this)._point, handle = through.subtract(current.multiply(t1 * t1))
            .subtract(pt.multiply(t * t)).divide(2 * t * t1);
        if (handle.isNaN())
            throw new Error("Edraw Err 111");
        this.quadraticCurveTo(handle, pt);
    };
    egPath.prototype.arcTo = function (to, radius, rotation, clockwise, large) {
        var current = this.getCurrentSegment(this), from = current._point, center, extent, vector, matrix;
        var middle = from.add(to).divide(2), through = middle.add(middle.subtract(from).rotate(clockwise ? -90 : 90));
        var isZero = egMath.isZero;
        if (isZero(radius.width) || isZero(radius.height))
            return this.lineTo(to);
        var pt = from.subtract(middle).rotate(-rotation), x = pt.x, y = pt.y, abs = Math.abs, rx = abs(radius.width), ry = abs(radius.height), rxSq = rx * rx, rySq = ry * ry, xSq = x * x, ySq = y * y;
        var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
        if (factor > 1) {
            rx *= factor;
            ry *= factor;
            rxSq = rx * rx;
            rySq = ry * ry;
        }
        factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
            (rxSq * ySq + rySq * xSq);
        if (abs(factor) < 1e-12)
            factor = 0;
        if (factor < 0)
            throw new Error('Edraw Err 112');
        center = new egPoint(rx * y / ry, -ry * x / rx)
            .multiply((large === clockwise ? -1 : 1)
            * Math.sqrt(factor))
            .rotate(rotation).add(middle);
        matrix = new egMatrix().translate(center).rotate(rotation).scale(rx, ry);
        vector = matrix._inverseTransform(from);
        extent = vector.getDirectedAngle(matrix._inverseTransform(to));
        if (!clockwise && extent > 0)
            extent -= 360;
        else if (clockwise && extent < 0)
            extent += 360;
        if (through) {
            var l1 = new egLine(from.add(through).divide(2), through.subtract(from).rotate(90), true), l2 = new egLine(through.add(to).divide(2), to.subtract(through).rotate(90), true), line = new egLine(from, to), throughSide = line.getSide(through);
            center = l1.intersect(l2, true);
            if (!center) {
                if (!throughSide)
                    return this.lineTo(to);
                throw new Error('Edraw Err 112');
            }
            vector = from.subtract(center);
            extent = vector.getDirectedAngle(to.subtract(center));
            var centerSide = line.getSide(center);
            if (centerSide === 0) {
                extent = throughSide * Math.abs(extent);
            }
            else if (throughSide === centerSide) {
                extent += extent < 0 ? 360 : -360;
            }
        }
        var ext = Math.abs(extent), count = ext >= 360 ? 4 : Math.ceil(ext / 90), inc = extent / count, half = inc * Math.PI / 360, z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)), segments = [];
        for (var i = 0; i <= count; i++) {
            var pt = to, out = null;
            if (i < count) {
                out = vector.rotate(90).multiply(z);
                if (matrix) {
                    pt = matrix._transformPoint(vector);
                    out = matrix._transformPoint(vector.add(out))
                        .subtract(pt);
                }
                else {
                    pt = center.add(vector);
                }
            }
            if (i === 0) {
                current.setHandleOut(out);
            }
            else {
                var _in = vector.rotate(-90).multiply(z);
                if (matrix) {
                    _in = matrix._transformPoint(vector.add(_in))
                        .subtract(pt);
                }
                segments.push(new egSegment(pt, _in, out));
            }
            vector = vector.rotate(inc);
        }
        this._add(segments);
    };
    egPath.prototype.arcTo2 = function (box, angle, degree) {
        if (box.isEmpty())
            return;
        var vecPts = [], ptStart = egBezier.arcToBezier(box, -angle, -degree, vecPts);
        if (this._segments.length == 0)
            this.moveTo(ptStart);
        else if (!ptStart.isClose(this._segments[this._segments.length - 1]._point))
            this.lineTo(ptStart);
        for (var i = 0; i < vecPts.length; i += 3) {
            this.cubicCurveTo(vecPts[i], vecPts[i + 1], vecPts[i + 2]);
        }
    };
    egPath.prototype.ellipse = function (box) {
        if (box.isEmpty())
            return;
        var vecPts = [], ptStart = egBezier.arcToBezier(box, 0, -360, vecPts);
        if (vecPts.length === 12) {
            if (this._segments.length === 1)
                this._segments.pop();
            this.moveTo(ptStart);
            this.cubicCurveTo(vecPts[0], vecPts[1], vecPts[2]); // 0 -> 270
            this.cubicCurveTo(vecPts[3], vecPts[4], vecPts[5]); // 270 -> 180
            this.cubicCurveTo(vecPts[6], vecPts[7], vecPts[8]); // 180 -> 90
            this.cubicCurveTo(vecPts[9], vecPts[10], vecPts[11]); // 90 - >0
        }
    };
    egPath.prototype.lineBy = function (pt) {
        var current = this.getCurrentSegment(this)._point;
        this.lineTo(current.add(pt));
    };
    egPath.prototype.curveBy = function (through, pt, t) {
        var current = this.getCurrentSegment(this)._point;
        this.curveTo(current.add(through), current.add(pt), t);
    };
    egPath.prototype.cubicCurveBy = function (handle1, handle2, pt) {
        var current = this.getCurrentSegment(this)._point;
        this.cubicCurveTo(current.add(handle1), current.add(handle2), current.add(pt));
    };
    egPath.prototype.quadraticCurveBy = function (handle, pt) {
        var current = this.getCurrentSegment(this)._point;
        this.quadraticCurveTo(current.add(handle), current.add(pt));
    };
    egPath.prototype.arcBy = function (pt, radius, rotation, clockwise, large) {
        var current = this.getCurrentSegment(this)._point;
        this.arcTo(current.add(pt), radius, rotation, clockwise, large);
    };
    egPath.prototype.closePath = function (tolerance) {
        this.setClosed(true);
        this.join(this, tolerance);
    };
    egPath.prototype.getBounds = function (opt, style, mx) {
        //console.log("getBounds" + this._bounds);
        if (opt && opt._handle)
            return egPath._getHandleBounds(this._segments, this._closed, style, mx, opt);
        else if (opt && opt._stroke)
            return egPath._getStrokeBounds(this._segments, this._closed, style, mx, opt);
        else
            return egPath._getBounds(this._segments, this._closed, style, mx);
    };
    egPath._getBounds = function (segments, closed, style, matrix, strokePadding) {
        //console.log("_getBounds");
        var first = segments[0];
        if (!first)
            return new egRect();
        var coords = new Array(6), prevCoords = first._transformCoordinates(matrix, new Array(6)), min = prevCoords.slice(0, 2), max = min.slice(), roots = new Array(2);
        function processSegment(segment) {
            segment._transformCoordinates(matrix, coords);
            for (var i = 0; i < 2; i++) {
                egCurve._addBounds(prevCoords[i], prevCoords[i + 4], coords[i + 2], coords[i], i, strokePadding ? strokePadding[i] : 0, min, max, roots);
            }
            var tmp = prevCoords;
            prevCoords = coords;
            coords = tmp;
        }
        for (var i = 1, l = segments.length; i < l; i++)
            processSegment(segments[i]);
        if (closed)
            processSegment(first);
        var rc = new egRect(min[0], min[1], max[0] - min[0], max[1] - min[1]);
        if (rc.width > 0 && rc.height == 0)
            rc.height = 1;
        if (rc.width == 0 && rc.height > 0)
            rc.width = 1;
        return rc;
    };
    egPath._getStrokeBounds = function (segments, closed, style, matrix, opt) {
        var stroke = style.stroke, strokeWidth = style.strokeWidth, strokeMatrix = stroke && egPath._getStrokeMatrix(matrix, opt), strokePadding = stroke && egPath._getStrokePadding(strokeWidth, strokeMatrix), bounds = egPath._getBounds(segments, closed, style, matrix, strokePadding);
        if (!stroke)
            return bounds;
        var strokeRadius = strokeWidth / 2, join = style.strokeJoin, cap = style.strokeCap, miterLimit = strokeRadius * style.miterLimit, joinBounds = new egRect(new egSize(strokePadding));
        function addPoint(point) {
            bounds = bounds.include(point);
        }
        function addRound(segment) {
            bounds = bounds.unite(joinBounds.moveCenter(segment._point.transform(matrix)));
        }
        function addJoin(segment, join) {
            var handleIn = segment._handleIn, handleOut = segment._handleOut;
            if (join === 'round' || !handleIn.isZero() && !handleOut.isZero()
                && handleIn.isCollinear(handleOut)) {
                addRound(segment);
            }
            else {
                egPath._addBevelJoin(segment, join, strokeRadius, miterLimit, matrix, strokeMatrix, addPoint);
            }
        }
        function addCap(segment, cap) {
            if (cap === 'round') {
                addRound(segment);
            }
            else {
                egPath._addSquareCap(segment, cap, strokeRadius, matrix, strokeMatrix, addPoint);
            }
        }
        var length = segments.length - (closed ? 0 : 1);
        for (var i = 1; i < length; i++)
            addJoin(segments[i], join);
        if (closed) {
            addJoin(segments[0], join);
        }
        else if (length > 0) {
            addCap(segments[0], cap);
            addCap(segments[segments.length - 1], cap);
        }
        return bounds;
    };
    egPath._getStrokePadding = function (radius, matrix) {
        if (!matrix)
            return [radius, radius];
        var hor = new egPoint(radius, 0).transform(matrix), ver = new egPoint(0, radius).transform(matrix), phi = hor.getAngleInRadians(), a = hor.getLength(), b = ver.getLength();
        var sin = Math.sin(phi), cos = Math.cos(phi), tan = Math.tan(phi), tx = Math.atan2(b * tan, a), ty = Math.atan2(b, tan * a);
        return [Math.abs(a * Math.cos(tx) * cos + b * Math.sin(tx) * sin),
            Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
    };
    egPath._addBevelJoin = function (segment, join, radius, miterLimit, matrix, strokeMatrix, addPoint, isArea) {
        var curve2 = segment.getCurve(), curve1 = curve2.getPrevious(), point = curve2.getPointAtTime(0), normal1 = curve1.getNormalAtTime(1), normal2 = curve2.getNormalAtTime(0), step = normal1.getDirectedAngle(normal2) < 0 ? -radius : radius;
        normal1.setLength(step);
        normal2.setLength(step);
        if (matrix)
            point = matrix.transformPoint(point);
        if (strokeMatrix) {
            normal1 = strokeMatrix.transformPoint(normal1);
            normal2 = strokeMatrix.transformPoint(normal2);
        }
        if (isArea) {
            addPoint(point);
            addPoint(point.add(normal1));
        }
        if (join === 'miter') {
            var corner = new egLine(point.add(normal1), new egPoint(-normal1.y, normal1.x), true).intersect(new egLine(point.add(normal2), new egPoint(-normal2.y, normal2.x), true), true);
            if (corner && point.getDistance(corner) <= miterLimit) {
                addPoint(corner);
                if (!isArea)
                    return;
            }
        }
        if (!isArea)
            addPoint(point.add(normal1));
        addPoint(point.add(normal2));
    };
    egPath._addSquareCap = function (segment, cap, radius, matrix, strokeMatrix, addPoint, isArea) {
        var point = segment._point, loc = segment.getLocation(), normal = loc.getNormal().multiply(radius);
        if (matrix)
            point = matrix.transformPoint(point);
        if (strokeMatrix)
            normal = strokeMatrix.transformPoint(normal);
        if (isArea) {
            addPoint(point.subtract(normal));
            addPoint(point.add(normal));
        }
        if (cap === 'square') {
            point = point.add(normal.rotate(loc.getTime() === 0 ? -90 : 90));
        }
        addPoint(point.add(normal));
        addPoint(point.subtract(normal));
    };
    egPath._getHandleBounds = function (segments, closed, style, matrix, opt) {
        var stroke = opt && opt._stroke && style.stroke, strokePadding, joinPadding;
        if (stroke) {
            var strokeMatrix = egPath._getStrokeMatrix(matrix, opt), strokeRadius = style.strokeWidth / 2, joinRadius = strokeRadius;
            if (style.strokeJoin === 'miter')
                joinRadius = strokeRadius * style.miterLimit;
            if (style.strokeCap === 'square')
                joinRadius = Math.max(joinRadius, strokeRadius * Math.sqrt(2));
            strokePadding = egPath._getStrokePadding(strokeRadius, strokeMatrix);
            joinPadding = egPath._getStrokePadding(joinRadius, strokeMatrix);
        }
        var coords = new Array(6), x1 = Infinity, x2 = -x1, y1 = x1, y2 = x2;
        for (var i = 0, l = segments.length; i < l; i++) {
            var segment = segments[i];
            segment._transformCoordinates(matrix, coords);
            for (var j = 0; j < 6; j += 2) {
                var padding = j === 0 ? joinPadding : strokePadding, paddingX = padding ? padding[0] : 0, paddingY = padding ? padding[1] : 0, x = coords[j], y = coords[j + 1], xn = x - paddingX, xx = x + paddingX, yn = y - paddingY, yx = y + paddingY;
                if (xn < x1)
                    x1 = xn;
                if (xx > x2)
                    x2 = xx;
                if (yn < y1)
                    y1 = yn;
                if (yx > y2)
                    y2 = yx;
            }
        }
        return new egRect(x1, y1, x2 - x1, y2 - y1);
    };
    egPath._getStrokeMatrix = function (mx, opt) {
        //CHECK
        //var parent = this.getStrokeScaling() ? null
        //    : options && options.internal ? this
        //        : this._parent || this._symbol && this._symbol._item,
        //    mx = parent ? parent.getViewMatrix().invert() : matrix;
        return mx && mx._shiftless();
    };
    egPath.prototype._getMonoCurves = function () {
        var monoCurves = this._monoCurves, last;
        function insertCurve(v) {
            var y0 = v[1], y1 = v[7], winding = Math.abs((y0 - y1) / (v[0] - v[6]))
                < 2e-7
                ? 0
                : y0 > y1
                    ? -1
                    : 1, curve = { values: v, winding: winding };
            monoCurves.push(curve);
            if (winding)
                last = curve;
        }
        function handleCurve(v) {
            if (egCurve.getLength(v) === 0)
                return;
            var y0 = v[1], y1 = v[3], y2 = v[5], y3 = v[7];
            if (egCurve.isStraight(v)
                || y0 >= y1 === y1 >= y2 && y1 >= y2 === y2 >= y3) {
                insertCurve(v);
            }
            else {
                var a = 3 * (y1 - y2) - y0 + y3, b = 2 * (y0 + y2) - 4 * y1, c = y1 - y0, tMin = 4e-7, tMax = 1 - tMin, roots = [], n = egMath.solveQuadratic(a, b, c, roots, tMin, tMax);
                if (n < 1) {
                    insertCurve(v);
                }
                else {
                    roots.sort();
                    var t = roots[0], parts = egCurve.subdivide(v, t);
                    insertCurve(parts[0]);
                    if (n > 1) {
                        t = (roots[1] - t) / (1 - t);
                        parts = egCurve.subdivide(parts[1], t);
                        insertCurve(parts[0]);
                    }
                    insertCurve(parts[1]);
                }
            }
        }
        if (!monoCurves) {
            monoCurves = this._monoCurves = [];
            var curves = this.getCurves(), segments = this._segments;
            for (var i = 0, l = curves.length; i < l; i++)
                handleCurve(curves[i].getValues());
            if (!this._closed && segments.length > 1) {
                var p1 = segments[segments.length - 1]._point, p2 = segments[0]._point, p1x = p1._x, p1y = p1._y, p2x = p2._x, p2y = p2._y;
                handleCurve([p1x, p1y, p1x, p1y, p2x, p2y, p2x, p2y]);
            }
            if (monoCurves.length > 0) {
                monoCurves[0].last = last;
            }
        }
        return monoCurves;
    };
    egPath.prototype.getInteriorPoint = function (evenodd) {
        var bounds = this.getBounds(), point = bounds.center();
        if (!this.contains(point, evenodd)) {
            var curves = this._getMonoCurves(), roots = [], y = point.y, intercepts = [];
            for (var i = 0, l = curves.length; i < l; i++) {
                var values = curves[i].values;
                if (curves[i].winding === 1
                    && y > values[1] && y <= values[7]
                    || y >= values[7] && y < values[1]) {
                    var count = egCurve.solveCubic(values, 1, y, roots, 0, 1);
                    for (var j = count - 1; j >= 0; j--) {
                        intercepts.push(egCurve.getPoint(values, roots[j]).x);
                    }
                }
            }
            intercepts.sort(function (a, b) { return a - b; });
            point.x = (intercepts[0] + intercepts[1]) / 2;
        }
        return point;
    };
    egPath.prototype.reorient = function () {
        this.setClockwise(true);
        return this;
    };
    egPath.prototype.getPointAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getPoint();
    };
    egPath.prototype.getTangentAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getTangent();
    };
    egPath.prototype.getNormalAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getNormal();
    };
    egPath.prototype.getWeightedTangentAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getWeightedTangent();
    };
    egPath.prototype.getWeightedNormalAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getWeightedNormal();
    };
    egPath.prototype.getCurvatureAt = function (offset) {
        var loc = this.getLocationAt(offset);
        return loc && loc.getCurvature();
    };
    return egPath;
}());
var ePet = {
    MoveTo: 0,
    LineTo: 1,
    CurveTo: 2,
    CurveData: 3,
    Close: 4,
};
var EDPathElement = /** @class */ (function () {
    function EDPathElement(x, y, type, bx, by) {
        this._x = x;
        this._y = y;
        this._type = type;
        this._by = this._bx = 0;
        if (bx)
            this._bx = bx;
        if (by)
            this._by = by;
    }
    EDPathElement.prototype.clone_ = function () {
        return new EDPathElement(this._x, this._y, this._type, this._bx, this._by);
    };
    EDPathElement.prototype.setXY = function (x, y) {
        this._x = x;
        this._y = y;
    };
    EDPathElement.prototype.swapXY = function (other) {
        var _e, _f;
        _e = [other._x, this._x], this._x = _e[0], other._x = _e[1];
        _f = [other._y, this._y], this._y = _f[0], other._y = _f[1];
    };
    Object.defineProperty(EDPathElement.prototype, "point", {
        get: function () {
            return new egPoint(this._x, this._y);
        },
        set: function (pt) {
            this._x = pt.x;
            this._y = pt.y;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EDPathElement.prototype, "bkPoint", {
        get: function () {
            return new egPoint(this._bx, this._by);
        },
        set: function (pt) {
            this._bx = pt.x;
            this._by = pt.y;
        },
        enumerable: false,
        configurable: true
    });
    return EDPathElement;
}());
var EDPath = /** @class */ (function () {
    function EDPath(arg) {
        if (arg)
            this.assign_(arg);
        else
            this._elements = [];
    }
    EDPath.prototype.clone_ = function () {
        return new EDPath(this);
    };
    EDPath.prototype.assign_ = function (path) {
        this._elements = [];
        if (path) {
            for (var i = 0; i < path._elements.length; i++) {
                this._elements.push(path._elements[i].clone_());
            }
        }
    };
    EDPath.prototype.isEmpty = function () {
        return this._elements.length === 0;
    };
    EDPath.prototype.reset = function () {
        this._elements = [];
    };
    EDPath.prototype.size = function () {
        return this._elements.length;
    };
    EDPath.prototype.moveTo = function (x, y) {
        if (this._elements.length == 0 || this._elements.back()._type != ePet.MoveTo)
            this._elements.push(new EDPathElement(x, y, ePet.MoveTo));
    };
    EDPath.prototype.moveToPt = function (endPt) {
        this.moveTo(endPt.x, endPt.y);
    };
    EDPath.prototype.lineTo = function (x, y) {
        if (this._elements.length == 0)
            this.moveTo(0, 0);
        var lstElem = this._elements.back();
        if (Math.abs(lstElem._x - x) > 0.9 || Math.abs(lstElem._y - y) > 0.9)
            this._elements.push(new EDPathElement(x, y, ePet.LineTo));
    };
    EDPath.prototype.lineToPt = function (endPt) {
        this.lineTo(endPt.x, endPt.y);
    };
    EDPath.prototype.curveTo = function (cx1, cy1, cx2, cy2, px, py) {
        if (this._elements.length == 0)
            this.moveTo(0, 0);
        this._elements.push(new EDPathElement(cx1, cy1, ePet.CurveTo));
        this._elements.push(new EDPathElement(cx2, cy2, ePet.CurveData));
        this._elements.push(new EDPathElement(px, py, ePet.CurveData));
    };
    EDPath.prototype.curveToPt = function (ctrlA, ctrlB, endPt) {
        this.curveTo(ctrlA.x, ctrlA.y, ctrlB.x, ctrlB.y, endPt.x, endPt.y);
    };
    EDPath.prototype.arcTo = function (box, startAngle, sweepAngle) {
        if (box.isEmpty())
            return;
        //console.log(box, startAngle, sweepAngle);
        var vecPts = [];
        var pt = egBezier.arcToBezier(box, -startAngle, -sweepAngle, vecPts);
        if (this._elements.length == 0 || this._elements.back()._type == ePet.Close)
            this.moveTo(pt.x, pt.y);
        else
            this.lineTo(pt.x, pt.y);
        for (var i = 0; i < vecPts.length; i += 3) {
            this.curveToPt(vecPts[i], vecPts[i + 1], vecPts[i + 2]);
        }
    };
    EDPath.prototype.ellipse = function (rcfBox) {
        if (rcfBox.isEmpty())
            return;
        var vecPts = [], ptStart = egBezier.arcToBezier(rcfBox, 0, -360, vecPts);
        if (vecPts.length != 12)
            return;
        if (this._elements.length > 0 && this._elements.back()._type == ePet.MoveTo)
            this._elements.pop();
        this.moveToPt(ptStart);
        this.curveToPt(vecPts[0], vecPts[1], vecPts[2]); // 0 -> 90
        this.curveToPt(vecPts[3], vecPts[4], vecPts[5]); // 90 -> 180
        this.curveToPt(vecPts[6], vecPts[7], vecPts[8]); // 180 -> 270
        this.curveToPt(vecPts[9], vecPts[10], vecPts[11]); // 270 -> 360
        this._elements.push(new EDPathElement(ptStart.x, ptStart.y, ePet.Close));
    };
    EDPath.prototype.closeSubpath = function () {
        if (this._elements.length < 2)
            return;
        var ptfs = new egPoint, ptfe;
        ptfe = this._elements.back().point;
        for (var i = this._elements.length - 1; i >= 0; i--) {
            if (this._elements[i]._type == ePet.MoveTo) {
                ptfs = this._elements[i].point;
                break;
            }
        }
        if (ptfs.equals2(ptfe, 1))
            this._elements.back().point = ptfs;
        else
            this.lineTo(ptfs.x, ptfs.y);
        this._elements.push(new EDPathElement(ptfs.x, ptfs.y, ePet.Close));
    };
    EDPath.prototype.addRect = function (box) {
        this.moveToPt(box.topLeft());
        this.lineToPt(box.topRight());
        this.lineToPt(box.bottomRight());
        this.lineToPt(box.bottomLeft());
        this.closeSubpath();
    };
    EDPath.prototype.addEllipse = function (box) {
        if (box.isEmpty())
            return;
        var vecPts = [], pt = egBezier.arcToBezier(box, 0, -360, vecPts);
        if (vecPts.length == 12) {
            if (this._elements.length > 0 && this._elements.back()._type == ePet.MoveTo)
                this._elements.pop();
            this.moveToPt(pt);
            this.curveToPt(vecPts[0], vecPts[1], vecPts[2]); // 0 -> 270
            this.curveToPt(vecPts[3], vecPts[4], vecPts[5]); // 270 -> 180
            this.curveToPt(vecPts[6], vecPts[7], vecPts[8]); // 180 -> 90
            this.curveToPt(vecPts[9], vecPts[10], vecPts[11]); // 90 - >0
        }
    };
    EDPath.prototype.addLines = function (ptfs) {
        if (this._elements.length == 0 || this._elements.back()._type == ePet.Close) {
            this.moveToPt(ptfs[0]);
        }
        else {
            this.lineToPt(ptfs[0]);
        }
        for (var i = 1; i < ptfs.length; i++) {
            this.lineToPt(ptfs[i]);
        }
    };
    EDPath.prototype.addPath = function (path, connect) {
        if (connect === void 0) { connect = false; }
        if (path.isEmpty())
            return;
        if (this._elements.length > 0 && connect) {
            if (!path._elements[0].point.equals2(this._elements.back().point)) {
                this._elements.push(path._elements[0]);
                this._elements.back()._type = ePet.LineTo;
            }
        }
        else {
            this._elements.push(path._elements[0]);
        }
        for (var i = 1; i < path._elements.length; i++)
            this._elements.push(path._elements[i]);
    };
    EDPath.prototype.at = function (index) {
        if (index >= 0 && index < this._elements.length)
            return this._elements[index];
        else
            return null;
    };
    EDPath.prototype.roundData = function () {
        for (var i = 0, l = this._elements.length; i < l; i++) {
            if (this._elements[i]._type != ePet.CurveData) { //this._elements[i]._type != ePet.Close && 
                this._elements[i]._x = Math.round(this._elements[i]._x); //+0.5
                this._elements[i]._y = Math.round(this._elements[i]._y); //+0.5
            }
        }
    };
    EDPath.prototype.getOpenedStart = function (ptf1, ptf2, fromPos) {
        if (fromPos >= this._elements.length)
            return [-1, fromPos];
        var curMove = -1;
        for (var i = fromPos; i < this._elements.length; i++) {
            if (this._elements[i]._type == ePet.MoveTo) {
                //first time meet moveto
                if (curMove == -1) {
                    curMove = i;
                    ptf1.setPt(this._elements[i].point);
                }
                //second t 
                else {
                    ptf2.setPt(this._elements[curMove + 1].point);
                    fromPos = i;
                    return [curMove, fromPos];
                }
            }
            else if (this._elements[i]._type == ePet.Close) {
                curMove = -1;
            }
        }
        //no opened line
        if (curMove == -1)
            return [-1, fromPos];
        else if (curMove < this._elements.length - 1) {
            ptf2.setPt(this._elements[curMove + 1].point);
            fromPos = this._elements.length;
            return [curMove, fromPos];
        }
        return [-1, fromPos];
    };
    EDPath.prototype.getOpenedEnd = function (ptf1, ptf2, fromPos, curMove) {
        if (fromPos >= this._elements.length)
            return [-1, fromPos, curMove];
        curMove = -1;
        for (var i = fromPos; i < this._elements.length; i++) {
            if (this._elements[i]._type == ePet.MoveTo) {
                //first time meet moveto
                if (curMove == -1)
                    curMove = i;
                //second time meet moveto, finish search
                else {
                    if (i > 1) {
                        ptf1.setPt(this._elements[i - 2].point);
                        ptf2.setPt(this._elements[i - 1].point);
                    }
                    fromPos = i;
                    return [i - 1, fromPos, curMove];
                }
            }
            else if (this._elements[i]._type == ePet.Close) {
                curMove = -1;
            }
        }
        //no opened line
        if (curMove == -1)
            return [-1, fromPos, curMove];
        else if (this._elements.length > 1) {
            ptf1.setPt(this._elements[this._elements.length - 2].point);
            ptf2.setPt(this._elements.back().point);
            fromPos = this._elements.length;
            return [this._elements.length - 1, fromPos, curMove];
        }
        return [-1, fromPos, curMove];
    };
    EDPath.prototype.setLineHead = function (sizeS, sizeE) {
        var oldStarts = [], oldEnds = [], ptfs = new egPoint(), ptfe = new egPoint(), fromPos = 0, fromPosCur = 0, curPos = 0, exist = false;
        if (sizeS > 0) {
            fromPos = 0;
            var relt = this.getOpenedStart(ptfs, ptfe, fromPos);
            curPos = relt[0];
            fromPos = relt[1];
            while (curPos != -1) {
                exist = true;
                if (this._elements[curPos + 1]._type == ePet.LineTo) {
                    oldStarts.push(this._elements[curPos].point);
                    if (ptfs.getDistance(ptfe) <= sizeS) {
                        if (curPos + 2 == this._elements.length || this._elements[curPos + 2]._type == ePet.MoveTo) { //直线为子路径尾部
                            this._elements.splice(curPos, 2);
                            fromPos -= 2;
                        }
                        else {
                            this._elements[curPos + 1]._type = ePet.MoveTo;
                            this._elements.splice(curPos, 1);
                            fromPos -= 1;
                        }
                    }
                    else {
                        var ang1 = Math.atan2(ptfe.y - ptfs.y, ptfe.x - ptfs.x);
                        var lx = sizeS * Math.cos(ang1), ly = sizeS * Math.sin(ang1);
                        if (Math.abs(lx) < 0.01)
                            lx = 0;
                        if (Math.abs(ly) < 0.01)
                            ly = 0;
                        ptfs.x = ptfs.x + lx;
                        ptfs.y = ptfs.y + ly;
                        this._elements[curPos].point = ptfs;
                    }
                }
                else if (this._elements[curPos + 1]._type == ePet.CurveTo) {
                    var xpath = this.toXPath(curPos);
                    if (xpath.getFirstChild().getFirstCurve().getLength() <= sizeS) {
                        if (curPos + 4 == this._elements.length || this._elements[curPos + 4]._type == ePet.MoveTo) { //曲线为子路径尾部
                            this._elements.splice(curPos, 4);
                            fromPos -= 4;
                        }
                        else {
                            this._elements[curPos + 3]._type = ePet.MoveTo;
                            this._elements.splice(curPos, 3);
                            fromPos -= 3;
                        }
                    }
                    else {
                        oldStarts.push(this._elements[curPos].point);
                        xpath.splitAt(sizeS);
                        this._elements.splice(curPos, this._elements.length - curPos);
                        this.fromXPath(xpath, 1);
                    }
                }
                relt = this.getOpenedStart(ptfs, ptfe, fromPos);
                curPos = relt[0];
                fromPos = relt[1];
            }
        }
        if (sizeE > 0) {
            fromPos = 0;
            var relt = this.getOpenedEnd(ptfs, ptfe, fromPos, fromPosCur);
            curPos = relt[0];
            fromPos = relt[1];
            fromPosCur = relt[2];
            while (curPos != -1) {
                exist = true;
                if (curPos > 0) {
                    if (this._elements[curPos]._type == ePet.LineTo) {
                        oldEnds.push(this._elements[curPos].point);
                        if (ptfs.getDistance(ptfe) <= sizeE) {
                            if (this._elements[curPos - 1]._type == ePet.MoveTo) { //直线为子路径头部
                                this._elements.splice(curPos - 1, 2);
                                fromPos -= 2;
                            }
                            else {
                                this._elements.splice(curPos, 1);
                                fromPos -= 1;
                            }
                        }
                        else {
                            var ang1 = Math.atan2(ptfs.y - ptfe.y, ptfs.x - ptfe.x);
                            var lx = sizeE * Math.cos(ang1), ly = sizeE * Math.sin(ang1);
                            if (Math.abs(lx) < 0.01)
                                lx = 0;
                            if (Math.abs(ly) < 0.01)
                                ly = 0;
                            ptfe.x = ptfe.x + lx;
                            ptfe.y = ptfe.y + ly;
                            this._elements[curPos].point = ptfe;
                        }
                    }
                    else if (this._elements[curPos]._type == ePet.CurveData && curPos > 2) {
                        var xpath = this.toXPath(fromPosCur);
                        if (xpath.getFirstChild().getLastCurve().getLength() <= sizeE) {
                            if (this._elements[curPos - 3]._type == ePet.MoveTo) { //曲线为子路径头部
                                this._elements.splice(curPos - 3, 4);
                                fromPos -= 4;
                            }
                            else {
                                this._elements.splice(curPos - 2, 3);
                                fromPos -= 3;
                            }
                        }
                        else {
                            oldEnds.push(this._elements[curPos].point);
                            xpath.removeChild(xpath.getFirstChild().splitAt(-sizeE));
                            this._elements.splice(fromPosCur, this._elements.length - fromPosCur);
                            this.fromXPath(xpath);
                        }
                    }
                }
                relt = this.getOpenedEnd(ptfs, ptfe, fromPos, fromPosCur);
                curPos = relt[0];
                fromPos = relt[1];
                fromPosCur = relt[2];
            }
        }
        fromPos = 0;
        for (var i = 0; i < oldStarts.length; i++) {
            var res = this.getOpenedStart(ptfs, ptfe, fromPos);
            curPos = res[0];
            fromPos = res[1];
            if (curPos != -1)
                this._elements[curPos].bkPoint = oldStarts[i];
        }
        fromPos = 0;
        for (var i = 0; i < oldEnds.length; i++) {
            var res = this.getOpenedEnd(ptfs, ptfe, fromPos, fromPosCur);
            curPos = res[0];
            fromPos = res[1];
            fromPosCur = res[2];
            if (curPos != -1)
                this._elements[curPos].bkPoint = oldEnds[i];
        }
        return exist;
    };
    EDPath.prototype.setCornerRound = function (size) {
        if (size == 0)
            return;
        var arcrat = 0.448;
        var tempSegments = [];
        var pt1 = new egPoint(), pt2 = new egPoint(), pt3 = new egPoint();
        var prevMoveTo = -1, prevInSeg = -1;
        var qAbs = Math.abs, qPow = Math.pow, qSin = Math.sin, qCos = Math.cos, qAtan2 = Math.atan2;
        for (var i = 0, l = this._elements.length; i < l; i++) {
            if (this._elements[i]._type == ePet.MoveTo) {
                //more than one move to
                prevMoveTo = i;
                tempSegments.push(this._elements[i].clone_());
                prevInSeg = tempSegments.length - 1;
            }
            else if (this._elements[i]._type == ePet.LineTo) {
                if (this._elements[i - 1]._type == ePet.MoveTo) {
                    tempSegments.push(this._elements[i].clone_());
                    continue;
                }
                else if (this._elements[i - 1]._type == ePet.LineTo) {
                    pt1 = this._elements[i - 2].point;
                    pt2 = this._elements[i - 1].point;
                    pt3 = this._elements[i].point;
                    var ang1 = qAtan2(pt1.y - pt2.y, pt1.x - pt2.x);
                    var ang2 = qAtan2(pt3.y - pt2.y, pt3.x - pt2.x);
                    var alfa = ang2 - ang1;
                    if (qAbs(alfa) < 0.001 || qAbs(qAbs(alfa) - Math.PI) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = Math.sqrt(qPow(pt1.x - pt2.x, 2) + qPow(pt1.y - pt2.y, 2)), len2 = Math.sqrt(qPow(pt2.x - pt3.x, 2) + qPow(pt2.y - pt3.y, 2));
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var lx = _size * qCos(ang1), ly = _size * qSin(ang1), rx = _size * qCos(ang2), ry = _size * qSin(ang2);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        tempSegments[tempSegments.length - 1].setXY(pt2.x + lx, pt2.y + ly);
                        tempSegments.push(new EDPathElement(pt2.x + lx * arcrat, pt2.y + ly * arcrat, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(pt2.x + rx * arcrat, pt2.y + ry * arcrat, ePet.CurveData));
                        tempSegments.push(new EDPathElement(pt2.x + rx, pt2.y + ry, ePet.CurveData));
                        tempSegments.push(this._elements[i].clone_());
                    }
                }
                else if (this._elements[i - 1]._type == ePet.CurveData) {
                    var pte4 = this._elements[i - 4].point, pte3 = this._elements[i - 3].point, pte2 = this._elements[i - 2].point, pte1 = this._elements[i - 1].point;
                    var seg1 = new egSegment(pte4.x, pte4.y, 0, 0, pte3.x - pte4.x, pte3.y - pte4.y), seg2 = new egSegment(pte1.x, pte1.y, pte2.x - pte1.x, pte2.y - pte1.y, 0, 0), curve = new egCurve(null, seg1, seg2);
                    pt1.set(0, 0);
                    pt2 = this._elements[i - 1].point;
                    pt3 = this._elements[i].point;
                    var ang1 = qAtan2(curve.getTangentAtTime(1)._y, curve.getTangentAtTime(1)._x), ang2 = qAtan2(pt3.y - pt2.y, pt3.x - pt2.x), alfa = ang2 - ang1;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = curve.getLength(), len2 = Math.sqrt(qPow(pt3.x - pt2.x, 2) + qPow(pt3.y - pt2.y, 2));
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t = curve.getTimeAt(-_size), curves = egCurve.subdivide(curve.getValues(), t), ang3 = qAtan2(egCurve.getTangent(curves[1], 0)._y, egCurve.getTangent(curves[1], 0)._x);
                        var lx = _size * qCos(ang3), ly = _size * qSin(ang3), rx = _size * qCos(ang2), ry = _size * qSin(ang2);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptL = new egPoint(curves[1][0], curves[1][1]);
                        tempSegments[tempSegments.length - 3].setXY(curves[0][2], curves[0][3]);
                        tempSegments[tempSegments.length - 2].setXY(curves[0][4], curves[0][5]);
                        tempSegments[tempSegments.length - 1].point = ptL;
                        tempSegments.push(new EDPathElement(ptL.x + lx * arcrat * 1.5, ptL.y + ly * arcrat * 1.5, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(pt2.x + rx * arcrat, pt2.y + ry * arcrat, ePet.CurveData));
                        tempSegments.push(new EDPathElement(pt2.x + rx, pt2.y + ry, ePet.CurveData));
                        tempSegments.push(this._elements[i].clone_());
                    }
                    //curve.release();
                }
            }
            else if (this._elements[i]._type == ePet.CurveTo) {
                if (this._elements[i - 1]._type == ePet.MoveTo) {
                    tempSegments.push(this._elements[i].clone_());
                    tempSegments.push(this._elements[i + 1].clone_());
                    tempSegments.push(this._elements[i + 2].clone_());
                    i += 2;
                    continue;
                }
                else if (this._elements[i - 1]._type == ePet.LineTo) {
                    var pte1 = this._elements[i - 1].point, pte = this._elements[i].point, pta1 = this._elements[i + 1].point, pta2 = this._elements[i + 2].point;
                    var seg1 = new egSegment(pte1.x, pte1.y, 0, 0, pte.x - pte1.x, pte.y - pte1.y), seg2 = new egSegment(pta2.x, pta2.y, pta1.x - pta2.x, pta1.y - pta2.y, 0, 0), curve = new egCurve(null, seg1, seg2);
                    pt1 = this._elements[i - 2].point;
                    pt2 = this._elements[i - 1].point;
                    pt3.set(0, 0);
                    var ang1 = qAtan2(pt1.y - pt2.y, pt1.x - pt2.x), ang2 = qAtan2(curve.getTangentAtTime(0)._y, curve.getTangentAtTime(0)._x), alfa = ang1 - ang2;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                        tempSegments.push(this._elements[i + 1].clone_());
                        tempSegments.push(this._elements[i + 2].clone_());
                    }
                    else {
                        var _size = size, len1 = Math.sqrt(qPow(pt1.x - pt2.x, 2) + qPow(pt1.y - pt2.y, 2)), len2 = curve.getLength();
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t = curve.getTimeAt(_size), curves = egCurve.subdivide(curve.getValues(), t), ang3 = qAtan2(egCurve.getTangent(curves[1], 0)._y, egCurve.getTangent(curves[1], 0)._x) + Math.PI;
                        var lx = _size * qCos(ang1), ly = _size * qSin(ang1), rx = _size * qCos(ang3), ry = _size * qSin(ang3);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        tempSegments[tempSegments.length - 1].setXY(pt2.x + lx, pt2.y + ly);
                        tempSegments.push(new EDPathElement(pt2.x + lx * arcrat, pt2.y + ly * arcrat, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(curves[0][6] + rx * arcrat * 1.5, curves[0][7] + ry * arcrat * 1.5, ePet.CurveData));
                        tempSegments.push(new EDPathElement(curves[0][6], curves[0][7], ePet.CurveData));
                        tempSegments.push(new EDPathElement(curves[1][2], curves[1][3], ePet.CurveTo));
                        tempSegments.push(new EDPathElement(curves[1][4], curves[1][5], ePet.CurveData));
                        tempSegments.push(new EDPathElement(curves[1][6], curves[1][7], ePet.CurveData));
                    }
                    //curve.release();
                    i += 2;
                }
                else if (this._elements[i - 1]._type == ePet.CurveData) {
                    var pte1 = this._elements[i - 1].point, pte2 = this._elements[i - 2].point, pte3 = this._elements[i - 3].point, pte4 = this._elements[i - 4].point, pte = this._elements[i].point, pta1 = this._elements[i + 1].point, pta2 = this._elements[i + 2].point;
                    var seg1 = new egSegment(pte4.x, pte4.y, 0, 0, pte3.x - pte4.x, pte3.y - pte4.y), seg2 = new egSegment(pte1.x, pte1.y, pte2.x - pte1.x, pte2.y - pte1.y, 0, 0), curve1 = new egCurve(null, seg1, seg2), seg3 = new egSegment(pte1.x, pte1.y, 0, 0, pte.x - pte1.x, pte.y - pte1.y), seg4 = new egSegment(pta2.x, pta2.y, pta1.x - pta2.x, pta1.y - pta2.y, 0, 0), curve2 = new egCurve(null, seg3, seg4);
                    var ang1 = qAtan2(curve1.getTangentAtTime(1)._y, curve1.getTangentAtTime(1)._x), ang2 = qAtan2(curve2.getTangentAtTime(0)._y, curve2.getTangentAtTime(0)._x), alfa = ang1 - ang2;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                        tempSegments.push(this._elements[i + 1].clone_());
                        tempSegments.push(this._elements[i + 2].clone_());
                    }
                    else {
                        var _size = size, len1 = curve1.getLength(), len2 = curve2.getLength();
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t1 = curve1.getTimeAt(-_size), curves1 = egCurve.subdivide(curve1.getValues(), t1);
                        var t2 = curve2.getTimeAt(_size), curves2 = egCurve.subdivide(curve2.getValues(), t2);
                        var ang3 = qAtan2(egCurve.getTangent(curves1[1], 0)._y, egCurve.getTangent(curves1[1], 0)._x), ang4 = qAtan2(egCurve.getTangent(curves2[1], 0)._y, egCurve.getTangent(curves2[1], 0)._x) + Math.PI;
                        var lx = _size * qCos(ang3), ly = _size * qSin(ang3), rx = _size * qCos(ang4), ry = _size * qSin(ang4);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptL = new egPoint(curves1[1][0], curves1[1][1]), ptR = new egPoint(curves2[1][0], curves2[1][1]);
                        tempSegments[tempSegments.length - 3].setXY(curves1[0][2], curves1[0][3]);
                        tempSegments[tempSegments.length - 2].setXY(curves1[0][4], curves1[0][5]);
                        tempSegments[tempSegments.length - 1].setXY(ptL.x, ptL.y);
                        tempSegments.push(new EDPathElement(ptL.x + lx * arcrat * 1.5, ptL.y + ly * arcrat * 1.5, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(ptR.x + rx * arcrat * 1.5, ptR.y + ry * arcrat * 1.5, ePet.CurveData));
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.CurveData));
                        tempSegments.push(new EDPathElement(curves2[1][2], curves2[1][3], ePet.CurveTo));
                        tempSegments.push(new EDPathElement(curves2[1][4], curves2[1][5], ePet.CurveData));
                        tempSegments.push(new EDPathElement(curves2[1][6], curves2[1][7], ePet.CurveData));
                    }
                    //curve1.release();
                    //curve2.release();
                    i += 2;
                }
            }
            else if (this._elements[i]._type == ePet.Close) {
                if (this._elements[prevMoveTo + 1]._type == ePet.LineTo && this._elements[i - 1]._type == ePet.LineTo) {
                    pt1 = this._elements[i - 2].point;
                    pt2 = this._elements[i - 1].point;
                    pt3 = this._elements[prevMoveTo + 1].point;
                    var ang1 = qAtan2(pt1.y - pt2.y, pt1.x - pt2.x), ang2 = qAtan2(pt3.y - pt2.y, pt3.x - pt2.x), alfa = ang2 - ang1;
                    if (qAbs(alfa) < 0.001 || qAbs(qAbs(alfa) - Math.PI) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = Math.sqrt(qPow(pt1.x - pt2.x, 2) + qPow(pt1.y - pt2.y, 2)), len2 = Math.sqrt(qPow(pt2.x - pt3.x, 2) + qPow(pt2.y - pt3.y, 2));
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var lx = _size * qCos(ang1), ly = _size * qSin(ang1), rx = _size * qCos(ang2), ry = _size * qSin(ang2);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptR = new egPoint(pt2.x + rx, pt2.y + ry);
                        tempSegments[tempSegments.length - 1].setXY(pt2.x + lx, pt2.y + ly);
                        tempSegments.push(new EDPathElement(pt2.x + lx * arcrat, pt2.y + ly * arcrat, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(pt2.x + rx * arcrat, pt2.y + ry * arcrat, ePet.CurveData));
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.CurveData));
                        tempSegments[prevInSeg].point = ptR;
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.Close));
                    }
                }
                else if (this._elements[prevMoveTo + 1]._type == ePet.CurveTo && this._elements[i - 1]._type == ePet.LineTo) {
                    var pte = this._elements[prevMoveTo].point, pte1 = this._elements[prevMoveTo + 1].point, pte2 = this._elements[prevMoveTo + 2].point, pte3 = this._elements[prevMoveTo + 3].point;
                    var seg1 = new egSegment(pte.x, pte.y, 0, 0, pte1.x - pte.x, pte1.y - pte.y), seg2 = new egSegment(pte3.x, pte3.y, pte2.x - pte3.x, pte2.y - pte3.y, 0, 0), curve = new egCurve(null, seg1, seg2);
                    pt1 = this._elements[i - 2].point;
                    pt2 = this._elements[i - 1].point;
                    pt3.set(0, 0);
                    var ang1 = qAtan2(pt1.y - pt2.y, pt1.x - pt2.x), ang2 = qAtan2(curve.getTangentAtTime(0)._y, curve.getTangentAtTime(0)._x), alfa = ang1 - ang2;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = Math.sqrt(qPow(pt1.x - pt2.x, 2) + qPow(pt1.y - pt2.y, 2)), len2 = curve.getLength();
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t = curve.getTimeAt(_size), curves = egCurve.subdivide(curve.getValues(), t), ang3 = qAtan2(egCurve.getTangent(curves[1], 0)._y, egCurve.getTangent(curves[1], 0)._x) + Math.PI;
                        var lx = _size * qCos(ang1), ly = _size * qSin(ang1), rx = _size * qCos(ang3), ry = _size * qSin(ang3);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptR = new egPoint(curves[0][6], curves[0][7]);
                        tempSegments[tempSegments.length - 1].setXY(pt2.x + lx, pt2.y + ly);
                        tempSegments.push(new EDPathElement(pt2.x + lx * arcrat, pt2.y + ly * arcrat, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(ptR.x + rx * arcrat * 1.5, ptR.y + ry * arcrat * 1.5, ePet.CurveData));
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.CurveData));
                        tempSegments[prevInSeg].point = ptR;
                        tempSegments[prevInSeg + 1].setXY(curves[1][2], curves[1][3]);
                        tempSegments[prevInSeg + 2].setXY(curves[1][4], curves[1][5]);
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.Close));
                    }
                    //curve.release();
                }
                else if (this._elements[prevMoveTo + 1]._type == ePet.LineTo && this._elements[i - 1]._type == ePet.CurveData) {
                    var pte1 = this._elements[i - 1].point, pte2 = this._elements[i - 2].point, pte3 = this._elements[i - 3].point, pte4 = this._elements[i - 4].point;
                    var seg1 = new egSegment(pte4.x, pte4.y, 0, 0, pte3.x - pte4.x, pte3.y - pte4.y), seg2 = new egSegment(pte1.x, pte1.y, pte2.x - pte1.x, pte2.y - pte1.y, 0, 0), curve = new egCurve(null, seg1, seg2);
                    pt1.set(0, 0);
                    pt2 = this._elements[prevMoveTo].point;
                    pt3 = this._elements[prevMoveTo + 1].point;
                    var ang1 = qAtan2(curve.getTangentAtTime(1)._y, curve.getTangentAtTime(1)._x), ang2 = qAtan2(pt3.y - pt2.y, pt3.x - pt2.x), alfa = ang2 - ang1;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = curve.getLength(), len2 = Math.sqrt(qPow(pt3.x - pt2.x, 2) + qPow(pt3.y - pt2.y, 2));
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t = curve.getTimeAt(-_size), curves = egCurve.subdivide(curve.getValues(), t), ang3 = qAtan2(egCurve.getTangent(curves[1], 0)._y, egCurve.getTangent(curves[1], 0)._x);
                        var lx = _size * qCos(ang3), ly = _size * qSin(ang3), rx = _size * qCos(ang2), ry = _size * qSin(ang2);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptL = new egPoint(curves[0][6], curves[0][7]), ptR = new egPoint(pt2.x + rx, pt2.y + ry);
                        tempSegments[tempSegments.length - 3].setXY(curves[0][2], curves[0][3]);
                        tempSegments[tempSegments.length - 2].setXY(curves[0][4], curves[0][5]);
                        tempSegments[tempSegments.length - 1].point = ptL;
                        tempSegments.push(new EDPathElement(ptL.x + lx * arcrat * 1.5, ptL.y + ly * arcrat * 1.5, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(pt2.x + rx * arcrat, pt2.y + ry * arcrat, ePet.CurveData));
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.CurveData));
                        tempSegments[prevInSeg].point = ptR;
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.Close));
                    }
                    //curve.release();
                }
                else if (this._elements[prevMoveTo + 1]._type == ePet.CurveTo && this._elements[i - 1]._type == ePet.CurveData) {
                    var pte1 = this._elements[i - 1].point, pte2 = this._elements[i - 2].point, pte3 = this._elements[i - 3].point, pte4 = this._elements[i - 4].point;
                    var seg1 = new egSegment(pte4.x, pte4.y, 0, 0, pte3.x - pte4.x, pte3.y - pte4.y), seg2 = new egSegment(pte1.x, pte1.y, pte2.x - pte1.x, pte2.y - pte1.y, 0, 0), curve1 = new egCurve(null, seg1, seg2);
                    pte1 = this._elements[prevMoveTo].point;
                    pte2 = this._elements[prevMoveTo + 1].point;
                    pte3 = this._elements[prevMoveTo + 2].point;
                    pte4 = this._elements[prevMoveTo + 3].point;
                    var seg3 = new egSegment(pte1.x, pte1.y, 0, 0, pte2.x - pte1.x, pte2.y - pte1.y), seg4 = new egSegment(pte4.x, pte4.y, pte3.x - pte4.x, pte3.y - pte4.y, 0, 0), curve2 = new egCurve(null, seg3, seg4);
                    var ang1 = qAtan2(curve1.getTangentAtTime(1)._y, curve1.getTangentAtTime(1)._x), ang2 = qAtan2(curve2.getTangentAtTime(0)._y, curve2.getTangentAtTime(0)._x), alfa = ang1 - ang2;
                    if (qAbs(alfa) < 0.001) {
                        tempSegments.push(this._elements[i].clone_());
                    }
                    else {
                        var _size = size, len1 = curve1.getLength(), len2 = curve2.getLength();
                        if (len1 < _size * 2)
                            _size = len1 * 0.5;
                        if (len2 < _size * 2)
                            _size = len2 * 0.5;
                        var t1 = curve1.getTimeAt(-_size), curves1 = egCurve.subdivide(curve1.getValues(), t1);
                        var t2 = curve2.getTimeAt(_size), curves2 = egCurve.subdivide(curve2.getValues(), t2);
                        var ang3 = qAtan2(egCurve.getTangent(curves1[1], 0)._y, egCurve.getTangent(curves1[1], 0)._x), ang4 = qAtan2(egCurve.getTangent(curves2[1], 0)._y, egCurve.getTangent(curves2[1], 0)._x) + Math.PI;
                        var lx = _size * qCos(ang3), ly = _size * qSin(ang3), rx = _size * qCos(ang4), ry = _size * qSin(ang4);
                        if (qAbs(lx) < 0.01)
                            lx = 0;
                        if (qAbs(ly) < 0.01)
                            ly = 0;
                        if (qAbs(rx) < 0.01)
                            rx = 0;
                        if (qAbs(ry) < 0.01)
                            ry = 0;
                        var ptL = new egPoint(curves1[1][0], curves1[1][1]), ptR = new egPoint(curves2[1][0], curves2[1][1]);
                        tempSegments[tempSegments.length - 3].setXY(curves1[0][2], curves1[0][3]);
                        tempSegments[tempSegments.length - 2].setXY(curves1[0][4], curves1[0][5]);
                        tempSegments[tempSegments.length - 1].point = ptL;
                        tempSegments.push(new EDPathElement(ptL.x + lx * arcrat * 1.5, ptL.y + ly * arcrat * 1.5, ePet.CurveTo));
                        tempSegments.push(new EDPathElement(ptR.x + lx * arcrat * 1.5, ptR.y + ly * arcrat * 1.5, ePet.CurveData));
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.CurveData));
                        tempSegments[prevInSeg].point = ptR;
                        tempSegments[prevInSeg + 1].setXY(curves2[1][2], curves2[1][3]);
                        tempSegments[prevInSeg + 2].setXY(curves2[1][4], curves2[1][5]);
                        tempSegments.push(new EDPathElement(ptR.x, ptR.y, ePet.Close));
                    }
                    //curve1.release();
                    //curve2.release();
                }
            }
        }
        this._elements = tempSegments;
    };
    EDPath.prototype.setCornerRound2 = function (size) {
        if (size < 1)
            return;
        var xpath = this.toXPath();
        for (var i = 0; i < xpath._children.length; i++) {
            var epath = xpath._children[i];
            if (epath) {
                if (epath._segments.length < 3 || epath.getLength() <= size)
                    continue;
                var curSeg = epath._segments[0];
                while (curSeg && curSeg !== epath._segments[epath._segments.length - 1]) {
                    var prevLen = 0, nextLen = 0, prevSeg = curSeg.getPrevious(), nextSeg = curSeg.getNext(), prevCurves = [], nextCurves = [];
                    if (!prevSeg || !nextSeg) {
                        curSeg = curSeg.getNext();
                        continue;
                    }
                    var pt1 = curSeg._handleIn;
                    var pt2 = curSeg._handleOut;
                    if (!pt1.isZero() && !pt2.isZero()) {
                        var ang1 = Math.atan2(pt1.y, pt1.x), ang2 = Math.atan2(pt2.y, pt2.x);
                        if (Math.abs(ang1 - ang2) < 0.001 || Math.abs(Math.abs(ang1 - ang2) - Math.PI) < 0.001) {
                            curSeg = curSeg.getNext();
                            continue;
                        }
                    }
                    var seg = void 0, tempSeg = curSeg;
                    while (prevSeg) {
                        var curve = new egCurve(epath, prevSeg, tempSeg);
                        prevLen += curve.getLength();
                        if (prevLen >= size) {
                            var t = curve.getTimeAt(prevLen - size);
                            prevCurves = egCurve.subdivide(curve.getValues(), t);
                            curve.divideAtTime(t);
                            if (curSeg.getPrevious() !== prevSeg) {
                                seg = curSeg.getPrevious().getPrevious();
                                while (seg !== prevSeg) {
                                    seg.getNext().remove();
                                    seg = seg.getPrevious();
                                }
                            }
                            break;
                        }
                        tempSeg = prevSeg;
                        prevSeg = tempSeg.getPrevious();
                    }
                    if (!prevSeg && tempSeg) {
                        seg = curSeg.getPrevious().getPrevious();
                        while (seg !== prevSeg) {
                            seg.getNext().remove();
                            seg = seg.getPrevious();
                        }
                    }
                    tempSeg = curSeg;
                    while (nextSeg) {
                        var curve = new egCurve(epath, tempSeg, nextSeg);
                        nextLen += curve.getLength();
                        if (nextLen >= size) {
                            var t = curve.getTimeAt(size - nextLen);
                            nextCurves = egCurve.subdivide(curve.getValues(), t);
                            curve.divideAtTime(t);
                            if (curSeg.getNext() !== nextSeg) {
                                seg = curSeg.getNext().getNext();
                                while (seg !== nextSeg) {
                                    seg.getPrevious().remove();
                                    seg = seg.getNext();
                                }
                            }
                            break;
                        }
                        tempSeg = nextSeg;
                        nextSeg = tempSeg.getNext();
                    }
                    if (!nextSeg && tempSeg) {
                        seg = curSeg.getNext().getNext();
                        while (seg !== nextSeg) {
                            seg.getPrevious().remove();
                            seg = seg.getNext();
                        }
                    }
                    // After trimed
                    prevSeg = curSeg.getPrevious();
                    nextSeg = curSeg.getNext();
                    if (!prevSeg || !nextSeg)
                        break;
                    var prevAng = 0, nextAng = 0;
                    if (prevCurves.length > 0) {
                        var tangent = egCurve.getTangent(prevCurves[1], 0);
                        prevAng = Math.atan2(tangent.y, tangent.x);
                    }
                    else if (prevSeg) {
                        if (!prevSeg._handleOut.isZero())
                            prevAng = Math.atan2(prevSeg._handleOut.y, prevSeg._handleOut.x);
                        else
                            prevAng = Math.atan2(curSeg.getPoint().y - prevSeg.getPoint().y, curSeg.getPoint().x - prevSeg.getPoint().x);
                    }
                    if (nextCurves.length > 0) {
                        var tangent = egCurve.getTangent(nextCurves[1], 0);
                        nextAng = Math.atan2(tangent.y, tangent.x) + Math.PI;
                    }
                    else if (nextSeg) {
                        if (!nextSeg._handleIn.isZero())
                            nextAng = Math.atan2(nextSeg._handleIn.y, nextSeg._handleIn.x);
                        else
                            nextAng = Math.atan2(curSeg.getPoint().y - nextSeg.getPoint().y, curSeg.getPoint().x - nextSeg.getPoint().x);
                    }
                    var px = size * Math.cos(prevAng), py = size * Math.sin(prevAng), nx = size * Math.cos(nextAng), ny = size * Math.sin(nextAng);
                    if (Math.abs(px) < 0.01)
                        px = 0;
                    if (Math.abs(py) < 0.01)
                        py = 0;
                    if (Math.abs(nx) < 0.01)
                        nx = 0;
                    if (Math.abs(ny) < 0.01)
                        ny = 0;
                    var arcrat = 0.448;
                    prevSeg.setHandleOut(new egPoint(px * arcrat * 1.5, py * arcrat * 1.5));
                    nextSeg.setHandleIn(new egPoint(nx * arcrat * 1.5, ny * arcrat * 1.5));
                    curSeg.remove();
                    curSeg = nextSeg;
                    curSeg = curSeg.getNext();
                }
            }
        }
        this.reset();
        this.fromXPath(xpath);
    };
    EDPath.prototype.translate = function (x, y) {
        for (var i = 0, l = this._elements.length; i < l; i++) {
            this._elements[i]._x += x;
            this._elements[i]._y += y;
        }
    };
    EDPath.prototype.scale = function (xscale, yscale) {
        var ma = new egMatrix();
        ma.scale(xscale, yscale);
        this.transform(ma);
    };
    EDPath.prototype.transform = function (ma) {
        for (var i = 0, l = this._elements.length; i < l; i++) {
            var v = ma.transformXY(this._elements[i]._x, this._elements[i]._y);
            this._elements[i]._x = v[0];
            this._elements[i]._y = v[1];
        }
    };
    EDPath.prototype.isClockWise = function () {
        var path = new egPath();
        for (var i = 0; i < this._elements.length; i++) {
            if (this._elements[i]._type == ePet.MoveTo && i > 0) //第二个MoveTo
                break;
            switch (this._elements[i]._type) {
                case ePet.MoveTo:
                    path.moveTo(this._elements[i].point);
                    break;
                case ePet.LineTo:
                    path.lineTo(this._elements[i].point);
                    break;
                case ePet.CurveTo:
                    if (i < this._elements.length - 2) {
                        path.cubicCurveTo(this._elements[i].point, this._elements[i + 1].point, this._elements[i + 2].point);
                        i += 2;
                    }
                    break;
                case ePet.Close:
                    path.closePath(1);
                    break;
                default:
                    break;
            }
        }
        return path.isClockwise(); //第一条路径的方向
    };
    EDPath.prototype.toXPath = function (fromIdx) {
        if (fromIdx === void 0) { fromIdx = 0; }
        var path, paths = [];
        for (var i = fromIdx, l = this._elements.length; i < l; i++) {
            var elem = this._elements[i];
            switch (elem._type) {
                case ePet.MoveTo:
                    path = new egPath();
                    paths.push(path);
                    path.moveToXY(elem._x, elem._y);
                    break;
                case ePet.LineTo:
                    path.lineToXY(elem._x, elem._y);
                    break;
                case ePet.CurveTo:
                    if (i < this._elements.length - 2) {
                        path.cubicCurveTo(elem.point, this._elements[i + 1].point, this._elements[i + 2].point);
                        i += 2;
                    }
                    break;
                case ePet.Close:
                    path.closePath(1);
                    break;
                default:
                    break;
            }
        }
        var xpath = new XPath();
        xpath.setChildren(paths);
        return xpath;
    };
    EDPath.prototype.fromXPath = function (gpath, from, to) {
        if (from === void 0) { from = 0; }
        var epath = this;
        function fromPath(path) {
            if (path && path._segments.length > 1) {
                var seg1 = path._segments[0], seg2 = seg1;
                for (var i = 0, l = path._segments.length - 1; i < l; i++) {
                    seg1 = seg2;
                    seg2 = path._segments[i + 1];
                    var startPt = seg1._point, outPt = seg1._handleOut, endPt = seg2._point, inPt = seg2._handleIn;
                    if (i === 0)
                        epath.moveToPt(startPt);
                    if (outPt._x !== 0 || outPt._y !== 0 || inPt._x !== 0 || inPt._y !== 0)
                        epath.curveToPt(outPt.add(startPt), inPt.add(endPt), endPt);
                    else
                        epath.lineToPt(endPt);
                }
                if (path.isClosed()) {
                    seg1 = seg2;
                    seg2 = path._segments[0];
                    var startPt = seg1._point, outPt = seg1._handleOut, endPt = seg2._point, inPt = seg2._handleIn;
                    if (outPt._x !== 0 || outPt._y !== 0 || inPt._x !== 0 || inPt._y !== 0)
                        epath.curveToPt(outPt.add(startPt), inPt.add(endPt), endPt);
                    else
                        epath.lineToPt(endPt);
                    epath.closeSubpath();
                }
            }
        }
        if (to === undefined)
            to = gpath._children.length;
        for (var i = from; i < to; i++)
            fromPath(gpath._children[i]);
    };
    EDPath.prototype.getBound = function (style) {
        var xpath = this.toXPath(), stroke = style ? true : false;
        return xpath.getBounds(new egBoundOpt(stroke, true), style);
    };
    EDPath.prototype.hit = function (pt, opt, style) {
        var xpath = this.toXPath();
        return xpath.hitTest(pt, opt, style);
    };
    EDPath.prototype.unite = function (path) {
        var xpath1 = this.toXPath(), xpath2 = path ? path.toXPath() : xpath1, newPath = xpath1.unite(xpath2);
        if (newPath) {
            this.reset();
            this.fromXPath(newPath);
        }
    };
    EDPath.prototype.intersect = function (path) {
        var xpath1 = this.toXPath(), xpath2 = path.toXPath(), newPath = xpath1.intersect(xpath2);
        if (newPath) {
            this.reset();
            this.fromXPath(newPath);
        }
    };
    EDPath.prototype.intersects = function (path) {
        var xpath1 = this.toXPath(), xpath2 = path.toXPath(), newPath = xpath1.intersect(xpath2);
        console.log(newPath);
        if (newPath.getFirstChild()) {
            return true;
        }
        else {
            return false;
        }
    };
    EDPath.prototype.subtract = function (path) {
        var xpath1 = this.toXPath(), xpath2 = path.toXPath(), newPath = xpath1.subtract(xpath2);
        if (newPath) {
            this.reset();
            this.fromXPath(newPath);
        }
    };
    EDPath.prototype.crossPoints = function (path) {
        var xpath1 = this.toXPath(), xpath2 = path.toXPath();
        var locs = xpath1.getCrossings(xpath2);
        var res = [];
        for (var i = 0; i < locs.length; i++) {
            res.push(locs[i].getPoint().clone_());
        }
        return res;
    };
    EDPath.prototype.smooth = function (tpe) {
        if (tpe === void 0) { tpe = 4; }
        var xpath1 = this.toXPath();
        xpath1.smooth(tpe);
        this.reset();
        this.fromXPath(xpath1);
    };
    EDPath.prototype.reverse = function () {
        var spos = 0, epos = this._elements.length - 1, cpos = 1;
        while (cpos < this._elements.length) {
            for (; cpos < this._elements.length; cpos++) {
                if (this._elements[cpos]._type == ePet.MoveTo || this._elements[cpos]._type == ePet.Close) {
                    epos = cpos - 1;
                    break;
                }
            }
            if (cpos >= this._elements.length) {
                cpos = this._elements.length - 1;
                epos = cpos;
            }
            var sp = spos, ep = epos, pts = this._elements[spos].point;
            spos++;
            while (spos < epos) {
                var tpe = this._elements[spos]._type;
                this._elements[spos]._type = this._elements[epos]._type;
                this._elements[epos]._type = tpe;
                var pt = this._elements[spos].point;
                this._elements[spos].point = this._elements[epos].point;
                this._elements[epos].point = pt;
                spos++;
                epos--;
            }
            for (var i = sp; i < ep; i++)
                this._elements[i].point = this._elements[i + 1].point;
            this._elements[ep].point = pts;
            if (this._elements[cpos]._type == ePet.Close)
                cpos++;
            spos = cpos;
            cpos++;
        }
        for (var i = 0; i < this._elements.length; i++) {
            if (this._elements[i]._type == ePet.CurveData) {
                if (i < this._elements.length - 2) {
                    this._elements[i]._type = ePet.CurveTo;
                    this._elements[i + 1]._type = ePet.CurveData;
                    this._elements[i + 2]._type = ePet.CurveData;
                    i += 2;
                }
            }
        }
    };
    EDPath.prototype.getTangent = function (index, start) {
        if (start === void 0) { start = true; }
        var xpath1 = this.toXPath(index);
        if (xpath1._children.length == 0)
            return 0;
        var path = xpath1._children[0], offset = start ? 0 : path.getLength(), pt = xpath1._children[0].getTangentAt(offset);
        return pt.getAngle();
    };
    EDPath.prototype.dividePath = function (path, pt, keepFirst) {
        if (keepFirst === void 0) { keepFirst = false; }
        var xpath1 = this.toXPath(), xpath2 = path.toXPath();
        var locs = xpath1.getCrossings(xpath2);
        if (locs.length > 0) {
            var pt_1 = locs[0].getPoint(), newPath = xpath1._children[0].splitAt(locs[0]);
            if (keepFirst) {
                xpath1.removeChild(newPath);
                this.reset();
                this.fromXPath(xpath1);
            }
            else {
                var tmpPath = new XPath;
                tmpPath.addChild(newPath);
                xpath1.removeChild(newPath);
                this.reset();
                this.fromXPath(tmpPath);
            }
            return true;
        }
        return false;
    };
    EDPath.prototype.wavePath = function (path, mode, step, height, satu) {
        if (height === void 0) { height = -1; }
        if (satu === void 0) { satu = 1.2; }
        var xpath = this.toXPath(), epath, tlen = 0, off = 0, h = height == -1 ? step * 0.5 : height, lv = h * satu, ptlast = new egPoint, ptstart = new egPoint, ptc1 = new egPoint, dir = -1;
        function addCurve(size) {
            var loc = epath.getLocationAt(off + size);
            if (loc) {
                var pt = loc.getPoint(), tang = loc.getTangent();
                pt.x += tang.y * h * dir;
                pt.y -= tang.x * h * dir;
                var pt2 = pt.clone_(), pt1 = pt.clone_();
                pt1.x -= tang.x * lv;
                pt1.y -= tang.y * lv;
                pt2.x += tang.x * lv;
                pt2.y += tang.y * lv;
                if (off == 0 && epath.isClosed()) {
                    path._elements.pop();
                    path.moveToPt(pt);
                    ptstart.setPt(pt);
                    ptc1.setPt(pt1);
                }
                else {
                    path.curveToPt(ptlast, pt1, pt);
                }
                ptlast.setPt(pt2);
            }
        }
        ;
        function addV(size) {
            var loc = epath.getLocationAt(off + size);
            if (loc) {
                var pt = loc.getPoint(), tang = loc.getTangent();
                pt.x += tang.y * h * dir;
                pt.y -= tang.x * h * dir;
                if (off == 0 && epath.isClosed()) {
                    ptstart.setPt(pt);
                    path._elements.pop();
                    path.moveToPt(pt);
                }
                else {
                    path.lineToPt(pt);
                }
            }
        }
        ;
        function addWall(last) {
            var loc = epath.getLocationAt(off);
            if (loc) {
                var pt = loc.getPoint(), pt2 = pt.clone_(), tang = loc.getTangent();
                pt.x += tang.y * h * dir;
                pt.y -= tang.x * h * dir;
                pt2.x -= tang.y * h * dir;
                pt2.y += tang.x * h * dir;
                if (last) {
                    path.lineToPt(pt);
                }
                else if (off == 0) {
                    if (epath.isClosed()) {
                        path._elements.pop();
                        path.moveToPt(pt);
                        path.lineToPt(pt2);
                    }
                    else {
                        path.lineToPt(pt2);
                    }
                }
                else {
                    path.lineToPt(pt);
                    path.lineToPt(pt2);
                }
            }
        }
        ;
        for (var i = 0; i < xpath._children.length; i++) {
            epath = xpath._children[i];
            if (epath.isEmpty())
                continue;
            tlen = epath.getLength();
            var stepx = tlen / step, num = Math.round(stepx);
            if (epath.isClosed() && (mode == 0 || mode == 3 || mode == 6)) { //to even number
                if (num % 2 != 0) {
                    num < stepx ? num++ : num--;
                }
            }
            stepx = tlen / num; //make sure fit
            off = 0;
            dir = -1;
            ptstart = epath._segments[0].getPoint();
            ptlast.setPt(ptstart);
            path.moveToPt(ptlast);
            while (num > 0) {
                if (mode == 0) {
                    addCurve(off > 0 ? stepx : stepx * 0.5);
                    dir = dir * -1;
                    off += off > 0 ? stepx : stepx * 0.5;
                }
                else if (mode == 1 || mode == 2) {
                    var loc = epath.getLocationAt(off + stepx * 0.5), loc2 = epath.getLocationAt(off + stepx);
                    if (loc && loc2) {
                        var pt = loc.getPoint(), tang = loc.getTangent();
                        if (mode == 2) {
                            pt.x -= tang.y * h;
                            pt.y += tang.x * h;
                        }
                        else {
                            pt.x += tang.y * h;
                            pt.y -= tang.x * h;
                        }
                        var pt2 = pt.clone_(), pt1 = pt.clone_();
                        pt1.x -= tang.x * lv;
                        pt1.y -= tang.y * lv;
                        pt2.x += tang.x * lv;
                        pt2.y += tang.y * lv;
                        var pt3 = loc2.getPoint();
                        path.curveToPt(ptlast, pt1, pt);
                        path.curveToPt(pt2, pt3, pt3);
                        ptlast = pt3;
                    }
                    off += stepx;
                }
                else if (mode == 3) {
                    addV(off > 0 ? stepx : stepx * 0.5);
                    dir = dir * -1;
                    off += off > 0 ? stepx : stepx * 0.5;
                }
                else if (mode == 4 || mode == 5) {
                    var loc = epath.getLocationAt(off + stepx * 0.5), loc2 = epath.getLocationAt(off + stepx);
                    if (loc && loc2) {
                        var pt = loc.getPoint(), tang = loc.getTangent();
                        if (mode == 5) {
                            pt.x -= tang.y * h;
                            pt.y += tang.x * h;
                        }
                        else {
                            pt.x += tang.y * h;
                            pt.y -= tang.x * h;
                        }
                        var pt2 = loc2.getPoint();
                        path.lineToPt(pt);
                        path.lineToPt(pt2);
                    }
                    off += stepx;
                }
                else if (mode == 6) {
                    addWall(false);
                    off += stepx;
                    dir = dir * -1;
                }
                num--;
            }
            if (mode == 0) {
                if (epath.isClosed()) {
                    path.curveToPt(ptlast, ptc1, ptstart);
                }
                else {
                    var endPt = epath._segments.back().getPoint();
                    path.curveToPt(ptlast, endPt, endPt);
                }
            }
            else if (mode == 3) {
                if (epath.isClosed())
                    path.lineToPt(ptstart);
                else
                    path.lineToPt(epath._segments.back().getPoint());
            }
            else if (mode == 6) {
                if (!epath.isClosed()) {
                    addWall(true);
                    path.lineToPt(epath._segments.back().getPoint());
                }
            }
            if (epath.isClosed())
                path.closeSubpath();
        }
    };
    EDPath.prototype.thickPath = function (path, thickness, endThickness, precision) {
        if (endThickness === void 0) { endThickness = 0; }
        if (precision === void 0) { precision = 10; }
        var round = true, xpath = path.toXPath(), epath = xpath.getFirstChild();
        if (!epath)
            return;
        var len = epath.getLength(), clen = 0;
        var off = 0, preci = 0;
        var uppt = new egPoint, dwpt = new egPoint;
        var uppath = new EDPath, dwpath = new EDPath, curves = epath.getCurves();
        function addPt() {
            var offy = thickness - off * (thickness - endThickness) / len;
            if (off > len)
                off = len;
            var loc = epath.getLocationAt(off);
            if (loc) {
                var ept = loc.getTangent(), npt = loc.getPoint();
                uppt.x = npt.x - ept._y * offy;
                uppt.y = npt.y + ept._x * offy;
                dwpt.x = npt.x + ept._y * offy;
                dwpt.y = npt.y - ept._x * offy;
            }
        }
        ;
        addPt(); //off == 0
        uppath.moveToPt(uppt);
        dwpath.moveToPt(dwpt);
        for (var i = 0; i < curves.length; i++) {
            var curve = curves[i];
            preci = precision;
            clen = curve.getLength();
            if (curve.isStraight()) {
                off += curve.getLength();
                addPt();
                uppath.lineToPt(uppt);
                dwpath.lineToPt(dwpt);
            }
            else {
                var tmpup = new EDPath, tmpdw = new EDPath;
                tmpup.moveToPt(uppt);
                tmpdw.moveToPt(dwpt);
                var tlen = clen + off;
                while (clen / preci < 4 && preci >= 2)
                    preci *= 0.5;
                addPt();
                while (off < tlen - 0.1 && off < len - 0.1) {
                    off += preci;
                    if (off > tlen)
                        off = tlen;
                    addPt();
                    tmpup.lineToPt(uppt);
                    tmpdw.lineToPt(dwpt);
                }
                tmpup.smooth();
                uppath.addPath(tmpup, true);
                tmpdw.smooth();
                dwpath.addPath(tmpdw, true);
            }
        }
        var rsPath = new EDPath, rePath = new EDPath;
        if (round && uppath._elements.length > 1 && dwpath._elements.length > 1) {
            var rx = thickness * 1.2, ry = thickness, lrx = rx * 0.6, lry = ry * 0.55;
            var lpu = new egPoint, lpd = new egPoint;
            var pt1 = uppath._elements[0].point, pt2 = uppath._elements[1].point;
            var plen = Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y)), a = lrx / (lrx + plen);
            lpu.x = (pt1.x - a * pt2.x) / (1 - a);
            lpu.y = (pt1.y - a * pt2.y) / (1 - a);
            pt1 = dwpath._elements[0].point;
            pt2 = dwpath._elements[1].point;
            plen = Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
            a = lrx / (lrx + plen);
            lpd.x = (pt1.x - a * pt2.x) / (1 - a);
            lpd.y = (pt1.y - a * pt2.y) / (1 - a);
            var pc = path._elements[0].point, loc = epath.getLocationAt(0);
            if (loc) {
                var ept = loc.getTangent(), ang = ept.getAngle(), pts = [
                    new egPoint(pc.x - rx, pc.y - lry),
                    new egPoint(pc.x - rx, pc.y),
                    new egPoint(pc.x - rx, pc.y + lry)
                ];
                var ma = new egMatrix;
                ma.translate(pc.x, pc.y);
                ma.rotate(ang);
                ma.translate(-pc.x, -pc.y);
                for (var i = 0; i < 3; i++)
                    pts[i] = ma.transformPoint(pts[i]);
                rsPath.moveToPt(dwpath._elements[0].point);
                rsPath.curveToPt(lpd, pts[0], pts[1]);
                rsPath.curveToPt(pts[2], lpu, uppath._elements[0].point);
            }
        }
        if (endThickness > 0) {
            var rx = endThickness * 1.2, ry = endThickness, lrx = rx * 0.6, lry = ry * 0.55;
            var pt1 = uppath._elements.back().point, pt2 = uppath._elements[uppath._elements.length - 2].point;
            var plen = Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
            var lpu = new egPoint, lpd = new egPoint, a = lrx / (lrx + plen);
            lpu.x = (pt1.x - a * pt2.x) / (1 - a);
            lpu.y = (pt1.y - a * pt2.y) / (1 - a);
            pt1 = dwpath._elements.back().point;
            pt2 = dwpath._elements[dwpath._elements.length - 2].point;
            plen = Math.sqrt((pt1.x - pt2.x) * (pt1.x - pt2.x) + (pt1.y - pt2.y) * (pt1.y - pt2.y));
            a = lrx / (lrx + plen);
            lpd.x = (pt1.x - a * pt2.x) / (1 - a);
            lpd.y = (pt1.y - a * pt2.y) / (1 - a);
            var pc = path._elements.back().point, loc = epath.getLocationAt(len);
            if (loc) {
                var ept = loc.getTangent(), ang = ept.getAngle(), pts = [
                    new egPoint(pc.x + rx, pc.y + lry),
                    new egPoint(pc.x + rx, pc.y),
                    new egPoint(pc.x + rx, pc.y - lry)
                ];
                var ma = new egMatrix;
                ma.translate(pc.x, pc.y);
                ma.rotate(ang);
                ma.translate(-pc.x, -pc.y);
                for (var i = 0; i < 3; i++)
                    pts[i] = ma.transformPoint(pts[i]);
                rePath.moveToPt(uppath._elements.back().point);
                rePath.curveToPt(lpu, pts[0], pts[1]);
                rePath.curveToPt(pts[2], lpd, dwpath._elements.back().point);
            }
        }
        this.reset();
        this.addPath(rsPath);
        this.addPath(uppath, true);
        this.addPath(rePath, true);
        dwpath.reverse();
        this.addPath(dwpath, true);
        this.closeSubpath();
    };
    EDPath.prototype.manualPath = function (path, amplitude, precision) {
        if (amplitude === void 0) { amplitude = 1.2; }
        if (precision === void 0) { precision = 6; }
        if (!path || path.size() == 0)
            return;
        var tmpPath = new EDPath, xpath = path.toXPath(), epath, off = 0;
        function addPt() {
            var offy = amplitude * egMath.perlinNoise_1D(off * 0.05), pt = new egPoint(), loc = epath.getLocationAt(off);
            if (loc) {
                var ept = loc.getTangent(), npt = loc.getPoint();
                pt.x = npt.x + ept._y * offy;
                pt.y = npt.y - ept._x * offy;
            }
            return pt;
        }
        ;
        for (var i = 0; i < xpath._children.length; i++) {
            epath = xpath._children[i];
            if (epath) {
                off = 0;
                var epos = epath._segments.length - 1, len = epath.getLength(), pt = new egPoint, newPath = new EDPath, startPt = epath._segments[0]._point, endPt = epath.isClosed() ? startPt : epath._segments[epos]._point;
                //保留第一个点和最后一个点 不计算，以保证衔接处流畅
                newPath.moveToPt(startPt);
                off += precision;
                while (off < len) {
                    newPath.lineToPt(addPt());
                    off += precision;
                }
                newPath.lineToPt(endPt);
                if (epath.isClosed())
                    newPath.closeSubpath();
                tmpPath.addPath(newPath);
            }
        }
        this.assign_(tmpPath);
    };
    //special
    EDPath.prototype.containsPt = function (pt) {
        var xpath = this.toXPath(), opt = new egHitOpt(true, false, false, true, 1), result = xpath.hitTest(pt, opt);
        return result != null;
    };
    EDPath.prototype.curveReverse = function () {
        if (this._elements[0]._x > this._elements[this._elements.length - 1]._x)
            this.reverse();
    };
    EDPath.prototype.pointAtPercent = function (p) {
        var xpath = this.toXPath(), path = xpath.getFirstChild();
        var loc = path && path.getLocationAt(path.getLength() * p);
        return loc.getPoint();
    };
    return EDPath;
}());
