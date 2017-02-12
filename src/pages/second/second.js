var styles = require('./second.css');

console.log(styles);

setTimeout(function() {
    console.log(
        document.querySelector("." + styles.Content)
    );
}, 1000);