import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArtworksWithBids } from "../../store/artwork/action";
import { selectArtworksAndBids } from "../../store/artwork/selector";

export default function HomePage() {
  const dispatch = useDispatch();

  const artworksAndBids = useSelector(selectArtworksAndBids);
  console.log("My artworks and Bids", artworksAndBids);

  useEffect(() => {
    dispatch(fetchArtworksWithBids());
  }, [dispatch]);

  return (
    <div>
      <h1>WELKOME TO THE HOME PAGE, A LIST OF ARTWORKS WILL BE DISPLAYED</h1>
      <div>
        {artworksAndBids.length === 0
          ? "Loading ..."
          : artworksAndBids.map((art) => {
              return (
                <div key={art.id}>
                  <h1>{art.title} </h1>
                  <img src={art.imageUrl} width={300} alt="" />
                  <h2>♡{art.hearts}'s</h2>
                  <h3>Number of bids:{art.bids.length}</h3>
                  <Link to={`/artworkdetails/${art.id}`}>
                    {" "}
                    <button>VIEW DETAILS</button>
                  </Link>
                </div>
              );
            })}
      </div>
    </div>
  );
}
//Each artwork has a `View details` button, it links to a artwork's details
