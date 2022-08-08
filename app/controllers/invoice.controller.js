const invoice = require('../services/invoice.services');
const product = require('../services/product.services');

const getFirstLetter = (words) => {
	let matches = words.match(/\b(\w)/g);
	return matches.join('').toUpperCase();
}

const intToChar = (int) => {
	const code = 'A'.charCodeAt(0);
	return String.fromCharCode(code + int);
}

exports.addNewInvoice = (req, res) => {
	let d = new Date();
	let nd = getFirstLetter(req.body.toName) + "-" + d.getFullYear() + (d.toLocaleString('en-us', { month: 'short' }).toUpperCase()) + d.getDate();
	invoice.findInvoiceById(nd).then((resp) => {
		console.log(resp)
		let id = resp[0].Ids ? parseInt(resp[0].Ids) : 0;
		req.body.invoice_id = nd + "-" + intToChar(id);
		id = req.body.invoice_id;
		invoice.addNewInvoice(req).then((response) => {
			invoice.addPayment(req).then((resp) => {
				return res.send(id).status(200);
			});
		});
	})
};

exports.updateInvoice = (req, res) => {
	invoice.updateInvoice(req).then((response) => {
		return res.send(response).status(200);
	});
};

exports.addPayments = (req, res) => {
	invoice.addPayment(req).then((r) => {
		invoice
			.changePaymentType(req.body.payment_type, req.body.invoice_id)
			.then((resp) => {
				return res.send(resp).status(200);
			});
	});
};

exports.addInvoice = (req, res) => {
	invoice.addDraft(req).then((response) => {
		return res.send(response).status(200);
	});
};

exports.addAddress = (req, res) => {
	invoice.addAddress(req).then((response) => {
		return res.send(response).status(200);
	});
};



exports.markInvoiceAsPrint = (req, res) => {
	invoice.markInvoiceAsPrint(req.params.id).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getAddressOfInvoice = (req, res) => {
	invoice.getAddressOfInvoice(req.params.id).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getDraftInvoices = (req, res) => {
	let page = req.body.page;
	// TODO:: remove this. this is before pagination.
	page = 10;
	let end = page > 1 ? page * 10 : 10;

	try {
		invoice.getDrafts(end).then((response) => {
			return res.send(response).status(200);
		});
	} catch (e) {
		console.log(e.getMessage());
	}

};

exports.getInvoicePayments = (req, res) => {
	invoice.getInvoicePayments(req.params.id).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getInvoiceDetails = (req, res) => {
	invoice.getDetails(req.params.id).then((response) => {
		return res.send(response).status(200);
	});
};

exports.deleteInv = async (req, res) => {
	invoice.deleteInvoice(req.params.id).then((response) => {
		return res.send(response).status(200);
	});
}

exports.removeItemFromEstimate = async (req, res) => {
	invoice.removeItem(req.params.id, req.params.code, req.params.cost).then((response) => {
		return this.getInvoiceDetails(req, res);
	});
};

exports.markAsInvoice = (req, res) => {
	invoice.markIt(req.params.id).then((response) => {
		// return res.status(200).send(response);
		invoice.markStatusChange(req.params.id, 2).then((response) => {
			return res.status(200).send(response);
		});
	});
};

exports.invoicePayment = (req, res) => {
	invoice.invoicePayment(req).then((response) => {
		return res.status(200).send(response);
	});
};

exports.markAsPaid = (req, res) => {
	invoice.markAsPaid(req.params.id).then((response) => {
		return res.status(200).send(response);
	});
};

exports.markStatusChange = (req, res) => {
	let statusId = 1;
	switch (req.params.as) {
		case 'rejected':
			statusId = 3;
			break;
		case 'accepted':
			statusId = 2;
			break;
	}
	invoice.markStatusChange(req.params.id, statusId).then((response) => {
		return res.status(200).send(response);
	});
};

// ========== Invoices.

exports.getPrintedList = (req, res) => {
	let page = req.body.page;
	// TODO:: remove this. this is before pagination.
	page = 10;
	let to = page > 1 ? page * 10 : 10;
	invoice.getPrintedList(to).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getInvoiceList = (req, res) => {
	let page = req.body.page;
	// TODO:: remove this. this is before pagination.
	page = 10;
	let to = page > 1 ? page * 10 : 10;
	invoice.getInvoiceList(to).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getPaidInvoiceList = (req, res) => {
	let page = req.body.page;
	// TODO:: remove this. this is before pagination.
	page = 10;
	let to = page > 1 ? page * 10 : 10;
	invoice.getPaidInvoiceList(to).then((response) => {
		return res.send(response).status(200);
	});
};

exports.searchInvoices = (req, res) => {
	let ss = req.body.ss;
	let page = req.body.page;
	// TODO:: remove this. this is before pagination.
	page = 10;
	let to = page > 1 ? page * 10 : 10;
	invoice.searchInvoices(ss, to).then((response) => {
		return res.send(response).status(200);
	});
};

exports.validateReturnProduct = (req, res) => {
	let pid = req.params.pid;
	let id = req.params.id;
	invoice.validateReturnProduct(id, pid).then(response => {
		console.log(response);
		if (response.length) {
			product.getProductDetails(pid).then(resp => {
				resp[0].quantity = response[0].quantity
				return res.send(resp).status(200);
			})
		} else {
			return res.send(response).status(200);
		}
		// return res.send(response).status(200);
	})
}

exports.returnProducts = async (req, res) => {
	// add to returning products. 
	let d = new Date();
	let retDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(0)
	d = new Date(retDate);
	await req.body.formValues.map(async f => {
		f.damaged_cost = f.damaged_cost !== undefined ? f.damaged_cost : 0;
		f.isDamaged = f.isDamaged ? 1 : 0;
		// adding to returning products
		await invoice.addReturnProducts(f, retDate, req.body.invoice_id)

		// calculate enddates and update final amount.
		let p = await product.getProductDetails(f.code);
		await invoice.updateEndDates(p, f, retDate, req.body.invoice_id);
	})
	return await res.send(true).status(200);
}

exports.returnList = async (req, res) => {
	invoice.returnList(req).then(resp => {
		res.send(resp).status(200)
	})
}

exports.getReturnDetails = async (req, res) => {
	let t = req.params.type === 'returned' ? 0 : 1
	invoice.getReturnDetails(req.params.id, t).then(resp => {
		res.send(resp).status(200)
	})
}
