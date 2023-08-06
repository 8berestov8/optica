"use strict";(self["webpackChunklens_app"]=self["webpackChunklens_app"]||[]).push([[990],{8990:(e,t,n)=>{n.r(t),n.d(t,{createSwipeBackGesture:()=>c});var r=n(6587),s=n(545),a=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=(e,t,n,c,i)=>{const o=e.ownerDocument.defaultView,l=(0,s.i)(e),u=e=>{const t=50,{startX:n}=e;return l?n>=o.innerWidth-t:n<=t},h=e=>l?-e.deltaX:e.deltaX,d=e=>l?-e.velocityX:e.velocityX,p=e=>u(e)&&t(),k=e=>{const t=h(e),n=t/o.innerWidth;c(n)},w=e=>{const t=h(e),n=o.innerWidth,s=t/n,a=d(e),c=n/2,l=a>=0&&(a>.2||t>c),u=l?1-s:s,p=u*n;let k=0;if(p>5){const e=p/Math.abs(a);k=Math.min(e,540)}i(l,s<=0?.01:(0,r.h)(0,s,.9999),k)};return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:p,onStart:n,onMove:k,onEnd:w})}}}]);
//# sourceMappingURL=990.41fecd1b.js.map