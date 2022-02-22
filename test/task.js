const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

// Configure chai
chai.should();
chai.use(chaiHttp);


// Assertions for testing
describe('IMDI Mock API', () => {
    describe('GET /api/movies', () => {
        it('should return all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.limit.should.be.a('number');
                    res.body.page.should.be.a('number');
                    res.body.total.should.be.a('number');
                    res.body.result.should.be.a('array');
                    done();
                })
        });

        it('should not return all movies', (done) => {
            chai.request(server)
                .get('/api/movie')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                })
        });

    });

    describe('GET /api/movies/:id', () => {
        it('should return movie details', (done) => {
            const id = 1;
            chai.request(server)
                .get(`/api/movies/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.id.should.be.a('number');
                    res.body.should.have.property('name');
                    res.body.should.have.property('genre');
                    res.body.should.have.property('releaseDate');
                    res.body.should.have.property('description');
                    res.body.should.have.property('votes');
                    done();

                })
        });

        it('should not return movie details', (done) => {
            const id = 404;
            chai.request(server)
                .get(`/api/movies/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.equal('Movie not found');
                    done();
                });
        });
    });

    describe('GET /api/movies/search', () => {
        it('should return search results', (done) => {
            const search = 'marvel';
            chai.request(server)
                .get(`/api/movies/search?q=${search}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.query.should.be.equal(search);
                    res.body.total.should.be.a('number');
                    res.body.result.should.be.a('array');
                    done();
                })
        });

        it('should not return search results', (done) => {
            const search = 'NON';
            chai.request(server)
                .get(`/api/movies/search?q=${search}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.query.should.be.equal(search);
                    res.body.result.length.should.be.equal(0);
                    res.body.total.should.be.equal(0);
                    done();
                });
        });
    });

    describe('POST /api/movies/bulkAdd', () => {
        it('should return bulk add results', (done) => {
            const movies = [
                {
                    name: 'Iron Man 2',
                    genre: 'Action',
                    releaseDate: new Date('2020-01-01'),
                    description: 'Iron Man 2 is a America Marvel Superhero',
                    votes: 12
                },
                {
                    name: 'Avengers : Age of Ultron',
                    genre: 'Action',
                    releaseDate: new Date('2019-10-01'),
                    description: 'Avengers : Endgame is a 2019 American superhero film based on the Marvel Comics superhero team the Avengers, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2012\'s The Avengers, 2012\'s The Avengers: Age of Ultron, and 2015\'s Avengers: Infinity War. It is the first film in the Marvel Cinematic Universe (MCU).',
                    votes: 17
                }
            ];
            chai.request(server)
                .post('/api/movies/bulkAdd')
                .send(movies)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('id');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('genre');
                    res.body[0].should.have.property('releaseDate');
                    res.body[0].should.have.property('description');
                    res.body[0].should.have.property('votes');
                    done();
                });
        });
    });

    describe('POST /api/movies/add', () => {
        const movie = {
            id: parseInt(Date.now() * Math.random()),
            name: 'Open Season 2',
            genre: 'Romance',
            releaseDate: new Date('2019-04-01'),
            description: 'Open Season is a 2019 American romantic drama film directed by David Fincher and written by Fincher and Adam McKay, based on the novel by David Fincher. It stars Tom Hanks, Julia Louis-Dreyfus, and Tim Roth.',
            votes: 12
        };

        it('should return add results', (done) => {

            chai.request(server)
                .post('/api/movies/add')
                .send(movie)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('genre');
                    res.body.should.have.property('releaseDate');
                    res.body.should.have.property('description');
                    res.body.should.have.property('votes');
                    done();
                });
        });

        it('should not return add results as it has same id', (done) => {
            chai.request(server)
            .post('/api/movies/add')
            .send(movie)
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.equal('Movie ID already exists');
                done();
            });
    });

    });

    describe('GET /api/movies/:id/upvote', () => {
        it('should return upvote results', (done) => {
            const id = 1;
            chai.request(server)
                .get(`/api/movies/${id}/upvote`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        })
    });



})