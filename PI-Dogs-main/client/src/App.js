import { Route, Link } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Breeds from './components/Breeds';
import BreedDetail from './components/BreedDetail';
import NewBreed from './components/NewBreed';


function App() {
  return (
    <div className="App">
      <Route exact path="/" >
      <h1>Henry Dogs Individual Project</h1>
        <div className="home">
        <Link to='/Breeds'>
          <button className='button'> GO ! </button> 
          <img src='https://images.fanart.tv/fanart/the-secret-life-of-pets-580dc30835036.jpg'></img>
        </Link>
        </div>
      </Route>

      <Route path="/Breeds">
        <div className='head'>
          <h1>Henry Dogs Individual Project</h1>
          <SearchBar />
        </div>
        <Breeds />
      </Route> 

      <Route  path="/detail/:id">
        <div className='detail'>    
          <h1>Henry Dogs Individual Project</h1>
          <Link to='/Breeds'><button>Back</button></Link> <br/>
          <BreedDetail />
        </div>
      </Route> 

      <Route  path="/create" >
        <NewBreed />
      </Route> 

    </div>
  ); 
}

export default App;
