import React from "react";
import ItemDetails from "./ItemDetails";
import FieldInputCardDetails from "./CardDetails/FieldInputCardDetails";
import CardDetails from "./CardDetails/CardDetails";
import { MDBInput } from "mdb-react-ui-kit";
// import { formikProps } from "./CardDetails/FormikProps";
import { useNavigate } from "react-router-dom";
function ShoppingCartTemplate() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card bg-primary text-white rounded-3 ">
                <div className="card-body p-4 shadow p-3">
                  <div className="row">
                    <div>
                      <h3 className="mb-4 ">
                        <a href="#!" className="text-body btn btn-info ">
                          <i className="fas fa-long-arrow-alt-left me-2 text-white" />
                          <strong className="text-white">
                            Continue shopping
                          </strong>
                        </a>
                      </h3>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <h5 className="mb-1">Shopping cart</h5>
                          <p className="mb-0">You have 4 items in your cart</p>
                        </div>
                      </div>
                      <ItemDetails></ItemDetails>
                    </div>
                    <div className="row ">
                      <div class="d-flex justify-content-evenly mt-4">
                        <button
                          href="#!"
                          className="text-body btn btn-info "
                          onClick={() => navigate("/AfterPay")}
                        >
                          <strong className="text-white">AfterPay</strong>
                        </button>
                        <button
                          href="#!"
                          className="text-body btn btn-info "
                          onClick={() => navigate("/CardDetails")}
                        >
                          <strong className="text-white">Card</strong>
                        </button>
                      </div>
                    </div>
                    {/* <CardDetails {...formikProps} />; */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingCartTemplate;
