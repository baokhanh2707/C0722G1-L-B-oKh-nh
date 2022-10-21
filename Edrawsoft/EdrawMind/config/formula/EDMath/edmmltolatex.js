// MML文本格式转Latex文本格式的类
// 使用mmlFromStr进行文本的转换
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDMmltoLatexRules = /** @class */ (function () {
        function EDMmltoLatexRules(strMmlNodeName, strLatexText, strStackPushText, nOperType, bIsOtherItem, nMaxChild, listChildLatexText, paramOrder) {
            this.strMmlNodeName = strMmlNodeName;
            this.strLatexText = strLatexText;
            this.strStackPushText = strStackPushText;
            this.nOperType = nOperType;
            this.bIsOtherItem = bIsOtherItem;
            this.nMaxChild = nMaxChild;
            this.listChildLatexText = listChildLatexText;
            this.paramOrder = paramOrder;
        }
        return EDMmltoLatexRules;
    }());
    var EDcharInfo = /** @class */ (function () {
        function EDcharInfo(strLatexList, cutLength, isExist, listChildLatexText, paramOrder) {
            this.strLatexList = strLatexList;
            this.cutLength = cutLength;
            this.isExist = isExist;
            this.listChildLatexText = listChildLatexText;
            this.paramOrder = paramOrder;
        }
        return EDcharInfo;
    }());
    var SpecialCharacter = /** @class */ (function () {
        function SpecialCharacter(specialCharacter, charInfo) {
            this.specialCharacter = specialCharacter;
            this.charInfo = charInfo;
        }
        return SpecialCharacter;
    }());
    // tslint:disable-next-line:max-classes-per-file
    var EDMMLtoLatex = /** @class */ (function () {
        // private _mmldir: string;
        // private _latexdir: string;
        // private _transtext: boolean; // false转换文件 true转换文本
        function EDMMLtoLatex() {
            this._mathMl = [];
            this._latex = '';
            // this._mmldir = '';
            // this._latexdir = '';
            // this._transtext = false;
        }
        EDMMLtoLatex.initRules = function () {
            var mtableChildLatexText = [
                '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n',
                '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n',
                '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n',
                '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '\\\\\n', '',
            ];
            var mtrChildLatexText = [];
            var mtablemtrParamOrder = [];
            var mathmrowChildLatexText = [];
            var mathmrowParamOrder = [];
            for (var i = 0; i < EDMMLtoLatex.maxchild; i++) {
                mtrChildLatexText.push('&');
                mtablemtrParamOrder.push(i);
                mathmrowChildLatexText.push('');
                mathmrowParamOrder.push(i);
            }
            mtrChildLatexText[EDMMLtoLatex.maxchild - 1] = '';
            var rules = [];
            //                              strMmlNodeName       strLatexText                  strMmlStackPushText     nOperType  bIsOtherItem  nMaxChild  listChildLatexText              paramOrder
            //    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            rules.push(new EDMmltoLatexRules('math', '\\[', '\\]', 1, false, 999, mathmrowChildLatexText, mathmrowParamOrder));
            rules.push(new EDMmltoLatexRules('mrow', '{', '}', 1, false, 999, mathmrowChildLatexText, mathmrowParamOrder));
            rules.push(new EDMmltoLatexRules('msqrt', '\\sqrt{', '}', 1, false, 1, [''], [0]));
            rules.push(new EDMmltoLatexRules('msub', '\\mathop{', '}', 1, false, 2, ['}\\nolimits_{', ''], [0, 1]));
            rules.push(new EDMmltoLatexRules('msup', '\\mathop{', '}', 1, false, 2, ['}\\nolimits^{', ''], [0, 1]));
            rules.push(new EDMmltoLatexRules('msubsup', '\\mathop{', '}', 1, false, 3, ['}\\nolimits_{', '}^{', ''], [0, 1, 2]));
            rules.push(new EDMmltoLatexRules('munder', '\\mathop{', '}', 1, false, 2, ['}\\limits_{', ''], [0, 1]));
            rules.push(new EDMmltoLatexRules('mover', '\\mathop{', '}', 1, false, 2, ['}\\limits^{', ''], [0, 1]));
            rules.push(new EDMmltoLatexRules('munderover', '\\mathop{', '}', 1, false, 3, ['}\\limits_{', '}^{', ''], [0, 1, 2]));
            rules.push(new EDMmltoLatexRules('mfrac', '\\frac{', '}', 1, false, 2, ['}{', ''], [0, 1]));
            rules.push(new EDMmltoLatexRules('mroot', '\\sqrt[', '}', 1, false, 2, [']{', ''], [1, 0]));
            rules.push(new EDMmltoLatexRules('mmultiscripts', '{}_', '', 1, false, 5, ['^', '', '_', '^', ''], [3, 4, 0, 1, 2]));
            rules.push(new EDMmltoLatexRules('none', '{ ', '}', 0, false, 0, [''], []));
            rules.push(new EDMmltoLatexRules('mtext', '\\text{', '}', 0, false, 0, [''], []));
            rules.push(new EDMmltoLatexRules('mn', '', '', 0, false, 0, [''], []));
            rules.push(new EDMmltoLatexRules('mi', '', '', 0, false, 0, [''], []));
            rules.push(new EDMmltoLatexRules('mo', '', '', 0, false, 0, [''], []));
            rules.push(new EDMmltoLatexRules('mtable', '\\begin{array}{*{20}{c}}\n', '\n\\end{array}', 1, false, 31, mtableChildLatexText, mtablemtrParamOrder));
            rules.push(new EDMmltoLatexRules('mtr', '', '', 1, false, 31, mtrChildLatexText, mtablemtrParamOrder));
            rules.push(new EDMmltoLatexRules('mtd', '', '', 1, false, 1, [''], [0]));
            return rules;
        }; // 初始化值查找
        EDMMLtoLatex.initParamNodename = function () {
            var paramNodename = [];
            paramNodename.push('math');
            paramNodename.push('mrow');
            paramNodename.push('msqrt');
            paramNodename.push('msub');
            paramNodename.push('msup');
            paramNodename.push('msubsup');
            paramNodename.push('munder');
            paramNodename.push('mover');
            paramNodename.push('munderover');
            paramNodename.push('mfrac');
            paramNodename.push('mroot');
            paramNodename.push('mmultiscripts');
            paramNodename.push('mtable');
            paramNodename.push('mtr');
            paramNodename.push('mtd');
            return paramNodename;
        }; // 需要得到参数的节点
        EDMMLtoLatex.initMergeParamNodename = function () {
            return;
        }; // 常规合并参数的节点
        EDMMLtoLatex.initCharacter = function () {
            var character = new Map();
            //todo:完善unicode对应的latex文本
            //                mathml         latex(找不到对应为"  ")
            // -------------------------------------------------------------
            character.set('2208', ' \\in ');
            character.set('2209', ' \\notin ');
            character.set('222A', ' \\cup ');
            character.set('2229', ' \\cap ');
            character.set('22C3', ' \\bigcup ');
            character.set('22C2', ' \\bigcap ');
            character.set('2282', ' \\subset ');
            character.set('2283', ' \\supset ');
            character.set('2286', ' \\subseteq ');
            character.set('2287', ' \\supseteq ');
            character.set('2284', ' \\not\\subset ');
            character.set('2205', ' \\emptyset ');
            character.set('2234', ' \\therefore ');
            character.set('2235', ' \\because ');
            character.set('220D', ' \\backepsilon ');
            character.set('2203', ' \\exists ');
            character.set('2200', ' \\forall ');
            character.set('00AC', ' \\neg ');
            character.set('2227', ' \\wedge ');
            character.set('2228', ' \\vee ');
            character.set('2194', ' \\leftrightarrow ');
            character.set('2192', ' \\to ');
            character.set('2190', ' \\leftarrow ');
            character.set('2195', ' \\updownarrow ');
            character.set('2191', ' \\uparrow ');
            character.set('2193', ' \\downarrow ');
            character.set('21D4', ' \\Leftrightarrow ');
            character.set('21D2', ' \\Rightarrow ');
            character.set('21D0', ' \\Leftarrow ');
            character.set('21D5', ' \\Updownarrow ');
            character.set('21D1', ' \\Uparrow ');
            character.set('21D3', ' \\Downarrow ');
            character.set('2922', '  ');
            character.set('2197', ' \\nearrow ');
            character.set('2199', ' \\swarrow ');
            character.set('2921', '  ');
            character.set('2198', ' \\searrow ');
            character.set('2196', ' \\nwarrow ');
            character.set('21C4', ' \\rightleftarrows ');
            character.set('2942', '  ');
            character.set('2944', '  ');
            character.set('21CC', ' \\rightleftharpoons ');
            character.set('21A6', ' \\mapsto ');
            character.set('21B5', '  ');
            character.set('00B1', ' \\pm ');
            character.set('2213', ' \\mp ');
            character.set('00D7', ' \\times ');
            character.set('2217', ' \\ast ');
            character.set('00F7', ' \\div ');
            character.set('2295', ' \\oplus ');
            character.set('2297', ' \\otimes ');
            character.set('2299', ' \\odot ');
            character.set('22C5', ' \\cdot ');
            character.set('00B7', ' \\cdot ');
            character.set('2022', ' \\bullet ');
            character.set('2218', ' \\circ ');
            character.set('2329', ' \\langle ');
            character.set('232A', ' \\rangle ');
            character.set('301A', ' \\llbracket ');
            character.set('301B', ' \\rrbracket ');
            character.set('0391', ' {\\rm A} ');
            character.set('0392', ' {\\rm B} ');
            character.set('03A7', ' {\\rm X} ');
            character.set('0394', ' \\Delta ');
            character.set('0395', ' {\\rm E} ');
            character.set('03A6', ' \\Phi ');
            character.set('0393', ' \\Gamma ');
            character.set('0397', ' {\\rm H} ');
            character.set('0399', ' {\\rm I} ');
            character.set('039A', ' {\\rm K} ');
            character.set('039B', ' \\Lambda ');
            character.set('039C', ' {\\rm M} ');
            character.set('039D', ' {\\rm N} ');
            character.set('039F', ' {\\rm O} ');
            character.set('03A0', ' \\Pi ');
            character.set('0398', ' \\Theta ');
            character.set('03A1', ' {\\rm P} ');
            character.set('03A3', ' \\Sigma ');
            character.set('03A4', ' {\\rm T} ');
            character.set('03D2', ' \\Upsilon ');
            character.set('03A9', ' \\Omega ');
            character.set('039E', ' \\Xi ');
            character.set('03A8', ' \\Psi ');
            character.set('0396', ' {\\rm Z} ');
            character.set('03B1', ' \\alpha ');
            character.set('03B2', ' \\beta ');
            character.set('03C7', ' \\chi ');
            character.set('03B4', ' \\delta ');
            character.set('03B5', ' \\varepsilon ');
            character.set('03D5', ' \\phi ');
            character.set('03C6', ' \\varphi ');
            character.set('03B3', ' \\gamma ');
            character.set('03B7', ' \\eta ');
            character.set('03B9', ' \\iota ');
            character.set('03BA', ' \\kappa ');
            character.set('03BB', ' \\lambda ');
            character.set('03BC', ' \\mu ');
            character.set('03BD', ' \\nu ');
            character.set('03BF', ' o ');
            character.set('03C0', ' \\pi ');
            character.set('03D6', ' \\varpi ');
            character.set('03B8', ' \\theta ');
            character.set('03D1', ' \\vartheta ');
            character.set('03C1', ' \\rho ');
            character.set('03C3', ' \\sigma ');
            character.set('03C2', ' \\varsigma ');
            character.set('03C4', ' \\tau ');
            character.set('03C5', ' \\upsilon ');
            character.set('03C9', ' \\omega ');
            character.set('03BE', ' \\xi ');
            character.set('03C8', ' \\psi ');
            character.set('03B6', ' \\zeta ');
            character.set('2202', ' \\partial ');
            character.set('2118', ' \\wp ');
            character.set('2111', ' \\Im ');
            character.set('211C', ' \\Re ');
            character.set('2135', ' \\aleph ');
            character.set('211D', ' \\mathbb{R} ');
            character.set('2124', ' \\mathbb{Z} ');
            character.set('2102', ' \\mathbb{C} ');
            character.set('211A', ' \\mathbb{Q} ');
            character.set('2115', ' \\mathbb{N} ');
            character.set('221E', ' \\infty ');
            character.set('210F', ' \\hbar ');
            character.set('019B', '  ');
            character.set('2113', ' \\ell ');
            character.set('2020', ' \\dagger ');
            character.set('2207', ' \\nabla ');
            character.set('03A9', ' \\Omega ');
            character.set('2127', ' \\mho ');
            character.set('22C4', ' \\diamond ');
            character.set('2211', ' \\sum ');
            character.set('220F', ' \\prod ');
            character.set('2210', ' \\coprod ');
            character.set('222B', ' \\int ');
            character.set('00B0', ' \\circ ');
            character.set('2220', ' \\angle ');
            character.set('2221', ' \\measuredangle ');
            character.set('2222', ' \\sphericalangle ');
            character.set('22A5', ' \\perp ');
            character.set('2225', ' \\parallel ');
            character.set('25B3', ' \\bigtriangleup ');
            character.set('25A1', ' \\square ');
            character.set('25AD', '  ');
            character.set('25B1', '  ');
            character.set('25CB', ' \\bigcirc ');
            character.set('2264', ' \\le ');
            character.set('2265', ' \\ge ');
            character.set('226A', ' \\ll ');
            character.set('226B', ' \\gg ');
            character.set('227A', ' \\prec ');
            character.set('227B', ' \\succ ');
            character.set('22B2', ' \\triangleleft ');
            character.set('22B3', ' \\triangleright ');
            character.set('223C', ' \\sim ');
            character.set('2248', ' \\approx ');
            character.set('2243', ' \\simeq ');
            character.set('2245', ' \\cong ');
            character.set('2260', ' \\neq ');
            character.set('2261', ' \\equiv ');
            character.set('225C', ' \\triangleq ');
            character.set('2259', '  ');
            character.set('2250', ' \\doteq ');
            character.set('221D', ' \\propto ');
            character.set('2026', ' \\ldots ');
            character.set('22EF', ' \\cdots ');
            character.set('22EE', ' \\vdots ');
            character.set('22F0', ' \\iddots ');
            character.set('22F1', ' \\ddots ');
            character.set('222C', ' \\iint ');
            character.set('222D', ' \\iiint ');
            character.set('2A0C', ' \\iiiint ');
            character.set('222E', ' \\oint ');
            character.set('222F', ' \\varoiint ');
            character.set('2230', '  ');
            character.set('2233', ' \\ointctrclockwise ');
            character.set('2232', ' \\ointclockwise ');
            character.set('007B', ' \\{ ');
            character.set('007D', ' \\} ');
            character.set('230A', ' \\lfloor ');
            character.set('230B', ' \\rfloor ');
            character.set('2016', ' \\Vert ');
            character.set('2308', ' \\lceil ');
            character.set('2309', ' \\rceil ');
            character.set('23B4', '  ');
            character.set('005F', ' \\_ ');
            character.set('03F5', ' \\epsilon ');
            character.set('03F1', ' \\varrho ');
            character.set('03A5', ' \\Upsilon ');
            character.set('003C', ' < ');
            character.set('003E', ' > ');
            character.set('2AAF', ' \\preceq ');
            character.set('227D', ' \\succeq ');
            character.set('228F', ' \\sqsubset ');
            character.set('2290', ' \\sqsupset ');
            character.set('2291', ' \\sqsubseteq ');
            character.set('2292', ' \\sqsupseteq ');
            character.set('22C8', ' \\bowtie ');
            character.set('220B', ' \\ni ');
            character.set('22A2', ' \\vdash ');
            character.set('22A3', ' \\dashv ');
            character.set('22A8', ' \\models ');
            character.set('2223', ' \\mid ');
            character.set('2323', ' \\smile ');
            character.set('2322', ' \\frown ');
            character.set('224D', ' \\asymp ');
            character.set('2216', ' \\setminus ');
            character.set('22C6', ' \\star ');
            character.set('2294', ' \\sqcup ');
            character.set('2A06', ' \\bigsqcup '); // 新增
            character.set('2293', ' \\sqcap ');
            character.set('2296', ' \\ominus ');
            character.set('2298', ' \\oslash ');
            character.set('228E', ' \\uplus ');
            character.set('2A04', ' \\biguplus '); // 新增
            character.set('25EF', ' \\bigcirc ');
            character.set('25BD', ' \\bigtriangledown ');
            character.set('2021', ' \\ddagger ');
            character.set('22B4', ' \\trianglelefteq ');
            character.set('22B5', ' \\trianglerighteq ');
            character.set('2240', ' \\wr ');
            character.set('22C1', ' \\bigvee ');
            character.set('22C0', ' \\bigwedge ');
            character.set('2A00', ' \\bigodot ');
            character.set('2A01', ' \\bigoplus ');
            character.set('2A02', ' \\bigotimes ');
            character.set('27F5', ' \\longleftarrow ');
            character.set('27F6', ' \\longrightarrow ');
            character.set('27F7', ' \\longleftrightarrow ');
            character.set('27F8', ' \\Longleftarrow ');
            character.set('27F9', ' \\Longrightarrow ');
            character.set('27FA', ' \\Longleftrightarrow ');
            character.set('27FC', ' \\longmapsto ');
            character.set('21A9', ' \\hookleftarrow ');
            character.set('21AA', ' \\hookrightarrow ');
            character.set('21BC', ' \\leftharpoonup ');
            character.set('21C0', ' \\rightharpoonup ');
            character.set('21BD', ' \\leftharpoondown ');
            character.set('21C1', ' \\rightharpoondown ');
            // character.set( "007C",        " \\vert "                  );
            character.set('005C', ' \\backslash ');
            character.set('3014', ' \\lgroup ');
            character.set('3015', ' \\rgroup ');
            character.set('23B0', ' \\lmoustache ');
            character.set('23B1', ' \\rmoustache ');
            character.set('23D0', ' \\arrowvert ');
            character.set('0131', ' \\imath ');
            character.set('0237', ' \\jmath ');
            character.set('211C', ' \\Re ');
            character.set('2032', ' \\prime ');
            character.set('25CA', ' \\Diamond ');
            character.set('22A4', ' \\top ');
            character.set('221A', ' \\surd ');
            character.set('2662', ' \\diamondsuit ');
            character.set('2661', ' \\heartsuit ');
            character.set('2663', ' \\clubsuit ');
            character.set('2660', ' \\spadesuit ');
            character.set('266D', ' \\flat ');
            character.set('266E', ' \\natural ');
            character.set('266F', ' \\sharp ');
            character.set('00A7', ' \\S ');
            character.set('00B6', ' \\P ');
            character.set('00A3', ' \\pounds ');
            character.set('231C', ' \\ulcorner ');
            character.set('231D', ' \\urcorner ');
            character.set('231E', ' \\llcorner ');
            character.set('231F', ' \\lrcorner ');
            character.set('03DC', ' \\digamma ');
            character.set('03F0', ' \\varkappa ');
            character.set('2136', ' \\beth ');
            character.set('2138', ' \\daleth ');
            character.set('2137', ' \\gimel ');
            character.set('22D6', ' \\lessdot ');
            character.set('22D7', ' \\gtrdot ');
            character.set('2251', ' \\doteqdot ');
            character.set('2A7D', ' \\leqslant ');
            character.set('2A7E', ' \\geqslant ');
            character.set('2253', ' \\risingdotseq ');
            character.set('22DC', ' \\eqslantless ');
            character.set('22DD', ' \\eqslantgtr ');
            character.set('2252', ' \\fallingdotseq ');
            character.set('2266', ' \\leqq ');
            character.set('2267', ' \\geqq ');
            character.set('2256', ' \\eqcirc ');
            character.set('22D8', ' \\lll ');
            character.set('22D9', ' \\ggg ');
            character.set('2257', ' \\circeq ');
            character.set('2272', ' \\lesssim ');
            character.set('2273', ' \\gtrsim ');
            character.set('2A85', ' \\lessapprox ');
            character.set('2A86', ' \\gtrapprox ');
            character.set('224F', ' \\bumpeq ');
            character.set('2276', ' \\lessgtr ');
            character.set('2277', ' \\gtrless ');
            character.set('224E', ' \\Bumpeq ');
            character.set('22DA', ' \\lesseqgtr ');
            character.set('22DB', ' \\gtreqless ');
            character.set('2A8B', ' \\lesseqqgtr ');
            character.set('2A8C', ' \\gtreqqless ');
            character.set('227C', ' \\preccurlyeq ');
            character.set('224A', ' \\approxeq ');
            character.set('22DE', ' \\curlyeqprec ');
            character.set('22DF', ' \\curlyeqsucc ');
            character.set('223D', ' \\backsim ');
            character.set('227E', ' \\precsim ');
            character.set('227F', ' \\succsim ');
            character.set('22CD', ' \\backsimeq ');
            character.set('2AB7', ' \\precapprox ');
            character.set('2AB8', ' \\succapprox ');
            character.set('2AC5', ' \\subseteqq ');
            character.set('2AC6', ' \\supseteqq ');
            character.set('22A9', ' \\Vdash ');
            character.set('22D0', ' \\Subset ');
            character.set('22D1', ' \\Supset ');
            character.set('22AA', ' \\Vvdash ');
            character.set('226C', ' \\between ');
            character.set('22D4', ' \\pitchfork ');
            character.set('25C0', ' \\blacktriangleleft ');
            character.set('25B6', ' \\blacktriangleright ');
            character.set('21E0', ' \\dashleftarrow ');
            character.set('21E2', ' \\dashrightarrow ');
            character.set('22B8', ' \\multimap ');
            character.set('21C7', ' \\leftleftarrows ');
            character.set('21C9', ' \\rightrightarrows ');
            character.set('21C8', ' \\upuparrows ');
            character.set('21C6', ' \\leftrightarrows ');
            character.set('21CA', ' \\downdownarrows ');
            character.set('21DA', ' \\Lleftarrow ');
            character.set('21DB', ' \\Rrightarrow ');
            character.set('21BF', ' \\upharpoonleft ');
            character.set('219E', ' \\twoheadleftarrow ');
            character.set('21A0', ' \\twoheadrightarrow ');
            character.set('21BE', ' \\upharpoonright ');
            character.set('21A2', ' \\leftarrowtail ');
            character.set('21A3', ' \\rightarrowtail ');
            character.set('21C3', ' \\downharpoonleft ');
            character.set('21CB', ' \\leftrightharpoons ');
            character.set('21C2', ' \\downharpoonright ');
            character.set('21B0', ' \\Lsh ');
            character.set('21B1', ' \\Rsh ');
            character.set('21DD', ' \\rightsquigarrow ');
            character.set('21AB', ' \\looparrowleft ');
            character.set('21AC', ' \\looparrowright ');
            character.set('21AD', ' \\leftrightsquigarrow ');
            character.set('21B6', ' \\curvearrowleft ');
            character.set('21B7', ' \\curvearrowright ');
            character.set('21BA', ' \\circlearrowleft ');
            character.set('21BB', ' \\circlearrowright ');
            character.set('226E', ' \\nless ');
            character.set('226F', ' \\ngtr ');
            character.set('2A87', ' \\lneq ');
            character.set('2A88', ' \\gneq ');
            character.set('2270', ' \\nleq ');
            character.set('2271', ' \\ngeq ');
            character.set('E016', ' \\nsubseteqq ');
            character.set('E018', ' \\nsupseteqq ');
            character.set('2268', ' \\lneqq ');
            character.set('2269', ' \\gneqq ');
            character.set('2224', ' \\nmid ');
            character.set('2226', ' \\nparallel ');
            character.set('22E6', ' \\lnsim ');
            character.set('22E7', ' \\gnsim ');
            character.set('2A89', ' \\lnapprox ');
            character.set('2A8A', ' \\gnapprox ');
            character.set('2241', ' \\nsim ');
            character.set('2280', ' \\nprec ');
            character.set('2281', ' \\nsucc ');
            character.set('2247', ' \\ncong ');
            character.set('22E0', ' \\npreceq ');
            character.set('22E1', ' \\nsucceq ');
            character.set('22AC', ' \\nvdash ');
            character.set('2AB5', ' \\precneqq ');
            character.set('2AB6', ' \\succneqq ');
            character.set('22AD', ' \\nvDash ');
            character.set('22E8', ' \\precnsim ');
            character.set('22E9', ' \\succnsim ');
            character.set('22AE', ' \\nVdash ');
            character.set('2AB9', ' \\precnapprox ');
            character.set('2ABA', ' \\succnapprox ');
            character.set('22AF', ' \\nVDash ');
            character.set('228A', ' \\subsetneq ');
            character.set('228B', ' \\supsetneq ');
            character.set('22EA', ' \\ntriangleleft ');
            character.set('2288', ' \\nsubseteq ');
            character.set('2289', ' \\nsupseteq ');
            character.set('22EB', ' \\ntriangleright ');
            character.set('22EC', ' \\ntrianglelefteq ');
            character.set('2ACB', ' \\subsetneqq ');
            character.set('2ACC', ' \\supsetneqq ');
            character.set('22ED', ' \\ntrianglerighteq ');
            character.set('219A', ' \\nleftarrow ');
            character.set('219B', ' \\nrightarrow ');
            character.set('21AE', ' \\nleftrightarrow ');
            character.set('21CD', ' \\nLeftarrow ');
            character.set('21CF', ' \\nRightarrow ');
            character.set('21CE', ' \\nLeftrightarrow ');
            character.set('2214', ' \\dotplus ');
            character.set('22BA', ' \\intercal ');
            character.set('22C9', ' \\ltimes ');
            character.set('22CA', ' \\rtimes ');
            character.set('22C7', ' \\divideontimes ');
            character.set('22D3', ' \\Cup ');
            character.set('22D2', ' \\Cap ');
            character.set('22BB', ' \\veebar ');
            character.set('22BC', ' \\barwedge ');
            character.set('2306', ' \\doublebarwedge ');
            character.set('229E', ' \\boxplus ');
            character.set('229F', ' \\boxminus ');
            character.set('22A0', ' \\boxtimes ');
            character.set('22A1', ' \\boxdot ');
            character.set('229A', ' \\circledcirc ');
            character.set('22CB', ' \\leftthreetimes ');
            character.set('22CC', ' \\rightthreetimes ');
            character.set('229B', ' \\circledast ');
            character.set('22CE', ' \\curlyvee ');
            character.set('22CF', ' \\curlywedge ');
            character.set('25A0', ' \\blacksquare ');
            character.set('24C8', ' \\circledS ');
            character.set('25B5', ' \\vartriangle ');
            character.set('25B2', ' \\blacktriangle ');
            character.set('2201', ' \\complement ');
            character.set('25BC', ' \\blacktriangledown ');
            character.set('2141', ' \\Game ');
            character.set('2666', ' \\blacklozenge ');
            character.set('2605', ' \\bigstar ');
            character.set('2571', ' \\diagup ');
            character.set('2572', ' \\diagdown ');
            character.set('2035', ' \\backprime ');
            character.set('2204', ' \\nexists ');
            character.set('2132', ' \\Finv ');
            character.set('00F0', ' \\eth ');
            character.set('2212', ' - ');
            character.set('2033', ' \'\' ');
            //    character.insert( "",        "  ");
            return character;
        }; // 一般字符；key：mathml格式的16进制 valye：latex格式
        EDMMLtoLatex.initSpecialCharacter = function () {
            var specialCharacter = new Map();
            var mover = [];
            //             mathml                       strLatexList                                              cutLength           isExist           listChildLatexText          paramOrder
            // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            mover.push(new SpecialCharacter('02DC', new EDcharInfo(['', ' \\widetilde '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('005E', new EDcharInfo(['', ' \\widehat '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('00AF', new EDcharInfo(['', ' \\overline '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('2192', new EDcharInfo([' \\xrightarrow ', ' \\overrightarrow '], 8, true, ['', ''], [[0, 1], [1, 0]])));
            mover.push(new SpecialCharacter('2190', new EDcharInfo([' \\xleftarrow ', ' \\overleftarrow '], 8, true, ['', ''], [[0, 1], [1, 0]])));
            mover.push(new SpecialCharacter('2194', new EDcharInfo(['', ' \\overleftrightarrow '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('02C7', new EDcharInfo(['', ' \\check '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('00B4', new EDcharInfo(['', ' \\acute '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('0060', new EDcharInfo(['', ' \\grave '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('02D9', new EDcharInfo(['', ' \\dot '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('00A8', new EDcharInfo(['', ' \\ddot '], 8, true, ['', ''], [[], [1, 0]])));
            mover.push(new SpecialCharacter('2323', new EDcharInfo(['', ' \\breve '], 8, true, ['', ''], [[], [1, 0]])));
            specialCharacter.set('mover', mover);
            var munder = [];
            //             mathml                       strLatexList                                              cutLength           isExist           listChildLatexText          paramOrder
            // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            munder.push(new SpecialCharacter('005F', new EDcharInfo(['', ' \\underline '], 8, true, ['', ''], [[], [1, 0]])));
            munder.push(new SpecialCharacter('2192', new EDcharInfo(['', ' \\underrightarrow '], 8, true, ['', ''], [[], [1, 0]])));
            munder.push(new SpecialCharacter('2190', new EDcharInfo(['', ' \\underleftarrow '], 8, true, ['', ''], [[], [1, 0]])));
            munder.push(new SpecialCharacter('2194', new EDcharInfo(['', ' \\underleftrightarrow '], 8, true, ['', ''], [[], [1, 0]])));
            specialCharacter.set('munder', munder);
            var munderover = [];
            //                  mathml                       strLatexList                                          cutLength           isExist          listChildLatexText          paramOrder
            // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            munderover.push(new SpecialCharacter('2192', new EDcharInfo([' \\xrightarrow ', '', ''], 8, true, ['[', ']', ''], [[0, 1, 2], [], []])));
            munderover.push(new SpecialCharacter('2190', new EDcharInfo([' \\xleftarrow ', '', ''], 8, true, ['[', ']', ''], [[0, 1, 2], [], []])));
            specialCharacter.set('munderover', munderover);
            return specialCharacter;
        }; // key：标签 value：{key：mathml格式的16进制 valye：latex格式+位置}
        EDMMLtoLatex.initCharMatch = function () {
            var charMatch = new Map();
            charMatch.set('(', ')');
            charMatch.set(')', '');
            charMatch.set(' \\{ ', ' \\} ');
            charMatch.set(' \\} ', '');
            charMatch.set('[', ']');
            charMatch.set(']', '');
            charMatch.set('|', '|');
            charMatch.set(' \\lfloor ', ' \\rfloor ');
            charMatch.set(' \\rfloor ', '');
            charMatch.set(' \\lceil ', ' \\rceil ');
            charMatch.set(' \\rceil ', '');
            charMatch.set(' \\langle ', ' \\rangle ');
            charMatch.set(' \\rangle ', '');
            charMatch.set(' \\Vert ', ' \\Vert ');
            // charMatch.insert( "","");
            return charMatch;
        }; // 括号匹配  key:括号 value: (key为左括号value为与其相对应的右括号、否则为"")
        EDMMLtoLatex.initFunctionSymbol = function () {
            var functionSymbol = new Map();
            // -------------------functionName-------------Latex-----------
            functionSymbol.set('ln', ' \\ln ');
            functionSymbol.set('lg', ' \\lg ');
            functionSymbol.set('log', ' \\log ');
            functionSymbol.set('lim', ' \\lim ');
            functionSymbol.set('sin', ' \\sin ');
            functionSymbol.set('cos', ' \\cos ');
            functionSymbol.set('tan', ' \\tan ');
            functionSymbol.set('cot', ' \\cot ');
            functionSymbol.set('sec', ' \\sec ');
            functionSymbol.set('csc', ' \\csc ');
            functionSymbol.set('exp', ' \\exp ');
            functionSymbol.set('arcsin', ' \\arcsin ');
            functionSymbol.set('arccos', ' \\arccos ');
            functionSymbol.set('arctan', ' \\arctan ');
            functionSymbol.set('arccot', ' \\arccot ');
            functionSymbol.set('sinh', ' \\sinh ');
            functionSymbol.set('cosh', ' \\cosh ');
            functionSymbol.set('tanh', ' \\tanh ');
            functionSymbol.set('coth', ' \\coth ');
            functionSymbol.set('limsup', ' \\limsup ');
            functionSymbol.set('liminf', ' \\liminf ');
            functionSymbol.set('max', ' \\max ');
            functionSymbol.set('min', ' \\min ');
            functionSymbol.set('inf', ' \\inf ');
            functionSymbol.set('sup', ' \\sup ');
            functionSymbol.set('ker', ' \\ker ');
            functionSymbol.set('deg', ' \\deg ');
            functionSymbol.set('gcd', ' \\gcd ');
            functionSymbol.set('Pr', ' \\Pr ');
            functionSymbol.set('det', ' \\det ');
            functionSymbol.set('hom', ' \\hom ');
            functionSymbol.set('arg', ' \\arg ');
            functionSymbol.set('dim', ' \\dim ');
            functionSymbol.set('mod', ' \\bmod ');
            // functionSymbol.insert( "","");
            return functionSymbol;
        }; // chb新增 函数符号 key:数学函数名称 value:对应的latex文本
        /**
         * @brief mmlFromFile mml转latex
         * @param mmlFile mml格式文件的路径
         * @param latex latex格式文件的路径
         * @return 转换是否成功
         */
        EDMMLtoLatex.prototype.mmlFromFile = function (mmlFile, latexFile) {
            /* QT版本
            //打开mml格式的文件
            QFile file(mmlFile);
            if (!file.open(QFile::ReadOnly))
                return false;

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

            bool flag = readMML(text);

            if(flag){
                //保存latex格式
                QFile file2(latexFile);
                if (!file2.open(QIODevice::WriteOnly))
                    return false;

                QTextStream  out2(&file2);

                out2 << _latex;
                file2.close();
            }

            return flag;*/
            return false;
        };
        /**
         * @brief mmlFromStr mml转latex
         * @param mml mml文本
         * @param latex latex文本
         * @return 转换是否成功
         */
        EDMMLtoLatex.prototype.mmlFromStr = function (mml) {
            var flag = this.readMML(mml);
            if (flag) {
                return this._latex;
            }
            return '';
        };
        /*
        setFileDir(mmldir:string, latexdir:string, transtext:boolean = false): void {
            this._transtext = transtext;
            this._mmldir = mmldir;
            this._latexdir = latexdir;
        }*/
        /**
         * @brief toLatex 解析MML格式转化为Latex格式
         * @param parent Dom树的节点
         */
        EDMMLtoLatex.prototype.toLatex = function (parent) {
            var otherItem = true; // 对应EDMmltoLatexRules的bIsOtherItem
            var tolatxtindex = -1;
            var mapRulesIndex = new Map(); // 节点名对应的rules索引值，配合以下map使用
            var mapNameToInt = new Map(); // 替代原来的int msub等
            var mapNameToList = new Map(); // 替代原来的QString sub[2]等
            var rules = EDMMLtoLatex.initRules();
            for (var i = 0; i < rules.length; i++) {
                if (parent.nodeName === rules[i].strMmlNodeName) {
                    var nodename = rules[i].strMmlNodeName;
                    mapRulesIndex.set(nodename, i);
                    var arrstr = [];
                    for (var j = 0; j < rules[i].nMaxChild; j++) {
                        arrstr.push(''); // 初始化 对应原来的 QString msub[2]操作
                    }
                    mapNameToList.set(nodename, arrstr);
                    mapNameToInt.set(nodename, 1); // 对应原来的 msup = 1操作
                    // mtable对齐问题
                    if (nodename === 'mtable') {
                        if (parent.getAttribute('columnalign') === 'left') {
                            this._latex += '\\begin{array}{*{20}{l}}\n';
                        }
                        else if (parent.getAttribute('columnalign') === 'right') {
                            this._latex += '\\begin{array}{*{20}{r}}\n';
                        }
                        else if (parent.getAttribute('columnalign') === 'center') {
                            this._latex += '\\begin{array}{*{20}{c}}\n';
                        }
                        else {
                            this._latex += rules[i].strLatexText;
                        }
                    }
                    else {
                        this._latex += rules[i].strLatexText; // 对应原来的 "\\mathop "操作
                    }
                    if (0 === rules[i].nMaxChild) { // mo、mi、mn、mtext
                        var str = parent.textContent;
                        // console.log(`parentnode: type=${parent.nodeName} textContent=${parent.textContent}\n`);
                        // mi标签内容不为字母则使用\text{}
                        // mo标签内容不为字符则使用\text{}
                        // mn标签内容不为数字则使用\text{}
                        if ((str.length > 0) && this.specialCharJudge(parent.parentNode.nodeName, this.stringToUnicode(str)).isExist === false) {
                            if (nodename === 'mi') { // 字母
                                var functionSymbol = EDMMLtoLatex.initFunctionSymbol();
                                if (functionSymbol.has(str)) { // 数学函数
                                    str = functionSymbol.get(str);
                                }
                                else {
                                    var rletter = /[a-zA-Z]/;
                                    var isLetter = false;
                                    if (str.charAt(0).match(rletter) != null) {
                                        isLetter = true;
                                    }
                                    // 分拆
                                    var miStrList = [];
                                    var miStr = '';
                                    var index = 0;
                                    for (index = 0; index < str.length; index++) {
                                        if (str.charAt(index).match(rletter) != null && isLetter === false) { // 前一个字符不为字母(isLetter为false)，当前字符为字母
                                            isLetter = true;
                                            miStrList.push(miStr);
                                            miStr = str.charAt(index);
                                        }
                                        else if (str.charAt(index).match(rletter) != null && isLetter === true) { // 前一个字符为字母(isLetter为true)，当前字符为字母
                                            miStr += str.charAt(index);
                                        }
                                        else if (isLetter === false) { // 前一个字符不为字母(isLetter为false)，当前字符不为字母
                                            if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) { // 为一般字符
                                                miStr += EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                            }
                                            else {
                                                miStr += str.charAt(index);
                                            }
                                        }
                                        else if (isLetter === true) { // 前一个字符为字母(isLetter为true)，当前字符不为字母
                                            isLetter = false;
                                            miStrList.push(miStr);
                                            if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) { // 为一般字符
                                                miStr = EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                            }
                                            else {
                                                miStr = str.charAt(index);
                                            }
                                        }
                                    }
                                    miStrList.push(miStr);
                                    str = '';
                                    // 拼接
                                    //console.log();
                                    for (index = 0; index < miStrList.length; index++) {
                                        miStr = miStrList[index];
                                        if (miStr === '') {
                                            continue;
                                        }
                                        else if (miStr.charAt(0).match(rletter) != null) {
                                            str += miStr;
                                        }
                                        else {
                                            str += ' \\text{' + miStr + '} ';
                                        }
                                    }
                                }
                            }
                            else if (nodename === 'mo') { // 字符，操作与mi类似
                                var rnotChar = /[\da-zA-Z]/;
                                var isChar = false;
                                if (str.charAt(0).match(rnotChar) == null) {
                                    isChar = true;
                                }
                                var moStrList = [];
                                var moStr = '';
                                var index = 0;
                                for (index = 0; index < str.length; index++) {
                                    if (str.charAt(index).match(rnotChar) == null && isChar === false) {
                                        isChar = true;
                                        moStrList.push(moStr);
                                        if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) {
                                            moStr = EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                        }
                                        else {
                                            moStr = str.charAt(index);
                                        }
                                    }
                                    else if (str.charAt(index).match(rnotChar) == null && isChar === true) {
                                        if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) {
                                            moStr += EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                        }
                                        else {
                                            moStr += str.charAt(index);
                                        }
                                    }
                                    else if (isChar === false) {
                                        moStr += str.charAt(index);
                                    }
                                    else if (isChar === true) {
                                        isChar = false;
                                        moStrList.push(moStr);
                                        moStr = str.charAt(index);
                                    }
                                }
                                moStrList.push(moStr);
                                str = '';
                                for (index = 0; index < moStrList.length; index++) {
                                    moStr = moStrList[index];
                                    if (moStr === '') {
                                        continue;
                                    }
                                    else if (moStr.charAt(0).match(rnotChar) == null) {
                                        str += moStr;
                                    }
                                    else {
                                        str += ' \\text{' + moStr + '} ';
                                    }
                                }
                            }
                            else if (nodename === 'mn') { // 数字，操作与mi类似
                                var rnumber = /[\d]/;
                                var isNumber = false;
                                if (str.charAt(0).match(rnumber) != null) {
                                    isNumber = true;
                                }
                                var mnStrList = [];
                                var mnStr = '';
                                var index = 0;
                                for (index = 0; index < str.length; index++) {
                                    if (str.charAt(index).match(rnumber) != null && isNumber === false) {
                                        isNumber = true;
                                        mnStrList.push(mnStr);
                                        mnStr = str.charAt(index);
                                    }
                                    else if (str.charAt(index).match(rnumber) != null && isNumber === true) {
                                        mnStr += str.charAt(index);
                                    }
                                    else if (isNumber === false) {
                                        if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) {
                                            mnStr += EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                        }
                                        else {
                                            mnStr += str.charAt(index);
                                        }
                                    }
                                    else if (isNumber === true) {
                                        isNumber = false;
                                        mnStrList.push(mnStr);
                                        if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) {
                                            mnStr = EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                        }
                                        else {
                                            mnStr = str.charAt(index);
                                        }
                                    }
                                }
                                mnStrList.push(mnStr);
                                str = '';
                                for (index = 0; index < mnStrList.length; index++) {
                                    mnStr = mnStrList[index];
                                    if (mnStr === '') {
                                        continue;
                                    }
                                    else if (mnStr.charAt(0).match(rnumber) != null) {
                                        str += mnStr;
                                    }
                                    else {
                                        str += ' \\text{' + mnStr + '} ';
                                    }
                                }
                            }
                            else if (nodename === 'mtext') { // 文本
                                var mtextStr = '';
                                var index = 0;
                                for (index = 0; index < str.length; index++) {
                                    if (EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index))) != null) { // 一般字符
                                        mtextStr += EDMMLtoLatex.initCharacter().get(this.stringToUnicode(str.charAt(index)));
                                    }
                                    else {
                                        mtextStr += str.charAt(index);
                                    }
                                }
                                str = mtextStr;
                            }
                        }
                        this._latex += str;
                    }
                    if (1 === rules[i].nOperType) {
                        tolatxtindex = this._latex.length; // 截取参数开始的下标
                    }
                    this._mathMl.push(rules[i].strStackPushText); // 对应原来的 _mcharAthMl->push("")操作
                    otherItem = rules[i].bIsOtherItem;
                }
            }
            var child = parent.firstElementChild;
            // 遍历子节点，提取参数
            while (null != child) {
                // console.log(`null != child`);
                if (parent.nodeName === 'mmultiscripts' && child.nodeName === 'mprescripts') {
                    child = child.nextElementSibling;
                    continue;
                }
                this.toLatex(child); // 递归
                child = child.nextElementSibling; // 下一个子结点
                // 截取参数
                var paramNodename_1 = EDMMLtoLatex.initParamNodename();
                for (var i = 0; i < paramNodename_1.length; i++) {
                    var node = paramNodename_1[i];
                    var tmprule = rules[mapRulesIndex.get(node)];
                    if (parent.nodeName === node && mapNameToInt.get(node) <= tmprule.nMaxChild) {
                        mapNameToList.get(node)[mapNameToInt.get(node) - 1] = this._latex.slice(tolatxtindex, this._latex.length);
                        this._latex = this._latex.slice(0, tolatxtindex);
                        var tmpnumber = mapNameToInt.get(node) + 1;
                        mapNameToInt.set(node, tmpnumber);
                    }
                }
            }
            // 参数处理
            var paramNodename = EDMMLtoLatex.initParamNodename();
            for (var k = 0; k < paramNodename.length; k++) {
                var node = paramNodename[k];
                var tmprule = rules[mapRulesIndex.get(node)];
                if (parent.nodeName === node) {
                    if (node === 'mmultiscripts' && (mapNameToInt.get(node) - 1) === 3) { // 默认mmultiscripts标签为5个子节点，若为3个，则修改其paramOrder
                        tmprule.paramOrder = [1, 2, 0];
                    }
                    var paramOder = tmprule.paramOrder;
                    if (mapNameToInt.get(node) > 1) { // 将最后一个子节点对应的listChildLcharAtexText设置为空
                        tmprule.listChildLatexText[mapNameToInt.get(node) - 1 - 1] = '';
                    }
                    // 括号的特殊处理，一对括号且标签为mo，为括号加上left、right。括号之间需要有其他参数
                    // 例如：<mo>(</mo><mn>1</mn><mo>)</mo> -> \left( 1 \right)
                    //     <mo>(</mo><mn>1</mn> -> \left( 1 \right.
                    var charMatch = EDMMLtoLatex.initCharMatch();
                    var paramList = mapNameToList.get(node);
                    // console.log(`${paramList}\n`);
                    var bracketStack = []; // 记录左边括号的下标
                    var leftDot = 0; // 记录 \left. 的个数
                    var rightDot = 0; // 记录 \right. 的个数
                    var parentChild = parent.firstElementChild;
                    var parentName = parent.nodeName;
                    var paramLength = mapNameToInt.get(node) - 1;
                    if (parentChild != null) {
                        for (var i = 0; i < paramList.length; i++) {
                            if (i !== 0) {
                                if (parentChild.nextElementSibling != null) {
                                    parentChild = parentChild.nextElementSibling;
                                }
                            }
                            if (parentChild != null) { // 标签不为mo，则跳过
                                if (parentChild.nodeName !== 'mo') { // 标签不为mo，则跳过
                                    continue;
                                }
                            }
                            var param = paramList[i];
                            if (charMatch.has(param) && charMatch.has(param)) { // 左边括号
                                // 父节点为以下标签、括号不能与其他参数匹配
                                if (parentName === 'msub' || parentName === 'msup' || parentName === 'msubsup' || parentName === 'munder' || parentName === 'mover'
                                    || parentName === 'munderover' || parentName === 'mfrac' || parentName === 'mroot' || parentName === 'mmultiscripts') {
                                    param = param.trim();
                                    mapNameToList.get(node)[i] = ' {\\left' + param + ' \\right.} ';
                                    continue;
                                }
                                bracketStack.push(i); // 左括号压进栈
                                if (param === '|' || param === ' \\Vert ') { // | 的左右括号一样、每匹配到为左括号、则下一次匹配为右括号
                                    charMatch.set(param, '');
                                }
                            }
                            else if (charMatch.has(param) && charMatch.get(param) === '') { // 右边括号
                                // 父节点为以下标签、括号不能与其他参数匹配
                                if (parentName === 'msub' || parentName === 'msup' || parentName === 'msubsup' || parentName === 'munder' || parentName === 'mover'
                                    || parentName === 'munderover' || parentName === 'mfrac' || parentName === 'mroot' || parentName === 'mmultiscripts') {
                                    param = param.trim();
                                    mapNameToList.get(node)[i] = ' {\\left. \\right' + param + '} ';
                                    continue;
                                }
                                if (bracketStack.length > 0) { // 栈不为空、则将栈顶的元素弹出
                                    var leftIndex = bracketStack.pop();
                                    //console.log(`pop:${leftIndex}\n`);
                                    var leftBracket = mapNameToList.get(node)[leftIndex];
                                    leftBracket = leftBracket.trim();
                                    mapNameToList.get(node)[leftIndex] = ' \\left' + leftBracket + ' ';
                                    param = param.trim();
                                    mapNameToList.get(node)[i] = ' \\right' + param + ' ';
                                }
                                else { // 栈为空、则与 \left. 或者 \right. 凑成一对
                                    if (i === (paramLength - 1)) {
                                        leftDot++;
                                        var rightParam = paramList[i];
                                        rightParam = rightParam.trim();
                                        mapNameToList.get(node)[i] = ' \\right' + rightParam + ' ';
                                    }
                                    else {
                                        rightDot++;
                                        var leftParam = paramList[i];
                                        leftParam = leftParam.trim();
                                        mapNameToList.get(node)[i] = ' \\left' + leftParam + ' ';
                                    }
                                }
                                if (param === '|' || param === ' \\Vert ') { // | \Vert 的左右括号一样、每匹配到为右括号、则下一次匹配为左括号
                                    charMatch.set(param, param);
                                }
                            }
                        }
                    }
                    while (bracketStack.length > 0) { // 将栈中剩余的括号弹出、与 \left. 或者 \right. 凑成一对
                        // console.log(`bracketStack.length > 0`);
                        var leftIndex = bracketStack.pop();
                        if (leftIndex === (paramLength - 1) && paramLength !== 1) {
                            leftDot++;
                            var rightParam = paramList[leftIndex];
                            rightParam = rightParam.trim();
                            mapNameToList.get(node)[leftIndex] = ' \\right' + rightParam + ' ';
                        }
                        else {
                            rightDot++;
                            var leftParam = paramList[leftIndex];
                            leftParam = leftParam.trim();
                            mapNameToList.get(node)[leftIndex] = ' \\left' + leftParam + ' ';
                        }
                    }
                    if (paramLength >= 1) {
                        var leftDotList = '';
                        var rightDotList = '';
                        // \left. 与 \right. 一一相抵消
                        if (leftDot <= rightDot) {
                            rightDot -= leftDot;
                            leftDot = 0;
                        }
                        else {
                            leftDot -= rightDot;
                            rightDot = 0;
                        }
                        // 将剩余的 \left. 合并在第一个参数的前面
                        for (var i = 0; i < leftDot; i++) {
                            leftDotList += '\\left. ';
                        }
                        var first = mapNameToList.get(node)[0];
                        mapNameToList.get(node)[0] = leftDotList + first;
                        // 将剩余的 \right. 合并在最后一个参数的后面
                        for (var i = 0; i < rightDot; i++) {
                            rightDotList += '\\right. ';
                        }
                        var last = mapNameToList.get(node)[paramLength - 1];
                        mapNameToList.get(node)[paramLength - 1] = last + rightDotList;
                    }
                    // 特殊字符的处理
                    var flag = false;
                    for (var j = 0; j < (mapNameToInt.get(node) - 1); j++) {
                        var charUnicode = this.stringToUnicode(mapNameToList.get(node)[j]); // 参数的unicode
                        var charInfo = this.specialCharJudge(node, charUnicode); // 特殊字符的信息
                        if (charInfo.isExist && charInfo.strLatexList[j] !== '') { // 可以转为特殊字符
                            if (flag === false) { // 将特殊字符的lcharAtex信息替代原本的lcharAtex
                                flag = true;
                                this._latex = this._latex.slice(0, tolatxtindex - charInfo.cutLength);
                                mapNameToList.get(node)[j] = charInfo.strLatexList[j];
                                tmprule.listChildLatexText = charInfo.listChildLatexText;
                                paramOder = charInfo.paramOrder[j];
                            }
                            else {
                                var str = mapNameToList.get(node)[j];
                                mapNameToList[node].replace(j, EDMMLtoLatex.initCharacter()[this.stringToUnicode(str)]);
                            }
                            this._mathMl.pop();
                            this._mathMl.push('');
                        }
                        if (charInfo.isExist && charInfo.strLatexList[j] === '') { // 不可以转为特殊字符，则转为一般字符
                            var str = mapNameToList.get(node)[j];
                            mapNameToList.get(node)[j] = EDMMLtoLatex.initCharacter()[this.stringToUnicode(str)];
                        }
                    }
                    // 按照标签的paramOder的顺序加上参数
                    for (var j = 0; j < (mapNameToInt.get(node) - 1); j++) {
                        this._latex += mapNameToList.get(node)[paramOder[j]] + tmprule.listChildLatexText[j];
                    }
                    mapNameToInt.set(node, 0);
                }
            }
            // 将mcharAthMl格式的结束标签对应的lcharAtex字符取出来
            if (this._mathMl.length > 0 && !otherItem) {
                this._latex += this._mathMl.pop();
            }
        };
        /**
         * @brief stringToUnicode QString转化为Unicode格式
         * @param str 需要转化的字符串
         * @return 返回字符串的Unicode格式
         */
        EDMMLtoLatex.prototype.stringToUnicode = function (str) {
            /*
            const QChar *q;
            QChar qtmp;
            QString str0, strout;
            int num;

            q=str.unicode();

            int len=str.count();

            for (int i = 0; i < len; i++) {

               qtmp =(QChar)*q++;
               num = qtmp.unicode();

               if (num<255)
                strout += "00"; //英文或数字前加"00"

               str0 = str0.setNum(num,16);//变成十六进制数
               strout += str0;

            }
            bool ok;
            return QString("%1").arg(strout.toInt(&ok,16),4,16,QLatin1Char('0')).toUpper();
            */
            var unicodestr = str.charCodeAt(0).toString(16).toLocaleUpperCase();
            for (var i = unicodestr.length; i < 4; ++i) {
                unicodestr = '0' + unicodestr;
            }
            return unicodestr;
        };
        /**
         * @brief specialCharJudge 判断是否为特殊字符
         * @param node 节点
         * @param unicode 字符的Unicode格式
         * @return 返回EDcharInfo类型
         */
        EDMMLtoLatex.prototype.specialCharJudge = function (node, unicode) {
            // console.log(`node=${node}\n`);
            var specialCharacter = EDMMLtoLatex.initSpecialCharacter();
            if (specialCharacter.has(node)) {
                var mapCharInfo = specialCharacter.get(node);
                for (var _i = 0, mapCharInfo_1 = mapCharInfo; _i < mapCharInfo_1.length; _i++) {
                    var charinfo = mapCharInfo_1[_i];
                    if (charinfo.specialCharacter === unicode) {
                        return charinfo.charInfo;
                    }
                }
            }
            var charInfo = new EDcharInfo([''], 8, false, [''], [[]]);
            return charInfo;
        };
        // [0] chb 新增
        /**
         * @brief readMML 使用QDomDocment读取mml格式文件
         * @param mmlFile mml文本
         * @return 转换是否成功
         */
        EDMMLtoLatex.prototype.readMML = function (mml) {
            var mathML = mml;
            mathML.replace('<mo>&#x2003;</mo>', '<mo> \\quad </mo>');
            mathML.replace('<mo>&#x2008;</mo>', '<mo> \\  </mo>');
            mathML.replace('<mo>&#x2009;</mo>', '<mo> \\; </mo>');
            var domparser = new DOMParser();
            var doc = domparser.parseFromString(mathML, 'text/xml');
            if (null == doc) {
                return false;
            }
            var parent = doc.documentElement; // 返回根节点
            this._latex = ''; // 每次转化前需要初始化，这样才允许多次调用readMML进行转化
            this.toLatex(parent); // 解析mml、转化为latex
            //    qDebug() << _latex;
            /* 会卡死循环 屏蔽 zq
            //修改，去除头尾多余的{...}
            while (this._latex.length >= 6 && this._latex[2] == '{' && this._latex[this._latex.length-3] == '}') {
                console.log(`去除头尾多余的{...}`);
                let latex:string = this._latex;
                latex.replace(this._latex[2], "");
                latex.replace(this._latex[this._latex.length-3], "");

                //符号匹配，当去掉一对{}，剩下的是否还匹配
                let match:string[] = [];
                let index:number = 0;
                let flag:boolean = true;//标志，为true则可以去掉{}，否则不行

                for (index=0 ; index < latex.length ; index++) {
                    if (latex.charAt(index) == '{' && latex.charAt(index-1) != '\\')
                        match.push("{");
                    else if (latex.charAt(index) =='}' && latex.charAt(index-1) != '\\' && match.length != 0 && match.last() == "{")
                        match.pop();
                    else if (latex.charAt(index) == '}' && latex.charAt(index-1) != '\\') {
                        flag = false;
                        break;
                    }
                }

                if (flag && match.length <= 0) {
                    this._latex.replace(this._latex[this._latex.length-3], "");
                    this._latex.replace(this._latex[2], "");
                }
                else {
                    break;
                }
            }*/
            return true;
        };
        EDMMLtoLatex.maxchild = 32;
        return EDMMLtoLatex;
    }());
    EdrawMathDate.EDMMLtoLatex = EDMMLtoLatex;
})(EdrawMathDate || (EdrawMathDate = {}));
