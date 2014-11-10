# Exertis Micro-P LG Microsite

This project is based on the [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) (multi-page) framework.

Bang's test site: [http://lg.microp.bang-on.net/?project=lg](http://lg.microp.bang-on.net/?project=lg)

## TODO
* Refactor comparison table markup so that we don't have to manually position headings when content changes.
* Can we abstract `home-section`, `product`, `b2b-section` & `news-story` modules into a single `box` module with variant(s)?

## Getting started

### Dependencies

* [grunt](http://gruntjs.com/installing-grunt) (and node)
* [bundler](http://bundler.io/) (and ruby)
* [Editorconfig](https://github.com/sindresorhus/editorconfig-sublime) sublime plugin

You'll also want the [livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).

### Setup

Clone the repo to your local machine:
```sh
git clone git@github.com:ExertisMicro-P/Bang-LG.git
cd Bang-LG
```

Install the node modules:
```sh
npm install
```

Install the ruby gems:
```sh
bundle install
```

Generate the `newer` cache (this will take a minute or two).
```sh
grunt newer:imagemin
```

## Development

**You should not be changing anything in the [multi-page](multi-page) or [lg](lg) directories directly.**

Our files can be found in the [src](src) directory. The files in `src` are then compiled by grunt (in combination with `micro-site`) to build the `lg` directory.

To avoid confusing files from the `lg` and `src` directories when making content changes, it's best to open only the `src` directly in your editor, e.g. `subl Bang-LG/src`.

To start a local webserver with grunt listening for changes simply run `grunt`.

Running or `grunt` or `grunt watch` will listen for changes and do partial recompile of the `lg` microsite, but this is **not a complete build**. `grunt build` should be run before committing.

### Grunt tasks

* `grunt` - alias for `grunt watch` & `grunt server`
* `grunt watch` - watch the `src` directory for changes
* `grunt server` - run a local webserver and open a browser tab
* `grunt build` - compile the `lg` microsite
* `grunt rebuild` - wipe the `lg` microsite before building (updates the `micro-site` framework).

## Updating the multi-page framework

The [multi-page](multi-page) framework should be kept up to date with the version in the [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) repository.

You can update the framework by pulling the latest version from [Bang-Conect](https://github.com/ExertisMicro-P/Bang-Conect) and copying the changes into the repo.

```sh
# make sure to clone the repo outside of this one
git clone git@github.com:ExertisMicro-P/Bang-Conect.git

rsync -r --delete Bang-Conect/multi-page Bang-Conect/index.html Bang-LG/
cd Bang-LG
grunt rebuild
grunt server
```

You'll then need to test everything is still working as expected before committing the changes. It's best to commit a library update on it's own without additional changes, when possible.

## Deploying to test

Test site: [http://lg.microp.bang-on.net/?project=lg](http://lg.microp.bang-on.net/?project=lg)

1. Run `grunt build` (or `grunt rebuild`)
2. Commit and push changes
3. Run the deploy script:

```sh
# option 1 - ssh to the machine and run locally
ssh vapour.ec2
cd /data/microp/lg-microsite-test
./deploy.sh

# option 2 - run remotely over ssh
ssh -t vapour.ec2 'cd /data/microp/lg-microsite-test/ && ./deploy.sh'

# option 3 - use the ec2 script
ec2 deploy site microp/lg-microsite-test
```
