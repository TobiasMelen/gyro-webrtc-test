var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;import{R as i,b as l,p as c,r as f}from"./vendor.ff41f632.js";l`
 from {
   transform: translateY(-.1em);
 }
 to {
   transform: translateY(.1em);
 }
`;const u=e=>c`
  font-size: 1em;
  text-align: center;
  font-weight: 900;
  user-select: none;
  margin: 1em auto;
  max-width: 90vw;
  ${e?`\n        animation: ${e} 0.75s ease-in-out alternate-reverse infinite;\n      `:""};
`;function m(e){var l,c,f=e,{bob:m}=f,p=((e,t)=>{var r={};for(var a in e)o.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&n)for(var a of n(e))t.indexOf(a)<0&&s.call(e,a)&&(r[a]=e[a]);return r})(f,["bob"]);return i.createElement("h1",(l=((e,t)=>{for(var r in t||(t={}))o.call(t,r)&&a(e,r,t[r]);if(n)for(var r of n(t))s.call(t,r)&&a(e,r,t[r]);return e})({},p),c={className:u(m)},t(l,r(c))))}function p(e,t=5){const[r,n]=f.exports.useState(0),o=r>t,[s,a]=f.exports.useState();f.exports.useEffect((()=>{a((e=>{e&&(e.onclose=null,null==e||e.close())})),n(0)}),[e]),f.exports.useEffect((()=>{if(!e||null!=s||o)return;const t=new WebSocket(e);let r;return t.onclose=()=>{r=window.setTimeout((()=>{n((e=>e+1)),a(void 0)}),1e3)},t.onopen=()=>{a(t),n(0)},t.onerror=()=>t.close(),()=>{window.clearTimeout(r)}}),[e,r,s]);const i=f.exports.useMemo((()=>s?{addListener(e){const t=({data:t})=>e(JSON.parse(t));return s.addEventListener("message",t),()=>s.removeEventListener("message",t)},send(e){s.send(JSON.stringify(e))}}:null),[s]);return null==i?{status:o?"failed":"connecting"}:{status:"connected",socket:i}}export{m as M,p as u};
