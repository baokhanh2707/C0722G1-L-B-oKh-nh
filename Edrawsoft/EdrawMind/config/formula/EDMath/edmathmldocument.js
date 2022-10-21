// mml文本处理类
// 实现了操作的上层接口
// 主要实现对节点结构组的整体操作
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDMathMLDocument = /** @class */ (function () {
        function EDMathMLDocument(ctx) {
            this._ctx = ctx;
            this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
            this._ctx.setLineDash([]);
            this._ctx.globalAlpha = 1;
            var font = new EdrawMathDate.EDFont();
            this._ctx.font = font.fontstring();
            this._ctx.textBaseline = 'middle';
            this._ctx.lineWidth = 1;
            this._ctx.strokeStyle = 'rgb(0, 0, 0)';
            this._ctx.lineJoin = "bevel";
            this._size = new egSize(0, 0);
            this._mousenode = null;
            this._mousepressed = null,
                this._copyTextType = EDTextType.MathML; // MathML Latex
            this._mousePoint = EdrawMathDate.EDStatic.g_init_mousepoint;
            this._doc = new EdrawMathDate.EDMmlDocument(this);
            this._p2latex = new EdrawMathDate.EDMMLtoLatex();
            // connect(_p2latex, SIGNAL(transLatex(QString)), this, SLOT(setClipBoardText(QString)));
            // this._pDocToSave = new Document();
            this._pDocToSave = document.implementation.createDocument("", "", null);
            this._strDocument = '';
            this._strCopyText = '';
            this._mmlPixmap = null;
            this._vecEditedNode = [];
            this._vecSelectedNode = [];
            this._vecMouseSelectedNode = [];
            this._vecSaveData = [];
            this.clear();
            EdrawMathDate.EDStatic.g_exe_name = '.'; // exename;
            /* 调试用
            for (let i = 0; i < EDStatic.g_oper_spec_data.length - 1; ++i) {
                const name1: string = EDStatic.g_oper_spec_data[i].name;
                const name2: string = EDStatic.g_oper_spec_data[i + 1].name;
                if ( name1 > name2) {
                    // 特殊符列表排序校验
                    console.log(`EDStatic.g_oper_spec_data order: ${name1} > ${name2}`);
                }
            }
            */
        }
        Object.defineProperty(EDMathMLDocument.prototype, "ctx", {
            get: function () {
                return this._ctx;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief clear 清除光标信息，清除节点数据
         * @param clearsavedata 是否清楚存储数据
         */
        EDMathMLDocument.prototype.clear = function (clearsavedata) {
            if (clearsavedata === void 0) { clearsavedata = true; }
            if (null != this._mousenode) {
                var noderectf = this._mousenode.deviceRect;
                var parentrectf = new egRect(0, 0, 0, 0);
                var tmpnode = this._mousenode.firstSibling;
                for (; tmpnode != null; tmpnode = tmpnode.nextSibling) {
                    parentrectf.united(tmpnode.deviceRect);
                }
                if (this._bSelectedPre) {
                    this._mousePoint = new egPoint(noderectf.left(), parentrectf.bottom());
                }
                else {
                    this._mousePoint = new egPoint(noderectf.right(), parentrectf.bottom());
                }
            }
            this._mousenode = null;
            // 修复移动鼠标导致程序崩溃 180615
            this._mousepressed = null;
            this._bSelectedPre = false;
            this._bSelectedPre_presee = false;
            this._vecEditedNode.splice(0);
            this._vecSelectedNode.splice(0);
            this._vecMouseSelectedNode.splice(0);
            this._strSelectedText = '';
            this._tmpSelectedText = '';
            if (this._pDocToSave.hasChildNodes()) {
                var child = this._pDocToSave.firstElementChild;
                if (this._pDocToSave.contains(child)) {
                    this._pDocToSave.removeChild(child);
                }
                child = child.nextElementSibling;
                while (null != child) {
                    if (this._pDocToSave.contains(child)) {
                        this._pDocToSave.removeChild(child);
                    }
                    child = child.nextElementSibling;
                }
            }
            if (clearsavedata) {
                this._vecSaveData.splice(0);
                this._nSaveDataIndex = -1;
            }
            this._doc.clear();
            this._size = new egSize(0.0, 0.0);
        };
        EDMathMLDocument.prototype.getEduStr = function (edudata) {
            if (edudata === void 0) { edudata = null; }
            return this._doc.getEduStr(edudata);
        };
        /**
         * @brief setContent 比较text文本内容，如果与当前文本内容不同，则进行文本解析，生成节点数据，
         *                   生成可编辑节点指针向量_vecEditedNode，再对向量里的节点进行装饰，增加前置光标的空白节点<mtext>
         * @param text .mml文件的文本内容
         * @param errorMsg 错误信息
         * @param errorLine 错误所在行
         * @param errorColumn 错误所在列
         * @return 返回的结果值
         */
        EDMathMLDocument.prototype.setContent = function (text, errorMsg, errorLine, errorColumn) {
            if (errorMsg === void 0) { errorMsg = []; }
            if (errorLine === void 0) { errorLine = [0]; }
            if (errorColumn === void 0) { errorColumn = [0]; }
            // qDebug() <<"EDMathMLDocument"<< QThread::currentThreadId();
            this._size = new egSize(0.0, 0.0);
            // if (text == _strDocument)
            //    return false;
            this._strDocument = text;
            var ok = this._doc.setContent(this._strDocument, errorMsg, errorLine, errorColumn);
            // console.log(`setContent = ${ok}`);
            this.updateSetContent();
            return ok;
        };
        /**
         * @brief paint 绘图 执行_doc的绘图函数，渲染的相关函数
         * @param painter QPainter类指针
         * @param pos 相对原点坐标
         */
        EDMathMLDocument.prototype.paint = function (pos, outputPng) {
            if (outputPng === void 0) { outputPng = false; }
            this._doc.paint(this._ctx, pos, outputPng);
            // 屏蔽 优化测试
            // if (!_doc->renderingComplete()) {
            //    //渲染未完成，则调整字符和做后期处理
            //    _doc->adjustCharPositions();
            //    _doc->doPostProcessing();
            // }
            //// clear temporary rendering infos, since they are not needed anymore//清除临时渲染信息，因为它们不再需要
            // _doc->optimizeSize();
            // _doc->setRenderingComplete();
        };
        /**
         * @brief insertStdMml 打开公式库mml公式
         * @param text mml公式文本
         */
        EDMathMLDocument.prototype.insertStdMml = function (text) {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            // TODO 删除框选节点 zq
            this._strSelectedText = '';
            this._tmpSelectedText = '';
            this._strSelectedText = this.getCopyText();
            if (this._vecMouseSelectedNode.length > 0) {
                this.deletedMouseSelected();
            }
            var editednode = this._mousenode;
            if (this._bSelectedPre) {
                this._bSelectedPre = false;
                if (this._mousenode.previousSibling) {
                    editednode = this._mousenode.previousSibling;
                }
                // this.moveLeft();
                // editednode = this._mousenode;
            }
            /* QT版本
            QFile file( dir );
            if ( !file.open(QIODevice::ReadOnly | QIODevice::Text) )
                return false;
            // 修复读取中文乱码
            QTextCodec::ConverterState state;
            QTextCodec *codec=QTextCodec::codecForName("UTF-8");
            const QByteArray document = file.readAll();
            QString text = codec->toUnicode( document.constData(), document.size(), &state);
            if (state.invalidChars > 0) {
                text = QTextCodec::codecForName( "GBK" )->toUnicode(document);
            } else {
                text = document;
            }
            //text = text.replace("#x","&#x");
            file.close();*/
            if (!this._doc.pasteTextNode(editednode, text, false)) {
                return false;
            }
            this.insertFinished(null, false);
            this.updateSetContent();
            return true;
        };
        /**
         * @brief outputMml 输出公式的mml文件到指定路径
         */
        EDMathMLDocument.prototype.outputMml = function () {
            /* QT版本代码
            QFile file( dir );
            if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
                return false;
            QTextStream newout( &file );
            newout<<_strDocument;
            file.close();
            return true;*/
            return this._strDocument;
        };
        /**
         * @brief outputLatex 输出公式的latex文件到指定路径
         */
        EDMathMLDocument.prototype.outputLatex = function () {
            // chb的mml转latex模块
            /* QT版本代码
            QString mmlFile = EDStatic.g_exe_name + "/tmp/tmp.mml";
            QFile file( mmlFile );
            if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
                return false;
            QTextStream newout( &file );
            newout<<_strDocument;
            file.close();
            QString latexFile= dir;
            _p2latex->setFileDir(mmlFile, latexFile);
            _p2latex->start();

            return true;*/
            return this._p2latex.mmlFromStr(this._strDocument);
        };
        /**
         * @brief size 获取公式图像的大小 根节点绘图矩形的大小+2*相对坐标值，即根节点绘图矩阵一圈外围
         */
        EDMathMLDocument.prototype.size = function () {
            var relorgin = this._doc.relOrgin;
            var sizef = this._doc.size();
            sizef.width = sizef.width + 2 * relorgin.x;
            sizef.height = sizef.height + 2 * relorgin.y;
            // return _size;
            // let setsize:Boolean = false;
            // if(this._ctx.canvas.width != Math.round(sizef.width)) {
            //    this._ctx.canvas.width = Math.round(sizef.width);
            //    setsize = true;
            // }
            // if(this._ctx.canvas.height != Math.round(sizef.height)) {
            //    this._ctx.canvas.height = Math.round(sizef.height);
            //    setsize = true;
            // }
            // if (setsize) {
            //    this.saveTo();
            //    //console.log(`${this._ctx.canvas.width} ${sizef.width}\n${this._ctx.canvas.height} ${sizef.height}`);
            // }
            return sizef; // 相对原点 
        };
        /**
         * @brief fontName 获获取字体类型名称
         * @param type 字体类型
         */
        EDMathMLDocument.prototype.fontName = function (type) {
            return this._doc.fontName(type);
        };
        /**
         * @brief setFontName 设置字体类型名称
         * @param type 字体类型
         * @param name 字体名称
         */
        EDMathMLDocument.prototype.setFontName = function (type, name) {
            this._size = new egSize(0.0, 0.0);
            if (name === this._doc.fontName(type)) {
                return;
            }
            this._doc.setfontName(type, name);
            this._doc.layout();
            this.savePainter();
        };
        Object.defineProperty(EDMathMLDocument.prototype, "baseFontPixelSize", {
            // 获取字体大小
            get: function () {
                return this._doc.baseFontPixelSize;
            } // 设置字体大小
            ,
            set: function (size) {
                this._size = new egSize(0.0, 0.0);
                // 允许的字体最小像素，临界判断
                if (size < EdrawMathDate.EDStatic.g_min_font_pixel_size_calc) {
                    size = EdrawMathDate.EDStatic.g_min_font_pixel_size_calc;
                }
                if (size === this._doc.baseFontPixelSize) {
                    return;
                }
                this._doc.baseFontPixelSize = size;
                this._doc.updateNodeFont();
                this._doc.layout();
                this.savePainter();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "fontDPI", {
            // 设置字体DPI 100%=1.00
            set: function (dpi) {
                if (dpi === EdrawMathDate.EDStatic.g_dpi_font_size) {
                    return;
                }
                EdrawMathDate.EDStatic.g_dpi_font_size = dpi;
                this._doc.updateNodeFont();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "foregroundColor", {
            // 获取前景色
            get: function () {
                return this._doc.foregroundColor;
            },
            // 设置前景色
            set: function (color) {
                if (color === this._doc.foregroundColor) {
                    return;
                }
                this._doc.foregroundColor = color;
                this.savePainter();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "backgroundColor", {
            // 获取背景色
            get: function () {
                return this._doc.backgroundColor;
            },
            // 设置背景色
            set: function (color) {
                if (color === this._doc.backgroundColor) {
                    return;
                }
                this._doc.backgroundColor = color;
                this.savePainter();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "drawFrames", {
            // 获取是否绘制框架
            get: function () {
                return this._doc.drawFrames;
            },
            // 设置是否绘制框架 绘制框架即显示每个节点的绘图矩阵边框(默认红色)
            set: function (isdraw) {
                if (isdraw === this._doc.drawFrames) {
                    return;
                }
                this._doc.drawFrames = isdraw;
                this.savePainter();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "colAlignType", {
            // 设置是否为默认显示模式 默认显示模式表示绘图矩阵为QFontMetricsF的tightBoundingRect，否则为QFontMetricsF的boundingRect
            // set defaultMode( isdefault: boolean ) {
            // if ( isdefault == this._doc.defaultMode ) {
            //   return;
            // }
            // this._doc.defaultMode = isdefault;
            // this.savePainter();
            // };
            // 设置行对齐方式
            set: function (colaligntype) {
                if (this._doc.rootisEmpty()) {
                    return;
                }
                // _doc->setColAlignType(colaligntype);// 180816 新增
                var catype = 'left';
                switch (colaligntype) {
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
                var hasmtable = false;
                if (this._vecMouseSelectedNode.length > 0) {
                    for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                        var node = this._vecMouseSelectedNode[i];
                        if (this._vecMouseSelectedNode[i].nodeType === EDMathMlNodeType.MtableNode) {
                            this._vecMouseSelectedNode[i].addmyAttrMap('columnalign', catype);
                            hasmtable = true;
                        }
                        else if (node.nodeType == EDMathMlNodeType.MoNode
                            || node.nodeType == EDMathMlNodeType.MiNode
                            || node.nodeType == EDMathMlNodeType.MnNode
                            || node.nodeType == EDMathMlNodeType.MtextNode) {
                            if (node.setColAlignType(catype)) {
                                hasmtable = true;
                            }
                        }
                    }
                    // if (!hasmtable) {
                    //     for (let i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                    //         const node:EDMmlNode = this._vecMouseSelectedNode[i];
                    //         if (node.nodeType == EDMathMlNodeType.MoNode
                    //             || node.nodeType == EDMathMlNodeType.MiNode
                    //             || node.nodeType == EDMathMlNodeType.MnNode
                    //             || node.nodeType == EDMathMlNodeType.MtextNode) {
                    //                 if (node.setColAlignType(catype)) {
                    //                     hasmtable = true;
                    //                 }                                
                    //         }
                    //     }
                    // }
                }
                else if (this._mousenode != null) {
                    this._mousenode.setColAlignType(catype);
                    hasmtable = true;
                }
                if (!hasmtable) {
                    return;
                }
                this.saveTo();
                return;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "inputMiItalic", {
            // 设置输入数字的文本为斜体字
            set: function (isitalic) {
                this._doc.miItalic = isitalic;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "inputMiBold", {
            // 设置输入数字的文本为粗体字
            set: function (isbold) {
                this._doc.miBold = isbold;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "inputMnItalic", {
            // 设置输入字母的文本为斜体字
            set: function (isitalic) {
                this._doc.mnItalic = isitalic;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "inputMnBold", {
            // 设置输入字母的文本为粗体字
            set: function (isbold) {
                this._doc.mnBold = isbold;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief setSelectFontItalic 设置框选节点的文本为斜体字
         * @param isitalic 是否斜体
         */
        EDMathMLDocument.prototype.setSelectFontItalic = function (isitalic) {
            if (this._vecMouseSelectedNode.length <= 0) {
                return false;
            }
            for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                this._vecMouseSelectedNode[i].fontItalic = isitalic;
                this._vecMouseSelectedNode[i].updateChildFont();
            }
            this.saveTo();
            return true;
        };
        /**
         * @brief setSelectFontBold 设置框选节点的文本为粗体字
         * @param isbold 是否粗体
         */
        EDMathMLDocument.prototype.setSelectFontBold = function (isbold) {
            if (this._vecMouseSelectedNode.length <= 0) {
                return false;
            }
            for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                this._vecMouseSelectedNode[i].fontBold = isbold;
                this._vecMouseSelectedNode[i].updateChildFont();
            }
            this.saveTo();
            return true;
        };
        Object.defineProperty(EDMathMLDocument.prototype, "clipBoardTextType", {
            // 设置粘贴板文本类型 默认MathML
            set: function (texttype) {
                this._copyTextType = texttype;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "mmlPixmap", {
            // QImage getMmlImage(){return _mmlImage;}//获取mml公式图
            // 获取mml公式图
            get: function () {
                return this._mmlPixmap;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief outPutMmlPixmap 导出ImageData数据
         */
        EDMathMLDocument.prototype.outPutMmlPixmap = function () {
            var relorgin = this._doc.relOrgin;
            var rect = new egRect(0, 0, this._doc.size().width + 2 * relorgin.x, this._doc.size().height + 2 * relorgin.y);
            // let pixmap: ImageData = new ImageData(rect.width, rect.height);
            var pixmap = this._ctx.createImageData(rect.width, rect.height);
            this._ctx.clearRect(0, 0, rect.width, rect.height);
            this._ctx.setLineDash([]);
            this._ctx.globalAlpha = 1; // 透明度
            this.paint(rect.topLeft(), true);
            pixmap = this._ctx.getImageData(0, 0, rect.width, rect.height);
            return pixmap;
        };
        /**
         * @brief outPutMmlPixmapWhite 导出背景色为白色的ImageData数据
         */
        EDMathMLDocument.prototype.outPutMmlPixmapWhite = function () {
            var relorgin = this._doc.relOrgin;
            var rect = new egRect(0, 0, this._doc.size().width + 2 * relorgin.x, this._doc.size().height + 2 * relorgin.y);
            // let pixmap: ImageData = new ImageData(rect.width, rect.height);
            var pixmap = this._ctx.createImageData(rect.width, rect.height);
            this._ctx.clearRect(0, 0, rect.width, rect.height);
            this._ctx.setLineDash([]);
            this._ctx.globalAlpha = 1; // 透明度
            this._ctx.fillStyle = "#fff";
            this._ctx.fillRect(0, 0, rect.width, rect.height);
            this.paint(rect.topLeft(), true);
            pixmap = this._ctx.getImageData(0, 0, rect.width, rect.height);
            return pixmap;
        };
        // 
        /**
         * @brief emptyNode 判断框选节点是否为空，框选节点是否斜体、粗体
         * @param isbold 实参：是否粗体
         * @param isitalic 实参：是否斜体
         */
        EDMathMLDocument.prototype.emptyNode = function (isbold, isitalic) {
            var isempty = this._vecMouseSelectedNode.length <= 0;
            if (isbold.length > 0) {
                isbold[0] = false;
            }
            else {
                console.log("error emptyNode: isbold is empty ".concat(isbold));
                return isempty;
            }
            if (isitalic.length > 0) {
                isitalic[0] = false;
            }
            else {
                console.log("error emptyNode: isitalic is empty ".concat(isitalic));
                return isempty;
            }
            if (!isempty) {
                for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                    if (this._vecMouseSelectedNode[i].getChildBold()) {
                        isbold[0] = true;
                    }
                    if (this._vecMouseSelectedNode[i].getChildItalic()) {
                        isitalic[0] = true;
                    }
                }
            }
            return isempty;
        };
        /**
         * @brief hasMtable 查找当前节点是否包含mtable节点
         * @param type 实参：矩阵对齐方式
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.hasMtable = function (type) {
            if (type.length <= 0) {
                console.log("error hasMtable: type is empty");
                return false;
            }
            var hasmtable = false;
            if (this._vecMouseSelectedNode.length > 0) {
                for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                    if (this._vecMouseSelectedNode[i].nodeType === EDMathMlNodeType.MtableNode) {
                        var map = this._vecMouseSelectedNode[i].myAttrMap;
                        var columnalign = 'left';
                        if (map.has('columnalign')) {
                            columnalign = map.get('columnalign');
                        }
                        type[0] = columnalign;
                        hasmtable = true;
                    }
                }
                if (!hasmtable) {
                    for (var i = 0; i < this._vecMouseSelectedNode.length; ++i) {
                        if (this._mousenode.hasMtable(type)) {
                            hasmtable = true;
                            continue;
                        }
                    }
                }
            }
            else if (this._mousenode != null) {
                hasmtable = this._mousenode.hasMtable(type);
            }
            return hasmtable;
        };
        /**
         * @brief copyMathmlText ctrl+c复制框选节点的mml文本到剪切板，复制框选节点到_vecCopyNode
         * @param 实参：剪切板的文本
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.copyMathmlText = function (str) {
            if (str === void 0) { str = []; }
            this._strCopyText = this.getCopyText();
            console.log("_strCopyText = ".concat(this._strCopyText));
            if (this._strCopyText.length <= 0) {
                return false;
            }
            if (str.length > 0) {
                switch (this._copyTextType) {
                    case EDTextType.MathML:
                        //console.log(`copyMathmlText:MathML`);
                        str[0] = this._strCopyText;
                        return true;
                    case EDTextType.Latex:
                        //console.log(`copyMathmlText:Latex`);
                        str[0] = this._p2latex.mmlFromStr(this._strCopyText);
                        if ('' !== str[0]) {
                            return true;
                        }
                        return false;
                    // this._p2latex->setFileDir(mmlstr, latexstr, true);
                    // this._p2latex->start();
                    default:
                        break;
                }
            }
            return false;
            /*
            QClipboard *board = QApplication::clipboard();//使用 QApplication::clipboard() 函数获得系统剪贴板对象。这个函数的返回值是 QClipboard 指针。
            //board->setText(_strCopyText); //通过 setText()，setImage() 或者 setPixmap() 函数可以将数据放置到剪贴板内，也就是通常所说的剪贴或者复制的操作；
            //board->setImage(_mmlImage);
            //board->setPixmap(_mmlPixmap);

            QMimeData* data = new QMimeData();
            data->setText(_strCopyText);

            //QPixmap pixmap = _mmlPixmap.copy(rect);
            //data->setImageData(pixmap);

            //image.setDevicePixelRatio(2);
            //image.setDotsPerMeterX(image.dotsPerMeterX()*2);
            //image.setDotsPerMeterY(image.dotsPerMeterY()*2);

            setBaseFontPixelSize( baseFontPixelSize() * EDStatic::g_font_image_scale );//设置字体像素大小
            QRect node;
            QRect parent;
            QRect select;
            getEditedNodePos(node, parent, select);
            //QImage img = _mmlPixmap.toImage().copy(select);
            //data->setImageData(img);
            QPixmap pixmap = _mmlPixmap.copy(select);
            data->setImageData(pixmap);
            setBaseFontPixelSize( baseFontPixelSize() * 1.0/EDStatic::g_font_image_scale );//设置字体像素大小

            board->setMimeData(data, QClipboard::Clipboard);

            QString mmlstr = _strCopyText;
            QString latexstr = "latexstr";
            switch (_CopyTextType) {
            case EDTextType::MathML:
                break;
            case EDTextType::Latex:
                _p2latex->setFileDir(mmlstr, latexstr, true);
                _p2latex->start();
                break;
            default:
                break;
            }

            return true;*/
        };
        /**
         * @brief pasteMathmlText ctrl+v粘贴框选节点到所选光标位置，存在光标及相关设置后才会生效，此操作默认会删除框选的节点
         * @param str 粘贴的文本,=''则粘贴剪切板文本(默认)
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.pasteMathmlText = function (str) {
            if (str === void 0) { str = ''; }
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // 删除框选节点
            if (this._vecMouseSelectedNode.length > 0) {
                this.deletedMouseSelected();
            }
            // QClipboard *board = QApplication::clipboard();//使用 QApplication::clipboard() 函数获得系统剪贴板对象。这个函数的返回值是 QClipboard 指针。
            // QString tmptext = board->text();
            var ok = false;
            /*
            // 修复读取中文乱码
            QTextCodec::ConverterState state;
            QTextCodec *codec=QTextCodec::codecForName("UTF-8");
            const QByteArray document = tmptext.toUtf8();
            QString text = codec->toUnicode( document.constData(), document.size(), &state);
            if (state.invalidChars > 0) {
                text = QTextCodec::codecForName( "GBK" )->toUnicode(document);
            } else {
                text = document;
            }
            */
            var latex2mml = new EdrawMathDate.EDLatextoMML();
            var mmlstr = '';
            var text = '';
            if (str !== '') {
                text = str;
            }
            else {
                text = this._strCopyText;
            }
            if (text.length <= 0) {
                return false;
            }
            if ((text.match("<math") != null && text.match("</math>") != null)) {
                ok = true;
                this.setPasteText(text);
            }
            else if ((text.match('\\[') != null && text.match('\\]') != null)
                || text.match('$$') != null) {
                //console.log(`latext to mml: ${text}`);
                mmlstr = latex2mml.latexFromStr(text);
                if (mmlstr !== '') {
                    text = mmlstr;
                    //console.log(`${mmlstr}`);
                    if (this.setPasteText(text)) {
                        ok = true;
                    }
                }
            }
            /*
            if (text.startsWith("<math")) {
                if (this.setPasteText(text)) {
                    ok = true;
                }
            //} else if ((text.startsWith("\\[") && text.endsWith("\\]"))
            //            ||text.startsWith("$$") && text.endsWith("$$")) {
            } else if (text.startsWith("\\[") || text.startsWith("$$") ) {
                console.log(`latext to mml`);
                mmlstr = latex2mml.latexFromStr(text);
                if (mmlstr != "") {
                    text = mmlstr;
                    console.log(`${mmlstr}`);
                    if (this.setPasteText(text)) {
                        ok = true;
                    }
                }
            }
            */
            // console.log(`pasteMathmlText = ${text} ${text.startsWith("<math")} ${text.endsWith("</math>")}`);
            if (!ok) {
                // if (!setPasteText(_strCopyText))
                //    return false;
                if (text.length > 0) {
                    for (var i = 0; i < text.length; ++i) {
                        var onetext = text.charAt(i);
                        if (i === text.length - 1) {
                            this.insertText(onetext); // 插入文本
                        }
                        else {
                            this.insertText(onetext, false); // 插入文本
                        }
                    }
                    this.insertFinished(null, false);
                }
            }
            return true;
        };
        /**
         * @brief mouseMove 当需要更新光标位置时使用，更新当前鼠标选中的节点指针，保存于_mousenode，更新光标的前置标值位，保存于_bSelectedPre,
         * @param mousepos 鼠标当前的坐标值，如果鼠标坐标在当前节点的左半区域，则光标前置，否则光标后置
         * @param eventype 事件类型，=0 鼠标左键 =1 鼠标移动事件 =2 鼠标双击事件
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.mouseMove = function (mousepos, eventype) {
            if (eventype === void 0) { eventype = 0; }
            // console.log(`mouseMove ${mousepos}`);
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // 将鼠标坐标传入解析的节点进行匹配，获取符合条件的节点
            var newnode = this._doc.getNode(mousepos);
            if (null == newnode) {
                return false;
            }
            this._bSelectedPre = false;
            // 前选中修正
            var textisnull = false;
            if (EDMathMlNodeType.MtextNode === newnode.nodeType) {
                // 如果光标节点文本为空矩形，则不进行前选中修正
                if ('isNuLL!' === newnode.firstChild.toTextNode().text) {
                    textisnull = true;
                }
            }
            if (!textisnull) {
                var x = newnode.deviceRect.center().x; // + this._doc.relOrgin.x;//获取节点坐标的中心x坐标
                /* 180615
                //如果选中节点为mrow的第一个子节点，则前插入一个文本为""的同级节点
                if (!newnode->previousSibling()
                        && EDMathMlNodeType::MrowNode == newnode->parent()->nodeType()) {
                    _doc->insertPreText(newnode,"");
                    saveTo();
                }*/
                // 如果鼠标坐标选择的是当前节点矩形的左半区域，则光标移动到上一个同级节点
                if (mousepos.x <= x && newnode.previousSibling) {
                    // console.log(`mouseMove() _bSelectedPre = true`);
                    // newnode = newnode->previousSibling();//前选择方案修改
                    if (newnode.nodeType != EDMathMlNodeType.MrowNode) {
                        //<mrow>选中即全选
                        this._bSelectedPre = true;
                    }
                }
            }
            if (newnode === this._mousenode) { // 光标节点未发生改变
                if (eventype === 1) {
                    return false;
                }
                else {
                    return true;
                }
            }
            this._mousenode = newnode;
            // if (this._mousenode.firstChild) {
            //     if (this._mousenode.firstChild.nodeType == EDMathMlNodeType.TextNode) {
            //         console.log(`~~~~moveEvent:`,this._mousenode.firstChild.toTextNode().text)
            //     } else {
            //         console.log(`~~~~moveEvent:`,this._mousenode)
            //     }
            // }
            return true;
        };
        /**
         * @brief mousePress 当鼠标点击时使用，更新鼠标点击时的节点指针，保存于_mousepressed，更新鼠标点击时的光标的前置标值位，保存于_bSelectedPre_presee
         * @param mousepos 鼠标点击时的坐标值，如果鼠标坐标在当前节点的左半区域，则光标前置，否则光标后置
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.mousePress = function (mousepos) {
            // qDebug() <<"EDMathMLDocument"<< QThread::currentThreadId();
            if (!this.mouseMove(mousepos)) {
                // console.log(`mouseMove = false `);
                return false;
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            // console.log(`mouseMove = true `);
            return true;
        };
        /**
         * @brief mouseDoubleClicked 当鼠标双击时使用，更新鼠标点击的节点为双击节点的第一个同级节点，点击光标为前置，
         *                           鼠标选中节点为双击节点的最后一个同级节点，选中光标为后置，即实现所有同级节点的框选功能
         * @param mousepos 鼠标双击时的坐标值，获取鼠标双击的节点指针
         * @return 返回的结果值，操作是否成功
         */
        // 鼠标双击，选中鼠标单击点的父节点
        EDMathMLDocument.prototype.mouseDoubleClicked = function (mousepos) {
            // 鼠标双击，返回鼠标位置点的父节点
            if (!this.mouseMove(mousepos)) {
                return false;
            }
            this._mousepressed = this._mousenode.firstSibling;
            this._bSelectedPre_presee = true;
            this._mousenode = this._mousenode.lastSibling;
            this._bSelectedPre = false;
            return true;
        };
        /**
         * @brief selectedLeft 向左选择当前所有可选择节点，快捷键shitf+left
         * @return 返回的结果值，操作是否成功
         */
        // 节点左选
        EDMathMLDocument.prototype.selectedLeft = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._vecEditedNode.length > 0) {
                // _mousepressed = _vecSelectedNode.first();
                // _bSelectedPre_presee = true;
                // _mousenode = _vecSelectedNode.last();
                // _bSelectedPre = false;
                if (this._bSelectedPre) {
                    // 将光标位置置为默认的后置
                    this._bSelectedPre = false;
                    if (this._mousenode.previousSibling) {
                        this._mousenode = this._mousenode.previousSibling;
                    }
                    //this.moveLeft();
                }
                if (this._vecEditedNode.length > 0) {
                    var index = -1;
                    for (var i = 0; i < this._vecEditedNode.length; ++i) {
                        if (this._mousenode === this._vecEditedNode[i]) {
                            index = i;
                        }
                    }
                    if (-1 !== index && index > 0) {
                        this._mousenode = this._vecEditedNode[index - 1];
                    }
                }
            }
            return true;
        };
        /**
         * @brief selectedRight 向右选择当前所有可选择节点，快捷键shitf+right
         * @return 返回的结果值，操作是否成功
         */
        // 节点右选
        EDMathMLDocument.prototype.selectedRight = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._vecEditedNode.length > 0) {
                // _mousepressed = _vecSelectedNode.first();
                // _bSelectedPre_presee = true;
                // _mousenode = _vecSelectedNode.last();
                // _bSelectedPre = false;
                if (this._bSelectedPre) {
                    this._bSelectedPre = false;
                    if (this._mousenode.previousSibling) {
                        this._mousenode = this._mousenode.previousSibling;
                    }
                    //this.moveLeft();
                }
                if (this._vecEditedNode.length > 0) {
                    var index = -1;
                    for (var i = 0; i < this._vecEditedNode.length; ++i) {
                        if (this._mousenode === this._vecEditedNode[i]) {
                            index = i;
                        }
                    }
                    if (-1 !== index && index < this._vecEditedNode.length - 1) {
                        if (index + 1 !== this._vecEditedNode.length - 1 || EDMathMlNodeType.MrowNode !== this._vecEditedNode[index + 1].nodeType) {
                            this._mousenode = this._vecEditedNode[index + 1];
                        }
                    }
                }
            }
            return true;
        };
        /**
         * @brief selectedAll 全选当前所有可选择节点，快捷键ctrl+A
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.selectedAll = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // _vecEditedNode 可选或者可编辑 待修改
            if (this._vecEditedNode.length > 0) {
                this._mousepressed = this._vecEditedNode[0];
                this._bSelectedPre_presee = true;
                this._mousenode = this._vecEditedNode.last();
                this._bSelectedPre = false;
            }
            return true;
        };
        /**
         * @brief getCursor 获取光标的数据，比如水平线和垂直线用于绘制光标，框选的矩形用于绘制半透明区域
         * @param vline 光标的垂直线，x值为当前选中节点x坐标，y为当前选中节点所有同级节点的高度
         * @param hline 光标的水平线，x为当前选中节点所有同级节点的宽度，y为当前节点的底部
         * @param selected 得到的结果值，输出为QRect
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.getCursor = function (vline, hline, selected, mousenodepos) {
            var node = new egRect(0, 0, 0, 0);
            var parent = new egRect(0, 0, 0, 0);
            var select = new egRect(0, 0, 0, 0);
            this.getEditedNodePos(node, parent, select);
            selected.x = select.x;
            selected.y = select.y;
            selected.width = select.width;
            selected.height = select.height;
            if (this._bSelectedPre) {
                vline._px = node.left();
                vline._py = parent.top();
                vline._vx = node.left();
                vline._vy = parent.bottom();
                // _mousePoint = QPoint(node.left()+(node.right()-node.left())*0.25, node.center().y());
                // _mousePoint = QPoint(node.left(), parent.bottom());
            }
            else {
                vline._px = node.right();
                vline._py = parent.top();
                vline._vx = node.right();
                vline._vy = parent.bottom();
                // _mousePoint = QPoint(node.right(), parent.bottom());
            }
            if (this._mousenode.nodeType == EDMathMlNodeType.MtextNode) {
                if (this._mousenode.firstChild != null) {
                    if (this._mousenode.firstChild.nodeType == EDMathMlNodeType.TextNode) {
                        if (this._mousenode.firstChild.toTextNode().text == 'isNuLL!') {
                            vline._px = node.left();
                            vline._py = parent.top();
                            vline._vx = node.left();
                            vline._vy = parent.bottom();
                        }
                    }
                }
            }
            hline._px = parent.left();
            hline._py = parent.bottom();
            hline._vx = parent.right();
            hline._vy = parent.bottom();
            mousenodepos.x = this._mousenode.deviceRect.center().x;
            mousenodepos.y = this._mousenode.deviceRect.center().y;
            // console.log(`getCursor this._bSelectedPre = ${vline._px} ${vline._vx}`);
            return true;
        };
        /**
         * @brief insertText 在光标所在处插入文本类型的节点，存在光标及相关设置后才会生效，此操作默认会删除框选的节点
         * @param text 节点文本的文本内容
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.insertText = function (text, saveto) {
            if (saveto === void 0) { saveto = true; }
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // 删除框选节点
            if (this._vecMouseSelectedNode.length > 0) {
                this.deletedMouseSelected();
            }
            //console.log(text);
            if (!this._bSelectedPre) {
                if (!this._doc.insertText(this._mousenode, text)) {
                    return false;
                }
            }
            else {
                if (!this._doc.insertPreText(this._mousenode, text)) {
                    return false;
                }
            }
            if (this._mousenode.parent) {
                this._mousenode.parent.updateChildFont();
            }
            this.insertFinished(null, saveto);
            // saveTo();
            return true;
        };
        /**
         * @brief updateMtext 更新当前<Mtext>节点的文本内容
         * @param text 节点文本的文本内容
         * @param saveto 是否调用saveto函数(在某些不需要实时更新数据的情况下不调用，提高运行效率，默认调用)
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.updateMtext = function (text, saveto) {
            if (saveto === void 0) { saveto = true; }
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (!this._bSelectedPre) {
                if (this._mousenode.nodeType === EDMathMlNodeType.MtextNode) {
                    this._mousenode.firstChild.toTextNode().text = text;
                }
            }
            else {
                if (this._mousenode.previousSibling.nodeType === EDMathMlNodeType.MtextNode) {
                    this._mousenode.previousSibling.firstChild.toTextNode().text = text;
                }
                // this.moveLeft();
                // if (this._mousenode.nodeType === EDMathMlNodeType.MtextNode) {
                //     this._mousenode.firstChild.toTextNode().text = text;
                // }
            }
            if (saveto) {
                this.saveTo();
            }
            return true;
        };
        /**
         * @brief insertMtable 插入矩阵公式 存在光标及相关设置后才会生效 TODO：框选后为嵌套框选节点成为子节点
         * @param row 矩阵行数
         * @param col 矩阵列数
         * @param frametype 框架类型，=0无框架，=1实线，=2虚线
         * @param rowlinestype 行线类型，=0无行线，=1实线，=2虚线
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.insertMtable = function (row, col, frametype, rowlinestype) {
            if (frametype === void 0) { frametype = 0; }
            if (rowlinestype === void 0) { rowlinestype = 0; }
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // 删除框选节点
            if (this._vecMouseSelectedNode.length > 0) {
                this.deletedMouseSelected();
            }
            var mtable = this._doc.insertMtable(this._mousenode, row, col, frametype, rowlinestype);
            if (mtable == null) {
                return false;
            }
            if (this._mousenode.firstChild.toTextNode()) {
                // 当前光标为显示矩形的节点，则把该节点删除
                if ('isNuLL!' === this._mousenode.firstChild.toTextNode().text) {
                    this.deleteMouseNode();
                }
            }
            if (this._mousenode.nextSibling) {
                this._mousenode = this._mousenode.nextSibling;
            }
            if (this._mousenode.parent) {
                this._mousenode.parent.updateChildFont();
            }
            //console.log(mtable);
            this._mousenode = mtable.firstChild.firstChild.firstChild.firstChild;
            this._mousepressed = this._mousenode;
            this._bSelectedPre = false;
            this._bSelectedPre_presee = this._bSelectedPre;
            this.saveTo();
            return true;
        };
        /**
         * @brief InsertFormula 插入公式 根据index插入不同的公式，比如插入分数公式，插入根号公式
         *                      存在光标及相关设置后才会生效
         * @param index 公式索引值，例如EDMmlFormulaIndex::InsertFrac，表示插入分号
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.insertFormula = function (index) {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            // 删除框选节点
            this._strSelectedText = '';
            this._strSelectedText = this.getCopyText();
            var delselected = true;
            if (index >= EDMmlFormulaIndex.OverDot_s && index <= EDMmlFormulaIndex.Last_s) {
                //console.log(`delselected = false`);
                delselected = false;
                if (this._vecMouseSelectedNode.length > 0) {
                    return false;
                }
            }
            if (this._vecMouseSelectedNode.length > 0 && delselected) {
                this.deletedMouseSelected();
            }
            var editednode = this._mousenode;
            if (this._bSelectedPre) {
                this._bSelectedPre = false;
                if (this._mousenode.previousSibling) {
                    editednode = this._mousenode.previousSibling;
                }
                // this.moveLeft();
                // editednode = this._mousenode;
            }
            var outnode = [null]; //插入节点后，光标所在节点指针
            switch (index) {
                case EDMmlFormulaIndex.Frac_s:
                    if (this._doc.insertFrac(editednode, outnode, false, true)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.Frac:
                    if (this._doc.insertFrac(editednode, outnode, false)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.FracBevelled_s:
                    if (this._doc.insertFrac(editednode, outnode, true, true)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.FracBevelled:
                    if (this._doc.insertFrac(editednode, outnode, true)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                // case EDMmlFormulaIndex.Frac_old:
                //     this.insertText('/', false);
                //     if (this._doc.insertLayout(editednode, EDMmlFormulaIndex.insertMrow, outnode, 1)) {
                //         if (this._doc.insertLayout(editednode.nextSibling.nextSibling, EDMmlFormulaIndex.insertMrow, outnode, 1)) {
                //             this.insertFinished(outnode);
                //         }
                //         return true;
                //     }
                //     break;
                case EDMmlFormulaIndex.Sqrt:
                    if (this._doc.insertSqrt(editednode, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.Root:
                    if (this._doc.insertRoot(editednode, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                case EDMmlFormulaIndex.Enclose_div:
                case EDMmlFormulaIndex.Enclose_tl:
                case EDMmlFormulaIndex.Enclose_tr:
                case EDMmlFormulaIndex.Enclose_bl:
                case EDMmlFormulaIndex.Enclose_br:
                case EDMmlFormulaIndex.Enclose_box:
                case EDMmlFormulaIndex.Enclose_up:
                case EDMmlFormulaIndex.Enclose_down:
                case EDMmlFormulaIndex.Enclose_updown:
                case EDMmlFormulaIndex.Enclose_ver:
                case EDMmlFormulaIndex.Enclose_hor:
                    if (this._doc.insertEnclose(editednode, index, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.divided:
                    outnode.push(null);
                    outnode.push(editednode);
                    this._tmpSelectedText = '';
                    var tmpnodelist = [];
                    //console.log(editednode);
                    if (editednode.nodeType == EDMathMlNodeType.MtextNode) {
                        if (editednode.firstChild.toTextNode().text != '') {
                            tmpnodelist.push(editednode);
                        }
                    }
                    else {
                        tmpnodelist.push(editednode);
                    }
                    this._tmpSelectedText = this.getCopyText(tmpnodelist);
                case EDMmlFormulaIndex.SubSup:
                case EDMmlFormulaIndex.Sub:
                case EDMmlFormulaIndex.Sup:
                case EDMmlFormulaIndex.PreSubSup:
                case EDMmlFormulaIndex.PreSub:
                case EDMmlFormulaIndex.PreSup:
                //修改前节点成为基节点，由于业务需求暂时屏蔽
                // outnode.push(null)
                // outnode.push(editednode);
                // this._tmpSelectedText = '';
                // const tmpnodelist:EDMmlNode[] = [];
                // //console.log(editednode);
                // if (editednode.nodeType == EDMathMlNodeType.MtextNode) {
                //     if (editednode.firstChild.toTextNode().text != '') {
                //         tmpnodelist.push(editednode);
                //     }
                // } else {
                //   tmpnodelist.push(editednode);
                // }
                // this._tmpSelectedText = this.getCopyText(tmpnodelist);
                case EDMmlFormulaIndex.Empty_uo:
                case EDMmlFormulaIndex.Empty_u:
                case EDMmlFormulaIndex.Empty_o:
                case EDMmlFormulaIndex.Empty_bp:
                case EDMmlFormulaIndex.Empty_b:
                case EDMmlFormulaIndex.Empty_p:
                case EDMmlFormulaIndex.PreEmpty_p:
                case EDMmlFormulaIndex.PreEmpty_b:
                case EDMmlFormulaIndex.PreEmpty_bp:
                case EDMmlFormulaIndex.sup2:
                case EDMmlFormulaIndex.eX:
                case EDMmlFormulaIndex.tenX:
                case EDMmlFormulaIndex.SupMin:
                case EDMmlFormulaIndex.SupSec:
                case EDMmlFormulaIndex.SupMilliSec:
                case EDMmlFormulaIndex.LeftMin:
                case EDMmlFormulaIndex.insertMrow: // 插入<mrow>
                    if (this._doc.insertLayout(editednode, index, outnode, 1)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.LargeEmpty_uo:
                case EDMmlFormulaIndex.LargeEmpty_u:
                case EDMmlFormulaIndex.LargeEmpty_o:
                case EDMmlFormulaIndex.LargeEmpty_bp:
                case EDMmlFormulaIndex.LargeEmpty_b:
                case EDMmlFormulaIndex.LargeEmpty_p:
                case EDMmlFormulaIndex.PreLargeEmpty_p:
                case EDMmlFormulaIndex.PreLargeEmpty_b:
                case EDMmlFormulaIndex.PreLargeEmpty_bp:
                    if (this._doc.insertLayout(editednode, index, outnode, 2)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.Sum_uo:
                case EDMmlFormulaIndex.Sum:
                case EDMmlFormulaIndex.Sum_u:
                case EDMmlFormulaIndex.Sum_bp:
                case EDMmlFormulaIndex.Sum_b:
                case EDMmlFormulaIndex.Product_uo:
                case EDMmlFormulaIndex.Product:
                case EDMmlFormulaIndex.Product_u:
                case EDMmlFormulaIndex.Product_bp:
                case EDMmlFormulaIndex.Product_b:
                case EDMmlFormulaIndex.CoProduct_uo:
                case EDMmlFormulaIndex.CoProduct:
                case EDMmlFormulaIndex.CoProduct_u:
                case EDMmlFormulaIndex.CoProduct_bp:
                case EDMmlFormulaIndex.CoProduct_b:
                case EDMmlFormulaIndex.Intersection_uo:
                case EDMmlFormulaIndex.Intersection:
                case EDMmlFormulaIndex.Intersection_u:
                case EDMmlFormulaIndex.Intersection_bp:
                case EDMmlFormulaIndex.Intersection_b:
                case EDMmlFormulaIndex.Union_uo:
                case EDMmlFormulaIndex.Union:
                case EDMmlFormulaIndex.Union_u:
                case EDMmlFormulaIndex.Union_bp:
                case EDMmlFormulaIndex.Union_b:
                case EDMmlFormulaIndex.Lor_uo:
                case EDMmlFormulaIndex.Lor:
                case EDMmlFormulaIndex.Lor_u:
                case EDMmlFormulaIndex.Lor_bp:
                case EDMmlFormulaIndex.Lor_b:
                case EDMmlFormulaIndex.Land_uo:
                case EDMmlFormulaIndex.Land:
                case EDMmlFormulaIndex.Land_u:
                case EDMmlFormulaIndex.Land_bp:
                case EDMmlFormulaIndex.Land_b:
                // if (this._doc.insertLayout(editednode, index, outnode)) {
                //     this.insertFinished(outnode);
                //     return true;
                // }
                // break;
                case EDMmlFormulaIndex.Int_uo:
                case EDMmlFormulaIndex.Int:
                case EDMmlFormulaIndex.Int_u:
                case EDMmlFormulaIndex.Int_bp:
                case EDMmlFormulaIndex.Int_b:
                case EDMmlFormulaIndex.DoubleInt_u:
                case EDMmlFormulaIndex.DoubleInt_uo:
                case EDMmlFormulaIndex.DoubleInt:
                case EDMmlFormulaIndex.DoubleInt_bp:
                case EDMmlFormulaIndex.DoubleInt_b:
                case EDMmlFormulaIndex.TripleInt_u:
                case EDMmlFormulaIndex.TripleInt_uo:
                case EDMmlFormulaIndex.TripleInt:
                case EDMmlFormulaIndex.TripleInt_bp:
                case EDMmlFormulaIndex.TripleInt_b:
                case EDMmlFormulaIndex.QuadrupleInt_u:
                case EDMmlFormulaIndex.QuadrupleInt_uo:
                case EDMmlFormulaIndex.QuadrupleInt:
                case EDMmlFormulaIndex.QuadrupleInt_bp:
                case EDMmlFormulaIndex.QuadrupleInt_b:
                case EDMmlFormulaIndex.ContourInt_u:
                case EDMmlFormulaIndex.ContourInt_uo:
                case EDMmlFormulaIndex.ContourInt:
                case EDMmlFormulaIndex.ContourInt_bp:
                case EDMmlFormulaIndex.ContourInt_b:
                case EDMmlFormulaIndex.SurfaceInt_u:
                case EDMmlFormulaIndex.SurfaceInt_uo:
                case EDMmlFormulaIndex.SurfaceInt:
                case EDMmlFormulaIndex.SurfaceInt_bp:
                case EDMmlFormulaIndex.SurfaceInt_b:
                case EDMmlFormulaIndex.VolumeInt_u:
                case EDMmlFormulaIndex.VolumeInt_uo:
                case EDMmlFormulaIndex.VolumeInt:
                case EDMmlFormulaIndex.VolumeInt_bp:
                case EDMmlFormulaIndex.VolumeInt_b:
                case EDMmlFormulaIndex.ClockwiseInt_u:
                case EDMmlFormulaIndex.ClockwiseInt_uo:
                case EDMmlFormulaIndex.ClockwiseInt:
                case EDMmlFormulaIndex.ClockwiseInt_bp:
                case EDMmlFormulaIndex.ClockwiseInt_b:
                case EDMmlFormulaIndex.CtClockwiseInt_u:
                case EDMmlFormulaIndex.CtClockwiseInt_uo:
                case EDMmlFormulaIndex.CtClockwiseInt:
                case EDMmlFormulaIndex.CtClockwiseInt_bp:
                case EDMmlFormulaIndex.CtClockwiseInt_b:
                case EDMmlFormulaIndex.ClockwiseContInt_u:
                case EDMmlFormulaIndex.ClockwiseContInt_uo:
                case EDMmlFormulaIndex.ClockwiseContInt:
                case EDMmlFormulaIndex.ClockwiseContInt_bp:
                case EDMmlFormulaIndex.ClockwiseContInt_b:
                case EDMmlFormulaIndex.CtClockwiseContInt_u:
                case EDMmlFormulaIndex.CtClockwiseContInt_uo:
                case EDMmlFormulaIndex.CtClockwiseContInt:
                case EDMmlFormulaIndex.CtClockwiseContInt_bp:
                case EDMmlFormulaIndex.CtClockwiseContInt_b:
                    if (this._doc.insertInt(editednode, index, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.Infin:
                    if (this._doc.insertInfin(editednode)) {
                        this.insertFinished();
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.Npart:
                    if (this._doc.insertNpart(editednode, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.LeftArr_uo:
                case EDMmlFormulaIndex.LeftArr_u:
                case EDMmlFormulaIndex.LeftArr_o:
                case EDMmlFormulaIndex.LongLeftArr_uo:
                case EDMmlFormulaIndex.LongLeftArr_u:
                case EDMmlFormulaIndex.LongLeftArr_o:
                case EDMmlFormulaIndex.LeftTeeArr_uo:
                case EDMmlFormulaIndex.LeftTeeArr_u:
                case EDMmlFormulaIndex.LeftTeeArr_o:
                case EDMmlFormulaIndex.DoubleLeftArr_uo:
                case EDMmlFormulaIndex.DoubleLeftArr_u:
                case EDMmlFormulaIndex.DoubleLeftArr_o:
                case EDMmlFormulaIndex.DbLongLeftArr_uo:
                case EDMmlFormulaIndex.DbLongLeftArr_u:
                case EDMmlFormulaIndex.DbLongLeftArr_o:
                case EDMmlFormulaIndex.RightArr_uo:
                case EDMmlFormulaIndex.RightArr_u:
                case EDMmlFormulaIndex.RightArr_o:
                case EDMmlFormulaIndex.LongRightArr_uo:
                case EDMmlFormulaIndex.LongRightArr_u:
                case EDMmlFormulaIndex.LongRightArr_o:
                case EDMmlFormulaIndex.RightTeeArr_uo:
                case EDMmlFormulaIndex.RightTeeArr_u:
                case EDMmlFormulaIndex.RightTeeArr_o:
                case EDMmlFormulaIndex.DoubleRightArr_uo:
                case EDMmlFormulaIndex.DoubleRightArr_u:
                case EDMmlFormulaIndex.DoubleRightArr_o:
                case EDMmlFormulaIndex.DbLongRightArr_uo:
                case EDMmlFormulaIndex.DbLongRightArr_u:
                case EDMmlFormulaIndex.DbLongRightArr_o:
                case EDMmlFormulaIndex.LeftRightArr_uo:
                case EDMmlFormulaIndex.LeftRightArr_u:
                case EDMmlFormulaIndex.LeftRightArr_o:
                case EDMmlFormulaIndex.LongLeftRightArr_uo:
                case EDMmlFormulaIndex.LongLeftRightArr_u:
                case EDMmlFormulaIndex.LongLeftRightArr_o:
                case EDMmlFormulaIndex.LeftArrRightArr_uo:
                case EDMmlFormulaIndex.LeftArrRightArr_u:
                case EDMmlFormulaIndex.LeftArrRightArr_o:
                case EDMmlFormulaIndex.RightArrLeftArr_uo:
                case EDMmlFormulaIndex.RightArrLeftArr_u:
                case EDMmlFormulaIndex.RightArrLeftArr_o:
                case EDMmlFormulaIndex.ReverseEquilibrium_uo:
                case EDMmlFormulaIndex.ReverseEquilibrium_u:
                case EDMmlFormulaIndex.ReverseEquilibrium_o:
                case EDMmlFormulaIndex.Equilibrium_uo:
                case EDMmlFormulaIndex.Equilibrium_u:
                case EDMmlFormulaIndex.Equilibrium_o:
                case EDMmlFormulaIndex.LongRArrShortLArr_uo:
                case EDMmlFormulaIndex.LongRArrShortLArr_u:
                case EDMmlFormulaIndex.LongRArrShortLArr_o:
                case EDMmlFormulaIndex.ShortRArrLongLArr_uo:
                case EDMmlFormulaIndex.ShortRArrLongLArr_u:
                case EDMmlFormulaIndex.ShortRArrLongLArr_o:
                case EDMmlFormulaIndex.LRightArrSLeftArr_uo:
                case EDMmlFormulaIndex.LRightArrSLeftArr_u:
                case EDMmlFormulaIndex.LRightArrSLeftArr_o:
                case EDMmlFormulaIndex.SRightArrLLeftArr_uo:
                case EDMmlFormulaIndex.SRightArrLLeftArr_u:
                case EDMmlFormulaIndex.SRightArrLLeftArr_o:
                case EDMmlFormulaIndex.LRightVerSLeftVer_uo:
                case EDMmlFormulaIndex.LRightVerSLeftVer_u:
                case EDMmlFormulaIndex.LRightVerSLeftVer_o:
                case EDMmlFormulaIndex.SRightVerLLeftVer_uo:
                case EDMmlFormulaIndex.SRightVerLLeftVer_u:
                case EDMmlFormulaIndex.SRightVerLLeftVer_o:
                    if (this._doc.insertArr(editednode, index, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.OverDot_s:
                case EDMmlFormulaIndex.OverDoubleDot_s:
                case EDMmlFormulaIndex.OverTripleDot_s:
                case EDMmlFormulaIndex.OverDotDot_s:
                case EDMmlFormulaIndex.OverShortRightArr_s:
                case EDMmlFormulaIndex.OverLeftRightArrow_s:
                case EDMmlFormulaIndex.OverShortLeftArr_s:
                case EDMmlFormulaIndex.OverRightVector_s:
                case EDMmlFormulaIndex.OverLeftRightVector_s:
                case EDMmlFormulaIndex.OverLeftVector_s:
                case EDMmlFormulaIndex.Enclosedown_s:
                case EDMmlFormulaIndex.UnderDot_s:
                case EDMmlFormulaIndex.UnderDoubleDot_s:
                case EDMmlFormulaIndex.UnderTripleDot_s:
                case EDMmlFormulaIndex.UnderDotDot_s:
                case EDMmlFormulaIndex.UnderShortRightArr_s:
                case EDMmlFormulaIndex.UnderLeftRightArrow_s:
                case EDMmlFormulaIndex.UnderShortLeftArr_s:
                case EDMmlFormulaIndex.UnderRightVector_s:
                case EDMmlFormulaIndex.UnderLeftRightVector_s:
                case EDMmlFormulaIndex.UnderLeftVector_s:
                case EDMmlFormulaIndex.Encloseup_s:
                case EDMmlFormulaIndex.OverBar_s:
                case EDMmlFormulaIndex.OverTilde_s:
                case EDMmlFormulaIndex.Parentheses_os:
                case EDMmlFormulaIndex.OverParentheses_s:
                case EDMmlFormulaIndex.OverHat_s:
                case EDMmlFormulaIndex.OverDownhat_s:
                case EDMmlFormulaIndex.SupMin_s:
                case EDMmlFormulaIndex.SupSec_s:
                case EDMmlFormulaIndex.SupMilliSec_s:
                case EDMmlFormulaIndex.SupDegree_s:
                case EDMmlFormulaIndex.Enclosehor_s:
                case EDMmlFormulaIndex.UnderBar_s:
                case EDMmlFormulaIndex.UnderTilde_s:
                case EDMmlFormulaIndex.UnderParentheses_s:
                case EDMmlFormulaIndex.Parentheses_us:
                case EDMmlFormulaIndex.UnderHat_s:
                case EDMmlFormulaIndex.UnderDownhat_s:
                case EDMmlFormulaIndex.OverMin_s:
                case EDMmlFormulaIndex.OverLefmin_s:
                case EDMmlFormulaIndex.SupT_s:
                case EDMmlFormulaIndex.Encloseupdown_s:
                case EDMmlFormulaIndex.OverDot_s:
                    if (editednode.nodeType == EDMathMlNodeType.MtextNode) {
                        if (editednode.firstChild.nodeType == EDMathMlNodeType.TextNode) {
                            if (editednode.firstChild.toTextNode().text == "isNuLL!"
                                || editednode.firstChild.toTextNode().text == "") {
                                return false;
                            }
                        }
                    }
                    outnode.push(null);
                    outnode.push(editednode);
                    this._tmpSelectedText = '';
                    this._tmpSelectedText = this.getCopyText([editednode]);
                case EDMmlFormulaIndex.Parentheses_lr:
                case EDMmlFormulaIndex.Parentheses_l:
                case EDMmlFormulaIndex.Parentheses_r:
                case EDMmlFormulaIndex.Parentheses_uo:
                case EDMmlFormulaIndex.Parentheses_u:
                case EDMmlFormulaIndex.Parentheses_o:
                case EDMmlFormulaIndex.Parentheses_iuo:
                case EDMmlFormulaIndex.Parentheses_iu:
                case EDMmlFormulaIndex.Parentheses_io:
                case EDMmlFormulaIndex.SquareBracket_lr:
                case EDMmlFormulaIndex.SquareBracket_l:
                case EDMmlFormulaIndex.SquareBracket_r:
                case EDMmlFormulaIndex.SquareBracket_uo:
                case EDMmlFormulaIndex.SquareBracket_u:
                case EDMmlFormulaIndex.SquareBracket_o:
                case EDMmlFormulaIndex.SquareBracket_iuo:
                case EDMmlFormulaIndex.SquareBracket_iu:
                case EDMmlFormulaIndex.SquareBracket_io:
                case EDMmlFormulaIndex.SquareBracket_ll:
                case EDMmlFormulaIndex.SquareBracket_rr:
                case EDMmlFormulaIndex.SquareBracket_rl:
                case EDMmlFormulaIndex.VerticalBars_lr:
                case EDMmlFormulaIndex.VerticalBars_l:
                case EDMmlFormulaIndex.VerticalBars_r:
                case EDMmlFormulaIndex.DoubleVerticalBars_lr:
                case EDMmlFormulaIndex.DoubleVerticalBars_l:
                case EDMmlFormulaIndex.DoubleVerticalBars_r:
                case EDMmlFormulaIndex.DoubleBracket_lr:
                case EDMmlFormulaIndex.DoubleBracket_l:
                case EDMmlFormulaIndex.DoubleBracket_r:
                case EDMmlFormulaIndex.AngleBracket_lr:
                case EDMmlFormulaIndex.AngleBracket_l:
                case EDMmlFormulaIndex.AngleBracket_r:
                case EDMmlFormulaIndex.Floor_lr:
                case EDMmlFormulaIndex.Ceiling_lr:
                case EDMmlFormulaIndex.Floor_Ceiling:
                case EDMmlFormulaIndex.AngleBracketWithBar:
                case EDMmlFormulaIndex.ParenthesesWithBar:
                case EDMmlFormulaIndex.SquareBracketWithBar:
                case EDMmlFormulaIndex.CurlyBracketWithBar:
                case EDMmlFormulaIndex.CurlyBracket_o:
                case EDMmlFormulaIndex.CurlyBracket_u:
                case EDMmlFormulaIndex.CurlyBracket_uo:
                case EDMmlFormulaIndex.CurlyBracket_lr:
                case EDMmlFormulaIndex.CurlyBracket_l:
                case EDMmlFormulaIndex.CurlyBracket_r:
                case EDMmlFormulaIndex.CurlyBracket_io:
                case EDMmlFormulaIndex.CurlyBracket_iu:
                case EDMmlFormulaIndex.CurlyBracket_iuo:
                case EDMmlFormulaIndex.Int:
                case EDMmlFormulaIndex.OverBar:
                case EDMmlFormulaIndex.UnderBar:
                case EDMmlFormulaIndex.OverDoubleBar:
                case EDMmlFormulaIndex.UnderDoubleBar:
                case EDMmlFormulaIndex.OverShortRightArr:
                case EDMmlFormulaIndex.UnderShortRightArr:
                case EDMmlFormulaIndex.OverShortLeftArr:
                case EDMmlFormulaIndex.UnderShortLeftArr:
                case EDMmlFormulaIndex.OverRightVector:
                case EDMmlFormulaIndex.UnderRightVector:
                case EDMmlFormulaIndex.OverLeftVector:
                case EDMmlFormulaIndex.UnderLeftVector:
                case EDMmlFormulaIndex.OverLeftRightArrow:
                case EDMmlFormulaIndex.UnderLeftRightArrow:
                case EDMmlFormulaIndex.OverLeftRightVector:
                case EDMmlFormulaIndex.UnderLeftRightVector:
                case EDMmlFormulaIndex.OverDot:
                case EDMmlFormulaIndex.OverDoubleDot:
                case EDMmlFormulaIndex.OverTripleDot:
                case EDMmlFormulaIndex.OverDotDot:
                case EDMmlFormulaIndex.UnderDot:
                case EDMmlFormulaIndex.UnderDoubleDot:
                case EDMmlFormulaIndex.UnderTripleDot:
                case EDMmlFormulaIndex.UnderDotDot:
                case EDMmlFormulaIndex.OverTilde:
                case EDMmlFormulaIndex.OverHat:
                case EDMmlFormulaIndex.UnderHat:
                // case EDMmlFormulaIndex.OverParentheses:
                // case EDMmlFormulaIndex.OverBracket:
                case EDMmlFormulaIndex.OverShellBracket:
                case EDMmlFormulaIndex.UnderShellBracket:
                case EDMmlFormulaIndex.UnderTilde:
                // case EDMmlFormulaIndex.UnderParentheses:
                case EDMmlFormulaIndex.LSquareBracketRParentheses:
                case EDMmlFormulaIndex.LParenthesesRSquareBracket:
                case EDMmlFormulaIndex.LVerticalBarsRAngleBracket:
                case EDMmlFormulaIndex.LAngleBracketRVerticalBars:
                case EDMmlFormulaIndex.Frac_old:
                    if (this._doc.insertBracket(editednode, index, outnode)) {
                        //this.insertFinished(outnode);
                        if (index >= EDMmlFormulaIndex.OverDot_s && index <= EDMmlFormulaIndex.Last_s) {
                            this.insertFinished(outnode, false);
                            // this._doc.deleteNode(outnode[2]);
                            outnode[0].parent.noneditable4child = true;
                            this._mousenode = outnode[0].parent;
                            this._mousepressed = this._mousenode;
                            this._bSelectedPre_presee = this._bSelectedPre;
                            if (this._mousenode.nodeType == EDMathMlNodeType.MencloseNode) {
                                this._doc.deleteNode(outnode[0]);
                            }
                            this.saveTo();
                        }
                        else {
                            this.insertFinished(outnode);
                        }
                        return true;
                    }
                    break;
                // case EDMmlFormulaIndex.fX:
                case EDMmlFormulaIndex.sinX:
                case EDMmlFormulaIndex.sin_X:
                case EDMmlFormulaIndex.sin2X:
                case EDMmlFormulaIndex.cosX:
                case EDMmlFormulaIndex.cos_X:
                case EDMmlFormulaIndex.cos2X:
                case EDMmlFormulaIndex.tanX:
                case EDMmlFormulaIndex.tan_X:
                case EDMmlFormulaIndex.tan2X:
                case EDMmlFormulaIndex.secX:
                case EDMmlFormulaIndex.sec2X:
                case EDMmlFormulaIndex.cscX:
                case EDMmlFormulaIndex.csc2X:
                case EDMmlFormulaIndex.cotX:
                case EDMmlFormulaIndex.cot2X:
                case EDMmlFormulaIndex.arcsinX:
                case EDMmlFormulaIndex.arccosX:
                case EDMmlFormulaIndex.arctanX:
                case EDMmlFormulaIndex.arccotX:
                case EDMmlFormulaIndex.logX:
                case EDMmlFormulaIndex.lgX:
                case EDMmlFormulaIndex.lnX:
                case EDMmlFormulaIndex.expX:
                    if (this._doc.insertFunc(editednode, index, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                case EDMmlFormulaIndex.limX:
                    if (this._doc.insertOther(editednode, index, outnode)) {
                        this.insertFinished(outnode);
                        return true;
                    }
                    break;
                default:
                    break;
            }
            /*
            if (index == EDMmlFormulaIndex.Frac_old) {
                const text: string = `<math display='block'><mrow></mrow><mo>/</mo><mrow></mrow></math>`;
                this._doc.pasteTextNode(editednode, text ,false);
                if (editednode.nextSibling) {
                    outnode[0] = editednode.nextSibling.firstChild.lastSibling;
                }
                this.insertFinished(outnode[0],false);
                this.updateSetContent();
                return true;
            }*/
            if (index === EDMmlFormulaIndex.Enclose_tablediv) {
                var text = "<math display='block'>\n                        <mtable rowspacing = '5'>\n                            <mtr>\n                                <mtd columnalign='right'>\n                                    <mrow></mrow>\n                                </mtd>\n                            </mtr>\n                            <mtr>\n                                <mtd columnalign='right'>\n                                    <menclose notation='longdiv'>\n                                        <mrow></mrow>\n                                    </menclose>\n                                </mtd>\n                            </mtr>\n                        </mtable>\n                    </math>";
                this._doc.pasteTextNode(editednode, text, false);
                if (editednode.nextSibling) {
                    outnode[0] = editednode.nextSibling.firstChild.nextSibling.firstChild.firstChild.firstChild.nextSibling.firstChild.firstChild; // 矩阵第二行
                    // console.log(`================>tostr = ${outnode[0].toStr()}`);
                }
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.Enclose_tablediv2) {
                var text = "<math display='block'>\n                     <mtable rowspacing = '5'  columnalign='right'>\n                      <mtr>\n                       <mtd>\n                       <mo>&#x2009;</mo>\n                       </mtd>\n                       <mtd>\n                        <mrow></mrow>\n                       </mtd>\n                      </mtr>\n                      <mtr>\n                       <mtd>\n                        <mrow></mrow>\n                       </mtd>\n                       <mtd>\n                        <menclose notation=\"longdiv\">\n                          <mrow></mrow>\n                         </menclose>\n                       </mtd>\n                      </mtr>\n                     </mtable>\n                    </math>";
                this._doc.pasteTextNode(editednode, text, false);
                if (editednode.nextSibling) {
                    outnode[0] = editednode.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.firstChild.nextSibling.firstChild.firstChild; // 矩阵第二行
                }
                this.insertFinished(outnode, false);
                // const tmp:EDMmlNode = editednode.nextSibling.firstChild.firstChild.firstChild.firstChild.firstChild;  
                // console.log(tmp);
                // tmp.toTextNode().text = "1"; 
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.Symbol_LRightArrSLeftArr) {
                var text = "<math display='block'><munder><mo>&#x2192;</mo><mo>&#x2190;</mo></munder></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.nextSibling;
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.Symbol_SRightArrLLeftArr) {
                var text = "<math display='block'><mover><mo>&#x2190;</mo><mo>&#x2192;</mo></mover></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.nextSibling;
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.Symbol_LRightVerSLeftVer) {
                var text = "<math display='block'><munder><mo>&#x21C0;</mo><mo>&#x21BD;</mo></munder></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.nextSibling;
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.Symbol_SRightVerLLeftVer) {
                var text = "<math display='block'><mover><mo>&#x21BD;</mo><mo>&#x21C0;</mo></mover></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.nextSibling;
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.fX) {
                var text = "<math display=\"block\"><mi mathvariant=\"italic\">f</mi><mo>&#x28;</mo><mi mathvariant=\"italic\">x</mi><mo>&#x29;</mo><mo>&#x3D;</mo><mrow></mrow></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.lastSibling.firstChild;
                console.log("~~~~fX", outnode[0]);
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            else if (index === EDMmlFormulaIndex.derivativeX) {
                var text = "<math display=\"block\"><mi mathvariant=\"italic\">f</mi><mo>&#x2032;</mo><mo>&#x28;</mo><mi mathvariant=\"italic\">x</mi><mo>&#x29;</mo><mo>&#x3D;</mo><mrow></mrow></math>";
                this._doc.pasteTextNode(editednode, text, false);
                outnode[0] = editednode.lastSibling.firstChild;
                // console.log(`~~~~derivativeX`,outnode[0])
                this.insertFinished(outnode, false);
                this.updateSetContent();
                return true;
            }
            /*接口修改为调用文件路径 功能集成至调用StdMml
            if ((index >= EDMmlFormulaIndex.myFormula_1
                    && index <= EDMmlFormulaIndex.myFormula_10)) {
                    //|| index == EDMmlFormulaIndex.Test_Formula_1) {
                int i = (int)index - (int)EDMmlFormulaIndex.myFormula_1+1;
                //if (index == EDMmlFormulaIndex.Test_Formula_1)
                //    i = 1;
                QFile file( QString("myformula/myFormula_%1.mml").arg(i) );
                if ( !file.open(QIODevice.ReadOnly | QIODevice.Text) )
                    return false;
                //zq 修复读取中文乱码
                QTextCodec.ConverterState state;
                QTextCodec *codec=QTextCodec.codecForName("UTF-8");
                const QByteArray document = file.readAll();
                QString text = codec->toUnicode( document.constData(), document.size(), &state);
                if (state.invalidChars > 0) {
                    text = QTextCodec.codecForName( "GBK" )->toUnicode(document);
                } else {
                    text = document;
                }
                //text = text.replace("#x","&#x");
                file.close();
                this._doc.pasteTextNode(editednode, text ,false);
                this.insertFinished();
                this.updateSetContent();
                return true;
            }*/
            return false;
        };
        /**
         * @brief insertMathml 插入mml特殊符节点 根据g_node_sign所配置的索引值，检索相应的"&#xXXXX;"格式的文本码，
         *                     创建节点并插入到当前节点，存在光标及相关设置后才会生效，此操作默认会删除框选的节点
         * @param mmlindex g_node_sign的索引值，例如EDMmlFormulaIndex::plusmn对应文本码为"<mo>&#x00B1;</mo>"，图像显示为"±"
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.insertSymbol = function (index) {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            var str = '';
            if (index < EDMmlFormulaIndex.le) {
                //<mo>&#x2264;</mo>
                str = '<mo>&#x' + index.toString(16) + ';</mo>';
            }
            else if (this._mousenode.nodeType == EDMathMlNodeType.MoNode
                && index == EDMmlFormulaIndex.Indentation) {
                if (this._mousenode.firstChild.toTextNode().text == 'isIndentation!') {
                    return false;
                }
            }
            else {
                str = EdrawMathDate.EDStatic.g_symboldata.get(index);
                if (str == null) {
                    console.log("cannot finde symboldata", EdrawMathDate.EDStatic.g_symboldata);
                    return false;
                }
            }
            console.log("insertSymbol = ".concat(str));
            return this.insertText(str);
        };
        /**
         * @brief insertEnter 插入换行公式，在光标所在处进行换行操作，同时将光标后面的节点转移至新的一行，存在光标及相关设置后才会生效
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.insertEnter = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._bSelectedPre) {
                //this.moveLeft();
                this._bSelectedPre = false;
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (!this._doc.insertEnter(this._mousenode)) {
                return false;
            }
            // 插入回车公式后，光标转移至下一行第一个节点
            if (this._mousenode.parent.parent.parent.nextSibling.
                firstChild.firstChild.firstChild) {
                this._mousenode.parent.parent.parent.nextSibling.updateChildFont();
                this._mousenode = this._mousenode.parent.parent.parent.
                    nextSibling.firstChild.firstChild.firstChild;
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre = false;
            this._bSelectedPre_presee = this._bSelectedPre;
            this.saveTo();
            return true;
        };
        /**
         * @brief deleteNode 删除光标的前一个节点，如果为框选，则删除框选所有节点，存在光标及相关设置后才会生效
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.deleteNode = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._vecMouseSelectedNode.length <= 0) {
                if (this._bSelectedPre) {
                    //this.moveLeft();
                    this._bSelectedPre = false;
                    if (this._mousenode.previousSibling) {
                        this._mousenode = this._mousenode.previousSibling;
                    }
                }
                var deletemtr = [false];
                this.delMtable(deletemtr);
                if (!deletemtr[0]) {
                    var delnull = [false];
                    this.deleteSpecialNode(delnull);
                    if (!delnull[0]) {
                        var ok = this.deleteMouseNode();
                    }
                }
                else {
                    if (this._mousenode.nodeType == EDMathMlNodeType.MoNode) {
                        if (this._mousenode.toMoNode().text == ' ') {
                            this.deleteMouseNode();
                        }
                    }
                }
            }
            else {
                this.deletedMouseSelected();
                // addSaveData();
            }
            //console.log(`${this._mousenode.toStr()} ${this._mousenode.firstChild.toStr()}`);
            this.saveTo();
            return true;
        };
        /**
         * @brief deleteNextNode 删除光标的下一个节点，如果为框选，则删除框选所有节点，存在光标及相关设置后才会生效
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.deleteNextNode = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._vecMouseSelectedNode.length <= 0) {
                if (!this._bSelectedPre) {
                    if (!this._mousenode.nextSibling) {
                        // if (!this.moveRight()) {
                        return false;
                        // }
                    }
                    this._mousenode = this._mousenode.nextSibling;
                }
                var deletemtr = [false];
                this.delMtable(deletemtr);
                if (!deletemtr[0]) {
                    var delnull = [false];
                    this.deleteSpecialNode(delnull);
                    if (!delnull[0]) {
                        var ok = this.deleteMouseNode();
                    }
                    else {
                        if (this._mousenode.previousSibling) {
                            this._mousenode = this._mousenode.previousSibling;
                            this._mousepressed = this._mousenode;
                            this._bSelectedPre = false;
                            this._bSelectedPre_presee = this._bSelectedPre;
                        }
                    }
                }
            }
            else {
                this.deletedMouseSelected();
                // addSaveData();
            }
            this.saveTo();
            return true;
        };
        /**
         * @brief delMtable 删除矩阵
         * @param deletemtr 实参：是否删除了mtr
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.delMtable = function (deletemtr) {
            if (this._mousenode.parent.parent) {
                // 当删除节点是<mtable columnalign="left">的非第一行子节点时，则删除行，并将删除的那行的子节点全部拷贝到上一行成为子节点
                if (EDMathMlNodeType.MtdNode === this._mousenode.parent.parent.nodeType) {
                    var mtr = this._mousenode.parent.parent.parent;
                    if (null != mtr.parent.explicitAttribute('columnalign') && mtr.previousSibling) {
                        if (this._mousenode.firstChild.nodeType === EDMathMlNodeType.TextNode) {
                            if ('' === this._mousenode.firstChild.toTextNode().text
                                || 'isNuLL!' === this._mousenode.firstChild.toTextNode().text) {
                                var tmp = mtr.previousSibling;
                                var newmouse = tmp.firstChild.firstChild.firstChild.lastSibling;
                                if ('' === this._mousenode.firstChild.toTextNode().text) {
                                    if (newmouse.firstChild.nodeType === EDMathMlNodeType.TextNode) {
                                        if (newmouse.firstChild.toTextNode().text === 'isNuLL!') {
                                            newmouse.firstChild.toTextNode().text = '';
                                        }
                                    }
                                    this._doc.deleteMtr(this._mousenode);
                                }
                                if (!this._doc.deleteNode(mtr)) {
                                    return false;
                                }
                                this._mousenode = newmouse;
                                this._mousepressed = this._mousenode;
                                this._bSelectedPre = false;
                                this._bSelectedPre_presee = this._bSelectedPre;
                                if (deletemtr.length > 0) {
                                    deletemtr[0] = true;
                                }
                                // 如果仅剩一行，则删除矩阵节点，并将删除的那行的子节点<mrow>拷贝替换<mtable>
                                if (!tmp.previousSibling && !tmp.nextSibling) {
                                    var mrow = tmp.firstChild.firstChild;
                                    var mtable = tmp.parent;
                                    if (!this._doc.deleteMtable(mrow, mtable)) {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return true;
        };
        /**
         * @brief deleteSpecialNode 删除矩阵
         * @param delnull 实参：是否删除了节点
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.deleteSpecialNode = function (delnull) {
            if (delnull.length < 1) {
                return false;
            }
            if (this._mousenode.nodeType == EDMathMlNodeType.MtextNode) {
                if (this._mousenode.firstChild != null) {
                    if (this._mousenode.firstChild.nodeType == EDMathMlNodeType.TextNode) {
                        if (this._mousenode.firstChild.toTextNode().text == 'isNuLL!') {
                            delnull[0] = true;
                            var selectdright = false;
                            if (this._mousenode.parent && !this._mousenode.noneditable) {
                                if (this._mousenode.parent.nodeType == EDMathMlNodeType.MrowNode
                                    && this._mousenode.parent.noneditable) {
                                    if (this._mousenode.parent.previousSibling) {
                                        var ps = this._mousenode.parent.previousSibling;
                                        if (ps.nodeType == EDMathMlNodeType.MunderNode
                                            || ps.nodeType == EDMathMlNodeType.MunderoverNode
                                            || ps.nodeType == EDMathMlNodeType.MsubNode
                                            || ps.nodeType == EDMathMlNodeType.MsubsupNode) {
                                            selectdright = true;
                                        }
                                    }
                                    if (!this._mousenode.parent.nextSibling) {
                                        //<A|B>结构节点，删除A时左选，删除B时右选
                                        selectdright = true;
                                    }
                                    else if (this._mousenode.parent.nextSibling.noneditable
                                        && !this._mousenode.parent.nextSibling.nextSibling) {
                                        //<A|B>结构节点，删除A时左选，删除B时右选
                                        selectdright = true;
                                    }
                                }
                            }
                            if (selectdright) {
                                // console.log(`~~~~selectdright`)
                                this.selectedRight();
                            }
                            else {
                                // console.log(`~~~~selectdLeft`) 
                                var mouseparent = this._mousenode.parent;
                                if (mouseparent) {
                                    mouseparent = mouseparent.parent;
                                    if (mouseparent) {
                                        if (mouseparent.nodeType == EDMathMlNodeType.MencloseNode) {
                                            if (mouseparent.myAttrMap.get('notation') == 'longdiv') {
                                                mouseparent = mouseparent.parent;
                                                if (mouseparent) {
                                                    mouseparent = mouseparent.parent;
                                                    if (mouseparent) {
                                                        if (mouseparent.nodeType == EDMathMlNodeType.MtdNode) {
                                                            console.log("~~~~menclose notation=\"longdiv\" MtdNode");
                                                            this.selectedLeft();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                this.selectedLeft();
                            }
                        }
                    }
                }
            }
            else if ((this._mousenode.nodeType == EDMathMlNodeType.MunderNode
                || this._mousenode.nodeType == EDMathMlNodeType.MoverNode)
                //|| this._mousenode.nodeType == EDMathMlNodeType.MrowNode)
                && this._mousenode.firstChild.noneditable) {
                // console.log(`~~~~delete special munder/over node`);
                // this._tmpSelectedText = '';
                // this._tmpSelectedText = this.getCopyText([this._mousenode.firstChild]);
                // // if (this._mousenode.nodeType == EDMathMlNodeType.MrowNode) {
                // //     this._tmpSelectedText = this.getCopyText([this._mousenode.firstChild.nextSibling]);
                // // }
                // const outnode:EDMmlNode = this._mousenode;
                // //this._mousenode = outnode[1];                   
                // if ('' !== this._tmpSelectedText ) {
                //     //this._doc.insertText(this._mousenode, "(")
                //     this.setPasteText(this._tmpSelectedText);
                //     if (outnode.firstChild) {
                //         if (outnode.firstChild.toTextNode()) {
                //             if ('isNuLL!' === outnode.firstChild.toTextNode().text) {
                //                 this.deleteMouseNode();
                //             }
                //         }
                //         //this._doc.insertText(this._mousenode, ")")
                //         this._doc.deleteNode(outnode);                                    
                //     }
                //     delnull[0] = true;
                // } 
                var outnode = this._mousenode.firstChild.firstChild.nextSibling;
                if (outnode) {
                    this._tmpSelectedText = '';
                    this._tmpSelectedText = this.getCopyText([outnode]);
                    if ('' !== this._tmpSelectedText) {
                        this.deleteMouseNode();
                        this.setPasteText(this._tmpSelectedText);
                        // if (outnode.firstChild) {
                        //     if (outnode.firstChild.toTextNode()) {
                        //         if ('isNuLL!' === outnode.firstChild.toTextNode().text) {
                        //         }
                        //     }
                        //     //this._doc.insertText(this._mousenode, ")")
                        //     this._doc.deleteNode(outnode);                                    
                        // }
                        delnull[0] = true;
                    }
                }
            }
            else if (this._mousenode.nodeType == EDMathMlNodeType.MencloseNode
                && this._mousenode.firstChild.noneditable) {
                var outnode = this._mousenode.firstChild;
                if (outnode) {
                    this._tmpSelectedText = '';
                    this._tmpSelectedText = this.getCopyText([outnode]);
                    if ('' !== this._tmpSelectedText) {
                        this.deleteMouseNode();
                        this.setPasteText(this._tmpSelectedText);
                        delnull[0] = true;
                    }
                }
            }
            else if (this._mousenode.nodeType == EDMathMlNodeType.MrowNode
                && this._mousenode.firstChild.noneditable) {
                // //查找是否括号类型节点结构
                // let isbracket:boolean = false;
                // let hasmrow:boolean = false;
                // let child: EDMmlNode = this._mousenode.firstChild;
                // for ( ; child != null; child = child.nextSibling ) {
                //     if (child.nodeType == EDMathMlNodeType.MrowNode) {
                //         hasmrow = true;
                //         break;
                //     }
                // }
                // if (hasmrow && child) {
                //     if (!child.firstChild.noneditable) {
                //         isbracket = true;
                //     }
                // }
                //查找是否括号类型节点结构
                var ismo = false;
                console.log("~~~~delete special mrow node");
                var lastnode = this._mousenode.firstChild.lastSibling;
                if (lastnode) {
                    if (lastnode.nodeType == EDMathMlNodeType.MoNode) {
                        for (var _i = 0, _a = EdrawMathDate.EDStatic.g_special_mo; _i < _a.length; _i++) {
                            var motext = _a[_i];
                            if (lastnode.toMoNode().text == motext) {
                                ismo = true;
                            }
                        }
                    }
                }
                if (ismo) {
                    this._doc.deleteNode(this._mousenode.firstChild.lastSibling);
                    var outnode = this._mousenode.firstChild.nextSibling;
                    if (outnode) {
                        if (!outnode.nextSibling) {
                            this._mousenode.noneditable4child = false;
                            this._tmpSelectedText = '';
                            this._tmpSelectedText = this.getCopyText([outnode]);
                            if ('' !== this._tmpSelectedText) {
                                this.deleteMouseNode();
                                this.setPasteText(this._tmpSelectedText);
                            }
                        }
                    }
                    delnull[0] = true;
                }
            } /* else if (this._mousenode.nodeType == EDMathMlNodeType.MsubNode
                ||this._mousenode.nodeType == EDMathMlNodeType.MsupNode
                ||this._mousenode.nodeType == EDMathMlNodeType.MsubsupNode
                ||this._mousenode.nodeType == EDMathMlNodeType.MmultiscriptsNode) {
                    const outnode:EDMmlNode = this._mousenode.firstChild;
                    if (outnode) {
                        this._tmpSelectedText = '';
                        this._tmpSelectedText = this.getCopyText([outnode]);
                        if ('' !== this._tmpSelectedText ) {
                            this.deleteMouseNode();
                            this.setPasteText(this._tmpSelectedText);
                            delnull[0] = true;
                        }
                    }
            }*/
            else if (this._mousenode.nodeType != EDMathMlNodeType.MoNode
                && this._mousenode.nodeType != EDMathMlNodeType.MiNode
                && this._mousenode.nodeType != EDMathMlNodeType.MnNode
                && !delnull[0]) {
                delnull[0] = true;
                console.log("~~~~nonetype selectedLeft");
                this.selectedLeft();
            }
        };
        /**
         * @brief addSaveData 保存mml文本，光标指针数据，用于撤销重做
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.addSaveData = function () {
            // qDebug() <<"EDMathMLDocument"<<QThread::currentThreadId();
            if (this._doc.rootisEmpty()) {
                return false;
            }
            // if (!_vecSaveData.isEmpty())
            //    if (_vecSaveData.at(_nSaveDataIndex).mmltext == _strDocument)
            //        return false;
            /*
            //let tmp: number = this._vecSaveData.length-(this._nSaveDataIndex+1);//索引值和第几位元素差1
            if (tmp>0) {
                //this._vecSaveData.remove(_nSaveDataIndex+1,tmp);
                this._vecSaveData.remove(_nSaveDataIndex+1,tmp);
            } else if (tmp<0)
                return false;
            */
            var length = this._vecSaveData.length;
            for (var i = this._nSaveDataIndex + 1; i < length; ++i) {
                this._vecSaveData.removeAt(i);
            }
            // QLineF hline;
            // QLineF vline;
            // QRect rect;
            // getCursor(hline,vline,rect);//更新_mousePoint
            if (null != this._mousenode) { // 修复撤销到底回到加载文本后
                var noderectf = this._mousenode.deviceRect;
                var parentrectf = new egRect(0, 0, 0, 0);
                var tmpnode = this._mousenode.firstSibling;
                for (; tmpnode != null; tmpnode = tmpnode.nextSibling) {
                    parentrectf.united(tmpnode.deviceRect);
                }
                if (this._bSelectedPre) {
                    this._mousePoint = new egPoint(noderectf.left(), parentrectf.bottom());
                }
                else {
                    this._mousePoint = new egPoint(noderectf.right(), parentrectf.bottom());
                }
            }
            var nodedata = new EdrawMathDate.EDSaveData(this._strDocument, this._mousePoint);
            if (this._vecSaveData.length > 1) {
                if (this._vecSaveData[this._vecSaveData.length - 1].mmltext === this._strDocument) {
                    return false;
                }
            }
            this._vecSaveData.push(nodedata);
            this._nSaveDataIndex++;
            //console.log(`addSaveData: ${this._nSaveDataIndex}`);
            /*
            //自动保存
            EDStatic::createTmpDir();
            QFile file( EDStatic::g_exe_name + "/tmp/tmp.mml" );
            if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
                return false;
            QTextStream newout( &file );
            newout<<_strDocument;
            file.close();
            */
            // this.ctx.canvas.focus();
            return true;
        };
        /**
         * @brief mmlRedo ctrl+y重做
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.mmlRedo = function () {
            console.log("mmlRedo: ".concat(this._nSaveDataIndex, " ").concat(this._vecSaveData.length));
            if (this._nSaveDataIndex + 1 >= this._vecSaveData.length) {
                return false;
            }
            this._nSaveDataIndex++;
            var mmltext = this._vecSaveData[this._nSaveDataIndex].mmltext;
            this.clear(false);
            this.setContent(mmltext);
            var mousepoint = this._vecSaveData[this._nSaveDataIndex].mousepoint;
            this.mousePress(mousepoint);
            // if (this._nSaveDataIndex == this._vecSaveData.length-1) {
            //    return false;
            // }
            return true;
        };
        /**
         * @brief mmlUndo ctrl+z撤销
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.mmlUndo = function () {
            console.log("mmlUndo: ".concat(this._nSaveDataIndex, " ").concat(this._vecSaveData.length));
            if (this._vecSaveData.length <= 0 || this._nSaveDataIndex - 1 < 0) {
                return false;
            }
            this._nSaveDataIndex--;
            var mmltext = this._vecSaveData[this._nSaveDataIndex].mmltext;
            this.clear(false);
            this.setContent(mmltext);
            var mousepoint = this._vecSaveData[this._nSaveDataIndex].mousepoint;
            this.mousePress(mousepoint);
            // if (this._nSaveDataIndex == 1) {
            //    return false;
            // }
            return true;
        };
        Object.defineProperty(EDMathMLDocument.prototype, "undoEnable", {
            get: function () {
                if (this._nSaveDataIndex === 0) {
                    return false;
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "redoEnable", {
            get: function () {
                if (this._nSaveDataIndex === this._vecSaveData.length - 1) {
                    return false;
                }
                return true;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EDMathMLDocument.prototype, "renderingPositions", {
            /** 目前接触到的mathml节点均未使用该函数
             * @brief getRenderingPositions returns the rendering positions (and dimensions) of any symbol rendered that has an //返回任何具有id作为MathMl属性的符号的渲染位置（和维度）。
             * id as MathMl attribute. The id given must be a number.                                                           //给出的ID必须是一个数字。
             * @return the rendering position and dimension, along with the id information given with the mathml code as        //渲染位置和维度，以及用mathml代码给出的id信息作为属性
             * attribute
             */
            get: function () {
                return this._doc.getRenderingPositions();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @brief moveLeft 光标左移 左右移动为遍历可编辑节点操作的移动到上一可编辑操作节点
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.moveLeft = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            //let left:boolean = false;
            if (this._bSelectedPre) {
                // 将光标位置置为默认的后置
                this._bSelectedPre = false;
                //left = true;
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (this._vecEditedNode.length > 0) {
                var index = -1;
                for (var i = 0; i < this._vecEditedNode.length; ++i) {
                    if (this._mousenode === this._vecEditedNode[i]) {
                        index = i;
                    }
                }
                // if (left) {
                //     index = index -1;
                // }
                if (-1 !== index && index > 0) {
                    this._mousenode = this._vecEditedNode[index - 1];
                }
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief moveRight 光标右移 左右移动为遍历可编辑节点操作的移动到下一可编辑操作节点
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.moveRight = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            if (this._bSelectedPre) {
                this._bSelectedPre = false;
                //this.moveLeft();
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (this._vecEditedNode.length > 0) {
                var index = -1;
                for (var i = 0; i < this._vecEditedNode.length; ++i) {
                    if (this._mousenode === this._vecEditedNode[i]) {
                        index = i;
                    }
                }
                if (-1 !== index && index < this._vecEditedNode.length - 1) {
                    if (index + 1 !== this._vecEditedNode.length - 1 || EDMathMlNodeType.MrowNode !== this._vecEditedNode[index + 1].nodeType) {
                        this._mousenode = this._vecEditedNode[index + 1];
                    }
                }
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief moveRight 光标移动到尾端
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.moveEnd = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            if (this._bSelectedPre) {
                this._bSelectedPre = false;
            }
            this._mousenode = this._vecEditedNode[this._vecEditedNode["length"] - 2];
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief moveUp 光标上移 上下移动检索矩形的xy坐标，在一定的范围内允许进行光标向上移动
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.moveUp = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            if (this._bSelectedPre) {
                // 将光标位置置为默认的后置
                this._bSelectedPre = false;
                //this.moveLeft();
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (this._vecEditedNode.length > 0) {
                var newnodeindex = -1;
                var miny = 99999;
                var minx = 99999;
                var mousey = this._mousenode.deviceRect.bottom();
                // int mousey = _mousenode->deviceRect().center().y();
                var mousex = this._mousenode.deviceRect.center().x;
                // int xleft = _mousenode->firstSibling()->deviceRect().left();
                // int xright = _mousenode->lastSibling()->deviceRect().right();
                var xcenter = 0.5 * (this._mousenode.firstSibling.deviceRect.left()
                    + this._mousenode.lastSibling.deviceRect.right());
                for (var i = 0; i < this._vecEditedNode.length; ++i) {
                    if (this._mousenode !== this._vecEditedNode[i]) {
                        // if (EDMathMlNodeType::TextNode != _vecEditedNode.at(i)->firstChild()->nodeType())
                        //    continue;
                        if (EDMathMlNodeType.MtextNode === this._vecEditedNode[i].nodeType) {
                            if ('' === this._vecEditedNode[i].firstChild.toTextNode().text) {
                                continue;
                            }
                        }
                        var rect = this._vecEditedNode[i].deviceRect;
                        // if (xcenter < rect.left() || xcenter > rect.right()) {
                        //     continue;
                        //     }
                        // if (rect.center().x()<xleft || rect.center().x()>xright)
                        //    continue;
                        var bottomy = mousey - rect.bottom();
                        // int bottomy =  mousey - rect.center().y();
                        if (bottomy === miny) {
                            var bottomx = mousex - rect.center().x;
                            if (bottomx < 0) {
                                bottomx = -bottomx;
                            }
                            if (bottomx < minx) {
                                minx = bottomx;
                                newnodeindex = i;
                            }
                        }
                        if (bottomy < miny && bottomy > 0) {
                            miny = bottomy;
                            newnodeindex = i;
                            minx = mousex - rect.center().x;
                        }
                    }
                }
                if (-1 !== newnodeindex) {
                    this._mousenode = this._vecEditedNode[newnodeindex];
                }
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief moveDowm 光标下移 上下移动检索矩形的xy坐标，在一定的范围内允许进行光标向下移动
         * @return 返回的结果值，操作是否成功
         */
        EDMathMLDocument.prototype.moveDowm = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            if (this._bSelectedPre) {
                this._bSelectedPre = false;
                //this.moveLeft();
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (this._vecEditedNode.length > 0) {
                var newnodeindex = -1;
                var miny = 99999;
                var minx = 99999;
                var mousey = this._mousenode.deviceRect.top();
                // int mousey = _mousenode->deviceRect().center().y();
                var mousex = this._mousenode.deviceRect.center().x;
                // int xleft = _mousenode->firstSibling()->deviceRect().left();
                // int xright = _mousenode->lastSibling()->deviceRect().right();
                var xcenter = 0.5 * (this._mousenode.firstSibling.deviceRect.left()
                    + this._mousenode.lastSibling.deviceRect.right());
                for (var i = 0; i < this._vecEditedNode.length; ++i) {
                    if (this._mousenode !== this._vecEditedNode[i]) {
                        // if (EDMathMlNodeType::TextNode != _vecEditedNode.at(i)->firstChild()->nodeType())
                        //    continue;
                        if (EDMathMlNodeType.MtextNode === this._vecEditedNode[i].nodeType) {
                            if ('' === this._vecEditedNode[i].firstChild.toTextNode().text) {
                                continue;
                            }
                        }
                        var rect = this._vecEditedNode[i].deviceRect;
                        // if (xcenter < rect.left() || xcenter > rect.right()) {
                        //     continue;
                        // }
                        // if (rect.center().x()<xleft || rect.center().x()>xright)
                        //    continue;
                        var topy = rect.top() - mousey;
                        // int topy =  rect.center().y() - mousey;
                        if (topy === miny) {
                            var topx = mousex - rect.center().x;
                            if (topx < 0) {
                                topx = -topx;
                            }
                            if (topx < minx) {
                                minx = topx;
                                newnodeindex = i;
                            }
                        }
                        if (topy < miny && topy > 0) {
                            miny = topy;
                            newnodeindex = i;
                            minx = mousex - rect.center().x;
                        }
                    }
                }
                if (-1 !== newnodeindex) {
                    this._mousenode = this._vecEditedNode[newnodeindex];
                }
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief deleteMouseNode 删除_mousenode，并将光标转移至下一节点，根据_mousenode的节点类型和所在的节点结构会有不同的操作
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.deleteMouseNode = function () {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (this._mousenode == null) {
                return false;
            }
            var editednode = null;
            if (this._mousenode.previousSibling) {
                editednode = this._mousenode.previousSibling;
                // 当光标节点没有下一个同级节点时，删除操作只是将他的上一个同级节点的文本设置为显示矩形，
                if (editednode.firstChild.toTextNode() && !this._mousenode.nextSibling) {
                    if ('' === editednode.firstChild.toTextNode().text) {
                        editednode.firstChild.toTextNode().text = 'isNuLL!';
                    }
                }
            }
            else if (this._mousenode.firstChild.toTextNode()) {
                // 当光标节点是没有上一个同级节点时，删除操作不是将文本设置为显示矩形，而是设为隐藏节点，只显示光标
                if ('isNuLL!' === this._mousenode.firstChild.toTextNode().text
                    && this._mousenode.nextSibling) {
                    // && EDMathMlNodeType::MtdNode != _mousenode->parent()->parent()->nodeType())
                    // 新方案改为删除
                    // if (_mousenode->parent()->nextSibling())
                    //    editednode = _mousenode->parent()->nextSibling();
                    // _mousenode =_mousenode->parent();
                    // 原方案
                    this._mousenode.firstChild.toTextNode().text = '';
                    this._mousenode.updateChildFont();
                }
            }
            // const EDMmlNodeSpec *spec = EDStatic::mmlFindNodeSpec( _mousenode->nodeType() );
            // if (EDMmlNodeSpec::ChildAny != spec->child_spec)
            if ((!this._mousenode.previousSibling && !this._mousenode.nextSibling)
                || EDMathMlNodeType.MrowNode !== this._mousenode.parent.nodeType) {
                // 当光标节点没有同级节点，或者父节点不是<mrow>节点时，插入显示矩形节点(分数、根号类等节点的显示矩形)
                var mrow = this._mousenode.parent;
                var deletemrow = false;
                if (EDMathMlNodeType.MrowNode === mrow.nodeType) { // 修正空<mrow></mrow>删除失败问题
                    if (mrow.parent) {
                        var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(mrow.parent.nodeType);
                        if (ChildSpec.ChildAny === spec.child_spec) {
                            if (mrow.nextSibling) {
                                deletemrow = true;
                            }
                            else if (mrow.previousSibling) {
                                if (mrow.previousSibling.nodeType !== EDMathMlNodeType.MtextNode) {
                                    deletemrow = true;
                                }
                                else if (mrow.previousSibling.firstChild.toTextNode().text !== '') {
                                    deletemrow = true;
                                }
                            }
                        }
                    }
                }
                if (deletemrow) {
                    editednode = mrow.previousSibling;
                    this._mousenode = mrow;
                }
                else {
                    this._doc.insertText(this._mousenode, 'isNuLL!');
                    editednode = this._mousenode.nextSibling;
                    editednode.updateChildFont();
                }
                // 当删除节点是<mtr>节点的子<mtd>的子节点<mrow>的子节点，且节点内容为显示矩形时，此时操作为删除整行
                /* 屏蔽 原矩阵行删除操作
                EDMmlNode *mtr = _mousenode->parent()->parent()->parent();
                if (mtr) {
                    if (EDMathMlNodeType::MtrNode == mtr->nodeType()
                            && "isNuLL!" == _mousenode->firstChild()->toTextNode()->text()) {
                        EDMmlNode *mtd = mtr->firstChild();
                        bool isnull = true;
                        for ( ; mtd != 0; mtd = mtd->nextSibling() ) {
                            if (EDMathMlNodeType::MtextNode != mtd->firstChild()->firstChild()->nodeType())
                                isnull = false;
                            else if ("isNuLL!" != mtd->firstChild()->firstChild()->firstChild()->toTextNode()->text())
                                isnull = false;
                        }
                        //当<mtr>不是<mtable>的第一个子节点时可以删除
                        if (isnull && mtr != mtr->firstSibling()) {
                            for (int i=0; i < _vecEditedNode.size();++i)
                                if (_mousenode == _vecEditedNode.at(i))
                                    editednode = _vecEditedNode.at(i-1);
                            editednode = _mousenode->parent()->parent()->parent()->previousSibling();
                            while (editednode->firstChild()) {
                                editednode = editednode->firstChild()->lastSibling();
                            }
                            editednode = editednode->parent();
                            _mousenode = _mousenode->parent()->parent()->parent();
                        }
                    }
                }*/
            }
            if (null == editednode) {
                return false;
            }
            if (!this._doc.deleteNode(this._mousenode)) {
                return false;
            }
            this._mousenode = editednode;
            this._mousepressed = this._mousenode;
            this._bSelectedPre = false;
            this._bSelectedPre_presee = this._bSelectedPre;
            return true;
        };
        /**
         * @brief insertFinished 插入公式成功的后续统一操作，比如光标移动，文本保存等
         * @param outnode 节点指针 如果存在节点指针，则光标节点会转移至输出节点指针，比如分数公式输出为分子的节点指针
         * @param savato 是否执行saveto函数更新节点信息，部分使用场合不需要，如加载文本，以减少资源的消耗
         */
        EDMathMLDocument.prototype.insertFinished = function (outnode, saveto) {
            if (outnode === void 0) { outnode = null; }
            if (saveto === void 0) { saveto = true; }
            if (this._mousenode.parent) {
                this._mousenode.parent.updateChildFont();
            }
            // 当在显示矩形文本插入公式时，将矩形节点删除
            if (this._mousenode.firstChild.toTextNode()) {
                if ('isNuLL!' === this._mousenode.firstChild.toTextNode().text) {
                    this.deleteMouseNode();
                }
            }
            if (!this._bSelectedPre) {
                // this.moveRight();
                if (this._mousenode.nextSibling) {
                    this._mousenode = this._mousenode.nextSibling;
                }
            }
            else {
                // this.moveLeft();
                this._bSelectedPre = false;
                if (this._mousenode.previousSibling) {
                    this._mousenode = this._mousenode.previousSibling;
                }
            }
            if (null != outnode) {
                if (outnode.length > 0) {
                    //const editednode = this._mousenode;
                    //特殊节点特殊处理
                    //复制粘贴outnode[i]以此实现节点结构的移动
                    if (outnode.length > 2) {
                        if (outnode[1] != null) {
                            this._mousenode = outnode[1];
                            if ('' !== this._tmpSelectedText) {
                                //this._doc.insertText(this._mousenode, "(")
                                var ok = this.setPasteText(this._tmpSelectedText);
                                if (outnode[1].firstChild) {
                                    if (outnode[1].firstChild.toTextNode()) {
                                        if ('isNuLL!' === outnode[1].firstChild.toTextNode().text) {
                                            this.deleteMouseNode();
                                        }
                                    }
                                    //this._doc.insertText(this._mousenode, ")")
                                    this._doc.deleteNode(outnode[2]);
                                }
                            }
                        }
                    }
                    if (outnode[0] != null) {
                        this._mousenode = outnode[0];
                        if ('' !== this._strSelectedText) {
                            this.setPasteText(this._strSelectedText);
                            if (outnode[0].firstChild) {
                                if (outnode[0].firstChild.toTextNode()) {
                                    if ('isNuLL!' === outnode[0].firstChild.toTextNode().text) {
                                        this.deleteMouseNode();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this._mousepressed = this._mousenode;
            this._bSelectedPre_presee = this._bSelectedPre;
            if (saveto) {
                this.saveTo();
            }
            return;
        };
        /**
         * @brief saveTo 根据节点的数据结构，保存.mml文件到默认路径，同时保存公式图像，更新_vecEditedNode和_vecSelectedNode
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.saveTo = function () {
            this.updateDocument();
            // 将mathml文本数据重新加载到_doc中
            this._doc.setContent(this._strDocument); // 设置内容
            this.savePainter();
            // console.log(`saveTo savePainter`);
            this._vecEditedNode.splice(0);
            this._vecSelectedNode.splice(0);
            this._doc.getNodeVector(this._vecEditedNode, this._vecSelectedNode); // 更新节点向量
            return true;
        };
        /**
         * @brief savePainter 将公式绘图保存为png图片作为背景图，以此减少光标重绘时cpu的消耗
         */
        EDMathMLDocument.prototype.savePainter = function () {
            var relorgin = this._doc.relOrgin;
            var rect = new egRect(0, 0, this._doc.size().width + 2 * relorgin.x, this._doc.size().height + 2 * relorgin.y);
            // this._ctx.canvas.setAttribute("width", rect.width.toString()+"px");
            // this._ctx.canvas.setAttribute("height", rect.height.toString()+"px");
            // this._ctx.canvas.width = rect.width;
            // this._ctx.canvas.height = rect.height;
            // 将绘图保存为Pixmap
            // let pixmap: ImageData = new ImageData(rect.width, rect.height);
            var pixmap = this._ctx.createImageData(rect.width, rect.height);
            /*
            pixmap.fill(Qt::transparent);
            QPainter painter(&pixmap);

            //QSvgGenerator svg;
            //svg.setFileName("tmp.svg");
            //QPainter painter(&svg);

            //QImage image(QSize((int)Rect.width(), (int)Rect.height()),QImage::Format_ARGB32);
            //QPainter painter(&image);
            //image.fill(Qt::transparent);

            //image.setDevicePixelRatio(2);
            //image.setDotsPerMeterX(image.dotsPerMeterX()*2);
            //image.setDotsPerMeterY(image.dotsPerMeterY()*2);

            painter.fillRect(Rect, Qt::transparent );//设置填充矩形

            //if(image.isNull())
            //    return;

            //painter.setRenderHints(QPainter::Antialiasing|QPainter::TextAntialiasing|QPainter::SmoothPixmapTransform);

            QTime time;
            time.start();
            paint( &painter, Rect.topLeft()  );
            //paint( &painter, Rect.topLeft());
            qDebug()<<"paint:"<<time.elapsed()/1000.0<<"s";
            //image = image.scaled(image.size()*2.0,Qt::KeepAspectRatio,Qt::SmoothTransformation);
            //_mmlImage = image;//.scaled(image.size()*0.5,Qt::KeepAspectRatio,Qt::SmoothTransformation);//避免读写文件以提高效率
            */
            this._ctx.clearRect(0, 0, rect.width, rect.height);
            this._ctx.setLineDash([]);
            this._ctx.globalAlpha = 1; // 透明度
            this.paint(rect.topLeft());
            pixmap = this._ctx.getImageData(0, 0, rect.width, rect.height);
            this._mmlPixmap = pixmap; // 避免读写文件以提高效率
            var setsize = false;
            if (this._ctx.canvas.width !== Math.round(rect.width)) {
                this._ctx.canvas.width = Math.round(rect.width);
                setsize = true;
            }
            if (this._ctx.canvas.height !== Math.round(rect.height)) {
                this._ctx.canvas.height = Math.round(rect.height);
                setsize = true;
            }
            if (setsize) {
                this.saveTo();
                // console.log(`${this._ctx.canvas.width} ${sizef.width}\n${this._ctx.canvas.height} ${sizef.height}`);
            }
            // image.save(EDStatic::g_exe_name + "/tmp/mathml.png", "png");//导出文件路径暂定为默认路径
            // this.ctx.putImageData(this._mmlPixmap,0,0);
        };
        /**
         * @brief getEditedNodePos 获取的光标相关的矩形和框选矩形 对相关节点的绘图矩形进行操作得到所需要的数据
         * @param node 获取的当前节点矩形，用于计算光标垂直线
         * @param parent 获取的当前节点的父矩形，大小为当前节点矩阵的所有同级矩阵的组合，用于计算光标水平线
         * @param selected 获取的当前框选的矩形，用于绘制框选区域
         * @return 得到的结果值，是否操作成功
         */
        EDMathMLDocument.prototype.getEditedNodePos = function (node, parent, selected) {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (null == this._mousenode) {
                return false;
            }
            // 修复鼠标移动导致程序崩溃 180615
            if (null == this._mousepressed) {
                return false;
            }
            var noderectf = this._mousenode.deviceRect;
            var parentrectf = new egRect(0, 0, 0, 0);
            var tmpnode = this._mousenode.firstSibling;
            for (; tmpnode != null; tmpnode = tmpnode.nextSibling) {
                parentrectf.united(tmpnode.deviceRect);
            }
            var vecSelected = [];
            // QVector <EDMmlNode*>vecEdited;
            this.getVecNode(vecSelected); // ,_vecSelectedNode);
            // 深拷贝矩形数据
            node.x = noderectf.x;
            node.y = noderectf.y;
            node.width = noderectf.width;
            node.height = noderectf.height;
            parent.x = parentrectf.x;
            parent.y = parentrectf.y;
            parent.width = parentrectf.width;
            parent.height = parentrectf.height;
            // if (vecSelected != _vecMouseSelectedNode)
            //    _vecMouseSelectedNode = vecSelected;
            var nodeseledcted = new egRect(0, 0, 0, 0);
            this._vecMouseSelectedNode.splice(0);
            if (vecSelected.length > 0) {
                for (var i = 0; i < vecSelected.length; ++i) {
                    nodeseledcted.united(vecSelected[i].deviceRect);
                    var tmp = vecSelected[i];
                    this._vecMouseSelectedNode.push(vecSelected[i]);
                    // TODO 子节点匹配
                    if (i < vecSelected.length - 1 && this._doc.isChildNode(tmp, vecSelected[i + 1])) {
                        break;
                    }
                }
            }
            selected.x = nodeseledcted.x;
            selected.y = nodeseledcted.y;
            selected.width = nodeseledcted.width;
            selected.height = nodeseledcted.height;
            return true;
        };
        /**
         * @brief getVecNode 获取的节点指针的向量 根据对框选的节点和_vecSelectedNode的节点进行比较和筛选，得到满足要求的节点指针向量
         * @param getvector 得到的结果值，可用于倒序删除
         */
        EDMathMLDocument.prototype.getVecNode = function (getvector) {
            if (null != this._mousepressed) {
                if (this._vecSelectedNode.length <= 0) {
                    return;
                }
                var comparevecotr = this._vecSelectedNode;
                var startindex = -1;
                var endindex = -1;
                var length_1 = comparevecotr.length;
                for (var i = 0; i < length_1; ++i) {
                    if (this._mousepressed === comparevecotr[i]) {
                        startindex = i;
                    }
                    if (this._mousenode === comparevecotr[i]) {
                        endindex = i;
                    }
                }
                if (startindex !== -1 && endindex !== -1 && startindex === endindex) {
                    if (this._bSelectedPre_presee !== this._bSelectedPre) {
                        getvector.push(comparevecotr[startindex]);
                    }
                }
                else {
                    if (startindex !== -1 && endindex !== -1 && startindex < endindex) {
                        if (!this._bSelectedPre_presee) {
                            startindex = startindex + 1;
                        }
                        if (this._bSelectedPre) {
                            endindex = endindex - 1;
                        }
                    }
                    else if (startindex !== -1 && endindex !== -1 && startindex > endindex) {
                        if (this._bSelectedPre_presee) {
                            startindex = startindex - 1;
                        }
                        if (!this._bSelectedPre) {
                            endindex = endindex + 1;
                        }
                        var tmp = startindex;
                        startindex = endindex;
                        endindex = tmp;
                    }
                    if (startindex === -1 || endindex === -1) {
                        return;
                    }
                    for (var i = startindex; i <= endindex; ++i) {
                        var appendnode = null;
                        // 如果选择的节点的同级节点个数有限，即不可修改同级节点个数，则此节点不可选
                        var spec = EdrawMathDate.EDStatic.mmlFindNodeSpec_type(comparevecotr[i].parent.nodeType);
                        if (ChildSpec.ChildAny === spec.child_spec) {
                            appendnode = comparevecotr[i];
                        }
                        else {
                            appendnode = comparevecotr[i].parent;
                        }
                        // 去重
                        this.removeDuplicates(appendnode, getvector);
                        if (EDMathMlNodeType.MtdNode === appendnode.nodeType
                            || EDMathMlNodeType.MtrNode === appendnode.nodeType) {
                            var mtdnode = null;
                            if (EDMathMlNodeType.MtrNode === appendnode.nodeType) {
                                mtdnode = appendnode.firstChild;
                            }
                            else {
                                mtdnode = appendnode;
                            }
                            /*
                            for ( ; mtdnode != 0; mtdnode=mtdnode->nextSibling()) {
                                EDMmlNode *tmpnode = mtdnode->firstChild()->firstChild();
                                for ( ; tmpnode != 0; tmpnode=tmpnode->nextSibling()) {
                                    for (int j=0; j < getvector.size(); ++j )
                                        if (tmpnode == getvector.at(j))
                                            getvector.remove(j);
                                    getvector.append(tmpnode);
                                 }
                            }*/
                            // 修改矩阵的框选 180619
                            var mtablenode = mtdnode.parent.parent;
                            this.removeDuplicates(mtablenode, getvector);
                            getvector.push(mtablenode);
                        }
                        else {
                            getvector.push(appendnode);
                        }
                    }
                }
            }
        }; // , QVector <EDMmlNode*>comparevecotr);
        /**
         * @brief removeDuplicates 删除重复项，遍历当前节点和子节点进行比较，删除在removevector中，与比较的节点相同的节点
         * @param rootnode 进行比较的根节点
         * @param removevector 得到的结果值，用于被删除重复项的对象
         */
        EDMathMLDocument.prototype.removeDuplicates = function (rootnode, removevector) {
            var length = removevector.length;
            for (var j = 0; j < length; ++j) {
                if (rootnode === removevector[j]) {
                    // console.log(`remove ${removevector[j].tag}`);
                    removevector.removeAt(j);
                }
            }
            if (EDMathMlNodeType.MprescriptsNode !== rootnode.nodeType
                && EDMathMlNodeType.NoneNode !== rootnode.nodeType
                && EDMathMlNodeType.UnknownNode !== rootnode.nodeType) {
                // <mprescriptes>是解析是创建的虚拟节点，不存在子节点
                if (rootnode.firstChild != null) {
                    if (EDMathMlNodeType.TextNode !== rootnode.firstChild.nodeType) {
                        var child = rootnode.firstChild;
                        for (; child != null; child = child.nextSibling) {
                            this.removeDuplicates(child, removevector);
                        }
                    }
                }
            }
        };
        /**
         * @brief getCopyText 获取复制框选节点的mml文本内容
         * @return 返回的结果值，输出为QString
         */
        EDMathMLDocument.prototype.getCopyText = function (SelectedNode) {
            if (SelectedNode === void 0) { SelectedNode = []; }
            if (SelectedNode.length <= 0) {
                SelectedNode = this._vecMouseSelectedNode;
            }
            if (SelectedNode.length <= 0) {
                return '';
            }
            // const doc: Document = new Document();
            var doc = document.implementation.createDocument("", "", null);
            // 创建<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
            var ele = doc.createElement("math");
            ele.setAttribute('display', 'block');
            ele.setAttribute('xmlns', 'http://www.w3.org/1998/Math/MathML');
            doc.appendChild(ele);
            // 将节点数据保存到QDomElement中
            for (var i = 0; i < SelectedNode.length; ++i) {
                var tmp = SelectedNode[i];
                if (tmp) {
                    tmp.saveToForCopy(ele);
                }
            }
            /*
            QFile file( "copy.mml" );
            if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
                return "";

            //将QDom数据保存到tmp.mml文件中
            QTextStream out( &file );
            doc.save(out, 4);
            file.close();

            //zq 特殊符保存为unicode
            //读取tmp.mml文件的文本数据
            if ( !file.open(QIODevice::ReadOnly | QIODevice::Text) )
                return "";
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
            text = text.replace("#x","&#x");
            file.close();*/
            // if( !file.open(QIODevice::WriteOnly | QIODevice::Text) )
            //    return "";
            // QTextStream newout( &file );
            // newout<<text;
            // file.close();
            // 读取tmp.mml文件的文本数据
            // if ( !file.open(QIODevice::ReadOnly | QIODevice::Text) )
            //    return "";
            //
            var copytext = (new XMLSerializer()).serializeToString(doc);
            copytext = copytext.replace(/#x/g, '&#x');
            //导出文本后处理
            EdrawMathDate.EDStatic.g_arrowtext4replace.forEach(function (value, key) {
                var rx = new RegExp(key, 'g');
                copytext = copytext.replace(rx, value);
            });
            // file.close();
            // file.remove();//删除文件
            return copytext;
        };
        /**
         * @brief setPasteText 设置要粘贴的文本内容
         * @param pastetext 想要粘贴的节点mml文本内容
         */
        EDMathMLDocument.prototype.setPasteText = function (pastetext) {
            if (this._doc.rootisEmpty()) {
                return false;
            }
            if (!this._bSelectedPre) {
                if (!this._doc.pasteTextNode(this._mousenode, pastetext, false)) {
                    return false;
                }
            }
            else {
                if (!this._doc.pasteTextNode(this._mousenode, pastetext, true)) {
                    return false;
                }
            }
            this.insertFinished(null, false);
            this.updateSetContent();
            return true;
        };
        /**
         * @brief deletedMouseSelected 删除框选节点
         */
        EDMathMLDocument.prototype.deletedMouseSelected = function () {
            // 删除框选节点
            if (this._vecMouseSelectedNode.length <= 0) {
                return;
            }
            for (var i = this._vecMouseSelectedNode.length - 1; i >= 0; --i) {
                this._mousenode = this._vecMouseSelectedNode[i];
                if (this._mousenode) {
                    var isbracket = false;
                    // console.log(`~~~~deletedMouseSelected`,this._mousenode)
                    if (this._mousenode.parent) {
                        if (this._mousenode.parent.nodeType == EDMathMlNodeType.MrowNode
                            && this._mousenode.parent.noneditable
                            && this._mousenode.nodeType == EDMathMlNodeType.MtextNode
                            && this._mousenode == this._mousenode.parent.firstChild) {
                            console.log("~~~~\u5220\u9664\u62EC\u53F7\u5185<mrow>", this._mousenode);
                            isbracket = true;
                        }
                    }
                    if (!isbracket) {
                        this.deleteMouseNode();
                    }
                    else {
                        this._mousenode = this._mousenode;
                        this._mousepressed = this._mousenode;
                        this._bSelectedPre = false;
                        this._bSelectedPre_presee = this._bSelectedPre;
                    }
                }
            }
            this._vecMouseSelectedNode.splice(0);
        };
        /**
         * @brief updateSetContent 更新文本设置，将导入的mml文本修改为兼容格式，如<mrow></mrow>节点添加矩形显示，添加光标选择等
         */
        EDMathMLDocument.prototype.updateSetContent = function () {
            // saveTo();//保存获取_vecEditedNode
            this._doc.getNodeVector(this._vecEditedNode, this._vecSelectedNode, false); // 更新节点向量
            /*for(let tmp of this._vecEditedNode) {
                console.log(`_vecEditedNode ${tmp.tag}`);
            }
            for(let tmp of this._vecSelectedNode) {
                console.log(`_vecSelectedNode ${tmp.tag}`);
            }*/
            if (this._vecEditedNode.length <= 0 || this._vecSelectedNode.length <= 0) {
                console.log("~~~~updateSetContent return");
                return;
            }
            var node = null;
            // for (let i = 0; i < this._vecSelectedNode.length; ++i) {
            //     node = this._vecSelectedNode[i];
            //     if (node.nodeType === EDMathMlNodeType.MrowNode){
            //         const spec: EDMmlNodeSpec = EDStatic.mmlFindNodeSpec_type( node.parent.nodeType );
            //         if (2 === spec.child_spec || 3 === spec.child_spec) {
            //             const b:boolean[] = [false, false];
            //             node.checkSpecialType_2(b);
            //             if (b[1]) {     
            //                 const ok:boolean = this._doc.ifParentNotMrow(node, true);
            //                 node.parent.updateChildFont();
            //                 // console.log(`~~~~~~spec.child_spec`,node,ok);
            //             }                        
            //         } else if (node.previousSibling) {
            //             if (node.previousSibling.nodeType === EDMathMlNodeType.MunderNode
            //                 || node.previousSibling.nodeType === EDMathMlNodeType.MunderoverNode
            //                 || node.previousSibling.nodeType === EDMathMlNodeType.MsubNode
            //                 || node.previousSibling.nodeType === EDMathMlNodeType.MsubsupNode) {
            //                 const b:boolean[] = [false, false];
            //                 node.checkSpecialType_2(b);
            //                 if (b[1]) {     
            //                     const ok:boolean = this._doc.ifParentNotMrow(node, true);
            //                     node.parent.updateChildFont();
            //                     // console.log(`~~~~~~spec.child_spec`,node,ok);
            //                 }                        
            //             }
            //         }
            //     }
            // }
            for (var i = 0; i < this._vecEditedNode.length; ++i) {
                node = this._vecEditedNode[i];
                // mtext字符串分割
                if (node.nodeType === EDMathMlNodeType.MtextNode) {
                    var mtext = node.firstChild.toTextNode().text;
                    if (mtext.length > 1 && mtext !== 'isNuLL!') {
                        node.firstChild.toTextNode().text = mtext[0];
                        for (var j = mtext.length - 1; j > 0; --j) {
                            this._doc.insertText(node, mtext);
                            if (node.nextSibling) {
                                node.nextSibling.firstChild.toTextNode().text = mtext[j];
                            }
                        }
                    }
                }
                // console.log(`updateSetContent() ${node.tag}`);
                // <mrow></mrow>显示矩形
                if (node.nodeType === EDMathMlNodeType.MtextNode
                    && null == node.nextSibling && null == node.previousSibling) {
                    node.firstChild.toTextNode().text = 'isNuLL!';
                }
                // <msubsup><msub><msup>基值不显示矩形
                if (node.parent.nodeType === EDMathMlNodeType.MrowNode) {
                    var mrow = node.parent;
                    if ((mrow.parent.nodeType === EDMathMlNodeType.MsubsupNode
                        || mrow.parent.nodeType === EDMathMlNodeType.MsubNode
                        || mrow.parent.nodeType === EDMathMlNodeType.MsupNode
                        || mrow.parent.nodeType === EDMathMlNodeType.MmultiscriptsNode)
                        && mrow === mrow.parent.firstChild
                        && node.firstChild.nodeType === EDMathMlNodeType.TextNode) {
                        // && mrow->nodeType() == EDMathMlNodeType::MoNode)//屏蔽 180625 不记得作什么特殊处理而添加的了
                        if (node.firstChild.toTextNode().text === 'isNuLL!') {
                            node.firstChild.toTextNode().text = '';
                        }
                    }
                }
                if (i === this._vecEditedNode.length - 1 && EDMathMlNodeType.MrowNode === node.nodeType) {
                    break;
                }
                if (EDMathMlNodeType.MtextNode !== node.firstSibling.nodeType) {
                    this._doc.insertPreText(node.firstSibling, '');
                    console.log("~~~~insertPreText1");
                }
                else if ('' !== node.firstSibling.firstChild.toTextNode().text
                    && 'isNuLL!' !== node.firstSibling.firstChild.toTextNode().text) {
                    this._doc.insertPreText(node.firstSibling, '');
                    console.log("~~~~insertPreText2");
                }
            }
            this.saveTo(); // 添加完完前置光标 更新
        };
        /**
         * @brief updateDocument 更新_strDocument
         */
        EDMathMLDocument.prototype.updateDocument = function () {
            // QDomDocument doc;
            // QDomElement ele = doc.createElement("math");
            // ele.setAttribute("display","block");
            // ele.setAttribute("xmlns","http://www.w3.org/1998/Math/MathML");
            // doc.appendChild(ele);
            var ele = null;
            var is4copy = false;
            if (!this._pDocToSave.hasChildNodes()) {
                ele = this._pDocToSave.createElement('math');
                ele.setAttribute('display', 'block');
                ele.setAttribute('xmlns', 'http://www.w3.org/1998/Math/MathML');
                ele.setAttribute('mathcolor', this.foregroundColor);
                this._pDocToSave.appendChild(ele);
            }
            else {
                // try {
                //     // 高效存储，比较节点结构，相同部分避免重新生成，某些情况下replaceChild出错，待完善
                //     ele = this._pDocToSave.firstElementChild; // 对应saveto
                //     if (!this._doc.saveTo(ele,is4copy)) {
                //         return;
                //     }
                //     let text: string = (new XMLSerializer()).serializeToString(this._pDocToSave);
                //     text = text.replace(/#x/g, '&#x');
                //     //导出文本后处理
                //     EDStatic.g_arrowtext4replace.forEach((value , key) => {
                //         let rx:RegExp = new RegExp(key, 'g');
                //         text = text.replace(rx, value);
                //     });
                //     this._strDocument = text;
                //     return ;
                // } catch(exception) {
                is4copy = true;
                // 对应saveToForCopy，重新生成存储数据，无错误但低效
                ele = this._pDocToSave.createElement("math");
                ele.setAttribute("display", "block");
                ele.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
                ele.setAttribute('mathcolor', this.foregroundColor);
                this._pDocToSave.replaceChild(ele, this._pDocToSave.firstChild);
                // }
            }
            if (!this._doc.saveTo(ele, is4copy)) {
                return;
            }
            var text = (new XMLSerializer()).serializeToString(this._pDocToSave);
            text = text.replace(/#x/g, '&#x');
            //导出文本后处理
            EdrawMathDate.EDStatic.g_arrowtext4replace.forEach(function (value, key) {
                var rx = new RegExp(key, 'g');
                text = text.replace(rx, value);
            });
            this._strDocument = text;
            // console.log(`updateDocument ${this._strDocument}`);
            // qDebug()<<_strDocument;
        };
        EDMathMLDocument.prototype.renderColor = function () {
            // let str = this._strDocument;
            // this._doc._root_node = null;
            // console.log(this._vecEditedNode["length"]);
            // console.log(str);
            // let noderectf = this._mousenode.deviceRect;
            // const mousepoint: egPoint = new egPoint(noderectf.right(), noderectf.bottom())
            // this.setContent(str);
            // this.mousePress(mousepoint);
            /* console.log(this._strDocument);
            // this.updateDocument();
            this._doc._root_node = null;
            console.log(this._strDocument);
            // this.setContent(this._strDocument);
            this.updateSetContent();
            
            // this._doc.setContent(this._strDocument);
            console.log(this._strDocument);

            return true; */
        };
        return EDMathMLDocument;
    }());
    EdrawMathDate.EDMathMLDocument = EDMathMLDocument;
})(EdrawMathDate || (EdrawMathDate = {}));
