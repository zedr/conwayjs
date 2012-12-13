(function (NS) {

    var
        pluginNS = 'Conway',
        document = NS.document,
        Universe = NS[pluginNS].Universe;

    var randomColor = function () {
        // Demo function to test the canvas
        var col = Math.floor(Math.random() * 16777215).toString(16),
            padding = Array(7 - col.length).join("0"),
            rgb = '#' + padding + col;
            console.log(rgb);
        return rgb;
    };

    var Renderer = function (targetId) {
        var
            timer,
            speed = 1000,
            context,
            self = this;

        context = document.getElementById(targetId).getContext("2d");
        this.universe = new Universe();

        var doRender = function () {
            /* render the canvas */
            context.fillStyle = randomColor();
            context.fillRect(0, 0, 150, 75);
        };

        var renderTick = function () {
            self.universe.doTick();
            doRender();
        };

        this.start = function () {
            timer = setInterval(renderTick, speed); 
        };

        this.stop = function () {
            clearInterval(timer);
        }
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Renderer'] = Renderer;

}(this));
