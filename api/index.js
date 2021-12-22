module.exports = async (req, res) => {
  const nodemailer = require("nodemailer");
  require("dotenv").config();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sender = `${req.body.name} <${req.body.email}>`;
  const destiny = `${req.body.destiny}`;
  const message = `
<p>
  ${req.body.message}
</p>
</br>
<p>
  Este formulário foi enviado pela <strong><a target="_blank" href="https://easyforms.vercel.app">EasyForms</a>&copy;</strong>.
</p>
`;

  if (message) {
    try {
      await transporter.sendMail({
        from: sender,
        html: message,
        subject: "Formulário de contato",
        to: destiny,
        replyTo: sender,
      });

      await transporter.sendMail({
        from: `EasyForms API <${process.env.EMAIL}>`,
        html: `<p>O usuário <strong>${req.body.name} - ${req.body.email}</strong> acabou de utilizar nossa api.</p>`,
        subject: "Log de Uso | EasyForms",
        to: process.env.REPLY,
      });

      const a = 1
      a = 5

      res.status(200).end(`    
      <script>
      window.location.href = ${process.env.BASE_URL}/tanks.html;
      </script>`);
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
        subject: "Log de Erro | EasyForms",
        to: process.env.REPLY,
      });
      console.log(error) 
      res.status(400).end(`    
      <script>
      window.alert('OPS! Tivemos um erro inesperado!');
      </script>`)
    }
  }
};
