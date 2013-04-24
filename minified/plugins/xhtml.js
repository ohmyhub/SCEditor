/*!pl SCEditor | (C) 2011-2013, Sam Clarke | sceditor.com/license */
(function(t){"use strict";t.sceditor.XHTMLSerializer=function(){var e,n,i,r,o,s,a,c,l,u,d=this,f={indentStr:"	"},m=[],g=0;e=function(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};return t?t.replace(/[&<>"]/g,function(t){return e[t]||t}):""},n=function(t){return t.replace(/[\r\n]/,"").replace(/[^\S|\u00A0]+/g," ")},d.serialize=function(t,e){if(m=[],e)for(t=t.firstChild;t;)i(t),t=t.nextSibling;else i(t);return m.join("")},i=function(t){switch(t.nodeType){case 1:var e=t.nodeName.toLowerCase();"!"===e&&a(t),o(t);break;case 3:c(t);break;case 4:s(t);break;case 8:a(t);break;case 9:case 11:r(t);break;case 2:case 5:case 6:case 7:case 10:case 12:}},r=function(t){var e;for(e=t.firstChild;e;)i(e),e=e.nextSibling},o=function(n){var r,o,s=n.nodeName.toLowerCase(),a=n.attributes.length,c=!n.firstChild&&t.sceditor.XHTMLSerializer.emptyTags.indexOf("|"+s+"|")>-1;if(!t(n).hasClass("sceditor-ignore")){for(l("<"+s,u(n));a--;)o=n.attributes[a],l(" "+o.name.toLowerCase()+'="'+e(o.value)+'"',!1);for(l(c?" />":">",!1),r=n.firstChild;r;)g++,i(r),r=r.nextSibling,g--;c||l("</"+s+">",u(n)&&n.firstChild&&u(n.firstChild))}},s=function(t){l("<![CDATA["+e(t.nodeValue)+"]]>")},a=function(t){l("<!-- "+e(t.nodeValue)+" -->")},c=function(t){var i=n(t.nodeValue);i&&l(e(i),u(t))},l=function(t,e){var n=g;if(e!==!1)for(m.length&&m.push("\n");n--;)m.push(f.indentStr);m.push(t)},u=function(e){var n=e.previousSibling;return 1!==e.nodeType&&n?!t.sceditor.dom.isInline(n):n||t.sceditor.dom.isInline(e.parentNode)?!t.sceditor.dom.isInline(e):!0}},t.sceditor.XHTMLSerializer.emptyTags="|area|base|basefont|br|col|frame|hr|img|input|isindex|link|meta|param|command|embed|keygen|source|track|wbr|",t.sceditor.plugins.xhtml=function(){var e,n,i,r,o,s,a,c=this,l={},u={};c.init=function(){t.isEmptyObject(t.sceditor.plugins.xhtml.converters||{})||t.each(t.sceditor.plugins.xhtml.converters,function(e,n){t.each(n.tags,function(t){l[t]||(l[t]=[]),l[t].push(n)})}),e(this)},e=function(e){var n={bold:{txtExec:["<strong>","</strong>"]},italic:{txtExec:["<em>","</em>"]},underline:{txtExec:['<span style="text-decoration: underline;">',"<span>"]},strike:{txtExec:['<span style="text-decoration: line-through;">',"<span>"]},subscript:{txtExec:["<sub>","</sub>"]},superscript:{txtExec:["<sup>","</sup>"]},left:{txtExec:['<div style="text-align: left;">',"<div>"]},center:{txtExec:['<div style="text-align: center;">',"<div>"]},right:{txtExec:['<div style="text-align: right;">',"<div>"]},justify:{txtExec:['<div style="text-align: justify;">',"<div>"]},font:{txtExec:function(e){var n=this;t.sceditor.command.get("font")._dropDown(n,e,function(t){n.insertText('<span style="font-family: '+t+';">',"</span>")})}},size:{txtExec:function(e){var n=this;t.sceditor.command.get("size")._dropDown(n,e,function(t){n.insertText('<span style="font-size: '+t+';">',"</span>")})}},color:{txtExec:function(e){var n=this;t.sceditor.command.get("color")._dropDown(n,e,function(t){n.insertText('<span style="color: '+t+';">',"</span>")})}},bulletlist:{txtExec:["<ul><li>","</li></ul>"]},orderedlist:{txtExec:["<ol><li>","</li></ol>"]},table:{txtExec:["<table><tr><td>","</td></tr></table>"]},horizontalrule:{txtExec:["<hr />"]},code:{txtExec:["<code>","</code>"]},image:{txtExec:function(t,e){var n=prompt(this._("Enter the image URL:"),e);n&&this.insertText('<img src="'+n+'" />')}},email:{txtExec:function(t,e){var n=e&&e.indexOf("@")>-1?null:e,i=prompt(this._("Enter the e-mail address:"),n?"":e),r=prompt(this._("Enter the displayed text:"),n||i)||i;i&&this.insertText('<a href="mailto:'+i+'">'+r+"</a>")}},link:{txtExec:function(t,e){var n=e&&e.indexOf("http://")>-1?null:e,i=prompt(this._("Enter URL:"),n?"http://":e),r=prompt(this._("Enter the displayed text:"),n||i)||i;i&&this.insertText('<a href="'+i+'">'+r+"</a>")}},quote:{txtExec:["<blockquote>","</blockquote>"]},youtube:{txtExec:function(e){var n=this;t.sceditor.command.get("youtube")._dropDown(n,e,function(t){n.insertText('<iframe width="560" height="315" src="http://www.youtube.com/embed/{id}?wmode=opaque" data-youtube-id="'+t+'" frameborder="0" allowfullscreen></iframe>')})}},rtl:{txtExec:['<div stlye="direction: rtl;">',"</div>"]},ltr:{txtExec:['<div stlye="direction: ltr;">',"</div>"]}};e.commands=t.extend(!0,{},n,e.commands)},c.signalToSource=function(e,i){return i=i.jquery?i[0]:i,n(i),o(i),a(i),(new t.sceditor.XHTMLSerializer).serialize(i,!0)},c.signalToWysiwyg=function(t){return t},c.convertTagTo=function(t,e){for(var n,i,r=t.attributes.length,o=t.ownerDocument.createElement(e);r--;)i=t.attributes[r],o.setAttribute(i.name,i.value);for(;n=t.firstChild;)o.appendChild(n);return t.parentNode.replaceChild(o,t),o},i=function(e,n){l[e]&&t.each(l[e],function(i,r){r.tags[e]?t.each(r.tags[e],function(e,i){void 0!==n.attr(e)&&(i&&0>t.inArray(n.attr(e),i)||r.conv.call(c,n[0],n))}):r.conv&&r.conv.call(c,n[0],n)})},n=function(e){l&&t.sceditor.dom.traverse(e,function(e){var n=t(e),r=e.nodeName.toLowerCase();l&&(i("*",n),i(r,n))},!0)},r=function(e,n){var i=e.childNodes,o=e.nodeName.toLowerCase(),s=e.nodeValue,a=i.length;if(n&&"br"===o)return!0;if(t.sceditor.XHTMLSerializer.emptyTags.indexOf("|"+o+"|")>-1)return!1;if(s&&/\S|\u00A0/.test(s))return!1;for(;a--;)if(!r(i[a],!0))return!1;return!0},o=function(e){t.sceditor.dom.traverse(e,function(e){var n,i=r(e),o=e.nodeName.toLowerCase(),s=e.parentNode,a=e.nodeType,c=t.sceditor.plugins.xhtml.allowedTags,l=t.sceditor.plugins.xhtml.disallowedTags;if(4===a?o="!cdata":("!"===o||8===a)&&(o="!comment"),i?n=!0:c&&c.length&&3!==a?n=0>t.inArray(o,c):l&&l.length&&3!==a&&(n=t.inArray(o,l)>-1),n){for(;!i&&e.firstChild;)s.insertBefore(e.firstChild,e);s.removeChild(e)}},!0)},s=function(e,n){var i={};return e&&t.extend(i,e),n?(t.each(n,function(e,n){t.isArray(n)?i[e]=t.merge(i[e]||[],n):i[e]||(i[e]=null)}),i):i},a=function(e){var n,i,r,o,a,c,l=t.sceditor.plugins.xhtml.allowedAttribs,d=l&&!t.isEmptyObject(l),f=t.sceditor.plugins.xhtml.disallowedAttribs,m=f&&!t.isEmptyObject(f);u={},t.sceditor.dom.traverse(e,function(e){if(e.attributes&&(n=e.nodeName.toLowerCase(),o=e.attributes.length))for(u[n]||(u[n]=d?s(l["*"],l[n]):s(f["*"],f[n]));o--;)i=e.attributes[o],r=i.name,a=u[n][r],c=!1,d?c=null!==a&&(!t.isArray(a)||0>t.inArray(i.value,a)):m&&(c=null===a||t.isArray(a)&&t.inArray(i.value,a)>-1),c&&e.removeAttribute(r)})}},t.sceditor.plugins.xhtml.converters=[{tags:{"*":{width:null}},conv:function(t,e){e.css("width",e.attr("width")).removeAttr("width")}},{tags:{"*":{height:null}},conv:function(t,e){e.css("height",e.attr("height")).removeAttr("height")}},{tags:{li:{value:null}},conv:function(t,e){e.removeAttr("value")}},{tags:{"*":{text:null}},conv:function(t,e){e.css("color",e.attr("text")).removeAttr("text")}},{tags:{"*":{color:null}},conv:function(t,e){e.css("color",e.attr("color")).removeAttr("color")}},{tags:{"*":{face:null}},conv:function(t,e){e.css("fontFamily",e.attr("face")).removeAttr("face")}},{tags:{"*":{align:null}},conv:function(t,e){e.css("textAlign",e.attr("align")).removeAttr("align")}},{tags:{"*":{border:null}},conv:function(t,e){e.css("borderWidth",e.attr("border")).removeAttr("border")}},{tags:{applet:{name:null},img:{name:null},layer:{name:null},map:{name:null},object:{name:null},param:{name:null}},conv:function(t,e){e.attr("id")||e.attr("id",e.attr("name")),e.removeAttr("name")}},{tags:{"*":{vspace:null}},conv:function(t,e){e.css("marginTop",e.attr("vspace")-0).css("marginBottom",e.attr("vspace")-0).removeAttr("vspace")}},{tags:{"*":{hspace:null}},conv:function(t,e){e.css("marginLeft",e.attr("hspace")-0).css("marginRight",e.attr("hspace")-0).removeAttr("hspace")}},{tags:{hr:{noshade:null}},conv:function(t,e){e.css("borderStyle","solid").removeAttr("noshade")}},{tags:{"*":{nowrap:null}},conv:function(t,e){e.css("white-space","nowrap").removeAttr("nowrap")}},{tags:{big:null},conv:function(e){t(this.convertTagTo(e,"span")).css("fontSize","larger")}},{tags:{small:null},conv:function(e){t(this.convertTagTo(e,"span")).css("fontSize","smaller")}},{tags:{b:null},conv:function(e){t(this.convertTagTo(e,"strong"))}},{tags:{u:null},conv:function(e){t(this.convertTagTo(e,"span")).css("textDecoration","underline")}},{tags:{i:null},conv:function(e){t(this.convertTagTo(e,"em"))}},{tags:{s:null,strike:null},conv:function(e){t(this.convertTagTo(e,"span")).css("textDecoration","line-through")}},{tags:{dir:null},conv:function(t){this.convertTagTo(t,"ul")}},{tags:{center:null},conv:function(e){t(this.convertTagTo(e,"div")).css("textAlign","center")}},{tags:{font:{size:null}},conv:function(t,e){e.css("fontSize",e.css("fontSize")).removeAttr("size")}},{tags:{font:null},conv:function(t){this.convertTagTo(t,"span")}}],t.sceditor.plugins.xhtml.allowedAttribs={},t.sceditor.plugins.xhtml.disallowedAttribs={},t.sceditor.plugins.xhtml.allowedTags=[],t.sceditor.plugins.xhtml.disallowedTags=[]})(jQuery);