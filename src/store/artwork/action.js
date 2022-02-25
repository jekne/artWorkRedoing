import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";
import { apiUrl } from "../../config/constants";

export function artworksFullyFetched(data) {
  return {
    type: "ARTWORKS/allArtworksFetched",
    payload: data,
  };
}

export function giveBids(bid) {
  console.log("in the action creator", bid);
  return {
    type: "ARTWORK/giveBids",
    payload: bid,
  };
}

export function setArtwork(artwork) {
  return {
    type: "ARTWORK/setArtwork",
    payload: artwork,
  };
}

export function increaseHeart(hearts) {
  console.log("increase heart", hearts);

  return {
    type: "ARTWORK/increaseHearts",
    payload: hearts,
  };
}

export function startAnAuction(data) {
  console.log("what is this", data);
  return {
    type: "ARTWORK/startAuction",
    payload: data,
  };
}

export function fetchArtworksWithBids() {
  return async function thunk(dispatch, getState) {
    try {
      //   dispatch();
      const response = await axios.get(`${apiUrl}/artworks/withbids`);
      //   console.log("response from thunk", response.data);
      const artworks = response.data.artworkAndBids;
      //(ASK TO EXPLAIN WHY BECAME [] IF YOU REMOVE THE artworkAndBids FROM DATA )
      //if is undefined get the first item like artworkAndBids but remmber to do the reducer as well
      // const its_The_Same_name_1 = response.data.getAllSpaces;
      // console.log("it is the same name 1", its_The_Same_name_1);
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(artworksFullyFetched(artworks));
    } catch (e) {}
  };
}

export function fetchArtworkByID(id) {
  return async function thunk(dispatch, getState) {
    try {
      // dispatch(loadingSpaces());
      const response = await axios.get(`${apiUrl}/artworks/withbids/${id}`);
      // console.log("response from thunk", response.data);
      //   console.log("Am I getting here?", response);

      // ASK WHY IF YOU USE its_The_Same_name_1 ON THE REDUCER, STOP TO BE UNDEFINED

      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(setArtwork(response.data.getArtworkByIdIncludeBid));
    } catch (e) {
      console.log("error:", e);
    }
  };
}

export function artworkHearts(id, hearts) {
  return async function thunk(dispatch, getState) {
    try {
      // dispatch(loadingSpaces());
      const response = await axios.patch(`${apiUrl}/artworks/${id}`, {
        hearts,
      });
      console.log("hearts", response.data.hearts);
      // console.log("Am I getting here?", response.data.updateHearts.hearts);

      /// DO THE ROUTE START WITH RESPONSE.DATA, AFTER YOU SEE THERE IS AN OBJECT CALL UPDATEHEARTS,
      // YOU GRAB THE UPDATEHEARTS AND YOU SEE THAT YOU HAVE JUST THE OBJECT AND YOU WANT TO MODIFY
      //JUST THE HEARTS, SO DO THE response.data.updateHearts.hearts
      //WHEN YOU DO THIS YOU AR HAVING JUST ONE VALUE LIKE 21, ITS THE NUMBER OF HEARTS, SO YOU GO TO THE REDUCER.

      // const its_The_Same_name_1 = response.data;
      // ASK WHY IF YOU USE its_The_Same_name_1 ON THE REDUCER, STOP TO BE UNDEFINED

      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(increaseHeart(response.data.hearts));
    } catch (e) {}
  };
}

export function artworRecevingABid(artworkId, amount) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();

      console.log(
        `THIS IS MY USER GETSTATE ${user}, and my artworkId from thunk ${artworkId}`
      );

      // const isHeighest = false /*some logic - return false / true*/

      // if (!isHeighest){

      // }

      const response = await axios.put(
        `${apiUrl}/bids/${artworkId}`,
        {
          amount,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      // console.log("response from thunk", response.data);
      // console.log("Am I getting here?", response);
      // console.log("My token", user.token);
      console.log("the data given to the action creator", response.data);
      dispatch(giveBids(response.data.bid));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "An auction was made! Good Luck!"
        )
      );
    } catch (e) {}
  };
}

export function newAuction(title, minimumBid, imageUrl, id) {
  return async function thunk(dispatch, getState) {
    try {
      const token = localStorage.getItem("token");

      // const user = getState();
      // const userId = user.user.id;
      // console.log(
      //   `THIS IS MY USER GETSTATE ${user}, and my artworkId from thunk ${userId}`
      // );
      // console.log("my token", user.token);
      console.log("this is my id", id);

      const response = await axios.post(
        `${apiUrl}/artworks/${id}`,
        {
          title,
          minimumBid,
          imageUrl,
          id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("response from thunk", response.data);
      // console.log("Am I getting here?", response);
      // console.log("My token", token);

      dispatch(startAnAuction(response.data));
    } catch (e) {}
  };
}
//
