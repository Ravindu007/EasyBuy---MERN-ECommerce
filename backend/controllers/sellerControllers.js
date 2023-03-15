const productModel = require("../models/productModel")

// get all products - seller listed
const getAllSellerProducts = async(req,res)=>{
  try {
    const allProducts = await productModel.find({}).sort({createdAt:-1})
    res.status(200).json(allProducts)
  } catch (error) {
    res.status(400).json(error)
  }
}


// create product
const createSellerProduct = async(req,res) => {
  const {productName, productCategory, numberOfItems} = req.body

  try{
    const files = req.files;

    if (!files || files.length < 3) {
      res.status(400).send('Please upload three product images.');
      return;
    } else {
      const imageUrls = [];

      for (let i = 0; i < 3; i++) {
        const file = files[i];
        const fileName = file.originalname;
        const fileRef = bucket.file(fileName);
        
        const stream = fileRef.createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        });

        stream.on("error", (err) => {
          console.log(err);
          res.status(500).json({ error: 'An error occurred while uploading the images.' });
        });

        await new Promise((resolve, reject) => {
          stream.on("finish", async () => {
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
            imageUrls.push(imageUrl);

            if (imageUrls.length === 3) {
              try {
                const product = await productModel.create({
                  productName,
                  productCategory,
                  numberOfItems,
                  productImage1: imageUrls[0],
                  productImage2: imageUrls[1],
                  productImage3: imageUrls[2]
                });

                res.status(200).json(product);
              } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'An error occurred while creating the product.' });
              }
            }

            resolve();
          });
        });

        stream.end(file.buffer);
      }
    }
  }catch(error){
    res.status(400).json(error)
  }
}


// update
const updateSellerProduct = async (req, res) => {
  const productId = req.params.id;
  const { productName, productCategory, numberOfItems, productImage1, productImage2, productImage3 } = req.body;
  const updateObj = {};

  if (productName) {
    updateObj.productName = productName;
  }
  if (productCategory) {
    updateObj.productCategory = productCategory;
  }
  if (numberOfItems) {
    updateObj.numberOfItems = numberOfItems;
  }
  if (productImage1) {
    const file = req.file;
    const fileName = file.originalname;
    const fileRef = bucket.file(fileName);
    
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while uploading the image.' });
    });

    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
        updateObj.productImage1 = imageUrl;

        resolve();
      });
    });

    stream.end(file.buffer);
  }
  if (productImage2) {
    const file = req.file;
    const fileName = file.originalname;
    const fileRef = bucket.file(fileName);
    
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while uploading the image.' });
    });

    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
        updateObj.productImage2 = imageUrl;

        resolve();
      });
    });

    stream.end(file.buffer);
  }
  if (productImage3) {
    const file = req.file;
    const fileName = file.originalname;
    const fileRef = bucket.file(fileName);
    
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    stream.on("error", (err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred while uploading the image.' });
    });

    await new Promise((resolve, reject) => {
      stream.on("finish", async () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/products/${fileName}`;
        updateObj.productImage3 = imageUrl;

        resolve();
      });
    });

    stream.end(file.buffer);
  }

  try {
    const product = await productModel.findByIdAndUpdate(productId, updateObj, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while updating the product.' });
  }
};

module.exports = {getAllSellerProducts, createSellerProduct,updateSellerProduct}