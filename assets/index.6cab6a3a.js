var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,i=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;import{p as s,R as a,r as c,a as u,h as d,b as f}from"./vendor.9ccb11d5.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const p={},m=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/gyro-webrtc-test/${e}`)in p)return;p[e]=!0;const t=e.endsWith(".css"),r=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${r}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":"modulepreload",t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},y=s`
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
`;function b(e){var s,c=e,{fullHeight:u}=c,d=((e,t)=>{var r={};for(var i in e)o.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&n)for(var i of n(e))t.indexOf(i)<0&&l.call(e,i)&&(r[i]=e[i]);return r})(c,["fullHeight"]);return a.createElement("main",(s=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&i(e,r,t[r]);if(n)for(var r of n(t))l.call(t,r)&&i(e,r,t[r]);return e})({},d),t(s,r({className:y,style:u?{height:"100vh"}:{}}))))}const g=c`
body {
  font-family: "Arial Rounded MT Bold", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  font-weight: 700;
  background-color: pink;
  color: hotpink;
  margin: 0;
  font-size: 6vmin;
}
`;function h(){const e=window.location.hash.substring(1);return a.createElement(u.exports.Suspense,{fallback:""},a.createElement(g,null),e?a.createElement(b,null,a.createElement(O,{id:e})):a.createElement(b,{fullHeight:!0},a.createElement(w,null)))}const v=m((()=>import("./Device.b35b1291.js")),["assets/Device.b35b1291.js","assets/vendor.9ccb11d5.js","assets/Message.2e9876b9.js"]),E=m((()=>import("./Display.680b96b2.js")),["assets/Display.680b96b2.js","assets/vendor.9ccb11d5.js","assets/Message.2e9876b9.js"]),O=u.exports.lazy((()=>v)),w=u.exports.lazy((()=>E));d(a.createElement),f.exports.render(a.createElement(h,null),document.getElementById("app"));
