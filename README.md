# webtop

Write your linux bar and desktop background in Javascript! Sure, it's not as lightweight as lemonbar, but hey, computers are *fast* now, and dammit I don't know bash well enough to configure lemonbar on my lonesome (at least, not as well as people on /r/unixporn do)

## How to use

The bar portion mounts `$HOME/.webtop/bar/dist/index.html`. The desktop portion will mount `$HOME/.webtop/desktop/dist/index.html`. These paths can be overwritten in `~/.webtop/config.json`, where you can override any config value found in `config-default.json`. Please note that file paths in your config will not expand shell expressions, substitute environment variables, or do anything else you might expect them to do in a regular shell script. They are javascript strings, and I just add a little special handling if they start with `~`.

 Feel free to use whatever technology or front end framework you wish, just make sure an index file ends up at the correct location. Personally, I'm planning on using Vue with Webpack.
