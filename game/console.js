var Console=function () {
    this.txt=""
}

Console.prototype={
  log:function (string) {
    this.txt = string
  },
  warn:function () {
    return "bienvenu dans EVO ! "
  }
}

console = new Console;
