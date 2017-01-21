// maybe a singleton of Part ???


Play=(function () {
    var instance;

    function createInstance() {
        var object = new Part("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})()
