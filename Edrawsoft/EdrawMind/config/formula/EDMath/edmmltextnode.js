// 继承自EDMmlNode的节点
// EDMmlTextNode文本节点，
// 常用修改说明：
// 1、paintSymbol文本绘制函数，可以实现特殊文本的特殊绘制，其中paintHStretch实现水平拉伸的绘制，paintVStretch实现垂直拉伸的绘制
// 2、symbolRect文本矩阵大小，需要设置的与文本绘制内容大小相对应，是鼠标框选和选中的区域矩形
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
    var EDMmlTextNode = /** @class */ (function (_super) {
        __extends(EDMmlTextNode, _super);
        function EDMmlTextNode(text, document) {
            var _this = _super.call(this, EDMathMlNodeType.TextNode, document, new Map()) || this;
            _this._text = text;
            return _this;
        }
        Object.defineProperty(EDMmlTextNode.prototype, "text", {
            /**
             * @brief text 获取节点文本
             * @return 返回结果值，输出为QString
             */
            get: function () { return this._text; },
            /**
             * @brief setText 设置节点文本
             * @param text 设置成的文本内容
             */
            set: function (text) { this._text = text; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlTextNode.prototype, "font", {
            // TextNodes are not xml elements, so they can't have attributes of //TextNodes不是xml元素，所以它们不能具有属性他们自己的。
            // their own. Everything is taken from the parent.                  //一切都取自父母。
            /**
             * @brief font 获取字体
             * @return 返回结果值，输出为QFont
            */
            get: function () {
                // QFontDatabase font_database;
                var myfont = this.parent.font;
                // QString pattern("[a-zA-Z0-9]{1}");
                // QRegExp rx(pattern);
                var pattern = /[[|(){}<>!a-zA-Z0-9\u0370-\u03ff]{1}/; // |!(){}[<>
                var pattern2 = /[\u0370-\u03ff]{1}/;
                if (this._text !== '') {
                    var result = this._text.match(pattern);
                    // if ((rx.exactMatch(_text) || _text == "]") && font_database.hasFamily( "Times New Roman" ))
                    //    myfont.setFamily("Times New Roman");
                    // else
                    // if (this._text.match(pattern2) != null) {
                    //     // console.log(`Greek`);
                    // }
                    if (result == null) { // && this._text !== ']' && this._text !== '˙' && this._text !== '¨') {// && font_database.hasFamily( "Lucida Sans Unicode" ))
                        // console.log(`${this._text} is Lucida Sans Unicode\n`);
                        // myfont.fontfamily = "Lucida Sans Unicode";
                        // myfont.fontfamily = "Symbol";Cambria
                        myfont.fontfamily = 'Cambria';
                    }
                    if (this._text == '∽' || this._text == '≌' || this._text == '∥') {
                        myfont.fontfamily = 'Symbol'; //Consolas Arial
                    }
                }
                return myfont;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlTextNode.prototype, "color", {
            /**
             * @brief color 获取字体颜色
             * @return 返回结果值,输出为QColor
            */
            get: function () {
                if (null == this.parent) {
                    return this._color;
                }
                return this.parent.color;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlTextNode.prototype, "background", {
            /**
             * @brief background 获取背景色
             * @return 返回结果值,输出为QColor
             */
            get: function () {
                if (null == this.parent) {
                    return this._background;
                }
                return this.parent.background;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief toStr 导出节点数据，将节点的一些常用属性转化为QString导出
         * @return 节点数据的QString输出
         */
        EDMmlTextNode.prototype.toStr = function () {
            var str = _super.prototype.toStr.call(this);
            return str + ' text = ' + this._text;
        };
        /**
         * @brief toTextNode 获取文本节点的指针，对当前节点进行判断，如果是文本节点则返回当前指针，否则为nullptr
         * @return 返回的节点指针
         */
        EDMmlTextNode.prototype.toTextNode = function () { return this; };
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child EDMmlNode节点类型不使用此参数
         * @return 返回结果值
         */
        EDMmlTextNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            if (null == this.parent) {
                return this._scriptlevel;
            }
            return this.parent.scriptlevel(this);
        };
        /**
         * @brief paintSymbol 绘图符号，绘制文字
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlTextNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            _super.prototype.paintSymbol.call(this, painter, x_scaling, y_scaling, outputPng);
            if (this.isInvisibleOperator()) {
                return;
            }
            painter.save();
            var d_pos = this.devicePoint(new egPoint()); // 获取当前字符的坐标位置
            var mr = this.symbolRect();
            var s_pos = mr.topLeft(); // 计算当前字符绘制矩形的坐标位置
            painter.translate(d_pos.x + s_pos.x, d_pos.y + s_pos.y); // d_pos + s_pos = deviceRect().topLeft(),即平移到到最终矩形位置
            // painter.translate( d_pos.x , d_pos.y);//d_pos + s_pos = deviceRect().topLeft(),即平移到到最终矩形位置
            // 改变水平布局，顶齐，居中，底齐等
            var baseline = new egPoint(0.0, this.basePos());
            // if (this._text == '∑' || this._text == '∏' || this._text == '∐') {
            //     //y方向偏移处理
            //    s_pos.y = s_pos.y / this._fFontSizeLevel * 1.0; 
            // }
            if (this._text == '⋂' || this._text == '⋃' || this._text == '⋀' || this._text == '⋁') {
                y_scaling = 1.15;
                x_scaling = 1.10;
                baseline.x = baseline.x - this.myRect.width * 0.05;
                //s_pos.y = s_pos.y / this._fFontSizeLevel * 1.0; 
            }
            baseline = baseline.subtract(s_pos);
            if (this.parent.nodeType === EDMathMlNodeType.MoNode) {
                baseline.x = baseline.x + this.font.pixelSize * EdrawMathDate.EDStatic.g_node_space * 1.0;
            }
            if (this.parent.nodeType === EDMathMlNodeType.MiNode) {
                baseline.x = baseline.x + this.font.pixelSize * EdrawMathDate.EDStatic.g_node_space * 0.5;
            }
            // if (this.parent.nodeType === EDMathMlNodeType.MnNode) {
            //     baseline.x = baseline.x + this.font.pixelSize*EDStatic.g_node_space*0.25;
            // }
            // console.log(`tag=${this.tag} d_pos=${d_pos.y} s_pos=${s_pos.y} baseline=${this.basePos()}\n`);
            var mo = null;
            var isHStretch = false;
            var isVStretch = false;
            if (EDMathMlNodeType.MoNode === this.parent.nodeType && '^' !== this._text && '~' !== this._text && '∼' !== this._text) {
                mo = this.parent.toMoNode();
                if (mo.stretch === StretchDir.HStretch) {
                    //console.log(`HStretch ${this.text} xs=${x_scaling} ys=${y_scaling}\n`);
                    if (this.paintHStretch(painter, this._text, baseline, x_scaling, y_scaling)) {
                        isHStretch = true;
                    }
                }
                if (mo.stretch === StretchDir.VStretch) {
                    if (this.paintVStretch(painter, this._text, baseline, x_scaling, y_scaling)) {
                        isVStretch = true;
                        this.nodeLayout();
                    }
                }
            }
            // if (EDMathMlNodeType::MoNode == parent()->nodeType())
            //    mo = parent()->toMoNode();
            if (!isHStretch && !isVStretch) {
                if (this._nSymbolType === SymbolType.Symbol) {
                    if (this._ctx.font !== this.font.fontstring()) {
                        this._ctx.font = this.font.fontstring();
                    }
                    var width = this._ctx.measureText(this.text).width;
                    // let br: egRect = new egRect(0, -this.font.pixelSize, width, this.font.pixelSize);
                    painter.scale(mr.width * 1.0 / width, mr.height * 1.0 / this.font.pixelSize);
                }
                else {
                    painter.scale(x_scaling, y_scaling);
                }
                // if (y_scaling !== 1) {
                //     //baseline.y = baseline.y * (1 - 4.0 * y_scaling / 100); // 调整垂直拉伸偏移
                // }
                if (painter.font !== this.font.fontstring()) {
                    painter.font = this.font.fontstring();
                }
                // painter->setRenderHint( QPainter::Antialiasing, true );
                // 注意：drawText的y位置用作字体的基线。
                if (painter.textBaseline !== 'alphabetic') { //alphabetic middle
                    painter.textBaseline = 'alphabetic'; //alphabetic middle
                }
                if ('isNuLL!' === this._text || 'isIndentation!' === this._text
                    || 'isSpace_1!' === this._text || 'isSpace_2!' === this._text
                    || 'isSpace_3!' === this._text || 'isSpace_4!' === this._text
                    || 'isSpace_5!' === this._text) {
                    painter.fillText('', baseline.x, 0.75 * baseline.y);
                }
                else {
                    if ('f' == this.text) {
                        if (this.parent.previousSibling) {
                            if (this.parent.previousSibling.nodeType != EDMathMlNodeType.MiNode) {
                                baseline.x = baseline.x + this._ctx.measureText(this._text).width * 0.5;
                            }
                        }
                    }
                    painter.fillText(this._text, baseline.x, 0.75 * baseline.y);
                    // console.log(`baseline = ${baseline} y_scaling = ${y_scaling}`)
                }
            }
            painter.restore();
        };
        /**
         * @brief symbolRect 获取符号矩形
         * @return 返回结果值，输出为QRectF
         */
        EDMmlTextNode.prototype.symbolRect = function () {
            var br = new egRect(0.0, 0.0, 0.0, 0.0);
            if (this._ctx.font !== this.font.fontstring()) {
                this._ctx.font = this.font.fontstring();
            }
            if (!this.isInvisibleOperator()) {
                var symbolheight = 0.5; // EDStatic.g_underover_symbolheight;
                var isdefault = this._document.defaultMode;
                // if (!isdefault) {
                //    symbolheight = symbolheight*0.5;
                // }
                // 根据字形计算矩形
                // QFont tmpfont;
                this._ctx.font = this.font.fontstring();
                br.x = 0;
                br.y = 0;
                br.height = this.font.pixelSize;
                br.width = this._ctx.measureText(this._text).width;
                //br.width = this._ctx.measureText(this._text).actualBoundingBoxRight - this._ctx.measureText(this._text).actualBoundingBoxLeft;
                // console.log(`~~~~~this._text`,this._text,this._ctx.measureText(this._text).actualBoundingBoxLeft,this._ctx.measureText(this._text).actualBoundingBoxRight)
                // console.log(`left = `,this._ctx.measureText(this._text).actualBoundingBoxLeft)
                // console.log(`right = `,this._ctx.measureText(this._text).actualBoundingBoxRight)
                // console.log(`width = `,br.width)
                if (this._text == "⏡") { //改符号symbolwidth=0
                    br.width = this._ctx.measureText("⏠").width;
                }
                if (this.parent.nodeType === EDMathMlNodeType.MoNode) {
                    br.width = br.width + this.font.pixelSize * EdrawMathDate.EDStatic.g_node_space * 2.0;
                }
                else if (this.parent.nodeType === EDMathMlNodeType.MiNode) {
                    br.width = br.width + this.font.pixelSize * EdrawMathDate.EDStatic.g_node_space * 1.0;
                    // for(let mitext of EDStatic.g_mi_height_1_2) {
                    //     if (this._text == mitext) {
                    //         br.height = br.height*0.5;
                    //     }
                    // }         
                } // else if (this.parent.nodeType === EDMathMlNodeType.MnNode) {
                //     br.width = br.width + this.font.pixelSize*EDStatic.g_node_space*0.5;
                // }
                // QRectF br = metrics.boundingRect( "0" );
                // br.translate( 0.0, basePos() );//平移基线到删除线的距离，字体相同，平移的距离也相同，即整体平移，使所有字符的删除线平齐？
                // return br;
                if ('isIndentation!' === this._text) { // 缩进处理
                    var pretext = this._text;
                    var prefont = this.font.fontstring();
                    if (this.parent.previousSibling != null) {
                        pretext = this.parent.previousSibling.firstChild.toTextNode().text;
                        prefont = this.parent.previousSibling.firstChild.font.fontstring();
                    }
                    this._ctx.font = prefont;
                    var width = this._ctx.measureText(pretext).width;
                    if ('isIndentation!' === this._text) {
                        br.x = -width * 0.2;
                    }
                    // else if ('isZeroWidthSpace!' === this._text) {
                    //     br.x = -width * 0.15;
                    // } else if ('isVeryThinSpace!' === this._text) {
                    //     br.x = -width * 0.05;
                    // }
                    br.y = 0;
                    br.height = this.font.pixelSize * 0.5;
                    br.width = 1;
                    // console.log(`缩进${br.x}\n`);
                }
                else if ('isSpace_1!' === this._text
                    || 'isSpace_2!' === this._text
                    || 'isSpace_3!' === this._text
                    || 'isSpace_4!' === this._text
                    || 'isSpace_5!' === this._text) {
                    br.width = 1;
                    //br.width = this._ctx.measureText(' ').width;
                }
                else if ('󲆐' === this._text || '󲆒' === this._text || '󲆽' === this._text || '󲇀' === this._text) {
                    br.width = this._ctx.measureText('⇌').width;
                }
                else if ('isNuLL!' === this._text) {
                    br.width = this._ctx.measureText('0').width;
                }
                else if ('' === this._text) {
                    // 光标矩形
                    /*
                    br.width = this._ctx.measureText("0").width;//|
                    let mrow: EDMmlNode = this.parent.parent;
                    if (mrow != null) {
                        if (mrow.parent)//特殊节点光标矩形特殊处理
                            if ((mrow.parent.nodeType == EDMathMlNodeType.MsubsupNode
                                    || mrow.parent.nodeType == EDMathMlNodeType.MsubNode
                                    || mrow.parent.nodeType == EDMathMlNodeType.MsupNode
                                    || mrow.parent.nodeType == EDMathMlNodeType.MmultiscriptsNode)
                                    && mrow.parent.firstChild == mrow) {
                                        br.width = this._ctx.measureText("0").width;
                            }
                    }*/
                    // console.log(`光标`);
                    br.x = -2;
                    br.width = 1;
                }
                else if ('f' == this.text) {
                    if (this.parent.previousSibling) {
                        if (this.parent.previousSibling.nodeType != EDMathMlNodeType.MiNode) {
                            br.width = br.width + this._ctx.measureText(this._text).width * 0.5;
                        }
                    }
                    if (this.parent.nextSibling) {
                        if (this.parent.nextSibling.nodeType != EDMathMlNodeType.MiNode) {
                            br.width = br.width + this._ctx.measureText(this._text).width * 0.5;
                        }
                    }
                    else {
                        br.width = br.width + this._ctx.measureText(this._text).width * 0.5;
                    }
                }
                if (this._nSymbolType === SymbolType.Over) {
                    br.translate(0.0, +0.5 * this.font.pixelSize);
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode) {
                        br.height = br.height * 0.5;
                    }
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MoverNode) {
                        br.height = br.height * symbolheight;
                        //console.log(`SymbolType.Over MoverNode`);
                        br.translate(0.0, -1.0 * this.font.pixelSize * symbolheight);
                    }
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MunderNode) {
                        br.height = br.height * symbolheight;
                        //console.log(`SymbolType.Over MunderNode`);
                        br.translate(0.0, -1.0 * this.font.pixelSize * (1 - symbolheight));
                    }
                }
                if (this._nSymbolType === SymbolType.Under) {
                    br.translate(0.0, +0.5 * this.font.pixelSize);
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode) {
                        br.height = br.height * 0.5;
                    }
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MoverNode) {
                        br.height = br.height * symbolheight;
                        br.translate(0.0, +1.0 * this.font.pixelSize * symbolheight);
                        //console.log(`SymbolType.Under MoverNode`);
                        // br.translate( 0.0, -0.5*br.height );
                    }
                    if (this.parent.parent.nodeType === EDMathMlNodeType.MunderNode) {
                        br.height = br.height * symbolheight;
                        br.translate(0.0, +1.0 * this.font.pixelSize * (1 - symbolheight));
                        //console.log(`SymbolType.Under MunderNode`);
                        // br.translate( 0.0, -0.5*br.height );
                    }
                }
                if (this._nSymbolType === SymbolType.Center &&
                    (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode
                        || this.parent.parent.nodeType === EDMathMlNodeType.MoverNode
                        || this.parent.parent.nodeType === EDMathMlNodeType.MunderNode)) {
                    // && parent()->parent()->firstChild() != parent()) {
                    //br.y = br.y + br.height * (1 - symbolheight);
                    //br.height = br.height * symbolheight;
                    br.translate(0.0, +0.5 * this.font.pixelSize);
                    br.height = br.height * 0.5;
                    br.translate(0.0, -0.5 * 0.5 * this.font.pixelSize);
                }
                if (this._nSymbolType === SymbolType.Arrow &&
                    (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode
                        || this.parent.parent.nodeType === EDMathMlNodeType.MoverNode
                        || this.parent.parent.nodeType === EDMathMlNodeType.MunderNode)) {
                    br.translate(0.0, +0.5 * this.font.pixelSize);
                    br.height = br.height * 0.25;
                    // if (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode) {
                    //     // br.y = br.y+br.height;
                    // } else if (this.parent.parent.nodeType === EDMathMlNodeType.MunderNode) {
                    //     br.y = br.y+br.height*1.5;
                    // } else if (this.parent.parent.nodeType === EDMathMlNodeType.MoverNode) {
                    //     br.y = br.y+br.height*2;
                    // }
                    br.translate(0.0, -0.5 * 0.25 * this.font.pixelSize);
                    // let widthnode:EDMmlNode = this.parent.parent.firstChild.nextSibling;
                    // widthnode.updateMyRect();
                    // let width:number = widthnode.myRect.width;
                    // if (this.parent.parent.nodeType == EDMathMlNodeType.MunderoverNode) {
                    //     widthnode = this.parent.parent.firstChild.nextSibling.nextSibling;
                    //     widthnode.updateMyRect();
                    //     let width2:number = widthnode.myRect.width;
                    //     if (width2 > width) {
                    //         width = width2;
                    //     }
                    // }
                    // br.width = br.width*2 + width;
                    var isDoubleArrow = false;
                    if (this.parent.parent.firstChild === this.parent) {
                        if (this.parent.parent.parent) {
                            var tmpnode = this.parent.parent.parent;
                            if (tmpnode.nodeType == EDMathMlNodeType.MunderoverNode
                                || tmpnode.nodeType == EDMathMlNodeType.MoverNode
                                || tmpnode.nodeType == EDMathMlNodeType.MunderNode) {
                                var widthnode = tmpnode.firstChild.nextSibling;
                                widthnode.updateMyRect();
                                var width = widthnode.myRect.width;
                                //console.log(`isDoubleArrow`,this.text, width);
                                if (tmpnode.nodeType == EDMathMlNodeType.MunderoverNode) {
                                    widthnode = tmpnode.firstChild.nextSibling.nextSibling;
                                    widthnode.updateMyRect();
                                    var width2 = widthnode.myRect.width;
                                    if (width2 > width) {
                                        width = width2;
                                    }
                                }
                                br.width = br.width * 2 + width;
                                isDoubleArrow = true;
                            }
                        }
                        if (this.parent.nextSibling && !isDoubleArrow) {
                            if (this.parent.nextSibling.symbolType != SymbolType.Arrow) {
                                // let widthnode:EDMmlNode = this.parent.nextSibling;
                                // widthnode.updateMyRect();
                                // br.width = br.width*2 + widthnode.myRect.width;
                                var widthnode = this.parent.nextSibling;
                                widthnode.updateMyRect();
                                var width = widthnode.myRect.width;
                                if (this.parent.parent.nodeType == EDMathMlNodeType.MunderoverNode) {
                                    widthnode = this.parent.nextSibling.nextSibling;
                                    widthnode.updateMyRect();
                                    var width2 = widthnode.myRect.width;
                                    if (width2 > width) {
                                        width = width2;
                                    }
                                }
                                br.width = br.width * 2 + width;
                                //console.log(`this.parent:`,this.text)
                            }
                        }
                    }
                }
                // if (_nSymbolType == EDMml::Symbol)
                //    br = metrics.tightBoundingRect( "+" );
            }
            // br.translate( 0.0, basePos() );//平移基线到删除线的距离，字体相同，平移的距离也相同，即整体平移，使所有字符的删除线平齐？
            br.translate(0.0, -0.5 * this.font.pixelSize); // 平移基线到删除线的距离，字体相同，平移的距离也相同，即整体平移，使所有字符的删除线平齐？
            this.generateTxtRenderingData(br); // 属性图中有id才进行渲染 例如渲染后矩形高度为boundingRect("X").height等
            // console.log(`${this.tag} symbolrect = ${br}\n`)
            return br;
        };
        /**
         * @brief isInvisibleOperator 判断是否隐式操作符 mtext为\20141-\20144之一，则是隐式操作符
         * @return 返回结果值
         */
        EDMmlTextNode.prototype.isInvisibleOperator = function () {
            // return    _text == QString( QChar( 0x61, 0x20 ) )  // &ApplyFunction;      //应用功能
            // || _text == QString( QChar( 0x62, 0x20 ) )  // &InvisibleTimes;     //隐形时报
            // || _text == QString( QChar( 0x63, 0x20 ) )  // &InvisibleComma;     //隐形逗号
            // || _text == QString( QChar( 0x64, 0x20 ) ); // Invisible addition   //隐形添加
            return false;
        };
        /**生成文本渲染数据
         * @brief generateTxtRenderingData generates position data from text node during rendering//在渲染期间从文本节点生成位置数据
         * @param rect the rectangle that surrounds the complete text                             //围绕整个文本的矩形
         */
        EDMmlTextNode.prototype.generateTxtRenderingData = function (rect) {
            if (this.isInvisibleOperator()) {
                return;
            }
            var previousWidth = 0.0;
            var size = this._text.length;
            if (size <= 0) {
                return;
            }
            if (null == this._parent) {
                return;
            }
            if (this._parent.nodeId === 0) {
                return;
            }
            // 通过渲染助手进行渲染
            for (var i = 1; i <= size; i++) {
                previousWidth = this.TxtRenderingDataHelper(rect, this._text.charAt(i), previousWidth);
            }
            return null;
        };
        /**文本渲染数据助手
         * @brief TxtRenderingDataHelper calculates the new width of the text given and sets      //计算给定文本的新宽度并设置文档中的位置矩形
         * the position rectangles in the document
         * @param parentRect the parent rectangle containing the char rectangle to calculate      //包含要计算的字符矩形的父矩形
         * @param text the text to calculate (usually with one char more than in the previous run)//输入要计算的文本（通常比上一次运行时多出一个字符）
         * @param previousWidth the previous width of the text from the previous run              //上一次运行的文本的上一个宽度
         * @return the with calculated this time                                                  //这次计算
         */
        EDMmlTextNode.prototype.TxtRenderingDataHelper = function (parentRect, text, previousWidth) {
            this._ctx.font = this.font.fontstring();
            // br.x = 0;
            // br.y = 0;
            // br.height = this.font.pixelSize;
            // br.width = ctx.measureText(this._text).width;
            var parentId = 0;
            var nodeType = EDMathMlNodeType.UnknownNode;
            var newWidth = 0;
            if (null != this._parent) {
                parentId = this._parent.nodeId;
                nodeType = this._parent.nodeType;
            }
            else {
                return 0.0;
            }
            var adjBits = EDRendAdjustBits.Nothing;
            if (nodeType === EDMathMlNodeType.MoNode
                || nodeType === EDMathMlNodeType.MpaddedNode) {
                adjBits = EDRendAdjustBits.translateLspace;
            }
            var i = text.length;
            this._document.appendRenderingData(parentId, i, this._parent, adjBits | EDRendAdjustBits.translateTxt);
            // 绘制矩形的x坐标平移之前的宽度，宽度改为最后一个字符的宽 高度改为'X'边界矩形的高
            var newRect = new egRect(0.0, 0.0, this.parentRect.width, this.parentRect.height);
            newRect.translate(previousWidth, 0.0);
            newRect.width = this._ctx.measureText(text.charAt(text.length - 1)).width; // 注意：metrics.width()不等于boundingRect().width()返回的宽度
            newRect.height = this.font.pixelSize;
            // newRect.width和newWidth不等？
            if (newRect.width + previousWidth > parentRect.width) {
                if (newRect.width + previousWidth - parentRect.width > 0) {
                    newWidth = parentRect.width;
                }
                else {
                    newWidth = newRect.width + previousWidth;
                }
                newRect.width = parentRect.width - previousWidth;
            }
            else {
                newWidth = newRect.width + previousWidth;
            }
            // newRect.moveBottom(basePos() - parentRect.top());
            newRect.moveTop(this.basePos() + parentRect.bottom());
            // width - previousWidth
            this._document.updateRenderingData(parentId, i, newRect);
            return newWidth;
        };
        /**
         * @brief paintHStretch 水平拉伸符号绘制
         * @param painter 绘制的CanvasRenderingContext2D
         * @param symboltext 绘制的符号内容
         * @param baseline 绘制的基准线
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlTextNode.prototype.paintHStretch = function (painter, symboltext, baseline, x_scaling, y_scaling) {
            if (x_scaling === void 0) { x_scaling = 1; }
            if (y_scaling === void 0) { y_scaling = 1; }
            var s_rect = this.parent.parentRect;
            if (this._ctx.font !== this.font.fontstring()) {
                this._ctx.font = this.font.fontstring();
            }
            var symbolwidth = painter.measureText(symboltext).width;
            /*
            if (this.parent.parent.firstChild == this.parent) {
                s_rect = this.parentRect;
                let nb: EDMmlNode = this.parent.parent.firstChild.nextSibling.firstChild;
                if (nb.symbolType == SymbolType.Arrow) {
                    if (this.parent.parent.nodeType == EDMathMlNodeType.MoverNode) {
                        //baseline.y = baseline.y+nb.parentRect.height*0.5;
                        console.log(`${this.text} hs 1`);
                    }
                    if (this.parent.parent.nodeType == EDMathMlNodeType.MunderNode) {
                        //baseline.y = baseline.y-nb.parentRect.height*0.5;
                        console.log(`${this.text} hs 2`);
                    }
                }
            } */
            // if (this._nSymbolType == SymbolType.Under &&
            //    (this.parent.parent.nodeType == EDMathMlNodeType.MunderoverNode
            //     || this.parent.parent.nodeType == EDMathMlNodeType.MoverNode
            //     || this.parent.parent.nodeType == EDMathMlNodeType.MunderNode)) {
            //    baseline.y = baseline.y - 1.5*this.symbolRect().height;
            // }
            // if (this._nSymbolType == SymbolType.Over &&
            //    (this.parent.parent.nodeType == EDMathMlNodeType.MunderoverNode
            //     || this.parent.parent.nodeType == EDMathMlNodeType.MoverNode
            //     || this.parent.parent.nodeType == EDMathMlNodeType.MunderNode)) {//上下同一符号的也是EDMml::Over
            //
            //    //baseline.y = baseline.y -1.5*this.symbolRect().height;
            //    console.log(`over\n`)
            //    }
            // let symbol_rect = QFontMetricsF( font() ).tightBoundingRect( symboltext );
            // console.log(`this.parent:`,this.text,s_rect.width * 1.0 / symbolwidth)
            // const x_scale:number =  (this.parent.parentRect.width + s_rect.width) * 1.0 / symbolwidth;
            // const rect:egRect = this.myRect;
            // rect.width = this.parent.parentRect.width + s_rect.width;
            // this.setMyRect(rect);
            // this.parent.updateMyRect();
            //console.log(`s_rect.width = `,s_rect.width,`symbolwidth = `,symbolwidth)
            //painter.scale( x_scaling, 1.0 );
            var x1 = baseline.x + this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
            var h = this.symbolRect().height;
            var x2 = baseline.x + s_rect.width - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
            var y1 = 0 + this.symbolRect().height * EdrawMathDate.EDStatic.g_draw_linewidth;
            var y2 = s_rect.height - this.symbolRect().height * EdrawMathDate.EDStatic.g_draw_linewidth;
            // const w:number = s_rect.width-this.font.pixelSize*EDStatic.g_draw_linewidth*2.0;
            var mid_y = (y1 + y2) / 2.0;
            var mid_x = (x1 + x2) / 2.0;
            //const w:number = s_rect.width;
            if (painter.font !== this.font.fontstring()) {
                painter.font = this.font.fontstring();
                //painter.lineCap="round";
            }
            if (painter.lineJoin !== "bevel") {
                painter.lineJoin = "bevel";
            }
            if (painter.textBaseline !== 'middle') {
                painter.textBaseline = 'middle'; // bottom middle alphabetic
            }
            var drawtext = false;
            if (this._nSymbolType != SymbolType.Normal //&& x_scaling >= 2.0
                && (this.parent.parent.nodeType == EDMathMlNodeType.MunderoverNode
                    || this.parent.parent.nodeType == EDMathMlNodeType.MoverNode
                    || this.parent.parent.nodeType == EDMathMlNodeType.MunderNode)) {
                painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                drawtext = true;
            }
            if (symboltext == "⏡" && !drawtext) { //改符号symbolwidth=0
                symbolwidth = painter.measureText("⏠").width * 1.5;
                baseline.x = baseline.x + symbolwidth / 2.0;
                baseline.y = baseline.y + this.symbolRect().height;
            }
            if ((this._nSymbolType === SymbolType.Arrow || this._nSymbolType === SymbolType.Center)
                && (this.parent.parent.nodeType === EDMathMlNodeType.MunderoverNode
                    || this.parent.parent.nodeType === EDMathMlNodeType.MoverNode
                    || this.parent.parent.nodeType === EDMathMlNodeType.MunderNode)) {
                baseline.y = baseline.y - 2 * this.symbolRect().height;
                //y = - 2 * this.symbolRect().height;
            }
            if (symboltext == "¯" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "︵" && drawtext) {
                // painter.beginPath();
                // painter.moveTo(x1, h);
                // painter.arc(x1+h*0.5,h,h*0.5,1*Math.PI,1.5*Math.PI,false)
                // painter.lineTo(x2-h*0.5,h*0.5);
                // painter.arc(x2-h*0.5,h,h*0.5,1.5*Math.PI,0*Math.PI,false)
                // //painter.closePath();
                // painter.stroke();
                var mid_tmpx = (x1 + x2) / 2.0;
                var mid_tmpy = y1;
                if (x_scaling < 2.0) {
                    mid_tmpy = (y1 + y2) * 1.0 / 3.0;
                }
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = baseline.x + symbolwidth * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 + this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                }
                painter.beginPath();
                painter.moveTo(x1, y2);
                painter.bezierCurveTo(x1, mid_tmpy, mid_tmpx, mid_tmpy, mid_tmpx, mid_tmpy);
                if (x_scaling > 2.0) {
                    mid_tmpx = x2 - (mid_tmpx - x1);
                    painter.lineTo(mid_tmpx, mid_tmpy);
                }
                painter.bezierCurveTo(mid_tmpx, mid_tmpy, x2, mid_tmpy, x2, y2);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "︶" && drawtext) {
                // painter.beginPath();
                // painter.moveTo(x1, 0);
                // painter.arc(x1+h*0.5,0,h*0.5,1*Math.PI,0.5*Math.PI,true)
                // painter.lineTo(x2-h*0.5,h*0.5);
                // painter.arc(x2-h*0.5,0,h*0.5,0.5*Math.PI,0*Math.PI,true)
                // //painter.closePath();
                // painter.stroke();
                var mid_tmpx = (x1 + x2) / 2.0;
                var mid_tmpy = y2;
                if (x_scaling < 2.0) {
                    mid_tmpy = (y1 + y2) * 2.0 / 3.0;
                }
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = baseline.x + symbolwidth * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 + this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                }
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.bezierCurveTo(x1, mid_tmpy, mid_tmpx, mid_tmpy, mid_tmpx, mid_tmpy);
                if (x_scaling > 2.0) {
                    mid_tmpx = x2 - (mid_tmpx - x1);
                    painter.lineTo(mid_tmpx, mid_tmpy);
                }
                painter.bezierCurveTo(mid_tmpx, mid_tmpy, x2, mid_tmpy, x2, y1);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "ᨈ" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h);
                painter.lineTo((x1 + x2) * 0.5, h * 0.5);
                painter.lineTo(x2, h);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "ᨆ" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, 0);
                painter.lineTo((x1 + x2) * 0.5, h * 0.5);
                painter.lineTo(x2, 0);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "⎴" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2, h);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "⎵" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, 0);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2, 0);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "⏠" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h);
                painter.lineTo(x1 + h * 0.5, h * 0.5);
                painter.lineTo(x2 - h * 0.5, h * 0.5);
                painter.lineTo(x2, h);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "⏡" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, 0);
                painter.lineTo(x1 + h * 0.5, h * 0.5);
                painter.lineTo(x2 - h * 0.5, h * 0.5);
                painter.lineTo(x2, 0);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "︷" && drawtext) {
                // painter.beginPath();
                // painter.moveTo(x1, h);
                // painter.arc(x1+h*0.5,h,h*0.5,1*Math.PI,1.5*Math.PI,false)
                // painter.lineTo((x1+x2)*0.5-h*0.5,h*0.5);
                // painter.arc((x1+x2)*0.5-h*0.5,0,h*0.5,0.5*Math.PI,0*Math.PI,true)
                // painter.arc((x1+x2)*0.5+h*0.5,0,h*0.5,1*Math.PI,0.5*Math.PI,true)
                // painter.lineTo(x2-h*0.5,h*0.5);
                // painter.arc(x2-h*0.5,h,h*0.5,1.5*Math.PI,0*Math.PI,false)
                // //painter.closePath();
                // painter.stroke();
                var mid_tmpx = (x1 + x2) / 4.0;
                var del_x = 0;
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_x = (baseline.x + symbolwidth * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth) / 2.0;
                    mid_tmpx = del_x;
                }
                painter.beginPath();
                painter.moveTo(x1, y2);
                painter.bezierCurveTo(x1, mid_y, mid_tmpx, mid_y, mid_tmpx, mid_y);
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_x = mid_tmpx - x1;
                    mid_tmpx = mid_x - del_x;
                    painter.lineTo(mid_tmpx, mid_y);
                }
                painter.bezierCurveTo(mid_tmpx, mid_y, mid_x, mid_y, mid_x, y1);
                mid_tmpx = (x1 + x2) * 3.0 / 4.0;
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = mid_x + del_x;
                }
                painter.bezierCurveTo(mid_x, mid_y, mid_tmpx, mid_y, mid_tmpx, mid_y);
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = x2 - del_x;
                    painter.lineTo(mid_tmpx, mid_y);
                }
                painter.bezierCurveTo(mid_tmpx, mid_y, x2, mid_y, x2, y2);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "︸" && drawtext) {
                // painter.beginPath();
                // painter.moveTo(x1, 0);
                // painter.arc(x1+h*0.5,0,h*0.5,1*Math.PI,0.5*Math.PI,true)
                // painter.lineTo((x1+x2)*0.5-h*0.5,h*0.5);
                // painter.arc((x1+x2)*0.5-h*0.5,h,h*0.5,1.5*Math.PI,0*Math.PI,false)
                // painter.arc((x1+x2)*0.5+h*0.5,h,h*0.5,1*Math.PI,1.5*Math.PI,false)
                // painter.lineTo(x2-h*0.5,h*0.5);
                // painter.arc(x2-h*0.5,0,h*0.5,0.5*Math.PI,0*Math.PI,true)
                // //painter.closePath();
                // painter.stroke();
                var mid_tmpx = (x1 + x2) / 4.0;
                console.log("~~~~x", x1, x2);
                var del_x = 0;
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_x = (baseline.x + symbolwidth * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth) / 2.0;
                    mid_tmpx = del_x;
                }
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.bezierCurveTo(x1, mid_y, mid_tmpx, mid_y, mid_tmpx, mid_y);
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_x = mid_tmpx - x1;
                    mid_tmpx = mid_x - del_x;
                    painter.lineTo(mid_tmpx, mid_y);
                }
                painter.bezierCurveTo(mid_tmpx, mid_y, mid_x, mid_y, mid_x, y2);
                mid_tmpx = (x1 + x2) * 3.0 / 4.0;
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = mid_x + del_x;
                }
                painter.bezierCurveTo(mid_x, mid_y, mid_tmpx, mid_y, mid_tmpx, mid_y);
                if (x_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpx = x2 - del_x;
                    painter.lineTo(mid_tmpx, mid_y);
                }
                painter.bezierCurveTo(mid_tmpx, mid_y, x2, mid_y, x2, y1);
                //painter.closePath();
                painter.stroke();
            }
            else if (symboltext == "→" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.stroke();
                painter.moveTo(x2 - h, 0);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, h);
                painter.stroke();
            }
            else if (symboltext == "↔" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.stroke();
                painter.moveTo(x1 + h, 0);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x1 + h, h);
                painter.stroke();
                painter.moveTo(x2 - h, 0);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, h);
                painter.stroke();
            }
            else if (symboltext == "←" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.stroke();
                painter.moveTo(x1 + h, 0);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x1 + h, h);
                painter.stroke();
            }
            else if (symboltext == "⇄" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h);
                painter.lineTo(x2, h);
                painter.stroke();
                painter.moveTo(x1 + h, h * 0.5);
                painter.lineTo(x1, h);
                painter.lineTo(x1 + h, h * 1.5);
                painter.stroke();
                painter.moveTo(x1, 0);
                painter.lineTo(x2, 0);
                painter.stroke();
                painter.moveTo(x2 - h, -h * 0.5);
                painter.lineTo(x2, 0);
                painter.lineTo(x2 - h, h * 0.5);
                painter.stroke();
            }
            else if (symboltext == "⇀" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, 0);
                painter.stroke();
            }
            else if (symboltext == "⇁" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, h);
                painter.stroke();
            }
            else if (symboltext == "⥎" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1 + h, 0);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, 0);
                painter.stroke();
            }
            else if (symboltext == "⥐" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1 + h, h * 1);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.lineTo(x2 - h, h * 1);
                painter.stroke();
            }
            else if (symboltext == "↼" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1 + h, 0);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.stroke();
            }
            else if (symboltext == "↽" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1 + h, h * 1);
                painter.lineTo(x1, h * 0.5);
                painter.lineTo(x2, h * 0.5);
                painter.stroke();
            }
            else if (symboltext == "⇌" && drawtext) {
                painter.beginPath();
                painter.moveTo(x1 + h, h * 1.5);
                painter.lineTo(x1, h);
                painter.lineTo(x2, h);
                painter.stroke();
                painter.moveTo(x1, 0);
                painter.lineTo(x2, 0);
                painter.lineTo(x2 - h, -h * 0.5);
                painter.stroke();
            }
            else if (symboltext == "󲆒" && this._nSymbolType == SymbolType.Arrow) {
                var h2 = h;
                var h3 = h;
                var y = 0;
                if (!drawtext) {
                    h2 = h * 0.35;
                    h3 = h * 0.15;
                    y = h * 0.5 - h3 * 2.0 / 3.0;
                }
                painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                painter.beginPath();
                painter.moveTo(x1 + h3, y + h2);
                painter.lineTo(x2 - h3, y + h2);
                painter.stroke();
                painter.moveTo(x1 + h3 * 2, y + h2 * 0.5);
                painter.lineTo(x1 + h3, y + h2);
                painter.lineTo(x1 + h3 * 2, y + h2 * 1.5);
                painter.stroke();
                painter.moveTo(x1, y + 0);
                painter.lineTo(x2, y + 0);
                painter.stroke();
                painter.moveTo(x2 - h3, y - h2 * 0.5);
                painter.lineTo(x2, y + 0);
                painter.lineTo(x2 - h3, y + h2 * 0.5);
                painter.stroke();
            }
            else if (symboltext == "󲆐" && this._nSymbolType == SymbolType.Arrow) {
                var h2 = h;
                var h3 = h;
                var y = 0;
                if (!drawtext) {
                    h2 = h * 0.35;
                    h3 = h * 0.15;
                    y = h * 0.5 - h3 * 2.0 / 3.0;
                }
                painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                painter.beginPath();
                painter.moveTo(x1, y + h2);
                painter.lineTo(x2, y + h2);
                painter.stroke();
                painter.moveTo(x1 + h3, y + h2 * 0.5);
                painter.lineTo(x1, y + h2);
                painter.lineTo(x1 + h3, y + h2 * 1.5);
                painter.stroke();
                painter.moveTo(x1 + h3, y + 0);
                painter.lineTo(x2 - h3, y + 0);
                painter.stroke();
                painter.moveTo(x2 - h3 * 2, y + -h2 * 0.5);
                painter.lineTo(x2 - h3, y + 0);
                painter.lineTo(x2 - h3 * 2, y + h2 * 0.5);
                painter.stroke();
            }
            else if (symboltext == "󲇀" && this._nSymbolType == SymbolType.Arrow) {
                var h2 = h;
                var h3 = h;
                var h4 = 0;
                var y = 0;
                if (!drawtext) {
                    h2 = h * 0.35;
                    h3 = h * 0.15;
                    h4 = h2 * 0.25;
                    y = h * 0.5 - h3 * 2.0 / 3.0;
                }
                painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                painter.beginPath();
                painter.moveTo(x1 + h3 * 2, y + h2 * 1.5 - h4);
                painter.lineTo(x1 + h3, y + h2 - h4);
                painter.lineTo(x2 - h3, y + h2 - h4);
                painter.stroke();
                painter.moveTo(x1, y + h4);
                painter.lineTo(x2, y + h4);
                painter.lineTo(x2 - h3, y - h2 * 0.5 + h4);
                painter.stroke();
            }
            else if (symboltext == "󲆽" && this._nSymbolType == SymbolType.Arrow) {
                var h2 = h;
                var h3 = h;
                var h4 = 0;
                var y = 0;
                if (!drawtext) {
                    h2 = h * 0.35;
                    h3 = h * 0.15;
                    h4 = h2 * 0.25;
                    y = h * 0.5 - h3 * 2.0 / 3.0;
                }
                painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
                painter.beginPath();
                painter.moveTo(x1 + h3, y + h2 * 1.5 - h4);
                painter.lineTo(x1, y + h2 - h4);
                painter.lineTo(x2, y + h2 - h4);
                painter.stroke();
                painter.moveTo(x1 + h3, y + h4);
                painter.lineTo(x2 - h3, y + h4);
                painter.lineTo(x2 - h3 * 2, y + -h2 * 0.5 + h4);
                painter.stroke();
            }
            else {
                painter.scale(s_rect.width * 1.0 / symbolwidth, 1.0);
                painter.fillText(symboltext, baseline.x, 0.5 * baseline.y);
            }
            return true;
        };
        /**
         * @brief paintVStretch 垂直拉伸符号绘制
         * @param painter 绘制的CanvasRenderingContext2D
         * @param symboltext 绘制的符号内容
         * @param baseline 绘制的基准线
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlTextNode.prototype.paintVStretch = function (painter, symboltext, baseline, x_scaling, y_scaling) {
            if (x_scaling === void 0) { x_scaling = 1; }
            if (y_scaling === void 0) { y_scaling = 1; }
            //当垂直拉升比例小于1.5时不作处理
            if (y_scaling <= 1.5) {
                this._doublewidth = false;
                return false;
            }
            this._doublewidth = true;
            var s_rect = this.parent.parentRect;
            // if (this._ctx.font !== this.font.fontstring()) {
            //     this._ctx.font = this.font.fontstring();
            // }
            // let symbolwidth: number = painter.measureText(symboltext).width;
            // console.log(`~~~~symbolwidth`,symbolwidth,symboltext)
            var x1 = baseline.x + this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth * 4.0;
            // const x2:number = baseline.x+s_rect.width-this.font.pixelSize*EDStatic.g_draw_linewidth*1.0;
            var x2 = -baseline.x + s_rect.width + baseline.x - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth * 4.0;
            var y1 = 0 + this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0;
            var y2 = s_rect.height - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0;
            // const w:number = s_rect.width-this.font.pixelSize*EDStatic.g_draw_linewidth*2.0;
            var mid_y = (y1 + y2) / 2.0;
            var mid_x = (x1 + x2) / 2.0;
            // let xscale:number = 1;//s_rect.width/13.3203125; //40号字体大小下的宽度=13.3203125
            // const ychange:(y: number, mid_y:number) => number = (y:number, mid_y:number) => {
            //     let outy:number = y;
            //     if (y_scaling < EDStatic.g_v_stretchsize) {
            //         outy = (y+20-mid_y)*s_rect.height/40.0;
            //     } else {
            //         // if (y > mid_y) {
            //         //     outy = (y+20-mid_y)*this.font.pixelSize/40.0 +s_rect.height-this.font.pixelSize; 
            //         // } else {
            //         //     outy = (y+20-mid_y)*this.font.pixelSize/40.0;
            //         // }
            //         outy = (y+20-mid_y)*this.font.pixelSize*EDStatic.g_v_stretchsize/40.0;
            //         mid_y = (20)*this.font.pixelSize*EDStatic.g_v_stretchsize/40.0;
            //         if (outy > mid_y) {
            //             outy = outy+s_rect.height-this.font.pixelSize*EDStatic.g_v_stretchsize; 
            //         }
            //     }            
            //     return outy;
            // }
            //const w:number = s_rect.width;
            painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
            if (painter.font !== this.font.fontstring()) {
                painter.font = this.font.fontstring();
                //painter.lineCap="round";
                painter.lineJoin = "bevel";
            }
            if (painter.lineJoin != "bevel") {
                painter.lineJoin = "bevel";
            }
            if (painter.textBaseline !== 'middle') {
                painter.textBaseline = 'middle'; // bottom middle alphabetic
            }
            if (symboltext == "(") {
                var mid_tmpy = (y1 + y2) / 2.0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y1 + this.font.pixelSize * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0;
                }
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.bezierCurveTo(x1, y1, x1, mid_y, x1, mid_y);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y2 - (mid_y - y1);
                    painter.lineTo(x1, mid_y);
                }
                painter.bezierCurveTo(x1, mid_y, x1, y2, x2, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == ")") {
                var mid_tmpy = (y1 + y2) / 2.0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y1 + this.font.pixelSize * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0;
                }
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.bezierCurveTo(x2, y1, x2, mid_y, x2, mid_y);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y2 - (mid_y - y1);
                    painter.lineTo(x2, mid_y);
                }
                painter.bezierCurveTo(x2, mid_y, x2, y2, x1, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "{") {
                var mid_tmpy = (y1 + y2) / 4.0;
                var del_y = 0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_y = (y1 + this.font.pixelSize * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0) / 2.0;
                    mid_tmpy = del_y;
                }
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.bezierCurveTo(mid_x, y1, mid_x, mid_tmpy, mid_x, mid_tmpy);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_y = mid_tmpy - y1;
                    mid_tmpy = mid_y - del_y;
                    painter.lineTo(mid_x, mid_tmpy);
                }
                painter.bezierCurveTo(mid_x, mid_tmpy, mid_x, mid_y, x1, mid_y);
                mid_tmpy = (y1 + y2) * 3.0 / 4.0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = mid_y + del_y;
                }
                painter.bezierCurveTo(mid_x, mid_y, mid_x, mid_tmpy, mid_x, mid_tmpy);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y2 - del_y;
                    painter.lineTo(mid_x, mid_tmpy);
                }
                painter.bezierCurveTo(mid_x, mid_tmpy, mid_x, y2, x2, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "}") {
                var mid_tmpy = (y1 + y2) / 4.0;
                var del_y = 0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_y = (y1 + this.font.pixelSize * EdrawMathDate.EDStatic.g_v_stretchsize / 2.0 - this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth / 4.0) / 2.0;
                    mid_tmpy = del_y;
                }
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.bezierCurveTo(mid_x, y1, mid_x, mid_tmpy, mid_x, mid_tmpy);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    del_y = mid_tmpy - y1;
                    mid_tmpy = mid_y - del_y;
                    painter.lineTo(mid_x, mid_tmpy);
                }
                painter.bezierCurveTo(mid_x, mid_tmpy, mid_x, mid_y, x2, mid_y);
                mid_tmpy = (y1 + y2) * 3.0 / 4.0;
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = mid_y + del_y;
                }
                painter.bezierCurveTo(mid_x, mid_y, mid_x, mid_tmpy, mid_x, mid_tmpy);
                if (y_scaling > EdrawMathDate.EDStatic.g_v_stretchsize) {
                    mid_tmpy = y2 - del_y;
                    painter.lineTo(mid_x, mid_tmpy);
                }
                painter.bezierCurveTo(mid_x, mid_tmpy, mid_x, y2, x1, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "[") {
                var tmpx = (x1 + x2) * 1 / 3.0;
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.lineTo(tmpx, y1);
                painter.lineTo(tmpx, y2);
                painter.lineTo(x2, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "]") {
                var tmpx = (x1 + x2) * 2 / 3.0;
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.lineTo(tmpx, y1);
                painter.lineTo(tmpx, y2);
                painter.lineTo(x1, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "〈") {
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.lineTo(x1, mid_y);
                painter.lineTo(x2, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "〉") {
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.lineTo(x2, mid_y);
                painter.lineTo(x1, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "|") {
                painter.beginPath();
                painter.moveTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                //painter.closePath();
                painter.stroke();
                return true;
            }
            else if (symboltext == "‖") {
                var tmpx = (x1 + x2) * 2 / 3.0;
                painter.beginPath();
                painter.moveTo(tmpx, y1);
                painter.lineTo(tmpx, y2);
                painter.stroke();
                tmpx = (x1 + x2) / 3.0;
                painter.beginPath();
                painter.moveTo(tmpx, y1);
                painter.lineTo(tmpx, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⌊") {
                painter.beginPath();
                painter.moveTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.lineTo(x2, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⌋") {
                painter.beginPath();
                painter.moveTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.lineTo(x1, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⌈") {
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.lineTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⌉") {
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.lineTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⟦") {
                painter.beginPath();
                painter.moveTo(x2, y1);
                painter.lineTo(x1, y1);
                painter.lineTo(x1, y2);
                painter.lineTo(x2, y2);
                painter.stroke();
                painter.beginPath();
                painter.moveTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.stroke();
                return true;
            }
            else if (symboltext == "⟧") {
                painter.beginPath();
                painter.moveTo(x1, y1);
                painter.lineTo(x2, y1);
                painter.lineTo(x2, y2);
                painter.lineTo(x1, y2);
                painter.stroke();
                painter.beginPath();
                painter.moveTo(mid_x, y1);
                painter.lineTo(mid_x, y2);
                painter.stroke();
                return true;
            }
            /*
            if (symboltext == "(") {
                xscale = s_rect.width/13.3203125; //40号字体大小下的宽度=13.3203125
                painter.save();
                painter.beginPath();
                painter.lineWidth = 0.0001;
                let max_y:number=0;
                let min_y:number=99999;
                let max_x:number=0;
                let min_x:number=99999;
                EDStatic.g_path_x28.forEach((value , key) => {
                    for(let point of key) {
                        if (point.x > max_x) {
                            max_x = point.x;
                        }
                        if (point.x < min_x) {
                            min_x = point.x;
                        }
                        if (point.y > max_y) {
                            max_y = point.y;
                        }
                        if (point.y < min_y) {
                            min_y = point.y;
                        }
                    }
                });
                const mid_x = (max_x+min_x)*0.5;
                const mid_y = (max_y+min_y)*0.5;
                // console.log(`~~~~mid_y = `,mid_y);

                EDStatic.g_path_x28.forEach((value , key) => {
                    if (value == 'MoveTo') {
                        painter.stroke();
                        painter.beginPath();
                        painter.moveTo(key[0].x*xscale, ychange(key[0].y,mid_y));
                    } else if (value == 'LineTo') {
                        painter.lineTo(key[0].x*xscale, ychange(key[0].y,mid_y));
                    } else if (value == 'CurveTo') {
                        painter.bezierCurveTo(key[0].x*xscale, ychange(key[0].y,mid_y),
                        key[1].x*xscale, ychange(key[1].y,mid_y),
                        key[2].x*xscale, ychange(key[2].y,mid_y));
                    }
                    // console.log(`~~~~(:`,value);
                });
                painter.closePath();
                painter.stroke();
                painter.fill();
                painter.restore();
                // painter.moveTo(x2, y1);
                // painter.arc(x2,y1+w,w,1.5*Math.PI,1*Math.PI,true)
                // painter.lineTo(x1,y2-w);
                // painter.arc(x2,y2-w,w,1*Math.PI,0.5*Math.PI,true);
                // //painter.closePath();
                // painter.stroke();
                return true;
            } else if (symboltext == ")") {
                xscale = s_rect.width/13.3203125; //40号字体大小下的宽度=13.3203125
                painter.save();
                painter.beginPath();
                painter.lineWidth = 0.0001;
                let max_y:number=0;
                let min_y:number=99999;
                let max_x:number=0;
                let min_x:number=99999;
                EDStatic.g_path_x28.forEach((value , key) => {
                    for(let point of key) {
                        if (point.x > max_x) {
                            max_x = point.x;
                        }
                        if (point.x < min_x) {
                            min_x = point.x;
                        }
                        if (point.y > max_y) {
                            max_y = point.y;
                        }
                        if (point.y < min_y) {
                            min_y = point.y;
                        }
                    }
                });
                const mid_x = (max_x+min_x)*0.5;
                const mid_y = (max_y+min_y)*0.5;

                EDStatic.g_path_x29.forEach((value , key) => {
                    if (value == 'MoveTo') {
                        painter.stroke();
                        painter.beginPath();
                        painter.moveTo(key[0].x*xscale, ychange(key[0].y,mid_y));
                    } else if (value == 'LineTo') {
                        painter.lineTo(key[0].x*xscale, ychange(key[0].y,mid_y));
                    } else if (value == 'CurveTo') {
                        painter.bezierCurveTo(key[0].x*xscale, ychange(key[0].y,mid_y),
                        key[1].x*xscale, ychange(key[1].y,mid_y),
                        key[2].x*xscale, ychange(key[2].y,mid_y));
                    }
                });
                painter.closePath();
                painter.stroke();
                painter.fill();
                painter.restore();
                return true;
            } else*/
            return false;
        };
        return EDMmlTextNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlTextNode = EDMmlTextNode;
    var EDMmlMoNode = /** @class */ (function (_super) {
        __extends(EDMmlMoNode, _super);
        function EDMmlMoNode(document, attribute_map) {
            var _this = _super.call(this, EDMathMlNodeType.MoNode, document, attribute_map) || this;
            _this._oper_spec = null;
            _this._lspace = -1;
            _this._rspace = -1;
            return _this;
        }
        Object.defineProperty(EDMmlMoNode.prototype, "lspace", {
            /**
             * @brief lspace 获取在属性图中匹配"lspace"的结果值
             * @return 返回结果值
             */
            get: function () {
                if (this._lspace !== -1) {
                    return this._lspace;
                }
                if (this._oper_spec == null) {
                    console.log("error: _oper_spec is null. ".concat(this));
                    return 0;
                }
                if (this.parent == null
                    || (this.parent.nodeType !== EDMathMlNodeType.MrowNode
                        && this.parent.nodeType !== EDMathMlNodeType.MfencedNode
                        && this.parent.nodeType !== EDMathMlNodeType.UnknownNode)
                    || this.previousSibling == null
                    || (this.previousSibling == null && this.nextSibling == null)) {
                    return 0.0; //this.font.pixelSize*EDStatic.g_node_space*0.5;
                }
                else {
                    return this.interpretSpacing(this.dictionaryAttribute('lspace'), [false]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMoNode.prototype, "rspace", {
            /**
             * @brief rspace 获取在属性图中匹配"rspace"的结果值
             * @return 返回结果值
             */
            get: function () {
                if (this._rspace !== -1) {
                    return this._rspace;
                }
                if (this._oper_spec == null) {
                    console.log("error: _oper_spec is null. ".concat(this));
                    return 0;
                }
                if (this.parent == null
                    || (this.parent.nodeType !== EDMathMlNodeType.MrowNode
                        && this.parent.nodeType !== EDMathMlNodeType.MfencedNode
                        && this.parent.nodeType !== EDMathMlNodeType.UnknownNode)
                    // || nextSibling() == 0 // 屏蔽 修正")"右空间
                    || (this.previousSibling == null && this.nextSibling == null)) {
                    return 0.0; //this.font.pixelSize*EDStatic.g_node_space*0.5;
                }
                else {
                    return this.interpretSpacing(this.dictionaryAttribute('rspace'), [false]);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMoNode.prototype, "stretch", {
            /**
             * @brief getStretch 获取操作符的拉伸属性
             * @return 获取的结果值，输出位EDMmlOperSpec::StretchDir
             */
            get: function () {
                return this._oper_spec.stretch_dir;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMoNode.prototype, "operSpec", {
            /**
             * @brief getOperSpec 获取操作规格
             * @return 获取的结果值，输出位EDMmlOperSpec
             */
            get: function () {
                return this._oper_spec;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief dictionaryAttribute 匹配此节点所在父节点中，MstyleNode节点属性图中name对应的value
         * @param name 需要匹配的name值
         * @return 匹配得到的value值
         */
        EDMmlMoNode.prototype.dictionaryAttribute = function (name) {
            // 匹配此节点所在父节点中，MstyleNode节点属性图中name对应的value
            var p = this;
            for (; p != null; p = p.parent) {
                if (p === this || p.nodeType === EDMathMlNodeType.MstyleNode) {
                    var expl_attr = p.explicitAttribute(name);
                    if (null != expl_attr) {
                        return expl_attr;
                    }
                }
            }
            return EdrawMathDate.EDStatic.mmlDictAttribute(name, this._oper_spec);
        }; /**
         * @brief stretch 拉伸函数，如果当前节点没有同级节点且其父节点为mrow且节点规格设置了拉伸属性，则进行拉伸，填充满其父节点的矩形
         */
        EDMmlMoNode.prototype.nodeStretch = function () {
            if (this.parent == null) {
                return;
            }
            if (this._oper_spec == null) {
                return;
            }
            if (this._oper_spec.stretch_dir === StretchDir.HStretch
                && this.parent.nodeType === EDMathMlNodeType.MrowNode
                && (this.previousSibling != null || this.nextSibling != null)) {
                return;
            }
            var pmr = this.parent.myRect;
            var pr = this.parentRect;
            switch (this._oper_spec.stretch_dir) {
                case StretchDir.VStretch:
                    // let stretch:boolean = false;
                    this.parent.noneditable4child = false;
                    var b = [false, false];
                    this.parent.checkSpecialType_2(b);
                    var h = pr.height;
                    // if (this.nextSibling) {
                    //     // console.log(`~~~~~~nextSibling`,this.nextSibling.noneditable,this.nextSibling.childhasMtable(),this.nextSibling);
                    //     if(this.nextSibling.noneditable ){
                    //         console.log(`~~~~~~nextSibling`,this.nextSibling);
                    //         // &&this.nextSibling.childhasMtable()){
                    //         // stretch = true;
                    //         // this.nextSibling.updateMyRect();
                    //         h = this.nextSibling.myRect.height;
                    //         // if (h != pr.height) {
                    //         //    this.stretchTo( new egRect( pr.left(), pmr.top(), pr.width, h ) ); 
                    //         //    break;
                    //         // }
                    //     }
                    // }
                    // if (this.previousSibling){// && !stretch) {
                    //     // console.log(`~~~~~~previousSibling`,this.previousSibling.noneditable, this.previousSibling.hasMtable([]),this.previousSibling);
                    //     if(this.previousSibling.noneditable ){
                    //         console.log(`~~~~~~previousSibling`,this.previousSibling);
                    //         // &&this.previousSibling.childhasMtable()){
                    //         // stretch = true;
                    //         // this.previousSibling.updateMyRect();
                    //         if (h < this.previousSibling.myRect.height) {
                    //             h = this.previousSibling.myRect.height;
                    //         }
                    //         // if (h != pr.height) {
                    //         //     this.stretchTo( new egRect( pr.left(), pmr.top(), pr.width, h ) );
                    //         //     break;                                
                    //         // }
                    //     }
                    // }                        
                    if (b[1]) {
                        this.stretchTo(new egRect(pr.left(), pmr.top(), pr.width, pmr.height));
                    }
                    // if (h != pr.height) {
                    //     this.stretchTo( new egRect( pr.left(), pmr.top(), pr.width, h ) );
                    //     break;                                
                    // }
                    break;
                case StretchDir.HStretch:
                    // console.log(`nodeStretch HStretch${this.text()}\n`);
                    if (this.nodeType == EDMathMlNodeType.MoNode && this.symbolType == SymbolType.Arrow
                        && (this.parent.nodeType == EDMathMlNodeType.MoverNode
                            || this.parent.nodeType == EDMathMlNodeType.MunderNode)) {
                        if (this.parent.firstChild != this
                            && this.parent.firstChild.symbolType === SymbolType.Arrow) {
                            //console.log(`arrowtype`,this.text);
                            this.stretchTo(new egRect(pmr.left() + pmr.width / 4.0, pr.y, pmr.width / 2.0, pr.height));
                            break;
                        }
                    }
                    this.stretchTo(new egRect(pmr.left(), pr.y, pmr.width, pr.height));
                    break;
                case StretchDir.HVStretch:
                    this.stretchTo(pmr);
                    break;
                case StretchDir.NoStretch:
                    break;
            }
        }; /**
         * @brief toStr 导出节点数据，将节点的一些常用属性转化为QString导出
         * @return 节点数据的QString输出
         */
        EDMmlMoNode.prototype.toStr = function () {
            // 新增节点数据导出为QString
            var str = _super.prototype.toStr.call(this);
            return "str form = ".concat(this.form, "\n");
        }; /**
         * @brief toMoNode 获取操作符节点的指针，对当前节点进行判断，如果是操作符节点则返回当前指针，否则为nullptr
         * @return 返回的节点指针
         */
        EDMmlMoNode.prototype.toMoNode = function () {
            return this;
        };
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 脚本值节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlMoNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            // 遍历子返回子节点的脚本等级
            var sl = _super.prototype.scriptlevel.call(this);
            // if (this._oper_spec == null) {
            //    return sl;
            // }
            return sl;
        };
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin，设置当前节点的操作规格_oper_spec
         */
        EDMmlMoNode.prototype.layoutSymbol = function () {
            // 初始化子节点的相对坐标并设置操作符规格
            if (this.firstChild == null) {
                return;
            }
            if (this._oper_spec == null) {
                this._oper_spec = EdrawMathDate.EDStatic.mmlFindOperSpec(this.text, this.form());
                // console.log(`layoutSymbol() ${this.text()} ${this._oper_spec.name}\n`)
                var largeop = this.dictionaryAttribute('largeop');
                // console.log(`mmlFindOperSpec ${this.text()} ${largeop}\n`);
                if (largeop === 'true' && this.parent.nodeType !== EDMathMlNodeType.MrowNode) {
                    // && (this.parent.nodeType == EDMathMlNodeType.MunderNode
                    // ||this.parent.nodeType == EDMathMlNodeType.MoverNode
                    // ||this.parent.nodeType == EDMathMlNodeType.MunderoverNode
                    // ||this.parent.nodeType == EDMathMlNodeType.MsubNode
                    // ||this.parent.nodeType == EDMathMlNodeType.MsupNode
                    // ||this.parent.nodeType == EDMathMlNodeType.MsubsupNode)) {
                    this.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                    console.log("".concat(this.text, " is largeop"));
                    this.updateChildFont();
                    // addmyAttrMap("largeop", "true");
                    // if (this.text() == "˙" || this.text() =="¨" || this.text() =="⃛" || this.text() =="⃜")
                    //    this.fontSizeLevel = 1.0/EDStatic.g_script_size_multiplier);
                }
                if (SymbolType.Normal !== this._oper_spec.symboltype) {
                    this.firstChild.symbolType = this._oper_spec.symboltype;
                    this.symbolType = this._oper_spec.symboltype;
                }
                this._lspace = this.lspace;
                this._rspace = this.rspace;
                if (this.parent != null) {
                    this.parent.updateFont();
                    this.parent.nodeLayout();
                }
            }
            this.firstChild.relOrigin = new egPoint(0.0, 0.0);
        }; /**
         * @brief symbolRect 获取符号矩形，在原绘制矩形的基础上左边+lspace，右边加rspace
         * @return 返回结果值，输出为QRectF
         */
        EDMmlMoNode.prototype.symbolRect = function () {
            if (this.firstChild == null) {
                return new egRect(0.0, 0.0, 0.0, 0.0);
            }
            var cmr = this.firstChild.myRect;
            // console.log(`mo lspace = ${this._lspace} rspace = ${this._rspace}\n`)
            return new egRect(-this._lspace, cmr.top(), cmr.width + this._lspace + this._rspace, cmr.height);
        }; /**
         * @brief form 获取表单类型，一共有三种：prefix用于打开栅栏(fences)，infix用于分隔符，postfix关闭围栏(fences)，详见FormType
         * @return 返回结果值，输出为FormType
         */
        EDMmlMoNode.prototype.form = function () {
            var value_str = this.inheritAttributeFromMrow('form'); // 匹配form值
            if (null != value_str) {
                var ok = [false];
                var value = EdrawMathDate.EDStatic.mmlInterpretForm(value_str, ok);
                if (ok[0]) {
                    return value;
                }
                else {
                    console.log("Could not convert ".concat(value_str, " to form"));
                }
            }
            // Default heuristic.//默认启发式
            if (this.firstSibling === this && this.lastSibling !== this) {
                return FormType.PrefixForm;
            }
            else if (this.lastSibling === this && this.firstSibling !== this) {
                return FormType.PostfixForm;
            }
            else {
                return FormType.InfixForm;
            }
        };
        return EDMmlMoNode;
    }(EdrawMathDate.EDMmlTokenNode));
    EdrawMathDate.EDMmlMoNode = EDMmlMoNode;
    var EDMmlMiNode = /** @class */ (function (_super) {
        __extends(EDMmlMiNode, _super);
        function EDMmlMiNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MiNode, document, attribute_map) || this;
        }
        return EDMmlMiNode;
    }(EdrawMathDate.EDMmlTokenNode));
    EdrawMathDate.EDMmlMiNode = EDMmlMiNode;
    var EDMmlMnNode = /** @class */ (function (_super) {
        __extends(EDMmlMnNode, _super);
        function EDMmlMnNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MnNode, document, attribute_map) || this;
        }
        return EDMmlMnNode;
    }(EdrawMathDate.EDMmlTokenNode));
    EdrawMathDate.EDMmlMnNode = EDMmlMnNode;
    var EDMmlMtextNode = /** @class */ (function (_super) {
        __extends(EDMmlMtextNode, _super);
        function EDMmlMtextNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MtextNode, document, attribute_map) || this;
        }
        return EDMmlMtextNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMtextNode = EDMmlMtextNode;
    var EDMmlMfracNode = /** @class */ (function (_super) {
        __extends(EDMmlMfracNode, _super);
        function EDMmlMfracNode(document, attribute_map) {
            var _this = _super.call(this, EDMathMlNodeType.MfracNode, document, attribute_map) || this;
            var expl_sl_str = _this.explicitAttribute('bevelled');
            if ('true' === expl_sl_str) {
                _this._bBevelled = true;
            }
            else {
                _this._bBevelled = false;
            }
            return _this;
        }
        Object.defineProperty(EDMmlMfracNode.prototype, "lineThickness", {
            /**
             * @brief lineThickness 根据设置的参数，获取线的粗细
             * @return 返回结果值
             */
            get: function () {
                var linethickness_str = this.inheritAttributeFromMrow('linethickness', (0.75 * this.lineWidth).toString());
                if (linethickness_str.toFloat() < 1) {
                    // TS版最小单位为1
                    return 1;
                }
                if (linethickness_str === '0.75') {
                    return this.lineWidth;
                }
                /* InterpretSpacing returns a qreal, which might be 0 even if the thickness     //InterpretSpacing返回一个qreal，即使厚度> 0，也可能为0，尽管非常小。 没关系，因为我们可以将它设置为1。
                   is > 0, though very very small. That's ok, because we can set it to 1.
                   However, we have to run this check if the line thickness really is zero */ // 但是，如果线条厚度真的为零，我们必须执行此检查
                if (0 !== linethickness_str.toFloat()) {
                    var ok = [false];
                    var line_thickness = this.interpretSpacing(linethickness_str, ok);
                    if (!ok[0] || 0 !== line_thickness) {
                        line_thickness = 1.0;
                    }
                    return line_thickness;
                }
                else {
                    return 0;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMfracNode.prototype, "numerator", {
            /**
             * @brief numerator 获取分子节点，在标准格式中为<mfrac>节点下的第一个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                if (this.firstChild == null) {
                    console.log("error: EDMmlMfracNode.numerator is null.\n");
                    return null;
                }
                return this.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlMfracNode.prototype, "denominator", {
            /**
             * @brief denominator 获取分母节点，在标准格式中为<mfrac>节点下的第二个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                if (this.numerator.nextSibling == null) {
                    console.log("error: EDMmlMfracNode.denominator is null.\n");
                    return null;
                }
                return this.numerator.nextSibling;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlMfracNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            var num = this.numerator;
            num.appendEduStr(str, edudata);
            str[0] = str[0] + "/";
            var denom = this.denominator;
            denom.appendEduStr(str, edudata);
        };
        /** 当childIndex=1时对其进行渲染 无效果
         * @brief layoutHook is called before layout function of each child is called.//在调用每个子项的布局函数之前调用layoutHook。
         * Subclasses can therefore intercept the layout functions of their the childs//因此子类可以拦截他们孩子的布局功能
         * @param childIndex the child index of the childs                            //childIndex孩子的子索引
         */
        EDMmlMfracNode.prototype.layoutHook = function (childIndex) {
            if (childIndex === 1) {
                this._document.appendRenderingData(this._nodeId, childIndex, this, EDRendAdjustBits.Nothing);
            }
        }; /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 对子节点的脚本等级进行修正，使其同级节点的脚本等级统一
         * @return 返回结果值
         */
        EDMmlMfracNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            return _super.prototype.scriptlevel.call(this);
        }; /// **
        // * @brief setScriptlevel 设置脚本级别，脚本等级主要控制字体大小，数值越大字体越小
        // * @param scriptup 脚本等级是否+1
        // */
        // void setScriptlevel(bool scriptup){_bScriptup = scriptup;}
        /**
         * @brief layoutSymbol 布局符号，对分子节点、分母节点进行设置相对原点坐标
         */
        EDMmlMfracNode.prototype.layoutSymbol = function () {
            var num = this.numerator;
            var denom = this.denominator;
            var nu_rect = num.myRect; // 分子节点的绘制矩形
            var deno_rect = denom.myRect; // 分母节点的绘制矩形
            // 间距 = 分数间距 *（分子节点矩形的高+分母节点矩形的高）
            var spacing = 0;
            if (this._document.defaultMode) {
                spacing = EdrawMathDate.EDStatic.g_mfrac_spacing * (nu_rect.height + deno_rect.height); // 修改
            }
            var line_thickness = this.lineThickness; // 获取线的粗细的最小整数
            if (!this._bBevelled) {
                // 设置分子的相对原点 x = -0.5*绘制矩形的宽度，y = -间距-绘制矩形的底-0.5*线宽
                num.relOrigin = new egPoint(-0.5 * nu_rect.width, -spacing - nu_rect.bottom() - 3.0 * line_thickness);
                // 设置分母的相对原点 x = -0.5*绘制矩形的宽度，y = -间距-绘制矩形的顶+0.5*线宽
                denom.relOrigin = new egPoint(-0.5 * deno_rect.width, spacing - deno_rect.top() + 3.0 * line_thickness);
            }
            else {
                // num->setRelOrigin( QPointF(-nu_rect.width()-0.5*symbolRect().width(), - nu_rect.center().y()) );
                // denom->setRelOrigin( QPointF(0.5*symbolRect().width(), deno_rect.center().y()) );
                num.relOrigin = new egPoint(-nu_rect.width, -nu_rect.bottom());
                denom.relOrigin = new egPoint(/*this.symbolRect().width*/ 0, -deno_rect.top());
            }
        }; /**
         * @brief paintSymbol 绘图符号，绘制分数线
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlMfracNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            _super.prototype.paintSymbol.call(this, painter, x_scaling, y_scaling, outputPng);
            var line_thickness = this.lineThickness;
            if (line_thickness !== 0.0) {
                painter.save();
                var lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier > 1 ? this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier : 1;
                if (painter.lineWidth !== lineWidth) {
                    painter.lineWidth = lineWidth;
                }
                if (painter.strokeStyle !== 'rgb(0, 0, 0)') {
                    // painter.strokeStyle = 'rgb(0, 0, 0)';
                }
                // painter->setRenderHint( QPainter::Antialiasing, true );//抗锯齿
                var s_rect = this.symbolRect(); // 获取分号的绘制矩形
                s_rect.moveTopLeft(this.devicePoint(s_rect.topLeft()));
                var rect = s_rect;
                this._document.updateRenderingData(this._nodeId, 1, rect);
                painter.save();
                if (!this._bBevelled) {
                    // 绘制分号
                    // const p1: egPoint = new egPoint( s_rect.left() + 0.5 * line_thickness, s_rect.center().y );
                    // const p2: egPoint = new egPoint( s_rect.right() - 0.5 * line_thickness, s_rect.center().y );
                    var p1 = new egPoint(s_rect.left() + 0.1 * this.font.pixelSize, s_rect.center().y);
                    var p2 = new egPoint(s_rect.right() - 0.1 * this.font.pixelSize, s_rect.center().y);
                    painter.beginPath();
                    painter.moveTo(p1.x, p1.y);
                    painter.lineTo(p2.x, p2.y);
                    painter.closePath();
                    painter.stroke();
                }
                else {
                    // const p1: egPoint = new egPoint( s_rect.right(), this.deviceRect.top() );
                    // const p2: egPoint = new egPoint( s_rect.left(), this.deviceRect.bottom() );
                    // painter.beginPath();
                    // painter.moveTo(p2.x, p2.y);
                    // painter.lineTo(p1.x, p1.y );
                    // painter.closePath();
                    // painter.stroke();
                    if (this._ctx.font !== this.font.fontstring()) {
                        this._ctx.font = this.font.fontstring();
                    }
                    var drect = this.deviceRect;
                    var nu_rect = this.numerator.myRect; // 分子节点的绘制矩形
                    var deno_rect = this.denominator.myRect; // 分母节点的绘制矩形
                    var ddrect = this.denominator.deviceRect;
                    var w = this._ctx.measureText('0').width;
                    var tan = w * 1.0 / this.font.pixelSize;
                    var w1 = (0 - deno_rect.height) * tan;
                    var w2 = (nu_rect.height - 0) * tan;
                    var p1 = new egPoint(ddrect.x + w2, drect.top());
                    var p2 = new egPoint(ddrect.x + w1, drect.bottom());
                    painter.beginPath();
                    painter.moveTo(p2.x, p2.y);
                    painter.lineTo(p1.x, p1.y);
                    painter.closePath();
                    painter.stroke();
                }
                painter.restore();
            }
        }; /**
         * @brief symbolRect 获取符号矩形，根据分子节点、分母节点的绘制矩形大小确定分数节点的矩形大小
         * @return 返回结果值，输出为QRectF
         */
        EDMmlMfracNode.prototype.symbolRect = function () {
            var nu_rect = this.numerator.myRect; // 分子节点的绘制矩形
            var deno_rect = this.denominator.myRect; // 分母节点的绘制矩形
            // 间距 = 分数间距 *（分子节点矩形的高+分母节点矩形的高）
            var spacing = EdrawMathDate.EDStatic.g_mfrac_spacing * (nu_rect.height + deno_rect.height);
            // 宽度 = 分子和分母中宽度的较大值+2.0*分数间距
            var my_width = nu_rect.width;
            if (deno_rect.width - nu_rect.width > 0) {
                my_width = deno_rect.width;
            }
            my_width = my_width + 2.0 * spacing;
            var line_thickness = this.lineThickness; // 获取线的粗细的最小整数
            // x = -0.5*(宽度+线宽)
            // y = -0.5*线粗
            // width = 宽度+线宽
            // height = 线宽
            // 此矩形仅仅为分数线的矩形
            if (!this._bBevelled) {
                return new egRect(-0.5 * (my_width + line_thickness), -0.5 * line_thickness, my_width + line_thickness, line_thickness);
            }
            else {
                // const br: egRect = new egRect(0, 0,  this._ctx.measureText('/').width,  this.font.pixelSize );
                // let my_height: number = nu_rect.height;
                // if ( deno_rect.height - nu_rect.height > 0) {
                //     my_height = deno_rect.height;
                // }
                // const scale: number = my_height / br.height;
                // return new egRect(0, 0.5 * br.y * scale, br.width * scale, br.height * scale);
                var br = nu_rect.unite(deno_rect);
                if (this._ctx.font !== this.font.fontstring()) {
                    this._ctx.font = this.font.fontstring();
                }
                var w = this._ctx.measureText('0').width;
                var tan = w * 1.0 / this.font.pixelSize;
                var w1 = (0 - deno_rect.height) * tan;
                var w2 = (nu_rect.height - 0) * tan;
                // return new egRect(- w2, this.deviceRect.top(), w1, this.deviceRect.height);
                return new egRect(w1, this.denominator.deviceRect.top(), w2 - w1, 1);
                ;
            }
        };
        return EDMmlMfracNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlMfracNode = EDMmlMfracNode;
    var EDMmlRootBaseNode = /** @class */ (function (_super) {
        __extends(EDMmlRootBaseNode, _super);
        function EDMmlRootBaseNode(type, document, attribute_map) {
            return _super.call(this, type, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlRootBaseNode.prototype, "base", {
            /**
             * @brief base 获取根号内的节点，标准格式下为<root>的第一个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                return this.firstChild;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlRootBaseNode.prototype, "index", {
            /**
             * @brief index 获取索引值的节点，标值格式下为<root>的第二个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 获取第二个子节点
                var b = this.base;
                if (b == null) {
                    return null;
                }
                return b.nextSibling;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child 根号节点的索引值节点的脚本等级是父节点的脚本等级+1
         * @return 返回结果值
         */
        EDMmlRootBaseNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            // 获取子节点的脚本等级
            var sl = _super.prototype.scriptlevel.call(this);
            var i = this.index;
            if (child != null && child === i) {
                return sl + 1;
            }
            else {
                return sl;
            }
        };
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlRootBaseNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            str[0] = str[0] + "(";
            var base = this.base;
            base.appendEduStr(str, edudata);
            str[0] = str[0] + ")^(1.0/";
            var index = this.index;
            if (index != null) {
                var tmp = str[0];
                index.appendEduStr(str, edudata);
                var indexstr = str[0].replace(tmp, '');
                var result = math.simplify(math.parse(indexstr)).toString();
                try {
                    var mathresult = math.eval(result).toString().toFloat();
                    if (!isNaN(mathresult) && edudata != null) {
                        edudata.rootnum.push(mathresult);
                        //if (mathresult%2 == 1) {
                        //   hascomplex[0] = true; 
                        //}
                    }
                    //console.log(`indexstr = ${result}, num = ${mathresult}, % = ${mathresult%2} hascomplex=${hascomplex[0]}`)
                    str[0] = str[0] + ")";
                }
                catch (exception) {
                    console.log(exception);
                    str[0] = str[0] + ")";
                }
            }
            else {
                str[0] = str[0] + "2)";
            }
        };
        /**
         * @brief layoutSymbol 布局符号，对根号内节点、索引值点进行设置相对原点坐标
         */
        EDMmlRootBaseNode.prototype.layoutSymbol = function () {
            var b = this.base;
            // QRectF base_rect = baseRect();//基值的绘制矩形，即根号内文本的绘制矩形
            // qreal radical_margin = radicalMargin();//根号幅度，即根号内文本的绘制矩形的高度*根基边缘
            // int radical_line_width = qCeil( radicalLineWidth() );//根号线宽
            // qreal height = base_rect.height() + radical_line_width + 1.0* radical_margin;
            // qreal by = 0.0;
            // if (height < radicalRect().height())
            //    by = radicalRect().height() - height;
            if (b != null) {
                b.relOrigin = new egPoint(0.0, 0.0);
            }
            // 索引值矩形a的位置相对于根号矩形b位置，计算结果大致是a再b的左上1/4区域(下面公式是x1.1，稍微再往上移一些)，
            // 再向左平移半个b的宽度(下面公式是x0.6)，再向左平移一个a的宽度
            var i = this.index;
            if (i != null) {
                var i_rect = i.myRect;
                // i->setRelOrigin( QPointF( -0.6 * radicalRect().width() - i_rect.width(),
                //                          -1.1 * i_rect.bottom() ) );//radicalRect()是"∛"的绘制矩形
                //i.relOrigin = new egPoint( -0.35 * this.radicalRect().width - i_rect.width,
                //                          this.symbolRect().top() ); // + i_rect.height()*0.5) );//zq 修改
                i.relOrigin = new egPoint(-0.35 * this.radicalRect().width - i_rect.width, this.symbolRect().center().y - i_rect.height * 0.5); // + i_rect.height()*0.5) );//zq 修改
            }
        };
        /**
         * @brief paintSymbol 绘图符号，根据g_radical_points[]绘制根号
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值
         * @param y_scaling y坐标缩放值
         */
        EDMmlRootBaseNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            _super.prototype.paintSymbol.call(this, painter, x_scaling, y_scaling, outputPng);
            painter.save();
            painter.lineWidth = this.font.pixelSize * EdrawMathDate.EDStatic.g_draw_linewidth;
            var s_rect = this.symbolRect();
            s_rect.moveTopLeft(this.devicePoint(s_rect.topLeft()));
            var radical_rect = this.radicalRect();
            var rect = new egRect(s_rect.x, s_rect.y, s_rect.width, s_rect.height);
            // rect.adjust(  0.0, this.radicalLineWidth() ,
            //              -(rect.width - radical_rect.width ), 0.0 ); // 取根号左半部分矩形？
            painter.translate(rect.left(), rect.bottom());
            //根据根号图形绘制
            var radical_points = [];
            for (var i = 0; i < EdrawMathDate.EDStatic.g_radical_points_size; ++i) {
                radical_points.push(new egPoint(radical_rect.width * EdrawMathDate.EDStatic.g_radical_points[i].x, -rect.height * EdrawMathDate.EDStatic.g_radical_points[i].y));
            }
            var x2 = radical_points[2].x;
            var y2 = radical_points[2].y;
            var x3 = radical_points[3].x;
            var y3 = radical_points[3].y;
            radical_points[4].x = s_rect.width;
            radical_points[5].x = s_rect.width;
            radical_points[3].y = -s_rect.height;
            radical_points[4].y = -s_rect.height;
            var new_y3 = radical_points[3].y;
            radical_points[3].x = x2 + (x3 - x2) * 1.0 * (new_y3 - y2) / (y3 - y2); // 根号终点坐标，即最右端
            if (painter.strokeStyle !== 'rgb(0, 0, 0)') {
                // painter.strokeStyle = 'rgb(0, 0, 0)';
            }
            painter.lineWidth = 1;
            painter.beginPath();
            painter.moveTo(radical_points[0].x, radical_points[0].y);
            for (var i = 1; i < radical_points.length; ++i) {
                painter.lineTo(radical_points[i].x, radical_points[i].y);
                // console.log(`mroot lineTo = ${i}: (${radical_points[i].x}, ${radical_points[i].y})\n`);
            }
            painter.closePath();
            painter.stroke();
            painter.fill();
            // painter->drawPolygon( radical_points, EDStatic::g_radical_points_size );
            painter.restore();
        };
        /**
         * @brief symbolRect 获取符号矩形
         * @return 返回结果值，输出为QRectF
         */
        EDMmlRootBaseNode.prototype.symbolRect = function () {
            var base_rect = this.baseRect(); // 基值的绘制矩形，即根号内文本的绘制矩形
            var radical_margin = this.radicalMargin(); // 根号幅度，即根号内文本的绘制矩形的高度*根基边缘
            var radical_width = this.radicalRect().width; // 根号绘制矩形的宽，即"∛"的绘制矩形的宽度
            var radical_line_width = this.radicalLineWidth(); // 根号线宽
            // x = -根号绘制矩形的宽，即x坐标为基值绘制矩形的x？
            // y = 基值的绘制矩形的y-根号幅度-根号线宽，即y坐标为基值绘制矩形的y？
            // width = 根号绘制矩形的宽+基值绘制矩形的宽+根号幅度
            // height = 基值绘制矩形的高+2*根号幅度+根号线宽
            // 在基值绘制矩形的上方+根号线宽+根号幅度，下方+根号幅度，右方+根号幅度，左方+根号矩形
            var height = base_rect.height + radical_line_width + 1.0 * radical_margin;
            var by = 0.0;
            // 屏蔽
            // if (height < this.radicalRect().height) {
            //     by = this.radicalRect().height - height;
            //     height = this.radicalRect().height;
            // }
            return new egRect(-radical_width, base_rect.top() - 1.0 * radical_margin - radical_line_width - by, radical_width + base_rect.width, height);
        };
        /**
         * @brief baseRect 获取根号内文本的绘制矩形
         * @return 返回结果值，输出为QRectF
        */
        EDMmlRootBaseNode.prototype.baseRect = function () {
            var b = this.base;
            if (b == null) { // in case of a sqrt without an element or with an unvisible element, choose to render the rect of a "0"
                // 在没有元素或不可见元素的情况下，选择渲染矩形的“0”
                if (this._ctx.font !== this.font.fontstring()) {
                    this._ctx.font = this.font.fontstring();
                }
                var br = new egRect(0, this.basePos(), this._ctx.measureText('0').width, this.font.pixelSize);
                return br;
            }
            else {
                return b.myRect;
            }
        };
        /**
         * @brief radicalRect 获取∛的绘制矩形
         * @return 返回结果值，输出为QRectF
         */
        EDMmlRootBaseNode.prototype.radicalRect = function () {
            // 获取∛的绘制矩形
            if (this._ctx.font !== this.font.fontstring()) {
                this._ctx.font = this.font.fontstring();
            }
            return new egRect(0, this.basePos(), this._ctx.measureText('∛').width, this.font.pixelSize); // &#x221B;
        };
        /**
         * @brief radicalMargin 获取根号的幅度,大小为 根基边缘 * 根号内文本的绘制矩形的高
         * @return 返回结果值
         */
        EDMmlRootBaseNode.prototype.radicalMargin = function () {
            // 根号幅度 = 根基边缘 * 基值绘制矩形的高
            return EdrawMathDate.EDStatic.g_mroot_base_margin * this.baseRect().height;
        };
        /**
         * @brief radicalLineWidth 获取根号的线宽,大小为 根基线 * 线宽
         * @return 返回结果值
         */
        EDMmlRootBaseNode.prototype.radicalLineWidth = function () {
            // 根号线宽 = 根基线 * 线宽
            return EdrawMathDate.EDStatic.g_mroot_base_line * this.lineWidth;
        };
        return EDMmlRootBaseNode;
    }(EdrawMathDate.EDMmlNode));
    EdrawMathDate.EDMmlRootBaseNode = EDMmlRootBaseNode;
    var EDMmlMrootNode = /** @class */ (function (_super) {
        __extends(EDMmlMrootNode, _super);
        function EDMmlMrootNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MrootNode, document, attribute_map) || this;
        }
        return EDMmlMrootNode;
    }(EDMmlRootBaseNode));
    EdrawMathDate.EDMmlMrootNode = EDMmlMrootNode;
    var EDMmlMsqrtNode = /** @class */ (function (_super) {
        __extends(EDMmlMsqrtNode, _super);
        function EDMmlMsqrtNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MsqrtNode, document, attribute_map) || this;
        }
        return EDMmlMsqrtNode;
    }(EDMmlRootBaseNode));
    EdrawMathDate.EDMmlMsqrtNode = EDMmlMsqrtNode;
})(EdrawMathDate || (EdrawMathDate = {}));
