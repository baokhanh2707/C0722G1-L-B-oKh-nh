// 静态全局里，
// 里面包括所有静态参数，静态函数
// 全局参数的修改都在这里实现，例如
// static g_v_stretchsize:number = 3.0;//垂直拉升特殊处理的临界比值
// static g_draw_linewidth: number = 0.05;//绘制图形的线条粗细系数
// static g_node_space: number = 0.05;//节点间距系数
// 说明：静态函数是底层接口，不建议随意调用
// tslint:disable-next-line:no-namespace
var EdrawMathDate;
(function (EdrawMathDate) {
    var EDStatic = /** @class */ (function () {
        // static g_mi_height_3_4: string[] = ['b',')','[',']','{','}','|','‖','⌊','⌈','⌉','⌋','⟦','⟧','〈','〉','/']; //字母高度为3/4的列表
        // static g_path_x28: Map<egPoint[], string> = new Map<egPoint[], string>(); //(
        // static g_path_x29: Map<egPoint[], string> = new Map<egPoint[], string>(); //(
        function EDStatic() {
            //插入的公式索引值与Unicode码映射表，
            //早期UI按键使用，发送key，插入value的符号，
            //后期UI按键建议直接发送Unicode码对应的十进制数值作为索引值，相关函数会转换成unicode符号
            EDStatic.g_symboldata = new Map();
            //mathtype 分类1-1
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.le, "<mo>&#x2264;</mo>"); //x2A7D 或 x2264
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ge, "<mo>&#x2265;</mo>"); //x2A7E 或 x2265
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ll, "<mo>&#x226A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.gg, "<mo>&#x226B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.prec, "<mo>&#x227A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.succ, "<mo>&#x227B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.triangleleft, "<mo>&#x22B2;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.triangleright, "<mo>&#x22B3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.thicksim, "<mo>&#x223C;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.asymp, "<mo>&#x2248;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.simeq, "<mo>&#x2243;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.cong, "<mo>&#x2245;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ne, "<mo>&#x2260;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.equiv, "<mo>&#x2261;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.triangleq, "<mo>&#x225C;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.hateq, "<mo>&#x2259;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.doteq, "<mo>&#x2250;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.prop, "<mo>&#x221D;</mo>");
            //mathtype 分类1-2
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Indentation, "<mo>isIndentation!</mo>"); //<mo>&#x200C;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Space_1, "<mo>isSpace_1!</mo>"); //<mo>&#x200B;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Space_2, "<mo>isSpace_2!</mo>"); //<mo>&#x200A;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Space_3, "<mo>isSpace_3!</mo>"); //<mo>&#x2009;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Space_4, "<mo>isSpace_4!</mo>"); //<mo>&#x2009;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Space_5, "<mo>isSpace_5!</mo>"); //<mo>&#x2003;</mo>
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Symbol_LRightArrSLeftArr, "<mo>&#xF2192;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Symbol_SRightArrLLeftArr, "<mo>&#xF2190;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Symbol_LRightVerSLeftVer, "<mo>&#xF21C0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Symbol_SRightVerLLeftVer, "<mo>&#xF21BD;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.hellip, "<mo>&#x2026;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.mellip, "<mo>&#x22EF;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.vellip, "<mo>&#x22EE;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.urellip, "<mo>&#x22F0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rrellip, "<mo>&#x22F1;</mo>");
            //mathtype 分类1-4
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.plusmn, "<mo>&#x00B1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.minusPlus, "<mo>&#x2213;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.times, "<mo>&#x00D7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lowast, "<mo>&#x2217;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.div, "<mo>&#x00F7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.oplus, "<mo>&#x2295;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.otimes, "<mo>&#x2297;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.odot, "<mo>&#x2299;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sdot, "<mo>&#x22C5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.centerdot, "<mo>&#x00B7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.bullet, "<mo>&#x2022;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.scirc, "<mo>&#x2218;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.langle, "<mo>&#x2329;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rangle, "<mo>&#x232A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lobrk, "<mo>&#x301A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.robrk, "<mo>&#x301B;</mo>");
            //mathtype 分类1-5
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LeftRightArr, "<mo>&#x2194;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.RightArr, "<mo>&#x2192;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LeftArr, "<mo>&#x2190;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.UpDownArrow, "<mo>&#x2195;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.UpArrow, "<mo>&#x2191;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DownArrow, "<mo>&#x2193;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleLeftRightArr, "<mo>&#x21D4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleRightArr, "<mo>&#x21D2;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleLeftArr, "<mo>&#x21D0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleUpDownArr, "<mo>&#x21D5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleUpArr, "<mo>&#x21D1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleDownArr, "<mo>&#x21D3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LLeftURightArr, "<mo>&#x2922;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.UpperRightArr, "<mo>&#x2197;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LowerLeftArr, "<mo>&#x2199;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ULeftLRightArr, "<mo>&#x2921;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LowerRightArr, "<mo>&#x2198;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.UpperLeftArr, "<mo>&#x2196;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.RightArrLeftArr, "<mo>&#x21C4;</mo>");
            //        EDStatic.g_symboldata.set( EDMmlFormulaIndex.unknow1_5_3,            "<mo>&#x2942;</mo>"         );
            //        EDStatic.g_symboldata.set( EDMmlFormulaIndex.unknow1_5_4,            "<mo>&#x2944;</mo>"         );
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Equilibrium, "<mo>&#x21CC;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.RightTeeArr, "<mo>&#x21A6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.enter, "<mo>&#x21B5;</mo>");
            //mathtype 分类1-6
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.there4, "<mo>&#x2234;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.becaus, "<mo>&#x2235;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.backepsilon, "<mo>&#x220D;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.exist, "<mo>&#x2203;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.forall, "<mo>&#x2200;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Not, "<mo>&#x00AC;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.And, "<mo>&#x2227;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Or, "<mo>&#x2228;</mo>");
            //mathtype 分类1-7
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.isin, "<mo>&#x2208;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.notin, "<mo>&#x2209;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.cup, "<mo>&#x222A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.cap, "<mo>&#x2229;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Union, "<mo>&#x22C3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Intersection, "<mo>&#x22C2;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sub, "<mo>&#x2282;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sup, "<mo>&#x2283;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sube, "<mo>&#x2286;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.supe, "<mo>&#x2287;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.nsub, "<mo>&#x2284;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.empty, "<mo>&#x2205;</mo>");
            //mathtype 分类1-8
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.part, "<mo>&#x2202;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.wp, "<mo>&#x2118;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Im, "<mo>&#x2111;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Re, "<mo>&#x211C;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.aleph, "<mo>&#x2135;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Ropf, "<mo>&#x211D;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Zopf, "<mo>&#x2124;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Copf, "<mo>&#x2102;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Qopf, "<mo>&#x211A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Nopf, "<mo>&#x2115;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.infin, "<mo>&#x221E;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.hbar, "<mo>&#x210F;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.hlambda, "<mo>&#x019B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ell, "<mo>&#x2113;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.dagger, "<mo>&#x2020;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Delta, "<mo>&#x0394;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.nabla, "<mo>&#x2207;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Omega, "<mo>&#x03A9;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.mho, "<mo>&#x2127;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.diamond, "<mo>&#x22C4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Sum, "<mo>&#x2211;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.prod, "<mo>&#x220F;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.coprod, "<mo>&#x2210;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Int, "<mo>&#x222B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.circ, "<mo>&#x00B0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ang, "<mo>&#x2220;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.measuredangle, "<mo>&#x2221;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sphericalangle, "<mo>&#x2222;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.perp, "<mo>&#x22A5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.parallel, "<mo>&#x2225;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.bigtriangleup, "<mo>&#x25B3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.square, "<mo>&#x25A1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rect, "<mo>&#x25AD;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.quad, "<mo>&#x25B1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.bigcirc, "<mo>&#x25CB;</mo>");
            //mathtype 分类1-9
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.alpha, "<mo>&#x03B1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.beta, "<mo>&#x03B2;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.chi, "<mo>&#x03C7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.delta, "<mo>&#x03B4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.epsilon, "<mo>&#x03B5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lphi, "<mo>&#x03D5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.phi, "<mo>&#x03C6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.gamma, "<mo>&#x03B3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.eta, "<mo>&#x03B7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.iota, "<mo>&#x03B9;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.kappa, "<mo>&#x03BA;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lambda, "<mo>&#x03BB;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.mu, "<mo>&#x03BC;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.nu, "<mo>&#x03BD;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.omicron, "<mo>&#x03BF;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.pi, "<mo>&#x03C0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.piv, "<mo>&#x03D6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.theta, "<mo>&#x03B8;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.thetasym, "<mo>&#x03D1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rho, "<mo>&#x03C1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sigma, "<mo>&#x03C3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sigmaf, "<mo>&#x03C2;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.tau, "<mo>&#x03C4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.upsilon, "<mo>&#x03C5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.omega, "<mo>&#x03C9;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.xi, "<mo>&#x03BE;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.psi, "<mo>&#x03C8;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.zeta, "<mo>&#x03B6;</mo>");
            //mathtype 分类1-10
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Alpha, "<mo>&#x0391;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Beta, "<mo>&#x0392;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Chi, "<mo>&#x03A7;</mo>");
            //EDStatic.g_symboldata.set( EDMmlFormulaIndex.Delta_2,                "<mo>&#x0394;</mo>"         ); //1-8已有
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Epsilon, "<mo>&#x0395;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Phi, "<mo>&#x03A6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Gamma, "<mo>&#x0393;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Eta, "<mo>&#x0397;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Iota, "<mo>&#x0399;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Kappa, "<mo>&#x039A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Lambda, "<mo>&#x039B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Mu, "<mo>&#x039C;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Nu, "<mo>&#x039D;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Omicron, "<mo>&#x039F;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Pi, "<mo>&#x03A0;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Theta, "<mo>&#x0398;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Rho, "<mo>&#x03A1;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Sigma, "<mo>&#x03A3;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Tau, "<mo>&#x03A4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.upsih, "<mo>&#x03D2;</mo>");
            //EDStatic.g_symboldata.set( EDMmlFormulaIndex.Omega_2,                "<mo>&#x03A9;</mo>"         ); //1-8已有
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Xi, "<mo>&#x039E;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Psi, "<mo>&#x03A8;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Zeta, "<mo>&#x0396;</mo>");
            //else
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.d, "<mo>d</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sin, "<mo>sin</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.cos, "<mo>cos</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.tan, "<mo>tan</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sec, "<mo>sec</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.csc, "<mo>csc</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.cot, "<mo>cot</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.arcsin, "<mo>arcsin</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.arccos, "<mo>arccos</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.arctan, "<mo>arctan</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.arccot, "<mo>arccot</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.log, "<mo>log</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lg, "<mo>lg</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ln, "<mo>ln</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.exp, "<mo>exp</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ch, "<mo>ch</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sh, "<mo>sh</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lim, "<mo>lim</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.max, "<mo>max</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.min, "<mo>min</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ni, "<mo>&#x220B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.sum, "<mo>&#x2211;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.minus, "<mo>&#x2212;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.radic, "<mo>&#x221A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lceil, "<mo>&#x2308;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rceil, "<mo>&#x2309;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.lfloor, "<mo>&#x230A;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.rfloor, "<mo>&#x230B;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DoubleInt, "<mo>&#x222C;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.TripleInt, "<mo>&#x222D;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ContourInt, "<mo>&#x222E;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.SurfaceInt, "<mo>&#x222F;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.VolumeInt, "<mo>&#x2230;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ClockwiseContInt, "<mo>&#x2232;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.CtClockwiseContInt, "<mo>&#x2233;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LongLeftArr, "<mo>&#x27F5;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LeftTeeArr, "<mo>&#x21A4;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DbLongLeftArr, "<mo>&#x27F8;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LongRightArr, "<mo>&#x27F6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.DbLongRightArr, "<mo>&#x27F9;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LongLeftRightArr, "<mo>&#x27F7;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LeftArrRightArr, "<mo>&#x21C6;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ReverseEquilibrium, "<mo>&#x21CB;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.LongRArrShortLArr, "<mo>&#x2942;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.ShortRArrLongLArr, "<mo>&#x2944;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.Upsilon, "<mo>&#x03A5;</mo>");
            //EDU
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_a, "a");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_b, "b");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_c, "c");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_d, "d");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_e, "e");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_f, "f");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_g, "g");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_h, "h");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_i, "i");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_j, "j");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_k, "k");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_l, "l");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_m, "m");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_n, "n");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_o, "o");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_p, "p");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_q, "q");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_r, "r");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_s, "s");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_t, "t");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_u, "u");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_v, "v");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_w, "w");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x, "x");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_y, "y");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_z, "z");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_A, "A");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_B, "B");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_C, "C");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_D, "D");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_E, "E");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_F, "F");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_G, "G");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_H, "H");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_I, "I");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_J, "J");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_K, "K");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_L, "L");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_M, "M");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_N, "N");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_O, "O");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_P, "P");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_Q, "Q");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_R, "R");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_S, "S");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_T, "T");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_U, "U");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_V, "V");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_W, "W");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_X, "X");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_Y, "Y");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_Z, "Z");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_1, "1");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_2, "2");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_3, "3");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_4, "4");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_5, "5");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_6, "6");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_7, "7");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_8, "8");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_9, "9");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_0, "0");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x21, "!");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x22, "\"");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x23, "#");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x24, "$");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x25, "%");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x26, "&");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x27, "\'");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x28, "(");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x29, ")");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2B, "+");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2C, ",");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2D, "-");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2E, ".");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3A, ":");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3B, ";");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3C, "<");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3D, "=");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3E, ">");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x3F, "?");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x40, "@");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x5B, "[");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x5D, "]");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x7B, "{");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x7D, "}");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_xB0, "°");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x58x61, ":=");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2032, "<mo>&#x2032;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x2033, "<mo>&#x2033;</mo>");
            EDStatic.g_symboldata.set(EDMmlFormulaIndex.key_x225f, "<mo>&#x225f;</mo>");
            //EDStatic.g_symboldata.set( EDMmlFormulaIndex.Test_Symbol_1,          "<mo>d</mo>"                );
            //EDStatic.g_symboldata.set( EDMmlFormulaIndex.Test_Symbol_2,          "<mo>&#x200A;</mo>"         );
            //以下内容不要修改，否则响应的文本前处理，后处理都要作响应修改
            EDStatic.g_special_conversion = new Map();
            EDStatic.g_special_conversion.set("isIndentation!", "#x200C;"); //缩进
            EDStatic.g_special_conversion.set("isSpace_1!", "#x2008;"); //第一类空格符
            EDStatic.g_special_conversion.set("isSpace_2!", "#x2009;"); //第二类空格符
            EDStatic.g_special_conversion.set("isSpace_3!", "#x200A;"); //第三类空格符
            EDStatic.g_special_conversion.set("isSpace_4!", "#x200B;"); //第四类空格符
            EDStatic.g_special_conversion.set("isSpace_5!", "#x2003;"); //第五类空格符
            EDStatic.g_special_conversion.set(" ", "#x2009;"); //空格符
            EDStatic.g_special_conversion.set("󲆐", "#xF2190;"); //不存在的unicode码，后处理会转换成下文的节点结构，用于双箭头绘制
            EDStatic.g_special_conversion.set("󲆒", "#xF2192;"); //不存在的unicode码，后处理会转换成下文的节点结构，用于双箭头绘制
            EDStatic.g_special_conversion.set("󲆽", "#xF21BD;"); //不存在的unicode码，后处理会转换成下文的节点结构，用于双箭头绘制
            EDStatic.g_special_conversion.set("󲇀", "#xF21C0;"); //不存在的unicode码，后处理会转换成下文的节点结构，用于双箭头绘制
            EDStatic.g_arrowtext4replace = new Map();
            EDStatic.g_arrowtext4replace.set("<mo>&#xF2192;</mo>", "<munder><mo>&#x2192;</mo><mo>&#x2190;</mo></munder>");
            EDStatic.g_arrowtext4replace.set("<mo>&#xF2190;</mo>", "<mover><mo>&#x2190;</mo><mo>&#x2192;</mo></mover>");
            EDStatic.g_arrowtext4replace.set("<mo>&#xF21C0;</mo>", "<munder><mo>&#x21C0;</mo><mo>&#x21BD;</mo></munder>");
            EDStatic.g_arrowtext4replace.set("<mo>&#xF21BD;</mo>", "<mover><mo>&#x21BD;</mo><mo>&#x21C0;</mo></mover>");
            // 旧方案 根据路径绘制符号
            // EDStatic.g_path_x28.set( [new egPoint( 10.421875, 34.83203125 )],                                                                                        'MoveTo'   );
            // EDStatic.g_path_x28.set( [new egPoint( 10.421875, 35.5546875 )],                                                                                         'LineTo'   );                
            // EDStatic.g_path_x28.set( [new egPoint( 8.45572916667, 34.5651041667 ),new egPoint( 6.81510416667, 33.40625 ),new egPoint( 5.5, 32.078125 )],             'CurveTo'  );                    
            // EDStatic.g_path_x28.set( [new egPoint( 3.625, 30.1901041667 ),new egPoint( 2.1796875, 27.9635416667 ),new egPoint( 1.1640625, 25.3984375 )],             'CurveTo'  );                        
            // EDStatic.g_path_x28.set( [new egPoint( 0.1484375, 22.8333333333 ),new egPoint( -0.359375, 20.1705729167 ),new egPoint( -0.359375, 17.41015625 )],        'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( -0.359375, 13.3736979167 ),new egPoint( 0.63671875, 9.69205729167 ),new egPoint( 2.62890625, 6.365234375 )],      'CurveTo'  );                        
            // EDStatic.g_path_x28.set( [new egPoint( 4.62109375, 3.03841145833 ),new egPoint( 7.21875, 0.658854166667 ),new egPoint( 10.421875, -0.7734375 )],         'CurveTo'  );                            
            // EDStatic.g_path_x28.set( [new egPoint( 10.421875, 0.046875 )],                                                                                           'LineTo'   );                    
            // EDStatic.g_path_x28.set( [new egPoint( 8.8203125, 0.932291666667),new egPoint( 7.50520833333, 2.14322916667 ),new egPoint( 6.4765625, 3.6796875 )],      'CurveTo'  );                    
            // EDStatic.g_path_x28.set( [new egPoint( 5.44791666667, 5.21614583333 ),new egPoint( 4.6796875, 7.16276041667 ),new egPoint( 4.171875, 9.51953125 )],      'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( 3.6640625, 11.8763020833 ),new egPoint( 3.41015625, 14.3372395833 ),new egPoint( 3.41015625, 16.90234375 )],      'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( 3.41015625, 19.6888020833),new egPoint( 3.625, 22.2213541667 ),new egPoint( 4.0546875, 24.5 )],                   'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( 4.39322916667, 26.296875),new egPoint( 4.80338541667, 27.7389322917 ),new egPoint( 5.28515625, 28.826171875 )],   'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( 5.76692708333, 29.9134114583),new egPoint( 6.41471354167, 30.9583333333 ),new egPoint( 7.228515625, 31.9609375 )],'CurveTo'  );                
            // EDStatic.g_path_x28.set( [new egPoint( 8.04231770833, 32.9635416667),new egPoint( 9.10677083333, 33.9205729167 ),new egPoint( 10.421875, 34.83203125 )], 'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 0.8984375, 0.046875 )],                                                                                           'MoveTo'   );
            // EDStatic.g_path_x29.set( [new egPoint( 0.8984375, -0.7734375 )],                                                                                         'LineTo'   );                
            // EDStatic.g_path_x29.set( [new egPoint( 2.87760416667, 0.203125 ),new egPoint( 4.52473958333, 1.35546875 ),new egPoint( 5.83984375, 2.68359375 )],        'CurveTo'  );                    
            // EDStatic.g_path_x29.set( [new egPoint( 7.70182291667, 4.58463541667 ),new egPoint( 9.140625, 6.814453125 ),new egPoint( 10.15625, 9.373046875 )],        'CurveTo'  );                        
            // EDStatic.g_path_x29.set( [new egPoint( 11.171875, 11.931640625 ),new egPoint( 11.6796875, 14.59765625 ),new egPoint( 11.6796875, 17.37109375 )],         'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 11.6796875, 21.4075520833 ),new egPoint( 10.6868489583, 25.0891927083 ),new egPoint( 8.701171875, 28.416015625 )],'CurveTo'  );                        
            // EDStatic.g_path_x29.set( [new egPoint( 6.71549479167, 31.7428385417 ),new egPoint( 4.11458333333, 34.1223958333 ),new egPoint( 0.8984375, 35.5546875 )], 'CurveTo'  );                            
            // EDStatic.g_path_x29.set( [new egPoint( 0.8984375, 34.83203125 )],                                                                                        'LineTo'   );                    
            // EDStatic.g_path_x29.set( [new egPoint( 2.5, 33.93359375),new egPoint( 3.818359375, 32.7194010417 ),new egPoint( 4.853515625, 31.189453125 )],            'CurveTo'  );                    
            // EDStatic.g_path_x29.set( [new egPoint( 5.888671875, 29.6595052083 ),new egPoint( 6.65690104167, 27.712890625 ),new egPoint( 7.158203125, 25.349609375 )],'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 7.65950520833, 22.986328125 ),new egPoint( 7.91015625, 20.5221354167 ),new egPoint( 7.91015625, 17.95703125 )],   'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 7.91015625, 15.18359375),new egPoint( 7.6953125, 12.6510416667 ),new egPoint( 7.265625, 10.359375 )],             'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 6.94010416667, 8.5625),new egPoint( 6.533203125, 7.12369791667 ),new egPoint( 6.044921875, 6.04296875 )],         'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 5.556640625, 4.96223958333),new egPoint( 4.90885416667, 3.92057291667 ),new egPoint( 4.1015625, 2.91796875 )],    'CurveTo'  );                
            // EDStatic.g_path_x29.set( [new egPoint( 3.29427083333, 1.91536458333),new egPoint( 2.2265625, 0.958333333333 ),new egPoint( 0.8984375, 0.046875 )],       'CurveTo'  );    
        }
        // 以下函数避免调用，属于底层函数，上层有封装好的集成了功能的函数
        //mml查找节点规格
        EDStatic.mmlFindNodeSpec_type = function (type) {
            for (var _i = 0, _a = EDStatic.g_node_spec_data; _i < _a.length; _i++) {
                var spec = _a[_i];
                if (type == spec.type) {
                    return spec;
                }
                if (spec.type == EDMathMlNodeType.NoNode) {
                    break;
                }
            }
            return null;
        };
        //mml检查子类型
        EDStatic.mmlFindNodeSpec_tag = function (tag) {
            for (var _i = 0, _a = EDStatic.g_node_spec_data; _i < _a.length; _i++) {
                var spec = _a[_i];
                if (tag == spec.tag) {
                    return spec;
                }
                if (spec.type == EDMathMlNodeType.NoNode) {
                    break;
                }
            }
            return null;
        };
        //mml检查子类型
        EDStatic.mmlCheckChildType = function (parent_type, child_type, error_str) {
            if (parent_type == EDMathMlNodeType.UnknownNode || child_type == EDMathMlNodeType.UnknownNode) {
                return true;
            }
            var child_spec = EDStatic.mmlFindNodeSpec_type(child_type);
            var parent_spec = EDStatic.mmlFindNodeSpec_type(parent_type);
            if (parent_spec == null) {
                if (error_str.length > 0) {
                    error_str[0] = "parent_spec is null";
                }
                console.log("parent_spec is null\n");
                return false;
            }
            if (child_spec == null) {
                if (error_str.length > 0) {
                    error_str[0] = "child_spec is null";
                }
                console.log("child_spec is null\n");
                return false;
            }
            var allowed_child_types = parent_spec.child_types;
            // null list means any child type is valid
            if (allowed_child_types.isEmpty()) {
                return true;
            }
            var child_type_str = " " + child_spec.type_str + " ";
            if (allowed_child_types.match(child_type_str) == null) {
                if (error_str.length > 0) {
                    error_str[0] = "illegal child ".concat(child_spec.type_str, " for parent ").concat(parent_spec.type_str);
                }
                console.log("illegal child ".concat(child_spec.type_str, " for parent ").concat(parent_spec.type_str));
                return false;
            }
            return true;
        };
        //mml检查属性
        EDStatic.mmlCheckAttributes = function (child_type, attr, error_str) {
            var spec = EDStatic.mmlFindNodeSpec_type(child_type);
            if (spec == null) {
                if (error_str.length > 0) {
                    error_str[0] = "spec is null";
                }
                return false;
            }
            var allowed_attr = spec.attributes;
            // empty list means any attr is valid//空列表表示任何attr有效
            if (allowed_attr.isEmpty()) {
                return true;
            }
            attr.forEach(function (value, key) {
                var name = value;
                if (name.indexOf(':') == -1) {
                    var padded_name = " " + name + " ";
                    if (allowed_attr.match(padded_name) == null) {
                        if (error_str.length > 0) {
                            error_str[0] = "illegal attribute ".concat(name, " in ").concat(spec.type_str);
                        }
                    }
                }
            });
            /* Map复杂遍历
            let iterator = attr.keys();
            let r: IteratorResult<string>;
            while (r = iterator.next() , !r.done) {
                let name: string = r.value;
                if ( name.indexOf( ':' ) == -1 ) {
                    let padded_name: string = " " + name + " ";
                    if ( !allowed_attr.indexOf( padded_name ) ) {
                        if ( error_str != null ) {
                            error_str = error_str+"illegal attribute "+name+" in "+spec.type_str;
                        }
                    }
                }
            }*/
            return true;
        };
        EDStatic.attributeIndex = function (name) {
            var g_oper_spec_names = [
                "accent", "fence", "largeop", "lspace", "minsize", "movablelimits",
                "rspace", "separator", "stretchy" /* stretchdir */
            ];
            for (var i = 0; i < EDStatic.g_oper_spec_rows; i++) {
                if (name == g_oper_spec_names[i]) {
                    return i;
                }
            }
            return -1;
        };
        //mml字典属性
        EDStatic.mmlDictAttribute = function (name, spec) {
            var i = this.attributeIndex(name);
            if (i == -1) {
                return null;
            }
            else {
                //web版本屏蔽lspace和rspace zq
                if (3 == i || 6 == i) {
                    //console.log(`return "0em"\n`);
                    return "0em";
                }
                return spec.attributes[i];
            }
        };
        /*
        Searches g_oper_spec_data and returns any instance of operator name. There may //搜索g_oper_spec_data并返回操作符名称的任何实例。 可能有更多的实例，但由于列表已排序，它们将彼此相邻。
        be more instances, but since the list is sorted, they will be next to each other.
        */
        EDStatic.searchOperSpecData = function (name) {
            //static searchOperSpecData ( name: string ): EDMmlOperSpec {
            // binary search                                                                       //二进制搜索
            // establish invariant g_oper_spec_data[begin].name < name < g_oper_spec_data[end].name//建立不变的...
            if (name < this.g_oper_spec_data[0].name) {
                return null;
            }
            else if (name == this.g_oper_spec_data[0].name) {
                return 0;
                //return this.g_oper_spec_data[0];
            }
            var begin = 0;
            var end = this.g_oper_spec_data.length - 1;
            // invariant holds //不变的成立
            while (end - begin > 1) {
                var mid = 0.5 * (begin + end);
                mid = Math.floor(mid);
                var spec = this.g_oper_spec_data[mid];
                if (name < spec.name) {
                    end = mid;
                }
                else if (name > spec.name) {
                    begin = mid;
                }
                else {
                    console.log("".concat(name, " searchOperSpecData mid = ").concat(mid, " name:").concat(this.g_oper_spec_data[mid].name, " stretch:").concat(this.g_oper_spec_data[mid].stretch_dir, "\n"));
                    return mid;
                    //return spec;
                }
            }
            return null;
        };
        /*
        This searches g_oper_spec_data until at least one name in name_list is found with FormType form,    //这将搜索g_oper_spec_data，直到在Form_Type表单中找到name_list中的至少一个名称，
        or until name_list is exhausted. The idea here is that if we don't find the operator in the         //或者直到name_list耗尽。 这里的想法是，如果我们没有找到指定表单中的操作符，
        specified form, we still want to use some other available form of that operator.                    //我们仍然希望使用该操作符的其他可用形式。
        */
        EDStatic._mmlFindOperSpec = function (name_list, form) {
            var result = new EdrawMathDate.OperSpecSearchResult();
            ;
            for (var _i = 0, name_list_1 = name_list; _i < name_list_1.length; _i++) {
                var name_1 = name_list_1[_i];
                var specindex = this.searchOperSpecData(name_1);
                var spec = this.g_oper_spec_data[specindex];
                if (spec == null) {
                    continue;
                }
                // backtrack to the first instance of name//回溯到名称的第一个实例
                if (specindex > 0 && this.g_oper_spec_data[specindex - 1].name == name_1) {
                    spec = this.g_oper_spec_data[specindex - 1];
                    //console.log(`_mmlFindOperSpec1 name = ${name} spec.name = ${spec.name}\n`);
                }
                // iterate over instances of name until the instances are exhausted or until we//遍历名称的实例，
                // find an instance in the specified form.                                     //直到实例耗尽或直到找到指定表单中的实例
                while (spec.name != name_1) {
                    spec = this.g_oper_spec_data[specindex];
                    specindex = specindex + 1;
                    //specindex = specindex + 1;
                }
                result.addForm(spec);
                //console.log(`_mmlFindOperSpec2 name = ${name} spec.name = ${spec.name} index: ${specindex} ${name == spec.name}\n`);
                if (result.haveForm(form)) {
                    break;
                }
            }
            return result;
        };
        /*
        text is a string between <mo> and </mo>. It can be a character ('+'), an            //文本是<mo>和</ mo>之间的字符串。 它可以是字符（'+'），实体引用（“＆infin;”）
        entity reference ("&infin;") or a character reference ("&#x0221E"). Our             //或字符引用（“＆＃x0221E”）。
        job is to find an operator spec in the operator dictionary (g_oper_spec_data)       //我们的工作是在运算符字典（g_oper_spec_data）中找到与文本匹配的运算符规格。
        that matches text. Things are further complicated by the fact, that many            //事实进一步复杂化，许多运营商有几种形式（前缀，中缀，后缀）。
        operators come in several forms (prefix, infix, postfix).

        If available, this function returns an operator spec matching text in the specified //如果可用，该函数返回与指定表单中的文本匹配的运算符规格。
        form. If such operator is not available, returns an operator spec that matches      //如果此类运算符不可用，
        text, but of some other form in the preference order specified by the MathML spec.  //则返回符合MathML规范指定的优先顺序的符合文本但符合其他形式的运算符规格。
        If that's not available either, returns the default operator spec.                  //如果这还不可用，则返回默认的操作员规格。
        */
        //mml查找操作符规格
        EDStatic.mmlFindOperSpec = function (text, form) {
            var name_list = [text];
            //name_list.push( text );
            // First, just try to find text in the operator dictionary.//首先，试图在操作员字典中查找文本。
            var result = this._mmlFindOperSpec(name_list, form);
            if (!result.haveForm(form)) {
                // Try to find other names for the operator represented by text.//尝试为文本所代表的操作符找到其他名称。
                var unicode = text.charCodeAt(0).toString(16).toLocaleUpperCase();
                var length_1 = unicode.length;
                for (var i = 0; i < 5 - length_1; ++i) {
                    unicode = "0" + unicode;
                }
                unicode = "&#x" + unicode + ";";
                var nameList = this.mmlEntityTable.search(unicode);
                console.log("".concat(text, " ").concat(unicode, " mmlEntityTable.match = ").concat(nameList, "\n"));
                for (var _i = 0, nameList_1 = nameList; _i < nameList_1.length; _i++) {
                    var name_2 = nameList_1[_i];
                    name_list.push('&' + name_2 + ';');
                }
                result = this._mmlFindOperSpec(name_list, form);
            }
            var spec = result.getForm(form);
            if (spec != null) {
                return spec;
            }
            spec = result.getForm(FormType.InfixForm);
            if (spec != null) {
                return spec;
            }
            spec = result.getForm(FormType.PostfixForm);
            if (spec != null) {
                return spec;
            }
            spec = result.getForm(FormType.PrefixForm);
            if (spec != null) {
                return spec;
            }
            return this.g_oper_spec_defaults;
        };
        //mml解析间距
        EDStatic.mmlInterpretSpacing = function (value, em, ex, ok, fontsize, MmToPixFactor) {
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (value == "thin") {
                return fontsize * 0.0666;
            }
            else if (value == "medium") {
                return fontsize * 0.1333;
            }
            else if (value == "thick") {
                return fontsize * 0.2;
            }
            var g_h_spacing_data = [
                new EdrawMathDate.HSpacingValue("veryverythinmathspace", 0.0555556),
                new EdrawMathDate.HSpacingValue("verythinmathspace", 0.111111),
                new EdrawMathDate.HSpacingValue("thinmathspace", 0.166667),
                new EdrawMathDate.HSpacingValue("mediummathspace", 0.222222),
                new EdrawMathDate.HSpacingValue("thickmathspace", 0.277778),
                new EdrawMathDate.HSpacingValue("verythickmathspace", 0.333333),
                new EdrawMathDate.HSpacingValue("veryverythickmathspace", 0.388889),
                new EdrawMathDate.HSpacingValue("0", 0.0)
            ];
            for (var _i = 0, g_h_spacing_data_1 = g_h_spacing_data; _i < g_h_spacing_data_1.length; _i++) {
                var v = g_h_spacing_data_1[_i];
                if (value == v.name) {
                    return em * v.factor;
                }
            }
            if (value.endsWith("em")) {
                value = value.slice(0, value.length - 2);
                var factor = value.toFloat();
                if (factor >= 0.0) {
                    return em * factor;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "em");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            else if (value.endsWith("ex")) {
                value = value.slice(0, value.length - 2);
                var factor = value.toFloat();
                if (factor >= 0.0) {
                    return ex * factor;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "ex");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            else if (value.endsWith("cm")) {
                value = value.slice(0, value.length - 2);
                var factor = value.toFloat();
                if (factor >= 0.0) {
                    return factor * 10.0 * MmToPixFactor;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "cm");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            else if (value.endsWith("mm")) {
                value = value.slice(0, value.length - 2);
                var factor = value.toFloat();
                if (factor >= 0.0) {
                    return factor * MmToPixFactor;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "mm");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            else if (value.endsWith("in")) {
                value = value.slice(0, value.length - 2);
                var factor = value.toFloat();
                if (factor >= 0.0) {
                    return factor * 10.0 * MmToPixFactor * 2.54;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "in");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            else if (value.endsWith("px")) {
                value = value.slice(0, value.length - 2);
                var i_1 = value.toInt();
                if (i_1 >= 0) {
                    return i_1;
                }
                else {
                    console.log("interpretSpacing(): could not parse " + value + "px");
                    if (ok.length > 0) {
                        ok[0] = false;
                    }
                    return 0.0;
                }
            }
            var i = value.toInt();
            if (i >= 0) {
                return i;
            }
            console.log("interpretSpacing(): could not parse " + value);
            if (ok.length > 0) {
                ok[0] = false;
            }
            return 0.0;
        };
        //mml解析百分比间距
        EDStatic.mmlInterpretPercentSpacing = function (value, base, ok) {
            if (!value.endsWith("%")) {
                if (ok.length > 0) {
                    ok[0] = false;
                }
                return 0.0;
            }
            value = value.slice(0, value.length - 1);
            var factor = value.toFloat();
            if (factor >= 0.0) {
                if (ok.length > 0) {
                    ok[0] = true;
                }
                return 0.01 * base * factor;
            }
            console.log("interpretPercentSpacing(): could not parse " + value + "%");
            if (ok.length > 0) {
                ok[0] = false;
            }
            return 0.0;
        };
        //mml解析数学变体
        EDStatic.prototype.mmlInterpretMathVariant = function (value, ok) {
            var g_mv_data = [
                new EdrawMathDate.MathVariantValue("normal", MathVariant.NormalMV),
                new EdrawMathDate.MathVariantValue("bold", MathVariant.BoldMV),
                new EdrawMathDate.MathVariantValue("italic", MathVariant.ItalicMV),
                new EdrawMathDate.MathVariantValue("bold-italic", MathVariant.BoldMV | MathVariant.ItalicMV),
                new EdrawMathDate.MathVariantValue("double-struck", MathVariant.DoubleStruckMV),
                new EdrawMathDate.MathVariantValue("bold-fraktur", MathVariant.BoldMV | MathVariant.FrakturMV),
                new EdrawMathDate.MathVariantValue("script", MathVariant.ScriptMV),
                new EdrawMathDate.MathVariantValue("bold-script", MathVariant.BoldMV | MathVariant.ScriptMV),
                new EdrawMathDate.MathVariantValue("fraktur", MathVariant.FrakturMV),
                new EdrawMathDate.MathVariantValue("sans-serif", MathVariant.SansSerifMV),
                new EdrawMathDate.MathVariantValue("bold-sans-serif", MathVariant.BoldMV | MathVariant.SansSerifMV),
                new EdrawMathDate.MathVariantValue("sans-serif-italic", MathVariant.SansSerifMV | MathVariant.ItalicMV),
                new EdrawMathDate.MathVariantValue("sans-serif-bold-italic", MathVariant.SansSerifMV | MathVariant.ItalicMV | MathVariant.BoldMV),
                new EdrawMathDate.MathVariantValue("monospace", MathVariant.MonospaceMV),
                new EdrawMathDate.MathVariantValue("0", 0)
            ];
            for (var _i = 0, g_mv_data_1 = g_mv_data; _i < g_mv_data_1.length; _i++) {
                var v = g_mv_data_1[_i];
                if (value == v.value) {
                    if (ok.length > 0) {
                        ok[0] = true;
                    }
                    return v.mv;
                }
            }
            if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretMathVariant(): could not parse value: " + value);
            return MathVariant.NormalMV;
        };
        //mml解析表格
        EDStatic.mmlInterpretForm = function (value, ok) {
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (value == "prefix") {
                return FormType.PrefixForm;
            }
            else if (value == "infix") {
                return FormType.InfixForm;
            }
            else if (value == "postfix") {
                return FormType.PostfixForm;
            }
            else if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretForm(): could not parse value " + value);
            return FormType.InfixForm;
        };
        //mml解析列表属性
        EDStatic.mmlInterpretListAttr = function (value_list, idx, def) {
            var l = value_list.split(' ');
            if (l.length == 0) {
                return def;
            }
            if (l.length <= idx) {
                return l[l.length - 1];
            }
            else {
                return l[idx];
            }
        };
        //mml解析框架类型
        EDStatic.mmlInterpretFrameType = function (value_list, idx, ok) {
            if (ok.length > 0) {
                ok[0] = true;
            }
            var value = this.mmlInterpretListAttr(value_list, idx, "none");
            if (value == "none") {
                return FrameType.FrameNone;
            }
            else if (value == "solid") {
                return FrameType.FrameSolid;
            }
            else if (value == "dashed") {
                return FrameType.FrameDashed;
            }
            if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretFrameType(): could not parse value " + value);
            return FrameType.FrameNone;
        };
        //mml解析框架间距
        EDStatic.mmlInterpretFrameSpacing = function (value_list, em, ex, ok, fontsize) {
            var l = value_list.split(' ');
            if (l.length != 2) {
                console.log("interpretFrameSpacing: could not parse value " + value_list);
                if (ok.length > 0) {
                    ok[0] = false;
                }
                return new EdrawMathDate.FrameSpacing(0.4 * em, 0.5 * ex);
            }
            var hor_ok = [false];
            var ver_ok = [false];
            var hor = this.mmlInterpretSpacing(l[0], em, ex, hor_ok, fontsize, EdrawMathDate.EDMmlDocument.mmToPixelFactor);
            var ver = this.mmlInterpretSpacing(l[1], em, ex, ver_ok, fontsize, EdrawMathDate.EDMmlDocument.mmToPixelFactor);
            ok[0] = (hor_ok && ver_ok)[0];
            return new EdrawMathDate.FrameSpacing(hor, ver);
        };
        //mml解析列对齐
        EDStatic.mmlInterpretColAlign = function (value_list, colnum, ok) {
            var value = this.mmlInterpretListAttr(value_list, colnum, "center");
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (value == "left") {
                return ColAlign.ColAlignLeft;
            }
            else if (value == "right") {
                return ColAlign.ColAlignRight;
            }
            else if (value == "center") {
                return ColAlign.ColAlignCenter;
            }
            else if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretColAlign(): could not parse value " + value);
            return ColAlign.ColAlignCenter;
        };
        //mml解析行对齐
        EDStatic.mmlInterpretRowAlign = function (value_list, rownum, ok) {
            var value = this.mmlInterpretListAttr(value_list, rownum, "axis");
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (value == "top") {
                return RowAlign.RowAlignTop;
            }
            else if (value == "center") {
                return RowAlign.RowAlignCenter;
            }
            else if (value == "bottom") {
                return RowAlign.RowAlignBottom;
            }
            else if (value == "baseline") {
                return RowAlign.RowAlignBaseline;
            }
            else if (value == "axis") {
                return RowAlign.RowAlignAxis;
            }
            else if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretRowAlign(): could not parse value " + value);
            return RowAlign.RowAlignAxis;
        };
        EDStatic.mmlInterpretPointSize = function (value, ok) {
            if (!value.endsWith("pt")) {
                if (ok.length > 0) {
                    ok[0] = false;
                }
                return 0;
            }
            value = value.slice(0, value.length - 2);
            var pt_size = value.toFloat();
            if (pt_size > 0.0) {
                if (ok.length > 0) {
                    ok[0] = true;
                }
                return pt_size * EdrawMathDate.EDMmlDocument.mmToPixelFactor * 0.35275; //now we have the pixel factor
            }
            console.log("interpretPointSize(): could not parse " + value);
            if (ok.length > 0) {
                ok[0] = false;
            }
            return 0.0;
        };
        EDStatic.mmlInterpretPixelSize = function (value, ok) {
            if (!value.endsWith("px")) {
                if (ok.length > 0) {
                    ok[0] = false;
                }
                return 0;
            }
            value = value.slice(0, value.length - 2);
            var px_size = value.toFloat();
            if (px_size > 0.0) {
                if (ok.length > 0) {
                    ok[0] = true;
                }
                return px_size;
            }
            console.log("interpretPixelSize(): could not parse " + value);
            if (ok.length > 0) {
                ok[0] = false;
            }
            return 0.0;
        };
        //mml解析旧的字体属性
        EDStatic.mmlInterpretDepreciatedFontAttr = function (font_attr, fn, em, ex, fontsize) {
            if (font_attr.has("fontsize")) {
                var value = font_attr.get("fontsize");
                for (;;) {
                    var ok = [false];
                    var pxsize = this.mmlInterpretPointSize(value, ok);
                    if (ok) {
                        fn.pixelSize = pxsize;
                        break;
                    }
                    pxsize = this.mmlInterpretPercentSpacing(value, fn.pixelSize, ok);
                    if (ok) {
                        fn.pixelSize = pxsize;
                        break;
                    }
                    var size = this.mmlInterpretSpacing(value, em, ex, ok, fontsize, EdrawMathDate.EDMmlDocument.mmToPixelFactor);
                    if (ok) {
                        fn.pixelSize = size;
                        break;
                    }
                    break;
                }
            }
            if (font_attr.has("fontweight")) {
                var value = font_attr["fontweight"];
                if (value == "normal") {
                    fn.bold = false;
                }
                else if (value == "bold") {
                    fn.bold = true;
                }
                else {
                    console.log("interpretDepreciatedFontAttr(): could not parse fontweight " + value);
                }
            }
            if (font_attr.has("fontstyle")) {
                var value = font_attr["fontstyle"];
                if (value == "normal") {
                    fn.italic = false;
                }
                else if (value == "italic") {
                    fn.italic = true;
                }
                else {
                    console.log("interpretDepreciatedFontAttr(): could not parse fontstyle " + value);
                }
            }
            if (font_attr.has("fontfamily")) {
                var value = font_attr["fontfamily"];
                fn.fontfamily = value;
            }
            return fn;
        };
        //mml解析数学大小
        EDStatic.mmlInterpretMathSize = function (value, fn, em, ex, ok, fontsize) {
            if (ok.length > 0) {
                ok[0] = true;
            }
            if (value == "small") {
                fn.pixelSize = fn.pixelSize * 0.7;
                return fn;
            }
            if (value == "normal") {
                return fn;
            }
            if (value == "big") {
                fn.pixelSize = fn.pixelSize * 1.5;
                return fn;
            }
            var size_ok = [false];
            var pxsize = this.mmlInterpretPointSize(value, size_ok);
            if (size_ok[0]) {
                fn.pixelSize = pxsize;
                return fn;
            }
            pxsize = this.mmlInterpretPixelSize(value, size_ok);
            if (size_ok[0]) {
                fn.pixelSize = pxsize;
                return fn;
            }
            var size = this.mmlInterpretSpacing(value, em, ex, size_ok, fontsize, EdrawMathDate.EDMmlDocument.mmToPixelFactor);
            if (size_ok[0]) {
                fn.pixelSize = size;
                return fn;
            }
            if (ok.length > 0) {
                ok[0] = false;
            }
            console.log("interpretMathSize(): could not parse mathsize " + value);
            return fn;
        };
        EDStatic.updateFontAttr = function (font_attr, n, name, preferred_name) {
            if (preferred_name === void 0) { preferred_name = null; }
            if (font_attr.has(preferred_name) || font_attr.has(name)) {
                return;
            }
            var value = n.explicitAttribute(name);
            if (value != null) {
                //console.log(`${name} = ${value}`)
                font_attr.set(name, value);
            }
        };
        EDStatic.collectFontAttributes = function (node) {
            var font_attr = new Map();
            for (var n = node; n != null; n = n.parent) {
                if (n == node || n.nodeType == EDMathMlNodeType.MstyleNode) {
                    this.updateFontAttr(font_attr, n, "mathvariant");
                    this.updateFontAttr(font_attr, n, "mathsize");
                    // depreciated attributes//不赞成使用的属性
                    /* 屏蔽 优化效率
                    updateFontAttr( font_attr, n, "fontsize", "mathsize" );
                    updateFontAttr( font_attr, n, "fontweight", "mathvariant" );
                    updateFontAttr( font_attr, n, "fontstyle", "mathvariant" );
                    updateFontAttr( font_attr, n, "fontfamily", "mathvariant" );
                    */
                }
            }
            return font_attr;
        };
        //EDStatic();
        //static g_copystring: string = "";//拷贝文本
        //static g_pastestring: string = "";//粘贴文本
        //static g_imageurl: string = "";//图片url
        EDStatic.g_exe_name = "."; //程序名，用于启动多个mathtype时保存文件的路径区别，ts版本未使用
        EDStatic.mmlEntityTable = new EDMMLEntityTable(); //mml实体表
        //以下参数可以根据实际效果作调整
        EDStatic.g_init_mousepoint = new egPoint(20, 30); //初始鼠标位置
        //static g_font_image_scale: number = 3.0;//背景图的字体比例
        EDStatic.g_relorigin_of_fontsize = 0.2; //相对原点与字体的比值
        EDStatic.g_v_stretchsize = 3.0; //垂直拉升特殊处理的临界比值
        EDStatic.g_draw_linewidth = 0.05; //绘制图形的线条粗细系数
        EDStatic.g_node_space = 0.05; //节点间距系数
        EDStatic.g_mfrac_spacing = 0.05; //分数间距
        //static g_underover_symbolheight: number = 0.50;//上下位置的符号高度系数
        EDStatic.g_largeop_multiplier = 1.60; //largeop的字符比例
        EDStatic.g_mroot_base_margin = 0.1; //根基边缘
        EDStatic.g_mroot_base_line = 0.5; //根基线
        EDStatic.g_base_line_multiplier = 0.05; //线系数
        EDStatic.g_script_size_multiplier = 0.5; //脚本大小系数
        EDStatic.g_sub_shift_multiplier = 0.75; //subshift系数
        EDStatic.g_sup_shift_multiplier = 0.75; //supshift系数
        //以下参数不建议修改
        EDStatic.g_subsup_spacing = "veryverythinmathspace"; //子间距 非常非常薄的数学空间
        EDStatic.g_min_font_pixel_size = 8.0; //最小字体像素大小
        EDStatic.g_min_font_pixel_size_calc = 8.0; //最小字体像素大小计算
        EDStatic.g_dpi_font_size = 1.0; //字体dpi
        //static g_radical: number = ( 0x22 << 8 ) | 0x1B;//根号
        EDStatic.g_oper_spec_rows = 9; //操作规格行
        EDStatic.g_radical_points_size = 11; //根号点的数目
        EDStatic.g_radical_points = [
            new egPoint(0.000110001, 0.344439758),
            new egPoint(0.217181096, 0.419051636),
            new egPoint(0.557377049, 0.102829829),
            new egPoint(0.942686988, 1.048864253),
            new egPoint(1.0, 1.048864253),
            new egPoint(1.0, 1.0),
            new egPoint(1.0, 1.0),
            new egPoint(0.594230277, 0.0),
            new egPoint(0.516457480, 0.0),
            new egPoint(0.135213883, 0.352172079),
            new egPoint(0.024654201, 0.316221808) //new egPoint( 0.024654201, 0.316221808 )
        ];
        EDStatic.MML_ATT_COMMON = " class style id xref actiontype largeop"; //zq 新增largeop
        EDStatic.MML_ATT_FONTSIZE = " fontsize fontweight fontstyle fontfamily color ";
        EDStatic.MML_ATT_MATHVARIANT = " mathvariant mathsize mathcolor mathbackground ";
        EDStatic.MML_ATT_FONTINFO = EDStatic.MML_ATT_FONTSIZE + EDStatic.MML_ATT_MATHVARIANT;
        EDStatic.MML_ATT_OPINFO = " form fence separator lspace rspace stretchy symmetric \
         maxsize minsize largeop movablelimits accent ";
        EDStatic.MML_ATT_SIZEINFO = " width height depth ";
        EDStatic.MML_ATT_TABLEINFO = " align rowalign columnalign columnwidth groupalign \
         alignmentscope side rowspacing columnspacing rowlines columnlines width frame framespacing \
         equalrows equalcolumns displaystyle ";
        EDStatic.MML_ATT_MFRAC = " bevelled numalign denomalign linethickness ";
        EDStatic.MML_ATT_MSTYLE = EDStatic.MML_ATT_FONTINFO + EDStatic.MML_ATT_OPINFO + "\
         scriptlevel lquote rquote linethickness displaystyle \
         scriptsizemultiplier scriptminsize background \
         veryverythinmathspace verythinmathspace thinmathspace \
         mediummathspace thickmathspace verythickmathspace \
         veryverythickmathspace open close separators \
         subscriptshift superscriptshift accentunder tableinfo \
         rowspan columnspan edge selection bevelled ";
        EDStatic.MML_ATT_MTABLE = " align rowalign columnalign groupalign alignmentscope \
         columnwidth width rowspacing columnspacing rowlines columnlines \
         frame framespacing equalrows equalcolumns displaystyle side \
         minlabelspacing ";
        EDStatic.MML_ATT_NOTATION = "notation";
        /*"longdiv actuarial radical box roundedbox circle left right" \
        "top bottom updiagonalstrike downdiagonalstrike verticalstrike horizontalstrike "\
        "madruwb updiagonalarrow phasorangle"*/
        EDStatic.g_node_spec_data = [
            //节点规格数据，每个节点具有的一些参数性质，具体可以在https://developer.mozilla.org/en-US/docs/Web/MathML/Element 等资料网页查阅
            //                         type                    tag           type_str          child_spec                    child_types              attributes ""=none, 0=any
            //    ----------------------- ------------- ----------------- ----------------------------- ------------------------ ---------------------------------------------------------------------
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MiNode, "mi", "MiNode", ChildSpec.ChildAny, " TextNode MalignMark ", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_FONTINFO),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MnNode, "mn", "MnNode", ChildSpec.ChildAny, " TextNode MalignMark ", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_FONTINFO),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MfracNode, "mfrac", "MfracNode", 2, "", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_MFRAC),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MrowNode, "mrow", "MrowNode", ChildSpec.ChildAny, "", EDStatic.MML_ATT_COMMON + " display mode "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MsqrtNode, "msqrt", "MsqrtNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MrootNode, "mroot", "MrootNode", 2, "", EDStatic.MML_ATT_COMMON),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MsupNode, "msup", "MsupNode", 2, "", EDStatic.MML_ATT_COMMON + " subscriptshift "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MsubNode, "msub", "MsubNode", 2, "", EDStatic.MML_ATT_COMMON + " superscriptshift "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MsubsupNode, "msubsup", "MsubsupNode", 3, "", EDStatic.MML_ATT_COMMON + " subscriptshift superscriptshift "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MoNode, "mo", "MoNode", ChildSpec.ChildAny, " TextNode MalignMark ", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_FONTINFO + EDStatic.MML_ATT_OPINFO),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MstyleNode, "mstyle", "MstyleNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_MSTYLE),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MencloseNode, "menclose", "MencloseNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON + " notation "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MphantomNode, "mphantom", "MphantomNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MalignMarkNode, "malignmark", "MalignMarkNode", 0, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MfencedNode, "mfenced", "MfencedNode", ChildSpec.ChildAny, "", EDStatic.MML_ATT_COMMON + " open close separators "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MtableNode, "mtable", "MtableNode", ChildSpec.ChildAny, " MtrNode ", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_MTABLE),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MtrNode, "mtr", "MtrNode", ChildSpec.ChildAny, " MtdNode ", EDStatic.MML_ATT_COMMON + " rowalign columnalign groupalign "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MtdNode, "mtd", "MtdNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON + " rowspan columnspan rowalign columnalign groupalign "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MoverNode, "mover", "MoverNode", 2, "", EDStatic.MML_ATT_COMMON + " accent align "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MunderNode, "munder", "MunderNode", 2, "", EDStatic.MML_ATT_COMMON + " accentunder align "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MunderoverNode, "munderover", "MunderoverNode", 3, "", EDStatic.MML_ATT_COMMON + " accentunder accent align "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MprescriptsNode, "mprescripts", "MprescriptsNode", 0, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.NoneNode, "none", "NoneNode", 0, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MmultiscriptsNode, "mmultiscripts", "MmultiscriptsNode", 6, "", EDStatic.MML_ATT_COMMON + " subscriptshift superscriptshift "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MrowNode, "math", "MrowNode", ChildSpec.ChildAny, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MerrorNode, "merror", "MerrorNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MtextNode, "mtext", "MtextNode", 1, " TextNode ", EDStatic.MML_ATT_COMMON + EDStatic.MML_ATT_FONTINFO + " width height depth linebreak "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MpaddedNode, "mpadded", "MpaddedNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON + " width height depth lspace "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.MspaceNode, "mspace", "MspaceNode", ChildSpec.ImplicitMrow, "", EDStatic.MML_ATT_COMMON + " width height depth linebreak "),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.TextNode, "text", "TextNode", ChildSpec.ChildIgnore, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.UnknownNode, "unknown", "UnknownNode", ChildSpec.ChildAny, "", ""),
            new EdrawMathDate.EDMmlNodeSpec(EDMathMlNodeType.NoNode, "node", "", 0, "", "")
        ]; //zq mmultiscripts
        //操作规格数据
        EDStatic.g_oper_spec_data = 
        //mo节点才具有的数据，是对不同特殊符号的不同操作，比如StretchDir是拉升类型，SymbolType是布局类型
        //查找到的符号按特定设置的参数处理，未查找到的按默认的参数处理
        [
            // -------- -------- -------- -------------------- ------- ------------- ------------------------ --------- -----------------------------------------------------------------------------
            new EdrawMathDate.EDMmlOperSpec("", FormType.PostfixForm, ["", "", "", "0em", "", "", "0em", "", ""], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("!", FormType.PostfixForm, ["", "", "", "verythinmathspace", "", "", "0em", "", ""], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("!!", FormType.PostfixForm, ["", "", "", "verythinmathspace", "", "", "0em", "", ""], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("!=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", ""], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&And;", FormType.InfixForm, ["", "", "", "mediummathspace", "", "", "mediummathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ApplyFunction;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Assign;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Awint;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Backslash;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Because;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Breve;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cap;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CapitalDifferentialD;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cconint;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cedilla;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CenterDot;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CircleDot;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&CircleMinus;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CirclePlus;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&CircleTimes;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&ClockwiseContourIntegral;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CloseCurlyDoubleQuote;", FormType.PostfixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CloseCurlyQuote;", FormType.PostfixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Colon;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Congruent;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ContourIntegral;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Coproduct;", FormType.InfixForm, ["", "", "true", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CounterClockwiseContourIntegral;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cross;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cup;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&CupCap;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Cwint;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Del;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalAcute;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalDot;", FormType.PostfixForm, ["true", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Over),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalDoubleAcute;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalGrave;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalLeftArrow;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalLeftRightArrow;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalLeftRightVector;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalLeftVector;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalRightArrow;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalRightVector;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DiacriticalTilde;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Diamond;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DifferentialD;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DotEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleContourIntegral;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleDot;", FormType.PostfixForm, ["true", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Over),
            new EdrawMathDate.EDMmlOperSpec("&DoubleDownArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLeftRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLeftTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLongLeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLongLeftRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleLongRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleRightTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleUpArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleUpDownArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DoubleVerticalBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownArrowBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownArrowUpArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownBreve;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownLeftRightVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&DownLeftTeeVector;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownLeftVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&DownLeftVectorBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownRightTeeVector;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownRightVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&DownRightVectorBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&DownTeeArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Element;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Equal;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&EqualTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Equilibrium;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&Exists;", FormType.PrefixForm, ["", "", "", "0em", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ForAll;", FormType.PrefixForm, ["", "", "", "0em", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterEqualLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&GreaterTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Hacek;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Hat;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&HatDown;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&HatUp;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&HorizontalLine;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&HumpDownHump;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&HumpEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&IIIInt;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&IIInt;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&IInt;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Implies;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Integral;", FormType.PrefixForm, ["", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Intersection;", FormType.PrefixForm, ["", "", "true", "0em", "", "true", "thinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&InvisibleComma;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "true", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&InvisibleTimes;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftAngleBracket;", FormType.PrefixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&LeftArrowBar;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftArrowRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftBracketingBar;", FormType.PrefixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftCeiling;", FormType.PrefixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftDoubleBracket;", FormType.PrefixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftDoubleBracketingBar;", FormType.PrefixForm, ["", "true", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftDownTeeVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftDownVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftDownVectorBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftFloor;", FormType.PrefixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&LeftRightVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&LeftSkeleton;", FormType.PrefixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTeeArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTeeVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTriangle;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTriangleBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftTriangleEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftUpDownVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftUpTeeVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftUpVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftUpVectorBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LeftVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&LeftVectorBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessEqualGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LessTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LongLeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LongLeftRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LongRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Lowast;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&LowerLeftArrow;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&LowerRightArrow;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&MinusPlus;", FormType.PrefixForm, ["", "", "", "0em", "", "", "veryverythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&NestedGreaterGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NestedLessLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Not;", FormType.PrefixForm, ["", "", "", "0em", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotCongruent;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotCupCap;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotDoubleVerticalBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotElement;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotEqualTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotExists;", FormType.PrefixForm, ["", "", "", "0em", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotGreaterTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotHumpDownHump;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotHumpEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLeftTriangle;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLeftTriangleBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLeftTriangleEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotLessTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotNestedGreaterGreater;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotNestedLessLess;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotPrecedes;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotPrecedesEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotPrecedesSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotPrecedesTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotReverseElement;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotRightTriangle;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotRightTriangleBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotRightTriangleEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSquareSubset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSquareSubsetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSquareSuperset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSquareSupersetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSubset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSubsetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSucceeds;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSucceedsEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSucceedsSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSucceedsTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSuperset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotSupersetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotTildeEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotTildeFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotTildeTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&NotVerticalBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&OpenCurlyDoubleQuote;", FormType.PrefixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&OpenCurlyQuote;", FormType.PrefixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Or;", FormType.InfixForm, ["", "", "", "mediummathspace", "", "", "mediummathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&OverBar;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&OverBrace;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&OverBracket;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&OverParenthesis;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&PartialD;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&PlusMinus;", FormType.PrefixForm, ["", "", "", "0em", "", "", "veryverythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("&Precedes;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&PrecedesEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&PrecedesSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&PrecedesTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Product;", FormType.PrefixForm, ["", "", "true", "0em", "", "true", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Proportion;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Proportional;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ReverseElement;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ReverseEquilibrium;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ReverseUpEquilibrium;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightAngleBracket;", FormType.PostfixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&RightArrowBar;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightArrowLeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&RightBracketingBar;", FormType.PostfixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightCeiling;", FormType.PostfixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightDoubleBracket;", FormType.PostfixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightDoubleBracketingBar;", FormType.PostfixForm, ["", "true", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightDownTeeVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightDownVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightDownVectorBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightFloor;", FormType.PostfixForm, ["", "true", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightSkeleton;", FormType.PostfixForm, ["", "true", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTeeArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTeeVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTriangle;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTriangleBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightTriangleEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightUpDownVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightUpTeeVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightUpVector;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightUpVectorBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RightVector;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&RightVectorBar;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&RoundImplies;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&ShortLeftArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&ShortRightArrow;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&ShortUpArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SmallCircle;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Sqrt;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Square;", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareIntersection;", FormType.InfixForm, ["", "", "", "mediummathspace", "", "", "mediummathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareSubset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareSubsetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareSuperset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareSupersetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SquareUnion;", FormType.InfixForm, ["", "", "", "mediummathspace", "", "", "mediummathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Star;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Subset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SubsetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Succeeds;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SucceedsEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SucceedsSlantEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SucceedsTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SuchThat;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Sum;", FormType.PrefixForm, ["", "", "true", "0em", "", "true", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Superset;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&SupersetEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Therefore;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            //new EDMmlOperSpec( "&Tilde;",                           FormType.InfixForm,   [  "",        "",        "",       "thickmathspace",     "",       "",            "thickmathspace",         "",        "false"   ], StretchDir.NoStretch,     SymbolType.Normal ), // "&Tilde;"
            new EdrawMathDate.EDMmlOperSpec("&Tilde;", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&TildeEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&TildeFullEqual;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&TildeTilde;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&TripleDot;", FormType.PostfixForm, ["true", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Over),
            new EdrawMathDate.EDMmlOperSpec("&UnderBar;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&UnderBrace;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&UnderBracket;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&UnderParenthesis;", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("&Union;", FormType.PrefixForm, ["", "", "true", "0em", "", "true", "thinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UnionPlus;", FormType.PrefixForm, ["", "", "true", "0em", "", "true", "thinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpArrowBar;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpArrowDownArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpDownArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpEquilibrium;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("&UpTee;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpTeeArrow;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpperLeftArrow;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&UpperRightArrow;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Vee;", FormType.InfixForm, ["", "", "true", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&VerticalBar;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&VerticalLine;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&VerticalSeparator;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&VerticalTilde;", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&Wedge;", FormType.InfixForm, ["", "", "true", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&amp;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&amp;&amp;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&le;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&lt;", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&lt;=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&lt;>", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("&pi;", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("'", FormType.PostfixForm, ["", "", "", "verythinmathspace", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("(", FormType.InfixForm, ["", "true", "", "veryverythinmathspace", "", "", "0em", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(")", FormType.InfixForm, ["", "true", "", "0em", "", "", "thinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("*", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("**", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("*=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("+", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            //new EDMmlOperSpec( "+",                                 FormType.PrefixForm,  [  "",        "",        "",       "0em",                "",       "",            "veryverythinmathspace",  "",        "false"   ], StretchDir.NoStretch,     SymbolType.Normal ), // "+"
            new EdrawMathDate.EDMmlOperSpec("++", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("+=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(",", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "thickmathspace", "true", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("-", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            //new EDMmlOperSpec( "-",                                 FormType.PrefixForm,  [  "",        "",        "",       "0em",                "",       "",            "veryverythinmathspace",  "",        "false"   ], StretchDir.NoStretch,     SymbolType.Normal ), // "-"
            new EdrawMathDate.EDMmlOperSpec("--", FormType.PrefixForm, ["", "", "", "0em", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("-=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("->", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(".", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("..", FormType.PostfixForm, ["", "", "", "mediummathspace", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("...", FormType.PostfixForm, ["", "", "", "mediummathspace", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("/", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("//", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("/=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(":", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(":=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(";", FormType.InfixForm, ["", "", "", "0em", "", "", "verythickmathspace", "true", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(";", FormType.PostfixForm, ["", "", "", "0em", "", "", "0em", "true", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("==", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(">", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec(">=", FormType.InfixForm, ["", "", "", "thickmathspace", "", "", "thickmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("?", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("@", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("[", FormType.PrefixForm, ["", "true", "", "veryverythinmathspace", "", "", "0em", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("]", FormType.PostfixForm, ["", "true", "", "0em", "", "", "thinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            //    new EDMmlOperSpec( "^",                                 FormType.InfixForm,   [  "",        "",        "",       "verythinmathspace",  "",       "",            "verythinmathspace",      "",        "false"   ], StretchDir.NoStretch,     SymbolType.Over ), // "^"
            new EdrawMathDate.EDMmlOperSpec("_", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("lim", FormType.PrefixForm, ["", "", "", "0em", "", "true", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("max", FormType.PrefixForm, ["", "", "", "0em", "", "true", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("min", FormType.PrefixForm, ["", "", "", "0em", "", "true", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("{", FormType.PrefixForm, ["", "true", "", "veryverythinmathspace", "", "", "0em", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("|", FormType.PostfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("}", FormType.PostfixForm, ["", "true", "", "0em", "", "", "thinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("~", FormType.InfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("×", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("÷", FormType.InfixForm, ["", "", "", "thinmathspace", "", "", "thinmathspace", "", "false"], StretchDir.NoStretch, SymbolType.Symbol),
            new EdrawMathDate.EDMmlOperSpec("‖", FormType.PostfixForm, ["", "", "", "verythinmathspace", "", "", "verythinmathspace", "", "true"], StretchDir.VStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("…", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.BoundingRect),
            //    new EDMmlOperSpec( "′",                                 FormType.InfixForm,   [  "",        "",        "",        "",                    "",       "",             "",                        "",        "false"   ], StretchDir.VStretch,     SymbolType.Normal ), //zq 新增
            //    new EDMmlOperSpec( "″",                                 FormType.InfixForm,   [  "",        "",        "",        "",                    "",       "",             "",                        "",        "false"   ], StretchDir.VStretch,     SymbolType.Normal ), //zq 新增
            //    new EDMmlOperSpec( "‴",                                 FormType.InfixForm,   [  "",        "",        "",        "",                    "",       "",             "",                        "",        "false"   ], StretchDir.VStretch,     SymbolType.Normal ), //zq 新增
            new EdrawMathDate.EDMmlOperSpec("⃜", FormType.PostfixForm, ["true", "", "true", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Over),
            //new EDMmlOperSpec( "∗",                                 FormType.InfixForm,   [  "",        "",        "",       "thinmathspace",      "",       "",            "thinmathspace",          "",        "false"   ], StretchDir.NoStretch,     SymbolType.Symbol ), //zq 新增 lowast
            //new EDMmlOperSpec( "∬",                                FormType.PrefixForm,  [  "",        "",       "true",  "0em",                "",       "",            "0em",                    "",        "false"   ], StretchDir.NoStretch ,     SymbolType.Normal), // zq 新增 largeop = "true"
            //new EDMmlOperSpec( "∭",                                 FormType.PrefixForm,  [  "",        "",       "true",  "0em",                "",       "",            "0em",                    "",        "false"   ], StretchDir.NoStretch,     SymbolType.Normal  ), // zq 新增 largeop = "true"
            //new EDMmlOperSpec( "∰",                                 FormType.PrefixForm,  [  "",        "",       "true",  "0em",                "",       "",            "0em",                    "",        "false"   ], StretchDir.NoStretch,     SymbolType.Normal  ), // zq 新增 largeop = "true"
            new EdrawMathDate.EDMmlOperSpec("⋮", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("⋯", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.BoundingRect),
            new EdrawMathDate.EDMmlOperSpec("⋰", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            new EdrawMathDate.EDMmlOperSpec("⋱", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "false"], StretchDir.NoStretch, SymbolType.Normal),
            //new EDMmlOperSpec( "⥂",                                 FormType.InfixForm,   [  "",        "",        "",       "0em",                "",       "",            "0em",                    "",        "true"   ], StretchDir.HStretch ,     SymbolType.Normal,     "" ), // "&LongRArrShortLArr;" zq 新增
            //new EDMmlOperSpec( "⥄",                                 FormType.InfixForm,   [  "",        "",        "",       "0em",                "",       "",            "0em",                    "",        "true"   ], StretchDir.HStretch ,     SymbolType.Normal,     "" ), // "&ShortRArrLongLArr;" zq 新增
            new EdrawMathDate.EDMmlOperSpec("⏠", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("⏡", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Center),
            new EdrawMathDate.EDMmlOperSpec("⸜", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.NoStretch, SymbolType.Under),
            new EdrawMathDate.EDMmlOperSpec("⸝", FormType.PostfixForm, ["true", "", "", "0em", "", "", "0em", "", "true"], StretchDir.NoStretch, SymbolType.Under),
            new EdrawMathDate.EDMmlOperSpec("󲆐", /*xF2190 */ FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("󲆒", /*xF2192 */ FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("󲆽", /*xF21BD */ FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("󲇀", /*xF21C0 */ FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", "true"], StretchDir.HStretch, SymbolType.Arrow),
            new EdrawMathDate.EDMmlOperSpec("", FormType.InfixForm, ["", "", "", "0em", "", "", "0em", "", ""], StretchDir.NoStretch, SymbolType.Normal) // Invisible addition  
        ];
        //操作规范默认
        EDStatic.g_oper_spec_defaults = new EdrawMathDate.EDMmlOperSpec("", FormType.InfixForm, ["false", "false", "false", "0em", "1", "false", "0em", "false", "false"], StretchDir.NoStretch, SymbolType.Normal); //zq thickmathspace修改
        //static g_oper_spec_count: number  = EDStatic.g_oper_spec_data.length -1;//sizeof( EDStatic.g_oper_spec_data ) / sizeof( EDMmlOperSpec ) - 1;//操作规格
        EDStatic.g_symboldata = new Map(); //符号数据
        EDStatic.g_special_conversion = new Map(); //符号特殊处理
        EDStatic.g_arrowtext4replace = new Map(); //箭头文本替换
        //第二类特殊符号的文本检测, EDMmlNode.checkSpecialType_2中使用
        EDStatic.g_special_mo = ['′', '″', '‴', '°', 'ᐪ']; //appendto检测的特殊<mo>符号列表
        EDStatic.g_special_bracket = ['(', ')', '[', ']', '{', '}', '|', '‖', '⌊', '⌈', '⌉', '⌋', '⟦', '⟧', '〈', '〉', '/']; //appendto检测的特殊括号列表
        EDStatic.g_mi_height_1_2 = ['a', 'c', 'e', 'i', 'm', 'n', 'o', 'r', 's', 'u', 'v', '⌋', 'w', 'x', 'z']; //字母高度为1/2的列表 发布版未使用
        return EDStatic;
    }());
    EdrawMathDate.EDStatic = EDStatic;
    var edstatic = new EDStatic();
})(EdrawMathDate || (EdrawMathDate = {}));
