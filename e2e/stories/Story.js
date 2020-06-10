/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Story {
  get storyTitle() {
    return element(by.id('story-title'));
  }
}

module.exports = new Story();
