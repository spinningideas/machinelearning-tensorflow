(this["webpackJsonpmachinelearning-tensorflow"]=this["webpackJsonpmachinelearning-tensorflow"]||[]).push([[8],{101:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return w}));var a=n(2),c=n(27),s=n.n(c),r=n(41),i=n(40),o=n(0),l=n(169),j=n(353),u=n(355),b=n(354),d=n(179),p=n(481),m=n(88),O=n.n(m),h=n(472),x=n.n(h),f=n(76),g=n(349),v=n(306);n(52);function w(){var e=Object(o.useState)({}),t=Object(i.a)(e,2),n=t[0],c=t[1],m=Object(o.useState)(),h=Object(i.a)(m,2),w=h[0],y=h[1],S=Object(o.useState)(),k=Object(i.a)(S,2),_=k[0],N=k[1],z=Object(o.useState)(""),L=Object(i.a)(z,2),C=L[0],F=L[1],M=Object(o.useState)(""),E=Object(i.a)(M,2),J=(E[0],E[1]),T=Object(o.useState)(""),q=Object(i.a)(T,2),P=q[0],U=q[1],V=Object(o.useState)(""),A=Object(i.a)(V,2),B=(A[0],A[1]),D=Object(o.useState)(""),G=Object(i.a)(D,2),H=(G[0],G[1]),I=Object(g.a)(),K=Object(f.a)(),Q={model:"https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",metadata:"https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"};function R(){return(R=Object(r.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.f(t.model);case 3:n=e.sent,N(n),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function W(){return(W=Object(r.a)(s.a.mark((function e(t){var n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t.metadata);case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,y(a),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}Object(o.useEffect)((function(){function e(){return(e=Object(r.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=K.getUserLocale(),e.next=3,K.getLocalizedTextSet(["sentiment","sentimentdescription","sentimentinstructions","moreinfo"],t);case 3:n=e.sent,c(n);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(o.useEffect)((function(){v.g().then((function(){!function(e){R.apply(this,arguments)}(Q),function(e){W.apply(this,arguments)}(Q)}))}),[]);return Object(a.jsx)(d.a,{container:!0,spacing:0,children:Object(a.jsxs)(d.a,{item:!0,xs:12,className:"contentpanel-site",children:[Object(a.jsx)("h3",{children:n.sentiment}),Object(a.jsx)("p",{children:n.sentimentinstructions}),Object(a.jsxs)("p",{children:[" ",Object(a.jsx)(l.a,{className:"ml-2",href:Q.model,color:"primary",variant:"outlined",target:"_blank",rel:"noopener",children:"Model Link"}),Object(a.jsx)(l.a,{className:"ml-2",color:"primary",variant:"outlined",href:Q.metadata,target:"_blank",rel:"noopener",children:"Model Metadata"})]}),Object(a.jsxs)(d.a,{container:!0,spacing:0,children:[Object(a.jsx)(d.a,{item:!0,xs:12,md:6,lg:6,xl:6,children:Object(a.jsxs)(j.a,{className:"card white-bg-color bl-1 bb-1",children:[Object(a.jsx)(b.a,{children:Object(a.jsx)(p.a,{label:"Type your text here",onChange:function(e){return F(e.target.value)},value:C,multiline:!0,rows:3,variant:"outlined",style:{width:"100%"}})}),Object(a.jsx)(u.a,{children:""!==C?Object(a.jsx)(l.a,{color:"secondary",onClick:function(){return function(e){var t=e.trim().toLowerCase().replace(/(\.|\,|\!)/g,"").split(" ").map((function(e){var t=w.word_index[e]+w.index_from;return t>w.vocabulary_size&&(t=2),t})),n=I.padSequences([t],w.max_len),a=v.i(n,[1,w.max_len]),c=_.predict(a),s=c.dataSync()[0];return c.dispose(),B(t),H(n),J(a.toString()),U(s),s}(C)},children:"View Sentiment"}):Object(a.jsx)(a.Fragment,{})})]})}),Object(a.jsx)(d.a,{item:!0,xs:12,md:6,lg:6,xl:6,children:""!==P?Object(a.jsx)(j.a,{className:"card white-bg-color bl-1 bb-1",children:Object(a.jsxs)(b.a,{children:[Object(a.jsxs)("p",{children:[Object(a.jsx)("span",{className:"text-bold",children:"Score"})," (1 = Positive, 0 = Negative)"]}),Object(a.jsx)("p",{children:P}),P>.6?Object(a.jsx)(O.a,{className:"success-color",style:{fontSize:40}}):Object(a.jsx)(x.a,{className:"fail-color",style:{fontSize:40}}),Object(a.jsx)(a.Fragment,{})]})}):Object(a.jsx)(a.Fragment,{})})]})]})})}}}]);
//# sourceMappingURL=8.d02bc00d.chunk.js.map