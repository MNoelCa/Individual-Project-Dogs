import { GET_ALL_BREEDS, GET_BREED_DETAIL, GET_ALL_TEMPERAMENTS, GET_FILTER_BREEDS} from "../actions";

const initialState = {
    allBreeds: [],
    temperaments: [],
    breedDetail: {},
    filterBreeds: []
  };
  

const rootReducer = (state = initialState, action) => {
switch(action.type) {

    case GET_ALL_BREEDS:
        return{
          ...state,
          allBreeds: action.payload,
        }
    
    case GET_BREED_DETAIL:
        return{
        ...state,
        breedDetail: action.payload,
        }

    case GET_ALL_TEMPERAMENTS:
        return{
          ...state,
          temperaments: action.payload,
        }

    case GET_FILTER_BREEDS:
        return{
          ...state,
          filterBreeds: action.payload,
        }
    
/*     case GET_FILTER_TEMPERAMENTS:
    const allBreeds = state.allBreeds;
      let filterDogs = [];
      if (action.payload === "Todos") {
        filterDogs = allBreeds;
      } else {
        for (let i = 0; i < allBreeds.length; i++) {
          let found = allBreeds[i].temperaments.find((t) => t === action.payload);
          if (found) {
            filterDogs.push(allBreeds[i]);
          }
        }
      }
      return {
        ...state,
        breed: filterDogs,
      }; */

/*       case BREED_DETAIL:
        let details = action.payload
        if (!details[0].temperaments[0]) { 
          details[0].temperaments[0] = "no-temperaments"
        }
        return {
          ...state,
          detailBreed: details
        }; */
      default:
        return state;
  }
};

export default rootReducer;