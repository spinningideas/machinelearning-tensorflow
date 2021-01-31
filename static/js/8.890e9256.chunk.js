(this["webpackJsonpmachinelearning-tensorflow"]=this["webpackJsonpmachinelearning-tensorflow"]||[]).push([[8],{102:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(22),i=n.n(r),c=n(36),s=n(57),o=n(0),l=n(275),b=n(538),u=n(328),d=n(156),j=n(541),p=n(325),f=n(327),m=n(326),h=n(162),x=n(518),O=n.n(x),g=n(167),v=n(80),y=n(540),w=n(120),S=Object(w.a)((function(e){return{avatar:{margin:e.spacing(0)}}}));var k=function(e){var t=e.text,n=e.filePath,r=e.display,i=S();return Object(a.jsx)(d.a,{className:"ml-2",color:"primary",target:"_blank",style:{visibility:r?"visible":"hidden"},title:t,href:n,download:!0,children:Object(a.jsx)(y.a,{className:i.avatar,alt:t,src:n})})},C=function(e){var t=e.box,n=e.label,r=e.probability,i=e.parentImgRef,c="#00e5ff",o=Object(s.a)(t,4),l=o[0],b=o[1],u=o[2],d=o[3],j=i.current.offsetTop,p=i.current.offsetLeft,f=n||"no class provided",m=r?Math.round(100*r)+"%":0;b=Math.round(b+j),l=Math.round(l+p),u=Math.round(u),d=Math.round(d);var h=Object(w.a)((function(){return{boundingBoxContainer:{position:"absolute",border:"0.2rem solid "+c,top:b,margin:0,padding:0},labelContainer:{display:"block",position:"absolute",bottom:0,color:"#212121",background:c,padding:"0.3rem 0.6rem",margin:0,fontSize:"1.2rem",fontFamily:"monospace",left:-1},probabilityContainer:{display:"block",position:"absolute",bottom:0,color:"#212121",background:c,padding:"0.3rem 0.6rem",margin:0,fontSize:"1.2rem",fontFamily:"monospace",right:0,borderRadius:"0"}}}))();return Object(a.jsxs)("div",{className:h.boundingBoxContainer,style:{width:u,top:b,height:d,left:l},label:n,probability:r,children:[Object(a.jsx)("div",{className:h.labelContainer,children:f}),Object(a.jsx)("div",{className:h.probabilityContainer,children:m})]})},N=n(71),F=n(398);t.default=Object(g.a)()((function(e){var t=Object(o.useState)({}),n=Object(s.a)(t,2),r=n[0],x=n[1],y=Object(o.useState)(null),w=Object(s.a)(y,2),S=w[0],I=w[1],D=Object(o.useState)(),z=Object(s.a)(D,2),M=z[0],P=z[1],R=Object(o.useState)(null),L=Object(s.a)(R,2),_=L[0],A=L[1],B=Object(o.useState)(!1),T=Object(s.a)(B,2),E=T[0],H=T[1],J=Object(o.useState)(0),U=Object(s.a)(J,2),W=U[0],V=U[1],q=Object(o.useRef)(null),G=Object(N.a)(),K=Object(F.a)(),Q="https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1";Object(o.useEffect)((function(){function e(){return(e=Object(c.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=G.getUserLocale(),e.next=3,G.getLocalizedTextSet(["objectdetectionimage","objectdetectiondescriptionimage","objectdetectioninstructionsimage","moreinfo"],t);case 3:n=e.sent,x(n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(o.useEffect)((function(){l.f().then((function(){X(Q)}))}),[Q]);var X=function(){var e=Object(c.a)(i.a.mark((function e(t){var n,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.d(t,{fromTFHub:!0});case 3:return n=e.sent,a=l.i([1,300,300,3],"int32"),e.next=7,n.executeAsync(a);case 7:return r=e.sent,e.next=10,Promise.all(r.map((function(e){return e.data()})));case 10:r.map((function(e){return e.dispose()})),a.dispose(),P(n),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(c.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return H(!0),e.next=3,$();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(e){return l.h((function(){return l.b.fromPixels(e).expandDims(0).cast("int32")}))},$=function(){var e=Object(c.a)(i.a.mark((function e(){var t,n,a,r,c,s,o,l,b;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=Z(q.current),s=null!==(t=null===(n=q.current)||void 0===n?void 0:n.width)&&void 0!==t?t:0,o=null!==(a=null===(r=q.current)||void 0===r?void 0:r.height)&&void 0!==a?a:0,l=K.getCocoSSDClasses(),5,0,e.next=8,K.detectObjects(M,c,s,o,l,5,0);case 8:b=e.sent,A(b),H(!1);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){return _?_.map((function(e){return Object(a.jsx)(C,{parentImgRef:q,box:e.boundingBox,label:e.class,probability:e.probability},e.class+e.probability)})):Object(a.jsx)(a.Fragment,{})};return Object(a.jsx)(h.a,{container:!0,spacing:0,children:Object(a.jsx)(h.a,{item:!0,xs:12,className:"contentpanel-site",children:Object(a.jsxs)(h.a,{container:!0,spacing:0,children:[Object(a.jsxs)(h.a,{item:!0,xs:12,md:6,lg:6,xl:6,children:[Object(a.jsx)("h2",{children:r.objectdetectionimage}),S?Object(a.jsx)(a.Fragment,{}):Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:"pb-2",children:r.objectdetectiondescriptionimage}),Object(a.jsx)("div",{className:"pb-2",children:r.objectdetectioninstructionsimage})]}),Object(a.jsx)("div",{children:Object(a.jsx)(u.a,{className:"ml-2",href:Q,color:"primary",variant:"outlined",target:"_blank",rel:"noopener",children:"View Model"})}),Object(a.jsxs)(p.a,{className:"card white-bg-color",elevation:0,children:[Object(a.jsxs)(m.a,{className:"p-1",children:[Object(a.jsx)("input",{style:{display:"none"},accept:"image/jpeg",multiple:!1,id:"faceImage",type:"file",onChange:function(t){var n=Object(s.a)(t.target.files,1)[0],a=0;if(n){var r=new FileReader,i=q.current;i.file=n,r.onload=function(t){i.src=t.target.result,a=Object(g.b)("sm",e.width)?i.innerWidth:window.innerWidth-40,V(a)},r.readAsDataURL(n),I(n)}}}),Object(a.jsx)(j.a,{title:"Select Image",children:Object(a.jsx)("label",{htmlFor:"faceImage",children:Object(a.jsx)(d.a,{color:"primary","aria-label":"upload image",component:"span",children:Object(a.jsx)(O.a,{fontSize:"large"})})})}),Object(a.jsx)("label",{children:S?S.name:"Select Image"}),". . .",Object(a.jsx)(k,{display:!0,text:"Download Apple/Carrot Image",filePath:"images/apple-carrot.jpg"}),Object(a.jsx)(k,{display:!0,text:"Download Hot Dog Image",filePath:"images/hotdog.jpg"})]}),Object(a.jsxs)(f.a,{children:[S?Object(a.jsx)(u.a,{color:"primary",onClick:function(){return Y()},children:"Perform Object Detection"}):Object(a.jsx)(a.Fragment,{}),Object(a.jsx)(v.a,{display:E,size:40})]})]})]}),Object(a.jsx)(h.a,{item:!0,xs:12,md:6,lg:6,xl:6,children:Object(a.jsxs)(b.a,{display:"flex",justifyContent:"center",children:[Object(a.jsx)("img",{id:"img-selectedfile",className:"mt-2",ref:q,src:S,style:{visibility:null!=S?"visible":"hidden",width:W},alt:"Selected file to analyze"}),Object(a.jsx)(ee,{})]})})]})})})}))}}]);
//# sourceMappingURL=8.890e9256.chunk.js.map