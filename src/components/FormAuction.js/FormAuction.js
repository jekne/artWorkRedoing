import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { newAuction } from "../../store/artwork/action";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function FormAuction() {
  const [title, set_Title] = useState("");
  const [minimunBid, set_MinimunBid] = useState("");
  const [imageUrl, set_ImageUrl] = useState("");

  const userInfo = useSelector(selectUser);
  // console.log("select user", userInfo);

  const dispatch = useDispatch();

  /// check about the user id

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newAuction(title, minimunBid, imageUrl, userInfo.id));
    dispatch(
      showMessageWithTimeout(
        "success",
        false,
        "An auction was made! Good Luck!"
      )
    );
    set_Title("");
    set_MinimunBid("");
    set_ImageUrl("");
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
