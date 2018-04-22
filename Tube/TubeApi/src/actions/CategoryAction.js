const CategoryModal = require('../model/category');
const CourseModal = require('../model/course');

module.exports = {

    getAllCategory: function(req,res) {
        new Promise((resolve, reject)=> {
            CategoryModal.getAll(function (categoryRes) {
                resolve({status:true,data:categoryRes});
            });
        }).then((response) => {
            res.json(response);
        });
    },

    getAllCourseByCategory: function(req,res) {
        const { categoryId } = req.params;
        new Promise((resolve, reject)=> {
            CourseModal.getByCategoryId(categoryId,function (courseRes) {
                resolve({status:true,data:courseRes});
            });
        }).then((response) => {
            res.json(response);
        });
    },

};
