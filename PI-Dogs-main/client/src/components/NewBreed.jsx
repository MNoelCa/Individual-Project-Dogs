import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { getAllTemperaments} from "../redux/actions";
import s from './NewBreed.module.css';
import { useHistory } from 'react-router-dom';

const NewBreed = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const temperaments = useSelector(state => state.temperaments)
    useEffect(()=>{
        dispatch(getAllTemperaments())
    },[])

    const handleTemp = (e) => {   //modifico E.L
        (e.target.checked) ? setInput({...input, temperament: [...input.temperament].concat(e.target.name)})
        : setInput({...input, temperament: [...input.temperament].filter(t => t !== e.target.name)});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const aux = {name: input.name, height: `${input.height_min} - ${input.height_max}`, weight: `${input.weight_min} - ${input.weight_max}`, life_span: `${input.lifespan_min} - ${input.lifespan_max}`, temperament: input.temperament, image:input.image}
        !Object.keys(errors).length && fetch('http://localhost:3001/dogs', {
            method: 'POST',
            body: JSON.stringify(aux),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => history.push(`/detail/${response.id}`))
     };

    const handleInputChange = (e) => {
        setInput({...input,
            [e.target.name]: e.target.value})
            setErrors(validate({...input,
            [e.target.name]: e.target.value}))
    }

    const [input, setInput] = useState({
        name:'',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        lifespan_min: 0,
        lifespan_max: 0,
        image: '',
        temperament: []
    })

    const [errors, setErrors] = useState({});

    return(
    <form className={s.create} onSubmit={handleSubmit}>
        <h1 className={s.title}>¡Create your breed!</h1>
        <Link to='/breeds'><button>Back</button></Link> <br/>
        <div className={s.form}>
            <label> Name: </label>
                <input key="name" type="text" placeholder="breed name..." name="name" onChange={handleInputChange} className={errors.name && s.danger}/> <br/>
            <label> Height: </label>
                <input key="height_min" type="number" placeholder="height min..." name="height_min" onChange={handleInputChange} className={errors.height_min && s.danger}/>
                <input key="height_max" type="number" placeholder="height max..." name="height_max" onChange={handleInputChange} className={errors.height_max && s.danger}/>
                <span> cm </span> <br/>
            <label> Weight: </label>
                <input key="weight_min" type="number" placeholder="weight min..." name="weight_min" onChange={handleInputChange} className={errors.weight_min && s.danger}/>
                <input key="weight_max" type="number" placeholder="weight max..." name="weight_max" onChange={handleInputChange} className={errors.weight_max && s.danger}/>
                <span> kg </span> <br/>
            <label> Life Span: </label>
                <input key="lifespan_min" type="number" placeholder="life span min..." name="lifespan_min" onChange={handleInputChange} />
                <input key="lifespan_max" type="number" placeholder="life span max..." name="lifespan_max" onChange={handleInputChange} />
                <span> years </span> <br/>
            <label> Imagen: </label>
                <input key="image" type="text" placeholder="image url..." name="image" onChange={handleInputChange}/> <br/>
        </div> <br/>
        <div className={s.dangerText}>
        <p> {errors.name}</p>
        <p> {errors.height_min} </p>
        <p> {errors.height_max} </p>
        <p> {errors.weight_min} </p>
        <p> {errors.weight_max} </p>
        </div>
        <div className={s.temperaments}>
        <label for="temperament"> Select temperaments: </label>
            <div name="temperaments" id="temperament">
            {temperaments.map(t => <label> <input type="checkbox" onChange={handleTemp} name={t.name}/> {t.name} </label>)}
            </div> <br/>
        <button className={s.send} type="submit" > Send </button>
        </div>
    </form>
    )

};

export const validate = (input) => {
    let errors = {};
    if (!input.name) errors.name = 'Debe ingresar un nombre de raza';

    if (!input.height_min) errors.height_min = 'Debe ingresar un height min';
    if (!input.height_max) errors.height_max = 'Debe ingresar un height max';
    if (!input.weight_min) errors.weight_min = 'Debe ingresar un weight min';
    if (!input.weight_max) errors.weight_max = 'Debe ingresar un weight max';

    if (input.height_min <0) errors.height_min = 'height min debe ser mayor a cero';
    if (input.height_max <0) errors.height_max = 'height max debe ser mayor a cero';
    if (input.weight_min <0) errors.weight_min = 'weight min debe ser mayor a cero';
    if (input.weight_max <0) errors.weight_max = 'weight max debe ser mayor a cero';

    if (parseInt(input.height_min) > parseInt(input.height_max)) errors.height_min = 'La altura mínima debe ser menor a la altura máxima';
    if (parseInt(input.weight_min) > parseInt(input.weight_max)) errors.weight_min = 'El peso mínima debe ser menor al peso máximo';
    if (parseInt(input.height_max) > 90) errors.height_max = 'La altura máxima no puede superar los 90cm';
    if (parseInt(input.weight_max) > 100) errors.weight_max = 'El peso máximo no puede superar los 100Kg';

    return errors;
};

export default NewBreed;
