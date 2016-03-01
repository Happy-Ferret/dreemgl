Ext.data.JsonP.devguide({"guide":"<h1 id='devguide-section-developer%27s-guide-to-dreemgl'>Developer's Guide to DreemGL</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ul>\n<li>1. <a href='#!/guide/devguide-section-views'>Views</a>\n <ul>\n<li>1.1. <a href='#!/guide/devguide-section-adding-children-to-views-using-render-functions'>Adding Children to Views Using Render Functions</a>\n </li>\n<li>1.2. <a href='#!/guide/devguide-section-how-render-functions-work'>How Render Functions Work</a>\n </li>\n<li>1.3. <a href='#!/guide/devguide-section-adding-children-to-views-using-appendchild'>Adding Children to Views Using appendChild</a>\n </li>\n</ul></li>\n<li>2. <a href='#!/guide/devguide-section-attributes'>Attributes</a>\n <ul>\n<li>2.1. <a href='#!/guide/devguide-section-creating-attributes'>Creating Attributes</a>\n </li>\n<li>2.2. <a href='#!/guide/devguide-section-listening-to-changes'>Listening to Changes</a>\n </li>\n<li>2.3. <a href='#!/guide/devguide-section-using-attributes'>Using Attributes</a>\n </li>\n</ul></li>\n<li>3. <a href='#!/guide/devguide-section-shaders'>Shaders</a>\n <ul>\n<li>3.1. <a href='#!/guide/devguide-section-how-do-shaders-work-with-view-attributes%3F'>How do shaders work with view attributes?</a>\n </li>\n<li>3.2. <a href='#!/guide/devguide-section-how-does-typing-work-in-shaders%3F'>How does typing work in shaders?</a>\n </li>\n<li>3.3. <a href='#!/guide/devguide-section-how-does-the-shader-compiler-work%3F'>How does the shader compiler work?</a>\n </li>\n<li>3.4. <a href='#!/guide/devguide-section-should-variables-be-on-the-view-or-on-the-shader%3F'>Should variables be on the view or on the shader?</a>\n </li>\n<li>3.5. <a href='#!/guide/devguide-section-can-i-write-custom-shaders%3F'>Can I write custom shaders?</a>\n </li>\n<li>3.6. <a href='#!/guide/devguide-section-how-do-i-use-texture-in-a-shader%3F'>How do I use texture in a shader?</a>\n </li>\n</ul></li>\n</ul></div>\n\n<p>This guide is intended for developers who want to write applications or extend the DreemGL framework.</p>\n\n<p>DreemGL is DreemGL, an open-source multi-screen prototyping framework\nfor iOT with a visual editor and shader styling for webGL and DALi\nruntimes written in JavaScript. An overview of the framework is shown\nhere:</p>\n\n<p>![Architecture Image]\n(https://raw.githubusercontent.com/dreemproject/dreemgl/dev/docs/images/architecture.png)</p>\n\n<h2 id='devguide-section-views'>Views</h2>\n\n<p><a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/view.js\">view.js</a> is the baseclass of all visible items on screen.  It contains\nall attributes that are used by the render system to layout, and draw\na view. A <strong>view</strong> has a set of 'children' on this.children and a set of\n<strong>shaders</strong> that it iterates over to draw them.</p>\n\n<p>So if you look in\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/platform/webgl/devicewebgl.js\">system/platform/webgl/devicewebgl.js</a>,\nyou will see the main <code>drawpass</code>. The <code>doColor</code> method loops over the\nset of views that need layout, meaning the ones that need their\nmatrices set up, and then loops over the surfaces to draw them. To do\nthis, DreemGL uses a <code>drawpass</code> or a <code>render to texture</code> . The\n<code>drawpass</code> class holds the actual loop-over-views loop to then draw\nthe shaders.</p>\n\n<h3 id='devguide-section-adding-children-to-views-using-render-functions'>Adding Children to Views Using Render Functions</h3>\n\n<p>To add children to views, the recommended way is to use <code>render</code>\nfunctions which generate children based on state on properties. If you\ndo it this way, then <code>livereload</code> works. If you make the UI much more\nstateful by dynamically adding children using the <code>appendChild</code>\nfunction, then live reloading becomes much harder as described further on.</p>\n\n<p>Learning how to use the render functions is very important. For many\nsmaller scale datasets, it works great and is the recommended\nmethodology. For very large scale datasets, it is adviseable to use\nthe typed-array api, where you essentially write your own renderer for\nvery large datasets.</p>\n\n<h3 id='devguide-section-how-render-functions-work'>How Render Functions Work</h3>\n\n<p>When the UI initializes, it calls <code>render</code> on the composition,\nreturning a tree. Then, the UI finds the screen it wants to show, and\nthen it calls <code>Render.process</code> (see\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/render.js\">system/base/render.js</a>)\non that screen.</p>\n\n<p>This will emit the <code>init</code> event on the screen, and call the <code>render</code>\nfunction on that screen. At that point, every widget in the tree will\nrecursively get <code>render</code> on itself called to determine its children.</p>\n\n<p><em>So how do render functions know when to re-render themselves?</em>\nIf you look at\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/render.js\">system/base/render.js</a>,\nyou will see that DreemGL 'watches' all the attribute getters on the\nobject it calls <code>render</code> on.</p>\n\n<p>So, this example:</p>\n\n<p><code>view({prop:10, render:function(){ return view({bla:this.prop}) }})</code></p>\n\n<p>creates an update bind between the <code>prop</code> on the parent view and its\n<code>render1 function. If that</code>prop<code>gets changed anywhere, 'render</code> will\nbe called again automatically.</p>\n\n<p>This is similar to how react works, except the 'state' object is put on the component in pieces.</p>\n\n<p><code>render</code> is relatively fast, and can be used to do a fair amount of\ndynamic UI with a <code>render</code> function. It is also incremental and\ncached, so if you just add an item at the end of a list, it is not\nvery expensive to just use the <code>render</code> function.</p>\n\n<h3 id='devguide-section-adding-children-to-views-using-appendchild'>Adding Children to Views Using appendChild</h3>\n\n<p>If you make the UI much more stateful by dynamically adding children\nusing the <code>appendChild</code> function, then live reloading becomes much\nharder. Unless you have a very good reason, we recommend that you <strong>do\nnot use</strong> <code>appendChild</code> and instead use the <code>render</code> functions.</p>\n\n<p>The reason you may need to use an <code>appendChild</code> function, is that if you call\na constructor of a view like this:</p>\n\n<p><code>view({props})</code></p>\n\n<p>it returns a view, but that view has not yet been initialized. <code>init</code>\nhas not been called on it yet, nor does it have <code>render</code> called on it\nyet. There are also other behind-the-scenes operations happening such as\nstyle application, which restricts the creation of views to be inside\nspecific scopes.</p>\n\n<h2 id='devguide-section-attributes'>Attributes</h2>\n\n<p><strong>Attributes</strong> are special properties on an object. You can define them like this:\n<code>this.attributes={propname:Config({value:10})</code></p>\n\n<h3 id='devguide-section-creating-attributes'>Creating Attributes</h3>\n\n<p>To create attributes, define a magical attribute setter as shown in <a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/node.js\">node.js</a>.</p>\n\n<p><code>this.attributes = {}</code> is actually a function call. Using setters as\ninit calls allows DreemGL to create nested json and assign them to\nclasses all at once: <code>{attributes:{}}</code></p>\n\n<p>Again, all of these things are defined in\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/node.js\">node.js</a>.</p>\n\n<h3 id='devguide-section-listening-to-changes'>Listening to Changes</h3>\n\n<p>Attributes can listen to changes, as they are implemented with an\nunderlying getter/setter (see\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/node.js\">system/base/node.js</a>).</p>\n\n<p>Attributes can be assigned 'listeners' which you can see, for example,\nin <code>borderradius</code> in\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/view.js\">view.js</a>.</p>\n\n<p>The reason DreemGL uses these setters is that there is a very clean json mapping like so:</p>\n\n<p><code>view({someattrib:function(){ } })</code></p>\n\n<p>which is the same as:</p>\n\n<p><code>this.someattrib = function(){}</code></p>\n\n<h3 id='devguide-section-using-attributes'>Using Attributes</h3>\n\n<p>The recommended usage methodology is as follows.</p>\n\n<ol>\n<li>Define an attribute:</li>\n</ol>\n\n\n<p><code>this.attributes = {prop:Config({...})}</code></p>\n\n<p>Note that the <code>Config</code> wrapper allows you to store values in the\nattribute config object, which can contain type, name, meta data for\nthe visual editor, etc.</p>\n\n<ol>\n<li>Define an attribute on a view. The arguments to the <code>view({...})</code> is the same object that is assigned\nto the <code>this.attributes = {}</code> setter of the instance, which is what\nlets you define an attribute on a view as follows:</li>\n</ol>\n\n\n<p><code>view({prop:10})</code></p>\n\n<p>This creates an attribute called <code>prop</code>, of type <code>float</code> automatically,</p>\n\n<ol>\n<li>Put a listener on the attribute and assign a function to it. In\nthis example, we have created an attribute called <code>prop</code>. Now lets\nput a listener on it and assign a function to it as follows:</li>\n</ol>\n\n\n<p><code>this.prop = function(){ }</code> is a shortcut for\n<code>this.addListener('prop', function(){})</code> if it's an attribute.</p>\n\n<p>It's a shortcut for <code>addlistener</code> with one side note: if you assign to\nthe property again with a new function, it will <em>remove the old\nlistener and set the new one</em>.</p>\n\n<p>This makes it very easy to hook/unhook functions on listeners. And, it\nmeans you can write your components in a very clear and simple way, such as:</p>\n\n<p><code>this.click = function(){ }</code></p>\n\n<p>Attributes are also automatically readable in shaders. So, the following example:</p>\n\n<p><code>view({prop:10, bg:{color(){ return prop*vec4(1) }}})</code></p>\n\n<p>makes a view where the background shader reads a property all without\nthe need for declaring/creating attributes.</p>\n\n<p>Event flow follows the inheritance structure of\nthe class. Base classes get their listeners called first as you can\nsee in the implementation of\n<a href=\"https://github.com/dreemproject/dreemgl/blob/dev/system/base/node.js\">node.js</a>.</p>\n\n<h2 id='devguide-section-shaders'>Shaders</h2>\n\n<p>Each view contains several shaders (such as <code>bg</code>, <code>border</code>) which can be assigned\nto a specific shader class. Views may turn on shaders when certain\nfeatures are enabled, for example:\n<code>hardrect</code> is assigned to <code>this.bg</code> if <code>this.borderradius</code> is <code>square</code>. This keeps performance fast by default.</p>\n\n<h3 id='devguide-section-how-do-shaders-work-with-view-attributes%3F'>How do shaders work with view attributes?</h3>\n\n<p><code>redraw()</code> is called whenever a view changes an attribute that a shader is bound to. This causes the new value to be used in the shader.</p>\n\n<h3 id='devguide-section-how-does-typing-work-in-shaders%3F'>How does typing work in shaders?</h3>\n\n<p>All data passed to shaders must have an explicit type. Dreemgl provides a few mechanisms to make this convenient.</p>\n\n<p>Type information specified on view attributes is automatically used. If a type can't be determined, type inferencing is used.</p>\n\n<p>Dreemgl also provides a mechanism to create structs:</p>\n\n<pre><code>// define a custom struct for use later\nthis.vertexstruct =  define.struct({\n pos:vec3,\n color:vec4,\n id: float\n})\n\n// make an instance of vertexstruct\nthis.mesh = this.vertexstruct.array();\n\n// push values onto the struct instance in the order they were declared in this.vertexstruct\nthis.mesh.push(pos, color, id)\n</code></pre>\n\n<p>Builtin <code>structs</code> use the same mechanism, e.g. <code>vec2()</code> is really an instance of <code>define.struct</code>, see\n<a href=\"https://github.com/dreemproject/dreemgl/blob/master/system/base/define.js\">system/base/define.js</a>.</p>\n\n<h3 id='devguide-section-how-does-the-shader-compiler-work%3F'>How does the shader compiler work?</h3>\n\n<p>The shader compiler lives on a baseclass of all the shaders, at\n<a href=\"https://github.com/dreemproject/dreemgl/blob/master/system/base/shader.js\">system/base/shader.js</a>.\nEvery time you extend a shader class it will run the js code-compiler\nto generate a pixel/vertexshader from that shader class with a hook.\nSo, every level of the shader prototype chain has a fully-generated\nset of shaders that you can place into a GL context.</p>\n\n<p>The shader compiler also will turn function references on its objects\ninto getter/setters that will flag a shader ‘dirty’ so it knows when\nextending it actually made it dirty.  If you just extend a shader and\nonly overload uniforms, it wont flag dirty.  The shader compiler knows\nhow to walk js object structures, and you can reference values on the\nshader object itself and the view.  It will only dynamically listen to\nvalues on the view (via the attribute system).</p>\n\n<p><code>this.style</code> can make this more efficient. If you override <code>bg</code> in an\ninstance it is slow. However, <code>this.style</code> allows instances with\nspecial overrides to create an interim class, allowing for compilation\nand faster instancing. In this way, style properties end up in the\nprototype and can still be overridden on a per-instance basis.</p>\n\n<h3 id='devguide-section-should-variables-be-on-the-view-or-on-the-shader%3F'>Should variables be on the view or on the shader?</h3>\n\n<p>For interactivity variabes, like <code>pixelSize</code>, you should put variables on the\nview and access them in the shader.  For shader-specific functions and\nvariables, it is fine to access them directly in the shader, but you\nwill not get automatic listeners and therefore redraw.</p>\n\n<p>Example: You want to control <code>pixelSize</code> in a <code>mouseleftup</code> function</p>\n\n<p>To do this, you would put variables on the view, and access them in the shader as <code>view.pixelSize</code>.\nManipulating them using <code>this.pixelSize =...</code> allows the shader to bind itself to <code>view.pixelSize</code> via a listener\nso that you get an automatic redraw if you change it.</p>\n\n<h3 id='devguide-section-can-i-write-custom-shaders%3F'>Can I write custom shaders?</h3>\n\n<p>Yes. If you want to write custom shaders you need to pick the shader you will subclass OR use <code>bgcolorfn</code>.\nWe recommend that you make a new shader class on a new view class with custom geometry to build most widgets.</p>\n\n<p>You can also freely inherit it instances, but if you intend to instance many of these, then it makes more sense to put it in a class.</p>\n\n<h3 id='devguide-section-how-do-i-use-texture-in-a-shader%3F'>How do I use texture in a shader?</h3>\n\n<p>Example: You want to use <code>bgimage</code> resource image as texture in <code>bg</code>'s color function</p>\n\n<p>Image objects are automatically converted to texture objects, so you can do the following:\n<code>`\nmytexture:require('./mytexture.jpg')\ncolor:function(){\n   return mytexture.sample(...)\n}\n</code></p>\n\n<h1 id='devguide-section-other-useful-documentation'>Other Useful Documentation</h1>\n\n<ul>\n<li><a href=\"/docs/api/index.html#!/api\">API Reference</a></li>\n<li><a href=\"/docs/api/index.html#!/guide/components\">Components, Services &amp; IoT</a></li>\n<li><a href=\"/docs/api/index.html#!/guide/dreem_in_10_part1\">DreemGL-in-10</a></li>\n<li><a href=\"/docs/api/index.html#!/guide/dali_runtime\">DreemGL DALi Runtime</a></li>\n<li><a href=\"/docs/api/index.html#!/guide/toolkit\">DreemGL Visual Toolkit</a></li>\n<li><a href=\"/docs/api/index.html#!/guide/appendix\">DreemGL Appendix</a></li>\n</ul>\n\n","title":"DreemGL Developer Guide"});