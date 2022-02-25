// src/store/artow/reducer.js
const initialState = {
  //   loading: true,
  artworks: [],
  artworkDetails: null,
};

export default function reducer(state = initialState, action) {
  //   console.log("home reducer reveived", action);
  switch (action.type) {
    case "ARTWORKS/allArtworksFetched": {
      // console.log("ARTWORKS/allArtworksFetched", action.payload);
      return {
        ...state,
        artworks: [...action.payload], // copy array
        // loading: false,
      };
    }
    case "ARTWORK/setArtwork": {
      // console.log("ARTWORK/artworkById", action.payload);
      // console.log("reducer, set artwork", action.payload);
      return {
        ...state,
        artworkDetails: { ...action.payload },
        // artworks: [...action.payload.its_The_Same_name_1],
      };
    }
    case "ARTWORK/increaseHearts": {
      // console.log("Reducer, ARTWORK/increaseHearts", action.payload);

      return {
        ...state,
        // YOU GRABE THE STATE, AFTER THERE IS THE ARTWORKS , THAT INITIAL STATE, COPY BY STATE.ARTWORKS
        //THERE IS A getArtworkByIdIncludeBid IS A OBJECT SO YOU COPY EVERTHING AGAIN AND MIDIFY HEARTS
        artworkDetails: {
          ...state.artworkDetails,
          hearts: action.payload,
          // getArtworkByIdIncludeBid: {
          //   ...state.artworks.getArtworkByIdIncludeBid,
          //   hearts: action.payload + 1,
          // },
        },
      };
    }
    case "ARTWORK/giveBids": {
      // console.log("Reducer, ARTWORK/giveBids", action.payload);
      console.log("the payload", action.payload);
      const addNewBid = [...state.artworkDetails.bids, action.payload].sort(
        (a, b) => (a.amount < b.amount ? 1 : -1)
      );
      const newState = {
        ...state,
        artworkDetails: {
          ...state.artworkDetails,
          bids: [...addNewBid],
        },
      };
      return newState;
    }
    case "ARTWORK/startAuction": {
      console.log("Reducer, ARTWORK/startAuction", action.payload);
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
}
