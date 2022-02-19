window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    this.timers.forEach(item=>clearInterval(item));
    this.timers.length = 0;
    this.players.length = 0;
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
  players:[]
};
