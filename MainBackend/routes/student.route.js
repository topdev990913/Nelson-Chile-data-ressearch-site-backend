let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router()
const multer = require('multer');
// Student Model
let userSchema = require('../Models/Student')
const Papa = require("papaparse");
const csv = require('csvtojson');
const Student = require('../Models/Student');


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(null, `tmp.csv`);
  },
});

const upload = multer({ storage }).single('csv');


// CREATE User
router.route('/create-student').post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("data", data)
      res.json(data)
    }
  })
})

//Uploading CSV
router.route('/read-file').post((req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    }
    const csvFilePath = './uploads/tmp.csv';
    csv()
      .fromFile(csvFilePath)
      .then(async (jsonObj) => {
        for (let i = 0; i < jsonObj.length; i++) {
          const item = jsonObj[i]
          const student = new userSchema()
          student.RUT = item.RUT
          student.DV = item.DV
          student.NOMBRE = item.NOMBRE
          student.DIRECCION = item.DIRECCION
          student.COMUNA = item.COMUNA
          student.REGION = item.REGION
          student.SALUD = item.SALUD
          student.Fec_Nac = item.Fec_Nac
          student.CORREO = item.CORREO
          student.CELULAR = item.CELULAR
          await student.save()
        }
        res.send('Success')
      });


  })
})


router.route('/temp/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i') })  // /45/i
    .then((data) => {
      res.json(data)
    })
    .catch((e) => {
      console.error(e);
    })
})

router.route('/temp_Email/').post((req, res) => {
  userSchema.find({ CORREO: new RegExp(req.body.Email, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp_telephone/').post((req, res) => {
  userSchema.find({ CELULAR: new RegExp(req.body.telephone, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp_RUT/').post((req, res) => {
  userSchema.find({ RUT: new RegExp(req.body.RUT, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp_RUT_Position/').post((req, res) => {
  userSchema.find({ RUT: new RegExp(req.body.RUT, 'i'), COMUNA: new RegExp(req.body.Common, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp_RUT_regeion/').post((req, res) => {
  userSchema.find({ RUT: new RegExp(req.body.RUT, 'i'), REGION: new RegExp(req.body.Regeion, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp_RUT_Position_Regeion/').post((req, res) => {
  userSchema.find({ RUT: new RegExp(req.body.RUT, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), COMUNA: new RegExp(req.body.Common, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: req.body.Address })
    .then((data) => {
      res.json(data)
    })
})
router.route('/temp2/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp3/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp4/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), SALUD: new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp5/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp6/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DV: new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp12/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp13/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION : new RegExp(req.body.Regeion, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp14/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), SALUD : new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp15/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), Fec_Nac : new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp16/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp23/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), REGION : new RegExp(req.body.Regeion, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp24/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), SALUD : new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp25/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), Fec_Nac : new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp26/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp34/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD : new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp35/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac : new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp36/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp45/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac : new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp46/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp56/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp123/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp124/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp125/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp126/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp134/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp135/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp136/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp145/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp146/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp156/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp234/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp235/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp236/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp245/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp246/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp256/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp345/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp346/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp356/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1234/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1235/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1236/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1245/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})


router.route('/temp1246/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1256/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1345/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1346/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1356/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp1456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp2345/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp2346/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp2356/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp2456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp3456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV : new RegExp(req.body.DV, 'i') })
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp12345/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp12346/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp12356/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp12456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA : new RegExp(req.body.Common, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp13456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp23456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})

router.route('/temp123456/').post((req, res) => {
  userSchema.find({ NOMBRE: new RegExp(req.body.name, 'i'), DIRECCION: new RegExp(req.body.Address, 'i'), COMUNA: new RegExp(req.body.Common, 'i'), REGION: new RegExp(req.body.Regeion, 'i'), SALUD: new RegExp(req.body.Salud, 'i'), Fec_Nac: new RegExp(req.body.Fec_Nac, 'i'), DV: new RegExp(req.body.DV, 'i')})
    .then((data) => {
      res.json(data)
    })
})
module.exports = router
