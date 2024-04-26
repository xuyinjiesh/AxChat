import { useContext } from "react";
import { UserContext } from "../App";



const ContactPage = () => {
  const authState = useContext(UserContext);

  return (
    <p id="zero-state">
      This is a demo for React Router.

    </p>
  );
}


export default ContactPage;