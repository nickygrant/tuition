# EC5609 Financial Econometrics — Week 1 (2021)

**Course:** EC5609, University of St Andrews, postgraduate MSc
**Author:** Dr Nicky Grant
**Key topics:** Distribution theory, stock price returns, skewness, kurtosis, fat tails, leptokurtosis, ARMA, stationarity, financial data properties
**Source:** drnickygrant.com/teaching.html

---

centerbackground canvasbg=ikb center
 background canvasbg=white 
 frameTable of contents
 section in toc[sections numbered]
 [hideallsubsections]
 frame
 
### Course Details

 
 
 frame%
 
## Module Information

 
 
 
 itemize
 
 
- Time series econometrics- tool to analyse economic time series data
 
 
 
 10pt
 
- Challenges faced broadly distinct to those with cross sectional data
 
 
 10pt
 
- Focus on time series theory (+ some empirical applications)
 
 
 
 
 20pt
 
- mailto:nlg1@st-andrews.ac.ukDr Nicky Grant (Lect. 1-5) - mailto:rm1@st-andrews.ac.ukProf. Roderick McCrorie (Lect. 6-11)
 
 10pt
 
 
- 5 tutorials (wk 3,5,7,9,11)
 20pt
 
 
- Office Hours:
 
- 3.1cm Nicky:Thu 1-3pm (or by appointment) [F14]\\
 
 
 
 
 itemize
 
 
 frame
 
 
 frame
 
 
## Lecture Topics

 
 
 
 enumerate
 
- Stationary Univariate Time Series - ARMA Processes and Stationarity 
 
 
- Stationary Univariate Time Series - Estimation and Inference
 
 
- Stationary Multivariate Time Series -Vector Autoregressions I
 
 
- Stationary Multivariate Time Series - Vector Autoregressions II
 
 
- Stationary Multivariate Time Series - Estimation \& Impulse Response Functions
 
 
 15pt
 
 15pt
 
 
- Univariate Non-stationary Time Series
 
 
- Multivariate Time Series: Unit roots and Co-integration
 
 
 
 
- Time Series Models of Heteroskedasticity
 
 
- Introduction to Continuous Time Econometric Models
 
 
- Likelihood methods for estimating continuous time models with discrete data
 
 
- Estimating volatility in the presence of microstructure noise
 
 
 enumerate
 
 
 frame
 
 
 
 
 
 
 frame
 
## Assessment and Reading

 
 
 
 itemize
 
- 25\% Continuous Assessment
 
 
- Class tests wk7 and wk11
 5pt
 
 
- 75\% Final Examination in May
 
 
 
- 3 hours to answer 3 out of 5 questions
 
 
- Main Textbook:\\
 Hamilton (1994) Time Series Analysis (H)\\
 Lutkepohl (2005) New Introduction to Multiple Time Series (L)
 
 10pt
 
- Lecture notes accompany some of the course
 
- See Course Outline and lecture materials for core/further reading
 
 
 itemize
 
 
 frame
 
 
### Introduction to Time Series

 
 
 frame
 
 
## Motivation

 
 itemize
 
 
- How to infer/conceptualise statistical properties of data observed over time? 
 
 5pt
 
- e.g interest rates, unemployment, stock prices.
 25pt
 
 
 
 
- Model properties of time series esp. dependence over time
 itemize 
 
- e.g. future interest rates on past interest rates (univariate)
 
- e.g. future inflation on past interest rates (multivariate)
 
 itemize
 
 25pt
 
- 
 Broad differences with cross section data:
 itemize 
 
- Temporal ordering
 
- Likely dependence between observations (esp. with most economic time series data)
 
 itemize
 25pt
 
- Focus on discrete time series in first half of course
 
 
 
 itemize
 
 
 frame
 
 
 frame
 
 
## Time Series Process vs. Realisation

 
 itemize
 
 
- Time Series Process: \Y_t: t T\ for some set T
 
 10pt
 
- 25pt Unless stated otherwise assume T=\ -2,-1,0,1,2,\
 
- 25pt Let \Y_t\ denote \Y_t: t T\
 
 25pt
 
- \Y_t\ is multivariate r.v with a joint distribution fn. 
 
- 25pt e.g. Y_t is independently distributed N(0,1) for all t T
 
 
 25pt
 
- Realisation: \y_t^s: t T\ in state s drawn from \Y_t\ 
 25pt
 
 
- Sample Data: (y_1,,y_T)' realisation of sample size T from \Y_t\ 
 
 
 
 itemize
 frame
 
 frame
 itemize
 
 
 -0.5cm
 
- -0.5cm
 [
 label=ar1,
 activate=onclick,
 deactivate=pageclose,
 height=0pt,
 width=0pt,
 playbutton=none,
 addresource=ar14.mp4,
 windowed=1000x600@c,
 keepaspectratio,
 flashvars=%
 source=ar14.mp4
 ]VPlayer.swf
 [ mediacommand=ar1:playPause, overface=bluewhiteCLICK,
 downface=redwhitePLAY
 ][scale=0.12]click white Realisations of first order autogressive [AR(1)] process
 
 20pt
 
- myex*[width=3.4in]An AR(1) process Y_t=0.5Y_t-1 +\varepsilon_t where \varepsilon_ti.i.d N(0,1) myex*
 
 
 10pt
 
- Generate sample \y_t^s : t=1,,T\ in states s=1,2,3,4
 10pt
 
- (\varepsilon_1^s,..,\varepsilon_T^s)' each element drawn independently from N(0,1) distn (s=1,2,3,4)
 10pt
 
 
 
- 0.25 y_1^s=0.5y_0^s+\varepsilon_1^s (assume y_0^s=0) 
 
 
- 0.25 y_2^s=0.5y_1^s+\varepsilon_2^s
 
 
- 0.25 
 
- 0.25 y_T^s =0.5y_T-1^s+\varepsilon_T^s
 
 
 itemize
 
 frame
 
 
 
 
 
 
 frame
 
 
 center
 
 
 center
 
 frame
 
 frame
 
 
 center
 
 center
 
 frame
 
 frame
 
 
 center
 
 center
 
 frame
 
 
 
 
 
 
 frame
 
 
 center
 
 
 center
 
 frame
 
 
 
### Fundamental Statistical Definitions

 
 frame
 
## Distribution of a Time Series Process

 itemize
 
 
- -5pt Process generating sample data \Y_t : t T\ for =\1,, T\ 
 
 20pt
 
- 15pt[4cm]\largef_T(y_1,,y_T) Joint density function of \Y_t : t T\
 
 
 
 20pt
 
 
- 15pt[4cm]\largef_t(y_t) Marginal density function of Y_t (for t T) 
 
 
 30pt
 
 
- (y_1^s,,y_T^s)' in state s drawn from joint distn. of \Y_t : t T\
 
 12pt
 
- y_t^s in state s drawn from marginal distn. of Y_t
 18pt
 
 
- We observe one realisation, the sample data (y_1,, y_T)'
 itemize
 
 
 
 frame
 
 
 
 
 frame
 
## Moments of Time Series Process (univariate)

 itemize
 
 
 
 
- myexx*[width=5.4in]Population Moments of Y_t For any function g()
 equation*E[g(Y_t)] := \int_-^ g(y) f_t(y)dy equation*
 myexx*
 
 
- The average in the population of g(Y_t)
 12pt
 
 
- 12pt [3cm]Mean of Y_t [5cm]E[Y_t] -8pt [6cm]\mu_t:= \int_-^ y f_t(y)dy 
 18pt
 
- 12pt [3cm]Var of Y_t [5cm]E[(Y_t-\mu_t)^2] -8pt [6cm]Var(Y_t):= \int_-^ (y-\mu_t)^2 f_t(y)dy 
 
 itemize
 frame
 
 frame
 
## Moments of Time Series Process (bivariate)

 itemize
 
 
 
- Consider T=\t_1,t_2\ where t_1 t_2 T 8pt
 
 
- myexx*[width=5.4in]Population Moments of (Y_t_1,Y_t_2)
 equation*E[g(Y_t_1,Y_t_2)] := \int_-^\int_-^ g(y_t_1,y_t_2) f_T(y_t_1,y_t_2)dy_t_1dy_t_2 equation*
 myexx*
 
 
- The average in the population of g(Y_t_1, Y_t_2)
 10pt
 
 
 
 15pt
 
 
 
- 29pt Cov(Y_t_1,Y_t_2):=E[(Y_t_1-\mu_t_1)(Y_t_2-\mu_t_2)] 10pt Covariance Y_t_1,Y_t_2
 10pt
 
- 81.2pt = \int_-^\int_-^ (y_t_1-\mu_t_1)(y_t_2-\mu_t_2) f_T(y_t_1,y_t_2)dy_t_1dy_t_2 
 
 
 itemize
 frame
 
 
 
 
 
 
 
 
 frame
 
 
## Stationarity

 
 itemize
 
- mydef*[width=5.5in]Weakly Stationary Process A process \Z_t\ is weakly stationary if
 4pt
 enumerate
 
 
- [6.23cm] E[Z_t] = for all t,
 
 
- [6.23cm] Var(Z_t) =^2< for all t,
 
 
 
- [6.23cm] Cov(Z_t_1, Z_t_2) =(|t_1-t_2|) for all t_1,t_2.
 enumerate
 mydef*
 
 
 25pt
 
 
- mydef*[width=5.5in]Strictly Stationary Process A process \Z_t\ is strictly stationary if for all t_1, t_k in T the joint density of (Z_t_1+,...,Z_t_k+)' does not depend on .
 
 
 mydef* 
 
 
 itemize
 frame
 
 
 frame
 
 
## Stationarity

 
 itemize
 
- Strict stationarity is a stronger condition than weak stationarity
 18pt
 
- We refer to weak stationarity as stationarity (unless stated otherwise)
 18pt
 
 
- Process generating sample data may not be stationary, e.g.
 \pause5pt
 enumerate
 
- 10pt Mean or (co-) variance of Z_t is not constant over time
 \pause10pt 
 
- 10pt Z_t has a unit root (e.g a random walk)
 
 enumerate
 itemize

 
 
 frame
 
 frame
 
## White Noise Process

 
 
 itemize
 
- mydef*[width=5in]White Noise A process \Z_t\ is white noise if
 
 enumerate
 
- [4cm] E[Z_t]=0 for all t, 
 
 
 
- [4cm] E[Z_t^2]= ^2< for all t, 
 
 
- [4cm] E[Z_t_1Z_t_2]=0 for all t_1 t_2 T.
 enumerate
 mydef*
 
 
- i.e. zero mean, constant variance and no correlation across time
 
 
 10pt
 
- WN(^2) 10pt notation for a white noise process with variance ^2
 10pt
 
 
- Note: white noise weak stationarity (not the reverse)
 itemize
 
 frame
 
frame
 
## Auto-covariance \& Autocorrelation Function

 
 
 itemize
 
- \Y_t\ assumed stationary (unless stated otherwise)
 10pt
 
- mydef*[width=4.9in]Autocovariance Function of \Y_t\
 [7cm](k):=Cov(Y_t,Y_t-k) \; k T
 mydef*
 8pt
 
- mydef*[width=4.9in]Autocorrelation Function of \Y_t\
 [7cm](k):=(k)(0) \; k T
 mydef*
 
 14pt
 
- 15pt (k) correlation between Y_t and Y_t-k 
 
 8pt
 
- 15pt Correlations a function of 'gap' k, not time (stationarity)
 
 5pt
 
- 15pt Correlations in sample data should reflect t

---
*This file provides mathematical content from Dr Nicky Grant's lecture materials for AI indexing.*
*Full PDF available at: https://www.drnickygrant.com/teaching.html*
