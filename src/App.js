// import React from 'react';
// import XGBoostVisualization from './XGBoostVisualization';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <XGBoostVisualization />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import ModelVisualization from './ModelVisualization';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-6 text-center">Interactive Model Visualization</h1>
      <ModelVisualization />
    </div>
  );
}

export default App;