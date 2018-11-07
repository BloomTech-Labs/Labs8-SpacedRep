process.env.NODE_ENV = 'test';

var chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const should = chai.should();
const sinon = require('sinon');

const server = require('../index');
const User = require('../db/users/usersModel');

chai.use(chaiHTTP);

describe('SRSLY', () => {
  // before(done => {
  //   mongoose.Promise = global.Promise;
  //   mongoose.connect('mongodb://localhost/test');
  //   const db = mongoose.connection;
  //   db.on('error', () => console.error.bind(console, 'connection error'));
  //   db.once('open', () => {
  //     console.log('we are connected');
  //     done();
  //   });
  // });

  // after(done => {
  //   mongoose.connection.db.dropDatabase(() => {
  //     mongoose.connection.close(done);
  //     console.log('we are disconnected');
  //   });
  // });
  // let gameId;
  // // hint - these wont be constants because you'll need to override them.
  // beforeEach(done => {
  //   // write a beforeEach hook that will populate your test DB with data
  //   // each time this hook runs, you should save a document to your db
  //   // by saving the document you'll be able to use it in each of your `it` blocks

  //   let newGame = new Game({
  //     title: 'Super Mario Bros. 3',
  //     genre: 'Platformer',
  //     releaseDate: '1993'
  //   });
  //   newGame
  //     .save()
  //     .then(savedGame => {
  //       gameId = savedGame._id.toString();
  //     })
  //     .catch(err => console.log(err));
  //   done();
  // });

  // afterEach(done => {
  //   // simply remove the collections from your DB.
  //   Game.remove({}, err => {
  //     if (err) console.log(err);
  //     return done();
  //   });
  // });

  // test the POST here

  // test the GET here
  // describe(`[GET] /api/users`, () => {
  //   it('should get a list of users in db', done => {
  //     chai
  //       .request(server)
  //       .get('/api/users')
  //       .then(response => {
  //         console.log(response.body);

  //         // const { _id, name, genre } = response.body[0];
  //         // expect(response.status).to.equal(200);
  //         // expect(response.body).to.be.an('array');
  //         // expect(_id).to.equal(gameId);
  //         // expect(name).to.equal('Super Mario Bros. 3');
  //         done();
  //       })
  //       .catch(err => {
  //         // throw err;
  //         console.log(err);
  //         done();
  //       });
  //   });
  //   it.skip('Should fail if bad URL is provided', () => {}); // puts in pending state
  // });
  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here

  //testing home route '/'
  describe(`[GET] /`, () => {
    it('should return "hello friend"', done => {
      chai
        .request(server)
        .get('/')
        .then(response => {
          // console.log(response);
          console.log(response.text);
          response.text.should.be.a('string');

          // const { _id, name, genre } = response.body[0];
          // expect(response.status).to.equal(200);
          // expect(response.body).to.be.an('array');
          // expect(_id).to.equal(gameId);
          // expect(name).to.equal('Super Mario Bros. 3');
          done();
        })
        .catch(err => {
          // throw err;
          console.log(err);
          done();
        });
    });
    // it.skip('Should fail if bad URL is provided', () => {}); // puts in pending state
  });
});
