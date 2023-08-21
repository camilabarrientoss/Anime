const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index'); //importar servidor
chai.use(chaiHttp);

describe('Se prueba API REST con Mocha - Chai', function () {
    it('Probando GET - La data debe contener una propiedad llamada "1" y esta debe ser un objeto', function (done) {
        chai
            .request(app)
            .get('/') //llamamos a la raiz
            .end(function (err, res) {
                let data = JSON.parse(res.text);
                chai.expect(data).to.have.property('1'); //espero que la data tenga la propiedad "1"
                chai.expect(data['1']).to.be.an('object'); //espero que data "1" (elemento) sea un objeto
                done();
            });
    });
});