const mergeResponse = (storedItems = [], response) =>
  response
    .map(responseItem => {
      const storedItem = storedItems.find(item => item.id === responseItem.id);

      // If we already have this instance, update it
      if (storedItem) {
        return {
          ...storedItem,
          ...responseItem
        };
      }

      // If not, add it
      return responseItem;
    })
    // We automatically get rid of inactive instances
    .filter(item => !!item.active);

export default mergeResponse;
