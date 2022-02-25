import { useState } from "react";
import { Form } from "react-bootstrap";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { useDispatch } from "react-redux";
// import { getUserWithStoredToken } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { selectUserArtwork } from "../../store/artwork/selector";
import { artworRecevingABid } from "../../store/artwork/action";
import { useParams } from "react-router";
import { selectArtworkById } from "../../store/artwork/selector";

export default function FormBid() {
  const params = useParams();
  const id = params.id;
  const userLoginCheck = useSelector(selectUserArtwork);
  const artworkByidSelector = useSelector(selectArtworkById);

  const currentBids =
    artworkByidSelector &&
    artworkByidSelector.bids.map((eachBid) => {
      // console.log("each bid", eachBid);
      return eachBid.amount;
    });
  const highestCurrentBid = Math.max(...currentBids);

  // console.log("my highets bid", highestCurrentBid);
  // console.log("the current bids", currentBids);

  // console.log("keep the higher bi", keepHigherBid);

  const [bid, set_Bid] = useState(highestCurrentBid + 1);

  const dispatch = useDispatch();

  // console.log("this is my user Login Check", userLoginCheck);

  // console.log("artwork by id from the FORM", artworkByidSelector);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (highestCurrentBid > bid) {
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "YOU NEED TO GIVE A HIGHER BID!"
        )
      );
    }
    if (bid > highestCurrentBid) {
      dispatch(artworRecevingABid(id, bid));
    }
  };

  return (
    <div>
      <h1>HEY YOU HAVE A FORM HERE IF YOU ARE LOGGIN</h1>
      <div>
        {!userLoginCheck ? (
          ""
        ) : (
          <div>
            <Form>
              <ul>
                <li>
                  {" "}
                  <label>AMOUNT:</label>
                  <input
                    type="number"
                    value={bid}
                    onChange={(event) => set_Bid(event.target.value)}
                  />
                  <button onClick={handleSubmit}> BID</button>
                </li>
              </ul>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
