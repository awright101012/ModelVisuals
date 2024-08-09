import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, RefreshCcw, GitMerge, ArrowRight, CheckCircle, HelpCircle, Layers } from 'lucide-react';

const NeuralProphetVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [iterations, setIterations] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeStep, iterations]);

  const steps = [
    { name: 'Time Series Input', icon: BarChart2, color: '#f0f0ff' },
    { name: 'Trend Modeling', icon: TrendingUp, color: '#e6e6ff' },
    { name: 'Seasonality', icon: RefreshCcw, color: '#d9d9ff' },
    { name: 'Auto-Regression', icon: GitMerge, color: '#ccccff' },
    { name: 'Covariates', icon: Layers, color: '#c2c2ff' },
    { name: 'Neural Network', icon: Layers, color: '#b8b8ff' },
    { name: 'Training', icon: ArrowRight, color: '#adadff' },
    { name: 'Forecasting', icon: CheckCircle, color: '#a3a3ff' },
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

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Neural Prophet Interactive Visualization</h2>
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
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Mathematical Concept:</h4>
            <pre className="font-mono text-sm whitespace-pre-wrap">{getStepMathConcept(activeStep)}</pre>
          </div>
          <MathKey step={activeStep} />
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

const getStepVisualization = (step, iterations) => {
  const width = 400;
  const height = 300;
  const visualizations = [
    // Time Series Input
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Time Series Input</text>
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

    // Trend Modeling
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Trend Modeling</text>
      <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
        const x = 70 + i * 30;
        const y = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
        return <circle key={i} cx={x} cy={y} r="3" fill="#2196F3" />;
      })}
      <path d="M70,200 Q200,100 330,150" fill="none" stroke="#4CAF50" strokeWidth="2" />
      <text x="200" y="280" textAnchor="middle" fill="#4CAF50" fontSize="14">Trend Component</text>
    </svg>,

    // Seasonality
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Seasonality</text>
      <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" strokeWidth="2" />
      <path d="M50,150 Q125,100 200,150 T350,150" fill="none" stroke="#FF9800" strokeWidth="2" />
      <text x="200" y="280" textAnchor="middle" fill="#FF9800" fontSize="14">Seasonal Component</text>
      {[0, 1, 2, 3, 4].map(i => {
        const x = 50 + i * 75;
        return (
          <g key={i}>
            <line x1={x} y1="145" x2={x} y2="155" stroke="#333" strokeWidth="2" />
            <text x={x} y="170" textAnchor="middle" fill="#333" fontSize="12">Season {i+1}</text>
          </g>
        );
      })}
    </svg>,

    // Auto-Regression
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Auto-Regression</text>
      <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map(i => {
        const x1 = 70 + i * 60;
        const y1 = 250 - (Math.random() * 150);
        const x2 = x1 + 60;
        const y2 = 250 - (Math.random() * 150);
        return (
          <g key={i}>
            <circle cx={x1} cy={y1} r="3" fill="#2196F3" />
            <circle cx={x2} cy={y2} r="3" fill="#2196F3" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E91E63" strokeWidth="2" strokeDasharray="5,5" />
            <text x={(x1+x2)/2} y={(y1+y2)/2 - 10} textAnchor="middle" fill="#E91E63" fontSize="12">AR</text>
          </g>
        );
      })}
    </svg>,

    // Covariates
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Covariates</text>
      <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">Time Series</text>
      <line x1="60" y1="100" x2="340" y2="100" stroke="#333" strokeWidth="2" />
      <text x="200" y="130" textAnchor="middle" fill="#333" fontSize="14">Covariate 1</text>
      <line x1="60" y1="150" x2="340" y2="150" stroke="#333" strokeWidth="2" />
      <text x="200" y="180" textAnchor="middle" fill="#333" fontSize="14">Covariate 2</text>
      <line x1="60" y1="200" x2="340" y2="200" stroke="#333" strokeWidth="2" />
      <text x="200" y="230" textAnchor="middle" fill="#333" fontSize="14">Covariate 3</text>
    </svg>,

    // Neural Network
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Neural Network</text>
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <circle cx="50" cy={75 + i * 50} r="20" fill="#2196F3" />
          <text x="50" y={80 + i * 50} textAnchor="middle" fill="white" fontSize="12">I{i+1}</text>
        </g>
      ))}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <circle cx="200" cy={100 + i * 50} r="20" fill="#FF9800" />
          <text x="200" y={105 + i * 50} textAnchor="middle" fill="white" fontSize="12">H{i+1}</text>
        </g>
      ))}
      <circle cx="350" cy="150" r="20" fill="#4CAF50" />
      <text x="350" y="155" textAnchor="middle" fill="white" fontSize="12">O</text>
      {[0, 1, 2, 3].map(i => (
        [0, 1, 2].map(j => (
          <line key={`${i}-${j}`} x1="70" y1={75 + i * 50} x2="180" y2={100 + j * 50} stroke="#ccc" strokeWidth="1" />
        ))
      ))}
      {[0, 1, 2].map(i => (
        <line key={i} x1="220" y1={100 + i * 50} x2="330" y2="150" stroke="#ccc" strokeWidth="1" />
      ))}
    </svg>,

    // Training
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Training</text>
      <rect x="50" y="50" width="300" height="200" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <text x="200" y="80" textAnchor="middle" fill="#333" fontSize="14">Model</text>
      <line x1="60" y1="100" x2="340" y2="100" stroke="#333" strokeWidth="2" />
      <text x="200" y="130" textAnchor="middle" fill="#333" fontSize="14">Training Data</text>
      <line x1="60" y1="150" x2="340" y2="150" stroke="#333" strokeWidth="2" />
      <text x="200" y="180" textAnchor="middle" fill="#333" fontSize="14">Loss Function</text>
      <path d="M60,230 Q140,180 200,230 T340,230" fill="none" stroke="#E53E3E" strokeWidth="2" />
      <text x="200" y="260" textAnchor="middle" fill="#E53E3E" fontSize="12">Loss Curve</text>
    </svg>,

    // Forecasting
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Forecasting</text>
      <line x1="50" y1="250" x2="350" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="250" x2="50" y2="50" stroke="#333" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map(i => {
        const x = 70 + i * 40;
        const y = 250 - (Math.sin(i * 0.5) * 100 + Math.random() * 30);
        return <circle key={i} cx={x} cy={y} r="3" fill="#2196F3" />;
      })}
      <path d="M270,150 Q310,100 350,130" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="5,5" />
      <text x="310" y="80" textAnchor="middle" fill="#4CAF50" fontSize="14">Forecast</text>
      <line x1="270" y1="50" x2="270" y2="250" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
      <text x="270" y="270" textAnchor="middle" fill="#333" fontSize="12">Now</text>
    </svg>
  ];
  return visualizations[step];
};

const getStepDescription = (step, iterations) => {
  const descriptions = [
    `Loading time series data with timestamps and corresponding values. This step prepares the dataset for analysis and forecasting.`,
    `Modeling the overall trend in the data, which can be linear or non-linear. Neural Prophet uses a piecewise linear trend to capture changes over time.`,
    `Capturing recurring patterns in the data, such as daily, weekly, or yearly seasonality. Fourier series are used to model multiple seasonal patterns simultaneously.`,
    `Implementing auto-regression to learn from past values for future predictions. This allows the model to capture short-term dependencies in the time series.`,
    `Incorporating additional variables (covariates) that might influence the time series. This can include both time-varying and static features.`,
    `Processing all components through a feed-forward neural network for flexible and powerful forecasting. This allows for complex interactions between components.`,
    `Training the model on historical data, adjusting parameters to minimize prediction errors. Backpropagation is used to optimize the neural network weights.`,
    `Generating forecasts for future time periods using the trained model. This combines all learned components to produce the final prediction.`
  ];
  return `Iteration ${iterations}: ${descriptions[step]}`;
};

const getStepMathConcept = (step) => {
  const concepts = [
    `Time series: y(t) = f(t) + ε(t)
     where f(t) is the signal and ε(t) is noise`,
    `Trend: g(t) = (k(t) + a(t)⋅t + ∑offset(t))
     where k(t) is the base rate, a(t) is the growth rate`,
    `Seasonality: s(t) = ∑[a_n * sin(2πnt/P) + b_n * cos(2πnt/P)]
     where P is the period, n is the fourier order`,
    `Auto-regression: AR(p): y_t = c + ∑φ_i * y_{t-i} + ε_t
     where p is the order, φ_i are parameters`,
    `Covariates: y(t) = g(t) + s(t) + ∑β_i * x_i(t) + AR(p)
     where x_i are covariates, β_i are coefficients`,
    `Neural Network: h = σ(W_h * x + b_h)
                     y = W_o * h + b_o
     where σ is the activation function`,
    `Loss function: L = MSE(y_true, y_pred) + λ * R(θ)
     where R(θ) is the regularization term`,
    `Forecast: ŷ(t+h) = g(t+h) + s(t+h) + AR(t+h) + ∑β_i * x_i(t+h)
     where h is the forecast horizon`
  ];
  return concepts[step];
};

const getStepTooltip = (step) => {
  const tooltips = [
    "Time series data consists of a sequence of data points indexed in time order.",
    "The trend component captures the long-term progression of the time series.",
    "Seasonality refers to regular patterns that repeat over fixed intervals of time.",
    "Auto-regression uses lagged observations as input to predict future values.",
    "Covariates are external factors that can influence the time series.",
    "The neural network allows for complex, non-linear relationships between inputs and outputs.",
    "During training, the model learns from historical data, adjusting its parameters to minimize errors.",
    "Forecasting involves using the trained model to predict future values of the time series."
  ];
  return tooltips[step];
};

const getRelevantMathTerms = (step) => {
  const allTerms = {
    'y(t)': 'Time series value at time t',
    'f(t)': 'Signal component',
    'ε(t)': 'Noise component',
    'g(t)': 'Trend component',
    'k(t)': 'Base rate',
    'a(t)': 'Growth rate',
    's(t)': 'Seasonality component',
    'P': 'Period of seasonality',
    'φ_i': 'Auto-regression parameters',
    'β_i': 'Covariate coefficients',
    'x_i': 'Covariates',
    'σ': 'Activation function',
    'W_h, W_o': 'Neural network weights',
    'b_h, b_o': 'Neural network biases',
    'L': 'Loss function',
    'MSE': 'Mean Squared Error',
    'λ': 'Regularization strength',
    'R(θ)': 'Regularization term',
    'ŷ(t+h)': 'Forecast h steps ahead'
  };

  const relevantTerms = {
    0: ['y(t)', 'f(t)', 'ε(t)'],
    1: ['g(t)', 'k(t)', 'a(t)'],
    2: ['s(t)', 'P'],
    3: ['φ_i'],
    4: ['β_i', 'x_i'],
    5: ['σ', 'W_h', 'W_o', 'b_h', 'b_o'],
    6: ['L', 'MSE', 'λ', 'R(θ)'],
    7: ['ŷ(t+h)']
  };

  return Object.fromEntries(
    Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
  );
};

const MathKey = ({ step }) => {
  const relevantTerms = getRelevantMathTerms(step);
  
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h4 className="text-lg font-semibold mb-2">Mathematical Terms Key:</h4>
      <ul className="list-disc pl-5">
        {Object.entries(relevantTerms).map(([term, description]) => (
          <li key={term}>
            <span className="font-mono">{term}</span> : {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NeuralProphetVisualization;