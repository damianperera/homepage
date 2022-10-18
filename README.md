# Dev Homepage
[![deploy](https://github.com/damianperera/homepage/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/damianperera/homepage/actions/workflows/deploy.yml)

A replacement browser homepage for developers hosted on [GitHub Pages](https://damianperera.github.io/homepage).

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
### Weather
The weather widget is provided by [WeatherWidget.io](https://weatherwidget.io/) and is sourced from [Forecast7](https://forecast7.com/). Since the widget does not support dynamic client location this data source is currently only offered for the Munich, Germany area.

### The Pragmatic Engineer
[The Pragmatic Engineer](https://www.pragmaticengineer.com/) is a paid [newsletter](https://newsletter.pragmaticengineer.com/) targeted at the software engineering community providing insights into the tech industry. This app makes use of the RSS feed of Substack to provide exceperts made public by the author and provides direct links to full articles. The list of articles is updated daily at 08:00 UTC.

### Hacker News
Offered by [Y Combinator](https://www.ycombinator.com/), [Hacker News](https://news.ycombinator.com/) is a social news website focusing on computer science and entrepreneurship targeted at people who like to tinker with technology. This app provides links to the latest articles listed in Hacker News via their [Firebase API](https://github.com/HackerNews/API).

### The Local
[The Local](https://www.thelocal.com/) is an independant news publication in English available in Austria, Denmark, France, Germany, Italy, Norway, Spain, Sweden and Switzerland that provides up-to-date local news of the country and surrounding region that you are located in. This app makes use of your geolocation to determine the correct country to fetch data from via the publication's [Public API](https://developer.wordpress.org/rest-api/reference/). If the publication is not available in the country you are located in or the geolocation cannot be determined it defaults to the news source of Germany.
