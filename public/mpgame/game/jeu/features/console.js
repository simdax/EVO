var Console=function () {
    this.txt="plaçage de vaisseau"
}

Console.prototype={
  log:function (string) {
    this.txt = string
  },
  warn:function () {
    return "bienvenu dans EVO ! "
  }
}
