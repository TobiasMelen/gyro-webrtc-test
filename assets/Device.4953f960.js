var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,a=(t,n,o)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[n]=o;import{r,v as s,R as c}from"./vendor.05f0c005.js";import{u as i}from"./useWsRelay.5d3c06b8.js";const l={alpha:0,beta:0,gamma:0,x:0,y:0,z:0};function d(e){const t=r.exports.useMemo((()=>{var e;return null!=(e=localStorage["connection-id"])?e:s()}),[]);r.exports.useEffect((()=>localStorage.setItem("connection-id",t)));const n=i(`wss://signaling-server.tobbes.site/${t}`),[o,a]=r.exports.useState(),[c,l]=r.exports.useState("connecting");return r.exports.useEffect((()=>{if("connected"!==n.status||null!=o)return;const r=new RTCPeerConnection({iceServers:[{urls:["stun:stun.l.google.com:19302"]}]}),s=r.createDataChannel("Client data channel",{maxRetransmits:1,ordered:!1});let c;s.onopen=()=>{a((()=>e=>s.send(JSON.stringify(e)))),l("connected")},r.onicecandidate=o=>{null!=o.candidate&&n.socket.send({to:e,from:t,data:o.candidate.toJSON()})},r.oniceconnectionstatechange=()=>{switch(r.iceConnectionState){case"disconnected":case"failed":l("error")}},n.socket.addListener((async({data:e})=>{clearTimeout(c),"answer"===e.type?await r.setRemoteDescription(e):"candidate"in e&&await r.addIceCandidate(e)})),r.createOffer().then((async o=>{c=window.setTimeout((()=>{l((e=>"error"!==e?"empty":"error"))}),1e3),await r.setLocalDescription(o),n.socket.send({data:o,to:e,from:t})}))}),[o,e,n]),[o,"connected"===n.status?c:n.socket]}function u({id:e}){const[s,i]=r.exports.useState(!1),[u,m]=d(e),p=r.exports.useMemo((()=>((e,r)=>{for(var s in r||(r={}))n.call(r,s)&&a(e,s,r[s]);if(t)for(var s of t(r))o.call(r,s)&&a(e,s,r[s]);return e})({},l)),[e]);return r.exports.useEffect((()=>{if("connected"!==m||null==u)return;const e=({rotationRate:e,interval:t})=>{var n,o,a;const r=t/100;p.alpha+=(null!=(n=null==e?void 0:e.alpha)?n:0)*r,p.beta+=(null!=(o=null==e?void 0:e.beta)?o:0)*r,p.gamma+=(null!=(a=null==e?void 0:e.gamma)?a:0)*r,u(p)};return addEventListener("devicemotion",e),()=>removeEventListener("deviceMotion",e)}),[m]),c.createElement("main",null,c.createElement("button",{onClick:()=>DeviceMotionEvent.requestPermission().then((e=>i("granted"===e)))},"Start"))}export{u as default};
