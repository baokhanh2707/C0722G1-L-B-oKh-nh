// 节点数据结构，
// 里面包含了节点的所有数据，
// 说明：不建议直接修改数据，可通过中、上层接口来修改节点数据
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
    var EDMmlNode = /** @class */ (function () {
        function EDMmlNode(type, document, attribute_map) {
            this._parent = null;
            this._first_child = null;
            this._next_sibling = null;
            this._previous_sibling = null;
            this._node_type = type;
            this._document = document;
            this._ctx = document.ctx;
            this._attribute_map = attribute_map;
            this._parent_rect = new egRect(0.0, 0.0, 0.0, 0.0);
            this._my_rect = new egRect(0.0, 0.0, 0.0, 0.0);
            this._rel_origin = new egPoint(0.0, 0.0);
            this._stretched = false;
            this._noneditable = false;
            this._nodeId = 0;
            this._color = "";
            this._background = '';
            this._bShowRect = false;
            this._fFontSizeLevel = 1;
            this._nSymbolType = SymbolType.Normal;
            this._bFontItalic = false;
            this._bFontBold = false;
            this._doublewidth = false;
            this._ele = null;
            this._mathcolor = "";
            //初始化字体数据
            var font_attr = EdrawMathDate.EDStatic.collectFontAttributes(this);
            if (this._node_type == EDMathMlNodeType.MoNode
                || this._node_type === EDMathMlNodeType.MnNode
                || this._node_type === EDMathMlNodeType.MtextNode) {
                this._bFontItalic = false;
                this._bFontBold = false;
            }
            if (!font_attr.has("mathvariant") && !font_attr.has("fontstyle")) {
                if (this._node_type === EDMathMlNodeType.MiNode) {
                    this._bFontItalic = this._document.miItalic;
                    this._bFontBold = this._document.miBold;
                }
                if (this._node_type === EDMathMlNodeType.MnNode) {
                    this._bFontItalic = this._document.mnItalic;
                    this._bFontBold = this._document.mnBold;
                }
            }
            if (font_attr.has("mathvariant")) {
                var mathvariant = font_attr.get("mathvariant");
                if (mathvariant.match("bold") != null) {
                    this._bFontBold = true;
                }
                else {
                    this._bFontBold = false;
                }
                if (mathvariant.match("italic") != null) {
                    this._bFontItalic = true;
                }
                else {
                    this._bFontItalic = false;
                }
            }
            this._scriptlevel = -1; // scriptlevel();
            // If we are child of <merror> return red   //如果我们是<merror>的子节点则返回红色
            // const EDMmlNode *p = this;
            var error = false;
            // for ( ; p != 0; p = p->parent() ) {
            //    if ( p->nodeType() == EDMathMlNodeType::MerrorNode ) {
            //        _color = QColor( "red" );
            //        error = true;
            //    }
            // }
            if (!error) {
                // 匹配获取mathcolor值或者color值
                var value_str_1 = this.inheritAttributeFromMrow('mathcolor');
                if (value_str_1 == null) {
                    value_str_1 = this.inheritAttributeFromMrow('color');
                }
                if (value_str_1 == null) {
                    this._color = this._document.foregroundColor;
                }
                else {
                    this._mathcolor = value_str_1;
                    this._color = value_str_1;
                }
            }
            // 匹配获取mathbackground值或者background值
            var value_str = this.inheritAttributeFromMrow('mathbackground');
            if (value_str == null) {
                value_str = this.inheritAttributeFromMrow('background');
            }
            if (value_str == null) {
                this._background = this._document.backgroundColor;
            }
            else {
                this._background = value_str;
            }
            this.updateFont();
        }
        // virtual ~EDMmlNode();
        /**
         * @brief delete 删除本节点
         */
        EDMmlNode.prototype.delete = function () {
            if (null != this._ele) {
                if (null != this._ele.parentNode) {
                    if (this._ele.parentNode.contains(this._ele)) {
                        this._ele.parentNode.removeChild(this._ele);
                    }
                }
            }
            // 析构自己需要删除所有子节点
            var n = this._first_child;
            while (n != null) {
                var tmp = n.nextSibling;
                n.delete();
                n = tmp;
            }
            if (this.parent != null) {
                if (this.parent.firstChild === this) {
                    this.parent.firstChild = null;
                }
            }
            if (this.previousSibling != null) {
                if (this.previousSibling.nextSibling === this) {
                    this.previousSibling.nextSibling = null;
                }
            }
            if (this.nextSibling != null) {
                if (this.nextSibling.previousSibling === this) {
                    this.nextSibling.previousSibling = null;
                }
            }
            this.parent = null;
            this.previousSibling = null;
            this.nextSibling = null;
        };
        Object.defineProperty(EDMmlNode.prototype, "nodeType", {
            // Mml stuff
            /**
             * @brief nodeType 获取节点类型
             * @return 节点类型的EDMathMlNodeType输出
             */
            get: function () { return this._node_type; },
            enumerable: false,
            configurable: true
        });
        // 设置节点类型 屏蔽 不建议使用，如果修改了节点类型，其余相关的节点属性也需要设置，单独使用易出错
        // virtual void setNodeType(EDMathMlNodeType type){_node_type = type;}
        /** 调试使用
         * @brief toStr 导出节点数据，将节点的一些常用属性转化为QString导出
         * @return 节点数据的QString输出
         */
        EDMmlNode.prototype.toStr = function () {
            // 将节点的数据转换成QString输出
            var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(this._node_type);
            if (spec == null) {
                return " error: spec is null.".concat(this);
            }
            return "nodetype = ".concat(spec.type_str);
            /*
            return QString( "%1 %2 mr=%3 pr=%4 dr=%5 ro=(%7, %8) str=%9 tag=%10 childtype=%11 child_spe=%12 attr=%13" )
                .arg( spec->type_str )
                .arg( ( quintptr )this, 0, 16 )
                .arg( rectToStr( _my_rect ) )
                .arg( rectToStr( parentRect() ) )
                .arg( rectToStr( deviceRect() ) )
                .arg( _rel_origin.x() )
                .arg( _rel_origin.y() )
                .arg( ( int )_stretched )
                .arg( spec->tag )
                .arg( spec->child_types )
                .arg( spec->child_spec )
                .arg( spec->attributes );*/
        };
        Object.defineProperty(EDMmlNode.prototype, "relOrigin", {
            /**
             * @brief setRelOrigin 设置相对原点，效果为平移此节点的坐标位置
             * @param rel_origin 相对坐标，即此节点到其父节点的相对位置
             */
            set: function (rel_origin) {
                // 相对原点X=设置点的X-我的绘图矩形的X,其中文本绘图矩形x=0，非文本矩形，比如frac，sqrt等x!=0
                this._rel_origin = rel_origin.add(new egPoint(-this._my_rect.left(), 0.0));
                this._stretched = false;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief stretchTo 设置拉伸矩形，将当前的绘图矩形拉伸至设置的矩形
         * @param rect 拉伸后的绘图矩形，用于修改_parent_rect
         */
        EDMmlNode.prototype.stretchTo = function (rect) {
            this._parent_rect = rect;
            // if(this._nSymbolType == SymbolType.Arrow) {
            //     this._parent_rect.width = this._parent_rect.width*2;
            // }
            this._stretched = true;
        };
        /**
         * @brief devicePoint 获取最终矫正的矩形的坐标值
         * @param p 根节点的矩形坐标值？
         * @return 返回的结果值
         */
        EDMmlNode.prototype.devicePoint = function (pos) {
            var dr = this.deviceRect;
            var dp = dr.topLeft();
            if (this._stretched) {
                var p = new egPoint((pos.x - this._my_rect.left()) * dr.width / this._my_rect.width, (pos.y - this._my_rect.top()) * dr.height / this._my_rect.height);
                dp = dp.add(p);
                return dp;
            }
            else {
                dp = dp.add(pos);
                dp = dp.subtract(this._my_rect.topLeft());
                // console.log(`devicePoint tag=${this.tag} dr=${dr} pos=${pos} _my_rect=${this._my_rect} dp=${dp}\n`)
                return dp;
            }
        };
        Object.defineProperty(EDMmlNode.prototype, "myRect", {
            /**
             * @brief myRect 获取我的绘图矩形，即文本图像的矩形，是原始大小，未经过平移，拉伸
             * @return 返回的结果值
             */
            get: function () { return this._my_rect; },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief setMyRect 设置我的绘图矩形
         * @param rect 设置后的绘图矩形，用于修改_my_rect，_my_rect默认由文本图像矩阵决定
         */
        EDMmlNode.prototype.setMyRect = function (rect) { if (rect != null) {
            this._my_rect = rect;
        } };
        /**
         * @brief updateMyRect 更新我的绘图矩阵，包括此节点和其子节点的绘图矩阵更新，将_my_rect恢复为默认的文本图像矩阵
         */
        EDMmlNode.prototype.updateMyRect = function () {
            this._my_rect = this.symbolRect(); // 获取我的绘图矩形为符号矩形  
            // console.log(`${this.tag}:${this._my_rect} enter\n`);
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                this._my_rect.united(child.parentRect); // 将我的绘图矩形与所有孩子的父矩形组合起来
                // console.log(`unite${child.parentRect} = ${this._my_rect}\n`);
            }
            if (this._doublewidth) {
                this._my_rect.width = this._my_rect.width * 2.0;
            }
            // console.log(`${this.tag}:${this._my_rect} end\n`);
        };
        Object.defineProperty(EDMmlNode.prototype, "parentRect", {
            /**
             * @brief parentRect 获取初步矫正的矩形，根据是否拉伸，以及子节点矩形进行第一次矫正，结果保存于_parent_rect，
             *                   与最终矫正的结果差别在与坐标值，初步矫正的坐标位置是相对于父节点的坐标位置
             * @return 返回的结果值
             */
            get: function () {
                if (this._stretched) {
                    return this._parent_rect;
                }
                // 相对原点+文本绘制的矩形的基点， 文本绘制矩形的矩形大小
                return new egRect(this._rel_origin.x + this._my_rect.left(), this._rel_origin.y + this._my_rect.top(), this._my_rect.width, this._my_rect.height);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "deviceRect", {
            /**
             * @brief deviceRect 获取最终矫正的矩形，即当前节点的矩阵在整个公式图像中的坐标和大小
             * @return 返回的结果值
             */
            get: function () {
                // 设备矩形:显示为红色方框
                // 根节点设备矩形大小为所有绘图矩形的组合
                if (this._parent == null) {
                    return new egRect(this._rel_origin.x + this._my_rect.left(), this._rel_origin.y + this._my_rect.top(), this._my_rect.width, this._my_rect.height);
                }
                var pdr = this._parent.deviceRect; // 父节点的最终矫正矩形，主要获取坐标位置，此时矩形未缩放
                var pr = this.parentRect; // 我的初步矫正矩形，主要获取坐标位置，宽度和高度
                var pmr = this._parent.myRect; // 父节点的绘图矩形，主要获取矩形宽度和高度，此时矩形已缩放
                // scale_w和scale_h绝大多数情况=1，例如sub节点时，scale_h!=1
                var scale_w = 0.0;
                if (pmr.width !== 0.0) {
                    scale_w = pdr.width / pmr.width; // 计算得到父节点矩形的x坐标缩放值
                }
                var scale_h = 0.0;
                if (pmr.height !== 0.0) {
                    scale_h = pdr.height / pmr.height; // 计算得到父节点矩形的y坐标缩放值
                }
                // x = 父节点最终矫正矩形的x+(初步矫正矩形的x-父节点的绘图矩形)*scale_w
                // y = 父节点最终矫正矩形的y+(初步矫正矩形的y-父节点的绘图矩形)*scale_h
                // width = 初步矫正矩形*scale_w
                // height = 初步矫正矩形*scale_h
                // let rect: egRect = new egRect( pdr.left() + ( pr.left() - pmr.left() ) * scale_w,pdr.top()  + ( pr.top() - pmr.top() ) * scale_h, pr.width * scale_w, pr.height * scale_h )
                // console.log(`tag=${this.tag} dr=${rect} pmr=${this.myRect} pr=${pr}\n`);
                return new egRect(pdr.left() + (pr.left() - pmr.left()) * scale_w, pdr.top() + (pr.top() - pmr.top()) * scale_h, pr.width * scale_w, pr.height * scale_h);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief nodeFont 更新字体函数，对当前节点进行更新字体，遍历当前节点和子节点调用更新字体函数
         */
        EDMmlNode.prototype.updateChildFont = function () {
            this.updateFont();
            // qDebug()<<"child nodeFont:"<<time.elapsed()/1000.0<<"s"<<toStr()<<endl;;
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                child.updateChildFont();
            }
        };
        /**
         * @brief stretch 拉伸函数，对当前节点进行拉伸，遍历当前节点和子节点调用拉伸函数
         */
        EDMmlNode.prototype.nodeStretch = function () {
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                child.nodeStretch();
            }
        };
        /**
         * @brief layout 布局函数，对当前节点进行布局，遍历当前节点和子节点调用布局函数
         */
        EDMmlNode.prototype.nodeLayout = function () {
            // console.log(`nodeLayout : ${this.toStr()}`);
            this._parent_rect = new egRect(0.0, 0.0, 0.0, 0.0);
            this._stretched = false;
            this._rel_origin = new egPoint(0.0, 0.0);
            var largeop = this.explicitAttribute('largeop');
            if ('true' === largeop) {
                this._fFontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                //this.fontItalic = true;
            }
            var mathsize = this.explicitAttribute('mathsize');
            if (mathsize != null) {
                if (mathsize.match('%') != null) {
                    mathsize.replace(/%/g, '');
                    this._fFontSizeLevel = mathsize.toFloat() * 0.01;
                }
            }
            if (1 !== this._fFontSizeLevel) {
                this.fontSizeLevel = this._fFontSizeLevel; // 字体缩放
                this.updateChildFont();
            }
            // add node id to vector ////将节点ID添加到矢量 屏蔽180718
            // _document->appendRenderingData(_nodeId, 0, this, EDRendAdjustBits::Nothing);
            // 遍历子节点进行递归
            var child = this._first_child;
            for (var i = 0; child != null; child = child.nextSibling) {
                this.layoutHook(i);
                child.nodeLayout();
                i++;
            }
            this.layoutSymbol(); // 设置布局位置
            this.updateMyRect(); // 更新我的绘图矩形
            // _isNewNode = false;// 已处理过的节点不再是新节点
            if (this._parent == null) {
                this._rel_origin = new egPoint(0.0, 0.0);
            }
        };
        /**
         * @brief layoutHook is called before layout function of each child is called.//在调用每个子项的布局函数之前调用layoutHook
         * Subclasses can therefore intercept the layout functions of their the childs//因此子类可以拦截他们孩子的布局功能
         * @param childIndex the child index of the childs                            //childIndex孩子的子索引
         */
        EDMmlNode.prototype.layoutHook = function (childIndex) {
            // 布局钩子
        };
        /**
         * @brief paint 绘图函数，对当前节点进行绘图，遍历当前节点和子节点调用绘图函数
         * @param painter QPainter类指针
         * @param x_scaling x坐标缩放值，根据缩放值进行x坐标的scale
         * @param y_scaling y坐标缩放值，根据缩放值进行y坐标的scale
         */
        EDMmlNode.prototype.paint = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            /*
            if (this.nodeType == EDMathMlNodeType.TextNode) {
                console.log(`nodeLayout() text=${this.toTextNode().text}\n`);
            } else {
                console.log(`nodeLayout() tag=${this.tag}\n`);
            }
            */
            // 绘图
            if (this._my_rect == null) {
                console.log('_my_rect is empty\n');
                return;
            }
            painter.save();
            if (this._color.length > 0) {
                painter.strokeStyle = this._color;
            }
            else {
                painter.strokeStyle = this._document.foregroundColor;
            }
            var d_rect = this.deviceRect;
            // update node id position data  //更新节点ID位置数据
            // _document->updateRenderingData(_nodeId, 0, d_rect);
            if (this._stretched) {
                x_scaling *= d_rect.width / this._my_rect.width;
                y_scaling *= d_rect.height / this._my_rect.height;
            }
            if (this._node_type !== EDMathMlNodeType.UnknownNode) {
                var bg = this._background;
                /*strokeStyle边线色 fillStyle填充色
                if ( bg.length > 0 ) {
                    //painter.fillRect( d_rect, bg );
                    painter.strokeStyle = bg;
                } else {
                    //painter.fillRect( d_rect, _document.backgroundColor() );
                    painter.strokeStyle = this._document.backgroundColor;
                }*/
                var fg = this._color;
                if (fg.length > 0) {
                    // painter.setPen( QPen( fg, 1 ) );
                    this._ctx.fillStyle = fg;
                }
                else {
                    // painter.setPen( QPen( this._document.foregroundColor(), 1 ) );
                    this._ctx.fillStyle = this._document.foregroundColor;
                }
            }
            // painter.restore();
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                child.paint(painter, x_scaling, y_scaling, outputPng);
            }
            if (this._node_type !== EDMathMlNodeType.UnknownNode) {
                this.paintSymbol(painter, x_scaling, y_scaling, outputPng);
                // QString name = toStr();
                // image->save(QString("%1.png").arg(name), "png");
            }
            painter.restore();
        };
        /**
         * @brief saveTo 保存至QDom函数，对当前节点进行筛选，符合条件则保存至QDom，根据onlythis决定是否遍历当前节点和子节点调用此函数
         * @param elem 使用该QDomElement添加(appendChild)新的子QDomElement
         * @param onlythis 是否遍历当前节点和子节点调用此函数，复制节点不需要遍历
         */
        EDMmlNode.prototype.saveTo = function (elem, onlythis) {
            var _this = this;
            if (onlythis === void 0) { onlythis = false; }
            // 创建elem的QDom
            var xmldoc = elem.ownerDocument;
            if (null != this._ele) {
                var mydoc = this._ele.ownerDocument;
                if (mydoc === xmldoc) {
                    var newele_1 = false;
                    if (this._node_type === EDMathMlNodeType.TextNode) {
                        // 如果时text节点，则创建QDomText
                        if (null != this.toTextNode()) {
                            // QString text = this->toTextNode()->text();
                            // if (text != "" && text != "isNuLL!")
                            // qDebug()<<"_ele tag"<<_ele.tagName()<<endl;
                            // 设置空文本显示矩形
                            // if (_ele.tagName() == text) {
                            //    qDebug()<<"the same"<<endl;
                            // }
                            newele_1 = true;
                        }
                    }
                    else if (this._node_type !== EDMathMlNodeType.UnknownNode) {
                        var skip = false;
                        if (this.parent.nodeType === EDMathMlNodeType.UnknownNode) {
                            if (this.firstChild.nextSibling) {
                                if (this.firstChild.nextSibling.nodeType === EDMathMlNodeType.MrowNode
                                    && !this.firstChild.nextSibling.nextSibling) {
                                    // 180627 过滤<math>转<mrow>导致<mrow>重复的问题
                                    if (elem.contains(this._ele)) {
                                        elem.removeChild(this._ele);
                                    }
                                    skip = true;
                                }
                            }
                        }
                        if (!skip) {
                            if (this._ele.parentNode == null && this._ele.firstChild != null) { // insertEnter等情况
                                elem.appendChild(this._ele);
                                // return;
                            }
                            else {
                                var oldele = this._ele;
                                // 如果该节点存在属性图，则添加节点属性
                                var attr = this.myAttrMap;
                                attr.forEach(function (value, key) {
                                    _this._ele.setAttribute(key, value);
                                });
                                // 添加字体斜体、粗体属性
                                if ((((this._bFontBold || this._bFontItalic) || this._ele.attributes.length > 0) // _node_type == EDMathMlNodeType::MiNode
                                    && (this._node_type === EDMathMlNodeType.MoNode
                                        || this._node_type === EDMathMlNodeType.MnNode
                                        || this._node_type === EDMathMlNodeType.MtextNode))
                                    || this._node_type === EDMathMlNodeType.MiNode) {
                                    var mathvariant = 'normal';
                                    if (!this._bFontBold && this._bFontItalic) {
                                        mathvariant = 'italic';
                                    }
                                    if (this._bFontBold && !this._bFontItalic) {
                                        mathvariant = 'bold';
                                    }
                                    if (this._bFontBold && this._bFontItalic) {
                                        mathvariant = 'bold-italic';
                                    }
                                    this._ele.setAttribute('mathvariant', mathvariant);
                                    // console.log(`set mathvariant`)
                                }
                                var repalce = true;
                                if (this._node_type === EDMathMlNodeType.MtextNode) {
                                    // 如果是<mtext></mtext>节点，不需要添加，此节点仅用于光标显示
                                    if ('' === this.firstChild.toTextNode().text) {
                                        this.firstChild.isShowRect = false;
                                        repalce = false;
                                        if (elem.contains(this._ele)) {
                                            elem.removeChild(this._ele);
                                        }
                                    }
                                    if ('isNuLL!' === this.firstChild.toTextNode().text) {
                                        this.firstChild.isShowRect = true;
                                        repalce = false;
                                        if (elem.contains(this._ele)) {
                                            elem.removeChild(this._ele);
                                        }
                                    }
                                }
                                if (repalce) {
                                    if (this._ele !== oldele) {
                                        elem.replaceChild(this._ele, oldele);
                                        // console.log(`replacechild ${oldele.tagName} to ${this._ele.tagName}\n`)
                                        // qDebug()<<"relpace:"<<oldele.tagName()<<"to"<<_ele.tagName()<<endl;
                                    }
                                    newele_1 = true;
                                }
                            }
                        }
                    }
                    // 遍历子节点递归调用
                    var child_1 = this._first_child;
                    for (; child_1 != null; child_1 = child_1.nextSibling) {
                        if (this._first_child.nodeType === EDMathMlNodeType.TextNode || !onlythis) { // 复制功能的条件
                            if (newele_1) {
                                child_1.saveTo(this._ele);
                            }
                            else {
                                child_1.saveTo(elem);
                            }
                        }
                        else if (newele_1 && onlythis) {
                            elem = this._ele;
                        }
                    }
                    return;
                }
            }
            // 首次则初始化
            var tagstr = this.tag;
            // 因为mfenced节点内容已解析添加到节点数据中，所以将mfenced节点转换为mrow
            if (this._node_type === EDMathMlNodeType.MfencedNode) {
                tagstr = 'mrow';
            }
            this._ele = xmldoc.createElement(tagstr);
            var newele = false;
            if (this._node_type === EDMathMlNodeType.TextNode) {
                // 如果时text节点，则创建QDomText
                if (null != this.toTextNode()) {
                    var textnode = void 0;
                    var text = this.toTextNode().text;
                    // _ele = xmldoc.createElement(getTag());
                    // 设置空文本显示矩形
                    if ('isNuLL!' === text) {
                        this.isShowRect = true;
                        textnode = xmldoc.createTextNode('');
                    }
                    else if (EdrawMathDate.EDStatic.g_special_conversion.has(text)) {
                        //&& this.parent !== this.parent.parent.firstChild) { //待定 
                        this.isShowRect = false;
                        textnode = xmldoc.createTextNode(EdrawMathDate.EDStatic.g_special_conversion.get(text));
                    }
                    else {
                        // const QChar *unicode = this->toTextNode()->text().unicode();
                        if (this.parent.nodeType === EDMathMlNodeType.MoNode && 1 === text.length) {
                            text = text.charCodeAt(0).toString(16).toLocaleUpperCase();
                            // for (let i=0;i<5-unicode.length;++i) {
                            //    unicode = "0"+unicode;
                            // }
                            text = '#x' + text + ';';
                            // 转换为"#xXXXX;"格式, 保存为文本时将"#x"替换为"&#x"
                        }
                        // QList<QString> nameList;
                        // nameList = EDStatic::mmlEntityTable.search(text);
                        this.isShowRect = false;
                        textnode = xmldoc.createTextNode(text);
                    }
                    // if (!elem.hasChildNodes()) {
                    elem.appendChild(textnode);
                    this._ele = xmldoc.createElement('text');
                    // qDebug()<<"elem.appendChild(textnode):"<<text
                    //       <<"_ele tag"<<_ele.tagName()<<endl;
                    newele = true;
                }
            }
            else if (this._node_type !== EDMathMlNodeType.UnknownNode) {
                // this._ele = xmldoc.createElement(this.tag);
                var skip = false;
                if (this.parent.nodeType === EDMathMlNodeType.UnknownNode) {
                    if (this.firstChild.nextSibling) {
                        if (this.firstChild.nextSibling.nodeType === EDMathMlNodeType.MrowNode
                            && !this.firstChild.nextSibling.nextSibling) {
                            skip = true; // 190627 过滤<math>转<mrow>导致<mrow>重复的问题
                        }
                    }
                }
                if (!skip) {
                    // 如果该节点存在属性图，则添加节点属性
                    var attr = this.myAttrMap;
                    attr.forEach(function (value, key) {
                        _this._ele.setAttribute(key, value);
                    });
                    // 添加字体斜体、粗体属性
                    if ((((this._bFontBold || this._bFontItalic)) // _node_type == EDMathMlNodeType::MiNode
                        && (this._node_type === EDMathMlNodeType.MoNode
                            || this._node_type === EDMathMlNodeType.MnNode
                            || this._node_type === EDMathMlNodeType.MtextNode))
                        || this._node_type === EDMathMlNodeType.MiNode) {
                        var mathvariant = 'normal';
                        if (!this._bFontBold && this._bFontItalic) {
                            mathvariant = 'italic';
                        }
                        if (this._bFontBold && !this._bFontItalic) {
                            mathvariant = 'bold';
                        }
                        if (this._bFontBold && this._bFontItalic) {
                            mathvariant = 'bold-italic';
                        }
                        this._ele.setAttribute('mathvariant', mathvariant);
                    }
                    var append = true;
                    if (this._node_type === EDMathMlNodeType.MtextNode) {
                        // 如果是<mtext></mtext>节点，不需要添加，此节点仅用于光标显示
                        if ('' === this.firstChild.toTextNode().text) {
                            append = false;
                        }
                        if ('isNuLL!' === this.firstChild.toTextNode().text) {
                            append = false;
                        }
                    }
                    if (append) {
                        var nextele = void 0;
                        var oldele = void 0;
                        var nextnode = this.nextSibling;
                        nextele = this._ele;
                        // console.log(`append ${nextnode}\n`)
                        while (nextnode != null) {
                            if (this.nextSibling._ele != null) {
                                oldele = nextnode._ele;
                                if (oldele.nodeName !== 'text') {
                                    // console.log(`elem=${elem.nodeName}  nextele=${nextele.nodeName}  oldele=${oldele.nodeName}\n`);
                                    nextele = elem.replaceChild(nextele, oldele);
                                }
                                // console.log(`append replacechild ${nextele.tagName} to ${oldele.tagName}\n`)
                                // qDebug()<<QString("replace %1 to %2:").arg(nextele.firstChild().nodeValue()).arg(oldele.firstChild().nodeValue())<<endl;
                            }
                            nextnode = nextnode.nextSibling;
                        }
                        elem.appendChild(nextele);
                        // qDebug()<<"elem.appendChild(_ele):"<<nextele.tagName()<<endl;
                        newele = true;
                    }
                }
            }
            // 遍历子节点递归调用
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (this._first_child.nodeType === EDMathMlNodeType.TextNode || !onlythis) { // 复制功能的条件
                    if (newele) {
                        child.saveTo(this._ele);
                    }
                    else {
                        child.saveTo(elem);
                    }
                }
                else if (newele && onlythis) {
                    elem = this._ele;
                }
            }
        };
        /**
         * @brief saveToForCopy 拷贝函数专用的保存函数，保存至QDom函数，对当前节点进行筛选，符合条件则保存至QDom，根据onlythis决定是否遍历当前节点和子节点调用此函数
         * @param elem 使用该QDomElement添加(appendChild)新的子QDomElement
         * @param onlythis 是否遍历当前节点和子节点调用此函数，复制节点不需要遍历
         */
        EDMmlNode.prototype.saveToForCopy = function (elem, onlythis) {
            if (onlythis === void 0) { onlythis = false; }
            // 创建elem的QDom
            var xmldoc = elem.ownerDocument;
            // let node: Element = null;
            // 因为mfenced节点内容已解析添加到节点数据中，所以将mfenced节点转换为mrow
            var tagstr = this.tag;
            if (this._node_type === EDMathMlNodeType.MfencedNode) {
                tagstr = 'mrow';
            }
            var node = xmldoc.createElement(tagstr);
            var newele = false;
            if (this._node_type === EDMathMlNodeType.TextNode) {
                // 如果时text节点，则创建QDomText
                if (null != this.toTextNode()) {
                    var textnode = void 0;
                    var text = this.toTextNode().text;
                    // 设置空文本显示矩形
                    if ('isNuLL!' === text) {
                        this.isShowRect = true;
                        textnode = xmldoc.createTextNode('');
                    }
                    else if (EdrawMathDate.EDStatic.g_special_conversion.has(text)) {
                        //&& this.parent !== this.parent.parent.firstChild) { //待定
                        this.isShowRect = false;
                        textnode = xmldoc.createTextNode(EdrawMathDate.EDStatic.g_special_conversion.get(text));
                    }
                    else {
                        // const QChar *unicode = this->toTextNode()->text().unicode();
                        if (this.parent.nodeType === EDMathMlNodeType.MoNode && 1 === text.length) {
                            text = text.charCodeAt(0).toString(16).toLocaleUpperCase();
                            // for (let i=0;i<5-unicode.length;++i) {
                            //    unicode = "0"+unicode;
                            // }
                            text = '#x' + text + ';';
                            // 转换为"#xXXXX;"格式, 保存为文本时将"#x"替换为"&#x"
                        }
                        this.isShowRect = false;
                        textnode = xmldoc.createTextNode(text);
                    }
                    // if (!elem.hasChildNodes()) {
                    elem.appendChild(textnode);
                    newele = true;
                }
            }
            else if (this._node_type !== EDMathMlNodeType.UnknownNode) {
                /*
                //因为mfenced节点内容已解析添加到节点数据中，所以将mfenced节点转换为mrow
                let tagstr: string = this.tag;
                if (this._node_type == EDMathMlNodeType.MfencedNode) {
                    tagstr = "mrow";
                }
                node = xmldoc.createElement(tagstr);
                */
                var skip = false;
                if (this.parent.nodeType === EDMathMlNodeType.UnknownNode) {
                    if (this.firstChild.nextSibling) {
                        if (this.firstChild.nextSibling.nodeType === EDMathMlNodeType.MrowNode
                            && !this.firstChild.nextSibling.nextSibling) {
                            skip = true; // 180627 过滤<math>转<mrow>导致<mrow>重复的问题
                        }
                    }
                }
                if (!skip) {
                    // 如果该节点存在属性图，则添加节点属性
                    var attr = this.myAttrMap;
                    attr.forEach(function (value, key) {
                        node.setAttribute(key, value);
                    });
                    // 添加字体斜体、粗体属性
                    if ((((this._bFontBold || this._bFontItalic) || node.attributes.length > 0) // _node_type == EDMathMlNodeType::MiNode
                        && (this._node_type === EDMathMlNodeType.MoNode
                            || this._node_type === EDMathMlNodeType.MnNode
                            || this._node_type === EDMathMlNodeType.MtextNode))
                        || this._node_type === EDMathMlNodeType.MiNode) {
                        var mathvariant = 'normal';
                        if (!this._bFontBold && this._bFontItalic) {
                            mathvariant = 'italic';
                        }
                        if (this._bFontBold && !this._bFontItalic) {
                            mathvariant = 'bold';
                        }
                        if (this._bFontBold && this._bFontItalic) {
                            mathvariant = 'bold-italic';
                        }
                        node.setAttribute('mathvariant', mathvariant);
                    }
                    var append = true;
                    if (this._node_type === EDMathMlNodeType.MtextNode) {
                        // 如果是<mtext></mtext>节点，不需要添加，此节点仅用于光标显示
                        if ('' === this.firstChild.toTextNode().text) {
                            append = false;
                        }
                        if ('isNuLL!' === this.firstChild.toTextNode().text) {
                            append = false;
                        }
                    }
                    if (append) {
                        elem.appendChild(node);
                        newele = true;
                    }
                }
            }
            // 遍历子节点递归调用
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (this.firstChild.nodeType === EDMathMlNodeType.TextNode || !onlythis) { // 复制功能的条件
                    if (newele) {
                        child.saveToForCopy(node);
                    }
                    else {
                        child.saveToForCopy(elem);
                    }
                }
                else if (newele && onlythis) {
                    elem = node;
                }
            }
        };
        /**
         * @brief appendTo 保存至QVector函数，对当前节点进行筛选，符合条件则保存至QVector，遍历当前节点和子节点调用此函数
         * @param nodevector 保存结果的QVector
         * @param edited 筛选的两种方式，=true为可编辑的节点指针，=false为可框选的节点指针
         */
        EDMmlNode.prototype.appendTo = function (nodevector, edited, checkSpecialType) {
            if (edited === void 0) { edited = true; }
            if (checkSpecialType === void 0) { checkSpecialType = false; }
            // console.log(`appendTo() ${this.tag}\n`);
            // 选择的节点要允许操作，text节点不符合，实际并非mml节点
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this._node_type !== EDMathMlNodeType.TextNode
                && this._node_type !== EDMathMlNodeType.MiNode && this._node_type !== EDMathMlNodeType.MoNode
                && this._node_type !== EDMathMlNodeType.MnNode && this._node_type !== EDMathMlNodeType.MtextNode
                && this._node_type !== EDMathMlNodeType.MprescriptsNode && this._node_type !== EDMathMlNodeType.NoneNode) {
                if (checkSpecialType) {
                    var noneditable = [false];
                    //判断是否特殊结构的节点
                    if (this.checkSpecialType_1(noneditable)) {
                        if (this.firstChild.noneditable != noneditable[0]) {
                            this.noneditable4child = noneditable[0];
                        }
                    }
                    if (this.noneditable) {
                        if (this.firstChild) {
                            if (this.firstChild.noneditable) {
                                return;
                            }
                            //通过括号类型节点的子节点解析
                        }
                        else {
                            return;
                        }
                    }
                    if (this.checkSpecialType_2(noneditable)) {
                        // if (noneditable[0]) {
                        this.noneditable4child = noneditable[0];
                        // }
                    }
                    if (this.checkSpecialType_3(noneditable)) {
                        // if (noneditable[0]) {
                        this.noneditable4child = noneditable[0];
                        // }
                    }
                }
                else if (!edited) {
                    nodevector.push(this);
                    // console.log(`!edited appendTo push this ${this.tag}\n`);
                }
            }
            // 遍历子节点递归调用
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                child.appendTo(nodevector, edited, checkSpecialType);
            }
            // 选择的节点要允许操作，text节点不符合，实际并非mml节点
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this._node_type !== EDMathMlNodeType.TextNode) {
                if (edited) {
                    // 如果选择的节点时<mtd>或者<mtr>，则不可选 新增<mstyleNode> 不可编辑
                    if (this._node_type === EDMathMlNodeType.MtdNode || this._node_type === EDMathMlNodeType.MtrNode
                        || this._node_type === EDMathMlNodeType.MprescriptsNode
                        || this._node_type === EDMathMlNodeType.NoneNode) {
                        //   || _node_type == EDMathMlNodeType::MstyleNode )
                        return;
                    }
                    // 如果选择的节点的同级节点个数有限，即不可修改同级节点个数，则此节点不可选
                    var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(this.parent.nodeType);
                    if (ChildSpec.ChildAny !== spec.child_spec) {
                        return;
                    }
                    // 新增 如果选择的节点时<mo largeop = "true">不可编辑
                    if (this._node_type === EDMathMlNodeType.MoNode &&
                        EdrawMathDate.EDStatic.g_largeop_multiplier === this._fFontSizeLevel) {
                        return;
                    }
                    //新增 
                    if (this.noneditable) {
                        return;
                    }
                }
                // if (_node_type == EDMathMlNodeType::MtextNode ) {
                //    //如果是<mtext></mtext>节点，不需要添加，此节点仅用于光标显示
                //    if("" == firstChild()->toTextNode()->text())
                //        return;
                // }
                if (!checkSpecialType) {
                    nodevector.push(this);
                }
                // console.log(`edited appendTo push this ${this.tag}\n`);
            }
        };
        /**
        * @brief checkSpecialType_1 检查是否第一类特殊结构的节点(munder/mover)
        *                           第一类特殊结构特征：
        *                           <munder>
        *                              <mrow>..xxx</morow>
        *                              <mo>..</mo>
        *                           </munder>
        * @param noneditable 实参：是否不可编辑类型
        */
        EDMmlNode.prototype.checkSpecialType_1 = function (noneditable) {
            if (noneditable.length < 0) {
                return false;
            }
            else {
                noneditable[0] = false;
            }
            //单字符特殊处理
            // <munder>
            //    <mrow>..xxx</morow>
            //    <mo>..</mo>
            // </munder>
            //其中..xxx 是：(即循环嵌套)
            // <munder>
            //    <mrow>..xxx</morow>
            //    <mo>..</mo>
            // </munder>
            var parentnode = this;
            var childnode = this._first_child;
            var isthis = false;
            while ((parentnode._node_type === EDMathMlNodeType.MunderNode
                || parentnode._node_type === EDMathMlNodeType.MoverNode)
                //|| parentnode._node_type === EDMathMlNodeType.MencloseNode)
                && childnode) {
                isthis = true;
                if (childnode.nodeType === EDMathMlNodeType.MrowNode) { //} && !childnode.noneditable ) {
                    childnode = childnode.firstChild;
                    if (childnode) {
                        if (childnode.nextSibling) {
                            var tmpbool = [false];
                            //检测是否内嵌第二类特殊结构
                            childnode.parent.checkSpecialType_2(tmpbool);
                            if (!childnode.nextSibling.nextSibling || tmpbool[0]) {
                                parentnode = childnode.nextSibling;
                                childnode = parentnode.firstChild;
                                if (parentnode) {
                                    noneditable[0] = true;
                                    // console.log(parentnode);
                                    if (parentnode.nodeType == EDMathMlNodeType.MtextNode) {
                                        if (parentnode.firstChild.toTextNode().text == "isNuLL!") {
                                            noneditable[0] = false;
                                            break;
                                        }
                                        break;
                                    }
                                }
                                else {
                                    noneditable[0] = false;
                                    break;
                                }
                                //console.log(`noneditable = true,`,this,childnode.nextSibling)
                            }
                            else {
                                noneditable[0] = false;
                                break;
                            }
                        }
                        else {
                            noneditable[0] = false;
                            break;
                        }
                    }
                    else {
                        noneditable[0] = false;
                        break;
                    }
                }
                else {
                    noneditable[0] = false;
                    break;
                }
            }
            return isthis;
        };
        /**
         * @brief checkSpecialType_2 检查是否第二类特殊结构的节点(mrow)
         *                           第二类特殊结构特征：
         *                           <mrow>
         *                              ..
         *                              <mo>..</mo><mo>..</mo><mo>..</mo><mo>..</mo>……
         *                           </mrow>
         *                           或者括号类型例如
         *                           <mrow>
         *                              <mo>(</mo>
         *                              <mrow>..</morw>
         *                              <mo>)</mo>
         *                           </mrow>
         *                           或者累加类型例如
         *                           <mrow>
         *                              <munderover><mo>&#x2211;</mo><mrow></mrow><mrow></mrow></munderover>
         *                              <mrow>..</morw>
         *                           </mrow>
         * @param noneditable 实参：是否不可编辑类型
         */
        EDMmlNode.prototype.checkSpecialType_2 = function (noneditable) {
            if (noneditable.length < 0) {
                return false;
            }
            else {
                noneditable[0] = false;
            }
            //    <mrow>
            //      ..
            //      ..xxx
            //    </morow>
            //其中..xxx 是
            //<mo>..</mo><mo>..</mo><mo>..</mo><mo>..</mo>……
            //内嵌括号类型节点判断
            var parentnode = this;
            var childnode = this._first_child;
            var isthis = false;
            var isbracket = false;
            if (parentnode.nodeType === EDMathMlNodeType.MrowNode && childnode) {
                isthis = true; //childnode = mtext''
                // if (childnode.noneditable) {
                //     //查找是否括号类型节点结构
                //     let isbracket:boolean = false;
                //     let hasmrow:boolean = false;
                //     let child: EDMmlNode = childnode;
                //     for ( ; child != null; child = child.nextSibling ) {
                //         if (child.nodeType == EDMathMlNodeType.MrowNode) {
                //             hasmrow = true;
                //             break;
                //         }
                //     }
                //     if (hasmrow && child) {
                //         if (!child.firstChild.noneditable) {
                //             isbracket = true;
                //         }
                //     }
                //     // if (!isbracket) {
                //     //     noneditable[0] = true; 
                //     // }
                // }
                if (childnode.nextSibling && !childnode.noneditable) {
                    childnode = childnode.nextSibling;
                    if (childnode) { //childnode = xx
                        childnode = childnode.nextSibling;
                        if (childnode) {
                            if (childnode.nodeType == EDMathMlNodeType.MoNode
                                || childnode.nodeType == EDMathMlNodeType.MrowNode
                                || childnode.nodeType == EDMathMlNodeType.MtableNode) {
                                if (childnode.nodeType == EDMathMlNodeType.MrowNode || childnode.nodeType == EDMathMlNodeType.MtableNode) {
                                    noneditable[0] = false;
                                    if (childnode.previousSibling.nodeType === EDMathMlNodeType.MoNode) {
                                        for (var _i = 0, _a = EdrawMathDate.EDStatic.g_special_bracket; _i < _a.length; _i++) {
                                            var text = _a[_i];
                                            //前括号类型符号
                                            if (childnode.previousSibling.toMoNode().text == text) {
                                                // console.log(`前括号类型符号text`,childnode.previousSibling.toMoNode().text);
                                                // parentnode.noneditable4child = true;
                                                parentnode.firstChild.noneditable = true;
                                                parentnode.firstChild.noneditable4child = true;
                                                childnode.previousSibling.noneditable = true;
                                                childnode.previousSibling.noneditable4child = true;
                                                childnode.noneditable = true;
                                                childnode.noneditable4child = false;
                                                isbracket = true;
                                            }
                                        }
                                    }
                                    else if (childnode.previousSibling.nodeType === EDMathMlNodeType.MunderNode
                                        || childnode.previousSibling.nodeType === EDMathMlNodeType.MunderoverNode
                                        || childnode.previousSibling.nodeType === EDMathMlNodeType.MsubNode
                                        || childnode.previousSibling.nodeType === EDMathMlNodeType.MsubsupNode) {
                                        //前布局节点结构类型
                                        console.log("\u524D\u5E03\u5C40\u8282\u70B9\u7ED3\u6784\u7C7B\u578B", childnode.previousSibling.tag);
                                        parentnode.firstChild.noneditable = true;
                                        parentnode.firstChild.noneditable4child = true;
                                        childnode.previousSibling.noneditable = true;
                                        // childnode.previousSibling.noneditable4child = true;
                                        childnode.noneditable = true;
                                        childnode.noneditable4child = false;
                                        isbracket = true;
                                    }
                                }
                                if (childnode.nodeType == EDMathMlNodeType.MoNode) {
                                    for (var _b = 0, _c = EdrawMathDate.EDStatic.g_special_mo; _b < _c.length; _b++) {
                                        var motext = _c[_b];
                                        if (childnode.toMoNode().text == motext) {
                                            // console.log(`~~~~~noneditable[0] = true`);
                                            noneditable[0] = true;
                                        }
                                    }
                                    if (childnode.previousSibling.nodeType === EDMathMlNodeType.MrowNode
                                        || childnode.previousSibling.nodeType == EDMathMlNodeType.MtableNode) {
                                        for (var _d = 0, _e = EdrawMathDate.EDStatic.g_special_bracket; _d < _e.length; _d++) {
                                            var text = _e[_d];
                                            if (childnode.toMoNode().text == text) {
                                                //A/B布局结构
                                                var yes = true;
                                                if (text == '/') {
                                                    if (childnode.nextSibling) {
                                                        if ((childnode.nextSibling.nodeType === EDMathMlNodeType.MrowNode
                                                            || childnode.nextSibling.nodeType == EDMathMlNodeType.MtableNode)
                                                            && !childnode.nextSibling.nextSibling) {
                                                            childnode.nextSibling.noneditable = true;
                                                            childnode.nextSibling.noneditable4child = false;
                                                        }
                                                        else {
                                                            yes = false;
                                                        }
                                                    }
                                                }
                                                if (yes) {
                                                    //后括号类型符号
                                                    // console.log(`后括号类型符号`,childnode.toMoNode().text);
                                                    // parentnode.noneditable4child = true;
                                                    parentnode.firstChild.noneditable = true;
                                                    parentnode.firstChild.noneditable4child = true;
                                                    childnode.previousSibling.noneditable = true;
                                                    childnode.previousSibling.noneditable4child = false;
                                                    childnode.noneditable = true;
                                                    childnode.noneditable4child = true;
                                                    isbracket = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                childnode = childnode.nextSibling;
                                while (childnode) {
                                    if (childnode.nodeType !== EDMathMlNodeType.MoNode) {
                                        noneditable[0] = false;
                                    }
                                    else if (childnode.previousSibling.nodeType === EDMathMlNodeType.MrowNode
                                        || childnode.previousSibling.nodeType == EDMathMlNodeType.MtableNode) {
                                        for (var _f = 0, _g = EdrawMathDate.EDStatic.g_special_bracket; _f < _g.length; _f++) {
                                            var text = _g[_f];
                                            if (childnode.toMoNode().text == text) {
                                                //后括号类型符号
                                                // console.log(`后括号类型符号`,childnode.toMoNode().text);
                                                // parentnode.noneditable4child = true;
                                                parentnode.firstChild.noneditable = true;
                                                parentnode.firstChild.noneditable4child = true;
                                                childnode.previousSibling.noneditable = true;
                                                childnode.previousSibling.noneditable4child = false;
                                                childnode.noneditable = true;
                                                childnode.noneditable4child = true;
                                                isbracket = true;
                                            }
                                        }
                                    }
                                    childnode = childnode.nextSibling;
                                }
                            }
                        }
                    }
                }
            }
            if (isbracket) {
                if (noneditable.length > 1) {
                    noneditable[1] = true;
                }
                return false;
            }
            return isthis;
        };
        /**
         * @brief checkSpecialType_3 检查是否第三类特殊结构的节点(mrow)
         *                           第三类特殊结构特征：
         *                           <menclose>..xxx</menclose>
         * @param noneditable 实参：是否不可编辑类型
         */
        EDMmlNode.prototype.checkSpecialType_3 = function (noneditable) {
            if (noneditable.length < 0) {
                return false;
            }
            else {
                noneditable[0] = false;
            }
            //  <menclose>..xxx</menclose>
            //其中..xxx 是<menclose>..xxx</menclose>
            var parentnode = this;
            var childnode = this._first_child;
            var isthis = false;
            while (parentnode._node_type === EDMathMlNodeType.MencloseNode && childnode) {
                isthis = true;
                var tmpbool = [false];
                //检测是否内嵌第二类特殊节点结构
                childnode.checkSpecialType_2(tmpbool);
                if (!childnode.nextSibling && (tmpbool[0]
                    || childnode._node_type !== EDMathMlNodeType.MrowNode)) {
                    noneditable[0] = true;
                    if (childnode.nodeType === EDMathMlNodeType.MencloseNode && !childnode.noneditable) {
                        parentnode = childnode;
                        childnode = parentnode.firstChild;
                    }
                    else {
                        break;
                    }
                }
                else {
                    noneditable[0] = false;
                    break;
                }
            }
            return isthis;
        };
        /**
         * @brief appendEduStr 输出教育板块的数学表达式
         * @param str 实参：输出的数学表达式
         * @param edudata 数学表达式的相关参数
         */
        EDMmlNode.prototype.appendEduStr = function (str, edudata) {
            if (edudata === void 0) { edudata = null; }
            if (str.length <= 0) {
                return;
            }
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this._node_type !== EDMathMlNodeType.TextNode
                && this._node_type !== EDMathMlNodeType.MiNode && this._node_type !== EDMathMlNodeType.MoNode
                && this._node_type !== EDMathMlNodeType.MnNode && this._node_type !== EDMathMlNodeType.MtextNode
                && this._node_type !== EDMathMlNodeType.MprescriptsNode && this._node_type !== EDMathMlNodeType.NoneNode) {
                switch (this._node_type) {
                    case EDMathMlNodeType.MrowNode:
                        str[0] = str[0] + "(";
                        break;
                    //case EDMathMlNodeType.MsqrtNode:
                    //str[0] = str[0] + `sqrt(`; break;  
                    default:
                        str[0] = str[0] + this.tag;
                        break;
                }
            }
            // 遍历子节点递归调用
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (child._node_type === EDMathMlNodeType.TextNode) {
                    var text = child.toTextNode().text;
                    text = text.replace("\u00D7", "*");
                    text = text.replace("\u22C5", "*");
                    text = text.replace("\u00F7", "/");
                    if (text != "isNuLL!") {
                        str[0] = str[0] + text;
                    }
                }
                child.appendEduStr(str, edudata);
            }
            // 选择的节点要允许操作，text节点不符合，实际并非mml节点
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this._node_type !== EDMathMlNodeType.TextNode) {
                switch (this._node_type) {
                    case EDMathMlNodeType.MrowNode:
                        str[0] = str[0] + ")";
                        break;
                    //case EDMathMlNodeType.MsqrtNode:
                    //str[0] = str[0] + `)`; break;  
                    default: break;
                }
            }
        };
        /**
         * @brief mousePress 获取鼠标点击的节点指针，对当前节点进行判断，符合条件则返回，遍历当前节点和子节点调用此函数
         * @param mousepos 鼠标的坐标值
         * @return 返回的节点指针，判断当前鼠标坐标所在的节点是否允许编辑，子节点比父节点优先级高，存在子节点符合条件则优先返回子节点指针
         */
        EDMmlNode.prototype.mousePress = function (mousepos) {
            var mouse = null;
            // 选择的节点要允许操作，text节点不符合，实际并非mml节点
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this._node_type !== EDMathMlNodeType.TextNode) {
                if (this.deviceRect.containsPt(mousepos)) {
                    //// 如果选择的节点时<mo>，如果父节点不是<mrow>则不可选
                    // if (_node_type == EDMathMlNodeType::MoNode) {
                    //    if(EDMathMlNodeType::MrowNode != parent()->nodeType())
                    //        return mouse;
                    // }
                    mouse = this;
                    // 如果选择的节点时<mtd>或者<mtr>，则不可选 //新增<mstyleNode>不可编辑
                    if (this._node_type === EDMathMlNodeType.MtdNode || this._node_type === EDMathMlNodeType.MtrNode
                        || this._node_type === EDMathMlNodeType.MprescriptsNode
                        || this._node_type === EDMathMlNodeType.NoneNode) {
                        // || _node_type == EDMathMlNodeType::MstyleNode)
                        mouse = null;
                    }
                    // 如果选择的节点的同级节点个数有限，即不可修改同级节点个数，则此节点不可选
                    var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(this.parent.nodeType);
                    if (ChildSpec.ChildAny !== spec.child_spec) {
                        mouse = null;
                    }
                    // 新增 如果选择的节点时<mo largeop = "true">不可编辑
                    if (this._node_type === EDMathMlNodeType.MoNode &&
                        EdrawMathDate.EDStatic.g_largeop_multiplier === this._fFontSizeLevel) {
                        mouse = null;
                    }
                    if (this.noneditable) {
                        mouse = null;
                    }
                }
            }
            // 遍历子节点递归调用
            var child = this._first_child;
            var childnode = null;
            for (; child != null; child = child.nextSibling) {
                childnode = child.mousePress(mousepos);
                if (null != childnode) {
                    return childnode;
                }
            }
            // 如果子节点满足条件，则优先选中子节点
            if (null != childnode) {
                return childnode;
            }
            return mouse;
        };
        /**
         * @brief toTextNode 获取文本节点的指针，对当前节点进行判断，如果是文本节点则返回当前指针，否则为nullptr
         * @return 返回的节点指针
         */
        EDMmlNode.prototype.toTextNode = function () { return null; };
        /**
         * @brief toMoNode 获取操作符节点的指针，对当前节点进行判断，如果是操作符节点则返回当前指针，否则为nullptr
         * @return 返回的节点指针
        */
        EDMmlNode.prototype.toMoNode = function () { return null; };
        Object.defineProperty(EDMmlNode.prototype, "tag", {
            /**
             * @brief getTag 获取当前节点的节点类型
             * @return 节点类型的QString输出
             */
            get: function () {
                // 获取节点标签tag，输出为QString
                var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(this._node_type);
                if (spec == null) {
                    return "".concat(this, " error: spec is null\n");
                }
                return spec.tag;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "isShowRect", {
            /**
             * @brief isShowRect 获取当前节点是否显示矩形框架
             * @return 返回结果值
            */
            get: function () {
                return this._bShowRect;
            },
            /**
             * @brief setShowRect 设置是否显示当前节点的矩形框架
             * @param showrect 设置值 =true为显示矩形框架 =false为不显示矩形框架
             */
            set: function (isshowrect) {
                if (isshowrect != null) {
                    this._bShowRect = isshowrect;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "myAttrMap", {
            /**
             * @brief getmyAttrMap 获取当前节点的属性图
             * @return 返回结果值，输出为EDMmlAttributeMap
             */
            get: function () {
                return this._attribute_map;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief basePos 获取当前字体的基线到删除线的距离，主要用于位置的计算
         *                其实就是在y方向上做了一个整体偏移
         * @return 返回结果值
         */
        EDMmlNode.prototype.basePos = function () {
            // QFontMetricsF fm( font() );
            // return fm.strikeOutPos();//strikeOutPos()返回从基线到应该绘制去除线的位置的距离。
            // return this._document.baseFontPixelSize*0.5;
            return this._font.strikeOutPos;
        };
        Object.defineProperty(EDMmlNode.prototype, "em", {
            /**
             * @brief em 获取'm'字符的矩形宽度 用于计算解析间距的一个参考值
             * @return 返回结果值
             */
            get: function () {
                // 获取'm'字符的矩形宽度
                if (this._ctx.font !== this.font.fontstring()) {
                    this._ctx.font = this.font.fontstring();
                }
                return this._ctx.measureText('m').width * 0.5;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "ex", {
            /**
             * @brief em 获取'x'字符的矩形高度 用于计算解析间距的一个参考值
             * @return 返回结果值
             */
            get: function () {
                // 获取'x'字符的矩形高度
                // let ctx: CanvasRenderingContext2D = new CanvasRenderingContext2D();
                // ctx.font = this.font.fontstring();
                // ctx.textBaseline = "ideographic";
                return this.font.pixelSize;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief explicitAttribute 匹配属性图中name对应的value
         * @param name 需要匹配的name值
         * @param def 匹配得到的value值
         * @return 返回结果值def
         */
        EDMmlNode.prototype.explicitAttribute = function (name, def) {
            if (def === void 0) { def = null; }
            if (this.myAttrMap.has(name)) {
                def = this.myAttrMap.get(name);
                return def;
            }
            return def;
        };
        /**
         * @brief inheritAttributeFromMrow 匹配此节点所在父节点中，MstyleNode节点属性图中name对应的value
         * @param name 需要匹配的name值
         * @param def 匹配得到的value值
         * @return 返回结果值def
         */
        EDMmlNode.prototype.inheritAttributeFromMrow = function (name, def) {
            if (def === void 0) { def = null; }
            // 匹配此节点所在父节点中，MstyleNode节点属性图中name对应的value
            var p = this;
            for (; p != null; p = p.parent) {
                if (p === this || p.nodeType === EDMathMlNodeType.MstyleNode) {
                    var value = p.explicitAttribute(name);
                    if (value != null) {
                        return value;
                    }
                }
            }
            return def;
        };
        Object.defineProperty(EDMmlNode.prototype, "font", {
            /**
             * @brief font 获取字体
             * @return 返回结果值,输出为QFont
             */
            get: function () {
                return this._font;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief updateFont 更新并设置字体
         */
        EDMmlNode.prototype.updateFont = function () {
            // if (_scriptlevel <= -1)
            //    _scriptlevel = scriptlevel();
            var fn = new EdrawMathDate.EDFont();
            // QFont fn( _document->fontName( EDMathMLDocument::NormalFont ) );
            // pixelSize是所占的像素大小 缺点：有些显示器的分辨率(dpi)比较大 那么单位长度中的像素点就比较多 这样一个字所占的长度就会比较少
            fn.pixelSize = this._document.baseFontPixelSize;
            var ps = fn.pixelSize;
            var sl = 0;
            if (this._scriptlevel === -1) {
                sl = this.scriptlevel();
                if (this.parent != null) {
                    this._scriptlevel = sl;
                }
            }
            else {
                sl = this._scriptlevel;
            }
            if (sl >= 0) {
                for (var i = 0; i < sl; ++i) {
                    ps = ps * EdrawMathDate.EDStatic.g_script_size_multiplier;
                }
            }
            else {
                for (var i = 0; i > sl; --i) {
                    ps = ps / EdrawMathDate.EDStatic.g_script_size_multiplier;
                }
            }
            if (ps < EdrawMathDate.EDStatic.g_min_font_pixel_size_calc) {
                ps = EdrawMathDate.EDStatic.g_min_font_pixel_size_calc;
            }
            fn.pixelSize = ps * this._fFontSizeLevel * EdrawMathDate.EDStatic.g_dpi_font_size; // 倍率
            /*
            const qreal em = QFontMetricsF( fn ).boundingRect( 'm' ).width();
            const qreal ex = QFontMetricsF( fn ).boundingRect( 'x' ).height();

            EDMmlAttributeMap font_attr = collectFontAttributes( this );

            if ( font_attr.contains( "mathvariant" ) ) {
                QString value = font_attr["mathvariant"];

                bool ok;
                int mv = EDStatic::mmlInterpretMathVariant( value, &ok );

                if ( ok ) {
                    if ( mv & ScriptMV )
                        fn.setFamily( _document->fontName( EDMathMLDocument::ScriptFont ) );

                    if ( mv & FrakturMV )
                        fn.setFamily( _document->fontName( EDMathMLDocument::FrakturFont ) );

                    if ( mv & SansSerifMV )
                        fn.setFamily( _document->fontName( EDMathMLDocument::SansSerifFont ) );

                    if ( mv & MonospaceMV )
                        fn.setFamily( _document->fontName( EDMathMLDocument::MonospaceFont ) );

                    if ( mv & DoubleStruckMV )
                        fn.setFamily( _document->fontName( EDMathMLDocument::DoublestruckFont ) );

                    if ( mv & BoldMV )
                        fn.setBold( true );

                    if ( mv & ItalicMV )
                        fn.setItalic( true );
                }
            }

            if ( font_attr.contains( "mathsize" ) ) {
                QString value = font_attr["mathsize"];
                fn = EDStatic::mmlInterpretMathSize( value, fn, em, ex, 0, baseFontPixelSize() );
            }

            fn = EDStatic::mmlInterpretDepreciatedFontAttr( font_attr, fn, em, ex, baseFontPixelSize() );

            if ( _node_type == EDMathMlNodeType::MiNode
                    && !font_attr.contains( "mathvariant" )
                    && !font_attr.contains( "fontstyle" ) ) {
                const EDMmlMiNode *mi_node = ( const EDMmlMiNode* ) this;
                if ( mi_node->text().length() == 1 )
                    fn.setItalic( true );
            }

            if ( _node_type == EDMathMlNodeType::MoNode ) {
                fn.setItalic( false );
                fn.setBold( false );
            }*/
            // 字体颜色 当自己没有_mathcolor时，读取父的颜色值
            if (this._node_type !== EDMathMlNodeType.UnknownNode && this.parent && this.parent._node_type !== EDMathMlNodeType.UnknownNode && !this._mathcolor) {
                this._color = this.parent._color;
                // this._mathcolor = this.parent._color;
            }
            // 斜体 粗体
            if (this._node_type === EDMathMlNodeType.TextNode) {
                if (this.parent != null) {
                    fn.bold = this.parent.fontBold;
                    fn.italic = this.parent.fontItalic;
                    this._color = this.parent._color;
                }
            }
            else {
                fn.bold = this._bFontBold;
                fn.italic = this._bFontItalic;
            }
            this._font = fn;
        };
        Object.defineProperty(EDMmlNode.prototype, "color", {
            /**
             * @brief color 获取字体颜色
             * @return 返回结果值,输出为QColor
             */
            get: function () {
                return this._color;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "background", {
            /**
             * @brief background 获取背景色
             * @return 返回结果值,输出为QColor
             */
            get: function () {
                return this.background;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief scriptlevel 获取脚本级别，脚本等级主要控制字体大小，数值越大字体越小
         * @param child EDMmlNode节点类型不使用此参数
         * @return 返回结果值
         */
        EDMmlNode.prototype.scriptlevel = function (child) {
            if (child === void 0) { child = null; }
            // if (_scriptlevel != -1)
            //    return _scriptlevel;
            var parent_sl = 0;
            if (this._parent == null) {
                parent_sl = 0;
            }
            else {
                parent_sl = this._parent.scriptlevel(this);
            }
            // 查找此节点及此节点的父节点中，属性图中是否存在scriptleverl，主要存在与<mstyle>节点中
            /*scriptlevel
            主要控制字体大小。越高scriptlevel，较小的字体大小。该属性接受一个非负整数，以及一个“+”或“ - ”符号，用于递增或递减当前值。
            此外，该scriptlevel属性永远不会减小下面的字体大小scriptminsize，以避免无法读取的小字体大小，并取决于指定的倍数scriptsizemultiplier。
            scriptminsize 指定由于更改而允许的最小字体大小scriptlevel。默认值是8pt。
            scriptsizemultiplier 指定因用于调整字体大小而使用的乘数scriptlevel。默认值是0.71。*/
            var expl_sl_str = this.explicitAttribute('scriptlevel');
            if (expl_sl_str == null) {
                return parent_sl;
            }
            if (expl_sl_str.startsWith('+') || expl_sl_str.startsWith('-')) {
                var expl_sl_1 = expl_sl_str.toInt();
                if (expl_sl_1 !== NaN) {
                    return parent_sl + expl_sl_1;
                }
                else {
                    console.log('EDMmlNode::scriptlevel(): bad value ' + expl_sl_str);
                    return parent_sl;
                }
            }
            var expl_sl = expl_sl_str.toInt();
            if (expl_sl !== NaN) {
                return expl_sl;
            }
            if (expl_sl_str === '+') {
                return parent_sl + 1;
            }
            else if (expl_sl_str === '-') {
                return parent_sl - 1;
            }
            else {
                console.log('EDMmlNode::scriptlevel(): could not parse value: ' + expl_sl_str);
                return parent_sl;
            }
        };
        Object.defineProperty(EDMmlNode.prototype, "symbolType", {
            /**
             * @brief getSymbolType 获取当前节点的符号类型
             * @return 返回结果值
             */
            get: function () {
                return this._nSymbolType;
            },
            /// **
            // * @brief setScriptlevel 设置脚本级别，脚本等级主要控制字体大小，数值越大字体越小
            // * @param level =0不变，=1则加一，=-1则减一
            // */
            // void setScriptlevel(int level=0){_nScriptLevel = level;}
            /**
             * @brief setSymbolType 设置是节点的符号类型
             * @param type 该节点的符号类型
             */
            set: function (type) {
                if (type != null) {
                    this._nSymbolType = type;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "noneditable", {
            /**
     * @brief getFontBold 获取字体粗体类型
     * @return 返回的结果值
     */
            get: function () {
                return this._noneditable;
            },
            /**
             * @brief noneditable 设置节点的编辑状态
             * @param noneditable 是否不可编辑
             */
            set: function (noneditable) {
                this._noneditable = noneditable;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "noneditable4child", {
            /**
     * @brief noneditable4child 设置节点的所有子节点的编辑状态
     * @param isitalic 是否不可编辑
     */
            set: function (noneditable) {
                var child = this._first_child;
                for (; child != null; child = child.nextSibling) {
                    if (child.nodeType !== EDMathMlNodeType.TextNode) {
                        child.noneditable = noneditable;
                        child.noneditable4child = noneditable;
                    }
                    else if (child.toTextNode().text == "isNuLL!") {
                        child._noneditable = false;
                        child.parent.noneditable = false;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "fontSizeLevel", {
            // get childIsNoneditable(): boolean {
            //     let isnoneditable:boolean = this._noneditable;
            //     let child: EDMmlNode = this._first_child;
            //     for ( ; child != null; child = child.nextSibling ) {
            //         if (child.nodeType !== EDMathMlNodeType.TextNode) {
            //             if (!child.childIsNoneditable) {
            //                 isnoneditable = false;
            //             }
            //         }
            //     }
            //     return isnoneditable;
            // }
            /**
             * @brief setFontSizeLevel 设置字体大小百分比 遍历当前节点和子节点调用此函数
             * @param level 百分比数值
             */
            set: function (level) {
                if (level > 0) {
                    this._fFontSizeLevel = level;
                    var child = this._first_child;
                    for (; child != null; child = child.nextSibling) {
                        child.fontSizeLevel = level;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "baseFontPixelSize", {
            /**
             * @brief baseFontPixelSize 获取字体大小
             * @return 返回结果值
             */
            get: function () {
                return this._document.baseFontPixelSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "fontBold", {
            /**
             * @brief getFontBold 获取字体粗体类型
             * @return 返回的结果值
             */
            get: function () {
                return this._bFontBold;
            },
            /**
             * @brief setFontBold 设置字体粗体类型
             * @param isbold 是否粗体
             */
            set: function (isbold) {
                this._bFontBold = isbold;
                var child = this._first_child;
                for (; child != null; child = child.nextSibling) {
                    if (child.nodeType !== EDMathMlNodeType.TextNode) {
                        child.fontBold = isbold;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "fontItalic", {
            /**
             * @brief getFontItalic 获取字体斜体类型
             * @return 返回的结果值
             */
            get: function () {
                return this._bFontItalic;
            },
            /**
             * @brief setFontItalic 设置字体斜体类型
             * @param isitalic 是否斜体
             */
            set: function (isitalic) {
                this._bFontItalic = isitalic;
                var child = this._first_child;
                for (; child != null; child = child.nextSibling) {
                    if (child.nodeType !== EDMathMlNodeType.TextNode) {
                        child.fontItalic = isitalic;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief getFontBold 获取子节点字体粗体类型
         * @return 返回的结果值
         */
        EDMmlNode.prototype.getChildBold = function () {
            if (this._bFontBold) {
                return true;
            }
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (child.nodeType !== EDMathMlNodeType.TextNode) {
                    if (child.getChildBold()) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * @brief getChilItalic 获取子节点字体斜体类型
         * @return 返回的结果值
         */
        EDMmlNode.prototype.getChildItalic = function () {
            if (this._bFontItalic) {
                return true;
            }
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (child.nodeType !== EDMathMlNodeType.TextNode) {
                    if (child.getChildItalic()) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * @brief setColAlignType 设置行对齐方式
         * @colaligntype 节点属性中"columnalign"的键值
         */
        EDMmlNode.prototype.setColAlignType = function (colaligntype) {
            // 匹配此节点所在父节点中
            var p = this;
            for (; p != null; p = p.parent) {
                if (p.nodeType === EDMathMlNodeType.MtableNode) {
                    p.addmyAttrMap('columnalign', colaligntype);
                    return true;
                }
            }
            return false;
        };
        /**
         * @brief hasMtable 查找当前节点是否属于mtable节点，即向上查找
         */
        EDMmlNode.prototype.hasMtable = function (curtype) {
            // 匹配此节点所在父节点中
            var p = this;
            for (; p != null; p = p.parent) {
                if (p.nodeType === EDMathMlNodeType.MtableNode) {
                    var map = p.myAttrMap;
                    var columnalign = 'left';
                    if (map.has('columnalign')) {
                        columnalign = map.get('columnalign');
                    }
                    if (curtype.length > 0) {
                        curtype[0] = columnalign;
                    }
                    return true;
                }
            }
            return false;
        };
        /**
         * @brief childhasMtable 查找当前节点的子节点是否存在mtable节点，即向下查找
         */
        EDMmlNode.prototype.childhasMtable = function () {
            if (this.nodeType === EDMathMlNodeType.MtableNode) {
                return true;
            }
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                if (child.nodeType !== EDMathMlNodeType.TextNode) {
                    if (child.nodeType === EDMathMlNodeType.MtableNode) {
                        return true;
                    }
                }
            }
            return false;
        };
        Object.defineProperty(EDMmlNode.prototype, "parent", {
            // Node stuff
            /**
             * @brief parent 获取父节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () { return this._parent; },
            /**
             * @brief parent 设置父节点
             */
            set: function (newnode) {
                // if (newnode == null && this._ele != null) {
                //     if (this._parent) {
                //         if (this._parent._ele) {
                //             if (this._parent._ele.contains(this._ele)) {
                //                 this._parent._ele.removeChild(this._ele);
                //             }
                //         }
                //     }
                // }
                this._parent = newnode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "firstChild", {
            /**
             * @brief firstChild 获取第一个子节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () { return this._first_child; },
            /**
             * @brief parent 设置第一个子节点
             */
            set: function (newnode) {
                // if (newnode != null) {
                //     if (newnode._ele && this._ele) {
                //         if (this._ele.firstElementChild) {
                //             this._ele.replaceChild(this._ele.firstElementChild, newnode._ele);
                //         }   
                //     }
                // }
                this._first_child = newnode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "nextSibling", {
            /**
             * @brief nextSibling 获取下一个同级节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () { return this._next_sibling; },
            /**
             * @brief parent 设置下一个同级节点
             */
            set: function (newnode) {
                this._next_sibling = newnode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "previousSibling", {
            /**
             * @brief nextSibling 获取上一个同级节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () { return this._previous_sibling; },
            /**
             * @brief parent 设置上一个同级节点
             */
            set: function (newnode) {
                this._previous_sibling = newnode;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "lastSibling", {
            /**
             * @brief lastSibling 获取最后一个同级节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 返回最后一个同级节点
                var n = this;
                while (!n.isLastSibling()) {
                    n = n.nextSibling;
                }
                return n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "firstSibling", {
            /**
             * @brief firstSibling 获取第一个同级节点
             * @return 返回结果值，输出为EDMmlNode指针
             */
            get: function () {
                // 返回第一个同级节点
                var n = this;
                while (!n.isFirstSibling()) {
                    n = n.previousSibling;
                }
                return n;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlNode.prototype, "nodeId", {
            /** 此功能暂不使用
             * @brief getNodeId returns the node id of the current node//返回当前节点的节点ID
             * @return the node id of the current node                 //当前节点的节点ID
             */
            get: function () { return this._nodeId; } // 获取此节点属性图中的id值
            ,
            set: function (id) { this._nodeId = id; } // 获取此节点属性图中的id值
            ,
            enumerable: false,
            configurable: true
        });
        /**
         * @brief addmyAttrMap 新建节点属性图的key和对应的value
         * @param key 新增key
         * @param value 新增value
         * @return 返回结果值
         */
        EDMmlNode.prototype.addmyAttrMap = function (key, value) {
            if (this._attribute_map.has(key)) {
                this._attribute_map.set(key, value);
            }
            else {
                this._attribute_map.set(key, value);
            }
            return true;
        };
        /**
         * @brief isLastSibling 判断当前节点是否存在下一同级节点
         * @return 返回结果值
         */
        EDMmlNode.prototype.isLastSibling = function () { return (this._next_sibling == null); };
        /**
         * @brief isFirstSibling 判断当前节点是否存在上一同级节点
         * @return 返回结果值
         */
        EDMmlNode.prototype.isFirstSibling = function () { return (this._previous_sibling == null); };
        /**
         * @brief hasChildNodes 判断当前节点是否存在子节点
         * @return 返回结果值
         */
        /*protected*/ EDMmlNode.prototype.hasChildNodes = function () { return (this._first_child != null); };
        /**
         * @brief layoutSymbol 布局符号，遍历当前节点和子节点，调用此函数，计算并设置相对原点坐标setRelOrigin
         */
        EDMmlNode.prototype.layoutSymbol = function () {
            // default behaves like an mrow//默认行为像一个mrow
            // now lay them out in a neat row, aligning their origins to my origin//现在将它们排成一排，将它们的原点与我的原点对齐
            var w = 0.0;
            var child = this._first_child;
            for (; child != null; child = child.nextSibling) {
                var space = -1;
                // if (child.nodeType === EDMathMlNodeType.MiNode) {
                //     space = this.font.pixelSize*EDStatic.g_node_space;
                // }
                // if (child.nodeType === EDMathMlNodeType.MnNode) {
                //     space = this.font.pixelSize*EDStatic.g_node_space*0.5;
                // }   
                if (child.nodeType === EDMathMlNodeType.MoNode) {
                    if (child.firstChild) {
                        if (child.firstChild.toTextNode().text.length >= 1) { // 减少判断次数
                            if (child.firstChild.toTextNode().text === 'isIndentation!') {
                                child.firstChild.updateMyRect();
                                w = w + child.firstChild.myRect.x - child.firstChild.myRect.width - space;
                            }
                            else if (child.firstChild.toTextNode().text === 'isSpace_1!') {
                                space = -space + child.font.pixelSize * 0.1;
                            }
                            else if (child.firstChild.toTextNode().text === 'isSpace_2!') {
                                space = -space + child.font.pixelSize * 0.2;
                            }
                            else if (child.firstChild.toTextNode().text === 'isSpace_3!') {
                                space = -space + child.font.pixelSize * 0.3;
                            }
                            else if (child.firstChild.toTextNode().text === 'isSpace_4!') {
                                space = -space + child.font.pixelSize * 0.4;
                            }
                            else if (child.firstChild.toTextNode().text === 'isSpace_5!') {
                                space = -space + child.font.pixelSize * 0.5;
                            }
                        }
                    }
                }
                child.relOrigin = new egPoint(w, 0.0);
                w += child.parentRect.width + space; // + 1.0;
            }
        };
        /**
         * @brief paintSymbol 绘图符号，遍历当前节点和子节点，调用此函数，绘制矩形框架，EDMmlNode节点不使用第二个、第三个参数
         * @param painter QPainter类指针
         */
        // QPainter *painter, qreal x_scaling, qreal y_scaling
        EDMmlNode.prototype.paintSymbol = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            var d_rect = this.deviceRect;
            // 绘制矩形框架条件
            if (null != d_rect && !outputPng
                && (this._document.drawFrames || this.isShowRect)) {
                painter.save();
                // 绘制虚线
                if (painter.lineWidth !== 1) {
                    painter.lineWidth = 1;
                }
                if (painter.strokeStyle !== 'rgb(255, 0, 0)') {
                    painter.strokeStyle = 'rgb(255, 0, 0)';
                }
                painter.setLineDash([5, 5]);
                painter.moveTo(d_rect.left(), d_rect.top());
                painter.beginPath();
                painter.lineTo(d_rect.right(), d_rect.top());
                painter.lineTo(d_rect.right(), d_rect.bottom());
                painter.lineTo(d_rect.left(), d_rect.bottom());
                painter.lineTo(d_rect.left(), d_rect.top());
                painter.closePath();
                painter.stroke();
                painter.restore();
                // console.log(`paintSymbol) ${this.tag}:${d_rect}\n`);
            }
        };
        /**
         * @brief symbolRect 获取符号矩形
         * @return 返回结果值，输出为QRectF
         */
        EDMmlNode.prototype.symbolRect = function () { return new egRect(0.0, 0.0, 0.0, 0.0); };
        // EDMmlNode *parentWithExplicitAttribute( const QString &name, EDMathMlNodeType type = EDMathMlNodeType::NoNode );//父显式属性 屏蔽 不使用
        /**
         * @brief interpretSpacing 解析间距，根据valuse值获取对应的间距大小
         * @return 返回结果值
         */
        EDMmlNode.prototype.interpretSpacing = function (value, ok, base_value) {
            return EdrawMathDate.EDStatic.mmlInterpretSpacing(value, this.em, this.ex, ok, this._document.baseFontPixelSize, EdrawMathDate.EDMmlDocument.mmToPixelFactor);
        };
        Object.defineProperty(EDMmlNode.prototype, "lineWidth", {
            /**
             * @brief lineWidth 线宽，下划线和删除线的宽度，并根据字体的磅值大小进行调整
             * @return 返回结果值
             */
            get: function () {
                // 获取线宽
                return this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier > 1 ? this.font.pixelSize * EdrawMathDate.EDStatic.g_base_line_multiplier : 1;
                // return qMax( 1.0, QFontMetricsF( font() ).lineWidth() );
            },
            enumerable: false,
            configurable: true
        });
        return EDMmlNode;
    }());
    EdrawMathDate.EDMmlNode = EDMmlNode;
    var EDMmlTokenNode = /** @class */ (function (_super) {
        __extends(EDMmlTokenNode, _super);
        function EDMmlTokenNode(type, document, attribute_map) {
            return _super.call(this, type, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlTokenNode.prototype, "text", {
            /**
             * @brief text 获取文本，将子节点中所有TextNode中的text拼接起来导出
             *             注意：标准格式下有且只有一个TextNode
             * @return 返回结果值，输出为QString
             */
            get: function () {
                var result = '';
                var child = this.firstChild;
                for (; child != null; child = child.nextSibling) {
                    if (child.nodeType !== EDMathMlNodeType.TextNode) {
                        continue;
                    }
                    if (result.length > 0) {
                        result += ''; // 将' '改为''
                    }
                    var textnode = child.toTextNode();
                    if (textnode != null) {
                        result += child.toTextNode().text;
                    }
                }
                return result;
            },
            enumerable: false,
            configurable: true
        });
        return EDMmlTokenNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlTokenNode = EDMmlTokenNode;
    var EDMmlUnknownNode = /** @class */ (function (_super) {
        __extends(EDMmlUnknownNode, _super);
        function EDMmlUnknownNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.UnknownNode, document, attribute_map) || this;
        }
        return EDMmlUnknownNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlUnknownNode = EDMmlUnknownNode;
    var EDMmlMphantomNodekenNode = /** @class */ (function (_super) {
        __extends(EDMmlMphantomNodekenNode, _super);
        /*例子 效果等同与隐藏文本，公式编辑器中基本不使用
        <mphantom>
            <mi> y </mi>
            <mo> + </mo>
        </mphantom>
        */
        function EDMmlMphantomNodekenNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MphantomNode, document, attribute_map) || this;
        }
        EDMmlMphantomNodekenNode.prototype.paint = function (painter, x_scaling, y_scaling, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
        };
        return EDMmlMphantomNodekenNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMphantomNodekenNode = EDMmlMphantomNodekenNode;
    var EDMmlMfencedNode = /** @class */ (function (_super) {
        __extends(EDMmlMfencedNode, _super);
        /*例子
        <mfenced open="{" close="}" separators=";;,">
            <mi>a</mi>
            <mi>b</mi>
            <mi>c</mi>
            <mi>d</mi>
            <mi>e</mi>
        </mfenced>
        */
        function EDMmlMfencedNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MfencedNode, document, attribute_map) || this;
        }
        return EDMmlMfencedNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMfencedNode = EDMmlMfencedNode;
    var EDMmlMalignMarkNode = /** @class */ (function (_super) {
        __extends(EDMmlMalignMarkNode, _super);
        function EDMmlMalignMarkNode(document) {
            return _super.call(this, EDMathMlNodeType.MalignMarkNode, document, new Map()) || this;
        }
        return EDMmlMalignMarkNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMalignMarkNode = EDMmlMalignMarkNode;
    var EDMmlMstyleNode = /** @class */ (function (_super) {
        __extends(EDMmlMstyleNode, _super);
        /*例子
        <mstyle displaystyle="true">
            <mfrac>
                <mn>1</mn>
                <mi>n</mi>
            </mfrac>
        </mstyle>
        */
        // DisplayStyle，指定是否为显示的方程使用更多的垂直空间，或者如果设置为false更紧凑的布局，则用于显示公式。
        // 当displaystyle设置为true时，会显示更大版本的运算符。
        // 说明：displaystyle在产品mathtype中无效果
        function EDMmlMstyleNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MstyleNode, document, attribute_map) || this;
        }
        return EDMmlMstyleNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMstyleNode = EDMmlMstyleNode;
    var EDMmlMrowNode = /** @class */ (function (_super) {
        __extends(EDMmlMrowNode, _super);
        /*例子
        <mrow>
            <mn>3</mn>
            <mi>x</mi>
         </mrow>
        */
        function EDMmlMrowNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MrowNode, document, attribute_map) || this;
        }
        return EDMmlMrowNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMrowNode = EDMmlMrowNode;
    var EDMmlMerrorNode = /** @class */ (function (_super) {
        __extends(EDMmlMerrorNode, _super);
        /*例子
        <merror>
            <mrow>
                <mtext> Division by zero: </mtext>
                <mfrac>
                    <mn> 1 </mn>
                    <mn> 0 </mn>
                </mfrac>
            </mrow>
        </merror>
        */
        function EDMmlMerrorNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MerrorNode, document, attribute_map) || this;
        }
        return EDMmlMerrorNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlMerrorNode = EDMmlMerrorNode;
    var EDMmlSpacingNode = /** @class */ (function (_super) {
        __extends(EDMmlSpacingNode, _super);
        function EDMmlSpacingNode(type, document, attribute_map) {
            return _super.call(this, type, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlSpacingNode.prototype, "width", {
            /**
             * @brief width 获取宽度间距，默认为第一个子节点的绘图矩形宽度，如果在属性图中匹配到"width",则为解析间距的结果
             * @return 返回结果值
             */
            get: function () {
                var child_width = 0.0;
                if (this.firstChild != null) {
                    child_width = this.firstChild.myRect.width;
                }
                var value = this.explicitAttribute('width');
                if (value == null) {
                    return child_width;
                }
                var ok = [false];
                var w = this.interpretSpacing(value, ok, child_width);
                if (ok[0]) {
                    return w;
                }
                return child_width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlSpacingNode.prototype, "height", {
            /**
             * @brief height 获取高度间距，默认为第一个子节点的绘图矩形-y坐标，如果在属性图中匹配到"height",则为解析间距的结果
             * @return 返回结果值
             */
            get: function () {
                var cr = new egRect(0, 0, 0, 0);
                if (this.firstChild != null) {
                    cr = this.firstChild.myRect;
                }
                var value = this.explicitAttribute('height');
                if (value == null) {
                    return -cr.top();
                }
                var ok = [false];
                var h = this.interpretSpacing(value, ok, -cr.top());
                if (ok[0]) {
                    return h;
                }
                return -cr.top();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlSpacingNode.prototype, "depth", {
            /**
             * @brief depth 获取深度间距，默认为第一个子节点的绘图矩形底部，如果在属性图中匹配到"depth",则为解析间距的结果
             * @return 返回结果值
             */
            get: function () {
                var cr = new egRect(0, 0, 0, 0);
                if (this.firstChild != null) {
                    cr = this.firstChild.myRect;
                }
                var value = this.explicitAttribute('depth');
                if (value == null) {
                    return cr.bottom();
                }
                var ok = [false];
                var h = this.interpretSpacing(value, ok, cr.bottom());
                if (ok[0]) {
                    return h;
                }
                return cr.bottom();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief layoutSymbol 布局符号，设置子节点的相对原点坐标setRelOrigin
         *                     设置值为QPointF( 0.0, 0.0 )，相当于不操作
         */
        EDMmlSpacingNode.prototype.layoutSymbol = function () {
            if (this.firstChild == null) {
                return;
            }
            this.firstChild.relOrigin = new egPoint(0.0, 0.0);
        };
        /**
         * @brief symbolRect 获取符号矩形, QRectF( 0.0, -height(), width(), height() + depth() )
         * @return 返回结果值，输出为QRectF
         */
        EDMmlSpacingNode.prototype.symbolRect = function () {
            return new egRect(0.0, -this.height, this.width, this.height + this.depth);
        };
        /**
         * @brief interpretSpacing 解析间距，将属性图中匹配到的结果值，与第一个子节点的绘制矩形比较，获得绘制矩形的变化值
         * @return 返回结果值
         */
        EDMmlSpacingNode.prototype.interpretSpacing = function (value, ok, base_value) {
            if (ok.length > 0) {
                ok[0] = false;
            }
            value.replace(' ', '');
            var sign = '';
            var factor_str = '';
            var pseudo_unit = '';
            var percent = false;
            // extract the sign //提取符号
            var idx = 0;
            if (idx < value.length && (value.charAt(idx) === '+' || value.charAt(idx) === '-')) {
                sign = value.charAt(idx++);
            }
            // extract the factor //提取因子
            while (idx < value.length && (value.charAt(idx).toInt() > 0 || value.charAt(idx) === '.')) {
                factor_str = factor_str + value.charAt(idx++);
            }
            if (factor_str === '') {
                factor_str = '1.0';
            }
            // extract the % sign //提取%符号
            if (idx < value.length && value.charAt(idx) === '%') {
                percent = true;
                ++idx;
            }
            // extract the pseudo-unit //提取伪单元
            pseudo_unit = value.slice(idx);
            var factor = factor_str.toFloat();
            if (factor < 0.0) {
                console.log("EDMmlSpacingNode::interpretSpacing(): could not parse ".concat(value, "\n"));
                return 0.0;
            }
            if (percent) {
                factor *= 0.01;
            }
            var cr = new egRect(0, 0, 0, 0);
            if (this.firstChild != null) {
                cr = this.firstChild.myRect;
            }
            var unit_size = 0;
            if (pseudo_unit.length <= 0) {
                unit_size = base_value;
            }
            else if (pseudo_unit === 'width') {
                unit_size = cr.width;
            }
            else if (pseudo_unit === 'height') {
                unit_size = -cr.top();
            }
            else if (pseudo_unit === 'depth') {
                unit_size = cr.bottom();
            }
            else {
                var unit_ok = [false];
                if (pseudo_unit === 'em' || pseudo_unit === 'ex'
                    || pseudo_unit === 'cm' || pseudo_unit === 'mm'
                    || pseudo_unit === 'in' || pseudo_unit === 'px') {
                    unit_size = this.interpretSpacing('1' + pseudo_unit, unit_ok);
                }
                else {
                    unit_size = this.interpretSpacing(pseudo_unit, unit_ok);
                }
                if (!unit_ok[0]) {
                    console.log("EDMmlSpacingNode::interpretSpacing(): could not parse ".concat(value, "\n"));
                    return 0.0;
                }
            }
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (sign.length <= 0) {
                return factor * unit_size;
            }
            else if (sign === '+') {
                return base_value + factor * unit_size;
            }
            else { // sign == "-"
                return base_value - factor * unit_size;
            }
        };
        return EDMmlSpacingNode;
    }(EDMmlNode));
    EdrawMathDate.EDMmlSpacingNode = EDMmlSpacingNode;
    var EDMmlMpaddedNode = /** @class */ (function (_super) {
        __extends(EDMmlMpaddedNode, _super);
        // 深度 设置或增加深度。可能的值：任何长度或增量/减量（以“+”或“ - ”为前缀的长度）。
        // 高度 设置或增加高度。可能的值：任何长度或增量/减量（以“+”或“ - ”为前缀的长度）。
        // 宽度 设置或增加宽度。可能的值：任何长度或增量/减量（以“+”或“ - ”为前缀的长度）。
        function EDMmlMpaddedNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MpaddedNode, document, attribute_map) || this;
        }
        Object.defineProperty(EDMmlMpaddedNode.prototype, "lspace", {
            /** MathML2伪单元lspace被允许，MathML3推荐中不再存在，现在已被删除。
             * @brief lspace 获取lspace的间距解析值
             * @return 返回结果值
             */
            get: function () {
                var value = this.explicitAttribute('lspace');
                if (value == null) {
                    return 0.0;
                }
                var ok = [false];
                var lspace = this.interpretSpacing(value, ok, 0.0);
                if (ok[0]) {
                    console.log("interpretSpacing = ".concat(lspace, "\n"));
                    return lspace;
                }
                return 0.0;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief symbolRect 获取符号矩形, QRectF( -lspace(), -height(), lspace() + width(), height() + depth() )
         * @return 返回结果值，输出为QRectF
         */
        EDMmlMpaddedNode.prototype.symbolRect = function () {
            return new egRect(-this.lspace, -this.height, this.lspace + this.width, this.height + this.depth);
        };
        return EDMmlMpaddedNode;
    }(EDMmlSpacingNode));
    EdrawMathDate.EDMmlMpaddedNode = EDMmlMpaddedNode;
    var EDMmlMspaceNode = /** @class */ (function (_super) {
        __extends(EDMmlMspaceNode, _super);
        function EDMmlMspaceNode(document, attribute_map) {
            return _super.call(this, EDMathMlNodeType.MspaceNode, document, attribute_map) || this;
        }
        return EDMmlMspaceNode;
    }(EDMmlSpacingNode));
    EdrawMathDate.EDMmlMspaceNode = EDMmlMspaceNode;
})(EdrawMathDate || (EdrawMathDate = {}));
