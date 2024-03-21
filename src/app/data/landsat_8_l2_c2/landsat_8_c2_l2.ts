export const landsatJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [
              139.44595463710797,
              35.70655678122046
            ],
            [
              139.4856035927088,
              33.553565092105465
            ],
            [
              136.95868784360286,
              33.49683937801829
            ],
            [
              136.85319414455643,
              35.645115265336614
            ],
            [
              139.44595463710797,
              35.70655678122046
            ]
            // [
            //   104.475095,
            //   20.921453,106
            // ],
            // [
            //   104.475095,
            //   22.030052
            // ],
            // [
            //   106.249849,
            //   22.030052
            // ],
            // [
            //   106.249849,
            //   20.921453,106
            // ],
            // [
            //   104.475095,
            //   20.921453,106
            // ]
          ]
        ]
      },
      properties: {
        name: "landsat_8_c2_l2",
        description: "USGS Landsat 8 Collection 2 Level-2 Surface Reflectance",
        metadata_type: "eo3",
        region_code: "108036",
        label: "108036",
        count: 1
      }
    }
  ]
}
