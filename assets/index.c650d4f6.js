var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,s=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;import{p as l,R as a,r as c,v as d,h as f,a as u}from"./vendor.ff41f632.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const p={},m=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/gyro-webrtc-test/${e}`)in p)return;p[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":"modulepreload",t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},h=l`
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
`;function y(e){var l,c=e,{fullHeight:d}=c,f=((e,t)=>{var r={};for(var s in e)o.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&n)for(var s of n(e))t.indexOf(s)<0&&i.call(e,s)&&(r[s]=e[s]);return r})(c,["fullHeight"]);return a.createElement("main",(l=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&s(e,r,t[r]);if(n)for(var r of n(t))i.call(t,r)&&s(e,r,t[r]);return e})({},f),t(l,r({className:h,style:d?{height:"100vh"}:{}}))))}function g(){const e=window.location.hash.substring(1)||d();c.exports.useEffect((()=>{window.location.hash=e}),[e]);const t=e.substring(e.lastIndexOf("/")+1),r=e.startsWith("device"),n=r?E:O;return a.createElement(c.exports.Suspense,{fallback:""},a.createElement(y,{fullHeight:!r},a.createElement(n,{id:t})))}const b=m((()=>import("./Device.64a2e018.js")),["assets/Device.64a2e018.js","assets/vendor.ff41f632.js","assets/useWsRelay.30ad28a6.js"]),v=m((()=>import("./Display.eab7e245.js")),["assets/Display.eab7e245.js","assets/vendor.ff41f632.js","assets/useWsRelay.30ad28a6.js"]),E=c.exports.lazy((()=>b)),O=c.exports.lazy((()=>v));f(a.createElement),u.exports.render(a.createElement(g,null),document.getElementById("app"));
