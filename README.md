# Google Travel Web Scrapper

## Using NodeJS, Puppeteer JS, Cheerio and MongoDB

### This NodeJS App is an automated web scrapper which will fetch the travel highlights of all the countries in the world including each country's top places to visit along with their respective description. It also saves the cover image of the country from the Google Travel Library and saves this data in MongoDB Collection.
<br />

> This app is based on the NodeJS framework. It uses the Cheerio package to render the page from the provided URL and fetch the HTML code along with the data of interest. On top of that I have used Puppeteer JS library to feed the said HTML code to the Chromium in-Console Browser to crawl through the web-page and execute input and submit functions. The country search input that we feed in is fetched from the JSON list of all the countries, which are executed one-by-one, and successfully we save the desired data of every country into the MongoDB collection.
<br />

#### Prerequisites:
- Node.js Environment should be installed.
- Node Package Manager (NPM) should be installed.
- Local MongoDB Enterprise should be installed.
<br />

#### Setting up the Project:
```
git clone https://github.com/PatelArpitt/google-travel-scrapper.git
npm install --save
npm start
```

#### After Setting up the Project you can feel free to commit and push relevant optimizations and improvements. And if you find this useful you can give it a star. :smile: