import{r as e}from"./vendor.05f0c005.js";function t(t,s=5){const[n,o]=e.exports.useState(0),r=n>s,[u,c]=e.exports.useState();e.exports.useEffect((()=>{c((e=>{e&&(e.onclose=null,null==e||e.close())})),o(0)}),[t]),e.exports.useEffect((()=>{if(!t||null!=u||r)return;const e=new WebSocket(t);let s;return e.onclose=()=>{s=window.setTimeout((()=>{o((e=>e+1)),c(void 0)}),1e3)},e.onopen=()=>{c(e),o(0)},e.onerror=()=>e.close(),()=>{window.clearTimeout(s)}}),[t,n,u]);const l=e.exports.useMemo((()=>u?{addListener(e){const t=({data:t})=>e(JSON.parse(t));return u.addEventListener("message",t),()=>u.removeEventListener("message",t)},send(e){u.send(JSON.stringify(e))}}:null),[u]);return null==l?{status:r?"failed":"connecting"}:{status:"connected",socket:l}}export{t as u};
