const storage = require('../configs/storage')

const getAllProduct = async (req, res, next) => {
    try {
        let data = await storage.getItem('data');

        if (data.length > 0) {
            return res.status(200).json({
                'message': 'data fetched successfully',
                'data': data
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No data found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getProductByPlatform = async (req, res, next) => {
    try {
        const platform = req.params.platform;
        let data = await storage.getItem('data');
        if (platform) {
            return res.status(200).json({
                'message': 'plateform query successfully',
                'platform': platform,
                'data': data
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'Please provide platform'
        });
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const addData = async (req, res, next) => {
    try {

        const obj = req.body;
        if (typeof obj !== "object") {
            return res.status(422).json({
                'code': 'REQUIRED_JSON_OBJECT_MISSING',
                'description': 'object is required'
            });
        }

        if (obj) {
            let data = await storage.getItem('data');
            data.push(obj)
            await storage.setItem('data', data)
            return res.status(200).json({
                'message': 'data added successfully',
                'data': data
            });
        }
        else {
            throw new Error('something went worng');
        }
    } catch (error) {
        console.log('error ', error)
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}


module.exports = {
    getAllProduct: getAllProduct,
    getProductByPlatform: getProductByPlatform,
    addData: addData
}