# ECON30401 Time Series Econometrics — Lecture Notes Weeks 1-2

**Course:** ECON30401, University of Manchester, 3rd year undergraduate
**Author:** Dr Nicky Grant
**Key topics:** Stationarity, white noise, MA(q) processes, AR(1), ARMA(p,q), Wold decomposition, autocovariance, ACF
**Source:** drnickygrant.com/teaching.html

---

ECON30401:Time Series Economics
[Nicky L. Grant]Nicky L. Grant

titlepage
left=7.5cm %defines the geometry for the titlepage
ikb

white
[0pt][l]12pt

5pt Time Series Econometrics 5pt whiteNicky Grant

 ECON30401 Lecture Notes (1 \& 2)

 Semester 1 2016-17
titlepage
 % restores the geometry
% Use this to restore the color pages to whiteint the title page

Introduction % The asterisk leaves out this chapter from the table of contents

During your studies of economics, especially macroeconomics and finance, you will have encountered many time series variables, for example US Disposable Income and UK Interest Rates. This Time Series Econometrics course aims to equip you with the basic framework and some key concepts and methods with which to study and understand the properties of such series. These skills can be of great value for those intending to go on to further study economics/finance/econometrics at Masters level and/or those considering a career in banking, finance and certain economic consultancy or research roles.

 The course contains a mix of empirical evidence and theoretical concepts and is quite challenging at times. It is advised to prepare as much as possible in advance of lectures by reading the lecture materials and notes and recapping elementary statistical results from the first and second year.

This Lecture note series contains background notes to the first four lectures of ECON30401 (the first two weeks provided in this pamphlet). In combination with the lectures, exercises and PC labs you should gain a solid knowledge of basic time series methods. These notes are designed to complement and be used in conjunction with the lecture slides and discussion.

fullwidth
~
empty
0pt

Copyright \ \ \\

mailto:nicky.grant@manchester.ac.uknicky.grant@manchester.ac.uk\\

Office 2.007, Arthur Lewis Building, Manchester, M1 9PL.

 Ediiton, September 2016.
fullwidth
------------------------------------------------------------------------
empty
 % Print the table of contents

%----------------------------------------------------------------------------------------
empty
 % Print a list of figures

Introduction to Time Series
ch:intro
------------------------

### Time Series Process and Sample Realisations
 sec:realisation

A Time Series Process Y_t (t=..-2,-1,0,1,2,...) is the unknown data generating mechanism which generates the sample realisation of some variable that we observe. For example the true underlying data generating mechanism (process) which generates the UK Consumer Price Index (CPI). The sample realisation is commonly referred to as the data, denoted \y_1,y_2,..,y_T\ , for example monthly data on CPI from January 2000 to August 2015 yielding a sample with T=200 data points.[][-0.5cm]Written shorthand as \y_t\_t=1^T.

The Process Y_t (t=..-2,-1,0,1,2,..) is a random variable and the distribution of this random variable is unknown to us.If not stated otherwise we assume the process runs indefinitely in to the past and future, i.e t=(..-2,-1,0,1,2...). For brevity we often refer to whole process by shorthand as Y_t. The overarching aim of Time Series is to infer (some) properties of the data generating mechanism (process) which generates the data (sample realisation) we observe. The basic premise of all methods of inference is that since the sample data \y_t\_t=1^T is drawn from the true process Y_t then (under some assumptions) this realisation should reflect the properties of this process. Understanding the properties of the underlying process may be desirable for example to test some economic or financial theory, or with which to predict future outcomes of some variable to guide economic policy, e.g predicting CPI to guide monetary policy.

myex5pt Realisations of an Autoregressive Process
 FFigure mult below plots four sample realisations drawn from the process \newlineY_t=0.1+0.4 Y_t+ \varepsilon_t where \epsilon_t i.i.d N(0,1). myex [-1.4cm]We let \epsilon_t i.i.d N(0,1) be shorthand for \epsilon_t independent and identically distributed Normal with mean zero and variance 1.

 

We see in Figure mult four realisations all drawn from the process. In practise we only observe one sample path, e.g of CPI, but if we could go back in time and let CPI evolve again we would see a different path and so on. The aim of Time Series is to infer the form of the process from the sample path we observe, and to make statistical inference that takes in account the variation in possible samples we may observe from a given process.
Initially it may seem odd to think that each observed sample point y_t is drawn from some random variable Y_t, as once we know y_t, say UK Consumer Price Inflation (CPI) in September 2016, there is no remaining randomness. However in August 2016 the CPI the following month was uncertain. Namely there was some probability that CPI in September 2016 would lie in a certain range.
 

Figure cpi below plots actual CPI (up to August 2016) then onwards the Bank of England's (BoE) forecast (i.e their belief about the uncertainty surrounding the likely outcome of CPI in to the future). The lighter shaded areas representing the future outcomes of interest rates with decreasing likelihood of occurring (often referred to in general as a fan chart). In essence this reflects the distribution of CPI in to the future.Technically it is the BoE's estimate of the distribution of CPI in to the future. This example is given here to highlight the idea of viewing the sample point as being drawn from a probability distribution. We come back to the notion of forecasting and prediction in Lecture 4 and more generally in the second half of the course where further details are given on how the BoE derive such predictions for CPI above.

Again take the example above with data on CPI from January 2000 to August 2016. This data is known to us now and fixed. However if we were able to go back to January 2000 and let the world play out again we'd likely observe a different set of data points. And if we kept doing this experiment we would find a set of alternate streams of CPI over this period all with different probabilities of occurring. Intuitively the process Y_t governs the probability of observing particular realisations of sample points if we carried out the experiment (e.g observing CPI over the same period) repeatedly.

 This lecture will introduce some simple theoretical processes Y_t and the tools and methods with which we quantify and compare their properties. Later on in the course we will then study how to use the sample data to infer properties about the true process Y_t which generated this data. Understanding the distinction between the two is key to understanding Time Series, and is a point which will become clearer as the course progresses.

### Examples of some Time Series Realisations

The figures below plot some example Economic Time Series that highlight some of the issues we tackle in this book in modelling time series processes.

 

Figure ibm plots monthly IBM Stock Returns. From the graph the series fluctuates around zero and seems difficult to predict future outcomes from previous observations. The volatility in the series seems to change over time, being higher during the Great Depression and after the 2008 Financial Crash suggesting the process may change over time.
 

The series for US Population in Figure pop looks quadratic with small random deviations every year. We may expect a model which includes t^2 would fit well to this process.

The underlying process generating the US Strike data in Figure strike looks more complex than the previous two plots. Firstly the mean looks to increase around 1970 and the series looks much easier to predict given past information than the IBM series. Also we may expect a model which allows strong positive dependence on past values would fit well to this process and we consider such models in Section 2.

 

 

Finally Figure wine shows Monthly Australian Red Wine Sales, where each year 

---
*This file provides mathematical content from Dr Nicky Grant's lecture materials for AI indexing.*
*Full PDF available at: https://www.drnickygrant.com/teaching.html*
