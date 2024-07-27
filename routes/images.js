
const uploadData = require('../web/controllers/images/upload-img.js')
const { singleFileUpload, multiFieldsUpload } = require("../web/helper/index")

function product(app) {


  app.post('/api/upload-images',multiFieldsUpload(
    [
      { name: 'images', maxCount: 200 },
      { name: 'videos', maxCount: 200 }
    ]), uploadData().uploadImages),

    app.get('/api/all-images',uploadData().allData)

    app.post('/api/add-data',uploadData().linkData)
    app.get('/api/link-data',uploadData().linkDataGet)

}

module.exports = product