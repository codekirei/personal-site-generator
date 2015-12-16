const loc = require('conf/locations')

const url = 'http://codekirei.com'

module.exports =
  { defaultAuthor:
    { name: 'Jacob Blakely'
    , link: `${url}/about`
    , email: 'jacob@codekirei.com'
    }
  , defaultTemplate: 'post'
  , hostname: url
  , nav:
    [ { text: 'Blog'
      , link: '/'
      }
    , { text: 'Projects'
      , link: '/projects'
      }
    , { text: 'About'
      , link: '/about'
      }
    ]
  , needPosts: ['index']
  , opts:
    { jade:
      { basedir: loc.src.jadeBase
      , pretty: true
      }
    }
  , paths:
    { dist: loc.dist.root
    , pages: loc.src.pages
    , posts: loc.src.posts
    , templates: loc.src.templates
    }
  }
