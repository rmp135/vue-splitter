// requires all files in this and all subdirectories ending in .spec and runs them as tests. 
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
