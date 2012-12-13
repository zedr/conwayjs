(function (NS) {
    "use strict";

    var
        pluginName = 'Library',
        pluginNS = 'Conway',
        library;

    library = {
        'glider': [[1, 0], [0, 1], [-1, -1], [0, -1], [1, -1]]
    };

    // Plugin registration
    (NS[pluginNS] || (NS[pluginNS] = {}))['Library'] = library;
}(this));
