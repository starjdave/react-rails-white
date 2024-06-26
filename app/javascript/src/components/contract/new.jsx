// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import moment from 'moment';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Components
// -----------------------------------------------
import Listing from '../receipt/listing';
import Pricing from '../receipt/pricing';
import SignatureCapture from '../inputs/signature-capture';

// Styles
// -----------------------------------------------
const StyledFigure = styled.figure`
  width: 100%;
  margin-bottom: 16px;
`;

// -----------------------------------------------
// COMPONENT->NEW-CONTRACT -----------------------
// -----------------------------------------------
class NewContract extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      idPhoto: null,
      signature: null,
      age_verified: false,
      address_verified: false,
      terms_accepted: false,
      adrStreet: '',
      adrUnit: '',
      adrCity: '',
      adrState: '',
      adrCountry: '',
      adrPostalCode: '',
      availability: {},
      booking: {},
      charges: [],
      customer: {},
      customerVerifiedAddress: null,
      customerVerifiedAge: null,
      customerVerifiedId: null,
      customerVerifiedSignature: null,
      featured_image: {},
      listing: {},
      location: {},
      property: {},
      rentalAgreement: {},
      propertyManager: {},
      slug: '',
      unit: {},
      verify_id: null,
      verify_id_description: '',
      verify_signature: null,
      verify_address: null,
      verify_age: null,
      required_age: null,
      contractTermsAndConditions: null
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.submitBtn.setAttribute('disabled', 'disabled');
    this.fetchVerificationInfo(this.props);
  }

  // Fetch Verification Info
  // ---------------------------------------------
  fetchVerificationInfo = props => {
    axios.get(`${process.env.DIRECT_URL}/api/v2/my-bookings/verification/${get(props, 'match.params.booking_code')}`)
    .then(response => {
      this.setState(
        {
          availability: response.data.availability,
          booking: response.data.booking,
          charges: response.data.charges,
          customer: response.data.customer,
          customerVerifiedAddress: response.data.customer_verified_address,
          customerVerifiedAge: response.data.customer_verified_age,
          customerVerifiedId: response.data.customer_verified_id,
          customerVerifiedSignature: response.data.customer_verified_signature,
          featured_image: response.data.featured_image,
          listing: response.data.listing,
          location: response.data.location,
          property: response.data.property,
          rentalAgreement: response.data.rental_agreement,
          propertyManager: response.data.property_manager,
          slug: response.data.slug,
          unit: response.data.unit,
          verify_id: response.data.verify_id,
          verify_id_description: response.data.verify_id_description,
          verify_signature: response.data.verify_signature,
          verify_address: response.data.verify_address,
          verify_age: response.data.verify_age,
          required_age: response.data.required_age,
          contractTermsAndConditions: response.data.contract_terms_and_conditions
        },
        this.checkCustomerVerification
      );
    })
    .catch(error => {
      console.log(error);
    })
  };

  // Check Customer Verification
  // ---------------------------------------------
  checkCustomerVerification = () => {
    let sig_verified = true;
    if (this.state.verify_signature && !this.state.customerVerifiedSignature) {
      sig_verified = false;
    }

    // If user is already verified, pass them directly to the confirmation page
    if (sig_verified) {
      axios.post(`${process.env.DIRECT_URL}/api/v2/my-bookings/verify/${this.state.customer.id}`, this.postData())
      .then(response => {
        window.location = `/my-bookings/receipt/${
          this.state.booking.booking_code
        }?verified=true`;
      })
      .catch(error => {
        toast.error(error);
        console.log(error);
      })
    }
  };

  // Handle Submit
  // ---------------------------------------------
  handleSubmit = e => {
    this.submitBtn.setAttribute('disabled', 'disabled');
    e.preventDefault();
    this.submitVerification();
  };

  // Submit Verification
  // ---------------------------------------------
  submitVerification = () => {
    axios.post(`${process.env.DIRECT_URL}/api/v2/my-bookings/verify/${this.state.customer.id}`, this.postData())
    .then(response => {
      window.location = `/my-bookings/receipt/${
        this.state.booking.booking_code
      }?verified=true`;
    })
    .catch(error => {
      toast.error(error);
      console.log(error);
    })
  };

  // Post Data
  // ---------------------------------------------
  postData = () => {
    const data = { booking_id: this.state.booking.id };
    if (this.state.signature) {
      data.signature_id = this.state.signature.id;
    }

    if (this.state.idPhoto) {
      data.id_photo_id = this.state.idPhoto.id;
    }

    if (this.state.address_verified) {
      data.location = {
        adr_street: this.state.adrStreet,
        adr_unit: this.state.adrUnit,
        adr_city: this.state.adrCity,
        adr_state: this.state.adrState,
        adr_country: this.state.adrCountry,
        adr_postal_code: this.state.adrPostalCode
      };
    }

    if (this.state.age_verified) {
      data.age_verified = this.state.age_verified;
    }

    return data;
  };

  // Has Invalid Fields
  // ---------------------------------------------
  hasInvalidFields = () => {
    return !this.hasValidSignature();
  };

  // Has Valid Signature
  // ---------------------------------------------
  hasValidSignature = () => {
    return this.state.signature !== null;
  };

  // Update State
  // ---------------------------------------------
  updateState = data => {
    this.setState(data);
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const checkIn = moment(this.state.booking.check_in, 'YYYY-MM-DD');
    const checkOut = moment(this.state.booking.check_out, 'YYYY-MM-DD');
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;

    return (
      <main className="checkout-main receipt-main">
        <section className="payment">
          <StyledFigure>
            <header>
              <span>Electronic Signature</span>
            </header>
            <SignatureCapture
              verify_signature={this.state.verify_signature}
              afterSave={signature => this.setState({ signature }, () => {this.submitBtn.removeAttribute('disabled', 'disabled')})}
              afterDelete={() => this.setState({ signature: null })}
              contract_terms_and_conditions={this.state.contractTermsAndConditions}
              required_age={this.state.required_age}
              verify_address={this.state.verify_address}
              verify_age={this.state.verify_age}
              age_verified={this.state.age_verified}
              booking={this.state.booking}
              updateState={this.updateState}
              {...this.props}
            />
          </StyledFigure>
          <button
            ref={submitBtn => {
              this.submitBtn = submitBtn;
            }}
            onClick={this.handleSubmit}
            type="button"
          >
            Submit Verification
          </button>
          <small
            className="ancillary"
            dangerouslySetInnerHTML={{
              __html: translate(`cx.global.book_confirm.rules`, {
                property_url: `/listings/${this.state.slug}`
              })
            }}
          />
          {this.state.rentalAgreement ? (
            <small className="ancillary">
              <span>{translate(`cx.global.book_confirm.contract`)}</span>
              <a
                href={get(this, 'state.rentalAgreement.pdf.url')}
                target={`_blank`}
              >
                {translate(`cx.global.book_confirm.contract_link`)}
              </a>
              .
            </small>
          ) : null}
        </section>

        <section className="information">
          <Listing
            checkInDate={checkIn}
            checkOutDate={checkOut}
            featured_image={this.state.featured_image}
            guests={guests}
            listing={this.state.listing}
            location={this.state.location}
            property={this.state.property}
            slug={this.state.slug}
            unit={this.state.unit}
          />
          <Pricing
            booking={this.state.booking}
            charges={this.state.charges}
            currency={currency}
            displayFormat={get(this, 'props.brand.date_format', 'MM/DD/YYYY')}
          />
        </section>
      </main>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(NewContract);
