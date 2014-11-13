# assemble-feed-download

> Assemble plugin for download RSS/Atom feeds from the wild.

## Quickstart

In the command line, run:

```bash
npm install assemble-feed-download --save
```

Next, to register the plugin with Assemble in your project's Gruntfile you can
either specify the direct path to the plugin(s) (e.g.
`./path/to/plugins/*.js`), or if installed via npm, make sure the plugin is in
the `devDependencies` of your project.js package.json, and simply add the
module's name to the `plugins` option:

```js
assemble: {
  options: {
    plugins: ['assemble-feed-download', 'other/plugins/*.js']
  }
}
```

Visit the [plugins docs](http://assemble.io/plugins/) for more info or for help getting started.


## Options

### feeds

Type: `Array`
Default: `[]`

An array containing feeds to be downloaded.

#### feeds.item.url

Type: `String`

The URL of the feed.

#### feeds.item.dest

Type: `String`

The location where the feed will be saved. Defaults to `feeds/<feedname>.json`
where `feedname` is the name of the feed as extracted from its URL. Feeds will
be automatically converted to JSON or YAML based on the extension of their
`dest`.

## Usage Examples

```js
assemble: {
  options: {
    plugins: ['assemble-feed-download'],
    feeds: [
      {url: 'https://github.com/ravishi.atom',
       dest: 'feeds/ravishi.json'}
    ]
  }
}
```


## Authors

**Dirley Rodrigues**

+ [github/ravishi](https://github.com/ravishi)


## License
Copyright (c) 2014 Dirley Rodrigues, contributors.  
Released under the MIT license

***
