
const moment = require('moment');
const knex = require('../../../database/knex.config')()


function uploadData() {
    return {
        async uploadImages(req, res) {
            try {
                const { images, videos } = req.files;
                const { name, description, location } = req.body;

                if (!images || images.length === 0) {
                    return res.status(400).json({
                        status: false,
                        message: "No images uploaded"
                    });
                }
                if (!videos || videos.length === 0) {
                    return res.status(400).json({
                        status: false,
                        message: "No videos uploaded"
                    });
                }
                const imagePaths = images.map(image => `/upload/${image.filename}`)
                const videoPaths = videos.map(video => `/upload/${video.filename}`)

                const insertedData = [];

                for (let i = 0; i < imagePaths.length; i++) {
                    const [mediaData] = await knex('upload-images').insert({
                        images: imagePaths[i],
                        videos: videoPaths[i],
                        name: name,
                        description: description,
                        location: location
                    }).returning('*');
                    insertedData.push(mediaData);
                }

                return res.status(200).json({
                    status: true,
                    message: "Media uploaded successfully",
                    data: insertedData
                });

            } catch (error) {
                console.error("Error in upload img", error);
                return res.status(500).json({
                    status: false,
                    message: "Something went wrong"
                });
            }
        },

        async allData(req, res) {
            try {
                // const { id } = req.params;

                // const allImages = await knex('upload-images').select('id','images','videos','location','name','description');

                // if (!allImages) {
                //     return res.status(404).json({
                //         status: false,
                //         message: "images not found",

                //     });
                // }
                // const { page = 1, limit = 20 } = req.query; 

                // const offset = (page - 1) * limit;

                // const allImages = await knex('upload-images')
                //     .select('id', 'images', 'videos', 'location', 'name', 'description')
                //     .limit(limit)
                //     .offset(offset);

                // const totalRecords = await knex('upload-images').count('id as count').first();
                // const totalPages = Math.ceil(totalRecords.count / limit);


                // const BASE_URL = 'http://192.168.1.27:3232';
                const BASE_URL = `${req.protocol}://${req.get('host')}`;

                const allImages = await knex('upload-images').select('id', 'images', 'videos', 'location', 'name', 'description');

                if (!allImages || allImages.length === 0) {
                    return res.status(404).json({
                        status: false,
                        message: "Images not found",
                    });
                }

                // Modify each image and video path to include the base URL
                const modifiedImages = allImages.map(image => {
                    return {
                        ...image,
                        images: `${BASE_URL}${image.images}`,
                        videos: `${BASE_URL}${image.videos}`
                    };
                });

                return res.status(200).json({
                    status: true,
                    data: modifiedImages,
                });


                // if (!allImages.length) {
                //     return res.status(404).json({
                //         status: false,
                //         message: "Images not found",
                //     });
                // }

                // return res.json({
                //     status: true,
                //     message: "Images retrieved successfully",
                //     data: allImages,
                    // pagination: {
                    //     totalRecords: totalRecords.count,
                    //     totalPages,
                    //     currentPage: parseInt(page),
                    //     pageSize: parseInt(limit)
                    // }
                // });
                // return res.json({
                //     status: true,
                //     message: "Images get successfully ",
                //    data:allImages
                // });

            } catch (error) {
                console.error("Error in get images", error);
                return res.status(500).json({
                    status: false,
                    message: "Something went wrong"
                });
            }


        },

        async linkData(req, res) {
            try {
                const { link, duration } = req.body;
                const insertedData = [];
                const [data] = await knex('link-data').insert({
                    link: link,
                    duration: duration
                }).returning('*');
                insertedData.push(data);



                return res.status(200).json({
                    status: true,
                    message: "Link data added successfully",
                    data: insertedData
                });
            } catch (error) {
                console.error("error in add link", error)
                return res.status(500).json({
                    status: false,
                    message: "Something went wrong"
                });

            }
        },
        async linkDataGet(req, res) {
            try {
                const allData = await knex('link-data').select('id', 'link', 'duration');
                if (!allData) {
                    return res.status(404).json({
                        status: false,
                        message: "link data not found",
                    });
                }
                return res.json({
                    status: true,
                    message: "link data get successfully ",
                    data: allData
                });
            } catch (error) {
                console.error("Error in link data", error);
                return res.status(500).json({
                    status: false,
                    message: "Something went wrong"
                });
            }


        },



    }


}


module.exports = uploadData