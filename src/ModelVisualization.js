

import React, { useState } from 'react';
import XGBoostVisualization from './XGBoostVisualization';
import NeuralProphetVisualization from './NeuralProphetVisualization';
import LLMVisualization from './LLMVisualization';

const ModelVisualization = () => {
  const [activeModel, setActiveModel] = useState('xgboost');

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="mb-6 flex justify-center">
        <button
          className={`px-4 py-2 mr-2 rounded ${activeModel === 'xgboost' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveModel('xgboost')}
        >
          XGBoost
        </button>
        <button
          className={`px-4 py-2 mr-2 rounded ${activeModel === 'neuralprophet' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveModel('neuralprophet')}
        >
          Neural Prophet
        </button>
        <button
          className={`px-4 py-2 rounded ${activeModel === 'llm' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveModel('llm')}
        >
          LLM
        </button>
      </div>
      {activeModel === 'xgboost' && <XGBoostVisualization />}
      {activeModel === 'neuralprophet' && <NeuralProphetVisualization />}
      {activeModel === 'llm' && <LLMVisualization />}
    </div>
  );
};

export default ModelVisualization;