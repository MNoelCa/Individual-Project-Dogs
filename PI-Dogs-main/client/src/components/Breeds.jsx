import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBreeds } from '../redux/actions'; 
import  BreedCard  from './BreedCard';
import Paginado from './Paginado';
import s from './Breeds.module.css';

const Breeds = () => {
  const dispatch = useDispatch();
  const {allBreeds, filterBreeds} = useSelector((state) => state);

  const [breeds, setBreeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);   // página actual
  const [breedPerPage, setBreedPerPage] = useState(8);  // personajes por página
  const indexOfLastBreed = currentPage * breedPerPage;        // 8
  const indexOfFirstBreed = indexOfLastBreed - breedPerPage;  // 0              
  const [currentBreeds, setCurrentBreeds] = useState([]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(()=> {
    dispatch(getAllBreeds());
  },[]);

  useEffect(()=> {
    setBreeds([...allBreeds]);
  },[allBreeds]);

  useEffect(()=> {
    setBreeds([...filterBreeds]);
  },[filterBreeds]);

  useEffect(()=> {
    setCurrentBreeds(breeds.slice(indexOfFirstBreed, indexOfLastBreed)); // 0 al 7 (8 razas)
  },[breeds, currentPage]);

  const sort = (e) => {
    switch(e.target.value) {
      case  'A → Z': {
        setBreeds([...breeds].sort((a,b) => a.name.localeCompare(b.name)))
        break
      };
      case  'Z → A': {
        setBreeds([...breeds].sort((a,b) => b.name.localeCompare(a.name)))
        break
      };
      case  'Ascendente': {
        setBreeds([...breeds].sort((a,b) => parseInt(a.weight.split(' - ').shift()) - parseInt(b.weight.split(' - ').shift())))
        break
      };
      case  'Descendente': {
        setBreeds([...breeds].sort((a,b) => parseInt(b.weight.split(' - ').pop()) - parseInt(a.weight.split(' - ').pop())))
        break
      };
    }
  };

  const prevPage = () => (currentPage === 1) ? null : setCurrentPage(currentPage -1);
  const nextPage = () => (currentPage === Math.ceil(allBreeds.length/breedPerPage)) ? null : setCurrentPage(currentPage +1);
  
  return (
  <div >
    <div className={s.sort}>
      <label for='Sort By'> Sort By: </label>
      <select name='Sort By' onChange={sort} >
        <optgroup label='Name' >
          <option> A → Z </option>
          <option> Z → A </option>
        </optgroup>
        <optgroup label='Weight' >
          <option> Ascendente </option>
          <option> Descendente </option>
        </optgroup>
      </select>
    </div>
    <div className={s.paginado}> 
      <button onClick={prevPage}> Prev </button>
      <Paginado breedPerPage={breedPerPage} allBreeds={breeds.length} paginado={paginado} currentPage={currentPage}/>
      <button onClick={nextPage}> Next </button>
      </div>
    <div className={s.conteiner}>
      {currentBreeds.length ? currentBreeds.map((r) => <BreedCard name={r.name} reference_image_id={r.reference_image_id} image={r.image} temperament={typeof r.temperament === 'string' ? r.temperament : r.temperament && r.temperament.map(t => t.name).join(', ')} weight={r.weight} id={r.id} key={r.id}/>)
      : <BreedCard name={"#ERROR 404"} text={"No match found!"} temperaments={null} image={'https://media.baamboozle.com/uploads/images/87319/1595866769_178370'} ></BreedCard>}
    </div>
    <div className={s.paginado}> 
      <button onClick={prevPage}> Prev </button>
      <Paginado breedPerPage={breedPerPage} allBreeds={breeds.length} paginado={paginado} currentPage={currentPage}/>
      <button onClick={nextPage}> Next </button>
      </div>
  </div>
  )
};

export default Breeds;

/* const data = [
  {
    "id": 1,
    "name": "Affenpinscher",
    "reference_image_id": "BJa4kxc4X",
    "image": {
      "id": "BJa4kxc4X",
      "width": 1600,
      "height": 1199,
      "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    },
    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "weight": {
      "imperial": "6 - 13",
      "metric": "3 - 6"
    }
  },
  {
    "id": 2,
    "name": "Afghan Hound",
    "reference_image_id": "hMyT4CDXR",
    "image": {
      "id": "hMyT4CDXR",
      "width": 606,
      "height": 380,
      "url": "https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg"
    },
    "temperament": "Aloof, Clownish, Dignified, Independent, Happy",
    "weight": {
      "imperial": "50 - 60",
      "metric": "23 - 27"
    }
  },
  {
    "id": 3,
    "name": "African Hunting Dog",
    "reference_image_id": "rkiByec47",
    "image": {
      "id": "rkiByec47",
      "width": 500,
      "height": 335,
      "url": "https://cdn2.thedogapi.com/images/rkiByec47.jpg"
    },
    "temperament": "Wild, Hardworking, Dutiful",
    "weight": {
      "imperial": "44 - 66",
      "metric": "20 - 30"
    }
  },
  {
    "id": 4,
    "name": "Airedale Terrier",
    "reference_image_id": "1-7cgoZSh",
    "image": {
      "id": "1-7cgoZSh",
      "width": 645,
      "height": 430,
      "url": "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg"
    },
    "temperament": "Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
    "weight": {
      "imperial": "40 - 65",
      "metric": "18 - 29"
    }
  }
] */