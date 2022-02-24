import { useState } from "react";
import { Form } from "react-bootstrap";

import { useDispatch } from "react-redux";
// import { getUserWithStoredToken } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { selectUserArtwork } from "../../store/artwork/selector";
import {
  startAnAuction,
  newAuction,
  createNewStory,
} from "../../store/artwork/action";
import { useParams } from "react-router";

// /The form contains inputs for title, minimum bid & imageUrl
export default function FormAuction() {
  const [title, set_Title] = useState("");
  const [minimunBid, set_MinimunBid] = useState("");
  const [imageUrl, set_ImageUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewStory({ title, minimunBid, imageUrl }));
    console.log("i am being clicked", title, minimunBid, imageUrl);
  };

  return (
    <div>
      <h1>HEY YOU HAVE A FORM HERE IF YOU ARE LOGGIN</h1>
      <div>
        <div>
          <Form>
            <ul>
              <li>
                {" "}
                <label>TITLE:</label>
                <input
                  value={title}
                  type="text"
                  onChange={(event) => set_Title(event.target.value)}
                />
                <label>MINIMUM BID:</label>
                <input
                  value={minimunBid}
                  type="number"
                  onChange={(event) => set_MinimunBid(event.target.value)}
                />
                <label>IMAGE:</label>
                <input
                  value={imageUrl}
                  type="text"
                  onChange={(event) => set_ImageUrl(event.target.value)}
                />
                <button onClick={handleSubmit}> START AN AUCTION</button>
              </li>
            </ul>
          </Form>
        </div>
      </div>
    </div>
  );
}
