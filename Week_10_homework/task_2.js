const VegaLiteSpec2 = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title: 'Normalised Cell Tower Stations per Suburb in Victoria',
    description: 'The count of cell towers distributed around australia per unit of area (cell towers/area)',
    width: 800,
    height: 600,

    layer: [
        {
            data: {
                url: "https://raw.githubusercontent.com/Blake-Haydon/FIT3179_2021_S2_W9/main/docs/data/victoria.topo.json",
                format: { type: "topojson", feature: "victoria" }
            },
            transform: [{
                lookup: "id",
                from: {
                    data: {
                        url: "https://raw.githubusercontent.com/Blake-Haydon/FIT3179_2021_S2_W9/main/docs/data/id_to_num_stations.csv"
                    },
                    key: "id",
                    fields: ["station_count_by_area"]
                }
            }],
            mark: {
                type: "geoshape"
            },
            encoding: {
                color: {
                    field: "station_count_by_area",
                    type: "quantitative",
                    scale: {
                        type: "threshold",
                        domain: [50, 1000],
                        range: ["#b3cde3", "#8c96c6", "#88419d"],
                    }
                },
                tooltip: { field: "station_count_by_area", type: "quantitative", title: "Station Count by Area" }
            },
            projection: {
                type: 'mercator'
            },
        },
        {
            data: {
                url: "https://raw.githubusercontent.com/Blake-Haydon/FIT3179_2021_S2_W9/main/docs/data/victoria.topo.json",
                format: { type: "topojson", feature: "victoria" }
            },
            transform: [{
                lookup: "id",
                from: {
                    data: {
                        url: "https://raw.githubusercontent.com/Blake-Haydon/FIT3179_2021_S2_W9/main/docs/data/id_to_num_stations.csv"
                    },
                    key: "id",
                    fields: ["station_count_by_area"]
                }
            },
            {
                // No stations
                filter: "datum.station_count_by_area == 0"
            }
            ],
            mark: {
                type: "geoshape",
                color: "#edf8fb",
                tooltip: "Deadzone: There are no cell towers here"
            },
            projection: {
                type: 'mercator'
            }
        },
    ]
}


vegaEmbed('#vis2', VegaLiteSpec2);
