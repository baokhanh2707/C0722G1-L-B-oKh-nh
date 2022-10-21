// 继承自EDMmlNode的节点
// 这些类与布局相关，子节点数目需要严格准守MathML文档准则
// 常用修改说明：
// 可以通过改写layoutSymbo函数实现子节点的布局
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDMmlSubsupBaseNode = /** @class */ (function (_super) {
        __extends(EDMmlSubsupBaseNode, _super);
        function EDMmlSubsupBaseNode(type, document, attribute_map) {
            return _super.call(this, type, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlSubsupBaseNode.prototype, "base", {
            /**
             * @brief base 获取基值节点，标准格式下为<sub><sup>的第一个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第一个子节点
                if (this.firstChild == null) {
                    // console.log(`error: EDMmlSubsupBaseNode.base is null.`);
                    return null;
                }
                return this.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlSubsupBaseNode.prototype, "sscript", {
            /**
             * @brief sscript 获取脚本值节点，标准格式下为<sub><sup>的第二个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第二个子节点
                if (this.base.nextSibling == null) {
                    // console.log(`error: EDMmlSubsupBaseNode.sscript is null.`);
                    return null;
                }
                return this.base.nextSibling;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 脚本值节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlSubsupBaseNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            var base = this.base;
            if (base == null) {
                // console.log(`error: EDMmlSubsupBaseNode base == null.`);
                return;
            }
            var s = this.sscript;
            if (s == null) {
                // console.log(`error: EDMmlSubsupBaseNode s == null.`);
                return;
            }
            // 遍历子返回子节点的脚本等级
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && child === s) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        return EDMmlSubsupBaseNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlSubsupBaseNode = EDMmlSubsupBaseNode;
    var EDMmlMsupNode = /** @class */ (function (_super) {
        __extends(EDMmlMsupNode, _super);
        /*例子
        <msup>
          <mi>X</mi>
          <mn>2</mn>
        </msup>
        */
        function EDMmlMsupNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MsupNode, document, attribute_map) || this;
        }
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlMsupNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            str[0] = str[0] + "(";
            var base = this.base;
            base.appendEduStr(str, edudata);
            str[0] = str[0] + ")^(";
            var sscript = this.sscript;
            if (sscript != null) {
                sscript.appendEduStr(str, edudata);
                str[0] = str[0] + ")";
            }
            else {
                str[0] = str[0] + "1)";
            }
        };
        /**
         * @brief layoutSymbol 布局符号，对基值节点、脚本值节点进行设置相对原点坐标
         */
        EDMmlMsupNode.prototype.layoutSymbol = function () {
            var b = this.base;
            var s = this.sscript;
            var ispre = false;
            if (b.firstChild.nodeType == EDMathMlNodeType.MtextNode) {
                if (b.firstChild.firstChild.toTextNode().text == "" && !b.firstChild.nextSibling) {
                    if (this.previousSibling) {
                        ispre = true;
                    }
                }
            }
            // 设置sup节点的布局位置
            b.relOrigin = new egPoint(-b.myRect.width, 0.0);
            if (!ispre) {
                s.relOrigin = new egPoint(this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]), b.myRect.top()
                    + EdrawMathDate.EDStatic.g_sup_shift_multiplier * s.myRect.height * 0.5);
            }
            else {
                s.relOrigin = new egPoint(this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]), this.previousSibling.myRect.top()
                    + EdrawMathDate.EDStatic.g_sub_shift_multiplier * s.myRect.height * 0.5);
            }
        };
        return EDMmlMsupNode;
    }(EDMmlSubsupBaseNode));
    EdrawMathDate.EDMmlMsupNode = EDMmlMsupNode;
    var EDMmlMsubNode = /** @class */ (function (_super) {
        __extends(EDMmlMsubNode, _super);
        /*例子
        <msub>
            <mi>X</mi>
            <mn>1</mn>
        </msub>
        */
        function EDMmlMsubNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MsubNode, document, attribute_map) || this;
        }
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlMsubNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            var islog = false;
            var tmpstr = str[0];
            var base = this.base;
            base.appendEduStr(str, edudata);
            tmpstr = str[0].replace(tmpstr, '');
            //console.log(`EDMmlMsubNode tmpstr = ${tmpstr}`)
            if (tmpstr === "(log)") {
                islog = true;
                str[0] = str[0].replace("(log)", '');
                //console.log(str[0]);
            }
            tmpstr = str[0];
            var sscript = this.sscript;
            if (sscript != null) {
                sscript.appendEduStr(str, edudata);
                //console.log(str[0]);
                if (islog) {
                    tmpstr = str[0].replace(tmpstr, '');
                    var num = tmpstr;
                    str[0] = str[0].replace(tmpstr, '');
                    //console.log(str[0]);
                    var result = math.simplify(math.parse(num)).toString();
                    try {
                        var mathresult = math.eval(result).toString().toFloat();
                        if (!isNaN(mathresult) && edudata != null) {
                            //str[0] = str[0] + `log${result}`;
                            edudata.lognum.push(mathresult);
                            str[0] = str[0] + "log".concat(result);
                            //console.log(str[0]);
                        }
                    }
                    catch (exception) {
                        //console.log(exception);
                    }
                }
            }
        };
        /**
         * @brief layoutSymbol 布局符号，对基值节点、脚本值节点进行设置相对原点坐标
         */
        EDMmlMsubNode.prototype.layoutSymbol = function () {
            var b = this.base;
            var s = this.sscript;
            var ispre = false;
            if (b.firstChild.nodeType == EDMathMlNodeType.MtextNode) {
                if (b.firstChild.firstChild.toTextNode().text == "" && !b.firstChild.nextSibling) {
                    if (this.previousSibling) {
                        ispre = true;
                    }
                }
            }
            // 设置sub节点的布局位置
            b.relOrigin = new egPoint(-b.myRect.width, 0.0);
            if (!ispre) {
                s.relOrigin = new egPoint(this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]), b.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * s.myRect.height * 0.5);
            }
            else {
                s.relOrigin = new egPoint(this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]), this.previousSibling.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * s.myRect.height * 0.5);
            }
        };
        return EDMmlMsubNode;
    }(EDMmlSubsupBaseNode));
    EdrawMathDate.EDMmlMsubNode = EDMmlMsubNode;
    var EDMmlMsubsupNode = /** @class */ (function (_super) {
        __extends(EDMmlMsubsupNode, _super);
        /*例子
        <msubsup>
            <mo> &#x222B;<!--Integral定积分 --> </mo>
            <mn> 0 </mn>
            <mn> 1 </mn>
        </msubsup>
        */
        function EDMmlMsubsupNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MsubsupNode, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlMsubsupNode.prototype, "base", {
            /**
             * @brief base 获取基值节点，标准格式下为<subsup>的第一个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第一个子节点
                if (this.firstChild == null) {
                    // console.log(`error: EDMmlMsubsupNode.base is null.`);
                    return null;
                }
                return this.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMsubsupNode.prototype, "superscript", {
            /**
             * @brief superscript 获取上标值节点，标准格式下为<subsup>的第二个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第二个子节点
                if (this.base.nextSibling == null) {
                    // console.log(`error: EDMmlMsubsupNode.superscript is null.`);
                    return null;
                }
                return this.base.nextSibling;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMsubsupNode.prototype, "subscript", {
            /**
             * @brief subscript 获取下标值节点，标准格式下为<subsup>的第三个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第三个子节点
                if (this.superscript.nextSibling == null) {
                    // console.log(`error: EDMmlMsubsupNode.subscript is null.`);
                    return null;
                }
                return this.superscript.nextSibling;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 上标值节点、下标值节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMsubsupNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            // 遍历子返回子节点的脚本等级
            var sl = _super.prototype.scriptlevel.call(this);
            var base = this.base;
            if (base == null) {
                // console.log(`error: EDMmlSubsupBaseNode base == null.`);
                return;
            }
            var sub = this.subscript;
            if (sub == null) {
                // console.log(`error: EDMmlMsubsupNode sub == null.`);
                return;
            }
            var sup = this.superscript;
            if (sup == null) {
                // console.log(`error: EDMmlMsubsupNode sup == null.`);
                return;
            }
            if (child != null && (child === sup || child === sub)) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief layoutSymbol 布局符号，对基值节点、上标值节点、下标值节点进行设置相对原点坐标
         */
        EDMmlMsubsupNode.prototype.layoutSymbol = function () {
            var b = this.base;
            var sub = this.subscript;
            var sup = this.superscript;
            b.relOrigin = new egPoint(-b.myRect.width, 0.0);
            var sub_rect = sub.myRect;
            var sup_rect = sup.myRect;
            var subsup_spacing = this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]);
            var ispre = false;
            if (b.firstChild.nodeType == EDMathMlNodeType.MtextNode) {
                if (b.firstChild.firstChild.toTextNode().text == "" && !b.firstChild.nextSibling) {
                    if (this.previousSibling) {
                        ispre = true;
                    }
                }
            }
            // qreal shift = 0.0;
            // sub_rect.x = 0;
            // sub_rect.y = EDStatic.g_sub_shift_multiplier * sub.myRect.height*0.5;
            // sup_rect.x = 0;
            // sup_rect.y = -EDStatic.g_sup_shift_multiplier * sup.myRect.height*0.5;
            // qreal subsup_diff = sub_rect.top() - sup_rect.bottom();
            // if ( subsup_diff < subsup_spacing )
            //    shift = 0.5 * ( subsup_spacing - subsup_diff );
            // 设置subsup节点的布局位置
            // sub->setRelOrigin( QPointF( subsup_spacing, cmr.center().y() + shift + ymove ) );
            // sup->setRelOrigin( QPointF( subsup_spacing, cmr.center().y() - shift + ymove ) );
            if (!ispre) {
                sub.relOrigin = new egPoint(subsup_spacing, b.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * sub.myRect.height * 0.5);
                sup.relOrigin = new egPoint(subsup_spacing, b.myRect.top()
                    + EdrawMathDate.EDStatic.g_sup_shift_multiplier * sup.myRect.height * 0.5);
            }
            else {
                sub.relOrigin = new egPoint(subsup_spacing, this.previousSibling.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * sub.myRect.height * 0.5);
                sup.relOrigin = new egPoint(subsup_spacing, this.previousSibling.myRect.top()
                    + EdrawMathDate.EDStatic.g_sup_shift_multiplier * sup.myRect.height * 0.5);
            }
        };
        return EDMmlMsubsupNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMsubsupNode = EDMmlMsubsupNode;
    var EDMmlMencloseNode = /** @class */ (function (_super) {
        __extends(EDMmlMencloseNode, _super);
        function EDMmlMencloseNode(document, attribute_map) {
            var _this = _super.call(this, EDMathMlNodeType.MencloseNode, document, attribute_map) || this;
            if (attribute_map.has('notation')) {
                _this._strSymbol = attribute_map.get('notation');
            }
            else {
                _this._strSymbol = 'longdiv';
            }
            return _this;
        }
        /**
         * @brief layoutSymbol 布局符号，对根号内节点、索引值点进行设置相对原点坐标
         */
        EDMmlMencloseNode.prototype.layoutSymbol = function () {
            _super.prototype.layoutSymbol.call(this);
        };
        /**
         * @brief symbolRect 获取符号矩形，在原绘制矩形的基础上左边+lspace，右边加rspace
         * @return 返回结果值，输出为QRectF
         */
        EDMmlMencloseNode.prototype.symbolRect = function () {
            var child = this.firstChild;
            var rectf = child.deviceRect;
            for (; child != null; child = child.nextSibling) {
                rectf.united(child.deviceRect);
            }
            rectf.x = 0;
            rectf.y = -rectf.height * 0.5;
            // if (_strSymbol.contains("box")) {
            //    QRectF box = QRectF(0, -rectf.height()*0.5, rectf.width(), rectf.height());
            //    rectf |= box;
            // }
            if (this._ctx.font !== this.font.fontstring()) {
                this._ctx.font = this.font.fontstring();
            }
            if (this._strSymbol.match('longdiv') != null) {
                var text = new egRect(0, 0, this._ctx.measureText(')').width * 0.5, this.font.pixelSize);
                var longdiv = new egRect(-text.width, -rectf.height * 0.5, rectf.width + text.width * 0.5, rectf.height);
                rectf.united(longdiv);
            }
            if (this._strSymbol.match('radical') != null) {
                var text = new egRect(0, 0, this._ctx.measureText('√').width, this.font.pixelSize);
                var radical = new egRect(-text.width, -rectf.height * 0.5, rectf.width + text.width, rectf.height);
                rectf.united(radical);
            }
            if (this._strSymbol.match('circle') != null) {
                rectf.united(new egRect(-rectf.width * 0.25, -rectf.height * 0.5 - rectf.height * 0.125, rectf.width * 1.5, rectf.height * 1.25));
            }
            if (this._strSymbol.match('updiagonalarrow') != null) {
                var text = new egRect(0, 0, this._ctx.measureText(')').width, this.font.pixelSize);
                var updiagonalarrow = new egRect(0, -rectf.height * 0.5, rectf.width, rectf.height);
                rectf.united(updiagonalarrow);
            }
            if (this._strSymbol.match('phasorangle') != null) {
                var text = new egRect(0, 0, this._ctx.measureText('∠').width, this.font.pixelSize);
                var phasorangle = new egRect(-text.width, -rectf.height * 0.5, rectf.width + text.width, rectf.height);
                rectf.united(phasorangle);
            }
            return rectf;
        };
        /**
         * @brief paintSymbol 绘图符号，绘制分数线
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlMencloseNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            _super.prototype.paintSymbol.call(this, painter, x_scaling, y_scaling, outputPng);
            painter.save();
            // painter->setRenderHint( QPainter::Antialiasing, true );//抗锯齿
            //    QPointF d_pos = devicePoint( QPointF() );//获取当前字符的坐标位置
            //    QPointF s_pos = symbolRect().topLeft();//计算当前字符绘制矩形的坐标位置
            var dr = this.deviceRect;
            var lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier > 1 ? this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier : 1;
            if (painter.lineWidth !== lineWidth) {
                painter.lineWidth = lineWidth;
            }
            if (painter.strokeStyle !== 'rgb(0, 0, 0)') {
                // painter.strokeStyle = 'rgb(0, 0, 0)';
            }
            if (painter.lineJoin !== "bevel") {
                painter.lineJoin = "bevel";
            }
            if (this._ctx.font !== this.font.fontstring()) {
                this._ctx.font = this.font.fontstring();
            }
            if (this._strSymbol.match('longdiv') != null) {
                var text = new egRect(0, 0, this._ctx.measureText(')').width, this.font.pixelSize);
                /*
                painter->drawArc(dr.left()-text.width()*0.25, dr.top(), text.width(), dr.height(), -90*16, 180*16);
                painter->drawLine(QPointF(dr.left()+text.width()*0.25, dr.top()), dr.topRight());
                */
                painter.beginPath();
                painter.moveTo(dr.left(), dr.bottom());
                painter.quadraticCurveTo(dr.left() + text.width, dr.center().y, dr.left(), dr.top());
                painter.lineTo(dr.right(), dr.top());
                // painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('actuarial') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top());
                painter.lineTo(dr.right(), dr.top());
                painter.lineTo(dr.right(), dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('radical') != null) {
                painter.restore();
                painter.save();
                var text = new egRect(0, 0, this._ctx.measureText('√').width, this.font.pixelSize);
                if (painter.font !== this.font.fontstring()) {
                    painter.font = this.font.fontstring();
                }
                // painter.translate(dr.left(),dr.top()-dr.height*text.y/text.height);
                /* 拉伸
                QPainterPath myPath;
                myPath.addText(QPoint(0, 0), font(), "√");
                int size = myPath.elementCount();
                qreal max_x=0;
                qreal min_x=999;
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x > max_x)
                        max_x = myPath.elementAt(i).x;
                    if (myPath.elementAt(i).x < min_x)
                        min_x = myPath.elementAt(i).x;
                }
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x == max_x)
                        myPath.setElementPositionAt(i, dr.right(), myPath.elementAt(i).y*dr.height()*1.0/text.height());
                    else
                        myPath.setElementPositionAt(i, myPath.elementAt(i).x, myPath.elementAt(i).y*dr.height()*1.0/text.height());
                }
                myPath.setFillRule(Qt::WindingFill);
                painter->drawPath(myPath);*/
                painter.restore();
                painter.save();
            }
            //strSymbol的具体数值和图形，请查阅https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose
            if (this._strSymbol.match('roundedbox') != null) {
                var text = new egRect(0, 0, this._ctx.measureText('1').width, this.font.pixelSize);
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top() + text.width * 0.5);
                painter.lineTo(dr.left(), dr.bottom() - text.width * 0.5);
                painter.arc(dr.left(), dr.bottom(), dr.left() + text.width * 0.5, dr.bottom(), text.width * 0.5);
                painter.lineTo(dr.right() - text.width * 0.5, dr.bottom());
                painter.arc(dr.right(), dr.bottom(), dr.right(), dr.bottom() - text.width * 0.5, text.width * 0.5);
                painter.lineTo(dr.right(), dr.top() + text.width * 0.5);
                painter.arc(dr.right(), dr.top(), dr.right() - text.width * 0.5, dr.top(), text.width * 0.5);
                painter.lineTo(dr.left() - text.width * 0.5, dr.top());
                painter.arc(dr.left(), dr.top(), dr.left(), dr.top() - text.width * 0.5, text.width * 0.5);
                painter.closePath();
                painter.stroke();
            }
            else if (this._strSymbol.match('box') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top());
                painter.lineTo(dr.left(), dr.bottom());
                painter.lineTo(dr.right(), dr.bottom());
                painter.lineTo(dr.right(), dr.top());
                painter.lineTo(dr.left(), dr.top());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('circle') != null) {
                painter.restore();
                painter.save();
                var a = dr.width * 0.5;
                var b = dr.height * 0.5;
                var r = (a > b) ? a : b;
                var ratioX = a * 1.0 / r;
                var ratioY = b * 1.0 / r;
                painter.translate(dr.left(), dr.top());
                painter.scale(ratioX, ratioY);
                painter.beginPath();
                painter.arc(a / ratioX, b / ratioY, r, 0, 2 * Math.PI, false);
                painter.closePath();
                painter.stroke();
                painter.restore();
                /*
                painter->drawArc(dr.left(), dr.top(), dr.width(), dr.height(), 0*16, -360*16);
                */
            }
            if (this._strSymbol.match('left') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top());
                painter.lineTo(dr.left(), dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('right') != null) {
                painter.beginPath();
                painter.moveTo(dr.right(), dr.top());
                painter.lineTo(dr.right(), dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('top') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top());
                painter.lineTo(dr.right(), dr.top());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('bottom') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.bottom());
                painter.lineTo(dr.right(), dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('updiagonalstrike') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.bottom());
                painter.lineTo(dr.right(), dr.top());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('downdiagonalstrike') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.top());
                painter.lineTo(dr.right(), dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('verticalstrike') != null) {
                painter.beginPath();
                painter.moveTo(dr.center().x, dr.top());
                painter.lineTo(dr.center().x, dr.bottom());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('horizontalstrike') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.center().y);
                painter.lineTo(dr.right(), dr.center().y);
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('madruwb') != null) {
                painter.beginPath();
                painter.moveTo(dr.left(), dr.bottom());
                painter.lineTo(dr.right(), dr.bottom());
                painter.lineTo(dr.right(), dr.top());
                painter.closePath();
                painter.stroke();
            }
            if (this._strSymbol.match('updiagonalarrow') != null) {
                painter.restore();
                painter.save();
                painter.translate(dr.left(), dr.bottom());
                var text = new egRect(0, 0, this._ctx.measureText('⟶').width, this.font.pixelSize);
                var angle = -Math.atan(dr.height / dr.width);
                painter.rotate(angle);
                if (painter.font !== this.font.fontstring()) {
                    painter.font = this.font.fontstring();
                }
                if (dr.width > dr.height) {
                    painter.scale(dr.width * 1.0 / text.width, dr.height * 1.0 / text.height);
                }
                else {
                    painter.scale(dr.height * 1.0 / text.width, dr.width * 1.0 / text.height);
                }
                if (painter.textBaseline !== 'middle') {
                    painter.textBaseline = 'middle';
                }
                painter.fillText('⟶', 0, 0);
                // console.log(`angle =${angle}, scale: ${dr.width}/${text.width},${dr.height}/${text.height}`);
                /*拉伸
                QRectF text = metrics.boundingRect( "⟶" );
                painter->setFont( font() );
                QPointF baseline(dr.left(),dr.top()-dr.height()*text.y()/text.height());
                painter->translate(dr.center().x(), dr.center().y());
                //painter->translate(baseline);
                qreal angle = -180*atan(dr.height()/dr.width())/3.1415926;
                painter->rotate(angle);
                //painter->scale(dr.width()*1.0/text.width(), dr.height()*1.0/text.height());
                //painter->drawText(QPoint(0, 0), "↗");

                QBrush brush = painter->brush();
                brush.setColor( painter->pen().color() );
                brush.setStyle( Qt::SolidPattern );
                painter->setBrush(brush);
                QPen myPen;
                myPen.setStyle(Qt::NoPen);
                painter->setPen(myPen);

                painter->setRenderHint( QPainter::Antialiasing, true );//抗锯齿

                QPainterPath myPath;
                myPath.addText(QPoint(baseline.x()-dr.center().x(), baseline.y()-dr.center().y()), font(), "⟶");
                //myPath.addText(QPoint(0, 0), font(), "⟶");
                int size = myPath.elementCount();
                qreal max_x=myPath.elementAt(0).x;
                qreal min_x=myPath.elementAt(0).x;
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x > max_x)
                        max_x = myPath.elementAt(i).x;
                    if (myPath.elementAt(i).x < min_x)
                        min_x = myPath.elementAt(i).x;
                }
                qreal mid_x = (max_x+min_x)*0.5;
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x > mid_x) {
                       //myPath.setElementPositionAt(i, myPath.elementAt(i).x*dr.width()*1.0/text.width(),
                       //                            myPath.elementAt(i).y*dr.height()*1.0/text.height());
                       myPath.setElementPositionAt(i, myPath.elementAt(i).x+dr.width()-text.width(),
                                                   myPath.elementAt(i).y);
                    }
                }
                myPath.setFillRule(Qt::WindingFill);
                painter->drawPath(myPath);*/
                painter.restore();
                painter.save();
            }
            if (this._strSymbol.match('phasorangle') != null) {
                painter.restore();
                painter.save();
                painter.translate(dr.left(), dr.center().y);
                var text = new egRect(0, 0, this._ctx.measureText('∠').width, this.font.pixelSize);
                if (painter.font !== this.font.fontstring()) {
                    painter.font = this.font.fontstring();
                }
                painter.scale(1, dr.height * 1.0 / text.height);
                if (painter.textBaseline !== 'middle') {
                    painter.textBaseline = 'middle';
                }
                painter.fillText('∠', 0, 0);
                /*拉伸
                QRectF text = metrics.boundingRect( "∠" );
                painter->setFont( font() );
                //QPointF baseline(dr.left(),dr.top()-dr.height()*text.y()/text.height());
                QPointF baseline(dr.left(), dr.bottom());
                painter->translate(baseline);

                QBrush brush = painter->brush();
                brush.setColor( painter->pen().color() );
                brush.setStyle( Qt::SolidPattern );
                painter->setBrush(brush);
                QPen myPen;
                myPen.setStyle(Qt::NoPen);
                painter->setPen(myPen);

                painter->setRenderHint( QPainter::Antialiasing, true );

                QPainterPath myPath;
                myPath.addText(QPoint(0, 0), font(), "∠");
                int size = myPath.elementCount();
                qreal max_x=0;
                qreal max_y=0;
                qreal min_x=999;
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x > max_x)
                        max_x = myPath.elementAt(i).x;
                    if (myPath.elementAt(i).x < min_x)
                        min_x = myPath.elementAt(i).x;
                    if (myPath.elementAt(i).y > max_y)
                        max_y = myPath.elementAt(i).y;
                }
                for ( int i = 0; i < size; ++i ) {
                    if (myPath.elementAt(i).x == max_x)
                        myPath.setElementPositionAt(i, dr.right(), myPath.elementAt(i).y*dr.height()*1.0/text.height());
                    else
                        myPath.setElementPositionAt(i, myPath.elementAt(i).x, myPath.elementAt(i).y*dr.height()*1.0/text.height());
                }
                myPath.setFillRule(Qt::WindingFill);
                painter->drawPath(myPath);*/
                painter.restore();
                painter.save();
            }
            painter.restore();
        };
        return EDMmlMencloseNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMencloseNode = EDMmlMencloseNode;
    var EDMmlTableBaseNode = /** @class */ (function (_super) {
        __extends(EDMmlTableBaseNode, _super);
        function EDMmlTableBaseNode(type, document, attribute_map) {
            return _super.call(this, type, document, attribute_map) || this;
        }
        return EDMmlTableBaseNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlTableBaseNode = EDMmlTableBaseNode;
    var EDMmlMtableNode = /** @class */ (function (_super) {
        __extends(EDMmlMtableNode, _super);
        function EDMmlMtableNode(document, attribute_map) {
            var _this = _super.call(this, EDMathMlNodeType.MtableNode, document, attribute_map) || this;
            _this._cell_size_data = new EdrawMathDate.CellSizeData();
            _this._content_width = 0;
            _this._content_height = 0;
            return _this;
        }
        Object.defineProperty(EDMmlMtableNode.prototype, "frame", {
            /*例子
            <mtable frame="solid" rowlines="solid" align="axis 3">
                <mtr>
                    <mtd><mi>A</mi></mtd>
                    <mtd><mi>B</mi></mtd>
                </mtr>
                <mtr>
                    <mtd><mi>C</mi></mtd>
                    <mtd><mi>D</mi></mtd>
                </mtr>
                <mtr>
                    <mtd><mi>E</mi></mtd>
                    <mtd><mi>F</mi></mtd>
                </mtr>
            </mtable>
            */
            /**
             * @brief frame 获取框架类型，在属性图中匹配"frame"
             * @return 返回结果值，输出为FrameType
             */
            get: function () {
                var value = this.explicitAttribute('frame', 'none');
                return EdrawMathDate.EDStatic.mmlInterpretFrameType(value, 0, [false]);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief rowspacing 获取行间距，在属性图中匹配"rowspacing"
         * @return 返回结果值
         */
        EDMmlMtableNode.prototype.rowspacing = function () {
            var value = this.explicitAttribute('rowspacing');
            if (value == null) {
                return this.ex * 0.5;
            }
            var ok = [false];
            var spacing = this.interpretSpacing(value, ok);
            if (ok[0]) {
                return spacing;
            }
            else {
                return this.ex;
            }
        }; /**
         * @brief columnspacing 获取列间距，在属性图中匹配"columnspacing"
         * @return 返回结果值
         */
        EDMmlMtableNode.prototype.columnspacing = function () {
            var value = this.explicitAttribute('columnspacing');
            if (value == null) {
                // return 0.5 * this.em;
                return this.ex * 1.0;
            }
            var ok = [false];
            var spacing = this.interpretSpacing(value, ok);
            if (ok[0]) {
                return spacing;
            }
            else {
                return this.em;
            }
        }; /**
         * @brief framespacing_hor 获取水平框架间距，在属性图中匹配"framespacing"
         * @return 返回结果值
         */
        EDMmlMtableNode.prototype.framespacing_hor = function () {
            if (this.frame === FrameType.FrameNone) {
                return 0.0 * this.em; // 修改 0.2改0.0
            }
            var value = this.explicitAttribute('framespacing', '0.25em 0.25ex');
            var ok = [false];
            var fs = EdrawMathDate.EDStatic.mmlInterpretFrameSpacing(value, this.em, this.ex, ok, this.baseFontPixelSize);
            if (ok[0]) {
                return fs.hor;
            }
            else {
                return 0.125 * this.em;
            }
        };
        /**
         * @brief framespacing_ver 获取垂直框架间距，在属性图中匹配"framespacing"
         * @return 返回结果值
         */
        EDMmlMtableNode.prototype.framespacing_ver = function () {
            if (this.frame === FrameType.FrameNone) {
                return 0.0 * this.em; // 修改 0.2改0.0
            }
            var value = this.explicitAttribute('framespacing', '0.25em 0.25ex');
            var ok = [false];
            var fs = EdrawMathDate.EDStatic.mmlInterpretFrameSpacing(value, this.em, this.ex, ok, this.baseFontPixelSize);
            if (ok[0]) {
                return fs.ver;
            }
            else {
                return 0.125 * this.ex;
            }
        };
        /**
         * @brief columnlines 获取列直线，在属性图中匹配"columnlines"
         * @return 返回结果值，输出为FrameType
         */
        EDMmlMtableNode.prototype.columnlines = function (idx) {
            var value = this.explicitAttribute('columnlines', 'none');
            return EdrawMathDate.EDStatic.mmlInterpretFrameType(value, idx, [false]);
        };
        /**
         * @brief rowlines 获取行直线，在属性图中匹配"rowlines"
         * @return 返回结果值，输出为FrameType
         */
        EDMmlMtableNode.prototype.rowlines = function (idx) {
            var value = this.explicitAttribute('rowlines', 'none');
            return EdrawMathDate.EDStatic.mmlInterpretFrameType(value, idx, [false]);
        };
        /**
         * @brief axisalign 获取轴对齐数，在属性图中匹配"align = axis"
         * @return 返回结果值，输出为int
         */
        EDMmlMtableNode.prototype.axisalign = function () {
            var val = this.explicitAttribute('align');
            var axis = -1;
            if (val == null) {
                return -1;
            }
            if (val.match('axis ') != null) {
                axis = val.slice(5).toInt();
            }
            return axis;
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         */
        EDMmlMtableNode.prototype.layoutSymbol = function () {
            // Obtain natural widths of columns//获得列的自然宽度
            this._cell_size_data.init(this.firstChild); // 获取每列的宽度，每行的高度
            // 在属性图中匹配属性值
            var col_spc = this.columnspacing();
            var row_spc = this.rowspacing();
            var frame_spc_hor = this.framespacing_hor();
            var columnwidth_attr = this.explicitAttribute('columnwidth', 'auto');
            // Is table width set by user? If so, set col_width_sum and never ever change it.
            // 是否由用户设置表格宽度？ 如果是这样，请设置col_width_sum并永远不要更改它。
            var col_width_sum = this._cell_size_data.colWidthSum();
            var width_set_by_user = false;
            var width_str = this.explicitAttribute('width', 'auto');
            if (width_str !== 'auto') {
                var ok = [false];
                var w = this.interpretSpacing(width_str, ok);
                if (ok[0]) {
                    col_width_sum = w
                        - col_spc * (this._cell_size_data.numCols() - 1)
                        - frame_spc_hor * 2.0;
                    width_set_by_user = true;
                }
            }
            // Find out what kind of columns we are dealing with and set the widths of                  //找出我们正在处理什么样的列并设置宽度
            // statically sized columns.                                                                //静态大小的列。
            var fixed_width_sum = 0.0; // sum of widths of statically sized set columns      //静态大小设置列的宽度总和
            var auto_width_sum = 0.0; // sum of natural widths of auto sized columns        //自动大小列的自然宽度的总和
            var relative_width_sum = 0.0; // sum of natural widths of relatively sized columns  //相对大小的列的自然宽度的总和
            var relative_fraction_sum = 0.0; // total fraction of width taken by relatively        //总宽度所占的比例相对较小
            // sized columns    //大小的列
            for (var i = 0; i < this._cell_size_data.numCols(); ++i) {
                var value = EdrawMathDate.EDStatic.mmlInterpretListAttr(columnwidth_attr, i, 'auto');
                // Is it an auto sized column?  //它是一个自动大小的列？
                if (value === 'auto' || value === 'fit') {
                    auto_width_sum += this._cell_size_data.col_widths[i];
                    continue;
                }
                // Is it a statically sized column? //是一个静态大小的列？
                var ok = [false];
                var w = this.interpretSpacing(value, ok);
                if (ok[0]) {
                    // Yup, sets its width to the user specified value // Yup，将其宽度设置为用户指定的值
                    this._cell_size_data.col_widths[i] = w;
                    fixed_width_sum += w;
                    continue;
                }
                // Is it a relatively sized column? //是一个相对大小的列吗？
                if (value.endsWith('%')) {
                    value = value.slice(0, value.length - 1);
                    var factor = value.toFloat();
                    if (ok[0] && factor > 0.0) {
                        factor *= 0.01;
                        relative_width_sum += this._cell_size_data.col_widths[i];
                        relative_fraction_sum += factor;
                        if (!width_set_by_user) {
                            // If the table width was not set by the user, we are free to increase //如果表格宽度不是由用户设置的，我们可以自由增加它，
                            // it so that the width of this column will be >= than its natural width//这样该列的宽度将大于其自然宽度
                            var min_col_width_sum = this._cell_size_data.col_widths[i] / factor;
                            if (min_col_width_sum > col_width_sum) {
                                col_width_sum = min_col_width_sum;
                            }
                        }
                        continue;
                    }
                    else {
                        console.log("EDMmlMtableNode::layoutSymbol(): could not parse value ".concat(value, " << %%"));
                    }
                }
                // Relatively sized column, but we failed to parse the factor. //相对大小的列，但我们未能解析因子。对待就像一个自动列。
                // Treat is like an autocolumn.
                auto_width_sum += this._cell_size_data.col_widths[i];
            }
            // Work out how much space remains for the auto olumns, after allocating//在分配静态大小和相对大小的列之后，计算出自动列的剩余空间。
            // the statically sized and the relatively sized columns.
            var required_auto_width_sum = col_width_sum
                - relative_fraction_sum * col_width_sum
                - fixed_width_sum;
            if (!width_set_by_user && required_auto_width_sum < auto_width_sum) {
                if (relative_fraction_sum < 1.0) {
                    col_width_sum = (fixed_width_sum + auto_width_sum) / (1.0 - relative_fraction_sum);
                }
                else {
                    col_width_sum = fixed_width_sum + auto_width_sum + relative_width_sum;
                }
                required_auto_width_sum = auto_width_sum;
            }
            // Ratio by which we have to shring/grow all auto sized columns to make it all fit//我们必须缩小/增大所有自动尺寸列以使其全部合适的比率
            var auto_width_scale = 1.0;
            if (auto_width_sum > 0.0) {
                auto_width_scale = required_auto_width_sum / auto_width_sum;
            }
            // Set correct sizes for the auto sized and the relatively sized columns.//为自动调整大小的列和相对大小的列设置正确的大小。
            for (var i = 0; i < this._cell_size_data.numCols(); ++i) {
                var value = EdrawMathDate.EDStatic.mmlInterpretListAttr(columnwidth_attr, i, 'auto');
                // Is it a relatively sized column?//是一个相对大小的列吗？
                if (value.endsWith('%')) {
                    var ok = [false];
                    var w = EdrawMathDate.EDStatic.mmlInterpretPercentSpacing(value, col_width_sum, ok);
                    if (ok[0]) {
                        this._cell_size_data.col_widths[i] = w;
                    }
                    else {
                        // We're treating parsing errors here as auto sized columns//我们将解析错误视为自动大小的列
                        this._cell_size_data.col_widths[i] = auto_width_scale * this._cell_size_data.col_widths[i];
                    }
                }
                else if (value === 'auto') { // Is it an auto sized column?//它是一个自动大小的列？
                    this._cell_size_data.col_widths[i] = auto_width_scale * this._cell_size_data.col_widths[i];
                }
            }
            this._content_width = this._cell_size_data.colWidthSum()
                + col_spc * (this._cell_size_data.numCols() - 1);
            this._content_height = this._cell_size_data.rowHeightSum()
                + row_spc * (this._cell_size_data.numRows() - 1);
            var bottom = -this._content_height * 0.5;
            // 修改矩阵行校准
            var axis = this.axisalign();
            var axis_spac = 0;
            if (axis <= this._cell_size_data.numRows() && axis > 0) {
                axis_spac = this._cell_size_data.row_heights[axis - 1] * 0.5;
                for (var i = axis; i < this._cell_size_data.numRows(); ++i) {
                    axis_spac = axis_spac + this._cell_size_data.row_heights[i];
                    axis_spac = axis_spac + row_spc;
                }
            }
            if (axis_spac !== 0) {
                bottom = -this._content_height + axis_spac;
            }
            var child = this.firstChild;
            for (; child != null; child = child.nextSibling) {
                if (child.nodeType !== EDMathMlNodeType.MtrNode) {
                    console.log("error: mtable child nodetype != EDMathMlNodeType.MtrNode");
                    return;
                }
                var row = child;
                row.layoutCells(this._cell_size_data.col_widths, col_spc);
                var rmr = row.myRect;
                row.relOrigin = new egPoint(0.0, bottom - rmr.top());
                bottom += rmr.height + row_spc;
            }
        };
        /**
         * @brief symbolRect 获取符号矩形, 总高+上下边框，总宽+左右边框
         * @return 返回结果值，输出为QRectF
         */
        EDMmlMtableNode.prototype.symbolRect = function () {
            var frame_spc_hor = this.framespacing_hor();
            var frame_spc_ver = this.framespacing_ver();
            var axis = this.axisalign();
            var axis_spac = 0;
            if (axis <= this._cell_size_data.numRows() && axis > 0) {
                axis_spac = this._cell_size_data.row_heights[axis - 1] * 0.5;
                for (var i = axis; i < this._cell_size_data.numRows(); ++i) {
                    axis_spac = axis_spac + this._cell_size_data.row_heights[i];
                    axis_spac = axis_spac + this.rowspacing();
                }
            }
            var y = (-this._content_height - 2.0 * frame_spc_ver) * 0.5;
            if (axis_spac !== 0) {
                y = -this._content_height - 1.0 * frame_spc_ver + axis_spac;
            }
            return new egRect(-frame_spc_hor, y, // -0.5 * _content_height - frame_spc_ver,
            this._content_width + 2.0 * frame_spc_hor, this._content_height + 2.0 * frame_spc_ver);
        };
        /**
         * @brief paintSymbol 绘图符号，根据每个矩阵元素的框架类型，绘制框架
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlMtableNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            _super.prototype.paintSymbol.call(this, painter, x_scaling, y_scaling, outputPng);
            painter.save();
            var pos = this.devicePoint(new egPoint(0, 0));
            painter.translate(pos.x, pos.y);
            var frame_type = this.frame;
            if (frame_type !== FrameType.FrameNone) {
                if (frame_type === FrameType.FrameDashed) {
                    painter.setLineDash([5, 5]);
                }
                painter.strokeRect(this.myRect.x, this.myRect.y, this.myRect.width, this.myRect.height);
            }
            var col_spc = this.columnspacing();
            var row_spc = this.rowspacing();
            var col_offset = 0.0;
            for (var i = 0; i < this._cell_size_data.numCols() - 1; ++i) {
                var frame_type_1 = this.columnlines(i);
                col_offset += this._cell_size_data.col_widths[i];
                if (frame_type_1 !== FrameType.FrameNone) {
                    if (frame_type_1 === FrameType.FrameDashed) {
                        painter.setLineDash([5, 5]);
                    }
                    else if (frame_type_1 === FrameType.FrameSolid) {
                        painter.setLineDash([]);
                    }
                    var x = col_offset + 0.5 * col_spc;
                    painter.beginPath();
                    painter.moveTo(x, -0.5 * this._content_height);
                    painter.lineTo(x, 0.5 * this._content_height);
                    painter.closePath();
                    painter.stroke();
                }
                col_offset += col_spc;
            }
            var row_offset = 0.0;
            for (var i = 0; i < this._cell_size_data.numRows() - 1; ++i) {
                var frame_type_2 = this.rowlines(i);
                row_offset += this._cell_size_data.row_heights[i];
                if (frame_type_2 !== FrameType.FrameNone) {
                    if (frame_type_2 === FrameType.FrameDashed) {
                        painter.setLineDash([1, 5]);
                    }
                    else if (frame_type_2 === FrameType.FrameSolid) {
                        painter.setLineDash([]);
                    }
                    var y = row_offset + 0.5 * (row_spc - this._content_height);
                    painter.beginPath();
                    painter.moveTo(0, y);
                    painter.lineTo(this._content_width, y);
                    // painter.lineTo( this.symbolRect().width, y);
                    painter.closePath();
                    painter.stroke();
                    //console.log(`rowlines:`);
                    //console.log(painter.getLineDash());
                }
                row_offset += row_spc;
            }
            painter.restore();
        };
        return EDMmlMtableNode;
    }(EDMmlTableBaseNode));
    EdrawMathDate.EDMmlMtableNode = EDMmlMtableNode;
    var EDMmlMtrNode = /** @class */ (function (_super) {
        __extends(EDMmlMtrNode, _super);
        function EDMmlMtrNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MtrNode, document, attribute_map) || this;
        }
        /**
         * @brief layoutCells 布局元素，遍历所有子节点，设置<mtd>节点的绘制矩形setMyRect和相对原点坐标setRelOrigin
         * @param col_widths 列宽度
         * @param col_spc 列间距
         */
        EDMmlMtrNode.prototype.layoutCells = function (col_widths, col_spc) {
            var mr = this.myRect;
            var child = this.firstChild;
            var col_offset = 0.0;
            // 对列节点进行布局
            var colnum = 0;
            for (; child != null; child = child.nextSibling, ++colnum) {
                if (child.nodeType !== EDMathMlNodeType.MtdNode) {
                    console.log("error: mtable child nodetype != EDMathMlNodeType.MtdNode");
                    return;
                }
                var mtd = child;
                var rect = new egRect(0.0, mr.top(), col_widths[colnum], mr.height);
                mtd.setMyRect(rect);
                mtd.relOrigin = new egPoint(col_offset, 0.0);
                col_offset += col_widths[colnum] + col_spc;
            }
            this.updateMyRect();
        };
        return EDMmlMtrNode;
    }(EDMmlTableBaseNode));
    EdrawMathDate.EDMmlMtrNode = EDMmlMtrNode;
    var EDMmlMtdNode = /** @class */ (function (_super) {
        __extends(EDMmlMtdNode, _super);
        // make contents fit the cell//使内容适合单元格
        function EDMmlMtdNode(document, attribute_map) {
            var _this = _super.call(this, EDMathMlNodeType.MtdNode, document, attribute_map) || this;
            _this._scriptlevel_adjust = 0;
            return _this;
        }
        /**
         * @brief setMyRect 设置我的绘图矩形，修正子节点的脚本等级，根据对齐方式修正子节点的布局位置
         * @param rect 设置后的绘图矩形，用于修改_my_rect，_my_rect默认由文本图像矩阵决定
         */
        EDMmlMtdNode.prototype.setMyRect = function (rect) {
            _super.prototype.setMyRect.call(this, rect);
            var child = this.firstChild;
            if (child == null) {
                return;
            }
            // 如果新设置的矩形宽度小于第一个子节点的宽度，则增加子节点的脚本等级
            if (rect.width < child.myRect.width) {
                while (rect.width < child.myRect.width
                    && (child.font.pixelSize > EdrawMathDate.EDStatic.g_min_font_pixel_size_calc)) {
                    ++this._scriptlevel_adjust;
                    child.nodeLayout();
                }
            }
            var mr = this.myRect;
            var cmr = child.myRect;
            var child_rel_origin = new egPoint(0, 0);
            // 根据列对齐方式进行对齐
            switch (this.columnalign()) {
                case ColAlign.ColAlignLeft:
                    child_rel_origin.x = 0.0;
                    break;
                case ColAlign.ColAlignCenter:
                    child_rel_origin.x = mr.left() + 0.5 * (mr.width - cmr.width);
                    break;
                case ColAlign.ColAlignRight:
                    child_rel_origin.x = mr.right() - cmr.width;
                    break;
            }
            // 根据行对齐方式进行对齐
            switch (this.rowalign()) {
                case RowAlign.RowAlignTop:
                    child_rel_origin.y = mr.top() - cmr.top();
                    break;
                case RowAlign.RowAlignCenter:
                case RowAlign.RowAlignBaseline:
                    child_rel_origin.y = mr.top() - cmr.top() + 0.5 * (mr.height - cmr.height);
                    break;
                case RowAlign.RowAlignBottom:
                    child_rel_origin.y = mr.bottom() - cmr.bottom();
                    break;
                case RowAlign.RowAlignAxis:
                    child_rel_origin.y = 0.0;
                    break;
            }
            // 修正子节点位置为对齐后的位置
            child.relOrigin = child_rel_origin;
        };
        /**
         * @brief columnalign 获取列对齐方式，在属性图中匹配"columnalign"
         * @return 返回结果值，输出为ColAlign
         */
        EDMmlMtdNode.prototype.columnalign = function () {
            var val = this.explicitAttribute('columnalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretColAlign(val, 0, [false]);
            }
            var node = this.parent; // <mtr>
            if (node == null) {
                return ColAlign.ColAlignCenter;
            }
            var colnum = this.colNum();
            val = node.explicitAttribute('columnalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretColAlign(val, colnum, [false]);
            }
            node = node.parent; // <mtable>
            if (node == null) {
                return ColAlign.ColAlignCenter;
            }
            val = node.explicitAttribute('columnalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretColAlign(val, colnum, [false]);
            }
            return ColAlign.ColAlignCenter;
        };
        /**
         * @brief rowalign 获取行对齐方式，在属性图中匹配"rowalign"
         * @return 返回结果值，输出为RowAlign
         */
        EDMmlMtdNode.prototype.rowalign = function () {
            var val = this.explicitAttribute('rowalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretRowAlign(val, 0, [false]);
            }
            var node = this.parent; // <mtr>
            if (node == null) {
                return RowAlign.RowAlignAxis;
            }
            var rownum = this.rowNum();
            val = node.explicitAttribute('rowalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretRowAlign(val, rownum, [false]);
            }
            node = node.parent; // <mtable>
            if (node == null) {
                return RowAlign.RowAlignAxis;
            }
            val = node.explicitAttribute('rowalign');
            if (null != val) {
                return EdrawMathDate.EDStatic.mmlInterpretRowAlign(val, rownum, [false]);
            }
            return RowAlign.RowAlignAxis;
        };
        /**
         * @brief colNum 获取行数，此节点在其同级节点<mtd>中是第几个
         * @return 返回结果值
         */
        EDMmlMtdNode.prototype.colNum = function () {
            // 获取列数
            var syb = this.previousSibling;
            var i = 0;
            for (; syb != null; syb = syb.previousSibling) {
                ++i;
            }
            return i;
        };
        /**
         * @brief rowNum 获取行数，此节点的父节点<mtr>在同级节点中是第几个
         * @return 返回结果值
         */
        EDMmlMtdNode.prototype.rowNum = function () {
            // 获取行数
            var row = this.parent.previousSibling;
            var i = 0;
            for (; row != null; row = row.previousSibling) {
                ++i;
            }
            return i;
        };
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 对子节点的脚本等级进行修正，使其同级节点的脚本等级统一
         * @return 返回结果值
         */
        EDMmlMtdNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            // 获取子节点的脚本等级
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && child === this.firstChild) {
                return sl + this._scriptlevel_adjust;
            }
            else {
                return sl;
            }
        };
        return EDMmlMtdNode;
    }(EDMmlTableBaseNode));
    EdrawMathDate.EDMmlMtdNode = EDMmlMtdNode;
    var EDMmlMoverNode = /** @class */ (function (_super) {
        __extends(EDMmlMoverNode, _super);
        /*例子
        <mover accent="true">
            <mrow>
                <mi> x </mi>
                <mo> + </mo>
                <mi> y </mi>
                <mo> + </mo>
                <mi> z </mi>
            </mrow>
            <mo> &#x23DE; <!--TOP CURLY BRACKET 括弧--> </mo>
        </mover>
        */
        function EDMmlMoverNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MoverNode, document, attribute_map) || this;
        }
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 第二个子节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMoverNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMoverNode base == null.`);
                return;
            }
            var over = base.nextSibling;
            if (over == null) {
                // console.log(`error: EDMmlMoverNode over == null.`);
                return;
            }
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && child === over) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         */
        EDMmlMoverNode.prototype.layoutSymbol = function () {
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMoverNode base == null.`);
                return;
            }
            var over = base.nextSibling;
            if (over == null) {
                // console.log(`error: EDMmlMoverNode over == null.`);
                return;
            }
            var base_rect = base.myRect;
            var over_rect = over.myRect;
            // qreal spacing;
            // if (nullptr == over->toMoNode()) {
            //    if (explicitAttribute( "accent" ) == "true")
            //        spacing = 0.0;
            //    else
            //        spacing = EDStatic::g_mfrac_spacing * ( base_rect.height() + over_rect.height() );
            // } else {
            //    if (over->toMoNode()->dictionaryAttribute("accent") == "true" || explicitAttribute( "accent" ) == "true")
            //        spacing = 0.0;
            //    else
            //        spacing = EDStatic::g_mfrac_spacing * ( base_rect.height() + over_rect.height() );
            // }
            var spacing = 0;
            if (this._document.defaultMode) {
                spacing = this.explicitAttribute('accent') === 'true' ? 0.0 : EdrawMathDate.EDStatic.g_mfrac_spacing * 4 * over_rect.height; // ( over_rect.height() + base_rect.height() );
            }
            var align_value = this.explicitAttribute('align');
            var over_rel_factor = align_value === 'left' ? 1.0 : align_value === 'right' ? 0.0 : 0.5;
            base.relOrigin = new egPoint(-0.5 * base_rect.width, 0.0);
            over.relOrigin = new egPoint(-over_rel_factor * over_rect.width, base_rect.top() - spacing - over_rect.bottom());
            // if(base.getChildItalic) {
            //     over.relOrigin = new egPoint( -over_rel_factor * over_rect.width + this.font.pixelSize*EDStatic.g_node_space,
            //                                     base_rect.top() - spacing - over_rect.bottom() );
            // }
        };
        return EDMmlMoverNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMoverNode = EDMmlMoverNode;
    var EDMmlMunderNode = /** @class */ (function (_super) {
        __extends(EDMmlMunderNode, _super);
        /*例子
        <munder accentunder="true">
            <mrow>
                <mi> x </mi>
                <mo> + </mo>
                <mi> y </mi>
                <mo> + </mo>
                <mi> z </mi>
            </mrow>
            <mo> &#x23DF; <!--BOTTOM CURLY BRACKET 括弧 --> </mo>
        </munder>
        */
        function EDMmlMunderNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MunderNode, document, attribute_map) || this;
        }
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 第二个子节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMunderNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMunderNode base == null.`);
                return;
            }
            var under = base.nextSibling;
            if (under == null) {
                // console.log(`error: EDMmlMunderNode under == null.`);
                return;
            }
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && child === under) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         */
        EDMmlMunderNode.prototype.layoutSymbol = function () {
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMunderNode base == null.`);
                return;
            }
            var under = base.nextSibling;
            if (under == null) {
                // console.log(`error: EDMmlMunderNode under == null.`);
                return;
            }
            var base_rect = base.myRect;
            var under_rect = under.myRect;
            /*qreal spacing;
            if (nullptr == under->toMoNode()) {
                if (explicitAttribute( "accentunder" ) == "true")
                    spacing = 0.0;
                else
                    spacing = EDStatic::g_mfrac_spacing * ( base_rect.height() + under_rect.height());
            } else {
                if (under->toMoNode()->dictionaryAttribute("accent") == "true" || explicitAttribute( "accentunder" ) == "true")
                    spacing = 0.0;
                else
                    spacing = EDStatic::g_mfrac_spacing * ( base_rect.height() + under_rect.height());
            }*/
            var spacing = 0;
            if (this._document.defaultMode) {
                spacing = this.explicitAttribute('accentunder') === 'true' ? 0.0 : EdrawMathDate.EDStatic.g_mfrac_spacing * 4 * under_rect.height; // ( under_rect.height() + base_rect.height() );
            }
            var align_value = this.explicitAttribute('align');
            var under_rel_factor = align_value === 'left' ? 1.0 : align_value === 'right' ? 0.0 : 0.5;
            base.relOrigin = new egPoint(-0.5 * base_rect.width, 0.0);
            under.relOrigin = new egPoint(-under_rel_factor * under_rect.width, base_rect.bottom() + spacing - under_rect.top());
        };
        return EDMmlMunderNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMunderNode = EDMmlMunderNode;
    var EDMmlMunderoverNode = /** @class */ (function (_super) {
        __extends(EDMmlMunderoverNode, _super);
        /*例子
        <munderover >
                <mo> &#x222B; <!--INTEGRAL 积分 --> </mo> //text
                <mn> 0 </mn>//under
                <mi> &#x221E; <!--INFINITY 无穷大 --> </mi>//over
        </munderover>
        */
        function EDMmlMunderoverNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MunderoverNode, document, attribute_map) || this;
        }
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlMunderoverNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            // str[0] = str[0] + `(`;  
            var base = this.firstChild;
            base.appendEduStr(str, edudata);
            if (base == null) {
                return;
            }
            // str[0] = str[0] + `)(`;  
            var under = base.nextSibling;
            if (under != null) {
                under.appendEduStr(str, edudata);
                // str[0] = str[0] + `)(`;
                var over = under.nextSibling;
                if (over != null) {
                    over.appendEduStr(str, edudata);
                    // str[0] = str[0] + `)`;
                }
                else {
                    // str[0] = str[0] + `)`;
                    return;
                }
            }
            else {
                // str[0] = str[0] + `1)`;
                return;
            }
        };
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 第二个子节点，第三个子节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMunderoverNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMunderoverNode base == null.`);
                return;
            }
            var under = base.nextSibling;
            if (under == null) {
                // console.log(`error: EDMmlMunderoverNode under == null.`);
                return;
            }
            var over = under.nextSibling;
            if (over == null) {
                // console.log(`error: EDMmlMunderoverNode over == null.`);
                return;
            }
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && (child === under || child === over)) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         */
        EDMmlMunderoverNode.prototype.layoutSymbol = function () {
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMunderoverNode base == null.`);
                return;
            }
            var under = base.nextSibling;
            if (under == null) {
                // console.log(`error: EDMmlMunderoverNode under == null.`);
                return;
            }
            var over = under.nextSibling;
            if (over == null) {
                // console.log(`error: EDMmlMunderoverNode over == null.`);
                return;
            }
            var base_rect = base.myRect;
            var under_rect = under.myRect;
            var over_rect = over.myRect;
            var over_spacing = 0;
            var under_spacing = 0;
            if (this._document.defaultMode) {
                over_spacing = this.explicitAttribute('accent') === 'true' ? 0.0 : EdrawMathDate.EDStatic.g_mfrac_spacing * 2 * (under_rect.height + over_rect.height); // ( base_rect.height());// + under_rect.height() + over_rect.height() );
                // qreal under_spacing = explicitAttribute( "accentunder" ) == "true" ? 0.0 : EDStatic::g_mfrac_spacing * ( base_rect.height() + under_rect.height() );// + over_rect.height() );
                under_spacing = this.explicitAttribute('accentunder') === 'true' ? 0.0 : EdrawMathDate.EDStatic.g_mfrac_spacing * 2 * (under_rect.height + over_rect.height); // base_rect.height();// + over_rect.height() );
            }
            var align_value = this.explicitAttribute('align');
            var underover_rel_factor = align_value === 'left' ? 1.0 : align_value === 'right' ? 0.0 : 0.5;
            var ymove = 0; // -0.5*this.basePos();
            base.relOrigin = new egPoint(-0.5 * base_rect.width, ymove);
            under.relOrigin = new egPoint(-underover_rel_factor * under_rect.width, ymove + base_rect.bottom() + under_spacing - under_rect.top()); // base_rect.bottom()改为
            over.relOrigin = new egPoint(-underover_rel_factor * over_rect.width, ymove + base_rect.top() - over_spacing - over_rect.bottom()); // under_rect.bottom改为over_rect.bottom() 
            // under->setRelOrigin( QPointF( -underover_rel_factor * under_rect.width(), base_rect.bottom() + under_spacing - under_rect.top() ) );//base_rect.bottom()改为
            // over->setRelOrigin( QPointF( -underover_rel_factor * over_rect.width(), base_rect.top() - over_spacing - over_rect.bottom() ) );//under_rect.bottom改为over_rect.bottom() 
        };
        return EDMmlMunderoverNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMunderoverNode = EDMmlMunderoverNode;
    var EDMmlMprescriptsNode = /** @class */ (function (_super) {
        __extends(EDMmlMprescriptsNode, _super);
        /*例子
        <mprescripts/>
        */
        function EDMmlMprescriptsNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MprescriptsNode, document, attribute_map) || this;
        }
        return EDMmlMprescriptsNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMprescriptsNode = EDMmlMprescriptsNode;
    var EDMmlNoneNode = /** @class */ (function (_super) {
        __extends(EDMmlNoneNode, _super);
        /*例子
        <none/>
        */
        function EDMmlNoneNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.NoneNode, document, attribute_map) || this;
        }
        return EDMmlNoneNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlNoneNode = EDMmlNoneNode;
    var EDMmlMmultiscriptsNode = /** @class */ (function (_super) {
        __extends(EDMmlMmultiscriptsNode, _super);
        /*例子
        <mmultiscripts>
                <mi>X</mi>      <!-- base expression -->
                <none />        <!-- postsubscript -->
                <mi>c</mi>      <!-- postsuperscript -->
                <mprescripts />
                <mi>b</mi>      <!-- presubscript -->
                <none />        <!-- presuperscript -->
        </mmultiscripts>
        */
        function EDMmlMmultiscriptsNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MmultiscriptsNode, document, attribute_map) || this;
        }
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 第二个子节点，第三个子节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMmultiscriptsNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMmultiscriptsNode base == null.`);
                return;
            }
            var postsub = base.nextSibling;
            if (postsub == null) {
                // console.log(`error: EDMmlMmultiscriptsNode postsub == null.`);
                return;
            }
            var postsup = postsub.nextSibling;
            if (postsup == null) {
                // console.log(`error: EDMmlMmultiscriptsNode postsup == null.`);
                return;
            }
            var mprescripts = postsup.nextSibling;
            if (mprescripts == null) {
                // console.log(`error: EDMmlMmultiscriptsNode mprescripts == null.`);
                return;
            }
            var presub = mprescripts.nextSibling;
            if (presub == null) {
                // console.log(`error: EDMmlMmultiscriptsNode presub == null.`);
                return;
            }
            var presup = presub.nextSibling;
            if (presup == null) {
                // console.log(`error: EDMmlMmultiscriptsNode presup == null.`);
                return;
            }
            var sl = _super.prototype.scriptlevel.call(this);
            if (child != null && (child === postsub || child === postsup || child === presub || child === presup)) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         */
        EDMmlMmultiscriptsNode.prototype.layoutSymbol = function () {
            var base = this.firstChild;
            if (base == null) {
                // console.log(`error: EDMmlMmultiscriptsNode base == null.`);
                return;
            }
            var postsub = base.nextSibling;
            if (postsub == null) {
                // console.log(`error: EDMmlMmultiscriptsNode postsub == null.`);
                return;
            }
            var postsup = postsub.nextSibling;
            if (postsup == null) {
                // console.log(`error: EDMmlMmultiscriptsNode postsup == null.`);
                return;
            }
            var mprescripts = postsup.nextSibling;
            if (mprescripts == null) {
                // console.log(`error: EDMmlMmultiscriptsNode mprescripts == null.`);
                return;
            }
            var presub = mprescripts.nextSibling;
            if (presub == null) {
                // console.log(`error: EDMmlMmultiscriptsNode presub == null.`);
                return;
            }
            var presup = presub.nextSibling;
            if (presup == null) {
                // console.log(`error: EDMmlMmultiscriptsNode presup == null.`);
                return;
            }
            var base_rect = base.myRect;
            var postsub_rect = postsub.myRect;
            var postsup_rect = postsup.myRect;
            var mprescripts_rect = mprescripts.myRect;
            var presub_rect = presub.myRect;
            var presup_rect = presup.myRect;
            var isnext = false;
            if (base.firstChild.nodeType == EDMathMlNodeType.MtextNode) {
                if (base.firstChild.firstChild.toTextNode().text == "" && !base.firstChild.nextSibling) {
                    if (this.nextSibling) {
                        console.log("~~~~MmultiscriptsNode:");
                        this.nextSibling.nodeLayout();
                        isnext = true;
                    }
                }
            }
            base.relOrigin = new egPoint(-base_rect.width, 0.0);
            mprescripts.relOrigin = new egPoint(-mprescripts_rect.width, 0.0);
            var subsup_spacing = this.interpretSpacing(EdrawMathDate.EDStatic.g_subsup_spacing, [false]);
            postsub.relOrigin = new egPoint(subsup_spacing, base.myRect.bottom()
                - EdrawMathDate.EDStatic.g_sub_shift_multiplier * postsub_rect.height * 0.5);
            postsup.relOrigin = new egPoint(subsup_spacing, base.myRect.top()
                + EdrawMathDate.EDStatic.g_sup_shift_multiplier * postsup_rect.height * 0.5);
            if (!isnext) {
                presub.relOrigin = new egPoint(-base_rect.width - subsup_spacing - presub_rect.width, base.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * presub_rect.height * 0.5);
                presup.relOrigin = new egPoint(-base_rect.width - subsup_spacing - presup_rect.width, base.myRect.top()
                    + EdrawMathDate.EDStatic.g_sup_shift_multiplier * presup_rect.height * 0.5);
            }
            else {
                presub.relOrigin = new egPoint(-base_rect.width - subsup_spacing - presub_rect.width, this.nextSibling.myRect.bottom()
                    - EdrawMathDate.EDStatic.g_sub_shift_multiplier * presub_rect.height * 0.5);
                presup.relOrigin = new egPoint(-base_rect.width - subsup_spacing - presup_rect.width, this.nextSibling.myRect.top()
                    + EdrawMathDate.EDStatic.g_sup_shift_multiplier * presup_rect.height * 0.5);
            }
        };
        return EDMmlMmultiscriptsNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMmultiscriptsNode = EDMmlMmultiscriptsNode;
})(EdrawMathDate || (EdrawMathDate = {}));
