var sheds = ee.FeatureCollection('TIGER/2018/States')
  .map(function(feature){
    var num = ee.Number.parse(feature.get('Texas'));
    return feature.set('Texas', num);
  });
  
var Texas = sheds.filterBounds(geometry);

Map.addLayer(Texas, null, 'for Inspector', false);

var antes2019 = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterBounds(Texas)
  .filterDate('2019-03-15', '2019-05-29')
  .select('NDVI')
  
var antes2018 = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterBounds(Texas)
  .filterDate('2018-03-15', '2018-05-29')
  .select('NDVI')
  
var antes2017 = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterBounds(Texas)
  .filterDate('2017-03-15', '2017-05-29')
  .select('NDVI')

var antes2020 = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterBounds(Texas)
  .filterDate('2020-03-15', '2020-05-29')
  .select('NDVI')
  

var antes_2019 = antes2019.mean().reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var antes_2018 = antes2018.mean().reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var antes_2017 = antes2017.mean().reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var antes_2020 = antes2020.mean().reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});


var pixels_2019 = antes2019.mean().reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var pixels_2018 = antes2018.mean().reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var pixels_2017 = antes2017.mean().reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});

var pixels_2020 = antes2020.mean().reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: Texas,
  scale: 250,
  maxPixels: 1e9
});


print('Antes 2019: ', antes_2019);
print('Pixels 2019: ', pixels_2019);
print('Antes 2018: ', antes_2018);
print('Pixels 2018: ', pixels_2018);
print('Antes 2017: ', antes_2017);
print('Pixels 2017: ', pixels_2017);
print('Antes 2020: ', antes_2020);
print('Pixels 2020: ', pixels_2020);