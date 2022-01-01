/add image sentinel 5 CO
var COsebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('COSebelumPandemi');

var COawal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('COAwalPandemi');  

var COsetahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('COSetahunPandemi');

var band_viz = {
  min: 0,
  max: 0.05,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(COsebelum_pandemi, band_viz, 'Sebelum_Pandemi_CO');
Map.addLayer(COawal_pandemi, band_viz, 'Awal_Pandemi_CO');
Map.addLayer(COsetahun_pandemi, band_viz, 'Setahun_Pandemi_CO');
print(shp_jakarta)

Export.image.toDrive({
  image: COsebelum_pandemi,
  description: 'COsebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: COawal_pandemi,
  description: 'COawal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: COsetahun_pandemi,
  description: 'COsetahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});



////////////GRAFIK CO///////////////////////////////////

var stacked_composite = COsebelum_pandemi.addBands(COawal_pandemi).addBands(COsetahun_pandemi);
print(stacked_composite)

// script parameter grafik
var optionsCO = {
 title: 'Grafik Kadar CO',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar C0'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktu = ['April 2019','April 2020', 'April 2021'];

// Script memunculkan grafik
var chart = ui.Chart.image.regions(
  stacked_composite, shp_jakarta, ee.Reducer.mean(), 30,'label', waktu)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionsCO)
  
// Display grafik.
print(chart);


//////////////////////////////NO2/////////////////////////////////

var NOSebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('NOSebelumPandemi'); 
  
var NOAwal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')  
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('NOAwalPandemi');  
  
var NOSetahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')  
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('NOSetahunPandemi')
  
var band_viz2 = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(NOSebelum_pandemi, band_viz2, 'NO2Sebelum_Pandemi');
Map.addLayer(NOAwal_pandemi, band_viz2, 'NO2Awal_Pandemi');
Map.addLayer(NOSetahun_pandemi, band_viz2, 'NO2Setahun_Pandemi');

Export.image.toDrive({
  image: NOSebelum_pandemi,
  description: 'NOSebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: NOAwal_pandemi,
  description: 'NOAwal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: NOSetahun_pandemi,
  description: 'NOSetahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});



//////////GRAFIK NO//////////////////////
var Com_NO = NOSebelum_pandemi.addBands(NOAwal_pandemi).addBands(NOSetahun_pandemi);
print(Com_NO)

// script parameter grafik
var optionsNO = {
 title: 'Grafik Kadar NO2',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar NO2'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktuNO = [2019, 2020, 2021];

// Script memunculkan grafik
var chartNO = ui.Chart.image.regions(
  Com_NO, shp_jakarta, ee.Reducer.mean(), 30,'label', waktu)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionsNO)
  
// Display grafik.
print(chartNO);


///////////////////////////////so2/////////////////////////////

var SOSebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('SOSebelumPandemi');
  
var SOAwal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('SOAwalPandemi');  
  
var SOSetahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('SOSetahunPandemi')
  
var band_vizSO = {
  min: 0.0,
  max: 0.0005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(SOSebelum_pandemi, band_vizSO, 'SO2Sebelum_Pandemi');
Map.addLayer(SOAwal_pandemi, band_vizSO, 'SO2Awal_Pandemi');
Map.addLayer(SOSetahun_pandemi, band_vizSO, 'SO2Setahun_Pandemi');

Export.image.toDrive({
  image: SOSebelum_pandemi,
  description: 'SOSebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: SOAwal_pandemi,
  description: 'SOAwal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: SOSetahun_pandemi,
  description: 'SOSetahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});



//////////GRAFIK SO2//////////////////////
var Com_SO = SOSebelum_pandemi.addBands(SOAwal_pandemi).addBands(SOSetahun_pandemi);
print(Com_SO)

// script parameter grafik
var optionsSO = {
 title: 'Grafik Kadar SO2',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar SO2'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktuSO = [2019, 2020, 2021];

// Script memunculkan grafik
var chartSO = ui.Chart.image.regions(
  Com_SO, shp_jakarta, ee.Reducer.mean(), 30,'label', waktu)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionsSO)
  
// Display grafik.
print(chartSO);

/////////////////////////O3////////////////////////////////////

var O3Sebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
  .select('O3_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('O3SebelumPandemi');
  
var O3Awal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
  .select('O3_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('O3AwalPandemi');  
  
var O3Setahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3')
  .select('O3_column_number_density')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('O3SetahunPandemi')
  
var band_vizO3 = {
  min: 0.0,
  max: 0.15,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(O3Sebelum_pandemi, band_vizO3, 'O3Sebelum_Pandemi');
Map.addLayer(O3Awal_pandemi, band_vizO3, 'O3Awal_Pandemi');
Map.addLayer(O3Setahun_pandemi, band_vizO3, 'O3Setahun_Pandemi');

Export.image.toDrive({
  image: O3Sebelum_pandemi,
  description: 'O3Sebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: O3Awal_pandemi,
  description: 'O3Awal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: O3Setahun_pandemi,
  description: 'O3Setahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});




////////////////////////////GRAFIK O3//////////////////////
var Com_O3 = O3Sebelum_pandemi.addBands(O3Awal_pandemi).addBands(O3Setahun_pandemi);
print(Com_O3)

// script parameter grafik
var optionO3 = {
 title: 'Grafik Kadar O3',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar O3'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktuO3 = [2019, 2020, 2021];

// Script memunculkan grafik
var chartO3 = ui.Chart.image.regions(
  Com_O3, shp_jakarta, ee.Reducer.mean(), 30,'label', waktuO3)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionO3)
  
// Display grafik.
print(chartO3);

////////////////////////HCHO/////////////////
var HCHOSebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO')
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('HCHOSebelumPandemi');
  
var HCHOAwal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO')
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('HCHOAwalPandemi');  
  
var HCHOSetahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO')
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('HCHOSetahunPandemi')
  
var band_HCHO = {
  min: 0.0,
  max: 0.0003,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(HCHOSebelum_pandemi, band_HCHO, 'HCHOSebelum_Pandemi');
Map.addLayer(HCHOAwal_pandemi, band_HCHO, 'HCHOAwal_Pandemi');
Map.addLayer(HCHOSetahun_pandemi, band_HCHO, 'HCHOSetahun_Pandemi');

Export.image.toDrive({
  image: HCHOSebelum_pandemi,
  description: 'HCHOSebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: HCHOAwal_pandemi,
  description: 'HCHOAwal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

Export.image.toDrive({
  image: HCHOSetahun_pandemi,
  description: 'HCHOSetahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});




////////////////////////////GRAFIK HCHO//////////////////////
var Com_HCHO = HCHOSebelum_pandemi.addBands(HCHOAwal_pandemi).addBands(HCHOSetahun_pandemi);
print(Com_HCHO)

// script parameter grafik
var optionHCHO = {
 title: 'Grafik Kadar HCHO',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar HCHO'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktuHCHO = [2019, 2020, 2021];

// Script memunculkan grafik
var chartHCHO = ui.Chart.image.regions(
  Com_HCHO, shp_jakarta, ee.Reducer.mean(), 30,'label', waktu)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionHCHO)
  
// Display grafik.
print(chartHCHO);


////////////////////////AEROSOL/////////////////
var AESebelum_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI')
  .select('absorbing_aerosol_index')
  .filterDate('2019-04-01', '2019-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('AESebelumPandemi');
  
var AEAwal_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI')
  .select('absorbing_aerosol_index')
  .filterDate('2020-04-01', '2020-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('AEAwalPandemi');  
  
var AESetahun_pandemi = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI')
  .select('absorbing_aerosol_index')
  .filterDate('2021-04-01', '2021-04-30')
  .mean()
  .clip(shp_jakarta)
  .rename('AESetahunPandemi')
  
var band_AE = {
  min: 0.0,
  max: 2.0,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(AESebelum_pandemi, band_AE, 'AESebelum_Pandemi');
Map.addLayer(AEAwal_pandemi, band_AE, 'AEAwal_Pandemi');
Map.addLayer(AESetahun_pandemi, band_AE, 'AESetahun_Pandemi');



Export.image.toDrive({
  image: AESebelum_pandemi,
  description: 'AESebelum_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});


Export.image.toDrive({
  image: AEAwal_pandemi,
  description: 'AEAwal_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});


Export.image.toDrive({
  image: AESetahun_pandemi,
  description: 'AESetahun_pandemi',
  scale: 11,
  crs: 'EPSG:32748', // wgs 1984 48s
  region: shp_jakarta
});

////////////////////////////GRAFIK HCHO//////////////////////
var Com_AE = AESebelum_pandemi.addBands(AEAwal_pandemi).addBands(AESetahun_pandemi);
print(Com_AE)

// script parameter grafik
var optionAE = {
 title: 'Grafik Kadar AEROSOL',
 hAxis: {title: 'Periode Waktu'},
 vAxis: {title: 'Kadar AEROSOL'},
 lineWidth: 2,
 pointSize: 5,
 };

var waktuAE = [2019, 2020, 2021];

// Script memunculkan grafik
var chartAE = ui.Chart.image.regions(
  Com_AE, shp_jakarta, ee.Reducer.mean(), 30,'label', waktu)
   .setSeriesNames(['Jakarta Barat','Jakarta Pusat','Jakarta Selatan','Jakarta Utara', 'Jakarta Timur'])        
   .setChartType('ScatterChart')
   .setOptions(optionAE)
  
// Display grafik.
print(chartAE);

