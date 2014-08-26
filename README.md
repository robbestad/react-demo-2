# Responsive App with BareKit 

A HTML app using the CSS framework BareKit and Gulp for workflow.

[Live Demo](http://barekit.herokuapp.com/ "Barekit") of the app.

![Screenshot](https://photos-1.dropbox.com/t/0/AABuY1GaopzMciOWvglauqKgIDdtw_i__qODGmR2iNU2Vw/12/4243170/png/320x320/1/_/0/4/screenshot.png/lqiesby7gg25zzb/AACtlbUY4XvkS337KyP3ni5ga/screenshot.png)

## Build

   Clone the repo.
   *npm install* 
   *gulp*

## Workflow

Do all your work in dev. Monitor & build by executing _gulp_. Distribute the 'dist' folder

## Deploy on Heroku

Add the following buildpack:

    heroku config:set BUILDPACK_URL=https://github.com/CHH/heroku-buildpack-php

Deploy the _dist_ folder:

    git subtree push --prefix dist heroku master

If you don't have subtree installed (in case you're running an old version of git), execute the following commands:

    git clone git://github.com/apenwarr/git-subtree.git
    cd git-subtree
    sudo sh install.sh
