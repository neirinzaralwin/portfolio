import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const WelcomeEmail = ({ userFirstname }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Nei Rin Zara Lwin portfolio</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", margin: "0" }}>Nei Rin Zara Lwin</h1>
        </Section>
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thank you for reaching out and contacting me.
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://www.linkedin.com/in/nei-rin-zara-lwin/"
          >
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          Nei Rin Zara Lwin
        </Text>
        <Hr style={hr} />
        <Text style={footer}>+66945959233</Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000000", // Changed to blue color
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
