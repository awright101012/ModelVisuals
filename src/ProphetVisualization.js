import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, ArrowRight, CheckCircle, HelpCircle, RefreshCcw, GitMerge, Layers, ChevronDown, ChevronUp, ExternalLink, Calendar, Shuffle } from 'lucide-react';

const ProphetVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [showMathDetails, setShowMathDetails] = useState(false);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeStep]);

  const steps = [
    { name: 'Data Input', icon: BarChart2, color: '#f0f0ff' },
    { name: 'Decomposition', icon: Layers, color: '#e6e6ff' },
    { name: 'Trend Modeling', icon: TrendingUp, color: '#d9d9ff' },
    { name: 'Seasonality', icon: Calendar, color: '#ccccff' },
    { name: 'Holiday Effects', icon: Calendar, color: '#c2c2ff' },
    { name: 'Additional Regressors', icon: Layers, color: '#b8b8ff' },
    { name: 'Parameter Optimization', icon: Shuffle, color: '#adadff' },
    { name: 'Model Fitting', icon: GitMerge, color: '#a3a3ff' },
    { name: 'Forecasting', icon: ArrowRight, color: '#9999ff' },
    { name: 'Uncertainty Estimation', icon: RefreshCcw, color: '#8f8fff' },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(0);
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(steps.length - 1);
    }
  };

  const getStepVisualization = (step) => {
    const width = 400;
    const height = 300;
    const visualizations = [
      // Data Input
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Time Series Data</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time (ds)</text>
        <text x="30" y="150" textAnchor="middle" fill="#333" fontSize="14" transform="rotate(-90 30 150)">Value (y)</text>
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

      // Decomposition
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Decomposition</text>
        <line x1="50" y1="70" x2="350" y2="70" stroke="#333" strokeWidth="2" />
        <text x="30" y="75" textAnchor="end" fill="#333" fontSize="12">y(t)</text>
        <path d="M50,70 Q200,20 350,70" fill="none" stroke="#2196F3" strokeWidth="2" />
        <line x1="50" y1="140" x2="350" y2="140" stroke="#333" strokeWidth="2" />
        <text x="30" y="145" textAnchor="end" fill="#333" fontSize="12">g(t)</text>
        <path d="M50,140 Q200,110 350,170" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <line x1="50" y1="210" x2="350" y2="210" stroke="#333" strokeWidth="2" />
        <text x="30" y="215" textAnchor="end" fill="#333" fontSize="12">s(t)</text>
        <path d="M50,210 Q125,180 200,210 T350,210" fill="none" stroke="#FFA000" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">y(t) = g(t) + s(t) + h(t) + ε(t)</text>
      </svg>,

      // Trend Modeling
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Trend Modeling</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <path d="M50,200 Q200,100 350,150" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        <text x="200" y="70" textAnchor="middle" fill="#4CAF50" fontSize="14">Trend Component g(t)</text>
        <text x="200" y="90" textAnchor="middle" fill="#333" fontSize="12">Linear or Logistic growth with changepoints</text>
      </svg>,

      // Seasonality
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Seasonality</text>
        <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" strokeWidth="2" />
        <path d="M50,150 Q125,100 200,150 T350,150" fill="none" stroke="#FF9800" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#FF9800" fontSize="14">Yearly Seasonality</text>
        <path d="M50,150 Q85,120 120,150 T190,150 T260,150 T330,150" fill="none" stroke="#2196F3" strokeWidth="2" />
        <text x="200" y="250" textAnchor="middle" fill="#2196F3" fontSize="14">Weekly Seasonality</text>
        <text x="200" y="70" textAnchor="middle" fill="#333" fontSize="12">s(t) = Σ[a_n * sin(2πnt/P) + b_n * cos(2πnt/P)]</text>
      </svg>,

      // Holiday Effects
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Holiday Effects</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => {
          const x = 70 + i * 60;
          const y = 250 - (Math.random() * 150);
          return (
            <g key={i}>
              <line x1={x} y1="250" x2={x} y2={y} stroke="#E91E63" strokeWidth="2" />
              <circle cx={x} cy={y} r="4" fill="#E91E63" />
              <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="12">H{i+1}</text>
            </g>
          );
        })}
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        <text x="200" y="70" textAnchor="middle" fill="#333" fontSize="12">h(t) = Z(t) ⋅ κ</text>
      </svg>,

      // Additional Regressors
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Additional Regressors</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">External Factors</text>
        {['Regressor 1', 'Regressor 2', 'Regressor 3'].map((reg, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 50} width="260" height="40" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={125 + i * 50} textAnchor="middle" fill="#333" fontSize="12">{reg}</text>
          </g>
        ))}
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="12">y(t) = g(t) + s(t) + h(t) + β ⋅ x(t) + ε(t)</text>
      </svg>,

      // Parameter Optimization
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Parameter Optimization</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">Random Search</text>
        {['changepoint_prior_scale', 'seasonality_prior_scale', 'holidays_prior_scale', 'seasonality_mode'].map((param, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 40} width="260" height="30" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={120 + i * 40} textAnchor="middle" fill="#333" fontSize="12">{param}</text>
          </g>
        ))}
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">Minimize MSE</text>
      </svg>,

      // Model Fitting
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Model Fitting</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">Components</text>
        {['Trend', 'Seasonality', 'Holidays', 'Regressors'].map((comp, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 40} width="260" height="30" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={120 + i * 40} textAnchor="middle" fill="#333" fontSize="12">{comp}</text>
          </g>
        ))}
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">MAP Estimation</text>
      </svg>,

      // Forecasting
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Forecasting</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
          const x = 70 + i * 30;
          const y = i < 7 ? 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30) : null;
          return (
            <g key={i}>
              {y && <circle cx={x} cy={y} r="3" fill="#2196F3" />}
              {i < 6 && y && <line x1={x} y1={y} x2={x + 30} y2={250 - (Math.sin((i + 1) * 0.5) * 100 + Math.random() * 30)} stroke="#2196F3" strokeWidth="2" />}
            </g>
          );
        })}
        <path d="M280,150 Q310,120 340,140" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <text x="310" y="100" fill="#4CAF50" fontSize="12">Forecast</text>
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="12">ŷ(t) = g(t) + s(t) + h(t) + β ⋅ x(t)</text>
      </svg>,

      // Uncertainty Estimation
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Uncertainty Estimation</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <path d="M50,200 Q200,100 350,150" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <path d="M50,220 Q200,120 350,170" fill="none" stroke="#4CAF50" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M50,180 Q200,80 350,130" fill="none" stroke="#4CAF50" strokeWidth="1" strokeOpacity="0.5" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        <text x="200" y="70" textAnchor="middle" fill="#4CAF50" fontSize="14">Forecast with Uncertainty</text>
        <text x="200" y="90" textAnchor="middle" fill="#333" fontSize="12">y(t) ~ Normal(ŷ(t), σ²)</text>
      </svg>
    ];
    return visualizations[step];
  };

  const getStepDescription = (step) => {
    const descriptions = [
      `Loading time series data with timestamps (ds) and target values (y). This step prepares the dataset for Prophet model training, ensuring the data is in the correct format with the required columns.`,
      `Breaking down the time series into its core components: trend, seasonality, holiday effects, and residuals. This decomposition allows Prophet to model each component separately and then combine them for the final forecast.`,
      `Modeling the overall trend in the data. Prophet uses a piecewise linear or logistic growth curve to capture changes in the trend over time, allowing for automatic changepoint detection and flexible trend fitting.`,
      `Capturing recurring patterns in the data, such as daily, weekly, or yearly seasonality. Prophet uses Fourier series to model multiple seasonal patterns simultaneously, allowing for complex seasonality modeling.`,
      `Incorporating holiday effects into the model. This allows Prophet to account for irregular events that may impact the time series, such as national holidays or company-specific events.`,
      `Adding external regressors or additional features that might influence the time series. This can include both time-varying and static features, allowing the model to capture effects beyond the core time series components.`,
      `Performing random search to find optimal hyperparameters for the Prophet model. This step optimizes key parameters like changepoint_prior_scale, seasonality_prior_scale, and holidays_prior_scale to improve model performance.`,
      `Combining all components (trend, seasonality, holidays, and regressors) to create the final model. Prophet uses a decomposable time series model and fits it using MAP (Maximum A Posteriori) estimation.`,
      `Generating forecasts for future time periods using the trained model. This combines all learned components to produce the final prediction, extrapolating the trend and seasonal patterns into the future.`,
      `Estimating uncertainty in the forecasts. Prophet provides uncertainty intervals by simulating many possible futures based on the model's components, accounting for variability in each part of the model.`
    ];
    return descriptions[step];
  };

  const getStepMathConcept = (step) => {
    const concepts = [
      `Time series: y(t) = g(t) + s(t) + h(t) + ε(t)
       where g(t) is the trend, s(t) is seasonality, h(t) is holiday effect, and ε(t) is error term`,
      `Decomposition: y(t) = g(t) + s(t) + h(t) + ε(t)
       Each component is modeled separately and then combined`,
      `Trend: g(t) = (k + a(t)⋅t + (k + a(t)⋅t) ⋅ s(t))
       where k is the growth rate, a(t) is the rate adjustments`,
      `Seasonality: s(t) = Σ[a_n * sin(2πnt/P) + b_n * cos(2πnt/P)]
       where P is the period, n is the Fourier order`,
      `Holiday effect: h(t) = Z(t) ⋅ κ
       where Z(t) is the indicator function, κ is the holiday effect`,
      `Regressors: y(t) = g(t) + s(t) + h(t) + β ⋅ x(t) + ε(t)
       where x(t) are the regressors, β are the coefficients`,
      `Hyperparameter optimization:
       Best model = argmin(MSE(model | hyperparameters))
       MSE = (1/n) * Σ(y - ŷ)²`,
      `Full model: y(t) = g(t) + s(t) + h(t) + β ⋅ x(t) + ε(t)
       Fit using MAP (Maximum A Posteriori) estimation`,
      `Forecast: ŷ(t) = g(t) + s(t) + h(t) + β ⋅ x(t)
       for t in future time points`,
      `Uncertainty: y(t) ~ Normal(ŷ(t), σ²)
       Uncertainty intervals via Monte Carlo simulation`
    ];
    return concepts[step];
  };

  const getStepTooltip = (step) => {
    const tooltips = [
      "The input data for Prophet consists of a dataframe with 'ds' (date) and 'y' (target variable) columns.",
      "Prophet breaks down the time series into its core components: trend, seasonality, holiday effects, and residuals.",
      "The trend component captures the non-periodic changes in the time series.",
      "Seasonality represents the periodic patterns in the data, such as daily, weekly, or yearly cycles.",
      "Holiday effects allow the model to account for irregular events that impact the time series.",
      "Additional regressors can be included to capture external factors affecting the time series.",
      "Prophet uses random search to optimize its hyperparameters for better model performance.",
      "Prophet combines all components into a single, coherent model.",
      "Forecasting extends the model's predictions into the future time periods.",
      "Uncertainty estimation provides a range of possible future values, not just point estimates."
    ];
    return tooltips[step];
  };

  const getRelevantMathTerms = (step) => {
    const allTerms = {
      'y(t)': 'Time series value at time t',
      'g(t)': 'Trend component',
      's(t)': 'Seasonality component',
      'h(t)': 'Holiday effect component',
      'ε(t)': 'Error term',
      'MSE': 'Mean Squared Error',
      'k': 'Growth rate',
      'a(t)': 'Rate adjustments',
      'P': 'Period of seasonality',
      'Z(t)': 'Holiday indicator function',
      'κ': 'Holiday effect magnitude',
      'β': 'Regressor coefficients',
      'x(t)': 'Additional regressors',
      'ŷ(t)': 'Forecasted value at time t',
      'σ²': 'Variance of the error term'
    };

    const relevantTerms = {
      0: ['y(t)', 'g(t)', 's(t)', 'h(t)', 'ε(t)'],
      1: ['y(t)', 'g(t)', 's(t)', 'h(t)', 'ε(t)'],
      2: ['g(t)', 'k', 'a(t)'],
      3: ['s(t)', 'P'],
      4: ['h(t)', 'Z(t)', 'κ'],
      5: ['β', 'x(t)'],
      6: ['MSE'],
      7: ['y(t)', 'g(t)', 's(t)', 'h(t)', 'β', 'x(t)', 'ε(t)'],
      8: ['ŷ(t)', 'g(t)', 's(t)', 'h(t)', 'β', 'x(t)'],
      9: ['y(t)', 'ŷ(t)', 'σ²']
    };

    return Object.fromEntries(
      Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
    );
  };

  const getLearnMoreLink = (step) => {
    const links = [
      "https://facebook.github.io/prophet/docs/quick_start.html#python-api",
      "https://facebook.github.io/prophet/docs/diagnostics.html#hyperparameter-tuning",
      "https://facebook.github.io/prophet/docs/trend_changepoints.html",
      "https://facebook.github.io/prophet/docs/seasonality,_holiday_effects,_and_regressors.html#seasonality",
      "https://facebook.github.io/prophet/docs/seasonality,_holiday_effects,_and_regressors.html#holidays-and-special-events",
      "https://facebook.github.io/prophet/docs/seasonality,_holiday_effects,_and_regressors.html#additional-regressors",
      "https://facebook.github.io/prophet/docs/prophet_func.html#the-prophet-function",
      "https://facebook.github.io/prophet/docs/quick_start.html#python-api",
      "https://facebook.github.io/prophet/docs/uncertainty_intervals.html"
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
      <h2 className="text-3xl font-bold mb-6 text-center">Facebook Prophet Interactive Visualization</h2>
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={handlePrevStep}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Previous Step
        </button>
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
          {getStepVisualization(activeStep)}
        </div>
        <div className="text-left">
          <p className="text-gray-700 mb-4">
            {getStepDescription(activeStep)}
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

export default ProphetVisualization;