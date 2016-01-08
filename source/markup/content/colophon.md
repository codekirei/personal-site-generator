---
template: page
title: Colophon
description: This is the colophon
slug: /colophon
---

# Statically Generated Site

This site is entirely static. The original code used to generate it is open-sourced under the MIT license and available on [GitHub](https://github.com/codekirei/codekirei.github.io/tree/generator). A significant amount of nonoriginal open-source code was also used, much of which is listed below.

# Markup

The site's content is written in [Markdown](http://daringfireball.net/projects/markdown/) and rendered with [markdown-it](https://github.com/markdown-it/markdown-it). The templates for the site's HTML are [Mithril](http://mithril.js.org/) modules rendered on the server with [mithril-node-render](https://github.com/StephanHoyer/mithril-node-render). Content is read and injected into the templates by a static markup generator I wrote titled [smg](https://github.com/codekirei/smg).

# Style

The styles for this site are written in [Stylus](http://stylus-lang.com/). Concepts from [itcss](http://itcss.io/) and [BEM](http://getbem.com/) are used throughout. [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes) is used extensively in lieu of a traditional grid system. The layout is responsive and has been tested on modern desktop and mobile browsers.

* Colors and Shades
  <ul>
    <li><span style="color:#B00000">#B00000</span></li>
    <li><span style="color:#000">#000<span></li>
    <li><span style="color:#222">#222<span></li>
    <li><span style="color:#555">#555<span></li>
    <li><span style="color:#AAA">#AAA<span></li>
    <li><span style="color:#EEE;background:#555;">#EEE<span></li>
    <li><span style="color:#FFF;background:#222;">#FFF</span></li>
  </ul>
* Fonts
  * [Open Sans](http://www.opensans.com/)
  * [Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
* SVG Icons
  * [Font Awesome](http://fontawesome.io/) via [IcoMoon](https://icomoon.io/app/)

# Scripts

The site's JavaScript is written in ES6, transpiled by [Babel](https://babeljs.io/), and bundled by [webpack](http://webpack.github.io/). [Domready](https://github.com/ded/domready) is used extensively to ensure the DOM is, in fact, ready before DOM-dependent scripts fire. I also use my [get-element](https://github.com/codekirei/get-element) module a lot to grab elements to interact with.

The menu animation is powered by a custom script that uses [bezier-easing](https://github.com/gre/bezier-easing) for easing calculations. The animation logic itself is entirely decoupled, so I'll likely break that out into a module soon.

The scrolling animation that fires when the arrow at the bottom of a full-page banner is clicked is powered by [smooth-scroll](https://github.com/cferdinandi/smooth-scroll).

Scripts are also used to fix the height of full page banners on load on mobile to prevent janky resizing when browser chrome autohides, prevent dragging elements, and calculate how long ago posts were posted.

Do note, though, that the site is completely usable with all scripts disabled, if that's your cup of tea. Progressive enhancement FTW!

# Gulp

The site is built by a custom modular [Gulp](https://github.com/gulpjs/gulp) task tree that provides a unified CLI interface to the various processess necessary to get from raw source to browser-ready code. This includes a most convenient watch task that watches all source for changes, automatically runs any necessary tasks in response to said changes, and automatically pushes those changes to the browser (which automatically reloads) through [browser-sync](https://www.browsersync.io/).
