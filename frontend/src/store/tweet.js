// constant to avoid debugging typos
const GET_ALL_TWEETS = "tweet/getAllTweets";
const POST_TWEET = "tweet/postTweet";

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets,
  };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch("/api/tweets");

  if (response.ok) {
    const data = await response.json();

    dispatch(loadTweets(data));
    return data;
  }
};

//regular action creator
const insertTweet = (tweet) => {
  return {
    type: POST_TWEET,
    tweet,
  };
};

//thunk action creator
export function postTweet(tweet) {
  return async (dispatch) => {
    const response = await fetch("/api/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: tweet,
      }),
    });

    if (!response.ok) {
      throw new Error("Shit broke!");
    }
    const data = await response.json();
    if (process.env.NODE_ENV !== "production") {
      console.log(data);
    }
    dispatch(insertTweet(data));
  };
}

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case POST_TWEET: {
      const { id, message, createdAt, updatedAt } = action.tweet;
      return {
        ...state,
        [action.tweet.id]: {
          id,
          message,
          createdAt,
          updatedAt,
        },
      };
    }
    default:
      return state;
  }
};

export default tweetsReducer;
