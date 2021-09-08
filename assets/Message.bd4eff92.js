var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r;import{a as i,R as l,c,p as f}from"./vendor.a7c4d4d9.js";function u(e){const[t,n]=i.exports.useState(),[r,o]=i.exports.useState(!1);i.exports.useEffect((()=>{n((e=>{e&&(e.onclose=null,null==e||e.close())}))}),[e]),i.exports.useEffect((()=>{if(!e||null!=t)return;const r=new WebSocket(e);r.onclose=()=>{null!=t?n(void 0):o(!0)},r.onopen=()=>{n(r)},r.onerror=()=>r.close()}),[e,t]);const s=i.exports.useMemo((()=>t?{addListener(e){const n=({data:t})=>e(JSON.parse(t));return t.addEventListener("message",n),()=>t.removeEventListener("message",n)},send(e){t.send(JSON.stringify(e))}}:null),[t]);return null==s?{status:r?"error":"connecting"}:{status:"connected",socket:s}}function d(e,t){return{onSignalingMessage:t=>e.addListener((e=>"from"in e&&"data"in e&&t(e.from,e.data))),sendSignalingMessage:(n,r)=>e.send({to:n,from:t,data:r})}}const m=c`
 from {
   transform: translateY(-.1em);
 }
 to {
   transform: translateY(.1em);
 }
`,p=e=>f`
  font-size: 1em;
  text-align: center;
  font-weight: bold;
  user-select: none;
  margin: 1em auto;
  max-width: 90vw;
  ${e?`\n        animation: ${m} 0.75s ease-in-out alternate-reverse infinite;\n      `:""};
`;function b(e){var i,c,f=e,{bob:u}=f,d=((e,t)=>{var n={};for(var a in e)o.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&r)for(var a of r(e))t.indexOf(a)<0&&s.call(e,a)&&(n[a]=e[a]);return n})(f,["bob"]);return l.createElement("h1",(i=((e,t)=>{for(var n in t||(t={}))o.call(t,n)&&a(e,n,t[n]);if(r)for(var n of r(t))s.call(t,n)&&a(e,n,t[n]);return e})({},d),c={className:p(u)},t(i,n(c))))}export{b as M,d as j,u};
