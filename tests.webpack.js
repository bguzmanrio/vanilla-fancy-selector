//Spec files
var context = require.context('./', true, /\.spec.js$/); 

//JS files. Entry points must not be included
var sources = require.context('./js/', true, /[^.][^s][^p][^e][^c]\.js$/);

context.keys().forEach(context);
sources.keys().forEach(sources);