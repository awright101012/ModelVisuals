import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, ArrowRight, CheckCircle, HelpCircle, RefreshCcw, GitMerge, Layers, ChevronDown, ChevronUp, ExternalLink, Search, Activity, Filter } from 'lucide-react';

const AutoARIMAVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [iterations, setIterations] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [showMathDetails, setShowMathDetails] = useState(false);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeStep, iterations]);

  const steps = [
    { name: 'Data Input', icon: BarChart2, color: '#f0f0ff' },
    { name: 'Stationarity Test', icon: Activity, color: '#e6e6ff' },
    { name: 'Differencing', icon: RefreshCcw, color: '#d9d9ff' },
    { name: 'ACF/PACF Analysis', icon: TrendingUp, color: '#ccccff' },
    { name: 'Grid Search', icon: Search, color: '#c2c2ff' },
    { name: 'Model Estimation', icon: Layers, color: '#b8b8ff' },
    { name: 'Model Diagnostics', icon: Filter, color: '#adadff' },
    { name: 'Forecasting', icon: ArrowRight, color: '#a3a3ff' },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0);
      setIterations(iterations + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(steps.length - 1);
      setIterations(Math.max(1, iterations - 1));
    }
  };

  const getStepVisualization = (step, iterations) => {
    const width = 400;
    const height = 300;
    const visualizations = [
      // Data Input
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Time Series Data</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        <text x="30" y="150" textAnchor="middle" fill="#333" fontSize="14" transform="rotate(-90 30 150)">Value</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          const x = 70 + i * 30;
          const y = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#2196F3" />
              {i < 9 && <line x1={x} y1={y} x2={x + 30} y2={250 - (Math.sin((i + 1) * 0.5) * 100 + Math.random() * 30)} stroke="#2196F3" strokeWidth="2" />}
            </g>
          );
        })}
      </svg>,

      // Stationarity Test
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Stationarity Test</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <path d="M50,200 Q200,100 350,150" fill="none" stroke="#2196F3" strokeWidth="2" />
        <line x1="50" y1="150" x2="350" y2="150" stroke="#FF9800" strokeWidth="2" strokeDasharray="5,5" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        <text x="200" y="70" textAnchor="middle" fill="#333" fontSize="14">ADF Test / KPSS Test</text>
      </svg>,

      // Differencing
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Differencing</text>
        <line x1="50" y1="125" x2="350" y2="125" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="125" x2="50" y2="25" stroke="#333" strokeWidth="2" />
        <path d="M50,75 Q200,25 350,75" fill="none" stroke="#2196F3" strokeWidth="2" />
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="150" stroke="#333" strokeWidth="2" />
        <path d="M50,200 Q200,150 350,200" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <text x="200" y="140" textAnchor="middle" fill="#333" fontSize="14">Original Series</text>
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">Differenced Series</text>
      </svg>,

      // ACF/PACF Analysis
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">ACF/PACF Analysis</text>
        <line x1="50" y1="125" x2="350" y2="125" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="125" x2="50" y2="25" stroke="#333" strokeWidth="2" />
        <text x="30" y="75" textAnchor="end" fill="#333" fontSize="12">ACF</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <line key={i} x1={70 + i * 30} y1="125" x2={70 + i * 30} y2={125 - Math.random() * 80} stroke="#2196F3" strokeWidth="2" />
        ))}
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="150" stroke="#333" strokeWidth="2" />
        <text x="30" y="200" textAnchor="end" fill="#333" fontSize="12">PACF</text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <line key={i} x1={70 + i * 30} y1="250" x2={70 + i * 30} y2={250 - Math.random() * 80} stroke="#4CAF50" strokeWidth="2" />
        ))}
      </svg>,

      // Grid Search
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Grid Search</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">ARIMA(p,d,q) Models</text>
        {['p: [0, 1, 2, 3]', 'd: [0, 1, 2]', 'q: [0, 1, 2, 3]'].map((param, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 40} width="260" height="30" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={120 + i * 40} textAnchor="middle" fill="#333" fontSize="12">{param}</text>
          </g>
        ))}
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">Select Best AIC/BIC</text>
      </svg>,

      // Model Estimation
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Model Estimation</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">ARIMA(p,d,q) Parameters</text>
        {['AR parameters (φ)', 'MA parameters (θ)', 'Intercept (c)'].map((param, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 40} width="260" height="30" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={120 + i * 40} textAnchor="middle" fill="#333" fontSize="12">{param}</text>
          </g>
        ))}
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">Maximum Likelihood Estimation</text>
      </svg>,

      // Model Diagnostics
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Model Diagnostics</text>
        <rect x="50" y="50" width="140" height="100" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="120" y="70" textAnchor="middle" fill="#333" fontSize="12">Residual Plot</text>
        <path d="M60,120 Q95,90 130,120" fill="none" stroke="#2196F3" strokeWidth="2" />
        <rect x="210" y="50" width="140" height="100" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="280" y="70" textAnchor="middle" fill="#333" fontSize="12">Q-Q Plot</text>
        <line x1="220" y1="140" x2="340" y2="60" stroke="#4CAF50" strokeWidth="2" />
        <rect x="50" y="170" width="140" height="100" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="120" y="190" textAnchor="middle" fill="#333" fontSize="12">ACF of Residuals</text>
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1={60 + i * 30} y1="260" x2={60 + i * 30} y2={260 - Math.random() * 60} stroke="#FF9800" strokeWidth="2" />
        ))}
        <rect x="210" y="170" width="140" height="100" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="280" y="190" textAnchor="middle" fill="#333" fontSize="12">Ljung-Box Test</text>
        <text x="280" y="230" textAnchor="middle" fill="#333" fontSize="14">p-value {'>'} 0.05</text>
      </svg>,

      // Forecasting
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Forecasting</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => {
          const x = 70 + i * 30;
          const y = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#2196F3" />
              <line x1={x} y1={y} x2={x + 30} y2={250 - (Math.sin((i + 1) * 0.5) * 100 + Math.random() * 30)} stroke="#2196F3" strokeWidth="2" />
            </g>
          );
        })}
        <path d="M280,150 Q310,120 340,140" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <path d="M280,120 Q310,90 340,110" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M280,180 Q310,150 340,170" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
        <text x="310" y="100" fill="#4CAF50" fontSize="12">Forecast</text>
        <text x="310" y="220" fill="#4CAF50" fontSize="12">Confidence Interval</text>
      </svg>
    ];
    return visualizations[step];
  };

  const getStepDescription = (step, iterations) => {
    const descriptions = [
      `Loading time series data for analysis. This step involves preparing the dataset, checking for missing values, and ensuring the data is in the correct format for ARIMA modeling.`,
      `Performing stationarity tests such as the Augmented Dickey-Fuller (ADF) test or the Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test. Stationarity is a key assumption for ARIMA models.`,
      `If the series is non-stationary, differencing is applied to make it stationary. The number of differencing operations determines the 'd' parameter in ARIMA(p,d,q).`,
      `Analyzing the Autocorrelation Function (ACF) and Partial Autocorrelation Function (PACF) plots to get initial estimates for the 'p' and 'q' parameters of the ARIMA model.`,
      `Conducting a grid search over a range of p, d, and q values to find the best combination. The search is typically guided by information criteria such as AIC (Akaike Information Criterion) or BIC (Bayesian Information Criterion).`,
      `Estimating the parameters of the selected ARIMA model using maximum likelihood estimation. This includes AR coefficients, MA coefficients, and the intercept term.`,
      `Performing diagnostic checks on the fitted model. This includes analyzing residuals for autocorrelation, normality, and homoscedasticity. The Ljung-Box test is often used to check for residual autocorrelation.`,
      `Using the fitted ARIMA model to make forecasts. This step also involves calculating confidence intervals for the forecasts to quantify uncertainty.`
    ];
    return `Iteration ${iterations}: ${descriptions[step]}`;
  };

  const getStepMathConcept = (step) => {
    const concepts = [
      `Time series: Y_t = {y_1, y_2, ..., y_n}`,
      `Stationarity tests:
       ADF test: ΔY_t = α + βt + γY_{t-1} + δ_1ΔY_{t-1} + ... + δ_pΔY_{t-p} + ε_t
       KPSS test: Y_t = ξt + r_t + ε_t`,
      `Differencing: ΔY_t = Y_t - Y_{t-1}
       d-th order differencing: Δ^d Y_t`,
      `ACF: ρ_k = Cov(Y_t, Y_{t+k}) / Var(Y_t)
       PACF: φ_kk = Corr(Y_t, Y_{t+k} | Y_{t+1}, ..., Y_{t+k-1})`,
      `ARIMA(p,d,q) model:
       (1 - φ_1B - ... - φ_pB^p)(1 - B)^d Y_t = c + (1 + θ_1B + ... + θ_qB^q)ε_t
       AIC = 2k - 2ln(L), BIC = kln(n) - 2ln(L)`,
      `Maximum Likelihood Estimation:
       L(φ, θ, σ^2) = (2πσ^2)^(-n/2) exp(-Σε_t^2 / (2σ^2))`,
      `Ljung-Box test:
       Q = n(n+2) Σ_(k=1)^h (ρ^2_k / (n-k))`,
      `Forecast:
       Ŷ_{n+h} = E[Y_{n+h} | Y_1, ..., Y_n]
       Confidence Interval: Ŷ_{n+h} ± z_{α/2} * √Var(e_{n+h})`
    ];
    return concepts[step];
  };

  const getStepTooltip = (step) => {
    const tooltips = [
      "Prepare and load the time series data for analysis.",
      "Check if the time series is stationary, a key assumption for ARIMA models.",
      "Make the time series stationary through differencing if necessary.",
      "Analyze autocorrelation and partial autocorrelation to determine model order.",
      "Search for the best combination of p, d, and q parameters for the ARIMA model.",
      "Estimate the coefficients of the selected ARIMA model.",
      "Check the model's residuals for any remaining patterns or autocorrelation.",
      "Use the fitted model to make forecasts and calculate prediction intervals."
    ];
    return tooltips[step];
  };

  const getRelevantMathTerms = (step) => {
    const allTerms = {
      'Y_t': 'Time series value at time t',
      'ΔY_t': 'First difference of Y at time t',
      'Δ^d': 'd-th order differencing',
      'ρ_k': 'Autocorrelation at lag k',
      'φ_kk': 'Partial autocorrelation at lag k',
      'p': 'Order of the autoregressive term',
      'd': 'Degree of differencing',
      'q': 'Order of the moving average term',
      'φ': 'Autoregressive coefficients',
      'θ': 'Moving average coefficients',
      'ε_t': 'Error term at time t',
      'L': 'Likelihood function',
      'AIC': 'Akaike Information Criterion',
      'BIC': 'Bayesian Information Criterion',
      'Ŷ': 'Forecasted value'
    };

    const relevantTerms = {
      0: ['Y_t'],
      1: ['Y_t', 'ΔY_t'],
      2: ['ΔY_t', 'Δ^d'],
      3: ['ρ_k', 'φ_kk'],
      4: ['p', 'd', 'q', 'AIC', 'BIC'],
      5: ['φ', 'θ', 'ε_t', 'L'],
      6: ['ε_t'],
      7: ['Ŷ']
    };

    return Object.fromEntries(
      Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
    );
  };

  const getLearnMoreLink = (step) => {
    const links = [
      "https://otexts.com/fpp3/arima.html",
      "https://otexts.com/fpp3/stationarity.html",
      "https://otexts.com/fpp3/differencing.html",
      "https://otexts.com/fpp3/acf.html",
      "https://otexts.com/fpp3/arima-estimation.html",
      "https://otexts.com/fpp3/arima-estimation.html#maximum-likelihood-estimation",
      "https://otexts.com/fpp3/arima-diagnostics.html",
      "https://otexts.com/fpp3/arima-forecasting.html"
    ];
    return links[step];
  };

  const MathKey = ({ step }) => {
    const relevantTerms = getRelevantMathTerms(step);
    
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
        <h4 className="text-lg font-semibold mb-2">Mathematical Terms Key:</h4>
        <ul className="list-none pl-0">
          {Object.entries(relevantTerms).map(([term, description]) => (
            <li key={term} className="mb-1 relative group">
              <span className="font-mono">{term}</span> : {description}
              <span className="invisible group-hover:visible absolute left-0 top-full mt-1 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
                {description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Auto ARIMA Interactive Visualization</h2>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Previous Step
        </button>
        <div className="text-xl font-semibold">Iteration: {iterations}</div>
        <button 
          onClick={handleNextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Next Step
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                index === activeStep ? 'ring-4 ring-blue-500 shadow-lg' : 'opacity-60'
              }`}
              style={{ backgroundColor: step.color }}
              onClick={() => setActiveStep(index)}
            >
              <Icon className="w-10 h-10 mb-2" />
              <p className="text-sm font-semibold">{step.name}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <h3 className="text-2xl font-bold mb-4">{steps[activeStep].name}</h3>
        <div className="mb-4 flex justify-center" key={animationKey}>
          {getStepVisualization(activeStep, iterations)}
        </div>
        <div className="text-left">
          <p className="text-gray-700 mb-4">
            {getStepDescription(activeStep, iterations)}
          </p>
          <div className="mt-4">
            <button
              onClick={() => setShowMathDetails(!showMathDetails)}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              {showMathDetails ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
              {showMathDetails ? "Hide Mathematical Details" : "Show Mathematical Details"}
            </button>
          </div>
          {showMathDetails && (
            <>
              <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Mathematical Concept:</h4>
                <pre className="font-mono text-sm whitespace-pre-wrap">{getStepMathConcept(activeStep)}</pre>
              </div>
              <MathKey step={activeStep} />
            </>
          )}
        </div>
        <div className="mt-4">
          <a
            href={getLearnMoreLink(activeStep)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Learn More <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
        <div 
          className="absolute top-4 right-4 cursor-pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <HelpCircle className="w-6 h-6 text-blue-500" />
        </div>
        {showTooltip && (
          <div className="absolute top-12 right-4 bg-blue-100 p-4 rounded-lg shadow-md max-w-xs">
            {getStepTooltip(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoARIMAVisualization;
