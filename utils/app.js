window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    this.timers.forEach(item=>clearInterval(item));
    this.screens[screenName]();
  },
  renderBlock: function (blockName, container) {
    this.blocks[blockName](container);
  },
  timers: [],
  moves: [
    {
      value: "rock",
      translate: "Камень",
    },
    {
      value: "scissors",
      translate: "Ножницы",
    },
    {
      value: "paper",
      translate: "Бумага",
    },
  ],
};
