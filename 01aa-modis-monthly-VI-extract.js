// import data
// https://stackoverflow.com/questions/53280885/calculating-ndvi-per-region-month-year-with-google-earth-engine
var pas = wdpa
          .filterMetadata('SUB_LOC', 'equals', 'IN-KA')
          .filterBounds(studyArea);
Map.addLayer(pas, {}, 'Selected Protected Areas');
Map.centerObject(pas);
// Count number of number of PAs
print('Number of total protected areas: ', pas.toList(100).length());

var startDate = ee.Date('2000-01-01'); // set analysis start time
var endDate = ee.Date('2018-12-31'); // set analysis end time

var composite = modisNDVI
                .filterBounds(Kodagu_Boundary)
                .filterDate(startDate, endDate);
// List number of images used to create mosaic;
print('Number of images: ', composite.toList(10000).length());

var scale_modis = 250;
var statsNDVI = function(image) {
  return pas.map(function(feature) {
    var ndviMean = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var ndviMedian = image.reduceRegion({
    reducer: ee.Reducer.median(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var ndviMax = image.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: feature.geometry(),
    scale: scale_modis,
    maxPixels: 1e9
    });
    var ndviMin = image.reduceRegion({
      reducer: ee.Reducer.min(),
      geometry: feature.geometry(),
      scale: scale_modis,
      maxPixels: 1e9
      });
    var ndviStdDev = image.reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: feature.geometry(),
      scale: scale_modis,
      maxPixels: 1e9
      });
    return ee.Feature(null, {
      PA_name: feature.get('NAME'),
      date: image.get("system:index"),
      NDVI_mean: ndviMean.get('NDVI'),
      NDVI_median: ndviMedian.get('NDVI'),
      NDVI_max: ndviMax.get('NDVI'),
      NDVI_min: ndviMin.get('NDVI'),
      NDVI_stdDev: ndviStdDev.get('NDVI')});
  });
};
var results = composite.map(statsNDVI).flatten();
Export.table.toDrive({
  collection:results,
  description:"Export-Script",
  fileFormat:"CSV"
});