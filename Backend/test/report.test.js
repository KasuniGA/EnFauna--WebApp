import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; 
import fs from 'fs';
import path from 'path';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Incident Report API', () => {
  describe('POST /reports', () => {
    it('should create a new report with all required fields and files', (done) => {
      chai.request(app)
        .post('/reports')
        .field('incidentType', 'Poaching')
        .field('description', 'Illegal hunting in the area')
        .field('date', '2025-05-04')
        .field('time', '13:30')
        .field('priority', 'High')
        .field('location.lat', '6.9271')
        .field('location.lng', '79.8612')
        .field('anonymous', 'false')
        .field('reporter.name', 'John Doe')
        .field('reporter.contact', 'john@example.com')
        .attach('photos', fs.readFileSync(path.join(__dirname, 'sample.jpg')), 'sample.jpg')
        .attach('videos', fs.readFileSync(path.join(__dirname, 'sample.mp4')), 'sample.mp4')
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('success', true);
          expect(res.body).to.have.property('message').that.includes('created');
          done();
        });
    });

    it('should return 400 if required fields are missing', (done) => {
      chai.request(app)
        .post('/reports')
        .field('description', 'Only description provided')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('should create a report anonymously (no reporter info)', (done) => {
      chai.request(app)
        .post('/reports')
        .field('incidentType', 'Habitat destruction')
        .field('description', 'Trees being cut down illegally')
        .field('date', '2025-05-04')
        .field('time', '10:15')
        .field('priority', 'Medium')
        .field('location.lat', '6.9271')
        .field('location.lng', '79.8612')
        .field('anonymous', 'true')
        .attach('photos', fs.readFileSync(path.join(__dirname, 'sample.jpg')), 'sample.jpg')
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('success', true);
          done();
        });
    });
  });

  describe('GET /reports', () => {
    it('should return all reports', (done) => {
      chai.request(app)
        .get('/reports')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});



