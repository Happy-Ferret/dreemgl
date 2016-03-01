Ext.data.JsonP.flexbox_part1({"guide":"<h1 id='flexbox_part1-section-css3-flexible-box-or-flexbox---part-1'>CSS3 Flexible Box or flexbox - Part 1</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ul>\n<li>1. <a href='#!/guide/flexbox_part1-section-flexible-boxes-concept'>Flexible boxes concept</a>\n </li>\n<li>2. <a href='#!/guide/flexbox_part1-section-flexible-boxes-vocabulary'>Flexible boxes vocabulary</a>\n <ul>\n<li>2.1. <a href='#!/guide/flexbox_part1-section-flex-container'>Flex container</a>\n </li>\n<li>2.2. <a href='#!/guide/flexbox_part1-section-axes'>Axes</a>\n </li>\n<li>2.3. <a href='#!/guide/flexbox_part1-section-directions'>Directions</a>\n </li>\n<li>2.4. <a href='#!/guide/flexbox_part1-section-dimensions'>Dimensions</a>\n </li>\n</ul></li>\n<li>3. <a href='#!/guide/flexbox_part1-section-supported-attributes'>Supported attributes</a>\n </li>\n<li>4. <a href='#!/guide/flexbox_part1-section-the-flexbool-tool'>The Flexbool tool</a>\n </li>\n<li>5. <a href='#!/guide/flexbox_part1-section-container-attributes'>Container attributes</a>\n <ul>\n<li>5.1. <a href='#!/guide/flexbox_part1-section-the-flexdirection-attribute'>The flexdirection attribute</a>\n </li>\n<li>5.2. <a href='#!/guide/flexbox_part1-section-the-flexwrap-attribute'>The flexwrap attribute</a>\n </li>\n<li>5.3. <a href='#!/guide/flexbox_part1-section-the-justifycontent-attribute'>The justifycontent attribute</a>\n </li>\n</ul></li>\n</ul></div>\n\n<p>The <a href=\"https://www.w3.org/TR/css3-flexbox/\">CSS3 Flexible Box</a>, or <em>flexbox</em>, is a layout mode providing for the arrangement of elements (children of a container element) such that the elements behave predictably when the UI layout must accommodate different screen sizes and different display devices. CSS3 Flexible Box is a W3C standard (working draft). For many applications, the flexible box model provides an improvement over the block model in that it does not use floats, nor do the flex container's margins collapse with the margins of its contents.</p>\n\n<p>Many designers will find the <em>flexbox</em> model easier to use than the traditional CSS box model. Child elements in a <em>flexbox</em> can be laid out in any direction and can have flexible dimensions to adapt to the display space. Positioning child elements is thus much easier, and complex layouts can be achieved more simply and with cleaner code, as the display order of the elements is independent of their order in the source code. This independence intentionally affects only the visual rendering, leaving speech order and navigation based on the source order.</p>\n\n<h2 id='flexbox_part1-section-flexible-boxes-concept'>Flexible boxes concept</h2>\n\n<p>The defining aspect of the flex layout is the ability to alter its items' width and/or height to best fill the available space on any display device. A flex container expands items to fill available free space, or shrinks them to prevent overflow.</p>\n\n<p>The <em>flexbox</em> layout algorithm is direction-agnostic as opposed to the block layout, which is vertically-biased, or the inline layout, which is horizontally-biased. While the block layout works well for pages, it lacks sufficient definition to support application components that have to change orientation, resize, stretch, or shrink as the user agent changes, flips from vertical to horizontal, and so forth.</p>\n\n<h2 id='flexbox_part1-section-flexible-boxes-vocabulary'>Flexible boxes vocabulary</h2>\n\n<p>While a discussion of flexible boxes is liberated from terms like horizontal/inline axis and vertical/block axis, it requires a new terminology to properly describe the model. Consider the following diagram when reviewing the vocabulary items below. It shows a flex container that has a flexdirection of row, meaning that the flex items follow each other horizontally across the main axis according to the established writing mode, the direction in which the element's text flows, in this case left-to-right.</p>\n\n<p><img src=\"https://raw.githubusercontent.com/dreemproject/dreemgl/master/docs/images/flexbox-diagram.png\" width=\"750\" height=\"511\"></p>\n\n<h3 id='flexbox_part1-section-flex-container'>Flex container</h3>\n\n<p>The parent element in which flex items are contained. A flex container is defined using the flex or inline-flex values of the display attribute.\nFlex item\nEach child of a flex container becomes a flex item. Text directly contained in a flex container is wrapped in an anonymous flex item.</p>\n\n<h3 id='flexbox_part1-section-axes'>Axes</h3>\n\n<p>Every flexible box layout follows two axes. The main axis is the axis along which the flex items follow each other. The cross axis is the axis perpendicular to the main axis.</p>\n\n<ul>\n<li>The <strong>flexdirection</strong> attribute establishes the main axis.</li>\n<li>The <strong>justifycontent</strong> attribute defines how flex items are laid out along the main axis on the current line.</li>\n<li>The <strong>alignitems</strong> attribute defines the default for how flex items are laid out along the cross axis on the current line.</li>\n<li>The <strong>alignself</strong> attribute defines how a single flex item is aligned on the cross axis, and overrides the default established by alignitems.</li>\n</ul>\n\n\n<h3 id='flexbox_part1-section-directions'>Directions</h3>\n\n<p>The <strong>main start/main</strong> end and <strong>cross start/cross</strong> end sides of the flex container describe the origin and terminus of the flow of flex items. They follow the main axis and cross axis of the flex container in the vector established by the writing-mode (left-to-right, right-to-left, etc.).</p>\n\n<p>Flex items can be laid out on either a single line or on several lines according to the flexwrap attribute, which controls the direction of the cross axis and the direction in which new lines are stacked.</p>\n\n<h3 id='flexbox_part1-section-dimensions'>Dimensions</h3>\n\n<p>The flex items' agnostic equivalents of height and width are main size and cross size, which respectively follow the main axis and cross axis of the flex container.</p>\n\n<h1 id='flexbox_part1-section-dreemgl%27s-flexbox-implementation'>DreemGL's flexbox implementation</h1>\n\n<p>The DreemGL implementation of <em>flexbox</em> is based on <a href=\"https://github.com/facebook/css-layout\">Facebook's open source css-layout library</a>.</p>\n\n<p>While DreemGL uses the Facebook css-layout JavaScript library, the attribute names use a slightly different naming scheme. In Facebook's <em>flexbox</em> implementation attribute use camel-case spelling, in DreemGL all attribute name are lower case, e.g. <code>marginleft</code> instead or <code>marginLeft</code>. For the values, the <em>hyphen</em> has been removed, so it's <code>flexstart</code> instead of <code>flex-start</code>.</p>\n\n<h2 id='flexbox_part1-section-supported-attributes'>Supported attributes</h2>\n\n<table style=\"border: 1px solid darkgrey\">\n    <tr>\n      <th style=\"align: left\">Attribute name</th>\n      <th>Type / Value</th>\n    </tr>\n    <tr>\n      <td>w, width, h, height</td>\n      <td>positive number</td>\n    </tr>\n    <tr>\n      <td>minwidth, minheight</td>\n      <td>positive number</td>\n    </tr>\n    <tr>\n      <td>maxwidth, maxheight</td>\n      <td>positive number</td>\n    </tr>\n    <tr>\n      <td>left, right, top, bottom</td>\n      <td>number</td>\n    </tr>\n    <tr>\n      <td>margin</td><td>vec4</td>\n    </tr>\n    <tr>\n      <td>marginleft, marginright, margintop, marginbottom</td>\n      <td>typeless</td>\n    </tr>\n    <tr>\n      <td>paddding</td>\n      <td>vec4 (left, top, right, bottom); can be assigned a single value to set them all at once.</td>\n    </tr>\n    <tr>\n      <td>paddingleft, paddingright, paddingtop, paddingbottom</td><td>positive number</td>\n    </tr>\n    <tr>\n      <td>borderwidth, borderleftwidth, borderrightwidth, bordertopwidth, borderbottomwidth</td>\n      <td>positive number</td>\n    </tr>\n    <tr>\n      <td>flexdirection</td>\n      <td>'column', 'row'</td>\n    </tr>\n    <tr>\n      <td>justifycontent</td>\n      <td>'flex-start', 'center', 'flex-end', 'space-between', 'space-around'</td>\n    </tr>\n    <tr>\n      <td>alignitems, alignself</td>\n      <td>'flex-start', 'center', 'flex-end', 'stretch'</td>\n    </tr>\n    <tr>\n      <td>flex</td>\n      <td>positive number</td>\n    </tr>\n    <tr>\n      <td>flexwrap</td>\n      <td>'wrap', 'nowrap'</td>\n    </tr>\n    <tr>\n      <td>position</td>\n      <td>'relative', 'absolute'</td>\n    </tr>\n</table>\n\n\n<h2 id='flexbox_part1-section-the-flexbool-tool'>The Flexbool tool</h2>\n\n<p>This DreemGL application lets you play around with the various attributes and values, providing immediate visual feedback. You should open the application in a separate browser tab while going through this guide, and can use it to verify your understanding of flexbox.</p>\n\n<p><a href=\"/docs/examples/flexbox/flexboxtool\" target=\"_blank\">Open flexbox tool in tab</a></p>\n\n<iframe style=\"width:860px; height:864px; border:0\" src=\"/docs/examples/flexbox/flexboxtool\"></iframe>\n\n\n<h2 id='flexbox_part1-section-container-attributes'>Container attributes</h2>\n\n<h3 id='flexbox_part1-section-the-flexdirection-attribute'>The flexdirection attribute</h3>\n\n<p>The <strong>flexdirection</strong> attribute controls how items are laid out in the flex container, by setting the direction of the main axis. The two directions available are horizontal layout using the value <em>row</em>, and vertical layout using the value <strong>column</strong>. The following examples shows two containers with three children, each. The first container uses the default <strong>row</strong> direction for layout, the second container the <strong>column</strong> layout.</p>\n\n<p><a href=\"/docs/examples/flexbox/flexdirection\" target=\"_blank\">/docs/examples/flexbox/flexdirection.js</a></p>\n\n<iframe style=\"width:200px; height:200px; border:0\" src=\"/docs/examples/flexbox/flexdirection\"></iframe>\n\n\n<p><br/></p>\n\n<iframe style=\"width:860px; height:400px; border:0\" src=\"/docs/examples/docsourceviewer#file=flexbox/flexdirection.js\"></iframe>\n\n\n<h3 id='flexbox_part1-section-the-flexwrap-attribute'>The flexwrap attribute</h3>\n\n<p>By default flexbox will arrange all items on a single line, with no wrapping in place. The <strong>flexwrap</strong> attribute controls if the flex container lay out its items in single or multiple lines. The example below shows two containers with 5 boxes. The first container has <strong>flexwrap</strong> set to <strong>nowrap</strong>, the second container has <strong>flexwrap</strong> set to <strong>wrap</strong>, therefore the last item (which does not fit into the container) has been pushed to a new line.</p>\n\n<iframe style=\"width:300px; height:220px; border:0\" src=\"/docs/examples/flexbox/flexwrap\"></iframe>\n\n\n<p><br/></p>\n\n<iframe style=\"width:860px; height:400px; border:0\" src=\"/docs/examples/docsourceviewer#file=flexbox/flexwrap.js\"></iframe>\n\n\n<h3 id='flexbox_part1-section-the-justifycontent-attribute'>The justifycontent attribute</h3>\n\n<p>This defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.</p>\n\n<ul>\n<li><strong>flex-start</strong> (default): items are packed toward the start line</li>\n<li><strong>flex-end</strong> items are packed toward to end line</li>\n<li><strong>center</strong> items are centered along the line</li>\n<li><strong>space-between</strong> items are evenly distributed in the line; first item is on the start line, last item on the end line</li>\n<li><strong>space-around</strong> items are evenly distributed in the line with equal space around them. Note that visually the spaces aren't equal, since all the items have equal space on both sides. The first item will have one unit of space against the container edge, but two units of space between the next item because that next item has its own spacing that applies.</li>\n</ul>\n\n\n<p><a href=\"/docs/examples/flexbox/justifycontent\" target=\"_blank\">/docs/examples/flexbox/justifycontent.js</a></p>\n\n<iframe style=\"width:320px; height:340px; border:0\" src=\"/docs/examples/flexbox/justifycontent\"></iframe>\n\n\n<p><br/></p>\n\n<iframe style=\"width:860px; height:400px; border:0\" src=\"/docs/examples/docsourceviewer#file=flexbox/justifycontent.js\"></iframe>\n\n\n<p>To continue with part #2 of the flexbox guide, please <a href='/docs/api/index.html#!/guide/flexbox_part2'>click here</a>.</p>\n","title":"Flexbox Layout Part 1"});