import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import { store } from './store';

import MainPage from './main/MainPage';
import AddPhone from './phones/AddPhone';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/list" element={<AddPhone/>}/>
            <Route path="/list/:id" element={<AddPhone/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
