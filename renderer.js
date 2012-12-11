(function (NS) {

    var
        pluginNS = 'Conway',
        document = NS.document,
        Universe = NS[pluginNS].Universe;

    var Renderer = function (targetId) {
        var
            timer,
            speed = 1000;

        this.context = document.getElementById(targetId).getContext("2d");
        this.universe = new Universe();

        this.start = function () {
            var self = this;
            timer = setInterval(function () {
                self.universe.doTick()
            }, speed); 
        };

        this.stop = function () {
            clearInterval(timer);
        }
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Renderer'] = Renderer;

}(this));
