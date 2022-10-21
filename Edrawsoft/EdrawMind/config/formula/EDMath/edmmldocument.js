// 节点结构的处理类
// 实现了操作的中层接口，
// 主要实现节点结构的操作，
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDMmlDocument = /** @class */ (function () {
        function EDMmlDocument(EDMathMLDocument) {
            if (EDMathMLDocument === void 0) { EDMathMLDocument = null; }
            this._EDMathMLDocument = EDMathMLDocument;
            EDMmlDocument.s_initialized = false;
            if (EDMathMLDocument != null) {
                this._ctx = EDMathMLDocument.ctx;
            }
            else {
                this._ctx = null;
            }
            EDMmlDocument.s_MmToPixelFactor = 8;
            this._base_font_pixel_size = 20;
            this._ColAlignType = ColAlign.ColAlignLeft;
            this._nodeIdLookup = new Map();
            this._renderingData = [];
            this._renderingComplete = false;
            this.init();
        }
        /**
         * @brief delete 删除函数，清除数据
         */
        EDMmlDocument.prototype.delete = function () {
            this.clear();
        };
        Object.defineProperty(EDMmlDocument.prototype, "ctx", {
            get: function () {
                return this._ctx;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief delete 清除节点，清除渲染
         */
        EDMmlDocument.prototype.clear = function () {
            if (this._root_node != null) {
                this._root_node.delete();
                this._root_node = null;
            }
            this.clearRendering();
        };
        /**
         * @brief setContent 如果存在节点数据，则对节点数据重新布局，如果不存在，则导入mathml文本内容，对文本内容进行解析，创建对应的节点数据结构
         * @param text .mml文件的文本内容
         * @param errorMsg 错误信息
         * @param errorLine 错误所在行
         * @param errorColumn 错误所在列
         * @return 返回的结果值
         */
        EDMmlDocument.prototype.setContent = function (text, errorMsg, errorLine, errorColumn) {
            if (errorMsg === void 0) { errorMsg = []; }
            if (errorLine === void 0) { errorLine = [0]; }
            if (errorColumn === void 0) { errorColumn = [0]; }
            // clear(); //重绘修改，不清除节点树形结构数据，允许后续对节点进行操作
            if (null != this._root_node) {
                this.layout();
                return false;
            }
            // 文本转换第一步
            var newtext = text;
            // 清除无效格式
            var newreg = new RegExp(/\n*\r*/, 'g');
            newtext = newtext.replace(newreg, '');
            newtext = newtext.replace(/<mtext><\/mtext>/g, '');
            newtext = newtext.replace(/  <  /g, '');
            newtext = newtext.replace(/<mtext> <\/mtext>/g, '<mtext>#x2009;</mtext>');
            //导入文本前处理
            EdrawMathDate.EDStatic.g_arrowtext4replace.forEach(function (value, key) {
                var rx = new RegExp(value, 'g');
                newtext = newtext.replace(rx, key);
            });
            EdrawMathDate.EDStatic.g_special_conversion.forEach(function (value, key) {
                var newvalue = value.replace(/#x/g, "&#x");
                var reg = new RegExp(newvalue, 'g');
                newtext = newtext.replace(reg, value);
            });
            var pnewtext = [newtext];
            var prefix = EdrawMathDate.EDStatic.mmlEntityTable.entities(pnewtext); // 获取文件头
            // 添加文件头设置文本内容到dom中，为节点解析做准备
            var domparser = new DOMParser();
            var dom = domparser.parseFromString(prefix + pnewtext[0], "text/xml");
            // we don't have access to line info from now on//我们从现在开始无法访问线路信息
            if (errorLine.length > 0) {
                errorLine[0] = -1;
            }
            if (errorColumn.length > 0) {
                errorColumn[0] = -1;
            }
            var ok = [false];
            var root_node = this.domToMml(dom, ok, errorMsg); // 解析dom文件获得EDMmlNode树形结构数据
            if (!ok[0]) {
                console.log("root_node: ok = false");
                return false;
            }
            if (root_node == null) {
                if (errorMsg.length > 0) {
                    errorMsg[0] = "empty document";
                }
                console.log("root_node == null");
                return false;
            }
            this.insertChild(null, root_node, ['']); // 插入根节点
            this.updateNodeFont();
            this.layout();
            return true;
        };
        ;
        /**
         * @brief paint 绘图，设置根节点的相对坐标原点，从根节点开始执行节点的绘图(paint)
         * @param painter QPainter类指针
         * @param pos 相对原点坐标
         */
        EDMmlDocument.prototype.paint = function (painter, pos, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            if (this._root_node == null) {
                return;
            }
            // _root_node->setRelOrigin( pos - _root_node->myRect().topLeft() );//设置相对原 必须设置
            this._root_node.relOrigin = new egPoint(pos.x - this._root_node.myRect.left() + this._RelOrigin.x, pos.y - this._root_node.myRect.top() + this._RelOrigin.y); // 设置相对原点 必须设置
            this._root_node.paint(painter, 1.0, 1.0, outputPng);
        };
        ;
        // // 转储？ 打印节点的toStr()节点信息 目前未使用
        // dump(): void {
        //     if ( this._root_node == null ) {
        //         return;
        //     }
        //     let indent: string[] = [""]
        //     this._dump( this._root_node, indent );
        // }
        /**
         * @brief getEduStr 获取教育板块数学表达式文本，教育板块才使用
         * @param edudata 数学表达式相关数据
         */
        EDMmlDocument.prototype.getEduStr = function (edudata) {
            if (edudata === void 0) { edudata = null; }
            if (this._root_node == null) {
                return;
            }
            var str = [""];
            this._root_node.appendEduStr(str, edudata);
            return str[0];
        };
        /**
         * @brief size 获取根节点的绘图矩形(deviceRect)的大小
         */
        EDMmlDocument.prototype.size = function () {
            if (this._root_node == null) {
                return new egSize(0.0, 0.0);
            }
            return this._root_node.deviceRect.size();
        };
        ;
        Object.defineProperty(EDMmlDocument.prototype, "relOrgin", {
            // 获取根节点的相对原点
            get: function () {
                return this._RelOrigin;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief layout 布局，从根节点开始，执行节点的布局(layout)，拉伸(stretch)
         */
        EDMmlDocument.prototype.layout = function () {
            if (this._root_node == null) {
                return;
            }
            // EDMmlNode *newnode = _root_node->getNewNode();
            // if (newnode != nullptr) {
            //    newnode->layout();
            //    newnode->stretch();
            // } else {
            // QTime time;
            // time.start();
            // console.log(`layout start`);
            this._root_node.nodeLayout(); // 遍历布局
            // console.log(`layout end`);
            // qDebug()<<"layout:"<<time.elapsed()/1000.0<<"s";
            // time.start();
            this._root_node.nodeStretch(); // 遍历拉伸
            // qDebug()<<"stretch:"<<time.elapsed()/1000.0<<"s";
            return;
            /*
            time.start();
                _root_node->test(1);//测试
            qDebug()<<"test1:"<<time.elapsed()/1000.0<<"s";
            time.start();
                _root_node->test(2);//测试
            qDebug()<<"test2:"<<time.elapsed()/1000.0<<"s";
            time.start();
                _root_node->test(3);//测试
            qDebug()<<"test3:"<<time.elapsed()/1000.0<<"s";
            time.start();
                _root_node->test(4);//测试
            qDebug()<<"test4:"<<time.elapsed()/1000.0<<"s";
            //}*/
        };
        /**
         * @brief updateNodeFont 更新字体，从根节点开始，执行节点的nodeFont()
         *                       注意：为了提高运行效率，更新字体不再每次都自动更新
         *                            需要手动更新，当修改完字体相关参数后，需要整体更新或者从某个节点开始更新
         */
        EDMmlDocument.prototype.updateNodeFont = function () {
            if (this._root_node == null) {
                return;
            }
            // QTime time;
            // time.start();
            this._root_node.updateChildFont(); // 遍历
            // qDebug()<<"nodeFont:"<<time.elapsed()/1000.0<<"s";
        };
        /**
         * @brief size 获取字体类型名称
         * @param type 字体类型
         */
        EDMmlDocument.prototype.fontName = function (type) {
            switch (type) {
                case MmlFont.NormalFont:
                    return EDMmlDocument.s_normal_font_name;
                case MmlFont.FrakturFont:
                    return EDMmlDocument.s_fraktur_font_name;
                case MmlFont.SansSerifFont:
                    return EDMmlDocument.s_sans_serif_font_name;
                case MmlFont.ScriptFont:
                    return EDMmlDocument.s_script_font_name;
                case MmlFont.MonospaceFont:
                    return EDMmlDocument.s_monospace_font_name;
                case MmlFont.DoublestruckFont:
                    return EDMmlDocument.s_doublestruck_font_name;
            }
            return null;
        };
        /**
         * @brief setFontName 设置某种MmlFont字体类型的字体名称，在EDMmlNode::font()中调用
         * @param type 字体的MmlFont类型
         * @param name 字体的名字
         */
        EDMmlDocument.prototype.setfontName = function (type, name) {
            // clear rendering since using a new font will break rendering positions //由于使用新字体将会打乱渲染位置，因此清除渲染
            this.clearRendering();
            switch (type) {
                case MmlFont.NormalFont:
                    EDMmlDocument.s_normal_font_name = name;
                case MmlFont.FrakturFont:
                    EDMmlDocument.s_fraktur_font_name = name;
                    break;
                case MmlFont.SansSerifFont:
                    EDMmlDocument.s_sans_serif_font_name = name;
                    break;
                case MmlFont.ScriptFont:
                    EDMmlDocument.s_script_font_name = name;
                    break;
                case MmlFont.MonospaceFont:
                    EDMmlDocument.s_monospace_font_name = name;
                    break;
                case MmlFont.DoublestruckFont:
                    EDMmlDocument.s_doublestruck_font_name = name;
                    break;
            }
        };
        Object.defineProperty(EDMmlDocument.prototype, "baseFontPixelSize", {
            // 获取字体大小
            get: function () {
                return this._base_font_pixel_size;
            },
            // 设置字体大小
            set: function (size) {
                if (size < EDMmlDocument.mmToPixelFactor) {
                    size = EDMmlDocument.mmToPixelFactor;
                }
                this._base_font_pixel_size = size;
                this._RelOrigin.x = this._base_font_pixel_size * EdrawMathDate.EDStatic.g_relorigin_of_fontsize;
                this._RelOrigin.y = this._RelOrigin.x;
                this.clearRendering();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "foregroundColor", {
            // 获取前景色
            get: function () {
                return this._foreground_color;
            },
            // 设置前景色
            set: function (color) {
                this._foreground_color = color; // "rgb(0, 0, 0)"
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "backgroundColor", {
            // 获取背景色
            get: function () {
                return this._background_color;
            },
            // 设置背景色
            set: function (color) {
                this._background_color = color; // "rgb(255, 255, 255)"
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "drawFrames", {
            // 获取是否绘制框架
            get: function () {
                return this._draw_frames;
            },
            // 设置是否绘制框架
            set: function (drawFrames) {
                this._draw_frames = drawFrames;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "defaultMode", {
            // 获取是否默认显示模式
            get: function () {
                return this._defaultMode;
            },
            // 设置是否默认显示模式
            set: function (isdefault) {
                this._defaultMode = isdefault;
                this.layout();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument, "mmToPixelFactor", {
            // 获取最小字体因子
            get: function () {
                return this.s_MmToPixelFactor;
            },
            // 设置允许的最小字体的因子
            set: function (factor) {
                this.s_MmToPixelFactor = factor;
                EdrawMathDate.EDStatic.g_min_font_pixel_size_calc = factor * EdrawMathDate.EDStatic.g_min_font_pixel_size;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief rootisEmpty 判断根节点是否为空
         */
        EDMmlDocument.prototype.rootisEmpty = function () {
            if (this._root_node == null) {
                return true;
            }
            return false;
        };
        Object.defineProperty(EDMmlDocument.prototype, "miBold", {
            // 获取字母是否粗体
            get: function () {
                return this._bMiBold;
            },
            // 设置字母粗体
            set: function (isbold) {
                this._bMiBold = isbold;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "mnBold", {
            // 获取数字是否粗体
            get: function () {
                return this._bMnBold;
            },
            // 设置数字粗体
            set: function (isbold) {
                this._bMnBold = isbold;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "miItalic", {
            // 获取字母是否斜体
            get: function () {
                return this._bMiItalic;
            },
            // 设置字母斜体
            set: function (isitalic) {
                this._bMiItalic = isitalic;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "mnItalic", {
            // 获取数字是否斜体
            get: function () {
                return this._bMnItalic;
            },
            // 设置数字斜体
            set: function (isitalic) {
                this._bMnItalic = isitalic;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMmlDocument.prototype, "colAlignType", {
            // 设置默认行排列方式
            set: function (colaligntype) {
                this._ColAlignType = colaligntype;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief domToEDMmlNodeType 将dom的节点转换成Mathml节点
         * @param do_node Node节点
         */
        EDMmlDocument.prototype.domToEDMmlNodeType = function (do_node) {
            var mml_type = EDMathMlNodeType.NoNode;
            switch (do_node.nodeType) {
                case Node.ELEMENT_NODE: {
                    var tag = do_node.nodeName;
                    var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_tag(tag);
                    // treat urecognised tags as mrow   //将已识别的标签视为mrow
                    if (spec == null) {
                        mml_type = EDMathMlNodeType.UnknownNode;
                    }
                    else {
                        mml_type = spec.type;
                    }
                    // console.log(`domToEDMmlNodeType:${tag}`);
                    break;
                }
                case Node.TEXT_NODE:
                    mml_type = EDMathMlNodeType.TextNode;
                    break;
                case Node.DOCUMENT_NODE:
                    mml_type = EDMathMlNodeType.UnknownNode;
                    break;
                case Node.ENTITY_REFERENCE_NODE:
                    break;
                case Node.ATTRIBUTE_NODE:
                case Node.CDATA_SECTION_NODE:
                case Node.ENTITY_NODE:
                case Node.PROCESSING_INSTRUCTION_NODE:
                case Node.COMMENT_NODE:
                case Node.DOCUMENT_TYPE_NODE:
                case Node.DOCUMENT_FRAGMENT_NODE:
                case Node.NOTATION_NODE:
                // case QDomNode::BaseNode:
                // case QDomNode::CharacterDataNode:
                default:
                    break;
            }
            return mml_type;
        };
        /**
         * @brief getNode 获取鼠标点击的可编辑节点，从根节点开始，根据鼠标坐标值与节点的绘制矩形进行匹配，得到允许编辑的节点指针
         * @param mousepos 鼠标的坐标点位置
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.getNode = function (mousepos) {
            if (this._root_node == null) {
                return null;
            }
            // _root_node->setRelOrigin( QPointF( 0.0, 0.0 ) - _root_node->myRect().topLeft() );
            this._root_node.relOrigin = new egPoint(-this._root_node.myRect.left() + this._RelOrigin.x, -this._root_node.myRect.top() + this._RelOrigin.y);
            var clickednode = null;
            var rootdr = this._root_node.deviceRect;
            var x = mousepos.x;
            if (x <= rootdr.left()) {
                x = rootdr.left();
            }
            else if (x >= rootdr.right()) {
                x = rootdr.right();
            }
            var y = mousepos.y;
            if (y <= rootdr.top()) {
                y = rootdr.top();
            }
            else if (y >= rootdr.bottom()) {
                y = rootdr.bottom();
            }
            // clickednode = _root_node->mousePress(mousepos);//获取满足条件的鼠标点取的节点
            clickednode = this._root_node.mousePress(new egPoint(x, y)); // 获取满足条件的鼠标点取的节点
            return clickednode;
        };
        /**
         * @brief getNode 获取 可编辑节点指针的向量 和 可框选节点指针的想想组
         *                两者的主要差异在于 是否添加矩阵节点指针 和 向量添加父子节点时的顺序
         * @param editedvector 可编辑节点指针的向量的结果值
         * @param selectedvector 可框选节点指针的想想组的结果值
         */
        EDMmlDocument.prototype.getNodeVector = function (editedvector, selectedvector, checkSpecialType) {
            if (checkSpecialType === void 0) { checkSpecialType = true; }
            if (this._root_node == null) {
                return;
            }
            editedvector.splice(0);
            selectedvector.splice(0);
            // _root_node->setRelOrigin( QPointF( 0.0, 0.0 ) - _root_node->myRect().topLeft() );
            this._root_node.relOrigin = new egPoint(-this._root_node.myRect.left() + this._RelOrigin.x, -this._root_node.myRect.top() + this._RelOrigin.y);
            this._root_node.appendTo([], true, checkSpecialType); // 获取满足条件的鼠标编辑的节点
            this._root_node.appendTo(editedvector); // 获取满足条件的鼠标编辑的节点
            this._root_node.appendTo(selectedvector, false); // 获取满足条件的鼠标点取的节点
            // console.log(`getNodeVector _vecEditedNode`, editedvector);
            // console.log(`getNodeVector _vecSelectedNode`, selectedvector);
        };
        /**
         * @brief saveTo 保存至QDom函数，从根节点开始，执行保存至QDom函数(saveTo)
         * @param elem 使用该QDomElement添加(appendChild)新的子QDomElement
         */
        EDMmlDocument.prototype.saveTo = function (ele, isforcoyp) {
            if (isforcoyp === void 0) { isforcoyp = false; }
            if (this._root_node == null) {
                return false;
            }
            // save调整
            if (isforcoyp) {
                this._root_node.saveToForCopy(ele); //将相关节点数据保存到QDomElement中
            }
            else {
                this._root_node.saveTo(ele); // 将相关节点数据保存到QDomElement中
            }
            return true;
        };
        /**
         * @brief insertFrac 插入分数公式，新建一个完整格式的<mfrac>节点，使其成为node节点的下一同级节点
         * @param innode 输入的节点指针 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，分数公式为分子的最后一个个子节点
         * @param bevelled 设置<mfrac>的节点属性，=true表示斜线格式
         * @param script =true 脚本等级+1 =false 脚本等级不变
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertFrac = function (innode, outnode, bevelled, scriptup) {
            if (scriptup === void 0) { scriptup = false; }
            var frac_node = this.createMfracNode(bevelled, scriptup);
            if (scriptup) {
                outnode[0] = frac_node.firstChild.firstChild.firstChild.lastSibling;
            }
            else {
                outnode[0] = frac_node.firstChild.firstChild.lastSibling;
            }
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, frac_node, []);
        };
        /**
         *
         * @brief insertEnclose 插入enclose公式，新建一个完整格式的<menclose>节点，使其成为node节点的下一同级节点
         * @param innode 输入的节点指针 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param index 插入的公式索引值，以此来判断是notation的类型
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，分数公式为分子的最后一个个子节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertEnclose = function (innode, index, outnode) {
            var newnode = null;
            switch (index) {
                case EDMmlFormulaIndex.Enclose_div:
                    newnode = this.createMencloseNode('longdiv');
                    break;
                case EDMmlFormulaIndex.Enclose_tl:
                    newnode = this.createMencloseNode('top left');
                    break;
                case EDMmlFormulaIndex.Enclose_tr:
                    newnode = this.createMencloseNode('top right');
                    break;
                case EDMmlFormulaIndex.Enclose_bl:
                    newnode = this.createMencloseNode('bottom left');
                    break;
                case EDMmlFormulaIndex.Enclose_br:
                    newnode = this.createMencloseNode('bottom right');
                    break;
                case EDMmlFormulaIndex.Enclose_box:
                    newnode = this.createMencloseNode('box');
                    break;
                case EDMmlFormulaIndex.Enclose_up:
                    newnode = this.createMencloseNode('updiagonalstrike');
                    break;
                case EDMmlFormulaIndex.Enclose_down:
                    newnode = this.createMencloseNode('downdiagonalstrike');
                    break;
                case EDMmlFormulaIndex.Enclose_updown:
                    newnode = this.createMencloseNode('updiagonalstrike downdiagonalstrike');
                    break;
                case EDMmlFormulaIndex.Enclose_ver:
                    newnode = this.createMencloseNode('verticalstrike');
                    break;
                case EDMmlFormulaIndex.Enclose_hor:
                    newnode = this.createMencloseNode('horizontalstrike');
                    break;
                default:
                    break;
            }
            if (newnode == null) {
                return false;
            }
            outnode[0] = newnode.firstChild.firstChild.lastSibling;
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, newnode, []);
        };
        /**
         * @brief insertNpart 插入偏导数公式，新建一个完整格式的<mfrac>节点，修改为偏导数公式格式，使其成为node节点的下一同级节点
         * @param innode 输入的节点指针 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，偏导数公式为分子最后一个子节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertNpart = function (innode, outnode) {
            // 创建分数节点，并插入"∂"符号
            var frac_node = this.createMfracNode(false);
            this.insertPreText(frac_node.firstChild.firstChild, '<mo>&#x2202;</mo>');
            // insertPreText(frac_node->firstChild()->firstChild(),"");
            this.insertPreText(frac_node.firstChild.nextSibling.firstChild, '<mo>&#x2202;</mo>');
            // insertPreText(frac_node->firstChild()->nextSibling()->firstChild(),"");
            outnode[0] = frac_node.firstChild.firstChild.lastSibling;
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, frac_node, []);
        };
        /**
         * @brief insertSqrt 插入根号公式，新建一个完整格式的<msqrt>节点，使其成为node节点的下一同级节点
         * @param innode 输入的节点指针 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，根号公式为基值的最后一个子节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertSqrt = function (innode, outnode) {
            /*sqrt节点格式
            <sqrt>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </sqrt>
            */
            var sqrt_node = this.createNode(EDMathMlNodeType.MsqrtNode, new Map(), null, []);
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(sqrt_node, mrow_node, []);
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            outnode[0] = sqrt_node.firstChild.firstChild.lastSibling;
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, sqrt_node, []);
        };
        /**
         * @brief insertRoot 插入带索引的根号公式，新建一个完整格式的<mroot>节点，使其成为node节点的下一同级节点
         * @param innode 输入的节点指针 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，带索引的根号公式为基值的最后一个子节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertRoot = function (innode, outnode) {
            /*root节点格式
            <sqrt>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </sqrt>
            */
            var root_node = this.createNode(EDMathMlNodeType.MrootNode, new Map(), null, []);
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(root_node, mrow_node, []);
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(root_node, mrow_node2, []);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            outnode[0] = root_node.firstChild.firstChild.lastSibling;
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, root_node, []);
        };
        /**
         * @brief insertLayout 插入布局公式，根据type新建一个完整格式的空节点，使其成为node节点的下一同级节点
         * @param innode 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param index 插入的公式索引值，以此来判断是<under><over><overunder><subsup><sub><sup>中的哪一种节点
         * @param outnode 输出的节点指针 插入公式完成后，光标的节点指针，根据outtype选择返回的节点指针
         * @param outtype =0下一节点 =1返回基值的最后一个子节点，=2返回非基值的最后一个子节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertLayout = function (innode, index, outnode, outtype) {
            if (outtype === void 0) { outtype = 0; }
            var newnode = null;
            // let addmrow: boolean = false;
            if (index >= EDMmlFormulaIndex.Empty_uo && index <= EDMmlFormulaIndex.PreEmpty_bp) {
                if (index === EDMmlFormulaIndex.Empty_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Empty_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Empty_o) {
                    newnode = this.createMoverNode();
                }
                else if (index === EDMmlFormulaIndex.Empty_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Empty_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Empty_p) {
                    newnode = this.createMsupNode();
                }
                else if (index === EDMmlFormulaIndex.PreEmpty_p) {
                    newnode = this.createMmultiscriptsNode(false, false, false, true);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                else if (index === EDMmlFormulaIndex.PreEmpty_b) {
                    newnode = this.createMmultiscriptsNode(false, false, true, false);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                else if (index === EDMmlFormulaIndex.PreEmpty_bp) {
                    newnode = this.createMmultiscriptsNode(false, false, true, true);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                else if (null == newnode) {
                    return false;
                }
                if (1 === outtype) {
                    outnode[0] = newnode.firstChild.firstChild.lastSibling;
                }
            }
            else if (index >= EDMmlFormulaIndex.SubSup && index <= EDMmlFormulaIndex.Sup) {
                if (index === EDMmlFormulaIndex.SubSup) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Sub) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Sup) {
                    newnode = this.createMsupNode();
                }
                if (null == newnode) {
                    return false;
                }
                outnode[0] = newnode.firstChild.nextSibling.firstChild.lastSibling;
                if (outnode.length > 1) {
                    outnode[1] = newnode.firstChild.firstChild.lastSibling;
                }
                newnode.firstChild.firstChild.firstChild.toTextNode().text = '';
            }
            else if (index >= EDMmlFormulaIndex.PreSubSup && index <= EDMmlFormulaIndex.PreSup) {
                if (index === EDMmlFormulaIndex.PreSubSup) {
                    newnode = this.createMmultiscriptsNode(false, false, true, true);
                    outnode[0] = newnode.firstChild.lastSibling.previousSibling.firstChild.lastSibling;
                }
                if (index === EDMmlFormulaIndex.PreSub) {
                    newnode = this.createMmultiscriptsNode(false, false, true, false);
                    outnode[0] = newnode.firstChild.lastSibling.previousSibling.firstChild.lastSibling;
                }
                if (index === EDMmlFormulaIndex.PreSup) {
                    newnode = this.createMmultiscriptsNode(false, false, false, true);
                    outnode[0] = newnode.firstChild.lastSibling.firstChild.lastSibling;
                }
                if (null == newnode) {
                    return false;
                }
                if (outnode.length > 1) {
                    outnode[1] = newnode.firstChild.firstChild.lastSibling;
                }
                newnode.firstChild.firstChild.firstChild.toTextNode().text = '';
            }
            else if (index >= EDMmlFormulaIndex.LargeEmpty_uo && index <= EDMmlFormulaIndex.PreLargeEmpty_bp) {
                // 创建mfrac节点
                // EDMmlAttributeMap mml_attr;
                // mml_attr["mathsize"] = "140%";
                // EDMmlNode *mstyle = this.createNode( EDMathMlNodeType.MstyleNode, mml_attr, QString.null, 0 );
                if (index === EDMmlFormulaIndex.LargeEmpty_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LargeEmpty_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LargeEmpty_o) {
                    newnode = this.createMoverNode();
                }
                else if (index === EDMmlFormulaIndex.LargeEmpty_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.LargeEmpty_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.LargeEmpty_p) {
                    newnode = this.createMsupNode();
                }
                else if (index === EDMmlFormulaIndex.PreLargeEmpty_p) {
                    newnode = this.createMmultiscriptsNode(false, false, false, true);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                else if (index === EDMmlFormulaIndex.PreLargeEmpty_b) {
                    newnode = this.createMmultiscriptsNode(false, false, true, false);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                else if (index === EDMmlFormulaIndex.PreLargeEmpty_bp) {
                    newnode = this.createMmultiscriptsNode(false, false, true, true);
                    newnode.firstChild.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                }
                if (null == newnode) {
                    return false;
                }
                var mstyle = [newnode.firstChild];
                var mml_attr = new Map();
                mml_attr.set('mathsize', '140%');
                this.insertMstyleNode(mstyle, mml_attr);
                // newnode->firstChild()->setFontSizeLevel(1.4);
                // newnode->setScriptlevel(-1);
            }
            else if (index >= EDMmlFormulaIndex.SupMin && index <= EDMmlFormulaIndex.LeftMin) {
                newnode = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                var mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                this.insertChild(newnode, mrow, [], false);
                mrow.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                if (index === EDMmlFormulaIndex.SupMin) {
                    this.insertText(mrow, '<mo>&#x2032;</mo>');
                }
                else if (index === EDMmlFormulaIndex.SupSec) {
                    this.insertText(mrow, '<mo>&#x2033;</mo>');
                }
                else if (index === EDMmlFormulaIndex.SupMilliSec) {
                    this.insertText(mrow, '<mo>&#x2034;</mo>');
                }
                else if (index === EDMmlFormulaIndex.LeftMin) {
                    this.insertPreText(mrow, '<mo>&#x2035;</mo>');
                }
                outnode[0] = mrow.firstChild;
            }
            else if (index === EDMmlFormulaIndex.insertMrow) {
                if (null == innode.previousSibling && null == innode.nextSibling) {
                    console.log("~~~~~insertMrow failed");
                    return false;
                }
                newnode = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                newnode.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                outnode[0] = newnode.firstChild.lastSibling;
            }
            else if (index == EDMmlFormulaIndex.sup2) {
                newnode = this.createMsupNode();
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild.nextSibling.firstChild.lastSibling, "2");
                newnode.firstChild.nextSibling.firstChild.firstChild.toTextNode().text = '';
                newnode.firstChild.firstChild.firstChild.toTextNode().text = '';
                // if (1 === outtype) {
                //     outnode[0] = newnode.firstChild.firstChild.lastSibling;
                // }
            }
            else if (index == EDMmlFormulaIndex.eX) {
                newnode = this.createMsupNode();
                if (null == newnode) {
                    return false;
                }
                newnode.firstChild.firstChild.lastSibling.firstChild.toTextNode().text = '';
                this.insertText(newnode.firstChild.firstChild.lastSibling, "e");
                if (1 === outtype) {
                    outnode[0] = newnode.firstChild.nextSibling.firstChild.lastSibling;
                }
            }
            else if (index == EDMmlFormulaIndex.tenX) {
                newnode = this.createMsupNode();
                if (null == newnode) {
                    return false;
                }
                newnode.firstChild.firstChild.lastSibling.firstChild.toTextNode().text = '';
                this.insertText(newnode.firstChild.firstChild.lastSibling, "1");
                this.insertText(newnode.firstChild.firstChild.lastSibling, "0");
                if (1 === outtype) {
                    outnode[0] = newnode.firstChild.nextSibling.firstChild.lastSibling;
                }
            }
            else if (index == EDMmlFormulaIndex.divided) {
                console.log("~~~~key_divided");
                var frac_node = this.createMfracNode(false, false);
                outnode[1] = frac_node.firstChild.firstChild.lastSibling;
                outnode[0] = frac_node.firstChild.nextSibling.firstChild.lastSibling;
                return this.insertNextSibling(innode, frac_node, []);
            }
            if (null == newnode) {
                return false;
            }
            if (2 === outtype) {
                //outnode[0] = newnode.firstChild.nextSibling.firstChild.lastSibling;
                outnode[0] = newnode.firstChild.firstChild.firstChild.lastSibling;
            }
            this.ifParentNotMrow(innode);
            if (!this.insertNextSibling(innode, newnode, [])) {
                return false;
            }
            return true;
        };
        /**
         * @brief insertInfin 插入取极限公式，根据type新建一个完整格式的空节点，修改为取极限公式格式，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param type 插入的节点类型，以此来判断是<under><over><overunder><subsup><sub><sup>中的哪一种节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertInfin = function (innode) {
            var newnode = null;
            newnode = this.createMunderNode();
            this.insertPreText(newnode.firstChild.nextSibling.firstChild, 'x');
            this.deleteNode(newnode.firstChild.nextSibling.firstChild.nextSibling);
            this.insertText(newnode.firstChild.nextSibling.firstChild, '<mo>&#x2192;</mo>');
            this.insertText(newnode.firstChild.nextSibling.firstChild.nextSibling, '<mo>&#x221E;</mo>');
            var mo_node1 = this.createNode(EDMathMlNodeType.MiNode, new Map(), null, []);
            this.insertChild(newnode.firstChild, mo_node1, []);
            var text_node1 = this.createNode(EDMathMlNodeType.TextNode, new Map(), 'lim', []);
            this.insertChild(mo_node1, text_node1, []);
            this.deleteNode(newnode.firstChild.firstChild);
            this.ifParentNotMrow(innode);
            return this.insertNextSibling(innode, newnode, []);
        };
        EDMmlDocument.prototype.insertOther = function (node, functype, outnode) {
            var newnode = null;
            var insert = true;
            newnode = this.createMunderNode();
            // 上方
            this.insertText(newnode.firstChild, '<mo>lim</mo>', false);
            // this.insertText(newnode.firstChild, '<mo>lim</mo>', false);
            // 下方 <mi>n</mi><mo>&#x2192;</mo><mo>&#x221E;</mo>
            var mo_node2 = this.textChangeType("<mo>&#x2192;</mo>");
            var mo_node3 = this.textChangeType("<mo>&#x221E;</mo>");
            var mo_node1 = this.createNode(EDMathMlNodeType.MoNode, new Map(), null, []);
            // let mo_node2: EDMmlNode = this.createNode(EDMathMlNodeType.MoNode, new Map<string, string>(), null, []);
            // let mo_node3: EDMmlNode = this.createNode(EDMathMlNodeType.MoNode, new Map<string, string>(), null, []);
            var text_node1 = this.createNode(EDMathMlNodeType.TextNode, new Map(), 'n', []);
            // let text_node2: EDMmlNode = this.createNode(EDMathMlNodeType.TextNode, new Map<string, string>(), '&#x2192;', []);
            // let text_node3: EDMmlNode = this.createNode(EDMathMlNodeType.TextNode, new Map<string, string>(), '&#x221E;', []);
            // mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            newnode.firstChild.nextSibling.nextSibling.firstChild.firstChild.toTextNode().text = '';
            this.insertChild(mo_node1, text_node1, []);
            // this.insertChild(mo_node2, text_node2, []);
            // this.insertChild(mo_node3, text_node3, []);
            this.insertChild(newnode.firstChild.nextSibling.nextSibling, mo_node1, []);
            this.insertChild(newnode.firstChild.nextSibling.nextSibling, mo_node2, []);
            this.insertChild(newnode.firstChild.nextSibling.nextSibling, mo_node3, []);
            // newnode.firstChild.nextSibling.nextSibling.firstChild.delete();
            // 
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mrow_node, mrow_node2, [], false);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 插入操作符节点
            var ok = this.insertPreSibling(mrow_node2, newnode, []);
            if (insert) {
                this.deleteNode(newnode.firstChild);
            }
            this.ifParentNotMrow(node);
            if (!this.insertNextSibling(node, mrow_node, [])) {
                return false;
            }
            outnode[0] = mrow_node2.firstChild.lastSibling;
            return true;
        };
        /**
         * @brief insertInt 插入积分公式，根据inttype新建一个完整格式的空节点，修改为积分公式格式，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param index 积分公式的类型，以此来判断积分符号和节点类型
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertInt = function (node, index, outnode) {
            var newnode = null;
            var insert = true;
            if (index >= EDMmlFormulaIndex.Sum_uo && index <= EDMmlFormulaIndex.Sum_b) {
                if (index === EDMmlFormulaIndex.Sum_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Sum_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Sum_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Sum_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Sum) {
                    newnode = this.textChangeType("<mo>&#x2211;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2211;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Product_uo && index <= EDMmlFormulaIndex.Product_b) {
                if (index === EDMmlFormulaIndex.Product_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Product_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Product_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Product_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Product) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x220F;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x220F;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.CoProduct_uo && index <= EDMmlFormulaIndex.CoProduct_b) {
                if (index === EDMmlFormulaIndex.CoProduct_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.CoProduct_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.CoProduct_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.CoProduct_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.CoProduct) {
                    newnode = this.textChangeType("<mo>&#x2210;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2210;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Intersection_uo && index <= EDMmlFormulaIndex.Intersection_b) {
                if (index === EDMmlFormulaIndex.Intersection_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Intersection_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Intersection_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Intersection_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Intersection) {
                    newnode = this.textChangeType("<mo>&#x22C2;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x22C2;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Union_uo && index <= EDMmlFormulaIndex.Union_b) {
                if (index === EDMmlFormulaIndex.Union_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Union_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Union_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Union_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Union) {
                    newnode = this.textChangeType("<mo>&#x22C3;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x22C3;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Lor_uo && index <= EDMmlFormulaIndex.Lor_b) {
                if (index === EDMmlFormulaIndex.Lor_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Lor_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Lor_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Lor_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Lor) {
                    newnode = this.textChangeType("<mo>&#x22C1;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x22C1;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Land_uo && index <= EDMmlFormulaIndex.Land_b) {
                if (index === EDMmlFormulaIndex.Land_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Land_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Land_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Land_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Land) {
                    newnode = this.textChangeType("<mo>&#x22C0;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x22C0;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.Int_u && index <= EDMmlFormulaIndex.Int_b) {
                if (index === EDMmlFormulaIndex.Int_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Int_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Int_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.Int_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.Int) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x222B;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x222B;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.DoubleInt_u && index <= EDMmlFormulaIndex.DoubleInt_b) {
                if (index === EDMmlFormulaIndex.DoubleInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x222C;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x222C;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.TripleInt_u && index <= EDMmlFormulaIndex.TripleInt_b) {
                if (index === EDMmlFormulaIndex.TripleInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.TripleInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.TripleInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.TripleInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.TripleInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x222D;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x222D;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.QuadrupleInt_u && index <= EDMmlFormulaIndex.QuadrupleInt_b) {
                if (index === EDMmlFormulaIndex.QuadrupleInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.QuadrupleInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.QuadrupleInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.QuadrupleInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.QuadrupleInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2A0C;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2A0C;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.ContourInt_u && index <= EDMmlFormulaIndex.ContourInt_b) {
                if (index === EDMmlFormulaIndex.ContourInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.ContourInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.ContourInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.ContourInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.ContourInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x222E;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x222E;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.SurfaceInt_u && index <= EDMmlFormulaIndex.SurfaceInt_b) {
                if (index === EDMmlFormulaIndex.SurfaceInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.SurfaceInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.SurfaceInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.SurfaceInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.SurfaceInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x222F;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x222F;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.VolumeInt_u && index <= EDMmlFormulaIndex.VolumeInt_b) {
                if (index === EDMmlFormulaIndex.VolumeInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.VolumeInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.VolumeInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.VolumeInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.VolumeInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2230;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2230;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.ClockwiseInt_u && index <= EDMmlFormulaIndex.ClockwiseInt_b) {
                if (index === EDMmlFormulaIndex.ClockwiseInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2231;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2231;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.CtClockwiseInt_u && index <= EDMmlFormulaIndex.CtClockwiseInt_b) {
                if (index === EDMmlFormulaIndex.CtClockwiseInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2A11;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2A11;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.ClockwiseContInt_u && index <= EDMmlFormulaIndex.ClockwiseContInt_b) {
                if (index === EDMmlFormulaIndex.ClockwiseContInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseContInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseContInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseContInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.ClockwiseContInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2232;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2232;</mo>', false);
                }
            }
            else if (index >= EDMmlFormulaIndex.CtClockwiseContInt_u && index <= EDMmlFormulaIndex.CtClockwiseContInt_b) {
                if (index === EDMmlFormulaIndex.CtClockwiseContInt_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseContInt_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseContInt_bp) {
                    newnode = this.createMsubsupNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseContInt_b) {
                    newnode = this.createMsubNode();
                }
                else if (index === EDMmlFormulaIndex.CtClockwiseContInt) {
                    //newnode = this.createMmultiscriptsNode(false, false, false, false);
                    newnode = this.textChangeType("<mo>&#x2233;</mo>");
                    newnode.fontSizeLevel = EdrawMathDate.EDStatic.g_largeop_multiplier;
                }
                if (null == newnode) {
                    return false;
                }
                if (insert) {
                    this.insertText(newnode.firstChild, '<mo>&#x2233;</mo>', false);
                }
            }
            else {
                return false;
            }
            if (null == newnode) {
                return false;
            }
            // 创建mrow节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mrow_node, mrow_node2, [], false);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 插入操作符节点
            var ok = this.insertPreSibling(mrow_node2, newnode, []);
            if (insert) {
                this.deleteNode(newnode.firstChild);
            }
            this.ifParentNotMrow(node);
            if (!this.insertNextSibling(node, mrow_node, [])) {
                return false;
            }
            outnode[0] = mrow_node2.firstChild.lastSibling;
            // if (!this.insertNextSibling(node, newnode, [])) {
            //     return false;
            // }
            // const mrow_node: EDMmlNode = this.createNode( EDMathMlNodeType.MrowNode, new Map<string, string>(), null, [] );
            // mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // const ok: boolean = this.insertNextSibling(newnode, mrow_node, []);
            // outnode[0] = mrow_node.firstChild.lastSibling;
            return ok;
        };
        /**
         * @brief insertArr 插入箭头公式，根据arrtype新建一个完整格式的空节点，修改为箭头公式格式，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param index 箭头公式的类型，以此来判断箭头符号和节点类型
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertArr = function (node, index, outnode) {
            var newnode = null;
            if (index >= EDMmlFormulaIndex.LeftArr_uo && index <= EDMmlFormulaIndex.LeftArr_o) {
                if (index === EDMmlFormulaIndex.LeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x2190;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LongLeftArr_uo && index <= EDMmlFormulaIndex.LongLeftArr_o) {
                if (index === EDMmlFormulaIndex.LongLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LongLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LongLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x27F5;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LeftTeeArr_uo && index <= EDMmlFormulaIndex.LeftTeeArr_o) {
                if (index === EDMmlFormulaIndex.LeftTeeArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LeftTeeArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LeftTeeArr_o) {
                }
                newnode = this.createMoverNode();
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21A4;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.DoubleLeftArr_uo && index <= EDMmlFormulaIndex.DoubleLeftArr_o) {
                if (index === EDMmlFormulaIndex.DoubleLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21D0;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.DbLongLeftArr_uo && index <= EDMmlFormulaIndex.DbLongLeftArr_o) {
                if (index === EDMmlFormulaIndex.DbLongLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.DbLongLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.DbLongLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x27F8;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.RightArr_uo && index <= EDMmlFormulaIndex.RightArr_o) {
                if (index === EDMmlFormulaIndex.RightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                if (index === EDMmlFormulaIndex.RightArr_u) {
                    newnode = this.createMunderNode();
                }
                if (index === EDMmlFormulaIndex.RightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x2192;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LongRightArr_uo && index <= EDMmlFormulaIndex.LongRightArr_o) {
                if (index === EDMmlFormulaIndex.LongRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LongRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LongRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x27F6;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.RightTeeArr_uo && index <= EDMmlFormulaIndex.RightTeeArr_o) {
                if (index === EDMmlFormulaIndex.RightTeeArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.RightTeeArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.RightTeeArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21A6;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.DoubleRightArr_uo && index <= EDMmlFormulaIndex.DoubleRightArr_o) {
                if (index === EDMmlFormulaIndex.DoubleRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.DoubleRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21D2;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.DbLongRightArr_uo && index <= EDMmlFormulaIndex.DbLongRightArr_o) {
                if (index === EDMmlFormulaIndex.DbLongRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.DbLongRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.DbLongRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x27F9;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LeftRightArr_uo && index <= EDMmlFormulaIndex.LeftRightArr_o) {
                if (index === EDMmlFormulaIndex.LeftRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LeftRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LeftRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x2194;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LongLeftRightArr_uo && index <= EDMmlFormulaIndex.LongLeftRightArr_o) {
                if (index === EDMmlFormulaIndex.LongLeftRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LongLeftRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LongLeftRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x27F7;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LeftArrRightArr_uo && index <= EDMmlFormulaIndex.LeftArrRightArr_o) {
                if (index === EDMmlFormulaIndex.LeftArrRightArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LeftArrRightArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LeftArrRightArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21C6;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.RightArrLeftArr_uo && index <= EDMmlFormulaIndex.RightArrLeftArr_o) {
                if (index === EDMmlFormulaIndex.RightArrLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.RightArrLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.RightArrLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21C4;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.ReverseEquilibrium_uo && index <= EDMmlFormulaIndex.ReverseEquilibrium_o) {
                if (index === EDMmlFormulaIndex.ReverseEquilibrium_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.ReverseEquilibrium_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.ReverseEquilibrium_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x021CB;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.Equilibrium_uo && index <= EDMmlFormulaIndex.Equilibrium_o) {
                if (index === EDMmlFormulaIndex.Equilibrium_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.Equilibrium_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.Equilibrium_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x21CC;</mo>', false);
                // newnode->firstChild()->nextSibling()->firstChild()->setArrSymbol(true);
            }
            else if (index >= EDMmlFormulaIndex.LongRArrShortLArr_uo && index <= EDMmlFormulaIndex.LongRArrShortLArr_o) {
                if (index === EDMmlFormulaIndex.LongRArrShortLArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LongRArrShortLArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LongRArrShortLArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x02942;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.ShortRArrLongLArr_uo && index <= EDMmlFormulaIndex.ShortRArrLongLArr_o) {
                if (index === EDMmlFormulaIndex.ShortRArrLongLArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.ShortRArrLongLArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.ShortRArrLongLArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#x02944;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LRightArrSLeftArr_uo && index <= EDMmlFormulaIndex.LRightArrSLeftArr_o) {
                // if (index ===  EDMmlFormulaIndex.LRightArrSLeftArr_uo) {
                //     newnode = this.createMunderoverNode();
                // } else if (index ===  EDMmlFormulaIndex.LRightArrSLeftArr_u) {
                //     newnode = this.createMunderNode();
                // } else if (index ===  EDMmlFormulaIndex.LRightArrSLeftArr_o) {
                //     newnode = this.createMoverNode();
                // }
                // if (null == newnode) {
                //     return false;
                // }
                // // 创建munder节点
                // const under_node: EDMmlNode = this.createNode( EDMathMlNodeType.MunderNode, new Map<string, string>(), null, []  );
                // this.insertOperator(under_node, '');
                // this.insertText(under_node.firstChild, '<mo>&#x2192;</mo>', false);
                // this.insertText(under_node.firstChild, '<mo>&#x2190;</mo>', false);
                // this.deleteNode(under_node.firstChild);
                // this.insertNextSibling(newnode.firstChild, under_node, []);
                if (index === EDMmlFormulaIndex.LRightArrSLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LRightArrSLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LRightArrSLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#xF2192;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.SRightArrLLeftArr_uo && index <= EDMmlFormulaIndex.SRightArrLLeftArr_o) {
                // if (index ===  EDMmlFormulaIndex.SRightArrLLeftArr_uo) {
                //     newnode = this.createMunderoverNode();
                // } else if (index ===  EDMmlFormulaIndex.SRightArrLLeftArr_u) {
                //     newnode = this.createMunderNode();
                // } else if (index ===  EDMmlFormulaIndex.SRightArrLLeftArr_o) {
                //     newnode = this.createMoverNode();
                // }
                // if (null == newnode) {
                //     return false;
                // }
                // // 创建munder节点
                // const under_node: EDMmlNode = this.createNode( EDMathMlNodeType.MoverNode, new Map<string, string>(), null, []  );
                // this.insertOperator(under_node, '');
                // this.insertText(under_node.firstChild, '<mo>&#x2190;</mo>', false);
                // this.insertText(under_node.firstChild, '<mo>&#x2192;</mo>', false);
                // this.deleteNode(under_node.firstChild);
                // this.insertNextSibling(newnode.firstChild, under_node, []);
                if (index === EDMmlFormulaIndex.SRightArrLLeftArr_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.SRightArrLLeftArr_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.SRightArrLLeftArr_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#xF2190;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.LRightVerSLeftVer_uo && index <= EDMmlFormulaIndex.LRightVerSLeftVer_o) {
                // if (index ===  EDMmlFormulaIndex.LRightVerSLeftVer_uo) {
                //     newnode = this.createMunderoverNode();
                // } else if (index ===  EDMmlFormulaIndex.LRightVerSLeftVer_u) {
                //     newnode = this.createMunderNode();
                // } else if (index ===  EDMmlFormulaIndex.LRightVerSLeftVer_o) {
                //     newnode = this.createMoverNode();
                // }
                // if (null == newnode) {
                //     return false;
                // }
                // // 创建munder节点
                // const under_node: EDMmlNode = this.createNode( EDMathMlNodeType.MunderNode, new Map<string, string>(), null, []  );
                // this.insertOperator(under_node, '');
                // this.insertText(under_node.firstChild, '<mo>&#x21BD;</mo>', false);
                // this.insertText(under_node.firstChild, '<mo>&#x21C0;</mo>', false);
                // this.deleteNode(under_node.firstChild);
                // this.insertNextSibling(newnode.firstChild, under_node, []);
                if (index === EDMmlFormulaIndex.LRightVerSLeftVer_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.LRightVerSLeftVer_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.LRightVerSLeftVer_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#xF21C0;</mo>', false);
            }
            else if (index >= EDMmlFormulaIndex.SRightVerLLeftVer_uo && index <= EDMmlFormulaIndex.SRightVerLLeftVer_o) {
                // if (index ===  EDMmlFormulaIndex.SRightVerLLeftVer_uo) {
                //     newnode = this.createMunderoverNode();
                // } else if (index ===  EDMmlFormulaIndex.SRightVerLLeftVer_u) {
                //     newnode = this.createMunderNode();
                // } else if (index ===  EDMmlFormulaIndex.SRightVerLLeftVer_o) {
                //     newnode = this.createMoverNode();
                // }
                // if (null == newnode) {
                //     return false;
                // }
                // // 创建munder节点
                // const under_node: EDMmlNode = this.createNode( EDMathMlNodeType.MoverNode, new Map<string, string>(), null, []  );
                // this.insertOperator(under_node, '');
                // this.insertText(under_node.firstChild, '<mo>&#x21C0;</mo>', false);
                // this.insertText(under_node.firstChild, '<mo>&#x21BD;</mo>', false);
                // this.deleteNode(under_node.firstChild);
                // this.insertNextSibling(newnode.firstChild, under_node, []);
                if (index === EDMmlFormulaIndex.SRightVerLLeftVer_uo) {
                    newnode = this.createMunderoverNode();
                }
                else if (index === EDMmlFormulaIndex.SRightVerLLeftVer_u) {
                    newnode = this.createMunderNode();
                }
                else if (index === EDMmlFormulaIndex.SRightVerLLeftVer_o) {
                    newnode = this.createMoverNode();
                }
                if (null == newnode) {
                    return false;
                }
                this.insertText(newnode.firstChild, '<mo>&#xF21BD;</mo>', false);
            }
            else {
                return false;
            }
            if (null == newnode) {
                return false;
            }
            this.deleteNode(newnode.firstChild);
            if (outnode[0] == null) {
                outnode[0] = newnode.firstChild.nextSibling.firstChild.lastSibling;
            }
            this.ifParentNotMrow(node);
            return this.insertNextSibling(node, newnode, []);
        };
        /**
         * @brief insertFunc 插入函数公式，根据arrtype新建一个完整格式的函数公式的所有节点，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param arrtype 函数公式的类型，以此来判断箭头符号和节点类型
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertFunc = function (node, functype, outnode) {
            var new_node = this.createBracket_LeftRight('<mo>&#x0028;</mo>', '<mo>&#x0029;</mo>'); // ()
            var mo_node1 = this.createNode(EDMathMlNodeType.MoNode, new Map(), null, []);
            var text_node1 = this.createNode(EDMathMlNodeType.TextNode, new Map(), '', []);
            this.insertChild(mo_node1, text_node1, []);
            var node_x = null;
            outnode[0] = new_node.firstChild.nextSibling.nextSibling.firstChild;
            switch (functype) {
                // case EDMmlFormulaIndex.fX:
                //     this.insertNextSibling( new_node.firstChild, mo_node1, [] );
                //     text_node1.toTextNode().text = '′(x)=';
                //     this.insertText(new_node.firstChild, 'f');
                //     break;
                case EDMmlFormulaIndex.sinX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'sin';
                    break;
                case EDMmlFormulaIndex.cosX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'cos';
                    break;
                case EDMmlFormulaIndex.tanX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'tan';
                    break;
                case EDMmlFormulaIndex.secX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'sec';
                    break;
                case EDMmlFormulaIndex.cscX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'csc';
                    break;
                case EDMmlFormulaIndex.cotX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'cot';
                    break;
                case EDMmlFormulaIndex.arcsinX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'arcsin';
                    break;
                case EDMmlFormulaIndex.arccosX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'arccos';
                    break;
                case EDMmlFormulaIndex.arctanX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'arctan';
                    break;
                case EDMmlFormulaIndex.arccotX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'arccot';
                    break;
                case EDMmlFormulaIndex.lgX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'lg';
                    break;
                case EDMmlFormulaIndex.lnX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'ln';
                    break;
                case EDMmlFormulaIndex.expX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'exp';
                    break;
                case EDMmlFormulaIndex.sin_X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '1', false);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '-', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'sin';
                    break;
                case EDMmlFormulaIndex.cos_X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '1', false);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '-', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'cos';
                    break;
                case EDMmlFormulaIndex.tan_X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '1', false);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '-', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'tan';
                    break;
                case EDMmlFormulaIndex.sin2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'sin';
                    break;
                case EDMmlFormulaIndex.cos2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'cos';
                    break;
                case EDMmlFormulaIndex.tan2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'tan';
                    break;
                case EDMmlFormulaIndex.sec2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'sec';
                    break;
                case EDMmlFormulaIndex.csc2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'csc';
                    break;
                case EDMmlFormulaIndex.cot2X:
                    node_x = this.createMsupNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    this.insertText(node_x.firstChild.nextSibling.firstChild, '2', false);
                    this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'cot';
                    break;
                case EDMmlFormulaIndex.logX:
                    node_x = this.createMsubNode();
                    this.insertNextSibling(new_node.firstChild, node_x, []);
                    this.insertNextSibling(node_x.firstChild.firstChild, mo_node1, []);
                    this.deleteNode(node_x.firstChild.firstChild);
                    // this.insertText(node_x.firstChild.nextSibling.firstChild,"2",false);
                    // this.deleteNode(node_x.firstChild.nextSibling.firstChild);
                    text_node1.toTextNode().text = 'log';
                    break;
                case EDMmlFormulaIndex.limX:
                    this.insertNextSibling(new_node.firstChild, mo_node1, []);
                    text_node1.toTextNode().text = 'lim';
                    break;
                default:
                    break;
            }
            if (null == new_node) {
                return false;
            }
            this.ifParentNotMrow(node);
            return this.insertNextSibling(node, new_node, []);
        };
        /**
         * @brief insertBracket 插入括号符公式，根据brackettype新建一个完整格式的空节点，修改为括号符公式格式，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param brackettype 箭头公式的类型，以此来判断箭头符号和节点类型
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertBracket = function (node, brackettype, outnode) {
            var new_node = null;
            //let mrow: EDMmlNode = null;
            //let type:number = -1; //lr=0  l=1 r=2 withbar=3 s=4
            var type = EDMmlNodeLayoutType.None;
            switch (brackettype) {
                case EDMmlFormulaIndex.VerticalBars_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x007C;</mo>', '<mo>&#x007C;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.VerticalBars_l:
                    new_node = this.createBracket_Left('<mo>&#x007C;</mo>');
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.VerticalBars_r:
                    new_node = this.createBracket_Right('<mo>&#x007C;</mo>');
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.DoubleVerticalBars_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x2016;</mo>', '<mo>&#x2016;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.DoubleVerticalBars_l:
                    new_node = this.createBracket_Left('<mo>&#x2016;</mo>');
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.DoubleVerticalBars_r:
                    new_node = this.createBracket_Right('<mo>&#x2016;</mo>');
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.DoubleBracket_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x27E6;</mo>', '<mo>&#x27E7;</mo>'); // x0301A x0301B
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.DoubleBracket_l:
                    new_node = this.createBracket_Left('<mo>&#x27E6;</mo>'); // x0301A
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.DoubleBracket_r:
                    new_node = this.createBracket_Right('<mo>&#x27E7;</mo>'); // x0301B
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.AngleBracket_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x2329;</mo>', '<mo>&#x232A;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.AngleBracket_l:
                    new_node = this.createBracket_Left('<mo>&#x2329;</mo>');
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.AngleBracket_r:
                    new_node = this.createBracket_Right('<mo>&#x232A;</mo>');
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.Floor_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x230A;</mo>', '<mo>&#x230B;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.Ceiling_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x2308;</mo>', '<mo>&#x2309;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.Floor_Ceiling:
                    new_node = this.createBracket_LeftRight('<mo>&#x230A;</mo>', '<mo>&#x2309;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.AngleBracketWithBar:
                    new_node = this.createBracket_LeftRight('<mo>&#x2329;</mo>', '<mo>&#x232A;</mo>');
                    type = EDMmlNodeLayoutType.WithBar;
                    break;
                case EDMmlFormulaIndex.ParenthesesWithBar:
                    new_node = this.createBracket_LeftRight('<mo>&#x0028;</mo>', '<mo>&#x0029;</mo>');
                    type = EDMmlNodeLayoutType.WithBar;
                    break;
                case EDMmlFormulaIndex.SquareBracketWithBar:
                    new_node = this.createBracket_LeftRight('<mo>&#x005B;</mo>', '<mo>&#x005D;</mo>');
                    type = EDMmlNodeLayoutType.WithBar;
                    break;
                case EDMmlFormulaIndex.CurlyBracketWithBar:
                    new_node = this.createBracket_LeftRight('<mo>&#x007B;</mo>', '<mo>&#x007D;</mo>');
                    type = EDMmlNodeLayoutType.WithBar;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x007B;</mo>', '<mo>&#x007D;</mo>'); // {}
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_l:
                    new_node = this.createBracket_Left('<mo>&#x007B;</mo>'); // {
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_r:
                    new_node = this.createBracket_Right('<mo>&#x007D;</mo>'); // }
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_o:
                    new_node = this.createBracket_Over('<mo>&#x0FE37;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_u:
                    new_node = this.createBracket_Under('<mo>&#x0FE38;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_uo:
                    new_node = this.createBracket_UnderOver('<mo>&#x0FE37;</mo>', '<mo>&#x0FE38;</mo>');
                    type = EDMmlNodeLayoutType.UnerOver;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_io:
                    new_node = this.createBracket_Over('<mo>&#x0FE37;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexOver;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_iu:
                    new_node = this.createBracket_Under('<mo>&#x0FE38;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnder;
                    break;
                case EDMmlFormulaIndex.CurlyBracket_iuo:
                    new_node = this.createBracket_UnderOver('<mo>&#x0FE37;</mo>', '<mo>&#x0FE38;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnderOver;
                    break;
                case EDMmlFormulaIndex.SquareBracket_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x005B;</mo>', '<mo>&#x005D;</mo>'); // []
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.SquareBracket_l:
                    new_node = this.createBracket_Left('<mo>&#x005B;</mo>'); // [
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.SquareBracket_r:
                    new_node = this.createBracket_Right('<mo>&#x005D;</mo>'); // ]
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.SquareBracket_ll:
                    new_node = this.createBracket_LeftRight('<mo>&#x005B;</mo>', '<mo>&#x005B;</mo>'); // [[
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.SquareBracket_rr:
                    new_node = this.createBracket_LeftRight('<mo>&#x005D;</mo>', '<mo>&#x005D;</mo>'); // ]]
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.SquareBracket_rl:
                    new_node = this.createBracket_LeftRight('<mo>&#x005D;</mo>', '<mo>&#x005B;</mo>'); // ][
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.SquareBracket_u:
                    new_node = this.createBracket_Under('<mo>&#x023B5;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.SquareBracket_o:
                    new_node = this.createBracket_Over('<mo>&#x023B4;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.SquareBracket_uo:
                    new_node = this.createBracket_UnderOver('<mo>&#x023B4;</mo>', '<mo>&#x023B5;</mo>');
                    type = EDMmlNodeLayoutType.UnerOver;
                    break;
                case EDMmlFormulaIndex.SquareBracket_io:
                    new_node = this.createBracket_Over('<mo>&#x023B4;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexOver;
                    break;
                case EDMmlFormulaIndex.SquareBracket_iu:
                    new_node = this.createBracket_Under('<mo>&#x023B5;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnder;
                    break;
                case EDMmlFormulaIndex.SquareBracket_iuo:
                    new_node = this.createBracket_UnderOver('<mo>&#x023B4;</mo>', '<mo>&#x023B5;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnderOver;
                    break;
                case EDMmlFormulaIndex.Parentheses_lr:
                    new_node = this.createBracket_LeftRight('<mo>&#x0028;</mo>', '<mo>&#x0029;</mo>'); // ()
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.Parentheses_l:
                    new_node = this.createBracket_Left('<mo>&#x0028;</mo>'); // (
                    type = EDMmlNodeLayoutType.Left;
                    break;
                case EDMmlFormulaIndex.Parentheses_r:
                    new_node = this.createBracket_Right('<mo>&#x0029;</mo>'); // )
                    type = EDMmlNodeLayoutType.Right;
                    break;
                case EDMmlFormulaIndex.Parentheses_u:
                    new_node = this.createBracket_Under('<mo>&#x0FE36;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.Parentheses_o:
                    new_node = this.createBracket_Over('<mo>&#x0FE35;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.Parentheses_uo:
                    new_node = this.createBracket_UnderOver('<mo>&#x0FE35;</mo>', '<mo>&#x0FE36;</mo>');
                    type = EDMmlNodeLayoutType.UnerOver;
                    break;
                case EDMmlFormulaIndex.Parentheses_io:
                    new_node = this.createBracket_Over('<mo>&#x0FE35;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexOver;
                    break;
                case EDMmlFormulaIndex.Parentheses_iu:
                    new_node = this.createBracket_Under('<mo>&#x0FE36;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnder;
                    break;
                case EDMmlFormulaIndex.Parentheses_iuo:
                    new_node = this.createBracket_UnderOver('<mo>&#x0FE35;</mo>', '<mo>&#x0FE36;</mo>', true);
                    type = EDMmlNodeLayoutType.IndexUnderOver;
                    break;
                // case EDMmlFormulaIndex.Int:
                //     new_node = this.createBracket_Left( '<mo>&#x222B;</mo>' ); // (
                //     type = EDMmlNodeLayoutType.LeftLarge
                //     break;
                case EDMmlFormulaIndex.OverBar:
                    new_node = this.createBracket_Over('<mo>&#x000AF;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderBar:
                    new_node = this.createBracket_Under('<mo>&#x000AF;</mo>'); // x00332
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverShortRightArr:
                    new_node = this.createBracket_Over('<mo>&#x2192;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderShortRightArr:
                    new_node = this.createBracket_Under('<mo>&#x2192;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverShortLeftArr:
                    new_node = this.createBracket_Over('<mo>&#x02190;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderShortLeftArr:
                    new_node = this.createBracket_Under('<mo>&#x02190;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverRightVector:
                    new_node = this.createBracket_Over('<mo>&#x21C0;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderRightVector:
                    new_node = this.createBracket_Under('<mo>&#x21C1;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverLeftVector:
                    new_node = this.createBracket_Over('<mo>&#x21BC;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderLeftVector:
                    new_node = this.createBracket_Under('<mo>&#x21BD;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverLeftRightArrow:
                    new_node = this.createBracket_Over('<mo>&#x2194;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderLeftRightArrow:
                    new_node = this.createBracket_Under('<mo>&#x2194;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverLeftRightVector:
                    new_node = this.createBracket_Over('<mo>&#x294E;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderLeftRightVector:
                    new_node = this.createBracket_Under('<mo>&#x2950;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverDot:
                    new_node = this.createBracket_Over('<mo>&#x02D9;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.OverDoubleDot:
                    new_node = this.createBracket_Over('<mo>&#x00A8;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.OverTripleDot:
                    new_node = this.createBracket_Over('<mo>&#x20DB;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.OverDotDot:
                    new_node = this.createBracket_Over('<mo>&#x20DC;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderDot:
                    new_node = this.createBracket_Under('<mo>&#x02D9;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.UnderDoubleDot:
                    new_node = this.createBracket_Under('<mo>&#x00A8;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.UnderTripleDot:
                    new_node = this.createBracket_Under('<mo>&#x20DB;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.UnderDotDot:
                    new_node = this.createBracket_Under('<mo>&#x20DC;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.OverTilde:
                    // new_node = this.createBracket_Over("<mo>&#x7E;</mo>");
                    new_node = this.createBracket_Over('<mo>&#x0223C;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.OverHat:
                    new_node = this.createBracket_Over('<mo>&#x1a08;</mo>'); // x5E
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderHat:
                    new_node = this.createBracket_Under('<mo>&#x1a06;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                // case EDMmlFormulaIndex.OverParentheses:
                //     new_node = this.createBracket_Over('<mo>&#x0FE36;</mo>');
                //     outnode[0] = new_node.firstChild.firstChild.lastSibling;
                //     break;
                case EDMmlFormulaIndex.OverShellBracket:
                    new_node = this.createBracket_Over('<mo>&#x023E0;</mo>');
                    type = EDMmlNodeLayoutType.Over;
                    break;
                case EDMmlFormulaIndex.UnderShellBracket:
                    new_node = this.createBracket_Under('<mo>&#x023E1;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                case EDMmlFormulaIndex.UnderTilde:
                    new_node = this.createBracket_Under('<mo>&#x0223C;</mo>');
                    type = EDMmlNodeLayoutType.Under;
                    break;
                // case EDMmlFormulaIndex.UnderParentheses:
                //     new_node = this.createBracket_Under('<mo>&#x0FE35;</mo>');
                //     outnode[0] = new_node.firstChild.firstChild.lastSibling;
                //     break;
                case EDMmlFormulaIndex.LSquareBracketRParentheses:
                    new_node = this.createBracket_LeftRight('<mo>&#x005B;</mo>', '<mo>&#x0029;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.LParenthesesRSquareBracket:
                    new_node = this.createBracket_LeftRight('<mo>&#x0028;</mo>', '<mo>&#x005D;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.LVerticalBarsRAngleBracket:
                    new_node = this.createBracket_LeftRight('<mo>&#x007C;</mo>', '<mo>&#x232A;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.LAngleBracketRVerticalBars:
                    new_node = this.createBracket_LeftRight('<mo>&#x2329;</mo>', '<mo>&#x007C;</mo>');
                    type = EDMmlNodeLayoutType.LeftRight;
                    break;
                case EDMmlFormulaIndex.OverDot_s:
                    new_node = this.createBracket_Over('<mo>&#x02D9;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverDoubleDot_s:
                    new_node = this.createBracket_Over('<mo>&#x00A8;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverTripleDot_s:
                    new_node = this.createBracket_Over('<mo>&#x20DB;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverDotDot_s:
                    new_node = this.createBracket_Over('<mo>&#x20DC;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverShortRightArr_s:
                    new_node = this.createBracket_Over('<mo>&#x2192;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverLeftRightArrow_s:
                    new_node = this.createBracket_Over('<mo>&#x2194;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverShortLeftArr_s:
                    new_node = this.createBracket_Over('<mo>&#x02190;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverRightVector_s:
                    new_node = this.createBracket_Over('<mo>&#x21C0;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverLeftRightVector_s:
                    new_node = this.createBracket_Over('<mo>&#x294E;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverLeftVector_s:
                    new_node = this.createBracket_Over('<mo>&#x21BC;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.Enclosedown_s:
                    new_node = this.createMencloseNode_s('downdiagonalstrike');
                    type = EDMmlNodeLayoutType.Enclose;
                    break;
                case EDMmlFormulaIndex.UnderDot_s:
                    new_node = this.createBracket_Under('<mo>&#x02D9;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderDoubleDot_s:
                    new_node = this.createBracket_Under('<mo>&#x00A8;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderTripleDot_s:
                    new_node = this.createBracket_Under('<mo>&#x20DB;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderDotDot_s:
                    new_node = this.createBracket_Under('<mo>&#x20DC;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderShortRightArr_s:
                    new_node = this.createBracket_Under('<mo>&#x2192;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderLeftRightArrow_s:
                    new_node = this.createBracket_Under('<mo>&#x2194;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderShortLeftArr_s:
                    new_node = this.createBracket_Under('<mo>&#x02190;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderRightVector_s:
                    new_node = this.createBracket_Under('<mo>&#x21C1;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderLeftRightVector_s:
                    new_node = this.createBracket_Under('<mo>&#x2950;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderLeftVector_s:
                    new_node = this.createBracket_Under('<mo>&#x21BD;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.Encloseup_s:
                    new_node = this.createMencloseNode_s('updiagonalstrike');
                    type = EDMmlNodeLayoutType.Enclose;
                    break;
                case EDMmlFormulaIndex.OverBar_s:
                    new_node = this.createBracket_Over('<mo>&#x000AF;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverTilde_s:
                    new_node = this.createBracket_Over('<mo>&#x0223C;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.Parentheses_os:
                    new_node = this.createBracket_Over('<mo>&#x0FE35;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverParentheses_s:
                    new_node = this.createBracket_Over('<mo>&#x0FE36;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverHat_s:
                    new_node = this.createBracket_Over('<mo>&#x1a08;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverDownhat_s:
                    new_node = this.createBracket_Over('<mo>&#x01a06;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.SupMin_s:
                    new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    this.insertText(new_node.firstChild, '<mo>&#x2032;</mo>');
                    type = EDMmlNodeLayoutType.SupSingle;
                    break;
                case EDMmlFormulaIndex.SupSec_s:
                    new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    this.insertText(new_node.firstChild, '<mo>&#x2033;</mo>');
                    type = EDMmlNodeLayoutType.SupSingle;
                    break;
                case EDMmlFormulaIndex.SupMilliSec_s:
                    new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    this.insertText(new_node.firstChild, '<mo>&#x2034;</mo>');
                    type = EDMmlNodeLayoutType.SupSingle;
                    break;
                case EDMmlFormulaIndex.SupDegree_s:
                    new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    this.insertText(new_node.firstChild, '<mo>&#xB0;</mo>'); //02DA
                    type = EDMmlNodeLayoutType.SupSingle;
                    break;
                case EDMmlFormulaIndex.Enclosehor_s:
                    new_node = this.createMencloseNode_s('horizontalstrike');
                    type = EDMmlNodeLayoutType.Enclose;
                    break;
                case EDMmlFormulaIndex.UnderBar_s:
                    new_node = this.createBracket_Under('<mo>&#x000AF;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderTilde_s:
                    new_node = this.createBracket_Under('<mo>&#x0223C;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderParentheses_s:
                    new_node = this.createBracket_Under('<mo>&#x0FE35;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.Parentheses_us:
                    new_node = this.createBracket_Under('<mo>&#x0FE36;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderHat_s:
                    new_node = this.createBracket_Under('<mo>&#x1a08;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.UnderDownhat_s:
                    new_node = this.createBracket_Under('<mo>&#x01a06;</mo>');
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverMin_s:
                    new_node = this.createBracket_Over('<mo>&#x2E1D;</mo>'); // x2033
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.OverLefmin_s:
                    new_node = this.createBracket_Over('<mo>&#x2E1C;</mo>'); // x2035
                    type = EDMmlNodeLayoutType.Single;
                    break;
                case EDMmlFormulaIndex.SupT_s:
                    new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    this.insertText(new_node.firstChild, '<mo>&#x142A;</mo>'); //02DA
                    type = EDMmlNodeLayoutType.SupSingle;
                    break;
                case EDMmlFormulaIndex.Encloseupdown_s:
                    new_node = this.createMencloseNode_s('updiagonalstrike downdiagonalstrike');
                    type = EDMmlNodeLayoutType.Enclose;
                    break;
                default:
                    break;
            }
            if (brackettype === EDMmlFormulaIndex.OverDoubleBar) {
                new_node = this.createNode(EDMathMlNodeType.MoverNode, new Map(), null, []);
                var mover = this.createBracket_Over('<mo>&#x000AF;</mo>');
                this.insertChild(new_node, mover, []);
                // 插入操作符节点
                this.insertText(new_node.firstChild, '<mo>&#x000AF;</mo>', false);
                outnode[0] = new_node.firstChild.firstChild.firstChild.lastSibling;
            }
            if (brackettype === EDMmlFormulaIndex.UnderDoubleBar) {
                new_node = this.createNode(EDMathMlNodeType.MunderNode, new Map(), null, []);
                var mover = this.createBracket_Under('<mo>&#x000AF;</mo>'); // x00332
                this.insertChild(new_node, mover, []);
                // 插入操作符节点
                this.insertText(new_node.firstChild, '<mo>&#x000AF;</mo>', false); // x00332
                outnode[0] = new_node.firstChild.firstChild.firstChild.lastSibling;
            }
            if (brackettype === EDMmlFormulaIndex.Frac_old) {
                //A/B结构
                new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                var mrow_node1 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                this.insertChild(new_node, mrow_node1, [], false);
                mrow_node1.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                outnode[0] = new_node.firstChild.nextSibling.firstChild;
                var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                this.insertNextSibling(new_node.firstChild.nextSibling, mrow_node2, []);
                mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                this.insertText(new_node.firstChild.nextSibling, '<mo>&#x2F;</mo>');
            }
            if (type == EDMmlNodeLayoutType.LeftRight || type == EDMmlNodeLayoutType.Left) {
                outnode[0] = new_node.firstChild.nextSibling.nextSibling.firstChild;
            }
            else if (type == EDMmlNodeLayoutType.Right) {
                outnode[0] = new_node.firstChild.nextSibling.firstChild;
            }
            else if (type == EDMmlNodeLayoutType.WithBar) {
                outnode[0] = new_node.firstChild.nextSibling.nextSibling.firstChild;
                var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                this.insertNextSibling(new_node.firstChild.nextSibling.nextSibling, mrow_node2, []);
                mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                // this.insertText(new_node.firstChild.nextSibling.nextSibling, 'isNuLL!');
                this.insertText(new_node.firstChild.nextSibling.nextSibling, '<mo>&#x007C;</mo>');
            }
            else if (type == EDMmlNodeLayoutType.Under
                || type == EDMmlNodeLayoutType.Over
                || type == EDMmlNodeLayoutType.UnerOver) {
                outnode[0] = new_node.firstChild.firstChild.lastSibling;
            }
            else if (type == EDMmlNodeLayoutType.IndexOver
                || type == EDMmlNodeLayoutType.IndexUnder
                || type == EDMmlNodeLayoutType.IndexUnderOver) {
                //outnode[0] = new_node.firstChild.firstChild.nextSibling.firstChild.firstChild.lastSibling;
                outnode[0] = new_node.firstChild.firstChild.firstChild.lastSibling;
            } /* else if (type == EDMmlNodeLayoutType.LeftLarge) {
                outnode[0] = new_node.firstChild.nextSibling.nextSibling.firstChild;
                new_node.firstChild.nextSibling.fontSizeLevel = EDStatic.g_largeop_multiplier;
            }*/
            else if (type == EDMmlNodeLayoutType.Single) {
                outnode[1] = new_node.firstChild.firstChild.lastSibling;
                outnode[0] = new_node.firstChild;
            }
            else if (type == EDMmlNodeLayoutType.Enclose) {
                outnode[1] = new_node.firstChild; //.firstChild.lastSibling;
                outnode[0] = new_node.firstChild;
            }
            else if (type == EDMmlNodeLayoutType.SupSingle) {
                new_node.firstChild.firstChild.toTextNode().text = ''; //isNuLL
                outnode[1] = new_node.firstChild;
                outnode[0] = new_node.firstChild;
            }
            if (null == new_node) {
                return false;
            }
            this.ifParentNotMrow(node);
            return this.insertNextSibling(node, new_node, []);
        };
        /**
         * @brief insertText 插入文本，默认新建一个完整的<metext>节点，
         *                   根据文本内容修改为<mi><mo><mn><mtext>中的一种，使其成为node节点的下一同级节点
         * @param node 新节点的上一个同级节点指针，比如公式插入前的光标节点指针
         * @param text 文本节点的文本内容
         * @param checkparent 是否进行父节点检查，即是否执行ifParentNotMrow函数
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertText = function (node, text, checkparent) {
            if (checkparent === void 0) { checkparent = true; }
            var newnode = this.textChangeType(text);
            if (checkparent) {
                this.ifParentNotMrow(node);
            }
            // 插入成为node节点的下一个同级节点
            return this.insertNextSibling(node, newnode, []);
        };
        /**
         * @brief insertPreText 前插入文本，默认新建一个完整的<metext>节点，
         *                   根据文本内容修改为<mi><mo><mn><mtext>中的一种，使其成为node节点的上一同级节点
         * @param node 新节点的下一个同级节点指针，比如公式插入前的光标节点指针
         * @param text 文本节点的文本内容
         * @param checkparent 是否进行父节点检查，即是否执行ifParentNotMrow函数
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertPreText = function (node, text, checkparent) {
            if (checkparent === void 0) { checkparent = true; }
            var newnode = this.textChangeType(text);
            if (checkparent) {
                this.ifParentNotMrow(node);
            }
            // 插入成为node节点的下一个同级节点
            return this.insertPreSibling(node, newnode, []);
        };
        /**
         * @brief insertMtable 插入矩阵公式，默认新建一个完整的<mtable>节点，使其成为node节点的上一同级节点
         * @param node 新节点的下一个同级节点指针，比如公式插入前的光标节点指针
         * @param row 矩阵的总行数
         * @param col 矩阵的总列数
         * @param frametype 框架类型，=0无框架，=1实线，=2虚线
         * @param rowlinestype 行线类型，=0无行线，=1实线，=2虚线
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertMtable = function (node, row, col, frametype, rowlinestype) {
            if (frametype === void 0) { frametype = 0; }
            if (rowlinestype === void 0) { rowlinestype = 0; }
            // 设置表格左对齐
            var mml_attr = new Map();
            var catype = 'left';
            switch (this._ColAlignType) {
                case ColAlign.ColAlignLeft:
                    catype = 'left';
                    break;
                case ColAlign.ColAlignRight:
                    catype = 'right';
                    break;
                case ColAlign.ColAlignCenter:
                    catype = 'center';
                    break;
                default:
                    catype = 'left';
                    break;
            }
            mml_attr.set('columnalign', catype);
            if (1 === frametype) {
                mml_attr.set('frame', 'solid');
            }
            if (2 === frametype) {
                mml_attr.set('frame', 'dashed');
            }
            if (1 === rowlinestype) {
                mml_attr.set('rowlines', 'solid');
            }
            if (2 === rowlinestype) {
                mml_attr.set('rowlines', 'dashed');
            }
            // 创建mtable节点
            var mtable = this.createNode(EDMathMlNodeType.MtableNode, mml_attr, null, []);
            if (mtable == null) {
                return null;
            }
            for (var i = 0; i < row; ++i) {
                // 每有一行则创建mtr节点并插入成为mtable子节点
                var mtr = this.createNode(EDMathMlNodeType.MtrNode, new Map(), null, []);
                if (!this.insertChild(mtable, mtr, [])) {
                    console.log("mtr insert = false");
                    return null;
                }
                for (var j = 0; j < col; ++j) {
                    // 每有一列则创建mtd节点并插入成为mtr子节点
                    var mtd = this.createMtdNode();
                    if (!this.insertChild(mtr, mtd, [])) {
                        console.log("mtd insert = false");
                        return null;
                    }
                }
            }
            if (this.insertNextSibling(node, mtable, [])) {
                return mtable;
            }
            else {
                return null;
            }
        };
        /**
         * @brief insertEnter 插入换行公式，判断node是否是<mtable>节点的其中一个元素，如果是，则新建一个完整的<mtr>节点，
         *                   使其成为node节点所在<mtd>节点的下一同级节点，然后将node节点后面的节点修改至<mtd>的子节点，
         *                   如果不是，则新建一个完整的<mtable>节点，将node节点和其之前的节点修改至<mtable>的第一个<mtd>节点下，
         *                   node后面的节点修改至第二个<mtd>节点下
         * @param node 新节点的下一个同级节点指针，比如公式插入前的光标节点指针
         * @param axis1 是否第一行对齐，否的话则是居中对齐(默认)
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.insertEnter = function (node, axis1) {
            if (axis1 === void 0) { axis1 = false; }
            // 设置表格左对齐
            var mml_attr = new Map();
            var catype = 'left';
            switch (this._ColAlignType) {
                case ColAlign.ColAlignLeft:
                    catype = 'left';
                    break;
                case ColAlign.ColAlignRight:
                    catype = 'right';
                    break;
                case ColAlign.ColAlignCenter:
                    catype = 'center';
                    break;
                default:
                    catype = 'left';
                    break;
            }
            var parent = node.parent;
            mml_attr.set('columnalign', catype);
            // let axis1: boolean = true;
            // if (parent.parent) {
            //     if (parent.parent.nodeType === EDMathMlNodeType.MencloseNode) {
            //         axis1 = false;
            //     }
            //     if (parent.nextSibling) {
            //         if (parent.nextSibling.nodeType === EDMathMlNodeType.MencloseNode) {
            //             axis1 = false;
            //         }
            //     }
            // }
            if (axis1) {
                mml_attr.set('align', 'axis 1');
            }
            // mml_attr["rowalign"] = "top";
            // 创建<mtabale>及相关的<mtr><mtd>
            var mtable = this.createNode(EDMathMlNodeType.MtableNode, mml_attr, null, []);
            var mtr2 = this.createNode(EDMathMlNodeType.MtrNode, new Map(), null, []);
            var mtd2 = this.createNode(EDMathMlNodeType.MtdNode, new Map(), null, []);
            var mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mtd2, mrow, []);
            mrow.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow, mtext_node, 0 );
            // EDMmlNode *text = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text, 0 );
            // EDMmlNode *mtd2 = createMtdNode("isNuLL!");
            this.insertChild(mtr2, mtd2, []);
            var result = false;
            this.ifParentNotMrow(node);
            // 更新父节点
            parent = node.parent;
            if (EDMathMlNodeType.MrowNode === parent.nodeType) {
                if (EDMathMlNodeType.MtdNode === parent.parent.nodeType
                    && null != parent.parent.parent.parent.explicitAttribute('columnalign')) {
                    // <mrow>父节点是<mtd>，直接添加<mtr>创建新的一行
                    result = this.insertNextSibling(parent.parent.parent, mtr2, []);
                }
                else {
                    if (null != parent._ele) {
                        if (null != parent._ele.parentNode) {
                            if (parent._ele.parentNode.contains(parent._ele)) {
                                parent._ele.parentNode.removeChild(parent._ele);
                            }
                        }
                    }
                    // <mrow>父节点不是<mtd>，则添加<mtable>格式，使<mtd>成为当前节点的父节点
                    var mtr = this.createNode(EDMathMlNodeType.MtrNode, new Map(), null, []);
                    this.insertChild(mtable, mtr, []);
                    var mtd = this.createNode(EDMathMlNodeType.MtdNode, new Map(), null, []);
                    this.insertChild(mtr, mtd, []);
                    mtable.parent = parent.parent;
                    if (parent === parent.parent.firstChild) {
                        parent.parent.firstChild = mtable;
                    }
                    mtable.nextSibling = parent.nextSibling;
                    if (parent.nextSibling) {
                        parent.nextSibling.previousSibling = mtable;
                    }
                    mtable.previousSibling = parent.previousSibling;
                    if (parent.previousSibling) {
                        parent.previousSibling.nextSibling = mtable;
                    }
                    parent.parent = null;
                    parent.nextSibling = null;
                    parent.previousSibling = null;
                    this.insertChild(mtd, parent, []);
                    result = this.insertChild(mtable, mtr2, []);
                }
                // 如果选择的不是最后一个子节点，需要将后面的子节点转移到下一行
                if (node.nextSibling) {
                    // 如果选择点为行首，换行后上一行为空矩形
                    if (!node.previousSibling) {
                        if ('' === node.firstChild.toTextNode().text) {
                            node.firstChild.toTextNode().text = 'isNuLL!';
                        }
                    }
                    var next = node.nextSibling;
                    node.nextSibling = null;
                    next.previousSibling = null;
                    // if ( mrow != 0 ) {
                    //    if ( !EDStatic.mmlCheckChildType( mrow.nodeType(), next.nodeType(), 0 ) )
                    //        return false;
                    // }
                    // mrow._first_child = next;
                    mrow.firstChild.firstChild.toTextNode().text = '';
                    mrow.firstChild.nextSibling = next;
                    next.previousSibling = mrow.firstChild;
                    // text.toTextNode().setText("");
                    // mtext_node._next_sibling = next;
                    // next._previous_sibling = mtext_node;
                    if (null != next._ele) {
                        if (null != next._ele.parentNode) {
                            if (next._ele.parentNode.contains(next._ele)) {
                                next._ele.parentNode.removeChild(next._ele);
                            }
                        }
                    }
                    next.parent = mrow;
                    while (next.nextSibling) {
                        next = next.nextSibling;
                        next.parent = mrow;
                        if (null != next._ele) {
                            if (null != next._ele.parentNode) {
                                if (next._ele.parentNode.contains(next._ele)) {
                                    next._ele.parentNode.removeChild(next._ele);
                                }
                            }
                        }
                    }
                } /* else {
                    //选择的是最后一个子节点，新一行内容为空，绘画空矩形
                    EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
                    insertChild( mrow, mtext_node, 0 );
                    EDMmlNode *text = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
                    insertChild( mtext_node, text, 0 );
                }*/
            }
            return result;
        };
        /**
         * @brief deleteNode 删除节点，重新设置所有指向将要删除节点的指针，再删除此节点
         * @param deletenode 将要被删除的节点指针
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.deleteNode = function (deletenode) {
            if (deletenode.firstChild == null) {
                return false;
            }
            var haspresibling = false;
            var hasnextsibling = false;
            // 先清除所有指向要删除节点的指针
            if (deletenode.previousSibling != null) {
                // 清除上一同级节点的指针
                haspresibling = true;
                deletenode.previousSibling.nextSibling = null;
            }
            else {
                // 清除父节点的指针
                deletenode.parent.firstChild = null;
            }
            if (deletenode.nextSibling != null) {
                // 清除下一同级节点的指针
                hasnextsibling = true;
                deletenode.nextSibling.previousSibling = null;
            }
            // 再设置删除后的指针指向
            if (haspresibling && hasnextsibling) {
                // 设置删除后的同级节点的指针
                deletenode.previousSibling.nextSibling = deletenode.nextSibling;
                deletenode.nextSibling.previousSibling = deletenode.previousSibling;
            }
            if (!haspresibling && hasnextsibling) {
                // 设置删除后的父节点的指针
                deletenode.parent.firstChild = deletenode.nextSibling;
            }
            // 删除节点，并将删除节点的指针至null
            deletenode.delete();
            deletenode = null;
            return true;
        };
        /**
         * @brief deleteMtr 删除行，将该行的节点转移成为上一行的节点
         * @param mousenode 删除行的起始节点，mtd的第一个子节点的第一个子节点,即光标节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.deleteMtr = function (mousenode) {
            var newparent = mousenode.parent.parent.parent.previousSibling.firstChild.firstChild;
            var nextnode = mousenode.nextSibling;
            if (null != nextnode._ele) {
                if (null != nextnode._ele.parentNode) {
                    if (nextnode._ele.parentNode.contains(nextnode._ele)) {
                        nextnode._ele.parentNode.removeChild(nextnode._ele);
                    }
                }
            }
            nextnode.previousSibling = newparent.firstChild.lastSibling;
            newparent.firstChild.lastSibling.nextSibling = nextnode;
            mousenode.nextSibling = null;
            mousenode.firstChild.toTextNode().text = 'isNuLL!';
            for (; nextnode; nextnode = nextnode.nextSibling) {
                nextnode.parent = newparent;
                if (null != nextnode._ele) {
                    if (null != nextnode._ele.parentNode) {
                        if (nextnode._ele.parentNode.contains(nextnode._ele)) {
                            nextnode._ele.parentNode.removeChild(nextnode._ele);
                        }
                    }
                }
            }
            return true;
        };
        /**
         * @brief deleteMtr 删除行，将<mrow>节点内容替换<mtable>节点
         * @param mrow 当前行的总节点<mrow>
         * @param mtable 要替换，也是要删除的<mtable>节点
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.deleteMtable = function (mrow, mtable) {
            if (null == mrow) {
                return false;
            }
            if (null == mtable) {
                return false;
            }
            if (null != mtable._ele && null != mrow._ele) {
                if (null != mtable._ele.parentNode && null != mrow._ele.parentNode) {
                    // mtable._ele.parentNode.removeChild(mtable._ele);
                    mtable._ele.parentNode.replaceChild(mrow._ele, mtable._ele);
                }
            }
            // if (null != mrow._ele) {
            //    if (null != mrow._ele.parentNode) {
            //        mrow._ele.parentNode.removeChild(mrow._ele);
            //    }
            // }
            // if (!mtable->_ele.parentNode().isNull()) {
            //    mtable->_ele.parentNode().replaceChild(mrow->_ele, mtable->_ele);
            // }
            mrow.previousSibling = mtable.previousSibling;
            if (mtable.previousSibling) {
                mtable.previousSibling.nextSibling = mrow;
            }
            mrow.nextSibling = mtable.nextSibling;
            if (mtable.nextSibling) {
                mtable.nextSibling.previousSibling = mrow;
            }
            mrow.parent.firstChild = null;
            mrow.parent = mtable.parent;
            if (mtable.parent.firstChild === mtable) {
                mtable.parent.firstChild = mrow;
            }
            return true;
        };
        /**
         * @brief pasteTextNod 粘贴节点 解析节点的mml文本，根据isPreInsert决定新节点时前插入还是后插入
         * @param mousenode 旧节点指针，比如光标所在节点指针
         * @param newnodetext 新节点的mml文本
         * @param isPreInsert 错误信息的QString指针
         */
        EDMmlDocument.prototype.pasteTextNode = function (mousenode, newnodetext, isPreInsert) {
            var pnewnodetex = [newnodetext];
            var prefix = EdrawMathDate.EDStatic.mmlEntityTable.entities(pnewnodetex); // 获取文件头
            // 文本转换第一步
            var newtext = pnewnodetex[0];
            // 清除无效格式
            var newreg = new RegExp(/\n*\r*/, 'g');
            newtext = newtext.replace(newreg, '');
            newtext = newtext.replace(/<mtext><\/mtext>/g, '');
            newtext = newtext.replace(/  <  /g, '');
            newtext = newtext.replace(/<mtext> <\/mtext>/g, '<mtext>#x2009;</mtext>');
            //导入文本前处理
            EdrawMathDate.EDStatic.g_arrowtext4replace.forEach(function (value, key) {
                var rx = new RegExp(value, 'g');
                newtext = newtext.replace(rx, key);
            });
            EdrawMathDate.EDStatic.g_special_conversion.forEach(function (value, key) {
                var newvalue = value.replace(/#x/g, '&#x');
                var reg = new RegExp(newvalue, 'g');
                newtext = newtext.replace(reg, value);
            });
            // newtext = newtext.replace(/\n+/g,"");
            // console.log(`pastestr = ${newtext}`);
            // 添加文件头设置文本内容到dom中，为节点解析做准备
            var domparser = new DOMParser();
            var dom = domparser.parseFromString(prefix + newtext, 'text/xml');
            var ok = [false];
            var root_node = this.domToMml(dom, ok, ['']); // 解析dom文件获得EDMmlNode树形结构数据
            if (!ok[0]) {
                return false;
            }
            ok[0] = true;
            if (root_node == null) {
                return false;
            }
            else {
                var newnode = root_node;
                while (EDMathMlNodeType.UnknownNode === newnode.nodeType && newnode.hasChildNodes()) {
                    newnode = newnode.firstChild;
                }
                if (null == newnode) {
                    return false;
                }
                //while (newnode.nodeType === EDMathMlNodeType.MrowNode && newnode.nextSibling == null && newnode.previousSibling == null) {
                var childnode = newnode.firstChild;
                var ismrowtype1 = false; //检测是否<mrow>..<mo></mo></mrow>结构
                var ismrowtype2 = false; //检测是否括号节点结构
                if (newnode.nodeType === EDMathMlNodeType.MrowNode && childnode) {
                    if (childnode.nextSibling && !childnode.noneditable) {
                        childnode = childnode.nextSibling; //mtext
                        if (childnode) {
                            childnode = childnode.nextSibling; //..
                            if (childnode) {
                                if (childnode.nodeType == EDMathMlNodeType.MoNode) {
                                    if (childnode.previousSibling.nodeType === EDMathMlNodeType.MrowNode) {
                                        ismrowtype2 = true;
                                    }
                                    childnode = childnode.nextSibling;
                                    ismrowtype1 = true;
                                    while (childnode) {
                                        if (childnode.nodeType !== EDMathMlNodeType.MoNode) {
                                            ismrowtype1 = false;
                                        }
                                        else if (childnode.previousSibling.nodeType === EDMathMlNodeType.MrowNode) {
                                            ismrowtype2 = true;
                                        }
                                        childnode = childnode.nextSibling;
                                    }
                                }
                                else if (childnode.nodeType == EDMathMlNodeType.MrowNode) {
                                    if (childnode.previousSibling.nodeType === EDMathMlNodeType.MoNode) {
                                        ismrowtype2 = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if (ismrowtype1 || ismrowtype2) {
                    var new_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                    new_node.firstChild.firstChild.toTextNode().text = '';
                    if (isPreInsert) {
                        if (!this.insertPreSibling(mousenode, new_node, [''])) {
                            ok[0] = false;
                        }
                    }
                    else {
                        if (!this.insertNextSibling(mousenode, new_node, [''])) {
                            ok[0] = false;
                        }
                    }
                    if (!ok[0]) {
                        return false;
                    }
                    mousenode = new_node.firstChild;
                    isPreInsert = false;
                }
                if (newnode.firstChild) { //&& !ismorowmo) {
                    newnode = newnode.firstChild; // 因为<math>解析为<mrow>,所以当前节点为isNuLL!，需要再下一级,第一个子节点为光标节点
                    if (newnode.nextSibling != null) {
                        newnode = newnode.nextSibling;
                    }
                    else if (newnode.nodeType === EDMathMlNodeType.MtextNode) {
                        if (newnode.firstChild.nodeType === EDMathMlNodeType.TextNode) {
                            if (newnode.firstChild.nodeType === EDMathMlNodeType.TextNode) {
                                newnode.firstChild.toTextNode().text == "isNuLL!";
                                console.log("pasted mtext = null");
                                var outnode = [null];
                                this.insertLayout(mousenode, EDMmlFormulaIndex.insertMrow, outnode, 1);
                                //newnode = this.createNode( EDMathMlNodeType.MrowNode, new Map<string, string>(), null, [] );
                                //newnode.firstChild.firstChild.toTextNode().text = 'isNuLL!';
                                return true;
                            }
                        }
                    }
                    if (null == newnode) {
                        return false;
                    }
                }
                if (newnode.previousSibling) {
                    newnode.previousSibling.nextSibling = null;
                }
                newnode.previousSibling = null;
                root_node.delete();
                root_node = null;
                newnode.parent = null;
                var nextnode = newnode.nextSibling;
                while (nextnode) {
                    newnode.nextSibling = null;
                    nextnode.previousSibling = null;
                    if (isPreInsert) {
                        if (!this.insertPreSibling(mousenode, newnode, [''])) {
                            ok[0] = false;
                        }
                    }
                    else {
                        if (!this.insertNextSibling(mousenode, newnode, [''])) {
                            ok[0] = false;
                        }
                        mousenode = mousenode.nextSibling;
                    }
                    newnode = nextnode;
                    nextnode = newnode.nextSibling;
                    newnode.parent = null;
                }
                if (isPreInsert) {
                    if (!this.insertPreSibling(mousenode, newnode, [''])) {
                        ok[0] = false;
                    }
                }
                else {
                    if (!this.insertNextSibling(mousenode, newnode, [''])) {
                        ok[0] = false;
                    }
                }
                newnode.parent.updateChildFont();
            }
            // this.layout();
            return ok[0];
        };
        /**
         * @brief isChildNode 是否子节点 比较两个节点，判断其是否存在父子节点关系(节点输入有顺序要求)
         * @param parentnode 父节点指针
         * @param childnode 子节点指针
         * @return 得到的结果值
         */
        EDMmlDocument.prototype.isChildNode = function (parentnode, childnode) {
            if (null == parentnode) {
                return false;
            }
            if (null == childnode) {
                return false;
            }
            var child = parentnode.firstChild;
            for (; child != null; child = child.nextSibling) {
                var ischild = this.isChildNode(child, childnode);
                if (ischild) {
                    return true;
                }
            }
            if (parentnode === childnode) {
                return true;
            }
            else {
                return false;
            }
        };
        /** 调整字符位置 根据nodeid进行渲染 目前未使用nodeid
         * @brief adjustCharPositions corrects the char positions //在渲染后纠正_renderingData中的字符位置
         *        inside _renderingData after rendering
         */
        EDMmlDocument.prototype.adjustCharPositions = function () {
            var key = 0;
            var rect = new egRect(0, 0, 0, 0);
            var data = new EdrawMathDate.EDRenderingPosition();
            for (var i = 0; i < this._renderingData.length; i++) {
                data = this._renderingData[i];
                key = (data._subPos << 32) | data._nodeId;
                if (data._subPos === 0) {
                    rect = data._itemRect;
                }
                else {
                    if (this._nodeIdLookup.has(key)) {
                        if (((this._nodeIdLookup.get(key)._bits) & EDRendAdjustBits.translateTxt) !== EDRendAdjustBits.Nothing) {
                            this._renderingData[i]._itemRect.translate(rect.x, rect.y);
                        }
                    }
                }
            }
        };
        /** 做后期处理 使用lspace调整，使位置平移
         * @brief doPostProcessing do some post processing of the rendering data//会对渲染数据进行一些后处理
         */
        EDMmlDocument.prototype.doPostProcessing = function () {
            var _this = this;
            var lspace = 0.0;
            this._nodeIdLookup.forEach(function (value, key) {
                var data = value;
                if (data._bits !== EDRendAdjustBits.Nothing && null != data._node) {
                    if ((data._bits & EDRendAdjustBits.translateLspace) !== EDRendAdjustBits.Nothing) { // correction of lspace stuff//修正lspace的东西
                        if (data._node.nodeType === EDMathMlNodeType.MoNode) {
                            lspace = data._node.lspace;
                        }
                        if (data._node.nodeType === EDMathMlNodeType.MpaddedNode) {
                            lspace = data._node.lspace;
                        }
                        _this._renderingData[data._index]._itemRect.translate(lspace, 0.0);
                    }
                }
            });
        };
        /** 优化尺寸 清除_nodeIdLookup
         * @brief optimizeSize reduces memory size of the formula data//减少了公式数据的内存大小
         */
        EDMmlDocument.prototype.optimizeSize = function () {
            this._nodeIdLookup.clear();
        };
        /** 获取渲染位置 即获取_renderingData
         * @brief getRenderingPositions returns the rendering positions (and dimensions)//返回任何具有id作为MathMl属性的符号的渲染位置（和维度）。
         *        of any symbol rendered that has an id as MathMl attribute.
         *        The id given must be a number.                                        //给出的ID必须是一个数字。
         * @return the rendering position and dimension, along with the id              //渲染位置和维度，以及用mathml代码给出的id信息作为属性
         *         information given with the mathml code as attribute
         */
        EDMmlDocument.prototype.getRenderingPositions = function () {
            return this._renderingData;
        };
        /** 追加渲染数据 根据_nodeIdLookup添加数据到_renderingData
         * @brief appendRenderingData append rendering data                             //附加渲染数据
         * @param nodeId rendering data with the node id to add                         //使用要添加的节点标识呈现数据
         * @param index rendering data with the index to add                            //使用要添加的索引呈现数据
         * @param node a pointer to the node to add rendering data for                  //指向节点添加渲染数据的指针
         * @param data must a special post processing be done on the rendering data     //必须对渲染数据进行特殊的后处理
         */
        EDMmlDocument.prototype.appendRenderingData = function (nodeId, index, node, data) {
            var retval = false;
            if (nodeId == null) {
                return retval;
            }
            if (!this._nodeIdLookup.has((index << 32) | nodeId)
                && !this._renderingComplete) {
                retval = true;
                var indPos = new EdrawMathDate.EDAddRendData(this._renderingData.length, node, data);
                var renderingData = new EdrawMathDate.EDRenderingPosition();
                renderingData._nodeId = nodeId;
                renderingData._subPos = index;
                this._renderingData.push(renderingData);
                this._nodeIdLookup.set((index << 32) | nodeId, indPos);
            }
            return retval;
        };
        /** 更新渲染数据  根据_nodeIdLookup更新_renderingData的数据
         * @brief updateRenderingData update rendering data                             //更新渲染数据
         * @param nodeId rendering data with the node id to add                         //nodeId 使用要添加的节点ID呈现数据
         * @param index rendering data with the index to add                            //index 使用要添加的节点ID呈现数据
         * @param position position to update                                           //position 位置更新
         */
        EDMmlDocument.prototype.updateRenderingData = function (nodeId, index, position) {
            if (nodeId == null) {
                return;
            }
            if (this._nodeIdLookup.has((index << 32) | nodeId)) {
                var indPos = this._nodeIdLookup.get((index << 32) | nodeId);
                this._renderingData[indPos._index]._itemRect = position;
            }
        };
        /**
         * @brief clearRendering clears all rendering data  //清除所有渲染数据
         */
        EDMmlDocument.prototype.clearRendering = function () {
            this._renderingData.splice(0);
            this._nodeIdLookup.clear();
            this._renderingComplete = false;
        };
        Object.defineProperty(EDMmlDocument.prototype, "renderingComplete", {
            /**
             * @brief renderingComplete check if rendering data has already been completed //检查渲染数据是否已经完成（无需再调整位置数据）
             *        (no need to adjust positon data anymore)
             * @return true if completed, false if not                                     //如果完成则返回true，否则返回false
             */
            get: function () {
                return this._renderingComplete;
            } // 渲染完成
            ,
            enumerable: false,
            configurable: true
        });
        /**
         * @brief setRenderingComplete marks rendering as completed, subsequent calls to//将渲染标记为已完成，随后的绘制调用将不会修改渲染位置
         *        paint won't modify rendering positions
         */
        EDMmlDocument.prototype.setRenderingComplete = function () {
            this._renderingComplete = true;
        }; // 设置渲染完成
        /**
         * @brief init 初始化函数 对EDMmlDocument的数据进行初始化
         */
        EDMmlDocument.prototype.init = function () {
            this._root_node = null;
            this._foreground_color = 'rgb(0, 0, 0)';
            this._background_color = 'rgb(255, 255, 255)';
            this._draw_frames = false; // false
            this._defaultMode = false;
            var i = this._base_font_pixel_size * EdrawMathDate.EDStatic.g_relorigin_of_fontsize;
            this._RelOrigin = new egPoint(i, i);
            this._bMiBold = false;
            this._bMnBold = false;
            this._bMiItalic = true;
            this._bMnItalic = false;
            this.clearRendering();
            if (!EDMmlDocument.s_initialized) {
                EDMmlDocument.static_init();
            }
        };
        /**
         * @brief static_init 初始化静态变量 对各种mml类型字体的名字进行初始化，如s_normal_font_name
         */
        EDMmlDocument.static_init = function () {
            // We set s_normal_font_name based on the information available at                  //我们根据可用的信息设置s_normal_font_name
            // https://vismor.com/documents/site_implementation/viewing_mathematics/S7.php
            // Note: on Linux, the Ubuntu, DejaVu Serif, FreeSerif and Liberation Serif         //注意：在Linux上，Ubuntu，DejaVu Serif，FreeSerif和Liberation Serif要么看起来不太好，
            //       either don't look that great or have rendering problems (e.g.              //要么出现渲染问题（例如FreeSerif不能正确呈现0），所以我们只是使用Century Schoolbook L ...
            //       FreeSerif doesn't render 0 properly!), so we simply use Century
            //       Schoolbook L...
            // QFontDatabase font_database;
            // #if defined( Q_OS_WIN )
            // if ( font_database.hasFamily( "Cambria" ) )
            //    s_normal_font_name = "Cambria";//修改 Cambria Arial
            // else if ( font_database.hasFamily( "Lucida Sans Unicode" ) )
            //    s_normal_font_name = "Lucida Sans Unicode";
            // else
            this.s_normal_font_name = 'Times New Roman'; // 已设置为EDFont的默认字体
            // #elif defined( Q_OS_LINUX )
            //    s_normal_font_name = "Century Schoolbook L";z
            // #elif defined( Q_OS_MAC )
            //    if ( font_database.hasFamily( "STIXGeneral" ) )
            //        s_normal_font_name = "STIXGeneral";
            //    else
            //        s_normal_font_name = "Times New Roman";
            // #else
            //    s_normal_font_name = "Times New Roman";
            // #endif
            this.s_initialized = true;
        };
        // /**
        //  * @brief _dump 转储？ 遍历节点及其子节点，在qWarning()中打印节点的toStr()信息
        //  * @param node 开始遍历的起始节点
        //  * @param indent 得到的结果值 目前未赋值
        //  */
        // private _dump(node: EDMmlNode, indent: string[] ): void {
        //     // indent = indent + node->toStr();//添加
        //     // 遍历子节点导出节点数据 indent未发生改变，仅仅打印warning？
        //     let child: EDMmlNode = node.firstChild;
        //     for ( ; child != null; child = child.nextSibling ) {
        //         if (child.nodeType == EDMathMlNodeType.TextNode) {
        //             if (indent.length > 0) {
        //                 indent[0] = indent[0] + child.toTextNode().text;
        //             }    
        //         }
        //         //indent[0] = indent[0]+`(`;
        //         this._dump( child, indent);
        //         //indent[0] = indent[0]+`)`;
        //     }
        // }
        /**
         * @brief insertChild 插入子节点，将新节点插入成为父选节点的最后一个子节点
         * @param parent 父节点指针
         * @param new_node 新节点指针，比如新创建的节点指针
         * @param errorMsg 错误信息的QString指针
         */
        EDMmlDocument.prototype.insertChild = function (parent, new_node, errorMsg, checkmrow) {
            if (checkmrow === void 0) { checkmrow = true; }
            if (new_node == null) {
                console.log("new_node == null");
                return false;
            }
            // 新节点不允许存在父节点和同级节点
            if (new_node.parent != null
                || new_node.nextSibling != null
                || new_node.previousSibling != null) {
                if (errorMsg.length > 0) {
                    errorMsg[0] = "error: is not new node.";
                }
                console.log("is not new node");
                return false;
            }
            if (parent != null) {
                if (!EdrawMathDate.EDStatic.mmlCheckChildType(parent.nodeType, new_node.nodeType, errorMsg)) {
                    console.log("mmlCheckChildType error p:".concat(parent.nodeType, " c:").concat(new_node.nodeType));
                    return false;
                }
            }
            if (parent == null) {
                if (this._root_node == null) {
                    this._root_node = new_node;
                }
                else {
                    // 将新节点插入成为父节点的最后一个子节点
                    var n = this._root_node.lastSibling;
                    n.nextSibling = new_node;
                    new_node.previousSibling = n;
                }
            }
            else {
                if (checkmrow) {
                    if (this.checkMrow(parent, new_node)) {
                        return true;
                    }
                }
                new_node.parent = parent;
                if (parent.hasChildNodes()) {
                    // 将新节点插入成为父节点的最后一个子节点
                    var n = parent.firstChild.lastSibling;
                    n.nextSibling = new_node;
                    new_node.previousSibling = n;
                }
                else {
                    // 注意：如果是第一个子节点，需要设置父节点的第一个子节点指针
                    parent.firstChild = new_node;
                }
            }
            return true;
        };
        /**
         * @brief insertNextSibling 在旧节点后方插入新节点，使新节点成为旧节点的下一个同级节点
         * @param parent 旧节点指针，比如光标所在节点指针
         * @param new_node 新节点指针，比如新创建的节点指针
         * @param errorMsg 错误信息的QString指针
         */
        EDMmlDocument.prototype.insertNextSibling = function (old_node, new_node, errorMsg) {
            if (new_node == null) {
                return true;
            }
            // 新节点不允许存在父节点和同级节点
            if (new_node.parent != null
                || new_node.nextSibling != null
                || new_node.previousSibling != null) {
                if (errorMsg.length > 0) {
                    errorMsg[0] = "error: is not new node.";
                }
                return false;
            }
            if (old_node.parent != null) {
                if (!EdrawMathDate.EDStatic.mmlCheckChildType(old_node.parent.nodeType, new_node.nodeType, errorMsg)) {
                    return false;
                }
            }
            if (old_node.nextSibling != null) {
                // 旧节点存在下一个同级节点，则要修改 旧节点下一同级节点 的指针
                var old_nexsibling = old_node.nextSibling;
                new_node.nextSibling = old_nexsibling;
                old_nexsibling.previousSibling = new_node;
            }
            // 修改旧节点的指针和新节点的指针
            new_node.previousSibling = old_node;
            old_node.nextSibling = new_node;
            new_node.parent = old_node.parent;
            return true;
        };
        /**
         * @brief insertPreSibling 在旧节点前方插入新节点，使新节点成为旧节点的上一个同级节点
         * @param parent 旧节点指针，比如光标所在节点指针
         * @param new_node 新节点指针，比如新创建的节点指针
         * @param errorMsg 错误信息的QString指针
         */
        EDMmlDocument.prototype.insertPreSibling = function (old_node, new_node, errorMsg) {
            if (new_node == null) {
                return true;
            }
            // 新节点不允许存在父节点和同级节点
            if (new_node.parent != null
                || new_node.nextSibling != null
                || new_node.previousSibling != null) {
                if (errorMsg.length > 0) {
                    errorMsg[0] = "error: is not new node.";
                }
                return false;
            }
            if (old_node.parent != null) {
                if (!EdrawMathDate.EDStatic.mmlCheckChildType(old_node.parent.nodeType, new_node.nodeType, errorMsg)) {
                    return false;
                }
            }
            if (old_node.previousSibling != null) {
                // 旧节点存在上一个同级节点，则要修改 旧节点上一同级节点 的指针
                var old_presibling = old_node.previousSibling;
                new_node.previousSibling = old_presibling;
                old_presibling.nextSibling = new_node;
            }
            else {
                // 旧节点不存在上一同级，则需要修改父节点的第一子节点指针
                old_node.parent.firstChild = new_node;
            }
            // 修改就节点的指针和新节点的指针
            new_node.nextSibling = old_node;
            old_node.previousSibling = new_node;
            new_node.parent = old_node.parent;
            return true;
        };
        /**
         * @brief createMfracNode 创建一个完整的<mfrac>格式的空文本节点
         * @param bevelled 设置<mfrac>的节点属性，=true表示斜线格式
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMfracNode = function (bevelled, script) {
            if (script === void 0) { script = false; }
            /*分数类型节点格式
            <mfrac>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
            </mfrac>
            */
            // 创建mfrac节点
            var mml_attr = new Map();
            if (bevelled) {
                mml_attr.set('bevelled', 'true');
            }
            var frac_node = this.createNode(EDMathMlNodeType.MfracNode, mml_attr, null, []);
            // 创建mrow节点并插入成为mfrac的子节点
            var mrow_node1 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(frac_node, mrow_node1, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(frac_node, mrow_node2, []);
            mrow_node1.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node1 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node1, mtext_node1, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node1 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node1, text_node1, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            if (script) {
                // frac_node->setScriptlevel(scriptup);
                var attr_scriptlevel = new Map();
                attr_scriptlevel.set('scriptlevel', '+1');
                var mstyle = this.createNode(EDMathMlNodeType.MstyleNode, attr_scriptlevel, null, []);
                this.insertChild(mstyle, frac_node, []);
                return mstyle;
            }
            return frac_node;
        };
        /**
         * @brief createMencloseNode 创建一个完整的<menclose>格式的空文本节点
         * @param notation 键为notation的值
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMencloseNode = function (notation) {
            /*menclose节点格式
            <menclose>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
            </menclose>
            */
            var mml_attr = new Map();
            mml_attr.set('notation', notation);
            var enclose_node = this.createNode(EDMathMlNodeType.MencloseNode, mml_attr, null, []);
            // 创建mrow节点并插入成为mtd的子节点
            var mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(enclose_node, mrow, []);
            mrow.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            return enclose_node;
        };
        /**
         * @brief createMencloseNode_s 创建一个完整的single类型的<menclose>格式的空文本节点
         * @param notation 键为notation的值
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMencloseNode_s = function (notation) {
            /*menclose节点格式
            <menclose>
                <mtext>isNuLL!</mtext>
            </menclose>
            */
            var mml_attr = new Map();
            mml_attr.set('notation', notation);
            var enclose_node = this.createNode(EDMathMlNodeType.MencloseNode, mml_attr, null, []);
            var mtext_node = new EdrawMathDate.EDMmlMtextNode(this, mml_attr);
            var ok1 = this.insertChild(enclose_node, mtext_node, []);
            var text_node = new EdrawMathDate.EDMmlTextNode('', this);
            var ok2 = this.insertChild(mtext_node, text_node, []);
            return enclose_node;
        };
        /**
         * @brief createMunderoverNode 创建一个完整的<munderover>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMunderoverNode = function () {
            /*mundervoer节点格式
            <munderover>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
            </munderover>
            */
            // 创建munderover节点
            var underover_node = this.createNode(EDMathMlNodeType.MunderoverNode, new Map(), null, []);
            // 创建mrow节点并插入成为munderover的子节点
            var mrow_node1 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node3 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(underover_node, mrow_node1, []) ||
                !this.insertChild(underover_node, mrow_node2, []) ||
                !this.insertChild(underover_node, mrow_node3, [])) {
                mrow_node1.delete();
                mrow_node2.delete();
                mrow_node3.delete();
                underover_node.delete();
                return null;
            }
            mrow_node1.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node3.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node1 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node1, mtext_node1, 0 );
            // EDMmlNode *text_node1 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node1, text_node1, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            // EDMmlNode *mtext_node3 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node3, mtext_node3, 0 );
            // EDMmlNode *text_node3 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node3, text_node3, 0 );
            return underover_node;
        };
        /**
         * @brief createMunderNode 创建一个完整的<munder>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMunderNode = function () {
            /*munder节点格式
            <munder>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
                <mrow>
                    <mtext>isNuLL!</mtext>
                </mrow>
            </munder>
            */
            // 创建munder节点
            var under_node = this.createNode(EDMathMlNodeType.MunderNode, new Map(), null, []);
            // 创建mrow节点并插入成为munder的子节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(under_node, mrow_node, []) || !this.insertChild(under_node, mrow_node2, [])) {
                mrow_node.delete();
                mrow_node2.delete();
                under_node.delete();
                return null;
            }
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            return under_node;
        };
        /**
         * @brief createMoverNode 创建一个完整的<mover>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMoverNode = function () {
            /*mvoer节点格式
            <mvoer>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </mover>
            */
            // 创建mover节点
            var over_node = this.createNode(EDMathMlNodeType.MoverNode, new Map(), null, []);
            // 创建mrow节点并插入成为mover的子节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(over_node, mrow_node, []) || !this.insertChild(over_node, mrow_node2, [])) {
                mrow_node.delete();
                mrow_node2.delete();
                over_node.delete();
                return null;
            }
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            return over_node;
        };
        /**
         * @brief createMmultiscriptsNode 创建一个完整的<mmultiscripts>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMmultiscriptsNode = function (sub, sup, presub, presup) {
            if (sub === void 0) { sub = true; }
            if (sup === void 0) { sup = true; }
            if (presub === void 0) { presub = true; }
            if (presup === void 0) { presup = true; }
            /*mmultiscripts节点格式
            <mmultiscripts>
                <mrow>
                    <mtext>mtext1</mtext>
                </mrow>
                <none />
                <mi>c</mi>
                <mprescripts />
                <mrow>
                    <mtext>mtext1</mtext>
                </mrow>
                <none />
            </mmultiscripts>
            */
            var mmultiscriptes_node = this.createNode(EDMathMlNodeType.MmultiscriptsNode, new Map(), null, []);
            var sub_node = null;
            var sup_node = null;
            var presub_node = null;
            var presup_node = null;
            var mprescripts_node = this.createNode(EDMathMlNodeType.MprescriptsNode, new Map(), null, []);
            var base_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mmultiscriptes_node, base_node, []);
            if (sub) {
                sub_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                sub_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            }
            else {
                sub_node = this.createNode(EDMathMlNodeType.NoneNode, new Map(), null, []);
            }
            this.insertChild(mmultiscriptes_node, sub_node, []);
            if (sup) {
                sup_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                sup_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            }
            else {
                sup_node = this.createNode(EDMathMlNodeType.NoneNode, new Map(), null, []);
            }
            this.insertChild(mmultiscriptes_node, sup_node, []);
            this.insertChild(mmultiscriptes_node, mprescripts_node, []);
            if (presub) {
                presub_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                presub_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            }
            else {
                presub_node = this.createNode(EDMathMlNodeType.NoneNode, new Map(), null, []);
            }
            this.insertChild(mmultiscriptes_node, presub_node, []);
            if (presup) {
                presup_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                presup_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            }
            else {
                presup_node = this.createNode(EDMathMlNodeType.NoneNode, new Map(), null, []);
            }
            this.insertChild(mmultiscriptes_node, presup_node, []);
            return mmultiscriptes_node;
        };
        /**
         * @brief createMsubsupNode 创建一个完整的<msubsup>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMsubsupNode = function () {
            /*msubsup节点格式
            <msubsup>
                <mrow>
                    <mtext>mtext1</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext1</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext2</mtext>
                </mrow>
            </msubsup>
            */
            // 创建msubsup节点
            var subsup_node = this.createNode(EDMathMlNodeType.MsubsupNode, new Map(), null, []);
            // 创建mrow节点并插入成为msubsup的子节点
            var mrow_node1 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node3 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(subsup_node, mrow_node1, []) ||
                !this.insertChild(subsup_node, mrow_node2, []) ||
                !this.insertChild(subsup_node, mrow_node3, [])) {
                mrow_node1.delete();
                mrow_node2.delete();
                mrow_node3.delete();
                subsup_node.delete();
                return null;
            }
            mrow_node1.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node3.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node1 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node1, mtext_node1, 0 );
            // EDMmlNode *text_node1 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node1, text_node1, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            // EDMmlNode *mtext_node3 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node3, mtext_node3, 0 );
            // EDMmlNode *text_node3 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node3, text_node3, 0 );
            return subsup_node;
        };
        /**
         * @brief creatMsubNode 创建一个完整的<msub>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMsubNode = function () {
            /*msub节点格式
            <msub>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </msub>
            */
            // 创建msub节点
            var sub_node = this.createNode(EDMathMlNodeType.MsubNode, new Map(), null, []);
            // 创建mrow节点并插入成为msub的子节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(sub_node, mrow_node, []) || !this.insertChild(sub_node, mrow_node2, [])) {
                mrow_node.delete();
                mrow_node2.delete();
                sub_node.delete();
                return null;
            }
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            return sub_node;
        };
        /**
         * @brief createMsupNode 创建一个完整的<msup>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMsupNode = function () {
            /*msup节点格式
            <msup>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </msup>
            */
            // 创建msup节点
            var sup_node = this.createNode(EDMathMlNodeType.MsupNode, new Map(), null, []);
            // 创建mrow节点并插入成为msup的子节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            if (!this.insertChild(sup_node, mrow_node, []) || !this.insertChild(sup_node, mrow_node2, [])) {
                mrow_node.delete();
                mrow_node2.delete();
                sup_node.delete();
            }
            mrow_node.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node, mtext_node, 0 );
            // EDMmlNode *text_node = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text_node, 0 );
            // EDMmlNode *mtext_node2 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node2, 0 );
            // EDMmlNode *text_node2 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node2, text_node2, 0 );
            return sup_node;
        };
        /**
         * @brief createMtdNode 创建一个完整的<mtd>格式的空文本节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMtdNode = function () {
            /*mtd节点格式
            <mtd>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </mtd>
            */
            // 创建mtd节点
            var mtd = this.createNode(EDMathMlNodeType.MtdNode, new Map(), null, []);
            // 创建mrow节点并插入成为mtd的子节点
            var mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mtd, mrow, []);
            mrow.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mrow的子节点
            // EDMmlNode *mtext_node = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow, mtext_node, 0 );
            // EDMmlNode *text = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node, text, 0 );
            return mtd;
        };
        /**
         * @brief createBracket_LeftRight 创建左右型括号节点，即先创建一个完整的<mtext>空文本节点，
         *                               再在其前方插入文本内容为motext1的文本节点，在其后方插入文本内容为motext2的文本节点
         * @param motext1 左边括号节点要显示的字符文本
         * @param motext2 右边括号节点要显示的字符文本
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_LeftRight = function (motext1, motext2) {
            /*括号类型节点格式 lr
            <mrow>
                <mo>motext1</mo>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mo>motext2</mo>
            </mrow>
            */
            // 创建mrow节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mrow_node, mrow_node2, [], false);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            //插入操作符节点
            this.insertText(mrow_node2, motext2);
            this.insertPreText(mrow_node2, motext1);
            return mrow_node;
        };
        /**
         * @brief createBracket_Left 创建左型括号节点，即先创建一个完整的<mtext>空文本节点，再在其前方插入文本内容为motext的文本节点
         * @param motext 左边括号节点要显示的字符文本
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_Left = function (motext) {
            /*括号类型节点格式 l
            <mrow>
                <mo>motext1</mo>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
            </mrow>
            */
            // 创建mrow节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mrow_node, mrow_node2, [], false);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 插入操作符节点
            this.insertPreText(mrow_node2, motext);
            return mrow_node;
        };
        /**
         * @brief createBracket_Right 创建右型括号节点，即先创建一个完整的<mtext>空文本节点，再在其后方插入文本内容为motext的文本节点
         * @param motext 右边括号节点要显示的字符文本
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_Right = function (motext) {
            /*括号类型节点格式 r
            <mrow>
                <mrow>
                    <mtext>mtext</mtext>
                </mrow>
                <mo>motext2</mo>
            </mrow>
            */
            // 创建mrow节点
            var mrow_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(mrow_node, mrow_node2, [], false);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 插入操作符节点
            this.insertText(mrow_node2, motext);
            return mrow_node;
        };
        /**
         * @brief createBracket_Over 创建上方型括号节点，根据index判断是否要创建带索引值的<mover>空文本节点，
         *                          再根据motext修改<mover>的第二子节点文本
         * @param motext 上方括号节点要显示的字符文本
         * @param index 索引值 表示括号的外侧是否存在空白文本的节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_Over = function (motext, index) {
            if (index === void 0) { index = false; }
            /*括号类型节点格式 o
            <mover>
                //<mrow>
                    <mover>
                        <mrow>
                            <mtext>mtext</mtext>
                        </mrow>
                        <mo>motext</mo>
                    </mover>
                //</mrow>
                <mrow>
                    <mtext>indextext</mtext>//索引
                </mrow>
            </mover>
            */
            //const mrow_node: EDMmlNode = this.createNode( EDMathMlNodeType.MrowNode, new Map<string, string>(), null, [] );
            var over_node = this.createMoverNode();
            // 插入操作符节点
            this.insertText(over_node.firstChild, motext, false);
            this.deleteNode(over_node.firstChild.lastSibling);
            if (!index) {
                return over_node;
            }
            //this.insertChild( mrow_node, over_node, [] );
            var newover = this.createNode(EDMathMlNodeType.MoverNode, new Map(), null, []);
            //this.insertChild( newover, mrow_node, [] );
            this.insertChild(newover, over_node, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(newover, mrow_node2, []);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mover的子节点
            // EDMmlNode *mtext_node3 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node3, 0 );
            // EDMmlNode *text_node3 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node3, text_node3, 0 );
            return newover;
        };
        /**
         * @brief createBracket_Under 创建下方型括号节点，根据index判断是否要创建带索引值的<munder>空文本节点，
         *                           再根据motext修改<munder>的第二子节点文本
         * @param motext 下方括号节点要显示的字符文本
         * @param index 索引值 表示括号的外侧是否存在空白文本的节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_Under = function (motext, index) {
            if (index === void 0) { index = false; }
            /*括号类型节点格式 o
            <munder>
                //<mrow>
                    <munder>
                        <mrow>
                            <mtext>mtext</mtext>
                        </mrow>
                        <mo>motext</mo>
                    </munder>
                //</mrow>
                <mrow>
                    <mtext>indextext</mtext>//索引
                </mrow>
            </munder>
            */
            // 创建mrow节点
            //const mrow_node: EDMmlNode = this.createNode( EDMathMlNodeType.MrowNode, new Map<string, string>(), null, [] );
            var under_node = this.createMunderNode();
            // 插入操作符节点
            this.insertText(under_node.firstChild, motext, false);
            this.deleteNode(under_node.firstChild.lastSibling);
            if (!index) {
                return under_node;
            }
            //this.insertChild( mrow_node, under_node, [] );
            var newunder = this.createNode(EDMathMlNodeType.MunderNode, new Map(), null, []);
            //this.insertChild( newunder, mrow_node, [] );
            this.insertChild(newunder, under_node, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(newunder, mrow_node2, []);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mover的子节点
            // EDMmlNode *mtext_node3 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node3, 0 );
            // EDMmlNode *text_node3 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node3, text_node3, 0 );
            return newunder;
        };
        /**
         * @brief createBracket_UnderOver 创建上下方型括号节点，根据index判断是否要创建带索引值的<munderover>空文本节点，
         *                               再根据undertext修改<munderover>的第二子节点文本，再根据overtext修改<munderover>的第三子节点文本，
         * @param undertext 上方括号节点要显示的字符文本
         * @param overtext 下方括号节点要显示的字符文本
         * @param index 索引值 表示括号的外侧是否存在空白文本的节点
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createBracket_UnderOver = function (undertext, overtext, index) {
            if (index === void 0) { index = false; }
            /*括号类型节点格式 ou
            <munderover>
                //<mrow>
                    <munderover>
                        <mrow>
                            <mtext>mtext</mtext>
                        </mrow>
                        <mo>undertext</mo>
                        <mo>overtext</mo>
                    </munderover>
                //</mrow>
                <mrow>
                    <mtext>indextext</mtext>//索引
                </mrow>
                <mrow>
                    <mtext>indextext</mtext>//索引
                </mrow>
            </munderover>
            */
            // 创建mrow节点
            //const mrow_node: EDMmlNode = this.createNode( EDMathMlNodeType.MrowNode, new Map<string, string>(), null, [] );
            var underover_node = this.createMunderoverNode();
            // 插入操作符节点
            this.insertText(underover_node.firstChild, undertext, false);
            this.insertText(underover_node.firstChild, overtext, false);
            this.deleteNode(underover_node.firstChild.lastSibling);
            this.deleteNode(underover_node.firstChild.lastSibling);
            if (!index) {
                return underover_node;
            }
            //this.insertChild( mrow_node, underover_node, [] );
            var newunderover = this.createNode(EDMathMlNodeType.MunderoverNode, new Map(), null, []);
            //this.insertChild( newunderover, mrow_node, [] );
            this.insertChild(newunderover, underover_node, []);
            var mrow_node2 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(newunderover, mrow_node2, []);
            var mrow_node3 = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
            this.insertChild(newunderover, mrow_node3, []);
            mrow_node2.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            mrow_node3.firstChild.firstChild.toTextNode().text = 'isNuLL!';
            // 创建mtext节点并插入成为mover的子节点
            // EDMmlNode *mtext_node3 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node2, mtext_node3, 0 );
            // EDMmlNode *text_node3 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node3, text_node3, 0 );
            // EDMmlNode *mtext_node4 = createNode( EDMathMlNodeType::MtextNode, EDMmlAttributeMap(), QString::null, 0 );
            // insertChild( mrow_node3, mtext_node4, 0 );
            // EDMmlNode *text_node4 = createNode( EDMathMlNodeType::TextNode, EDMmlAttributeMap(), "isNuLL!", 0 );
            // insertChild( mtext_node4, text_node4, 0 );
            return newunderover;
        }; //
        /**
         * @brief textChangeType 根据text内容，新建对应的文本节点，比如<mo>或<mi>或<mn>或<mtext>节点
         * @param text 要显示的文本节点的文本字符
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.textChangeType = function (text) {
            var mo = false;
            var mi = false;
            // 转换mo文本
            if (text.startsWith('<mo>')) {
                mo = true;
                if (text.match('&#x') != null) {
                    var domparser = new DOMParser();
                    var dom = domparser.parseFromString(text, 'text/xml');
                    if (null == dom) {
                        return null;
                    }
                    text = dom.firstChild.firstChild.nodeValue;
                    // console.log(`${text}`);
                }
                else {
                    text = text.slice(4, text.length - 5);
                }
            }
            // 转换mi文本
            if (text.startsWith('<mi>')) {
                mi = true;
                var domparser = new DOMParser();
                var dom = domparser.parseFromString(text, 'text/xml');
                if (null == dom) {
                    return null;
                }
                text = dom.firstChild.firstChild.nodeValue;
            }
            var newnode = null;
            var error = [''];
            // 正则匹配文本是否为<mi>, <mo>, <mn>的节点类型，否则为mtext节点
            var pattern = /[a-zA-Z]{1}/;
            if ((1 === text.length && text.match(pattern) != null) || mi) {
                newnode = this.createNode(EDMathMlNodeType.MiNode, new Map(), null, error);
            }
            var pattern3 = /[|(){}!<>+-=*]{1}/; // |!\()\{}\[
            if ((1 === text.length && text.match(pattern3) != null) || mo || text === ']' || text === '[') {
                newnode = this.createNode(EDMathMlNodeType.MoNode, new Map(), null, error);
                var pattern4 = /[\u0370-\u03ff]{1}/;
                // console.log(`mo=${text} ${text.match(pattern4)}`)
                if (text.match(pattern4) != null) {
                    console.log("is insertGreek");
                    newnode.fontItalic = this._bMiItalic;
                }
            }
            var pattern2 = /[0-9]{1}/;
            if (1 === text.length && text.match(pattern2) != null) {
                newnode = this.createNode(EDMathMlNodeType.MnNode, new Map(), null, error);
            }
            if (newnode == null) {
                // console.log(`createMtext`);
                newnode = this.createNode(EDMathMlNodeType.MtextNode, new Map(), null, error);
            }
            var textnode = this.createNode(EDMathMlNodeType.TextNode, new Map(), text, error);
            this.insertChild(newnode, textnode, error);
            if (error[0] !== '') {
                console.log("error:", error[0]);
            }
            return newnode;
        };
        /**
         * @brief ifParentNotMrow 判断node的父节点是不是<mrow>节点，如果不是，则新建<mrow>节点成为node父节点的子节点，
         *                        即在node节点和其父节点之间新增一层<mrow>节点关系，一般用于插入公式前的判断，子节点为隐式mrow节点可以不用判断
         * @param node 要操作的节点指针，比如公式插入前的光标节点指针
         * @return 得到的结果值，是否操作成功
         */
        EDMmlDocument.prototype.ifParentNotMrow = function (node, createmrow4special2) {
            if (createmrow4special2 === void 0) { createmrow4special2 = false; }
            // 如果父节点不是mrow节点，则创建mrow节点，并将node插入成为mrow的子节点
            if (EDMathMlNodeType.MrowNode !== node.parent.nodeType || createmrow4special2) {
                var mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, []);
                // if (!node->_ele.parentNode().isNull())
                //    node->_ele.parentNode().removeChild(node->_ele);
                // 修改mrow的父节点指针，修改node父节点的子节点指针
                mrow.parent = node.parent;
                if (node === node.parent.firstChild) {
                    node.parent.firstChild = mrow;
                }
                // 修改mrow下一同级节点指针，修改node的下一同级节点的上一同级节点指针
                mrow.nextSibling = node.nextSibling;
                if (node.nextSibling) {
                    node.nextSibling.previousSibling = mrow;
                }
                // 修改mrow上一同级节点指针，修改node的上一同级节点的下一同级节点指针
                mrow.previousSibling = node.previousSibling;
                if (node.previousSibling) {
                    node.previousSibling.nextSibling = mrow;
                }
                node.parent = null;
                node.nextSibling = null;
                node.previousSibling = null;
                if (createmrow4special2) {
                    this.insertChild(mrow, node, [], false);
                }
                else {
                    this.insertChild(mrow, node, []);
                }
                return true;
            }
            return false;
        };
        /**
         * @brief domToMml 解析dom文件生成EDMmlNode，根据输入的QDomNode解析生成EDMmlNode节点，并设置节点的属性参数
         * @param do_node 输入值，被解析的QDomNode
         * @param ok 解析的结果，表示是否解析成功
         * @param errorMsg 错误信息的QString指针
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.domToMml = function (do_node, ok, errorMsg) {
            // create the node
            if (ok.length <= 0) {
                console.log("error: domToMml() ok is null.");
                return null;
            }
            var mml_type = this.domToEDMmlNodeType(do_node); // 解析dom节点获取结点类型
            if (mml_type === EDMathMlNodeType.NoNode) {
                ok[0] = true;
                return null;
            }
            // 获取dom节点的键和值，并设置到属性图中
            var do_attr = null;
            var mml_attr = new Map();
            // if (do_node.nodeType === Node.ELEMENT_NODE && do_node.nodeName !== 'math') {
            if (do_node.nodeType === Node.ELEMENT_NODE && do_node.nodeName !== 'math') {
                // 遍历当前元素节点的属性
                if (do_node.hasAttributes()) {
                    do_attr = do_node.attributes;
                    for (var i = 0; i < do_attr.length; i++) {
                        var attrNode = do_attr.item(i);
                        mml_attr.set(attrNode.nodeName, attrNode.nodeValue);
                        // console.log(`attr: key=${attrNode.nodeName} value=${attrNode.nodeValue}`)
                    }
                }
            }
            // 如果该节点为text节点，则设置文本
            var mml_value = '';
            if (mml_type === EDMathMlNodeType.TextNode) {
                // 文本转换第二步
                var trans_1 = false;
                EdrawMathDate.EDStatic.g_special_conversion.forEach(function (value, key) {
                    if (do_node.nodeValue === value) {
                        mml_value = key;
                        trans_1 = true;
                    }
                });
                if (!trans_1) {
                    mml_value = do_node.nodeValue;
                    mml_value = mml_value.replace(/ /g, '');
                    if (mml_value.match(/\n+| +|\s+/) != null || mml_value == '') {
                        // QT版本系统自动过滤
                        ok[0] = true;
                        // console.log(`return TextNode: ${mml_value} ${do_node.nodeValue}`);
                        return null;
                    }
                }
            }
            // 将解析dom节点得到的节点类型、属性图、文本用于创建EDMmlNode节点类
            var mml_node = this.createNode(mml_type, mml_attr, mml_value, errorMsg);
            if (mml_node == null) {
                ok[0] = false;
                console.log("mml_node == null type:".concat(mml_type, " mml_attr:").concat(mml_attr, " mml_value").concat(mml_value, " errorMsg").concat(errorMsg));
                return null;
            }
            // create the node's children according to the child_spec //根据child_spec创建节点的子节点
            var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(mml_type);
            var do_child_list = do_node.childNodes;
            var child_cnt = do_child_list.length;
            var mml_child = null;
            var separator_list = '';
            if (mml_type === EDMathMlNodeType.MfencedNode) {
                separator_list = mml_node.explicitAttribute('separators', ',');
            }
            // 根据节点规格进行处理
            switch (spec.child_spec) {
                case ChildSpec.ChildIgnore:
                    break;
                // 子节点数量不止一个，则创建隐式mrow节点
                case ChildSpec.ImplicitMrow:
                    if (child_cnt > 0) {
                        mml_child = this.createImplicitMrowNode(do_node, ok, errorMsg);
                        if (!ok[0]) {
                            mml_node.delete();
                            console.log("createImplicitMrowNode failed do_node:".concat(do_node));
                            return null;
                        }
                        // 插入mrow节点成为mml_node的最后一个子节点
                        if (!this.insertChild(mml_node, mml_child, errorMsg)) {
                            mml_node.delete();
                            mml_child.delete();
                            ok[0] = false;
                            console.log("insertChild failed ");
                            return null;
                        }
                    }
                    break;
                case 2: // 布局节点创建<mrow>
                case 3:
                case 6:
                    var creat4child = true;
                    if (mml_type == EDMathMlNodeType.MoverNode
                        || mml_type == EDMathMlNodeType.MunderNode) {
                        if (child_cnt == 2) {
                            var tmp_child = this.domToMml(do_child_list.item(0), ok, errorMsg);
                            if ((tmp_child.nodeType == EDMathMlNodeType.MoverNode
                                && mml_type == EDMathMlNodeType.MoverNode)
                                || (tmp_child.nodeType == EDMathMlNodeType.MunderNode
                                    && mml_type == EDMathMlNodeType.MunderNode)) {
                                creat4child = false;
                                console.log("~~~~~creat4child = false");
                            }
                        }
                    }
                    if (creat4child) {
                        if (!this.createMrowForChild(do_node, ok, errorMsg, mml_node)) {
                            mml_node.delete();
                            ok[0] = false;
                            console.log("createMrowForChild failed do_node:".concat(do_node));
                            return null;
                        }
                        break;
                    }
                default:
                    // exact ammount of children specified - check...   //确切数量的子规定 - 检查...
                    if (spec.child_spec !== child_cnt) {
                        if (errorMsg.length > 0) {
                            errorMsg[0] = "element ".concat(spec.tag, "  requires exactly ").concat(spec.child_spec, "  arguments, got ").concat(child_cnt);
                        }
                        mml_node.delete();
                        ok[0] = false;
                        console.log("spec.child_spec != child_cnt ");
                        return null;
                    }
                // ...and continue just as in ChildAny  并像ChildAny一样继续
                // 存在子节点，则继续继续添加子节点
                case ChildSpec.ChildAny:
                    // mfenced节点的操作处理
                    if (mml_type === EDMathMlNodeType.MfencedNode) {
                        this.insertOperator(mml_node, mml_node.explicitAttribute('open', '('));
                    }
                    // 继续解析并添加子节点
                    for (var i = 0; i < child_cnt; ++i) {
                        var do_child = do_child_list.item(i);
                        var mml_child_1 = this.domToMml(do_child, ok, errorMsg);
                        if (!ok[0]) {
                            mml_node.delete();
                            return null;
                        }
                        if (ok[0] && mml_child_1 == null) {
                            // console.log(`继续解析并添加子节点continue`);
                            continue;
                        }
                        // mtable节点下，子节点非mtr的处理
                        if (mml_type === EDMathMlNodeType.MtableNode && mml_child_1.nodeType !== EDMathMlNodeType.MtrNode) {
                            var mtr_node = this.createNode(EDMathMlNodeType.MtrNode, new Map(), null, []);
                            this.insertChild(mml_node, mtr_node, []);
                            if (!this.insertChild(mtr_node, mml_child_1, errorMsg)) {
                                mml_node.delete();
                                mml_child_1.delete();
                                ok[0] = false;
                                console.log("mtable insertChild failed ".concat(mml_type, " ").concat(mml_child_1.nodeType));
                                return null;
                            }
                            // mtr节点下，子节点非mtd的处理
                        }
                        else if (mml_type === EDMathMlNodeType.MtrNode && mml_child_1.nodeType !== EDMathMlNodeType.MtdNode) {
                            var mtd_node = this.createNode(EDMathMlNodeType.MtdNode, new Map(), null, []);
                            this.insertChild(mml_node, mtd_node, []);
                            if (!this.insertChild(mtd_node, mml_child_1, errorMsg)) {
                                mml_node.delete();
                                mml_child_1.delete();
                                ok[0] = false;
                                console.log("mtr insertChild failed ");
                                return null;
                            }
                            // 普通子节点的处理
                        }
                        else {
                            var checkmrow = false;
                            // if (child_cnt > 1 && mml_child.nodeType == EDMathMlNodeType.MrowNode
                            //     && mml_node.nodeType == EDMathMlNodeType.MrowNode) {
                            //     checkmrow = false;
                            //     console.log(`checkmrow = false`,mml_child,mml_node)
                            // }
                            if (!this.insertChild(mml_node, mml_child_1, errorMsg, checkmrow)) {
                                mml_node.delete();
                                mml_child_1.delete();
                                ok[0] = false;
                                console.log("node insertChild failed p:".concat(mml_node.tag, " } error:").concat(errorMsg));
                                return null;
                            }
                        }
                        // mfenced节点的后续操作处理
                        if (i < child_cnt - 1 && mml_type === EDMathMlNodeType.MfencedNode && separator_list.length > 0) {
                            var separator = '';
                            if (i >= separator_list.length) {
                                separator = separator_list.charAt(separator_list.length - 1);
                            }
                            else {
                                separator = separator_list.charAt(i);
                            }
                            this.insertOperator(mml_node, separator);
                        }
                    }
                    // mfenced节点的最后操作处理
                    if (mml_type === EDMathMlNodeType.MfencedNode) {
                        this.insertOperator(mml_node, mml_node.explicitAttribute('close', ')'));
                    }
                    break;
            }
            ok[0] = true;
            return mml_node;
        }; //
        /**
         * @brief createNode 创建新的节点 根据输入的节点类型，属性图，文本创建对应的节点指针
         * @param type 节点的类型 新创建的节点的EDMathMlNodeType
         * @param mml_attr 节点的属性图 新创建节点的EDMmlAttributeMap
         * @param mml_value 节点的文本 新创建节点的text,只有type = EDMathMlNodeType::TextNode有用
         * @param errorMsg 错误信息的QString指针
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createNode = function (type, mml_attr, mml_value, errorMsg) {
            if (type === EDMathMlNodeType.NoNode) {
                if (errorMsg.length > 0) {
                    errorMsg[0] = "createNode error: type == EDMathMlNodeType.NoNode";
                }
                return null;
            }
            var mml_node = null;
            if (!EdrawMathDate.EDStatic.mmlCheckAttributes(type, mml_attr, errorMsg)) {
                return null;
            }
            var mtext_node = null;
            var text_node = null;
            // 根据节点类型创建节点
            switch (type) {
                case EDMathMlNodeType.MiNode:
                    mml_node = new EdrawMathDate.EDMmlMiNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MnNode:
                    mml_node = new EdrawMathDate.EDMmlMnNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MfracNode:
                    mml_node = new EdrawMathDate.EDMmlMfracNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MrowNode:
                    mml_node = new EdrawMathDate.EDMmlMrowNode(this, mml_attr);
                    // 添加前置光标
                    mtext_node = new EdrawMathDate.EDMmlMtextNode(this, mml_attr);
                    var ok1 = this.insertChild(mml_node, mtext_node, errorMsg);
                    text_node = new EdrawMathDate.EDMmlTextNode('', this);
                    var ok2 = this.insertChild(mtext_node, text_node, errorMsg);
                    // console.log(`createNode MrowNode ${ok1} ${ok2}`);
                    break;
                case EDMathMlNodeType.MsqrtNode:
                    mml_node = new EdrawMathDate.EDMmlMsqrtNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MrootNode:
                    mml_node = new EdrawMathDate.EDMmlMrootNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MsupNode:
                    mml_node = new EdrawMathDate.EDMmlMsupNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MsubNode:
                    mml_node = new EdrawMathDate.EDMmlMsubNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MsubsupNode:
                    mml_node = new EdrawMathDate.EDMmlMsubsupNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MoNode:
                    mml_node = new EdrawMathDate.EDMmlMoNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MstyleNode:
                    mml_node = new EdrawMathDate.EDMmlMstyleNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MencloseNode:
                    mml_node = new EdrawMathDate.EDMmlMencloseNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.TextNode:
                    mml_node = new EdrawMathDate.EDMmlTextNode(mml_value, this);
                    break;
                case EDMathMlNodeType.MphantomNode:
                    mml_node = new EdrawMathDate.EDMmlMphantomNodekenNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MfencedNode:
                    mml_node = new EdrawMathDate.EDMmlMfencedNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MtableNode:
                    mml_node = new EdrawMathDate.EDMmlMtableNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MtrNode:
                    mml_node = new EdrawMathDate.EDMmlMtrNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MtdNode:
                    mml_node = new EdrawMathDate.EDMmlMtdNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MoverNode:
                    mml_node = new EdrawMathDate.EDMmlMoverNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MunderNode:
                    mml_node = new EdrawMathDate.EDMmlMunderNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MunderoverNode:
                    mml_node = new EdrawMathDate.EDMmlMunderoverNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MprescriptsNode:
                    mml_node = new EdrawMathDate.EDMmlMprescriptsNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.NoneNode:
                    mml_node = new EdrawMathDate.EDMmlNoneNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MmultiscriptsNode:
                    mml_node = new EdrawMathDate.EDMmlMmultiscriptsNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MalignMarkNode:
                    mml_node = new EdrawMathDate.EDMmlMalignMarkNode(this);
                    break;
                case EDMathMlNodeType.MerrorNode:
                    mml_node = new EdrawMathDate.EDMmlMerrorNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MtextNode:
                    mml_node = new EdrawMathDate.EDMmlMtextNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MpaddedNode:
                    mml_node = new EdrawMathDate.EDMmlMpaddedNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.MspaceNode:
                    mml_node = new EdrawMathDate.EDMmlMspaceNode(this, mml_attr);
                    break;
                case EDMathMlNodeType.UnknownNode:
                    mml_node = new EdrawMathDate.EDMmlUnknownNode(this, mml_attr);
                    break;
                default:
                    mml_node = null;
                    break;
            }
            if (mml_node) {
                // 设置渲染id
                if (mml_attr.has('id')) {
                    mml_node.nodeId = mml_attr.get('id').toInt();
                }
            }
            return mml_node;
        };
        /**
         * @brief createImplicitMrowNode 创建隐式Mrow节点 在do_node的子节点为隐式<mrow>时使用，
         *                               解析生成的EDMmlNode的数据结构中，do_node的子节点是<mrow>，<mrow>的子节点是do_node的子节点
         * @param do_node 输入值，被解析的QDomNode
         * @param ok 解析的结果，表示是否解析成功
         * @param errorMsg 错误信息的QString指针
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createImplicitMrowNode = function (do_node, ok, errorMsg) {
            // 根据dom解析获得子节点列表
            var do_child_list = do_node.childNodes;
            var child_cnt = do_child_list.length;
            if (child_cnt === 0) {
                ok[0] = true;
                return null;
            }
            if (child_cnt === 1) {
                return this.domToMml(do_child_list.item(0), ok, errorMsg);
            }
            // 创建mrow节点
            var mml_node = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, errorMsg);
            if (mml_node == null) {
                console.log("createImplicitMrowNode() mml_node == null");
            }
            // 创建并添加所有子节点
            for (var i = 0; i < child_cnt; ++i) {
                var do_child = do_child_list.item(i);
                var mml_child = this.domToMml(do_child, ok, errorMsg);
                if (!ok[0]) {
                    mml_node.delete();
                    return null;
                }
                if (ok[0] && mml_child == null) {
                    continue;
                }
                if (!this.insertChild(mml_node, mml_child, errorMsg)) {
                    mml_node.delete();
                    mml_child.delete();
                    ok[0] = false;
                    return null;
                }
            }
            return mml_node;
        };
        /**
         * @brief createMrowForChild 创建Mrow节点 每个子节点创建一个<mrow>,解析生成的EDMmlNode的数据结构中，
         *                           do_node的子节点是<mrow>，<mrow>的子节点是do_node的子节点
         * @param do_node 输入值，被解析的QDomNode
         * @param ok 解析的结果，表示是否解析成功
         * @param errorMsg 错误信息的QString指针
         * @return 得到的结果值，输出为EDMmlNode指针
         */
        EDMmlDocument.prototype.createMrowForChild = function (do_node, ok, errorMsg, parent) {
            // 根据dom解析获得子节点列表
            var do_child_list = do_node.childNodes;
            var cnt = do_child_list.length;
            if (cnt === 0) {
                ok[0] = true;
                return null;
            }
            if (cnt === 1) {
                return null;
            }
            // 创建并添加所有子节点
            for (var i = 0; i < cnt; ++i) {
                var do_child = do_child_list.item(i);
                if (do_child.nodeName === '#comment') {
                    continue;
                }
                var mrow = null;
                var mrow_child = this.domToMml(do_child, ok, errorMsg);
                if (ok[0] && mrow_child == null) {
                    continue;
                }
                if (EDMathMlNodeType.MoNode !== mrow_child.nodeType
                    && EDMathMlNodeType.MrowNode !== mrow_child.nodeType
                    && EDMathMlNodeType.MprescriptsNode !== mrow_child.nodeType
                    && EDMathMlNodeType.NoneNode !== mrow_child.nodeType) {
                    if (!ok[0]) {
                        return null;
                    }
                    // 创建mrow节点
                    mrow = this.createNode(EDMathMlNodeType.MrowNode, new Map(), null, errorMsg);
                    if (!this.insertChild(mrow, mrow_child, errorMsg)) {
                        mrow.delete();
                        mrow_child.delete();
                        ok[0] = false;
                        return null;
                    }
                }
                else {
                    mrow = mrow_child;
                }
                if (!this.insertChild(parent, mrow, errorMsg)) {
                    mrow.delete();
                    ok[0] = false;
                    return null;
                }
            }
            return true;
        };
        /**
         * @brief insertOperator 插入操作符 创建一个新的<mo>节点，根据text设置文本内容，插入成为node节点的最后一个子节点
         * @param node 操作符的父节点指针
         * @param text 操作符的符号文本
         */
        EDMmlDocument.prototype.insertOperator = function (node, text) {
            // 创建<mo>节点和相关的text节点
            var text_node = this.createNode(EDMathMlNodeType.TextNode, new Map(), text, ['']);
            var mo_node = this.createNode(EDMathMlNodeType.MoNode, new Map(), null, ['']);
            var ok = this.insertChild(node, mo_node, ['']); // 将text节点插入成为mo节点的最后一个子节点
            if (!ok) {
                console.log("error: insertOperator fail");
                return;
            }
            ok = this.insertChild(mo_node, text_node, ['']); // 将mo节点插入成为node节点的最后一个子节点
            if (!ok) {
                console.log("error: insertOperator fail");
                return;
            }
            return;
        };
        /**
         * @brief insertMstyleNode 插入<mstyle> 创建一个新的<mstyle>节点替代原节点位置，使原节点成为<mstyle>的子节点
         * @param node 操作符的父节点指针
         * @param mml_attr 节点的属性图 新创建节点的EDMmlAttributeMap
         * @return 得到的结果值，操作是否成功
         */
        EDMmlDocument.prototype.insertMstyleNode = function (node, mml_attr) {
            if (node.length <= 0) {
                return false;
            }
            var oldnode = node[0];
            if (oldnode == null) {
                return false;
            }
            if (null != oldnode._ele) {
                if (null != oldnode._ele.parentNode) {
                    if (oldnode._ele.parentNode.contains(oldnode._ele)) {
                        oldnode._ele.parentNode.removeChild(oldnode._ele);
                    }
                }
            }
            var mstyle = this.createNode(EDMathMlNodeType.MstyleNode, mml_attr, null, ['']);
            // 父节点修改
            mstyle.parent = oldnode.parent;
            if (oldnode.parent.firstChild === oldnode) {
                oldnode.parent.firstChild = mstyle;
            }
            oldnode.parent = mstyle;
            // 上一同级节点修改
            mstyle.previousSibling = oldnode.previousSibling;
            if (oldnode.previousSibling) {
                oldnode.previousSibling.nextSibling = mstyle;
            }
            oldnode.previousSibling = null;
            // 下一同级节点修改
            mstyle.nextSibling = oldnode.nextSibling;
            if (oldnode.nextSibling) {
                oldnode.nextSibling.previousSibling = mstyle;
            }
            oldnode.nextSibling = null;
            // 子节点修改
            mstyle.firstChild = oldnode;
            return true;
        };
        /**
         * @brief checkMrow 检查过滤<mrow><mrow></mrow></mrow>结构
         * @param parentnode 操作符的父节点指针
         * @param childnode 操作符的子节点指针
         * @return 得到的结果值，操作是否成功
         */
        EDMmlDocument.prototype.checkMrow = function (parentnode, childnode) {
            //console.log(childnode.nextSibling);
            // <mrow><mrow></mrow></mrow>结构过滤
            if (parentnode.nodeType === EDMathMlNodeType.MrowNode
                && childnode.nodeType === EDMathMlNodeType.MrowNode) {
                if (parentnode.parent) {
                    // 起始<mrow>节点
                    if (parentnode.parent.nodeType === EDMathMlNodeType.UnknownNode) {
                        return false;
                    }
                }
                if (parentnode.firstChild.nodeType === EDMathMlNodeType.MtextNode
                    && parentnode.firstChild.nextSibling == null) {
                    var child = childnode.firstChild;
                    for (; child != null; child = child.nextSibling) {
                        if (child.nodeType === EDMathMlNodeType.MtextNode) {
                            if (child.firstChild.toTextNode().text === ''
                                || child.firstChild.toTextNode().text === 'isNuLL!') {
                                continue;
                            }
                        }
                        this.checkMrow(parentnode, child);
                        if (parentnode.firstChild.nextSibling == null) {
                            if (child.previousSibling) {
                                child.previousSibling.nextSibling = null;
                            }
                            child.previousSibling = parentnode.firstChild;
                            parentnode.firstChild.nextSibling = child;
                        }
                        if (childnode.firstChild) {
                            if (childnode.firstChild === child) {
                                childnode.firstChild = null;
                            }
                        }
                        child.parent = parentnode;
                    }
                    childnode.delete();
                    childnode = null;
                    // childnode = parentnode->firstChild()->nextSibling();
                    return true;
                }
            }
            return false;
        };
        return EDMmlDocument;
    }());
    EdrawMathDate.EDMmlDocument = EDMmlDocument;
})(EdrawMathDate || (EdrawMathDate = {}));
