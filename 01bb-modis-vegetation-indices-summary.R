# Author: Ankur Shringi (ankurshringi@iisc.ac.in)
# title: 01bb-modis-vegetation-indices-summary.R
# subtitle: Analysing the NDVI/ EVI monthly Summaries for the Indian Protected National Parks (PAs)...
# abstract: ...
# Project: modis-diagnostics
# Date created: 2019-Dec-21 22:33:38 Saturday
# Enter following command to render the code as html
# `r2html()`
# Initialization ----------------------------------------------------------
# Loading custom made utility functions
source("util_Global.h.R")
# Deleting R-Environment Variables (Except utility functions)
clr()
# Loading required packages
Packages <-     c("tidyverse", "roxygen2Comment", "ggplus")
install(Packages); rm(Packages)
