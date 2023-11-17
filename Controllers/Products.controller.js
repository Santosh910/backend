
import productModel from "../Modals/product.model.js"

export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        if (products.length) {
            return res.status(200).json({ messsage: "products found...", products: products })
        }
        return res.status(404).json({ success: false, message: "product not found" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }

}

export const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(404).json({ message: "product id nt found", success: false })

        const product = await productModel.findById(productId).limit(10).select("name")
        if (product) {
            return res.status(200).json({ success: true, message: "products found", product: product })
        }
        return res.status(404).json({ success: false, message: "product not found" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
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

export const filterProducts = async (req, res) => {
    try {
        const { skip, page = 10, query, sorting } = req.body;

        const updateQuery = { category: query }

        const name = sorting.replace(/^-/, "")
        const order = sorting[0] == "-" ? "-" : "";

        const updateSorting = { [name]: `${order}1` }
        console.log(updateSorting)

        const products = await productModel.find(updateQuery).skip(skip * 10).limit(page).sort(updateSorting)

        return res.status(200).json({ message: "products found", products })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}