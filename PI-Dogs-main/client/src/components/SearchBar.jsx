// recibe el input del usuario (busqueda y filtros) y hace la petición a la api (get)
// hace el dispatch con esos datos (GET_ALL_BREEDS)

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterBreeds, getAllTemperaments} from "../redux/actions";
import { Link } from 'react-router-dom';
import s from './SearchBar.module.css';


const SearchBar = () => {
    /* const temperaments = [
        "Active",
        "Adaptable",
        "Adventurous",
        "Affectionate",
        "Aggressive",
        "Agile",
        "Alert",
        "Aloof",
        "Amiable",
        "Assertive",
        "Athletic",
        "Attentive",
        "Benevolent",
        "Boisterous",
        "Bold",
        "Bossy",
        "Brave",
        "Bright",
        "Bubbly",
        "Calm",
        "Cat-like",
        "Cautious",
        "Charming",
        "Cheerful",
        "Clever",
        "Clownish",
        "Companionable",
        "Composed",
        "Confident",
        "Cooperative",
        "Courageous",
        "Cunning",
        "Curious",
        "Determined",
        "Devoted",
        "Dignified",
        "Diligent",
        "Docile",
        "Dominant",
        "Dutiful",
        "Eager",
        "Easygoing",
        "Energetic",
        "Even Tempered",
        "Excitable",
        "Extroverted",
        "Faithful",
        "Familial",
        "Fast",
        "Fearless",
        "Feisty",
        "Fierce",
        "Friendly",
        "Fun-loving",
        "Gay",
        "Generous",
        "Gentle",
        "Good-natured",
        "Good-tempered",
        "Great-hearted",
        "Happy",
        "Hard-working",
        "Hardworking",
        "Hardy",
        "Independent",
        "Inquisitive",
        "Intelligent",
        "Joyful",
        "Keen",
        "Kind",
        "Lively",
        "Lovable",
        "Loving",
        "Loyal",
        "Merry",
        "Mischievous",
        "Obedient",
        "Opinionated",
        "Outgoing",
        "Patient",
        "People-Oriented",
        "Playful",
        "Powerful",
        "Protective",
        "Proud",
        "Quick",
        "Quiet",
        "Rational",
        "Receptive",
        "Refined",
        "Reliable",
        "Reserved",
        "Respectful",
        "Responsible",
        "Responsive",
        "Rugged",
        "Self-assured",
        "Self-confidence",
        "Self-important",
        "Sensitive",
        "Sociable",
        "Spirited",
        "Spunky",
        "Stable",
        "Steady",
        "Strong",
        "Strong Willed",
        "Stubborn",
        "Sturdy",
        "Suspicious",
        "Sweet-Tempered",
        "Tenacious",
        "Territorial",
        "Thoughtful",
        "Tolerant",
        "Trainable",
        "Trusting",
        "Trustworthy",
        "Unflappable",
        "Vigilant",
        "Vocal",
        "Watchful",
        "Wild",
        "Willful"
    ]; */

    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments)

    useEffect(()=>{
        dispatch(getAllTemperaments())
    },[])

    const [filterTemp, setFilterTemp] = useState([])

    const handleSubmit = (e) => {  //envío la petición
        e.preventDefault();
        dispatch(getFilterBreeds(e.target.search.value, filterTemp));
    };

    const handleTemp = (e) => {   //modifico el estado local
        (e.target.checked) ? setFilterTemp([...filterTemp, e.target.name])  
        : setFilterTemp(filterTemp.filter(t => t !== e.target.name))
    };

    return(
        <div >
            <form onSubmit={handleSubmit} >
                <Link to='/'><button>Back</button></Link>
                <div className={s.conteiner}>
                    <Link to='/create'><button>Create New Breed!</button></Link>
                    <input type='text' name="search" id="search" placeholder="Search by breed..."/> <br/>
                    <div className={s.temperaments} name="temperaments" id="temperaments">
                    <label for="temperaments">Temperaments:</label> <br/>
                        {temperaments.map(t => <label key={t.id}><input type="checkbox" onChange={handleTemp} name={t.name}/>{t.name}</label>)}
                    </div>
                    <input type="submit" value="Send" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;