(function () {
    'use strict'

    /*constructor*/
    var Chat = function (UserProto,broadcaster) {
        this.phrases=[];
        this.lasts=["","","","",""];
    };
    Chat.prototype = {
        // Chat
        make:function (name, phrase) {
            return '"'+name+'" a dit : '+phrase;
        },
        add:function (phrase,name) {
            console.log("phrase added");
            this.phrases.push(this.make(name,phrase));
            // TODO: check if too long ?
        },
        lastEls:function () {
            var res=this.phrases.slice(Math.max(this.phrases.length - 5, 0));
            return res
        },
    };

    module.exports = Chat
}())
