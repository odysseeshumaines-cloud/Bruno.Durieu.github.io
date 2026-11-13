![Jekyll Lens](https://i.imgur.com/Qi7gdQC.png)

# Lens
*A Jekyll website  for photographers and photo bloggers.*

**Lens** is a photo gallery [Jekyll](https://jekyllrb.com/) theme designed
specially for photographers and photo bloggers.

Jekyll Lens uses [Jekyll](https://jekyllrb.com/) Static Site Generator (SSG) to
generate the website and [GitHub Pages](https://pages.github.com) to host it.

## Features

  ✅ Free & Easy setup  
  ✅ No coding required  

You won't need any expensive server, just to host a photo blog. You don't
even need to code anything. Just follow the steps below to setup your photo blog
in minutes.

## Get Started

1.  Fork this repository by clicking the **Fork** button at the top right.

1.  Enable [GitHub Pages](https://pages.github.com) from the repository
    settings.  
    Your site will be automatically generated and published at
    `https://<username>.github.io/<repository_name>`. You can also add your
    custom domain if you want.  
    (For more details visit: [GitHub Pages](https://pages.github.com)).

1.  Modify the `_config.yml` file to your liking.  
    More information on each key in the `_config.yml` file has been described in
    the file itself, as comments.

1.  Upload your pictures in the `gallery` folder (and remove the default ones if
    you want).

1.  Now, visit your website and see the magic! 🎉

## Site and photo statistics

The site can use [Umami Cloud](https://cloud.umami.is/) to count visits and
record each photo opened in the gallery. Historical visits and photo views
from before Umami is enabled are not available.

1. Create a website in Umami Cloud and copy its Website ID.
1. Set `umami_website_id` in `_config.yml` to that ID.
1. Publish the site. Umami records page visits automatically; opened photos
   appear as the `image_view` event, with the image path in the `image` property.

Leave `umami_website_id` empty to keep analytics disabled. The Website ID is
intended to be public; do not put an Umami account password or API key in the
repository.

> If you liked this project, please ⭐ **Star** this repository to show your
>  love.

#### Have any questions?
If you have a bug or an idea, feel free to open a [new issue](https://github.com/ElasticDesigns/jekyll-lens/issues/new).

#### Want to contribute?
If you want to contribute, make your changes or enhancements and [open a
pull request](https://github.com/ElasticDesigns/jekyll-lens/compare).

> Feedback and bug reports are not only welcome, but strongly encouraged. 😄

### Credits
The HTML5 version of Lens template is designed by [HTML5UP](https://html5up.net/lens).
A special thanks to them for the design, which I further enhanced for use with
Jekyll.
