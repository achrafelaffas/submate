package submate.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendActivationEmail(
            String to,
            String username,
            String confirmationCode,
            String subject
    ) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );

        String htmlContent = String.format(
                "<html><body><p>Hi, %s!</p><p>Thank you for signing up with submate.</p><p>Your confirmation code is: <strong>%s</strong></p></body></html>",
                username, confirmationCode
        );


        helper.setFrom("achrafelaffas@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        helper.setText(htmlContent, true);

        mailSender.send(mimeMessage);
    }

    public void SendRemindingEmail(
            String to,
            String username,
            String plateform,
            LocalDate nextPaymentDate
    ) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );


        helper.setFrom("achrafelaffas@gmail.com");
        helper.setTo(to);
        helper.setSubject("Payment reminder - Next " + plateform + " payment");

        String htmlContent = String.format(
                "<html><body><p>Hi, %s!</p><p>This is a reminder for an upcoming payment.</p><p>Your next payment date for %s is  <strong>%s</strong></p></body></html>",
                username, plateform, nextPaymentDate
        );

        helper.setText(htmlContent, true);
        mailSender.send(mimeMessage);
    }
}
