(this.webpackJsonp2fast=this.webpackJsonp2fast||[]).push([[13],{57:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=function(){return localStorage.getItem("user")}},598:function(t,e,n){"use strict";n.r(e);var r=n(14),a=n(13),o=n(16),s=n(15),c=n(550),i=n(0),u=n.n(i),l=n(57),h=n(1),p=n(59),f=n.n(p),d=n(264),v=n(551),g=n.n(v);function m(){var t=Object(c.a)(["\nposition:absolute;\ntop:0;\nleft:0;\nright:0;\nbottom:0;\nmargin:auto;\n"]);return m=function(){return t},t}var b=Object(d.css)(m()),j=n(62),O=function(t){Object(o.a)(n,t);var e=Object(s.a)(n);function n(t){var a;return Object(r.a)(this,n),(a=e.call(this,t)).state={user:void 0},a}return Object(a.a)(n,[{key:"componentDidMount",value:function(){var t=this,e=Object(l.a)();e||this.props.history.push("/login"),f.a.get("".concat(j.getIP(),":5002/api/v1/GetUserData"),{headers:{"x-access-token":e}}).then((function(e){t.setState({user:e.data}),localStorage.setItem("user_id",e.data.user_id)})).catch((function(e){localStorage.removeItem("user"),localStorage.removeItem("user_id"),t.props.history.push("/login"),console.log("Error page auth = "+e)}))}},{key:"render",value:function(){return void 0===this.state.user?u.a.createElement("div",null,u.a.createElement("div",{style:{height:" 100%",width:"100%"}},u.a.createElement(g.a,{css:b,size:100,color:"#E8DA10"}))):u.a.createElement("div",null,this.props.children)}}]),n}(i.Component);e.default=Object(h.f)(O)},62:function(t,e){t.exports.getIP=function(){return"http://13.229.93.6"}}}]);
//# sourceMappingURL=13.7dc7c801.chunk.js.map