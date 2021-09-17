var t=Object.defineProperty,s=Object.getOwnPropertySymbols,e=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,n=(s,e,i)=>e in s?t(s,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[e]=i,r=(t,r)=>{for(var a in r||(r={}))e.call(r,a)&&n(t,a,r[a]);if(s)for(var a of s(r))i.call(r,a)&&n(t,a,r[a]);return t};import{a,j as h,R as o}from"./vendor.9ccb11d5.js";import{u as _,v as c,a as l,j as u,M as y}from"./Message.2e9876b9.js";const m=[];for(let f=0;f<256;f++)m[f]=(f<16?"0":"")+f.toString(16);class w{constructor(t=0,s=0,e=0,i=1){this._x=t,this._y=s,this._z=e,this._w=i}static slerp(t,s,e,i){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),e.slerpQuaternions(t,s,i)}static slerpFlat(t,s,e,i,n,r,a){let h=e[i+0],o=e[i+1],_=e[i+2],c=e[i+3];const l=n[r+0],u=n[r+1],y=n[r+2],m=n[r+3];if(0===a)return t[s+0]=h,t[s+1]=o,t[s+2]=_,void(t[s+3]=c);if(1===a)return t[s+0]=l,t[s+1]=u,t[s+2]=y,void(t[s+3]=m);if(c!==m||h!==l||o!==u||_!==y){let t=1-a;const s=h*l+o*u+_*y+c*m,e=s>=0?1:-1,i=1-s*s;if(i>Number.EPSILON){const n=Math.sqrt(i),r=Math.atan2(n,s*e);t=Math.sin(t*r)/n,a=Math.sin(a*r)/n}const n=a*e;if(h=h*t+l*n,o=o*t+u*n,_=_*t+y*n,c=c*t+m*n,t===1-a){const t=1/Math.sqrt(h*h+o*o+_*_+c*c);h*=t,o*=t,_*=t,c*=t}}t[s]=h,t[s+1]=o,t[s+2]=_,t[s+3]=c}static multiplyQuaternionsFlat(t,s,e,i,n,r){const a=e[i],h=e[i+1],o=e[i+2],_=e[i+3],c=n[r],l=n[r+1],u=n[r+2],y=n[r+3];return t[s]=a*y+_*c+h*u-o*l,t[s+1]=h*y+_*l+o*c-a*u,t[s+2]=o*y+_*u+a*l-h*c,t[s+3]=_*y-a*c-h*l-o*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,s,e,i){return this._x=t,this._y=s,this._z=e,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,s){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const e=t._x,i=t._y,n=t._z,r=t._order,a=Math.cos,h=Math.sin,o=a(e/2),_=a(i/2),c=a(n/2),l=h(e/2),u=h(i/2),y=h(n/2);switch(r){case"XYZ":this._x=l*_*c+o*u*y,this._y=o*u*c-l*_*y,this._z=o*_*y+l*u*c,this._w=o*_*c-l*u*y;break;case"YXZ":this._x=l*_*c+o*u*y,this._y=o*u*c-l*_*y,this._z=o*_*y-l*u*c,this._w=o*_*c+l*u*y;break;case"ZXY":this._x=l*_*c-o*u*y,this._y=o*u*c+l*_*y,this._z=o*_*y+l*u*c,this._w=o*_*c-l*u*y;break;case"ZYX":this._x=l*_*c-o*u*y,this._y=o*u*c+l*_*y,this._z=o*_*y-l*u*c,this._w=o*_*c+l*u*y;break;case"YZX":this._x=l*_*c+o*u*y,this._y=o*u*c+l*_*y,this._z=o*_*y-l*u*c,this._w=o*_*c-l*u*y;break;case"XZY":this._x=l*_*c-o*u*y,this._y=o*u*c-l*_*y,this._z=o*_*y+l*u*c,this._w=o*_*c+l*u*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return!1!==s&&this._onChangeCallback(),this}setFromAxisAngle(t,s){const e=s/2,i=Math.sin(e);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(e),this._onChangeCallback(),this}setFromRotationMatrix(t){const s=t.elements,e=s[0],i=s[4],n=s[8],r=s[1],a=s[5],h=s[9],o=s[2],_=s[6],c=s[10],l=e+a+c;if(l>0){const t=.5/Math.sqrt(l+1);this._w=.25/t,this._x=(_-h)*t,this._y=(n-o)*t,this._z=(r-i)*t}else if(e>a&&e>c){const t=2*Math.sqrt(1+e-a-c);this._w=(_-h)/t,this._x=.25*t,this._y=(i+r)/t,this._z=(n+o)/t}else if(a>c){const t=2*Math.sqrt(1+a-e-c);this._w=(n-o)/t,this._x=(i+r)/t,this._y=.25*t,this._z=(h+_)/t}else{const t=2*Math.sqrt(1+c-e-a);this._w=(r-i)/t,this._x=(n+o)/t,this._y=(h+_)/t,this._z=.25*t}return this._onChangeCallback(),this}setFromUnitVectors(t,s){let e=t.dot(s)+1;return e<Number.EPSILON?(e=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=e):(this._x=0,this._y=-t.z,this._z=t.y,this._w=e)):(this._x=t.y*s.z-t.z*s.y,this._y=t.z*s.x-t.x*s.z,this._z=t.x*s.y-t.y*s.x,this._w=e),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs((s=this.dot(t),e=-1,i=1,Math.max(e,Math.min(i,s)))));var s,e,i}rotateTowards(t,s){const e=this.angleTo(t);if(0===e)return this;const i=Math.min(1,s/e);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t,s){return void 0!==s?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,s)):this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,s){const e=t._x,i=t._y,n=t._z,r=t._w,a=s._x,h=s._y,o=s._z,_=s._w;return this._x=e*_+r*a+i*o-n*h,this._y=i*_+r*h+n*a-e*o,this._z=n*_+r*o+e*h-i*a,this._w=r*_-e*a-i*h-n*o,this._onChangeCallback(),this}slerp(t,s){if(0===s)return this;if(1===s)return this.copy(t);const e=this._x,i=this._y,n=this._z,r=this._w;let a=r*t._w+e*t._x+i*t._y+n*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=e,this._y=i,this._z=n,this;const h=1-a*a;if(h<=Number.EPSILON){const t=1-s;return this._w=t*r+s*this._w,this._x=t*e+s*this._x,this._y=t*i+s*this._y,this._z=t*n+s*this._z,this.normalize(),this._onChangeCallback(),this}const o=Math.sqrt(h),_=Math.atan2(o,a),c=Math.sin((1-s)*_)/o,l=Math.sin(s*_)/o;return this._w=r*c+this._w*l,this._x=e*c+this._x*l,this._y=i*c+this._y*l,this._z=n*c+this._z*l,this._onChangeCallback(),this}slerpQuaternions(t,s,e){this.copy(t).slerp(s,e)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,s=0){return this._x=t[s],this._y=t[s+1],this._z=t[s+2],this._w=t[s+3],this._onChangeCallback(),this}toArray(t=[],s=0){return t[s]=this._x,t[s+1]=this._y,t[s+2]=this._z,t[s+3]=this._w,t}fromBufferAttribute(t,s){return this._x=t.getX(s),this._y=t.getY(s),this._z=t.getZ(s),this._w=t.getW(s),this}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}}w.prototype.isQuaternion=!0;const g={dataChannelName:"Data channel",rtcConfig:{iceServers:[{urls:["stun:stun.l.google.com:19302"]}]},reconnectTries:1};function d(t){const[s]=_("connection-id",c()),e=l(`wss://signaling-server.tobbes.site/ws/${s}`),i=function(t,s,e){e=r(r({},g),e);const[i,n]=a.exports.useState({status:"connecting"});return a.exports.useEffect((()=>{if("connecting"!=i.status||null==s)return;const r=new RTCPeerConnection(e.rtcConfig),a=r.createDataChannel(e.dataChannelName,{maxRetransmits:1,ordered:!1});let h;a.onopen=()=>{n({status:"connected",onMessage:t=>(a.addEventListener("message",t),()=>a.removeEventListener("message",t)),sendMessage:t=>{a.send(t)}})},r.onicecandidate=e=>{null!=e.candidate&&s.sendSignalingMessage(t,e.candidate.toJSON())},r.oniceconnectionstatechange=()=>{switch(r.iceConnectionState){case"disconnected":case"failed":n((t=>({status:"connected"===t.status?"connecting":"error"})))}},s.onSignalingMessage((async(t,s)=>{clearTimeout(h),"type"in s?await r.setRemoteDescription(s):"candidate"in s&&await r.addIceCandidate(s)})),r.createOffer().then((async e=>{h=window.setTimeout((()=>{n((({status:t})=>({status:"error"!==t?"empty":"error"})))}),5e3),await r.setLocalDescription(e),s.sendSignalingMessage(t,e)}))}),[i.status,s,t]),i}(t,a.exports.useMemo((()=>e.socket?u(e.socket,s):void 0),[e.socket,s]));return a.exports.useMemo((()=>["connected"!==e.status?e.status:i.status,"connected"===i.status?(...t)=>{i.sendMessage(new Float32Array(t))}:null]),[e.status,i])}var x=h("button")`
  all: unset;
  padding: 1em 1.2em;
  border-radius: 0.5em;
  user-select: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.8em;
  color: pink;
  background-color: hotpink;
  appearance: none;
  margin: 0;
`,p=Math.PI/180;function z({id:t}){const[s,e]=d(t),[i,n]=a.exports.useState(!1);if(a.exports.useEffect((()=>{let t=!1;const s=s=>{t||(n(!0),t=!0);const i=(r=s.alpha,a=s.beta,h=s.gamma,o=a?a*p:0,_=h?h*p:0,c=r?r*p:0,l=Math.cos(o/2),u=Math.cos(_/2),y=Math.cos(c/2),m=Math.sin(o/2),g=Math.sin(_/2),d=Math.sin(c/2),new w(m*u*y-l*g*d,l*g*y+m*u*d,l*u*d+m*g*y,l*u*y-m*g*d));var r,a,h,o,_,c,l,u,y,m,g,d;null==e||e(i.x,i.y,i.z,i.w)};return addEventListener("deviceorientation",s),()=>removeEventListener("deviceorientation",s)}),[e]),!1===i)return o.createElement(b,null);switch(s){case"connected":return o.createElement(y,null,"Your phone is now visualized on the main screen");case"connecting":return o.createElement(y,null,"Connecting");case"error":return o.createElement(y,null,"Could not connect, make sure phone is connected to the same Wifi as the computer");case"empty":return o.createElement(y,null,"No one seems to be here anymore 😢");default:return null}}const b=()=>o.createElement(o.Fragment,null,o.createElement(y,null,"To use the phone gyro, we must first get your permission."),o.createElement(x,{onClick:()=>DeviceOrientationEvent.requestPermission().then((t=>"granted"!==t&&alert("Did not get permissions. Browser app must be restarted to try again.")))},"OK, ask away!"));export{z as default};
