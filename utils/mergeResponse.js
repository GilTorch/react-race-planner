/* eslint-disable no-underscore-dangle */
const mergeResponse = (storedItems = [], response = []) =>
  response?.map((responseItem) => {
    const storedItem = storedItems.find((item) => item._id === responseItem._id);

    // If we already have this instance, update it
    if (storedItem) {
      return {
        ...storedItem,
        ...responseItem,
      };
    }

    // If not, add it
    return responseItem;
  });

export default mergeResponse;
