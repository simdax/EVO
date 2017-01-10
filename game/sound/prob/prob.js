
function randomWithProbability(array) {
    var notRandomNumbers=[];
    for(var i = 0; i < array.length; i++) {
        for(var j = 0; j < array[i]; j++) {
            notRandomNumbers.push(i)
        }
    }
    var idx = Math.floor(Math.random() * notRandomNumbers.length);
    return notRandomNumbers[idx];
}
prob=function (probs) {this.probs=probs; this.pond=[0,0,0,0]}
prob.prototype={
    next:function () {
        var res=this.probs;
        for(var i = 0; i < this.pond.length; i++) {
            res[i] += this.pond[i]
        };
        return randomWithProbability(res)
    }
}


Score=function (p) {
    this.points=p
};
Score.prototype={
    // get simple, just sum
    getScore:function (array) {
        var sum=[]; var res=0;
        for(var i = 0; i < array.length; i++) {
            sum.push(this.points[array[i]] || 0 )
        };
        for(var i = 0; i < sum.length; i++) {
            res=res+sum[i]
        }
        return res;
    }
};



Generator=function () {
    this.inter=new prob([1,10,5,2]);
    this.cons=new prob([1,0,10,5]);
    this.rythme=new prob([0,5,5,0,5]);
};
Generator.prototype={
    next: function () {
        // for now, just returns interval (acc)
        return this.inter.next()
    }
};


Fitness=function () {
    this.inter=new Score([0,3,2,1]);
    this.cons=new Score([1,0,3,2]);
    this.rythme=new Score([3,2,0,1]);
};
Fitness.prototype={
    score: function (cons) {
        return this.cons.getScore(cons)//+this.cons.getScore(cons)
    }
};

MelParser=function (mel) {
    
}


Mel=function () {
    this.generator=new Generator;
    this.fitness=new Fitness;
    // les phrase et la carrure
    this.mel=[]; this.phrases=[]; 
    this.carrure=8;     this.nb=0;
    // les scores
    this.scores=[];    this.score=10
}

Mel.prototype={
    hasMel:function () {
        return this.phrases.length != 0
    },
    loop:function (note) {
        if (this.nb == this.carrure) {
            this.refresh()
        };
        var note=this.generator.next();
        this.mel.push(note);
        this.nb+=1;
    },
    //private
    refresh:function () {
        //pushage
        var score=this.fitness.score(this.mel);
        if (score > this.score) {
            this.scores.push(score);
            this.phrases.push(this.mel);
        }
        //cleanage
        this.mel=[];
        this.nb=0;
    },
    
//proto pour Acc
    wrap:function (note) {
        var r=abs(note%7);
        if (r>3) {
            return r-7
        }else{
            return r
        }
    },
    getInterWithCons:function () {
        
    }
    
}



