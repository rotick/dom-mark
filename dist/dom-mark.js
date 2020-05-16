/**
* @funinps/dom-mark v1.0.0
* https://github.com/funinps/dom-mark
* (c) 2020-5-16 @dongnaebi
* @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).DomMark=t()}(this,function(){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}return function(){function n(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"body",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),this.container=null,this.box=null,this.observer=null,e instanceof window.HTMLElement?this.container=e:this.container=document.querySelector(e),!this.container)throw new Error("invalid selector: ".concat(e));this._setOptions(t)}var e,t,i;return e=n,(t=[{key:"render",value:function(){var s=this,e=this.options,c=e.content,t=e.fontSize,n=e.fontFamily,i=e.opacity,o=e.color,u=e.padding,r=e.zIndex,l=e.minMargin,d=e.rotate,h=e.observe;"static"===window.getComputedStyle(this.container).position&&(this.container.style.position="relative");var p=this.box||document.createElement("div");this.box=p;var f=document.createElement("div");p.style.cssText="position:absolute;top:0;left:0;right:0;bottom:0;font-size:".concat(t,";\n    font-family:").concat(n,";opacity:").concat(i,";color:").concat(o,";pointer-events:none;\n    user-select: none;-ms-user-select: none;z-index:").concat(r,";z-index:-1\\9;"),p.setAttribute("powered-by","https://github.com/funinps/dom-mark"),p.setAttribute("onselectstart","return false;"),p.setAttribute("ondragstart","return false;"),f.style.cssText="position:absolute;top:0;left:0;opacity:0;",f.innerHTML=c,p.appendChild(f),this.container.appendChild(p);function a(){var e=window.getComputedStyle(p),t=Number(e.width.replace("px","")),n=Number(e.height.replace("px","")),i=window.getComputedStyle(f),o=Number(i.width.replace("px","")),r=Number(i.height.replace("px",""));f=null;var a=s._arrange({boxWidth:t,boxHeight:n,itemWidth:o,itemHeight:r,boxPadding:u,minMarginH:l[1],minMarginV:l[0]}).map(function(e){return'<div style="position:absolute;top:'.concat(e.y,"px;left:").concat(e.x,"px;transform:rotate(").concat(d,'deg);">').concat(c,"</div>")});p.innerHTML=a.join(""),h&&s._observe()}var b=p.querySelectorAll("img");(b.length?function(){for(var n=[],e=0;e<b.length;e++)!function(e){var t=b[e];t.onload=function(){n.push(1),n.length===b.length&&a()},t.onerror=function(){throw new Error("image load error: ".concat(t.src))}}(e)}:a)()}},{key:"update",value:function(e){this.observer&&this.observer.disconnect(),this._setOptions(e),this.render()}},{key:"destroy",value:function(){this.observer&&this.observer.disconnect(),this.box&&this.box.remove()}},{key:"_setOptions",value:function(e){if(e.padding&&"number"!=typeof e.padding)throw new TypeError("padding must be a number");if(e.minMargin&&(!Array.isArray(e.minMargin)||e.minMargin.length<2||"number"!=typeof e.minMargin[0]||"number"!=typeof e.minMargin[1]))throw new TypeError("minMargin must be an array with 2 number item");this.options=r({content:"",fontSize:"inherit",fontFamily:"inherit",color:"inherit",opacity:.3,padding:20,zIndex:6e3,minMargin:[40,20],rotate:-15,observe:!0},this.options,e)}},{key:"_arrange",value:function(e){for(var t=e.boxWidth,n=void 0===t?800:t,i=e.boxHeight,o=void 0===i?600:i,r=e.boxPadding,a=void 0===r?10:r,s=e.itemWidth,c=void 0===s?90:s,u=e.itemHeight,l=void 0===u?30:u,d=e.minMarginH,h=void 0===d?10:d,p=e.minMarginV,f=void 0===p?10:p,b=Math.floor((n-2*a)/(c+h)),v=Math.floor((o-2*a)/(l+f)),m=(n-2*a-c*b)/(b-1),g=(o-2*a-l*v)/(v-1),y=b*v,w=[],x=1;x<=y;x++){var M=a+(x%b==0?b-1:x%b-1)*(c+m),k=a+(Math.ceil(x/b)-1)*(l+g);w.push({x:M,y:k})}return w}},{key:"_observe",value:function(){var e=this;window.MutationObserver&&(this.observer&&this.observer.disconnect(),this.observer=new window.MutationObserver(function(){e.render()}),this.observer.observe(this.container,{attributes:!0,childList:!0,subtree:!0}))}}])&&o(e.prototype,t),i&&o(e,i),n}()});
