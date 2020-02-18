# Vegetation Indices Diagnostics Tests for Modis Terra Vegetation Indices Product

## Motivation

[MODIS Vegetation Index Products (NDVI and EVI)](https://modis.gsfc.nasa.gov/data/dataprod/mod13.php) are very popular products used for the vegetation analysis especially detecting change in vegetation status. While using this product in Google Earth Engine, it was noticed that the yearly summary of the indices were giving counter-intuitive results for some of the protected areas of India. For example, higher the precipitation of an protected area and lower the NDVI/EVI values. This was not true especially when matched with the ground data.

The issue is coming possibly due to high cloud availability in high precipitation areas. Clouds tend to have low NDVI values ([Ex. ](https://gis.stackexchange.com/questions/244061/do-clouds-reflect-nir-red-bands)). So if MODIS NDVI/EVI calculating algorithms are not filtering clouds then we will get lesser NDVI/EVI values for higher precipitation. Similar issues has been reported with other remote sensing products as well ([Ex.](https://journals.ametsoc.org/doi/pdf/10.1175/JAM2468.1))

This short repository is to put this idea to test especially for India. 

I have used [MOD13Q1 v006](https://lpdaac.usgs.gov/products/mod13q1v006/) (MODIS/Terra Vegetation Indices 16-Day L3 Global 250 m SIN Grid) product for the vegetation indices information. Here is the [link](https://developers.google.com/earth-engine/datasets/catalog/MODIS_006_MOD13Q1) of the same product from the Google Earth Engine Data Catalog.

## How it works

* The repository is just a bunch of Google Earth Engine (GEE) and R Scripts put together. 
* To reproduce the results you can clone the repository to your GEE account for running all the JavaScript and in R for R related scripts.

## Known Issues

On the MODIS website, it does writes the known issues, which are as following.

 *"The following issues have been detected:*

- *Unexpected missing data in the last cycles of each year.*
- *Incorrect instances of "NoData" and spikes in NDVI values.*
- *VI Usefulness Bits are not correctly assigned.*

*For instances where the VI Quality (bits 0-1) is flagged as good and the VI Usefulness (bits 2-5) indicates the same pixels have the lowest usefulness score, users are advised to disregard the usefulness score.*

*Corrections will be implemented in Collection 6.1 reprocessing in 2019.*

*For complete information about the MOD13Q1 known issues please refer to the [MODIS Land Quality Assessment website](https://landweb.nascom.nasa.gov/cgi-bin/QA_WWW/getSummary.cgi?esdt=MOD13&type=C6)"*

or

"*December 07, 2017*

*By: LP DAAC*

*The Vegetation Indices (VI)Quality data layer in the Version 6 MODIS VI data products(MxD13) currently show a discrepancy between VI Quality (MODLAND QA bits) and VI Usefulness bits for some pixels. For instances where the VI Quality (Bits 0-1) is flagged as good and the VI Usefulness (Bits 2-5) indicates the same pixels have the lowest usefulness score, users are advised to disregard the usefulness score.*

*Visit the [MOD13 Known Issues](https://landweb.modaps.eosdis.nasa.gov/cgi-bin/QA_WWW/displayCase.cgi?esdt=MOD13&caseNum=PM_MOD13_16301&caseLocation=cases_data&type=C6&_ga=2.59851309.1469403327.1576837780-490889048.1576837780) site for a detailed example.*"

Here they do hint that **"*VI Usefulness Bits are not correctly assigned.*"**. This suggests that there are issues in assignment of quality bits as they have shown [here](https://landweb.modaps.eosdis.nasa.gov/cgi-bin/QA_WWW/displayCase.cgi?esdt=MOD13&caseNum=PM_MOD13_16301&caseLocation=cases_data&type=C6&_ga=2.101410305.1469403327.1576837780-490889048.1576837780). 

https://code.earthengine.google.com/51a59833d022053ab5ac7c24ed83eab2

