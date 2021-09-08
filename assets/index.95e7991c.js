var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,l=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;import{p as s,R as a,r as c,a as d,v as u,h as f,b as p}from"./vendor.a7c4d4d9.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const m={},h=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/gyro-webrtc-test/${e}`)in m)return;m[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":"modulepreload",t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},g=s`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  max-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
`;function y(e){var s,c=e,{fullHeight:d}=c,u=((e,t)=>{var r={};for(var l in e)o.call(e,l)&&t.indexOf(l)<0&&(r[l]=e[l]);if(null!=e&&n)for(var l of n(e))t.indexOf(l)<0&&i.call(e,l)&&(r[l]=e[l]);return r})(c,["fullHeight"]);return a.createElement("main",(s=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&l(e,r,t[r]);if(n)for(var r of n(t))i.call(t,r)&&l(e,r,t[r]);return e})({},u),t(s,r({className:g,style:d?{height:"100vh"}:{}}))))}const b=[["lightpink","hotpink"],["cornflowerblue","blue"],["mediumspringgreen","mediumseagreen"]],v=Math.floor(Math.random()*b.length),E=b[v][0],O=b[v][1],w=c`
body {
  font-family: "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  background-color: ${E};
  color: ${O};
  margin: 0;
  font-size: 6vmin;
}
`;function x(){const e=window.location.hash.substring(1)||u();d.exports.useEffect((()=>{window.location.hash=e}),[e]);const t=e.substring(e.lastIndexOf("/")+1),r=e.startsWith("device"),n=r?_:k;return a.createElement(d.exports.Suspense,{fallback:""},a.createElement(w,null),a.createElement(y,{fullHeight:!r},a.createElement(n,{id:t})))}const j=h((()=>import("./Device.f9a817e4.js")),["assets/Device.f9a817e4.js","assets/vendor.a7c4d4d9.js","assets/Message.bd4eff92.js"]),P=h((()=>import("./Display.230d1e8d.js")),["assets/Display.230d1e8d.js","assets/vendor.a7c4d4d9.js","assets/Message.bd4eff92.js"]),_=d.exports.lazy((()=>j)),k=d.exports.lazy((()=>P));f(a.createElement),p.exports.render(a.createElement(x,null),document.getElementById("app"));export{E as b,O as p};
