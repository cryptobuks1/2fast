(this.webpackJsonp2fast=this.webpackJsonp2fast||[]).push([[12],{293:function(e,t,a){e.exports=a.p+"static/media/newFast.0dbcc048.svg"},294:function(e,t,a){e.exports=a.p+"static/media/newLogo.c29196c1.svg"},605:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var n=a(49),s=a(14),r=a(13),i=a(19),o=a(16),l=a(15),c=a(0),u=a.n(c),m=a(59),p=a.n(m),g=a(600),d=a(590),h=a(293),f=a.n(h),b=a(294),v=a.n(b),y=a(2),w=a(7),S=a(56),E=a.n(S),x=a(81),k=u.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.variant,s=e.animation,r=e.size,i=e.children,o=e.as,l=void 0===o?"div":o,c=e.className,m=Object(w.a)(e,["bsPrefix","variant","animation","size","children","as","className"]),p=(a=Object(x.a)(a,"spinner"))+"-"+s;return u.a.createElement(l,Object(y.a)({ref:t},m,{className:E()(c,p,r&&p+"-"+r,n&&"text-"+n)}),i)}));k.displayName="Spinner";var j=k,L=a(17),O=a.n(L),M=(a(8),a(62)),C=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={username:"",password:"",spinnerS:!1,message:"",alertMessage:!1},n.change=n.change.bind(Object(i.a)(n)),n.submit=n.submit.bind(Object(i.a)(n)),n}return Object(r.a)(a,[{key:"change",value:function(e){this.setState(Object(n.a)({},e.target.name,e.target.value))}},{key:"submit",value:function(e){var t=this;e.preventDefault(),this.startSpinnerLoad(),p.a.post("".concat(M.getIP(),":5001/login"),{username:this.state.username,password:this.state.password}).then((function(e){localStorage.setItem("user",e.data.token),t.props.history.push("/"),t.stoptSpinnerLoad()})).catch((function(e){console.log("error login page = "+e),console.log("error message login page = "+e.response.data.message),t.stoptSpinnerLoad(),t.setState({message:e.response.data.Error}),t.showMessage()}))}},{key:"startSpinnerLoad",value:function(){return this.setState({spinnerS:!0})}},{key:"stoptSpinnerLoad",value:function(){return this.setState({spinnerS:!1})}},{key:"showMessage",value:function(){var e=this;this.setState({alertMessage:!0}),!0===this.state.alertMessage&&setTimeout((function(){e.setState({alertMessage:!1})}),3e3)}},{key:"render",value:function(){var e=this,t=this.state,a=t.spinnerS,n=t.alertMessage,s=t.message,r={width:"280px",display:"block",marginLeft:"auto",marginRight:"auto"};return u.a.createElement("div",{className:"container-fluid"},u.a.createElement("div",null,u.a.createElement(O.a,null,u.a.createElement("img",{alt:"logo",src:f.a,style:{marginLeft:"auto",marginRight:"auto",display:"block",marginBottom:"50px",maxWidth:"60%",marginTop:"20%"}}))),u.a.createElement("form",{onSubmit:function(t){return e.submit(t)}},u.a.createElement(g.a,{style:r,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,type:"id",id:"id",label:"ID",autoComplete:"id",autoFocus:!0,name:"username",onChange:function(t){return e.change(t)},value:this.state.username}),u.a.createElement(g.a,{style:r,variant:"outlined",margin:"normal",required:!0,fullWidth:!0,typeof:"password",label:"Password",type:"password",id:"password",name:"password",onChange:function(t){return e.change(t)},value:this.state.password,autoComplete:"current-password"}),n?u.a.createElement("p",{className:"text-center",style:{color:"red",marginTop:"3px",textAlign:"center"}},s):null,u.a.createElement(d.a,{style:{backgroundColor:"#E8DA10",marginTop:"5px",height:" 45px",width:"280px",display:"block",marginLeft:"auto",marginRight:"auto"},type:"submit",fullWidth:!0,variant:"contained",color:"primary"},a?u.a.createElement(j,{as:"span",animation:"border",size:"sm",role:"status","aria-hidden":"true",style:{marginRight:"5%"}}):null,u.a.createElement("span",null,"Sign In"))),u.a.createElement("div",{style:{marginTop:"25%"}},u.a.createElement(O.a,null,u.a.createElement("img",{alt:"logo",src:v.a,style:{width:"30%",marginLeft:"auto",marginRight:"auto",display:"block"}}))))}}]),a}(c.Component)},62:function(e,t){e.exports.getIP=function(){return"http://13.229.93.6"}}}]);
//# sourceMappingURL=12.163db880.chunk.js.map