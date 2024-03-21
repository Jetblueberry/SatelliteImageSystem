export const datasets: GeoJSON.FeatureCollection =
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "8df41240-2037-5fe2-b35e-e886e9023f9d",
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
            // [359415.0, 3952515.0],
            // [124485.0, 3952515.0],
            // [124485.0, 3713685.0],
            // [359415.0, 3713685.0],
            // [359415.0, 3952515.0]
          ]
        ]
      },
      properties: {
        $schema: "https://schemas.opendatacube.org/dataset",
        product: {
          name: "landsat_8_c2_l2"
        },
        crs: "epsg:32654",
        grids: {
          default: {
            shape: [7961, 7831],
            transform: [30.0, 0.0, 124485.0, 0.0, -30.0, 3952515.0, 0.0, 0.0, 1.0]
          }
        },
        properties: {
          datetime: "2020-01-15 01:22:35.040128Z",
          "eo:cloud_cover": 20.38,
          "eo:gsd": 30.0,
          "eo:instrument": "OLI_TIRS",
          "eo:platform": "landsat-8",
          "eo:sun_azimuth": 154.69813348,
          "eo:sun_elevation": 29.86495364,
          "landsat:collection_category": "T1",
          "landsat:collection_number": 2,
          "landsat:digital_object_identifier": "https://doi.org/10.5066/P9OGBGM6",
          "landsat:geometric_rmse_model_x": 3.957,
          "landsat:geometric_rmse_model_y": 3.9,
          "landsat:geometric_rmse_verify": 3.292,
          "landsat:ground_control_points_model": 328,
          "landsat:ground_control_points_verify": 61,
          "landsat:ground_control_points_version": 5,
          "landsat:landsat_product_id": "new_landsat_dataset",
          "landsat:processing_level": "L2SP",
          "landsat:processing_software_version": "LPGS_15.3.1c",
          "landsat:resampling_option": "CUBIC_CONVOLUTION",
          "landsat:station_id": "LGN",
          "landsat:wrs_path": 108,
          "landsat:wrs_row": 36,
          "odc:dataset_version": "2.0.20200823",
          "odc:file_format": "GeoTIFF",
          "odc:processing_datetime": "2020-08-23 22:09:38Z",
          "odc:producer": "usgs.gov",
          "odc:product_family": "l2",
          "odc:region_code": "108036"
        },
        measurements: {
          SR_B2: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B2.TIF"
          },
          SR_B1: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B1.TIF"
          },
          SR_B3: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B3.TIF"
          },
          SR_B5: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B5.TIF"
          },
          SR_QA_AEROSOL: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_QA_AEROSOL.TIF"
          },
          QA_PIXEL: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_QA_PIXEL.TIF"
          },
          QA_RADSAT: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_QA_RADSAT.TIF"
          },
          ST_QA: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_QA.TIF"
          },
          SR_B4: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B4.TIF"
          },
          SR_B6: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B6.TIF"
          },
          SR_B7: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_SR_B7.TIF"
          },
          ST_B10: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_B10.TIF"
          },
          ST_DRAD: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_DRAD.TIF"
          },
          ST_URAD: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_URAD.TIF"
          },
          ST_ATRAN: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_ATRAN.TIF"
          },
          ST_EMSD: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_EMSD.TIF"
          },
          ST_CDIST: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_CDIST.TIF"
          },
          ST_EMIS: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_EMIS.TIF"
          },
          ST_TRAD: {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_ST_TRAD.TIF"
          }
        },
        accessories: {
          "metadata:landsat_mtl": {
            path: "tar://C:/OSGeo4W/DACN/data/usgs_ls8c_l2_2/LC08_L2SP_108036_20200115_20200823_02_T1.tar/LC08_L2SP_108036_20200115_20200823_02_T1_MTL.txt"
          }
        },
        lineage: {}
      }
    }
  ]
}
