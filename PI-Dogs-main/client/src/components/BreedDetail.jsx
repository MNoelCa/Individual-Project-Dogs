import React from 'react';
import { getBreedDetail } from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import s from './BreedDetail.module.css';


const BreedDetail = (props) => { 
    const dispatch = useDispatch();
    const breed = useSelector(state => state.breedDetail);
    const match = useRouteMatch();
    const id = match.params.id
    useEffect(()=>{
        dispatch(getBreedDetail(id))
    },[]);

    if(breed.id !== undefined) {
        return (
            <div className={s.conteiner}>
              {breed.image.url ? <img className={s.image} src={breed.image.url} alt={`${props.name} img`}/>
              : <img className={s.image} src={breed.image} alt={`${props.name} img`}/>}
              <h2 className={s.name} >Name: {breed.name}</h2>
              <div className={s.info}>
                {breed.temperament ? <h3>Temperaments: <br/> {breed.temperament}</h3> :  <h3>No temperaments!</h3>}
                <h3>Height: <br/> {breed.height} cm </h3>
                <h3>Weight: <br/> {breed.weight} Kg </h3>
                {breed.life_span.includes('years') ? <h3>Life Span: <br/> {breed.life_span} </h3> :
                <h3>Life Span: <br/> {breed.life_span} years </h3>}
              </div>
            </div>
        );
    } else return ( 
        <h2>"Loading..."</h2>
    )
};


/* const BreedDetail = () => {

    const dispatch = useDispatch();
    const breed = useSelector(state=> state.breed);
  
      React.useEffect(()=> {
          dispatch(getBreedDetail(id))
      },[]);
  
      return (
          <div>
          <img src={breed.image.url}/>
          <h2>Name: {breed.name}</h2>
          <h3>Temperament: {breed.temperament}</h3>
          <h3>height: ({breed.height}) cm </h3>
          <h3>Weight: ({breed.weight}) Kg </h3>
          <h3>Life Span: ({breed.life_span}) Kg </h3>

          </div>
      );
  }; */
  


export default BreedDetail;