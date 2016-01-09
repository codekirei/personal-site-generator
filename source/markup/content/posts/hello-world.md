---
template: post
title: Hello World!
description: A New Blog Emerges!
slug: /posts/hello-world
posted: 2016-01-07T10:00-08:00
tags:
- new things
- smg
- static site generators
---

What a better way to start a new year than to launch a new blog? This first post walks through some of the open-source tech I used to build the site and shows off some cool, though standard, features.

--MORE--

# Regarding Static-Site-Generators

For quite some time now, I've been enamored with static-site-generators (henceforth referred to as "ssgs"). There are [a lot](https://www.staticgen.com/) of great open-source ssgs out there, and I've experimented with quite of few of them. Some are definitely better than others, but I have yet to find one that feels just right for me. That doesn't mean I think all the ssgs out there are bad &mdash; in fact, I think quite a few are really, really good!

My main point of contention is that ssgs do more than I want them to, which makes them difficult to integrate into my preferred webdev workflow. These days, I don't write a lot of vanilla HTML, CSS, or ES5 JS. I write templates, views, or modules that render HTML; Sass, Stylus, or PostCSS that transpiles to browser-compatible CSS; and ES6 or some other modern variant of JS that transpiles into browser-friendly ES5 JS.

"But Jacob!", you say. "Many ssgs do those things really well!" And you're right! Most ssgs use a templating engine and support modern CSS and JS in some fashion.

The friction comes when I want to do something different than the way the ssg wants me to. For example, I've spent a lot of time working with tools like [Gulp](http://gulpjs.com/), [webpack](http://webpack.github.io/), and [Browserify](http://browserify.org/), and I have a pretty good idea of what I want my JS to do between `/src` and `/dist`. Often, the ssg has a different idea of how to do things. Not necessarily worse &mdash; just different. I could always throw away my gulpfile and do it their way. For some projects, I definitely think that's the right call. For this site, though &mdash; my own personal blog &mdash; that just doesn't sit right.

It's a little bit like the choice between using a monolithic front-end framework like [Bootstrap](http://getbootstrap.com/) or [Foundation](http://foundation.zurb.com/) versus using modular libraries like [Bourbon](http://bourbon.io/) or [kouto swiss](http://kouto-swiss.io/). In my (admittedly limited) experience, the do-everything frameworks are fantastic until you want to do something that isn't what the framework wants you to do. Suddenly, you're fighting the framework. Doing it the framework's way is really simple; doing it not the framework's way is really complicated. As a wise man once said:
> If you want your site to look like Bootstrap, use Bootstrap. If you don't want your site to look like Bootstrap, don't use Bootstrap.

Note that there are some ssgs out there that are intentionally modular to support the sort of flexibility I'm talking about, like [metalsmith](http://www.metalsmith.io/). Metalsmith is a fantastic piece of software and is extremely configurable, so why not just use that? Honestly, I could have definitely made metalsmith work. I suppose it comes back to complexity. There's something beautiful about software that does one thing and does it well. Similarly, there's something powerful about software that only does what it needs to do.

Because I've decided I absolutely do want to use Gulp in my front-end workflow right now, for metalsmith to work for me, I'd have to use [gulpsmith](https://github.com/pjeby/gulpsmith) &mdash; a plugin that lets metalsmith interact with Gulp. At that point, the question becomes: what is metalsmith doing that Gulp (and its ecosystem) can't? In other words, why use metalsmith at all?

# Gulp as a Static-Site-Generator

The answer is *markup*. The Gulp plugin ecosystem for handling CSS and JS is saturated. I would even posit that you could create the vast majority of CLI-using webdevs' ideal workflow right now for CSS and JS with Gulp and existing plugins.

Markup, especially in the context of an ssg, is a bit different. There are Gulp plugins for templating languages like [Handlebars](https://github.com/lazd/gulp-handlebars) and [Jade/Pug](https://github.com/phated/gulp-jade), sure. And there are Gulp plugins for [reading markdown](https://github.com/sindresorhus/gulp-markdown), one of the most common formats for content in ssgs. Ssgs do more than just read and compile markdown and templates, though &mdash; they combine them intelligently.

That combinatorial logic is the ssg "secret sauce", and Gulp isn't really designed for it. It's definitely doable, but it gets messy pretty fast &mdash; particularly for things like content collections (i.e. blog posts). It's a lot easier to let a dedicated ssg handle that part. For example, some very valid solutions here would be to plug in metalsmith with gulpsmith or run something like [jekyll](http://jekyllrb.com/) in a [child process](https://nodejs.org/api/child_process.html).

The "Gulp + ssg" solution can be messy too, though. I'm not using a significant amount of the functionality (and complexity) of the ssg, and I'm likely using the ssg in a way it wasn't intended to be used. Fundamentally, there is conflict: Gulp wants to process everything but markup and write output, and the ssg wants to process everything and write output. I really just want an ssg that only processes markup and plays nice with Gulp. Aha!

# Introducing the Static-Markup-Generator

My proposed solution for an elegant ssg with a Gulp core is to use a static-*markup*-generator &mdash; a program with the ssg combinatorial magic and an utter disregard for everything that does not become markup. With a static-markup-generator, I get to have my Gulp and drink it too, or something. Of course, I didn't see too many smgs lying around, so I did the responsible thing and [wrote one](https://github.com/codekirei/smg). After all, it's something of a programmer rite-of-passage to write a static-site-generator, right? Check that one off the list.

As a word of caution, my little module is very much a work-in-progress, so I don't recommend using it in your own projects yet. It's functional &mdash; I used it to build this site &mdash; but it needs a lot more testing and documentation and thought about how to best handle various templating solutions. Those things will come with time.

If you're curious about the rest of my current Gulp setup or the other open-source code used in this site, do check out the [colophon](/colophon) and the source on [GitHub](https://github.com/codekirei/codekirei.github.io/tree/generator). Eventually, I'd like to split out the gulpfile and config into its own repo and make it a "real" ssg of sorts. I'll probably make another post for the occasion. But, today is not that day!

# Regarding "Kirei"

I'll leave you with a brief explanation of the site's name. Kirei is a Japanese term:
> kirei &mdash; adj., 1. lovely, beautiful, 2. clear, clean, tidy

I studied Japan in college, and "kirei" is a word that always stuck out to me. Like many Japanese words, it conveys a lot of meaning with only a few characters. More importantly, it represents exactly the kind of code I strive to write &mdash; code that is clean, clear, tidy, and beautiful. Thus, code kirei (きれいなコード, for the curious).

Happy New Year everyone! Go forth and make cool things!
