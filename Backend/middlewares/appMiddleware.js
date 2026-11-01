const appMiddleware = (req,res,next) => {
    console.log("Inside Application level middleware");
    next()
}

module.exports = appMiddleware