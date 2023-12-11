// Excanvas (Explorer Canvas) R43
// http://excanvas.sourceforge.net/
// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

if (!document.createElement("canvas").getContext) {
    (function() {
        var u = Math;
        var v = u.round;
        var r = u.sin;
        var C = u.cos;
        var l = u.abs;
        var B = u.sqrt;
        var a = 10;
        var n = a / 2;
        function g() {
            return this.context_ || (this.context_ = new p(this))
        }
        var t = Array.prototype.slice;
        function D(j, m, E) {
            var i = t.call(arguments, 2);
            return function() {
                return j.apply(m, i.concat(t.call(arguments)))
            }
        }
        var h = {
            init: function(i) {
                if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                    var j = i || document;
                    j.createElement("canvas");
                    j.attachEvent("onreadystatechange", D(this.init_, this, j))
                }
            },
            init_: function(F) {
                if (!F.namespaces.g_vml_) {
                    F.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML")
                }
                if (!F.namespaces.g_o_) {
                    F.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML")
                }
                if (!F.styleSheets.ex_canvas_) {
                    var E = F.createStyleSheet();
                    E.owningElement.id = "ex_canvas_";
                    E.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"
                }
                var m = F.getElementsByTagName("canvas");
                for (var j = 0; j < m.length; j++) {
                    this.initElement(m[j])
                }
            },
            initElement: function(j) {
                if (!j.getContext) {
                    j.getContext = g;
                    j.innerHTML = "";
                    j.attachEvent("onpropertychange", A);
                    j.attachEvent("onresize", b);
                    var i = j.attributes;
                    if (i.width && i.width.specified) {
                        j.style.width = i.width.nodeValue + "px"
                    } else {
                        j.width = j.clientWidth
                    }
                    if (i.height && i.height.specified) {
                        j.style.height = i.height.nodeValue + "px"
                    } else {
                        j.height = j.clientHeight
                    }
                }
                return j
            }
        };
        function A(j) {
            var i = j.srcElement;
            switch (j.propertyName) {
            case "width":
                i.style.width = i.attributes.width.nodeValue + "px";
                i.getContext().clearRect();
                break;
            case "height":
                i.style.height = i.attributes.height.nodeValue + "px";
                i.getContext().clearRect();
                break
            }
        }
        function b(j) {
            var i = j.srcElement;
            if (i.firstChild) {
                i.firstChild.style.width = i.clientWidth + "px";
                i.firstChild.style.height = i.clientHeight + "px"
            }
        }
        h.init();
        var e = [];
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 16; x++) {
                e[y * 16 + x] = y.toString(16) + x.toString(16)
            }
        }
        function q() {
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
        }
        function d(E, m) {
            var j = q();
            for (var i = 0; i < 3; i++) {
                for (var H = 0; H < 3; H++) {
                    var F = 0;
                    for (var G = 0; G < 3; G++) {
                        F += E[i][G] * m[G][H]
                    }
                    j[i][H] = F
                }
            }
            return j
        }
        function w(j, i) {
            i.fillStyle = j.fillStyle;
            i.lineCap = j.lineCap;
            i.lineJoin = j.lineJoin;
            i.lineWidth = j.lineWidth;
            i.miterLimit = j.miterLimit;
            i.shadowBlur = j.shadowBlur;
            i.shadowColor = j.shadowColor;
            i.shadowOffsetX = j.shadowOffsetX;
            i.shadowOffsetY = j.shadowOffsetY;
            i.strokeStyle = j.strokeStyle;
            i.globalAlpha = j.globalAlpha;
            i.arcScaleX_ = j.arcScaleX_;
            i.arcScaleY_ = j.arcScaleY_;
            i.lineScale_ = j.lineScale_
        }
        function c(m) {
            var G, F = 1;
            m = String(m);
            if (m.substring(0, 3) == "rgb") {
                var I = m.indexOf("(", 3);
                var j = m.indexOf(")", I + 1);
                var H = m.substring(I + 1, j).split(",");
                G = "#";
                for (var E = 0; E < 3; E++) {
                    G += e[Number(H[E])]
                }
                if (H.length == 4 && m.substr(3, 1) == "a") {
                    F = H[3]
                }
            } else {
                G = m
            }
            return {
                color: G,
                alpha: F
            }
        }
        function s(i) {
            switch (i) {
            case "butt":
                return "flat";
            case "round":
                return "round";
            case "square":
            default:
                return "square"
            }
        }
        function p(j) {
            this.m_ = q();
            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];
            this.strokeStyle = "#000";
            this.fillStyle = "#000";
            this.lineWidth = 1;
            this.lineJoin = "miter";
            this.lineCap = "butt";
            this.miterLimit = a * 1;
            this.globalAlpha = 1;
            this.canvas = j;
            var i = j.ownerDocument.createElement("div");
            i.style.width = j.clientWidth + "px";
            i.style.height = j.clientHeight + "px";
            i.style.overflow = "hidden";
            i.style.position = "absolute";
            j.appendChild(i);
            this.element_ = i;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1
        }
        var k = p.prototype;
        k.clearRect = function() {
            this.element_.innerHTML = ""
        }
        ;
        k.beginPath = function() {
            this.currentPath_ = []
        }
        ;
        k.moveTo = function(j, i) {
            var m = this.getCoords_(j, i);
            this.currentPath_.push({
                type: "moveTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        }
        ;
        k.lineTo = function(j, i) {
            var m = this.getCoords_(j, i);
            this.currentPath_.push({
                type: "lineTo",
                x: m.x,
                y: m.y
            });
            this.currentX_ = m.x;
            this.currentY_ = m.y
        }
        ;
        k.bezierCurveTo = function(m, j, J, I, H, F) {
            var i = this.getCoords_(H, F);
            var G = this.getCoords_(m, j);
            var E = this.getCoords_(J, I);
            o(this, G, E, i)
        }
        ;
        function o(i, E, m, j) {
            i.currentPath_.push({
                type: "bezierCurveTo",
                cp1x: E.x,
                cp1y: E.y,
                cp2x: m.x,
                cp2y: m.y,
                x: j.x,
                y: j.y
            });
            i.currentX_ = j.x;
            i.currentY_ = j.y
        }
        k.quadraticCurveTo = function(H, m, j, i) {
            var G = this.getCoords_(H, m);
            var F = this.getCoords_(j, i);
            var I = {
                x: this.currentX_ + 2 / 3 * (G.x - this.currentX_),
                y: this.currentY_ + 2 / 3 * (G.y - this.currentY_)
            };
            var E = {
                x: I.x + (F.x - this.currentX_) / 3,
                y: I.y + (F.y - this.currentY_) / 3
            };
            o(this, I, E, F)
        }
        ;
        k.arc = function(K, I, J, F, j, m) {
            J *= a;
            var O = m ? "at" : "wa";
            var L = K + C(F) * J - n;
            var N = I + r(F) * J - n;
            var i = K + C(j) * J - n;
            var M = I + r(j) * J - n;
            if (L == i && !m) {
                L += 0.125
            }
            var E = this.getCoords_(K, I);
            var H = this.getCoords_(L, N);
            var G = this.getCoords_(i, M);
            this.currentPath_.push({
                type: O,
                x: E.x,
                y: E.y,
                radius: J,
                xStart: H.x,
                yStart: H.y,
                xEnd: G.x,
                yEnd: G.y
            })
        }
        ;
        k.rect = function(m, j, i, E) {
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + E);
            this.lineTo(m, j + E);
            this.closePath()
        }
        ;
        k.strokeRect = function(m, j, i, E) {
            var F = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + E);
            this.lineTo(m, j + E);
            this.closePath();
            this.stroke();
            this.currentPath_ = F
        }
        ;
        k.fillRect = function(m, j, i, E) {
            var F = this.currentPath_;
            this.beginPath();
            this.moveTo(m, j);
            this.lineTo(m + i, j);
            this.lineTo(m + i, j + E);
            this.lineTo(m, j + E);
            this.closePath();
            this.fill();
            this.currentPath_ = F
        }
        ;
        k.createLinearGradient = function(j, E, i, m) {
            var F = new z("gradient");
            F.x0_ = j;
            F.y0_ = E;
            F.x1_ = i;
            F.y1_ = m;
            return F
        }
        ;
        k.createRadialGradient = function(E, G, m, j, F, i) {
            var H = new z("gradientradial");
            H.x0_ = E;
            H.y0_ = G;
            H.r0_ = m;
            H.x1_ = j;
            H.y1_ = F;
            H.r1_ = i;
            return H
        }
        ;
        k.drawImage = function(R, m) {
            var K, I, M, Z, P, N, T, ab;
            var L = R.runtimeStyle.width;
            var Q = R.runtimeStyle.height;
            R.runtimeStyle.width = "auto";
            R.runtimeStyle.height = "auto";
            var J = R.width;
            var X = R.height;
            R.runtimeStyle.width = L;
            R.runtimeStyle.height = Q;
            if (arguments.length == 3) {
                K = arguments[1];
                I = arguments[2];
                P = N = 0;
                T = M = J;
                ab = Z = X
            } else {
                if (arguments.length == 5) {
                    K = arguments[1];
                    I = arguments[2];
                    M = arguments[3];
                    Z = arguments[4];
                    P = N = 0;
                    T = J;
                    ab = X
                } else {
                    if (arguments.length == 9) {
                        P = arguments[1];
                        N = arguments[2];
                        T = arguments[3];
                        ab = arguments[4];
                        K = arguments[5];
                        I = arguments[6];
                        M = arguments[7];
                        Z = arguments[8]
                    } else {
                        throw Error("Invalid number of arguments")
                    }
                }
            }
            var aa = this.getCoords_(K, I);
            var E = T / 2;
            var j = ab / 2;
            var Y = [];
            var i = 10;
            var G = 10;
            Y.push(" <g_vml_:group", ' coordsize="', a * i, ",", a * G, '"', ' coordorigin="0,0"', ' style="width:', i, "px;height:", G, "px;position:absolute;");
            if (this.m_[0][0] != 1 || this.m_[0][1]) {
                var F = [];
                F.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", v(aa.x / a), ",", "Dy=", v(aa.y / a), "");
                var V = aa;
                var U = this.getCoords_(K + M, I);
                var S = this.getCoords_(K, I + Z);
                var O = this.getCoords_(K + M, I + Z);
                V.x = u.max(V.x, U.x, S.x, O.x);
                V.y = u.max(V.y, U.y, S.y, O.y);
                Y.push("padding:0 ", v(V.x / a), "px ", v(V.y / a), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", F.join(""), ", sizingmethod='clip');")
            } else {
                Y.push("top:", v(aa.y / a), "px;left:", v(aa.x / a), "px;")
            }
            Y.push(' ">', '<g_vml_:image src="', R.src, '"', ' style="width:', a * M, "px;", " height:", a * Z, 'px;"', ' cropleft="', P / J, '"', ' croptop="', N / X, '"', ' cropright="', (J - P - T) / J, '"', ' cropbottom="', (X - N - ab) / X, '"', " />", "</g_vml_:group>");
            this.element_.insertAdjacentHTML("BeforeEnd", Y.join(""))
        }
        ;
        k.stroke = function(ae) {
            var J = [];
            var K = false;
            var ap = c(ae ? this.fillStyle : this.strokeStyle);
            var aa = ap.color;
            var ak = ap.alpha * this.globalAlpha;
            var F = 10;
            var M = 10;
            J.push("<g_vml_:shape", ' filled="', !!ae, '"', ' style="position:absolute;width:', F, "px;height:", M, 'px;"', ' coordorigin="0 0" coordsize="', a * F, " ", a * M, '"', ' stroked="', !ae, '"', ' path="');
            var L = false;
            var ao = {
                x: null,
                y: null
            };
            var V = {
                x: null,
                y: null
            };
            for (var aj = 0; aj < this.currentPath_.length; aj++) {
                var ai = this.currentPath_[aj];
                var an;
                switch (ai.type) {
                case "moveTo":
                    an = ai;
                    J.push(" m ", v(ai.x), ",", v(ai.y));
                    break;
                case "lineTo":
                    J.push(" l ", v(ai.x), ",", v(ai.y));
                    break;
                case "close":
                    J.push(" x ");
                    ai = null;
                    break;
                case "bezierCurveTo":
                    J.push(" c ", v(ai.cp1x), ",", v(ai.cp1y), ",", v(ai.cp2x), ",", v(ai.cp2y), ",", v(ai.x), ",", v(ai.y));
                    break;
                case "at":
                case "wa":
                    J.push(" ", ai.type, " ", v(ai.x - this.arcScaleX_ * ai.radius), ",", v(ai.y - this.arcScaleY_ * ai.radius), " ", v(ai.x + this.arcScaleX_ * ai.radius), ",", v(ai.y + this.arcScaleY_ * ai.radius), " ", v(ai.xStart), ",", v(ai.yStart), " ", v(ai.xEnd), ",", v(ai.yEnd));
                    break
                }
                if (ai) {
                    if (ao.x == null || ai.x < ao.x) {
                        ao.x = ai.x
                    }
                    if (V.x == null || ai.x > V.x) {
                        V.x = ai.x
                    }
                    if (ao.y == null || ai.y < ao.y) {
                        ao.y = ai.y
                    }
                    if (V.y == null || ai.y > V.y) {
                        V.y = ai.y
                    }
                }
            }
            J.push(' ">');
            if (!ae) {
                var U = this.lineScale_ * this.lineWidth;
                if (U < 1) {
                    ak *= U
                }
                J.push("<g_vml_:stroke", ' opacity="', ak, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', s(this.lineCap), '"', ' weight="', U, 'px"', ' color="', aa, '" />')
            } else {
                if (typeof this.fillStyle == "object") {
                    var N = this.fillStyle;
                    var S = 0;
                    var ah = {
                        x: 0,
                        y: 0
                    };
                    var ab = 0;
                    var Q = 1;
                    if (N.type_ == "gradient") {
                        var P = N.x0_ / this.arcScaleX_;
                        var m = N.y0_ / this.arcScaleY_;
                        var O = N.x1_ / this.arcScaleX_;
                        var aq = N.y1_ / this.arcScaleY_;
                        var am = this.getCoords_(P, m);
                        var al = this.getCoords_(O, aq);
                        var I = al.x - am.x;
                        var G = al.y - am.y;
                        S = Math.atan2(I, G) * 180 / Math.PI;
                        if (S < 0) {
                            S += 360
                        }
                        if (S < 0.000001) {
                            S = 0
                        }
                    } else {
                        var am = this.getCoords_(N.x0_, N.y0_);
                        var j = V.x - ao.x;
                        var E = V.y - ao.y;
                        ah = {
                            x: (am.x - ao.x) / j,
                            y: (am.y - ao.y) / E
                        };
                        j /= this.arcScaleX_ * a;
                        E /= this.arcScaleY_ * a;
                        var ag = u.max(j, E);
                        ab = 2 * N.r0_ / ag;
                        Q = 2 * N.r1_ / ag - ab
                    }
                    var Z = N.colors_;
                    Z.sort(function(H, i) {
                        return H.offset - i.offset
                    });
                    var T = Z.length;
                    var Y = Z[0].color;
                    var X = Z[T - 1].color;
                    var ad = Z[0].alpha * this.globalAlpha;
                    var ac = Z[T - 1].alpha * this.globalAlpha;
                    var af = [];
                    for (var aj = 0; aj < T; aj++) {
                        var R = Z[aj];
                        af.push(R.offset * Q + ab + " " + R.color)
                    }
                    J.push('<g_vml_:fill type="', N.type_, '"', ' method="none" focus="100%"', ' color="', Y, '"', ' color2="', X, '"', ' colors="', af.join(","), '"', ' opacity="', ac, '"', ' g_o_:opacity2="', ad, '"', ' angle="', S, '"', ' focusposition="', ah.x, ",", ah.y, '" />')
                } else {
                    J.push('<g_vml_:fill color="', aa, '" opacity="', ak, '" />')
                }
            }
            J.push("</g_vml_:shape>");
            this.element_.insertAdjacentHTML("beforeEnd", J.join(""))
        }
        ;
        k.fill = function() {
            this.stroke(true)
        }
        ;
        k.closePath = function() {
            this.currentPath_.push({
                type: "close"
            })
        }
        ;
        k.getCoords_ = function(E, j) {
            var i = this.m_;
            return {
                x: a * (E * i[0][0] + j * i[1][0] + i[2][0]) - n,
                y: a * (E * i[0][1] + j * i[1][1] + i[2][1]) - n
            }
        }
        ;
        k.save = function() {
            var i = {};
            w(this, i);
            this.aStack_.push(i);
            this.mStack_.push(this.m_);
            this.m_ = d(q(), this.m_)
        }
        ;
        k.restore = function() {
            w(this.aStack_.pop(), this);
            this.m_ = this.mStack_.pop()
        }
        ;
        k.translate = function(m, j) {
            var i = [[1, 0, 0], [0, 1, 0], [m, j, 1]];
            this.m_ = d(i, this.m_)
        }
        ;
        k.rotate = function(j) {
            var E = C(j);
            var m = r(j);
            var i = [[E, m, 0], [-m, E, 0], [0, 0, 1]];
            this.m_ = d(i, this.m_)
        }
        ;
        k.scale = function(G, F) {
            this.arcScaleX_ *= G;
            this.arcScaleY_ *= F;
            var j = [[G, 0, 0], [0, F, 0], [0, 0, 1]];
            var i = this.m_ = d(j, this.m_);
            var E = i[0][0] * i[1][1] - i[0][1] * i[1][0];
            this.lineScale_ = B(l(E))
        }
        ;
        k.clip = function() {}
        ;
        k.arcTo = function() {}
        ;
        k.createPattern = function() {
            return new f
        }
        ;
        function z(i) {
            this.type_ = i;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = []
        }
        z.prototype.addColorStop = function(j, i) {
            i = c(i);
            this.colors_.push({
                offset: j,
                color: i.color,
                alpha: i.alpha
            })
        }
        ;
        function f() {}
        G_vmlCanvasManager = h;
        CanvasRenderingContext2D = p;
        CanvasGradient = z;
        CanvasPattern = f
    }
    )()
}
;
