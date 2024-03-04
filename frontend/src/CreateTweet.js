import { useDispatch } from "react-redux";
import { useState } from "react";
import { postTweet } from "./store/tweet";

function CreateTweet() {
  const [userTweet, setUserTweet] = useState("");
  const dispatch = useDispatch();

  function handleButton(event) {
    event.preventDefault();
    if (userTweet) {
      dispatch(postTweet(userTweet));
      cleanup();
    }
  }

  function cleanup() {
    setUserTweet("");
  }

  return (
    <form onSubmit={handleButton}>
      <input
        type="text"
        value={userTweet}
        placeholder="whats happening"
        onChange={(event) => {
          setUserTweet(event.target.value);
        }}
      ></input>
      <button type="submit">Post</button>
    </form>
  );
}

export default CreateTweet;
