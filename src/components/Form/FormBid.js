import { useState } from "react";
import { Form } from "react-bootstrap";

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

  const [bid, set_Bid] = useState("");

  const dispatch = useDispatch();

  const userLoginCheck = useSelector(selectUserArtwork);
  // console.log("this is my user Login Check", userLoginCheck);

  const artworkByidSelector = useSelector(selectArtworkById);
  console.log("artwork by id selector", artworkByidSelector);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(artworRecevingABid(id, bid));
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
                    value={bid}
                    type="number"
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
// onClick={() =>
//                       dispatch(
//                         artworkHearts(
//                           artworkByidSelector.id,
//                           artworkByidSelector.hearts
