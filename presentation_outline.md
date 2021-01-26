# Presentation outline

## Intro

My project is called Illegible, and it's a malicious e-reader website. Select a story, and after a time delay, my site sabotages your reading experience.
For example, if you select the "random gradient" option, the e-reader randomly colors 1 in 4 paragraphs to this purple gradient, updating each second. Alternatively, the "Click and Replace" option allows you to toggle each paragraph between its original text and a picture of my cat.

I came up with this project as a stepping stone toward creating an interactive study aid, based on the observation that I learn best from sources that are mostly reliable (with occasional and correctable mistakes).
That app would include features such as this 'Flash cards/word bank' option, which deletes 1 in 10 words at random and optionally displays the missing words as a shuffled word bank.

## Slide section (The stack)
For my project, I used the library D3.js ('Data-Driven Documents'). D3 is best known for creating animated graphs and charts, but it also provides a convenient interface for DOM manipulation.
D3 facilitates:

### method chaining (similar to map/filter/reduce for arrays),

### searching the descendants of a given DOM node

### adding event listeners

### scheduling

(Show example of code with voiceover)




## Pitfalls
### Difficult to use in combination with React
Currently, my codebase lives in a single script tag inside index.html
(This ties into)
### Synchronicity
* Helpful to use callbacks, e.g. transition().on('end', callback)
* Also useful for tying in with JQuery load() function for loading HTML from an external file into a div
* Use indices with external array manipulations, NOT push/pop
* Currently using a global variable to track content reloads so that the functions relying on infinite loops know to stop executing when the settings are changed (THIS WOULD BE MUCH NICER WITH REACT/REDUX)

## For the future...
### Would like to incorporate more stack, less hack
* Some tutorials suggest using custom React hooks as a fix (tabled this approach to avoid tutorial hell)
### Eventually want to work with custom file uploads
