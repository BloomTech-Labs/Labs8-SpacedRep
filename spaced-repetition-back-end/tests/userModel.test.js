// const chai = require('chai');
// const { expect } = chai;
// // const sinon = require('sinon');

// const User = require('../db/users/usersModel');

// describe('NESGames Model', () => {
//   before(done => {
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/test');
//     const db = mongoose.connection;
//     db.on('error', () => console.error.bind(console, 'connection error'));
//     db.once('open', () => {
//       console.log('we are connected');
//       done();
//     });
//   });

//   after(done => {
//     mongoose.connection.db.dropDatabase(() => {
//       mongoose.connection.close(done);
//       console.log('we are disconnected');
//     });
//   });

//   describe('#getGameTitle', () => {
//     it('should give back the proper game.title', () => {
//       const game = new Game({
//         title: 'California Games',
//         date: 'June 1987',
//         genre: 'Sports'
//       });
//       expect(game.getGameTitle()).to.equal('California Games');
//     });
//   });

//   describe('#getAllGames()', () => {
//     it('should return all the games', () => {
//       sinon.stub(Game, 'find');
//       Game.find.yields(null, [
//         {
//           title: 'California Games',
//           date: 'June 1987',
//           genre: 'Sports'
//         }
//       ]);
//       Game.getGames(returnObject => {
//         expect(returnObject.length).to.equal(1);
//         expect(returnObject[0].title).to.equal('California Games');
//         Game.find.restore();
//       });
//     });
//   });
// });
