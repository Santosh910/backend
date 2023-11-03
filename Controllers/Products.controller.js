
import productModel from "../Modals/product.model.js"

export const getAllProduct = (req, res) => {
    res.send("All products.....")
}

export const getSingleProduct = (req, res) => {
    res.send("Single Products..... ")
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image, id } = req.body;
        if (!name || !price || !category || !image) return res.status(404).json({ success: false, message: "all fields mandotory" })

        const product = new productModel({
            name,
            price,
            category,
            image: image,
            userId: id
        })
        console.log(product, "-product here")
        const ress = await product.save();
        console.log(ress, "respone from mongodb ")
        return res.status(200).json({ success: true, message: "product added successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }

}