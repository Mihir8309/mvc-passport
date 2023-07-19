const categoryTBl = require('../models/categoryTBL');
const subCategoryTBL = require('../models/subCategoryTBL');
const exSubCategoryTBL = require('../models/exSubCategoryTBL');

const extraSubCategory = async (req, res) => {
  try {
    const category = await categoryTBl.find({});
    const subcategory = await subCategoryTBL.find({});
    const exsubcategory = await exSubCategoryTBL.find({})
      .populate('categoryId')
      .populate('subcategoryId');

    return res.render('exsub_category', {
		category,
		subcategory,
		exsubcategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

const addSubSubCategory = async (req, res) => {
  try {
    const { category, subcategory, exsubcategory } = req.body;
    const trimmedCategoryId = category.trim();
    const trimmedsubCategoryId = subcategory.trim();

    const addExtraSubCategory = await exSubCategoryTBL.create({
      categoryId: trimmedCategoryId,
      subcategoryId: trimmedsubCategoryId,
      exsubcategory: exsubcategory,
    });

    if (addExtraSubCategory) {
      console.log("Extra subcategory added successfully");
      return res.redirect('back');
    } else {
      console.log("Failed to add extra subcategory");
      return res.status(500).send('Failed to add extra subcategory');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  extraSubCategory,
  addSubSubCategory,
};
