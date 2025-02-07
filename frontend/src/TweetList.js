import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "./store/tweet";
import CreateTweet from "./CreateTweet";

const TweetList = () => {
  const dispatch = useDispatch();
  const tweetList = useSelector((state) => Object.values(state.tweet));

  useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);

  return (
    <>
      <h1>Tweet List</h1>
      {tweetList?.map(({ id, message }) => (
        <p key={id}>{message}</p>
      ))}
      <CreateTweet />
    </>
  );
};

export default TweetList;
