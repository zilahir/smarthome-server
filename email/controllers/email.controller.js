const MailConfig = require('../../services/email')
const hbs = require('nodemailer-express-handlebars');
const { format } = require('date-fns');
const smtpTransport = MailConfig.SMTPTransport

exports.sendOrderConfirmationEmail = (req, res) => {
  MailConfig.ViewOption(smtpTransport, hbs)
  const orderConfirmObject = {
    demo: 'ketchup'
  }

  const helperOptions = {
    from: '"smarthome@richardzilahi" <smarthome@richardzilahi.hu>',
    to: 'zilahi@gmail.com',
    subject: 'demo',
    template: 'confirm_order',
    context: {
      demo: orderConfirmObject.demo,
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