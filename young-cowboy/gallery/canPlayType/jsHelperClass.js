/**
 * @preserve Javascript HELPER Class v0.0.1.30 (2011-07-20)
 *
 * @author Ronny Mennerich <ronny@mennerich.name>
 * @copyright 2011, Ronny Mennerich
 *
 * @license
 * Javascript HELPER Class is free piece of software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License or GNU LESSER GENERAL 
 * PUBLIC LICENSE as published by the Free Software Foundation, either version 
 * 3 of the License, or (at your option) any later version.
 *
 * Javascript HELPER Class is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License and 
 * GNU LESSER GENERAL PUBLIC LICENSE along with Javascript HELPER Class.  If not, 
 * see <http://www.gnu.org/licenses/>.
 */
/* Prevent global vars */
(function(window, undefined) {
/* To use correct document, navigator and location accordingly with window object */
var document = window.document, navigator = window.navigator, location = window.location;
/**---------------------------------------------------------------*/
/**------------------ let's create a JS HELPER -------------------*/
/**---------------------------------------------------------------*/
/* HELPER H */
var H = function() {};
/* fct: get an element by given id */
H.$ = function(id) {
  var $id = null, exp = /^(?:(\.))(.*)$/;
  if(exp.test(id)) {$id = {$1: RegExp.$1, $2: RegExp.$2};}
  
  if(!$id && typeof(document.getElementById(id)) !== null) {return document.getElementById(id);}
  else if($id && $id.$1 && typeof(document.getElementsByClassName($id.$2)) !== null && document.getElementsByClassName($id.$2).length > 0) {return document.getElementsByClassName($id.$2);}
  return null;
};
/* fct: log o to browser console, use t for "firebug" like console styling */
H.log = function(o, t) {
  /* do: "firebug" like console using function t (info, error, ...) */
  if(typeof(window.console) === 'object' && typeof(t) !== "undefined" && typeof(window.console[t]) !== "undefined") {window.console[t](o); return;}
  /* do: Opera console */
  else if(typeof(window.opera) === 'object' && typeof(window.opera.postError) !== "undefined") {window.opera.postError(o); return;}
  /* do: IE console */
  else if(typeof(window.console) === 'object' && typeof(window.console.log) !== "undefined") {window.console.log(o); return;}
};
/* fct: add event to given object */
H.addEvent = function(o, type, fn) {
  var o = ((typeof(o) === "object") ? o : H.$(o));
  var ae = function(o, type, fn) {
    if(o.attachEvent) {
      o['e'+type+fn] = fn;
      o[type+fn] = function(){o['e'+type+fn](window.event);};
      o.attachEvent('on'+type, o[type+fn]);
    } else {o.addEventListener(type, fn, false);}
  };
  if(!o) {return;}
  if(!o.length) {ae(o, type, fn);}
  else {for(var i=0; i<o.length; i++) {ae(o[i], type, fn);}}
};
/* fct: remove event from given object */
H.removeEvent = function(o, type, fn) {
  var o = ((typeof(o) === "object") ? o : H.$(o));
  var re = function(o, type, fn) {
    if(o.detachEvent) {
      o.detachEvent('on'+type, o[type+fn]);
      o[type+fn] = null;
    } else {o.removeEventListener('on'+type, fn, false);}
  };
  if(!o) {return;}
  if(!o.length) {re(o, type, fn);}
  else {for(var i=0; i<o.length; i++) {re(o[i], type, fn);}}
};
/* fct: check if element e in array a */
H.inArray = function(ar, e) {
    for(var i=0, arl=ar.length; i<arl; i++) {if(ar[i] === e) {return true;}} return false;
};
/* fct: create element and append element as child to object */
H.createHTMLEl = function(o, tagName, attr) {
  var o = ((typeof(o) === "object") ? o : H.$(o));
  var el = document.createElement(tagName); el = H.mergeObjs(el, attr);
  if(typeof(o) === "object" && o !== null) {o.appendChild(el);}
  return el;
};
/* fct: merge two objects */
H.mergeObjs = function(e, obj2) {var el = ((typeof(e) !== "string") ? e : H.$(e)); if(typeof(el) !== "undefined" && el !== null) {for(var p in obj2) {try{el[p] = obj2[p];} catch(ex) {H.log("Setting property \""+p+"\" failed with message:\n-> "+ex, "warn");}}} return el; };
/* fct: add css class to element */
H.addCssClass = function(e, c) {
  var el = ((typeof(e) === "object") ? e : H.$(e)); if(el === null) {return;}
  var add = function(el, c) {
    var cn = ((el.className) ? el.className.split(" ") : []);
    if(H.inArray(cn, c)) {return;}
    else {var cnn = ((cn.length > 0) ? el.className+" "+c : c); H.mergeObjs(el, {className: cnn});}
  };
  if(el.length) {for(var i=0; i<el.length; i++) {add(el[i], c);}} else {add(el, c);}
};
/* fct: add css class to element */
H.removeCssClass = function(e, c) {
  var el = ((typeof(e) === "object") ? e : H.$(e)); if(el === null) {return;}
  var remove = function(el, c) {
    var cn = ((el.className) ? el.className.split(" ") : []), cnn = "";
    if(!H.inArray(cn, c)) {return;}
    else {var idx = cn.indexOf(c); cn.splice(idx, 1); cnn = cn.join(" ");}
    // for(var i=0, cnl=cn.length; i<cnl; i++) {if(cn[i] !== c) {cnn += ((i>0) ? " "+cn[i] : cn[i]);}}
    H.mergeObjs(el, {className: cnn});
  };
  if(el.length) {for(var j=0; j<el.length; j++) {remove(el[j], c);}} else {remove(el, c);}
};
/* fct: set css style to element */
H.setCssStyle = function(e, s, v) {
  var el = ((typeof(e) === "object") ? e : H.$(e)); if(el === null) {return;}
  /* do: check if s + v are arrays of styles */
  if((typeof(s) === "object" && s.length) && (typeof(v) === "object" && v.length)) {for(var i=0, sl=s.length; i<sl; i++) {if(typeof(el.style) !== "undefined"){el.style[s[i]] = v[i];}}}
  /* do: set one style only */
  else if(typeof(el.style) !== "undefined"){el.style[s] = v;}
};
/* fct: show element */
H.showEl = function(el) {if(H.$(el) !== null) {H.$(el).style.display = "block";}};
/* fct: hide element */
H.hideEl = function(el) {if(H.$(el) !== null) {H.$(el).style.display = "none";}};
/* fct: call function delayed */
H.callDelayed = function(f, t, o) {if(!o) {var o = window.setInterval(function() {H.callDelayed(f, t, o);}, t);return;} else if(o) {window.clearInterval(o); o = null; f(); return;}};
/* fct: on DOM ready call fct.fn */
H.onDOMReady = function(fn) {
  var d = document;
  /* do: if W3C-compliant browser - Opera 10.x+, FF 3.x+, Chrome, Safari, IE9 */
  if(d.addEventListener) {d.addEventListener("DOMContentLoaded", fn, false);}
  /* do: if IE (8-) */
  else if(d.attachEvent) {d.attachEvent("onreadystatechange", fn, false);}
  /* do: others go here */
  else if(d.readyState === "interactive" || d.readyState === "complete") {fn();}
};
/* fct: create XML Http Request */
H.XHR = function(type, src, msg) {
  var xhr;
  try{
    try {xhr = new XMLHttpRequest();}
    catch(ms) {
      try {xhr = new ActiveXObject("Msxml2.XMLHTTP");}
      catch (nonms) {try {xhr = new ActiveXObject("Microsoft.XMLHTTP");} catch (failed) {xhr = null;}}
    }
    if(xhr !== null) {
      xhr.open(type, src, false);
      if(type.toUpperCase() === "POST") {
        // xhr.setRequestHeader("If-Modified-Since", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      } else {msg=null;}
      xhr.send(msg);
    }
  } catch(ex1) {H.log(ex1.message, "info"); xhr = {status: 404};}
  return xhr;
};
/* do: add H to window to use like js$.fct */
window.js$ = H;
/**---------------------------------------------------------------*/
/**------------------- finished the JS HELPER --------------------*/
/**---------------------------------------------------------------*/
})(this);