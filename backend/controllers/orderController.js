import Order from '../models/orderModel.js';

export const orderControllers = {
	// @desc CREATE NEW ORDER
	// @route POST /api/orders
	// @access PRIVATE
	addOrderItems: async (req, res) => {
		try {
			const {
				orderItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			} = req.body;
			if (orderItems && orderItems.length === 0) {
				return res.status(400).json({ msg: 'No order items' });
			} else {
				const order = new Order({
					orderItems,
					user: req.user._id,
					shippingAddress,
					paymentMethod,
					itemsPrice,
					taxPrice,
					shippingPrice,
					totalPrice,
				});

				const createdOrder = await order.save();
				return res
					.status(201)
					.json({ msg: 'New order created successfully', data: createdOrder });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	// @desc GET ORDER BY ID
	// @route GET /api/orders:id
	// @access PRIVATE
	getOrderItems: async (req, res) => {
		try {
			const order = await Order.findById(req.params.id).populate(
				'user',
				'name email',
			);

			if (order) {
				return res.status(200).json({ msg: 'Your order', data: order });
			} else {
				return res.status(400).json({ msg: 'Your order was not found' });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	updateOrderToPaid: async (req, res) => {
		try {
			const order = await Order.findById(req.params.id);

			if (order) {
				order.isPaid = true;
				order.paidAt = Date.now();
				order.paymentResult = {
					id: req.body.id,
					status: req.body.status,
					update_time: req.body.update_time,
					email_address: req.body.payer.email_address,
				};
				const updatedOrder = await order.save();

				return res.status(200).json({ msg: 'Your order', data: updatedOrder });
			} else {
				return res.status(400).json({ msg: 'Your order was not found' });
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};
