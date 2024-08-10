import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, ArrowRight, CheckCircle, HelpCircle, RefreshCcw, GitMerge, Layers, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const ExponentialSmoothingVisualization = () => {
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
    { name: 'Parameter Optimization', icon: Layers, color: '#e6e6ff' },
    { name: 'Initial Forecast', icon: TrendingUp, color: '#d9d9ff' },
    { name: 'Calculate Error', icon: RefreshCcw, color: '#ccccff' },
    { name: 'Update Forecast', icon: GitMerge, color: '#c2c2ff' },
    { name: 'Handle Trend & Seasonality', icon: Layers, color: '#b8b8ff' },
    { name: 'Iterate Process', icon: ArrowRight, color: '#adadff' },
    { name: 'Final Forecast', icon: CheckCircle, color: '#a3a3ff' },
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

      // Parameter Optimization
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Parameter Optimization</text>
        <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">Grid Search</text>
        {['Trend', 'Seasonality', 'Damping', 'Period'].map((param, i) => (
          <g key={i}>
            <rect x="70" y={100 + i * 40} width="260" height="30" fill="#e6e6e6" stroke="#333" strokeWidth="1" />
            <text x="200" y={120 + i * 40} textAnchor="middle" fill="#333" fontSize="12">{param}</text>
          </g>
        ))}
        <text x="200" y="270" textAnchor="middle" fill="#333" fontSize="14">Select Best AIC</text>
      </svg>,

      // Initial Forecast
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Initial Forecast</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => {
          const x = 70 + i * 60;
          const y = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#2196F3" />
              <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
            </g>
          );
        })}
        <line x1="70" y1="150" x2="310" y2="150" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
        <text x="330" y="155" fill="#4CAF50" fontSize="12">F₁</text>
      </svg>,

      // Calculate Error
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Calculate Error</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => {
          const x = 70 + i * 60;
          const y1 = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
          const y2 = 150;
          return (
            <g key={i}>
              <circle cx={x} cy={y1} r="3" fill="#2196F3" />
              <text x={x} y={y1 - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
              <line x1={x} y1={y1} x2={x} y2={y2} stroke="#ff0000" strokeWidth="2" strokeDasharray="4,4" />
              <text x={x + 5} y={(y1 + y2) / 2} textAnchor="start" fill="#ff0000" fontSize="12">e{i+1}</text>
            </g>
          );
        })}
        <line x1="70" y1="150" x2="310" y2="150" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
        <text x="330" y="155" fill="#4CAF50" fontSize="12">F₁</text>
      </svg>,

      // Update Forecast
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Update Forecast</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => {
          const x = 70 + i * 60;
          const y1 = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
          const y2 = 250 - (Math.sin(i * 0.5) * 90 + Math.random() * 20);
          const y3 = (y1 * 0.7 + y2 * 0.3); // Weighted average
          return (
            <g key={i}>
              <circle cx={x} cy={y1} r="3" fill="#2196F3" />
              <text x={x} y={y1 - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
              <circle cx={x} cy={y2} r="3" fill="#4CAF50" />
              <text x={x} y={y2 + 15} textAnchor="middle" fill="#4CAF50" fontSize="12">F{i+1}</text>
              <circle cx={x} cy={y3} r="3" fill="#FFA000" />
              <text x={x} y={y3 + 15} textAnchor="middle" fill="#FFA000" fontSize="12">U{i+1}</text>
              <line x1={x} y1={y1} x2={x} y2={y3} stroke="#FFA000" strokeWidth="1" strokeDasharray="2,2" />
              <line x1={x} y1={y2} x2={x} y2={y3} stroke="#FFA000" strokeWidth="1" strokeDasharray="2,2" />
            </g>
          );
        })}
        <text x="200" y="290" textAnchor="middle" fill="#333" fontSize="14">U = αY + (1-α)F</text>
      </svg>,

      // Handle Trend & Seasonality
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Handle Trend & Seasonality</text>
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <path d="M50,200 Q200,100 350,200" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fill="#4CAF50" fontSize="14">Trend</text>
        <path d="M50,250 Q125,200 200,250 T350,250" fill="none" stroke="#2196F3" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#2196F3" fontSize="14">Seasonality</text>
      </svg>,

      // Iterate Process
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Iterate Process</text>
        
        {/* Time axis */}
        <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
        <text x="200" y="280" textAnchor="middle" fill="#333" fontSize="14">Time</text>
        
        {/* Value axis */}
        <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <text x="30" y="150" textAnchor="middle" fill="#333" fontSize="14" transform="rotate(-90 30 150)">Value</text>
        
        {/* Data points and forecasts */}
        {[0, 1, 2, 3, 4].map(i => {
          const x = 70 + i * 60;
          const y1 = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30); // Actual value
          const y2 = 250 - (Math.sin(i * 0.5) * 90 + Math.random() * 20);  // Initial forecast
          const y3 = (y1 * 0.7 + y2 * 0.3); // Updated forecast
          return (
            <g key={i}>
              <circle cx={x} cy={y1} r="4" fill="#2196F3" />
              <text x={x} y={y1 - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
              <circle cx={x} cy={y2} r="4" fill="#4CAF50" />
              <text x={x} y={y2 + 15} textAnchor="middle" fill="#4CAF50" fontSize="12">F{i+1}</text>
              <circle cx={x} cy={y3} r="4" fill="#FFA000" />
              <text x={x} y={y3 + 15} textAnchor="middle" fill="#FFA000" fontSize="12">U{i+1}</text>
              
              {/* Error lines */}
              <line x1={x} y1={y1} x2={x} y2={y2} stroke="#FF5722" strokeWidth="2" strokeDasharray="4,4" />
              <text x={x + 5} y={(y1 + y2) / 2} textAnchor="start" fill="#FF5722" fontSize="12">e{i+1}</text>
              
              {/* Update arrows */}
              <path d={`M${x},${y2} Q${x+20},${(y2+y3)/2} ${x},${y3}`} fill="none" stroke="#9C27B0" strokeWidth="2" markerEnd="url(#arrowhead)" />
            </g>
          );
        })}
        
        {/* Arrow marker definition */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#9C27B0" />
          </marker>
        </defs>
        
        {/* Legend */}
        <rect x="50" y="290" width="300" height="60" fill="#f5f5f5" stroke="#333" strokeWidth="1" />
        <circle cx="70" cy="305" r="4" fill="#2196F3" />
        <text x="80" y="310" fill="#333" fontSize="12">Actual Value (Y)</text>
        <circle cx="70" cy="325" r="4" fill="#4CAF50" />
        <text x="80" y="330" fill="#333" fontSize="12">Initial Forecast (F)</text>
        <circle cx="70" cy="345" r="4" fill="#FFA000" />
        <text x="80" y="350" fill="#333" fontSize="12">Updated Forecast (U)</text>
        <line x="200" y1="305" x2="200" y2="325" stroke="#FF5722" strokeWidth="2" strokeDasharray="4,4" />
        <text x="210" y="320" fill="#333" fontSize="12">Error (e)</text>
        <path d="M270,315 Q290,315 270,335" fill="none" stroke="#9C27B0" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="280" y="340" fill="#333" fontSize="12">Update</text>
      </svg>,

      // Final Forecast
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Final Forecast</text>
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
      </svg>
    ];
    return visualizations[step];
  };

  const getStepDescription = (step, iterations) => {
    const descriptions = [
      `Loading time series data with timestamps and corresponding values. This step prepares the dataset for analysis and forecasting.`,
      `Performing grid search to find optimal parameters for the model, including trend type, seasonality, damping factor, and seasonal period. The best model is selected based on the Akaike Information Criterion (AIC).`,
      `Making an initial forecast using the selected model configuration. This provides a starting point for the iterative process.`,
      `Calculating the error between the actual value and the forecast. This error will be used to update future forecasts.`,
      `Updating the forecast using a weighted average of the previous forecast and the most recent observation. The weight is determined by the smoothing parameter α. This step demonstrates the 'exponential' nature of the method, as it gives more weight to recent observations.`,
      `Incorporating trend and seasonality components based on the optimized model configuration. This may include additive or multiplicative trends and seasonality.`,
      `Iterating the exponential smoothing process over multiple time steps. For each step, we calculate the forecast error, update the forecast using the smoothing equations, and prepare for the next time step. This process continues for all available data points, continuously refining the model's parameters and improving forecast accuracy.`,
      `Generating the final forecast for future time periods using the trained model, incorporating all learned components (level, trend, and seasonality).`
    ];
    return `Iteration ${iterations}: ${descriptions[step]}`;
  };

  const getStepMathConcept = (step) => {
    const concepts = [
      `Time series: Y = {y₁, y₂, ..., yₙ}
       where yₜ is the observation at time t`,
      `Model Selection: min(AIC) = 2k - 2ln(L)
       where k is the number of parameters and L is the likelihood`,
      `Initial forecast: F₁ = l₀ + b₀ + s₀
       where l₀ is initial level, b₀ is initial trend, s₀ is initial seasonal component`,
      `Forecast error: eₜ = yₜ - Fₜ`,
      `Updated forecast: 
       Simple Exponential Smoothing: Fₜ₊₁ = αyₜ + (1 - α)Fₜ
       where α is the smoothing parameter (0 < α < 1)
       
       For models with trend and seasonality:
       Level: lₜ = α(yₜ - sₜ₋ₘ) + (1 - α)(lₜ₋₁ + bₜ₋₁)
       Trend: bₜ = β(lₜ - lₜ₋₁) + (1 - β)bₜ₋₁
       Seasonal: sₜ = γ(yₜ - lₜ) + (1 - γ)sₜ₋ₘ
       where β and γ are additional smoothing parameters`,
      `Trend types: Additive: lₜ + bₜ, Multiplicative: lₜ * bₜ
       Seasonality types: Additive: + sₜ, Multiplicative: * sₜ`,
      `Iterative process:
       For t = 1 to n:
         Fₜ = lₜ₋₁ + bₜ₋₁ + sₜ₋ₘ (for additive model)
         Update l, b, s`,
      `Final forecast:
       For h steps ahead:
       Fₙ₊ₕ = lₙ + hbₙ + sₙ₊ₕ₋ₘ (for additive model)
       where n is the last observed time point, m is the seasonal period`
    ];
    return concepts[step];
  };

  const getStepTooltip = (step) => {
    const tooltips = [
      "Time series data consists of a sequence of observations indexed in time order.",
      "The grid search helps find the best combination of parameters for the model.",
      "The initial forecast provides a starting point for the exponential smoothing process.",
      "The forecast error measures the difference between the actual and predicted values.",
      "The forecast is updated by combining the previous forecast and the most recent observation.",
      "Trend and seasonality components capture long-term progression and recurring patterns in the data.",
      "The process iterates through all time points, continuously updating the forecast.",
      "The final forecast extends the model's predictions into the future."
    ];
    return tooltips[step];
  };

  const getRelevantMathTerms = (step) => {
    const allTerms = {
      'Y': 'Time series data',
      'yₜ': 'Observation at time t',
      'AIC': 'Akaike Information Criterion',
      'L': 'Likelihood of the model',
      'Fₜ': 'Forecast at time t',
      'lₜ': 'Level component at time t',
      'bₜ': 'Trend component at time t',
      'sₜ': 'Seasonal component at time t',
      'eₜ': 'Forecast error at time t',
      'α': 'Smoothing parameter for level',
      'β': 'Smoothing parameter for trend',
      'γ': 'Smoothing parameter for seasonality',
      'm': 'Seasonal period',
      'n': 'Number of observations',
      'h': 'Forecast horizon'
    };

    const relevantTerms = {
      0: ['Y', 'yₜ'],
      1: ['AIC', 'L'],
      2: ['Fₜ', 'lₜ', 'bₜ', 'sₜ'],
      3: ['eₜ', 'yₜ', 'Fₜ'],
      4: ['lₜ', 'bₜ', 'sₜ', 'α', 'β', 'γ'],
      5: ['lₜ', 'bₜ', 'sₜ'],
      6: ['Fₜ', 'lₜ', 'bₜ', 'sₜ'],
      7: ['Fₜ', 'lₜ', 'bₜ', 'sₜ', 'n', 'h', 'm']
    };

    return Object.fromEntries(
      Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
    );
  };

  const getLearnMoreLink = (step) => {
    const links = [
      "https://otexts.com/fpp3/ts-objects.html",
      "https://otexts.com/fpp3/expsmooth.html#ets-models",
      "https://otexts.com/fpp3/ses.html",
      "https://otexts.com/fpp3/ses.html#ses-intervals",
      "https://otexts.com/fpp3/ses.html#ses-estimation",
      "https://otexts.com/fpp3/taxonomy.html",
      "https://otexts.com/fpp3/ses.html#ses-estimation",
      "https://otexts.com/fpp3/forecasting.html#forecasting-using-ets-models"
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
      <h2 className="text-3xl font-bold mb-6 text-center">Exponential Smoothing Interactive Visualization</h2>
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

export default ExponentialSmoothingVisualization;