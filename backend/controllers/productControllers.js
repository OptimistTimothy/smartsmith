import Product from '../models/productModel.js';

export const productControllers = {
	getAllProducts: async (req, res) => {
		try {
			const products = await Product.find({});
			// res.status(401);
			// throw new Error('Not Authorized');
			return res.status(200).json({ msg: 'All products', data: products });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	getOneProduct: async (req, res) => {
		try {
			// const product = await Product.find((p) => p._id === req.params.id);

			const product = await Product.findById(req.params.id);

			if (product) {
				return res.status(200).json({ msg: 'One product', data: product });
			} else {
				return res.status(404).json({ msg: 'Product not found' });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};