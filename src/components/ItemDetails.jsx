import React from "react";
import { MDBInput } from "mdb-react-ui-kit";
import Image01 from "../assets/Image01.jpg";
function ItemDetails() {
  return (
    <div>
      <div className="card mb-4 card bg-secondary text-white rounded-3 shadow p-3">
        <div className="card-body border border-white rounded-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  className="img-fluid rounded-3"
                  alt="Shopping item"
                  style={{ width: 65 }}
                />
              </div>
              <div className="ms-3">
                <h5>Iphone 11 pro</h5>
                <p className="small mb-0">256GB, Navy Blue</p>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div style={{ width: 50 }}>
                <h5 className="fw-normal mb-0">2</h5>
              </div>
              <div style={{ width: 80 }}>
                <h5 className="mb-0">$900</h5>
              </div>
              <a href="#!" style={{ color: "#cecece" }}>
                <i className="fas fa-trash-alt text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
