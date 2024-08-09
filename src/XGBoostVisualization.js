import React, { useState, useEffect } from 'react';
import { BarChart2, RefreshCcw, GitMerge, ArrowRight, CheckCircle, HelpCircle, GitBranch, Layers, TrendingUp, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const XGBoostVisualization = () => {
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
    { name: 'Initial Predictions', icon: TrendingUp, color: '#e6e6ff' },
    { name: 'Calculate Residuals', icon: RefreshCcw, color: '#d9d9ff' },
    { name: 'Build Tree', icon: GitBranch, color: '#ccccff' },
    { name: 'Make Predictions', icon: ArrowRight, color: '#c2c2ff' },
    { name: 'Update Ensemble', icon: GitMerge, color: '#b8b8ff' },
    { name: 'Regularization', icon: Layers, color: '#adadff' },
    { name: 'Final Model', icon: CheckCircle, color: '#a3a3ff' },
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
        <rect x="50" y="50" width="300" height="200" fill="#e6e6e6" stroke="#333" strokeWidth="2" />
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Input Data</text>
        <text x="200" y="100" textAnchor="middle" fill="#333" fontSize="14">Features (X)</text>
        <line x1="70" y1="120" x2="330" y2="120" stroke="#333" strokeWidth="2" />
        <text x="200" y="160" textAnchor="middle" fill="#333" fontSize="14">Target (Y)</text>
        <line x1="70" y1="180" x2="330" y2="180" stroke="#333" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <rect x={80 + i * 50} y="130" width="40" height="20" fill="#4CAF50" opacity="0.7" />
            <text x={100 + i * 50} y="145" textAnchor="middle" fill="#333" fontSize="12">X{i+1}</text>
            <rect x={80 + i * 50} y="190" width="40" height="20" fill="#2196F3" opacity="0.7" />
            <text x={100 + i * 50} y="205" textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
          </g>
        ))}
      </svg>,

      // Initial Predictions
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Initial Predictions</text>
        <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" strokeWidth="2" />
        <circle cx="200" cy="150" r="5" fill="#4CAF50" />
        <text x="200" y="170" textAnchor="middle" fill="#333" fontSize="14">Mean Prediction</text>
        {[0, 1, 2, 3, 4].map(i => {
          const x = 80 + i * 60;
          const y = 150 - (Math.random() * 80);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#2196F3" />
              <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
            </g>
          );
        })}
      </svg>,

      // Calculate Residuals
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Calculate Residuals</text>
        <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" strokeWidth="2" />
        <circle cx="200" cy="150" r="5" fill="#4CAF50" />
        <text x="200" y="170" textAnchor="middle" fill="#333" fontSize="14">Mean Prediction</text>
        {[0, 1, 2, 3, 4].map(i => {
          const x = 80 + i * 60;
          const y = 150 - (Math.random() * 80);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#2196F3" />
              <text x={x} y={y - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
              <line x1={x} y1={y} x2={x} y2="150" stroke="#ff0000" strokeWidth="2" strokeDasharray="4,4" />
              <text x={x} y={(y + 150) / 2} textAnchor="start" fill="#ff0000" fontSize="12" dx="5">r{i+1}</text>
            </g>
          );
        })}
      </svg>,

      // Build Tree
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Build Decision Tree</text>
        <g transform="translate(200,60)">
          <circle cx="0" cy="0" r="25" fill="#4CAF50" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14">Root</text>
          <line x1="-60" y1="60" x2="0" y2="25" stroke="#4CAF50" strokeWidth="2" />
          <line x1="60" y1="60" x2="0" y2="25" stroke="#4CAF50" strokeWidth="2" />
          <circle cx="-60" cy="80" r="20" fill="#4CAF50" />
          <circle cx="60" cy="80" r="20" fill="#4CAF50" />
          <text x="-60" y="85" textAnchor="middle" fill="white" fontSize="14">L</text>
          <text x="60" y="85" textAnchor="middle" fill="white" fontSize="14">R</text>
          <line x1="-90" y1="120" x2="-60" y2="100" stroke="#4CAF50" strokeWidth="2" />
          <line x1="-30" y1="120" x2="-60" y2="100" stroke="#4CAF50" strokeWidth="2" />
          <circle cx="-90" cy="140" r="15" fill="#4CAF50" />
          <circle cx="-30" cy="140" r="15" fill="#4CAF50" />
        </g>
      </svg>,

      // Make Predictions
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Make Predictions</text>
        <line x1="50" y1="150" x2="350" y2="150" stroke="#ccc" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => {
          const x = 80 + i * 60;
          const y1 = 150 - (Math.random() * 80);
          const y2 = 150 - (Math.random() * 80);
          return (
            <g key={i}>
              <circle cx={x} cy={y1} r="4" fill="#2196F3" />
              <text x={x} y={y1 - 10} textAnchor="middle" fill="#333" fontSize="12">Y{i+1}</text>
              <line x1={x} y1={y1} x2={x} y2={y2} stroke="#4CAF50" strokeWidth="2" strokeDasharray="4,4" />
              <circle cx={x} cy={y2} r="4" fill="#4CAF50" />
              <text x={x} y={y2 + 15} textAnchor="middle" fill="#4CAF50" fontSize="12">Ŷ{i+1}</text>
            </g>
          );
        })}
      </svg>,

      // Update Ensemble
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Update Ensemble</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${100 + i * 100}, 100)`}>
            <rect x="-30" y="-40" width="60" height="80" fill={i === 2 ? "#4CAF50" : "#e6e6e6"} stroke="#333" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill={i === 2 ? "white" : "#333"} fontSize="14">Tree {i + 1}</text>
          </g>
        ))}
        <path d="M170,140 Q200,180 230,140" fill="none" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
          </marker>
        </defs>
      </svg>,

      // Regularization
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Regularization</text>
        <rect x="100" y="70" width="200" height="160" fill="#e6e6e6" stroke="#333" strokeWidth="2" />
        <rect x="120" y="90" width="160" height="120" fill="#4CAF50" stroke="#333" strokeWidth="2" />
        <text x="200" y="160" textAnchor="middle" fill="white" fontSize="16">Regularized Model</text>
        <path d="M120,210 Q200,50 280,210" fill="none" stroke="#ff0000" strokeWidth="2" strokeDasharray="4,4" />
        <text x="200" y="240" textAnchor="middle" fill="#333" fontSize="14">Complexity Penalty</text>
      </svg>,

      // Final Model
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <text x="200" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Final Model</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${100 + i * 100}, 100)`}>
            <rect x="-30" y="-40" width="60" height="80" fill="#4CAF50" stroke="#333" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14">Tree {i + 1}</text>
          </g>
        ))}
        <path d="M100,160 Q200,200 300,160" fill="none" stroke="#333" strokeWidth="2" />
        <rect x="150" y="220" width="100" height="40" fill="#2196F3" stroke="#333" strokeWidth="2" />
        <text x="200" y="245" textAnchor="middle" fill="white" fontSize="14">Σ Trees</text>
      </svg>
    ];
    return visualizations[step];
  };

  const getStepDescription = (step, iterations) => {
    const descriptions = [
      `Loading input data with features (X) and target variables (Y). This step prepares the dataset for training, organizing features and their corresponding target values.`,
      `Making initial predictions using the mean of the target variable. This provides a baseline for the model to improve upon.`,
      `Calculating residuals by subtracting predictions from actual values. This step helps focus the model on areas where predictions need improvement.`,
      `Building a decision tree to predict the residuals from the previous step. The tree is constructed by recursively splitting the data based on features, maximizing the information gain at each split. This process continues until a stopping criterion is met, such as maximum depth or minimum samples per leaf.`,
      `Using the new tree to make predictions on the residuals. Each tree's predictions contribute to refining the overall model's predictions.`,
      `Adding the new tree's predictions to the ensemble's predictions. The learning rate (η) controls the contribution of each new tree, helping to prevent overfitting. The ensemble now combines multiple weak learners to create a stronger predictive model.`,
      `Applying regularization techniques to prevent overfitting. This step penalizes complex models, balancing the trade-off between model complexity and performance. XGBoost uses both L1 (Lasso) and L2 (Ridge) regularization terms in its objective function.`,
      `Combining all trees in the ensemble for the final model. This aggregation of weak learners creates a strong predictive model. The final prediction is the sum of predictions from all trees, each scaled by the learning rate.`
    ];
    return `Iteration ${iterations}: ${descriptions[step]}`;
  };

  const getStepMathConcept = (step) => {
    const concepts = [
      `Input data:
       X = {x₁, x₂, ..., xₙ} (feature vectors)
       Y = {y₁, y₂, ..., yₙ} (target values)`,
      `Initial prediction: ŷᵢ = average(Y)`,
      `Residuals: rᵢ = yᵢ - ŷᵢ`,
      `Decision tree: T(X) → r̂
       Split criterion: Gain = ½ * [GL²/HL + GR²/HR - (GL+GR)²/(HL+HR)]
       Where G = sum of gradients, H = sum of hessians, L = left child, R = right child
       The tree is built to maximize this gain at each split.`,
      `Tree prediction: ŷᵢ = ŷᵢ + η * T(xᵢ), where η is the learning rate
       This updates the current prediction with the new tree's output.`,
      `Ensemble update: F(x) = F(x) + η * T(x)
       The new tree T(x) is added to the existing ensemble F(x), scaled by the learning rate η.`,
      `Regularization: Obj = Σ L(yᵢ, ŷᵢ) + Ω(T)
       Where L is the loss function and Ω(T) is the regularization term
       Ω(T) = γ * number of leaves + ½λ * Σ(leaf weights²)
       γ controls complexity, λ controls L2 regularization strength`,
      `Final model: F(x) = Σ η * T(x)
       The final prediction is the sum of all tree outputs, each scaled by the learning rate.`
    ];
    return concepts[step];
  };

  const getStepTooltip = (step) => {
    const tooltips = [
      "The input data consists of feature vectors (X) and their corresponding target values (Y). This forms the basis for training the XGBoost model.",
      "Initial predictions provide a baseline for the model to improve upon.",
      "Residuals help focus the model on areas where predictions need improvement.",
      "The decision tree is built by recursively splitting the data based on features.",
      "Each tree's predictions contribute to refining the overall model's predictions. The learning rate controls the impact of each new tree.",
      "The ensemble grows by adding new trees, each addressing remaining errors. This iterative process improves the model's accuracy over time.",
      "Regularization helps prevent overfitting by penalizing complex models. It balances the trade-off between model complexity and performance.",
      "The final model combines predictions from all trees in the ensemble. This aggregation of weak learners creates a strong predictive model."
    ];
    return tooltips[step];
  };

  const getRelevantMathTerms = (step) => {
    const allTerms = {
      'Σ': 'Sum of a series',
      'ŷ': 'Predicted value',
      'η': 'Learning rate',
      'Ω': 'Regularization term',
      'L': 'Loss function',
      'G': 'Sum of gradients',
      'H': 'Sum of hessians',
      'T': 'Decision tree',
      'F': 'Ensemble model',
      'γ': 'Complexity control parameter',
      'λ': 'L2 regularization strength'
    };

    const relevantTerms = {
      0: ['X', 'Y'],
      1: ['ŷ'],
      2: ['ŷ', 'Y'],
      3: ['G', 'H', 'T'],
      4: ['ŷ', 'η', 'T'],
      5: ['Σ', 'η', 'F', 'T'],
      6: ['Ω', 'L', 'γ', 'λ', 'Σ'],
      7: ['Σ', 'η', 'F', 'T']
    };

    return Object.fromEntries(
      Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
    );
  };

  const getLearnMoreLink = (step) => {
    const links = [
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#tree-boosting",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#gradient-boosting",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#regularized-learning-objective",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#predictive-service",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#additive-training",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#regularization",
      "https://xgboost.readthedocs.io/en/latest/tutorials/model.html#summary"
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
      <h2 className="text-3xl font-bold mb-6 text-center">XGBoost Interactive Visualization</h2>
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

export default XGBoostVisualization;