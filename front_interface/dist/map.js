
let map;
let feature1;
let layer;

async function start_map() {

    egip.setConfig({
        baseURL: 'https://egip.mos.ru/'
    });

    await egip.api.login({
        login: 'hakaton1',
        password: 'iH2m03A#'
    });

    await egip.updateSettings();

    const settings = await egip.api.getSettings().then(r => r.data).catch(() => {
    });
    const egkoVersion = settings.find(x => x.key == "egko_base_map_version");
    egip.setConfig({
        getEgkoTilesVersion: () => egkoVersion.value,
        getEgkoTilesLayerName: () => 'egko',
        getWMCSTilesUrl: () => 'https://egip.mos.ru/egip/tiles/wms-c'
    });

    map = egip.layers.createMap({
        target: 'map',
        controls: ol.control.defaults({
            attribution: false
        }),
    });
    // egip.layers.switchMapTo77WMSC(map)
    //const tiles = egip.layers.createTiles77WMSC();
    const tiles = egip.layers.createTiles2GIS();
    egip.layers.setTileLayer(map, tiles);

    map.setView(egip.layers.createView77({
        zoom: 11
    }));

}


start_map();

