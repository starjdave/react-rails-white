// Dependencies
// -----------------------------------------------
import React from 'react';
import capitalize from 'lodash/capitalize';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->SINGLE-OWNER -----------------------
// -----------------------------------------------
class SingleOwner extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const managerName = this.props.listing.property_manager.name

    return (
      <section id="details-owner">
        <header>
          <h3>{translate(`cx.details.manager`)}</h3>
        </header>
        <main>
          <h4>{managerName}</h4>
          <p>
            <a
              href="#"
              onClick={() => document.getElementById('contact-owner').click()}
            >
              Contact Owner
            </a>
          </p>
        </main>
      </section>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(SingleOwner);