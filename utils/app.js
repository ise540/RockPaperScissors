window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    this.screens[screenName]();
  },
  renderBlock: function (blockName, container) {
    this.blocks[blockName](container);
  },
  timers: [],
};
