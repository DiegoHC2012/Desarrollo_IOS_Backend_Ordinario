export default interface WhiteLabelDTO {
  name: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  welcomeMessage: string;
  homeText: string;
  supportUrl: string;
}
