module.exports = async (req, res) => {
  const nodemailer = require('nodemailer')
  require('dotenv').config()

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const sender = `${req.body.name} <${req.body.email}>`
  const destiny = `${req.body.destiny}`
  const message = `
<p>
  ${req.body.message}
</p>
</br>
<p>
  Este formulário foi enviado pela <strong><a target="_blank" href="https://easyforms.vercel.app">EasyForms</a>&copy;</strong>.
</p>
`
  

  if (message) {
    try {
      await transporter.sendMail({
        from: sender,
        html: message,
        subject: 'Formulário de contato',
        to: destiny,
        replyTo: sender
      })
  
      await transporter.sendMail({
        from: `EasyForms API <${process.env.EMAIL}>`,
        html: `<p>O usuário <strong>${req.body.name} - ${req.body.email}</strong> acabou de utilizar nossa api.</p>`,
        subject: 'Log de Uso | EasyForms',
        to: process.env.REPLY
      })
    } catch (error) {
      await transporter.sendMail({
        from: `EasyForms API <${process.env.EMAIL}>`,
        html: `<p>O usuário <strong>${req.body.name} - ${req.body.email}</strong> tentou utilizar nossa api.
        mas ocorreu um erro inesperado.</p>
        </br>
        </br>
        <strong><p>
        ${error}
        </p></strong>`,
        subject: 'Log de Erro | EasyForms',
        to: process.env.REPLY
      })
    }
  }
  
  res.status(200).end(`    
  <script>
  window.location.href = "http://localhost:3000/tanks.html";
  </script>`)
}