/*! animsition */
!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var n = "animsition"
      , i = {
        init: function(a) {
            a = t.extend({
                inClass: "fade-in",
                outClass: "fade-out",
                inDuration: 1500,
                outDuration: 800,
                linkElement: ".animsition-link",
                loading: !0,
                loadingParentElement: "body",
                loadingClass: "animsition-loading",
                loadingInner: "",
                timeout: !1,
                timeoutCountdown: 5e3,
                onLoadEvent: !0,
                browser: ["animation-duration", "-webkit-animation-duration"],
                overlay: !1,
                overlayClass: "animsition-overlay-slide",
                overlayParentElement: "body",
                transition: function(t) {
                    window.location.href = t
                }
            }, a),
            i.settings = {
                timer: !1,
                data: {
                    inClass: "animsition-in-class",
                    inDuration: "animsition-in-duration",
                    outClass: "animsition-out-class",
                    outDuration: "animsition-out-duration",
                    overlay: "animsition-overlay"
                },
                events: {
                    inStart: "animsition.inStart",
                    inEnd: "animsition.inEnd",
                    outStart: "animsition.outStart",
                    outEnd: "animsition.outEnd"
                }
            };
            var o = i.supportCheck.call(this, a);
            return o || !(a.browser.length > 0) || o && this.length ? (i.optionCheck.call(this, a) && t("." + a.overlayClass).length <= 0 && i.addOverlay.call(this, a),
            a.loading && t("." + a.loadingClass).length <= 0 && i.addLoading.call(this, a),
            this.each(function() {
                var o = this
                  , e = t(this)
                  , s = t(window)
                  , l = t(document);
                e.data(n) || (a = t.extend({}, a),
                e.data(n, {
                    options: a
                }),
                a.timeout && i.addTimer.call(o),
                a.onLoadEvent && s.on("load." + n, function() {
                    i.settings.timer && clearTimeout(i.settings.timer),
                    i.in.call(o)
                }),
                s.on("pageshow." + n, function(t) {
                    t.originalEvent.persisted && i.in.call(o)
                }),
                s.on("unload." + n, function() {}),
                l.on("click." + n, a.linkElement, function(n) {
                    n.preventDefault();
                    var a = t(this)
                      , e = a.attr("href");
                    2 === n.which || n.metaKey || n.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && n.ctrlKey ? window.open(e, "_blank") : i.out.call(o, a, e)
                }))
            })) : ("console"in window || (window.console = {},
            window.console.log = function(t) {
                return t
            }
            ),
            this.length || console.log("Animsition: Element does not exist on page."),
            o || console.log("Animsition: Does not support this browser."),
            i.destroy.call(this))
        },
        addOverlay: function(n) {
            t(n.overlayParentElement).prepend('<div class="' + n.overlayClass + '"></div>')
        },
        addLoading: function(n) {
            t(n.loadingParentElement).append('<div class="' + n.loadingClass + '">' + n.loadingInner + "</div>")
        },
        removeLoading: function() {
            var i = t(this).data(n).options;
            t(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove()
        },
        addTimer: function() {
            var a = this
              , o = t(this).data(n).options;
            i.settings.timer = setTimeout(function() {
                i.in.call(a),
                t(window).off("load." + n)
            }, o.timeoutCountdown)
        },
        supportCheck: function(n) {
            var i = t(this)
              , a = n.browser
              , o = a.length
              , e = !1;
            0 === o && (e = !0);
            for (var s = 0; s < o; s++)
                if ("string" == typeof i.css(a[s])) {
                    e = !0;
                    break
                }
            return e
        },
        optionCheck: function(n) {
            var a = t(this);
            return !(!n.overlay && !a.data(i.settings.data.overlay))
        },
        animationCheck: function(i, a, o) {
            var e = t(this).data(n).options
              , s = typeof i
              , l = !a && "number" === s
              , r = a && "string" === s && i.length > 0;
            return l || r ? i = i : a && o ? i = e.inClass : !a && o ? i = e.inDuration : a && !o ? i = e.outClass : a || o || (i = e.outDuration),
            i
        },
        in: function() {
            var a = this
              , o = t(this)
              , e = o.data(n).options
              , s = o.data(i.settings.data.inDuration)
              , l = o.data(i.settings.data.inClass)
              , r = i.animationCheck.call(a, s, !1, !0)
              , d = i.animationCheck.call(a, l, !0, !0)
              , u = i.optionCheck.call(a, e)
              , c = o.data(n).outClass;
            e.loading && i.removeLoading.call(a),
            c && o.removeClass(c),
            u ? i.inOverlay.call(a, d, r) : i.inDefault.call(a, d, r)
        },
        inDefault: function(n, a) {
            var o = t(this);
            o.css({
                "animation-duration": a + "ms"
            }).addClass(n).trigger(i.settings.events.inStart).animateCallback(function() {
                o.removeClass(n).css({
                    opacity: 1
                }).trigger(i.settings.events.inEnd)
            })
        },
        inOverlay: function(a, o) {
            var e = t(this)
              , s = e.data(n).options;
            e.css({
                opacity: 1
            }).trigger(i.settings.events.inStart),
            t(s.overlayParentElement).children("." + s.overlayClass).css({
                "animation-duration": o + "ms"
            }).addClass(a).animateCallback(function() {
                e.trigger(i.settings.events.inEnd)
            })
        },
        out: function(a, o) {
            var e = this
              , s = t(this)
              , l = s.data(n).options
              , r = a.data(i.settings.data.outClass)
              , d = s.data(i.settings.data.outClass)
              , u = a.data(i.settings.data.outDuration)
              , c = s.data(i.settings.data.outDuration)
              , m = r || d
              , g = u || c
              , f = i.animationCheck.call(e, m, !0, !1)
              , h = i.animationCheck.call(e, g, !1, !1)
              , v = i.optionCheck.call(e, l);
            s.data(n).outClass = f,
            v ? i.outOverlay.call(e, f, h, o) : i.outDefault.call(e, f, h, o)
        },
        outDefault: function(a, o, e) {
            var s = t(this)
              , l = s.data(n).options;
            s.css({
                "animation-duration": o + 1 + "ms"
            }).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                s.trigger(i.settings.events.outEnd),
                l.transition(e)
            })
        },
        outOverlay: function(a, o, e) {
            var s = t(this)
              , l = s.data(n).options
              , r = s.data(i.settings.data.inClass)
              , d = i.animationCheck.call(this, r, !0, !0);
            t(l.overlayParentElement).children("." + l.overlayClass).css({
                "animation-duration": o + 1 + "ms"
            }).removeClass(d).addClass(a).trigger(i.settings.events.outStart).animateCallback(function() {
                s.trigger(i.settings.events.outEnd),
                l.transition(e)
            })
        },
        destroy: function() {
            return this.each(function() {
                var i = t(this);
                t(window).off("." + n),
                i.css({
                    opacity: 1
                }).removeData(n)
            })
        }
    };
    t.fn.animateCallback = function(n) {
        var i = "animationend webkitAnimationEnd";
        return this.each(function() {
            var a = t(this);
            a.on(i, function() {
                return a.off(i),
                n.call(this)
            })
        })
    }
    ,
    t.fn.animsition = function(a) {
        return i[a] ? i[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Method " + a + " does not exist on jQuery." + n) : i.init.apply(this, arguments)
    }
});
/*! Page scroll to id */
!function(e, t, a, n) {
    var l, s, i, o, r, c, u, f, g, h, d = {
        scrollSpeed: 1300,
        autoScrollSpeed: !0,
        scrollEasing: "easeInOutExpo",
        scrollingEasing: "easeInOutCirc",
        pageEndSmoothScroll: !0,
        layout: "vertical",
        offset: 0,
        highlightSelector: !1,
        clickedClass: "mPS2id-clicked",
        targetClass: "mPS2id-target",
        highlightClass: "mPS2id-highlight",
        forceSingleHighlight: !1,
        keepHighlightUntilNext: !1,
        disablePluginBelow: !1,
        clickEvents: !0,
        onStart: function() {},
        onComplete: function() {},
        defaultSelector: !1
    }, p = {
        init: function(n) {
            n = e.extend(!0, {}, d, n);
            e(a).data("mPS2id", n),
            s = e(a).data("mPS2id"),
            l = l ? l + "," + this.selector : this.selector,
            s.defaultSelector && ("object" == typeof e(l) && 0 !== e(l).length || (l = ".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id']")),
            s.clickEvents && e(a).undelegate(".mPS2id").delegate(l, "click.mPS2id", function(t) {
                if (m._isDisabled.call(null))
                    m._removeClasses.call(null);
                else {
                    var a = e(this)
                      , n = a.attr("href")
                      , l = a.prop("href");
                    n && -1 !== n.indexOf("#/") || (m._reset.call(null),
                    h = a.data("ps2id-offset") || 0,
                    m._isValid.call(null, n, l) && m._findTarget.call(null, n) && (t.preventDefault(),
                    o = "selector",
                    r = a,
                    m._setClasses.call(null, !0),
                    m._scrollTo.call(null)))
                }
            }),
            e(t).unbind(".mPS2id").bind("scroll.mPS2id resize.mPS2id", function() {
                if (m._isDisabled.call(null))
                    m._removeClasses.call(null);
                else {
                    var t = e("._mPS2id-t");
                    t.each(function(a) {
                        var n = e(this)
                          , l = n.attr("id")
                          , s = m._findHighlight.call(null, l);
                        m._setClasses.call(null, !1, n, s),
                        a == t.length - 1 && m._extendClasses.call(null)
                    })
                }
            }),
            i = !0,
            m._setup.call(null)
        },
        scrollTo: function(t, a) {
            if (m._isDisabled.call(null))
                m._removeClasses.call(null);
            else if (t && void 0 !== t) {
                m._isInit.call(null);
                var n = {
                    layout: s.layout,
                    offset: s.offset,
                    clicked: !1
                };
                a = e.extend(!0, {}, n, a);
                m._reset.call(null),
                f = a.layout,
                g = a.offset,
                t = -1 !== t.indexOf("#") ? t : "#" + t,
                m._isValid.call(null, t) && m._findTarget.call(null, t) && (o = "scrollTo",
                (r = a.clicked) && m._setClasses.call(null, !0),
                m._scrollTo.call(null))
            }
        },
        destroy: function() {
            e(t).unbind(".mPS2id"),
            e(a).undelegate(".mPS2id").removeData("mPS2id"),
            e("._mPS2id-t").removeData("mPS2id"),
            m._removeClasses.call(null, !0)
        }
    }, m = {
        _isDisabled: function() {
            var e = t
              , n = "inner"
              , l = s.disablePluginBelow instanceof Array ? [s.disablePluginBelow[0] || 0, s.disablePluginBelow[1] || 0] : [s.disablePluginBelow || 0, 0];
            return "innerWidth"in t || (n = "client",
            e = a.documentElement || a.body),
            e[n + "Width"] <= l[0] || e[n + "Height"] <= l[1]
        },
        _isValid: function(e, a) {
            if (e) {
                var n = -1 !== (a = a || e).indexOf("#/") ? a.split("#/")[0] : a.split("#")[0]
                  , l = t.location.toString().split("#")[0];
                return "#" !== e && -1 !== e.indexOf("#") && ("" === n || n === l)
            }
        },
        _setup: function() {
            var t = s.highlightSelector && "" !== s.highlightSelector ? s.highlightSelector : l
              , a = 1;
            return e(t).each(function() {
                var n = e(this)
                  , l = n.attr("href")
                  , s = n.prop("href");
                if (m._isValid.call(null, l, s)) {
                    var i = -1 !== l.indexOf("#/") ? l.split("#/")[1] : l.split("#")[1]
                      , o = e("#" + i);
                    if (o.length > 0) {
                        o.hasClass("_mPS2id-t") || o.addClass("_mPS2id-t").data("mPS2id", {
                            i: a
                        }),
                        n.hasClass("_mPS2id-h") || n.addClass("_mPS2id-h");
                        var r = m._findHighlight.call(null, i);
                        m._setClasses.call(null, !1, o, r),
                        ++a == e(t).length && m._extendClasses.call(null)
                    }
                }
            })
        },
        _findTarget: function(t) {
            var a = -1 !== t.indexOf("#/") ? t.split("#/")[1] : t.split("#")[1]
              , n = e("#" + a);
            if (n.length < 1 || "fixed" === n.css("position")) {
                if ("top" !== a)
                    return;
                n = e("body")
            }
            return c = n,
            f || (f = s.layout),
            g = m._setOffset.call(null),
            (u = [(n.offset().top - g[0]).toString(), (n.offset().left - g[1]).toString()])[0] = u[0] < 0 ? 0 : u[0],
            u[1] = u[1] < 0 ? 0 : u[1],
            u
        },
        _setOffset: function() {
            var t, a, n, l;
            switch (g || (g = s.offset ? s.offset : 0),
            h && (g = h),
            typeof g) {
            case "object":
            case "string":
                (a = [(t = [g.y ? g.y : g, g.x ? g.x : g])[0]instanceof jQuery ? t[0] : e(t[0]), t[1]instanceof jQuery ? t[1] : e(t[1])])[0].length > 0 ? (n = a[0].height(),
                "fixed" === a[0].css("position") && (n += a[0][0].offsetTop)) : n = !isNaN(parseFloat(t[0])) && isFinite(t[0]) ? parseInt(t[0]) : 0,
                a[1].length > 0 ? (l = a[1].width(),
                "fixed" === a[1].css("position") && (l += a[1][0].offsetLeft)) : l = !isNaN(parseFloat(t[1])) && isFinite(t[1]) ? parseInt(t[1]) : 0;
                break;
            case "function":
                (t = g.call(null))instanceof Array ? (n = t[0],
                l = t[1]) : n = l = t;
                break;
            default:
                n = l = parseInt(g)
            }
            return [n, l]
        },
        _findHighlight: function(a) {
            var n = t.location.toString().split("#")[0]
              , l = e("._mPS2id-h[href='#" + a + "']")
              , s = e("._mPS2id-h[href='" + n + "#" + a + "']")
              , i = e("._mPS2id-h[href='#/" + a + "']")
              , o = e("._mPS2id-h[href='" + n + "#/" + a + "']");
            return l = l.length > 0 ? l : s,
            (i = i.length > 0 ? i : o).length > 0 ? i : l
        },
        _setClasses: function(t, a, n) {
            var l = s.clickedClass
              , i = s.targetClass
              , o = s.highlightClass;
            t && l && "" !== l ? (e("." + l).removeClass(l),
            r.addClass(l)) : a && i && "" !== i && n && o && "" !== o && (m._currentTarget.call(null, a) ? (a.addClass(i),
            n.addClass(o)) : (!s.keepHighlightUntilNext || e("." + o).length > 1) && (a.removeClass(i),
            n.removeClass(o)))
        },
        _extendClasses: function() {
            var t = s.targetClass
              , a = s.highlightClass
              , n = e("." + t)
              , l = e("." + a)
              , i = t + "-first"
              , o = t + "-last"
              , r = a + "-first"
              , c = a + "-last";
            e("._mPS2id-t").removeClass(i + " " + o),
            e("._mPS2id-h").removeClass(r + " " + c),
            s.forceSingleHighlight ? s.keepHighlightUntilNext && n.length > 1 ? (n.slice(0, 1).removeClass(t),
            l.slice(0, 1).removeClass(a)) : (n.slice(1).removeClass(t),
            l.slice(1).removeClass(a)) : (n.slice(0, 1).addClass(i).end().slice(-1).addClass(o),
            l.slice(0, 1).addClass(r).end().slice(-1).addClass(c))
        },
        _removeClasses: function(t) {
            e("." + s.clickedClass).removeClass(s.clickedClass),
            e("." + s.targetClass).removeClass(s.targetClass + " " + s.targetClass + "-first " + s.targetClass + "-last"),
            e("." + s.highlightClass).removeClass(s.highlightClass + " " + s.highlightClass + "-first " + s.highlightClass + "-last"),
            t && (e("._mPS2id-t").removeClass("_mPS2id-t"),
            e("._mPS2id-h").removeClass("_mPS2id-h"))
        },
        _currentTarget: function(a) {
            var n = s["target_" + a.data("mPS2id").i]
              , l = a[0].getBoundingClientRect();
            if (void 0 !== n) {
                var i = a.offset().top
                  , o = a.offset().left
                  , r = n.from ? n.from + i : i
                  , c = n.to ? n.to + i : i
                  , u = n.fromX ? n.fromX + o : o
                  , f = n.toX ? n.toX + o : o;
                return l.top >= c && l.top <= r && l.left >= f && l.left <= u
            }
            var g = e(t).height()
              , h = e(t).width()
              , d = a.height()
              , p = a.width()
              , m = 1 + d / g
              , S = m
              , C = d < g ? m * (g / d) : m
              , _ = 1 + p / h
              , I = _
              , P = p < h ? _ * (h / p) : _;
            return l.top <= g / S && l.bottom >= g / C && l.left <= h / I && l.right >= h / P
        },
        _scrollTo: function() {
            s.scrollSpeed = parseInt(s.scrollSpeed),
            u = s.pageEndSmoothScroll ? m._pageEndSmoothScroll.call(null) : u;
            var a = e("html,body")
              , n = s.autoScrollSpeed ? m._autoScrollSpeed.call(null) : s.scrollSpeed
              , l = a.is(":animated") ? s.scrollingEasing : s.scrollEasing
              , i = e(t).scrollTop()
              , o = e(t).scrollLeft();
            switch (f) {
            case "horizontal":
                o != u[1] && (m._callbacks.call(null, "onStart"),
                a.stop().animate({
                    scrollLeft: u[1]
                }, n, l).promise().then(function() {
                    m._callbacks.call(null, "onComplete")
                }));
                break;
            case "auto":
                var r;
                if (i != u[0] || o != u[1])
                    if (m._callbacks.call(null, "onStart"),
                    navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))
                        a.stop().animate({
                            pageYOffset: u[0],
                            pageXOffset: u[1]
                        }, {
                            duration: n,
                            easing: l,
                            step: function(e, a) {
                                "pageXOffset" == a.prop ? r = e : "pageYOffset" == a.prop && t.scrollTo(r, e)
                            }
                        }).promise().then(function() {
                            m._callbacks.call(null, "onComplete")
                        });
                    else
                        a.stop().animate({
                            scrollTop: u[0],
                            scrollLeft: u[1]
                        }, n, l).promise().then(function() {
                            m._callbacks.call(null, "onComplete")
                        });
                break;
            default:
                i != u[0] && (m._callbacks.call(null, "onStart"),
                a.stop().animate({
                    scrollTop: u[0]
                }, n, l).promise().then(function() {
                    m._callbacks.call(null, "onComplete")
                }))
            }
        },
        _pageEndSmoothScroll: function() {
            var n = e(a).height()
              , l = e(a).width()
              , s = e(t).height()
              , i = e(t).width();
            return [n - u[0] < s ? n - s : u[0], l - u[1] < i ? l - i : u[1]]
        },
        _autoScrollSpeed: function() {
            var n = e(t).scrollTop()
              , l = e(t).scrollLeft()
              , i = e(a).height()
              , o = e(a).width()
              , r = [s.scrollSpeed + s.scrollSpeed * Math.floor(Math.abs(u[0] - n) / i * 100) / 100, s.scrollSpeed + s.scrollSpeed * Math.floor(Math.abs(u[1] - l) / o * 100) / 100];
            return Math.max.apply(Math, r)
        },
        _callbacks: function(e) {
            if (s)
                switch (this.mPS2id = {
                    trigger: o,
                    clicked: r,
                    target: c,
                    scrollTo: {
                        y: u[0],
                        x: u[1]
                    }
                },
                e) {
                case "onStart":
                    s.onStart.call(null, this.mPS2id);
                    break;
                case "onComplete":
                    s.onComplete.call(null, this.mPS2id)
                }
        },
        _reset: function() {
            f = g = h = !1
        },
        _isInit: function() {
            i || p.init.apply(this)
        },
        _easing: function() {
            e.easing.easeInQuad = e.easing.easeInQuad || function(e, t, a, n, l) {
                return n * (t /= l) * t + a
            }
            ,
            e.easing.easeOutQuad = e.easing.easeOutQuad || function(e, t, a, n, l) {
                return -n * (t /= l) * (t - 2) + a
            }
            ,
            e.easing.easeInOutQuad = e.easing.easeInOutQuad || function(e, t, a, n, l) {
                return (t /= l / 2) < 1 ? n / 2 * t * t + a : -n / 2 * (--t * (t - 2) - 1) + a
            }
            ,
            e.easing.easeInCubic = e.easing.easeInCubic || function(e, t, a, n, l) {
                return n * (t /= l) * t * t + a
            }
            ,
            e.easing.easeOutCubic = e.easing.easeOutCubic || function(e, t, a, n, l) {
                return n * ((t = t / l - 1) * t * t + 1) + a
            }
            ,
            e.easing.easeInOutCubic = e.easing.easeInOutCubic || function(e, t, a, n, l) {
                return (t /= l / 2) < 1 ? n / 2 * t * t * t + a : n / 2 * ((t -= 2) * t * t + 2) + a
            }
            ,
            e.easing.easeInQuart = e.easing.easeInQuart || function(e, t, a, n, l) {
                return n * (t /= l) * t * t * t + a
            }
            ,
            e.easing.easeOutQuart = e.easing.easeOutQuart || function(e, t, a, n, l) {
                return -n * ((t = t / l - 1) * t * t * t - 1) + a
            }
            ,
            e.easing.easeInOutQuart = e.easing.easeInOutQuart || function(e, t, a, n, l) {
                return (t /= l / 2) < 1 ? n / 2 * t * t * t * t + a : -n / 2 * ((t -= 2) * t * t * t - 2) + a
            }
            ,
            e.easing.easeInQuint = e.easing.easeInQuint || function(e, t, a, n, l) {
                return n * (t /= l) * t * t * t * t + a
            }
            ,
            e.easing.easeOutQuint = e.easing.easeOutQuint || function(e, t, a, n, l) {
                return n * ((t = t / l - 1) * t * t * t * t + 1) + a
            }
            ,
            e.easing.easeInOutQuint = e.easing.easeInOutQuint || function(e, t, a, n, l) {
                return (t /= l / 2) < 1 ? n / 2 * t * t * t * t * t + a : n / 2 * ((t -= 2) * t * t * t * t + 2) + a
            }
            ,
            e.easing.easeInExpo = e.easing.easeInExpo || function(e, t, a, n, l) {
                return 0 == t ? a : n * Math.pow(2, 10 * (t / l - 1)) + a
            }
            ,
            e.easing.easeOutExpo = e.easing.easeOutExpo || function(e, t, a, n, l) {
                return t == l ? a + n : n * (1 - Math.pow(2, -10 * t / l)) + a
            }
            ,
            e.easing.easeInOutExpo = e.easing.easeInOutExpo || function(e, t, a, n, l) {
                return 0 == t ? a : t == l ? a + n : (t /= l / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + a : n / 2 * (2 - Math.pow(2, -10 * --t)) + a
            }
            ,
            e.easing.easeInSine = e.easing.easeInSine || function(e, t, a, n, l) {
                return -n * Math.cos(t / l * (Math.PI / 2)) + n + a
            }
            ,
            e.easing.easeOutSine = e.easing.easeOutSine || function(e, t, a, n, l) {
                return n * Math.sin(t / l * (Math.PI / 2)) + a
            }
            ,
            e.easing.easeInOutSine = e.easing.easeInOutSine || function(e, t, a, n, l) {
                return -n / 2 * (Math.cos(Math.PI * t / l) - 1) + a
            }
            ,
            e.easing.easeInCirc = e.easing.easeInCirc || function(e, t, a, n, l) {
                return -n * (Math.sqrt(1 - (t /= l) * t) - 1) + a
            }
            ,
            e.easing.easeOutCirc = e.easing.easeOutCirc || function(e, t, a, n, l) {
                return n * Math.sqrt(1 - (t = t / l - 1) * t) + a
            }
            ,
            e.easing.easeInOutCirc = e.easing.easeInOutCirc || function(e, t, a, n, l) {
                return (t /= l / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + a : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + a
            }
            ,
            e.easing.easeInElastic = e.easing.easeInElastic || function(e, t, a, n, l) {
                var s = 1.70158
                  , i = 0
                  , o = n;
                if (0 == t)
                    return a;
                if (1 == (t /= l))
                    return a + n;
                if (i || (i = .3 * l),
                o < Math.abs(n)) {
                    o = n;
                    s = i / 4
                } else
                    s = i / (2 * Math.PI) * Math.asin(n / o);
                return -o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / i) + a
            }
            ,
            e.easing.easeOutElastic = e.easing.easeOutElastic || function(e, t, a, n, l) {
                var s = 1.70158
                  , i = 0
                  , o = n;
                if (0 == t)
                    return a;
                if (1 == (t /= l))
                    return a + n;
                if (i || (i = .3 * l),
                o < Math.abs(n)) {
                    o = n;
                    s = i / 4
                } else
                    s = i / (2 * Math.PI) * Math.asin(n / o);
                return o * Math.pow(2, -10 * t) * Math.sin((t * l - s) * (2 * Math.PI) / i) + n + a
            }
            ,
            e.easing.easeInOutElastic = e.easing.easeInOutElastic || function(e, t, a, n, l) {
                var s = 1.70158
                  , i = 0
                  , o = n;
                if (0 == t)
                    return a;
                if (2 == (t /= l / 2))
                    return a + n;
                if (i || (i = l * (.3 * 1.5)),
                o < Math.abs(n)) {
                    o = n;
                    s = i / 4
                } else
                    s = i / (2 * Math.PI) * Math.asin(n / o);
                return t < 1 ? o * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / i) * -.5 + a : o * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / i) * .5 + n + a
            }
            ,
            e.easing.easeInBack = e.easing.easeInBack || function(e, t, a, n, l, s) {
                return null == s && (s = 1.70158),
                n * (t /= l) * t * ((s + 1) * t - s) + a
            }
            ,
            e.easing.easeOutBack = e.easing.easeOutBack || function(e, t, a, n, l, s) {
                return null == s && (s = 1.70158),
                n * ((t = t / l - 1) * t * ((s + 1) * t + s) + 1) + a
            }
            ,
            e.easing.easeInOutBack = e.easing.easeInOutBack || function(e, t, a, n, l, s) {
                return null == s && (s = 1.70158),
                (t /= l / 2) < 1 ? n / 2 * (t * t * ((1 + (s *= 1.525)) * t - s)) + a : n / 2 * ((t -= 2) * t * ((1 + (s *= 1.525)) * t + s) + 2) + a
            }
            ,
            e.easing.easeInBounce = e.easing.easeInBounce || function(t, a, n, l, s) {
                return l - e.easing.easeOutBounce(t, s - a, 0, l, s) + n
            }
            ,
            e.easing.easeOutBounce = e.easing.easeOutBounce || function(e, t, a, n, l) {
                return (t /= l) < 1 / 2.75 ? n * (7.5625 * t * t) + a : t < 2 / 2.75 ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + a : t < 2.5 / 2.75 ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + a : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + a
            }
            ,
            e.easing.easeInOutBounce = e.easing.easeInOutBounce || function(t, a, n, l, s) {
                return a < s / 2 ? .5 * e.easing.easeInBounce(t, 2 * a, 0, l, s) + n : .5 * e.easing.easeOutBounce(t, 2 * a - s, 0, l, s) + .5 * l + n
            }
        }
    };
    m._easing.call(),
    e.fn.mPageScroll2id = function(t) {
        return p[t] ? p[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : p.init.apply(this, arguments)
    }
    ,
    e.mPageScroll2id = function(t) {
        return p[t] ? p[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : p.init.apply(this, arguments)
    }
    ,
    e.mPageScroll2id.defaults = d
}(jQuery, window, document);
/*! Sticky */
(function() {
    var b, f;
    b = this.jQuery || window.jQuery;
    f = b(window);
    b.fn.stick_in_parent = function(d) {
        var A, w, J, n, B, K, p, q, k, E, t;
        null == d && (d = {});
        t = d.sticky_class;
        B = d.inner_scrolling;
        E = d.recalc_every;
        k = d.parent;
        q = d.offset_top;
        p = d.spacer;
        w = d.bottoming;
        null == q && (q = 0);
        null == k && (k = void 0);
        null == B && (B = !0);
        null == t && (t = "is_stuck");
        A = b(document);
        null == w && (w = !0);
        J = function(a, d, n, C, F, u, r, G) {
            var v, H, m, D, I, c, g, x, y, z, h, l;
            if (!a.data("sticky_kit")) {
                a.data("sticky_kit", !0);
                I = A.height();
                g = a.parent();
                null != k && (g = g.closest(k));
                if (!g.length)
                    throw "failed to find stick parent";
                v = m = !1;
                (h = null != p ? p && a.closest(p) : b("<div />")) && h.css("position", a.css("position"));
                x = function() {
                    var c, f, e;
                    if (!G && (I = A.height(),
                    c = parseInt(g.css("border-top-width"), 10),
                    f = parseInt(g.css("padding-top"), 10),
                    d = parseInt(g.css("padding-bottom"), 10),
                    n = g.offset().top + c + f,
                    C = g.height(),
                    m && (v = m = !1,
                    null == p && (a.insertAfter(h),
                    h.detach()),
                    a.css({
                        position: "",
                        top: "",
                        width: "",
                        bottom: ""
                    }).removeClass(t),
                    e = !0),
                    F = a.offset().top - (parseInt(a.css("margin-top"), 10) || 0) - q,
                    u = a.outerHeight(!0),
                    r = a.css("float"),
                    h && h.css({
                        width: a.outerWidth(!0),
                        height: u,
                        display: a.css("display"),
                        "vertical-align": a.css("vertical-align"),
                        "float": r
                    }),
                    e))
                        return l()
                }
                ;
                x();
                if (u !== C)
                    return D = void 0,
                    c = q,
                    z = E,
                    l = function() {
                        var b, l, e, k;
                        if (!G && (e = !1,
                        null != z && (--z,
                        0 >= z && (z = E,
                        x(),
                        e = !0)),
                        e || A.height() === I || x(),
                        e = f.scrollTop(),
                        null != D && (l = e - D),
                        D = e,
                        m ? (w && (k = e + u + c > C + n,
                        v && !k && (v = !1,
                        a.css({
                            position: "fixed",
                            bottom: "",
                            top: c
                        }).trigger("sticky_kit:unbottom"))),
                        e < F && (m = !1,
                        c = q,
                        null == p && ("left" !== r && "right" !== r || a.insertAfter(h),
                        h.detach()),
                        b = {
                            position: "",
                            width: "",
                            top: ""
                        },
                        a.css(b).removeClass(t).trigger("sticky_kit:unstick")),
                        B && (b = f.height(),
                        u + q > b && !v && (c -= l,
                        c = Math.max(b - u, c),
                        c = Math.min(q, c),
                        m && a.css({
                            top: c + "px"
                        })))) : e > F && (m = !0,
                        b = {
                            position: "fixed",
                            top: c
                        },
                        b.width = "border-box" === a.css("box-sizing") ? a.outerWidth() + "px" : a.width() + "px",
                        a.css(b).addClass(t),
                        null == p && (a.after(h),
                        "left" !== r && "right" !== r || h.append(a)),
                        a.trigger("sticky_kit:stick")),
                        m && w && (null == k && (k = e + u + c > C + n),
                        !v && k)))
                            return v = !0,
                            "static" === g.css("position") && g.css({
                                position: "relative"
                            }),
                            a.css({
                                position: "absolute",
                                bottom: d,
                                top: "auto"
                            }).trigger("sticky_kit:bottom")
                    }
                    ,
                    y = function() {
                        x();
                        return l()
                    }
                    ,
                    H = function() {
                        G = !0;
                        f.off("touchmove", l);
                        f.off("scroll", l);
                        f.off("resize", y);
                        b(document.body).off("sticky_kit:recalc", y);
                        a.off("sticky_kit:detach", H);
                        a.removeData("sticky_kit");
                        a.css({
                            position: "",
                            bottom: "",
                            top: "",
                            width: ""
                        });
                        g.position("position", "");
                        if (m)
                            return null == p && ("left" !== r && "right" !== r || a.insertAfter(h),
                            h.remove()),
                            a.removeClass(t)
                    }
                    ,
                    f.on("touchmove", l),
                    f.on("scroll", l),
                    f.on("resize", y),
                    b(document.body).on("sticky_kit:recalc", y),
                    a.on("sticky_kit:detach", H),
                    setTimeout(l, 0)
            }
        }
        ;
        n = 0;
        for (K = this.length; n < K; n++)
            d = this[n],
            J(b(d));
        return this
    }
}
).call(this);

/*! jQuery Nice Select */
!function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next()
              , n = t.find("option")
              , i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()),
            n.each(function(t) {
                var n = e(this)
                  , i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t)
            return "update" == t ? this.each(function() {
                var t = e(this)
                  , n = e(this).next(".nice-select")
                  , i = n.hasClass("open");
                n.length && (n.remove(),
                s(t),
                i && t.next().trigger("click"))
            }) : "destroy" == t ? (this.each(function() {
                var t = e(this)
                  , s = e(this).next(".nice-select");
                s.length && (s.remove(),
                t.css("display", ""))
            }),
            0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'),
            this;
        this.hide(),
        this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }),
        e(document).off(".nice_select"),
        e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"),
            s.toggleClass("open"),
            s.hasClass("open") ? (s.find(".option"),
            s.find(".focus").removeClass("focus"),
            s.find(".selected").addClass("focus")) : s.focus()
        }),
        e(document).on("click.nice_select", function(t) {
            0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option")
        }),
        e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this)
              , n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"),
            s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i),
            n.prev("select").val(s.data("value")).trigger("change")
        }),
        e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this)
              , n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode)
                return s.hasClass("open") ? n.trigger("click") : s.trigger("click"),
                !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"),
                    i.addClass("focus"))
                } else
                    s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"),
                    l.addClass("focus"))
                } else
                    s.trigger("click");
                return !1
            }
            if (27 == t.keyCode)
                s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open"))
                return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto",
        "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"),
        this
    }
}(jQuery);
/*! classie & cbpAnimatedHeader */
!function(e) {
    "use strict";
    function n(e) {
        return new RegExp("(^|\\s+)" + e + "(\\s+|$)")
    }
    function s(e, n) {
        var s = a(e, n) ? c : t;
        s(e, n)
    }
    var a, t, c;
    "classList"in document.documentElement ? (a = function(e, n) {
        return e.classList.contains(n)
    }
    ,
    t = function(e, n) {
        e.classList.add(n)
    }
    ,
    c = function(e, n) {
        e.classList.remove(n)
    }
    ) : (a = function(e, s) {
        return n(s).test(e.className)
    }
    ,
    t = function(e, n) {
        a(e, n) || (e.className = e.className + " " + n)
    }
    ,
    c = function(e, s) {
        e.className = e.className.replace(n(s), " ")
    }
    );
    var i = {
        hasClass: a,
        addClass: t,
        removeClass: c,
        toggleClass: s,
        has: a,
        add: t,
        remove: c,
        toggle: s
    };
    "function" == typeof define && define.amd ? define(i) : e.classie = i
}(window);
var cbpAnimatedHeader = function() {
    function e() {
        window.addEventListener("scroll", function(e) {
            c || (c = !0,
            setTimeout(n, 250))
        }, !1)
    }
    function n() {
        var e = s();
        e >= i ? classie.add(t, "cbp-af-header-shrink") : classie.remove(t, "cbp-af-header-shrink"),
        c = !1
    }
    function s() {
        return window.pageYOffset || a.scrollTop
    }
    var a = document.documentElement
      , t = document.querySelector(".cbp-af-header")
      , c = !1
      , i = 20;
    e()
}();
/*! Retina */
!function() {
    function a() {}
    function b(a) {
        return f.retinaImageSuffix + a
    }
    function c(a, c) {
        if (this.path = a || "",
        "undefined" != typeof c && null !== c)
            this.at_2x_path = c,
            this.perform_check = !1;
        else {
            if (void 0 !== document.createElement) {
                var d = document.createElement("a");
                d.href = this.path,
                d.pathname = d.pathname.replace(g, b),
                this.at_2x_path = d.href
            } else {
                var e = this.path.split("?");
                e[0] = e[0].replace(g, b),
                this.at_2x_path = e.join("?")
            }
            this.perform_check = !0
        }
    }
    function d(a) {
        this.el = a,
        this.path = new c(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));
        var b = this;
        this.path.check_2x_variant(function(a) {
            a && b.swap()
        })
    }
    var e = "undefined" == typeof exports ? window : exports
      , f = {
        retinaImageSuffix: "@2x",
        check_mime_type: !0,
        force_original_dimensions: !0
    };
    e.Retina = a,
    a.configure = function(a) {
        null === a && (a = {});
        for (var b in a)
            a.hasOwnProperty(b) && (f[b] = a[b])
    }
    ,
    a.init = function(a) {
        null === a && (a = e);
        var b = a.onload || function() {}
        ;
        a.onload = function() {
            var a, c, e = document.getElementsByTagName("img"), f = [];
            for (a = 0; a < e.length; a += 1)
                c = e[a],
                c.getAttributeNode("data-no-retina") || f.push(new d(c));
            b()
        }
    }
    ,
    a.isRetina = function() {
        var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
        return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
    }
    ;
    var g = /\.\w+$/;
    e.RetinaImagePath = c,
    c.confirmed_paths = [],
    c.prototype.is_external = function() {
        return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }
    ,
    c.prototype.check_2x_variant = function(a) {
        var b, d = this;
        return this.is_external() ? a(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest,
        b.open("HEAD", this.at_2x_path),
        b.onreadystatechange = function() {
            if (4 !== b.readyState)
                return a(!1);
            if (b.status >= 200 && b.status <= 399) {
                if (f.check_mime_type) {
                    var e = b.getResponseHeader("Content-Type");
                    if (null === e || !e.match(/^image/i))
                        return a(!1)
                }
                return c.confirmed_paths.push(d.at_2x_path),
                a(!0)
            }
            return a(!1)
        }
        ,
        b.send(),
        void 0) : a(!0)
    }
    ,
    e.RetinaImage = d,
    d.prototype.swap = function(a) {
        function b() {
            c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth),
            c.el.setAttribute("height", c.el.offsetHeight)),
            c.el.setAttribute("src", a)) : setTimeout(b, 5)
        }
        "undefined" == typeof a && (a = this.path.at_2x_path);
        var c = this;
        b()
    }
    ,
    a.isRetina() && a.init(e)
}();
/*! FitVids */
!function(t) {
    "use strict";
    t.fn.fitVids = function(e) {
        var i = {
            customSelector: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.createElement("div")
              , a = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0]
              , o = "&shy;<style>.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>";
            r.className = "fit-vids-style",
            r.id = "fit-vids-style",
            r.style.display = "none",
            r.innerHTML = o,
            a.parentNode.insertBefore(r, a)
        }
        return e && t.extend(i, e),
        this.each(function() {
            var e = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = t(this).find(e.join(","));
            r = r.not("object object"),
            r.each(function() {
                var e = t(this);
                if (!("embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height()
                      , r = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10)
                      , a = i / r;
                    if (!e.attr("id")) {
                        var o = "fitvid" + Math.floor(999999 * Math.random());
                        e.attr("id", o)
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * a + "%"),
                    e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto);
/*! Lightbox */
!function(t, e, n, o) {
    "use strict";
    function i(t) {
        var e = t.currentTarget
          , o = t.data ? t.data.options : {}
          , i = o.selector ? n(o.selector) : t.data ? t.data.items : []
          , a = n(e).attr("data-fancybox") || ""
          , s = 0
          , r = n.fancybox.getInstance();
        t.preventDefault(),
        r && r.current.opts.$orig.is(e) || (a ? (i = i.length ? i.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]'),
        s = i.index(e),
        s < 0 && (s = 0)) : i = [e],
        n.fancybox.open(i, o, s))
    }
    if (n) {
        if (n.fn.fancybox)
            return void n.error("fancyBox already initialized");
        var a = {
            loop: !1,
            margin: [44, 0],
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !1,
            toolbar: !0,
            buttons: ["slideShow", "fullScreen", "thumbs", "close"],
            idleTime: 4,
            smallBtn: "auto",
            protect: !1,
            modal: !1,
            image: {
                preload: "auto"
            },
            ajax: {
                settings: {
                    data: {
                        fancybox: !0
                    }
                }
            },
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {
                    scrolling: "auto"
                }
            },
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button><div class="fancybox-infobar__body"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button></div><div class="fancybox-toolbar">{{BUTTONS}}</div><div class="fancybox-navigation"><button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" /><button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" /></div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
            btnTpl: {
                slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
                thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
                smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
            },
            parentEl: "body",
            autoFocus: !0,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {
                autoStart: !1
            },
            touch: {
                vertical: !0,
                momentum: !0
            },
            hash: null,
            media: {},
            slideShow: {
                autoStart: !1,
                speed: 4e3
            },
            thumbs: {
                autoStart: !1,
                hideOnClose: !0
            },
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function(t, e) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                clickContent: function(t, e) {
                    return "image" === t.type && "toggleControls"
                },
                clickSlide: function(t, e) {
                    return "image" === t.type ? "toggleControls" : "close"
                },
                dblclickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                dblclickSlide: function(t, e) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "Zurück",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder"
                }
            }
        }
          , s = n(t)
          , r = n(e)
          , c = 0
          , l = function(t) {
            return t && t.hasOwnProperty && t instanceof n
        }
          , u = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }()
          , d = function() {
            var t, n = e.createElement("fakeelement"), i = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in i)
                if (n.style[t] !== o)
                    return i[t]
        }()
          , f = function(t) {
            return t && t.length && t[0].offsetHeight
        }
          , h = function(t, o, i) {
            var s = this;
            s.opts = n.extend(!0, {
                index: i
            }, a, o || {}),
            o && n.isArray(o.buttons) && (s.opts.buttons = o.buttons),
            s.id = s.opts.id || ++c,
            s.group = [],
            s.currIndex = parseInt(s.opts.index, 10) || 0,
            s.prevIndex = null,
            s.prevPos = null,
            s.currPos = 0,
            s.firstRun = null,
            s.createGroup(t),
            s.group.length && (s.$lastFocus = n(e.activeElement).blur(),
            s.slides = {},
            s.init(t))
        };
        n.extend(h.prototype, {
            init: function() {
                var t, e, o, i = this, a = i.group[i.currIndex].opts;
                i.scrollTop = r.scrollTop(),
                i.scrollLeft = r.scrollLeft(),
                n.fancybox.getInstance() || n.fancybox.isMobile || "hidden" === n("body").css("overflow") || (t = n("body").width(),
                n("html").addClass("fancybox-enabled"),
                t = n("body").width() - t,
                t > 1 && n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar, .fancybox-enabled body { margin-right: ' + t + "px; }</style>")),
                o = "",
                n.each(a.buttons, function(t, e) {
                    o += a.btnTpl[e] || ""
                }),
                e = n(i.translate(i, a.baseTpl.replace("{{BUTTONS}}", o))).addClass("fancybox-is-hidden").attr("id", "fancybox-container-" + i.id).addClass(a.baseClass).data("FancyBox", i).prependTo(a.parentEl),
                i.$refs = {
                    container: e
                },
                ["bg", "inner", "infobar", "toolbar", "stage", "caption"].forEach(function(t) {
                    i.$refs[t] = e.find(".fancybox-" + t)
                }),
                (!a.arrows || i.group.length < 2) && e.find(".fancybox-navigation").remove(),
                a.infobar || i.$refs.infobar.remove(),
                a.toolbar || i.$refs.toolbar.remove(),
                i.trigger("onInit"),
                i.activate(),
                i.jumpTo(i.currIndex)
            },
            translate: function(t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                    var i = n[e];
                    return i === o ? t : i
                })
            },
            createGroup: function(t) {
                var e = this
                  , i = n.makeArray(t);
                n.each(i, function(t, i) {
                    var a, s, r, c, l = {}, u = {}, d = [];
                    n.isPlainObject(i) ? (l = i,
                    u = i.opts || i) : "object" === n.type(i) && n(i).length ? (a = n(i),
                    d = a.data(),
                    u = "options"in d ? d.options : {},
                    u = "object" === n.type(u) ? u : {},
                    l.src = "src"in d ? d.src : u.src || a.attr("href"),
                    ["width", "height", "thumb", "type", "filter"].forEach(function(t) {
                        t in d && (u[t] = d[t])
                    }),
                    "srcset"in d && (u.image = {
                        srcset: d.srcset
                    }),
                    u.$orig = a,
                    l.type || l.src || (l.type = "inline",
                    l.src = i)) : l = {
                        type: "html",
                        src: i + ""
                    },
                    l.opts = n.extend(!0, {}, e.opts, u),
                    n.fancybox.isMobile && (l.opts = n.extend(!0, {}, l.opts, l.opts.mobile)),
                    s = l.type || l.opts.type,
                    r = l.src || "",
                    !s && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === r.charAt(0) && (s = "inline")),
                    l.type = s,
                    l.index = e.group.length,
                    l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig,
                    !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")),
                    l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb,
                    "function" === n.type(l.opts.caption) ? l.opts.caption = l.opts.caption.apply(i, [e, l]) : "caption"in d && (l.opts.caption = d.caption),
                    l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + "",
                    "ajax" === s && (c = r.split(/\s+/, 2),
                    c.length > 1 && (l.src = c.shift(),
                    l.opts.filter = c.shift())),
                    "auto" == l.opts.smallBtn && (n.inArray(s, ["html", "inline", "ajax"]) > -1 ? (l.opts.toolbar = !1,
                    l.opts.smallBtn = !0) : l.opts.smallBtn = !1),
                    "pdf" === s && (l.type = "iframe",
                    l.opts.iframe.preload = !1),
                    l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })),
                    e.group.push(l)
                })
            },
            addEvents: function() {
                var o = this;
                o.removeEvents(),
                o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    o.close(t)
                }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    o.previous()
                }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    o.next()
                }),
                s.on("orientationchange.fb resize.fb", function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? u(function() {
                        o.update()
                    }) : (o.$refs.stage.hide(),
                    setTimeout(function() {
                        o.$refs.stage.show(),
                        o.update()
                    }, 500))
                }),
                r.on("focusin.fb", function(t) {
                    var i = n.fancybox ? n.fancybox.getInstance() : null;
                    i.isClosing || !i.current || !i.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || i && "fixed" !== n(t.target).css("position") && !i.$refs.container.has(t.target).length && (t.stopPropagation(),
                    i.focus(),
                    s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))
                }),
                r.on("keydown.fb", function(t) {
                    var e = o.current
                      , i = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea"))
                        return 8 === i || 27 === i ? (t.preventDefault(),
                        void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(),
                        void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(),
                        void o.next()) : void o.trigger("afterKeydown", t, i)
                }),
                o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0,
                r.on("mousemove.fb-idle mouseenter.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function() {
                    o.idleSecondsCounter = 0,
                    o.isIdle && o.showControls(),
                    o.isIdle = !1
                }),
                o.idleInterval = t.setInterval(function() {
                    o.idleSecondsCounter++,
                    o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && (o.isIdle = !0,
                    o.idleSecondsCounter = 0,
                    o.hideControls())
                }, 1e3))
            },
            removeEvents: function() {
                var e = this;
                s.off("orientationchange.fb resize.fb"),
                r.off("focusin.fb keydown.fb .fb-idle"),
                this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                e.idleInterval && (t.clearInterval(e.idleInterval),
                e.idleInterval = null)
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t)
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t)
            },
            jumpTo: function(t, e, i) {
                var a, s, r, c, l, u, d, h = this, p = h.group.length;
                if (!(h.isSliding || h.isClosing || h.isAnimating && h.firstRun)) {
                    if (t = parseInt(t, 10),
                    s = h.current ? h.current.opts.loop : h.opts.loop,
                    !s && (t < 0 || t >= p))
                        return !1;
                    if (a = h.firstRun = null === h.firstRun,
                    !(p < 2 && !a && h.isSliding)) {
                        if (c = h.current,
                        h.prevIndex = h.currIndex,
                        h.prevPos = h.currPos,
                        r = h.createSlide(t),
                        p > 1 && ((s || r.index > 0) && h.createSlide(t - 1),
                        (s || r.index < p - 1) && h.createSlide(t + 1)),
                        h.current = r,
                        h.currIndex = r.index,
                        h.currPos = r.pos,
                        h.trigger("beforeShow", a),
                        h.updateControls(),
                        u = n.fancybox.getTranslate(r.$slide),
                        r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"),
                        r.forcedDuration = o,
                        n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[a ? "animationDuration" : "transitionDuration"],
                        e = parseInt(e, 10),
                        a)
                            return r.opts.animationEffect && e && h.$refs.container.css("transition-duration", e + "ms"),
                            h.$refs.container.removeClass("fancybox-is-hidden"),
                            f(h.$refs.container),
                            h.$refs.container.addClass("fancybox-is-open"),
                            r.$slide.addClass("fancybox-slide--current"),
                            h.loadSlide(r),
                            void h.preload();
                        n.each(h.slides, function(t, e) {
                            n.fancybox.stop(e.$slide)
                        }),
                        r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),
                        r.isMoved ? (l = Math.round(r.$slide.width()),
                        n.each(h.slides, function(t, o) {
                            var i = o.pos - r.pos;
                            n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: i * l + i * o.opts.gutter
                            }, e, function() {
                                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),
                                o.pos === h.currPos && (r.isMoved = !1,
                                h.complete())
                            })
                        })) : h.$refs.stage.children().removeAttr("style"),
                        r.isLoaded ? h.revealContent(r) : h.loadSlide(r),
                        h.preload(),
                        c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"),
                        c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),
                        c.isComplete = !1,
                        e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect,
                        n.fancybox.animate(c.$slide, d, e, function() {
                            c.$slide.removeClass(d).removeAttr("style")
                        }))))
                    }
                }
            },
            createSlide: function(t) {
                var e, o, i = this;
                return o = t % i.group.length,
                o = o < 0 ? i.group.length + o : o,
                !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),
                i.slides[t] = n.extend(!0, {}, i.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }),
                i.updateSlide(i.slides[t])),
                i.slides[t]
            },
            scaleToActual: function(t, e, i) {
                var a, s, r, c, l, u = this, d = u.current, f = d.$content, h = parseInt(d.$slide.width(), 10), p = parseInt(d.$slide.height(), 10), g = d.width, b = d.height;
                "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f),
                u.isAnimating = !0,
                t = t === o ? .5 * h : t,
                e = e === o ? .5 * p : e,
                a = n.fancybox.getTranslate(f),
                c = g / a.width,
                l = b / a.height,
                s = .5 * h - .5 * g,
                r = .5 * p - .5 * b,
                g > h && (s = a.left * c - (t * c - t),
                s > 0 && (s = 0),
                s < h - g && (s = h - g)),
                b > p && (r = a.top * l - (e * l - e),
                r > 0 && (r = 0),
                r < p - b && (r = p - b)),
                u.updateCursor(g, b),
                n.fancybox.animate(f, {
                    top: r,
                    left: s,
                    scaleX: c,
                    scaleY: l
                }, i || 330, function() {
                    u.isAnimating = !1
                }),
                u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop())
            },
            scaleToFit: function(t) {
                var e, o = this, i = o.current, a = i.$content;
                "image" != i.type || i.hasError || !a || o.isAnimating || (n.fancybox.stop(a),
                o.isAnimating = !0,
                e = o.getFitPos(i),
                o.updateCursor(e.width, e.height),
                n.fancybox.animate(a, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / a.width(),
                    scaleY: e.height / a.height()
                }, t || 330, function() {
                    o.isAnimating = !1
                }))
            },
            getFitPos: function(t) {
                var e, o, i, a, r, c = this, l = t.$content, u = t.width, d = t.height, f = t.opts.margin;
                return !(!l || !l.length || !u && !d) && ("number" === n.type(f) && (f = [f, f]),
                2 == f.length && (f = [f[0], f[1], f[0], f[1]]),
                s.width() < 800 && (f = [0, 0, 0, 0]),
                e = parseInt(c.$refs.stage.width(), 10) - (f[1] + f[3]),
                o = parseInt(c.$refs.stage.height(), 10) - (f[0] + f[2]),
                i = Math.min(1, e / u, o / d),
                a = Math.floor(i * u),
                r = Math.floor(i * d),
                {
                    top: Math.floor(.5 * (o - r)) + f[0],
                    left: Math.floor(.5 * (e - a)) + f[3],
                    width: a,
                    height: r
                })
            },
            update: function() {
                var t = this;
                n.each(t.slides, function(e, n) {
                    t.updateSlide(n)
                })
            },
            updateSlide: function(t) {
                var e = this
                  , o = t.$content;
                o && (t.width || t.height) && (n.fancybox.stop(o),
                n.fancybox.setTranslate(o, e.getFitPos(t)),
                t.pos === e.currPos && e.updateCursor()),
                t.$slide.trigger("refresh"),
                e.trigger("onUpdate", t)
            },
            updateCursor: function(t, e) {
                var n, i = this, a = i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                i.current && !i.isClosing && (i.isZoomable() ? (a.addClass("fancybox-is-zoomable"),
                n = t !== o && e !== o ? t < i.current.width && e < i.current.height : i.isScaledDown(),
                n ? a.addClass("fancybox-can-zoomIn") : i.current.opts.touch ? a.addClass("fancybox-can-drag") : a.addClass("fancybox-can-zoomOut")) : i.current.opts.touch && a.addClass("fancybox-can-drag"))
            },
            isZoomable: function() {
                var t, e = this, o = e.current;
                if (o && !e.isClosing)
                    return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o),
                    o.width > t.width || o.height > t.height))
            },
            isScaledDown: function() {
                var t = this
                  , e = t.current
                  , o = e.$content
                  , i = !1;
                return o && (i = n.fancybox.getTranslate(o),
                i = i.width < e.width || i.height < e.height),
                i
            },
            canPan: function() {
                var t = this
                  , e = t.current
                  , n = e.$content
                  , o = !1;
                return n && (o = t.getFitPos(e),
                o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1),
                o
            },
            loadSlide: function(t) {
                var e, o, i, a = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0,
                    a.trigger("beforeLoad", t),
                    e = t.type,
                    o = t.$slide,
                    o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass),
                    e) {
                    case "image":
                        a.setImage(t);
                        break;
                    case "iframe":
                        a.setIframe(t);
                        break;
                    case "html":
                        a.setContent(t, t.src || t.content);
                        break;
                    case "inline":
                        n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                        break;
                    case "ajax":
                        a.showLoading(t),
                        i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                            url: t.src,
                            success: function(e, n) {
                                "success" === n && a.setContent(t, e)
                            },
                            error: function(e, n) {
                                e && "abort" !== n && a.setError(t)
                            }
                        })),
                        o.one("onReset", function() {
                            i.abort()
                        });
                        break;
                    default:
                        a.setError(t)
                    }
                    return !0
                }
            },
            setImage: function(e) {
                var o, i, a, s, r = this, c = e.opts.image.srcset;
                if (c) {
                    a = t.devicePixelRatio || 1,
                    s = t.innerWidth * a,
                    i = c.split(",").map(function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function(t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void (o && (e.value = o,
                            e.postfix = t[t.length - 1]))
                        }),
                        e
                    }),
                    i.sort(function(t, e) {
                        return t.value - e.value
                    });
                    for (var l = 0; l < i.length; l++) {
                        var u = i[l];
                        if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= a) {
                            o = u;
                            break
                        }
                    }
                    !o && i.length && (o = i[i.length - 1]),
                    o && (e.src = o.url,
                    e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value,
                    e.width = o.value))
                }
                e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide),
                e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width,
                e.height = e.opts.height,
                e.$ghost = n("<img />").one("error", function() {
                    n(this).remove(),
                    e.$ghost = null,
                    r.setBigImage(e)
                }).one("load", function() {
                    r.afterLoad(e),
                    r.setBigImage(e)
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e)
            },
            setBigImage: function(t) {
                var e = this
                  , o = n("<img />");
                t.$image = o.one("error", function() {
                    e.setError(t)
                }).one("load", function() {
                    clearTimeout(t.timouts),
                    t.timouts = null,
                    e.isClosing || (t.width = this.naturalWidth,
                    t.height = this.naturalHeight,
                    t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset),
                    e.hideLoading(t),
                    t.$ghost ? t.timouts = setTimeout(function() {
                        t.timouts = null,
                        t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content),
                (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function() {
                    o[0].complete || t.hasError || e.showLoading(t)
                }, 100)
            },
            setIframe: function(t) {
                var e, i = this, a = t.opts.iframe, s = t.$slide;
                t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(s),
                e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(t.$content),
                a.preload ? (i.showLoading(t),
                e.on("load.fb error.fb", function(e) {
                    this.isReady = 1,
                    t.$slide.trigger("refresh"),
                    i.afterLoad(t)
                }),
                s.on("refresh.fb", function() {
                    var n, i, s, r = t.$content, c = a.css.width, l = a.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            i = e.contents(),
                            s = i.find("body")
                        } catch (t) {}
                        s && s.length && (c === o && (n = e[0].contentWindow.document.documentElement.scrollWidth,
                        c = Math.ceil(s.outerWidth(!0) + (r.width() - n)),
                        c += r.outerWidth() - r.innerWidth()),
                        l === o && (l = Math.ceil(s.outerHeight(!0)),
                        l += r.outerHeight() - r.innerHeight()),
                        c && r.width(c),
                        l && r.height(l)),
                        r.removeClass("fancybox-is-hidden")
                    }
                })) : this.afterLoad(t),
                e.attr("src", t.src),
                t.opts.smallBtn === !0 && t.$content.prepend(i.translate(t, t.opts.btnTpl.smallBtn)),
                s.one("onReset", function() {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank")
                    } catch (t) {}
                    n(this).empty(),
                    t.isLoaded = !1
                })
            },
            setContent: function(t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t),
                t.$slide.empty(),
                l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"),
                t.$placeholder = n("<div></div>").hide().insertAfter(e),
                e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(),
                3 === e[0].nodeType && (e = n("<div>").html(e))),
                t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
                t.$slide.one("onReset", function() {
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(),
                    t.$placeholder = null),
                    t.$smallBtn && (t.$smallBtn.remove(),
                    t.$smallBtn = null),
                    t.hasError || (n(this).empty(),
                    t.isLoaded = !1)
                }),
                t.$content = n(e).appendTo(t.$slide),
                t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(o.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div").first())),
                this.afterLoad(t))
            },
            setError: function(t) {
                t.hasError = !0,
                t.$slide.removeClass("fancybox-slide--" + t.type),
                this.setContent(t, this.translate(t, t.opts.errorTpl))
            },
            showLoading: function(t) {
                var e = this;
                t = t || e.current,
                t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide))
            },
            hideLoading: function(t) {
                var e = this;
                t = t || e.current,
                t && t.$spinner && (t.$spinner.remove(),
                delete t.$spinner)
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1,
                t.isLoaded = !0,
                e.trigger("afterLoad", t),
                e.hideLoading(t),
                t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                    return 2 == t.button && t.preventDefault(),
                    !0
                }),
                "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
                e.revealContent(t))
            },
            revealContent: function(t) {
                var e, i, a, s, r, c = this, l = t.$slide, u = !1;
                return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"],
                a = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"],
                a = parseInt(t.forcedDuration === o ? a : t.forcedDuration, 10),
                !t.isMoved && t.pos === c.currPos && a || (e = !1),
                "zoom" !== e || t.pos === c.currPos && a && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"),
                "zoom" === e ? (r = c.getFitPos(t),
                r.scaleX = r.width / u.width,
                r.scaleY = r.height / u.height,
                delete r.width,
                delete r.height,
                s = t.opts.zoomOpacity,
                "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1),
                s && (u.opacity = .1,
                r.opacity = 1),
                n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u),
                f(t.$content),
                void n.fancybox.animate(t.$content, r, a, function() {
                    c.complete()
                })) : (c.updateSlide(t),
                e ? (n.fancybox.stop(l),
                i = "fancybox-animated fancybox-slide--" + (t.pos > c.prevPos ? "next" : "previous") + " fancybox-fx-" + e,
                l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i),
                t.$content.removeClass("fancybox-is-hidden"),
                f(l),
                void n.fancybox.animate(l, "fancybox-slide--current", a, function(e) {
                    l.removeClass(i).removeAttr("style"),
                    t.pos === c.currPos && c.complete()
                }, !0)) : (f(l),
                t.$content.removeClass("fancybox-is-hidden"),
                void (t.pos === c.currPos && c.complete())))
            },
            getThumbPos: function(o) {
                var i, a = this, s = !1, r = function(e) {
                    for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i.parentElement; )
                        "hidden" !== n(i.parentElement).css("overflow") && "auto" !== n(i.parentElement).css("overflow") || s.push(i.parentElement.getBoundingClientRect()),
                        i = i.parentElement;
                    return o = s.every(function(t) {
                        var e = Math.min(a.right, t.right) - Math.max(a.left, t.left)
                          , n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
                        return e > 0 && n > 0
                    }),
                    o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t).height()
                }, c = o.opts.$thumb, l = c ? c.offset() : 0;
                return l && c[0].ownerDocument === e && r(c) && (i = a.$refs.stage.offset(),
                s = {
                    top: l.top - i.top + parseFloat(c.css("border-top-width") || 0),
                    left: l.left - i.left + parseFloat(c.css("border-left-width") || 0),
                    width: c.width(),
                    height: c.height(),
                    scaleX: 1,
                    scaleY: 1
                }),
                s
            },
            complete: function() {
                var t = this
                  , o = t.current
                  , i = {};
                o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0,
                o.$slide.siblings().trigger("onReset"),
                f(o.$slide),
                o.$slide.addClass("fancybox-slide--complete"),
                n.each(t.slides, function(e, o) {
                    o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide),
                    o.$slide.off().remove())
                }),
                t.slides = i,
                t.updateCursor(),
                t.trigger("afterShow"),
                (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus())
            },
            preload: function() {
                var t, e, n = this;
                n.group.length < 2 || (t = n.slides[n.currPos + 1],
                e = n.slides[n.currPos - 1],
                t && "image" === t.type && n.loadSlide(t),
                e && "image" === e.type && n.loadSlide(e))
            },
            focus: function() {
                var t, e = this.current;
                this.isClosing || (e && e.isComplete && (t = e.$slide.find("input[autofocus]:enabled:visible:first"),
                t.length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))),
                t = t && t.length ? t : this.$refs.container,
                t.focus())
            },
            activate: function() {
                var t = this;
                n(".fancybox-container").each(function() {
                    var e = n(this).data("FancyBox");
                    e && e.uid !== t.uid && !e.isClosing && e.trigger("onDeactivate")
                }),
                t.current && (t.$refs.container.index() > 0 && t.$refs.container.prependTo(e.body),
                t.updateControls()),
                t.trigger("onActivate"),
                t.addEvents()
            },
            close: function(t, e) {
                var o, i, a, s, r, c, l = this, f = l.current, h = function() {
                    l.cleanUp(t)
                };
                return !l.isClosing && (l.isClosing = !0,
                l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1,
                u(function() {
                    l.update()
                }),
                !1) : (l.removeEvents(),
                f.timouts && clearTimeout(f.timouts),
                a = f.$content,
                o = f.opts.animationEffect,
                i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0,
                f.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),
                f.$slide.siblings().trigger("onReset").remove(),
                i && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),
                l.hideLoading(f),
                l.hideControls(),
                l.updateCursor(),
                "zoom" !== o || t !== !0 && a && i && "image" === f.type && !f.hasError && (c = l.getThumbPos(f)) || (o = "fade"),
                "zoom" === o ? (n.fancybox.stop(a),
                r = n.fancybox.getTranslate(a),
                r.width = r.width * r.scaleX,
                r.height = r.height * r.scaleY,
                s = f.opts.zoomOpacity,
                "auto" == s && (s = Math.abs(f.width / f.height - c.width / c.height) > .1),
                s && (c.opacity = 0),
                r.scaleX = r.width / c.width,
                r.scaleY = r.height / c.height,
                r.width = c.width,
                r.height = c.height,
                n.fancybox.setTranslate(f.$content, r),
                n.fancybox.animate(f.$content, c, i, h),
                !0) : (o && i ? t === !0 ? setTimeout(h, i) : n.fancybox.animate(f.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, h) : h(),
                !0)))
            },
            cleanUp: function(t) {
                var e, o = this;
                o.current.$slide.trigger("onReset"),
                o.$refs.container.empty().remove(),
                o.trigger("afterClose", t),
                o.$lastFocus && o.current.opts.backFocus && o.$lastFocus.focus(),
                o.current = null,
                e = n.fancybox.getInstance(),
                e ? e.activate() : (s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft),
                n("html").removeClass("fancybox-enabled"),
                n("#fancybox-style-noscroll").remove())
            },
            trigger: function(t, e) {
                var o, i = Array.prototype.slice.call(arguments, 1), a = this, s = e && e.opts ? e : a.current;
                return s ? i.unshift(s) : s = a,
                i.unshift(a),
                n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
                o === !1 ? o : void ("afterClose" === t ? r.trigger(t + ".fb", i) : a.$refs.container.trigger(t + ".fb", i))
            },
            updateControls: function(t) {
                var e = this
                  , o = e.current
                  , i = o.index
                  , a = o.opts
                  , s = a.caption
                  , r = e.$refs.caption;
                o.$slide.trigger("refresh"),
                e.$caption = s && s.length ? r.html(s) : null,
                e.isHiddenControls || e.showControls(),
                n("[data-fancybox-count]").html(e.group.length),
                n("[data-fancybox-index]").html(i + 1),
                n("[data-fancybox-prev]").prop("disabled", !a.loop && i <= 0),
                n("[data-fancybox-next]").prop("disabled", !a.loop && i >= e.group.length - 1)
            },
            hideControls: function() {
                this.isHiddenControls = !0,
                this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")
            },
            showControls: function() {
                var t = this
                  , e = t.current ? t.current.opts : t.opts
                  , n = t.$refs.container;
                t.isHiddenControls = !1,
                t.idleSecondsCounter = 0,
                n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal),
                t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
            },
            toggleControls: function() {
                this.isHiddenControls ? this.showControls() : this.hideControls()
            }
        }),
        n.fancybox = {
            version: "3.1.28",
            defaults: a,
            getInstance: function(t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):first').data("FancyBox")
                  , o = Array.prototype.slice.call(arguments, 1);
                return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o),
                e)
            },
            open: function(t, e, n) {
                return new h(t,e,n)
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(),
                t === !0 && this.close())
            },
            destroy: function() {
                this.close(!0),
                r.off("click.fb-start")
            },
            isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
            use3d: function() {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function(t) {
                var e;
                if (!t || !t.length)
                    return !1;
                if (e = t.eq(0).css("transform"),
                e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1],
                e = e.split(")")[0],
                e = e.split(",")) : e = [],
                e.length)
                    e = e.length > 10 ? [e[13], e[12], e[0], e[5]] : [e[5], e[4], e[0], e[3]],
                    e = e.map(parseFloat);
                else {
                    e = [0, 0, 1, 1];
                    var n = /\.*translate\((.*)px,(.*)px\)/i
                      , o = n.exec(t.eq(0).attr("style"));
                    o && (e[0] = parseFloat(o[2]),
                    e[1] = parseFloat(o[1]))
                }
                return {
                    top: e[0],
                    left: e[1],
                    scaleX: e[2],
                    scaleY: e[3],
                    opacity: parseFloat(t.css("opacity")),
                    width: t.width(),
                    height: t.height()
                }
            },
            setTranslate: function(t, e) {
                var n = ""
                  , i = {};
                if (t && e)
                    return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px",
                    n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"),
                    e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"),
                    n.length && (i.transform = n),
                    e.opacity !== o && (i.opacity = e.opacity),
                    e.width !== o && (i.width = e.width),
                    e.height !== o && (i.height = e.height),
                    t.css(i)
            },
            animate: function(t, e, i, a, s) {
                var r = d || "transitionend";
                n.isFunction(i) && (a = i,
                i = null),
                n.isPlainObject(e) || t.removeAttr("style"),
                t.on(r, function(i) {
                    (!i || !i.originalEvent || t.is(i.originalEvent.target) && "z-index" != i.originalEvent.propertyName) && (t.off(r),
                    n.isPlainObject(e) ? e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", "0ms"),
                    e.width = Math.round(t.width() * e.scaleX),
                    e.height = Math.round(t.height() * e.scaleY),
                    e.scaleX = 1,
                    e.scaleY = 1,
                    n.fancybox.setTranslate(t, e)) : s !== !0 && t.removeClass(e),
                    n.isFunction(a) && a(i))
                }),
                n.isNumeric(i) && t.css("transition-duration", i + "ms"),
                n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e),
                t.data("timer", setTimeout(function() {
                    t.trigger("transitionend")
                }, i + 16))
            },
            stop: function(t) {
                clearTimeout(t.data("timer")),
                t.off(d)
            }
        },
        n.fn.fancybox = function(t) {
            var e;
            return t = t || {},
            e = t.selector || !1,
            e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, i) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, i),
            this
        }
        ,
        r.on("click.fb-start", "[data-fancybox]", i)
    }
}(window, document, window.jQuery || jQuery),
function(t) {
    "use strict";
    var e = function(e, n, o) {
        if (e)
            return o = o || "",
            "object" === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function(t, n) {
                e = e.replace("$" + t, n || "")
            }),
            o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
            e
    }
      , n = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1,
                api: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1"
        },
        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {
                additionalInfos: 0,
                autoStart: 1
            },
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1"
        },
        vine: {
            matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
            type: "iframe",
            url: "//vine.co/v/$1/embed/simple"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    };
    t(document).on("onInit.fb", function(o, i) {
        t.each(i.group, function(o, i) {
            var a, s, r, c, l, u, d, f = i.src || "", h = !1;
            i.type || (a = t.extend(!0, {}, n, i.opts.media),
            t.each(a, function(n, o) {
                if (r = f.match(o.matcher),
                u = {},
                d = n,
                r) {
                    if (h = o.type,
                    o.paramPlace && r[o.paramPlace]) {
                        l = r[o.paramPlace],
                        "?" == l[0] && (l = l.substring(1)),
                        l = l.split("&");
                        for (var a = 0; a < l.length; ++a) {
                            var p = l[a].split("=", 2);
                            2 == p.length && (u[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")))
                        }
                    }
                    return c = t.extend(!0, {}, o.params, i.opts[n], u),
                    f = "function" === t.type(o.url) ? o.url.call(this, r, c, i) : e(o.url, r, c),
                    s = "function" === t.type(o.thumb) ? o.thumb.call(this, r, c, i) : e(o.thumb, r),
                    "vimeo" === d && (f = f.replace("&%23", "#")),
                    !1
                }
            }),
            h ? (i.src = f,
            i.type = h,
            i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = s),
            "iframe" === h && (t.extend(!0, i.opts, {
                iframe: {
                    preload: !1,
                    attr: {
                        scrolling: "no"
                    }
                }
            }),
            i.contentProvider = d,
            i.opts.slideClass += " fancybox-slide--" + ("gmap_place" == d || "gmap_search" == d ? "map" : "video"))) : i.type = "image")
        })
    })
}(window.jQuery),
function(t, e, n) {
    "use strict";
    var o = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }()
      , i = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
            t.clearTimeout(e)
        }
    }()
      , a = function(e) {
        var n = [];
        e = e.originalEvent || e || t.e,
        e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var o in e)
            e[o].pageX ? n.push({
                x: e[o].pageX,
                y: e[o].pageY
            }) : e[o].clientX && n.push({
                x: e[o].clientX,
                y: e[o].clientY
            });
        return n
    }
      , s = function(t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }
      , r = function(t) {
        if (t.is("a,button,input,select,textarea,label") || n.isFunction(t.get(0).onclick) || t.data("selectable"))
            return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
            if ("data-fancybox-" === o[e].nodeName.substr(0, 14))
                return !0;
        return !1
    }
      , c = function(e) {
        var n = t.getComputedStyle(e)["overflow-y"]
          , o = t.getComputedStyle(e)["overflow-x"]
          , i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight
          , a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a
    }
      , l = function(t) {
        for (var e = !1; ; ) {
            if (e = c(t.get(0)))
                break;
            if (t = t.parent(),
            !t.length || t.hasClass("fancybox-stage") || t.is("body"))
                break
        }
        return e
    }
      , u = function(t) {
        var e = this;
        e.instance = t,
        e.$bg = t.$refs.bg,
        e.$stage = t.$refs.stage,
        e.$container = t.$refs.container,
        e.destroy(),
        e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    u.prototype.destroy = function() {
        this.$container.off(".fb.touch")
    }
    ,
    u.prototype.ontouchstart = function(o) {
        var i = this
          , c = n(o.target)
          , u = i.instance
          , d = u.current
          , f = d.$content
          , h = "touchstart" == o.type;
        if (h && i.$container.off("mousedown.fb.touch"),
        !d || i.instance.isAnimating || i.instance.isClosing)
            return o.stopPropagation(),
            void o.preventDefault();
        if ((!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (i.startPoints = a(o),
        i.startPoints && !(i.startPoints.length > 1 && u.isSliding))) {
            if (i.$target = c,
            i.$content = f,
            i.canTap = !0,
            n(e).off(".fb.touch"),
            n(e).on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")),
            n(e).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")),
            !u.current.opts.touch && !u.canPan() || !c.is(i.$stage) && !i.$stage.find(c).length)
                return void (c.is("img") && o.preventDefault());
            o.stopPropagation(),
            n.fancybox.isMobile && (l(i.$target) || l(i.$target.parent())) || o.preventDefault(),
            i.canvasWidth = Math.round(d.$slide[0].clientWidth),
            i.canvasHeight = Math.round(d.$slide[0].clientHeight),
            i.startTime = (new Date).getTime(),
            i.distanceX = i.distanceY = i.distance = 0,
            i.isPanning = !1,
            i.isSwiping = !1,
            i.isZooming = !1,
            i.sliderStartPos = i.sliderLastPos || {
                top: 0,
                left: 0
            },
            i.contentStartPos = n.fancybox.getTranslate(i.$content),
            i.contentLastPos = null,
            1 !== i.startPoints.length || i.isZooming || (i.canTap = !u.isSliding,
            "image" === d.type && (i.contentStartPos.width > i.canvasWidth + 1 || i.contentStartPos.height > i.canvasHeight + 1) ? (n.fancybox.stop(i.$content),
            i.$content.css("transition-duration", "0ms"),
            i.isPanning = !0) : i.isSwiping = !0,
            i.$container.addClass("fancybox-controls--isGrabbing")),
            2 !== i.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (i.isZooming = !0,
            i.isSwiping = !1,
            i.isPanning = !1,
            n.fancybox.stop(i.$content),
            i.$content.css("transition-duration", "0ms"),
            i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(),
            i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(),
            i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width,
            i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height,
            i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))
        }
    }
    ,
    u.prototype.ontouchmove = function(t) {
        var e = this;
        if (e.newPoints = a(t),
        n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent())))
            return t.stopPropagation(),
            void (e.canTap = !1);
        if ((e.instance.current.opts.touch || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"),
        e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"),
        e.distance = s(e.newPoints[0], e.startPoints[0]),
        e.distance > 0)) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length)
                return;
            t.stopPropagation(),
            t.preventDefault(),
            e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()
        }
    }
    ,
    u.prototype.onSwipe = function() {
        var e, a = this, s = a.isSwiping, r = a.sliderStartPos.left || 0;
        s === !0 ? Math.abs(a.distance) > 10 && (a.canTap = !1,
        a.instance.group.length < 2 && a.instance.opts.touch.vertical ? a.isSwiping = "y" : a.instance.isSliding || a.instance.opts.touch.vertical === !1 || "auto" === a.instance.opts.touch.vertical && n(t).width() > 800 ? a.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(a.distanceY, a.distanceX) / Math.PI),
        a.isSwiping = e > 45 && e < 135 ? "y" : "x"),
        a.instance.isSliding = a.isSwiping,
        a.startPoints = a.newPoints,
        n.each(a.instance.slides, function(t, e) {
            n.fancybox.stop(e.$slide),
            e.$slide.css("transition-duration", "0ms"),
            e.inTransition = !1,
            e.pos === a.instance.current.pos && (a.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left)
        }),
        a.instance.SlideShow && a.instance.SlideShow.isActive && a.instance.SlideShow.stop()) : ("x" == s && (a.distanceX > 0 && (a.instance.group.length < 2 || 0 === a.instance.current.index && !a.instance.current.opts.loop) ? r += Math.pow(a.distanceX, .8) : a.distanceX < 0 && (a.instance.group.length < 2 || a.instance.current.index === a.instance.group.length - 1 && !a.instance.current.opts.loop) ? r -= Math.pow(-a.distanceX, .8) : r += a.distanceX),
        a.sliderLastPos = {
            top: "x" == s ? 0 : a.sliderStartPos.top + a.distanceY,
            left: r
        },
        a.requestId && (i(a.requestId),
        a.requestId = null),
        a.requestId = o(function() {
            a.sliderLastPos && (n.each(a.instance.slides, function(t, e) {
                var o = e.pos - a.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: a.sliderLastPos.top,
                    left: a.sliderLastPos.left + o * a.canvasWidth + o * e.opts.gutter
                })
            }),
            a.$container.addClass("fancybox-is-sliding"))
        }))
    }
    ,
    u.prototype.onPan = function() {
        var t, e, a, s = this;
        s.canTap = !1,
        t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left,
        e = s.contentStartPos.top + s.distanceY,
        a = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height),
        a.scaleX = s.contentStartPos.scaleX,
        a.scaleY = s.contentStartPos.scaleY,
        s.contentLastPos = a,
        s.requestId && (i(s.requestId),
        s.requestId = null),
        s.requestId = o(function() {
            n.fancybox.setTranslate(s.$content, s.contentLastPos)
        })
    }
    ,
    u.prototype.limitMovement = function(t, e, n, o) {
        var i, a, s, r, c = this, l = c.canvasWidth, u = c.canvasHeight, d = c.contentStartPos.left, f = c.contentStartPos.top, h = c.distanceX, p = c.distanceY;
        return i = Math.max(0, .5 * l - .5 * n),
        a = Math.max(0, .5 * u - .5 * o),
        s = Math.min(l - n, .5 * l - .5 * n),
        r = Math.min(u - o, .5 * u - .5 * o),
        n > l && (h > 0 && t > i && (t = i - 1 + Math.pow(-i + d + h, .8) || 0),
        h < 0 && t < s && (t = s + 1 - Math.pow(s - d - h, .8) || 0)),
        o > u && (p > 0 && e > a && (e = a - 1 + Math.pow(-a + f + p, .8) || 0),
        p < 0 && e < r && (e = r + 1 - Math.pow(r - f - p, .8) || 0)),
        {
            top: e,
            left: t
        }
    }
    ,
    u.prototype.limitPosition = function(t, e, n, o) {
        var i = this
          , a = i.canvasWidth
          , s = i.canvasHeight;
        return n > a ? (t = t > 0 ? 0 : t,
        t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2),
        o > s ? (e = e > 0 ? 0 : e,
        e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2),
        {
            top: e,
            left: t
        }
    }
    ,
    u.prototype.onZoom = function() {
        var e = this
          , a = e.contentStartPos.width
          , r = e.contentStartPos.height
          , c = e.contentStartPos.left
          , l = e.contentStartPos.top
          , u = s(e.newPoints[0], e.newPoints[1])
          , d = u / e.startDistanceBetweenFingers
          , f = Math.floor(a * d)
          , h = Math.floor(r * d)
          , p = (a - f) * e.percentageOfImageAtPinchPointX
          , g = (r - h) * e.percentageOfImageAtPinchPointY
          , b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft()
          , m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop()
          , y = b - e.centerPointStartX
          , v = m - e.centerPointStartY
          , x = c + (p + y)
          , w = l + (g + v)
          , $ = {
            top: w,
            left: x,
            scaleX: e.contentStartPos.scaleX * d,
            scaleY: e.contentStartPos.scaleY * d
        };
        e.canTap = !1,
        e.newWidth = f,
        e.newHeight = h,
        e.contentLastPos = $,
        e.requestId && (i(e.requestId),
        e.requestId = null),
        e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }
    ,
    u.prototype.ontouchend = function(t) {
        var o = this
          , s = Math.max((new Date).getTime() - o.startTime, 1)
          , r = o.isSwiping
          , c = o.isPanning
          , l = o.isZooming;
        return o.endPoints = a(t),
        o.$container.removeClass("fancybox-controls--isGrabbing"),
        n(e).off(".fb.touch"),
        o.requestId && (i(o.requestId),
        o.requestId = null),
        o.isSwiping = !1,
        o.isPanning = !1,
        o.isZooming = !1,
        o.canTap ? o.onTap(t) : (o.speed = 366,
        o.velocityX = o.distanceX / s * .5,
        o.velocityY = o.distanceY / s * .5,
        o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)),
        void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)))
    }
    ,
    u.prototype.endSwiping = function(t) {
        var e = this
          , o = !1;
        e.instance.isSliding = !1,
        e.sliderLastPos = null,
        "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, {
            top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
            opacity: 0
        }, 150),
        o = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? o = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (o = e.instance.next(e.speedX)),
        o !== !1 || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150),
        e.$container.removeClass("fancybox-is-sliding")
    }
    ,
    u.prototype.endPanning = function() {
        var t, e, o, i = this;
        i.contentLastPos && (i.instance.current.opts.touch.momentum === !1 ? (t = i.contentLastPos.left,
        e = i.contentLastPos.top) : (t = i.contentLastPos.left + i.velocityX * i.speed,
        e = i.contentLastPos.top + i.velocityY * i.speed),
        o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height),
        o.width = i.contentStartPos.width,
        o.height = i.contentStartPos.height,
        n.fancybox.animate(i.$content, o, 330))
    }
    ,
    u.prototype.endZooming = function() {
        var t, e, o, i, a = this, s = a.instance.current, r = a.newWidth, c = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left,
        e = a.contentLastPos.top,
        i = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        },
        n.fancybox.setTranslate(a.$content, i),
        r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c),
        n.fancybox.setTranslate(a.content, n.fancybox.getTranslate(a.$content)),
        n.fancybox.animate(a.$content, o, 150)))
    }
    ,
    u.prototype.onTap = function(t) {
        var e, o = this, i = n(t.target), s = o.instance, r = s.current, c = t && a(t) || o.startPoints, l = c[0] ? c[0].x - o.$stage.offset().left : 0, u = c[0] ? c[0].y - o.$stage.offset().top : 0, d = function(e) {
            var i = r.opts[e];
            if (n.isFunction(i) && (i = i.apply(s, [r, t])),
            i)
                switch (i) {
                case "close":
                    s.close(o.startEvent);
                    break;
                case "toggleControls":
                    s.toggleControls(!0);
                    break;
                case "next":
                    s.next();
                    break;
                case "nextOrClose":
                    s.group.length > 1 ? s.next() : s.close(o.startEvent);
                    break;
                case "zoom":
                    "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent))
                }
        };
        if (!(t.originalEvent && 2 == t.originalEvent.button || s.isSliding || l > i[0].clientWidth + i.offset().left)) {
            if (i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))
                e = "Outside";
            else if (i.is(".fancybox-slide"))
                e = "Slide";
            else {
                if (!s.current.$content || !s.current.$content.has(t.target).length)
                    return;
                e = "Content"
            }
            if (o.tapped) {
                if (clearTimeout(o.tapped),
                o.tapped = null,
                Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50 || s.isSliding)
                    return this;
                d("dblclick" + e)
            } else
                o.tapX = l,
                o.tapY = u,
                r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function() {
                    o.tapped = null,
                    d("click" + e)
                }, 300) : d("click" + e);
            return this
        }
    }
    ,
    n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new u(e))
    }),
    n(e).on("beforeClose.fb", function(t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, window.jQuery),
function(t, e) {
    "use strict";
    var n = function(t) {
        this.instance = t,
        this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        speed: 3e3,
        init: function() {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }),
            (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide()
        },
        set: function() {
            var t = this;
            t.instance && t.instance.current && (t.instance.current.opts.loop || t.instance.currIndex < t.instance.group.length - 1) ? t.timer = setTimeout(function() {
                t.instance.next()
            }, t.instance.current.opts.slideShow.speed || t.speed) : (t.stop(),
            t.instance.idleSecondsCounter = 0,
            t.instance.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer),
            t.timer = null
        },
        start: function() {
            var t = this
              , e = t.instance.current;
            t.instance && e && (e.opts.loop || e.index < t.instance.group.length - 1) && (t.isActive = !0,
            t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).addClass("fancybox-button--pause"),
            e.isComplete && t.set())
        },
        stop: function() {
            var t = this
              , e = t.instance.current;
            t.clear(),
            t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause"),
            t.isActive = !1
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.SlideShow;
            o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        },
        "afterKeydown.fb": function(n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(),
            r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }),
    e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance()
          , o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, window.jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        var e, n, o, i = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], a = {};
        for (n = 0; n < i.length; n++)
            if (e = i[n],
            e && e[1]in t) {
                for (o = 0; o < e.length; o++)
                    a[i[0][o]] = e[o];
                return a
            }
        return !1
    }();
    if (!n)
        return void (e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
    var o = {
        request: function(e) {
            e = e || t.documentElement,
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
        },
        exit: function() {
            t[n.exitFullscreen]()
        },
        toggle: function(e) {
            e = e || t.documentElement,
            this.isFullscreen() ? this.exit() : this.request(e)
        },
        isFullscreen: function() {
            return Boolean(t[n.fullscreenElement])
        },
        enabled: function() {
            return Boolean(t[n.fullscreenEnabled])
        }
    };
    e(t).on({
        "onInit.fb": function(t, e) {
            var n, i = e.$refs.toolbar.find("[data-fancybox-fullscreen]");
            e && !e.FullScreen && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container,
            n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(),
                t.preventDefault(),
                o.toggle(n[0])
            }),
            e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]),
            e.FullScreen = o) : i.hide()
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            e && e.FullScreen && 70 === i && (o.preventDefault(),
            e.FullScreen.toggle(e.$refs.container[0]))
        },
        "beforeClose.fb": function(t) {
            t && t.FullScreen && o.exit()
        }
    }),
    e(t).on(n.fullscreenchange, function() {
        var t = e.fancybox.getInstance();
        t.current && "image" === t.current.type && t.isAnimating && (t.current.$content.css("transition", "none"),
        t.isAnimating = !1,
        t.update(!0, !0, 0)),
        t.trigger("onFullscreenChange", o.isFullscreen())
    })
}(document, window.jQuery),
function(t, e) {
    "use strict";
    var n = function(t) {
        this.instance = t,
        this.init()
    };
    e.extend(n.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        init: function() {
            var t = this
              , e = t.instance.group[0]
              , n = t.instance.group[1];
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-thumbs]"),
            t.instance.group.length > 1 && t.instance.group[t.instance.currIndex].opts.thumbs && ("image" == e.type || e.opts.thumb || e.opts.$thumb) && ("image" == n.type || n.opts.thumb || n.opts.$thumb) ? (t.$button.on("click", function() {
                t.toggle()
            }),
            t.isActive = !0) : (t.$button.hide(),
            t.isActive = !1)
        },
        create: function() {
            var t, n, o = this.instance;
            this.$grid = e('<div class="fancybox-thumbs"></div>').appendTo(o.$refs.container),
            t = "<ul>",
            e.each(o.group, function(e, o) {
                n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null),
                n || "image" !== o.type || (n = o.src),
                n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>')
            }),
            t += "</ul>",
            this.$list = e(t).appendTo(this.$grid).on("click", "li", function() {
                o.jumpTo(e(this).data("index"))
            }),
            this.$list.find("img").hide().one("load", function() {
                var t, n, o, i, a = e(this).parent().removeClass("fancybox-thumbs-loading"), s = a.outerWidth(), r = a.outerHeight();
                t = this.naturalWidth || this.width,
                n = this.naturalHeight || this.height,
                o = t / s,
                i = n / r,
                o >= 1 && i >= 1 && (o > i ? (t /= i,
                n = r) : (t = s,
                n /= o)),
                e(this).css({
                    width: Math.floor(t),
                    height: Math.floor(n),
                    "margin-top": Math.min(0, Math.floor(.3 * r - .3 * n)),
                    "margin-left": Math.min(0, Math.floor(.5 * s - .5 * t))
                }).show()
            }).each(function() {
                this.src = e(this).data("src")
            })
        },
        focus: function() {
            this.instance.current && this.$list.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + this.instance.current.index + '"]').addClass("fancybox-thumbs-active").focus()
        },
        close: function() {
            this.$grid.hide()
        },
        update: function() {
            this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible),
            this.isVisible ? (this.$grid || this.create(),
            this.instance.trigger("onThumbsShow"),
            this.focus()) : this.$grid && this.instance.trigger("onThumbsHide"),
            this.instance.update()
        },
        hide: function() {
            this.isVisible = !1,
            this.update()
        },
        show: function() {
            this.isVisible = !0,
            this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible,
            this.update()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.Thumbs && (e.Thumbs = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.Thumbs;
            if (i && i.isActive) {
                if (n.modal)
                    return i.$button.hide(),
                    void i.hide();
                o && n.opts.thumbs.autoStart === !0 && i.show(),
                i.isVisible && i.focus()
            }
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(),
            a.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && e.opts.thumbs.hideOnClose !== !1 && n.close()
        }
    })
}(document, window.jQuery),
function(t, e, n) {
    "use strict";
    function o() {
        var t = e.location.hash.substr(1)
          , n = t.split("-")
          , o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1
          , i = n.join("-");
        return o < 1 && (o = 1),
        {
            hash: t,
            index: o,
            gallery: i
        }
    }
    function i(t) {
        var e;
        "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1),
        e.length || (e = n("#" + n.escapeSelector(t.gallery))),
        e.length && (s = !1,
        e.trigger("click")))
    }
    function a(t) {
        var e;
        return !!t && (e = t.current ? t.current.opts : t.opts,
        e.hash || (e.$orig ? e.$orig.data("fancybox") : ""))
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g
          , n = function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        };
        return (t + "").replace(e, n)
    }
    );
    var s = !0
      , r = null
      , c = null;
    n(function() {
        setTimeout(function() {
            n.fancybox.defaults.hash !== !1 && (n(t).on({
                "onInit.fb": function(t, e) {
                    var n, i;
                    e.group[e.currIndex].opts.hash !== !1 && (n = o(),
                    i = a(e),
                    i && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
                },
                "beforeShow.fb": function(n, o, i) {
                    var l;
                    i && i.opts.hash !== !1 && (l = a(o),
                    l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash),
                    r = l + (o.group.length > 1 ? "-" + (i.index + 1) : ""),
                    "replaceState"in e.history ? (c && clearTimeout(c),
                    c = setTimeout(function() {
                        e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r),
                        c = null,
                        s = !1
                    }, 300)) : e.location.hash = r))
                },
                "beforeClose.fb": function(o, i, s) {
                    var l, u;
                    c && clearTimeout(c),
                    s.opts.hash !== !1 && (l = a(i),
                    u = i && i.opts.origHash ? i.opts.origHash : "",
                    l && "" !== l && ("replaceState"in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u,
                    n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))),
                    r = null)
                }
            }),
            n(e).on("hashchange.fb", function() {
                var t = o();
                n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null,
                n.fancybox.close()) : "" !== t.gallery && i(t)
            }),
            i(o()))
        }, 50)
    })
}(document, window, window.jQuery);
/*! Counter */
(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this)
              , r = n
              , i = function() {
                var e = []
                  , n = r.time / r.delay
                  , i = t.text()
                  , s = /[0-9]+,[0-9]+/.test(i);
                i = i.replace(/,/g, "");
                var o = /^[0-9]+$/.test(i)
                  , u = /^[0-9]+\.[0-9]+$/.test(i)
                  , a = u ? (i.split(".")[1] || []).length : 0;
                for (var f = n; f >= 1; f--) {
                    var l = parseInt(i / n * f);
                    u && (l = parseFloat(i / n * f).toFixed(a));
                    if (s)
                        while (/(\d+)(\d{3})/.test(l.toString()))
                            l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    e.unshift(l)
                }
                t.data("counterup-nums", e);
                t.text("0");
                var c = function() {
                    t.text(t.data("counterup-nums").shift());
                    if (t.data("counterup-nums").length)
                        setTimeout(t.data("counterup-func"), r.delay);
                    else {
                        delete t.data("counterup-nums");
                        t.data("counterup-nums", null);
                        t.data("counterup-func", null)
                    }
                };
                t.data("counterup-func", c);
                setTimeout(t.data("counterup-func"), r.delay)
            };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
}
)(jQuery);
/*! Waypoints */
(function() {
    var t = [].indexOf || function(t) {
        for (var e = 0, n = this.length; e < n; e++) {
            if (e in this && this[e] === t)
                return e
        }
        return -1
    }
      , e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    }
    )(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        }
                        ;
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        }
                        ;
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            }
            ;
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            }
            ;
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            }
            ;
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            }
            ;
            t.prototype.disable = function() {
                return this.enabled = false
            }
            ;
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            }
            ;
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            }
            ;
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            }
            ;
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t,r,e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0],
            t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        }
        ;
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0],
            t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        }
        ;
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}
).call(this);
/*! Scroll Reveal Animations */
window.scrollReveal = function(t) {
    "use strict";
    function e(e) {
        this.docElem = t.document.documentElement,
        this.options = this.extend(this.defaults, e),
        this.styleBank = {},
        1 == this.options.init && this.init()
    }
    var i = 1
      , o = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(e) {
            t.setTimeout(e, 1e3 / 60)
        }
    }();
    return e.prototype = {
        defaults: {
            after: "0s",
            enter: "bottom",
            move: "24px",
            over: "0.66s",
            easing: "ease-in-out",
            opacity: 0,
            viewportFactor: .33,
            reset: !1,
            init: !0
        },
        init: function() {
            this.scrolled = !1;
            var e = this;
            this.elems = Array.prototype.slice.call(this.docElem.querySelectorAll("[data-scroll-reveal]")),
            this.elems.forEach(function(t, o) {
                var r = t.getAttribute("data-scroll-reveal-id");
                r || (r = i++,
                t.setAttribute("data-scroll-reveal-id", r)),
                e.styleBank[r] || (e.styleBank[r] = t.getAttribute("style")),
                e.update(t)
            });
            var r = function(t) {
                e.scrolled || (e.scrolled = !0,
                o(function() {
                    e._scrollPage()
                }))
            }
              , n = function() {
                function t() {
                    e._scrollPage(),
                    e.resizeTimeout = null
                }
                e.resizeTimeout && clearTimeout(e.resizeTimeout),
                e.resizeTimeout = setTimeout(t, 200)
            };
            t.addEventListener("scroll", r, !1),
            t.addEventListener("resize", n, !1)
        },
        _scrollPage: function() {
            var t = this;
            this.elems.forEach(function(e, i) {
                t.update(e)
            }),
            this.scrolled = !1
        },
        parseLanguage: function(t) {
            function e(t) {
                var e = []
                  , i = ["from", "the", "and", "then", "but", "with"];
                return t.forEach(function(t, o) {
                    i.indexOf(t) > -1 || e.push(t)
                }),
                e
            }
            var i = t.getAttribute("data-scroll-reveal").split(/[, ]+/)
              , o = {};
            return i = e(i),
            i.forEach(function(t, e) {
                switch (t) {
                case "enter":
                    return void (o.enter = i[e + 1]);
                case "after":
                    return void (o.after = i[e + 1]);
                case "wait":
                    return void (o.after = i[e + 1]);
                case "move":
                    return void (o.move = i[e + 1]);
                case "ease":
                    return o.move = i[e + 1],
                    void (o.ease = "ease");
                case "ease-in":
                    return o.move = i[e + 1],
                    void (o.easing = "ease-in");
                case "ease-in-out":
                    return o.move = i[e + 1],
                    void (o.easing = "ease-in-out");
                case "ease-out":
                    return o.move = i[e + 1],
                    void (o.easing = "ease-out");
                case "over":
                    return void (o.over = i[e + 1]);
                default:
                    return
                }
            }),
            o
        },
        update: function(t) {
            var e = this.genCSS(t)
              , i = this.styleBank[t.getAttribute("data-scroll-reveal-id")];
            return null != i ? i += ";" : i = "",
            t.getAttribute("data-scroll-reveal-initialized") || (t.setAttribute("style", i + e.initial),
            t.setAttribute("data-scroll-reveal-initialized", !0)),
            this.isElementInViewport(t, this.options.viewportFactor) ? t.getAttribute("data-scroll-reveal-complete") ? void 0 : this.isElementInViewport(t, this.options.viewportFactor) ? (t.setAttribute("style", i + e.target + e.transition),
            void (this.options.reset || setTimeout(function() {
                "" != i ? t.setAttribute("style", i) : t.removeAttribute("style"),
                t.setAttribute("data-scroll-reveal-complete", !0)
            }, e.totalDuration))) : void 0 : void (this.options.reset && t.setAttribute("style", i + e.initial + e.reset))
        },
        genCSS: function(t) {
            var e, i, o = this.parseLanguage(t);
            o.enter ? (("top" == o.enter || "bottom" == o.enter) && (e = o.enter,
            i = "y"),
            ("left" == o.enter || "right" == o.enter) && (e = o.enter,
            i = "x")) : (("top" == this.options.enter || "bottom" == this.options.enter) && (e = this.options.enter,
            i = "y"),
            ("left" == this.options.enter || "right" == this.options.enter) && (e = this.options.enter,
            i = "x")),
            ("top" == e || "left" == e) && (o.move ? o.move = "-" + o.move : o.move = "-" + this.options.move);
            var r = o.move || this.options.move
              , n = o.over || this.options.over
              , s = o.after || this.options.after
              , a = o.easing || this.options.easing
              , l = o.opacity || this.options.opacity
              , u = "-webkit-transition: -webkit-transform " + n + " " + a + " " + s + ",  opacity " + n + " " + a + " " + s + ";transition: transform " + n + " " + a + " " + s + ", opacity " + n + " " + a + " " + s + ";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;"
              , c = "-webkit-transition: -webkit-transform " + n + " " + a + " 0s,  opacity " + n + " " + a + " " + s + ";transition: transform " + n + " " + a + " 0s,  opacity " + n + " " + a + " " + s + ";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;"
              , f = "-webkit-transform: translate" + i + "(" + r + ");transform: translate" + i + "(" + r + ");opacity: " + l + ";"
              , p = "-webkit-transform: translate" + i + "(0);transform: translate" + i + "(0);opacity: 1;";
            return {
                transition: u,
                initial: f,
                target: p,
                reset: c,
                totalDuration: 1e3 * (parseFloat(n) + parseFloat(s))
            }
        },
        getViewportH: function() {
            var e = this.docElem.clientHeight
              , i = t.innerHeight;
            return i > e ? i : e
        },
        getOffset: function(t) {
            var e = 0
              , i = 0;
            do
                isNaN(t.offsetTop) || (e += t.offsetTop),
                isNaN(t.offsetLeft) || (i += t.offsetLeft);
            while (t = t.offsetParent);
            return {
                top: e,
                left: i
            }
        },
        isElementInViewport: function(e, i) {
            var o = t.pageYOffset
              , r = o + this.getViewportH()
              , n = e.offsetHeight
              , s = this.getOffset(e).top
              , a = s + n
              , i = i || 0;
            return r >= s + n * i && a >= o || "fixed" == (e.currentStyle ? e.currentStyle : t.getComputedStyle(e, null)).position
        },
        extend: function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }
    },
    e
}(window);
/*! Tooltip */
!function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(this, function(a) {
    function b(a) {
        this.$container,
        this.constraints = null,
        this.__$tooltip,
        this.__init(a)
    }
    function c(b, c) {
        var d = !0;
        return a.each(b, function(a, e) {
            return void 0 === c[a] || b[a] !== c[a] ? (d = !1,
            !1) : void 0
        }),
        d
    }
    function d(b) {
        var c = b.attr("id")
          , d = c ? h.window.document.getElementById(c) : null;
        return d ? d === b[0] : a.contains(h.window.document.body, b[0])
    }
    function e() {
        if (!g)
            return !1;
        var a = g.document.body || g.document.documentElement
          , b = a.style
          , c = "transition"
          , d = ["Moz", "Webkit", "Khtml", "O", "ms"];
        if ("string" == typeof b[c])
            return !0;
        c = c.charAt(0).toUpperCase() + c.substr(1);
        for (var e = 0; e < d.length; e++)
            if ("string" == typeof b[d[e] + c])
                return !0;
        return !1
    }
    var f = {
        animation: "fade",
        animationDuration: 350,
        content: null,
        contentAsHTML: !1,
        contentCloning: !1,
        debug: !0,
        delay: 300,
        delayTouch: [300, 500],
        functionInit: null,
        functionBefore: null,
        functionReady: null,
        functionAfter: null,
        functionFormat: null,
        IEmin: 6,
        interactive: !1,
        multiple: !1,
        parent: null,
        plugins: ["sideTip"],
        repositionOnScroll: !1,
        restoration: "none",
        selfDestruction: !0,
        theme: [],
        timer: 0,
        trackerInterval: 500,
        trackOrigin: !1,
        trackTooltip: !1,
        trigger: "hover",
        triggerClose: {
            click: !1,
            mouseleave: !1,
            originClick: !1,
            scroll: !1,
            tap: !1,
            touchleave: !1
        },
        triggerOpen: {
            click: !1,
            mouseenter: !1,
            tap: !1,
            touchstart: !1
        },
        updateAnimation: "rotate",
        zIndex: 9999999
    }
      , g = "undefined" != typeof window ? window : null
      , h = {
        hasTouchCapability: !(!g || !("ontouchstart"in g || g.DocumentTouch && g.document instanceof g.DocumentTouch || g.navigator.maxTouchPoints)),
        hasTransitions: e(),
        IE: !1,
        semVer: "4.2.7",
        window: g
    }
      , i = function() {
        this.__$emitterPrivate = a({}),
        this.__$emitterPublic = a({}),
        this.__instancesLatestArr = [],
        this.__plugins = {},
        this._env = h
    };
    i.prototype = {
        __bridge: function(b, c, d) {
            if (!c[d]) {
                var e = function() {};
                e.prototype = b;
                var g = new e;
                g.__init && g.__init(c),
                a.each(b, function(a, b) {
                    0 != a.indexOf("__") && (c[a] ? f.debug && console.log("The " + a + " method of the " + d + " plugin conflicts with another plugin or native methods") : (c[a] = function() {
                        return g[a].apply(g, Array.prototype.slice.apply(arguments))
                    }
                    ,
                    c[a].bridged = g))
                }),
                c[d] = g
            }
            return this
        },
        __setWindow: function(a) {
            return h.window = a,
            this
        },
        _getRuler: function(a) {
            return new b(a)
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _plugin: function(b) {
            var c = this;
            if ("string" == typeof b) {
                var d = b
                  , e = null;
                return d.indexOf(".") > 0 ? e = c.__plugins[d] : a.each(c.__plugins, function(a, b) {
                    return b.name.substring(b.name.length - d.length - 1) == "." + d ? (e = b,
                    !1) : void 0
                }),
                e
            }
            if (b.name.indexOf(".") < 0)
                throw new Error("Plugins must be namespaced");
            return c.__plugins[b.name] = b,
            b.core && c.__bridge(b.core, c, b.name),
            this
        },
        _trigger: function() {
            var a = Array.prototype.slice.apply(arguments);
            return "string" == typeof a[0] && (a[0] = {
                type: a[0]
            }),
            this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, a),
            this.__$emitterPublic.trigger.apply(this.__$emitterPublic, a),
            this
        },
        instances: function(b) {
            var c = []
              , d = b || ".tooltipstered";
            return a(d).each(function() {
                var b = a(this)
                  , d = b.data("tooltipster-ns");
                d && a.each(d, function(a, d) {
                    c.push(b.data(d))
                })
            }),
            c
        },
        instancesLatest: function() {
            return this.__instancesLatestArr
        },
        off: function() {
            return this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        on: function() {
            return this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        one: function() {
            return this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        origins: function(b) {
            var c = b ? b + " " : "";
            return a(c + ".tooltipstered").toArray()
        },
        setDefaults: function(b) {
            return a.extend(f, b),
            this
        },
        triggerHandler: function() {
            return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        }
    },
    a.tooltipster = new i,
    a.Tooltipster = function(b, c) {
        this.__callbacks = {
            close: [],
            open: []
        },
        this.__closingTime,
        this.__Content,
        this.__contentBcr,
        this.__destroyed = !1,
        this.__$emitterPrivate = a({}),
        this.__$emitterPublic = a({}),
        this.__enabled = !0,
        this.__garbageCollector,
        this.__Geometry,
        this.__lastPosition,
        this.__namespace = "tooltipster-" + Math.round(1e6 * Math.random()),
        this.__options,
        this.__$originParents,
        this.__pointerIsOverOrigin = !1,
        this.__previousThemes = [],
        this.__state = "closed",
        this.__timeouts = {
            close: [],
            open: null
        },
        this.__touchEvents = [],
        this.__tracker = null,
        this._$origin,
        this._$tooltip,
        this.__init(b, c)
    }
    ,
    a.Tooltipster.prototype = {
        __init: function(b, c) {
            var d = this;
            if (d._$origin = a(b),
            d.__options = a.extend(!0, {}, f, c),
            d.__optionsFormat(),
            !h.IE || h.IE >= d.__options.IEmin) {
                var e = null;
                if (void 0 === d._$origin.data("tooltipster-initialTitle") && (e = d._$origin.attr("title"),
                void 0 === e && (e = null),
                d._$origin.data("tooltipster-initialTitle", e)),
                null !== d.__options.content)
                    d.__contentSet(d.__options.content);
                else {
                    var g, i = d._$origin.attr("data-tooltip-content");
                    i && (g = a(i)),
                    g && g[0] ? d.__contentSet(g.first()) : d.__contentSet(e)
                }
                d._$origin.removeAttr("title").addClass("tooltipstered"),
                d.__prepareOrigin(),
                d.__prepareGC(),
                a.each(d.__options.plugins, function(a, b) {
                    d._plug(b)
                }),
                h.hasTouchCapability && a(h.window.document.body).on("touchmove." + d.__namespace + "-triggerOpen", function(a) {
                    d._touchRecordEvent(a)
                }),
                d._on("created", function() {
                    d.__prepareTooltip()
                })._on("repositioned", function(a) {
                    d.__lastPosition = a.position
                })
            } else
                d.__options.disabled = !0
        },
        __contentInsert: function() {
            var a = this
              , b = a._$tooltip.find(".tooltipster-content")
              , c = a.__Content
              , d = function(a) {
                c = a
            };
            return a._trigger({
                type: "format",
                content: a.__Content,
                format: d
            }),
            a.__options.functionFormat && (c = a.__options.functionFormat.call(a, a, {
                origin: a._$origin[0]
            }, a.__Content)),
            "string" != typeof c || a.__options.contentAsHTML ? b.empty().append(c) : b.text(c),
            a
        },
        __contentSet: function(b) {
            return b instanceof a && this.__options.contentCloning && (b = b.clone(!0)),
            this.__Content = b,
            this._trigger({
                type: "updated",
                content: b
            }),
            this
        },
        __destroyError: function() {
            throw new Error("This tooltip has been destroyed and cannot execute your method call.")
        },
        __geometry: function() {
            var b = this
              , c = b._$origin
              , d = b._$origin.is("area");
            if (d) {
                var e = b._$origin.parent().attr("name");
                c = a('img[usemap="#' + e + '"]')
            }
            var f = c[0].getBoundingClientRect()
              , g = a(h.window.document)
              , i = a(h.window)
              , j = c
              , k = {
                available: {
                    document: null,
                    window: null
                },
                document: {
                    size: {
                        height: g.height(),
                        width: g.width()
                    }
                },
                window: {
                    scroll: {
                        left: h.window.scrollX || h.window.document.documentElement.scrollLeft,
                        top: h.window.scrollY || h.window.document.documentElement.scrollTop
                    },
                    size: {
                        height: i.height(),
                        width: i.width()
                    }
                },
                origin: {
                    fixedLineage: !1,
                    offset: {},
                    size: {
                        height: f.bottom - f.top,
                        width: f.right - f.left
                    },
                    usemapImage: d ? c[0] : null,
                    windowOffset: {
                        bottom: f.bottom,
                        left: f.left,
                        right: f.right,
                        top: f.top
                    }
                }
            };
            if (d) {
                var l = b._$origin.attr("shape")
                  , m = b._$origin.attr("coords");
                if (m && (m = m.split(","),
                a.map(m, function(a, b) {
                    m[b] = parseInt(a)
                })),
                "default" != l)
                    switch (l) {
                    case "circle":
                        var n = m[0]
                          , o = m[1]
                          , p = m[2]
                          , q = o - p
                          , r = n - p;
                        k.origin.size.height = 2 * p,
                        k.origin.size.width = k.origin.size.height,
                        k.origin.windowOffset.left += r,
                        k.origin.windowOffset.top += q;
                        break;
                    case "rect":
                        var s = m[0]
                          , t = m[1]
                          , u = m[2]
                          , v = m[3];
                        k.origin.size.height = v - t,
                        k.origin.size.width = u - s,
                        k.origin.windowOffset.left += s,
                        k.origin.windowOffset.top += t;
                        break;
                    case "poly":
                        for (var w = 0, x = 0, y = 0, z = 0, A = "even", B = 0; B < m.length; B++) {
                            var C = m[B];
                            "even" == A ? (C > y && (y = C,
                            0 === B && (w = y)),
                            w > C && (w = C),
                            A = "odd") : (C > z && (z = C,
                            1 == B && (x = z)),
                            x > C && (x = C),
                            A = "even")
                        }
                        k.origin.size.height = z - x,
                        k.origin.size.width = y - w,
                        k.origin.windowOffset.left += w,
                        k.origin.windowOffset.top += x
                    }
            }
            var D = function(a) {
                k.origin.size.height = a.height,
                k.origin.windowOffset.left = a.left,
                k.origin.windowOffset.top = a.top,
                k.origin.size.width = a.width
            };
            for (b._trigger({
                type: "geometry",
                edit: D,
                geometry: {
                    height: k.origin.size.height,
                    left: k.origin.windowOffset.left,
                    top: k.origin.windowOffset.top,
                    width: k.origin.size.width
                }
            }),
            k.origin.windowOffset.right = k.origin.windowOffset.left + k.origin.size.width,
            k.origin.windowOffset.bottom = k.origin.windowOffset.top + k.origin.size.height,
            k.origin.offset.left = k.origin.windowOffset.left + k.window.scroll.left,
            k.origin.offset.top = k.origin.windowOffset.top + k.window.scroll.top,
            k.origin.offset.bottom = k.origin.offset.top + k.origin.size.height,
            k.origin.offset.right = k.origin.offset.left + k.origin.size.width,
            k.available.document = {
                bottom: {
                    height: k.document.size.height - k.origin.offset.bottom,
                    width: k.document.size.width
                },
                left: {
                    height: k.document.size.height,
                    width: k.origin.offset.left
                },
                right: {
                    height: k.document.size.height,
                    width: k.document.size.width - k.origin.offset.right
                },
                top: {
                    height: k.origin.offset.top,
                    width: k.document.size.width
                }
            },
            k.available.window = {
                bottom: {
                    height: Math.max(k.window.size.height - Math.max(k.origin.windowOffset.bottom, 0), 0),
                    width: k.window.size.width
                },
                left: {
                    height: k.window.size.height,
                    width: Math.max(k.origin.windowOffset.left, 0)
                },
                right: {
                    height: k.window.size.height,
                    width: Math.max(k.window.size.width - Math.max(k.origin.windowOffset.right, 0), 0)
                },
                top: {
                    height: Math.max(k.origin.windowOffset.top, 0),
                    width: k.window.size.width
                }
            }; "html" != j[0].tagName.toLowerCase(); ) {
                if ("fixed" == j.css("position")) {
                    k.origin.fixedLineage = !0;
                    break
                }
                j = j.parent()
            }
            return k
        },
        __optionsFormat: function() {
            return "number" == typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]),
            "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]),
            "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]),
            "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]),
            null === this.__options.parent ? this.__options.parent = a(h.window.document.body) : "string" == typeof this.__options.parent && (this.__options.parent = a(this.__options.parent)),
            "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
                mouseenter: !0,
                touchstart: !0
            },
            this.__options.triggerClose = {
                mouseleave: !0,
                originClick: !0,
                touchleave: !0
            }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
                click: !0,
                tap: !0
            },
            this.__options.triggerClose = {
                click: !0,
                tap: !0
            }),
            this._trigger("options"),
            this
        },
        __prepareGC: function() {
            var b = this;
            return b.__options.selfDestruction ? b.__garbageCollector = setInterval(function() {
                var c = (new Date).getTime();
                b.__touchEvents = a.grep(b.__touchEvents, function(a, b) {
                    return c - a.time > 6e4
                }),
                d(b._$origin) || b.close(function() {
                    b.destroy()
                })
            }, 2e4) : clearInterval(b.__garbageCollector),
            b
        },
        __prepareOrigin: function() {
            var a = this;
            if (a._$origin.off("." + a.__namespace + "-triggerOpen"),
            h.hasTouchCapability && a._$origin.on("touchstart." + a.__namespace + "-triggerOpen touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen", function(b) {
                a._touchRecordEvent(b)
            }),
            a.__options.triggerOpen.click || a.__options.triggerOpen.tap && h.hasTouchCapability) {
                var b = "";
                a.__options.triggerOpen.click && (b += "click." + a.__namespace + "-triggerOpen "),
                a.__options.triggerOpen.tap && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen"),
                a._$origin.on(b, function(b) {
                    a._touchIsMeaningfulEvent(b) && a._open(b)
                })
            }
            if (a.__options.triggerOpen.mouseenter || a.__options.triggerOpen.touchstart && h.hasTouchCapability) {
                var b = "";
                a.__options.triggerOpen.mouseenter && (b += "mouseenter." + a.__namespace + "-triggerOpen "),
                a.__options.triggerOpen.touchstart && h.hasTouchCapability && (b += "touchstart." + a.__namespace + "-triggerOpen"),
                a._$origin.on(b, function(b) {
                    !a._touchIsTouchEvent(b) && a._touchIsEmulatedEvent(b) || (a.__pointerIsOverOrigin = !0,
                    a._openShortly(b))
                })
            }
            if (a.__options.triggerClose.mouseleave || a.__options.triggerClose.touchleave && h.hasTouchCapability) {
                var b = "";
                a.__options.triggerClose.mouseleave && (b += "mouseleave." + a.__namespace + "-triggerOpen "),
                a.__options.triggerClose.touchleave && h.hasTouchCapability && (b += "touchend." + a.__namespace + "-triggerOpen touchcancel." + a.__namespace + "-triggerOpen"),
                a._$origin.on(b, function(b) {
                    a._touchIsMeaningfulEvent(b) && (a.__pointerIsOverOrigin = !1)
                })
            }
            return a
        },
        __prepareTooltip: function() {
            var b = this
              , c = b.__options.interactive ? "auto" : "";
            return b._$tooltip.attr("id", b.__namespace).css({
                "pointer-events": c,
                zIndex: b.__options.zIndex
            }),
            a.each(b.__previousThemes, function(a, c) {
                b._$tooltip.removeClass(c)
            }),
            a.each(b.__options.theme, function(a, c) {
                b._$tooltip.addClass(c)
            }),
            b.__previousThemes = a.merge([], b.__options.theme),
            b
        },
        __scrollHandler: function(b) {
            var c = this;
            if (c.__options.triggerClose.scroll)
                c._close(b);
            else if (d(c._$origin) && d(c._$tooltip)) {
                var e = null;
                if (b.target === h.window.document)
                    c.__Geometry.origin.fixedLineage || c.__options.repositionOnScroll && c.reposition(b);
                else {
                    e = c.__geometry();
                    var f = !1;
                    if ("fixed" != c._$origin.css("position") && c.__$originParents.each(function(b, c) {
                        var d = a(c)
                          , g = d.css("overflow-x")
                          , h = d.css("overflow-y");
                        if ("visible" != g || "visible" != h) {
                            var i = c.getBoundingClientRect();
                            if ("visible" != g && (e.origin.windowOffset.left < i.left || e.origin.windowOffset.right > i.right))
                                return f = !0,
                                !1;
                            if ("visible" != h && (e.origin.windowOffset.top < i.top || e.origin.windowOffset.bottom > i.bottom))
                                return f = !0,
                                !1
                        }
                        return "fixed" == d.css("position") ? !1 : void 0
                    }),
                    f)
                        c._$tooltip.css("visibility", "hidden");
                    else if (c._$tooltip.css("visibility", "visible"),
                    c.__options.repositionOnScroll)
                        c.reposition(b);
                    else {
                        var g = e.origin.offset.left - c.__Geometry.origin.offset.left
                          , i = e.origin.offset.top - c.__Geometry.origin.offset.top;
                        c._$tooltip.css({
                            left: c.__lastPosition.coord.left + g,
                            top: c.__lastPosition.coord.top + i
                        })
                    }
                }
                c._trigger({
                    type: "scroll",
                    event: b,
                    geo: e
                })
            }
            return c
        },
        __stateSet: function(a) {
            return this.__state = a,
            this._trigger({
                type: "state",
                state: a
            }),
            this
        },
        __timeoutsClear: function() {
            return clearTimeout(this.__timeouts.open),
            this.__timeouts.open = null,
            a.each(this.__timeouts.close, function(a, b) {
                clearTimeout(b)
            }),
            this.__timeouts.close = [],
            this
        },
        __trackerStart: function() {
            var a = this
              , b = a._$tooltip.find(".tooltipster-content");
            return a.__options.trackTooltip && (a.__contentBcr = b[0].getBoundingClientRect()),
            a.__tracker = setInterval(function() {
                if (d(a._$origin) && d(a._$tooltip)) {
                    if (a.__options.trackOrigin) {
                        var e = a.__geometry()
                          , f = !1;
                        c(e.origin.size, a.__Geometry.origin.size) && (a.__Geometry.origin.fixedLineage ? c(e.origin.windowOffset, a.__Geometry.origin.windowOffset) && (f = !0) : c(e.origin.offset, a.__Geometry.origin.offset) && (f = !0)),
                        f || (a.__options.triggerClose.mouseleave ? a._close() : a.reposition())
                    }
                    if (a.__options.trackTooltip) {
                        var g = b[0].getBoundingClientRect();
                        g.height === a.__contentBcr.height && g.width === a.__contentBcr.width || (a.reposition(),
                        a.__contentBcr = g)
                    }
                } else
                    a._close()
            }, a.__options.trackerInterval),
            a
        },
        _close: function(b, c, d) {
            var e = this
              , f = !0;
            if (e._trigger({
                type: "close",
                event: b,
                stop: function() {
                    f = !1
                }
            }),
            f || d) {
                c && e.__callbacks.close.push(c),
                e.__callbacks.open = [],
                e.__timeoutsClear();
                var g = function() {
                    a.each(e.__callbacks.close, function(a, c) {
                        c.call(e, e, {
                            event: b,
                            origin: e._$origin[0]
                        })
                    }),
                    e.__callbacks.close = []
                };
                if ("closed" != e.__state) {
                    var i = !0
                      , j = new Date
                      , k = j.getTime()
                      , l = k + e.__options.animationDuration[1];
                    if ("disappearing" == e.__state && l > e.__closingTime && e.__options.animationDuration[1] > 0 && (i = !1),
                    i) {
                        e.__closingTime = l,
                        "disappearing" != e.__state && e.__stateSet("disappearing");
                        var m = function() {
                            clearInterval(e.__tracker),
                            e._trigger({
                                type: "closing",
                                event: b
                            }),
                            e._$tooltip.off("." + e.__namespace + "-triggerClose").removeClass("tooltipster-dying"),
                            a(h.window).off("." + e.__namespace + "-triggerClose"),
                            e.__$originParents.each(function(b, c) {
                                a(c).off("scroll." + e.__namespace + "-triggerClose")
                            }),
                            e.__$originParents = null,
                            a(h.window.document.body).off("." + e.__namespace + "-triggerClose"),
                            e._$origin.off("." + e.__namespace + "-triggerClose"),
                            e._off("dismissable"),
                            e.__stateSet("closed"),
                            e._trigger({
                                type: "after",
                                event: b
                            }),
                            e.__options.functionAfter && e.__options.functionAfter.call(e, e, {
                                event: b,
                                origin: e._$origin[0]
                            }),
                            g()
                        };
                        h.hasTransitions ? (e._$tooltip.css({
                            "-moz-animation-duration": e.__options.animationDuration[1] + "ms",
                            "-ms-animation-duration": e.__options.animationDuration[1] + "ms",
                            "-o-animation-duration": e.__options.animationDuration[1] + "ms",
                            "-webkit-animation-duration": e.__options.animationDuration[1] + "ms",
                            "animation-duration": e.__options.animationDuration[1] + "ms",
                            "transition-duration": e.__options.animationDuration[1] + "ms"
                        }),
                        e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"),
                        e.__options.animationDuration[1] > 0 && e._$tooltip.delay(e.__options.animationDuration[1]),
                        e._$tooltip.queue(m)) : e._$tooltip.stop().fadeOut(e.__options.animationDuration[1], m)
                    }
                } else
                    g()
            }
            return e
        },
        _off: function() {
            return this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _on: function() {
            return this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _one: function() {
            return this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments)),
            this
        },
        _open: function(b, c) {
            var e = this;
            if (!e.__destroying && d(e._$origin) && e.__enabled) {
                var f = !0;
                if ("closed" == e.__state && (e._trigger({
                    type: "before",
                    event: b,
                    stop: function() {
                        f = !1
                    }
                }),
                f && e.__options.functionBefore && (f = e.__options.functionBefore.call(e, e, {
                    event: b,
                    origin: e._$origin[0]
                }))),
                f !== !1 && null !== e.__Content) {
                    c && e.__callbacks.open.push(c),
                    e.__callbacks.close = [],
                    e.__timeoutsClear();
                    var g, i = function() {
                        "stable" != e.__state && e.__stateSet("stable"),
                        a.each(e.__callbacks.open, function(a, b) {
                            b.call(e, e, {
                                origin: e._$origin[0],
                                tooltip: e._$tooltip[0]
                            })
                        }),
                        e.__callbacks.open = []
                    };
                    if ("closed" !== e.__state)
                        g = 0,
                        "disappearing" === e.__state ? (e.__stateSet("appearing"),
                        h.hasTransitions ? (e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"),
                        e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]),
                        e._$tooltip.queue(i)) : e._$tooltip.stop().fadeIn(i)) : "stable" == e.__state && i();
                    else {
                        if (e.__stateSet("appearing"),
                        g = e.__options.animationDuration[0],
                        e.__contentInsert(),
                        e.reposition(b, !0),
                        h.hasTransitions ? (e._$tooltip.addClass("tooltipster-" + e.__options.animation).addClass("tooltipster-initial").css({
                            "-moz-animation-duration": e.__options.animationDuration[0] + "ms",
                            "-ms-animation-duration": e.__options.animationDuration[0] + "ms",
                            "-o-animation-duration": e.__options.animationDuration[0] + "ms",
                            "-webkit-animation-duration": e.__options.animationDuration[0] + "ms",
                            "animation-duration": e.__options.animationDuration[0] + "ms",
                            "transition-duration": e.__options.animationDuration[0] + "ms"
                        }),
                        setTimeout(function() {
                            "closed" != e.__state && (e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"),
                            e.__options.animationDuration[0] > 0 && e._$tooltip.delay(e.__options.animationDuration[0]),
                            e._$tooltip.queue(i))
                        }, 0)) : e._$tooltip.css("display", "none").fadeIn(e.__options.animationDuration[0], i),
                        e.__trackerStart(),
                        a(h.window).on("resize." + e.__namespace + "-triggerClose", function(b) {
                            var c = a(document.activeElement);
                            (c.is("input") || c.is("textarea")) && a.contains(e._$tooltip[0], c[0]) || e.reposition(b)
                        }).on("scroll." + e.__namespace + "-triggerClose", function(a) {
                            e.__scrollHandler(a)
                        }),
                        e.__$originParents = e._$origin.parents(),
                        e.__$originParents.each(function(b, c) {
                            a(c).on("scroll." + e.__namespace + "-triggerClose", function(a) {
                                e.__scrollHandler(a)
                            })
                        }),
                        e.__options.triggerClose.mouseleave || e.__options.triggerClose.touchleave && h.hasTouchCapability) {
                            e._on("dismissable", function(a) {
                                a.dismissable ? a.delay ? (m = setTimeout(function() {
                                    e._close(a.event)
                                }, a.delay),
                                e.__timeouts.close.push(m)) : e._close(a) : clearTimeout(m)
                            });
                            var j = e._$origin
                              , k = ""
                              , l = ""
                              , m = null;
                            e.__options.interactive && (j = j.add(e._$tooltip)),
                            e.__options.triggerClose.mouseleave && (k += "mouseenter." + e.__namespace + "-triggerClose ",
                            l += "mouseleave." + e.__namespace + "-triggerClose "),
                            e.__options.triggerClose.touchleave && h.hasTouchCapability && (k += "touchstart." + e.__namespace + "-triggerClose",
                            l += "touchend." + e.__namespace + "-triggerClose touchcancel." + e.__namespace + "-triggerClose"),
                            j.on(l, function(a) {
                                if (e._touchIsTouchEvent(a) || !e._touchIsEmulatedEvent(a)) {
                                    var b = "mouseleave" == a.type ? e.__options.delay : e.__options.delayTouch;
                                    e._trigger({
                                        delay: b[1],
                                        dismissable: !0,
                                        event: a,
                                        type: "dismissable"
                                    })
                                }
                            }).on(k, function(a) {
                                !e._touchIsTouchEvent(a) && e._touchIsEmulatedEvent(a) || e._trigger({
                                    dismissable: !1,
                                    event: a,
                                    type: "dismissable"
                                })
                            })
                        }
                        e.__options.triggerClose.originClick && e._$origin.on("click." + e.__namespace + "-triggerClose", function(a) {
                            e._touchIsTouchEvent(a) || e._touchIsEmulatedEvent(a) || e._close(a)
                        }),
                        (e.__options.triggerClose.click || e.__options.triggerClose.tap && h.hasTouchCapability) && setTimeout(function() {
                            if ("closed" != e.__state) {
                                var b = ""
                                  , c = a(h.window.document.body);
                                e.__options.triggerClose.click && (b += "click." + e.__namespace + "-triggerClose "),
                                e.__options.triggerClose.tap && h.hasTouchCapability && (b += "touchend." + e.__namespace + "-triggerClose"),
                                c.on(b, function(b) {
                                    e._touchIsMeaningfulEvent(b) && (e._touchRecordEvent(b),
                                    e.__options.interactive && a.contains(e._$tooltip[0], b.target) || e._close(b))
                                }),
                                e.__options.triggerClose.tap && h.hasTouchCapability && c.on("touchstart." + e.__namespace + "-triggerClose", function(a) {
                                    e._touchRecordEvent(a)
                                })
                            }
                        }, 0),
                        e._trigger("ready"),
                        e.__options.functionReady && e.__options.functionReady.call(e, e, {
                            origin: e._$origin[0],
                            tooltip: e._$tooltip[0]
                        })
                    }
                    if (e.__options.timer > 0) {
                        var m = setTimeout(function() {
                            e._close()
                        }, e.__options.timer + g);
                        e.__timeouts.close.push(m)
                    }
                }
            }
            return e
        },
        _openShortly: function(a) {
            var b = this
              , c = !0;
            if ("stable" != b.__state && "appearing" != b.__state && !b.__timeouts.open && (b._trigger({
                type: "start",
                event: a,
                stop: function() {
                    c = !1
                }
            }),
            c)) {
                var d = 0 == a.type.indexOf("touch") ? b.__options.delayTouch : b.__options.delay;
                d[0] ? b.__timeouts.open = setTimeout(function() {
                    b.__timeouts.open = null,
                    b.__pointerIsOverOrigin && b._touchIsMeaningfulEvent(a) ? (b._trigger("startend"),
                    b._open(a)) : b._trigger("startcancel")
                }, d[0]) : (b._trigger("startend"),
                b._open(a))
            }
            return b
        },
        _optionsExtract: function(b, c) {
            var d = this
              , e = a.extend(!0, {}, c)
              , f = d.__options[b];
            return f || (f = {},
            a.each(c, function(a, b) {
                var c = d.__options[a];
                void 0 !== c && (f[a] = c)
            })),
            a.each(e, function(b, c) {
                void 0 !== f[b] && ("object" != typeof c || c instanceof Array || null == c || "object" != typeof f[b] || f[b]instanceof Array || null == f[b] ? e[b] = f[b] : a.extend(e[b], f[b]))
            }),
            e
        },
        _plug: function(b) {
            var c = a.tooltipster._plugin(b);
            if (!c)
                throw new Error('The "' + b + '" plugin is not defined');
            return c.instance && a.tooltipster.__bridge(c.instance, this, c.name),
            this
        },
        _touchIsEmulatedEvent: function(a) {
            for (var b = !1, c = (new Date).getTime(), d = this.__touchEvents.length - 1; d >= 0; d--) {
                var e = this.__touchEvents[d];
                if (!(c - e.time < 500))
                    break;
                e.target === a.target && (b = !0)
            }
            return b
        },
        _touchIsMeaningfulEvent: function(a) {
            return this._touchIsTouchEvent(a) && !this._touchSwiped(a.target) || !this._touchIsTouchEvent(a) && !this._touchIsEmulatedEvent(a)
        },
        _touchIsTouchEvent: function(a) {
            return 0 == a.type.indexOf("touch")
        },
        _touchRecordEvent: function(a) {
            return this._touchIsTouchEvent(a) && (a.time = (new Date).getTime(),
            this.__touchEvents.push(a)),
            this
        },
        _touchSwiped: function(a) {
            for (var b = !1, c = this.__touchEvents.length - 1; c >= 0; c--) {
                var d = this.__touchEvents[c];
                if ("touchmove" == d.type) {
                    b = !0;
                    break
                }
                if ("touchstart" == d.type && a === d.target)
                    break
            }
            return b
        },
        _trigger: function() {
            var b = Array.prototype.slice.apply(arguments);
            return "string" == typeof b[0] && (b[0] = {
                type: b[0]
            }),
            b[0].instance = this,
            b[0].origin = this._$origin ? this._$origin[0] : null,
            b[0].tooltip = this._$tooltip ? this._$tooltip[0] : null,
            this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, b),
            a.tooltipster._trigger.apply(a.tooltipster, b),
            this.__$emitterPublic.trigger.apply(this.__$emitterPublic, b),
            this
        },
        _unplug: function(b) {
            var c = this;
            if (c[b]) {
                var d = a.tooltipster._plugin(b);
                d.instance && a.each(d.instance, function(a, d) {
                    c[a] && c[a].bridged === c[b] && delete c[a]
                }),
                c[b].__destroy && c[b].__destroy(),
                delete c[b]
            }
            return c
        },
        close: function(a) {
            return this.__destroyed ? this.__destroyError() : this._close(null, a),
            this
        },
        content: function(a) {
            var b = this;
            if (void 0 === a)
                return b.__Content;
            if (b.__destroyed)
                b.__destroyError();
            else if (b.__contentSet(a),
            null !== b.__Content) {
                if ("closed" !== b.__state && (b.__contentInsert(),
                b.reposition(),
                b.__options.updateAnimation))
                    if (h.hasTransitions) {
                        var c = b.__options.updateAnimation;
                        b._$tooltip.addClass("tooltipster-update-" + c),
                        setTimeout(function() {
                            "closed" != b.__state && b._$tooltip.removeClass("tooltipster-update-" + c)
                        }, 1e3)
                    } else
                        b._$tooltip.fadeTo(200, .5, function() {
                            "closed" != b.__state && b._$tooltip.fadeTo(200, 1)
                        })
            } else
                b._close();
            return b
        },
        destroy: function() {
            var b = this;
            if (b.__destroyed)
                b.__destroyError();
            else {
                "closed" != b.__state ? b.option("animationDuration", 0)._close(null, null, !0) : b.__timeoutsClear(),
                b._trigger("destroy"),
                b.__destroyed = !0,
                b._$origin.removeData(b.__namespace).off("." + b.__namespace + "-triggerOpen"),
                a(h.window.document.body).off("." + b.__namespace + "-triggerOpen");
                var c = b._$origin.data("tooltipster-ns");
                if (c)
                    if (1 === c.length) {
                        var d = null;
                        "previous" == b.__options.restoration ? d = b._$origin.data("tooltipster-initialTitle") : "current" == b.__options.restoration && (d = "string" == typeof b.__Content ? b.__Content : a("<div></div>").append(b.__Content).html()),
                        d && b._$origin.attr("title", d),
                        b._$origin.removeClass("tooltipstered"),
                        b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
                    } else
                        c = a.grep(c, function(a, c) {
                            return a !== b.__namespace
                        }),
                        b._$origin.data("tooltipster-ns", c);
                b._trigger("destroyed"),
                b._off(),
                b.off(),
                b.__Content = null,
                b.__$emitterPrivate = null,
                b.__$emitterPublic = null,
                b.__options.parent = null,
                b._$origin = null,
                b._$tooltip = null,
                a.tooltipster.__instancesLatestArr = a.grep(a.tooltipster.__instancesLatestArr, function(a, c) {
                    return b !== a
                }),
                clearInterval(b.__garbageCollector)
            }
            return b
        },
        disable: function() {
            return this.__destroyed ? (this.__destroyError(),
            this) : (this._close(),
            this.__enabled = !1,
            this)
        },
        elementOrigin: function() {
            return this.__destroyed ? void this.__destroyError() : this._$origin[0]
        },
        elementTooltip: function() {
            return this._$tooltip ? this._$tooltip[0] : null
        },
        enable: function() {
            return this.__enabled = !0,
            this
        },
        hide: function(a) {
            return this.close(a)
        },
        instance: function() {
            return this
        },
        off: function() {
            return this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        on: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        one: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        },
        open: function(a) {
            return this.__destroyed ? this.__destroyError() : this._open(null, a),
            this
        },
        option: function(b, c) {
            return void 0 === c ? this.__options[b] : (this.__destroyed ? this.__destroyError() : (this.__options[b] = c,
            this.__optionsFormat(),
            a.inArray(b, ["trigger", "triggerClose", "triggerOpen"]) >= 0 && this.__prepareOrigin(),
            "selfDestruction" === b && this.__prepareGC()),
            this)
        },
        reposition: function(a, b) {
            var c = this;
            return c.__destroyed ? c.__destroyError() : "closed" != c.__state && d(c._$origin) && (b || d(c._$tooltip)) && (b || c._$tooltip.detach(),
            c.__Geometry = c.__geometry(),
            c._trigger({
                type: "reposition",
                event: a,
                helper: {
                    geo: c.__Geometry
                }
            })),
            c
        },
        show: function(a) {
            return this.open(a)
        },
        status: function() {
            return {
                destroyed: this.__destroyed,
                enabled: this.__enabled,
                open: "closed" !== this.__state,
                state: this.__state
            }
        },
        triggerHandler: function() {
            return this.__destroyed ? this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments)),
            this
        }
    },
    a.fn.tooltipster = function() {
        var b = Array.prototype.slice.apply(arguments)
          , c = "You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";
        if (0 === this.length)
            return this;
        if ("string" == typeof b[0]) {
            var d = "#*$~&";
            return this.each(function() {
                var e = a(this).data("tooltipster-ns")
                  , f = e ? a(this).data(e[0]) : null;
                if (!f)
                    throw new Error("You called Tooltipster's \"" + b[0] + '" method on an uninitialized element');
                if ("function" != typeof f[b[0]])
                    throw new Error('Unknown method "' + b[0] + '"');
                this.length > 1 && "content" == b[0] && (b[1]instanceof a || "object" == typeof b[1] && null != b[1] && b[1].tagName) && !f.__options.contentCloning && f.__options.debug && console.log(c);
                var g = f[b[0]](b[1], b[2]);
                return g !== f || "instance" === b[0] ? (d = g,
                !1) : void 0
            }),
            "#*$~&" !== d ? d : this
        }
        a.tooltipster.__instancesLatestArr = [];
        var e = b[0] && void 0 !== b[0].multiple
          , g = e && b[0].multiple || !e && f.multiple
          , h = b[0] && void 0 !== b[0].content
          , i = h && b[0].content || !h && f.content
          , j = b[0] && void 0 !== b[0].contentCloning
          , k = j && b[0].contentCloning || !j && f.contentCloning
          , l = b[0] && void 0 !== b[0].debug
          , m = l && b[0].debug || !l && f.debug;
        return this.length > 1 && (i instanceof a || "object" == typeof i && null != i && i.tagName) && !k && m && console.log(c),
        this.each(function() {
            var c = !1
              , d = a(this)
              , e = d.data("tooltipster-ns")
              , f = null;
            e ? g ? c = !0 : m && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."),
            console.log(this)) : c = !0,
            c && (f = new a.Tooltipster(this,b[0]),
            e || (e = []),
            e.push(f.__namespace),
            d.data("tooltipster-ns", e),
            d.data(f.__namespace, f),
            f.__options.functionInit && f.__options.functionInit.call(f, f, {
                origin: this
            }),
            f._trigger("init")),
            a.tooltipster.__instancesLatestArr.push(f)
        }),
        this
    }
    ,
    b.prototype = {
        __init: function(b) {
            this.__$tooltip = b,
            this.__$tooltip.css({
                left: 0,
                overflow: "hidden",
                position: "absolute",
                top: 0
            }).find(".tooltipster-content").css("overflow", "auto"),
            this.$container = a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body)
        },
        __forceRedraw: function() {
            var a = this.__$tooltip.parent();
            this.__$tooltip.detach(),
            this.__$tooltip.appendTo(a)
        },
        constrain: function(a, b) {
            return this.constraints = {
                width: a,
                height: b
            },
            this.__$tooltip.css({
                display: "block",
                height: "",
                overflow: "auto",
                width: a
            }),
            this
        },
        destroy: function() {
            this.__$tooltip.detach().find(".tooltipster-content").css({
                display: "",
                overflow: ""
            }),
            this.$container.remove()
        },
        free: function() {
            return this.constraints = null,
            this.__$tooltip.css({
                display: "",
                height: "",
                overflow: "visible",
                width: ""
            }),
            this
        },
        measure: function() {
            this.__forceRedraw();
            var a = this.__$tooltip[0].getBoundingClientRect()
              , b = {
                size: {
                    height: a.height || a.bottom - a.top,
                    width: a.width || a.right - a.left
                }
            };
            if (this.constraints) {
                var c = this.__$tooltip.find(".tooltipster-content")
                  , d = this.__$tooltip.outerHeight()
                  , e = c[0].getBoundingClientRect()
                  , f = {
                    height: d <= this.constraints.height,
                    width: a.width <= this.constraints.width && e.width >= c[0].scrollWidth - 1
                };
                b.fits = f.height && f.width
            }
            return h.IE && h.IE <= 11 && b.size.width !== h.window.document.documentElement.clientWidth && (b.size.width = Math.ceil(b.size.width) + 1),
            b
        }
    };
    var j = navigator.userAgent.toLowerCase();
    -1 != j.indexOf("msie") ? h.IE = parseInt(j.split("msie")[1]) : -1 !== j.toLowerCase().indexOf("trident") && -1 !== j.indexOf(" rv:11") ? h.IE = 11 : -1 != j.toLowerCase().indexOf("edge/") && (h.IE = parseInt(j.toLowerCase().split("edge/")[1]));
    var k = "tooltipster.sideTip";
    return a.tooltipster._plugin({
        name: k,
        instance: {
            __defaults: function() {
                return {
                    arrow: !0,
                    distance: 6,
                    functionPosition: null,
                    maxWidth: null,
                    minIntersection: 16,
                    minWidth: 0,
                    position: null,
                    side: "top",
                    viewportAware: !0
                }
            },
            __init: function(a) {
                var b = this;
                b.__instance = a,
                b.__namespace = "tooltipster-sideTip-" + Math.round(1e6 * Math.random()),
                b.__previousState = "closed",
                b.__options,
                b.__optionsFormat(),
                b.__instance._on("state." + b.__namespace, function(a) {
                    "closed" == a.state ? b.__close() : "appearing" == a.state && "closed" == b.__previousState && b.__create(),
                    b.__previousState = a.state
                }),
                b.__instance._on("options." + b.__namespace, function() {
                    b.__optionsFormat()
                }),
                b.__instance._on("reposition." + b.__namespace, function(a) {
                    b.__reposition(a.event, a.helper)
                })
            },
            __close: function() {
                this.__instance.content()instanceof a && this.__instance.content().detach(),
                this.__instance._$tooltip.remove(),
                this.__instance._$tooltip = null
            },
            __create: function() {
                var b = a('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
                this.__options.arrow || b.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide(),
                this.__options.minWidth && b.css("min-width", this.__options.minWidth + "px"),
                this.__options.maxWidth && b.css("max-width", this.__options.maxWidth + "px"),
                this.__instance._$tooltip = b,
                this.__instance._trigger("created")
            },
            __destroy: function() {
                this.__instance._off("." + self.__namespace)
            },
            __optionsFormat: function() {
                var b = this;
                if (b.__options = b.__instance._optionsExtract(k, b.__defaults()),
                b.__options.position && (b.__options.side = b.__options.position),
                "object" != typeof b.__options.distance && (b.__options.distance = [b.__options.distance]),
                b.__options.distance.length < 4 && (void 0 === b.__options.distance[1] && (b.__options.distance[1] = b.__options.distance[0]),
                void 0 === b.__options.distance[2] && (b.__options.distance[2] = b.__options.distance[0]),
                void 0 === b.__options.distance[3] && (b.__options.distance[3] = b.__options.distance[1]),
                b.__options.distance = {
                    top: b.__options.distance[0],
                    right: b.__options.distance[1],
                    bottom: b.__options.distance[2],
                    left: b.__options.distance[3]
                }),
                "string" == typeof b.__options.side) {
                    var c = {
                        top: "bottom",
                        right: "left",
                        bottom: "top",
                        left: "right"
                    };
                    b.__options.side = [b.__options.side, c[b.__options.side]],
                    "left" == b.__options.side[0] || "right" == b.__options.side[0] ? b.__options.side.push("top", "bottom") : b.__options.side.push("right", "left")
                }
                6 === a.tooltipster._env.IE && b.__options.arrow !== !0 && (b.__options.arrow = !1)
            },
            __reposition: function(b, c) {
                var d, e = this, f = e.__targetFind(c), g = [];
                e.__instance._$tooltip.detach();
                var h = e.__instance._$tooltip.clone()
                  , i = a.tooltipster._getRuler(h)
                  , j = !1
                  , k = e.__instance.option("animation");
                switch (k && h.removeClass("tooltipster-" + k),
                a.each(["window", "document"], function(d, k) {
                    var l = null;
                    if (e.__instance._trigger({
                        container: k,
                        helper: c,
                        satisfied: j,
                        takeTest: function(a) {
                            l = a
                        },
                        results: g,
                        type: "positionTest"
                    }),
                    1 == l || 0 != l && 0 == j && ("window" != k || e.__options.viewportAware))
                        for (var d = 0; d < e.__options.side.length; d++) {
                            var m = {
                                horizontal: 0,
                                vertical: 0
                            }
                              , n = e.__options.side[d];
                            "top" == n || "bottom" == n ? m.vertical = e.__options.distance[n] : m.horizontal = e.__options.distance[n],
                            e.__sideChange(h, n),
                            a.each(["natural", "constrained"], function(a, d) {
                                if (l = null,
                                e.__instance._trigger({
                                    container: k,
                                    event: b,
                                    helper: c,
                                    mode: d,
                                    results: g,
                                    satisfied: j,
                                    side: n,
                                    takeTest: function(a) {
                                        l = a
                                    },
                                    type: "positionTest"
                                }),
                                1 == l || 0 != l && 0 == j) {
                                    var h = {
                                        container: k,
                                        distance: m,
                                        fits: null,
                                        mode: d,
                                        outerSize: null,
                                        side: n,
                                        size: null,
                                        target: f[n],
                                        whole: null
                                    }
                                      , o = "natural" == d ? i.free() : i.constrain(c.geo.available[k][n].width - m.horizontal, c.geo.available[k][n].height - m.vertical)
                                      , p = o.measure();
                                    if (h.size = p.size,
                                    h.outerSize = {
                                        height: p.size.height + m.vertical,
                                        width: p.size.width + m.horizontal
                                    },
                                    "natural" == d ? c.geo.available[k][n].width >= h.outerSize.width && c.geo.available[k][n].height >= h.outerSize.height ? h.fits = !0 : h.fits = !1 : h.fits = p.fits,
                                    "window" == k && (h.fits ? "top" == n || "bottom" == n ? h.whole = c.geo.origin.windowOffset.right >= e.__options.minIntersection && c.geo.window.size.width - c.geo.origin.windowOffset.left >= e.__options.minIntersection : h.whole = c.geo.origin.windowOffset.bottom >= e.__options.minIntersection && c.geo.window.size.height - c.geo.origin.windowOffset.top >= e.__options.minIntersection : h.whole = !1),
                                    g.push(h),
                                    h.whole)
                                        j = !0;
                                    else if ("natural" == h.mode && (h.fits || h.size.width <= c.geo.available[k][n].width))
                                        return !1
                                }
                            })
                        }
                }),
                e.__instance._trigger({
                    edit: function(a) {
                        g = a
                    },
                    event: b,
                    helper: c,
                    results: g,
                    type: "positionTested"
                }),
                g.sort(function(a, b) {
                    if (a.whole && !b.whole)
                        return -1;
                    if (!a.whole && b.whole)
                        return 1;
                    if (a.whole && b.whole) {
                        var c = e.__options.side.indexOf(a.side)
                          , d = e.__options.side.indexOf(b.side);
                        return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1
                    }
                    if (a.fits && !b.fits)
                        return -1;
                    if (!a.fits && b.fits)
                        return 1;
                    if (a.fits && b.fits) {
                        var c = e.__options.side.indexOf(a.side)
                          , d = e.__options.side.indexOf(b.side);
                        return d > c ? -1 : c > d ? 1 : "natural" == a.mode ? -1 : 1
                    }
                    return "document" == a.container && "bottom" == a.side && "natural" == a.mode ? -1 : 1
                }),
                d = g[0],
                d.coord = {},
                d.side) {
                case "left":
                case "right":
                    d.coord.top = Math.floor(d.target - d.size.height / 2);
                    break;
                case "bottom":
                case "top":
                    d.coord.left = Math.floor(d.target - d.size.width / 2)
                }
                switch (d.side) {
                case "left":
                    d.coord.left = c.geo.origin.windowOffset.left - d.outerSize.width;
                    break;
                case "right":
                    d.coord.left = c.geo.origin.windowOffset.right + d.distance.horizontal;
                    break;
                case "top":
                    d.coord.top = c.geo.origin.windowOffset.top - d.outerSize.height;
                    break;
                case "bottom":
                    d.coord.top = c.geo.origin.windowOffset.bottom + d.distance.vertical
                }
                "window" == d.container ? "top" == d.side || "bottom" == d.side ? d.coord.left < 0 ? c.geo.origin.windowOffset.right - this.__options.minIntersection >= 0 ? d.coord.left = 0 : d.coord.left = c.geo.origin.windowOffset.right - this.__options.minIntersection - 1 : d.coord.left > c.geo.window.size.width - d.size.width && (c.geo.origin.windowOffset.left + this.__options.minIntersection <= c.geo.window.size.width ? d.coord.left = c.geo.window.size.width - d.size.width : d.coord.left = c.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - d.size.width) : d.coord.top < 0 ? c.geo.origin.windowOffset.bottom - this.__options.minIntersection >= 0 ? d.coord.top = 0 : d.coord.top = c.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : d.coord.top > c.geo.window.size.height - d.size.height && (c.geo.origin.windowOffset.top + this.__options.minIntersection <= c.geo.window.size.height ? d.coord.top = c.geo.window.size.height - d.size.height : d.coord.top = c.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - d.size.height) : (d.coord.left > c.geo.window.size.width - d.size.width && (d.coord.left = c.geo.window.size.width - d.size.width),
                d.coord.left < 0 && (d.coord.left = 0)),
                e.__sideChange(h, d.side),
                c.tooltipClone = h[0],
                c.tooltipParent = e.__instance.option("parent").parent[0],
                c.mode = d.mode,
                c.whole = d.whole,
                c.origin = e.__instance._$origin[0],
                c.tooltip = e.__instance._$tooltip[0],
                delete d.container,
                delete d.fits,
                delete d.mode,
                delete d.outerSize,
                delete d.whole,
                d.distance = d.distance.horizontal || d.distance.vertical;
                var l = a.extend(!0, {}, d);
                if (e.__instance._trigger({
                    edit: function(a) {
                        d = a
                    },
                    event: b,
                    helper: c,
                    position: l,
                    type: "position"
                }),
                e.__options.functionPosition) {
                    var m = e.__options.functionPosition.call(e, e.__instance, c, l);
                    m && (d = m)
                }
                i.destroy();
                var n, o;
                "top" == d.side || "bottom" == d.side ? (n = {
                    prop: "left",
                    val: d.target - d.coord.left
                },
                o = d.size.width - this.__options.minIntersection) : (n = {
                    prop: "top",
                    val: d.target - d.coord.top
                },
                o = d.size.height - this.__options.minIntersection),
                n.val < this.__options.minIntersection ? n.val = this.__options.minIntersection : n.val > o && (n.val = o);
                var p;
                p = c.geo.origin.fixedLineage ? c.geo.origin.windowOffset : {
                    left: c.geo.origin.windowOffset.left + c.geo.window.scroll.left,
                    top: c.geo.origin.windowOffset.top + c.geo.window.scroll.top
                },
                d.coord = {
                    left: p.left + (d.coord.left - c.geo.origin.windowOffset.left),
                    top: p.top + (d.coord.top - c.geo.origin.windowOffset.top)
                },
                e.__sideChange(e.__instance._$tooltip, d.side),
                c.geo.origin.fixedLineage ? e.__instance._$tooltip.css("position", "fixed") : e.__instance._$tooltip.css("position", ""),
                e.__instance._$tooltip.css({
                    left: d.coord.left,
                    top: d.coord.top,
                    height: d.size.height,
                    width: d.size.width
                }).find(".tooltipster-arrow").css({
                    left: "",
                    top: ""
                }).css(n.prop, n.val),
                e.__instance._$tooltip.appendTo(e.__instance.option("parent")),
                e.__instance._trigger({
                    type: "repositioned",
                    event: b,
                    position: d
                })
            },
            __sideChange: function(a, b) {
                a.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" + b)
            },
            __targetFind: function(a) {
                var b = {}
                  , c = this.__instance._$origin[0].getClientRects();
                if (c.length > 1) {
                    var d = this.__instance._$origin.css("opacity");
                    1 == d && (this.__instance._$origin.css("opacity", .99),
                    c = this.__instance._$origin[0].getClientRects(),
                    this.__instance._$origin.css("opacity", 1))
                }
                if (c.length < 2)
                    b.top = Math.floor(a.geo.origin.windowOffset.left + a.geo.origin.size.width / 2),
                    b.bottom = b.top,
                    b.left = Math.floor(a.geo.origin.windowOffset.top + a.geo.origin.size.height / 2),
                    b.right = b.left;
                else {
                    var e = c[0];
                    b.top = Math.floor(e.left + (e.right - e.left) / 2),
                    e = c.length > 2 ? c[Math.ceil(c.length / 2) - 1] : c[0],
                    b.right = Math.floor(e.top + (e.bottom - e.top) / 2),
                    e = c[c.length - 1],
                    b.bottom = Math.floor(e.left + (e.right - e.left) / 2),
                    e = c.length > 2 ? c[Math.ceil((c.length + 1) / 2) - 1] : c[c.length - 1],
                    b.left = Math.floor(e.top + (e.bottom - e.top) / 2)
                }
                return b
            }
        }
    }),
    a
});
/*! Swiper */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, (function() {
    "use strict";
    var e = "undefined" == typeof document ? {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        location: {
            hash: ""
        }
    } : document
      , t = "undefined" == typeof window ? {
        document: e,
        navigator: {
            userAgent: ""
        },
        location: {},
        history: {},
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {}
    } : window
      , i = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this[t] = e[t];
        return this.length = e.length,
        this
    };
    function s(s, a) {
        var r = []
          , n = 0;
        if (s && !a && s instanceof i)
            return s;
        if (s)
            if ("string" == typeof s) {
                var o, l, d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                    var h = "div";
                    for (0 === d.indexOf("<li") && (h = "ul"),
                    0 === d.indexOf("<tr") && (h = "tbody"),
                    0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"),
                    0 === d.indexOf("<tbody") && (h = "table"),
                    0 === d.indexOf("<option") && (h = "select"),
                    (l = e.createElement(h)).innerHTML = d,
                    n = 0; n < l.childNodes.length; n += 1)
                        r.push(l.childNodes[n])
                } else
                    for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])],
                    n = 0; n < o.length; n += 1)
                        o[n] && r.push(o[n])
            } else if (s.nodeType || s === t || s === e)
                r.push(s);
            else if (s.length > 0 && s[0].nodeType)
                for (n = 0; n < s.length; n += 1)
                    r.push(s[n]);
        return new i(r)
    }
    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1)
            -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    s.fn = i.prototype,
    s.Class = i,
    s.Dom7 = i;
    var r = {
        addClass: function(e) {
            if (void 0 === e)
                return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1)
                    void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length)
                    this[s].setAttribute(e, t);
                else
                    for (var a in e)
                        this[s][a] = e[a],
                        this[s].setAttribute(a, e[a]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1)
                    (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}),
                    i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
                    return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e,
                i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e,
                i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            var a = t[0]
              , r = t[1]
              , n = t[2]
              , o = t[3];
            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e),
                    s(t).is(r))
                        n.apply(t, i);
                    else
                        for (var a = s(t).parents(), o = 0; o < a.length; o += 1)
                            s(a[o]).is(r) && n.apply(a[o], i)
                }
            }
            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                n.apply(this, t)
            }
            "function" == typeof t[1] && (a = (e = t)[0],
            n = e[1],
            o = e[2],
            r = void 0),
            o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (h = 0; h < p.length; h += 1) {
                        var v = p[h];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []),
                        u.dom7LiveListeners[v].push({
                            listener: n,
                            proxyListener: l
                        }),
                        u.addEventListener(v, l, o)
                    }
                else
                    for (h = 0; h < p.length; h += 1) {
                        var f = p[h];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[f] || (u.dom7Listeners[f] = []),
                        u.dom7Listeners[f].push({
                            listener: n,
                            proxyListener: d
                        }),
                        u.addEventListener(f, d, o)
                    }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--; )
                t[i] = arguments[i];
            var s = t[0]
              , a = t[1]
              , r = t[2]
              , n = t[3];
            "function" == typeof t[1] && (s = (e = t)[0],
            r = e[1],
            n = e[2],
            a = void 0),
            n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) {
                    var p = this[h]
                      , c = void 0;
                    if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]),
                    c && c.length)
                        for (var u = c.length - 1; u >= 0; u -= 1) {
                            var v = c[u];
                            r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n),
                            c.splice(u, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var i = [], s = arguments.length; s--; )
                i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], l = 0; l < this.length; l += 1) {
                    var d = this[l]
                      , h = void 0;
                    try {
                        h = new t.CustomEvent(o,{
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (t) {
                        (h = e.createEvent("Event")).initEvent(o, !0, !0),
                        h.detail = r
                    }
                    d.dom7EventData = i.filter((function(e, t) {
                        return t > 0
                    }
                    )),
                    d.dispatchEvent(h),
                    d.dom7EventData = [],
                    delete d.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"], s = this;
            function a(r) {
                if (r.target === this)
                    for (e.call(this, r),
                    t = 0; t < i.length; t += 1)
                        s.off(i[t], a)
            }
            if (e)
                for (t = 0; t < i.length; t += 1)
                    s.on(i[t], a);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                var i = this[0]
                  , s = i.getBoundingClientRect()
                  , a = e.body
                  , r = i.clientTop || a.clientTop || 0
                  , n = i.clientLeft || a.clientLeft || 0
                  , o = i === t ? t.scrollY : i.scrollTop
                  , l = i === t ? t.scrollX : i.scrollLeft;
                return {
                    top: s.top + o - r,
                    left: s.left + l - n
                }
            }
            return null
        },
        css: function(e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                        for (var a in e)
                            this[s].style[a] = e[a];
                    return this
                }
                if (this[0])
                    return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1)
                    this[s].style[e] = i;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e)
                return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t]))
                    return this;
            return this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(a) {
            var r, n, o = this[0];
            if (!o || void 0 === a)
                return !1;
            if ("string" == typeof a) {
                if (o.matches)
                    return o.matches(a);
                if (o.webkitMatchesSelector)
                    return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector)
                    return o.msMatchesSelector(a);
                for (r = s(a),
                n = 0; n < r.length; n += 1)
                    if (r[n] === o)
                        return !0;
                return !1
            }
            if (a === e)
                return o === e;
            if (a === t)
                return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a,
                n = 0; n < r.length; n += 1)
                    if (r[n] === o)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t, s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var t, s = [], a = arguments.length; a--; )
                s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) {
                        var o = e.createElement("div");
                        for (o.innerHTML = t; o.firstChild; )
                            this[n].appendChild(o.firstChild)
                    } else if (t instanceof i)
                        for (var l = 0; l < t.length; l += 1)
                            this[n].appendChild(t[l]);
                    else
                        this[n].appendChild(t)
            }
            return this
        },
        prepend: function(t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t,
                    a = r.childNodes.length - 1; a >= 0; a -= 1)
                        this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
                } else if (t instanceof i)
                    for (a = 0; a < t.length; a += 1)
                        this[s].insertBefore(t[a], this[s].childNodes[0]);
                else
                    this[s].insertBefore(t, this[s].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        },
        nextAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new i([]);
            for (; a.nextElementSibling; ) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r),
                a = r
            }
            return new i(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        },
        prevAll: function(e) {
            var t = []
              , a = this[0];
            if (!a)
                return new i([]);
            for (; a.previousElementSibling; ) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r),
                a = r
            }
            return new i(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var r = this[i].parentNode; r; )
                    e ? s(r).is(e) && t.push(r) : t.push(r),
                    r = r.parentNode;
            return s(a(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1)
                    t.push(a[r]);
            return new i(t)
        },
        children: function(e) {
            for (var t = [], r = 0; r < this.length; r += 1)
                for (var n = this[r].childNodes, o = 0; o < n.length; o += 1)
                    e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t))
        },
        filter: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                e.call(this[s], s, this[s]) && t.push(this[s]);
            return new i(t)
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var r = s(e[i]);
                for (a = 0; a < r.length; a += 1)
                    this[this.length] = r[a],
                    this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(r).forEach((function(e) {
        s.fn[e] = s.fn[e] || r[e]
    }
    ));
    var n = {
        deleteProps: function(e) {
            var t = e;
            Object.keys(t).forEach((function(e) {
                try {
                    t[e] = null
                } catch (e) {}
                try {
                    delete t[e]
                } catch (e) {}
            }
            ))
        },
        nextTick: function(e, t) {
            return void 0 === t && (t = 0),
            setTimeout(e, t)
        },
        now: function() {
            return Date.now()
        },
        getTranslate: function(e, i) {
            var s, a, r;
            void 0 === i && (i = "x");
            var n = t.getComputedStyle(e, null);
            return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function(e) {
                return e.replace(",", ".")
            }
            )).join(", ")),
            r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
            "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])),
            "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])),
            a || 0
        },
        parseUrlQuery: function(e) {
            var i, s, a, r, n = {}, o = e || t.location.href;
            if ("string" == typeof o && o.length)
                for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function(e) {
                    return "" !== e
                }
                ))).length,
                i = 0; i < r; i += 1)
                    a = s[i].replace(/#\S+/g, "").split("="),
                    n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
            return n
        },
        isObject: function(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        },
        extend: function() {
            for (var e = [], t = arguments.length; t--; )
                e[t] = arguments[t];
            for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                var a = e[s];
                if (null != a)
                    for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
                        var d = r[o]
                          , h = Object.getOwnPropertyDescriptor(a, d);
                        void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {},
                        n.extend(i[d], a[d])) : i[d] = a[d])
                    }
            }
            return i
        }
    }
      , o = {
        touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart"in t || t.DocumentTouch && e instanceof t.DocumentTouch),
        pointerEvents: !!t.PointerEvent && "maxTouchPoints"in t.navigator && t.navigator.maxTouchPoints > 0,
        observer: "MutationObserver"in t || "WebkitMutationObserver"in t,
        passiveListener: function() {
            var e = !1;
            try {
                var i = Object.defineProperty({}, "passive", {
                    get: function() {
                        e = !0
                    }
                });
                t.addEventListener("testPassiveListener", null, i)
            } catch (e) {}
            return e
        }(),
        gestures: "ongesturestart"in t
    }
      , l = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.params = e,
        t.eventsListeners = {},
        t.params && t.params.on && Object.keys(t.params.on).forEach((function(e) {
            t.on(e, t.params.on[e])
        }
        ))
    }
      , d = {
        components: {
            configurable: !0
        }
    };
    l.prototype.on = function(e, t, i) {
        var s = this;
        if ("function" != typeof t)
            return s;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach((function(e) {
            s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][a](t)
        }
        )),
        s
    }
    ,
    l.prototype.once = function(e, t, i) {
        var s = this;
        if ("function" != typeof t)
            return s;
        function a() {
            for (var i = [], r = arguments.length; r--; )
                i[r] = arguments[r];
            t.apply(s, i),
            s.off(e, a),
            a.f7proxy && delete a.f7proxy
        }
        return a.f7proxy = t,
        s.on(e, a, i)
    }
    ,
    l.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach((function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function(s, a) {
                (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
            }
            ))
        }
        )),
        i) : i
    }
    ,
    l.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--; )
            e[t] = arguments[t];
        var i, s, a, r = this;
        if (!r.eventsListeners)
            return r;
        "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0],
        s = e.slice(1, e.length),
        a = r) : (i = e[0].events,
        s = e[0].data,
        a = e[0].context || r);
        var n = Array.isArray(i) ? i : i.split(" ");
        return n.forEach((function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach((function(e) {
                    t.push(e)
                }
                )),
                t.forEach((function(e) {
                    e.apply(a, s)
                }
                ))
            }
        }
        )),
        r
    }
    ,
    l.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i];
            s.params && n.extend(e, s.params)
        }
        ))
    }
    ,
    l.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i]
              , a = e[i] || {};
            s.instance && Object.keys(s.instance).forEach((function(e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }
            )),
            s.on && t.on && Object.keys(s.on).forEach((function(e) {
                t.on(e, s.on[e])
            }
            )),
            s.create && s.create.bind(t)(a)
        }
        ))
    }
    ,
    d.components.set = function(e) {
        this.use && this.use(e)
    }
    ,
    l.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
            t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
        return s.prototype.modules[a] = e,
        e.proto && Object.keys(e.proto).forEach((function(t) {
            s.prototype[t] = e.proto[t]
        }
        )),
        e.static && Object.keys(e.static).forEach((function(t) {
            s[t] = e.static[t]
        }
        )),
        e.install && e.install.apply(s, t),
        s
    }
    ,
    l.use = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
            t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach((function(e) {
            return s.installModule(e)
        }
        )),
        s) : s.installModule.apply(s, [e].concat(t))
    }
    ,
    Object.defineProperties(l, d);
    var h = {
        updateSize: function() {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth,
            t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight,
            0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10),
            t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10),
            n.extend(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this.params
              , i = this.$wrapperEl
              , s = this.size
              , a = this.rtlTranslate
              , r = this.wrongRTL
              , o = this.virtual && e.virtual.enabled
              , l = o ? this.virtual.slides.length : this.slides.length
              , d = i.children("." + this.params.slideClass)
              , h = o ? this.virtual.slides.length : d.length
              , p = []
              , c = []
              , u = [];
            function v(t) {
                return !e.cssMode || t !== d.length - 1
            }
            var f = e.slidesOffsetBefore;
            "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
            var m = e.slidesOffsetAfter;
            "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
            var g = this.snapGrid.length
              , b = this.snapGrid.length
              , w = e.spaceBetween
              , y = -f
              , x = 0
              , T = 0;
            if (void 0 !== s) {
                var E, C;
                "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s),
                this.virtualSize = -w,
                a ? d.css({
                    marginLeft: "",
                    marginTop: ""
                }) : d.css({
                    marginRight: "",
                    marginBottom: ""
                }),
                e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn,
                "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
                for (var S, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
                    C = 0;
                    var $ = d.eq(k);
                    if (e.slidesPerColumn > 1) {
                        var L = void 0
                          , I = void 0
                          , D = void 0;
                        if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                            var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn))
                              , A = k - e.slidesPerColumn * e.slidesPerGroup * O;
                            L = (I = A - (D = Math.floor(A / e.slidesPerGroup)) * e.slidesPerGroup + O * e.slidesPerGroup) + D * E / M,
                            $.css({
                                "-webkit-box-ordinal-group": L,
                                "-moz-box-ordinal-group": L,
                                "-ms-flex-order": L,
                                "-webkit-order": L,
                                order: L
                            })
                        } else
                            "column" === e.slidesPerColumnFill ? (D = k - (I = Math.floor(k / M)) * M,
                            (I > z || I === z && D === M - 1) && (D += 1) >= M && (D = 0,
                            I += 1)) : I = k - (D = Math.floor(k / P)) * P;
                        $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px")
                    }
                    if ("none" !== $.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var H = t.getComputedStyle($[0], null)
                              , G = $[0].style.transform
                              , N = $[0].style.webkitTransform;
                            if (G && ($[0].style.transform = "none"),
                            N && ($[0].style.webkitTransform = "none"),
                            e.roundLengths)
                                C = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
                            else if (this.isHorizontal()) {
                                var B = parseFloat(H.getPropertyValue("width"))
                                  , V = parseFloat(H.getPropertyValue("padding-left"))
                                  , X = parseFloat(H.getPropertyValue("padding-right"))
                                  , Y = parseFloat(H.getPropertyValue("margin-left"))
                                  , F = parseFloat(H.getPropertyValue("margin-right"))
                                  , R = H.getPropertyValue("box-sizing");
                                C = R && "border-box" === R ? B + Y + F : B + V + X + Y + F
                            } else {
                                var W = parseFloat(H.getPropertyValue("height"))
                                  , q = parseFloat(H.getPropertyValue("padding-top"))
                                  , j = parseFloat(H.getPropertyValue("padding-bottom"))
                                  , K = parseFloat(H.getPropertyValue("margin-top"))
                                  , U = parseFloat(H.getPropertyValue("margin-bottom"))
                                  , _ = H.getPropertyValue("box-sizing");
                                C = _ && "border-box" === _ ? W + K + U : W + q + j + K + U
                            }
                            G && ($[0].style.transform = G),
                            N && ($[0].style.webkitTransform = N),
                            e.roundLengths && (C = Math.floor(C))
                        } else
                            C = (s - (e.slidesPerView - 1) * w) / e.slidesPerView,
                            e.roundLengths && (C = Math.floor(C)),
                            d[k] && (this.isHorizontal() ? d[k].style.width = C + "px" : d[k].style.height = C + "px");
                        d[k] && (d[k].swiperSlideSize = C),
                        u.push(C),
                        e.centeredSlides ? (y = y + C / 2 + x / 2 + w,
                        0 === x && 0 !== k && (y = y - s / 2 - w),
                        0 === k && (y = y - s / 2 - w),
                        Math.abs(y) < .001 && (y = 0),
                        e.roundLengths && (y = Math.floor(y)),
                        T % e.slidesPerGroup == 0 && p.push(y),
                        c.push(y)) : (e.roundLengths && (y = Math.floor(y)),
                        T % e.slidesPerGroup == 0 && p.push(y),
                        c.push(y),
                        y = y + C + w),
                        this.virtualSize += C + w,
                        x = C,
                        T += 1
                    }
                }
                if (this.virtualSize = Math.max(this.virtualSize, s) + m,
                a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }),
                e.setWrapperSize && (this.isHorizontal() ? i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }) : i.css({
                    height: this.virtualSize + e.spaceBetween + "px"
                })),
                e.slidesPerColumn > 1 && (this.virtualSize = (C + e.spaceBetween) * E,
                this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween,
                this.isHorizontal() ? i.css({
                    width: this.virtualSize + e.spaceBetween + "px"
                }) : i.css({
                    height: this.virtualSize + e.spaceBetween + "px"
                }),
                e.centeredSlides)) {
                    S = [];
                    for (var Z = 0; Z < p.length; Z += 1) {
                        var Q = p[Z];
                        e.roundLengths && (Q = Math.floor(Q)),
                        p[Z] < this.virtualSize + p[0] && S.push(Q)
                    }
                    p = S
                }
                if (!e.centeredSlides) {
                    S = [];
                    for (var J = 0; J < p.length; J += 1) {
                        var ee = p[J];
                        e.roundLengths && (ee = Math.floor(ee)),
                        p[J] <= this.virtualSize - s && S.push(ee)
                    }
                    p = S,
                    Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s)
                }
                if (0 === p.length && (p = [0]),
                0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({
                    marginLeft: w + "px"
                }) : d.filter(v).css({
                    marginRight: w + "px"
                }) : d.filter(v).css({
                    marginBottom: w + "px"
                })),
                e.centerInsufficientSlides) {
                    var te = 0;
                    if (u.forEach((function(t) {
                        te += t + (e.spaceBetween ? e.spaceBetween : 0)
                    }
                    )),
                    (te -= e.spaceBetween) < s) {
                        var ie = (s - te) / 2;
                        p.forEach((function(e, t) {
                            p[t] = e - ie
                        }
                        )),
                        c.forEach((function(e, t) {
                            c[t] = e + ie
                        }
                        ))
                    }
                }
                n.extend(this, {
                    slides: d,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }),
                h !== l && this.emit("slidesLengthChange"),
                p.length !== g && (this.params.watchOverflow && this.checkOverflow(),
                this.emit("snapGridLengthChange")),
                c.length !== b && this.emit("slidesGridLengthChange"),
                (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = [], s = 0;
            if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed),
            "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                    var a = this.activeIndex + t;
                    if (a > this.slides.length)
                        break;
                    i.push(this.slides.eq(a)[0])
                }
            else
                i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s
                }
            s && this.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1)
                e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params
              , i = this.slides
              , a = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var r = -e;
                a && (r = e),
                i.removeClass(t.slideVisibleClass),
                this.visibleSlidesIndexes = [],
                this.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n]
                      , l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset)
                          , h = d + this.slidesSizesGrid[n];
                        (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o),
                        this.visibleSlidesIndexes.push(n),
                        i.eq(n).addClass(t.slideVisibleClass))
                    }
                    o.progress = a ? -l : l
                }
                this.visibleSlides = s(this.visibleSlides)
            }
        },
        updateProgress: function(e) {
            if (void 0 === e) {
                var t = this.rtlTranslate ? -1 : 1;
                e = this && this.translate && this.translate * t || 0
            }
            var i = this.params
              , s = this.maxTranslate() - this.minTranslate()
              , a = this.progress
              , r = this.isBeginning
              , o = this.isEnd
              , l = r
              , d = o;
            0 === s ? (a = 0,
            r = !0,
            o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0,
            o = a >= 1),
            n.extend(this, {
                progress: a,
                isBeginning: r,
                isEnd: o
            }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) && this.updateSlidesProgress(e),
            r && !l && this.emit("reachBeginning toEdge"),
            o && !d && this.emit("reachEnd toEdge"),
            (l && !r || d && !o) && this.emit("fromEdge"),
            this.emit("progress", a)
        },
        updateSlidesClasses: function() {
            var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex, n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
            (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass),
            i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
            i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
            l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid, r = this.params, o = this.activeIndex, l = this.realIndex, d = this.snapIndex, h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1)
                    void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if ((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1),
            h !== o) {
                var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                n.extend(this, {
                    snapIndex: t,
                    realIndex: c,
                    previousIndex: o,
                    activeIndex: h
                }),
                this.emit("activeIndexChange"),
                this.emit("snapIndexChange"),
                l !== c && this.emit("realIndexChange"),
                (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
            } else
                t !== d && (this.snapIndex = t,
                this.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this.params
              , i = s(e.target).closest("." + t.slideClass)[0]
              , a = !1;
            if (i)
                for (var r = 0; r < this.slides.length; r += 1)
                    this.slides[r] === i && (a = !0);
            if (!i || !a)
                return this.clickedSlide = void 0,
                void (this.clickedIndex = void 0);
            this.clickedSlide = i,
            this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(),
            t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params
              , i = this.rtlTranslate
              , s = this.translate
              , a = this.$wrapperEl;
            if (t.virtualTranslate)
                return i ? -s : s;
            if (t.cssMode)
                return s;
            var r = n.getTranslate(a[0], e);
            return i && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            var i = this.rtlTranslate
              , s = this.params
              , a = this.$wrapperEl
              , r = this.wrapperEl
              , n = this.progress
              , o = 0
              , l = 0;
            this.isHorizontal() ? o = i ? -e : e : l = e,
            s.roundLengths && (o = Math.floor(o),
            l = Math.floor(l)),
            s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"),
            this.previousTranslate = this.translate,
            this.translate = this.isHorizontal() ? o : l;
            var d = this.maxTranslate() - this.minTranslate();
            (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e),
            this.emit("setTranslate", this.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, i, s, a) {
            var r;
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0),
            void 0 === s && (s = !0);
            var n = this
              , o = n.params
              , l = n.wrapperEl;
            if (n.animating && o.preventInteractionOnTransition)
                return !1;
            var d, h = n.minTranslate(), p = n.maxTranslate();
            if (d = s && e > h ? h : s && e < p ? p : e,
            n.updateProgress(d),
            o.cssMode) {
                var c = n.isHorizontal();
                return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d,
                r.behavior = "smooth",
                r)) : l[c ? "scrollLeft" : "scrollTop"] = -d,
                !0
            }
            return 0 === t ? (n.setTransition(0),
            n.setTranslate(d),
            i && (n.emit("beforeTransitionStart", t, a),
            n.emit("transitionEnd"))) : (n.setTransition(t),
            n.setTranslate(d),
            i && (n.emit("beforeTransitionStart", t, a),
            n.emit("transitionStart")),
            n.animating || (n.animating = !0,
            n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(e) {
                n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd),
                n.onTranslateToWrapperTransitionEnd = null,
                delete n.onTranslateToWrapperTransitionEnd,
                i && n.emit("transitionEnd"))
            }
            ),
            n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
            n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))),
            !0
        }
    };
    var c = {
        setTransition: function(e, t) {
            this.params.cssMode || this.$wrapperEl.transition(e),
            this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex
              , s = this.params
              , a = this.previousIndex;
            if (!s.cssMode) {
                s.autoHeight && this.updateAutoHeight();
                var r = t;
                if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
                this.emit("transitionStart"),
                e && i !== a) {
                    if ("reset" === r)
                        return void this.emit("slideResetTransitionStart");
                    this.emit("slideChangeTransitionStart"),
                    "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                }
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex
              , s = this.previousIndex
              , a = this.params;
            if (this.animating = !1,
            !a.cssMode) {
                this.setTransition(0);
                var r = t;
                if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"),
                this.emit("transitionEnd"),
                e && i !== s) {
                    if ("reset" === r)
                        return void this.emit("slideResetTransitionEnd");
                    this.emit("slideChangeTransitionEnd"),
                    "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                }
            }
        }
    };
    var u = {
        slideTo: function(e, t, i, s) {
            var a;
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var r = this
              , n = e;
            n < 0 && (n = 0);
            var o = r.params
              , l = r.snapGrid
              , d = r.slidesGrid
              , h = r.previousIndex
              , p = r.activeIndex
              , c = r.rtlTranslate
              , u = r.wrapperEl;
            if (r.animating && o.preventInteractionOnTransition)
                return !1;
            var v = Math.floor(n / o.slidesPerGroup);
            v >= l.length && (v = l.length - 1),
            (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
            var f, m = -l[v];
            if (r.updateProgress(m),
            o.normalizeSlideIndex)
                for (var g = 0; g < d.length; g += 1)
                    -Math.floor(100 * m) >= Math.floor(100 * d[g]) && (n = g);
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && m < r.translate && m < r.minTranslate())
                    return !1;
                if (!r.allowSlidePrev && m > r.translate && m > r.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            if (f = n > p ? "next" : n < p ? "prev" : "reset",
            c && -m === r.translate || !c && m === r.translate)
                return r.updateActiveIndex(n),
                o.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== o.effect && r.setTranslate(m),
                "reset" !== f && (r.transitionStart(i, f),
                r.transitionEnd(i, f)),
                !1;
            if (o.cssMode) {
                var b = r.isHorizontal();
                return 0 === t ? u[b ? "scrollLeft" : "scrollTop"] = -m : u.scrollTo ? u.scrollTo(((a = {})[b ? "left" : "top"] = -m,
                a.behavior = "smooth",
                a)) : u[b ? "scrollLeft" : "scrollTop"] = -m,
                !0
            }
            return 0 === t ? (r.setTransition(0),
            r.setTranslate(m),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, f),
            r.transitionEnd(i, f)) : (r.setTransition(t),
            r.setTranslate(m),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, s),
            r.transitionStart(i, f),
            r.animating || (r.animating = !0,
            r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                r.onSlideToWrapperTransitionEnd = null,
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(i, f))
            }
            ),
            r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
            r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))),
            !0
        },
        slideToLoop: function(e, t, i, s) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides),
            this.slideTo(a, t, i, s)
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this.params
              , a = this.animating;
            return s.loop ? !a && (this.loopFix(),
            this._clientLeft = this.$wrapperEl[0].clientLeft,
            this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this.params
              , a = this.animating
              , r = this.snapGrid
              , n = this.slidesGrid
              , o = this.rtlTranslate;
            if (s.loop) {
                if (a)
                    return !1;
                this.loopFix(),
                this._clientLeft = this.$wrapperEl[0].clientLeft
            }
            function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var d, h = l(o ? this.translate : -this.translate), p = r.map((function(e) {
                return l(e)
            }
            )), c = (n.map((function(e) {
                return l(e)
            }
            )),
            r[p.indexOf(h)],
            r[p.indexOf(h) - 1]);
            return void 0 === c && s.cssMode && r.forEach((function(e) {
                !c && h >= e && (c = e)
            }
            )),
            void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1),
            this.slideTo(d, e, t, i)
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e, t, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            var s = this.activeIndex
              , a = Math.floor(s / this.params.slidesPerGroup);
            if (a < this.snapGrid.length - 1) {
                var r = this.rtlTranslate ? this.translate : -this.translate
                  , n = this.snapGrid[a];
                r - n > (this.snapGrid[a + 1] - n) / 2 && (s = this.params.slidesPerGroup)
            }
            return this.slideTo(s, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this, i = t.params, a = t.$wrapperEl, r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, o = t.clickedIndex;
            if (i.loop) {
                if (t.animating)
                    return;
                e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(),
                o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                n.nextTick((function() {
                    t.slideTo(o)
                }
                ))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(),
                o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                n.nextTick((function() {
                    t.slideTo(o)
                }
                ))) : t.slideTo(o)
            } else
                t.slideTo(o)
        }
    };
    var v = {
        loopCreate: function() {
            var t = this
              , i = t.params
              , a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    r = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length),
            t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)),
            t.loopedSlides += i.loopAdditionalSlides,
            t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = []
              , h = [];
            r.each((function(e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i),
                e < r.length && e >= r.length - t.loopedSlides && d.push(i),
                a.attr("data-swiper-slide-index", e)
            }
            ));
            for (var p = 0; p < h.length; p += 1)
                a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1)
                a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this.params, i = this.activeIndex, s = this.slides, a = this.loopedSlides, r = this.allowSlidePrev, n = this.allowSlideNext, o = this.snapGrid, l = this.rtlTranslate;
            this.allowSlidePrev = !0,
            this.allowSlideNext = !0;
            var d = -o[i] - this.getTranslate();
            if (i < a)
                e = s.length - 3 * a + i,
                e += a,
                this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d);
            else if ("auto" === t.slidesPerView && i >= 2 * a || i >= s.length - a) {
                e = -s.length + i + a,
                e += a,
                this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d)
            }
            this.allowSlidePrev = r,
            this.allowSlideNext = n
        },
        loopDestroy: function() {
            var e = this.$wrapperEl
              , t = this.params
              , i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
            i.removeAttr("data-swiper-slide-index")
        }
    };
    var f = {
        setGrabCursor: function(e) {
            if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                var t = this.el;
                t.style.cursor = "move",
                t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
        }
    };
    var m, g, b, w, y, x, T, E, C, S, M, P, z, k, $, L = {
        appendSlide: function(e) {
            var t = this.$wrapperEl
              , i = this.params;
            if (i.loop && this.loopDestroy(),
            "object" == typeof e && "length"in e)
                for (var s = 0; s < e.length; s += 1)
                    e[s] && t.append(e[s]);
            else
                t.append(e);
            i.loop && this.loopCreate(),
            i.observer && o.observer || this.update()
        },
        prependSlide: function(e) {
            var t = this.params
              , i = this.$wrapperEl
              , s = this.activeIndex;
            t.loop && this.loopDestroy();
            var a = s + 1;
            if ("object" == typeof e && "length"in e) {
                for (var r = 0; r < e.length; r += 1)
                    e[r] && i.prepend(e[r]);
                a = s + e.length
            } else
                i.prepend(e);
            t.loop && this.loopCreate(),
            t.observer && o.observer || this.update(),
            this.slideTo(a, 0, !1)
        },
        addSlide: function(e, t) {
            var i = this.$wrapperEl
              , s = this.params
              , a = this.activeIndex;
            s.loop && (a -= this.loopedSlides,
            this.loopDestroy(),
            this.slides = i.children("." + s.slideClass));
            var r = this.slides.length;
            if (e <= 0)
                this.prependSlide(t);
            else if (e >= r)
                this.appendSlide(t);
            else {
                for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
                    var h = this.slides.eq(d);
                    h.remove(),
                    l.unshift(h)
                }
                if ("object" == typeof t && "length"in t) {
                    for (var p = 0; p < t.length; p += 1)
                        t[p] && i.append(t[p]);
                    n = a > e ? a + t.length : a
                } else
                    i.append(t);
                for (var c = 0; c < l.length; c += 1)
                    i.append(l[c]);
                s.loop && this.loopCreate(),
                s.observer && o.observer || this.update(),
                s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
            }
        },
        removeSlide: function(e) {
            var t = this.params
              , i = this.$wrapperEl
              , s = this.activeIndex;
            t.loop && (s -= this.loopedSlides,
            this.loopDestroy(),
            this.slides = i.children("." + t.slideClass));
            var a, r = s;
            if ("object" == typeof e && "length"in e) {
                for (var n = 0; n < e.length; n += 1)
                    a = e[n],
                    this.slides[a] && this.slides.eq(a).remove(),
                    a < r && (r -= 1);
                r = Math.max(r, 0)
            } else
                a = e,
                this.slides[a] && this.slides.eq(a).remove(),
                a < r && (r -= 1),
                r = Math.max(r, 0);
            t.loop && this.loopCreate(),
            t.observer && o.observer || this.update(),
            t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
        },
        removeAllSlides: function() {
            for (var e = [], t = 0; t < this.slides.length; t += 1)
                e.push(t);
            this.removeSlide(e)
        }
    }, I = (m = t.navigator.platform,
    g = t.navigator.userAgent,
    b = {
        ios: !1,
        android: !1,
        androidChrome: !1,
        desktop: !1,
        iphone: !1,
        ipod: !1,
        ipad: !1,
        edge: !1,
        ie: !1,
        firefox: !1,
        macos: !1,
        windows: !1,
        cordova: !(!t.cordova && !t.phonegap),
        phonegap: !(!t.cordova && !t.phonegap),
        electron: !1
    },
    w = t.screen.width,
    y = t.screen.height,
    x = g.match(/(Android);?[\s\/]+([\d.]+)?/),
    T = g.match(/(iPad).*OS\s([\d_]+)/),
    E = g.match(/(iPod)(.*OS\s([\d_]+))?/),
    C = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    S = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0,
    M = g.indexOf("Edge/") >= 0,
    P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0,
    z = "Win32" === m,
    k = g.toLowerCase().indexOf("electron") >= 0,
    $ = "MacIntel" === m,
    !T && $ && o.touch && (1024 === w && 1366 === y || 834 === w && 1194 === y || 834 === w && 1112 === y || 768 === w && 1024 === y) && (T = g.match(/(Version)\/([\d.]+)/),
    $ = !1),
    b.ie = S,
    b.edge = M,
    b.firefox = P,
    x && !z && (b.os = "android",
    b.osVersion = x[2],
    b.android = !0,
    b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0),
    (T || C || E) && (b.os = "ios",
    b.ios = !0),
    C && !E && (b.osVersion = C[2].replace(/_/g, "."),
    b.iphone = !0),
    T && (b.osVersion = T[2].replace(/_/g, "."),
    b.ipad = !0),
    E && (b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null,
    b.ipod = !0),
    b.ios && b.osVersion && g.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]),
    b.webView = !(!(C || T || E) || !g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches,
    b.webview = b.webView,
    b.standalone = b.webView,
    b.desktop = !(b.ios || b.android) || k,
    b.desktop && (b.electron = k,
    b.macos = $,
    b.windows = z,
    b.macos && (b.os = "macos"),
    b.windows && (b.os = "windows")),
    b.pixelRatio = t.devicePixelRatio || 1,
    b);
    function D(i) {
        var a = this.touchEventsData
          , r = this.params
          , o = this.touches;
        if (!this.animating || !r.preventInteractionOnTransition) {
            var l = i;
            l.originalEvent && (l = l.originalEvent);
            var d = s(l.target);
            if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type,
            (a.isTouchEvent || !("which"in l) || 3 !== l.which) && !(!a.isTouchEvent && "button"in l && l.button > 0 || a.isTouched && a.isMoved)))
                if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0])
                    this.allowClick = !0;
                else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
                    o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX,
                    o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
                    var h = o.currentX
                      , p = o.currentY
                      , c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection
                      , u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                    if (!c || !(h <= u || h >= t.screen.width - u)) {
                        if (n.extend(a, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }),
                        o.startX = h,
                        o.startY = p,
                        a.touchStartTime = n.now(),
                        this.allowClick = !0,
                        this.updateSize(),
                        this.swipeDirection = void 0,
                        r.threshold > 0 && (a.allowThresholdMove = !1),
                        "touchstart" !== l.type) {
                            var v = !0;
                            d.is(a.formElements) && (v = !1),
                            e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
                            var f = v && this.allowTouchMove && r.touchStartPreventDefault;
                            (r.touchStartForcePreventDefault || f) && l.preventDefault()
                        }
                        this.emit("touchStart", l)
                    }
                }
        }
    }
    function O(t) {
        var i = this.touchEventsData
          , a = this.params
          , r = this.touches
          , o = this.rtlTranslate
          , l = t;
        if (l.originalEvent && (l = l.originalEvent),
        i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== l.type) {
                var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0])
                  , h = "touchmove" === l.type ? d.pageX : l.pageX
                  , p = "touchmove" === l.type ? d.pageY : l.pageY;
                if (l.preventedByNestedSwiper)
                    return r.startX = h,
                    void (r.startY = p);
                if (!this.allowTouchMove)
                    return this.allowClick = !1,
                    void (i.isTouched && (n.extend(r, {
                        startX: h,
                        startY: p,
                        currentX: h,
                        currentY: p
                    }),
                    i.touchStartTime = n.now()));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                    if (this.isVertical()) {
                        if (p < r.startY && this.translate <= this.maxTranslate() || p > r.startY && this.translate >= this.minTranslate())
                            return i.isTouched = !1,
                            void (i.isMoved = !1)
                    } else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate())
                        return;
                if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements))
                    return i.isMoved = !0,
                    void (this.allowClick = !1);
                if (i.allowTouchCallbacks && this.emit("touchMove", l),
                !(l.targetTouches && l.targetTouches.length > 1)) {
                    r.currentX = h,
                    r.currentY = p;
                    var c = r.currentX - r.startX
                      , u = r.currentY - r.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling)
                            this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI,
                            i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle);
                        if (i.isScrolling && this.emit("touchMoveOpposite", l),
                        void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)),
                        i.isScrolling)
                            i.isTouched = !1;
                        else if (i.startMoving) {
                            this.allowClick = !1,
                            a.cssMode || l.preventDefault(),
                            a.touchMoveStopPropagation && !a.nested && l.stopPropagation(),
                            i.isMoved || (a.loop && this.loopFix(),
                            i.startTranslate = this.getTranslate(),
                            this.setTransition(0),
                            this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                            i.allowMomentumBounce = !1,
                            !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0),
                            this.emit("sliderFirstMove", l)),
                            this.emit("sliderMove", l),
                            i.isMoved = !0;
                            var f = this.isHorizontal() ? c : u;
                            r.diff = f,
                            f *= a.touchRatio,
                            o && (f = -f),
                            this.swipeDirection = f > 0 ? "prev" : "next",
                            i.currentTranslate = f + i.startTranslate;
                            var m = !0
                              , g = a.resistanceRatio;
                            if (a.touchReleaseOnEdges && (g = 0),
                            f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1,
                            a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1,
                            a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))),
                            m && (l.preventedByNestedSwiper = !0),
                            !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                            !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                            a.threshold > 0) {
                                if (!(Math.abs(f) > a.threshold || i.allowThresholdMove))
                                    return void (i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove)
                                    return i.allowThresholdMove = !0,
                                    r.startX = r.currentX,
                                    r.startY = r.currentY,
                                    i.currentTranslate = i.startTranslate,
                                    void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                            }
                            a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(),
                            this.updateSlidesClasses()),
                            a.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: r[this.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }),
                            i.velocities.push({
                                position: r[this.isHorizontal() ? "currentX" : "currentY"],
                                time: n.now()
                            })),
                            this.updateProgress(i.currentTranslate),
                            this.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else
            i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
    }
    function A(e) {
        var t = this
          , i = t.touchEventsData
          , s = t.params
          , a = t.touches
          , r = t.rtlTranslate
          , o = t.$wrapperEl
          , l = t.slidesGrid
          , d = t.snapGrid
          , h = e;
        if (h.originalEvent && (h = h.originalEvent),
        i.allowTouchCallbacks && t.emit("touchEnd", h),
        i.allowTouchCallbacks = !1,
        !i.isTouched)
            return i.isMoved && s.grabCursor && t.setGrabCursor(!1),
            i.isMoved = !1,
            void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = n.now(), u = c - i.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(h),
        t.emit("tap click", h),
        u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)),
        i.lastClickTime = n.now(),
        n.nextTick((function() {
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
            return i.isTouched = !1,
            i.isMoved = !1,
            void (i.startMoving = !1);
        if (i.isTouched = !1,
        i.isMoved = !1,
        i.startMoving = !1,
        p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate,
        !s.cssMode)
            if (s.freeMode) {
                if (p < -t.minTranslate())
                    return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate())
                    return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                if (s.freeModeMomentum) {
                    if (i.velocities.length > 1) {
                        var v = i.velocities.pop()
                          , f = i.velocities.pop()
                          , m = v.position - f.position
                          , g = v.time - f.time;
                        t.velocity = m / g,
                        t.velocity /= 2,
                        Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0),
                        (g > 150 || n.now() - v.time > 300) && (t.velocity = 0)
                    } else
                        t.velocity = 0;
                    t.velocity *= s.freeModeMomentumVelocityRatio,
                    i.velocities.length = 0;
                    var b = 1e3 * s.freeModeMomentumRatio
                      , w = t.velocity * b
                      , y = t.translate + w;
                    r && (y = -y);
                    var x, T, E = !1, C = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                    if (y < t.maxTranslate())
                        s.freeModeMomentumBounce ? (y + t.maxTranslate() < -C && (y = t.maxTranslate() - C),
                        x = t.maxTranslate(),
                        E = !0,
                        i.allowMomentumBounce = !0) : y = t.maxTranslate(),
                        s.loop && s.centeredSlides && (T = !0);
                    else if (y > t.minTranslate())
                        s.freeModeMomentumBounce ? (y - t.minTranslate() > C && (y = t.minTranslate() + C),
                        x = t.minTranslate(),
                        E = !0,
                        i.allowMomentumBounce = !0) : y = t.minTranslate(),
                        s.loop && s.centeredSlides && (T = !0);
                    else if (s.freeModeSticky) {
                        for (var S, M = 0; M < d.length; M += 1)
                            if (d[M] > -y) {
                                S = M;
                                break
                            }
                        y = -(y = Math.abs(d[S] - y) < Math.abs(d[S - 1] - y) || "next" === t.swipeDirection ? d[S] : d[S - 1])
                    }
                    if (T && t.once("transitionEnd", (function() {
                        t.loopFix()
                    }
                    )),
                    0 !== t.velocity)
                        b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity);
                    else if (s.freeModeSticky)
                        return void t.slideToClosest();
                    s.freeModeMomentumBounce && E ? (t.updateProgress(x),
                    t.setTransition(b),
                    t.setTranslate(y),
                    t.transitionStart(!0, t.swipeDirection),
                    t.animating = !0,
                    o.transitionEnd((function() {
                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"),
                        t.setTransition(s.speed),
                        t.setTranslate(x),
                        o.transitionEnd((function() {
                            t && !t.destroyed && t.transitionEnd()
                        }
                        )))
                    }
                    ))) : t.velocity ? (t.updateProgress(y),
                    t.setTransition(b),
                    t.setTranslate(y),
                    t.transitionStart(!0, t.swipeDirection),
                    t.animating || (t.animating = !0,
                    o.transitionEnd((function() {
                        t && !t.destroyed && t.transitionEnd()
                    }
                    )))) : t.updateProgress(y),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses()
                } else if (s.freeModeSticky)
                    return void t.slideToClosest();
                (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(),
                t.updateActiveIndex(),
                t.updateSlidesClasses())
            } else {
                for (var P = 0, z = t.slidesSizesGrid[0], k = 0; k < l.length; k += s.slidesPerGroup)
                    void 0 !== l[k + s.slidesPerGroup] ? p >= l[k] && p < l[k + s.slidesPerGroup] && (P = k,
                    z = l[k + s.slidesPerGroup] - l[k]) : p >= l[k] && (P = k,
                    z = l[l.length - 1] - l[l.length - 2]);
                var $ = (p - l[P]) / z;
                if (u > s.longSwipesMs) {
                    if (!s.longSwipes)
                        return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && ($ >= s.longSwipesRatio ? t.slideTo(P + s.slidesPerGroup) : t.slideTo(P)),
                    "prev" === t.swipeDirection && ($ > 1 - s.longSwipesRatio ? t.slideTo(P + s.slidesPerGroup) : t.slideTo(P))
                } else {
                    if (!s.shortSwipes)
                        return void t.slideTo(t.activeIndex);
                    t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(P + s.slidesPerGroup) : t.slideTo(P) : ("next" === t.swipeDirection && t.slideTo(P + s.slidesPerGroup),
                    "prev" === t.swipeDirection && t.slideTo(P))
                }
            }
    }
    function H() {
        var e = this.params
          , t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext
              , s = this.allowSlidePrev
              , a = this.snapGrid;
            if (this.allowSlideNext = !0,
            this.allowSlidePrev = !0,
            this.updateSize(),
            this.updateSlides(),
            e.freeMode) {
                var r = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
                this.setTranslate(r),
                this.updateActiveIndex(),
                this.updateSlidesClasses(),
                e.autoHeight && this.updateAutoHeight()
            } else
                this.updateSlidesClasses(),
                ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
            this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(),
            this.allowSlidePrev = s,
            this.allowSlideNext = i,
            this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
        }
    }
    function G(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(),
        this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
        e.stopImmediatePropagation()))
    }
    function N() {
        var e = this.wrapperEl;
        this.previousTranslate = this.translate,
        this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop,
        -0 === this.translate && (this.translate = 0),
        this.updateActiveIndex(),
        this.updateSlidesClasses();
        var t = this.maxTranslate() - this.minTranslate();
        (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate),
        this.emit("setTranslate", this.translate, !1)
    }
    var B = !1;
    function V() {}
    var X = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        preventInteractionOnTransition: !1,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0
    }
      , Y = {
        update: h,
        translate: p,
        transition: c,
        slide: u,
        loop: v,
        grabCursor: f,
        manipulation: L,
        events: {
            attachEvents: function() {
                var t = this.params
                  , i = this.touchEvents
                  , s = this.el
                  , a = this.wrapperEl;
                this.onTouchStart = D.bind(this),
                this.onTouchMove = O.bind(this),
                this.onTouchEnd = A.bind(this),
                t.cssMode && (this.onScroll = N.bind(this)),
                this.onClick = G.bind(this);
                var r = !!t.nested;
                if (!o.touch && o.pointerEvents)
                    s.addEventListener(i.start, this.onTouchStart, !1),
                    e.addEventListener(i.move, this.onTouchMove, r),
                    e.addEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.addEventListener(i.start, this.onTouchStart, n),
                        s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? {
                            passive: !1,
                            capture: r
                        } : r),
                        s.addEventListener(i.end, this.onTouchEnd, n),
                        i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n),
                        B || (e.addEventListener("touchstart", V),
                        B = !0)
                    }
                    (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1),
                    e.addEventListener("mousemove", this.onTouchMove, r),
                    e.addEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0),
                t.cssMode && a.addEventListener("scroll", this.onScroll),
                this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", H, !0)
            },
            detachEvents: function() {
                var t = this.params
                  , i = this.touchEvents
                  , s = this.el
                  , a = this.wrapperEl
                  , r = !!t.nested;
                if (!o.touch && o.pointerEvents)
                    s.removeEventListener(i.start, this.onTouchStart, !1),
                    e.removeEventListener(i.move, this.onTouchMove, r),
                    e.removeEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (o.touch) {
                        var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(i.start, this.onTouchStart, n),
                        s.removeEventListener(i.move, this.onTouchMove, r),
                        s.removeEventListener(i.end, this.onTouchEnd, n),
                        i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n)
                    }
                    (t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1),
                    e.removeEventListener("mousemove", this.onTouchMove, r),
                    e.removeEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0),
                t.cssMode && a.removeEventListener("scroll", this.onScroll),
                this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", H)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this.activeIndex
                  , t = this.initialized
                  , i = this.loopedSlides;
                void 0 === i && (i = 0);
                var s = this.params
                  , a = this.$el
                  , r = s.breakpoints;
                if (r && (!r || 0 !== Object.keys(r).length)) {
                    var o = this.getBreakpoint(r);
                    if (o && this.currentBreakpoint !== o) {
                        var l = o in r ? r[o] : void 0;
                        l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerColumn"].forEach((function(e) {
                            var t = l[e];
                            void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        }
                        ));
                        var d = l || this.originalParams
                          , h = s.slidesPerColumn > 1
                          , p = d.slidesPerColumn > 1;
                        h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"),
                        "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
                        var c = d.direction && d.direction !== s.direction
                          , u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
                        c && t && this.changeDirection(),
                        n.extend(this.params, d),
                        n.extend(this, {
                            allowTouchMove: this.params.allowTouchMove,
                            allowSlideNext: this.params.allowSlideNext,
                            allowSlidePrev: this.params.allowSlidePrev
                        }),
                        this.currentBreakpoint = o,
                        u && t && (this.loopDestroy(),
                        this.loopCreate(),
                        this.updateSlides(),
                        this.slideTo(e - i + this.loopedSlides, 0, !1)),
                        this.emit("breakpoint", d)
                    }
                }
            },
            getBreakpoint: function(e) {
                if (e) {
                    var i = !1
                      , s = [];
                    Object.keys(e).forEach((function(e) {
                        s.push(e)
                    }
                    )),
                    s.sort((function(e, t) {
                        return parseInt(e, 10) - parseInt(t, 10)
                    }
                    ));
                    for (var a = 0; a < s.length; a += 1) {
                        var r = s[a];
                        r <= t.innerWidth && (i = r)
                    }
                    return i || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this.isLocked;
                this.isLocked = 1 === this.snapGrid.length,
                this.allowSlideNext = !this.isLocked,
                this.allowSlidePrev = !this.isLocked,
                e !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"),
                e && e !== this.isLocked && (this.isEnd = !1,
                this.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var e = this.classNames
                  , t = this.params
                  , i = this.rtl
                  , s = this.$el
                  , a = [];
                a.push("initialized"),
                a.push(t.direction),
                t.freeMode && a.push("free-mode"),
                t.autoHeight && a.push("autoheight"),
                i && a.push("rtl"),
                t.slidesPerColumn > 1 && (a.push("multirow"),
                "column" === t.slidesPerColumnFill && a.push("multirow-column")),
                I.android && a.push("android"),
                I.ios && a.push("ios"),
                t.cssMode && a.push("css-mode"),
                a.forEach((function(i) {
                    e.push(t.containerModifierClass + i)
                }
                )),
                s.addClass(e.join(" "))
            },
            removeClasses: function() {
                var e = this.$el
                  , t = this.classNames;
                e.removeClass(t.join(" "))
            }
        },
        images: {
            loadImage: function(e, i, s, a, r, n) {
                var o;
                function l() {
                    n && n()
                }
                e.complete && r ? l() : i ? ((o = new t.Image).onload = l,
                o.onerror = l,
                a && (o.sizes = a),
                s && (o.srcset = s),
                i && (o.src = i)) : l()
            },
            preloadImages: function() {
                var e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                    var s = e.imagesToLoad[i];
                    e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , F = {}
      , R = function(e) {
        function t() {
            for (var i, a, r, l = [], d = arguments.length; d--; )
                l[d] = arguments[d];
            1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0],
            r = i[1]),
            r || (r = {}),
            r = n.extend({}, r),
            a && !r.el && (r.el = a),
            e.call(this, r),
            Object.keys(Y).forEach((function(e) {
                Object.keys(Y[e]).forEach((function(i) {
                    t.prototype[i] || (t.prototype[i] = Y[e][i])
                }
                ))
            }
            ));
            var h = this;
            void 0 === h.modules && (h.modules = {}),
            Object.keys(h.modules).forEach((function(e) {
                var t = h.modules[e];
                if (t.params) {
                    var i = Object.keys(t.params)[0]
                      , s = t.params[i];
                    if ("object" != typeof s || null === s)
                        return;
                    if (!(i in r && "enabled"in s))
                        return;
                    !0 === r[i] && (r[i] = {
                        enabled: !0
                    }),
                    "object" != typeof r[i] || "enabled"in r[i] || (r[i].enabled = !0),
                    r[i] || (r[i] = {
                        enabled: !1
                    })
                }
            }
            ));
            var p = n.extend({}, X);
            h.useModulesParams(p),
            h.params = n.extend({}, p, F, r),
            h.originalParams = n.extend({}, h.params),
            h.passedParams = n.extend({}, r),
            h.$ = s;
            var c = s(h.params.el);
            if (a = c[0]) {
                if (c.length > 1) {
                    var u = [];
                    return c.each((function(e, i) {
                        var s = n.extend({}, r, {
                            el: i
                        });
                        u.push(new t(s))
                    }
                    )),
                    u
                }
                var v, f, m;
                return a.swiper = h,
                c.data("swiper", h),
                a && a.shadowRoot && a.shadowRoot.querySelector ? (v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function(e) {
                    return c.children(e)
                }
                : v = c.children("." + h.params.wrapperClass),
                n.extend(h, {
                    $el: c,
                    el: a,
                    $wrapperEl: v,
                    wrapperEl: v[0],
                    classNames: [],
                    slides: s(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal: function() {
                        return "horizontal" === h.params.direction
                    },
                    isVertical: function() {
                        return "vertical" === h.params.direction
                    },
                    rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
                    rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
                    wrongRTL: "-webkit-box" === v.css("display"),
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: !0,
                    isEnd: !1,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: !1,
                    allowSlideNext: h.params.allowSlideNext,
                    allowSlidePrev: h.params.allowSlidePrev,
                    touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"],
                    m = ["mousedown", "mousemove", "mouseup"],
                    o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]),
                    h.touchEventsTouch = {
                        start: f[0],
                        move: f[1],
                        end: f[2],
                        cancel: f[3]
                    },
                    h.touchEventsDesktop = {
                        start: m[0],
                        move: m[1],
                        end: m[2]
                    },
                    o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        formElements: "input, select, option, textarea, button, video",
                        lastClickTime: n.now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: !0,
                    allowTouchMove: h.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                }),
                h.useModules(),
                h.params.init && h.init(),
                h
            }
        }
        e && (t.__proto__ = e),
        t.prototype = Object.create(e && e.prototype),
        t.prototype.constructor = t;
        var i = {
            extendedDefaults: {
                configurable: !0
            },
            defaults: {
                configurable: !0
            },
            Class: {
                configurable: !0
            },
            $: {
                configurable: !0
            }
        };
        return t.prototype.slidesPerViewDynamic = function() {
            var e = this.params
              , t = this.slides
              , i = this.slidesGrid
              , s = this.size
              , a = this.activeIndex
              , r = 1;
            if (e.centeredSlides) {
                for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1)
                    t[l] && !n && (r += 1,
                    (o += t[l].swiperSlideSize) > s && (n = !0));
                for (var d = a - 1; d >= 0; d -= 1)
                    t[d] && !n && (r += 1,
                    (o += t[d].swiperSlideSize) > s && (n = !0))
            } else
                for (var h = a + 1; h < t.length; h += 1)
                    i[h] - i[a] < s && (r += 1);
            return r
        }
        ,
        t.prototype.update = function() {
            var e = this;
            if (e && !e.destroyed) {
                var t = e.snapGrid
                  , i = e.params;
                i.breakpoints && e.setBreakpoint(),
                e.updateSize(),
                e.updateSlides(),
                e.updateProgress(),
                e.updateSlidesClasses(),
                e.params.freeMode ? (s(),
                e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(),
                i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                e.emit("update")
            }
            function s() {
                var t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(i),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
        }
        ,
        t.prototype.changeDirection = function(e, t) {
            void 0 === t && (t = !0);
            var i = this.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e),
            this.params.direction = e,
            this.slides.each((function(t, i) {
                "vertical" === e ? i.style.width = "" : i.style.height = ""
            }
            )),
            this.emit("changeDirection"),
            t && this.update(),
            this)
        }
        ,
        t.prototype.init = function() {
            this.initialized || (this.emit("beforeInit"),
            this.params.breakpoints && this.setBreakpoint(),
            this.addClasses(),
            this.params.loop && this.loopCreate(),
            this.updateSize(),
            this.updateSlides(),
            this.params.watchOverflow && this.checkOverflow(),
            this.params.grabCursor && this.setGrabCursor(),
            this.params.preloadImages && this.preloadImages(),
            this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit),
            this.attachEvents(),
            this.initialized = !0,
            this.emit("init"))
        }
        ,
        t.prototype.destroy = function(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            var i = this
              , s = i.params
              , a = i.$el
              , r = i.$wrapperEl
              , o = i.slides;
            return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t && (i.removeClasses(),
            a.removeAttr("style"),
            r.removeAttr("style"),
            o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach((function(e) {
                i.off(e)
            }
            )),
            !1 !== e && (i.$el[0].swiper = null,
            i.$el.data("swiper", null),
            n.deleteProps(i)),
            i.destroyed = !0,
            null)
        }
        ,
        t.extendDefaults = function(e) {
            n.extend(F, e)
        }
        ,
        i.extendedDefaults.get = function() {
            return F
        }
        ,
        i.defaults.get = function() {
            return X
        }
        ,
        i.Class.get = function() {
            return e
        }
        ,
        i.$.get = function() {
            return s
        }
        ,
        Object.defineProperties(t, i),
        t
    }(l)
      , W = {
        name: "device",
        proto: {
            device: I
        },
        static: {
            device: I
        }
    }
      , q = {
        name: "support",
        proto: {
            support: o
        },
        static: {
            support: o
        }
    }
      , j = {
        isEdge: !!t.navigator.userAgent.match(/Edge/g),
        isSafari: function() {
            var e = t.navigator.userAgent.toLowerCase();
            return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
    }
      , K = {
        name: "browser",
        proto: {
            browser: j
        },
        static: {
            browser: j
        }
    }
      , U = {
        name: "resize",
        create: function() {
            var e = this;
            n.extend(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                        e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function() {
                t.addEventListener("resize", this.resize.resizeHandler),
                t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
            },
            destroy: function() {
                t.removeEventListener("resize", this.resize.resizeHandler),
                t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
            }
        }
    }
      , _ = {
        func: t.MutationObserver || t.WebkitMutationObserver,
        attach: function(e, i) {
            void 0 === i && (i = {});
            var s = this
              , a = new (0,
            _.func)((function(e) {
                if (1 !== e.length) {
                    var i = function() {
                        s.emit("observerUpdate", e[0])
                    };
                    t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                } else
                    s.emit("observerUpdate", e[0])
            }
            ));
            a.observe(e, {
                attributes: void 0 === i.attributes || i.attributes,
                childList: void 0 === i.childList || i.childList,
                characterData: void 0 === i.characterData || i.characterData
            }),
            s.observer.observers.push(a)
        },
        init: function() {
            if (o.observer && this.params.observer) {
                if (this.params.observeParents)
                    for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
                        this.observer.attach(e[t]);
                this.observer.attach(this.$el[0], {
                    childList: this.params.observeSlideChildren
                }),
                this.observer.attach(this.$wrapperEl[0], {
                    attributes: !1
                })
            }
        },
        destroy: function() {
            this.observer.observers.forEach((function(e) {
                e.disconnect()
            }
            )),
            this.observer.observers = []
        }
    }
      , Z = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            n.extend(this, {
                observer: {
                    init: _.init.bind(this),
                    attach: _.attach.bind(this),
                    destroy: _.destroy.bind(this),
                    observers: []
                }
            })
        },
        on: {
            init: function() {
                this.observer.init()
            },
            destroy: function() {
                this.observer.destroy()
            }
        }
    }
      , Q = {
        update: function(e) {
            var t = this
              , i = t.params
              , s = i.slidesPerView
              , a = i.slidesPerGroup
              , r = i.centeredSlides
              , o = t.params.virtual
              , l = o.addSlidesBefore
              , d = o.addSlidesAfter
              , h = t.virtual
              , p = h.from
              , c = h.to
              , u = h.slides
              , v = h.slidesGrid
              , f = h.renderSlide
              , m = h.offset;
            t.updateActiveIndex();
            var g, b, w, y = t.activeIndex || 0;
            g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
            r ? (b = Math.floor(s / 2) + a + l,
            w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l,
            w = a + d);
            var x = Math.max((y || 0) - w, 0)
              , T = Math.min((y || 0) + b, u.length - 1)
              , E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);
            function C() {
                t.updateSlides(),
                t.updateProgress(),
                t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (n.extend(t.virtual, {
                from: x,
                to: T,
                offset: E,
                slidesGrid: t.slidesGrid
            }),
            p === x && c === T && !e)
                return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"),
                void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: E,
                    from: x,
                    to: T,
                    slides: function() {
                        for (var e = [], t = x; t <= T; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                void C();
            var S = []
              , M = [];
            if (e)
                t.$wrapperEl.find("." + t.params.slideClass).remove();
            else
                for (var P = p; P <= c; P += 1)
                    (P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
            for (var z = 0; z < u.length; z += 1)
                z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z),
                z < p && S.push(z)));
            M.forEach((function(e) {
                t.$wrapperEl.append(f(u[e], e))
            }
            )),
            S.sort((function(e, t) {
                return t - e
            }
            )).forEach((function(e) {
                t.$wrapperEl.prepend(f(u[e], e))
            }
            )),
            t.$wrapperEl.children(".swiper-slide").css(g, E + "px"),
            C()
        },
        renderSlide: function(e, t) {
            var i = this.params.virtual;
            if (i.cache && this.virtual.cache[t])
                return this.virtual.cache[t];
            var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t),
            i.cache && (this.virtual.cache[t] = a),
            a
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length"in e)
                for (var t = 0; t < e.length; t += 1)
                    e[t] && this.virtual.slides.push(e[t]);
            else
                this.virtual.slides.push(e);
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this.activeIndex
              , i = t + 1
              , s = 1;
            if (Array.isArray(e)) {
                for (var a = 0; a < e.length; a += 1)
                    e[a] && this.virtual.slides.unshift(e[a]);
                i = t + e.length,
                s = e.length
            } else
                this.virtual.slides.unshift(e);
            if (this.params.virtual.cache) {
                var r = this.virtual.cache
                  , n = {};
                Object.keys(r).forEach((function(e) {
                    var t = r[e]
                      , i = t.attr("data-swiper-slide-index");
                    i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
                    n[parseInt(e, 10) + s] = t
                }
                )),
                this.virtual.cache = n
            }
            this.virtual.update(!0),
            this.slideTo(i, 0)
        },
        removeSlide: function(e) {
            if (null != e) {
                var t = this.activeIndex;
                if (Array.isArray(e))
                    for (var i = e.length - 1; i >= 0; i -= 1)
                        this.virtual.slides.splice(e[i], 1),
                        this.params.virtual.cache && delete this.virtual.cache[e[i]],
                        e[i] < t && (t -= 1),
                        t = Math.max(t, 0);
                else
                    this.virtual.slides.splice(e, 1),
                    this.params.virtual.cache && delete this.virtual.cache[e],
                    e < t && (t -= 1),
                    t = Math.max(t, 0);
                this.virtual.update(!0),
                this.slideTo(t, 0)
            }
        },
        removeAllSlides: function() {
            this.virtual.slides = [],
            this.params.virtual.cache && (this.virtual.cache = {}),
            this.virtual.update(!0),
            this.slideTo(0, 0)
        }
    }
      , J = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            n.extend(this, {
                virtual: {
                    update: Q.update.bind(this),
                    appendSlide: Q.appendSlide.bind(this),
                    prependSlide: Q.prependSlide.bind(this),
                    removeSlide: Q.removeSlide.bind(this),
                    removeAllSlides: Q.removeAllSlides.bind(this),
                    renderSlide: Q.renderSlide.bind(this),
                    slides: this.params.virtual.slides,
                    cache: {}
                }
            })
        },
        on: {
            beforeInit: function() {
                if (this.params.virtual.enabled) {
                    this.classNames.push(this.params.containerModifierClass + "virtual");
                    var e = {
                        watchSlidesProgress: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e),
                    this.params.initialSlide || this.virtual.update()
                }
            },
            setTranslate: function() {
                this.params.virtual.enabled && this.virtual.update()
            }
        }
    }
      , ee = {
        handle: function(i) {
            var s = this.rtlTranslate
              , a = i;
            a.originalEvent && (a = a.originalEvent);
            var r = a.keyCode || a.charCode;
            if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r))
                return !1;
            if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r))
                return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
                    var n = !1;
                    if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length)
                        return;
                    var o = t.innerWidth
                      , l = t.innerHeight
                      , d = this.$el.offset();
                    s && (d.left -= this.$el[0].scrollLeft);
                    for (var h = [[d.left, d.top], [d.left + this.width, d.top], [d.left, d.top + this.height], [d.left + this.width, d.top + this.height]], p = 0; p < h.length; p += 1) {
                        var c = h[p];
                        c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0)
                    }
                    if (!n)
                        return
                }
                this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(),
                (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                34 !== r && 40 !== r || this.slideNext(),
                33 !== r && 38 !== r || this.slidePrev()),
                this.emit("keyPress", r)
            }
        },
        enable: function() {
            this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle),
            this.keyboard.enabled = !0)
        },
        disable: function() {
            this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle),
            this.keyboard.enabled = !1)
        }
    }
      , te = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0
            }
        },
        create: function() {
            n.extend(this, {
                keyboard: {
                    enabled: !1,
                    enable: ee.enable.bind(this),
                    disable: ee.disable.bind(this),
                    handle: ee.handle.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.keyboard.enabled && this.keyboard.enable()
            },
            destroy: function() {
                this.keyboard.enabled && this.keyboard.disable()
            }
        }
    };
    var ie = {
        lastScrollTime: n.now(),
        event: function() {
            return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var t = "onwheel"in e;
                if (!t) {
                    var i = e.createElement("div");
                    i.setAttribute("onwheel", "return;"),
                    t = "function" == typeof i.onwheel
                }
                return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                t
            }() ? "wheel" : "mousewheel"
        },
        normalize: function(e) {
            var t = 0
              , i = 0
              , s = 0
              , a = 0;
            return "detail"in e && (i = e.detail),
            "wheelDelta"in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = i,
            i = 0),
            s = 10 * t,
            a = 10 * i,
            "deltaY"in e && (a = e.deltaY),
            "deltaX"in e && (s = e.deltaX),
            e.shiftKey && !s && (s = a,
            a = 0),
            (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40,
            a *= 40) : (s *= 800,
            a *= 800)),
            s && !t && (t = s < 1 ? -1 : 1),
            a && !i && (i = a < 1 ? -1 : 1),
            {
                spinX: t,
                spinY: i,
                pixelX: s,
                pixelY: a
            }
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1
        },
        handle: function(e) {
            var i = e
              , s = this
              , a = s.params.mousewheel;
            if (s.params.cssMode && i.preventDefault(),
            !s.mouseEntered && !a.releaseOnEdges)
                return !0;
            i.originalEvent && (i = i.originalEvent);
            var r = 0
              , o = s.rtlTranslate ? -1 : 1
              , l = ie.normalize(i);
            if (a.forceToAxis)
                if (s.isHorizontal()) {
                    if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY)))
                        return !0;
                    r = l.pixelX * o
                } else {
                    if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX)))
                        return !0;
                    r = l.pixelY
                }
            else
                r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
            if (0 === r)
                return !0;
            if (a.invert && (r = -r),
            s.params.freeMode) {
                s.params.loop && s.loopFix();
                var d = s.getTranslate() + r * a.sensitivity
                  , h = s.isBeginning
                  , p = s.isEnd;
                if (d >= s.minTranslate() && (d = s.minTranslate()),
                d <= s.maxTranslate() && (d = s.maxTranslate()),
                s.setTransition(0),
                s.setTranslate(d),
                s.updateProgress(),
                s.updateActiveIndex(),
                s.updateSlidesClasses(),
                (!h && s.isBeginning || !p && s.isEnd) && s.updateSlidesClasses(),
                s.params.freeModeSticky && (clearTimeout(s.mousewheel.timeout),
                s.mousewheel.timeout = n.nextTick((function() {
                    s.slideToClosest()
                }
                ), 300)),
                s.emit("scroll", i),
                s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(),
                d === s.minTranslate() || d === s.maxTranslate())
                    return !0
            } else {
                if (n.now() - s.mousewheel.lastScrollTime > 60)
                    if (r < 0)
                        if (s.isEnd && !s.params.loop || s.animating) {
                            if (a.releaseOnEdges)
                                return !0
                        } else
                            s.slideNext(),
                            s.emit("scroll", i);
                    else if (s.isBeginning && !s.params.loop || s.animating) {
                        if (a.releaseOnEdges)
                            return !0
                    } else
                        s.slidePrev(),
                        s.emit("scroll", i);
                s.mousewheel.lastScrollTime = (new t.Date).getTime()
            }
            return i.preventDefault ? i.preventDefault() : i.returnValue = !1,
            !1
        },
        enable: function() {
            var e = ie.event();
            if (this.params.cssMode)
                return this.wrapperEl.removeEventListener(e, this.mousewheel.handle),
                !0;
            if (!e)
                return !1;
            if (this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)),
            t.on("mouseenter", this.mousewheel.handleMouseEnter),
            t.on("mouseleave", this.mousewheel.handleMouseLeave),
            t.on(e, this.mousewheel.handle),
            this.mousewheel.enabled = !0,
            !0
        },
        disable: function() {
            var e = ie.event();
            if (this.params.cssMode)
                return this.wrapperEl.addEventListener(e, this.mousewheel.handle),
                !0;
            if (!e)
                return !1;
            if (!this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)),
            t.off(e, this.mousewheel.handle),
            this.mousewheel.enabled = !1,
            !0
        }
    }
      , se = {
        update: function() {
            var e = this.params.navigation;
            if (!this.params.loop) {
                var t = this.navigation
                  , i = t.$nextEl
                  , s = t.$prevEl;
                s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass),
                s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)),
                i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass),
                i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick: function(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init: function() {
            var e, t, i = this.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl),
            this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))),
            i.prevEl && (t = s(i.prevEl),
            this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))),
            e && e.length > 0 && e.on("click", this.navigation.onNextClick),
            t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
            n.extend(this.navigation, {
                $nextEl: e,
                nextEl: e && e[0],
                $prevEl: t,
                prevEl: t && t[0]
            }))
        },
        destroy: function() {
            var e = this.navigation
              , t = e.$nextEl
              , i = e.$prevEl;
            t && t.length && (t.off("click", this.navigation.onNextClick),
            t.removeClass(this.params.navigation.disabledClass)),
            i && i.length && (i.off("click", this.navigation.onPrevClick),
            i.removeClass(this.params.navigation.disabledClass))
        }
    }
      , ae = {
        update: function() {
            var e = this.rtl
              , t = this.params.pagination;
            if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length, r = this.pagination.$el, n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides),
                i > n - 1 && (i -= n),
                i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0,
                "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                    var o, l, d, h = this.pagination.bullets;
                    if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                    r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"),
                    t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex,
                    this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)),
                    o = i - this.pagination.dynamicBulletIndex,
                    d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2),
                    h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"),
                    r.length > 1)
                        h.each((function(e, a) {
                            var r = s(a)
                              , n = r.index();
                            n === i && r.addClass(t.bulletActiveClass),
                            t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"),
                            n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                            n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        }
                        ));
                    else {
                        var p = h.eq(i)
                          , c = p.index();
                        if (p.addClass(t.bulletActiveClass),
                        t.dynamicBullets) {
                            for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1)
                                h.eq(f).addClass(t.bulletActiveClass + "-main");
                            if (this.params.loop)
                                if (c >= h.length - t.dynamicMainBullets) {
                                    for (var m = t.dynamicMainBullets; m >= 0; m -= 1)
                                        h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
                                    h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                                } else
                                    u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                    v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
                            else
                                u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                        }
                    }
                    if (t.dynamicBullets) {
                        var g = Math.min(h.length, t.dynamicMainBullets + 4)
                          , b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize
                          , w = e ? "right" : "left";
                        h.css(this.isHorizontal() ? w : "top", b + "px")
                    }
                }
                if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)),
                r.find("." + t.totalClass).text(t.formatFractionTotal(n))),
                "progressbar" === t.type) {
                    var y;
                    y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                    var x = (i + 1) / n
                      , T = 1
                      , E = 1;
                    "horizontal" === y ? T = x : E = x,
                    r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")").transition(this.params.speed)
                }
                "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)),
                this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]),
                r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
            }
        },
        render: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length
                  , i = this.pagination.$el
                  , s = "";
                if ("bullets" === e.type) {
                    for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)
                        e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                    i.html(s),
                    this.pagination.bullets = i.find("." + e.bulletClass)
                }
                "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>',
                i.html(s)),
                "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>',
                i.html(s)),
                "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
            }
        },
        init: function() {
            var e = this
              , t = e.params.pagination;
            if (t.el) {
                var i = s(t.el);
                0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)),
                "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
                i.addClass(t.modifierClass + t.type),
                "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
                e.pagination.dynamicBulletIndex = 0,
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass),
                t.clickable && i.on("click", "." + t.bulletClass, (function(t) {
                    t.preventDefault();
                    var i = s(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (i += e.loopedSlides),
                    e.slideTo(i)
                }
                )),
                n.extend(e.pagination, {
                    $el: i,
                    el: i[0]
                }))
            }
        },
        destroy: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.pagination.$el;
                t.removeClass(e.hiddenClass),
                t.removeClass(e.modifierClass + e.type),
                this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass),
                e.clickable && t.off("click", "." + e.bulletClass)
            }
        }
    }
      , re = {
        setTranslate: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                  , t = this.rtlTranslate
                  , i = this.progress
                  , s = e.dragSize
                  , a = e.trackSize
                  , r = e.$dragEl
                  , n = e.$el
                  , o = this.params.scrollbar
                  , l = s
                  , d = (a - s) * i;
                t ? (d = -d) > 0 ? (l = s - d,
                d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d,
                d = 0) : d + s > a && (l = a - d),
                this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"),
                r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"),
                r[0].style.height = l + "px"),
                o.hide && (clearTimeout(this.scrollbar.timeout),
                n[0].style.opacity = 1,
                this.scrollbar.timeout = setTimeout((function() {
                    n[0].style.opacity = 0,
                    n.transition(400)
                }
                ), 1e3))
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                  , t = e.$dragEl
                  , i = e.$el;
                t[0].style.width = "",
                t[0].style.height = "";
                var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize, o = r * (a / this.size);
                s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10),
                this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px",
                i[0].style.display = r >= 1 ? "none" : "",
                this.params.scrollbar.hide && (i[0].style.opacity = 0),
                n.extend(e, {
                    trackSize: a,
                    divider: r,
                    moveDivider: o,
                    dragSize: s
                }),
                e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
            }
        },
        getPointerPosition: function(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        },
        setDragPosition: function(e) {
            var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize, o = i.dragStartPos;
            t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r),
            t = Math.max(Math.min(t, 1), 0),
            s && (t = 1 - t);
            var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
            this.updateProgress(l),
            this.setTranslate(l),
            this.updateActiveIndex(),
            this.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this.params.scrollbar
              , i = this.scrollbar
              , s = this.$wrapperEl
              , a = i.$el
              , r = i.$dragEl;
            this.scrollbar.isTouched = !0,
            this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            s.transition(100),
            r.transition(100),
            i.setDragPosition(e),
            clearTimeout(this.scrollbar.dragTimeout),
            a.transition(0),
            t.hide && a.css("opacity", 1),
            this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"),
            this.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this.scrollbar
              , i = this.$wrapperEl
              , s = t.$el
              , a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            t.setDragPosition(e),
            i.transition(0),
            s.transition(0),
            a.transition(0),
            this.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this.params.scrollbar
              , i = this.scrollbar
              , s = this.$wrapperEl
              , a = i.$el;
            this.scrollbar.isTouched && (this.scrollbar.isTouched = !1,
            this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""),
            s.transition("")),
            t.hide && (clearTimeout(this.scrollbar.dragTimeout),
            this.scrollbar.dragTimeout = n.nextTick((function() {
                a.css("opacity", 0),
                a.transition(400)
            }
            ), 1e3)),
            this.emit("scrollbarDragEnd", e),
            t.snapOnRelease && this.slideToClosest())
        },
        enableDraggable: function() {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar
                  , i = this.touchEventsTouch
                  , s = this.touchEventsDesktop
                  , a = this.params
                  , r = t.$el[0]
                  , n = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , l = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n),
                r.addEventListener(i.move, this.scrollbar.onDragMove, n),
                r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n),
                e.addEventListener(s.move, this.scrollbar.onDragMove, n),
                e.addEventListener(s.end, this.scrollbar.onDragEnd, l))
            }
        },
        disableDraggable: function() {
            if (this.params.scrollbar.el) {
                var t = this.scrollbar
                  , i = this.touchEventsTouch
                  , s = this.touchEventsDesktop
                  , a = this.params
                  , r = t.$el[0]
                  , n = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                  , l = !(!o.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n),
                r.removeEventListener(i.move, this.scrollbar.onDragMove, n),
                r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n),
                e.removeEventListener(s.move, this.scrollbar.onDragMove, n),
                e.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
            }
        },
        init: function() {
            if (this.params.scrollbar.el) {
                var e = this.scrollbar
                  , t = this.$el
                  , i = this.params.scrollbar
                  , a = s(i.el);
                this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                var r = a.find("." + this.params.scrollbar.dragClass);
                0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'),
                a.append(r)),
                n.extend(e, {
                    $el: a,
                    el: a[0],
                    $dragEl: r,
                    dragEl: r[0]
                }),
                i.draggable && e.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
      , ne = {
        setTransform: function(e, t) {
            var i = this.rtl
              , a = s(e)
              , r = i ? -1 : 1
              , n = a.attr("data-swiper-parallax") || "0"
              , o = a.attr("data-swiper-parallax-x")
              , l = a.attr("data-swiper-parallax-y")
              , d = a.attr("data-swiper-parallax-scale")
              , h = a.attr("data-swiper-parallax-opacity");
            if (o || l ? (o = o || "0",
            l = l || "0") : this.isHorizontal() ? (o = n,
            l = "0") : (l = n,
            o = "0"),
            o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px",
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px",
            null != h) {
                var p = h - (h - 1) * (1 - Math.abs(t));
                a[0].style.opacity = p
            }
            if (null == d)
                a.transform("translate3d(" + o + ", " + l + ", 0px)");
            else {
                var c = d - (d - 1) * (1 - Math.abs(t));
                a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
            }
        },
        setTranslate: function() {
            var e = this
              , t = e.$el
              , i = e.slides
              , a = e.progress
              , r = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                e.parallax.setTransform(i, a)
            }
            )),
            i.each((function(t, i) {
                var n = i.progress;
                e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)),
                n = Math.min(Math.max(n, -1), 1),
                s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                    e.parallax.setTransform(i, n)
                }
                ))
            }
            ))
        },
        setTransition: function(e) {
            void 0 === e && (e = this.params.speed);
            this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                var a = s(i)
                  , r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                0 === e && (r = 0),
                a.transition(r)
            }
            ))
        }
    }
      , oe = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
              , i = e.targetTouches[0].pageY
              , s = e.targetTouches[1].pageX
              , a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
        },
        onGestureStart: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , a = i.gesture;
            if (i.fakeGestureTouched = !1,
            i.fakeGestureMoved = !1,
            !o.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureTouched = !0,
                a.scaleStart = oe.getDistanceBetweenTouches(e)
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest(".swiper-slide"),
            0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)),
            a.$imageEl = a.$slideEl.find("img, svg, canvas"),
            a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass),
            a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio,
            0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0),
            this.zoom.isScaling = !0) : a.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!o.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                i.fakeGestureMoved = !0,
                s.scaleMove = oe.getDistanceBetweenTouches(e)
            }
            s.$imageEl && 0 !== s.$imageEl.length && (o.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale,
            i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)),
            i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)),
            s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
        },
        onGestureEnd: function(e) {
            var t = this.params.zoom
              , i = this.zoom
              , s = i.gesture;
            if (!o.gestures) {
                if (!i.fakeGestureTouched || !i.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !I.android)
                    return;
                i.fakeGestureTouched = !1,
                i.fakeGestureMoved = !1
            }
            s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio),
            s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"),
            i.currentScale = i.scale,
            i.isScaling = !1,
            1 === i.scale && (s.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.zoom
              , i = t.gesture
              , s = t.image;
            i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (I.android && e.preventDefault(),
            s.isTouched = !0,
            s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
            s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this.zoom
              , i = t.gesture
              , s = t.image
              , a = t.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1,
            s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                s.height = i.$imageEl[0].offsetHeight,
                s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0,
                s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0,
                i.slideWidth = i.$slideEl[0].offsetWidth,
                i.slideHeight = i.$slideEl[0].offsetHeight,
                i.$imageWrapEl.transition(0),
                this.rtl && (s.startX = -s.startX,
                s.startY = -s.startY));
                var r = s.width * t.scale
                  , o = s.height * t.scale;
                if (!(r < i.slideWidth && o < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0),
                    s.maxX = -s.minX,
                    s.minY = Math.min(i.slideHeight / 2 - o / 2, 0),
                    s.maxY = -s.minY,
                    s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                    s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !s.isMoved && !t.isScaling) {
                        if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                            return void (s.isTouched = !1);
                        if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                            return void (s.isTouched = !1)
                    }
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.isMoved = !0,
                    s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                    s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                    s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                    s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                    s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                    s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                    a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
                    a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
                    a.prevTime || (a.prevTime = Date.now()),
                    a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2,
                    a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2,
                    Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                    Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                    a.prevPositionX = s.touchesCurrent.x,
                    a.prevPositionY = s.touchesCurrent.y,
                    a.prevTime = Date.now(),
                    i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
              , t = e.gesture
              , i = e.image
              , s = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved)
                    return i.isTouched = !1,
                    void (i.isMoved = !1);
                i.isTouched = !1,
                i.isMoved = !1;
                var a = 300
                  , r = 300
                  , n = s.x * a
                  , o = i.currentX + n
                  , l = s.y * r
                  , d = i.currentY + l;
                0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)),
                0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                var h = Math.max(a, r);
                i.currentX = o,
                i.currentY = d;
                var p = i.width * e.scale
                  , c = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - p / 2, 0),
                i.maxX = -i.minX,
                i.minY = Math.min(t.slideHeight / 2 - c / 2, 0),
                i.maxY = -i.minY,
                i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
                i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
                t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom
              , t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            e.currentScale = 1,
            t.$slideEl = void 0,
            t.$imageEl = void 0,
            t.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, i, a, r, n, o, l, d, h, p, c, u, v, f, m, g, b = this.zoom, w = this.params.zoom, y = b.gesture, x = b.image;
            (y.$slideEl || (y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex),
            y.$imageEl = y.$slideEl.find("img, svg, canvas"),
            y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)),
            y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass),
            void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x,
            i = x.touchesStart.y),
            b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
            b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
            e ? (m = y.$slideEl[0].offsetWidth,
            g = y.$slideEl[0].offsetHeight,
            a = y.$slideEl.offset().left + m / 2 - t,
            r = y.$slideEl.offset().top + g / 2 - i,
            l = y.$imageEl[0].offsetWidth,
            d = y.$imageEl[0].offsetHeight,
            h = l * b.scale,
            p = d * b.scale,
            v = -(c = Math.min(m / 2 - h / 2, 0)),
            f = -(u = Math.min(g / 2 - p / 2, 0)),
            (n = a * b.scale) < c && (n = c),
            n > v && (n = v),
            (o = r * b.scale) < u && (o = u),
            o > f && (o = f)) : (n = 0,
            o = 0),
            y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"),
            y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
        },
        out: function() {
            var e = this.zoom
              , t = this.params.zoom
              , i = e.gesture;
            i.$slideEl || (i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex),
            i.$imageEl = i.$slideEl.find("img, svg, canvas"),
            i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)),
            i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1,
            e.currentScale = 1,
            i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            i.$slideEl.removeClass("" + t.zoomedSlideClass),
            i.$slideEl = void 0)
        },
        enable: function() {
            var e = this.zoom;
            if (!e.enabled) {
                e.enabled = !0;
                var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , i = !o.passiveListener || {
                    passive: !1,
                    capture: !0
                };
                o.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t),
                this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t),
                this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i),
                this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t),
                this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)),
                this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
            }
        },
        disable: function() {
            var e = this.zoom;
            if (e.enabled) {
                this.zoom.enabled = !1;
                var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                  , i = !o.passiveListener || {
                    passive: !1,
                    capture: !0
                };
                o.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t),
                this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t),
                this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, i),
                this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t),
                this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, ".swiper-slide", e.onGestureEnd, t)),
                this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
            }
        }
    }
      , le = {
        loadInSlide: function(e, t) {
            void 0 === t && (t = !0);
            var i = this
              , a = i.params.lazy;
            if (void 0 !== e && 0 !== i.slides.length) {
                var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e)
                  , n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])),
                0 !== n.length && n.each((function(e, n) {
                    var o = s(n);
                    o.addClass(a.loadingClass);
                    var l = o.attr("data-background")
                      , d = o.attr("data-src")
                      , h = o.attr("data-srcset")
                      , p = o.attr("data-sizes");
                    i.loadImage(o[0], d || l, h, p, !1, (function() {
                        if (null != i && i && (!i || i.params) && !i.destroyed) {
                            if (l ? (o.css("background-image", 'url("' + l + '")'),
                            o.removeAttr("data-background")) : (h && (o.attr("srcset", h),
                            o.removeAttr("data-srcset")),
                            p && (o.attr("sizes", p),
                            o.removeAttr("data-sizes")),
                            d && (o.attr("src", d),
                            o.removeAttr("data-src"))),
                            o.addClass(a.loadedClass).removeClass(a.loadingClass),
                            r.find("." + a.preloaderClass).remove(),
                            i.params.loop && t) {
                                var e = r.attr("data-swiper-slide-index");
                                if (r.hasClass(i.params.slideDuplicateClass)) {
                                    var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                    i.lazy.loadInSlide(s.index(), !1)
                                } else {
                                    var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    i.lazy.loadInSlide(n.index(), !1)
                                }
                            }
                            i.emit("lazyImageReady", r[0], o[0])
                        }
                    }
                    )),
                    i.emit("lazyImageLoad", r[0], o[0])
                }
                ))
            }
        },
        load: function() {
            var e = this
              , t = e.$wrapperEl
              , i = e.params
              , a = e.slides
              , r = e.activeIndex
              , n = e.virtual && i.virtual.enabled
              , o = i.lazy
              , l = i.slidesPerView;
            function d(e) {
                if (n) {
                    if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (a[e])
                    return !0;
                return !1
            }
            function h(e) {
                return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
            }
            if ("auto" === l && (l = 0),
            e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
            e.params.watchSlidesVisibility)
                t.children("." + i.slideVisibleClass).each((function(t, i) {
                    var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                    e.lazy.loadInSlide(a)
                }
                ));
            else if (l > 1)
                for (var p = r; p < r + l; p += 1)
                    d(p) && e.lazy.loadInSlide(p);
            else
                e.lazy.loadInSlide(r);
            if (o.loadPrevNext)
                if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                    for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1)
                        d(m) && e.lazy.loadInSlide(m);
                    for (var g = f; g < r; g += 1)
                        d(g) && e.lazy.loadInSlide(g)
                } else {
                    var b = t.children("." + i.slideNextClass);
                    b.length > 0 && e.lazy.loadInSlide(h(b));
                    var w = t.children("." + i.slidePrevClass);
                    w.length > 0 && e.lazy.loadInSlide(h(w))
                }
        }
    }
      , de = {
        LinearSpline: function(e, t) {
            var i, s, a, r, n, o = function(e, t) {
                for (s = -1,
                i = e.length; i - s > 1; )
                    e[a = i + s >> 1] <= t ? s = a : i = a;
                return i
            };
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (n = o(this.x, e),
                r = n - 1,
                (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
            }
            ,
            this
        },
        getInterpolateFunction: function(e) {
            this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid,e.slidesGrid) : new de.LinearSpline(this.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            var i, s, a = this, r = a.controller.control;
            function n(e) {
                var t = a.rtlTranslate ? -a.translate : a.translate;
                "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e),
                s = -a.controller.spline.interpolate(-t)),
                s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()),
                s = (t - a.minTranslate()) * i + e.minTranslate()),
                a.params.controller.inverse && (s = e.maxTranslate() - s),
                e.updateProgress(s),
                e.setTranslate(s, a),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            if (Array.isArray(r))
                for (var o = 0; o < r.length; o += 1)
                    r[o] !== t && r[o]instanceof R && n(r[o]);
            else
                r instanceof R && t !== r && n(r)
        },
        setTransition: function(e, t) {
            var i, s = this, a = s.controller.control;
            function r(t) {
                t.setTransition(e, s),
                0 !== e && (t.transitionStart(),
                t.params.autoHeight && n.nextTick((function() {
                    t.updateAutoHeight()
                }
                )),
                t.$wrapperEl.transitionEnd((function() {
                    a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(),
                    t.transitionEnd())
                }
                )))
            }
            if (Array.isArray(a))
                for (i = 0; i < a.length; i += 1)
                    a[i] !== t && a[i]instanceof R && r(a[i]);
            else
                a instanceof R && t !== a && r(a)
        }
    }
      , he = {
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
            e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
            e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
            e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
            e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
            e
        },
        onEnterKey: function(e) {
            var t = this.params.a11y;
            if (13 === e.keyCode) {
                var i = s(e.target);
                this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(),
                this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)),
                this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(),
                this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)),
                this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
            t.html(e))
        },
        updateNavigation: function() {
            if (!this.params.loop) {
                var e = this.navigation
                  , t = e.$nextEl
                  , i = e.$prevEl;
                i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)),
                t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
            }
        },
        updatePagination: function() {
            var e = this
              , t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(i, a) {
                var r = s(a);
                e.a11y.makeElFocusable(r),
                e.a11y.addElRole(r, "button"),
                e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
            }
            ))
        },
        init: function() {
            this.$el.append(this.a11y.liveRegion);
            var e, t, i = this.params.a11y;
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
            this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
            e && (this.a11y.makeElFocusable(e),
            this.a11y.addElRole(e, "button"),
            this.a11y.addElLabel(e, i.nextSlideMessage),
            e.on("keydown", this.a11y.onEnterKey)),
            t && (this.a11y.makeElFocusable(t),
            this.a11y.addElRole(t, "button"),
            this.a11y.addElLabel(t, i.prevSlideMessage),
            t.on("keydown", this.a11y.onEnterKey)),
            this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        },
        destroy: function() {
            var e, t;
            this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(),
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
            this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
            e && e.off("keydown", this.a11y.onEnterKey),
            t && t.off("keydown", this.a11y.onEnterKey),
            this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }
    }
      , pe = {
        init: function() {
            if (this.params.history) {
                if (!t.history || !t.history.pushState)
                    return this.params.history.enabled = !1,
                    void (this.params.hashNavigation.enabled = !0);
                var e = this.history;
                e.initialized = !0,
                e.paths = pe.getPathValues(),
                (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit),
                this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
            }
        },
        destroy: function() {
            this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            this.history.paths = pe.getPathValues(),
            this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues: function() {
            var e = t.location.pathname.slice(1).split("/").filter((function(e) {
                return "" !== e
            }
            ))
              , i = e.length;
            return {
                key: e[i - 2],
                value: e[i - 1]
            }
        },
        setHistory: function(e, i) {
            if (this.history.initialized && this.params.history.enabled) {
                var s = this.slides.eq(i)
                  , a = pe.slugify(s.attr("data-history"));
                t.location.pathname.includes(e) || (a = e + "/" + a);
                var r = t.history.state;
                r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({
                    value: a
                }, null, a) : t.history.pushState({
                    value: a
                }, null, a))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, i) {
            if (t)
                for (var s = 0, a = this.slides.length; s < a; s += 1) {
                    var r = this.slides.eq(s);
                    if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                        var n = r.index();
                        this.slideTo(n, e, i)
                    }
                }
            else
                this.slideTo(0, e, i)
        }
    }
      , ce = {
        onHashCange: function() {
            var t = e.location.hash.replace("#", "");
            if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i)
                    return;
                this.slideTo(i)
            }
        },
        setHash: function() {
            if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState)
                    t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                else {
                    var i = this.slides.eq(this.activeIndex)
                      , s = i.attr("data-hash") || i.attr("data-history");
                    e.location.hash = s || ""
                }
        },
        init: function() {
            if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                this.hashNavigation.initialized = !0;
                var i = e.location.hash.replace("#", "");
                if (i)
                    for (var a = 0, r = this.slides.length; a < r; a += 1) {
                        var n = this.slides.eq(a);
                        if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                            var o = n.index();
                            this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                        }
                    }
                this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
      , ue = {
        run: function() {
            var e = this
              , t = e.slides.eq(e.activeIndex)
              , i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            clearTimeout(e.autoplay.timeout),
            e.autoplay.timeout = n.nextTick((function() {
                e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0),
                e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0),
                e.emit("autoplay")),
                e.params.cssMode && e.autoplay.running && e.autoplay.run()
            }
            ), i)
        },
        start: function() {
            return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0,
            this.emit("autoplayStart"),
            this.autoplay.run(),
            !0))
        },
        stop: function() {
            return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout),
            this.autoplay.timeout = void 0),
            this.autoplay.running = !1,
            this.emit("autoplayStop"),
            !0))
        },
        pause: function(e) {
            this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
            this.autoplay.paused = !0,
            0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd),
            this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1,
            this.autoplay.run())))
        }
    }
      , ve = {
        setTranslate: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = this.slides.eq(t)
                  , s = -i[0].swiperSlideOffset;
                this.params.virtualTranslate || (s -= this.translate);
                var a = 0;
                this.isHorizontal() || (a = s,
                s = 0);
                var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({
                    opacity: r
                }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var t = this
              , i = t.slides
              , s = t.$wrapperEl;
            if (i.transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var a = !1;
                i.transitionEnd((function() {
                    if (!a && t && !t.destroyed) {
                        a = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            s.trigger(e[i])
                    }
                }
                ))
            }
        }
    }
      , fe = {
        setTranslate: function() {
            var e, t = this.$el, i = this.$wrapperEl, a = this.slides, r = this.width, n = this.height, o = this.rtlTranslate, l = this.size, d = this.params.cubeEffect, h = this.isHorizontal(), p = this.virtual && this.params.virtual.enabled, c = 0;
            d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'),
            i.append(e)),
            e.css({
                height: r + "px"
            })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'),
            t.append(e)));
            for (var u = 0; u < a.length; u += 1) {
                var v = a.eq(u)
                  , f = u;
                p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                var m = 90 * f
                  , g = Math.floor(m / 360);
                o && (m = -m,
                g = Math.floor(-m / 360));
                var b = Math.max(Math.min(v[0].progress, 1), -1)
                  , w = 0
                  , y = 0
                  , x = 0;
                f % 4 == 0 ? (w = 4 * -g * l,
                x = 0) : (f - 1) % 4 == 0 ? (w = 0,
                x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l,
                x = l) : (f - 3) % 4 == 0 && (w = -l,
                x = 3 * l + 4 * l * g),
                o && (w = -w),
                h || (y = w,
                w = 0);
                var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                if (b <= 1 && b > -1 && (c = 90 * f + 90 * b,
                o && (c = 90 * -f - 90 * b)),
                v.transform(T),
                d.slideShadows) {
                    var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                      , C = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'),
                    v.append(E)),
                    0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'),
                    v.append(C)),
                    E.length && (E[0].style.opacity = Math.max(-b, 0)),
                    C.length && (C[0].style.opacity = Math.max(b, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }),
            d.shadow)
                if (h)
                    e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                else {
                    var S = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90)
                      , M = 1.5 - (Math.sin(2 * S * Math.PI / 360) / 2 + Math.cos(2 * S * Math.PI / 360) / 2)
                      , P = d.shadowScale
                      , z = d.shadowScale / M
                      , k = d.shadowOffset;
                    e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
                }
            var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }
      , me = {
        setTranslate: function() {
            for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                var a = e.eq(i)
                  , r = a[0].progress;
                this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                var n = -180 * r
                  , o = 0
                  , l = -a[0].swiperSlideOffset
                  , d = 0;
                if (this.isHorizontal() ? t && (n = -n) : (d = l,
                l = 0,
                o = -n,
                n = 0),
                a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length,
                this.params.flipEffect.slideShadows) {
                    var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top")
                      , p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                    0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'),
                    a.append(h)),
                    0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'),
                    a.append(p)),
                    h.length && (h[0].style.opacity = Math.max(-r, 0)),
                    p.length && (p[0].style.opacity = Math.max(r, 0))
                }
                a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
            }
        },
        setTransition: function(e) {
            var t = this
              , i = t.slides
              , s = t.activeIndex
              , a = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var r = !1;
                i.eq(s).transitionEnd((function() {
                    if (!r && t && !t.destroyed) {
                        r = !0,
                        t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            a.trigger(e[i])
                    }
                }
                ))
            }
        }
    }
      , ge = {
        setTranslate: function() {
            for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, p = l ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
                var f = i.eq(u)
                  , m = r[u]
                  , g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier
                  , b = l ? p * g : 0
                  , w = l ? 0 : p * g
                  , y = -c * Math.abs(g)
                  , x = l ? 0 : n.stretch * g
                  , T = l ? n.stretch * g : 0;
                Math.abs(T) < .001 && (T = 0),
                Math.abs(x) < .001 && (x = 0),
                Math.abs(y) < .001 && (y = 0),
                Math.abs(b) < .001 && (b = 0),
                Math.abs(w) < .001 && (w = 0);
                var E = "translate3d(" + T + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                if (f.transform(E),
                f[0].style.zIndex = 1 - Math.abs(Math.round(g)),
                n.slideShadows) {
                    var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top")
                      , S = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'),
                    f.append(C)),
                    0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'),
                    f.append(S)),
                    C.length && (C[0].style.opacity = g > 0 ? g : 0),
                    S.length && (S[0].style.opacity = -g > 0 ? -g : 0)
                }
            }
            (o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
      , be = {
        init: function() {
            var e = this.params.thumbs
              , t = this.constructor;
            e.swiper instanceof t ? (this.thumbs.swiper = e.swiper,
            n.extend(this.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            }),
            n.extend(this.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
            this.thumbs.swiperCreated = !0),
            this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),
            this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
        },
        onThumbClick: function() {
            var e = this.thumbs.swiper;
            if (e) {
                var t = e.clickedIndex
                  , i = e.clickedSlide;
                if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                    var a;
                    if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t,
                    this.params.loop) {
                        var r = this.activeIndex;
                        this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(),
                        this._clientLeft = this.$wrapperEl[0].clientLeft,
                        r = this.activeIndex);
                        var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index()
                          , o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                        a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                    }
                    this.slideTo(a)
                }
            }
        },
        update: function(e) {
            var t = this.thumbs.swiper;
            if (t) {
                var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                if (this.realIndex !== t.realIndex) {
                    var s, a = t.activeIndex;
                    if (t.params.loop) {
                        t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(),
                        t._clientLeft = t.$wrapperEl[0].clientLeft,
                        a = t.activeIndex);
                        var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index()
                          , n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                        s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
                    } else
                        s = this.realIndex;
                    t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1),
                    t.slideTo(s, e ? 0 : void 0))
                }
                var o = 1
                  , l = this.params.thumbs.slideThumbActiveClass;
                if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView),
                t.slides.removeClass(l),
                t.params.loop || t.params.virtual && t.params.virtual.enabled)
                    for (var d = 0; d < o; d += 1)
                        t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l);
                else
                    for (var h = 0; h < o; h += 1)
                        t.slides.eq(this.realIndex + h).addClass(l)
            }
        }
    }
      , we = [W, q, K, U, Z, J, te, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarged: "container"
            }
        },
        create: function() {
            n.extend(this, {
                mousewheel: {
                    enabled: !1,
                    enable: ie.enable.bind(this),
                    disable: ie.disable.bind(this),
                    handle: ie.handle.bind(this),
                    handleMouseEnter: ie.handleMouseEnter.bind(this),
                    handleMouseLeave: ie.handleMouseLeave.bind(this),
                    lastScrollTime: n.now()
                }
            })
        },
        on: {
            init: function() {
                !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(),
                this.params.mousewheel.enabled && this.mousewheel.enable()
            },
            destroy: function() {
                this.params.cssMode && this.mousewheel.enable(),
                this.mousewheel.enabled && this.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            n.extend(this, {
                navigation: {
                    init: se.init.bind(this),
                    update: se.update.bind(this),
                    destroy: se.destroy.bind(this),
                    onNextClick: se.onNextClick.bind(this),
                    onPrevClick: se.onPrevClick.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.navigation.init(),
                this.navigation.update()
            },
            toEdge: function() {
                this.navigation.update()
            },
            fromEdge: function() {
                this.navigation.update()
            },
            destroy: function() {
                this.navigation.destroy()
            },
            click: function(e) {
                var t, i = this.navigation, a = i.$nextEl, r = i.$prevEl;
                !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)),
                !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this),
                a && a.toggleClass(this.params.navigation.hiddenClass),
                r && r.toggleClass(this.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            n.extend(this, {
                pagination: {
                    init: ae.init.bind(this),
                    render: ae.render.bind(this),
                    update: ae.update.bind(this),
                    destroy: ae.destroy.bind(this),
                    dynamicBulletIndex: 0
                }
            })
        },
        on: {
            init: function() {
                this.pagination.init(),
                this.pagination.render(),
                this.pagination.update()
            },
            activeIndexChange: function() {
                this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
            },
            snapIndexChange: function() {
                this.params.loop || this.pagination.update()
            },
            slidesLengthChange: function() {
                this.params.loop && (this.pagination.render(),
                this.pagination.update())
            },
            snapGridLengthChange: function() {
                this.params.loop || (this.pagination.render(),
                this.pagination.update())
            },
            destroy: function() {
                this.pagination.destroy()
            },
            click: function(e) {
                this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this),
                this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            n.extend(this, {
                scrollbar: {
                    init: re.init.bind(this),
                    destroy: re.destroy.bind(this),
                    updateSize: re.updateSize.bind(this),
                    setTranslate: re.setTranslate.bind(this),
                    setTransition: re.setTransition.bind(this),
                    enableDraggable: re.enableDraggable.bind(this),
                    disableDraggable: re.disableDraggable.bind(this),
                    setDragPosition: re.setDragPosition.bind(this),
                    getPointerPosition: re.getPointerPosition.bind(this),
                    onDragStart: re.onDragStart.bind(this),
                    onDragMove: re.onDragMove.bind(this),
                    onDragEnd: re.onDragEnd.bind(this),
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }
            })
        },
        on: {
            init: function() {
                this.scrollbar.init(),
                this.scrollbar.updateSize(),
                this.scrollbar.setTranslate()
            },
            update: function() {
                this.scrollbar.updateSize()
            },
            resize: function() {
                this.scrollbar.updateSize()
            },
            observerUpdate: function() {
                this.scrollbar.updateSize()
            },
            setTranslate: function() {
                this.scrollbar.setTranslate()
            },
            setTransition: function(e) {
                this.scrollbar.setTransition(e)
            },
            destroy: function() {
                this.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            n.extend(this, {
                parallax: {
                    setTransform: ne.setTransform.bind(this),
                    setTranslate: ne.setTranslate.bind(this),
                    setTransition: ne.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.parallax.enabled && (this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            init: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTranslate: function() {
                this.params.parallax.enabled && this.parallax.setTranslate()
            },
            setTransition: function(e) {
                this.params.parallax.enabled && this.parallax.setTransition(e)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this
              , t = {
                enabled: !1,
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    $slideEl: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    $imageEl: void 0,
                    $imageWrapEl: void 0,
                    maxRatio: 3
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {
                    x: void 0,
                    y: void 0,
                    prevPositionX: void 0,
                    prevPositionY: void 0,
                    prevTime: void 0
                }
            };
            "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(i) {
                t[i] = oe[i].bind(e)
            }
            )),
            n.extend(e, {
                zoom: t
            });
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function() {
                    return i
                },
                set: function(t) {
                    if (i !== t) {
                        var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0
                          , a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, s, a)
                    }
                    i = t
                }
            })
        },
        on: {
            init: function() {
                this.params.zoom.enabled && this.zoom.enable()
            },
            destroy: function() {
                this.zoom.disable()
            },
            touchStart: function(e) {
                this.zoom.enabled && this.zoom.onTouchStart(e)
            },
            touchEnd: function(e) {
                this.zoom.enabled && this.zoom.onTouchEnd(e)
            },
            doubleTap: function(e) {
                this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
            },
            transitionEnd: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
            },
            slideChange: function() {
                this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            n.extend(this, {
                lazy: {
                    initialImageLoaded: !1,
                    load: le.load.bind(this),
                    loadInSlide: le.loadInSlide.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
            },
            init: function() {
                this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
            },
            scroll: function() {
                this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
            },
            resize: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            scrollbarDragMove: function() {
                this.params.lazy.enabled && this.lazy.load()
            },
            transitionStart: function() {
                this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
            },
            transitionEnd: function() {
                this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
            },
            slideChange: function() {
                this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            n.extend(this, {
                controller: {
                    control: this.params.controller.control,
                    getInterpolateFunction: de.getInterpolateFunction.bind(this),
                    setTranslate: de.setTranslate.bind(this),
                    setTransition: de.setTransition.bind(this)
                }
            })
        },
        on: {
            update: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            resize: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            observerUpdate: function() {
                this.controller.control && this.controller.spline && (this.controller.spline = void 0,
                delete this.controller.spline)
            },
            setTranslate: function(e, t) {
                this.controller.control && this.controller.setTranslate(e, t)
            },
            setTransition: function(e, t) {
                this.controller.control && this.controller.setTransition(e, t)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}"
            }
        },
        create: function() {
            var e = this;
            n.extend(e, {
                a11y: {
                    liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                }
            }),
            Object.keys(he).forEach((function(t) {
                e.a11y[t] = he[t].bind(e)
            }
            ))
        },
        on: {
            init: function() {
                this.params.a11y.enabled && (this.a11y.init(),
                this.a11y.updateNavigation())
            },
            toEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            fromEdge: function() {
                this.params.a11y.enabled && this.a11y.updateNavigation()
            },
            paginationUpdate: function() {
                this.params.a11y.enabled && this.a11y.updatePagination()
            },
            destroy: function() {
                this.params.a11y.enabled && this.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            n.extend(this, {
                history: {
                    init: pe.init.bind(this),
                    setHistory: pe.setHistory.bind(this),
                    setHistoryPopState: pe.setHistoryPopState.bind(this),
                    scrollToSlide: pe.scrollToSlide.bind(this),
                    destroy: pe.destroy.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.history.enabled && this.history.init()
            },
            destroy: function() {
                this.params.history.enabled && this.history.destroy()
            },
            transitionEnd: function() {
                this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
            },
            slideChange: function() {
                this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            n.extend(this, {
                hashNavigation: {
                    initialized: !1,
                    init: ce.init.bind(this),
                    destroy: ce.destroy.bind(this),
                    setHash: ce.setHash.bind(this),
                    onHashCange: ce.onHashCange.bind(this)
                }
            })
        },
        on: {
            init: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.init()
            },
            destroy: function() {
                this.params.hashNavigation.enabled && this.hashNavigation.destroy()
            },
            transitionEnd: function() {
                this.hashNavigation.initialized && this.hashNavigation.setHash()
            },
            slideChange: function() {
                this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            var e = this;
            n.extend(e, {
                autoplay: {
                    running: !1,
                    paused: !1,
                    run: ue.run.bind(e),
                    start: ue.start.bind(e),
                    stop: ue.stop.bind(e),
                    pause: ue.pause.bind(e),
                    onVisibilityChange: function() {
                        "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(),
                        "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(),
                        e.autoplay.paused = !1)
                    },
                    onTransitionEnd: function(t) {
                        e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd),
                        e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd),
                        e.autoplay.paused = !1,
                        e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                    }
                }
            })
        },
        on: {
            init: function() {
                this.params.autoplay.enabled && (this.autoplay.start(),
                document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
            },
            beforeTransitionStart: function(e, t) {
                this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
            },
            sliderFirstMove: function() {
                this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
            },
            touchEnd: function() {
                this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
            },
            destroy: function() {
                this.autoplay.running && this.autoplay.stop(),
                document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            n.extend(this, {
                fadeEffect: {
                    setTranslate: ve.setTranslate.bind(this),
                    setTransition: ve.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("fade" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "fade");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "fade" === this.params.effect && this.fadeEffect.setTranslate()
            },
            setTransition: function(e) {
                "fade" === this.params.effect && this.fadeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            n.extend(this, {
                cubeEffect: {
                    setTranslate: fe.setTranslate.bind(this),
                    setTransition: fe.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("cube" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "cube"),
                    this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "cube" === this.params.effect && this.cubeEffect.setTranslate()
            },
            setTransition: function(e) {
                "cube" === this.params.effect && this.cubeEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            n.extend(this, {
                flipEffect: {
                    setTranslate: me.setTranslate.bind(this),
                    setTransition: me.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                if ("flip" === this.params.effect) {
                    this.classNames.push(this.params.containerModifierClass + "flip"),
                    this.classNames.push(this.params.containerModifierClass + "3d");
                    var e = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    n.extend(this.params, e),
                    n.extend(this.originalParams, e)
                }
            },
            setTranslate: function() {
                "flip" === this.params.effect && this.flipEffect.setTranslate()
            },
            setTransition: function(e) {
                "flip" === this.params.effect && this.flipEffect.setTransition(e)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            n.extend(this, {
                coverflowEffect: {
                    setTranslate: ge.setTranslate.bind(this),
                    setTransition: ge.setTransition.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"),
                this.classNames.push(this.params.containerModifierClass + "3d"),
                this.params.watchSlidesProgress = !0,
                this.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function() {
                "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
            },
            setTransition: function(e) {
                "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            n.extend(this, {
                thumbs: {
                    swiper: null,
                    init: be.init.bind(this),
                    update: be.update.bind(this),
                    onThumbClick: be.onThumbClick.bind(this)
                }
            })
        },
        on: {
            beforeInit: function() {
                var e = this.params.thumbs;
                e && e.swiper && (this.thumbs.init(),
                this.thumbs.update(!0))
            },
            slideChange: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            update: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            resize: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            observerUpdate: function() {
                this.thumbs.swiper && this.thumbs.update()
            },
            setTransition: function(e) {
                var t = this.thumbs.swiper;
                t && t.setTransition(e)
            },
            beforeDestroy: function() {
                var e = this.thumbs.swiper;
                e && this.thumbs.swiperCreated && e && e.destroy()
            }
        }
    }];
    return void 0 === R.use && (R.use = R.Class.use,
    R.installModule = R.Class.installModule),
    R.use(we),
    R
}
));
/*! Masonry */
(function(e, t, n) {
    "use strict";
    var r = t.event, i;
    r.special.smartresize = {
        setup: function() {
            t(this).bind("resize", r.special.smartresize.handler)
        },
        teardown: function() {
            t(this).unbind("resize", r.special.smartresize.handler)
        },
        handler: function(e, t) {
            var n = this
              , s = arguments;
            e.type = "smartresize",
            i && clearTimeout(i),
            i = setTimeout(function() {
                r.dispatch.apply(n, s)
            }, t === "execAsap" ? 0 : 100)
        }
    },
    t.fn.smartresize = function(e) {
        return e ? this.bind("smartresize", e) : this.trigger("smartresize", ["execAsap"])
    }
    ,
    t.Mason = function(e, n) {
        this.element = t(n),
        this._create(e),
        this._init()
    }
    ,
    t.Mason.settings = {
        isResizable: !0,
        isAnimated: !1,
        animationOptions: {
            queue: !1,
            duration: 500
        },
        gutterWidth: 0,
        isRTL: !1,
        isFitWidth: !1,
        containerStyle: {
            position: "relative"
        }
    },
    t.Mason.prototype = {
        _filterFindBricks: function(e) {
            var t = this.options.itemSelector;
            return t ? e.filter(t).add(e.find(t)) : e
        },
        _getBricks: function(e) {
            var t = this._filterFindBricks(e).css({
                position: "absolute"
            }).addClass("masonry-brick");
            return t
        },
        _create: function(n) {
            this.options = t.extend(!0, {}, t.Mason.settings, n),
            this.styleQueue = [];
            var r = this.element[0].style;
            this.originalStyle = {
                height: r.height || ""
            };
            var i = this.options.containerStyle;
            for (var s in i)
                this.originalStyle[s] = r[s] || "";
            this.element.css(i),
            this.horizontalDirection = this.options.isRTL ? "right" : "left";
            var o = this.element.css("padding-" + this.horizontalDirection)
              , u = this.element.css("padding-top");
            this.offset = {
                x: o ? parseInt(o, 10) : 0,
                y: u ? parseInt(u, 10) : 0
            },
            this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";
            var a = this;
            setTimeout(function() {
                a.element.addClass("masonry")
            }, 0),
            this.options.isResizable && t(e).bind("smartresize.masonry", function() {
                a.resize()
            }),
            this.reloadItems()
        },
        _init: function(e) {
            this._getColumns(),
            this._reLayout(e)
        },
        option: function(e, n) {
            t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
        },
        layout: function(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                this._placeBrick(e[n]);
            var i = {};
            i.height = Math.max.apply(Math, this.colYs);
            if (this.options.isFitWidth) {
                var s = 0;
                n = this.cols;
                while (--n) {
                    if (this.colYs[n] !== 0)
                        break;
                    s++
                }
                i.width = (this.cols - s) * this.columnWidth - this.options.gutterWidth
            }
            this.styleQueue.push({
                $el: this.element,
                style: i
            });
            var o = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css", u = this.options.animationOptions, a;
            for (n = 0,
            r = this.styleQueue.length; n < r; n++)
                a = this.styleQueue[n],
                a.$el[o](a.style, u);
            this.styleQueue = [],
            t && t.call(e),
            this.isLaidOut = !0
        },
        _getColumns: function() {
            var e = this.options.isFitWidth ? this.element.parent() : this.element
              , t = e.width();
            this.columnWidth = this.isFluid ? this.options.columnWidth(t) : this.options.columnWidth || this.$bricks.outerWidth(!0) || t,
            this.columnWidth += this.options.gutterWidth,
            this.cols = Math.floor((t + this.options.gutterWidth) / this.columnWidth),
            this.cols = Math.max(this.cols, 1)
        },
        _placeBrick: function(e) {
            var n = t(e), r, i, s, o, u;
            r = Math.ceil(n.outerWidth(!0) / this.columnWidth),
            r = Math.min(r, this.cols);
            if (r === 1)
                s = this.colYs;
            else {
                i = this.cols + 1 - r,
                s = [];
                for (u = 0; u < i; u++)
                    o = this.colYs.slice(u, u + r),
                    s[u] = Math.max.apply(Math, o)
            }
            var a = Math.min.apply(Math, s)
              , f = 0;
            for (var l = 0, c = s.length; l < c; l++)
                if (s[l] === a) {
                    f = l;
                    break
                }
            var h = {
                top: a + this.offset.y
            };
            h[this.horizontalDirection] = this.columnWidth * f + this.offset.x,
            this.styleQueue.push({
                $el: n,
                style: h
            });
            var p = a + n.outerHeight(!0)
              , d = this.cols + 1 - c;
            for (l = 0; l < d; l++)
                this.colYs[f + l] = p
        },
        resize: function() {
            var e = this.cols;
            this._getColumns(),
            (this.isFluid || this.cols !== e) && this._reLayout()
        },
        _reLayout: function(e) {
            var t = this.cols;
            this.colYs = [];
            while (t--)
                this.colYs.push(0);
            this.layout(this.$bricks, e)
        },
        reloadItems: function() {
            this.$bricks = this._getBricks(this.element.children())
        },
        reload: function(e) {
            this.reloadItems(),
            this._init(e)
        },
        appended: function(e, t, n) {
            if (t) {
                this._filterFindBricks(e).css({
                    top: this.element.height()
                });
                var r = this;
                setTimeout(function() {
                    r._appended(e, n)
                }, 1)
            } else
                this._appended(e, n)
        },
        _appended: function(e, t) {
            var n = this._getBricks(e);
            this.$bricks = this.$bricks.add(n),
            this.layout(n, t)
        },
        remove: function(e) {
            this.$bricks = this.$bricks.not(e),
            e.remove()
        },
        destroy: function() {
            this.$bricks.removeClass("masonry-brick").each(function() {
                this.style.position = "",
                this.style.top = "",
                this.style.left = ""
            });
            var n = this.element[0].style;
            for (var r in this.originalStyle)
                n[r] = this.originalStyle[r];
            this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),
            t(e).unbind(".masonry")
        }
    },
    t.fn.imagesLoaded = function(e) {
        function u() {
            e.call(n, r)
        }
        function a(e) {
            var n = e.target;
            n.src !== s && t.inArray(n, o) === -1 && (o.push(n),
            --i <= 0 && (setTimeout(u),
            r.unbind(".imagesLoaded", a)))
        }
        var n = this
          , r = n.find("img").add(n.filter("img"))
          , i = r.length
          , s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          , o = [];
        return i || u(),
        r.bind("load.imagesLoaded error.imagesLoaded", a).each(function() {
            var e = this.src;
            this.src = s,
            this.src = e
        }),
        n
    }
    ;
    var s = function(t) {
        e.console && e.console.error(t)
    };
    t.fn.masonry = function(e) {
        if (typeof e == "string") {
            var n = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var r = t.data(this, "masonry");
                if (!r) {
                    s("cannot call methods on masonry prior to initialization; attempted to call method '" + e + "'");
                    return
                }
                if (!t.isFunction(r[e]) || e.charAt(0) === "_") {
                    s("no such method '" + e + "' for masonry instance");
                    return
                }
                r[e].apply(r, n)
            })
        } else
            this.each(function() {
                var n = t.data(this, "masonry");
                n ? (n.option(e || {}),
                n._init()) : t.data(this, "masonry", new t.Mason(e,this))
            });
        return this
    }
}
)(window, jQuery);
/*! Isotope */
(function(a, b, c) {
    "use strict";
    var d = a.document, e = a.Modernizr, f = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, g = "Moz Webkit O Ms".split(" "), h = function(a) {
        var b = d.documentElement.style, c;
        if (typeof b[a] == "string")
            return a;
        a = f(a);
        for (var e = 0, h = g.length; e < h; e++) {
            c = g[e] + a;
            if (typeof b[c] == "string")
                return c
        }
    }, i = h("transform"), j = h("transitionProperty"), k = {
        csstransforms: function() {
            return !!i
        },
        csstransforms3d: function() {
            var a = !!h("perspective");
            if (a) {
                var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" ")
                  , d = "@media (" + c.join("transform-3d),(") + "modernizr)"
                  , e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head")
                  , f = b('<div id="modernizr" />').appendTo("html");
                a = f.height() === 3,
                f.remove(),
                e.remove()
            }
            return a
        },
        csstransitions: function() {
            return !!j
        }
    }, l;
    if (e)
        for (l in k)
            e.hasOwnProperty(l) || e.addTest(l, k[l]);
    else {
        e = a.Modernizr = {
            _version: "1.6ish: miniModernizr for Isotope"
        };
        var m = " ", n;
        for (l in k)
            n = k[l](),
            e[l] = n,
            m += " " + (n ? "" : "no-") + l;
        b("html").addClass(m)
    }
    if (e.csstransforms) {
        var o = e.csstransforms3d ? {
            translate: function(a) {
                return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) "
            },
            scale: function(a) {
                return "scale3d(" + a + ", " + a + ", 1) "
            }
        } : {
            translate: function(a) {
                return "translate(" + a[0] + "px, " + a[1] + "px) "
            },
            scale: function(a) {
                return "scale(" + a + ") "
            }
        }
          , p = function(a, c, d) {
            var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j;
            f[c] = d,
            b.extend(e, f);
            for (g in e)
                j = e[g],
                h[g] = o[g](j);
            var k = h.translate || ""
              , l = h.scale || ""
              , m = k + l;
            b.data(a, "isoTransform", e),
            a.style[i] = m
        };
        b.cssNumber.scale = !0,
        b.cssHooks.scale = {
            set: function(a, b) {
                p(a, "scale", b)
            },
            get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.scale ? d.scale : 1
            }
        },
        b.fx.step.scale = function(a) {
            b.cssHooks.scale.set(a.elem, a.now + a.unit)
        }
        ,
        b.cssNumber.translate = !0,
        b.cssHooks.translate = {
            set: function(a, b) {
                p(a, "translate", b)
            },
            get: function(a, c) {
                var d = b.data(a, "isoTransform");
                return d && d.translate ? d.translate : [0, 0]
            }
        }
    }
    var q, r;
    e.csstransitions && (q = {
        WebkitTransitionProperty: "webkitTransitionEnd",
        MozTransitionProperty: "transitionend",
        OTransitionProperty: "oTransitionEnd otransitionend",
        transitionProperty: "transitionend"
    }[j],
    r = h("transitionDuration"));
    var s = b.event, t = b.event.handle ? "handle" : "dispatch", u;
    s.special.smartresize = {
        setup: function() {
            b(this).bind("resize", s.special.smartresize.handler)
        },
        teardown: function() {
            b(this).unbind("resize", s.special.smartresize.handler)
        },
        handler: function(a, b) {
            var c = this
              , d = arguments;
            a.type = "smartresize",
            u && clearTimeout(u),
            u = setTimeout(function() {
                s[t].apply(c, d)
            }, b === "execAsap" ? 0 : 100)
        }
    },
    b.fn.smartresize = function(a) {
        return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
    }
    ,
    b.Isotope = function(a, c, d) {
        this.element = b(c),
        this._create(a),
        this._init(d)
    }
    ;
    var v = ["width", "height"]
      , w = b(a);
    b.Isotope.settings = {
        resizable: !0,
        layoutMode: "masonry",
        containerClass: "isotope",
        itemClass: "isotope-item",
        hiddenClass: "isotope-hidden",
        hiddenStyle: {
            opacity: 0,
            scale: .001
        },
        visibleStyle: {
            opacity: 1,
            scale: 1
        },
        containerStyle: {
            position: "relative",
            overflow: "hidden"
        },
        animationEngine: "best-available",
        animationOptions: {
            queue: !1,
            duration: 800
        },
        sortBy: "original-order",
        sortAscending: !0,
        resizesContainer: !0,
        transformsEnabled: !0,
        itemPositionDataEnabled: !1
    },
    b.Isotope.prototype = {
        _create: function(a) {
            this.options = b.extend({}, b.Isotope.settings, a),
            this.styleQueue = [],
            this.elemCount = 0;
            var c = this.element[0].style;
            this.originalStyle = {};
            var d = v.slice(0);
            for (var e in this.options.containerStyle)
                d.push(e);
            for (var f = 0, g = d.length; f < g; f++)
                e = d[f],
                this.originalStyle[e] = c[e] || "";
            this.element.css(this.options.containerStyle),
            this._updateAnimationEngine(),
            this._updateUsingTransforms();
            var h = {
                "original-order": function(a, b) {
                    return b.elemCount++,
                    b.elemCount
                },
                random: function() {
                    return Math.random()
                }
            };
            this.options.getSortData = b.extend(this.options.getSortData, h),
            this.reloadItems(),
            this.offset = {
                left: parseInt(this.element.css("padding-left") || 0, 10),
                top: parseInt(this.element.css("padding-top") || 0, 10)
            };
            var i = this;
            setTimeout(function() {
                i.element.addClass(i.options.containerClass)
            }, 0),
            this.options.resizable && w.bind("smartresize.isotope", function() {
                i.resize()
            }),
            this.element.delegate("." + this.options.hiddenClass, "click", function() {
                return !1
            })
        },
        _getAtoms: function(a) {
            var b = this.options.itemSelector
              , c = b ? a.filter(b).add(a.find(b)) : a
              , d = {
                position: "absolute"
            };
            return c = c.filter(function(a, b) {
                return b.nodeType === 1
            }),
            this.usingTransforms && (d.left = 0,
            d.top = 0),
            c.css(d).addClass(this.options.itemClass),
            this.updateSortData(c, !0),
            c
        },
        _init: function(a) {
            this.$filteredAtoms = this._filter(this.$allAtoms),
            this._sort(),
            this.reLayout(a)
        },
        option: function(a) {
            if (b.isPlainObject(a)) {
                this.options = b.extend(!0, this.options, a);
                var c;
                for (var d in a)
                    c = "_update" + f(d),
                    this[c] && this[c]()
            }
        },
        _updateAnimationEngine: function() {
            var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""), b;
            switch (a) {
            case "css":
            case "none":
                b = !1;
                break;
            case "jquery":
                b = !0;
                break;
            default:
                b = !e.csstransitions
            }
            this.isUsingJQueryAnimation = b,
            this._updateUsingTransforms()
        },
        _updateTransformsEnabled: function() {
            this._updateUsingTransforms()
        },
        _updateUsingTransforms: function() {
            var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation;
            a || (delete this.options.hiddenStyle.scale,
            delete this.options.visibleStyle.scale),
            this.getPositionStyles = a ? this._translate : this._positionAbs
        },
        _filter: function(a) {
            var b = this.options.filter === "" ? "*" : this.options.filter;
            if (!b)
                return a;
            var c = this.options.hiddenClass
              , d = "." + c
              , e = a.filter(d)
              , f = e;
            if (b !== "*") {
                f = e.filter(b);
                var g = a.not(d).not(b).addClass(c);
                this.styleQueue.push({
                    $el: g,
                    style: this.options.hiddenStyle
                })
            }
            return this.styleQueue.push({
                $el: f,
                style: this.options.visibleStyle
            }),
            f.removeClass(c),
            a.filter(b)
        },
        updateSortData: function(a, c) {
            var d = this, e = this.options.getSortData, f, g;
            a.each(function() {
                f = b(this),
                g = {};
                for (var a in e)
                    !c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d);
                b.data(this, "isotope-sort-data", g)
            })
        },
        _sort: function() {
            var a = this.options.sortBy
              , b = this._getSorter
              , c = this.options.sortAscending ? 1 : -1
              , d = function(d, e) {
                var f = b(d, a)
                  , g = b(e, a);
                return f === g && a !== "original-order" && (f = b(d, "original-order"),
                g = b(e, "original-order")),
                (f > g ? 1 : f < g ? -1 : 0) * c
            };
            this.$filteredAtoms.sort(d)
        },
        _getSorter: function(a, c) {
            return b.data(a, "isotope-sort-data")[c]
        },
        _translate: function(a, b) {
            return {
                translate: [a, b]
            }
        },
        _positionAbs: function(a, b) {
            return {
                left: a,
                top: b
            }
        },
        _pushPosition: function(a, b, c) {
            b = Math.round(b + this.offset.left),
            c = Math.round(c + this.offset.top);
            var d = this.getPositionStyles(b, c);
            this.styleQueue.push({
                $el: a,
                style: d
            }),
            this.options.itemPositionDataEnabled && a.data("isotope-item-position", {
                x: b,
                y: c
            })
        },
        layout: function(a, b) {
            var c = this.options.layoutMode;
            this["_" + c + "Layout"](a);
            if (this.options.resizesContainer) {
                var d = this["_" + c + "GetContainerSize"]();
                this.styleQueue.push({
                    $el: this.element,
                    style: d
                })
            }
            this._processStyleQueue(a, b),
            this.isLaidOut = !0
        },
        _processStyleQueue: function(a, c) {
            var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css", f = this.options.animationOptions, g = this.options.onLayout, h, i, j, k;
            i = function(a, b) {
                b.$el[d](b.style, f)
            }
            ;
            if (this._isInserting && this.isUsingJQueryAnimation)
                i = function(a, b) {
                    h = b.$el.hasClass("no-transition") ? "css" : d,
                    b.$el[h](b.style, f)
                }
                ;
            else if (c || g || f.complete) {
                var l = !1
                  , m = [c, g, f.complete]
                  , n = this;
                j = !0,
                k = function() {
                    if (l)
                        return;
                    var b;
                    for (var c = 0, d = m.length; c < d; c++)
                        b = m[c],
                        typeof b == "function" && b.call(n.element, a, n);
                    l = !0
                }
                ;
                if (this.isUsingJQueryAnimation && d === "animate")
                    f.complete = k,
                    j = !1;
                else if (e.csstransitions) {
                    var o = 0, p = this.styleQueue[0], s = p && p.$el, t;
                    while (!s || !s.length) {
                        t = this.styleQueue[o++];
                        if (!t)
                            return;
                        s = t.$el
                    }
                    var u = parseFloat(getComputedStyle(s[0])[r]);
                    u > 0 && (i = function(a, b) {
                        b.$el[d](b.style, f).one(q, k)
                    }
                    ,
                    j = !1)
                }
            }
            b.each(this.styleQueue, i),
            j && k(),
            this.styleQueue = []
        },
        resize: function() {
            this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout()
        },
        reLayout: function(a) {
            this["_" + this.options.layoutMode + "Reset"](),
            this.layout(this.$filteredAtoms, a)
        },
        addItems: function(a, b) {
            var c = this._getAtoms(a);
            this.$allAtoms = this.$allAtoms.add(c),
            b && b(c)
        },
        insert: function(a, b) {
            this.element.append(a);
            var c = this;
            this.addItems(a, function(a) {
                var d = c._filter(a);
                c._addHideAppended(d),
                c._sort(),
                c.reLayout(),
                c._revealAppended(d, b)
            })
        },
        appended: function(a, b) {
            var c = this;
            this.addItems(a, function(a) {
                c._addHideAppended(a),
                c.layout(a),
                c._revealAppended(a, b)
            })
        },
        _addHideAppended: function(a) {
            this.$filteredAtoms = this.$filteredAtoms.add(a),
            a.addClass("no-transition"),
            this._isInserting = !0,
            this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            })
        },
        _revealAppended: function(a, b) {
            var c = this;
            setTimeout(function() {
                a.removeClass("no-transition"),
                c.styleQueue.push({
                    $el: a,
                    style: c.options.visibleStyle
                }),
                c._isInserting = !1,
                c._processStyleQueue(a, b)
            }, 10)
        },
        reloadItems: function() {
            this.$allAtoms = this._getAtoms(this.element.children())
        },
        remove: function(a, b) {
            this.$allAtoms = this.$allAtoms.not(a),
            this.$filteredAtoms = this.$filteredAtoms.not(a);
            var c = this
              , d = function() {
                a.remove(),
                b && b.call(c.element)
            };
            a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({
                $el: a,
                style: this.options.hiddenStyle
            }),
            this._sort(),
            this.reLayout(d)) : d()
        },
        shuffle: function(a) {
            this.updateSortData(this.$allAtoms),
            this.options.sortBy = "random",
            this._sort(),
            this.reLayout(a)
        },
        destroy: function() {
            var a = this.usingTransforms
              , b = this.options;
            this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function() {
                var b = this.style;
                b.position = "",
                b.top = "",
                b.left = "",
                b.opacity = "",
                a && (b[i] = "")
            });
            var c = this.element[0].style;
            for (var d in this.originalStyle)
                c[d] = this.originalStyle[d];
            this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"),
            w.unbind(".isotope")
        },
        _getSegments: function(a) {
            var b = this.options.layoutMode, c = a ? "rowHeight" : "columnWidth", d = a ? "height" : "width", e = a ? "rows" : "cols", g = this.element[d](), h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g;
            h = Math.floor(g / i),
            h = Math.max(h, 1),
            this[b][e] = h,
            this[b][c] = i
        },
        _checkIfSegmentsChanged: function(a) {
            var b = this.options.layoutMode
              , c = a ? "rows" : "cols"
              , d = this[b][c];
            return this._getSegments(a),
            this[b][c] !== d
        },
        _masonryReset: function() {
            this.masonry = {},
            this._getSegments();
            var a = this.masonry.cols;
            this.masonry.colYs = [];
            while (a--)
                this.masonry.colYs.push(0)
        },
        _masonryLayout: function(a) {
            var c = this
              , d = c.masonry;
            a.each(function() {
                var a = b(this)
                  , e = Math.ceil(a.outerWidth(!0) / d.columnWidth);
                e = Math.min(e, d.cols);
                if (e === 1)
                    c._masonryPlaceBrick(a, d.colYs);
                else {
                    var f = d.cols + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)
                        h = d.colYs.slice(i, i + e),
                        g[i] = Math.max.apply(Math, h);
                    c._masonryPlaceBrick(a, g)
                }
            })
        },
        _masonryPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b)
              , d = 0;
            for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) {
                    d = e;
                    break
                }
            var g = this.masonry.columnWidth * d
              , h = c;
            this._pushPosition(a, g, h);
            var i = c + a.outerHeight(!0)
              , j = this.masonry.cols + 1 - f;
            for (e = 0; e < j; e++)
                this.masonry.colYs[d + e] = i
        },
        _masonryGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonry.colYs);
            return {
                height: a
            }
        },
        _masonryResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _fitRowsReset: function() {
            this.fitRows = {
                x: 0,
                y: 0,
                height: 0
            }
        },
        _fitRowsLayout: function(a) {
            var c = this
              , d = this.element.width()
              , e = this.fitRows;
            a.each(function() {
                var a = b(this)
                  , f = a.outerWidth(!0)
                  , g = a.outerHeight(!0);
                e.x !== 0 && f + e.x > d && (e.x = 0,
                e.y = e.height),
                c._pushPosition(a, e.x, e.y),
                e.height = Math.max(e.y + g, e.height),
                e.x += f
            })
        },
        _fitRowsGetContainerSize: function() {
            return {
                height: this.fitRows.height
            }
        },
        _fitRowsResizeChanged: function() {
            return !0
        },
        _cellsByRowReset: function() {
            this.cellsByRow = {
                index: 0
            },
            this._getSegments(),
            this._getSegments(!0)
        },
        _cellsByRowLayout: function(a) {
            var c = this
              , d = this.cellsByRow;
            a.each(function() {
                var a = b(this)
                  , e = d.index % d.cols
                  , f = Math.floor(d.index / d.cols)
                  , g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2
                  , h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h),
                d.index++
            })
        },
        _cellsByRowGetContainerSize: function() {
            return {
                height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top
            }
        },
        _cellsByRowResizeChanged: function() {
            return this._checkIfSegmentsChanged()
        },
        _straightDownReset: function() {
            this.straightDown = {
                y: 0
            }
        },
        _straightDownLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, 0, c.straightDown.y),
                c.straightDown.y += d.outerHeight(!0)
            })
        },
        _straightDownGetContainerSize: function() {
            return {
                height: this.straightDown.y
            }
        },
        _straightDownResizeChanged: function() {
            return !0
        },
        _masonryHorizontalReset: function() {
            this.masonryHorizontal = {},
            this._getSegments(!0);
            var a = this.masonryHorizontal.rows;
            this.masonryHorizontal.rowXs = [];
            while (a--)
                this.masonryHorizontal.rowXs.push(0)
        },
        _masonryHorizontalLayout: function(a) {
            var c = this
              , d = c.masonryHorizontal;
            a.each(function() {
                var a = b(this)
                  , e = Math.ceil(a.outerHeight(!0) / d.rowHeight);
                e = Math.min(e, d.rows);
                if (e === 1)
                    c._masonryHorizontalPlaceBrick(a, d.rowXs);
                else {
                    var f = d.rows + 1 - e, g = [], h, i;
                    for (i = 0; i < f; i++)
                        h = d.rowXs.slice(i, i + e),
                        g[i] = Math.max.apply(Math, h);
                    c._masonryHorizontalPlaceBrick(a, g)
                }
            })
        },
        _masonryHorizontalPlaceBrick: function(a, b) {
            var c = Math.min.apply(Math, b)
              , d = 0;
            for (var e = 0, f = b.length; e < f; e++)
                if (b[e] === c) {
                    d = e;
                    break
                }
            var g = c
              , h = this.masonryHorizontal.rowHeight * d;
            this._pushPosition(a, g, h);
            var i = c + a.outerWidth(!0)
              , j = this.masonryHorizontal.rows + 1 - f;
            for (e = 0; e < j; e++)
                this.masonryHorizontal.rowXs[d + e] = i
        },
        _masonryHorizontalGetContainerSize: function() {
            var a = Math.max.apply(Math, this.masonryHorizontal.rowXs);
            return {
                width: a
            }
        },
        _masonryHorizontalResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _fitColumnsReset: function() {
            this.fitColumns = {
                x: 0,
                y: 0,
                width: 0
            }
        },
        _fitColumnsLayout: function(a) {
            var c = this
              , d = this.element.height()
              , e = this.fitColumns;
            a.each(function() {
                var a = b(this)
                  , f = a.outerWidth(!0)
                  , g = a.outerHeight(!0);
                e.y !== 0 && g + e.y > d && (e.x = e.width,
                e.y = 0),
                c._pushPosition(a, e.x, e.y),
                e.width = Math.max(e.x + f, e.width),
                e.y += g
            })
        },
        _fitColumnsGetContainerSize: function() {
            return {
                width: this.fitColumns.width
            }
        },
        _fitColumnsResizeChanged: function() {
            return !0
        },
        _cellsByColumnReset: function() {
            this.cellsByColumn = {
                index: 0
            },
            this._getSegments(),
            this._getSegments(!0)
        },
        _cellsByColumnLayout: function(a) {
            var c = this
              , d = this.cellsByColumn;
            a.each(function() {
                var a = b(this)
                  , e = Math.floor(d.index / d.rows)
                  , f = d.index % d.rows
                  , g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2
                  , h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2;
                c._pushPosition(a, g, h),
                d.index++
            })
        },
        _cellsByColumnGetContainerSize: function() {
            return {
                width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth
            }
        },
        _cellsByColumnResizeChanged: function() {
            return this._checkIfSegmentsChanged(!0)
        },
        _straightAcrossReset: function() {
            this.straightAcross = {
                x: 0
            }
        },
        _straightAcrossLayout: function(a) {
            var c = this;
            a.each(function(a) {
                var d = b(this);
                c._pushPosition(d, c.straightAcross.x, 0),
                c.straightAcross.x += d.outerWidth(!0)
            })
        },
        _straightAcrossGetContainerSize: function() {
            return {
                width: this.straightAcross.x
            }
        },
        _straightAcrossResizeChanged: function() {
            return !0
        }
    },
    b.fn.imagesLoaded = function(a) {
        function h() {
            a.call(c, d)
        }
        function i(a) {
            var c = a.target;
            c.src !== f && b.inArray(c, g) === -1 && (g.push(c),
            --e <= 0 && (setTimeout(h),
            d.unbind(".imagesLoaded", i)))
        }
        var c = this
          , d = c.find("img").add(c.filter("img"))
          , e = d.length
          , f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          , g = [];
        return e || h(),
        d.bind("load.imagesLoaded error.imagesLoaded", i).each(function() {
            var a = this.src;
            this.src = f,
            this.src = a
        }),
        c
    }
    ;
    var x = function(b) {
        a.console && a.console.error(b)
    };
    b.fn.isotope = function(a, c) {
        if (typeof a == "string") {
            var d = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var c = b.data(this, "isotope");
                if (!c) {
                    x("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'");
                    return
                }
                if (!b.isFunction(c[a]) || a.charAt(0) === "_") {
                    x("no such method '" + a + "' for isotope instance");
                    return
                }
                c[a].apply(c, d)
            })
        } else
            this.each(function() {
                var d = b.data(this, "isotope");
                d ? (d.option(a),
                d._init(c)) : b.data(this, "isotope", new b.Isotope(a,this,c))
            });
        return this
    }
}
)(window, jQuery);
/*! imagesLoaded */
!function(e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function() {
    function e() {}
    var t = e.prototype;
    return t.on = function(e, t) {
        if (e && t) {
            var i = this._events = this._events || {}
              , n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t),
            this
        }
    }
    ,
    t.once = function(e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {}
              , n = i[e] = i[e] || {};
            return n[t] = !0,
            this
        }
    }
    ,
    t.off = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1),
            this
        }
    }
    ,
    t.emitEvent = function(e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0),
            t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o]
                  , s = n && n[r];
                s && (this.off(e, r),
                delete n[r]),
                r.apply(this, t)
            }
            return this
        }
    }
    ,
    t.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    e
}),
function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function(e, t) {
    function i(e, t) {
        for (var i in t)
            e[i] = t[i];
        return e
    }
    function n(e) {
        if (Array.isArray(e))
            return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }
    function o(e, t, r) {
        if (!(this instanceof o))
            return new o(e,t,r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)),
        s ? (this.elements = n(s),
        this.options = i({}, this.options),
        "function" == typeof t ? r = t : i(this.options, t),
        r && this.on("always", r),
        this.getImages(),
        h && (this.jqDeferred = new h.Deferred),
        void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }
    function r(e) {
        this.img = e
    }
    function s(e, t) {
        this.url = e,
        this.element = t,
        this.img = new Image
    }
    var h = e.jQuery
      , a = e.console
      , d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype),
    o.prototype.options = {},
    o.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    o.prototype.addElementImages = function(e) {
        "IMG" == e.nodeName && this.addImage(e),
        this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    }
    ;
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n; ) {
                var o = n && n[2];
                o && this.addBackground(o, e),
                n = i.exec(t.backgroundImage)
            }
    }
    ,
    o.prototype.addImage = function(e) {
        var t = new r(e);
        this.images.push(t)
    }
    ,
    o.prototype.addBackground = function(e, t) {
        var i = new s(e,t);
        this.images.push(i)
    }
    ,
    o.prototype.check = function() {
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(t) {
            t.once("progress", e),
            t.check()
        }) : void this.complete()
    }
    ,
    o.prototype.progress = function(e, t, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
        this.emitEvent("progress", [this, e, t]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && a && a.log("progress: " + i, e, t)
    }
    ,
    o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(e, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }
    ,
    r.prototype = Object.create(t.prototype),
    r.prototype.check = function() {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    r.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    r.prototype.confirm = function(e, t) {
        this.isLoaded = e,
        this.emitEvent("progress", [this, this.img, t])
    }
    ,
    r.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }
    ,
    r.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    r.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype = Object.create(r.prototype),
    s.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    s.prototype.confirm = function(e, t) {
        this.isLoaded = e,
        this.emitEvent("progress", [this, this.element, t])
    }
    ,
    o.makeJQueryPlugin = function(t) {
        t = t || e.jQuery,
        t && (h = t,
        h.fn.imagesLoaded = function(e, t) {
            var i = new o(this,e,t);
            return i.jqDeferred.promise(h(this))
        }
        )
    }
    ,
    o.makeJQueryPlugin(),
    o
});
/*! MixItUp */
!function(a, b) {
    "use strict";
    a.MixItUp = function() {
        var b = this;
        b._execAction("_constructor", 0),
        a.extend(b, {
            selectors: {
                target: ".mix",
                filter: ".filter",
                sort: ".sort"
            },
            animation: {
                enable: !0,
                effects: "fade scale",
                duration: 600,
                easing: "ease",
                perspectiveDistance: "3000",
                perspectiveOrigin: "50% 50%",
                queue: !0,
                queueLimit: 1,
                animateChangeLayout: !1,
                animateResizeContainer: !0,
                animateResizeTargets: !1,
                staggerSequence: !1,
                reverseOut: !1
            },
            callbacks: {
                onMixLoad: !1,
                onMixStart: !1,
                onMixBusy: !1,
                onMixEnd: !1,
                onMixFail: !1,
                _user: !1
            },
            controls: {
                enable: !0,
                live: !1,
                toggleFilterButtons: !1,
                toggleLogic: "or",
                activeClass: "active"
            },
            layout: {
                display: "inline-block",
                containerClass: "",
                containerClassFail: "fail"
            },
            load: {
                filter: "all",
                sort: !1
            },
            _$body: null,
            _$container: null,
            _$targets: null,
            _$parent: null,
            _$sortButtons: null,
            _$filterButtons: null,
            _suckMode: !1,
            _mixing: !1,
            _sorting: !1,
            _clicking: !1,
            _loading: !0,
            _changingLayout: !1,
            _changingClass: !1,
            _changingDisplay: !1,
            _origOrder: [],
            _startOrder: [],
            _newOrder: [],
            _activeFilter: null,
            _toggleArray: [],
            _toggleString: "",
            _activeSort: "default:asc",
            _newSort: null,
            _startHeight: null,
            _newHeight: null,
            _incPadding: !0,
            _newDisplay: null,
            _newClass: null,
            _targetsBound: 0,
            _targetsDone: 0,
            _queue: [],
            _$show: a(),
            _$hide: a()
        }),
        b._execAction("_constructor", 1)
    }
    ,
    a.MixItUp.prototype = {
        constructor: a.MixItUp,
        _instances: {},
        _handled: {
            _filter: {},
            _sort: {}
        },
        _bound: {
            _filter: {},
            _sort: {}
        },
        _actions: {},
        _filters: {},
        extend: function(b) {
            for (var c in b)
                a.MixItUp.prototype[c] = b[c]
        },
        addAction: function(b, c, d, e) {
            a.MixItUp.prototype._addHook("_actions", b, c, d, e)
        },
        addFilter: function(b, c, d, e) {
            a.MixItUp.prototype._addHook("_filters", b, c, d, e)
        },
        _addHook: function(b, c, d, e, f) {
            var g = a.MixItUp.prototype[b]
              , h = {};
            f = 1 === f || "post" === f ? "post" : "pre",
            h[c] = {},
            h[c][f] = {},
            h[c][f][d] = e,
            a.extend(!0, g, h)
        },
        _init: function(b, c) {
            var d = this;
            if (d._execAction("_init", 0, arguments),
            c && a.extend(!0, d, c),
            d._$body = a("body"),
            d._domNode = b,
            d._$container = a(b),
            d._$container.addClass(d.layout.containerClass),
            d._id = b.id,
            d._platformDetect(),
            d._brake = d._getPrefixedCSS("transition", "none"),
            d._refresh(!0),
            d._$parent = d._$targets.parent().length ? d._$targets.parent() : d._$container,
            d.load.sort && (d._newSort = d._parseSort(d.load.sort),
            d._newSortString = d.load.sort,
            d._activeSort = d.load.sort,
            d._sort(),
            d._printSort()),
            d._activeFilter = "all" === d.load.filter ? d.selectors.target : "none" === d.load.filter ? "" : d.load.filter,
            d.controls.enable && d._bindHandlers(),
            d.controls.toggleFilterButtons) {
                d._buildToggleArray();
                for (var e = 0; e < d._toggleArray.length; e++)
                    d._updateControls({
                        filter: d._toggleArray[e],
                        sort: d._activeSort
                    }, !0)
            } else
                d.controls.enable && d._updateControls({
                    filter: d._activeFilter,
                    sort: d._activeSort
                });
            d._filter(),
            d._init = !0,
            d._$container.data("mixItUp", d),
            d._execAction("_init", 1, arguments),
            d._buildState(),
            d._$targets.css(d._brake),
            d._goMix(d.animation.enable)
        },
        _platformDetect: function() {
            var a = this
              , c = ["Webkit", "Moz", "O", "ms"]
              , d = ["webkit", "moz"]
              , e = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1
              , f = "undefined" != typeof InstallTrigger
              , g = function(a) {
                for (var b = 0; b < c.length; b++)
                    if (c[b] + "Transition"in a.style)
                        return {
                            prefix: "-" + c[b].toLowerCase() + "-",
                            vendor: c[b]
                        };
                return "transition"in a.style ? "" : !1
            }
              , h = g(a._domNode);
            a._execAction("_platformDetect", 0),
            a._chrome = e ? parseInt(e[1], 10) : !1,
            a._ff = f ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]) : !1,
            a._prefix = h.prefix,
            a._vendor = h.vendor,
            a._suckMode = window.atob && a._prefix ? !1 : !0,
            a._suckMode && (a.animation.enable = !1),
            a._ff && a._ff <= 4 && (a.animation.enable = !1);
            for (var i = 0; i < d.length && !window.requestAnimationFrame; i++)
                window.requestAnimationFrame = window[d[i] + "RequestAnimationFrame"];
            "function" != typeof Object.getPrototypeOf && ("object" == typeof "test".__proto__ ? Object.getPrototypeOf = function(a) {
                return a.__proto__
            }
            : Object.getPrototypeOf = function(a) {
                return a.constructor.prototype
            }
            ),
            a._domNode.nextElementSibling === b && Object.defineProperty(Element.prototype, "nextElementSibling", {
                get: function() {
                    for (var a = this.nextSibling; a; ) {
                        if (1 === a.nodeType)
                            return a;
                        a = a.nextSibling
                    }
                    return null
                }
            }),
            a._execAction("_platformDetect", 1)
        },
        _refresh: function(a, c) {
            var d = this;
            d._execAction("_refresh", 0, arguments),
            d._$targets = d._$container.find(d.selectors.target);
            for (var e = 0; e < d._$targets.length; e++) {
                var f = d._$targets[e];
                if (f.dataset === b || c) {
                    f.dataset = {};
                    for (var g = 0; g < f.attributes.length; g++) {
                        var h = f.attributes[g]
                          , i = h.name
                          , j = h.value;
                        if (i.indexOf("data-") > -1) {
                            var k = d._helpers._camelCase(i.substring(5, i.length));
                            f.dataset[k] = j
                        }
                    }
                }
                f.mixParent === b && (f.mixParent = d._id)
            }
            if (d._$targets.length && a || !d._origOrder.length && d._$targets.length) {
                d._origOrder = [];
                for (var e = 0; e < d._$targets.length; e++) {
                    var f = d._$targets[e];
                    d._origOrder.push(f)
                }
            }
            d._execAction("_refresh", 1, arguments)
        },
        _bindHandlers: function() {
            var c = this
              , d = a.MixItUp.prototype._bound._filter
              , e = a.MixItUp.prototype._bound._sort;
            c._execAction("_bindHandlers", 0),
            c.controls.live ? c._$body.on("click.mixItUp." + c._id, c.selectors.sort, function() {
                c._processClick(a(this), "sort")
            }).on("click.mixItUp." + c._id, c.selectors.filter, function() {
                c._processClick(a(this), "filter")
            }) : (c._$sortButtons = a(c.selectors.sort),
            c._$filterButtons = a(c.selectors.filter),
            c._$sortButtons.on("click.mixItUp." + c._id, function() {
                c._processClick(a(this), "sort")
            }),
            c._$filterButtons.on("click.mixItUp." + c._id, function() {
                c._processClick(a(this), "filter")
            })),
            d[c.selectors.filter] = d[c.selectors.filter] === b ? 1 : d[c.selectors.filter] + 1,
            e[c.selectors.sort] = e[c.selectors.sort] === b ? 1 : e[c.selectors.sort] + 1,
            c._execAction("_bindHandlers", 1)
        },
        _processClick: function(c, d) {
            var e = this
              , f = function(c, d, f) {
                var g = a.MixItUp.prototype;
                g._handled["_" + d][e.selectors[d]] = g._handled["_" + d][e.selectors[d]] === b ? 1 : g._handled["_" + d][e.selectors[d]] + 1,
                g._handled["_" + d][e.selectors[d]] === g._bound["_" + d][e.selectors[d]] && (c[(f ? "remove" : "add") + "Class"](e.controls.activeClass),
                delete g._handled["_" + d][e.selectors[d]])
            };
            if (e._execAction("_processClick", 0, arguments),
            !e._mixing || e.animation.queue && e._queue.length < e.animation.queueLimit) {
                if (e._clicking = !0,
                "sort" === d) {
                    var g = c.attr("data-sort");
                    (!c.hasClass(e.controls.activeClass) || g.indexOf("random") > -1) && (a(e.selectors.sort).removeClass(e.controls.activeClass),
                    f(c, d),
                    e.sort(g))
                }
                if ("filter" === d) {
                    var h, i = c.attr("data-filter"), j = "or" === e.controls.toggleLogic ? "," : "";
                    e.controls.toggleFilterButtons ? (e._buildToggleArray(),
                    c.hasClass(e.controls.activeClass) ? (f(c, d, !0),
                    h = e._toggleArray.indexOf(i),
                    e._toggleArray.splice(h, 1)) : (f(c, d),
                    e._toggleArray.push(i)),
                    e._toggleArray = a.grep(e._toggleArray, function(a) {
                        return a
                    }),
                    e._toggleString = e._toggleArray.join(j),
                    e.filter(e._toggleString)) : c.hasClass(e.controls.activeClass) || (a(e.selectors.filter).removeClass(e.controls.activeClass),
                    f(c, d),
                    e.filter(i))
                }
                e._execAction("_processClick", 1, arguments)
            } else
                "function" == typeof e.callbacks.onMixBusy && e.callbacks.onMixBusy.call(e._domNode, e._state, e),
                e._execAction("_processClickBusy", 1, arguments)
        },
        _buildToggleArray: function() {
            var a = this
              , b = a._activeFilter.replace(/\s/g, "");
            if (a._execAction("_buildToggleArray", 0, arguments),
            "or" === a.controls.toggleLogic)
                a._toggleArray = b.split(",");
            else {
                a._toggleArray = b.split("."),
                !a._toggleArray[0] && a._toggleArray.shift();
                for (var c, d = 0; c = a._toggleArray[d]; d++)
                    a._toggleArray[d] = "." + c
            }
            a._execAction("_buildToggleArray", 1, arguments)
        },
        _updateControls: function(c, d) {
            var e = this
              , f = {
                filter: c.filter,
                sort: c.sort
            }
              , g = function(a, b) {
                try {
                    d && "filter" === h && "none" !== f.filter && "" !== f.filter ? a.filter(b).addClass(e.controls.activeClass) : a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)
                } catch (c) {}
            }
              , h = "filter"
              , i = null;
            e._execAction("_updateControls", 0, arguments),
            c.filter === b && (f.filter = e._activeFilter),
            c.sort === b && (f.sort = e._activeSort),
            f.filter === e.selectors.target && (f.filter = "all");
            for (var j = 0; 2 > j; j++)
                i = e.controls.live ? a(e.selectors[h]) : e["_$" + h + "Buttons"],
                i && g(i, "[data-" + h + '="' + f[h] + '"]'),
                h = "sort";
            e._execAction("_updateControls", 1, arguments)
        },
        _filter: function() {
            var b = this;
            b._execAction("_filter", 0);
            for (var c = 0; c < b._$targets.length; c++) {
                var d = a(b._$targets[c]);
                d.is(b._activeFilter) ? b._$show = b._$show.add(d) : b._$hide = b._$hide.add(d)
            }
            b._execAction("_filter", 1)
        },
        _sort: function() {
            var a = this
              , b = function(a) {
                for (var b = a.slice(), c = b.length, d = c; d--; ) {
                    var e = parseInt(Math.random() * c)
                      , f = b[d];
                    b[d] = b[e],
                    b[e] = f
                }
                return b
            };
            a._execAction("_sort", 0),
            a._startOrder = [];
            for (var c = 0; c < a._$targets.length; c++) {
                var d = a._$targets[c];
                a._startOrder.push(d)
            }
            switch (a._newSort[0].sortBy) {
            case "default":
                a._newOrder = a._origOrder;
                break;
            case "random":
                a._newOrder = b(a._startOrder);
                break;
            case "custom":
                a._newOrder = a._newSort[0].order;
                break;
            default:
                a._newOrder = a._startOrder.concat().sort(function(b, c) {
                    return a._compare(b, c)
                })
            }
            a._execAction("_sort", 1)
        },
        _compare: function(a, b, c) {
            c = c ? c : 0;
            var d = this
              , e = d._newSort[c].order
              , f = function(a) {
                return a.dataset[d._newSort[c].sortBy] || 0
            }
              , g = isNaN(1 * f(a)) ? f(a).toLowerCase() : 1 * f(a)
              , h = isNaN(1 * f(b)) ? f(b).toLowerCase() : 1 * f(b);
            return h > g ? "asc" === e ? -1 : 1 : g > h ? "asc" === e ? 1 : -1 : g === h && d._newSort.length > c + 1 ? d._compare(a, b, c + 1) : 0
        },
        _printSort: function(a) {
            var b = this
              , c = a ? b._startOrder : b._newOrder
              , d = b._$parent[0].querySelectorAll(b.selectors.target)
              , e = d.length ? d[d.length - 1].nextElementSibling : null
              , f = document.createDocumentFragment();
            b._execAction("_printSort", 0, arguments);
            for (var g = 0; g < d.length; g++) {
                var h = d[g]
                  , i = h.nextSibling;
                "absolute" !== h.style.position && (i && "#text" === i.nodeName && b._$parent[0].removeChild(i),
                b._$parent[0].removeChild(h))
            }
            for (var g = 0; g < c.length; g++) {
                var j = c[g];
                if ("default" !== b._newSort[0].sortBy || "desc" !== b._newSort[0].order || a)
                    f.appendChild(j),
                    f.appendChild(document.createTextNode(" "));
                else {
                    var k = f.firstChild;
                    f.insertBefore(j, k),
                    f.insertBefore(document.createTextNode(" "), j)
                }
            }
            e ? b._$parent[0].insertBefore(f, e) : b._$parent[0].appendChild(f),
            b._execAction("_printSort", 1, arguments)
        },
        _parseSort: function(a) {
            for (var b = this, c = "string" == typeof a ? a.split(" ") : [a], d = [], e = 0; e < c.length; e++) {
                var f = "string" == typeof a ? c[e].split(":") : ["custom", c[e]]
                  , g = {
                    sortBy: b._helpers._camelCase(f[0]),
                    order: f[1] || "asc"
                };
                if (d.push(g),
                "default" === g.sortBy || "random" === g.sortBy)
                    break
            }
            return b._execFilter("_parseSort", d, arguments)
        },
        _parseEffects: function() {
            var a = this
              , b = {
                opacity: "",
                transformIn: "",
                transformOut: "",
                filter: ""
            }
              , c = function(b, c, d) {
                if (a.animation.effects.indexOf(b) > -1) {
                    if (c) {
                        var e = a.animation.effects.indexOf(b + "(");
                        if (e > -1) {
                            var f = a.animation.effects.substring(e)
                              , g = /\(([^)]+)\)/.exec(f)
                              , h = g[1];
                            return {
                                val: h
                            }
                        }
                    }
                    return !0
                }
                return !1
            }
              , d = function(a, b) {
                return b ? "-" === a.charAt(0) ? a.substr(1, a.length) : "-" + a : a
            }
              , e = function(a, e) {
                for (var f = [["scale", ".01"], ["translateX", "20px"], ["translateY", "20px"], ["translateZ", "20px"], ["rotateX", "90deg"], ["rotateY", "90deg"], ["rotateZ", "180deg"]], g = 0; g < f.length; g++) {
                    var h = f[g][0]
                      , i = f[g][1]
                      , j = e && "scale" !== h;
                    b[a] += c(h) ? h + "(" + d(c(h, !0).val || i, j) + ") " : ""
                }
            };
            return b.opacity = c("fade") ? c("fade", !0).val || "0" : "1",
            e("transformIn"),
            a.animation.reverseOut ? e("transformOut", !0) : b.transformOut = b.transformIn,
            b.transition = {},
            b.transition = a._getPrefixedCSS("transition", "all " + a.animation.duration + "ms " + a.animation.easing + ", opacity " + a.animation.duration + "ms linear"),
            a.animation.stagger = c("stagger") ? !0 : !1,
            a.animation.staggerDuration = parseInt(c("stagger") && c("stagger", !0).val ? c("stagger", !0).val : 100),
            a._execFilter("_parseEffects", b)
        },
        _buildState: function(a) {
            var b = this
              , c = {};
            return b._execAction("_buildState", 0),
            c = {
                activeFilter: "" === b._activeFilter ? "none" : b._activeFilter,
                activeSort: a && b._newSortString ? b._newSortString : b._activeSort,
                fail: !b._$show.length && "" !== b._activeFilter,
                $targets: b._$targets,
                $show: b._$show,
                $hide: b._$hide,
                totalTargets: b._$targets.length,
                totalShow: b._$show.length,
                totalHide: b._$hide.length,
                display: a && b._newDisplay ? b._newDisplay : b.layout.display
            },
            a ? b._execFilter("_buildState", c) : (b._state = c,
            void b._execAction("_buildState", 1))
        },
        _goMix: function(a) {
            var b = this
              , c = function() {
                b._chrome && 31 === b._chrome && f(b._$parent[0]),
                b._setInter(),
                d()
            }
              , d = function() {
                var a = window.pageYOffset
                  , c = window.pageXOffset;
                document.documentElement.scrollHeight;
                b._getInterMixData(),
                b._setFinal(),
                b._getFinalMixData(),
                window.pageYOffset !== a && window.scrollTo(c, a),
                b._prepTargets(),
                window.requestAnimationFrame ? requestAnimationFrame(e) : setTimeout(function() {
                    e()
                }, 20)
            }
              , e = function() {
                b._animateTargets(),
                0 === b._targetsBound && b._cleanUp()
            }
              , f = function(a) {
                var b = a.parentElement
                  , c = document.createElement("div")
                  , d = document.createDocumentFragment();
                b.insertBefore(c, a),
                d.appendChild(a),
                b.replaceChild(a, c)
            }
              , g = b._buildState(!0);
            b._execAction("_goMix", 0, arguments),
            !b.animation.duration && (a = !1),
            b._mixing = !0,
            b._$container.removeClass(b.layout.containerClassFail),
            "function" == typeof b.callbacks.onMixStart && b.callbacks.onMixStart.call(b._domNode, b._state, g, b),
            b._$container.trigger("mixStart", [b._state, g, b]),
            b._getOrigMixData(),
            a && !b._suckMode ? window.requestAnimationFrame ? requestAnimationFrame(c) : c() : b._cleanUp(),
            b._execAction("_goMix", 1, arguments)
        },
        _getTargetData: function(a, b) {
            var c, d = this;
            a.dataset[b + "PosX"] = a.offsetLeft,
            a.dataset[b + "PosY"] = a.offsetTop,
            d.animation.animateResizeTargets && (c = d._suckMode ? {
                marginBottom: "",
                marginRight: ""
            } : window.getComputedStyle(a),
            a.dataset[b + "MarginBottom"] = parseInt(c.marginBottom),
            a.dataset[b + "MarginRight"] = parseInt(c.marginRight),
            a.dataset[b + "Width"] = a.offsetWidth,
            a.dataset[b + "Height"] = a.offsetHeight)
        },
        _getOrigMixData: function() {
            var a = this
              , b = a._suckMode ? {
                boxSizing: ""
            } : window.getComputedStyle(a._$parent[0])
              , c = b.boxSizing || b[a._vendor + "BoxSizing"];
            a._incPadding = "border-box" === c,
            a._execAction("_getOrigMixData", 0),
            !a._suckMode && (a.effects = a._parseEffects()),
            a._$toHide = a._$hide.filter(":visible"),
            a._$toShow = a._$show.filter(":hidden"),
            a._$pre = a._$targets.filter(":visible"),
            a._startHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height();
            for (var d = 0; d < a._$pre.length; d++) {
                var e = a._$pre[d];
                a._getTargetData(e, "orig")
            }
            a._execAction("_getOrigMixData", 1)
        },
        _setInter: function() {
            var a = this;
            a._execAction("_setInter", 0),
            a._changingLayout && a.animation.animateChangeLayout ? (a._$toShow.css("display", a._newDisplay),
            a._changingClass && a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)) : a._$toShow.css("display", a.layout.display),
            a._execAction("_setInter", 1)
        },
        _getInterMixData: function() {
            var a = this;
            a._execAction("_getInterMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "inter")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "inter")
            }
            a._execAction("_getInterMixData", 1)
        },
        _setFinal: function() {
            var a = this;
            a._execAction("_setFinal", 0),
            a._sorting && a._printSort(),
            a._$toHide.removeStyle("display"),
            a._changingLayout && a.animation.animateChangeLayout && a._$pre.css("display", a._newDisplay),
            a._execAction("_setFinal", 1)
        },
        _getFinalMixData: function() {
            var a = this;
            a._execAction("_getFinalMixData", 0);
            for (var b = 0; b < a._$toShow.length; b++) {
                var c = a._$toShow[b];
                a._getTargetData(c, "final")
            }
            for (var b = 0; b < a._$pre.length; b++) {
                var c = a._$pre[b];
                a._getTargetData(c, "final")
            }
            a._newHeight = a._incPadding ? a._$parent.outerHeight() : a._$parent.height(),
            a._sorting && a._printSort(!0),
            a._$toShow.removeStyle("display"),
            a._$pre.css("display", a.layout.display),
            a._changingClass && a.animation.animateChangeLayout && a._$container.removeClass(a._newClass).addClass(a.layout.containerClass),
            a._execAction("_getFinalMixData", 1)
        },
        _prepTargets: function() {
            var b = this
              , c = {
                _in: b._getPrefixedCSS("transform", b.effects.transformIn),
                _out: b._getPrefixedCSS("transform", b.effects.transformOut)
            };
            b._execAction("_prepTargets", 0),
            b.animation.animateResizeContainer && b._$parent.css("height", b._startHeight + "px");
            for (var d = 0; d < b._$toShow.length; d++) {
                var e = b._$toShow[d]
                  , f = a(e);
                e.style.opacity = b.effects.opacity,
                e.style.display = b._changingLayout && b.animation.animateChangeLayout ? b._newDisplay : b.layout.display,
                f.css(c._in),
                b.animation.animateResizeTargets && (e.style.width = e.dataset.finalWidth + "px",
                e.style.height = e.dataset.finalHeight + "px",
                e.style.marginRight = -(e.dataset.finalWidth - e.dataset.interWidth) + 1 * e.dataset.finalMarginRight + "px",
                e.style.marginBottom = -(e.dataset.finalHeight - e.dataset.interHeight) + 1 * e.dataset.finalMarginBottom + "px")
            }
            for (var d = 0; d < b._$pre.length; d++) {
                var e = b._$pre[d]
                  , f = a(e)
                  , g = {
                    x: e.dataset.origPosX - e.dataset.interPosX,
                    y: e.dataset.origPosY - e.dataset.interPosY
                }
                  , c = b._getPrefixedCSS("transform", "translate(" + g.x + "px," + g.y + "px)");
                f.css(c),
                b.animation.animateResizeTargets && (e.style.width = e.dataset.origWidth + "px",
                e.style.height = e.dataset.origHeight + "px",
                e.dataset.origWidth - e.dataset.finalWidth && (e.style.marginRight = -(e.dataset.origWidth - e.dataset.interWidth) + 1 * e.dataset.origMarginRight + "px"),
                e.dataset.origHeight - e.dataset.finalHeight && (e.style.marginBottom = -(e.dataset.origHeight - e.dataset.interHeight) + 1 * e.dataset.origMarginBottom + "px"))
            }
            b._execAction("_prepTargets", 1)
        },
        _animateTargets: function() {
            var b = this;
            b._execAction("_animateTargets", 0),
            b._targetsDone = 0,
            b._targetsBound = 0,
            b._$parent.css(b._getPrefixedCSS("perspective", b.animation.perspectiveDistance + "px")).css(b._getPrefixedCSS("perspective-origin", b.animation.perspectiveOrigin)),
            b.animation.animateResizeContainer && b._$parent.css(b._getPrefixedCSS("transition", "height " + b.animation.duration + "ms ease")).css("height", b._newHeight + "px");
            for (var c = 0; c < b._$toShow.length; c++) {
                var d = b._$toShow[c]
                  , e = a(d)
                  , f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                }
                  , g = b._getDelay(c)
                  , h = {};
                d.style.opacity = "";
                for (var i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix : "";
                    b._ff && b._ff <= 20 && (h[j + "transition-property"] = "all",
                    h[j + "transition-timing-function"] = b.animation.easing + "ms",
                    h[j + "transition-duration"] = b.animation.duration + "ms"),
                    h[j + "transition-delay"] = g + "ms",
                    h[j + "transform"] = "translate(" + f.x + "px," + f.y + "px)"
                }
                (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e),
                b._ff && b._ff <= 20 ? e.css(h) : e.css(b.effects.transition).css(h)
            }
            for (var c = 0; c < b._$pre.length; c++) {
                var d = b._$pre[c]
                  , e = a(d)
                  , f = {
                    x: d.dataset.finalPosX - d.dataset.interPosX,
                    y: d.dataset.finalPosY - d.dataset.interPosY
                }
                  , g = b._getDelay(c);
                (d.dataset.finalPosX !== d.dataset.origPosX || d.dataset.finalPosY !== d.dataset.origPosY) && b._bindTargetDone(e),
                e.css(b._getPrefixedCSS("transition", "all " + b.animation.duration + "ms " + b.animation.easing + " " + g + "ms")),
                e.css(b._getPrefixedCSS("transform", "translate(" + f.x + "px," + f.y + "px)")),
                b.animation.animateResizeTargets && (d.dataset.origWidth - d.dataset.finalWidth && 1 * d.dataset.finalWidth && (d.style.width = d.dataset.finalWidth + "px",
                d.style.marginRight = -(d.dataset.finalWidth - d.dataset.interWidth) + 1 * d.dataset.finalMarginRight + "px"),
                d.dataset.origHeight - d.dataset.finalHeight && 1 * d.dataset.finalHeight && (d.style.height = d.dataset.finalHeight + "px",
                d.style.marginBottom = -(d.dataset.finalHeight - d.dataset.interHeight) + 1 * d.dataset.finalMarginBottom + "px"))
            }
            b._changingClass && b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);
            for (var c = 0; c < b._$toHide.length; c++) {
                for (var d = b._$toHide[c], e = a(d), g = b._getDelay(c), k = {}, i = 0; 2 > i; i++) {
                    var j = 0 === i ? j = b._prefix : "";
                    k[j + "transition-delay"] = g + "ms",
                    k[j + "transform"] = b.effects.transformOut,
                    k.opacity = b.effects.opacity
                }
                e.css(b.effects.transition).css(k),
                (b.effects.transform || b.effects.opacity) && b._bindTargetDone(e)
            }
            b._execAction("_animateTargets", 1)
        },
        _bindTargetDone: function(b) {
            var c = this
              , d = b[0];
            c._execAction("_bindTargetDone", 0, arguments),
            d.dataset.bound || (d.dataset.bound = !0,
            c._targetsBound++,
            b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp", function(e) {
                (e.originalEvent.propertyName.indexOf("transform") > -1 || e.originalEvent.propertyName.indexOf("opacity") > -1) && a(e.originalEvent.target).is(c.selectors.target) && (b.off(".mixItUp"),
                d.dataset.bound = "",
                c._targetDone())
            })),
            c._execAction("_bindTargetDone", 1, arguments)
        },
        _targetDone: function() {
            var a = this;
            a._execAction("_targetDone", 0),
            a._targetsDone++,
            a._targetsDone === a._targetsBound && a._cleanUp(),
            a._execAction("_targetDone", 1)
        },
        _cleanUp: function() {
            var b = this
              , c = b.animation.animateResizeTargets ? "transform opacity width height margin-bottom margin-right" : "transform opacity"
              , d = function() {
                b._$targets.removeStyle("transition", b._prefix)
            };
            b._execAction("_cleanUp", 0),
            b._changingLayout ? b._$show.css("display", b._newDisplay) : b._$show.css("display", b.layout.display),
            b._$targets.css(b._brake),
            b._$targets.removeStyle(c, b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),
            b._$hide.removeStyle("display"),
            b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin", b._prefix),
            b._sorting && (b._printSort(),
            b._activeSort = b._newSortString,
            b._sorting = !1),
            b._changingLayout && (b._changingDisplay && (b.layout.display = b._newDisplay,
            b._changingDisplay = !1),
            b._changingClass && (b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass),
            b.layout.containerClass = b._newClass,
            b._changingClass = !1),
            b._changingLayout = !1),
            b._refresh(),
            b._buildState(),
            b._state.fail && b._$container.addClass(b.layout.containerClassFail),
            b._$show = a(),
            b._$hide = a(),
            window.requestAnimationFrame && requestAnimationFrame(d),
            b._mixing = !1,
            "function" == typeof b.callbacks._user && b.callbacks._user.call(b._domNode, b._state, b),
            "function" == typeof b.callbacks.onMixEnd && b.callbacks.onMixEnd.call(b._domNode, b._state, b),
            b._$container.trigger("mixEnd", [b._state, b]),
            b._state.fail && ("function" == typeof b.callbacks.onMixFail && b.callbacks.onMixFail.call(b._domNode, b._state, b),
            b._$container.trigger("mixFail", [b._state, b])),
            b._loading && ("function" == typeof b.callbacks.onMixLoad && b.callbacks.onMixLoad.call(b._domNode, b._state, b),
            b._$container.trigger("mixLoad", [b._state, b])),
            b._queue.length && (b._execAction("_queue", 0),
            b.multiMix(b._queue[0][0], b._queue[0][1], b._queue[0][2]),
            b._queue.splice(0, 1)),
            b._execAction("_cleanUp", 1),
            b._loading = !1
        },
        _getPrefixedCSS: function(a, b, c) {
            var d = this
              , e = {}
              , f = ""
              , g = -1;
            for (g = 0; 2 > g; g++)
                f = 0 === g ? d._prefix : "",
                c ? e[f + a] = f + b : e[f + a] = b;
            return d._execFilter("_getPrefixedCSS", e, arguments)
        },
        _getDelay: function(a) {
            var b = this
              , c = "function" == typeof b.animation.staggerSequence ? b.animation.staggerSequence.call(b._domNode, a, b._state) : a
              , d = b.animation.stagger ? c * b.animation.staggerDuration : 0;
            return b._execFilter("_getDelay", d, arguments)
        },
        _parseMultiMixArgs: function(a) {
            for (var b = this, c = {
                command: null,
                animate: b.animation.enable,
                callback: null
            }, d = 0; d < a.length; d++) {
                var e = a[d];
                null !== e && ("object" == typeof e || "string" == typeof e ? c.command = e : "boolean" == typeof e ? c.animate = e : "function" == typeof e && (c.callback = e))
            }
            return b._execFilter("_parseMultiMixArgs", c, arguments)
        },
        _parseInsertArgs: function(b) {
            for (var c = this, d = {
                index: 0,
                $object: a(),
                multiMix: {
                    filter: c._state.activeFilter
                },
                callback: null
            }, e = 0; e < b.length; e++) {
                var f = b[e];
                "number" == typeof f ? d.index = f : "object" == typeof f && f instanceof a ? d.$object = f : "object" == typeof f && c._helpers._isElement(f) ? d.$object = a(f) : "object" == typeof f && null !== f ? d.multiMix = f : "boolean" != typeof f || f ? "function" == typeof f && (d.callback = f) : d.multiMix = !1
            }
            return c._execFilter("_parseInsertArgs", d, arguments)
        },
        _execAction: function(a, b, c) {
            var d = this
              , e = b ? "post" : "pre";
            if (!d._actions.isEmptyObject && d._actions.hasOwnProperty(a))
                for (var f in d._actions[a][e])
                    d._actions[a][e][f].call(d, c)
        },
        _execFilter: function(a, b, c) {
            var d = this;
            if (d._filters.isEmptyObject || !d._filters.hasOwnProperty(a))
                return b;
            for (var e in d._filters[a])
                return d._filters[a][e].call(d, c)
        },
        _helpers: {
            _camelCase: function(a) {
                return a.replace(/-([a-z])/g, function(a) {
                    return a[1].toUpperCase()
                })
            },
            _isElement: function(a) {
                return window.HTMLElement ? a instanceof HTMLElement : null !== a && 1 === a.nodeType && "string" === a.nodeName
            }
        },
        isMixing: function() {
            var a = this;
            return a._execFilter("isMixing", a._mixing)
        },
        filter: function() {
            var a = this
              , b = a._parseMultiMixArgs(arguments);
            a._clicking && (a._toggleString = ""),
            a.multiMix({
                filter: b.command
            }, b.animate, b.callback)
        },
        sort: function() {
            var a = this
              , b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                sort: b.command
            }, b.animate, b.callback)
        },
        changeLayout: function() {
            var a = this
              , b = a._parseMultiMixArgs(arguments);
            a.multiMix({
                changeLayout: b.command
            }, b.animate, b.callback)
        },
        multiMix: function() {
            var a = this
              , c = a._parseMultiMixArgs(arguments);
            if (a._execAction("multiMix", 0, arguments),
            a._mixing)
                a.animation.queue && a._queue.length < a.animation.queueLimit ? (a._queue.push(arguments),
                a.controls.enable && !a._clicking && a._updateControls(c.command),
                a._execAction("multiMixQueue", 1, arguments)) : ("function" == typeof a.callbacks.onMixBusy && a.callbacks.onMixBusy.call(a._domNode, a._state, a),
                a._$container.trigger("mixBusy", [a._state, a]),
                a._execAction("multiMixBusy", 1, arguments));
            else {
                a.controls.enable && !a._clicking && (a.controls.toggleFilterButtons && a._buildToggleArray(),
                a._updateControls(c.command, a.controls.toggleFilterButtons)),
                a._queue.length < 2 && (a._clicking = !1),
                delete a.callbacks._user,
                c.callback && (a.callbacks._user = c.callback);
                var d = c.command.sort
                  , e = c.command.filter
                  , f = c.command.changeLayout;
                a._refresh(),
                d && (a._newSort = a._parseSort(d),
                a._newSortString = d,
                a._sorting = !0,
                a._sort()),
                e !== b && (e = "all" === e ? a.selectors.target : e,
                a._activeFilter = e),
                a._filter(),
                f && (a._newDisplay = "string" == typeof f ? f : f.display || a.layout.display,
                a._newClass = f.containerClass || "",
                (a._newDisplay !== a.layout.display || a._newClass !== a.layout.containerClass) && (a._changingLayout = !0,
                a._changingClass = a._newClass !== a.layout.containerClass,
                a._changingDisplay = a._newDisplay !== a.layout.display)),
                a._$targets.css(a._brake),
                a._goMix(c.animate ^ a.animation.enable ? c.animate : a.animation.enable),
                a._execAction("multiMix", 1, arguments)
            }
        },
        insert: function() {
            var a = this
              , b = a._parseInsertArgs(arguments)
              , c = "function" == typeof b.callback ? b.callback : null
              , d = document.createDocumentFragment()
              , e = function() {
                return a._refresh(),
                a._$targets.length ? b.index < a._$targets.length || !a._$targets.length ? a._$targets[b.index] : a._$targets[a._$targets.length - 1].nextElementSibling : a._$parent[0].children[0]
            }();
            if (a._execAction("insert", 0, arguments),
            b.$object) {
                for (var f = 0; f < b.$object.length; f++) {
                    var g = b.$object[f];
                    d.appendChild(g),
                    d.appendChild(document.createTextNode(" "))
                }
                a._$parent[0].insertBefore(d, e)
            }
            a._execAction("insert", 1, arguments),
            "object" == typeof b.multiMix && a.multiMix(b.multiMix, c)
        },
        prepend: function() {
            var a = this
              , b = a._parseInsertArgs(arguments);
            a.insert(0, b.$object, b.multiMix, b.callback)
        },
        append: function() {
            var a = this
              , b = a._parseInsertArgs(arguments);
            a.insert(a._state.totalTargets, b.$object, b.multiMix, b.callback)
        },
        getOption: function(a) {
            var c = this
              , d = function(a, c) {
                for (var d = c.split("."), e = d.pop(), f = d.length, g = 1, h = d[0] || c; (a = a[h]) && f > g; )
                    h = d[g],
                    g++;
                return a !== b ? a[e] !== b ? a[e] : a : void 0
            };
            return a ? c._execFilter("getOption", d(c, a), arguments) : c
        },
        setOptions: function(b) {
            var c = this;
            c._execAction("setOptions", 0, arguments),
            "object" == typeof b && a.extend(!0, c, b),
            c._execAction("setOptions", 1, arguments)
        },
        getState: function() {
            var a = this;
            return a._execFilter("getState", a._state, a)
        },
        forceRefresh: function() {
            var a = this;
            a._refresh(!1, !0)
        },
        destroy: function(b) {
            var c = this
              , d = a.MixItUp.prototype._bound._filter
              , e = a.MixItUp.prototype._bound._sort;
            c._execAction("destroy", 0, arguments),
            c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");
            for (var f = 0; f < c._$targets.length; f++) {
                var g = c._$targets[f];
                b && (g.style.display = ""),
                delete g.mixParent
            }
            c._execAction("destroy", 1, arguments),
            d[c.selectors.filter] && d[c.selectors.filter] > 1 ? d[c.selectors.filter]-- : 1 === d[c.selectors.filter] && delete d[c.selectors.filter],
            e[c.selectors.sort] && e[c.selectors.sort] > 1 ? e[c.selectors.sort]-- : 1 === e[c.selectors.sort] && delete e[c.selectors.sort],
            delete a.MixItUp.prototype._instances[c._id]
        }
    },
    a.fn.mixItUp = function() {
        var c, d = arguments, e = [], f = function(b, c) {
            var d = new a.MixItUp
              , e = function() {
                return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase()
            };
            d._execAction("_instantiate", 0, arguments),
            b.id = b.id ? b.id : "MixItUp" + e(),
            d._instances[b.id] || (d._instances[b.id] = d,
            d._init(b, c)),
            d._execAction("_instantiate", 1, arguments)
        };
        return c = this.each(function() {
            if (d && "string" == typeof d[0]) {
                var c = a.MixItUp.prototype._instances[this.id];
                if ("isLoaded" === d[0])
                    e.push(c ? !0 : !1);
                else {
                    var g = c[d[0]](d[1], d[2], d[3]);
                    g !== b && e.push(g)
                }
            } else
                f(this, d[0])
        }),
        e.length ? e.length > 1 ? e : e[0] : c
    }
    ,
    a.fn.removeStyle = function(c, d) {
        return d = d ? d : "",
        this.each(function() {
            for (var e = this, f = c.split(" "), g = 0; g < f.length; g++)
                for (var h = 0; 4 > h; h++) {
                    switch (h) {
                    case 0:
                        var i = f[g];
                        break;
                    case 1:
                        var i = a.MixItUp.prototype._helpers._camelCase(i);
                        break;
                    case 2:
                        var i = d + f[g];
                        break;
                    case 3:
                        var i = a.MixItUp.prototype._helpers._camelCase(d + f[g])
                    }
                    if (e.style[i] !== b && "unknown" != typeof e.style[i] && e.style[i].length > 0 && (e.style[i] = ""),
                    !d && 1 === h)
                        break
                }
            e.attributes && e.attributes.style && e.attributes.style !== b && "" === e.attributes.style.value && e.attributes.removeNamedItem("style")
        })
    }
}(jQuery);
/*! typed */
(function(t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Typed = e() : t.Typed = e()
}
)(this, function() {
    return function(t) {
        function e(n) {
            if (s[n])
                return s[n].exports;
            var i = s[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(i.exports, i, i.exports, e),
            i.loaded = !0,
            i.exports
        }
        var s = {};
        return e.m = t,
        e.c = s,
        e.p = "",
        e(0)
    }([function(t, e, s) {
        "use strict";
        function n(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , r = s(1)
          , o = s(3)
          , a = function() {
            function t(e, s) {
                n(this, t),
                r.initializer.load(this, s, e),
                this.begin()
            }
            return i(t, [{
                key: "toggle",
                value: function() {
                    this.pause.status ? this.start() : this.stop()
                }
            }, {
                key: "stop",
                value: function() {
                    this.typingComplete || this.pause.status || (this.toggleBlinking(!0),
                    this.pause.status = !0,
                    this.options.onStop(this.arrayPos, this))
                }
            }, {
                key: "start",
                value: function() {
                    this.typingComplete || this.pause.status && (this.pause.status = !1,
                    this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos),
                    this.options.onStart(this.arrayPos, this))
                }
            }, {
                key: "destroy",
                value: function() {
                    this.reset(!1),
                    this.options.onDestroy(this)
                }
            }, {
                key: "reset",
                value: function() {
                    var t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                    clearInterval(this.timeout),
                    this.replaceText(""),
                    this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor),
                    this.cursor = null),
                    this.strPos = 0,
                    this.arrayPos = 0,
                    this.curLoop = 0,
                    t && (this.insertCursor(),
                    this.options.onReset(this),
                    this.begin())
                }
            }, {
                key: "begin",
                value: function() {
                    var t = this;
                    this.typingComplete = !1,
                    this.shuffleStringsIfNeeded(this),
                    this.insertCursor(),
                    this.bindInputFocusEvents && this.bindFocusEvents(),
                    this.timeout = setTimeout(function() {
                        t.currentElContent && 0 !== t.currentElContent.length ? t.backspace(t.currentElContent, t.currentElContent.length) : t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
                    }, this.startDelay)
                }
            }, {
                key: "typewrite",
                value: function(t, e) {
                    var s = this;
                    this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass),
                    this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                    var n = this.humanizer(this.typeSpeed)
                      , i = 1;
                    return this.pause.status === !0 ? void this.setPauseStatus(t, e, !0) : void (this.timeout = setTimeout(function() {
                        e = o.htmlParser.typeHtmlChars(t, e, s);
                        var n = 0
                          , r = t.substr(e);
                        if ("^" === r.charAt(0) && /^\^\d+/.test(r)) {
                            var a = 1;
                            r = /\d+/.exec(r)[0],
                            a += r.length,
                            n = parseInt(r),
                            s.temporaryPause = !0,
                            s.options.onTypingPaused(s.arrayPos, s),
                            t = t.substring(0, e) + t.substring(e + a),
                            s.toggleBlinking(!0)
                        }
                        if ("`" === r.charAt(0)) {
                            for (; "`" !== t.substr(e + i).charAt(0) && (i++,
                            !(e + i > t.length)); )
                                ;
                            var u = t.substring(0, e)
                              , l = t.substring(u.length + 1, e + i)
                              , c = t.substring(e + i + 1);
                            t = u + l + c,
                            i--
                        }
                        s.timeout = setTimeout(function() {
                            s.toggleBlinking(!1),
                            e === t.length ? s.doneTyping(t, e) : s.keepTyping(t, e, i),
                            s.temporaryPause && (s.temporaryPause = !1,
                            s.options.onTypingResumed(s.arrayPos, s))
                        }, n)
                    }, n))
                }
            }, {
                key: "keepTyping",
                value: function(t, e, s) {
                    0 === e && (this.toggleBlinking(!1),
                    this.options.preStringTyped(this.arrayPos, this)),
                    e += s;
                    var n = t.substr(0, e);
                    this.replaceText(n),
                    this.typewrite(t, e)
                }
            }, {
                key: "doneTyping",
                value: function(t, e) {
                    var s = this;
                    this.options.onStringTyped(this.arrayPos, this),
                    this.toggleBlinking(!0),
                    this.arrayPos === this.strings.length - 1 && (this.complete(),
                    this.loop === !1 || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function() {
                        s.backspace(t, e)
                    }, this.backDelay))
                }
            }, {
                key: "backspace",
                value: function(t, e) {
                    var s = this;
                    if (this.pause.status === !0)
                        return void this.setPauseStatus(t, e, !0);
                    if (this.fadeOut)
                        return this.initFadeOut();
                    this.toggleBlinking(!1);
                    var n = this.humanizer(this.backSpeed);
                    this.timeout = setTimeout(function() {
                        e = o.htmlParser.backSpaceHtmlChars(t, e, s);
                        var n = t.substr(0, e);
                        if (s.replaceText(n),
                        s.smartBackspace) {
                            var i = s.strings[s.arrayPos + 1];
                            i && n === i.substr(0, e) ? s.stopNum = e : s.stopNum = 0
                        }
                        e > s.stopNum ? (e--,
                        s.backspace(t, e)) : e <= s.stopNum && (s.arrayPos++,
                        s.arrayPos === s.strings.length ? (s.arrayPos = 0,
                        s.options.onLastStringBackspaced(),
                        s.shuffleStringsIfNeeded(),
                        s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e))
                    }, n)
                }
            }, {
                key: "complete",
                value: function() {
                    this.options.onComplete(this),
                    this.loop ? this.curLoop++ : this.typingComplete = !0
                }
            }, {
                key: "setPauseStatus",
                value: function(t, e, s) {
                    this.pause.typewrite = s,
                    this.pause.curString = t,
                    this.pause.curStrPos = e
                }
            }, {
                key: "toggleBlinking",
                value: function(t) {
                    if (this.cursor && !this.pause.status && this.cursorBlinking !== t) {
                        this.cursorBlinking = t;
                        var e = t ? "infinite" : 0;
                        this.cursor.style.animationIterationCount = e
                    }
                }
            }, {
                key: "humanizer",
                value: function(t) {
                    return Math.round(Math.random() * t / 2) + t
                }
            }, {
                key: "shuffleStringsIfNeeded",
                value: function() {
                    this.shuffle && (this.sequence = this.sequence.sort(function() {
                        return Math.random() - .5
                    }))
                }
            }, {
                key: "initFadeOut",
                value: function() {
                    var t = this;
                    return this.el.className += " " + this.fadeOutClass,
                    this.cursor && (this.cursor.className += " " + this.fadeOutClass),
                    setTimeout(function() {
                        t.arrayPos++,
                        t.replaceText(""),
                        t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0),
                        t.arrayPos = 0)
                    }, this.fadeOutDelay)
                }
            }, {
                key: "replaceText",
                value: function(t) {
                    this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t
                }
            }, {
                key: "bindFocusEvents",
                value: function() {
                    var t = this;
                    this.isInput && (this.el.addEventListener("focus", function(e) {
                        t.stop()
                    }),
                    this.el.addEventListener("blur", function(e) {
                        t.el.value && 0 !== t.el.value.length || t.start()
                    }))
                }
            }, {
                key: "insertCursor",
                value: function() {
                    this.showCursor && (this.cursor || (this.cursor = document.createElement("span"),
                    this.cursor.className = "typed-cursor",
                    this.cursor.innerHTML = this.cursorChar,
                    this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)))
                }
            }]),
            t
        }();
        e["default"] = a,
        t.exports = e["default"]
    }
    , function(t, e, s) {
        "use strict";
        function n(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        function i(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var s = arguments[e];
                for (var n in s)
                    Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n])
            }
            return t
        }
          , o = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , a = s(2)
          , u = n(a)
          , l = function() {
            function t() {
                i(this, t)
            }
            return o(t, [{
                key: "load",
                value: function(t, e, s) {
                    if ("string" == typeof s ? t.el = document.querySelector(s) : t.el = s,
                    t.options = r({}, u["default"], e),
                    t.isInput = "input" === t.el.tagName.toLowerCase(),
                    t.attr = t.options.attr,
                    t.bindInputFocusEvents = t.options.bindInputFocusEvents,
                    t.showCursor = !t.isInput && t.options.showCursor,
                    t.cursorChar = t.options.cursorChar,
                    t.cursorBlinking = !0,
                    t.elContent = t.attr ? t.el.getAttribute(t.attr) : t.el.textContent,
                    t.contentType = t.options.contentType,
                    t.typeSpeed = t.options.typeSpeed,
                    t.startDelay = t.options.startDelay,
                    t.backSpeed = t.options.backSpeed,
                    t.smartBackspace = t.options.smartBackspace,
                    t.backDelay = t.options.backDelay,
                    t.fadeOut = t.options.fadeOut,
                    t.fadeOutClass = t.options.fadeOutClass,
                    t.fadeOutDelay = t.options.fadeOutDelay,
                    t.isPaused = !1,
                    t.strings = t.options.strings.map(function(t) {
                        return t.trim()
                    }),
                    "string" == typeof t.options.stringsElement ? t.stringsElement = document.querySelector(t.options.stringsElement) : t.stringsElement = t.options.stringsElement,
                    t.stringsElement) {
                        t.strings = [],
                        t.stringsElement.style.display = "none";
                        var n = Array.prototype.slice.apply(t.stringsElement.children)
                          , i = !0
                          , o = !1
                          , a = void 0;
                        try {
                            for (var l, c = n[Symbol.iterator](); !(i = (l = c.next()).done); i = !0) {
                                var p = l.value;
                                t.strings.push(p.innerHTML.trim())
                            }
                        } catch (h) {
                            o = !0,
                            a = h
                        } finally {
                            try {
                                !i && c["return"] && c["return"]()
                            } finally {
                                if (o)
                                    throw a
                            }
                        }
                    }
                    t.strPos = 0,
                    t.arrayPos = 0,
                    t.stopNum = 0,
                    t.loop = t.options.loop,
                    t.loopCount = t.options.loopCount,
                    t.curLoop = 0,
                    t.shuffle = t.options.shuffle,
                    t.sequence = [],
                    t.pause = {
                        status: !1,
                        typewrite: !0,
                        curString: "",
                        curStrPos: 0
                    },
                    t.typingComplete = !1;
                    for (var f in t.strings)
                        t.sequence[f] = f;
                    t.currentElContent = this.getCurrentElContent(t),
                    t.autoInsertCss = t.options.autoInsertCss,
                    this.appendAnimationCss(t)
                }
            }, {
                key: "getCurrentElContent",
                value: function(t) {
                    var e = "";
                    return e = t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent
                }
            }, {
                key: "appendAnimationCss",
                value: function(t) {
                    if (t.autoInsertCss && t.showCursor && t.fadeOut) {
                        var e = document.createElement("style");
                        e.type = "text/css";
                        var s = "";
                        t.showCursor && (s += "\n        .typed-cursor{\n          opacity: 1;\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),
                        t.fadeOut && (s += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n          -webkit-animation: 0;\n                  animation: 0;\n        }\n      "),
                        0 !== e.length && (e.innerHTML = s,
                        document.head.appendChild(e))
                    }
                }
            }]),
            t
        }();
        e["default"] = l;
        var c = new l;
        e.initializer = c
    }
    , function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var s = {
            strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
            stringsElement: null,
            typeSpeed: 0,
            startDelay: 0,
            backSpeed: 0,
            smartBackspace: !0,
            shuffle: !1,
            backDelay: 700,
            fadeOut: !1,
            fadeOutClass: "typed-fade-out",
            fadeOutDelay: 500,
            loop: !1,
            loopCount: 1 / 0,
            showCursor: !0,
            cursorChar: "|",
            autoInsertCss: !0,
            attr: null,
            bindInputFocusEvents: !1,
            contentType: "html",
            onComplete: function(t) {},
            preStringTyped: function(t, e) {},
            onStringTyped: function(t, e) {},
            onLastStringBackspaced: function(t) {},
            onTypingPaused: function(t, e) {},
            onTypingResumed: function(t, e) {},
            onReset: function(t) {},
            onStop: function(t, e) {},
            onStart: function(t, e) {},
            onDestroy: function(t) {}
        };
        e["default"] = s,
        t.exports = e["default"]
    }
    , function(t, e) {
        "use strict";
        function s(t, e) {
            if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e) {
                for (var s = 0; s < e.length; s++) {
                    var n = e[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, s, n) {
                return s && t(e.prototype, s),
                n && t(e, n),
                e
            }
        }()
          , i = function() {
            function t() {
                s(this, t)
            }
            return n(t, [{
                key: "typeHtmlChars",
                value: function(t, e, s) {
                    if ("html" !== s.contentType)
                        return e;
                    var n = t.substr(e).charAt(0);
                    if ("<" === n || "&" === n) {
                        var i = "";
                        for (i = "<" === n ? ">" : ";"; t.substr(e + 1).charAt(0) !== i && (e++,
                        !(e + 1 > t.length)); )
                            ;
                        e++
                    }
                    return e
                }
            }, {
                key: "backSpaceHtmlChars",
                value: function(t, e, s) {
                    if ("html" !== s.contentType)
                        return e;
                    var n = t.substr(e).charAt(0);
                    if (">" === n || ";" === n) {
                        var i = "";
                        for (i = ">" === n ? "<" : "&"; t.substr(e - 1).charAt(0) !== i && (e--,
                        !(e < 0)); )
                            ;
                        e--
                    }
                    return e
                }
            }]),
            t
        }();
        e["default"] = i;
        var r = new i;
        e.htmlParser = r
    }
    ])
});
/*! parallax hover tilt effect */
"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
}
: function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}
;
!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = function(i, s) {
        return void 0 === s && (s = "undefined" != typeof window ? require("jquery") : require("jquery")(i)),
        t(s),
        s
    }
    : t(jQuery)
}(function(t) {
    return t.fn.tilt = function(i) {
        var s = function() {
            this.ticking || (requestAnimationFrame(g.bind(this)),
            this.ticking = !0)
        }
          , e = function() {
            var i = this;
            t(this).on("mousemove", o),
            t(this).on("mouseenter", a),
            this.settings.reset && t(this).on("mouseleave", h),
            this.settings.glare && t(window).on("resize", u.bind(i))
        }
          , n = function() {
            var i = this;
            void 0 !== this.timeout && clearTimeout(this.timeout),
            t(this).css({
                transition: this.settings.speed + "ms " + this.settings.easing
            }),
            this.settings.glare && this.glareElement.css({
                transition: "opacity " + this.settings.speed + "ms " + this.settings.easing
            }),
            this.timeout = setTimeout(function() {
                t(i).css({
                    transition: ""
                }),
                i.settings.glare && i.glareElement.css({
                    transition: ""
                })
            }, this.settings.speed)
        }
          , a = function(i) {
            this.ticking = !1,
            t(this).css({
                "will-change": "transform"
            }),
            n.call(this),
            t(this).trigger("tilt.mouseEnter")
        }
          , r = function(i) {
            return "undefined" == typeof i && (i = {
                pageX: t(this).offset().left + t(this).outerWidth() / 2,
                pageY: t(this).offset().top + t(this).outerHeight() / 2
            }),
            {
                x: i.pageX,
                y: i.pageY
            }
        }
          , o = function(t) {
            this.mousePositions = r(t),
            s.call(this)
        }
          , h = function() {
            n.call(this),
            this.reset = !0,
            s.call(this),
            t(this).trigger("tilt.mouseLeave")
        }
          , l = function() {
            var i = t(this).outerWidth()
              , s = t(this).outerHeight()
              , e = t(this).offset().left
              , n = t(this).offset().top
              , a = (this.mousePositions.x - e) / i
              , r = (this.mousePositions.y - n) / s
              , o = (this.settings.maxTilt / 2 - a * this.settings.maxTilt).toFixed(2)
              , h = (r * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2)
              , l = Math.atan2(this.mousePositions.x - (e + i / 2), -(this.mousePositions.y - (n + s / 2))) * (180 / Math.PI);
            return {
                tiltX: o,
                tiltY: h,
                percentageX: 100 * a,
                percentageY: 100 * r,
                angle: l
            }
        }
          , g = function() {
            return this.transforms = l.call(this),
            this.reset ? (this.reset = !1,
            t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(0deg) rotateY(0deg)"),
            void (this.settings.glare && (this.glareElement.css("transform", "rotate(180deg) translate(-50%, -50%)"),
            this.glareElement.css("opacity", "0")))) : (t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(" + ("x" === this.settings.axis ? 0 : this.transforms.tiltY) + "deg) rotateY(" + ("y" === this.settings.axis ? 0 : this.transforms.tiltX) + "deg) scale3d(" + this.settings.scale + "," + this.settings.scale + "," + this.settings.scale + ")"),
            this.settings.glare && (this.glareElement.css("transform", "rotate(" + this.transforms.angle + "deg) translate(-50%, -50%)"),
            this.glareElement.css("opacity", "" + this.transforms.percentageY * this.settings.maxGlare / 100)),
            t(this).trigger("change", [this.transforms]),
            void (this.ticking = !1))
        }
          , c = function() {
            var i = this.settings.glarePrerender;
            if (i || t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'),
            this.glareElementWrapper = t(this).find(".js-tilt-glare"),
            this.glareElement = t(this).find(".js-tilt-glare-inner"),
            !i) {
                var s = {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%"
                };
                this.glareElementWrapper.css(s).css({
                    overflow: "hidden"
                }),
                this.glareElement.css({
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "pointer-events": "none",
                    "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                    width: "" + 2 * t(this).outerWidth(),
                    height: "" + 2 * t(this).outerWidth(),
                    transform: "rotate(180deg) translate(-50%, -50%)",
                    "transform-origin": "0% 0%",
                    opacity: "0"
                })
            }
        }
          , u = function() {
            this.glareElement.css({
                width: "" + 2 * t(this).outerWidth(),
                height: "" + 2 * t(this).outerWidth()
            })
        };
        return t.fn.tilt.destroy = function() {
            t(this).each(function() {
                t(this).find(".js-tilt-glare").remove(),
                t(this).css({
                    "will-change": "",
                    transform: ""
                }),
                t(this).off("mousemove mouseenter mouseleave")
            })
        }
        ,
        t.fn.tilt.getValues = function() {
            var i = [];
            return t(this).each(function() {
                this.mousePositions = r.call(this),
                i.push(l.call(this))
            }),
            i
        }
        ,
        t.fn.tilt.reset = function() {
            t(this).each(function() {
                var i = this;
                this.mousePositions = r.call(this),
                this.settings = t(this).data("settings"),
                h.call(this),
                setTimeout(function() {
                    i.reset = !1
                }, this.settings.transition)
            })
        }
        ,
        this.each(function() {
            var s = this;
            this.settings = t.extend({
                maxTilt: t(this).is("[data-tilt-max]") ? t(this).data("tilt-max") : 20,
                perspective: t(this).is("[data-tilt-perspective]") ? t(this).data("tilt-perspective") : 300,
                easing: t(this).is("[data-tilt-easing]") ? t(this).data("tilt-easing") : "cubic-bezier(.03,.98,.52,.99)",
                scale: t(this).is("[data-tilt-scale]") ? t(this).data("tilt-scale") : "1",
                speed: t(this).is("[data-tilt-speed]") ? t(this).data("tilt-speed") : "400",
                transition: !t(this).is("[data-tilt-transition]") || t(this).data("tilt-transition"),
                axis: t(this).is("[data-tilt-axis]") ? t(this).data("tilt-axis") : null,
                reset: !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
                glare: !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
                maxGlare: t(this).is("[data-tilt-maxglare]") ? t(this).data("tilt-maxglare") : 1
            }, i),
            this.init = function() {
                t(s).data("settings", s.settings),
                s.settings.glare && c.call(s),
                e.call(s)
            }
            ,
            this.init()
        })
    }
    ,
    t("[data-tilt]").tilt(),
    !0
});
/*! Datepicker */
!function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    function a() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }
    function s(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }
    var n, o = (n = {
        get: function(t) {
            return this.slice(t)[0]
        },
        contains: function(t) {
            for (var e = t && t.valueOf(), i = 0, a = this.length; a > i; i++)
                if (this[i].valueOf() === e)
                    return i;
            return -1
        },
        remove: function(t) {
            this.splice(t, 1)
        },
        replace: function(e) {
            e && (t.isArray(e) || (e = [e]),
            this.clear(),
            this.push.apply(this, e))
        },
        clear: function() {
            this.length = 0
        },
        copy: function() {
            var t = new o;
            return t.replace(this),
            t
        }
    },
    function() {
        var e = [];
        return e.push.apply(e, arguments),
        t.extend(e, n),
        e
    }
    ), r = function(e, i) {
        t(e).data("datepicker", this),
        this._process_options(i),
        this.dates = new o,
        this.viewDate = this.o.defaultViewDate,
        this.focusDate = null,
        this.element = t(e),
        this.isInline = !1,
        this.isInput = this.element.is("input"),
        this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"),
        this.hasInput = this.component && this.element.find("input").length,
        this.component && 0 === this.component.length && (this.component = !1),
        this.picker = t(f.template),
        this._check_template(this.o.templates.leftArrow) && this.picker.find(".prev").html(this.o.templates.leftArrow),
        this._check_template(this.o.templates.rightArrow) && this.picker.find(".next").html(this.o.templates.rightArrow),
        this._buildEvents(),
        this._attachEvents(),
        this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"),
        this.o.rtl && this.picker.addClass("datepicker-rtl"),
        this.viewMode = this.o.startView,
        this.o.calendarWeeks && this.picker.find("thead .datepicker-title, tfoot .today, tfoot .clear").attr("colspan", function(t, e) {
            return parseInt(e) + 1
        }),
        this._allow_update = !1,
        this.setStartDate(this._o.startDate),
        this.setEndDate(this._o.endDate),
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),
        this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted),
        this.setDatesDisabled(this.o.datesDisabled),
        this.fillDow(),
        this.fillMonths(),
        this._allow_update = !0,
        this.update(),
        this.showMode(),
        this.isInline && this.show()
    };
    r.prototype = {
        constructor: r,
        _resolveViewName: function(t, i) {
            return 0 === t || "days" === t || "month" === t ? 0 : 1 === t || "months" === t || "year" === t ? 1 : 2 === t || "years" === t || "decade" === t ? 2 : 3 === t || "decades" === t || "century" === t ? 3 : 4 === t || "centuries" === t || "millennium" === t ? 4 : i !== e && i
        },
        _check_template: function(i) {
            try {
                return i !== e && "" !== i && ((i.match(/[<>]/g) || []).length <= 0 || t(i).length > 0)
            } catch (t) {
                return !1
            }
        },
        _process_options: function(e) {
            this._o = t.extend({}, this._o, e);
            var s = this.o = t.extend({}, this._o)
              , n = s.language;
            p[n] || (n = n.split("-")[0],
            p[n] || (n = c.language)),
            s.language = n,
            s.startView = this._resolveViewName(s.startView, 0),
            s.minViewMode = this._resolveViewName(s.minViewMode, 0),
            s.maxViewMode = this._resolveViewName(s.maxViewMode, 4),
            s.startView = Math.min(s.startView, s.maxViewMode),
            s.startView = Math.max(s.startView, s.minViewMode),
            !0 !== s.multidate && (s.multidate = Number(s.multidate) || !1,
            !1 !== s.multidate && (s.multidate = Math.max(0, s.multidate))),
            s.multidateSeparator = String(s.multidateSeparator),
            s.weekStart %= 7,
            s.weekEnd = (s.weekStart + 6) % 7;
            var o = f.parseFormat(s.format);
            if (s.startDate !== -1 / 0 && (s.startDate ? s.startDate instanceof Date ? s.startDate = this._local_to_utc(this._zero_time(s.startDate)) : s.startDate = f.parseDate(s.startDate, o, s.language, s.assumeNearbyYear) : s.startDate = -1 / 0),
            s.endDate !== 1 / 0 && (s.endDate ? s.endDate instanceof Date ? s.endDate = this._local_to_utc(this._zero_time(s.endDate)) : s.endDate = f.parseDate(s.endDate, o, s.language, s.assumeNearbyYear) : s.endDate = 1 / 0),
            s.daysOfWeekDisabled = s.daysOfWeekDisabled || [],
            t.isArray(s.daysOfWeekDisabled) || (s.daysOfWeekDisabled = s.daysOfWeekDisabled.split(/[,\s]*/)),
            s.daysOfWeekDisabled = t.map(s.daysOfWeekDisabled, function(t) {
                return parseInt(t, 10)
            }),
            s.daysOfWeekHighlighted = s.daysOfWeekHighlighted || [],
            t.isArray(s.daysOfWeekHighlighted) || (s.daysOfWeekHighlighted = s.daysOfWeekHighlighted.split(/[,\s]*/)),
            s.daysOfWeekHighlighted = t.map(s.daysOfWeekHighlighted, function(t) {
                return parseInt(t, 10)
            }),
            s.datesDisabled = s.datesDisabled || [],
            !t.isArray(s.datesDisabled)) {
                var r = [];
                r.push(f.parseDate(s.datesDisabled, o, s.language, s.assumeNearbyYear)),
                s.datesDisabled = r
            }
            s.datesDisabled = t.map(s.datesDisabled, function(t) {
                return f.parseDate(t, o, s.language, s.assumeNearbyYear)
            });
            var h = String(s.orientation).toLowerCase().split(/\s+/g)
              , l = s.orientation.toLowerCase();
            if (h = t.grep(h, function(t) {
                return /^auto|left|right|top|bottom$/.test(t)
            }),
            s.orientation = {
                x: "auto",
                y: "auto"
            },
            l && "auto" !== l)
                if (1 === h.length)
                    switch (h[0]) {
                    case "top":
                    case "bottom":
                        s.orientation.y = h[0];
                        break;
                    case "left":
                    case "right":
                        s.orientation.x = h[0]
                    }
                else
                    l = t.grep(h, function(t) {
                        return /^left|right$/.test(t)
                    }),
                    s.orientation.x = l[0] || "auto",
                    l = t.grep(h, function(t) {
                        return /^top|bottom$/.test(t)
                    }),
                    s.orientation.y = l[0] || "auto";
            if (s.defaultViewDate) {
                var d = s.defaultViewDate.year || (new Date).getFullYear()
                  , u = s.defaultViewDate.month || 0
                  , g = s.defaultViewDate.day || 1;
                s.defaultViewDate = i(d, u, g)
            } else
                s.defaultViewDate = a()
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++)
                i = t[n][0],
                2 === t[n].length ? (a = e,
                s = t[n][1]) : 3 === t[n].length && (a = t[n][1],
                s = t[n][2]),
                i.on(s, a)
        },
        _unapplyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++)
                i = t[n][0],
                2 === t[n].length ? (s = e,
                a = t[n][1]) : 3 === t[n].length && (s = t[n][1],
                a = t[n][2]),
                i.off(a, s)
        },
        _buildEvents: function() {
            var e = {
                keyup: t.proxy(function(e) {
                    -1 === t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update()
                }, this),
                keydown: t.proxy(this.keydown, this),
                paste: t.proxy(this.paste, this)
            };
            !0 === this.o.showOnFocus && (e.focus = t.proxy(this.show, this)),
            this.isInput ? this._events = [[this.element, e]] : this.component && this.hasInput ? this._events = [[this.element.find("input"), e], [this.component, {
                click: t.proxy(this.show, this)
            }]] : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
                click: t.proxy(this.show, this)
            }]],
            this._events.push([this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }], [this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }]),
            this.o.immediateUpdates && this._events.push([this.element, {
                "changeYear changeMonth": t.proxy(function(t) {
                    this.update(t.date)
                }, this)
            }]),
            this._secondaryEvents = [[this.picker, {
                click: t.proxy(this.click, this)
            }], [t(window), {
                resize: t.proxy(this.place, this)
            }], [t(document), {
                mousedown: t.proxy(function(t) {
                    this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.picker.hasClass("datepicker-inline") || this.hide()
                }, this)
            }]]
        },
        _attachEvents: function() {
            this._detachEvents(),
            this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(),
            this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var a = i || this.dates.get(-1)
              , s = this._utc_to_local(a);
            this.element.trigger({
                type: e,
                date: s,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1,
                    e = this.o.format) : "string" == typeof t && (e = t,
                    t = this.dates.length - 1),
                    e = e || this.o.format;
                    var i = this.dates.get(t);
                    return f.formatDate(i, e, this.o.language)
                }, this)
            })
        },
        show: function() {
            if (!(this.component ? this.element.find("input") : this.element).attr("readonly") || !1 !== this.o.enableOnReadonly)
                return this.isInline || this.picker.appendTo(this.o.container),
                this.place(),
                this.picker.show(),
                this._attachSecondaryEvents(),
                this._trigger("show"),
                (window.navigator.msMaxTouchPoints || "ontouchstart"in document) && this.o.disableTouchKeyboard && t(this.element).blur(),
                this
        },
        hide: function() {
            return this.isInline ? this : this.picker.is(":visible") ? (this.focusDate = null,
            this.picker.hide().detach(),
            this._detachSecondaryEvents(),
            this.viewMode = this.o.startView,
            this.showMode(),
            this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(),
            this._trigger("hide"),
            this) : this
        },
        destroy: function() {
            return this.hide(),
            this._detachEvents(),
            this._detachSecondaryEvents(),
            this.picker.remove(),
            delete this.element.data().datepicker,
            this.isInput || delete this.element.data().date,
            this
        },
        paste: function(e) {
            var i;
            if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types && -1 !== t.inArray("text/plain", e.originalEvent.clipboardData.types))
                i = e.originalEvent.clipboardData.getData("text/plain");
            else {
                if (!window.clipboardData)
                    return;
                i = window.clipboardData.getData("Text")
            }
            this.setDate(i),
            this.update(),
            e.preventDefault()
        },
        _utc_to_local: function(t) {
            return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(),t.getMonth(),t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            var t = this.dates.get(-1);
            return void 0 !== t ? new Date(t) : null
        },
        clearDates: function() {
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")),
            t && t.val(""),
            this.update(),
            this._trigger("changeDate"),
            this.o.autoclose && this.hide()
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, e),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            return this.update.apply(this, t.map(e, this._utc_to_local)),
            this._trigger("changeDate"),
            this.setValue(),
            this
        },
        setDate: s("setDates"),
        setUTCDate: s("setUTCDates"),
        remove: s("destroy"),
        setValue: function() {
            var t = this.getFormattedDate();
            return this.isInput ? this.element.val(t) : this.component && this.element.find("input").val(t),
            this
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var a = this.o.language;
            return t.map(this.dates, function(t) {
                return f.formatDate(t, i, a)
            }).join(this.o.multidateSeparator)
        },
        getStartDate: function() {
            return this.o.startDate
        },
        setStartDate: function(t) {
            return this._process_options({
                startDate: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        getEndDate: function() {
            return this.o.endDate
        },
        setEndDate: function(t) {
            return this._process_options({
                endDate: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDaysOfWeekDisabled: function(t) {
            return this._process_options({
                daysOfWeekDisabled: t
            }),
            this.update(),
            this.updateNavArrows(),
            this
        },
        setDaysOfWeekHighlighted: function(t) {
            return this._process_options({
                daysOfWeekHighlighted: t
            }),
            this.update(),
            this
        },
        setDatesDisabled: function(t) {
            this._process_options({
                datesDisabled: t
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (this.isInline)
                return this;
            var e = this.picker.outerWidth()
              , i = this.picker.outerHeight()
              , a = t(this.o.container)
              , s = a.width()
              , n = "body" === this.o.container ? t(document).scrollTop() : a.scrollTop()
              , o = a.offset()
              , r = [];
            this.element.parents().each(function() {
                var e = t(this).css("z-index");
                "auto" !== e && 0 !== e && r.push(parseInt(e))
            });
            var h = Math.max.apply(Math, r) + this.o.zIndexOffset
              , l = this.component ? this.component.parent().offset() : this.element.offset()
              , d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1)
              , c = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1)
              , u = l.left - o.left
              , p = l.top - o.top;
            "body" !== this.o.container && (p += n),
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),
            "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x),
            "right" === this.o.orientation.x && (u -= e - c)) : l.left < 0 ? (this.picker.addClass("datepicker-orient-left"),
            u -= l.left - 10) : u + e > s ? (this.picker.addClass("datepicker-orient-right"),
            u += c - e) : this.picker.addClass("datepicker-orient-left");
            var f = this.o.orientation.y;
            if ("auto" === f && (f = 0 > -n + p - i ? "bottom" : "top"),
            this.picker.addClass("datepicker-orient-" + f),
            "top" === f ? p -= i + parseInt(this.picker.css("padding-top")) : p += d,
            this.o.rtl) {
                var g = s - (u + c);
                this.picker.css({
                    top: p,
                    right: g,
                    zIndex: h
                })
            } else
                this.picker.css({
                    top: p,
                    left: u,
                    zIndex: h
                });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update)
                return this;
            var e = this.dates.copy()
              , i = []
              , a = !1;
            return arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                e instanceof Date && (e = this._local_to_utc(e)),
                i.push(e)
            }, this)),
            a = !0) : (i = (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val()) && this.o.multidate ? i.split(this.o.multidateSeparator) : [i],
            delete this.element.data().date),
            i = t.map(i, t.proxy(function(t) {
                return f.parseDate(t, this.o.format, this.o.language, this.o.assumeNearbyYear)
            }, this)),
            i = t.grep(i, t.proxy(function(t) {
                return !this.dateWithinRange(t) || !t
            }, this), !0),
            this.dates.replace(i),
            this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate ? this.viewDate = new Date(this.o.endDate) : this.viewDate = this.o.defaultViewDate,
            a ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"),
            !this.dates.length && e.length && this._trigger("clearDate"),
            this.fill(),
            this.element.change(),
            this
        },
        fillDow: function() {
            var e = this.o.weekStart
              , i = "<tr>";
            for (this.o.calendarWeeks && (this.picker.find(".datepicker-days .datepicker-switch").attr("colspan", function(t, e) {
                return parseInt(e) + 1
            }),
            i += '<th class="cw">&#160;</th>'); e < this.o.weekStart + 7; )
                i += '<th class="dow',
                t.inArray(e, this.o.daysOfWeekDisabled) > -1 && (i += " disabled"),
                i += '">' + p[this.o.language].daysMin[e++ % 7] + "</th>";
            i += "</tr>",
            this.picker.find(".datepicker-days thead").append(i)
        },
        fillMonths: function() {
            for (var t = this._utc_to_local(this.viewDate), e = "", i = 0; 12 > i; ) {
                e += '<span class="month' + (t && t.getMonth() === i ? " focused" : "") + '">' + p[this.o.language].monthsShort[i++] + "</span>"
            }
            this.picker.find(".datepicker-months td").html(e)
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf()
            }) : delete this.range,
            this.fill()
        },
        getClassNames: function(e) {
            var i = []
              , a = this.viewDate.getUTCFullYear()
              , s = this.viewDate.getUTCMonth()
              , n = new Date;
            return e.getUTCFullYear() < a || e.getUTCFullYear() === a && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > a || e.getUTCFullYear() === a && e.getUTCMonth() > s) && i.push("new"),
            this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"),
            this.o.todayHighlight && e.getUTCFullYear() === n.getFullYear() && e.getUTCMonth() === n.getMonth() && e.getUTCDate() === n.getDate() && i.push("today"),
            -1 !== this.dates.contains(e) && i.push("active"),
            (!this.dateWithinRange(e) || this.dateIsDisabled(e)) && i.push("disabled"),
            -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekHighlighted) && i.push("highlighted"),
            this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"),
            -1 !== t.inArray(e.valueOf(), this.range) && i.push("selected"),
            e.valueOf() === this.range[0] && i.push("range-start"),
            e.valueOf() === this.range[this.range.length - 1] && i.push("range-end")),
            i
        },
        _fill_yearsView: function(i, a, s, n, o, r, h, l) {
            var d, c, u, p, f, g, D, m, v, y, w;
            for (d = "",
            c = this.picker.find(i),
            u = parseInt(o / s, 10) * s,
            f = parseInt(r / n, 10) * n,
            g = parseInt(h / n, 10) * n,
            p = t.map(this.dates, function(t) {
                return parseInt(t.getUTCFullYear() / n, 10) * n
            }),
            c.find(".datepicker-switch").text(u + "-" + (u + 9 * n)),
            D = u - n,
            m = -1; 11 > m; m += 1)
                v = [a],
                y = null,
                -1 === m ? v.push("old") : 10 === m && v.push("new"),
                -1 !== t.inArray(D, p) && v.push("active"),
                (f > D || D > g) && v.push("disabled"),
                D === this.viewDate.getFullYear() && v.push("focused"),
                l !== t.noop && (w = l(new Date(D,0,1)),
                w === e ? w = {} : "boolean" == typeof w ? w = {
                    enabled: w
                } : "string" == typeof w && (w = {
                    classes: w
                }),
                !1 === w.enabled && v.push("disabled"),
                w.classes && (v = v.concat(w.classes.split(/\s+/))),
                w.tooltip && (y = w.tooltip)),
                d += '<span class="' + v.join(" ") + '"' + (y ? ' title="' + y + '"' : "") + ">" + D + "</span>",
                D += n;
            c.find("td").html(d)
        },
        fill: function() {
            var a, s, n = new Date(this.viewDate), o = n.getUTCFullYear(), r = n.getUTCMonth(), h = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0, l = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0, d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0, c = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0, u = p[this.o.language].today || p.en.today || "", g = p[this.o.language].clear || p.en.clear || "", D = p[this.o.language].titleFormat || p.en.titleFormat;
            if (!isNaN(o) && !isNaN(r)) {
                this.picker.find(".datepicker-days .datepicker-switch").text(f.formatDate(n, D, this.o.language)),
                this.picker.find("tfoot .today").text(u).toggle(!1 !== this.o.todayBtn),
                this.picker.find("tfoot .clear").text(g).toggle(!1 !== this.o.clearBtn),
                this.picker.find("thead .datepicker-title").text(this.o.title).toggle("" !== this.o.title),
                this.updateNavArrows(),
                this.fillMonths();
                var m = i(o, r - 1, 28)
                  , v = f.getDaysInMonth(m.getUTCFullYear(), m.getUTCMonth());
                m.setUTCDate(v),
                m.setUTCDate(v - (m.getUTCDay() - this.o.weekStart + 7) % 7);
                var y = new Date(m);
                m.getUTCFullYear() < 100 && y.setUTCFullYear(m.getUTCFullYear()),
                y.setUTCDate(y.getUTCDate() + 42),
                y = y.valueOf();
                for (var w, k = []; m.valueOf() < y; ) {
                    if (m.getUTCDay() === this.o.weekStart && (k.push("<tr>"),
                    this.o.calendarWeeks)) {
                        var C = new Date(+m + (this.o.weekStart - m.getUTCDay() - 7) % 7 * 864e5)
                          , _ = new Date(Number(C) + (11 - C.getUTCDay()) % 7 * 864e5)
                          , b = new Date(Number(b = i(_.getUTCFullYear(), 0, 1)) + (11 - b.getUTCDay()) % 7 * 864e5)
                          , T = (_ - b) / 864e5 / 7 + 1;
                        k.push('<td class="cw">' + T + "</td>")
                    }
                    (w = this.getClassNames(m)).push("day"),
                    this.o.beforeShowDay !== t.noop && ((s = this.o.beforeShowDay(this._utc_to_local(m))) === e ? s = {} : "boolean" == typeof s ? s = {
                        enabled: s
                    } : "string" == typeof s && (s = {
                        classes: s
                    }),
                    !1 === s.enabled && w.push("disabled"),
                    s.classes && (w = w.concat(s.classes.split(/\s+/))),
                    s.tooltip && (a = s.tooltip)),
                    w = t.unique(w),
                    k.push('<td class="' + w.join(" ") + '"' + (a ? ' title="' + a + '"' : "") + ">" + m.getUTCDate() + "</td>"),
                    a = null,
                    m.getUTCDay() === this.o.weekEnd && k.push("</tr>"),
                    m.setUTCDate(m.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(k.join(""));
                var M = p[this.o.language].monthsTitle || p.en.monthsTitle || "Months"
                  , U = this.picker.find(".datepicker-months").find(".datepicker-switch").text(this.o.maxViewMode < 2 ? M : o).end().find("span").removeClass("active");
                if (t.each(this.dates, function(t, e) {
                    e.getUTCFullYear() === o && U.eq(e.getUTCMonth()).addClass("active")
                }),
                (h > o || o > d) && U.addClass("disabled"),
                o === h && U.slice(0, l).addClass("disabled"),
                o === d && U.slice(c + 1).addClass("disabled"),
                this.o.beforeShowMonth !== t.noop) {
                    var x = this;
                    t.each(U, function(i, a) {
                        var s = new Date(o,i,1)
                          , n = x.o.beforeShowMonth(s);
                        n === e ? n = {} : "boolean" == typeof n ? n = {
                            enabled: n
                        } : "string" == typeof n && (n = {
                            classes: n
                        }),
                        !1 !== n.enabled || t(a).hasClass("disabled") || t(a).addClass("disabled"),
                        n.classes && t(a).addClass(n.classes),
                        n.tooltip && t(a).prop("title", n.tooltip)
                    })
                }
                this._fill_yearsView(".datepicker-years", "year", 10, 1, o, h, d, this.o.beforeShowYear),
                this._fill_yearsView(".datepicker-decades", "decade", 100, 10, o, h, d, this.o.beforeShowDecade),
                this._fill_yearsView(".datepicker-centuries", "century", 1e3, 100, o, h, d, this.o.beforeShowCentury)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t = new Date(this.viewDate)
                  , e = t.getUTCFullYear()
                  , i = t.getUTCMonth();
                switch (this.viewMode) {
                case 0:
                    this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }),
                    this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    });
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".prev").css({
                        visibility: "hidden"
                    }) : this.picker.find(".prev").css({
                        visibility: "visible"
                    }),
                    this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2 ? this.picker.find(".next").css({
                        visibility: "hidden"
                    }) : this.picker.find(".next").css({
                        visibility: "visible"
                    })
                }
            }
        },
        click: function(e) {
            var s, n, o, r, h, l, d;
            e.preventDefault(),
            e.stopPropagation(),
            (s = t(e.target)).hasClass("datepicker-switch") && this.showMode(1);
            var c = s.closest(".prev, .next");
            c.length > 0 && (n = f.modes[this.viewMode].navStep * (c.hasClass("prev") ? -1 : 1),
            0 === this.viewMode ? (this.viewDate = this.moveMonth(this.viewDate, n),
            this._trigger("changeMonth", this.viewDate)) : (this.viewDate = this.moveYear(this.viewDate, n),
            1 === this.viewMode && this._trigger("changeYear", this.viewDate)),
            this.fill()),
            s.hasClass("today") && (this.showMode(-2),
            this._setDate(a(), "linked" === this.o.todayBtn ? null : "view")),
            s.hasClass("clear") && this.clearDates(),
            s.hasClass("disabled") || (s.hasClass("day") && (o = parseInt(s.text(), 10) || 1,
            r = this.viewDate.getUTCFullYear(),
            h = this.viewDate.getUTCMonth(),
            s.hasClass("old") && (0 === h ? (h = 11,
            r -= 1,
            l = !0,
            d = !0) : (h -= 1,
            l = !0)),
            s.hasClass("new") && (11 === h ? (h = 0,
            r += 1,
            l = !0,
            d = !0) : (h += 1,
            l = !0)),
            this._setDate(i(r, h, o)),
            d && this._trigger("changeYear", this.viewDate),
            l && this._trigger("changeMonth", this.viewDate)),
            s.hasClass("month") && (this.viewDate.setUTCDate(1),
            o = 1,
            h = s.parent().find("span").index(s),
            r = this.viewDate.getUTCFullYear(),
            this.viewDate.setUTCMonth(h),
            this._trigger("changeMonth", this.viewDate),
            1 === this.o.minViewMode ? (this._setDate(i(r, h, o)),
            this.showMode()) : this.showMode(-1),
            this.fill()),
            (s.hasClass("year") || s.hasClass("decade") || s.hasClass("century")) && (this.viewDate.setUTCDate(1),
            o = 1,
            h = 0,
            r = parseInt(s.text(), 10) || 0,
            this.viewDate.setUTCFullYear(r),
            s.hasClass("year") && (this._trigger("changeYear", this.viewDate),
            2 === this.o.minViewMode && this._setDate(i(r, h, o))),
            s.hasClass("decade") && (this._trigger("changeDecade", this.viewDate),
            3 === this.o.minViewMode && this._setDate(i(r, h, o))),
            s.hasClass("century") && (this._trigger("changeCentury", this.viewDate),
            4 === this.o.minViewMode && this._setDate(i(r, h, o))),
            this.showMode(-1),
            this.fill())),
            this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(),
            delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(),
            -1 !== e ? (!0 === this.o.multidate || this.o.multidate > 1 || this.o.toggleActive) && this.dates.remove(e) : !1 === this.o.multidate ? (this.dates.clear(),
            this.dates.push(t)) : this.dates.push(t),
            "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate; )
                    this.dates.remove(0)
        },
        _setDate: function(t, e) {
            var i;
            e && "date" !== e || this._toggle_multidate(t && new Date(t)),
            e && "view" !== e || (this.viewDate = t && new Date(t)),
            this.fill(),
            this.setValue(),
            e && "view" === e || this._trigger("changeDate"),
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")),
            i && i.change(),
            !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveDay: function(t, e) {
            var i = new Date(t);
            return i.setUTCDate(t.getUTCDate() + e),
            i
        },
        moveWeek: function(t, e) {
            return this.moveDay(t, 7 * e)
        },
        moveMonth: function(t, e) {
            if (!(i = t) || isNaN(i.getTime()))
                return this.o.defaultViewDate;
            var i;
            if (!e)
                return t;
            var a, s, n = new Date(t.valueOf()), o = n.getUTCDate(), r = n.getUTCMonth(), h = Math.abs(e);
            if (e = e > 0 ? 1 : -1,
            1 === h)
                s = -1 === e ? function() {
                    return n.getUTCMonth() === r
                }
                : function() {
                    return n.getUTCMonth() !== a
                }
                ,
                a = r + e,
                n.setUTCMonth(a),
                (0 > a || a > 11) && (a = (a + 12) % 12);
            else {
                for (var l = 0; h > l; l++)
                    n = this.moveMonth(n, e);
                a = n.getUTCMonth(),
                n.setUTCDate(o),
                s = function() {
                    return a !== n.getUTCMonth()
                }
            }
            for (; s(); )
                n.setUTCDate(--o),
                n.setUTCMonth(a);
            return n
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        moveAvailableDate: function(t, e, i) {
            do {
                if (t = this[i](t, e),
                !this.dateWithinRange(t))
                    return !1;
                i = "moveDay"
            } while (this.dateIsDisabled(t));
            return t
        },
        weekOfDateIsDisabled: function(e) {
            return -1 !== t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled)
        },
        dateIsDisabled: function(e) {
            return this.weekOfDateIsDisabled(e) || t.grep(this.o.datesDisabled, function(t) {
                return a = t,
                (i = e).getUTCFullYear() === a.getUTCFullYear() && i.getUTCMonth() === a.getUTCMonth() && i.getUTCDate() === a.getUTCDate();
                var i, a
            }).length > 0
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (this.picker.is(":visible")) {
                var e, i, a, s = !1, n = this.focusDate || this.viewDate;
                switch (t.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null,
                    this.viewDate = this.dates.get(-1) || this.viewDate,
                    this.fill()) : this.hide(),
                    t.preventDefault(),
                    t.stopPropagation();
                    break;
                case 37:
                case 38:
                case 39:
                case 40:
                    if (!this.o.keyboardNavigation || 7 === this.o.daysOfWeekDisabled.length)
                        break;
                    e = 37 === t.keyCode || 38 === t.keyCode ? -1 : 1,
                    0 === this.viewMode ? t.ctrlKey ? (i = this.moveAvailableDate(n, e, "moveYear")) && this._trigger("changeYear", this.viewDate) : t.shiftKey ? (i = this.moveAvailableDate(n, e, "moveMonth")) && this._trigger("changeMonth", this.viewDate) : 37 === t.keyCode || 39 === t.keyCode ? i = this.moveAvailableDate(n, e, "moveDay") : this.weekOfDateIsDisabled(n) || (i = this.moveAvailableDate(n, e, "moveWeek")) : 1 === this.viewMode ? ((38 === t.keyCode || 40 === t.keyCode) && (e *= 4),
                    i = this.moveAvailableDate(n, e, "moveMonth")) : 2 === this.viewMode && ((38 === t.keyCode || 40 === t.keyCode) && (e *= 4),
                    i = this.moveAvailableDate(n, e, "moveYear")),
                    i && (this.focusDate = this.viewDate = i,
                    this.setValue(),
                    this.fill(),
                    t.preventDefault());
                    break;
                case 13:
                    if (!this.o.forceParse)
                        break;
                    n = this.focusDate || this.dates.get(-1) || this.viewDate,
                    this.o.keyboardNavigation && (this._toggle_multidate(n),
                    s = !0),
                    this.focusDate = null,
                    this.viewDate = this.dates.get(-1) || this.viewDate,
                    this.setValue(),
                    this.fill(),
                    this.picker.is(":visible") && (t.preventDefault(),
                    t.stopPropagation(),
                    this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null,
                    this.viewDate = this.dates.get(-1) || this.viewDate,
                    this.fill(),
                    this.hide()
                }
                if (s)
                    this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"),
                    this.isInput ? a = this.element : this.component && (a = this.element.find("input")),
                    a && a.change()
            } else
                (40 === t.keyCode || 27 === t.keyCode) && (this.show(),
                t.stopPropagation())
        },
        showMode: function(t) {
            t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + t))),
            this.picker.children("div").hide().filter(".datepicker-" + f.modes[this.viewMode].clsName).show(),
            this.updateNavArrows()
        }
    };
    var h = function(e, i) {
        t(e).data("datepicker", this),
        this.element = t(e),
        this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t
        }),
        delete i.inputs,
        d.call(t(this.inputs), i).on("changeDate", t.proxy(this.dateUpdated, this)),
        this.pickers = t.map(this.inputs, function(e) {
            return t(e).data("datepicker")
        }),
        this.updateDates()
    };
    h.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate()
            }),
            this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf()
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e)
            })
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var i = t(e.target).data("datepicker");
                if (void 0 !== i) {
                    var a = i.getUTCDate()
                      , s = t.inArray(e.target, this.inputs)
                      , n = s - 1
                      , o = s + 1
                      , r = this.inputs.length;
                    if (-1 !== s) {
                        if (t.each(this.pickers, function(t, e) {
                            e.getUTCDate() || e.setUTCDate(a)
                        }),
                        a < this.dates[n])
                            for (; n >= 0 && a < this.dates[n]; )
                                this.pickers[n--].setUTCDate(a);
                        else if (a > this.dates[o])
                            for (; r > o && a > this.dates[o]; )
                                this.pickers[o++].setUTCDate(a);
                        this.updateDates(),
                        delete this.updating
                    }
                }
            }
        },
        remove: function() {
            t.map(this.pickers, function(t) {
                t.remove()
            }),
            delete this.element.data().datepicker
        }
    };
    var l = t.fn.datepicker
      , d = function(i) {
        var a, s = Array.apply(null, arguments);
        if (s.shift(),
        this.each(function() {
            var e = t(this)
              , n = e.data("datepicker")
              , o = "object" == typeof i && i;
            if (!n) {
                var l = function(e, i) {
                    function a(t, e) {
                        return e.toLowerCase()
                    }
                    var s, n = t(e).data(), o = {}, r = new RegExp("^" + i.toLowerCase() + "([A-Z])");
                    i = new RegExp("^" + i.toLowerCase());
                    for (var h in n)
                        i.test(h) && (s = h.replace(r, a),
                        o[s] = n[h]);
                    return o
                }(this, "date")
                  , d = function(e) {
                    var i = {};
                    if (p[e] || (e = e.split("-")[0],
                    p[e])) {
                        var a = p[e];
                        return t.each(u, function(t, e) {
                            e in a && (i[e] = a[e])
                        }),
                        i
                    }
                }(t.extend({}, c, l, o).language)
                  , f = t.extend({}, c, d, l, o);
                e.hasClass("input-daterange") || f.inputs ? (t.extend(f, {
                    inputs: f.inputs || e.find("input").toArray()
                }),
                n = new h(this,f)) : n = new r(this,f),
                e.data("datepicker", n)
            }
            "string" == typeof i && "function" == typeof n[i] && (a = n[i].apply(n, s))
        }),
        a === e || a instanceof r || a instanceof h)
            return this;
        if (this.length > 1)
            throw new Error("Using only allowed for the collection of a single element (" + i + " function)");
        return a
    };
    t.fn.datepicker = d;
    var c = t.fn.datepicker.defaults = {
        assumeNearbyYear: !1,
        autoclose: !1,
        beforeShowDay: t.noop,
        beforeShowMonth: t.noop,
        beforeShowYear: t.noop,
        beforeShowDecade: t.noop,
        beforeShowCentury: t.noop,
        calendarWeeks: !1,
        clearBtn: !1,
        toggleActive: !1,
        daysOfWeekDisabled: [],
        daysOfWeekHighlighted: [],
        datesDisabled: [],
        endDate: 1 / 0,
        forceParse: !0,
        format: "mm/dd/yyyy",
        keyboardNavigation: !0,
        language: "en",
        minViewMode: 0,
        maxViewMode: 4,
        multidate: !1,
        multidateSeparator: ",",
        orientation: "auto",
        rtl: !1,
        startDate: -1 / 0,
        startView: 0,
        todayBtn: !1,
        todayHighlight: !1,
        weekStart: 0,
        disableTouchKeyboard: !1,
        enableOnReadonly: !0,
        showOnFocus: !0,
        zIndexOffset: 10,
        container: "body",
        immediateUpdates: !1,
        title: "",
        templates: {
            leftArrow: "&laquo;",
            rightArrow: "&raquo;"
        }
    }
      , u = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = r;
    var p = t.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear",
            titleFormat: "MM yyyy"
        }
    }
      , f = {
        modes: [{
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }, {
            clsName: "decades",
            navFnc: "FullDecade",
            navStep: 100
        }, {
            clsName: "centuries",
            navFnc: "FullCentury",
            navStep: 1e3
        }],
        isLeapYear: function(t) {
            return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
        },
        getDaysInMonth: function(t, e) {
            return [31, f.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
        parseFormat: function(t) {
            if ("function" == typeof t.toValue && "function" == typeof t.toDisplay)
                return t;
            var e = t.replace(this.validParts, "\0").split("\0")
              , i = t.match(this.validParts);
            if (!e || !e.length || !i || 0 === i.length)
                throw new Error("Invalid date format.");
            return {
                separators: e,
                parts: i
            }
        },
        parseDate: function(s, n, o, h) {
            function l(t, e) {
                return !0 === e && (e = 10),
                100 > t && ((t += 2e3) > (new Date).getFullYear() + e && (t -= 100)),
                t
            }
            function d() {
                var t = this.slice(0, v[g].length)
                  , e = v[g].slice(0, t.length);
                return t.toLowerCase() === e.toLowerCase()
            }
            if (!s)
                return e;
            if (s instanceof Date)
                return s;
            if ("string" == typeof n && (n = f.parseFormat(n)),
            n.toValue)
                return n.toValue(s, n, o);
            var c, u, g, D, m = /([\-+]\d+)([dmwy])/, v = s.match(/([\-+]\d+)([dmwy])/g), y = {
                d: "moveDay",
                m: "moveMonth",
                w: "moveWeek",
                y: "moveYear"
            }, w = {
                yesterday: "-1d",
                today: "+0d",
                tomorrow: "+1d"
            };
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s)) {
                for (s = new Date,
                g = 0; g < v.length; g++)
                    c = m.exec(v[g]),
                    u = parseInt(c[1]),
                    D = y[c[2]],
                    s = r.prototype[D](s, u);
                return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
            }
            if (void 0 !== w[s] && (v = (s = w[s]).match(/([\-+]\d+)([dmwy])/g),
            /^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(s))) {
                for (s = new Date,
                g = 0; g < v.length; g++)
                    c = m.exec(v[g]),
                    u = parseInt(c[1]),
                    D = y[c[2]],
                    s = r.prototype[D](s, u);
                return i(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate())
            }
            v = s && s.match(this.nonpunctuation) || [],
            s = new Date;
            var k, C, _ = {}, b = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], T = {
                yyyy: function(t, e) {
                    return t.setUTCFullYear(h ? l(e, h) : e)
                },
                yy: function(t, e) {
                    return t.setUTCFullYear(h ? l(e, h) : e)
                },
                m: function(t, e) {
                    if (isNaN(t))
                        return t;
                    for (e -= 1; 0 > e; )
                        e += 12;
                    for (e %= 12,
                    t.setUTCMonth(e); t.getUTCMonth() !== e; )
                        t.setUTCDate(t.getUTCDate() - 1);
                    return t
                },
                d: function(t, e) {
                    return t.setUTCDate(e)
                }
            };
            T.M = T.MM = T.mm = T.m,
            T.dd = T.d,
            s = a();
            var M = n.parts.slice();
            if (v.length !== M.length && (M = t(M).filter(function(e, i) {
                return -1 !== t.inArray(i, b)
            }).toArray()),
            v.length === M.length) {
                var U, x, F;
                for (g = 0,
                U = M.length; U > g; g++) {
                    if (k = parseInt(v[g], 10),
                    c = M[g],
                    isNaN(k))
                        switch (c) {
                        case "MM":
                            C = t(p[o].months).filter(d),
                            k = t.inArray(C[0], p[o].months) + 1;
                            break;
                        case "M":
                            C = t(p[o].monthsShort).filter(d),
                            k = t.inArray(C[0], p[o].monthsShort) + 1
                        }
                    _[c] = k
                }
                for (g = 0; g < b.length; g++)
                    F = b[g],
                    F in _ && !isNaN(_[F]) && (x = new Date(s),
                    T[F](x, _[F]),
                    isNaN(x) || (s = x))
            }
            return s
        },
        formatDate: function(e, i, a) {
            if (!e)
                return "";
            if ("string" == typeof i && (i = f.parseFormat(i)),
            i.toDisplay)
                return i.toDisplay(e, i, a);
            var s = {
                d: e.getUTCDate(),
                D: p[a].daysShort[e.getUTCDay()],
                DD: p[a].days[e.getUTCDay()],
                m: e.getUTCMonth() + 1,
                M: p[a].monthsShort[e.getUTCMonth()],
                MM: p[a].months[e.getUTCMonth()],
                yy: e.getUTCFullYear().toString().substring(2),
                yyyy: e.getUTCFullYear()
            };
            s.dd = (s.d < 10 ? "0" : "") + s.d,
            s.mm = (s.m < 10 ? "0" : "") + s.m,
            e = [];
            for (var n = t.extend([], i.separators), o = 0, r = i.parts.length; r >= o; o++)
                n.length && e.push(n.shift()),
                e.push(s[i.parts[o]]);
            return e.join("")
        },
        headTemplate: '<thead><tr><th colspan="7" class="datepicker-title"></th></tr><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    f.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + f.headTemplate + "<tbody></tbody>" + f.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + '</table></div><div class="datepicker-decades"><table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + '</table></div><div class="datepicker-centuries"><table class="table-condensed">' + f.headTemplate + f.contTemplate + f.footTemplate + "</table></div></div>",
    t.fn.datepicker.DPGlobal = f,
    t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = l,
        this
    }
    ,
    t.fn.datepicker.version = "1.6.0",
    t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(),
        d.call(i, "show"))
    }),
    t(function() {
        d.call(t('[data-provide="datepicker-inline"]'))
    })
});
/*! Date format */
!function(e) {
    var a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      , r = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      , t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      , n = [];
    n.Jan = "01",
    n.Feb = "02",
    n.Mar = "03",
    n.Apr = "04",
    n.May = "05",
    n.Jun = "06",
    n.Jul = "07",
    n.Aug = "08",
    n.Sep = "09",
    n.Oct = "10",
    n.Nov = "11",
    n.Dec = "12",
    e.format = function() {
        var e = function(e) {
            return n[e] || e
        }
          , s = function(e) {
            var a = e
              , r = "";
            if (-1 !== a.indexOf(".")) {
                var t = a.split(".");
                a = t[0],
                r = t[1]
            }
            var n = a.split(":");
            return 3 === n.length ? (hour = n[0],
            minute = n[1],
            second = n[2],
            {
                time: a,
                hour: hour,
                minute: minute,
                second: second,
                millis: r
            }) : {
                time: "",
                hour: "",
                minute: "",
                second: "",
                millis: ""
            }
        }
          , c = function(e, a) {
            for (var r = a - String(e).length, t = 0; t < r; t++)
                e = "0" + e;
            return e
        };
        return {
            date: function(n, u) {
                try {
                    var i = null
                      , o = null
                      , h = null
                      , b = null
                      , d = null;
                    if ("number" == typeof n)
                        return this.date(new Date(n), u);
                    if ("function" == typeof n.getFullYear)
                        i = n.getFullYear(),
                        o = n.getMonth() + 1,
                        h = n.getDate(),
                        b = n.getDay(),
                        d = s(n.toTimeString());
                    else if (-1 != n.search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/)) {
                        i = (l = n.split(/[T\+-]/))[0],
                        o = l[1],
                        h = l[2],
                        d = s(l[3].split(".")[0]),
                        b = new Date(i,o - 1,h).getDay()
                    } else {
                        var l;
                        switch ((l = n.split(" ")).length) {
                        case 6:
                            i = l[5],
                            o = e(l[1]),
                            h = l[2],
                            d = s(l[3]),
                            b = new Date(i,o - 1,h).getDay();
                            break;
                        case 2:
                            i = (y = l[0].split("-"))[0],
                            o = y[1],
                            h = y[2],
                            d = s(l[1]),
                            b = new Date(i,o - 1,h).getDay();
                            break;
                        case 7:
                        case 9:
                        case 10:
                            i = l[3],
                            o = e(l[1]),
                            h = l[2],
                            d = s(l[4]),
                            b = new Date(i,o - 1,h).getDay();
                            break;
                        case 1:
                            var y;
                            i = (y = l[0].split(""))[0] + y[1] + y[2] + y[3],
                            o = y[5] + y[6],
                            h = y[8] + y[9],
                            d = s(y[13] + y[14] + y[15] + y[16] + y[17] + y[18] + y[19] + y[20]),
                            b = new Date(i,o - 1,h).getDay();
                            break;
                        default:
                            return n
                        }
                    }
                    for (var k = "", f = "", g = "", m = 0; m < u.length; m++) {
                        var M = u.charAt(m);
                        switch (g = "",
                        k += M) {
                        case "ddd":
                            f += (w = b,
                            a[parseInt(w, 10)] || w),
                            k = "";
                            break;
                        case "dd":
                            if ("d" == u.charAt(m + 1))
                                break;
                            f += c(h, 2),
                            k = "";
                            break;
                        case "d":
                            if ("d" == u.charAt(m + 1))
                                break;
                            f += parseInt(h, 10),
                            k = "";
                            break;
                        case "D":
                            f += h += 1 == h || 21 == h || 31 == h ? "st" : 2 == h || 22 == h ? "nd" : 3 == h || 23 == h ? "rd" : "th",
                            k = "";
                            break;
                        case "MMMM":
                            f += (v = o,
                            void 0,
                            S = parseInt(v, 10) - 1,
                            t[S] || v),
                            k = "";
                            break;
                        case "MMM":
                            if ("M" === u.charAt(m + 1))
                                break;
                            f += (A = o,
                            void 0,
                            D = parseInt(A, 10) - 1,
                            r[D] || A),
                            k = "";
                            break;
                        case "MM":
                            if ("M" == u.charAt(m + 1))
                                break;
                            f += c(o, 2),
                            k = "";
                            break;
                        case "M":
                            if ("M" == u.charAt(m + 1))
                                break;
                            f += parseInt(o, 10),
                            k = "";
                            break;
                        case "y":
                        case "yyy":
                            if ("y" == u.charAt(m + 1))
                                break;
                            f += k,
                            k = "";
                            break;
                        case "yy":
                            if ("y" == u.charAt(m + 1) && "y" == u.charAt(m + 2))
                                break;
                            f += String(i).slice(-2),
                            k = "";
                            break;
                        case "yyyy":
                            f += i,
                            k = "";
                            break;
                        case "HH":
                            f += c(d.hour, 2),
                            k = "";
                            break;
                        case "H":
                            if ("H" == u.charAt(m + 1))
                                break;
                            f += parseInt(d.hour, 10),
                            k = "";
                            break;
                        case "hh":
                            var p = 0 == d.hour ? 12 : d.hour < 13 ? d.hour : d.hour - 12;
                            f += c(p, 2),
                            k = "";
                            break;
                        case "h":
                            if ("h" == u.charAt(m + 1))
                                break;
                            p = 0 == d.hour ? 12 : d.hour < 13 ? d.hour : d.hour - 12;
                            f += parseInt(p, 10),
                            k = "";
                            break;
                        case "mm":
                            f += c(d.minute, 2),
                            k = "";
                            break;
                        case "m":
                            if ("m" == u.charAt(m + 1))
                                break;
                            f += d.minute,
                            k = "";
                            break;
                        case "ss":
                            f += c(d.second.substring(0, 2), 2),
                            k = "";
                            break;
                        case "s":
                            if ("s" == u.charAt(m + 1))
                                break;
                            f += d.second,
                            k = "";
                            break;
                        case "S":
                        case "SS":
                            if ("S" == u.charAt(m + 1))
                                break;
                            f += k,
                            k = "";
                            break;
                        case "SSS":
                            f += d.millis.substring(0, 3),
                            k = "";
                            break;
                        case "a":
                            f += d.hour >= 12 ? "PM" : "AM",
                            k = "";
                            break;
                        case "p":
                            f += d.hour >= 12 ? "p.m." : "a.m.",
                            k = "";
                            break;
                        default:
                            f += M,
                            k = ""
                        }
                    }
                    return f += g
                } catch (e) {
                    return console.log(e),
                    n
                }
                var A, D, v, S, w
            },
            prettyDate: function(e) {
                var a, r, t;
                if ("string" == typeof e && (a = new Date(e)),
                "object" == typeof e && (a = new Date(e.toString())),
                r = ((new Date).getTime() - a.getTime()) / 1e3,
                t = Math.floor(r / 86400),
                !(isNaN(t) || t < 0))
                    return t >= 31 ? "more than 31 days" : 0 == t && ((r < 60 ? "just now" : r < 120 && "1 minute ago") || r < 3600 && Math.floor(r / 60) + " minutes ago" || r < 7200 && "1 hour ago" || r < 86400 && Math.floor(r / 3600) + " hours ago") || 1 == t && "Yesterday" || t < 7 && t + " days ago" || t < 31 && Math.ceil(t / 7) + " weeks ago"
            },
            toBrowserTimeZone: function(e, a) {
                return this.date(e, a || "MM/dd/yyyy")
            }
        }
    }()
}(jQuery);
/*! jQuery enllax - parallax effects */
!function(t) {
    "use strict";
    t.fn.enllax = function(r) {
        var a = t(window).height()
          , n = t(document).height()
          , o = t.extend({
            ratio: 0,
            type: "background",
            direction: "vertical"
        }, r)
          , e = t("[data-enllax-ratio]");
        e.each(function() {
            var r, e, s, i = t(this), c = i.offset().top, l = i.outerHeight(), p = i.data("enllax-ratio"), d = i.data("enllax-type"), x = i.data("enllax-direction");
            r = p ? p : o.ratio,
            e = d ? d : o.type,
            s = x ? x : o.direction;
            var f = Math.round(c * r)
              , u = Math.round((c - a / 2 + l) * r);
            "background" == e ? "vertical" == s ? i.css({
                "background-position": "center " + -f + "px"
            }) : "horizontal" == s && i.css({
                "background-position": -f + "px center"
            }) : "foreground" == e && ("vertical" == s ? i.css({
                "-webkit-transform": "translateY(" + u + "px)",
                "-moz-transform": "translateY(" + u + "px)",
                transform: "translateY(" + u + "px)"
            }) : "horizontal" == s && i.css({
                "-webkit-transform": "translateX(" + u + "px)",
                "-moz-transform": "translateX(" + u + "px)",
                transform: "translateX(" + u + "px)"
            })),
            t(window).on("scroll", function() {
                var o = t(this).scrollTop();
                f = Math.round((c - o) * r),
                u = Math.round((c - a / 2 + l - o) * r),
                "background" == e ? "vertical" == s ? i.css({
                    "background-position": "center " + -f + "px"
                }) : "horizontal" == s && i.css({
                    "background-position": -f + "px center"
                }) : "foreground" == e && n > o && ("vertical" == s ? i.css({
                    "-webkit-transform": "translateY(" + u + "px)",
                    "-moz-transform": "translateY(" + u + "px)",
                    transform: "translateY(" + u + "px)"
                }) : "horizontal" == s && i.css({
                    "-webkit-transform": "translateX(" + u + "px)",
                    "-moz-transform": "translateX(" + u + "px)",
                    transform: "translateX(" + u + "px)"
                }))
            })
        })
    }
}(jQuery);
