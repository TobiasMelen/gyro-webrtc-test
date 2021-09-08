var e=Object.defineProperty,t=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,a=(t,n,s)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[n]=s,r=(e,r)=>{for(var o in r||(r={}))n.call(r,o)&&a(e,o,r[o]);if(t)for(var o of t(r))s.call(r,o)&&a(e,o,r[o]);return e};import{a as o,v as c,j as i,R as l}from"./vendor.a7c4d4d9.js";import{u,j as d,M as m}from"./Message.bd4eff92.js";import{b as g,p}from"./index.95e7991c.js";function f(e,t){var n;const[s,a]=o.exports.useState(null!=(n=(e=>{const t=localStorage.getItem(e);try{return null!=t?JSON.parse(localStorage[e]):null}catch{return null}})(e))?n:t);return o.exports.useEffect((()=>{localStorage.setItem(e,JSON.stringify(s))}),[s]),[s,a]}const v={dataChannelName:"Data channel",rtcConfig:{iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},reconnectTries:1};function h(e){const[t]=f("connection-id",c()),n=u(`wss://signaling-server.tobbes.site/${t}`),s=function(e,t,n){n=r(r({},v),n);const[s,a]=o.exports.useState({status:"connecting"});return o.exports.useEffect((()=>{if("connecting"!=s.status||null==t)return;const r=new RTCPeerConnection(n.rtcConfig),o=r.createDataChannel(n.dataChannelName,{maxRetransmits:1,ordered:!1});let c;o.onopen=()=>{a({status:"connected",onMessage:e=>(o.addEventListener("message",e),()=>o.removeEventListener("message",e)),sendMessage:e=>{o.send(e)}})},r.onicecandidate=n=>{null!=n.candidate&&t.sendSignalingMessage(e,n.candidate.toJSON())},r.oniceconnectionstatechange=()=>{switch(r.iceConnectionState){case"disconnected":case"failed":a((e=>({status:"connected"===e.status?"connecting":"error"})))}},t.onSignalingMessage((async(e,t)=>{clearTimeout(c),"type"in t?await r.setRemoteDescription(t):"candidate"in t&&await r.addIceCandidate(t)})),r.createOffer().then((async n=>{c=window.setTimeout((()=>{a((({status:e})=>({status:"error"!==e?"empty":"error"})))}),5e3),await r.setLocalDescription(n),t.sendSignalingMessage(e,n)}))}),[s.status,t,e]),s}(e,o.exports.useMemo((()=>n.socket?d(n.socket,t):void 0),[n.socket,t]));return o.exports.useMemo((()=>["connected"!==n.status?n.status:s.status,"connected"===s.status?(...e)=>{s.sendMessage(new Float32Array(e))}:null]),[n.status,s])}var y=i("button")`
  all: unset;
  padding: 1em 1.2em;
  border-radius: 0.5em;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8em;
  color: ${g};
  background-color: ${p};
  appearance: none;
  margin: 0;
`;function b({id:e}){const[t,n]=h(e),[s,a]=o.exports.useState(!1);if(o.exports.useEffect((()=>{let e=!1;const t=t=>{var s,r,o;e||(a(!0),e=!0),null==n||n(null!=(s=t.alpha)?s:0,null!=(r=t.beta)?r:0,null!=(o=t.gamma)?o:0)};return addEventListener("deviceorientation",t),()=>removeEventListener("deviceorientation",t)}),[n]),!1===s)return l.createElement(w,null);switch(t){case"connected":return l.createElement(m,null,"Your phone is now visualized on the main screen");case"connecting":return l.createElement(m,null,"Connecting");case"error":return l.createElement(m,null,"Could not connect, make sure phone is connected to the same Wifi as the computer");case"empty":return l.createElement(m,null,"No one seems to be here anymore 😢");default:return null}}const w=()=>l.createElement(l.Fragment,null,l.createElement(m,null,"To use the phone gyro, we must first get your permission."),l.createElement(y,{onClick:()=>DeviceOrientationEvent.requestPermission().then((e=>"granted"!==e&&alert("Did not get permissions. Browser app must be restarted to try again.")))},"OK, ask away!"));export{b as default};
