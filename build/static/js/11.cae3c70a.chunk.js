(this.webpackJsonp2fast=this.webpackJsonp2fast||[]).push([[11],{57:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(){return localStorage.getItem("user")}},591:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(13),l=a(16),o=a(15),c=a(0),i=a.n(c),s=a(59),u=a.n(s),m=a(57),A=a(93),p=a(556),d=a(18),g=(a(8),a(17)),h=a.n(g),f=a(62),E=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={project_name:" ",project_created:" ",status_name:" ",userhasproject_id:" "},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=Object(m.a)();t||this.props.history.push("/login"),u.a.get("".concat(f.getIP(),":5003/api/v1/userproject"),{headers:{"x-access-token":t}}).then((function(t){console.log("Status = "+t.data.Status),console.log("projectList = "+t.data.projectList),e.setState({projectList:t.data.projectList})})).catch((function(t){localStorage.removeItem("user"),localStorage.removeItem("user_id"),e.props.history.push("/login")}))}},{key:"render",value:function(){var e={position:"relative",float:"left",clear:"both",width:"100%"};return i.a.createElement("div",{className:"container-fluid"},i.a.createElement(h.a,null,i.a.createElement(A.a,null),i.a.createElement("h2",{className:"text-center",style:{marginTop:"5%"}},"\u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e15\u0e49\u0e2d\u0e07\u0e15\u0e34\u0e14\u0e15\u0e31\u0e49\u0e07"),i.a.createElement("br",null),i.a.createElement("div",{style:{position:"relative",width:"100%"}},i.a.createElement("div",{style:e},i.a.createElement(d.b,{className:"text-warning",to:"/maintenance"},i.a.createElement(p.a,{variant:"success"}," \u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e42\u0e23\u0e07\u0e1e\u0e22\u0e32\u0e1a\u0e32\u0e25 "))),i.a.createElement("div",{style:e},i.a.createElement(d.b,{className:"text-warning",to:"/maintenance"},i.a.createElement(p.a,{variant:"success"}," \u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e40\u0e23\u0e37\u0e2d\u0e19\u0e08\u0e33 "))),i.a.createElement("div",{style:e},i.a.createElement(d.b,{className:"text-warning",to:"/maintenance"},i.a.createElement(p.a,{variant:"danger"}," \u0e07\u0e32\u0e19\u0e17\u0e35\u0e48\u0e42\u0e23\u0e07\u0e1e\u0e22\u0e32\u0e1a\u0e32\u0e25 "))))))}}]),a}(c.Component);t.default=E},62:function(e,t){e.exports.getIP=function(){return"http://172.31.46.229"}},82:function(e,t,a){},83:function(e,t){e.exports="data:image/png;base64,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"},93:function(e,t,a){"use strict";var n=a(14),r=a(13),l=a(19),o=a(16),c=a(15),i=a(0),s=a.n(i),u=(a(59),a(57),a(1)),m=(a(82),a(49)),A=a(137),p=a.n(A),d=a(142),g=a.n(d),h=a(83),f=a.n(h),E=a(589),v=a(592),b=a(593),S=a(171),y=a(144),j=a.n(y),w=a(18),I=a(146),O=a.n(I),M=a(145),C=a.n(M),R=(a(8),a(17),function(e){Object(o.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={openLeft:!1,drawerStyle:'\n{\n  "background": "#F9F9F9",\n  "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, \n  rgba(0, 0, 0, 0.227451) 0px 6px 6px"\n}',relativeWidth:!1,width:"50%",noTouchOpen:!1,noTouchClose:!1},e.setWidth=function(t){e.setState({width:Number(t.target.value)||t.target.value})},e.setTouch=function(t){e.setState(Object(m.a)({},t.target.name,!t.target.checked))},e.setDrawerStyle=function(t){t.preventDefault(),e.setState({drawerStyle:e.drawerStyleRef.value})},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=(t.drawerStyle,t.openLeft),n=t.noTouchOpen,r=t.noTouchClose;return s.a.createElement("div",null,s.a.createElement("div",null,s.a.createElement(g.a,{fontSize:"large",onClick:function(){return e.setState({openLeft:!a})}})),s.a.createElement(p.a,Object.assign({},{overlayColor:"rgba(108,117,125,0.6)",maxWidth:"300px"},{width:this.state.width,fadeOut:!0,open:a,onChange:function(t){return e.setState({openLeft:t})},noTouchOpen:n,noTouchClose:r}),(function(t){var a=t/150;return s.a.createElement("div",{style:{backgroundColor:"rgba(255,255,255, ".concat(a,")"),width:"100%",height:"100%",position:"relative"}},s.a.createElement(E.a,{component:"nav","aria-label":"main mailbox folders"},s.a.createElement("div",{style:{width:"100%"}},s.a.createElement("img",{alt:"logo",src:f.a,style:{width:"50%",marginLeft:"auto",marginRight:"auto",display:"block",paddingBottom:"10px"}})),s.a.createElement(w.b,{className:"text-muted",to:"/profile"},s.a.createElement(v.a,{button:!0},s.a.createElement(b.a,null,s.a.createElement("p",{style:{fontSize:"4vw"}}," ",s.a.createElement(j.a,{style:{fontSize:"4vw"}})," Profile")))),s.a.createElement(w.b,{className:"text-muted",to:"/"},s.a.createElement(v.a,{button:!0},s.a.createElement(b.a,null,s.a.createElement("p",{style:{fontSize:"4vw"}}," ",s.a.createElement(C.a,{style:{fontSize:"4vw"}})," Maintenance Job")))),s.a.createElement(w.b,{className:"text-muted",to:"/maintenance"},s.a.createElement(v.a,{button:!0},s.a.createElement(b.a,null,s.a.createElement("p",{style:{fontSize:"4vw"}}," ",s.a.createElement(O.a,{style:{fontSize:"4vw"}})," Maintenance List"))))),s.a.createElement(E.a,{className:"text-muted",style:{position:"absolute",left:"0",bottom:"0",width:"100%"},component:"nav","aria-label":"main mailbox folders"},s.a.createElement(v.a,{button:!0,onClick:function(){return e.props.onLogout()}},s.a.createElement(b.a,null,s.a.createElement("p",{style:{fontSize:"4vw"}}," ",s.a.createElement(S.a,{style:{fontSize:"4vw"}})," Logout")))))})))}}]),a}(i.Component)),Z=function(e){Object(o.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).logout=r.logout.bind(Object(l.a)(r)),r}return Object(r.a)(a,[{key:"logout",value:function(){localStorage.removeItem("user"),localStorage.removeItem("user_id"),this.props.history.push("/login")}},{key:"render",value:function(){return s.a.createElement("div",{className:"container-fluid",style:{marginTop:"20px"}},s.a.createElement("div",null,s.a.createElement(R,{onLogout:this.logout})))}}]),a}(i.Component);t.a=Object(u.f)(Z)}}]);
//# sourceMappingURL=11.cae3c70a.chunk.js.map