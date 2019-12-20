/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var wdpa = ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    modisTVI250 = ee.ImageCollection("MODIS/006/MOD13Q1");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Importing Protected Area Boundary shape files
var pas = wdpa.filterMetadata('ISO3', 'equals', 'IND')
//          .filterMetadata('SUB_LOC', 'equals', 'IN-KA');

Map.addLayer(pas, {}, 'Selected Protected Areas');
Map.centerObject(pas);
// Count number of number of PAs
print('Number of total protected areas: ', pas.toList(1000).length());

var startDate = ee.Date('2000-01-01'); // set analysis start time
var endDate = ee.Date('2018-12-31'); // set analysis end time

var composite = modisTVI250
                .filterBounds(pas)
                .filterDate(startDate, endDate);
// List number of images used to create mosaic;
print('Number of images: ', composite.toList(100000).length());

var scale_modis = 250;
var statsNDVI = function(image) {
  return pas.map(function(feature) {
    var mean = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var median = image.reduceRegion({
    reducer: ee.Reducer.median(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var max = image.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var min = image.reduceRegion({
      reducer: ee.Reducer.min(),
      geometry: feature.geometry(),
      scale: scale_modis,
      maxPixels: 1e9
      });
    var stdDev = image.reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: feature.geometry(),
      scale: scale_modis,
      maxPixels: 1e9
      });
    return ee.Feature(null, {
      // Country Details
      Country_Code: feature.get('ISO3'),
      PA_Location: feature.get('SUB_LOC'),
      PA_Name: feature.get('NAME'),
      PA_Name_Local: feature.get('ORIG_NAME'),
      PA_Desig: feature.get('DESIG'),
      PA_Desig_Type: feature.get('DESIG_TYPE'),
      PA_GIS_AREA: feature.get('GIS_AREA'),
      PA_IUCN_CAT: feature.get('IUCN_CAT'),
      
      date: image.get("system:index"),
      // NDVI stats
      mean_NDVI:  mean.get('NDVI'),
      median_NDVI: median.get('NDVI'),
      max_NDVI:    max.get('NDVI'),
      min_NDVI:    min.get('NDVI'),
      stdDev_NDVI: stdDev.get('NDVI'),
      // EVI stats
      mean_EVI:    mean.get('EVI'),
      median_EVI:  median.get('EVI'),
      max_EVI:     max.get('EVI'),
      min_EVI:     min.get('EVI'),
      stdDev_EVI:  stdDev.get('EVI')});
  });
};
var results = composite.map(statsNDVI).flatten();
Export.table.toDrive({
  collection:results,
  description:"Export-Script",
  fileFormat:"CSV"
});