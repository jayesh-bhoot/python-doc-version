var tabs = require('sdk/tabs');

tabs.on('pageshow', function(tab) {
    var searchRegex = /docs.python.org\/(\d{1}|\d{1}\.{1}\d{1}|dev)\//i;

    var desiredVersion = require('sdk/simple-prefs').prefs['desiredVersion'];
    var desiredUrl = 'docs.python.org/' + desiredVersion + '/';

    if(tab.url.search(desiredUrl) !== -1) {
        console.log('Desired url already loaded');
    } 
    else if(tab.url.search(searchRegex) !== -1) {
        console.log('Loaded URL found');
        if(tab.url.indexOf('whatsnew') !== -1)
            tab.url = desiredUrl + 'whatsnew/' + desiredVersion + '.html';
        else
            tab.url = tab.url.replace(searchRegex, desiredUrl);
    }
    else {
        console.log('Loaded URL is not of concern.');
    }
})
