# ECON30401 Lecture 3 — Estimation, Hypothesis Testing & Model Selection

**Course:** ECON30401, University of Manchester, 3rd year undergraduate
**Author:** Dr Nicky Grant
**Key topics:** Sample ACF, correlogram, Ljung-Box test, ARMA estimation (OLS, MLE), AIC, BIC, model selection, UK GDP application
**Source:** drnickygrant.com/teaching.html

---

centerbackground canvasbg=ikb center
 background canvasbg=white 
 frameTable of contents
 section in toc[sections numbered]
 [hideallsubsections]
 frame
 

### Introduction

frame

## Recap so Far
center
itemize

- Distinction between Process Y_t and Sample Realisation y_t
10pt

- White Noise \& Stationarity
10pt

- Measuring Dependence- Auto-Correlation Function(ACF) 
10pt

- Properties of ARMA Models
20pt
itemize
center
center
Studied Theoretical Properties of ARMA Processes
 center

frame

frame
 
## [page=2]./ECON30401_Notes_Week3_2016.pdf
 Motivation 
center
 -0.2cm
 [scale=0.32]ukgdp1.png

center
 -0.4cm
 center 
 Questions 
 -0.1cm
enumerate
 
 
- Sample Autocorrelation Function \& Testing 
 15pt
 
- Interpeting Eviews Correlogram
 15pt
 
- Estimating ARMA Models \& Testing
 15pt
 
- Serial Correlation \& Testing (Video)
 15pt
 
- Model Selection- Information Criterion 
 15pt
 
- Empirical Example: UK GDP Growth

enumerate

frame

 
 
### Sample Autocorrelation Function \& Correlogram

 
 frame
 
## Sample Autocorrelations 

 
 mydef*[page=4]./ECON30401_Notes_Week3_2016.pdfSample Autocorrelation Function 
 equation*
 \rho_T(k)=\; 1T\sum_t=k+1^T( y_t-y%
 )( y_t-k-y) 1T\sum_t=1^T( y_t-y%
 ) ^2 . y_T:=1T\sum_t=1^T y_t sample autocorr \;\; \; k=1,2,..
 equation* mydef*
 
 
 85pt
 mydefPopulation Auto-Correlation Function 
 equation*(k)=
 E[(Y_t-E[Y_t])(Y_t-k-E[Y_t-k])]E[(Y_t-E[Y_t])^2] \;\;\;\; k=1,2.,..equation* mydef
 center
 
 
 Question: How to make inferences on the populaton ACF, e.g to test (k)=0?
 center
 
 
 frame
 
 
 frame-0.1cm
 center
 
 center
 
## [page=14]./ECON30401_Notes_Week3_2016.pdf
Empirical Problem: UK GDP Growth \& Correlogram 
 
 Questions
 enumerate
 
- ./ECON30401_Notes_Week3_2016.pdf
 Simulation Example: Properties of Sample Autocorrelation of AR(1)
 center
 Suppose the true Process is Y_t=0.5Y_t-1+\varepsilon_t \varepsilon_t WN(1)
 -0.7cm
 
 
 What are the properties of the Sample ACF?
 center
 frame

 
 
 
 

frame
-1.8cm
center 

## [page=7]./ECON30401_Notes_Week3_2016.pdf
Simulation: Sample ACF from Multiple Realisations of AR(1) (T=30) 
center
 

frame

frame
-1.4cm
center 
-2cm 
## [page=8]./ECON30401_Notes_Week3_2016.pdf
 Simulation: Sample ACF from Multiple Realisations of AR(1) (T=100)
center
 

frame

frame
-1.4cm
center 

## [page=9]./ECON30401_Notes_Week3_2016.pdf
 Simulation: Sample ACF from Multiple Realisations of AR(1) (T=1000)
center
 

frame

frame
-1.4cm
center 

## [page=10]./ECON30401_Notes_Week3_2016.pdf
 Simulation: Sample ACF from Multiple Realisations of AR(1) (T=10000)
center
 

frame

frame
-3cm
center 

## [page=11]./ECON30401_Notes_Week3_2016.pdf
 Simulation: Sampling Distribution of Sample Autocorrelation at Lag 1
center
 

frame
 
frame
 
## Sample Autocorrelations: Statistical Properties when (k)=0

 itemize
 
 
- mytheo*[width=2.8in][page=12]./ECON30401_Notes_Week3_2016.pdf Cental Limit Theorem If Y_t is a White Noise Process
 equation*
 T\rho_T(k)d N( 0,1) all %
 k= 1,2,...
 equation* mytheo*
 
 15pt
 
 
- \-1.96 T\rho_T(k) 1.96 \ \-1.96 Z 1.96\=0.95 
 
 center
 [scale=0.2]normal
 center

itemize

 frame
 
 frame
 
## [page=12]./ECON30401_Notes_Week3_2016.pdf
 Autocorrelations: Hypothesis Testing
 itemize
 
 
- equation* H_0:\; (k)=0 equation*
 equation* H_A:\; (k) 0 equation*
 10pt
 
- Under H_0 \;\;\-1.96 Tr(k) 1.96 \=0.95
 
 10pt
 
- redRejection Region: |T\rho_T(k)|>1.96 evidence to reject H_0 at 5\% level 
 8pt
 
- green Acceptance Region: |T\rho_T(k)| 1.96 no evidence to reject H_0
 20pt
 
 
- Joint Test: See notes on [page=13]./ECON30401_Notes_Week3_2016.pdf Q-Statistic
 itemize
 
 frame

 
 frame
 
## [page=14]./ECON30401_Notes_Week3_2016.pdf
 Properties of UK GDP Growth Example from Correlogram
 center
 rkgdp1
 center
 enumerate 
 
- True process may be AR(1), though could be ARMA(1,1) or AR(2)..
 1pt
 
- center Need method to estimate form of of true process.. center
 
 itemize
 frame
 
### Estimation and Model Selection of ARMA(p,q) Models

 frame
 
## [page=18]./ECON30401_Notes_Week3_2016.pdf
 AR(1) Estimation
 
 itemize
 
 
- center Suppose Y_t=+\phi_1Y_t-1+\varepsilon_t \varepsilon_t WN(^2)
 10pt
 
- How to estimate , \phi_1?
 10pt
 
 
- OLS: Regress y_t(ind. variable) on a constant \& y_t-1 (dep. variable) center
 
 
- eqnarray*
 &=&y-\phi_1y_-1 y_-1=1T-1\sum_t=2^Ty_t-1\\
 && \\
 \phi_1 &=&\sum_t=2^T( y_t-y) (
 y_t-1-y_-1) \sum_t=2^T( y_t-1-y%
 _-1) ^2
 eqnarray*
 
 
 itemize
 
 frame
 
 frame
 
## [page=18]./ECON30401_Notes_Week3_2016.pdf
 AR(1) Estimation: Properties
 itemize
 
- center Y_t=+\phi_1Y_t-1+\varepsilon_t \varepsilon_t WN(^2) and |\phi_1|<1 center
 8pt
 
 
- Consistency: \phi_1p \phi_1
 8pt
 
 
- Central Limit Theorem: T(\phi_1-\phi_1)sd(\phi_1) dN( 0,1) 
 8pt

 
 12pt
 itemize
 enumerate
 
- Crucial Assumptons
 
- equation* Y_t=+\phi_1Y_t-1+..+\phi_1Y_t-p +\varepsilon_t equation*
 
 
 
 10pt
 
- OLS: Regress y_t on constant y_t-1,..y_t-p \; \; \phi_1,..,\phi_p
 10pt
 
- T-p observations for estimation
 10ptcenter

- All estimators \phi_1,..,\phi_p Consistent and Asymptotically Normal (CLT) center
 10pt
 itemize
 enumerate
 
- Crucial Assumptons
 
- ./ECON30401_Notes_Week3_2016.pdf
 AR(p) Coefficient Testing
 itemize
 
 
- Joint Hypothesis Test on AR(p) Coefficients
 eqnarray*
 H_0 &:& _1=...= _p=0 HO_zero coefficients \\
 H_A &:& at least one _i 0, i=1,...,p 
 eqnarray*
 10pt
 
- Run OLS, Perform F-Test of Joint Hypothesis
 10pt
 
- t-test for individual test, e.g \phi_1=0
 10ptcenter
 
- Test calculated and performed numerically in Eviews.. center
 
itemize
frame
 
 frame
 
## [page=23]./ECON30401_Notes_Week3_2016.pdf
 Serially Correlated Errors \& Testing
 itemize-0.5cm
 
- equation* Y_t=+\phi_1Y_t-1+..+\phi_1Y_t-p +\varepsilon_t equation*
 
itemize
 enumerate
 
- If \varepsilon_t serially correlated

- 
 5pt
 
- https://www.youtube.com/v/3vqbx2f36L0&amp;vq=hd720
 
 
 [ mediacommand=lagop:playPause, overface=blueplay, downface=red Play/Pause
 ] [scale=0.5]vid \; Serial Correlation \& Testing Breusch Godfrey LM Test 
 
 

 
- Test is calculated and performed in Eviews.. itemize
 center
 frame
 
 
 frame
 
## Estimating ARMA(p,q) Models

 itemize
 
- Estimation MA models slightly different to AR [[page=19]./ECON30401_Notes_Week3_2016.pdf See Notes]
 10pt
 
- Can estimate coefficients of ARMA( p,q) : Y_t=+ _1Y_t-1+...+ _pY_t-p+ _t+
 _1 _t-1+...+ _q _t
 10pt
 
- Can perform hypothesis tests on coefficients as for AR(p)
 10pt
 
- Also requires stationarity and serially uncorrelated errors.
 20pt
 center

- Estimated in Eviews along with tests
 center
 
itemizeframe

 
### Model Selection: Information Criterion Methods

 
 
 
 frame
 
 
## Model Specification

 
 itemize
 
- Need to decide appropriate lag orders for ARMA(p,q)
 
 itemize
 
- Difficult to go using Correlogram alone 
 itemize
 10pt
 
- Can estimate ARMA(p,q) and perform hypothesis tests on coefficients
 10pt
 
 
- Alternative approach based on Information Criteria
 
 itemize
 
- Essentially measures to compare how well a model fits to the data 
 
 
- Popular: Akaike Information Criterion \& %
 Schwarz Information Criterion
 itemize
 itemize
 

 frame
 frame
 
 
## Information Criteria: Definition
center
 Y_t=+ _1Y_t-1+...+ _pY_t-p+ _t+
 _1 _t-1+...+ _q _t-q 
 equation* Estimate \;\phi_1,..\phi_p,\eta_1,..,\eta_q\; by \; \phi_1,..\phi_p,\eta_1,..,\eta_q\; calculate \;\;
 ^2=RSST^* T^*=T-p-q-1
 equation* center itemize
 -0.5cm
 
- Trade-off: [Goodness of Fit] (Low ^2, ) vs.
 [Efficiency] Small No. of coefficients (p+q+1) 
 
 itemize
 
- Increasing p and.or q reduces ^2 but reduces precision of estimates of coefficients
 
 itemize
 itemize1.9cm
 
 
 
 
 frame
 frame%
 
 
## [page=22]./ECON30401_Notes_Week3_2016.pdf
 Using Information Criteria
 
 enumerate
 
- In practice consider only a subset (choose p_, q_max to be small compared to T)
 itemize
 
 
- Let (p_AIC,q_AIC) and (p_SIC,q_SIC) be optimal lags from both criterion
 20pt
 
- Different criteria (eg AIC \& SIC) can select different ARMA model

---
*This file provides mathematical content from Dr Nicky Grant's lecture materials for AI indexing.*
*Full PDF available at: https://www.drnickygrant.com/teaching.html*
