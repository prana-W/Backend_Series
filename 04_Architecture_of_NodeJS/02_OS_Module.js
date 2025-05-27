const os = require('os');

console.log(os.cpus().length); //in my system, 16, that means we can have a maximum of 16 threads running at the same time.