// tslint:disable-next-line:no-namespace
//QT版本中的struct，TS版本中改成class(使用interface也可以)
var EdrawMathDate;
(function (EdrawMathDate) {
    //框架间距，用于解析节点的框架间距
    var FrameSpacing = /** @class */ (function () {
        function FrameSpacing(hor, ver) {
            this.hor = hor;
            this.ver = ver;
        }
        return FrameSpacing;
    }());
    EdrawMathDate.FrameSpacing = FrameSpacing;
    /*
    class EDMml
    {
        mathvariant: MathVariant;
        formtype: FormType;
        colalign: ColAlign;
        rowalign: RowAlign;
        frametype: FrameType;
        symboltype: SymbolType;
        framespacing: FrameSpacing;

        constructor (mathvariant: MathVariant, formtype: FormType, colalign: ColAlign,
            rowalign: RowAlign, frametype: FrameType, symboltype: SymbolType, framespacing: FrameSpacing) {
            this.mathvariant = mathvariant;
            this.formtype = formtype;
            this.colalign = colalign;
            this.rowalign = rowalign;
            this.frametype = frametype;
            this.symboltype = symboltype;
            this.framespacing = framespacing;
        }
    };
    */
    // const int     g_oper_spec_rows         = 9;//操作规格行
    //操作规格数据，是mo节点的数据，主要用于不同符号的特殊化处理，比如是否拉升，布局位置等
    var EDMmlOperSpec = /** @class */ (function () {
        function EDMmlOperSpec(name, form, attributes, stretch_dir, symboltype) {
            this.name = name;
            this.form = form;
            this.attributes = attributes;
            this.stretch_dir = stretch_dir;
            this.symboltype = symboltype;
        }
        return EDMmlOperSpec;
    }());
    EdrawMathDate.EDMmlOperSpec = EDMmlOperSpec;
    //节点规格数据，用于节点的解析，参数设置等
    var EDMmlNodeSpec = /** @class */ (function () {
        function EDMmlNodeSpec(type, tag, type_str, child_spec, child_types, attributes) {
            this.type = type;
            this.tag = tag;
            this.type_str = type_str;
            this.child_spec = child_spec;
            this.child_types = child_types;
            this.attributes = attributes;
        }
        return EDMmlNodeSpec;
    }());
    EdrawMathDate.EDMmlNodeSpec = EDMmlNodeSpec;
    // 撤销、重做之类操作的数据
    var EDSaveData = /** @class */ (function () {
        function EDSaveData(mmltext, mousepoint) {
            this.mmltext = mmltext;
            this.mousepoint = mousepoint;
        }
        return EDSaveData;
    }());
    EdrawMathDate.EDSaveData = EDSaveData;
    // 查找修饰形式结果，在检索g_oper_spec_data数据的时候用到
    var OperSpecSearchResult = /** @class */ (function () {
        function OperSpecSearchResult() {
            this.prefix_form = null;
            this.infix_form = null;
            this.postfix_form = null;
        }
        //获取修饰形式
        OperSpecSearchResult.prototype.getForm = function (form) {
            switch (form) {
                case FormType.PrefixForm:
                    return this.prefix_form;
                case FormType.InfixForm:
                    return this.infix_form;
                case FormType.PostfixForm:
                    return this.postfix_form;
            }
            return null;
        };
        //是否存在某种修饰形式
        OperSpecSearchResult.prototype.haveForm = function (form) {
            return this.getForm(form) != null;
        };
        //新增某种修饰形式
        OperSpecSearchResult.prototype.addForm = function (spec) {
            switch (spec.form) {
                case FormType.PrefixForm:
                    this.prefix_form = spec;
                case FormType.InfixForm:
                    this.infix_form = spec;
                case FormType.PostfixForm:
                    this.postfix_form = spec;
            }
        };
        return OperSpecSearchResult;
    }());
    EdrawMathDate.OperSpecSearchResult = OperSpecSearchResult;
    //水平间隔数值
    var HSpacingValue = /** @class */ (function () {
        function HSpacingValue(name, factor) {
            this.name = name;
            this.factor = factor;
        }
        return HSpacingValue;
    }());
    EdrawMathDate.HSpacingValue = HSpacingValue;
    //垂直间隔数值
    var MathVariantValue = /** @class */ (function () {
        function MathVariantValue(value, mv) {
            this.value = value;
            this.mv = mv;
        }
        return MathVariantValue;
    }());
    EdrawMathDate.MathVariantValue = MathVariantValue;
    //渲染位置，不建议使用
    var EDRenderingPosition = /** @class */ (function () {
        function EDRenderingPosition() {
            this._nodeId = 0;
            this._subPos = 0;
            this._itemRect = new egRect(0, 0, 0, 0);
        }
        return EDRenderingPosition;
    }());
    EdrawMathDate.EDRenderingPosition = EDRenderingPosition;
    /** 添加渲染数据，不建议使用
     * @brief The EDAddRendData class provides some additional data for post calculation of the rendering data  //类为渲染数据的后期计算提供了一些额外的数据
     */
    var EDAddRendData = /** @class */ (function () {
        function EDAddRendData(index, node, bits) {
            if (index === void 0) { index = 0; }
            if (node === void 0) { node = null; }
            if (bits === void 0) { bits = EDRendAdjustBits.Nothing; }
            this._index = index;
            this._node = node;
            this._bits = bits;
        }
        return EDAddRendData;
    }());
    EdrawMathDate.EDAddRendData = EDAddRendData;
    //矩阵单元数据
    var CellSizeData = /** @class */ (function () {
        function CellSizeData() {
            this.col_widths = [];
            this.row_heights = [];
        }
        // 列总宽
        CellSizeData.prototype.colWidthSum = function () {
            // 获取总宽度
            var w = 0.0;
            for (var i = 0; i < this.col_widths.length; ++i) {
                w += this.col_widths[i];
            }
            return w;
        };
        // 行总高
        CellSizeData.prototype.rowHeightSum = function () {
            // 获取总高度
            var h = 0.0;
            for (var i = 0; i < this.row_heights.length; ++i) {
                h += this.row_heights[i];
            }
            return h;
        };
        /**
         * @brief init 初始化函数 重新计算行高列高 使结果值为每列的最大宽度值，每行的高度值
         * @param first_row <mtable>节点的第一个子节点
         */
        CellSizeData.prototype.init = function (first_row) {
            // 重新计算行高列高，使结果值为每列的最大宽度值，每行的高度值
            this.col_widths.splice(0);
            this.row_heights.splice(0);
            var mtr = first_row;
            for (; mtr != null; mtr = mtr.nextSibling) { // 行操作
                if (mtr.nodeType !== EDMathMlNodeType.MtrNode) {
                    console.log("error: not EDMathMlNodeType.MtrNode\n");
                    return;
                }
                var col_cnt = 0;
                var mtd = mtr.firstChild;
                for (; mtd != null; mtd = mtd.nextSibling, ++col_cnt) { // 列操作
                    if (mtr.nodeType !== EDMathMlNodeType.MtrNode) {
                        console.log("error: not EDMathMlNodeType.MtrNode\n");
                        return;
                    }
                    var mtdmr = mtd.myRect;
                    if (col_cnt === this.col_widths.length) {
                        this.col_widths.push(mtdmr.width); // 第一行的每列的宽度值直接添加
                    }
                    else {
                        if (this.col_widths[col_cnt] - mtdmr.width < 0) {
                            this.col_widths[col_cnt] = mtdmr.width; // 第二行起，每列的宽度值与之前的最大值比较并取最大值
                        }
                    }
                }
                this.row_heights.push(mtr.myRect.height);
            }
        };
        /**
         * @brief numCols 获取列数量
         * @return 返回结果值
         */
        CellSizeData.prototype.numCols = function () {
            return this.col_widths.length;
        };
        /**
         * @brief numRows 获取行数量
         * @return 返回结果值
         */
        CellSizeData.prototype.numRows = function () {
            return this.row_heights.length;
        };
        return CellSizeData;
    }());
    EdrawMathDate.CellSizeData = CellSizeData;
    //字体数据
    var EDFont = /** @class */ (function () {
        // 默认字体
        function EDFont(mmlnodetype) {
            if (mmlnodetype === void 0) { mmlnodetype = EDMathMlNodeType.NoneNode; }
            this.mmlnodetype = mmlnodetype;
            this.bold = false;
            if (mmlnodetype === EDMathMlNodeType.MiNode) {
                this.italic = true;
            }
            else {
                this.italic = false;
            }
            this.fontfamily = 'Times New Roman'; // 'arial" "Times New Roman" "Symbol" "Lucida Sans Unicode"
            this._pixelSize = 20;
            this.strikeOutPos = this._pixelSize * 0.5; //0.5
        }
        /**
         * @brief fontstring 导出canvas.font格式的字体信息文本
         */
        EDFont.prototype.fontstring = function () {
            var italicstr = '';
            if (this.italic) {
                italicstr = 'italic';
            }
            var boldstr = '';
            if (this.bold) {
                boldstr = 'bold';
            }
            return "".concat(italicstr, " ").concat(boldstr, " ").concat(this.pixelSize, "px '").concat(this.fontfamily, "','\u5B8B\u4F53'");
            return "".concat(italicstr, " ").concat(boldstr, " ").concat(this.pixelSize, "px/").concat(this.pixelSize, "px ").concat(this.fontfamily, ",'\u5B8B\u4F53'");
            // italic 40px/40px Times New Roman,宋体
        };
        Object.defineProperty(EDFont.prototype, "pixelSize", {
            /**
             * @brief pixelSize 获取字体大小
             */
            get: function () {
                return this._pixelSize;
            },
            /**
             * @brief pixelSize 设置字体大小
             */
            set: function (pixelsize) {
                if (pixelsize > 0) {
                    this._pixelSize = pixelsize;
                    this.strikeOutPos = this.pixelSize * 0.5;
                }
                else {
                    console.log('error: pixelsize <= 0 ! \n');
                }
            },
            enumerable: false,
            configurable: true
        });
        return EDFont;
    }());
    EdrawMathDate.EDFont = EDFont;
})(EdrawMathDate || (EdrawMathDate = {}));
