!(function () {
	"use strict";
	var t,
		a,
		e = {
			768: function (t, a, e) {
				Object.defineProperty(a, "__esModule", {
					value: !0
				}),
					(a.VerbConfiguration = a.VerbMethods = void 0);
				var n = e(251),
					o = e(108),
					r = e(871),
					i = e(402);
				(a.VerbMethods = {}),
					(a.VerbMethods.Verb = function (t, a) {
						var e = t.GetNext(),
							n = ++t.i;
						if ("" === e)
							throw new i.default(
								"MissingArgFor",
								"Missing argument for %1",
								a
							);
						for (
							;
							t.i < t.string.length && t.string.charAt(t.i) !== e;

						)
							t.i++;
						if (t.i === t.string.length)
							throw new i.default(
								"NoClosingDelim",
								"Can't find closing delimiter for %1",
								t.currentCS
							);
						var r = t.string.slice(n, t.i).replace(/ /g, "\xa0");
						t.i++,
							t.Push(
								t.create(
									"token",
									"mtext",
									{
										mathvariant:
											o.TexConstant.Variant.MONOSPACE
									},
									r
								)
							);
					}),
					new r.CommandMap(
						"verb",
						{
							verb: "Verb"
						},
						a.VerbMethods
					),
					(a.VerbConfiguration = n.Configuration.create("verb", {
						handler: {
							macro: ["verb"]
						}
					}));
			},
			955: function (t, a) {
				MathJax._.components.global.isObject,
					MathJax._.components.global.combineConfig,
					MathJax._.components.global.combineDefaults,
					(a.r8 = MathJax._.components.global.combineWithMathJax),
					MathJax._.components.global.MathJax;
			},
			251: function (t, a) {
				Object.defineProperty(a, "__esModule", {
					value: !0
				}),
					(a.Configuration =
						MathJax._.input.tex.Configuration.Configuration),
					(a.ConfigurationHandler =
						MathJax._.input.tex.Configuration.ConfigurationHandler),
					(a.ParserConfiguration =
						MathJax._.input.tex.Configuration.ParserConfiguration);
			},
			871: function (t, a) {
				Object.defineProperty(a, "__esModule", {
					value: !0
				}),
					(a.AbstractSymbolMap =
						MathJax._.input.tex.SymbolMap.AbstractSymbolMap),
					(a.RegExpMap = MathJax._.input.tex.SymbolMap.RegExpMap),
					(a.AbstractParseMap =
						MathJax._.input.tex.SymbolMap.AbstractParseMap),
					(a.CharacterMap =
						MathJax._.input.tex.SymbolMap.CharacterMap),
					(a.DelimiterMap =
						MathJax._.input.tex.SymbolMap.DelimiterMap),
					(a.MacroMap = MathJax._.input.tex.SymbolMap.MacroMap),
					(a.CommandMap = MathJax._.input.tex.SymbolMap.CommandMap),
					(a.EnvironmentMap =
						MathJax._.input.tex.SymbolMap.EnvironmentMap);
			},
			108: function (t, a) {
				Object.defineProperty(a, "__esModule", {
					value: !0
				}),
					(a.TexConstant =
						MathJax._.input.tex.TexConstants.TexConstant);
			},
			402: function (t, a) {
				Object.defineProperty(a, "__esModule", {
					value: !0
				}),
					(a.default = MathJax._.input.tex.TexError.default);
			}
		},
		n = {};

	function o(t) {
		var a = n[t];
		if (void 0 !== a) return a.exports;
		var r = (n[t] = {
			exports: {}
		});
		return e[t](r, r.exports, o), r.exports;
	}
	(t = o(955)),
		(a = o(768)),
		(0, t.r8)({
			_: {
				input: {
					tex: {
						verb: {
							VerbConfiguration: a
						}
					}
				}
			}
		});
})();
