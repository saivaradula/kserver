const invoice = require('../controllers/invoice.controller');
var router = require('express').Router();
router.post('/new', invoice.addNewInvoice);
router.post('/update', invoice.updateInvoice);
router.post('/draft', invoice.addInvoice);
router.get('/draft', invoice.getDraftInvoices);
router.get('/:id/address', invoice.getAddressOfInvoice);
router.post('/:id/address', invoice.addAddress);
router.get('/:id/details', invoice.getInvoiceDetails);
router.get('/:id/payments', invoice.getInvoicePayments);
router.delete('/:id/:code/:cost', invoice.removeItemFromEstimate);
router.post('/mark/:id', invoice.markAsInvoice);
router.post('/:id/mark/:as', invoice.markStatusChange);
router.get('/payment/:id', invoice.invoicePayment);
router.post('/payment/:id', invoice.addPayments);

router.get('/list', invoice.getInvoiceList);
router.post('/markpaid/:id', invoice.markAsPaid);
router.get('/paid', invoice.getPaidInvoiceList);

module.exports = router;
