// UI功能调用的接口
// 是所有操作的顶层接口
var EDMathMLDocument = EdrawMathDate.EDMathMLDocument;
var EDStatic = EdrawMathDate.EDStatic;
var EDRenderingPosition = EdrawMathDate.EDRenderingPosition;
// tslint:disable-next-line:no-namespace
var EdrawMath;
(function (EdrawMath) {
    var EDFormulaView = /** @class */ (function () {
        //private _mousepress: egPoint; // 鼠标按下位置
        // private _enable:boolean;//焦点使能
        function EDFormulaView(parent, uifunc) {
            if (uifunc === void 0) { uifunc = null; }
            var _this = this;
            var myself = this;
            //this._edimage = null;
            this._defaultFontSize = 40;
            this._fFontSize = 40;
            //this._bTransformation = false;
            //this._bScale = false;
            //this._fRotation = 0;
            this._bDrawFrames = false;
            this._bColors = ""; // rgb(0, 0, 0)
            //this._bIdRects = false;
            //this._bDefaultMode = false;
            // this._enable = true;
            EDFormulaView._uifunc = uifunc;
            if (parent === undefined || parent == null) {
                parent = document.createElement("div");
            }
            this._parent = parent;
            //设置三层标签元素的层级关系
            this._canvas = document.createElement("canvas");
            parent.appendChild(this._canvas);
            this._pMmlDoc = new EDMathMLDocument(this._canvas.getContext("2d"));
            //this._pEDStatic = new EDStatic();
            // parent.style.cssText = "display:inline-block;"
            parent.setAttribute("display", "inline-block");
            var x = EDStatic.g_init_mousepoint.x + this._canvas.offsetLeft;
            var y = EDStatic.g_init_mousepoint.y + this._canvas.offsetTop;
            // this._canvas.setAttribute("width","800px");
            // this._canvas.setAttribute("height","400px");
            this._canvas.style.cssText = "position:absolute;z-index:1;";
            this._background = document.createElement("canvas");
            parent.appendChild(this._background);
            this._background.style.cssText = "position:absolute;z-index:0;";
            this._background.getContext("2d").fillStyle = "#ffffff";
            this._background
                .getContext("2d")
                .fillRect(0, 0, this._canvas.width, this._canvas.height);
            // this._background.style.cssText = "border: solid #b2b2b2 1px;";
            // this._mmlinput = document.createElement("input");
            // parent.appendChild(this._mmlinput);
            // this._mmlinput.id = "edip4Math";
            // this._mmlinput.style.cssText = `opacity: 0;position: absolute;left:${x}px;top:${y}px;z-index:-1;width:1px;height:1px;border:none;font-size:1;`
            this._textarea = document.createElement("input");
            parent.appendChild(this._textarea);
            var ta = this._textarea;
            this._textarea.id = "edta4Math";
            this._textarea.style.cssText = "opacity: 0;position:absolute;left:".concat(x, "px;top:").concat(y, "px;z-index:-1;width:1px;height:1px;border:none;font-size:1;");
            //绑定输入栏的按键事件
            //注意:因为输入栏的value与监听信号不完全同步，因此对value的相关处理都需要作一个延迟操作
            this._textarea.onkeydown = function (event) {
                // console.log(event);
                // if (!myself._enable) {
                //    return;
                // }
                // console.log(`${event.key} ${myself._bInput}`);
                if (!myself._bInput) {
                    if (event.ctrlKey) {
                        myself.keyPressEvent(event);
                    }
                    else {
                        setTimeout(function () {
                            myself.keyPressEvent(event);
                        }, 50);
                    }
                }
                else {
                    // console.log(`ch onkeydown`);
                    setTimeout(function () {
                        // if (ta.value.length == 1) {
                        //    myself._pMmlDoc.insertText(ta.value+" ");
                        // }
                        // if (ta.value.length > 1) {
                        myself._pMmlDoc.updateMtext(ta.value + " ");
                        // }
                        myself.update();
                        ta.focus();
                    }, 50);
                }
            };
            this._textarea.onpaste = function (event) {
                var cbdata = event.clipboardData;
                if (null != cbdata) {
                    // if (!myself._enable) {
                    //    return;
                    // }
                    console.log("data = ".concat(cbdata.getData("Text")));
                    myself.editPaste(cbdata.getData("Text"));
                    myself._pMmlDoc.addSaveData();
                    myself.update();
                    ta.focus();
                }
                setTimeout(function () {
                    ta.value = "";
                }, 50);
            };
            //中文输入法的文本监听
            this._textarea.addEventListener("compositionstart", function () {
                // if (!myself._enable) {
                //    return;
                // }
                // console.log(`compositionstart`);
                myself._bInput = true;
                myself._pMmlDoc.insertText("  ");
                setTimeout(function () {
                    myself._pMmlDoc.updateMtext(ta.value + " ");
                    myself.update();
                    ta.focus();
                }, 50);
            });
            this._textarea.addEventListener("compositionend", function () {
                // console.log(`compositionend`);
                setTimeout(function () {
                    myself._bInput = false;
                    var del = myself._pMmlDoc.deleteNode();
                    var str = ta.value;
                    // for (let i=0;i<ta.value.length; ++i) {
                    //    if (i == 0) {
                    //        myself._pMmlDoc.updateMtext(ta.value.charAt(i));
                    //    } else {
                    //        myself._pMmlDoc.insertText(ta.value.charAt(i));
                    //    }
                    // }
                    myself.inputMethodEvent(str);
                    ta.value = "";
                    // myself._pMmlDoc.addSaveData();
                    myself.update();
                    // if (!myself._enable) {
                    //    return;
                    // }
                    myself._textarea.focus();
                }, 60);
            });
            // this._btn4copy = document.createElement("button");
            // parent.appendChild(this._btn4copy);
            // this._btn4copy.className = "btn4copy";
            // this._btn4copy.textContent = "BTN4COPY";
            // this._btn4copy.setAttribute("data-clipboard-action","copy");
            // this._btn4copy.setAttribute("data-clipboard-target","#edta4Math");
            // this._btn4copy.style.cssText = "position:absolute;z-index:2;width:20px;height:20px;";
            // const btnscript = document.createElement("script");
            // btnscript.text = `
            // var clipboard = new ClipboardJS('.btn4copy');
            // clipboard.on('success', function(e) {
            //     console.log(e);
            // });
            // clipboard.on('error', function(e) {
            //     console.log(e);
            // });`
            // parent.appendChild(btnscript);
            //绑定canvas的响应事件
            var btdown = false;
            this._canvas.onmousedown = function (event) {
                btdown = true;
                myself.mousePressEvent(event);
                // if (EDFormulaView._uifunc != null) {
                //    EDFormulaView._uifunc();
                // }
            };
            var flng = true;
            this._canvas.onmousemove = function (event) {
                if (!btdown) {
                    return;
                }
                if (!flng) {
                    return;
                }
                flng = false;
                setTimeout(function () {
                    flng = true;
                }, 100);
                if (event.buttons !== 1) {
                    btdown = false;
                    myself.mouseReleaseEvent(event);
                }
                else {
                    myself.mouseMoveEvent(event);
                }
                // if (EDFormulaView._uifunc != null) {
                //    EDFormulaView._uifunc();
                // }
            };
            this._canvas.onmouseup = function (event) {
                btdown = false;
                myself.mouseReleaseEvent(event);
            };
            this._canvas.ondblclick = function (event) {
                myself.mouseDoubleClickEvent(event);
            };
            this._canvas.onkeydown = function (event) {
                myself.keyPressEvent(event);
                if (event.shiftKey) {
                    // if (EDFormulaView._uifunc != null) {
                    //    EDFormulaView._uifunc();
                    // }
                }
            };
            // this._strPreString = '';
            // this._bFocus = true;
            this._bInput = false;
            this._MtableEnable = false;
            this._FontEnable = false;
            this._Undo = false;
            this._Redo = false;
            this._FontBold = false;
            this._FontItalic = false;
            this._colaligntype = ColAlign.ColAlignLeft;
            this._FontSize = this._fFontSize;
            this._topleft = new egPoint(0, 0);
            this._movePoint = new egPoint(0, 0);
            //this._mousepress = new egPoint(0, 0);
            this._rightbtn = false;
            this._leftbtn = false;
            this._paintflng = true;
            this._updatesignal = false;
            /*
            //设置定时器
            _pTimer  = new QTimer(this);
            connect(_pTimer, SIGNAL(timeout()), this, SLOT(handleTimeout()));
            _pTimer->start(1000);
            */
            this._nFlash = -1; // 闪烁标志初始为-1，用于启动后自动点击空白文本编辑框
            setInterval(function () {
                // 光标闪烁间隔为定时器延迟时间的2倍，即设置定时器延时时间x毫秒，光标交替显示x毫秒，隐藏x毫秒
                if (_this._nFlash % 2 === 0) {
                    _this._nFlash = 0;
                }
                _this._nFlash++;
                //    if (!hasFocus())
                //        setFocus();
                // this.focus();
                _this.update();
            }, 500);
            // this->setAttribute(Qt::WA_InputMethodEnabled);
            // this->setAttribute(Qt::WA_KeyCompression);
            // this->setFocusPolicy(Qt::WheelFocus);
            this._strFormula = "";
            this._rectfSize = new egRect(0, 0, 0, 0);
            this._pointEditedPos = new egPoint(0, 0);
            // this._rectEditedRect = new egRect(0, 0, 0, 0);
            // this._rectEditedParentRect = new egRect(0, 0, 0, 0);
            this._mouseRect = new egRect(0, 0, 0, 0);
            // this._strMmlDir = '';
            // this._imgURL = "";
            this.openNewMml();
            // this._pMmlDoc.egtest();
            if (-1 === this._nFlash) {
                // 第一次启动软件，自动执行鼠标点击EDStatic.g_init_mousepoint位置,即空白文本的可编辑框，呼出光标
                if (this._pMmlDoc.mousePress(EDStatic.g_init_mousepoint)) {
                    this._pointEditedPos = EDStatic.g_init_mousepoint;
                    // this.focus();// this.setFocus();
                    this._textarea.focus();
                    var strtype = ["left"];
                    var hasmatble = this._pMmlDoc.hasMtable(strtype);
                    var type = ColAlign.ColAlignLeft;
                    if (strtype[0] === "right") {
                        type = ColAlign.ColAlignRight;
                    }
                    else if (strtype[0] === "center") {
                        type = ColAlign.ColAlignCenter;
                    }
                    if (hasmatble !== this._MtableEnable ||
                        this._colaligntype !== type) {
                        this._MtableEnable = hasmatble;
                        this._colaligntype = type;
                        // emit mtableEnable(_MtableEnable, colaligntype);
                        // qDebug()<<QString("mtable:%1    type:%2").arg(_MtableEnable).arg(strtype)<<endl;
                    }
                    // const data = EdrawMath.getCookie("EDrawMathView");
                    //// const data = window.location.search.substr(1);
                    // const name = EdrawMath.getQueryString("name",data);
                    // const size = EdrawMath.getQueryString("size",data);
                    // const mmlstr = EdrawMath.getQueryString("mmlstr",data);
                    // console.log(`new editorView = ${data}`)
                    // if (name != null && size != null && mmlstr != null) {
                    //    this._edimagename = name;
                    //    this.fontSize = size.toInt();
                    //    this.openMml(decodeURIComponent(mmlstr));
                    // }
                }
            }
        }
        Object.defineProperty(EDFormulaView.prototype, "fontSize", {
            // 获取字体大小
            get: function () {
                return this._fFontSize;
            },
            // virtual bool saveAsMyFormula(int index);//保存为我的自定义公式
            // virtual void setFormula( const QString & );//设置公式文本
            // 设置字体大小
            set: function (fontSize) {
                if (fontSize === this._fFontSize) {
                    return;
                }
                this._fFontSize = fontSize;
                // emit updateFontSize(_fFontSize);
                this.update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDFormulaView.prototype, "fontDPI", {
            // 设置字体DPI大小
            set: function (dpi) {
                this._pMmlDoc.fontDPI = dpi;
                this.update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDFormulaView.prototype, "drawFrames", {
            /*
            //设置转换
            set transformation( transformation: boolean ) {
                this._bTransformation = transformation;
                this.update();
            };
            //设定缩放
            set scale( scale: boolean ) {
                this._bScale = scale;
                this.update();
            };
            //设置旋转
            set rotation( rotation: number ) {
                this._fRotation = rotation;
                this.update();
            };*/
            // 设置绘制框架
            set: function (drawFrames) {
                this._bDrawFrames = drawFrames;
                this.update();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDFormulaView.prototype, "selectFontItalic", {
            // 设置框选节点的文本为斜体字
            set: function (isitalic) {
                if (new egPoint(0, 0) === this._pointEditedPos) {
                    return;
                }
                if (!this._FontEnable) {
                    return;
                }
                if (this._pMmlDoc.setSelectFontItalic(isitalic)) {
                    this._pMmlDoc.addSaveData();
                    this._textarea.focus();
                    // this.updateui();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDFormulaView.prototype, "selectFontBold", {
            // 设置框选节点的文本为粗体字
            set: function (isbold) {
                if (new egPoint(0, 0) === this._pointEditedPos) {
                    return;
                }
                if (!this._FontEnable) {
                    return;
                }
                if (this._pMmlDoc.setSelectFontBold(isbold)) {
                    this._pMmlDoc.addSaveData();
                    this._textarea.focus();
                    // this.updateui();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDFormulaView.prototype, "clipBoardTextType", {
            // 设置粘贴板文本类型 默认MathML
            set: function (texttype) {
                this._pMmlDoc.clipBoardTextType = texttype;
            },
            enumerable: false,
            configurable: true
        });
        // 创建单例EDFormulaView
        EDFormulaView.creatEdFormulaview = function (parent, uifunc) {
            if (uifunc === void 0) { uifunc = null; }
            if (EDFormulaView._view === undefined ||
                EDFormulaView._view == null) {
                EDFormulaView._view = new EDFormulaView(parent, uifunc);
            }
            if (EDFormulaView._uifunc !== uifunc && uifunc != null) {
                EDFormulaView._uifunc = uifunc;
            }
            // console.log(`EDFormulaView has been exists`)
            return EDFormulaView._view;
        };
        //// 返回公式mathml文本内容
        // get formula(): string {
        //    return this._strFormula;
        // };
        // virtual QWidget *toWidget();
        /**
         * @brief openMml 打开公式文本
         * @param text 文本内容，要求使用utf-8编码
         */
        EDFormulaView.prototype.openMml = function (text /*, edimage: EDMathImage = null*/) {
            /* 原QT代码
            QString mmlFile = mmldir;
            //bool transmml = false;
            //if (mmldir.contains(".latex")) {
            //    EDLatextoMML latex2mml;
            //    QString latexFile= mmldir;
            //    mmlFile = mmlFile.replace(".latex",".mml");
            //    latex2mml.toMathML(latexFile, mmlFile);
            //    transmml = true;
            //}
            clearFormula();
            //_pMmlDoc->clear();//zq新增
            QString fileName = mmlFile;
            QFile file( fileName );
            if ( !file.open(QIODevice::ReadOnly | QIODevice::Text) )
                return;
            //zq 修复读取中文乱码
            QTextCodec::ConverterState state;
            QTextCodec *codec=QTextCodec::codecForName("UTF-8");
            const QByteArray document = file.readAll();
            QString text = codec->toUnicode( document.constData(), document.size(), &state);
            if (state.invalidChars > 0) {
                text = QTextCodec::codecForName( "GBK" )->toUnicode(document);
            } else {
                text = document;
            }
            file.close();
            //if (transmml)
            //    file.remove();

            if (mmldir.contains(".latex")) {
                EDLatextoMML latex2mml;
                QString mmlstr;
                if (latex2mml.latexFromStr(text, mmlstr))
                    text = mmlstr;
            }
            */
            // let gbk:boolean = false;
            // for (let c of text ) {
            //    console.log(`charCodeAt ${c.charCodeAt(0)} `)
            //    if(c.charCodeAt(0) == 65533){
            //        gbk = true;
            //        break;
            //    }
            //    if(c.charCodeAt(0) > 20000) {
            //        break;
            //    }
            // }
            // console.log(`charCodeAt ${gbk}`)
            //if (edimage != null) {
            //    console.log(`edimage change`);
            //    this._edimage = edimage;
            //}
            //文本格式判断
            console.log("openMml = ".concat(text));
            var mmlstr = text;
            if (text.match("<math") == null || text.match("</math>") == null) {
                if ((text.match("\\[") != null && text.match("\\]") != null) ||
                    text.match("$$") != null) {
                    //console.log(`latext to mml: ${text}`);
                    var latex2mml = new EdrawMathDate.EDLatextoMML();
                    mmlstr = latex2mml.latexFromStr(text);
                    console.log("latext: ".concat(mmlstr));
                    if (mmlstr === "") {
                        console.log("latext error");
                        return false;
                    }
                    // 最前面有 \[ $ 都删除  最后面有 \] $ 都删除
                    /* text = text.replace(/\\\[/g, '');
                    text = text.replace(/\\\]/g, '');
                    text = text.replace(/\$/g, '');
                    text = text.trim();
                    mmlstr = MathJax.tex2mml(text); */
                }
            }
            // 颜色解析
            var domparser = new DOMParser();
            var dom = domparser.parseFromString(mmlstr, "text/xml");
            var globalMathColor = dom.firstElementChild.getAttribute("mathcolor");
            if (globalMathColor) {
                this._bColors = globalMathColor;
                this._pMmlDoc.foregroundColor = globalMathColor;
            }
            this.clearFormula();
            this._strFormula = mmlstr;
            // 设置内容
            if (!this._pMmlDoc.setContent(this._strFormula)) {
                console.log("setContent failed");
                return false;
            }
            this._pMmlDoc.addSaveData();
            // emit setContent(_strFormula);
            // emit addSaveData();
            // QTimer::singleShot(0,_pMmlDoc,SLOT(mousePress(EDStatic::g_init_mousepoint)));
            // emit mousePress(EDStatic::g_init_mousepoint);
            if (this._pMmlDoc.mousePress(EDStatic.g_init_mousepoint)) {
                this._pointEditedPos = EDStatic.g_init_mousepoint;
                // this.focus();
                // this.setFocus();
            }
            var myself = this;
            setTimeout(function () {
                myself._textarea.focus();
            }, 500);
            this.moveEnd();
            this.update();
            return true;
        };
        /**
         * @brief openNewMml 打开新的空白mml文件
         */
        EDFormulaView.prototype.openNewMml = function () {
            // let doc = new Document;
            var doc = document.implementation.createDocument("", "", null);
            var ele = doc.createElement("math");
            ele.setAttribute("display", "block");
            ele.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
            doc.appendChild(ele);
            // EDStatic::createTmpDir();
            // QFile file(EDStatic::g_exe_name + "/tmp/tmp.mml" );
            // if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
            //    return;
            // QTextStream out(&file);
            // doc.save(out, 4);
            // file.close();
            // if ( !file.open(QIODevice::ReadOnly | QIODevice::Text) )
            //    return;
            // const QByteArray document = file.readAll();
            // file.close();
            // openMml(EDStatic::g_exe_name + "/tmp/tmp.mml");
            this.clearFormula();
            this._strFormula = new XMLSerializer().serializeToString(doc);
            console.log("openNewMml() ".concat(this._strFormula));
            // 设置内容
            if (!this._pMmlDoc.setContent(this._strFormula)) {
                return false;
            }
            this._pMmlDoc.addSaveData();
            if (this._pMmlDoc.mousePress(EDStatic.g_init_mousepoint)) {
                this._pointEditedPos = EDStatic.g_init_mousepoint;
                this._textarea.focus();
            }
            this.update();
            return true;
        };
        /**
         * @brief insertStdMml 插入公式库mml公式
         * @param text mml公式
         */
        EDFormulaView.prototype.insertStdMml = function (text) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            text = text.replace(/\\/g, "/");
            if (!this._pMmlDoc.insertStdMml(text)) {
                return false;
            }
            this.update();
            this._pMmlDoc.addSaveData();
            // this._strMmlDir = todir;
            this._textarea.focus();
            return true;
        };
        // // 保存修改公式库mml公式,参数为文件路径+文件名
        // public saveAsStdMml( dir: string ): boolean {
        //     const stdmml = this.outputMml();
        //     /* todo
        //     let todir: string = dir;
        //     todir.replace(/\\/g,"/");
        //     if (!this.outputMml(todir)) {
        //         return false;
        //     }
        //     let topngdir: string = todir.replace(".mml", ".png");
        //     if (!this.outputPng(topngdir)) {
        //         return false;
        //     }
        //     return true;*/
        //     return false;
        // }
        //
        /**
         * @brief setMtableColAlignType 设置<mtable>节点的行对齐方式
         * @param colaligntype 行对齐方式
         */
        EDFormulaView.prototype.setMtableColAlignType = function (colaligntype) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            if (!this._MtableEnable) {
                return false;
            }
            this._pMmlDoc.colAlignType = colaligntype;
            this._pMmlDoc.addSaveData();
            this._textarea.focus();
            // this.updateui();
            return true;
        };
        /*
        //设置颜色
        set colors( colors: string ) {
            this._bColors = colors;
            this.update();
        };
        //设置编号矩形
        set IdRects( idRects: boolean ) {
            this._bIdRects = idRects;
            this.update();
        };
        //设置默认显示模式
        set defaultMode( isdefault:boolean ) {
            this._bDefaultMode = isdefault;
            this.update();
        };*/
        // set enable(enable:boolean) {
        //    this._enable = enable
        // }
        // get enable() {
        //    return this._enable;
        // }
        /**
         * @brief focus 设置焦点
         */
        EDFormulaView.prototype.focus = function () {
            this._textarea.focus();
        };
        // getSize():egRect {
        //    return this._rectfSize;
        // }
        /**
         * @brief outputPng 输出公式的PNG图片到指定路径
         * @param name 输出路径，含文件名
         */
        EDFormulaView.prototype.outputPng = function (name) {
            // <a href="" download="EdrawMath.png" id="save_href"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA8CAYAAAAUufjgAAABCElEQVRoQ+2ZbQuDMBCDc7982y/vEBwMrZr0jtFt8aOk1/S5F8EGJn9icn+wwWyGTNAEswSy63+nBhtw29II4LF9x+gaEAE0hi5NsAH3jsHdO0b30kQnZmcP5hy1mpXyQnF3QBtkWP8fQeXEDEFFQ3WxDZ4gNUGl3npaimB2k4PPoQf1MFhlKjjFPczlBJWAw3k/WEil2Ab9JakuvLd4VA1W76/UtA1+ZA46xR4z1TWgjhllLFR7pcaMDWabpDptSkaoFNugUyzWQHkNKgFFr5dyqklsMNskX0uQuRNZ4LC68r9bzJ3IapC6Yyk3eNmCBQKqiwv2GQ5hg8Po1oUmaIJZAtn109fgE7TvYj1nhfcKAAAAAElFTkSuQmCC" id="save_img"/></a>
            var saveHref = document.createElement("a");
            var img = document.createElement("img");
            saveHref.appendChild(img);
            if (name.match(".") == null) {
                name = name + ".png";
            }
            saveHref.download = name;
            var tempSrc = this.outputPngURL();
            saveHref.setAttribute("href", tempSrc);
            // img.setAttribute("src", tempSrc);
            saveHref.click();
            // if(img.click) {
            //    img.click();  //判断是否支持click() 事件
            //    console.log(`img.click()`)
            // } else if(document.createEvent){
            //    var evt = document.createEvent("MouseEvents");  //创建click() 事件
            //    evt.initEvent("click", true, true);   //初始化click() 事件
            //    img.dispatchEvent(evt);  //分发click() 事件
            // }
            /*
            dir.replace("\\","/");
            //QImage image(QSize((int)_rectfSize.width(), (int)_rectfSize.height()),QImage::Format_ARGB32);
            //QPainter painter(&image);
            //renderFormula(&painter);
            this._pMmlDoc.baseFontPixelSize = this._fFontSize * EDStatic.g_font_image_scale ;//设置字体像素大小
            //QImage image = _pMmlDoc->getMmlImage();
            let image: ImageData = this._pMmlDoc.mmlPixmap;
            this._pMmlDoc.baseFontPixelSize = this._fFontSize;//设置字体像素大小

            if (dir.match(".png") != null) {

                if (image.save(dir, "png")) {
                    return true;
                } else {
                    return false;
                }
            }
            if (dir.match(".bmp") != null) {
                if (image.save(dir, "bmp")) {
                    return true;
                } else {
                    return false;
                }
            }
            if (dir.match(".jpg") != null) {
                if (image.save(dir, "jpg")) {
                    return true;
                } else {
                    return false;
                }
            }
            if (dir.match(".jpeg") != null) {
                if (image.save(dir, "jpeg")) {
                    return true;
                } else {
                    return false;
                }
            }*/
        };
        /**
         * @brief getEduStr 导出教育模块格式的数学表达式文本
         * @param edudata 数学表达式的相关参数
         */
        EDFormulaView.prototype.getEduStr = function (edudata) {
            if (edudata === void 0) { edudata = null; }
            return this._pMmlDoc.getEduStr(edudata);
        };
        /**
         * @brief outputPngURL 输出PNG图像的URL
         */
        EDFormulaView.prototype.outputPngURL = function () {
            // return this._imgURL;
            var ctx = this._pMmlDoc.ctx;
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            this._pMmlDoc.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.canvas.width = this._pMmlDoc.size().width;
            ctx.canvas.height = this._pMmlDoc.size().height;
            this._pMmlDoc.ctx.globalAlpha = 1; // 透明度
            this._pMmlDoc.ctx.save();
            this.renderFormula(true); // 渲染公式，不绘制红色输入框
            // const dataURL: string = this._pMmlDoc.ctx.canvas.toDataURL('image/png');
            var dataURL = this._canvas.toDataURL("image/png");
            //console.log(dataURL);
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            this.update();
            return dataURL;
        };
        /**
         * @brief outputJpgURL 输出JPG图像的URL
         */
        EDFormulaView.prototype.outputJpgURL = function () {
            var ctx = this._pMmlDoc.ctx;
            var width = ctx.canvas.width;
            var height = ctx.canvas.height;
            this._pMmlDoc.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.canvas.width = this._pMmlDoc.size().width;
            ctx.canvas.height = this._pMmlDoc.size().height;
            this._pMmlDoc.ctx.globalAlpha = 1; // 透明度
            this._pMmlDoc.ctx.save();
            this.renderFormula(true, true); // 渲染公式，不绘制红色输入框
            // const dataURL: string = this._pMmlDoc.ctx.canvas.toDataURL('image/png');
            var dataURL = this._canvas.toDataURL("image/jpeg");
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            this.update();
            return dataURL;
        };
        /**
         * @brief outputMml 输出公式的mml文本
         */
        EDFormulaView.prototype.outputMml = function () {
            /*
            dir.replace(/\\/g,"/");
            return this._pMmlDoc.outputMml(dir);
            */
            //console.log(this._pMmlDoc.outputMml());
            return this._pMmlDoc.outputMml();
        };
        /**
         * @brief outputLatex 输出公式的latex文本
         */
        EDFormulaView.prototype.outputLatex = function () {
            // dir.replace(/\\/g,"/");
            // console.log(this._pMmlDoc.outputLatex());
            var latex = this._pMmlDoc.outputLatex();
            console.log(latex);
            return latex;
        };
        // // 输出公式的EDMathImage
        // public outputEDMathImage(name: string = 'edrawmath'): boolean {
        //     console.log(`outputEDMathImage`);
        //     // const mmlstr = this._pMmlDoc.outputMml();
        //     // const size = this._fFontSize.toString();
        //     // const cookiestr = `name=${encodeURIComponent(this._edimagename)}&size=${size}&mmlstr=${encodeURIComponent(mmlstr)}`
        //     // console.log(`outputEdImage cookie = ${cookiestr}`);
        //     // setCookie("EDrawMathDate",cookiestr,1);
        //     if (this._edimage == null) {
        //         return false;
        //     }
        //     this._edimage.saveEDImage(this._pMmlDoc.outputMml(), this._fFontSize, this.outputPngURL(), name);
        //     return true;
        // }
        /**
         * @brief setInputMiItalic 设置输入字母的文本为斜体字
         * @param isitalic 是否斜体
         */
        EDFormulaView.prototype.setInputMiItalic = function (isitalic) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            this._pMmlDoc.inputMiItalic = isitalic;
        };
        /**
         * @brief setInputMiBold 设置输入字母的文本为粗体字
         * @param isbold 是否粗体
         */
        EDFormulaView.prototype.setInputMiBold = function (isbold) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            this._pMmlDoc.inputMiBold = isbold;
        };
        /**
         * @brief setInputMiBold 设置输入数字的文本为斜体字
         * @param isitalic 是否斜体
         */
        EDFormulaView.prototype.setInputMnItalic = function (isitalic) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            this._pMmlDoc.inputMnItalic = isitalic;
        };
        /**
         * @brief setInputMiBold 设置输入数字的文本为粗体字
         * @param isbold 是否粗体
         */
        EDFormulaView.prototype.setInputMnBold = function (isbold) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            this._pMmlDoc.inputMnBold = isbold;
        };
        /**
         * @brief setClipBoardTextType 设置粘贴文本为mathML/Latex
         * @param type 0为mathML，1为Latex
         */
        EDFormulaView.prototype.setClipBoardTextType = function (type) {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            this._pMmlDoc.clipBoardTextType = type;
        };
        /**
         * @brief editCopy 复制操作 str[0]：text文本 str[1]：url
         */
        EDFormulaView.prototype.editCopy = function () {
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // if (this._mmlinput == null) {
            //    return false;
            // }
            if (this._textarea == null) {
                return false;
            }
            var str = ["", ""];
            // 复制文本
            if (!this._pMmlDoc.copyMathmlText(str)) {
                return false;
            }
            str[1] = this.outputPngURL();
            // this._mmlinput.value = str[0];
            // this._mmlinput.select();
            this._textarea.value = str[0];
            this._textarea.focus();
            this._textarea.select();
            // let ok = document.execCommand('Copy')
            // this._btn4copy.click();
            if (!document.execCommand("Copy", false, null)) {
                console.log("copy failed");
                return false;
            }
            this._textarea.value = "";
            // this.focus();
            // console.log(`${this._mmlinput.value}`)
            // let ok2 = document.execCommand('Paste');
            // console.log(`${ok2} _mmlinput.value = ${this._textarea.value}`);
            // this.update();
            return true;
        };
        /**
         * @brief editCut 剪切操作
         */
        EDFormulaView.prototype.editCut = function () {
            this._textarea.focus();
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // 复制文本
            /*
            if (!this._pMmlDoc.copyMathmlText()) {
                return false;
            }*/
            if (!this.editCopy()) {
                console.log("editCut failed");
                return false;
            }
            // 删除本节点
            if (!this._pMmlDoc.deleteNode()) {
                return false;
            }
            this._pMmlDoc.addSaveData();
            this.update();
            return true;
        };
        /**
         * @brief editPaste 粘贴操作
         * @param clipboardDataText 黏贴的文本数据
         */
        EDFormulaView.prototype.editPaste = function (clipboardDataText) {
            if (clipboardDataText === void 0) { clipboardDataText = ""; }
            this._textarea.focus();
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // 复制文本
            if (!this._pMmlDoc.pasteMathmlText(clipboardDataText)) {
                console.log("editPaste failed");
                return false;
            }
            this._pMmlDoc.addSaveData();
            this.update();
            return true;
        };
        /**
         * @brief editPaste 重做操作
         */
        EDFormulaView.prototype.editRedo = function () {
            this._textarea.focus();
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // 重做
            if (!this._pMmlDoc.mmlRedo()) {
                console.log("mmlRedo false");
                this._textarea.value = "";
                return false;
            }
            this._textarea.value = "";
            this.update();
            return true;
        };
        /**
         * @brief editPaste 撤销操作
         */
        EDFormulaView.prototype.editUndo = function () {
            this._textarea.focus();
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // 撤销
            if (!this._pMmlDoc.mmlUndo()) {
                console.log("mmlUndo false");
                this._textarea.value = "";
                return false;
            }
            this._textarea.value = "";
            this.update();
            return true;
        };
        /**
         * @brief Formula 插入mml公式
         * @param index 公式索引值，例如EDMmlFormulaIndex::InsertFrac，表示插入分数公式
         */
        EDFormulaView.prototype.insertFormula = function (index) {
            this._textarea.focus();
            // 根据输入的类型对应执行EDMmlFormulaIndex的插入符号操作
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            // if (index == EDMmlFormulaIndex.SupSec_s) {
            //     index = EDMmlFormulaIndex.OverShellBracket;
            // }if (index == EDMmlFormulaIndex.SupMilliSec_s) {
            //    index = EDMmlFormulaIndex.UnderShellBracket;
            // }
            console.log("insertFormula = ".concat(index));
            if (index == EDMmlFormulaIndex.key_left) {
                this._pMmlDoc.moveLeft();
                this.moveToMouseNode();
                return true;
            }
            else if (index == EDMmlFormulaIndex.key_right) {
                this._pMmlDoc.moveRight();
                this.moveToMouseNode();
                return true;
            }
            else if (index == EDMmlFormulaIndex.key_backspace) {
                this._pMmlDoc.deleteNode();
            }
            else if (index == EDMmlFormulaIndex.key_selectedAll) {
                this._pMmlDoc.selectedAll();
            }
            else if (index == EDMmlFormulaIndex.key_enter) {
                this._pMmlDoc.insertEnter();
            }
            else if (index < EDMmlFormulaIndex.symbol_length) {
                if (!this._pMmlDoc.insertSymbol(index)) {
                    return false;
                }
            }
            else if (index > EDMmlFormulaIndex.symbol_length) {
                // if (index == EDMmlFormulaIndex.SupSec_s) {
                //     index = EDMmlFormulaIndex.SupSec;
                // }
                // if (index == EDMmlFormulaIndex.SupMilliSec_s) {
                //     index = EDMmlFormulaIndex.insertMrow;
                // }
                if (!this._pMmlDoc.insertFormula(index)) {
                    return false;
                }
            }
            this._pMmlDoc.addSaveData();
            this.update();
            return true;
        };
        /**
         * @brief 插入矩阵公式
         * @param row 矩阵行数，数值为正整数
         * @param col 矩阵列数，数值为正整数
         * @param frametype 框架类型，=0无框架，=1实线，=2虚线
         * @param rowlinestype 行线类型，=0无行线，=1实线，=2虚线
         */
        EDFormulaView.prototype.insertMtable = function (row, col, frametype, rowlinestype) {
            if (frametype === void 0) { frametype = 0; }
            if (rowlinestype === void 0) { rowlinestype = 0; }
            this._textarea.focus();
            if (row < 1 || col < 1) {
                return false;
            }
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return false;
            }
            if (!this._pMmlDoc.insertMtable(row, col, frametype, rowlinestype)) {
                return false;
            }
            this.update();
            this._pMmlDoc.addSaveData();
            return true;
        };
        /**
         * @brief mousePressEvent 鼠标按键按下事件
         * @param e 鼠标事件
         */
        EDFormulaView.prototype.mousePressEvent = function (e) {
            if (this._bInput) {
                return;
            }
            this._leftbtn = true;
            /*
            if( 1 == btntype ) {
                this._fFontSize = this._defaultFontSize;
                this._topleft = new egPoint(0,0);
                //emit updateFontSize(_fFontSize);
            } else if( 2 == btntype ) {
                //emit rightBtnPress(e);
                //setAttribute(Qt::WA_TransparentForMouseEvents);
                //emit rightBtnPress(e->pos());
                //_mousepress = e->pos();
                this._rightbtn = true;
            } else if (this._pMmlDoc.mousePress(mousepos.subtract(this._topleft))) {*/
            var rect = this._canvas.getBoundingClientRect();
            var mousepos = new egPoint(e.clientX - rect.left * (this._canvas.width / rect.width), e.clientY - rect.top * (this._canvas.height / rect.height));
            // mousepos = mousepos.subtract(this._topleft);
            if (this._pMmlDoc.mousePress(mousepos)) {
                // this.updateui();
                this._pointEditedPos = mousepos;
                this.update();
            }
        };
        /**
         * @brief mouseReleaseEvent 鼠标按键松开事件
         * @param e 鼠标事件
         */
        EDFormulaView.prototype.mouseReleaseEvent = function (e) {
            this._leftbtn = false;
            // if (!this._enable) {
            //    return;
            // }
            this._textarea.focus();
            /*
            if(2 == btntype) {
                this._mousepress = mousepos;
                this._topleft = this._topleft.add(this._movePoint);
                this._movePoint = new egPoint (0,0);
                this._rightbtn = false;
            }*/
        };
        /**
         * @brief mouseDoubleClickEvent 鼠标双击事件
         * @param e 鼠标事件
         */
        EDFormulaView.prototype.mouseDoubleClickEvent = function (e) {
            if (this._bInput) {
                return;
            }
            // if (this._pMmlDoc.mouseDoubleClicked(mousepos.subtract(this._topleft))) {
            var rect = this._canvas.getBoundingClientRect();
            var mousepos = new egPoint(e.clientX - rect.left * (this._canvas.width / rect.width), e.clientY - rect.top * (this._canvas.height / rect.height));
            if (this._pMmlDoc.mouseDoubleClicked(mousepos)) {
                // this.updateui();
                this._pointEditedPos = mousepos;
                this.update();
            }
            return;
        };
        /**
         * @brief mouseMoveEvent 鼠标移动事件
         * @param e 鼠标事件
         */
        EDFormulaView.prototype.mouseMoveEvent = function (e) {
            if (this._bInput) {
                return;
            }
            if (!this._leftbtn) {
                return;
            }
            if (this._rightbtn) {
                // emit rightBtnPress(e->pos() - _mousepress);
                // _movePoint = e->pos() - _mousepress;
                // if ((_topleft+_movePoint).x()<0)
                //    _movePoint.setX(0 - _topleft.x());
                // if ((_topleft+_movePoint).y()<0)
                //    _movePoint.setY(0 - _topleft.y());
                // update();
                return;
            }
            var rect = this._canvas.getBoundingClientRect();
            var mousepos = new egPoint(e.clientX - rect.left * (this._canvas.width / rect.width), e.clientY - rect.top * (this._canvas.height / rect.height));
            if (this._pMmlDoc.mouseMove(mousepos)) {
                // this.updateui();
                this._pointEditedPos = mousepos;
                this.update();
            }
            return;
        };
        /**
         * @brief keyPressEvent 键盘按键按下事件
         * @param event 键盘事件
         */
        EDFormulaView.prototype.keyPressEvent = function (event) {
            /* console.log(EDFormulaView.getOSX());
            console.log("platform\t" + EDFormulaView.getOSX().platform);
            console.log("browser\t" + EDFormulaView.getOSX().browser);
            console.log("bver\t" + EDFormulaView.getOSX().bver);
            console.log("keyboard event");
            console.log("event.code\t" + event.code)
            console.log("event.keyCode\t" + event.keyCode)
            console.log("event.which\t" + event.which) */
            if (new egPoint(0, 0) === this._pointEditedPos) {
                return;
            }
            // if (!this._enable) {
            //    return;
            // }
            // qDebug()<<"keyPressEvent:"<<event->text()<<endl;
            // 是否按下Ctrl键      特殊按键
            if (event.ctrlKey) {
                // 是否按下M键    普通按键  类似
                // console.log(event);
                if (event.key === "c" || event.key === "C" || event.keyCode === 67) {
                    var ok = this.editCopy();
                    // <"Ctrl+C"
                    // setTimeout(() => {
                    //    this._pMmlDoc.copyMathmlText();//复制文本
                    // }, 10);
                }
                else if (event.key === "v" || event.key === "V" || event.keyCode === 86) {
                    this._textarea.value = "";
                    // setTimeout(() => {
                    //    this._pMmlDoc.pasteMathmlText();//粘贴文本
                    //    this._pMmlDoc.addSaveData();
                    // }, 10);
                }
                else if (event.key === "x" || event.key === "X" || event.keyCode === 88) {
                    // 剪切文本
                    this.editCut();
                    /*
                    this._pMmlDoc.copyMathmlText();//复制文本
                    this._pMmlDoc.deleteNode();//删除本节点
                    this._pMmlDoc.addSaveData();
                    */
                }
                else if (event.key === "z" || event.key === "Z" || event.keyCode === 90) {
                    var ok = this.editUndo(); // 撤销
                }
                else if (event.key === "y" || event.key === "Y" || event.keyCode === 89) {
                    var ok = this.editRedo(); // 重做
                }
                else if (event.key === "s" || event.key === "S") {
                    //console.log(`save edimage`);
                }
                else if (event.key === "1") {
                    // 常规字体
                    // setSelectFontNormal();
                }
                else if (event.key === "2") {
                    // 斜体
                    // setSelectFontBoldItalic();
                }
                else if (event.key === "3") {
                    // 粗体
                    // setSelectFontBold();
                }
                else if (event.key === "4") {
                    // 斜体 粗体
                    // setSelectFontBoldItalic();
                }
                else if (event.key === "=") {
                    if (this._fFontSize <= 100) {
                        this._fFontSize = this._fFontSize + 2;
                        // emit updateFontSize(_fFontSize);
                    }
                }
                else if (event.key === "-") {
                    if (this._fFontSize >= 10) {
                        this._fFontSize = this._fFontSize - 2;
                        // emit updateFontSize(_fFontSize);
                    }
                }
                else if (event.key === "0") {
                    // 0
                    this._fFontSize = this._defaultFontSize;
                    // emit updateFontSize(_fFontSize);
                }
                else if (event.key === "n" || event.key === "N") {
                    this.openNewMml(); // 新建
                }
                else if (event.key === "a" || event.key === "A" || event.keyCode === 65) {
                    this._pMmlDoc.selectedAll(); // 全选
                    // updateui();
                    // if (EDFormulaView._uifunc != null) {
                    //    EDFormulaView._uifunc();
                    // }
                }
                else if (event.key === "h" || event.key === "H") {
                    // 测试
                    // QString topngdir = _strMmlDir;
                    // outputMml(topngdir);
                    // outputPng(topngdir.replace(".mml",".png");
                } /* else if (event->key() == Qt::Key_O) {
                    //_bFocus = false;
                    //const QString fileName = QFileDialog::getOpenFileName( NULL,
                    //    "Load a Equation File", QString::null, "Equation Files (*.mml *.latex)" );
                    //if ( !fileName.isEmpty() )
                    //    openMml( fileName );//设置公式文本
                    //_bFocus = true;
                    bool bpause = true;
                } else if (event->key() == Qt::Key_L) {
                    saveAsStdMml("test1.mml");
                }*/
                this.update();
                this._textarea.focus();
                return;
            }
            else if (event.shiftKey) {
                //console.log(event.key);
                if (event.key === "ArrowLeft") {
                    // left
                    this._pMmlDoc.selectedLeft();
                    this.update();
                    return;
                }
                else if (event.key === "ArrowRight") {
                    // right
                    this._pMmlDoc.selectedRight();
                    this.update();
                    return;
                }
                //this.update();
                // this._textarea.focus();
            }
            if (event.key === "Backspace" ||
                (event.key === "Delete" &&
                    parseInt(EDFormulaView.getOSX().bver) < 70 &&
                    EDFormulaView.osMac())) {
                // backspace
                var ok = this._pMmlDoc.deleteNode(); // 删除本节点
                //console.log(`delete`,ok);
                this._pMmlDoc.addSaveData();
            }
            else if (event.key === "Delete") {
                // delete
                this._pMmlDoc.deleteNextNode(); // 删除本节点的下一同级节点
                this._pMmlDoc.addSaveData();
            }
            else if (event.key === "Enter") {
                // enter
                this._textarea.value = "";
                this._pMmlDoc.insertEnter(); // 插入换行节点
                this._pMmlDoc.addSaveData();
            }
            else if (event.key === "ArrowUp") {
                // up
                this._pMmlDoc.moveUp();
                this.moveToMouseNode();
            }
            else if (event.key === "ArrowDown") {
                // down
                this._pMmlDoc.moveDowm();
                this.moveToMouseNode();
            }
            else if (event.key === "ArrowLeft") {
                // left
                this._pMmlDoc.moveLeft();
                this.moveToMouseNode();
            }
            else if (event.key === "ArrowRight") {
                // right
                this._pMmlDoc.moveRight();
                this.moveToMouseNode();
            }
            else {
                /*
                if (event.key == "Process" ) {
                    let x:number = this._pointEditedPos.x + this._canvas.offsetLeft;
                    let y:number = this._pointEditedPos.y + this._canvas.offsetTop;
                    if (this._pointEditedPos.x + EDStatic.g_init_mousepoint.x > this._canvas.width) {
                        x = this._canvas.width - EDStatic.g_init_mousepoint.x + this._canvas.offsetLeft;
                    }
                    if (this._pointEditedPos.y + EDStatic.g_init_mousepoint.y > this._canvas.height) {
                        y = this._canvas.height - EDStatic.g_init_mousepoint.y + this._canvas.offsetTop;
                    }
                    //this._textarea.style.cssText = `position:absolute;left:${x}px;top:${y}px;z-index:-999999`
                    this._textarea.style.left = `${x}px`;
                    this._textarea.style.top = `${y}px`;
                }*/
                if (!this._bInput) {
                    // 正则匹配按键输入内容是否为字母，数字，数学符号
                    // const pattern: RegExp = /[|!\()\{}\[<>+-=a-zA-Z0-9*]{1}/;
                    // if (event.key.match(pattern) != null && event.key.length == 1 || event.key == "]") {
                    // this._pMmlDoc.insertText(event.key);//插入文本
                    // this.inputMethodEvent(event.key); // this._textarea.value
                    // this._pMmlDoc.addSaveData();
                    this.inputMethodEvent(this._textarea.value);
                    this._textarea.value = "";
                    // }
                }
            }
            this.update();
            this._textarea.focus();
        };
        /**
         * @brief getUiDate 获取界面更新参数
         * @param enable 使能状态，[0]=字体粗体斜体设置，[1]=矩阵行对齐设置 [2]=撤销使能 [3]=重做使能
         * @param fontdate 框选字体状态 [0]=是否粗体，[1]=是否斜体
         * @param colaligntype 矩阵行对齐状态，[0]=左对齐，[1]=居中，[2]=右对齐
         * @param fontsize 当前的字体大小，[0]字体大小
         */
        EDFormulaView.prototype.getUiDate = function (enable, fontdate, colaligntype, fontsize) {
            if (enable === void 0) { enable = []; }
            if (fontdate === void 0) { fontdate = []; }
            if (colaligntype === void 0) { colaligntype = [ColAlign.ColAlignLeft]; }
            if (enable.length > 0) {
                enable[0] = this._FontEnable;
            }
            if (enable.length > 1) {
                enable[1] = this._MtableEnable;
            }
            if (enable.length > 2) {
                enable[2] = this._Undo;
            }
            if (enable.length > 3) {
                enable[3] = this._Redo;
            }
            if (fontdate.length > 1) {
                fontdate[0] = this._FontBold;
                fontdate[1] = this._FontItalic;
            }
            if (fontsize.length > 0) {
                fontsize[0] = this._fFontSize;
                //console.log(fontsize[0]);
            }
            if (colaligntype.length > 0) {
                colaligntype[0] = this._colaligntype;
            }
        };
        /**
         * @brief clearFormula 清空公式文本
         */
        EDFormulaView.prototype.clearFormula = function () {
            this._pointEditedPos = new egPoint(0, 0);
            this._mouseRect = new egRect(0, 0, 0, 0);
            this._pMmlDoc.clear();
        };
        /**
         * @brief setSize 设置canvas大小
         * @param width 宽
         * @param height 高
         */
        EDFormulaView.prototype.setSize = function (width, height) {
            // this._canvas.setAttribute("width", width.toString()+"px");
            // this._canvas.setAttribute("height", height.toString()+"px");
            this._background.setAttribute("width", width.toString() + "px");
            this._background.setAttribute("height", height.toString() + "px");
            this._background.getContext("2d").fillStyle = "rgb(255, 255, 255)";
            this._background.getContext("2d").fillRect(0, 0, width, height);
        };
        /// **
        // * @brief 插入特殊符
        // * @param text 特殊符的文本码，例如QString("<mo>&#x00B1;</mo>")，表示插入"±"
        // */
        // bool insertSign(QString text);
        /*
        mousePress( pos: egPoint ): void {
            if (this._bInput) {
                return;
            }
            if (this._pMmlDoc.mousePress(pos.subtract(this._topleft))) {

                let strtype: string[] = ["left"];
                let hasmatble: boolean = this._pMmlDoc.hasMtable(strtype);
                let type: ColAlign = ColAlign.ColAlignLeft;
                if (strtype[0] == "right") {
                    type = ColAlign.ColAlignRight;
                } else if (strtype[0] == "center") {
                    type = ColAlign.ColAlignCenter;
                }
                if (hasmatble != this._MtableEnable || this.colaligntype != type ) {
                    this._MtableEnable = hasmatble;
                    this.colaligntype = type;
                    //emit mtableEnable(_MtableEnable, colaligntype);
                }
                this._pointEditedPos = pos;
            }
            this.update();
        };
        mouseMove( pos: egPoint ): void {
            if (this._bInput) {
                return;
            }

            if (this._pMmlDoc.mouseMove(pos.subtract(this._topleft))) {
                let isbold: boolean[] = [false];
                let isitalic: boolean[] = [false];
                let emptynode: boolean = this._pMmlDoc.emptyNode(isbold, isitalic);
                if (emptynode[0] == this._FontEnable || isbold[0] != this._FontBold || isitalic[0] != this._FontItalic) {
                    this._FontEnable = !emptynode;
                    this._FontBold = isbold[0];
                    this._FontItalic = isitalic[0];
                    //emit fontEnable(_FontEnable, _FontBold, _FontItalic);
                    //qDebug()<<QString("bold:%1   italic:%2").arg(isbold).arg(isitalic)<<endl;
                }
                this._pointEditedPos = pos;
                this.update();
            }
            return;
        };*/
        /**
         * @brief renderFormula 渲染公式，根据设置的参数值绘制公式图像
         * @param outputPng 是否输出png,如果输出png，则不绘制红色输入框，否则绘制(默认)
         * @param backgroundWhite 是否将背景渲染成白色，如果false，则背景色为透明（默认）
         */
        EDFormulaView.prototype.renderFormula = function (outputPng, backgroundWhite) {
            // EgMathML_document _doc;//实例化mml文本类
            if (outputPng === void 0) { outputPng = false; }
            if (backgroundWhite === void 0) { backgroundWhite = false; }
            // this._pMmlDoc.defaultMode = this._bDefaultMode ;
            this._pMmlDoc.baseFontPixelSize = this._fFontSize; // 设置字体像素大小
            this._pMmlDoc.drawFrames = this._bDrawFrames; // 设置绘画框架
            // _pMmlDoc->setContent( _strFormula );//设置内容 转移至EDFormulaView::setFormula zq
            if (this._bColors !== "") {
                this._pMmlDoc.foregroundColor = this._bColors;
            }
            else {
                // _pMmlDoc->setBackgroundColor( Qt::transparent );//QColor(255,255,255,100) );
                this._pMmlDoc.foregroundColor = "rgb(0, 0, 0)";
            }
            var setsize = false;
            // 得到计算后的矩形大小
            if (this._rectfSize.width !== this._pMmlDoc.size().width) {
                this._rectfSize.width = this._pMmlDoc.size().width;
                // this.width = this._rectfSize.width;
                setsize = true;
            }
            if (this._rectfSize.height !== this._pMmlDoc.size().height) {
                this._rectfSize.height = this._pMmlDoc.size().height;
                // this.height = this._rectfSize.height;
                setsize = true;
            }
            // image.setDevicePixelRatio(EDStatic::g_font_image_scale);
            // painter->drawImage(_topleft+_movePoint, _pMmlDoc->getMmlImage());//.scaled(image.size()*1.0/EDStatic::g_font_image_scale,
            // Qt::KeepAspectRatio,Qt::SmoothTransformation));
            var p = new egPoint(this._topleft.x, this._topleft.y);
            p = p.add(this._movePoint);
            if (setsize) {
                this.setSize(this._rectfSize.width, this._rectfSize.height);
            }
            if (outputPng) {
                if (backgroundWhite) {
                    this._pMmlDoc.ctx.putImageData(this._pMmlDoc.outPutMmlPixmapWhite(), p.x, p.y);
                }
                else {
                    this._pMmlDoc.ctx.putImageData(this._pMmlDoc.outPutMmlPixmap(), p.x, p.y);
                }
            }
            else {
                this._pMmlDoc.ctx.putImageData(this._pMmlDoc.mmlPixmap, p.x, p.y);
            }
            return; // 修改重绘 通过加载图片的方式减少cpu消耗
            // _docRect.moveCenter( rect().center() );//不移动到中心 zq 修改
            /*
            QVector<EDRenderingPosition> rectpos;
            rectpos = _pMmlDoc->getRenderingPositions();//渲染位置为空？ zq

            if ( _bTransformation ) {//是否转型
                const double scaleF = _bScale ? 2.0 : 1.0;

                painter->save();
                painter->translate( _docRect.center() );
                painter->rotate( _fRotation );
                painter->scale( scaleF, scaleF );
                painter->translate( _docRect.topLeft() - _docRect.center() );
                _pMmlDoc->paint( painter, QPointF( 0.0, 0.0 ) );

                if (_bIdRects) {
                    paintIdRects(_pMmlDoc, painter);
                }
                painter->restore();
            } else {
                painter->save();
                _pMmlDoc->paint( painter, _docRect.topLeft() );
                if (_bIdRects) {
                    paintIdRects(_pMmlDoc, painter);
                }
                painter->restore();
            }*/
        };
        // // const;//绘制编号矩形
        // private  paintIdRects(doc: EDMathMLDocument): void {
        //     const renderingPosition: EDRenderingPosition[] = doc.renderingPositions;
        //     const color = 'rgb(0, 0, 255)';
        //     for (const position of renderingPosition) {
        //         /*
        //         if (position._subPos == 0) {
        //             painter->setPen(Qt::darkGray);
        //             painter->drawRect(position._itemRect);
        //         } else {
        //             painter->setPen(color);
        //             painter->drawRect(position._itemRect);
        //         }
        //         if (color == Qt::darkYellow)
        //             color = Qt::gray;
        //         else
        //             color = static_cast<Qt::GlobalColor>(static_cast<int>(color) + 1);
        //         */
        //     }
        // }
        /**
         * @brief update 更新函数，对应QT版本的绘图事件，绘制鼠标光标，框选框等
         */
        EDFormulaView.prototype.update = function () {
            var _this = this;
            if (!this._paintflng) {
                // this._updatesignal = true;
                return;
            }
            this._paintflng = false;
            setTimeout(function () {
                _this._paintflng = true;
                /* if (this._updatesignal) {
                    this._updatesignal = false;
                    this.update();
                } */
            }, 150);
            // this._textarea.value = "";
            var ctx = this._pMmlDoc.ctx;
            this._pMmlDoc.ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this._pMmlDoc.ctx.save();
            this._pMmlDoc.ctx.globalAlpha = 1; // 透明度
            this.renderFormula(); // 渲染公式
            // qDebug()<<this->rect()<<endl;
            // this.setMinimumSize((int)_rectfSize.width(),(int)_rectfSize.height());
            // this.setMaximumSize((int)_rectfSize.width(),(int)_rectfSize.height());
            if (this._rightbtn) {
                return;
            }
            var hline = new egLine(0, 0, 0, 0);
            var vline = new egLine(0, 0, 0, 0);
            var mousenodePos = new egPoint(0.0, 0.0);
            this._pMmlDoc.getCursor(vline, hline, this._mouseRect, mousenodePos);
            this._pointEditedPos.x = vline._vx;
            this._pointEditedPos.y = vline._vy;
            // hline.translate(this._topleft);
            // vline.translate(this._topleft);
            this._mouseRect.moveTopLeft(this._mouseRect.topLeft().add(this._topleft));
            /*
            let isbold: boolean[] = [true];
            let isitalic: boolean[] = [true];
            let emptynode: boolean = this._pMmlDoc.emptyNode(isbold, isitalic);

            if (emptynode[0] == this._FontEnable || isbold[0] != this._FontBold || isitalic[0] != this._FontItalic) {
                this._FontEnable = !emptynode;
                this._FontBold = isbold[0];
                this._FontItalic = isitalic[0];
                //emit fontEnable(_FontEnable, _FontBold, _FontItalic);
                //qDebug()<<QString("bold:%1   italic:%2").arg(isbold).arg(isitalic)<<endl;
            }*/
            // painter.fillRect( _mouseRect, QColor(150, 150, 150, 80) );//设置背景色及透明度
            this.updateui();
            if (1 === this._nFlash && this._mouseRect.width === 0) {
                this._pMmlDoc.ctx.lineWidth = 1; // 设置光标的粗细
                // this._pMmlDoc.ctx.strokeStyle = "rgb(000, 111, 222)"; // 设置光标的颜色
                this._pMmlDoc.ctx.strokeStyle = "rgb(100, 100, 100)"; // 设置光标的颜色
                // _pMmlDoc->getCursor(hline, vline, _mouseRect);
                // 绘制输入光标，垂直线为编辑矩形的x坐标，长度是父节点的高度
                this._pMmlDoc.ctx.beginPath();
                this._pMmlDoc.ctx.moveTo(vline._px + 1, vline._py + 1);
                this._pMmlDoc.ctx.lineTo(vline._vx + 1, vline._vy + 1);
                this._pMmlDoc.ctx.closePath();
                this._pMmlDoc.ctx.stroke();
                this._pMmlDoc.ctx.beginPath();
                this._pMmlDoc.ctx.moveTo(hline._px + 1, hline._py + 1);
                this._pMmlDoc.ctx.lineTo(hline._vx + 1, hline._vy + 1);
                this._pMmlDoc.ctx.closePath();
                this._pMmlDoc.ctx.stroke();
                // console.log(`vline (${vline._px},${vline._py})->(${vline._vx},${vline._vy})`);
                // console.log(`jline (${hline._px},${hline._py})->(${hline._vx},${hline._vy})`);
                var x = mousenodePos.x + this._canvas.offsetLeft;
                var y = mousenodePos.y + this._canvas.offsetTop;
                // console.log(`${x}px ${y}px`);
                // if (mousenodePos.x > this._canvas.width) {
                //    x = this._canvas.width - EDStatic.g_init_mousepoint.x + this._canvas.offsetLeft;
                // }
                // if (mousenodePos.y > this._canvas.height) {
                //    y = this._canvas.height - EDStatic.g_init_mousepoint.y + this._canvas.offsetTop;
                // }
                // console.log(`·····${x}px ${y}px`);
                // this._textarea.style.cssText = `position:absolute;left:${x}px;top:${y}px;z-index:-999999`
                if (!this._bInput) {
                    this._textarea.style.width = "40px";
                    if (this._textarea.style.left !== "".concat(Math.round(x), "px")) {
                        this._textarea.style.left = "".concat(Math.round(x), "px");
                        // console.log(`this._textarea.style.left = ${Math.round(x)}px`);
                        this._textarea.focus();
                    }
                }
                else {
                    var x1 = parseInt(this._textarea.style.left);
                    var x2 = vline._vx; // 光标所在x
                    var width = x2 - x1;
                    if (width > 40)
                        this._textarea.style.width = width + "px";
                }
                if (this._textarea.style.top !== "".concat(Math.round(y), "px")) {
                    this._textarea.style.top = "".concat(Math.round(y), "px");
                    // console.log(`this._textarea.style.top = ${Math.round(y)}px`);
                    this._textarea.focus();
                }
            }
            this._pMmlDoc.ctx.globalAlpha = 0.5; // 透明度
            this._pMmlDoc.ctx.fillStyle = "rgb(150, 150, 150)";
            this._pMmlDoc.ctx.fillRect(this._mouseRect.left(), this._mouseRect.top(), this._mouseRect.width, this._mouseRect.height);
            this._pMmlDoc.ctx.restore();
        };
        /**
         * @brief inputMethodEvent 输入文本处理事件，QT版本是中文输入事件，TS版本仅保留了字符串分割成字符的功能块
         * @param inputtext 输入的文本
         */
        EDFormulaView.prototype.inputMethodEvent = function (inputtext) {
            // if (!this._enable) {
            //    return;
            // }
            if (new egPoint(0, 0) === this._pointEditedPos ||
                inputtext.length < 1) {
                return;
            }
            //console.log(inputtext);
            if (inputtext.length > 1) {
                for (var i = 0; i < inputtext.length; ++i) {
                    var onetext = inputtext.charAt(i);
                    if (i === inputtext.length - 1) {
                        this._pMmlDoc.insertText(onetext); // 插入文本
                    }
                    else {
                        this._pMmlDoc.insertText(onetext); // 插入文本
                    }
                }
            }
            else if (inputtext.length === 1) {
                this._pMmlDoc.insertText(inputtext); // 插入文本
            }
            this._pMmlDoc.addSaveData();
            this._textarea.focus();
            // this._bInput = false;
            this.update();
            /*
            this._bInput = true;
            let text:string = inputtext;//event->commitString();
            let preedit:string = "";//event->preeditString();
            //qDebug()<<"inputMethodEvent:"<<preedit<<endl;

            if ("" == text) {
                if (new egPoint(0,0) != this._pointEditedPos) {
                    if (this._strPreString != "") {
                        this._pMmlDoc.updateMtext(preedit+" ");
                    } else if (preedit != "") {
                        this._pMmlDoc.insertText(preedit+" ");//插入文本
                    } else if (preedit == "") {
                        this._pMmlDoc.deleteNode();
                    }
                    this._strPreString = preedit;
                    //qDebug()<<"inputMethodEvent:"<<_strPreString<<endl;
                }
                this._bInput = false;
                this.update();
                return;
            }
            if (new egPoint(0,0) != this._pointEditedPos) {
                console.log(`1 = ${text}`);
                let mtext: string = text.replace(" ", "");
                if (this._strPreString != "") {
                    if (mtext.length > 0) {
                        this._pMmlDoc.updateMtext(mtext.charAt(0), false);
                    }
                    if (mtext.length > 1) {
                        for (let i=1; i < mtext.length; ++i) {
                            let onetext: string = mtext.charAt(i);
                            if (i == mtext.length-1) {
                                 this._pMmlDoc.insertText(onetext);//插入文本
                            } else {
                                this._pMmlDoc.insertText(onetext,false);//插入文本
                            }
                        }
                    }
                    this._strPreString = "";
                } else if (mtext.length == 1) {
                    this._pMmlDoc.insertText(mtext);//插入文本
                }
                this._pMmlDoc.addSaveData();

                this._bInput = false;
                this.update();
            }*/
        };
        /**
         * @brief updateui 界面参数更新，将UI参数与内核参数作比较，如果存在不同则更新为内核参数，并调用UI更新的函数
         */
        EDFormulaView.prototype.updateui = function () {
            var isbold = [false];
            var isitalic = [false];
            var enable = !this._pMmlDoc.emptyNode(isbold, isitalic);
            var uichange = false;
            if (enable !== this._FontEnable ||
                isbold[0] !== this._FontBold ||
                isitalic[0] !== this._FontItalic) {
                if (enable !== this._FontEnable) {
                    this._FontEnable = enable;
                }
                this._FontBold = isbold[0];
                this._FontItalic = isitalic[0];
                uichange = true;
                // qDebug()<<QString("bold:%1   italic:%2").arg(isbold).arg(isitalic)<<endl;
            }
            // console.log(`emptyNode: ${!enable}`)
            var strtype = ["left"];
            var hasmatble = this._pMmlDoc.hasMtable(strtype);
            // console.log(`updateui:hasmatble=${hasmatble}`);
            var type = ColAlign.ColAlignLeft;
            if (strtype[0] === "right") {
                type = ColAlign.ColAlignRight;
            }
            else if (strtype[0] === "center") {
                type = ColAlign.ColAlignCenter;
            }
            if (hasmatble !== this._MtableEnable ||
                this._colaligntype !== type) {
                this._MtableEnable = hasmatble;
                this._colaligntype = type;
                uichange = true;
            }
            var undo = this._pMmlDoc.undoEnable;
            var redo = this._pMmlDoc.redoEnable;
            if (undo !== this._Undo) {
                this._Undo = undo;
                uichange = true;
            }
            if (redo !== this._Redo) {
                this._Redo = redo;
                uichange = true;
            }
            var fonsize = this._fFontSize;
            if (fonsize !== this._FontSize) {
                this._FontSize = fonsize;
                uichange = true;
            }
            if (EDFormulaView._uifunc != null && uichange) {
                EDFormulaView._uifunc();
            }
        };
        // emit fontEnable(_FontEnable, _FontBold, _FontItalic);
        /**
         * @brief moveEnd 光标移动到尾端
         * @return 返回的结果值，操作是否成功
         */
        EDFormulaView.prototype.moveEnd = function () {
            return this._pMmlDoc.moveEnd();
        };
        /**
         * @brief setColor 设置文本颜色
         * @return 返回的结果值，操作是否成功
        */
        EDFormulaView.prototype.setColor = function (color) {
            if (!color) {
                return false;
            }
            this._bColors = color;
            this._pMmlDoc.foregroundColor = this._bColors;
            this._pMmlDoc.updateDocument();
            this.openMml(this._pMmlDoc._strDocument);
            // return this._pMmlDoc.renderColor();
            return true;
        };
        // public setColor(color: string): boolean {
        // 	if (!color) {
        // 		return false;
        // 	}
        // 	this._bColors = color;
        // 	/* this._pMmlDoc.foregroundColor = this._bColors;
        // 	this._pMmlDoc.updateDocument(); */
        // 	this._pMmlDoc.setColor(color);
        // 	// this.openMml(this._pMmlDoc.outputMml());
        // 	// return this._pMmlDoc.renderColor();
        // 	return true;
        // }
        /**
         * 移动到光标位置
         */
        EDFormulaView.prototype.moveToMouseNode = function () {
            var hline = new egLine(0, 0, 0, 0);
            var vline = new egLine(0, 0, 0, 0);
            var mousenodePos = new egPoint(0.0, 0.0);
            this._pMmlDoc.getCursor(vline, hline, this._mouseRect, mousenodePos);
            // console.log(mousenodePos);
            var x = vline._px;
            var y = vline._py;
            this._parent.scrollLeft;
            this._parent.clientWidth;
            if (x < this._parent.scrollLeft + 20) {
                this._parent.scrollLeft = x - 20;
            }
            else if (x > this._parent.scrollLeft + this._parent.clientWidth - 60) {
                this._parent.scrollLeft = x - this._parent.clientWidth + 60;
            }
            if (y < this._parent.scrollTop + 20) {
                this._parent.scrollTop = y - 20;
            }
            else if (y > this._parent.scrollLeft + this._parent.clientHeight - 60) {
                this._parent.scrollTop = y - this._parent.clientHeight + 60;
            }
        };
        EDFormulaView.getOSX = function () {
            var res = {
                browser: "",
                platform: "",
                bver: "",
                pver: "",
                mobile: false,
                pad: false,
                phone: false
            };
            var agt = navigator.userAgent, fullver, name, off, nameoff;
            if (agt) {
                res.mobile = agt.indexOf("Mobile") != -1;
                if ((off = agt.indexOf("Edge")) != -1) {
                    name = "Edge";
                    fullver = agt.substr(off + 5);
                }
                else if ((off = agt.indexOf("Windows Phone")) != -1) {
                    name = "IEMobile";
                    res.mobile = true;
                    fullver = agt.substr(off + 17);
                }
                else if ((off = agt.indexOf("IEMobile")) != -1) {
                    name = "IEMobile";
                    res.mobile = true;
                    fullver = agt.substr(off + 9);
                }
                else if ((off = agt.indexOf("MSIE")) != -1) {
                    name = "IE";
                    fullver = agt.substr(off + 5);
                }
                else if (agt.indexOf("Trident") != -1 &&
                    (off = agt.indexOf("rv:")) != -1) {
                    name = "IE";
                    fullver = agt.substr(off + 3);
                    if (fullver) {
                        off = fullver.indexOf(")");
                        res.bver = fullver.substr(0, off);
                    }
                }
                else if ((off = agt.indexOf("UCWEB")) != -1) {
                    name = "UC";
                    res.mobile = true;
                    fullver = agt.substr(off + 6);
                }
                else if ((off = agt.indexOf("Opera")) != -1) {
                    name = "Opera";
                    fullver = agt.substr(off + 6);
                }
                else if ((off = agt.indexOf("OPR/")) != -1) {
                    name = "Opera";
                    fullver = agt.substr(off + 4);
                }
                else if ((off = agt.indexOf("Fennec")) != -1) {
                    name = "Firefox";
                    res.mobile = true;
                    fullver = agt.substr(off + 7);
                }
                else if ((off = agt.indexOf("Firefox")) != -1) {
                    name = "Firefox";
                    fullver = agt.substr(off + 8);
                }
                else if ((off = agt.indexOf("Chrome")) != -1) {
                    name = "Chrome";
                    fullver = agt.substr(off + 7);
                }
                else if ((off = agt.indexOf("CriOS")) != -1) {
                    name = "Chrome";
                    fullver = agt.substr(off + 6);
                }
                else if ((off = agt.indexOf("Safari")) != -1) {
                    name = "Safari";
                    fullver = agt.substr(off + 7);
                }
                else if ((nameoff = agt.lastIndexOf(" ") + 1) <
                    (off = agt.lastIndexOf("/"))) {
                    name = agt.substring(nameoff, off);
                    fullver = agt.substring(off + 1);
                    if (name.length == 0) {
                        name = navigator.appName;
                    }
                }
                res.browser = name;
                if (!res.bver && fullver) {
                    res.bver = fullver;
                    if ((off = fullver.indexOf(";")) != -1)
                        res.bver = fullver.substring(0, off);
                    if ((off = fullver.indexOf(" ")) != -1)
                        res.bver = fullver.substring(0, off);
                }
                var osver = "unknow";
                if (agt.indexOf("iPhone") != -1) {
                    res.mobile = res.phone = true;
                    res.platform = "iPhone";
                }
                else if (agt.indexOf("iPad") != -1) {
                    res.mobile = res.pad = true;
                    res.platform = "iPad";
                }
                else if (agt.indexOf("Mac") != -1) {
                    res.platform = "Mac";
                }
                else if ((off = agt.indexOf("Android")) != -1) {
                    //isMobile = true;
                    res.platform = "Android";
                    fullver = agt.substr(off + 8);
                    if (fullver) {
                        off = fullver.indexOf(";");
                        if (off) {
                            res.pver = fullver.substring(0, off);
                        }
                    }
                }
                else if (agt.indexOf("Linux") != -1) {
                    res.platform = "Linux";
                }
                else if ((off = agt.indexOf("Win")) != -1) {
                    if (agt.indexOf("WOW64") != -1 || agt.indexOf("Win64") != -1)
                        res.platform = "Win64";
                    else
                        res.platform = "Win32";
                    fullver = agt.substr(off);
                    off = fullver.indexOf(";");
                    if (off) {
                        fullver = fullver.substring(0, off);
                        off = fullver.lastIndexOf(" ");
                        if (off)
                            res.pver = fullver.substr(off + 1);
                    }
                }
                if ((off = agt.indexOf("Mac OS")) != -1) {
                    fullver = agt.substr(off + 7);
                    if (fullver) {
                        off = fullver.indexOf(")");
                        if (off)
                            res.pver = fullver.substring(0, off);
                    }
                }
            }
            else
                res.mobile = true;
            return res;
        };
        EDFormulaView.osWin = function () {
            return EDFormulaView.getOSX().platform.indexOf("Win") != -1;
        };
        EDFormulaView.osMac = function () {
            return EDFormulaView.getOSX().platform.indexOf("Mac") != -1;
        };
        return EDFormulaView;
    }());
    EdrawMath.EDFormulaView = EDFormulaView;
    /*
    export function getQueryString(name, url) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = url.match(reg);
        if (r != null) { return (r[2]); } return null;
    }
    export function setCookie(name, value, exdays, path = '/') {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        const ok = document.cookie = name + '=' + value + '; path=' + path + '; ' + expires;
        console.log(`setCookie=${ok}`);
    }

    export function getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }*/
})(EdrawMath || (EdrawMath = {}));
