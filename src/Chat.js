(function () {
  'use strict'

  /*constructor*/
  var Chat = function (UserProto,broadcaster) {
    this.phrases=[]
  };
  Chat.prototype = {
    // Chat
    make:function (name, phrase) {
      return '/"'+name+'/" a dit : '+phrase;
    },
    add:function (phrase,name) {
      this.phrases.push(this.make(name,phrase));
      // TODO: check if too long ?
    },
    getPhrases:function () {
      var phrases=[];
      for (var i = 0; i < 5; i++) {
        if (this.phrases[i])
        {phrases[i]=''+this.phrases[i]}else
        {phrases[i]=''}
      }
      return phrases
    }

  };

  module.exports = Chat
}())
