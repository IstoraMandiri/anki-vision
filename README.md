<div align="center">

# [Anki.Vision](https://anki.vision)

_In-depth data visualization for Anki flashcard collections_

![Anki.Vision Screenshot](https://github.com/hitchcott/anki-vision/blob/master/screenshot.png?raw=true)

</div>

## Instructions

First you'll need to find your Anki (v2) collection.

- Tools > Add-ons > Open add-ons folder (or "View Files")
- Navigate a folder up (to the `Anki2` directory)
- You should see a `/User 1/collection.anki2` file

Alternatively you can find it on your filesystem:

- **Windows** C:\Users\Administrator\AppData\Roaming\Anki2\User 1\collection.anki2
- **Mac** /Users/USERNAME/Library/Application Support/Anki2/User 1/collection.anki2

Once you've found this file you drag and drop this DB into [Anki.Vision](https://anki.vision).

The data from your collection will be stored locally in your browser until you clear your cache or hit the `Reset` button.

The current version of Anki.Vision has a few presets to demonstrate the different charts available.

You can also customize a query:

- **Graph Settings** Currently just lets your change which graph is shown. In future versions there will be unique customizations for each graph type. See [screenshots](#Screenshots) below for graph types
- **Data** Select one or more data types to be shown on the graph;
- **Date Range** Start and End Dates to limit your results (either be left empty)
- **Time Period** Resolution of your results; Daily, Monthly, Yearly, etc. Be careful not to set too small or you might run out of WAM!
- **Filters** You can include or exclude specific types from your results
  - **Tags** (for tags, you can manually type out a fuzzy search)
  - **Decks**
  - **Note Types**

## Roadmap

- Export Query Data
- Card explorer and card specific stats to help identify tricky cards, etc.
- More graph types
- More graph config options
- Dark Mode

## Technical

This project was partially motivated by the enjoyment of learning new technologies, the major libraries that helped create Anki.Vision are:

- React
- Next.js
- Typescript
- SQL.js
- TypeORM
- Nivo.rocks (it does)

## Contribute

Currently the codebase is very alpha and needs a bit of refactoring, but if you're ready to dive in feel free to contribute new graphs and stuff.

## Screenshots

![screenshot_pie.png](https://github.com/hitchcott/anki-vision/blob/master/screenshot_pie.png?raw=true)
![screenshot_bar.png](https://github.com/hitchcott/anki-vision/blob/master/screenshot_bar.png?raw=true)
![screenshot_calendar.png](https://github.com/hitchcott/anki-vision/blob/master/screenshot_calendar.png?raw=true)
![screenshot_bump.png](https://github.com/hitchcott/anki-vision/blob/master/screenshot_bump.png?raw=true)
![screenshot_bump_2.png](https://github.com/hitchcott/anki-vision/blob/master/screenshot_bump_2.png?raw=true)
