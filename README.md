# Dev Homepage
[![deploy](https://github.com/damianperera/homepage/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/damianperera/homepage/actions/workflows/deploy.yml)

A replacement browser homepage for developers

## Usage
### Chrome (Chromium)
1. Install a plugin to update the behavior of new tabs such as [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna).
2. Set the source URL to `https://damianperera.github.io/homepage`.

### Safari
Open `Preferences > General` and update the following:
1. Set `New windows open with` to `Homepage`.
2. Set `New tabs open with` to `Homepage`.
3. Set `Homepage` to `https://damianperera.github.io/homepage`.

## Keyboard Shortcuts
* `Shift` + `S` - Switch to StackOverflow search
* `Shift` + `D` - Switch to DuckDuckGo search
* `Shift` + `G` - Switch to Google search
* `Shift` + `R` - Reload data sources

## Data Sources
### The Pragmatic Engineer
The Pragmatic Engineer is a paid [newsletter](https://newsletter.pragmaticengineer.com/) targeted at the software engineering community providing insights into the tech industry. This app makes use of the RSS feed of Substack to provide exceperts made public by the author and provides direct links to full articles which are updated daily at 08:00 UTC.

### Hacker News
Offered by [Y Combinator](https://www.ycombinator.com/), Hacker News is a social news website focusing on computer science and entrepreneurship targeted at people who like to tinker with technology. This app provides links to articles listed in Hacker News via their [Firebase API](https://github.com/HackerNews/API).

### The Local
[The Local](https://www.thelocal.com/) is an independant news publication in English available in Austria, Denmark, France, Germany, Italy, Norway, Spain, Sweden and Switzerland. This app makes use of your geolocation to determine the correct country to fetch data from via the publications public API. If the publication is not available in the country you are located in it defaults to the news from Germany.
