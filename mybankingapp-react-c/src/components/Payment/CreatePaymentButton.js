import React from "react";
import { Link } from "react-router-dom";

const CreatePaymentButton = () => {
  return (
    <React.Fragment>
      <Link to="/addPayment" className="waves-effect waves-light btn-large">
        Add Payment
      </Link>
    </React.Fragment>
  );
};
export default CreatePaymentButton;
