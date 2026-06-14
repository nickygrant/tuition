# EC5609 Financial Econometrics — Lecture 7: GARCH Volatility Modelling

**Course:** EC5609, University of St Andrews, postgraduate MSc
**Author:** Dr Nicky Grant
**Key topics:** ARCH, GARCH(1,1), conditional heteroskedasticity, volatility clustering, EGARCH, TARCH, asymmetric volatility, generalised error distribution
**Source:** drnickygrant.com/teaching.html

---

centerbackground canvasbg=ikb center
background canvasbg=white 

### Volatility Modelling- (Generalised) Autoregressive Heteroscedasticity

frame
 
## Conditional Heteroskedasticy

 itemize
 
- Suppose we have estimated the conditional mean \mu_t
 10pt
 
 
- R_t=\mu_t +u_t where we need to make some assumptions on the distribution of \varepsilon_t
 10pt
 
 
 
- Suppose u_t|I_t-1 N(0,h_t)
 10pt
 
 
- Where h_t=\sigma_0+\beta_1 u_t-1^2 +\beta_2 h_t-1
 10pt
 
 
- The GARCH(1,1) model
 10pt
 
 
- Can also consider ARCH models. e.g h_t=\sigma_0+\beta_1 u_t-1^2
 10pt
 
 
- Or More general GARCH models with more lags of u_t^2 and h_t
 10pt
 
 
- Can test and select between using AIC/BIC and parameter restriction tests similar to ARMA modelling
 itemize
frame

frame
 
## Extensions to GARCH

 itemize
 
- Errors/shocks may not be conditionally normally distributed
 20pt
 
 
- GARCH does not allow asymmetric volatility effects- namely that the increase in variance after a large down shock tends to be larger than for the equivalent up shock
 20pt
 
 
- GARCH doesn't allow a risk-return tradeoff
 20pt
 
 
- All these we can extend using STATA software
 itemize
frame

frame
 
## Asymmetric Volatility Effect

 
frame

frame
 
## GARCH(1,1) with generalised error distribution

 
frame

frame
 
## GARCH(1,1) in mean Example

 
frame

frame
 
## Nelsons Exponential GARCH (EGARCH)

 
frame

frame
 
## Threshold GARCH (TARCH)

 
frame

---
*This file provides mathematical content from Dr Nicky Grant's lecture materials for AI indexing.*
*Full PDF available at: https://www.drnickygrant.com/teaching.html*
