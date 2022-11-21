import React from 'react';
import { Link } from 'react-router-dom';
import s from './BreedCard.module.css';



const BreedCard = (props) => {
    return (
        <div className={s.conteiner}>
          <Link to={`/detail/${props.id}`}>
            {props.reference_image_id ?
            <img className={s.image} src={`https://cdn2.thedogapi.com/images/${props.reference_image_id}.jpg`} /> 
            : <img className={s.image} src={props.image} alt={`${props.name} img`} /> }
            <h2 className={s.name}>  {props.name} </h2>
          </Link>

          { props.text ? <h3>{props.text}</h3> : props.temperament ? <h3>Temperaments:<br/>{props.temperament}</h3> :  <h3>No temperaments!</h3>}
          { props.weight && <h3>Weight: <br/> ({props.weight}) Kg </h3>}
        </div>
    );
};

export default BreedCard;