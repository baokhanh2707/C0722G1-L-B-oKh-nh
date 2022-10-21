// Latex文本格式转MML文本格式的类
// 在导入文本的时候，使用latexFromStr进行文本的转换
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDLatextoMmlRules //mml与latex的对应关系
     = /** @class */ (function () {
        function EDLatextoMmlRules(latex, mml) {
            this.latex = latex;
            this.mml = mml;
        }
        return EDLatextoMmlRules;
    }());
    ;
    var EDmatrixRules // 不同的矩阵环境(统一转换为\begin{array}...\end{array))
     = /** @class */ (function () {
        function EDmatrixRules(environment, begin, end) {
            this.environment = environment;
            this.begin = begin;
            this.end = end;
        }
        return EDmatrixRules;
    }());
    var mtableMatch = /** @class */ (function () {
        function mtableMatch(begin, end, index, len) {
            this.begin = begin;
            this.end = end;
            this.index = index;
            this.len = len;
        }
        return mtableMatch;
    }());
    ;
    // 记录括号的信息
    var bracketInfo = /** @class */ (function () {
        function bracketInfo(bracket, index, len) {
            this.bracket = bracket;
            this.index = index;
            this.len = len;
        }
        return bracketInfo;
    }());
    ;
    // tslint:disable-next-line:max-classes-per-file
    var EDLatextoMML = /** @class */ (function () {
        function EDLatextoMML() {
            this._latex = '';
            this._currentCount = 0;
        } /**
         * @brief initRules latex格式与mml简单的标签的对应关系
         */
        EDLatextoMML.initCharMatch = function () {
            var charMatch = new Map();
            charMatch.set('(', '&#x0028;');
            charMatch.set(')', '&#x0029;');
            charMatch.set('\\{', '&#x007B;');
            charMatch.set('\\}', '&#x007D;');
            charMatch.set('[', '&#x005B;');
            charMatch.set(']', '&#x005D;');
            charMatch.set('|', '&#x007C;');
            charMatch.set('\\|', '&#x2016;');
            charMatch.set('\\vert', '&#x007C;');
            charMatch.set('\\Vert', '&#x2016;');
            charMatch.set('\\lfloor', '&#x230A;');
            charMatch.set('\\rfloor', '&#x230B;');
            charMatch.set('\\lceil', '&#x2308;');
            charMatch.set('\\rceil', '&#x2309;');
            charMatch.set('\\langle', '&#x2329;');
            charMatch.set('\\rangle', '&#x232A;');
            // charMatch.insert( "","");
            return charMatch;
        }; // 括号匹配、key:括号 value:对应的mathml的格式（16进制）
        EDLatextoMML.prototype.initRules = function () {
            var rules = [];
            // mfrac
            rules.push(new EDLatextoMmlRules('\\\\frac *<mrow (\\d+)>(.*?)</mrow \\1> *<mrow (\\d+)>(.*?)</mrow \\3>', '<mfrac><mrow>\$2</mrow><mrow>\$4</mrow></mfrac>'));
            // msqrt
            rules.push(new EDLatextoMmlRules('\\\\sqrt *<mrow (\\d+)>(.*?)</mrow \\1>', '<msqrt><mrow>\$2</mrow></msqrt>'));
            // mtext
            rules.push(new EDLatextoMmlRules('\\\\rm *<mrow (\\d+)>(.*?)</mrow \\1>', '<mtext d=\'\$2\'></mtext>'));
            // mtext
            rules.push(new EDLatextoMmlRules('\\\\mbox *<mrow (\\d+)>(.*?)</mrow \\1>', '<mtext d=\'\$2\'></mtext>'));
            // 此处为 latex 与 mathml 符号映射表
            // 第一行为latex的符号字符串， 第二行为 mathml的符号字符串
            // mtext 表示文本，
            // mo 表示符号/Unicode码
            // reference：https://developer.mozilla.org/en-US/docs/Web/MathML/Element
            rules.push(new EDLatextoMmlRules('\\\\text *<mrow (\\d+)>(.*?)</mrow \\1>', '<mtext d=\'\$2\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\mathbb *<mrow (\\d+)> *R *</mrow \\1>', '<mo d=\'&#x211D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mathbb *<mrow (\\d+)> *Z *</mrow \\1>', '<mo d=\'&#x2124;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mathbb *<mrow (\\d+)> *C *</mrow \\1>', '<mo d=\'&#x2102;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mathbb *<mrow (\\d+)> *Q *</mrow \\1>', '<mo d=\'&#x211A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mathbb *<mrow (\\d+)> *N *</mrow \\1>', '<mo d=\'&#x2115;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\quad(?![a-zA-Z])', '<mo d=\'&#x2003;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lim(?![a-zA-Z])', '<mi d=\'lim\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\ln(?![a-zA-Z])', '<mi d=\'ln\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\lg(?![a-zA-Z])', '<mi d=\'lg\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\log(?![a-zA-Z])', '<mi d=\'log\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\sin(?![a-zA-Z])', '<mi d=\'sin\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\cos(?![a-zA-Z])', '<mi d=\'cos\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\tan(?![a-zA-Z])', '<mi d=\'tan\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\cot(?![a-zA-Z])', '<mi d=\'cot\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\sec(?![a-zA-Z])', '<mi d=\'sec\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\csc(?![a-zA-Z])', '<mi d=\'csc\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\exp(?![a-zA-Z])', '<mi d=\'exp\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\arcsin(?![a-zA-Z])', '<mi d=\'arcsin\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\arccos(?![a-zA-Z])', '<mi d=\'arccos\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\arctan(?![a-zA-Z])', '<mi d=\'arctan\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\arccot(?![a-zA-Z])', '<mi d=\'arccot\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\sinh(?![a-zA-Z])', '<mi d=\'sinh\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\cosh(?![a-zA-Z])', '<mi d=\'cosh\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\tanh(?![a-zA-Z])', '<mi d=\'tanh\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\coth(?![a-zA-Z])', '<mi d=\'coth\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\limsup(?![a-zA-Z])', '<mi d=\'limsup\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\liminf(?![a-zA-Z])', '<mi d=\'liminf\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\max(?![a-zA-Z])', '<mi d=\'max\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\min(?![a-zA-Z])', '<mi d=\'min\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\inf(?![a-zA-Z])', '<mi d=\'inf\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\sup(?![a-zA-Z])', '<mi d=\'sup\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\ker(?![a-zA-Z])', '<mi d=\'ker\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\deg(?![a-zA-Z])', '<mi d=\'deg\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\gcd(?![a-zA-Z])', '<mi d=\'gcd\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\Pr(?![a-zA-Z])', '<mi d=\'Pr\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\det(?![a-zA-Z])', '<mi d=\'det\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\hom(?![a-zA-Z])', '<mi d=\'hom\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\arg(?![a-zA-Z])', '<mi d=\'arg\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\dim(?![a-zA-Z])', '<mi d=\'dim\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\bmod(?![a-zA-Z])', '<mi d=\'mod\'></mi>'));
            rules.push(new EDLatextoMmlRules('\\\\pmod *<mrow (\\d+)>(.*?)</mrow \\1>', '<mtext d=\'&#x2003;\'></mtext><mo d=\'&#x0028;\'></mo><mi d=\'mod\'></mi>\$2<mo d=\'&#x0029;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\(', '<mtext d=\'&#x0028;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\)', '<mtext d=\'&#x0029;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\|', '<mtext d=\'&#x007C;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\infty(?![a-zA-Z])', '<mo d=\'&#x221E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\intercal(?![a-zA-Z])', '<mo d=\'&#x22BA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\int(?![a-zA-Z])', '<mo d=\'&#x222B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\in(?![a-zA-Z])', '<mo d=\'&#x2208;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\notin(?![a-zA-Z])', '<mo d=\'&#x2209;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\cup(?![a-zA-Z])', '<mo d=\'&#x222A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\cap(?![a-zA-Z])', '<mo d=\'&#x2229;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigcup(?![a-zA-Z])', '<mo d=\'&#x22C3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigcap(?![a-zA-Z])', '<mo d=\'&#x22C2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\subseteqq(?![a-zA-Z])', '<mo d=\'&#x2AC5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\subseteq(?![a-zA-Z])', '<mo d=\'&#x2286;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\supseteqq(?![a-zA-Z])', '<mo d=\'&#x2AC6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\supseteq(?![a-zA-Z])', '<mo d=\'&#x2287;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\subsetneqq(?![a-zA-Z])', '<mo d=\'&#x2ACB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\subsetneq(?![a-zA-Z])', '<mo d=\'&#x228A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\subset(?![a-zA-Z])', '<mo d=\'&#x2282;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\supsetneqq(?![a-zA-Z])', '<mo d=\'&#x2ACC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\supsetneq(?![a-zA-Z])', '<mo d=\'&#x228B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\supset(?![a-zA-Z])', '<mo d=\'&#x2283;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\emptyset(?![a-zA-Z])', '<mo d=\'&#x2205;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varnothing(?![a-zA-Z])', '<mo d=\'&#x2205;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\therefore(?![a-zA-Z])', '<mo d=\'&#x2234;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\because(?![a-zA-Z])', '<mo d=\'&#x2235;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\backepsilon(?![a-zA-Z])', '<mo d=\'&#x220D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\exists(?![a-zA-Z])', '<mo d=\'&#x2203;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\forall(?![a-zA-Z])', '<mo d=\'&#x2200;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\neg(?![a-zA-Z])', '<mo d=\'&#x00AC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\wedge(?![a-zA-Z])', '<mo d=\'&#x2227;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\land(?![a-zA-Z])', '<mo d=\'&#x2227;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\veebar(?![a-zA-Z])', '<mo d=\'&#x22BB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vee(?![a-zA-Z])', '<mo d=\'&#x2228;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lor(?![a-zA-Z])', '<mo d=\'&#x2228;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftrightarrows(?![a-zA-Z])', '<mo d=\'&#x21C6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftrightarrow(?![a-zA-Z])', '<mo d=\'&#x2194;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\top(?![a-zA-Z])', '<mo d=\'&#x22A4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\to(?![a-zA-Z])', '<mo d=\'&#x2192;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightarrowtail(?![a-zA-Z])', '<mo d=\'&#x21A3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightarrow(?![a-zA-Z])', '<mo d=\'&#x2192;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftarrowtail(?![a-zA-Z])', '<mo d=\'&#x21A2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gets(?![a-zA-Z])', '<mo d=\'&#x2190;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftarrow(?![a-zA-Z])', '<mo d=\'&#x2190;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\updownarrow(?![a-zA-Z])', '<mo d=\'&#x2195;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\uparrow(?![a-zA-Z])', '<mo d=\'&#x2191;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\downarrow(?![a-zA-Z])', '<mo d=\'&#x2193;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Leftrightarrow(?![a-zA-Z])', '<mo d=\'&#x21D4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Rightarrow(?![a-zA-Z])', '<mo d=\'&#x21D2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Leftarrow(?![a-zA-Z])', '<mo d=\'&#x21D0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Updownarrow(?![a-zA-Z])', '<mo d=\'&#x21D5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Uparrow(?![a-zA-Z])', '<mo d=\'&#x21D1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Downarrow(?![a-zA-Z])', '<mo d=\'&#x21D3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nearrow(?![a-zA-Z])', '<mo d=\'&#x2197;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\swarrow(?![a-zA-Z])', '<mo d=\'&#x2199;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\searrow(?![a-zA-Z])', '<mo d=\'&#x2198;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nwarrow(?![a-zA-Z])', '<mo d=\'&#x2196;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightleftarrows(?![a-zA-Z])', '<mo d=\'&#x21C4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightleftharpoons(?![a-zA-Z])', '<mo d=\'&#x21CC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mapsto(?![a-zA-Z])', '<mo d=\'&#x21A6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\pm(?![a-zA-Z])', '<mo d=\'&#x00B1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mp(?![a-zA-Z])', '<mo d=\'&#x2213;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\times(?![a-zA-Z])', '<mo d=\'&#x00D7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ast(?![a-zA-Z])', '<mo d=\'&#x2217;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\divideontimes(?![a-zA-Z])', '<mo d=\'&#x22C7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\div(?![a-zA-Z])', '<mo d=\'&#x00F7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\oplus(?![a-zA-Z])', '<mo d=\'&#x2295;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigoplus(?![a-zA-Z])', '<mo d=\'&#x2A01;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\otimes(?![a-zA-Z])', '<mo d=\'&#x2297;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\odot(?![a-zA-Z])', '<mo d=\'&#x2299;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigodot(?![a-zA-Z])', '<mo d=\'&#x2A00;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\cdots(?![a-zA-Z])', '<mo d=\'&#x22EF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\cdot(?![a-zA-Z])', '<mo d=\'&#x22C5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bullet(?![a-zA-Z])', '<mo d=\'&#x2022;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circleddash(?![a-zA-Z])', '<mo d=\'&#x2296;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circeq(?![a-zA-Z])', '<mo d=\'&#x2257;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circlearrowleft(?![a-zA-Z])', '<mo d=\'&#x21BA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circlearrowright(?![a-zA-Z])', '<mo d=\'&#x21BB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circledcirc(?![a-zA-Z])', '<mo d=\'&#x229A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circledast(?![a-zA-Z])', '<mo d=\'&#x229B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circledS(?![a-zA-Z])', '<mo d=\'&#x24C8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\circ(?![a-zA-Z])', '<mo d=\'&#x00B0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\langle(?![a-zA-Z])', '<mtext d=\'&#x2329;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\rangle(?![a-zA-Z])', '<mtext d=\'&#x232A;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\llbracket(?![a-zA-Z])', '<mo d=\'&#x301A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rrbracket(?![a-zA-Z])', '<mo d=\'&#x301B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Delta(?![a-zA-Z])', '<mo d=\'&#x0394;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Phi(?![a-zA-Z])', '<mo d=\'&#x03A6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Gamma(?![a-zA-Z])', '<mo d=\'&#x0393;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Lambda(?![a-zA-Z])', '<mo d=\'&#x039B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Pi(?![a-zA-Z])', '<mo d=\'&#x03A0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Theta(?![a-zA-Z])', '<mo d=\'&#x0398;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Sigma(?![a-zA-Z])', '<mo d=\'&#x03A3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Upsilon(?![a-zA-Z])', '<mo d=\'&#x03D2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Omega(?![a-zA-Z])', '<mo d=\'&#x03A9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Xi(?![a-zA-Z])', '<mo d=\'&#x039E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Psi(?![a-zA-Z])', '<mo d=\'&#x03A8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\alpha(?![a-zA-Z])', '<mo d=\'&#x03B1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\beta(?![a-zA-Z])', '<mo d=\'&#x03B2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\chi(?![a-zA-Z])', '<mo d=\'&#x03C7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\delta(?![a-zA-Z])', '<mo d=\'&#x03B4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varepsilon(?![a-zA-Z])', '<mo d=\'&#x03B5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\phi(?![a-zA-Z])', '<mo d=\'&#x03D5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varphi(?![a-zA-Z])', '<mo d=\'&#x03C6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gamma(?![a-zA-Z])', '<mo d=\'&#x03B3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\eta(?![a-zA-Z])', '<mo d=\'&#x03B7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\iota(?![a-zA-Z])', '<mo d=\'&#x03B9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\kappa(?![a-zA-Z])', '<mo d=\'&#x03BA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lambda(?![a-zA-Z])', '<mo d=\'&#x03BB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\multimap(?![a-zA-Z])', '<mo d=\'&#x22B8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mu(?![a-zA-Z])', '<mo d=\'&#x03BC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nu(?![a-zA-Z])', '<mo d=\'&#x03BD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\pitchfork(?![a-zA-Z])', '<mo d=\'&#x22D4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\pi(?![a-zA-Z])', '<mo d=\'&#x03C0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varpi(?![a-zA-Z])', '<mo d=\'&#x03D6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\theta(?![a-zA-Z])', '<mo d=\'&#x03B8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vartheta(?![a-zA-Z])', '<mo d=\'&#x03D1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rho(?![a-zA-Z])', '<mo d=\'&#x03C1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sigma(?![a-zA-Z])', '<mo d=\'&#x03C3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varsigma(?![a-zA-Z])', '<mo d=\'&#x03C2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\tau(?![a-zA-Z])', '<mo d=\'&#x03C4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\upsilon(?![a-zA-Z])', '<mo d=\'&#x03C5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\omega(?![a-zA-Z])', '<mo d=\'&#x03C9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\xi(?![a-zA-Z])', '<mo d=\'&#x03BE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\psi(?![a-zA-Z])', '<mo d=\'&#x03C8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\zeta(?![a-zA-Z])', '<mo d=\'&#x03B6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\partial(?![a-zA-Z])', '<mo d=\'&#x2202;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\wp(?![a-zA-Z])', '<mo d=\'&#x2118;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Im(?![a-zA-Z])', '<mo d=\'&#x2111;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Re(?![a-zA-Z])', '<mo d=\'&#x211C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\aleph(?![a-zA-Z])', '<mo d=\'&#x2135;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\hbar(?![a-zA-Z])', '<mo d=\'&#x210F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\hslash(?![a-zA-Z])', '<mo d=\'&#x210F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ell(?![a-zA-Z])', '<mo d=\'&#x2113;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dagger(?![a-zA-Z])', '<mo d=\'&#x2020;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Delta(?![a-zA-Z])', '<mo d=\'&#x0394;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nabla(?![a-zA-Z])', '<mo d=\'&#x2207;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Omega(?![a-zA-Z])', '<mo d=\'&#x03A9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mho(?![a-zA-Z])', '<mo d=\'&#x2127;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\diamondsuit(?![a-zA-Z])', '<mo d=\'&#x2662;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\diamond(?![a-zA-Z])', '<mo d=\'&#x22C4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sum(?![a-zA-Z])', '<mo d=\'&#x2211;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\prod(?![a-zA-Z])', '<mo d=\'&#x220F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\coprod(?![a-zA-Z])', '<mo d=\'&#x2210;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\amalg(?![a-zA-Z])', '<mo d=\'&#x2210;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\angle(?![a-zA-Z])', '<mo d=\'&#x2220;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\measuredangle(?![a-zA-Z])', '<mo d=\'&#x2221;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sphericalangle(?![a-zA-Z])', '<mo d=\'&#x2222;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\perp(?![a-zA-Z])', '<mo d=\'&#x22A5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bot(?![a-zA-Z])', '<mo d=\'&#x22A5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\parallel(?![a-zA-Z])', '<mo d=\'&#x2225;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigtriangleup(?![a-zA-Z])', '<mo d=\'&#x25B3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\square(?![a-zA-Z])', '<mo d=\'&#x25A1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Box(?![a-zA-Z])', '<mo d=\'&#x25A1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lesssim(?![a-zA-Z])', '<mo d=\'&#x2272;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lessapprox(?![a-zA-Z])', '<mo d=\'&#x2A85;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leqslant(?![a-zA-Z])', '<mo d=\'&#x2A7D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leqq(?![a-zA-Z])', '<mo d=\'&#x2266;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftrightharpoons(?![a-zA-Z])', '<mo d=\'&#x21CB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leq(?![a-zA-Z])', '<mo d=\'&#x2264;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftharpoonup(?![a-zA-Z])', '<mo d=\'&#x21BC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftharpoondown(?![a-zA-Z])', '<mo d=\'&#x21BD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leadsto(?![a-zA-Z])', '<mo d=\'&#x21DD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lessdot(?![a-zA-Z])', '<mo d=\'&#x22D6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lessgtr(?![a-zA-Z])', '<mo d=\'&#x2276;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lesseqgtr(?![a-zA-Z])', '<mo d=\'&#x22DA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lesseqqgtr(?![a-zA-Z])', '<mo d=\'&#x2A8B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftleftarrows(?![a-zA-Z])', '<mo d=\'&#x21C7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftrightsquigarrow(?![a-zA-Z])', '<mo d=\'&#x21AD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\leftthreetimes(?![a-zA-Z])', '<mo d=\'&#x22CB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\le(?![a-zA-Z])', '<mo d=\'&#x2264;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\geqslant(?![a-zA-Z])', '<mo d=\'&#x2A7E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\geqq(?![a-zA-Z])', '<mo d=\'&#x2267;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\geq(?![a-zA-Z])', '<mo d=\'&#x2265;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ge(?![a-zA-Z])', '<mo d=\'&#x2265;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\llcorner(?![a-zA-Z])', '<mo d=\'&#x231E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\llless(?![a-zA-Z])', '<mo d=\'&#x22D8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lll(?![a-zA-Z])', '<mo d=\'&#x22D8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ll(?![a-zA-Z])', '<mo d=\'&#x226A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gggtr(?![a-zA-Z])', '<mo d=\'&#x22D9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ggg(?![a-zA-Z])', '<mo d=\'&#x22D9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gg(?![a-zA-Z])', '<mo d=\'&#x226B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\preceq(?![a-zA-Z])', '<mo d=\'&#x2AAF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\preccurlyeq(?![a-zA-Z])', '<mo d=\'&#x227C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\precsim(?![a-zA-Z])', '<mo d=\'&#x227E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\precapprox(?![a-zA-Z])', '<mo d=\'&#x2AB7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\precneqq(?![a-zA-Z])', '<mo d=\'&#x2AB5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\precnsim(?![a-zA-Z])', '<mo d=\'&#x22E8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\precnapprox(?![a-zA-Z])', '<mo d=\'&#x2AB9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\prec(?![a-zA-Z])', '<mo d=\'&#x227A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succcurlyeq(?![a-zA-Z])', '<mo d=\'&#x227D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succeq(?![a-zA-Z])', '<mo d=\'&#x227D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succsim(?![a-zA-Z])', '<mo d=\'&#x227F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succapprox(?![a-zA-Z])', '<mo d=\'&#x2AB8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succneqq(?![a-zA-Z])', '<mo d=\'&#x2AB6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succnsim(?![a-zA-Z])', '<mo d=\'&#x22E9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succnapprox(?![a-zA-Z])', '<mo d=\'&#x2ABA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\succ(?![a-zA-Z])', '<mo d=\'&#x227B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\trianglelefteq(?![a-zA-Z])', '<mo d=\'&#x22B4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\triangleleft(?![a-zA-Z])', '<mo d=\'&#x22B2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lhd(?![a-zA-Z])', '<mo d=\'&#x22B2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vartriangleleft(?![a-zA-Z])', '<mo d=\'&#x22B2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\trianglerighteq(?![a-zA-Z])', '<mo d=\'&#x22B5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\triangleright(?![a-zA-Z])', '<mo d=\'&#x22B3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vartriangleright(?![a-zA-Z])', '<mo d=\'&#x22B3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vartriangleright(?![a-zA-Z])', '<mo d=\'&#x22B3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\simeq(?![a-zA-Z])', '<mo d=\'&#x2243;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sim(?![a-zA-Z])', '<mo d=\'&#x223C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\thicksim(?![a-zA-Z])', '<mo d=\'&#x223C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\approxeq(?![a-zA-Z])', '<mo d=\'&#x224A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\approx(?![a-zA-Z])', '<mo d=\'&#x2248;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\thickapprox(?![a-zA-Z])', '<mo d=\'&#x2248;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\cong(?![a-zA-Z])', '<mo d=\'&#x2245;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\neq(?![a-zA-Z])', '<mo d=\'&#x2260;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nexists(?![a-zA-Z])', '<mo d=\'&#x2204;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ne(?![a-zA-Z])', '<mo d=\'&#x2260;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\equiv(?![a-zA-Z])', '<mo d=\'&#x2261;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\triangleq(?![a-zA-Z])', '<mo d=\'&#x225C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\triangleq(?![a-zA-Z])', '<mo d=\'&#x225C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\doteqdot(?![a-zA-Z])', '<mo d=\'&#x2251;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\doteq(?![a-zA-Z])', '<mo d=\'&#x2250;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\propto(?![a-zA-Z])', '<mo d=\'&#x221D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varpropto(?![a-zA-Z])', '<mo d=\'&#x221D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ldots(?![a-zA-Z])', '<mo d=\'&#x2026;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dots(?![a-zA-Z])', '<mo d=\'&#x2026;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vdots(?![a-zA-Z])', '<mo d=\'&#x22EE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\iddots(?![a-zA-Z])', '<mo d=\'&#x22F0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ddots(?![a-zA-Z])', '<mo d=\'&#x22F1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\iint(?![a-zA-Z])', '<mo d=\'&#x222C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\iiint(?![a-zA-Z])', '<mo d=\'&#x222D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\iiiint(?![a-zA-Z])', '<mo d=\'&#x2A0C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ointctrclockwise(?![a-zA-Z])', '<mo d=\'&#x2233;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ointclockwise(?![a-zA-Z])', '<mo d=\'&#x2232;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\oint(?![a-zA-Z])', '<mo d=\'&#x222E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varoiint(?![a-zA-Z])', '<mo d=\'&#x222F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varoiint(?![a-zA-Z])', '<mo d=\'&#x222F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\\\{', '<mtext d=\'&#x007B;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\\\}', '<mtext d=\'&#x007D;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\lfloor(?![a-zA-Z])', '<mtext d=\'&#x230A;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\rfloor(?![a-zA-Z])', '<mtext d=\'&#x230B;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\Vert(?![a-zA-Z])', '<mo d=\'&#x2016;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lceil(?![a-zA-Z])', '<mtext d=\'&#x2308;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\rceil(?![a-zA-Z])', '<mtext d=\'&#x2309;\'></mtext>'));
            rules.push(new EDLatextoMmlRules('\\\\epsilon(?![a-zA-Z])', '<mo d=\'&#x03F5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varrho(?![a-zA-Z])', '<mo d=\'&#x03F1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqsubseteq(?![a-zA-Z])', '<mo d=\'&#x2291;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqsupseteq(?![a-zA-Z])', '<mo d=\'&#x2292;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqsubset(?![a-zA-Z])', '<mo d=\'&#x228F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqsupset(?![a-zA-Z])', '<mo d=\'&#x2290;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bowtie(?![a-zA-Z])', '<mo d=\'&#x22C8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ni(?![a-zA-Z])', '<mo d=\'&#x220B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\owns(?![a-zA-Z])', '<mo d=\'&#x220B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vdash(?![a-zA-Z])', '<mo d=\'&#x22A2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dashv(?![a-zA-Z])', '<mo d=\'&#x22A3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\models(?![a-zA-Z])', '<mo d=\'&#x22A8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vDash(?![a-zA-Z])', '<mo d=\'&#x22A8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\mid(?![a-zA-Z])', '<mo d=\'&#x2223;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\smile(?![a-zA-Z])', '<mo d=\'&#x2323;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\smallsmile(?![a-zA-Z])', '<mo d=\'&#x2323;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\frown(?![a-zA-Z])', '<mo d=\'&#x2322;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\smallfrown(?![a-zA-Z])', '<mo d=\'&#x2322;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\asymp(?![a-zA-Z])', '<mo d=\'&#x224D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\setminus(?![a-zA-Z])', '<mo d=\'&#x2216;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\smallsetminus(?![a-zA-Z])', '<mo d=\'&#x2216;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\star(?![a-zA-Z])', '<mo d=\'&#x22C6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqcup(?![a-zA-Z])', '<mo d=\'&#x2294;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigsqcup(?![a-zA-Z])', '<mo d=\'&#x2A06;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sqcap(?![a-zA-Z])', '<mo d=\'&#x2293;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ominus(?![a-zA-Z])', '<mo d=\'&#x2296;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\oslash(?![a-zA-Z])', '<mo d=\'&#x2298;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\uplus(?![a-zA-Z])', '<mo d=\'&#x228E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\biguplus(?![a-zA-Z])', '<mo d=\'&#x2A04;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigcirc(?![a-zA-Z])', '<mo d=\'&#x25EF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigtriangledown(?![a-zA-Z])', '<mo d=\'&#x25BD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\triangledown(?![a-zA-Z])', '<mo d=\'&#x25BD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ddagger(?![a-zA-Z])', '<mo d=\'&#x2021;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\unlhd(?![a-zA-Z])', '<mo d=\'&#x22B4;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\unrhd(?![a-zA-Z])', '<mo d=\'&#x22B5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\wr(?![a-zA-Z])', '<mo d=\'&#x2240;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigvee(?![a-zA-Z])', '<mo d=\'&#x22C1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigwedge(?![a-zA-Z])', '<mo d=\'&#x22C0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigotimes(?![a-zA-Z])', '<mo d=\'&#x2A02;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\longleftarrow(?![a-zA-Z])', '<mo d=\'&#x27F5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\longrightarrow(?![a-zA-Z])', '<mo d=\'&#x27F6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\longleftrightarrow(?![a-zA-Z])', '<mo d=\'&#x27F7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Longleftarrow(?![a-zA-Z])', '<mo d=\'&#x27F8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Longrightarrow(?![a-zA-Z])', '<mo d=\'&#x27F9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Longleftrightarrow(?![a-zA-Z])', '<mo d=\'&#x27FA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\longmapsto(?![a-zA-Z])', '<mo d=\'&#x27FC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\hookleftarrow(?![a-zA-Z])', '<mo d=\'&#x21A9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\hookrightarrow(?![a-zA-Z])', '<mo d=\'&#x21AA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightharpoonup(?![a-zA-Z])', '<mo d=\'&#x21C0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightharpoondown(?![a-zA-Z])', '<mo d=\'&#x21C1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vert(?![a-zA-Z])', '<mo d=\'&#x007C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lgroup(?![a-zA-Z])', '<mo d=\'&#x3014;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\backslash(?![a-zA-Z])', '<mo d=\'&#x005C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rgroup(?![a-zA-Z])', '<mo d=\'&#x3015;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lmoustache(?![a-zA-Z])', '<mo d=\'&#x23B0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rmoustache(?![a-zA-Z])', '<mo d=\'&#x23B1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\arrowvert(?![a-zA-Z])', '<mo d=\'&#x23D0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\imath(?![a-zA-Z])', '<mo d=\'&#x0131;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\jmath(?![a-zA-Z])', '<mo d=\'&#x0237;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Re(?![a-zA-Z])', '<mo d=\'&#x211C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\prime(?![a-zA-Z])', '<mo d=\'&#x2032;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Diamond(?![a-zA-Z])', '<mo d=\'&#x25CA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lozenge(?![a-zA-Z])', '<mo d=\'&#x25CA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\surd(?![a-zA-Z])', '<mo d=\'&#x221A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\heartsuit(?![a-zA-Z])', '<mo d=\'&#x2661;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\clubsuit(?![a-zA-Z])', '<mo d=\'&#x2663;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\spadesuit(?![a-zA-Z])', '<mo d=\'&#x2660;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\flat(?![a-zA-Z])', '<mo d=\'&#x266D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\natural(?![a-zA-Z])', '<mo d=\'&#x266E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\sharp(?![a-zA-Z])', '<mo d=\'&#x266F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Subset(?![a-zA-Z])', '<mo d=\'&#x22D0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Supset(?![a-zA-Z])', '<mo d=\'&#x22D1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\S(?![a-zA-Z])', '<mo d=\'&#x00A7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\P(?![a-zA-Z])', '<mo d=\'&#x00B6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\pounds(?![a-zA-Z])', '<mo d=\'&#x00A3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ulcorner(?![a-zA-Z])', '<mo d=\'&#x231C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\urcorner(?![a-zA-Z])', '<mo d=\'&#x231D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lrcorner(?![a-zA-Z])', '<mo d=\'&#x231F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\digamma(?![a-zA-Z])', '<mo d=\'&#x03DC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\varkappa(?![a-zA-Z])', '<mo d=\'&#x03F0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\beth(?![a-zA-Z])', '<mo d=\'&#x2136;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\daleth(?![a-zA-Z])', '<mo d=\'&#x2138;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gimel(?![a-zA-Z])', '<mo d=\'&#x2137;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtrdot(?![a-zA-Z])', '<mo d=\'&#x22D7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Doteq(?![a-zA-Z])', '<mo d=\'&#x2251;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\risingdotseq(?![a-zA-Z])', '<mo d=\'&#x2253;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\eqslantless(?![a-zA-Z])', '<mo d=\'&#x22DC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\eqslantgtr(?![a-zA-Z])', '<mo d=\'&#x22DD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\fallingdotseq(?![a-zA-Z])', '<mo d=\'&#x2252;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\eqcirc(?![a-zA-Z])', '<mo d=\'&#x2256;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtrsim(?![a-zA-Z])', '<mo d=\'&#x2273;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtrapprox(?![a-zA-Z])', '<mo d=\'&#x2A86;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bumpeq(?![a-zA-Z])', '<mo d=\'&#x224F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtrless(?![a-zA-Z])', '<mo d=\'&#x2277;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Bumpeq(?![a-zA-Z])', '<mo d=\'&#x224E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtreqless(?![a-zA-Z])', '<mo d=\'&#x22DB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gtreqqless(?![a-zA-Z])', '<mo d=\'&#x2A8C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curlyeqprec(?![a-zA-Z])', '<mo d=\'&#x22DE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curlyeqsucc(?![a-zA-Z])', '<mo d=\'&#x22DF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\backsimeq(?![a-zA-Z])', '<mo d=\'&#x22CD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\backsim(?![a-zA-Z])', '<mo d=\'&#x223D;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Vdash(?![a-zA-Z])', '<mo d=\'&#x22A9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Vvdash(?![a-zA-Z])', '<mo d=\'&#x22AA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\between(?![a-zA-Z])', '<mo d=\'&#x226C;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacktriangleleft(?![a-zA-Z])', '<mo d=\'&#x25C0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacktriangleright(?![a-zA-Z])', '<mo d=\'&#x25B6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dashleftarrow(?![a-zA-Z])', '<mo d=\'&#x21E0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dashrightarrow(?![a-zA-Z])', '<mo d=\'&#x21E2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightrightarrows(?![a-zA-Z])', '<mo d=\'&#x21C9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\upuparrows(?![a-zA-Z])', '<mo d=\'&#x21C8;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\downdownarrows(?![a-zA-Z])', '<mo d=\'&#x21CA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Lleftarrow(?![a-zA-Z])', '<mo d=\'&#x21DA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Rrightarrow(?![a-zA-Z])', '<mo d=\'&#x21DB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\upharpoonleft(?![a-zA-Z])', '<mo d=\'&#x21BF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\twoheadleftarrow(?![a-zA-Z])', '<mo d=\'&#x219E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\twoheadrightarrow(?![a-zA-Z])', '<mo d=\'&#x21A0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\upharpoonright(?![a-zA-Z])', '<mo d=\'&#x21BE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\downharpoonleft(?![a-zA-Z])', '<mo d=\'&#x21C3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\downharpoonright(?![a-zA-Z])', '<mo d=\'&#x21C2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Lsh(?![a-zA-Z])', '<mo d=\'&#x21B0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Rsh(?![a-zA-Z])', '<mo d=\'&#x21B1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightsquigarrow(?![a-zA-Z])', '<mo d=\'&#x21DD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\looparrowleft(?![a-zA-Z])', '<mo d=\'&#x21AB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\looparrowright(?![a-zA-Z])', '<mo d=\'&#x21AC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curvearrowleft(?![a-zA-Z])', '<mo d=\'&#x21B6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curvearrowright(?![a-zA-Z])', '<mo d=\'&#x21B7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nless(?![a-zA-Z])', '<mo d=\'&#x226E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ngtr(?![a-zA-Z])', '<mo d=\'&#x226F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lneqq(?![a-zA-Z])', '<mo d=\'&#x2268;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lneq(?![a-zA-Z])', '<mo d=\'&#x2A87;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gneqq(?![a-zA-Z])', '<mo d=\'&#x2269;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gneq(?![a-zA-Z])', '<mo d=\'&#x2A88;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nleq(?![a-zA-Z])', '<mo d=\'&#x2270;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ngeq(?![a-zA-Z])', '<mo d=\'&#x2271;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsubseteqq(?![a-zA-Z])', '<mo d=\'&#xE016;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsupseteqq(?![a-zA-Z])', '<mo d=\'&#xE018;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nmid(?![a-zA-Z])', '<mo d=\'&#x2224;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nparallel(?![a-zA-Z])', '<mo d=\'&#x2226;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lnsim(?![a-zA-Z])', '<mo d=\'&#x22E6;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gnsim(?![a-zA-Z])', '<mo d=\'&#x22E7;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\lnapprox(?![a-zA-Z])', '<mo d=\'&#x2A89;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\gnapprox(?![a-zA-Z])', '<mo d=\'&#x2A8A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsim(?![a-zA-Z])', '<mo d=\'&#x2241;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\npreceq(?![a-zA-Z])', '<mo d=\'&#x22E0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nprec(?![a-zA-Z])', '<mo d=\'&#x2280;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsucceq(?![a-zA-Z])', '<mo d=\'&#x22E1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsucc(?![a-zA-Z])', '<mo d=\'&#x2281;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ncong(?![a-zA-Z])', '<mo d=\'&#x2247;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nvdash(?![a-zA-Z])', '<mo d=\'&#x22AC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nvDash(?![a-zA-Z])', '<mo d=\'&#x22AD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nVdash(?![a-zA-Z])', '<mo d=\'&#x22AE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nVDash(?![a-zA-Z])', '<mo d=\'&#x22AF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ntrianglelefteq(?![a-zA-Z])', '<mo d=\'&#x22EC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ntriangleleft(?![a-zA-Z])', '<mo d=\'&#x22EA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ntrianglerighteq(?![a-zA-Z])', '<mo d=\'&#x22ED;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ntriangleright(?![a-zA-Z])', '<mo d=\'&#x22EB;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsubseteq(?![a-zA-Z])', '<mo d=\'&#x2288;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nsupseteq(?![a-zA-Z])', '<mo d=\'&#x2289;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nleftarrow(?![a-zA-Z])', '<mo d=\'&#x219A;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nrightarrow(?![a-zA-Z])', '<mo d=\'&#x219B;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nleftrightarrow(?![a-zA-Z])', '<mo d=\'&#x21AE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nLeftarrow(?![a-zA-Z])', '<mo d=\'&#x21CD;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nRightarrow(?![a-zA-Z])', '<mo d=\'&#x21CF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\nLeftrightarrow(?![a-zA-Z])', '<mo d=\'&#x21CE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\dotplus(?![a-zA-Z])', '<mo d=\'&#x2214;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\ltimes(?![a-zA-Z])', '<mo d=\'&#x22C9;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rtimes(?![a-zA-Z])', '<mo d=\'&#x22CA;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Cup(?![a-zA-Z])', '<mo d=\'&#x22D3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\doublecup(?![a-zA-Z])', '<mo d=\'&#x22D3;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Cap(?![a-zA-Z])', '<mo d=\'&#x22D2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\doublecap(?![a-zA-Z])', '<mo d=\'&#x22D2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\barwedge(?![a-zA-Z])', '<mo d=\'&#x22BC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\doublebarwedge(?![a-zA-Z])', '<mo d=\'&#x2306;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\boxplus(?![a-zA-Z])', '<mo d=\'&#x229E;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\boxminus(?![a-zA-Z])', '<mo d=\'&#x229F;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\boxtimes(?![a-zA-Z])', '<mo d=\'&#x22A0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\boxdot(?![a-zA-Z])', '<mo d=\'&#x22A1;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\rightthreetimes(?![a-zA-Z])', '<mo d=\'&#x22CC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curlyvee(?![a-zA-Z])', '<mo d=\'&#x22CE;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\curlywedge(?![a-zA-Z])', '<mo d=\'&#x22CF;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacksquare(?![a-zA-Z])', '<mo d=\'&#x25A0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\vartriangle(?![a-zA-Z])', '<mo d=\'&#x25B5;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacktriangledown(?![a-zA-Z])', '<mo d=\'&#x25BC;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacktriangle(?![a-zA-Z])', '<mo d=\'&#x25B2;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\complement(?![a-zA-Z])', '<mo d=\'&#x2201;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Game(?![a-zA-Z])', '<mo d=\'&#x2141;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\blacklozenge(?![a-zA-Z])', '<mo d=\'&#x2666;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\bigstar(?![a-zA-Z])', '<mo d=\'&#x2605;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\diagup(?![a-zA-Z])', '<mo d=\'&#x2571;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\diagdown(?![a-zA-Z])', '<mo d=\'&#x2572;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\backprime(?![a-zA-Z])', '<mo d=\'&#x2035;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\Finv(?![a-zA-Z])', '<mo d=\'&#x2132;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\eth(?![a-zA-Z])', '<mo d=\'&#x00F0;\'></mo>'));
            rules.push(new EDLatextoMmlRules('\\\\tilde *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x02DC;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\widetilde *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x02DC;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\hat *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x005E;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\widehat *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x005E;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\bar *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x00AF;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\overline *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x00AF;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\vec *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x2192;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\overrightarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x2192;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\overleftarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x2190;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\overleftrightarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x2194;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\check *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x02C7;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\acute *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x00B4;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\grave *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x0060;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\dot *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x02D9;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\ddot *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x00A8;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\breve *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mrow>\$2</mrow><mo d=\'&#x2323;\'></mo></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\xrightarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mo d=\'&#x2192;\'></mo><mrow>\$2</mrow></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\xleftarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<mover><mo d=\'&#x2190;\'></mo><mrow>\$2</mrow></mover>'));
            rules.push(new EDLatextoMmlRules('\\\\underline *<mrow (\\d+)>(.*?)</mrow \\1>', '<munder><mrow>\$2</mrow><mo d=\'&#x005F;\'></mo></munder>'));
            rules.push(new EDLatextoMmlRules('\\\\underrightarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<munder><mrow>\$2</mrow><mo d=\'&#x2192;\'></mo></munder>'));
            rules.push(new EDLatextoMmlRules('\\\\underleftarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<munder><mrow>\$2</mrow><mo d=\'&#x2190;\'></mo></munder>'));
            rules.push(new EDLatextoMmlRules('\\\\underleftrightarrow *<mrow (\\d+)>(.*?)</mrow \\1>', '<munder><mrow>\$2</mrow><mo d=\'&#x2194;\'></mo></munder>'));
            rules.push(new EDLatextoMmlRules('\\\\xrightarrow *\\[(.*?)\\] *<mrow (\\d+)>(.*?)</mrow \\2>', '<munderover><mo d=\'&#x2192;\'></mo><mrow>\$2</mrow><mrow>\$3</mrow></munderover>'));
            rules.push(new EDLatextoMmlRules('\\\\xleftarrow *\\[(.*?)\\] *<mrow (\\d+)>(.*?)</mrow \\2>', '<munderover><mo d=\'&#x2190;\'></mo><mrow>\$2</mrow><mrow>\$3</mrow></munderover>'));
            /*  可以添加字符的转换
            rules.push(new EDLatextoMmlRules(
                                "",
                                ""
                            ));
            */
            return rules;
        }; // 初始化值查找
        /**
         * @brief initmatrixRules 不同的矩阵环境(统一转换为\begin{array}...\end{array))
         */
        EDLatextoMML.prototype.initmatrixRules = function () {
            var matrixRules = [];
            // -------------------environment-------------------------begin----------------------------------------end-------------------------------
            matrixRules.push(new EDmatrixRules('matrix', ' \\begin{array}{*{20}{c}} ', ' \\end{array} '));
            matrixRules.push(new EDmatrixRules('smallmatrix', ' \\begin{array}{*{20}{c}} ', ' \\end{array} '));
            matrixRules.push(new EDmatrixRules('vmatrix', ' \\left| { \\begin{array}{*{20}{c}} ', ' \\end{array} } \\right| '));
            matrixRules.push(new EDmatrixRules('Vmatrix', ' \\left\\Vert { \\begin{array}{*{20}{c}} ', ' \\end{array} } \\right\\Vert '));
            matrixRules.push(new EDmatrixRules('bmatrix', ' \\left[ { \\begin{array}{*{20}{c}} ', ' \\end{array} } \\right] '));
            matrixRules.push(new EDmatrixRules('Bmatrix', ' \\left\\{ { \\begin{array}{*{20}{c}} ', ' \\end{array} } \\right\\} '));
            matrixRules.push(new EDmatrixRules('pmatrix', ' \\left( { \\begin{array}{*{20}{c}} ', ' \\end{array} } \\right) '));
            matrixRules.push(new EDmatrixRules('align', ' \\begin{array}{*{20}{l}} ', ' \\end{array} '));
            matrixRules.push(new EDmatrixRules('cases', ' \\left\\{ { \\begin{array}{*{20}{l}} ', ' \\end{array} } \\right. '));
            matrixRules.push(new EDmatrixRules('equation', ' ', ' '));
            return matrixRules;
        };
        /**
         * @brief initLatex 对latex格式进行预处理
         * @param latex latex格式文本
         * @return 返回处理后的latex
         */
        EDLatextoMML.prototype.initLatex = function (latex) {
            // 为一些参数加上 {}
            latex = latex.replace(new RegExp('(\\_|\\^) *([a-zA-Z0-9])'), '\$1{\$2}');
            latex = latex.replace(new RegExp('\\\\sqrt( *[0-9]| +[a-zA-Z])'), '\\sqrt{\$1}');
            latex = latex.replace(new RegExp('\\\\frac( *[0-9]| +[a-zA-Z0-9]) *([a-zA-Z0-9])'), '\\frac{\$1}{\$2}');
            latex = latex.replace(new RegExp('\\\\mathop +([a-zA-Z0-9])\\\\nolimits(\\_|\\^)'), '{\$1}\$2');
            latex = latex.replace(new RegExp('\\\\mathop +([a-zA-Z0-9])\\\\limits(\\_|\\^)'), '\\mathop{\$1}\\limits\$2');
            latex = latex.replace(new RegExp('\\\\rm( *[0-9]| +[a-zA-Z0-9])'), '\\rm{\$1}');
            latex = latex.replace(new RegExp('\\\\tilde( *[0-9]| +[a-zA-Z0-9])'), '\\tilde{\$1}');
            latex = latex.replace(new RegExp('\\\\widetilde( *[0-9]| +[a-zA-Z0-9])'), '\\widetilde{\$1}');
            latex = latex.replace(new RegExp('\\\\hat( *[0-9]| +[a-zA-Z0-9])'), '\\hat{\$1}');
            latex = latex.replace(new RegExp('\\\\widehat( *[0-9]| +[a-zA-Z0-9])'), '\\widehat{\$1}');
            latex = latex.replace(new RegExp('\\\\bar( *[0-9]| +[a-zA-Z0-9])'), '\\bar{\$1}');
            latex = latex.replace(new RegExp('\\\\overline( *[0-9]| +[a-zA-Z0-9])'), '\\overline{\$1}');
            latex = latex.replace(new RegExp('\\\\vec( *[0-9]| +[a-zA-Z0-9])'), '\\vec{\$1}');
            latex = latex.replace(new RegExp('\\\\overrightarrow( *[0-9]| +[a-zA-Z0-9])'), '\\overrightarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\overleftarrow( *[0-9]| +[a-zA-Z0-9])'), '\\overleftarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\overleftrightarrow( *[0-9]| +[a-zA-Z0-9])'), '\\overleftrightarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\check( *[0-9]| +[a-zA-Z0-9])'), '\\check{\$1}');
            latex = latex.replace(new RegExp('\\\\acute( *[0-9]| +[a-zA-Z0-9])'), '\\acute{\$1}');
            latex = latex.replace(new RegExp('\\\\grave( *[0-9]| +[a-zA-Z0-9])'), '\\grave{\$1}');
            latex = latex.replace(new RegExp('\\\\dot( *[0-9]| +[a-zA-Z0-9])'), '\\dot{\$1}');
            latex = latex.replace(new RegExp('\\\\ddot( *[0-9]| +[a-zA-Z0-9])'), '\\ddot{\$1}');
            latex = latex.replace(new RegExp('\\\\breve( *[0-9]| +[a-zA-Z0-9])'), '\\breve{\$1}');
            latex = latex.replace(new RegExp('\\\\xrightarrow( *[0-9]| +[a-zA-Z0-9])'), '\\xrightarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\xleftarrow( *[0-9]| +[a-zA-Z0-9])'), '\\xleftarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\underline( *[0-9]| +[a-zA-Z0-9])'), '\\underline{\$1}');
            latex = latex.replace(new RegExp('\\\\underrightarrow( *[0-9]| +[a-zA-Z0-9])'), '\\underrightarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\underleftarrow( *[0-9]| +[a-zA-Z0-9])'), '\\underleftarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\underleftrightarrow( *[0-9]| +[a-zA-Z0-9])'), '\\underleftrightarrow{\$1}');
            latex = latex.replace(new RegExp('\\\\xrightarrow *\\[(.*?)\\] *([a-zA-Z0-9])', 'g'), '\\xrightarrow[\$1]{\$2}');
            latex = latex.replace(new RegExp('\\\\xleftarrow *\\[(.*?)\\] *([a-zA-Z0-9])', 'g'), '\\xleftarrow[\$1]{\$2}');
            latex = latex.replace(new RegExp('\\\\sqrt *\\[(.*?)\\] *([a-zA-Z0-9])', 'g'), '\\sqrt[\$1]{\$2}');
            // 将不同的矩阵环境统一转换为\begin{array}...\end{array}
            var pattern = '\\\\(begin|end)\\{(.*?)\\}';
            var rx = new RegExp(pattern);
            var pos = 0;
            var mtableStack = []; // 保存 begin 的信息
            var matrixRules = this.initmatrixRules();
            for (var i = 0; i < matrixRules.length; i++) {
                var rule = matrixRules[i];
                pattern = '\\\\(begin|end)\\{' + rule.environment + '\\}';
                rx = new RegExp(pattern, 'g');
                pos = 0;
                // 匹配 begin end
                var rxa_1 = void 0; // = rx.exec(latex);
                while ((rxa_1 = rx.exec(latex)) != null) {
                    // console.log(`${rxa}`);
                    var length_1 = rxa_1[0].length;
                    pos = rx.lastIndex - length_1;
                    if (rxa_1[1] === 'begin') { // begin
                        var mtableInfo = new mtableMatch(rule.begin, rule.end, pos, length_1);
                        mtableStack.push(mtableInfo);
                    }
                    else if (rxa_1[1] === 'end' && mtableStack.length > 0) { // end
                        var mtableInfo = mtableStack.pop();
                        latex = latex.replace(rxa_1[0], mtableInfo.end);
                        // let str:string = latex.slice(mtableInfo.index, mtableInfo.index+mtableInfo.len);
                        // latex = latex.replace(str, mtableInfo.begin);
                        latex = latex.slice(0, mtableInfo.index) + mtableInfo.begin + latex.slice(mtableInfo.index + mtableInfo.len);
                    }
                }
                mtableStack.splice(0);
            }
            /*
             * 将\begin{array}{*{20}{c}} 转换为<mtable columnalign='center'><mtr><mtd>
             *   \begin{array}{*{20}{l}} 转换为<mtable columnalign='left'><mtr><mtd>
             *   \begin{array}{*{20}{r}} 转换为<mtable columnalign='right'><mtr><mtd>
             *   \end{array} 转换为 </mtd></mtr></mtable>
             */
            pattern = '(\\\\begin\\{array\\}\\{\\*\\{20\\}\\{[c|l|r]\\}\\}|\\\\end\\{array\\})';
            rx = new RegExp(pattern, 'g');
            pos = 0;
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null) {
                // console.log(`${rxa} ${latex}`);
                var length_2 = rxa[0].length;
                pos = rx.lastIndex - length_2;
                if (rxa[1] === '\\begin{array}{*{20}{c}}') {
                    var count = (++this._currentCount).toString();
                    var mtableInfo = new mtableMatch('<mrow ' + count + '><mtable columnalign=\'center\'><mtr><mtd>', '</mtd></mtr></mtable></mrow ' + count + '>', pos, length_2); // rxa[1].length);
                    mtableStack.push(mtableInfo);
                }
                else if (rxa[1] === '\\begin{array}{*{20}{l}}') {
                    var count = (++this._currentCount).toString();
                    var mtableInfo = new mtableMatch('<mrow ' + count + '><mtable columnalign=\'left\'><mtr><mtd>', '</mtd></mtr></mtable></mrow ' + count + '>', pos, length_2); // rxa[1].length);
                    mtableStack.push(mtableInfo);
                }
                else if (rxa[1] === '\\begin{array}{*{20}{r}}') {
                    var count = (++this._currentCount).toString();
                    var mtableInfo = new mtableMatch('<mrow ' + count + '><mtable columnalign=\'right\'><mtr><mtd>', '</mtd></mtr></mtable></mrow ' + count + '>', pos, length_2); // rxa[1].length);
                    mtableStack.push(mtableInfo);
                }
                else if (rxa[1] === '\\end{array}' && mtableStack.length > 0) {
                    var mtableInfo = mtableStack.pop();
                    latex = latex.replace(rxa[1], mtableInfo.end);
                    // let str:string = latex.slice(mtableInfo.index, mtableInfo.index+mtableInfo.len);
                    // latex = latex.replace(str, mtableInfo.begin);
                    latex = latex.slice(0, mtableInfo.index) + mtableInfo.begin + latex.slice(mtableInfo.index + mtableInfo.len);
                }
            }
            mtableStack.splice(0);
            return latex;
        };
        /**
         * @brief initAgain 对latex格式进行再次处理
         * @param latex latex格式文本
         * @return 返回处理后的latex
         */
        EDLatextoMML.prototype.initAgain = function (latex) {
            // 处理一些标签中的参数有嵌套的情况
            var pattern = '\\\\frac( *[0-9]| +[a-zA-Z]) *<mrow (\\d+)>(.*?)</mrow \\2>';
            var rx = new RegExp(pattern, 'g');
            var str = '';
            // let pos =0;
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null) {
                // pos = rx.lastIndex;
                var count1 = (++this._currentCount).toString();
                var count2 = (++this._currentCount).toString();
                str = '<mrow ' + count1 + '>\\frac<mrow ' + count2 + '>' + rxa[1] + '</mrow ' + count2 + '><mrow ' + rxa[2] + '>' + rxa[3] + '</mrow ' + rxa[2] + '></mrow ' + count1 + '>';
                latex = latex.replace(rxa[0], str);
                if (rx.exec(rxa[3]) == null) {
                    // pos++;
                }
                else {
                    rx = new RegExp(pattern, 'g');
                    // pos = 0;
                }
            }
            pattern = '\\\\frac *<mrow (\\d+)>(.*?)</mrow \\1> *([a-zA-Z0-9])';
            rx = new RegExp(pattern, 'g');
            // pos = 0;
            while ((rxa = rx.exec(latex)) != null) {
                // pos = rx.lastIndex;
                var count1 = (++this._currentCount).toString();
                var count2 = (++this._currentCount).toString();
                str = '<mrow ' + count1 + '>\\frac<mrow ' + rxa[1] + '>' + rxa[2] + '</mrow ' + rxa[1] + '><mrow ' + count2 + '>' + rxa[3] + '</mrow ' + count2 + '></mrow ' + count1 + '>';
                latex = latex.replace(rxa[0], str);
                if (rx.exec(rxa[2]) == null) {
                    // pos++;
                }
                else {
                    rx = new RegExp(pattern, 'g');
                    // pos = 0;
                }
            }
            // 将 \mathop{...}nolimits(_|^) 转为 {...}(_|^)
            pattern = '\\\\mathop *<mrow (\\d+)>(.*?)</mrow \\1> *\\\\nolimits(\\_|\\^)';
            rx = new RegExp(pattern, 'g');
            // pos = 0;
            while ((rxa = rx.exec(latex)) != null) {
                // pos = rx.lastIndex;
                latex = latex.replace(rxa[0], '<mrow ' + rxa[1] + '>' + rxa[2] + '</mrow ' + rxa[1] + '>' + rxa[3]);
                if (rx.exec(rxa[2]) == null) {
                    // pos++;
                }
                else {
                    rx = new RegExp(pattern, 'g');
                    // pos = 0;
                }
            }
            // console.log(`initAgain=${latex}`);
            return latex;
        };
        /**
         * @brief mtable 处理latex格式对应mml的<mtable>标签的部分
         * @param pos 开始的下标
         * @param len 需要处理部分的长度
         * @return 返回处理后的长度
         */
        EDLatextoMML.prototype.mtable = function (pos, len) {
            // console.log(`pos = ${pos} len = ${len}`);
            var pattern = '<mrow (\\d+)><mtable( columnalign=\'left\'| columnalign=\'center\'| columnalign=\'right\')?><mtr><mtd>(.*)</mtd></mtr></mtable></mrow \\1>';
            var rx = new RegExp(pattern, 'g');
            var index = pos;
            var start = pos;
            var latexpos = 0;
            var flag = true;
            var latex = this._latex.slice(index, index + len);
            // 递归处理 array 标签中的 & \\ 符号 (& => mtd  \\ => mtr）
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null || (flag && index !== 0)) {
                if (rxa != null) {
                    pos = rx.lastIndex - rxa[0].length;
                }
                else {
                    pos = -1;
                }
                // console.log(`rxa=${rxa} pos=${pos}`);
                var latex2 = latex;
                if (pos > -1) {
                    var length_3 = rxa[3].length;
                    // 计算下一个latex在_latex的开始位置
                    start = start + pos + 25 + rxa[1].length + rxa[2].length;
                    var x = this.mtable(start, length_3); // 递归
                    len = len - length_3 + x;
                    latex = this._latex.slice(index, index + len); // 递归后的latex
                    latexpos = pos + rxa[0].length; // 下一次匹配的起点
                    latex2 = latex.slice(pos, pos + rxa[0].length - length_3 + x); // 需要进行转换的latex部分
                }
                else {
                    pos = 0;
                }
                var latex2len = latex2.length;
                var pattern2 = '> *&';
                var rx2 = new RegExp(pattern2, 'g');
                // while(rx2.exec(latex2) != null) {
                latex2 = latex2.replace(rx2, '></mtd><mtd>');
                // }
                pattern2 = '\\\\\\\\';
                rx2 = new RegExp(pattern2, 'g');
                latex2 = latex2.replace(rx2, '</mtd></mtr><mtr><mtd>');
                // let str: string = latex.slice(pos, pos+latex2len);
                // latex = latex.replace(str, latex2);
                latex = latex.slice(0, pos) + latex2 + latex.slice(pos + latex2len);
                // str = this._latex.slice(index, len);
                // this._latex = this._latex.replace(str, latex);
                this._latex = this._latex.slice(0, index) + latex + this._latex.slice(index + len);
                len = latex.length;
                flag = false;
            }
            return len;
        };
        /**
         * @brief mroot 处理latex格式对应mml的<mroot>标签的部分
         * @param latex latex格式文本
         * @return 返回处理后的字符串
         */
        EDLatextoMML.prototype.mroot = function (latex) {
            var pattern = '\\\\sqrt *\\[(.*?)\\] *<mrow (\\d+)>(.*?)</mrow \\2>';
            var rx = new RegExp(pattern, 'g');
            // let pos:number = -1;
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null) {
                // pos = rx.lastIndex;
                var str = rxa[0];
                var param1 = rxa[3];
                var param2 = rxa[1];
                if (rx.exec(str) == null) { // 判断是否有嵌套
                    var count = (++this._currentCount).toString();
                    latex = latex.replace(str, '<mrow ' + count + '><mroot><mrow>' + param1 + '</mrow><mrow>' + param2 + '</mrow></mroot></mrow ' + count + '>');
                    rx = new RegExp(pattern, 'g');
                    // pos = 0;
                }
            }
            return latex;
        };
        /**
         * @brief munderover 处理latex格式对应mml的<munder><mover><munderover>标签的部分
         * @param latex latex格式文本
         * @return 返回处理后的字符串
         */
        EDLatextoMML.prototype.munderover = function (latex) {
            var munder = '';
            var mover = '';
            var str = '';
            var pattern = '\\\\mathop *<mrow (\\d+)>(.*?)</mrow \\1> *\\\\limits *\\_ *<mrow (\\d+)>(.*?)</mrow \\3> *\\^ *<mrow (\\d+)>(.*?)</mrow \\5>';
            var rx = new RegExp(pattern, 'g');
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null) { // munderover
                var base = rxa[2];
                var munder_1 = rxa[4];
                var mover_1 = rxa[6];
                // munder = munderover2;
                // mover = munderover3;
                var count = (++this._currentCount).toString();
                str = '<mrow ' + count + '><munderover><mrow>' + base + '</mrow><mrow>' + munder_1 + '</mrow><mrow>' + mover_1 + '</mrow></munderover></mrow ' + count + '>';
                latex = latex.replace(rxa[0], str);
            }
            pattern = '\\\\mathop *<mrow (\\d+)>(.*?)</mrow \\1> *\\\\limits *(\\_|\\^) *<mrow (\\d+)>(.*?)</mrow \\4>';
            rx = new RegExp(pattern, 'g');
            while ((rxa = rx.exec(latex)) != null) { // munder 或 mover
                var param1 = rxa[2];
                var param2 = rxa[5];
                var count = (++this._currentCount).toString();
                if (rxa[3] === '_') {
                    munder = '<mrow ' + count + '><munder><mrow>' + param1 + '</mrow><mrow>' + param2 + '</mrow></munder></mrow ' + count + '>';
                    latex = latex.replace(rxa[0], munder);
                }
                else if (rxa[3] === '^') {
                    mover = '<mrow ' + count + '><mover><mrow>' + param1 + '</mrow><mrow>' + param2 + '</mrow></mover></mrow ' + count + '>';
                    latex = latex.replace(rxa[0], mover);
                }
            }
            return latex;
        };
        /**
         * @brief msubsup 处理latex格式对应mml的<msub><msup><msubsup>标签的部分
         * @param latex latex格式文本
         * @return 返回处理后的字符串
         */
        EDLatextoMML.prototype.msubsup = function (latex) {
            var msup = '';
            var msub = '';
            var str = '';
            var pattern = '(.*?)\\_ *<mrow (\\d+)>(.*?)</mrow \\2> *\\^ *<mrow (\\d+)>(.*?)</mrow \\4>';
            var rx = new RegExp(pattern, 'g');
            var rxa; // = rx.exec(latex);
            while ((rxa = rx.exec(latex)) != null) { // msubsup
                var msubsup1 = rxa[1];
                var msubsup2 = rxa[3];
                var msubsup3 = rxa[5];
                // 提取底数部分
                var patt = '>(\\d+) worm/<(.*?)>\\1 worm<';
                var rxx = new RegExp(patt, 'g');
                msubsup1 = this.reverseStr(msubsup1);
                var rxxa = void 0; // = rxx.exec(msubsup1);
                if ((rxxa = rxx.exec(msubsup1)) != null) {
                    str = this.reverseStr(rxxa[0]);
                    msubsup1 = msubsup1.replace(rxxa[0], '');
                }
                msubsup1 = this.reverseStr(msubsup1);
                // 整合
                msub = msubsup2;
                msup = msubsup3;
                var count = (++this._currentCount).toString();
                var msubsup = msubsup1 + '<mrow ' + count + '><msubsup><mrow>' + str + '</mrow><mrow>' + msub + '</mrow><mrow>' + msup + '</mrow></msubsup></mrow ' + count + '>';
                latex = latex.replace(rxa[0], msubsup);
            }
            pattern = '(.*?) *(\\_|\\^) *<mrow (\\d+)>(.*?)</mrow \\3>';
            rx = new RegExp(pattern, 'g');
            while ((rxa = rx.exec(latex)) != null) { // msub 或 msup
                var param1 = rxa[1];
                var param2 = rxa[4];
                // 提取底数部分
                var patt = '>(\\d+) worm/<(.*?)>\\1 worm<';
                var rxx = new RegExp(patt, 'g');
                param1 = this.reverseStr(param1);
                var rxxa = void 0; // = rxx.exec(param1);
                if ((rxxa = rxx.exec(param1)) != null) {
                    str = this.reverseStr(rxxa[0]);
                    param1 = param1.replace(rxxa[0], '');
                }
                // 整合
                param1 = this.reverseStr(param1);
                var count = (++this._currentCount).toString();
                if (rxa[2] === '_') {
                    msub = param1 + '<mrow ' + count + '><msub>' + str + param2 + '</msub></mrow ' + count + '>';
                    latex = latex.replace(rxa[0], msub);
                }
                else if (rxa[2] === '^') {
                    msup = param1 + '<mrow ' + count + '><msup>' + str + param2 + '</msup></mrow ' + count + '>';
                    latex = latex.replace(rxa[0], msup);
                }
            }
            return latex;
        };
        /**
         * @brief reverseStr 将字符串倒序
         * @param str 需要倒序的字符串
         * @return 返回倒序后的字符串
         */
        EDLatextoMML.prototype.reverseStr = function (str) {
            var result = '';
            for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
                var ch = str_1[_i];
                result = ch + result;
            }
            return result;
        };
        /**
         * @brief removeMrow 将mml格式中不必要的<mrow></mrow>删去
         * @return 是否正确
         */
        EDLatextoMML.prototype.removeMrow = function () {
            // 如： <mrow> => <mrow 1> 和 </mrow> => </mrow 1>
            var pattern = '(<mrow>|</mrow>)';
            var rx = new RegExp(pattern, 'g');
            // let pos:number = -1;
            var stack = [];
            var rxa; // = rx.exec(this._latex);
            while ((rxa = rx.exec(this._latex)) != null) {
                // pos = rx.lastIndex;
                var str = rxa[1];
                if (str === '<mrow>') {
                    var count = (++this._currentCount).toString();
                    stack.push(count);
                    this._latex = this._latex.replace('<mrow>', '<mrow ' + count + '>');
                }
                if (str === '</mrow>' && stack.length > 0) {
                    var count = stack.pop();
                    this._latex = this._latex.replace('</mrow>', '</mrow ' + count + '>');
                }
            }
            // ----------------转换成xml格式,使用Dom来处理---------------------
            var simple = this._latex;
            pattern = '<mrow (\\d+)>';
            rx = new RegExp(pattern, 'g');
            simple = simple.replace(rx, '<mrow id=\'\$1\'>');
            pattern = '</mrow (\\d+)>';
            rx = new RegExp(pattern, 'g');
            simple = simple.replace(rx, '</mrow>');
            var domparser = new DOMParser();
            var doc = domparser.parseFromString(simple, 'text/xml');
            if (null == doc) {
                return false;
            }
            var root = doc.documentElement; // 返回根节点
            this.simplify(root);
            // ------------------------------------------------------------
            // {}_{}^{}..._{}^{}转换为mmultiscripts标签
            // 为msubsup加上序号，便于匹配
            pattern = '(<msubsup>|</msubsup>)';
            rx = new RegExp(pattern, 'g');
            // pos = -1;
            var msubsupStack = [];
            while ((rxa = rx.exec(this._latex)) != null) {
                // pos = rx.lastIndex;
                var str = rxa[1];
                if (str === '<msubsup>') {
                    var count = (++this._currentCount).toString();
                    msubsupStack.push(count);
                    this._latex = this._latex.replace('<msubsup>', '<msubsup ' + count + '>');
                }
                if (str === '</msubsup>' && msubsupStack.length > 0) {
                    var count = msubsupStack.pop();
                    this._latex = this._latex.replace('</msubsup>', '</msubsup ' + count + '>');
                }
            }
            // 匹配{}_{}^{}..._{}^{}
            pattern = '<msubsup (\\d+)> *<mrow (\\d+)> *</mrow \\2> *<mrow (\\d+)> *</mrow \\3> *<mrow (\\d+)> *</mrow \\4> *</msubsup \\1> *<msubsup (\\d+)>(.*?)<mrow (\\d+)> *</mrow \\7> *<mrow (\\d+)> *</mrow \\8> *</msubsup \\5>';
            rx = new RegExp(pattern, 'g');
            while ((rxa = rx.exec(this._latex)) != null) {
                this._latex = this._latex.replace(rx, '<mmultiscripts>\$6<none/><none/><mprescripts/><none/><none/></mmultiscripts>');
            }
            // 如： <msubsup 1> => <msubsup> 和 </msubsup 1> => </msubsup>
            pattern = '<msubsup (\\d+)>';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<msubsup>');
            pattern = '</msubsup (\\d+)>';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '</msubsup>');
            // 如： <mrow 1> => <mrow> 和 </mrow 1> => </mrow>
            pattern = '(<mrow \\d+>)';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mrow>');
            pattern = '(</mrow \\d+>)';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '</mrow>');
            return true;
        };
        /**
         * @brief simplify 递归遍历mml删去不必要的<mrow></mrow>
         * @param root mml格式的Dom的节点
         */
        EDLatextoMML.prototype.simplify = function (root) {
            // 统计标签root的子节点个数
            var childNum = 0;
            var child = root.firstElementChild;
            while (null != child) {
                childNum++;
                this.simplify(child);
                child = child.nextElementSibling;
            }
            // 标签为mrow 且 子节点只有一个 则去除这个mrow节点
            if (root.nodeName === 'mrow' && childNum === 1) {
                var id = root.getAttribute('id');
                var pattern = '<mrow ' + id + '>';
                var rx = new RegExp(pattern);
                this._latex = this._latex.replace(rx, '');
                pattern = '</mrow ' + id + '>';
                rx = new RegExp(pattern);
                this._latex = this._latex.replace(rx, '');
            }
        };
        // [0] chb 新增
        /**
         * @brief toMathML 将latex格式转化为mml格式
         * @param latex latex文本
         * @return 是否转换成功
         */
        EDLatextoMML.prototype.toMathML = function (latex) {
            this._latex = latex;
            //    qDebug() <<_latex;
            // ------------------------处理开始结束符号----------------------------
            // 将 \n \r \t 的转义符号 替换为 空格
            this._latex = this._latex.replace(/\n/g, ' ');
            this._latex = this._latex.replace(/\r/g, ' ');
            this._latex = this._latex.replace(/\t/g, ' ');
            this._latex = this.initLatex(this._latex);
            this._latex = this._latex.trim();
            // 最前面有 \[ $ 都删除  最后面有 \] $ 都删除
            this._latex = this._latex.replace(/\\\[/g, '');
            this._latex = this._latex.replace(/\\\]/g, '');
            this._latex = this._latex.replace(/\$/g, '');
            this._latex = this._latex.trim();
            this._latex = '<math>' + this._latex + '</math>';
            // -----------------------------------------------------------------
            // --------------括号的处理(\left| ... \right| )--------------------
            // 例如：\left( ... \right) -> <mo>(</mo>...<mo>)</mo>
            var pattern = '\\\\(left|right) *(\\(|\\)|\\.|\\\\\\{|\\\\\\}|\\[|\\]|\\||\\\\lfloor|\\\\rfloor|\\\\lceil|\\\\rceil|\\\\langle|\\\\rangle|\\\\vert|\\\\Vert|\\\\\\|)';
            var rx = new RegExp(pattern, 'g');
            // rx.setMinimal(true);
            var pos = 0;
            var length = 0;
            var bracketStack = []; // 保存左边括号的信息
            var charMatch = EDLatextoMML.initCharMatch();
            var rxa; // = rx.exec(this._latex);
            while ((rxa = rx.exec(this._latex)) != null) {
                // console.log(`rxa=${rxa}`);
                length = rxa[0].length;
                pos = rx.lastIndex - length;
                var param1 = rxa[1];
                var param2 = rxa[2];
                // console.log(`param1=${param1} param2=${param2}`)
                if (param1 === 'left') { // 左边括号、压进bracketStack
                    var binfo = new bracketInfo(param2, pos, length);
                    bracketStack.push(binfo);
                }
                else if (bracketStack.length > 0 && param1 === 'right') { // 右边括号
                    // 将右边括号转为mml
                    if (param2 === '.') {
                        param2 = '';
                    }
                    else {
                        param2 = ' {<mo d=\'' + charMatch.get(param2) + '\'></mo>} ';
                    }
                    this._latex = this._latex.slice(0, pos) + param2 + this._latex.slice(pos + length);
                    // 将左边括号转为mml
                    var binfo = bracketStack.pop();
                    if (binfo.bracket === '.') {
                        binfo.bracket = '';
                    }
                    else {
                        binfo.bracket = ' {<mo d=\'' + charMatch.get(binfo.bracket) + '\'></mo>} ';
                    }
                    this._latex = this._latex.slice(0, binfo.index) + binfo.bracket + this._latex.slice(binfo.index + binfo.len);
                    length = -length + param2.length + binfo.bracket.length - binfo.len;
                }
            }
            //console.log(`toMathML while 1 ${this._latex}`);
            bracketStack.splice(0);
            // ---------------------------------------------------------------
            // ---------将{...}转化为对应的<mrow \d+>...</mrow \d+>,便于处理---------
            pattern = '(\\{|\\})';
            rx = new RegExp(pattern, 'g');
            pos = -1;
            var stack = [];
            while ((rxa = rx.exec(this._latex)) != null) {
                pos = rx.lastIndex - 1;
                // console.log(`${rxa} ${pos} ${stack}`);
                // pos = pos+1 + this._latex.slice(pos+1).search(rx);
                var str_2 = rxa[1];
                if (this._latex.charAt(pos - 1) === '\\') { // \{ \} 则跳过
                    // console.log(`跳过 `);
                    continue;
                }
                if (str_2 === '{') {
                    var count = (++this._currentCount).toString();
                    stack.push(count);
                    this._latex = this._latex.replace(rxa[1], '<mrow ' + count + '>');
                    // this._latex = this._latex.slice(0,pos-1)+"<mrow "+count+">"+this._latex.slice(pos);
                    // console.log(`${this._latex}`);
                }
                else if (str_2 === '}' && stack.length <= 0) { // latex公式有误
                    console.log("latex\u516C\u5F0F\u6709\u8BEF ".concat(this._latex));
                    return false;
                }
                else if (str_2 === '}' && stack.length > 0) {
                    var count = stack.pop();
                    this._latex = this._latex.replace(rxa[1], '</mrow ' + count + '>');
                    // this._latex = this._latex.slice(0,pos-1)+"</mrow "+count+">"+this._latex.slice(pos);
                    // console.log(`${this._latex}`);
                }
            }
            if (stack.length > 0) { // latex公式有误
                console.log("latex\u516C\u5F0F\u6709\u8BEF ".concat(this._latex));
                return false;
            }
            //console.log(`toMathML while 2 ${this._latex}`);
            // ----------------------------------------------------------------
            // ------------------------处理简单的标签和字符------------------------
            this._latex = this.initAgain(this._latex);
            var rules = this.initRules();
            for (var i = 0; i < rules.length; i++) {
                pattern = rules[i].latex;
                rx = new RegExp(pattern, 'g');
                // 与 EDLatextoMmlRules 中的字符、标签匹配则替换
                while ((rxa = rx.exec(this._latex)) != null) {
                    var mml = rules[i].mml;
                    var count = (++this._currentCount).toString();
                    this._latex = this._latex.replace(rx, '<mrow ' + count + '>' + mml + '</mrow ' + count + '>');
                    this._latex = this.initAgain(this._latex);
                }
            }
            //console.log(`toMathML while 2.5 ${this._latex}`);
            /*
             * 处理\rm{} 中嵌套到其他字符(如：\int) 或者 其他标签(如：\frac{a}{b})
             * 处理例子：\rm{abc \int def} => \rm{abc} \int \rm{def}
             */
            pattern = '<mrow (\\d+)><mtext d=\'(.*?)\'></mtext></mrow \\1>';
            rx = new RegExp(pattern, 'g');
            var ppp = '<mrow (\\d+)>(.*?)</mrow \\1>';
            var rrr = new RegExp(ppp, 'g');
            var start = 0;
            while ((rxa = rx.exec(this._latex)) != null) {
                // console.log(`rxa=${rxa}`);
                pos = rx.lastIndex;
                // pos = start+this._latex.slice(start).search(rx);
                var mtextStr = rxa[2];
                var strList = [];
                var begin = 0;
                var index = 0;
                var flag_1 = false; // mtextStr 是否能找到 rrr
                var rrrxa = void 0; // = rrr.exec(mtextStr);
                while ((rrrxa = rrr.exec(mtextStr)) != null) {
                    // console.log(`rrrxa=${rxa}`);
                    index = rrr.lastIndex;
                    // index = begin+mtextStr.slice(begin).search(rrr);
                    flag_1 = true;
                    strList.push(mtextStr.slice(begin, begin + index - begin));
                    strList.push(mtextStr.slice(index, index + rrrxa[0].length));
                    // console.log(`str1=${str1} str2=${str2}`);
                    begin = index + rrrxa[0].length;
                }
                if (flag_1 === false) {
                    start = pos + rxa[0].length;
                }
                else {
                    rx = new RegExp(pattern, 'g');
                    start = 0;
                }
                strList.push(mtextStr.slice(begin));
                mtextStr = '';
                // console.log(`${strList}`);
                for (var i = 0; i < strList.length; i++) {
                    var pat = '^ *$';
                    var r = new RegExp(pat);
                    var str_3 = strList[i];
                    if (str_3.search(r) > -1) { // 为空或者全为空格
                        continue;
                    }
                    var count = (++this._currentCount).toString();
                    if (str_3.search(rrr) > -1) { // \rm中嵌套的字符或标签部分
                        mtextStr += '<mrow ' + count + '>' + str_3 + '</mrow ' + count + '>';
                    }
                    else { // \rm部分
                        str_3 = str_3.replace(/" "/g, '');
                        mtextStr += '<mrow ' + count + '><mtext d=\'' + str_3 + '\'></mtext></mrow ' + count + '>';
                    }
                }
                this._latex = this._latex.replace(rxa[0], mtextStr);
            }
            // ---------------------------------------------------------------
            // --------------------------mroot--------------------------------
            this._latex = this.mroot(this._latex);
            // ---------------------------------------------------------------
            // ------------------------munderover-----------------------------
            this._latex = this.munderover(this._latex);
            // --------------------------------------------------------------
            // ---------------------重构格式，便于处理--------------------------
            //console.log(`toMathML while 3 ${this._latex}`);
            pattern = '(math|mrow|mrow \\d+|mfrac|msqrt|mroot|msub|msup|msubsup|munder|mover|munderover|mtable|mtr|mtd|mo|mn|mi|mtext)>(.*?)<';
            // pattern += "(math|mrow|mfrac|msqrt|mroot|msub|msup|msubsup|munder|mover|munderover|mtable|mtr|mtd|mo|mn|mi|mtext|";
            // pattern += "/mtext|/mi|/mn|/mo|/mtd|/mtr|/mtable|/munderover|/mover|/munder|/msubsup|/msup|/msub|/mroot|/msqrt|/mfrac|/mrow|/math)";
            rx = new RegExp(pattern, 'g');
            pos = 0;
            var len = 0;
            var str = '';
            // 重构标签中的内容，如<mn>a</mn> => <mn d='a'></mn>
            while ((rxa = rx.exec(this._latex)) != null) {
                // console.log(rxa);
                pos = rx.lastIndex;
                len = rxa[2].length + 1;
                // pos += rxa[1].length;
                str = rxa[2];
                if (str === '') {
                    pos++;
                    continue;
                }
                // if(str.startsWith("\\") != null){
                //    pos++;
                //    continue;
                // }
                var pat = '( +)';
                var reg = new RegExp(pat, 'g');
                var rega = void 0; // = reg.exec(str);
                if ((rega = reg.exec(str)) != null) {
                    // console.log(`${str.length}  ${rega[0].length}`);
                    if (str.length === rega[0].length) {
                        pos++;
                        continue;
                    }
                }
                var strList = [];
                for (var i = 0; i < str.length; i++) {
                    strList.push(str[i]);
                }
                var pattern2 = '([\\d])';
                var rx2 = new RegExp(pattern2);
                var pattern3 = '([a-zA-Z])';
                var rx3 = new RegExp(pattern3);
                var pattern4 = '(?![\\^_& \\\\]).';
                var rx4 = new RegExp(pattern4);
                // [0] chb 新增
                var pattern5 = '[\u4e00-\u9fa5]';
                var rx5 = new RegExp(pattern5);
                // [0]
                // console.log(`!!!!!!!!${strList}`);
                for (var i = 0; i < strList.length; i++) {
                    str = strList[i];
                    if (str.search(rx2) !== -1) { // 数字
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mn d=\'' + str + '\'></mn></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    if (str.search(rx3) !== -1) { // 字母
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mi d=\'' + str + '\'></mi></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    // [1]chb 新增中文的判断
                    if (str.search(rx5) !== -1) { // 中文
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mtext d=\'' + str + '\'></mtext></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    // [1]
                    // 特殊符号
                    if (str === '>') {
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mo d=\'&#x003E;\'></mo></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    if (str === '<') {
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mo d=\'&#x003C;\'></mo></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    // 特殊处理，若放在initRules()函数中转换，会把 \sqtr[]{} 中的[]给置换掉
                    if (str === '[') {
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mtext d=\'&#x005B;\'></mtext></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    if (str === ']') {
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mtext d=\'&#x005D;\'></mtext></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                    if (str.search(rx4) !== -1) { // 其他字符
                        if (str === ';' && (i - 1) >= 0 && strList[i - 1] === '\\') {
                            continue;
                        }
                        var count = (++this._currentCount).toString();
                        str = '<mrow ' + count + '><mo d=\'' + str + '\'></mo></mrow ' + count + '>';
                        strList[i] = str;
                        continue;
                    }
                }
                str = '';
                for (var i = 0; i < strList.length; i++) {
                    str += strList[i];
                }
                this._latex = this._latex.slice(0, pos - rxa[2].length - 1) + str + this._latex.slice(pos - 1);
                //console.log(`str = ${str}`);
            }
            //console.log(`toMathML while 4 ${this._latex}`);
            // --------------------------------------------------------------
            // ------------------------msubsup-------------------------------
            this._latex = this.msubsup(this._latex);
            // --------------------------------------------------------------
            // -------------------------mtable-------------------------------
            this.mtable(0, this._latex.length);
            // console.log(`mtable 0:${this._latex}`);
            pattern = '<mtd></mtd>';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mtd><mrow></mrow></mtd>');
            // console.log(`mtable 1:${this._latex}`)
            // --------------------------------------------------------------
            // -------------------------\、\ 、\、&;-----------------------------
            pattern = '\\\\;';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mo d=\'&#x2009;\'></mo>');
            pattern = '(\\\\ )';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mo d=\'&#x2008;\'></mo>');
            pattern = '(\\\\)';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mo d=\'&#x005C;\'></mo>');
            pattern = '> *&';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '><mo d=\'&#x0026;\'></mo>');
            // --------------------------------------------------------------
            // console.log(`toMathML while 5 ${this._latex}`);
            // -------------------------重构格式------------------------------
            // 如: <mn d='a'></mn> => <mn>a</mn> 和 <mrow 1> => <mrow> 和 </mrow 1> => </mrow>
            pattern = '<(mi|mn|mo|mtext) d=\'(.*?)\'></\\1>';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<\$1>\$2</\$1>');
            pattern = '(<mrow \\d+>)';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '<mrow>');
            pattern = '(</mrow \\d+>)';
            rx = new RegExp(pattern, 'g');
            this._latex = this._latex.replace(rx, '</mrow>');
            // --------------------------------------------------------------
            // ------------------删去不必要的<mrow></mrow>---------------------
            // console.log(`toMathML while 6 ${this._latex}`);
            var flag = this.removeMrow();
            return flag;
            // --------------------------------------------------------------
        };
        /**
         * @brief latexFromFile latex转mml
         * @param latexFile latex文件的路径
         * @param mml mml文本
         * @return 是否转换成功
         */
        EDLatextoMML.prototype.latexFromFile = function (latexFile, mml) {
            // ------------------------读取latex格式的文本------------------------
            /*
            QFile file(latexFile);
            if ( !file.open(QIODevice::ReadOnly  ) )
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

            //-------------------------------------------------------------------

            bool flag = toMathML(text);

            if(flag)
                mml = _latex;
            else
                mml="";

            return flag;*/
            return false;
        };
        /**
         * @brief latexFromStr latex转mml
         * @param latex latex文本
         * @param mml mml文本
         * @return 是否转换成功
         */
        EDLatextoMML.prototype.latexFromStr = function (latex) {
            // 对计算属性初始化
            latex = latex.replace(/\{/g, '{{');
            latex = latex.replace(/\}/g, '}}');
            latex = latex.replace(/\\\{/g, '\\');
            latex = latex.replace(/\\\}/g, '\\');
            latex = latex.replace(new RegExp('\\\\begin\{\{(.*?)\}\}\{\{(.*?)\{\{(.*?)\}\}\{\{(.*?)\}\}\}\}', 'g'), '\\begin{\$1}{\$2{\$3}{\$4}}');
            latex = latex.replace(new RegExp('\\\\begin\{\{(.*?)\}\}', 'g'), '\\begin{\$1}');
            latex = latex.replace(new RegExp('\\\\end\{\{(.*?)\}\}', 'g'), '\\end{\$1}');
            var flag = this.toMathML(latex);
            if (flag) {
                return this._latex;
            }
            return '';
        };
        return EDLatextoMML;
    }());
    EdrawMathDate.EDLatextoMML = EDLatextoMML;
})(EdrawMathDate || (EdrawMathDate = {}));
