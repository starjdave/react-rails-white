// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import Link from '../links/link';

// Listing
// -----------------------------------------------
const Listing = (props) => {
  const translate = ReactI18n.getIntlMessage;
  const buildDetaisLink = () => {
    let link = '/listings/' + props.slug + '?';
    if (props.checkInDate) {
      link += '&check-in=' + props.checkInDate.format('DD-MM-YYYY');
    }
    if (props.checkOutDate) {
      link += '&check-out=' + props.checkOutDate.format('DD-MM-YYYY');
    }
    if (props.guests) {
      link += '&guests=' + props.guests;
    }
    return link;
  }

  const renderName = props => {
    if (props.unit.room_type_name){
      return `${props.unit.room_type_name} | ${props.property.name} `
    } else if (props.property.multi_unit ) {
      return `${props.property.name} | ${props.unit.name}`
    } else {
      return props.property.name
    }
  }

  return (
    <section className="checkout-info-listing">
      {props.featured_image ? (
        <div
          className="featured-image"
          style={{
            backgroundImage: `url(${props.featured_image.small})`
          }}
        />
      ) : null}
      <div className="checkout-info-subsection checkout-info-listing-header">
        <h2>{renderName(props)}</h2>
        <address>{props.obfuscated_address}</address>
        <Link to={buildDetaisLink()} target="_blank">
          {translate(`cx.global.see_details.long`)}
        </Link>
      </div>
      <div className="checkout-info-subsection">
        <table>
          <tbody>
            {props.unit.num_sleep ? (
              <tr>
                <td>{translate('cx.global.amenities.sleeps')}</td>
                <td>{props.unit.num_sleep}</td>
              </tr>
            ) : null}
            {props.unit.num_bedrooms ? (
              <tr>
                <td>{translate('cx.global.amenities.bedrooms')}</td>
                <td>{props.unit.num_bedrooms}</td>
              </tr>
            ) : null}
            {props.unit.num_bathrooms ? (
              <tr>
                <td>{translate('cx.global.amenities.bathrooms')}</td>
                <td>{props.unit.num_bathrooms}</td>
              </tr>
            ) : null}
            {props.listing.refund_policy ? (
              <tr>
                <td>{translate('cx.checkout.cancel_policy')}</td>
                <td>
                  {translate(
                    `global.refund_policy.${props.listing.refund_policy}.label`
                  )}
                  {props.listing.refund_policy === 'custom' ? (
                    <figure className="line-item-description">
                      <i />
                      <span>{props.listing.refund_policy_custom}</span>
                    </figure>
                  ) : (
                      <figure className="line-item-description">
                        <i />
                        <span>
                          {translate(
                            `global.refund_policy.${props.listing.refund_policy}.details`
                          )}
                        </span>
                      </figure>
                    )}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Export
// -----------------------------------------------
export default Listing
