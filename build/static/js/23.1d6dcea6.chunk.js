(this.webpackJsonp2fast=this.webpackJsonp2fast||[]).push([[23],{45:function(t,e){t.exports.removeDataLocalStorage=function(){localStorage.removeItem("user"),localStorage.removeItem("user_id"),localStorage.removeItem("teamproject_ID")}},47:function(t,e){t.exports.getIP=function(){return"http://54.254.61.44"}},49:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a=function(){return localStorage.getItem("user")}},609:function(t,e,n){"use strict";n.r(e);var a=n(14),r=n(13),o=n(16),c=n(15),s=n(436),i=n(0),u=n.n(i),l=n(49),h=n(1),p=n(54),f=n.n(p),v=n(274),m=n(437),d=n.n(m);function g(){var t=Object(s.a)(["\nposition:absolute;\ntop:0;\nleft:0;\nright:0;\nbottom:0;\nmargin:auto;\n"]);return g=function(){return t},t}var b=Object(v.css)(g()),j=n(47),I=n(45),O=function(t){Object(o.a)(n,t);var e=Object(c.a)(n);function n(t){var r;return Object(a.a)(this,n),(r=e.call(this,t)).state={user:void 0},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=Object(l.a)();e||this.props.history.push("/login"),f.a.get("".concat(j.getIP(),":5002/api/v1/GetUserData"),{headers:{"x-access-token":e}}).then((function(e){t.setState({user:e.data}),localStorage.setItem("user_id",e.data.user_id)})).catch((function(e){I.removeDataLocalStorage(),t.props.history.push("/login")}))}},{key:"render",value:function(){return void 0===this.state.user?u.a.createElement("div",null,u.a.createElement("div",{style:{height:" 100%",width:"100%"}},u.a.createElement(d.a,{css:b,size:100,color:"#E8DA10"}))):u.a.createElement("div",null,this.props.children)}}]),n}(i.Component);e.default=Object(h.f)(O)}}]);
//# sourceMappingURL=23.1d6dcea6.chunk.js.map