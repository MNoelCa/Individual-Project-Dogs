export const GET_ALL_BREEDS = 'GET_ALL_BREEDS';
export const GET_BREED_DETAIL = 'GET_BREED_DETAIL';
export const CREATE_BREED = 'CREATE_BREED';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_FILTER_BREEDS = 'GET_FILTER_BREEDS';


/* export const getAllBreeds = () => {
    return async (dispatch) => {
        var json = await axios.get('http://localhost:3001/breeds');
        return dispatch({
            type:'GET_ALL_BREEDS',
            payload: json.data
        })
    }
}; */

export const getAllBreeds = () => dispatch => {
    return fetch('http://localhost:3001/dogs')
    .then(response => response.json())
    .then(obj => dispatch ({type: GET_ALL_BREEDS, payload:obj}))
};

export const getFilterBreeds = (name, filterTemp) => dispatch => {
    return fetch(`http://localhost:3001/dogs?name=${name}&filterTemp=${encodeURIComponent(filterTemp)}`)
    .then(response => response.json())
    .then(obj => dispatch ({type:GET_FILTER_BREEDS, payload:obj}))
    .catch(err => console.log(err))
};

export const getBreedDetail = (id) => dispatch => {
    return fetch(`http://localhost:3001/dogs/${id}`)
    .then(response => response.json())
    .then(obj => dispatch ({type: GET_BREED_DETAIL, payload:obj}))
};

export const getAllTemperaments = () => dispatch => {
    return fetch('http://localhost:3001/temperaments')
    .then(response => response.json())
    .then(obj => dispatch ({type: GET_ALL_TEMPERAMENTS, payload:obj}))
};

/* let id = 0;
export const createBreed = function(values) {
    return {
        type:CREATE_BREED,
        payload: {
            id: ++id,
            name: values.name,
            height: values.height,
            weight: values.weight,
            life_span: values.life_span
        }
    }
}; */