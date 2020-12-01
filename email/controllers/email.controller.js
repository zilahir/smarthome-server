const MailConfig = require('../../services/email')
const hbs = require('nodemailer-express-handlebars');
const { format } = require('date-fns');
const smtpTransport = MailConfig.SMTPTransport
const { groupBy } = require('lodash/groupBy')

exports.sendOrderConfirmationEmail = (req, res) => {
  MailConfig.ViewOption(smtpTransport, hbs)
  const orderConfirmObject = {
    items: req.foundShoppingList.items.map(curr => curr.productName) // this is a dirty hack for handlebars, sorry
  }

  console.debug('orderConfirmObject', orderConfirmObject.items)

  const helperOptions = {
    from: '"smarthome@richardzilahi" <smarthome@richardzilahi.hu>',
    to: 'zilahi@gmail.com',
    subject: 'demo',
    template: 'confirm_order',
    context: {
      items: orderConfirmObject.items,
      date: format(new Date(), 'yyyy-MM-dd hh:mm')
    }
  }

  console.debug('we are sending email')
  smtpTransport.sendMail(helperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }
    res.status(200).send({
      isSuccess: true,
      emailSent: true,
    })
  });
}