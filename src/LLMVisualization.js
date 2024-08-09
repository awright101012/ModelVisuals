import React, { useState, useEffect } from 'react';
import { MessageSquare, Brain, ArrowRight, Database, BookOpen, Code, CheckCircle, HelpCircle, Layers, ChevronDown, ChevronUp, ExternalLink, Target } from 'lucide-react';

const LLMVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [iterations, setIterations] = useState(1);
  const [animationKey, setAnimationKey] = useState(0);
  const [showMathDetails, setShowMathDetails] = useState(false);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeStep, iterations]);

  const steps = [
    { name: 'Input Processing', icon: MessageSquare, color: '#f0f0ff' },
    { name: 'Tokenization', icon: Code, color: '#e6e6ff' },
    { name: 'Embedding', icon: Database, color: '#d9d9ff' },
    { name: 'Attention Mechanism', icon: Brain, color: '#ccccff' },
    { name: 'Layer Processing', icon: Layers, color: '#c2c2ff' },
    { name: 'Next Token Prediction', icon: Target, color: '#b3b3ff' },
    { name: 'Output Generation', icon: ArrowRight, color: '#a9a9ff' },
    { name: 'Decoding', icon: BookOpen, color: '#9f9fff' },
    { name: 'Final Response', icon: CheckCircle, color: '#9595ff' },
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
      <h2 className="text-3xl font-bold mb-6 text-center">LLM Interactive Visualization</h2>
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
      <div className="bg-white p-6 rounded-lg shadow-md relative min-h-[500px]">
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

const getStepVisualization = (step, iterations) => {
  const width = 700;
  const height = 500;
  const visualizations = [
    // Input Processing
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Input Processing</text>
      <rect x="50" y="50" width="400" height="80" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <text x="250" y="90" textAnchor="middle" fill="#333" fontSize="14">Raw Input Text: "The quick brown fox"</text>
      <path d="M250,130 L250,180" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <rect x="100" y="180" width="300" height="60" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="250" y="210" textAnchor="middle" fill="#333" fontSize="14">Preprocessed: "the quick brown fox &lt;EOS&gt;"</text>
      <text x="250" y="230" textAnchor="middle" fill="#333" fontSize="12">Lowercase, add end-of-sequence token</text>
      <text x="250" y="280" textAnchor="middle" fill="#333" fontSize="12">Other possible preprocessing steps:</text>
      <text x="250" y="300" textAnchor="middle" fill="#333" fontSize="12">Remove punctuation, handle special characters, tokenize</text>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Tokenization
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Tokenization</text>
      <rect x="50" y="50" width="400" height="60" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="250" y="85" textAnchor="middle" fill="#333" fontSize="14">Preprocessed: "the quick brown fox &lt;EOS&gt;"</text>
      <path d="M250,110 L250,150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      {['the', 'quick', 'brown', 'fox', '<EOS>'].map((token, i) => (
        <g key={i}>
          <rect x={50 + i * 85} y="150" width="80" height="40" fill="#ffcccb" stroke="#333" strokeWidth="2" />
          <text x={90 + i * 85} y="175" textAnchor="middle" fill="#333" fontSize="12">{token}</text>
        </g>
      ))}
      <path d="M250,190 L250,230" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <rect x="100" y="230" width="300" height="40" fill="#c2f0c2" stroke="#333" strokeWidth="2" />
      <text x="250" y="255" textAnchor="middle" fill="#333" fontSize="14">Token IDs: [2, 345, 678, 901, 1]</text>
      <text x="250" y="300" textAnchor="middle" fill="#333" fontSize="12">Each token is assigned a unique ID from the vocabulary</text>
      <text x="250" y="320" textAnchor="middle" fill="#333" fontSize="12">Vocabulary size can be 30k-50k tokens for many models</text>
    </svg>,

    // Embedding
    <svg width={700} height={500} viewBox="0 0 700 500">
      <rect width="700" height="500" fill="#f0f0f0"/>
      <text x="350" y="30" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">Embedding</text>
      
      {/* Input Tokens */}
      <rect x="50" y="50" width="600" height="60" fill="#c2f0c2" stroke="#333" strokeWidth="2" rx="10" ry="10" />
      <text x="350" y="75" textAnchor="middle" fill="#333" fontSize="18">Input Tokens</text>
      <text x="350" y="100" textAnchor="middle" fill="#333" fontSize="16">["The", "quick", "brown", "fox", "jumps"]</text>
      
      <path d="M350,110 L350,150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Embedding Process */}
      <rect x="50" y="150" width="600" height="200" fill="#ffffff" stroke="#333" strokeWidth="2" rx="10" ry="10" />
      <text x="350" y="175" textAnchor="middle" fill="#333" fontSize="20" fontWeight="bold">Embedding Process</text>
      
      {/* Token to ID mapping */}
      <rect x="70" y="190" width="280" height="140" fill="#e6f7ff" stroke="#333" strokeWidth="1" rx="5" ry="5" />
      <text x="210" y="210" textAnchor="middle" fill="#333" fontSize="16">Token to ID Mapping</text>
      <text x="100" y="235" fill="#333" fontSize="14">"The"    → 1024</text>
      <text x="100" y="260" fill="#333" fontSize="14">"quick"  → 2048</text>
      <text x="100" y="285" fill="#333" fontSize="14">"brown"  → 3072</text>
      <text x="100" y="310" fill="#333" fontSize="14">"fox"    → 4096</text>
      
      {/* Embedding Lookup */}
      <rect x="370" y="190" width="260" height="140" fill="#ffd700" stroke="#333" strokeWidth="1" rx="5" ry="5" />
      <text x="500" y="210" textAnchor="middle" fill="#333" fontSize="16">Embedding Lookup</text>
      <text x="400" y="235" fill="#333" fontSize="14">ID 1024 → [0.1, 0.2, ..., -0.3]</text>
      <text x="400" y="260" fill="#333" fontSize="14">ID 2048 → [-0.2, 0.5, ..., 0.1]</text>
      <text x="400" y="285" fill="#333" fontSize="14">ID 3072 → [0.3, -0.1, ..., 0.4]</text>
      <text x="400" y="310" fill="#333" fontSize="14">ID 4096 → [-0.4, 0.3, ..., 0.2]</text>
      
      <path d="M350,350 L350,390" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Output */}
      <rect x="50" y="390" width="600" height="80" fill="#d9d9ff" stroke="#333" strokeWidth="2" rx="10" ry="10" />
      <text x="350" y="415" textAnchor="middle" fill="#333" fontSize="18">Embedded Vectors</text>
      <text x="350" y="440" textAnchor="middle" fill="#333" fontSize="14">[ [0.1, 0.2, ..., -0.3], [-0.2, 0.5, ..., 0.1], ... ]</text>
      <text x="350" y="460" textAnchor="middle" fill="#333" fontSize="14">Each vector: 768-dimensional (typical for BERT)</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Attention Mechanism
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Attention Mechanism</text>
      {['the', 'quick', 'brown', 'fox', '<EOS>'].map((token, i) => (
        <g key={i}>
          <circle cx={70 + i * 95} cy="80" r="30" fill="#ffcccb" />
          <text x={70 + i * 95} y="85" textAnchor="middle" fill="#333" fontSize="12">{token}</text>
        </g>
      ))}
      {['the', 'quick', 'brown', 'fox', '<EOS>'].map((token, i) => (
        <g key={i}>
          <circle cx={70 + i * 95} cy="250" r="30" fill="#c2f0c2" />
          <text x={70 + i * 95} y="255" textAnchor="middle" fill="#333" fontSize="12">{token}</text>
        </g>
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        [0, 1, 2, 3, 4].map(j => (
          <line key={`${i}-${j}`} x1={70 + i * 95} y1="110" x2={70 + j * 95} y2="220" stroke="#ccc" strokeWidth="1" strokeOpacity="0.5" />
        ))
      ))}
      <text x="250" y="170" textAnchor="middle" fill="#333" fontSize="14">Attention Weights</text>
      <text x="250" y="330" textAnchor="middle" fill="#333" fontSize="12">Each token attends to all other tokens, with varying strengths</text>
      <text x="250" y="350" textAnchor="middle" fill="#333" fontSize="12">Allows the model to focus on relevant parts of the input</text>
      <text x="250" y="370" textAnchor="middle" fill="#333" fontSize="12">Multi-head attention: multiple attention mechanisms in parallel</text>
    </svg>,

    // Layer Processing
    <svg width={700} height={550} viewBox="0 0 700 550">
      <rect width="700" height="550" fill="#f0f0f0"/>
      <text x="350" y="30" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">Layer Processing</text>
      
      {/* Input */}
      <rect x="50" y="60" width="600" height="40" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="350" y="85" textAnchor="middle" fill="#333" fontSize="16">Input from Previous Layer or Embedding</text>
      
      <path d="M350,100 L350,130" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Layer Structure */}
      <rect x="50" y="130" width="600" height="300" fill="#ffffff" stroke="#333" strokeWidth="2" />
      <text x="350" y="155" textAnchor="middle" fill="#333" fontSize="18">Transformer Layer Structure</text>
      
      {/* Self-Attention */}
      <rect x="70" y="170" width="270" height="180" fill="#ffcccb" stroke="#333" strokeWidth="1" />
      <text x="205" y="190" textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">Multi-Head Self-Attention</text>
      
      {/* Attention Heads */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x={80 + i * 85} y="210" width="80" height="60" fill="#ffd700" stroke="#333" strokeWidth="1" />
          <text x={120 + i * 85} y="245" textAnchor="middle" fill="#333" fontSize="14">Head {i+1}</text>
        </g>
      ))}
      
      <text x="205" y="290" textAnchor="middle" fill="#333" fontSize="12">Compute attention scores</text>
      <text x="205" y="310" textAnchor="middle" fill="#333" fontSize="12">and weighted sum of values</text>
      
      <path d="M205,350 L205,380" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Layer Normalization 1 */}
      <rect x="70" y="380" width="270" height="40" fill="#c2f0c2" stroke="#333" strokeWidth="1" />
      <text x="205" y="405" textAnchor="middle" fill="#333" fontSize="14">Layer Normalization</text>
      
      {/* Feed-Forward Network */}
      <rect x="360" y="170" width="270" height="180" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="495" y="190" textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">Feed-Forward Network</text>
      
      <rect x="380" y="210" width="230" height="60" fill="#f0e68c" stroke="#333" strokeWidth="1" />
      <text x="495" y="245" textAnchor="middle" fill="#333" fontSize="14">Linear Layer 1 + ReLU</text>
      
      <rect x="380" y="280" width="230" height="60" fill="#f0e68c" stroke="#333" strokeWidth="1" />
      <text x="495" y="315" textAnchor="middle" fill="#333" fontSize="14">Linear Layer 2</text>
      
      <path d="M495,350 L495,380" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Layer Normalization 2 */}
      <rect x="360" y="380" width="270" height="40" fill="#c2f0c2" stroke="#333" strokeWidth="1" />
      <text x="495" y="405" textAnchor="middle" fill="#333" fontSize="14">Layer Normalization</text>
      
      {/* Output */}
      <path d="M350,430 L350,460" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <rect x="50" y="460" width="600" height="40" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="350" y="485" textAnchor="middle" fill="#333" fontSize="16">Output to Next Layer</text>
      
      {/* Residual Connections */}
      <path d="M50,80 L30,80 L30,480 L50,480" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
      <text x="20" y="275" textAnchor="middle" fill="#333" fontSize="14" transform="rotate(-90, 20, 275)">Residual Connection</text>
      
      {/* Explanations */}
      <text x="350" y="520" textAnchor="middle" fill="#333" fontSize="14">Residual connections allow information to flow directly from input to output,</text>
      <text x="350" y="540" textAnchor="middle" fill="#333" fontSize="14">helping with gradient flow and enabling deeper networks.</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Next Token Prediction
    <svg width={width} height={500} viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#f0f0f0"/>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">Next Token Prediction</text>
      
      <rect x="50" y="50" width="400" height="60" fill="#c2f0c2" stroke="#333" strokeWidth="2" />
      <text x="250" y="85" textAnchor="middle" fill="#333" fontSize="16">Current Context: "The quick brown fox"</text>
      
      <path d="M250,110 L250,150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <rect x="50" y="150" width="400" height="60" fill="#ffcccb" stroke="#333" strokeWidth="2" />
      <text x="250" y="185" textAnchor="middle" fill="#333" fontSize="16">Model Processing</text>
      
      <path d="M250,210 L250,250" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      <rect x="50" y="250" width="400" height="180" fill="#ffffff" stroke="#333" strokeWidth="2" />
      <text x="250" y="280" textAnchor="middle" fill="#333" fontSize="18">Probability Distribution</text>
      
      <rect x="70" y="300" width="60" height="100" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="100" y="340" textAnchor="middle" fill="#333" fontSize="14">"jumps"</text>
      <text x="100" y="380" textAnchor="middle" fill="#333" fontSize="14">40%</text>
      
      <rect x="145" y="325" width="60" height="75" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="175" y="355" textAnchor="middle" fill="#333" fontSize="14">"runs"</text>
      <text x="175" y="380" textAnchor="middle" fill="#333" fontSize="14">30%</text>
      
      <rect x="220" y="300" width="60" height="50" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="250" y="320" textAnchor="middle" fill="#333" fontSize="14">"walks"</text>
      <text x="250" y="340" textAnchor="middle" fill="#333" fontSize="14">20%</text>
      
      <rect x="295" y="337.5" width="60" height="12.5" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="325" y="347" textAnchor="middle" fill="#333" fontSize="12">"leaps" 5%</text>
      
      <rect x="370" y="337.5" width="60" height="12.5" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="400" y="347" textAnchor="middle" fill="#333" fontSize="12">"other" 5%</text>
      
      <text x="250" y="460" textAnchor="middle" fill="#333" fontSize="14">Model predicts probabilities for the next token</text>
      <text x="250" y="485" textAnchor="middle" fill="#333" fontSize="14">based on the current context and learned patterns</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Output Generation
    <svg width={width} height={500} viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#f0f0f0"/>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">Output Generation</text>
      
      {/* Input */}
      <rect x="50" y="50" width="400" height="50" fill="#c2f0c2" stroke="#333" strokeWidth="2" />
      <text x="250" y="80" textAnchor="middle" fill="#333" fontSize="16">Final Layer Output (Logits)</text>
      
      <path d="M250,100 L250,130" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Softmax */}
      <rect x="50" y="130" width="400" height="50" fill="#ffcccb" stroke="#333" strokeWidth="2" />
      <text x="250" y="160" textAnchor="middle" fill="#333" fontSize="16">Softmax Function</text>
      
      <path d="M250,180 L250,210" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Probability Distribution */}
      <rect x="50" y="210" width="400" height="180" fill="#ffffff" stroke="#333" strokeWidth="2" />
      <text x="250" y="235" textAnchor="middle" fill="#333" fontSize="18">Probability Distribution</text>
      
      {/* Probability bars */}
      <rect x="70" y="250" width="60" height="100" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="100" y="290" textAnchor="middle" fill="#333" fontSize="14">"jumps"</text>
      <text x="100" y="330" textAnchor="middle" fill="#333" fontSize="14">40%</text>
      
      <rect x="145" y="275" width="60" height="75" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="175" y="305" textAnchor="middle" fill="#333" fontSize="14">"runs"</text>
      <text x="175" y="330" textAnchor="middle" fill="#333" fontSize="14">30%</text>
      
      <rect x="220" y="300" width="60" height="50" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="250" y="320" textAnchor="middle" fill="#333" fontSize="14">"walks"</text>
      <text x="250" y="340" textAnchor="middle" fill="#333" fontSize="14">20%</text>
      
      <rect x="295" y="337.5" width="60" height="12.5" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="325" y="347" textAnchor="middle" fill="#333" fontSize="12">"leaps" 5%</text>
      
      <rect x="370" y="337.5" width="60" height="12.5" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="400" y="347" textAnchor="middle" fill="#333" fontSize="12">"other" 5%</text>
      
      <path d="M250,390 L250,420" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Token Selection */}
      <rect x="50" y="420" width="400" height="50" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="250" y="445" textAnchor="middle" fill="#333" fontSize="16">Token Selection (e.g., Sampling or Argmax)</text>
      
      {/* Explanation */}
      <text x="250" y="490" textAnchor="middle" fill="#333" fontSize="14">Model generates next token based on probability distribution</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Decoding
    <svg width={700} height={500} viewBox="0 0 700 500">
      <rect width="700" height="500" fill="#f0f0f0"/>
      <text x="350" y="30" textAnchor="middle" fill="#333" fontSize="24" fontWeight="bold">Decoding Strategies</text>
      
      {/* Input */}
      <rect x="50" y="50" width="600" height="60" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="350" y="75" textAnchor="middle" fill="#333" fontSize="16">Probability Distribution</text>
      <text x="350" y="95" textAnchor="middle" fill="#333" fontSize="12">"jumps": 40%, "runs": 30%, "walks": 20%, "leaps": 5%, "other": 5%</text>
      
      <path d="M350,110 L350,140" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Decoding Strategies */}
      <rect x="50" y="140" width="600" height="220" fill="#ffffff" stroke="#333" strokeWidth="2" />
      <text x="350" y="165" textAnchor="middle" fill="#333" fontSize="18">Decoding Strategies</text>
      
      {/* Greedy Search */}
      <rect x="60" y="180" width="285" height="80" fill="#ffcccb" stroke="#333" strokeWidth="1" />
      <text x="202.5" y="200" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Greedy Search</text>
      <text x="202.5" y="220" textAnchor="middle" fill="#333" fontSize="12">Always choose the most probable token</text>
      <text x="202.5" y="240" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Output: "jumps"</text>
      
      {/* Beam Search */}
      <rect x="355" y="180" width="285" height="80" fill="#c2f0c2" stroke="#333" strokeWidth="1" />
      <text x="497.5" y="200" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Beam Search</text>
      <text x="497.5" y="220" textAnchor="middle" fill="#333" fontSize="12">Maintain top-k sequences (Example: k=2)</text>
      <text x="497.5" y="240" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Output: "jumps", "runs"</text>
      
      {/* Top-k Sampling */}
      <rect x="60" y="270" width="285" height="80" fill="#d9d9ff" stroke="#333" strokeWidth="1" />
      <text x="202.5" y="290" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Top-k Sampling</text>
      <text x="202.5" y="310" textAnchor="middle" fill="#333" fontSize="12">Sample from top k tokens (Example: k=3)</text>
      <text x="202.5" y="330" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Possible: "jumps", "runs", "walks"</text>
      
      {/* Nucleus (Top-p) Sampling */}
      <rect x="355" y="270" width="285" height="80" fill="#ffd700" stroke="#333" strokeWidth="1" />
      <text x="497.5" y="290" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Nucleus Sampling</text>
      <text x="497.5" y="310" textAnchor="middle" fill="#333" fontSize="12">Sample from tokens with cumulative prob ≤ p</text>
      <text x="497.5" y="330" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Example: p=0.9</text>
      
      {/* Temperature */}
      <rect x="50" y="370" width="600" height="60" fill="#f0e68c" stroke="#333" strokeWidth="1" />
      <text x="350" y="390" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Temperature</text>
      <text x="350" y="410" textAnchor="middle" fill="#333" fontSize="12">Controls randomness of sampling: Lower = more deterministic, Higher = more random</text>
      
      {/* Explanation */}
      <text x="350" y="450" textAnchor="middle" fill="#333" fontSize="14">Different strategies balance between diversity and quality of generated text</text>
      <text x="350" y="470" textAnchor="middle" fill="#333" fontSize="14">Choice depends on the specific task and requirements</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>,

    // Final Response
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x="250" y="30" textAnchor="middle" fill="#333" fontSize="18" fontWeight="bold">Final Response</text>
      
      {/* Original input */}
      <rect x="50" y="50" width="400" height="40" fill="#e6f7ff" stroke="#333" strokeWidth="2" />
      <text x="250" y="75" textAnchor="middle" fill="#333" fontSize="14">Original Input: "The quick brown fox"</text>
      
      {/* Generated tokens */}
      <rect x="50" y="110" width="400" height="40" fill="#c2f0c2" stroke="#333" strokeWidth="2" />
      <text x="250" y="135" textAnchor="middle" fill="#333" fontSize="14">Generated Tokens: ["jumps", "over", "the"]</text>
      
      {/* Arrow */}
      <path d="M250,150 L250,180" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
      
      {/* Combined response */}
      <rect x="50" y="180" width="400" height="60" fill="#ffcccb" stroke="#333" strokeWidth="2" />
      <text x="250" y="210" textAnchor="middle" fill="#333" fontSize="14">Raw Output: "The quick brown fox jumps over the"</text>
      
      {/* Post-processing explanation */}
      <rect x="50" y="260" width="400" height="120" fill="#f0f0f0" stroke="#333" strokeWidth="2" />
      <text x="250" y="280" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Post-processing</text>
      <text x="60" y="300" fill="#333" fontSize="12">1. Detokenization: Combine tokens into coherent text</text>
      <text x="60" y="320" fill="#333" fontSize="12">2. Formatting: Apply capitalization, punctuation</text>
      <text x="60" y="340" fill="#333" fontSize="12">3. Truncation or Completion: Ensure grammatical correctness</text>
      <text x="60" y="360" fill="#333" fontSize="12">4. Safety Checks: Filter inappropriate content</text>
      
      {/* Final output */}
      <rect x="50" y="400" width="400" height="40" fill="#d9d9ff" stroke="#333" strokeWidth="2" />
      <text x="250" y="425" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">Final Output: "The quick brown fox jumps."</text>
      
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
        </marker>
      </defs>
    </svg>
  ];
  return visualizations[step];
};

const getStepDescription = (step, iterations) => {
  const descriptions = [
    `The LLM receives raw input text and preprocesses it, which may include cleaning, normalization, and handling special tokens.`,
    `The preprocessed text is divided into tokens, which are the smallest units the model can process. These can be words, subwords, or characters.`,
    `Each token is converted into a high-dimensional vector representation, capturing semantic and syntactic information.`,
    `The model calculates attention weights, determining how much focus to place on different parts of the input when generating each part of the output.`,
    `The input passes through multiple neural network layers, each extracting and processing different levels of features from the data.`,
    `Based on the processed input and learned patterns, the model predicts probabilities for the next token in the sequence.`,
    `The final layer produces logits, which are then converted to a probability distribution over the entire vocabulary using a softmax function.`,
    `Based on the probability distribution, the model either samples or chooses the most likely token (argmax) to generate the next part of the output.`,
    `The generated tokens are combined and post-processed to produce the final human-readable response.`
  ];
  return descriptions[step];
};

const getStepMathConcept = (step) => {
  const concepts = [
    `Input processing: x = preprocess(input)
     Where x is the processed input`,
    `Tokenization: T = tokenize(x)
     T = [t₁, t₂, ..., tₙ], where tᵢ are tokens`,
    `Embedding: E = embed(T)
     E = [e₁, e₂, ..., eₙ], where eᵢ ∈ ℝᵈ
     Lookup: eᵢ = Embedding_matrix[token_id]
     Where Embedding_matrix ∈ ℝ^(vocab_size × d)`,
    `Attention: Attention(Q, K, V) = softmax(QK^T / √d_k)V
     Where Q, K, V are query, key, and value matrices`,
    `Layer processing: output = LayerNorm(input + Sublayer(input))
     Sublayer can be self-attention or feed-forward network`,
    `Next Token: P(next_token | context) = softmax(hidden_state * W_vocab)
     Where hidden_state is the current model state and W_vocab is the vocabulary projection matrix`,
    `Output generation: P(y) = softmax(Wo * h + bo)
     Where h is the final hidden state, Wo and bo are learnable parameters`,
    `Decoding: y = argmax P(y) or y ~ P(y)
     Choosing the most likely token or sampling from the distribution`,
    `Final response: response = postprocess(y₁, y₂, ..., yₘ)
     Combining generated tokens into coherent text`
  ];
  return concepts[step];
};

const getStepTooltip = (step) => {
  const tooltips = [
    "Prepares raw input for model processing",
    "Breaks input into processable units",
    "Converts tokens to vector representations",
    "Weighs importance of different input parts",
    "Processes input through multiple neural layers",
    "The model uses its internal state and learned patterns to assign probabilities to each possible next token.",
    "Generates probability distribution over vocabulary",
    "Selects next token based on probabilities",
    "Assembles final response from generated tokens"
  ];
  return tooltips[step];
};

const getLearnMoreLink = (step) => {
  const links = [
    "https://huggingface.co/docs/transformers/preprocessing",
    "https://huggingface.co/docs/transformers/tokenizer_summary",
    "https://huggingface.co/docs/transformers/model_summary#transformer",
    "https://arxiv.org/abs/1706.03762",
    "https://arxiv.org/abs/1810.04805",
    "https://huggingface.co/docs/transformers/model_summary#decoder-models",
    "https://huggingface.co/docs/transformers/generation_strategies",
    "https://huggingface.co/docs/transformers/main_classes/text_generation"
  ];
  return links[step];
};

const getRelevantMathTerms = (step) => {
  const allTerms = {
    'x': 'Processed input',
    'T': 'Token sequence',
    'E': 'Embedding matrix',
    'Q, K, V': 'Query, Key, Value matrices',
    'softmax': 'Softmax function',
    'LayerNorm': 'Layer normalization',
    'P(y)': 'Probability distribution over vocabulary',
    'argmax': 'Argument of the maximum',
    '~': 'Sampling operation',
    'postprocess': 'Post-processing function'
  };

  const relevantTerms = {
    0: ['x'],
    1: ['T'],
    2: ['E'],
    3: ['Q, K, V', 'softmax'],
    4: ['LayerNorm'],
    5: ['P(y)', 'softmax'],
    6: ['P(y)', 'softmax'],
    7: ['argmax', '~'],
    8: ['postprocess']
  };

  return Object.fromEntries(
    Object.entries(allTerms).filter(([key]) => relevantTerms[step].includes(key))
  );
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

export default LLMVisualization;