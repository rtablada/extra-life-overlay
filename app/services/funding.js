import Service from '@ember/service';

let participantId = '346401';
let baseUrl = `https://www.extra-life.org/api/`;

const fetchSon = (url) => fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  .then(r => r.json());

const timeout = (t) => new Promise(r => setTimeout(() => r(), t));

const goals = [
  {
    value: 100,
    text: 'Fernet Shot'
  },
  {
    value: 200,
    text: 'Fernet Shot'
  },
  {
    value: 300,
    text: 'Scary Game'
  },
  {
    value: 400,
    text: 'Fernet Shot'
  },
  {
    value: 500,
    text: 'Legos'
  },
  {
    value: 1000,
    text: '100% MATCH!'
  }
];

export default Service.extend({
  nextGoal: 400,
  currentRaised: 185,
  init() {
    this._super(...arguments);
    this.loadData();
  },

  async loadData() {
    let extraLifeDonos = await fetchSon(`${baseUrl}/participants/${participantId}`)

    let { sumDonations } = extraLifeDonos;
    this.setProperties(extraLifeDonos);

    this.set('goals', goals.map(g => Object.assign({}, g, {
      complete: g.value <= sumDonations
    })));

    let nextGoal = this.goals.find(a => ! a.complete);
    this.setProperties({
      nextGoal: nextGoal.value,
      nextGoalText: nextGoal.text
    });

    await timeout(200);
  }
})
