import React, { useState } from 'react';
import XGBoostVisualization from './XGBoostVisualization';
import NeuralProphetVisualization from './NeuralProphetVisualization';
import ProphetVisualization from './ProphetVisualization';
import ExponentialSmoothingVisualization from './ExponentialSmoothingVisualization';
import AutoARIMAVisualization from './AutoARIMAVisualization';
import LLMVisualization from './LLMVisualization';

const ModelVisualization = () => {
  const [activeModel, setActiveModel] = useState('xgboost');

  const models = [
    { id: 'xgboost', name: 'XGBoost', type: 'Machine Learning' },
    { id: 'neuralprophet', name: 'Neural Prophet', type: 'AI/ML' },
    { id: 'prophet', name: 'Prophet', type: 'Machine Learning' },
    { id: 'exponentialsmoothing', name: 'Exponential Smoothing', type: 'Statistical' },
    { id: 'autoarima', name: 'Auto ARIMA', type: 'Statistical' },
    { id: 'llm', name: 'LLM', type: 'AI' },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Forecasting Model Visualizations</h1>
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            className={`px-4 py-2 rounded transition-colors ${
              activeModel === model.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setActiveModel(model.id)}
          >
            {model.name}
            <span className="ml-2 text-xs font-semibold">
              ({model.type})
            </span>
          </button>
        ))}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {activeModel === 'xgboost' && <XGBoostVisualization />}
        {activeModel === 'neuralprophet' && <NeuralProphetVisualization />}
        {activeModel === 'prophet' && <ProphetVisualization />}
        {activeModel === 'exponentialsmoothing' && <ExponentialSmoothingVisualization />}
        {activeModel === 'autoarima' && <AutoARIMAVisualization />}
        {activeModel === 'llm' && <LLMVisualization />}
      </div>
    </div>
  );
};

export default ModelVisualization;