import './App.css';
import Header from './components/header';
import Todo from './components/Todo';

function App() {
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Todo />
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
