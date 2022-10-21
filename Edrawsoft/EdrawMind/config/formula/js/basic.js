//-------------------------Until--------------------------------
String.prototype.trim = function () {
    return this.replace(/(^\s+)|(\s+$)/g, '');
};
String.prototype.isEmpty = function () {
    return this.length == 0 || false;
};
String.prototype.toBool = function () {
    return this.valueOf() === '1' || this.valueOf().toUpperCase() === 'TRUE' || false;
};
String.prototype.toInt = function () {
    return this.length == 0 ? 0 : parseInt(this);
};
String.prototype.toFloat = function () {
    return this.length == 0 ? 0 : parseFloat(this);
};
String.prototype.insert = function (pos, str) {
    var newStr = "";
    for (var i = 0; this.length; i += pos) {
        var tmp = this.substring(i, i + pos);
        newStr += tmp + str;
    }
    return newStr;
};
String.prototype.push = function (str) {
    return this.concat(this, str);
};
CanvasRenderingContext2D.prototype.transform2 = function (mat) {
    this.transform(mat._a, mat._b, mat._c, mat._d, mat._tx, mat._ty);
};
Number.prototype.round = function (e) {
    var t = 1;
    for (; e > 0; t *= 10, e--)
        ;
    for (; e < 0; t /= 10, e++)
        ;
    return Math.round(this * t) / t;
};
var g_gus_blur_mul = [
    512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
    454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
    482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
    437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
    497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
    320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
    446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
    329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
    505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
    399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
    324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
    268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
    451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
    385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
    332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
    289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
];
var g_gus_blur_shr = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
];
var ed_clr = /** @class */ (function () {
    function ed_clr() {
        this.a = this.b = this.g = this.r = 0;
    }
    return ed_clr;
}());
;
var blurBitmap = function (image, radius) {
    var rx = radius, ry = rx, w = image.width, h = image.height, wm = w - 1, hm = h - 1, linew = image.width * 4;
    //console.log("blur", linew, image.width, image.height, radius);
    var pixels = image.data, x = 0, y = 0, xp = 0, yp = 0, i = 0, stack_ptr = 0, stack_start = 0, stack_pix_ptr;
    var sum_r = 0, sum_g = 0, sum_b = 0, sum_a = 0, sum_in_r = 0, sum_in_g = 0, sum_in_b = 0, sum_in_a = 0, sum_out_r = 0, sum_out_g = 0, sum_out_b = 0, sum_out_a = 0, div = 0, mul_sum = 0, shr_sum = 0;
    var clr_stack = [];
    if (rx > 0) {
        if (rx > 254)
            rx = 254;
        div = rx * 2 + 1;
        mul_sum = g_gus_blur_mul[rx];
        shr_sum = g_gus_blur_shr[rx];
        for (var j = 0; j < div; j++)
            clr_stack.push(new ed_clr());
        var pixel_idx = 0, cx = 0, dx = 0;
        for (y = 0; y < h; y++) {
            sum_r = 0;
            sum_g = 0;
            sum_b = 0;
            sum_a = 0;
            sum_in_r = 0;
            sum_in_g = 0;
            sum_in_b = 0;
            sum_in_a = 0;
            sum_out_r = 0;
            sum_out_g = 0;
            sum_out_b = 0;
            sum_out_a = 0;
            cx = pixel_idx;
            for (i = 0; i <= rx; i++) {
                stack_pix_ptr = clr_stack[i];
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_a += stack_pix_ptr.a * (i + 1);
                sum_r += stack_pix_ptr.r * (i + 1);
                sum_g += stack_pix_ptr.g * (i + 1);
                sum_b += stack_pix_ptr.b * (i + 1);
                sum_out_a += stack_pix_ptr.a;
                sum_out_r += stack_pix_ptr.r;
                sum_out_g += stack_pix_ptr.g;
                sum_out_b += stack_pix_ptr.b;
            }
            for (i = 1; i <= rx; i++) {
                if (i <= wm)
                    cx += 4;
                stack_pix_ptr = clr_stack[i + rx];
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_a += stack_pix_ptr.a * (rx + 1 - i);
                sum_r += stack_pix_ptr.r * (rx + 1 - i);
                sum_g += stack_pix_ptr.g * (rx + 1 - i);
                sum_b += stack_pix_ptr.b * (rx + 1 - i);
                sum_in_a += stack_pix_ptr.a;
                sum_in_r += stack_pix_ptr.r;
                sum_in_g += stack_pix_ptr.g;
                sum_in_b += stack_pix_ptr.b;
            }
            stack_ptr = rx;
            xp = rx;
            if (xp > wm)
                xp = wm;
            cx = pixel_idx + xp * 4;
            dx = pixel_idx;
            for (x = 0; x < w; x++) {
                pixels[dx] = (sum_r * mul_sum) >> shr_sum;
                pixels[dx + 1] = (sum_g * mul_sum) >> shr_sum;
                pixels[dx + 2] = (sum_b * mul_sum) >> shr_sum;
                pixels[dx + 3] = (sum_a * mul_sum) >> shr_sum;
                dx += 4;
                sum_r -= sum_out_r;
                sum_g -= sum_out_g;
                sum_b -= sum_out_b;
                sum_a -= sum_out_a;
                stack_start = stack_ptr + div - rx;
                if (stack_start >= div)
                    stack_start -= div;
                stack_pix_ptr = clr_stack[stack_start];
                sum_out_a -= stack_pix_ptr.a;
                sum_out_r -= stack_pix_ptr.r;
                sum_out_g -= stack_pix_ptr.g;
                sum_out_b -= stack_pix_ptr.b;
                if (xp < wm) {
                    cx += 4;
                    ++xp;
                }
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_in_a += stack_pix_ptr.a;
                sum_in_r += stack_pix_ptr.r;
                sum_in_g += stack_pix_ptr.g;
                sum_in_b += stack_pix_ptr.b;
                sum_a += sum_in_a;
                sum_r += sum_in_r;
                sum_g += sum_in_g;
                sum_b += sum_in_b;
                ++stack_ptr;
                if (stack_ptr >= div)
                    stack_ptr = 0;
                stack_pix_ptr = clr_stack[stack_ptr];
                sum_out_a += stack_pix_ptr.a;
                sum_out_r += stack_pix_ptr.r;
                sum_out_g += stack_pix_ptr.g;
                sum_out_b += stack_pix_ptr.b;
                sum_in_a -= stack_pix_ptr.a;
                sum_in_r -= stack_pix_ptr.r;
                sum_in_g -= stack_pix_ptr.g;
                sum_in_b -= stack_pix_ptr.b;
            }
            pixel_idx += linew;
        }
        clr_stack = [];
    }
    if (ry > 0) {
        if (ry > 254)
            ry = 254;
        div = ry * 2 + 1;
        mul_sum = g_gus_blur_mul[ry];
        shr_sum = g_gus_blur_shr[ry];
        for (var j = 0; j < div; j++)
            clr_stack.push(new ed_clr());
        var pixel_x = 0, cx = 0, dx = 0;
        for (x = 0; x < w; x++) {
            sum_r = 0;
            sum_g = 0;
            sum_b = 0;
            sum_a = 0;
            sum_in_r = 0;
            sum_in_g = 0;
            sum_in_b = 0;
            sum_in_a = 0;
            sum_out_r = 0;
            sum_out_g = 0;
            sum_out_b = 0;
            sum_out_a = 0;
            cx = pixel_x;
            for (i = 0; i <= ry; i++) {
                stack_pix_ptr = clr_stack[i];
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_a += stack_pix_ptr.a * (i + 1);
                sum_r += stack_pix_ptr.r * (i + 1);
                sum_g += stack_pix_ptr.g * (i + 1);
                sum_b += stack_pix_ptr.b * (i + 1);
                sum_out_a += stack_pix_ptr.a;
                sum_out_r += stack_pix_ptr.r;
                sum_out_g += stack_pix_ptr.g;
                sum_out_b += stack_pix_ptr.b;
            }
            for (i = 1; i <= ry; i++) {
                if (i <= hm)
                    cx += linew;
                stack_pix_ptr = clr_stack[i + ry];
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_a += stack_pix_ptr.a * (ry + 1 - i);
                sum_r += stack_pix_ptr.r * (ry + 1 - i);
                sum_g += stack_pix_ptr.g * (ry + 1 - i);
                sum_b += stack_pix_ptr.b * (ry + 1 - i);
                sum_in_a += stack_pix_ptr.a;
                sum_in_r += stack_pix_ptr.r;
                sum_in_g += stack_pix_ptr.g;
                sum_in_b += stack_pix_ptr.b;
            }
            stack_ptr = ry;
            yp = ry;
            if (yp > hm)
                yp = hm;
            cx = pixel_x + yp * linew;
            dx = pixel_x;
            for (y = 0; y < h; y++) {
                pixels[dx] = (sum_r * mul_sum) >> shr_sum;
                pixels[dx + 1] = (sum_g * mul_sum) >> shr_sum;
                pixels[dx + 2] = (sum_b * mul_sum) >> shr_sum;
                pixels[dx + 3] = (sum_a * mul_sum) >> shr_sum;
                dx += linew;
                sum_a -= sum_out_a;
                sum_r -= sum_out_r;
                sum_g -= sum_out_g;
                sum_b -= sum_out_b;
                stack_start = stack_ptr + div - ry;
                if (stack_start >= div)
                    stack_start -= div;
                stack_pix_ptr = clr_stack[stack_start];
                sum_out_a -= stack_pix_ptr.a;
                sum_out_r -= stack_pix_ptr.r;
                sum_out_g -= stack_pix_ptr.g;
                sum_out_b -= stack_pix_ptr.b;
                if (yp < hm) {
                    cx += linew;
                    ++yp;
                }
                stack_pix_ptr.r = pixels[cx];
                stack_pix_ptr.g = pixels[cx + 1];
                stack_pix_ptr.b = pixels[cx + 2];
                stack_pix_ptr.a = pixels[cx + 3];
                sum_in_a += stack_pix_ptr.a;
                sum_in_r += stack_pix_ptr.r;
                sum_in_g += stack_pix_ptr.g;
                sum_in_b += stack_pix_ptr.b;
                sum_a += sum_in_a;
                sum_r += sum_in_r;
                sum_g += sum_in_g;
                sum_b += sum_in_b;
                ++stack_ptr;
                if (stack_ptr >= div)
                    stack_ptr = 0;
                stack_pix_ptr = clr_stack[stack_ptr];
                sum_out_a += stack_pix_ptr.a;
                sum_out_r += stack_pix_ptr.r;
                sum_out_g += stack_pix_ptr.g;
                sum_out_b += stack_pix_ptr.b;
                sum_in_a -= stack_pix_ptr.a;
                sum_in_r -= stack_pix_ptr.r;
                sum_in_g -= stack_pix_ptr.g;
                sum_in_b -= stack_pix_ptr.b;
            }
            pixel_x += 4;
        }
        clr_stack = [];
    }
};
var EDQuark = /** @class */ (function () {
    function EDQuark() {
    }
    EDQuark.quarkNumber = function (name) {
        EDQuark.init();
        var v = EDQuark._map[name];
        if (v)
            return v;
        else
            return 0;
    };
    EDQuark.quarkStr = function (key) {
        EDQuark.init();
        if (key >= 0 && key < EDQuark._names.length)
            return EDQuark._names[key];
        return '';
    };
    EDQuark.init = function () {
        if (EDQuark._init)
            return;
        EDQuark._map['Invalid'] = 0;
        EDQuark._map[STR4_Unit_Page] = 1;
        EDQuark._map[STR4_Unit_Real] = 2;
        EDQuark._map[STR4_Unit_Int] = 3;
        EDQuark._map[STR4_Unit_Bool] = 4;
        EDQuark._map[STR4_Unit_Str] = 5;
        EDQuark._map[STR4_Unit_Point] = 6;
        EDQuark._map[STR4_Unit_Color] = 7;
        EDQuark._map[STR4_Unit_Guid] = 8;
        EDQuark._names.push('Invalid');
        EDQuark._names.push(STR4_Unit_Page);
        EDQuark._names.push(STR4_Unit_Real);
        EDQuark._names.push(STR4_Unit_Int);
        EDQuark._names.push(STR4_Unit_Bool);
        EDQuark._names.push(STR4_Unit_Str);
        EDQuark._names.push(STR4_Unit_Point);
        EDQuark._names.push(STR4_Unit_Color);
        EDQuark._names.push(STR4_Unit_Guid);
        EDQuark._init = true;
    };
    EDQuark._init = false;
    EDQuark._map = new Object();
    EDQuark._names = [];
    return EDQuark;
}());
var EDXmlHelper = /** @class */ (function () {
    function EDXmlHelper() {
    }
    EDXmlHelper.simNodeNum = function (node, name, value) {
        var subNode = node.ownerDocument.createElement(name);
        subNode.setAttribute('V', value.toString());
        node.appendChild(subNode);
    };
    EDXmlHelper.simNodeStr = function (node, name, value) {
        var subNode = node.ownerDocument.createElement(name);
        subNode.setAttribute('V', value);
        node.appendChild(subNode);
    };
    EDXmlHelper.simNodeBool = function (node, name, value) {
        var subNode = node.ownerDocument.createElement(name);
        subNode.setAttribute('V', value ? 'TRUE' : 'FALSE');
        node.appendChild(subNode);
    };
    return EDXmlHelper;
}());
var EDMap = /** @class */ (function () {
    function EDMap() {
        this._data = new Object();
    }
    EDMap.prototype.get = function (key) {
        return this._data[key.toString()];
    };
    EDMap.prototype.set = function (key, value) {
        var kstr = key.toString();
        kstr = kstr.trim();
        if (kstr == "")
            return;
        this._data[key.toString()] = value;
    };
    EDMap.prototype.clear = function () {
        this._data = new Object();
    };
    EDMap.prototype.remove = function (key) {
        if (key.toString() in this._data)
            delete this._data[key];
    };
    EDMap.prototype.size = function () {
        var num = 0;
        for (var key in this._data)
            ++num;
        return num;
    };
    EDMap.prototype.isEmpty = function () {
        for (var key in this._data)
            return false;
        return true;
    };
    EDMap.prototype.keys = function () {
        var keys = [];
        for (var key in this._data)
            keys.push(key);
        return keys;
    };
    EDMap.prototype.values = function () {
        var values = [];
        for (var key in this._data)
            values.push(this._data[key]);
        return values;
    };
    EDMap.prototype.contains = function (key) {
        for (var keyl in this._data) {
            if (keyl === key)
                return true;
        }
        return false;
    };
    return EDMap;
}());
var EDPair = /** @class */ (function () {
    function EDPair(f, s) {
        if (f instanceof EDPair && s === undefined) {
            this._first = f.clone().first;
            this._second = f.clone().second;
        }
        else {
            this._first = f;
            this._second = s;
        }
    }
    Object.defineProperty(EDPair.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (f) {
            this._first = f;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EDPair.prototype, "second", {
        get: function () {
            return this._second;
        },
        set: function (s) {
            this._second = s;
        },
        enumerable: true,
        configurable: true
    });
    EDPair.prototype.clone = function () {
        return new EDPair(this.first, this.second);
    };
    EDPair.prototype.swap = function (other) {
        var f = this.first;
        var s = this.second;
        this.first = other.first;
        this.second = other.second;
        other.first = f;
        other.second = s;
    };
    EDPair.prototype.assign = function (other) {
        this.first = other._first;
        this.second = other._second;
    };
    return EDPair;
}());
Array.prototype.insert = function (i, e) {
    i >= -1 && this.splice(i, 0, e);
};
Array.prototype.remove = function (e) {
    var i = this.indexOf(e);
    if (i >= -1)
        this.splice(i, 1);
};
Array.prototype.removeAt = function (i) {
    if (i >= -1)
        this.splice(i, 1);
};
Array.prototype.contains = function (e) {
    return this.indexOf(e) != -1;
};
Array.prototype.first = function () {
    return this.length > 0 && this[0] || null;
};
Array.prototype.last = function () {
    return this.length > 0 && this[this.length - 1] || null;
};
Array.prototype.clear = function () {
    this.length = 0;
};
Array.prototype.move = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
};
Element.prototype.clearChilds = function () {
    while (this.lastChild) {
        this.lastChild = null;
        this.removeChild(this.lastChild);
    }
};
function adpatBrowser(event) {
    var pt = new egPoint;
    var ua = window.navigator.userAgent;
    if (ua.indexOf('Edge') > -1) {
        // let container = document.getElementsByClassName('viewport-container')[0];
        // let top = document.getElementsByClassName('app-top')[0].clientHeight;
        // let scrollLeft = container.scrollLeft;
        // // let scrollTop = container.scrollTop;
        // x = event.pageX + scrollLeft;
        // y = event.pageY + scrollTop;
    }
    else if (window.hasOwnProperty('chrome')) {
        pt.x = event.offsetX;
        pt.y = event.offsetY;
    }
    else if (ua.indexOf('Firefox') > -1) {
        pt.x = event.layerX;
        pt.y = event.layerY;
    }
    else {
        pt.x = event.offsetX;
        pt.y = event.offsetY;
    }
    return pt;
}
//# sourceMappingURL=basic.js.map