import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectArtworkById } from "../../store/artwork/selector";
import { useEffect } from "react";
import { fetchArtworkByID, artworkHearts } from "../../store/artwork/action";
import FormBid from "../../components/Form/FormBid";

export default function ArtworDetails() {
  const params = useParams();
  const id = params.id;
  //   console.log("The id of the Artwork", id);

  const dispatch = useDispatch();

  const artworkByidSelector = useSelector(selectArtworkById);
  //   console.log("artwork by id selector", artworkByidSelector);

  useEffect(() => {
    dispatch(fetchArtworkByID(id));
  }, [dispatch, id]);
  return (
    <div>
      <h1> WELKOME TO ARTWORK DETAILS, SHOULD RENDERING ONE ARTWORK</h1>
      <div>
        {!artworkByidSelector ? (
          "Loading ..."
        ) : (
          <div>
            <h1>{artworkByidSelector.title}</h1>
            <img src={artworkByidSelector.imageUrl} width={300} alt="" />
            <h2>♡{artworkByidSelector.hearts}'s</h2>
            <button
              onClick={() =>
                dispatch(
                  artworkHearts(
                    artworkByidSelector.id,
                    artworkByidSelector.hearts
                  )
                )
              }
            >
              {" "}
              Increase 1 Heart
            </button>
            <h3>Number of bids:{artworkByidSelector.bids.length}</h3>
            <h1> Owners of the bids:</h1>
            {artworkByidSelector.bids.map((bi) => {
              return (
                <div key={bi.id}>
                  <h3>
                    Email of the bidders:{bi.email} Amout Bid: {bi.amount}{" "}
                  </h3>
                </div>
              );
            })}
            <FormBid />
          </div>
        )}
      </div>
    </div>
  );
}

// The artworks are displayed with a title,
//image and the number of hearts it has | 1      |
//The bids belonging to the artwork are
//displayed with email and amount
