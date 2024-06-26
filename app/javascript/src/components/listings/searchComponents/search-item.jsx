// Dependencies
// -----------------------------------------------
import React from 'react';
import { get } from 'lodash';
import Link from '../resources/link';
import styled from 'styled-components';
import Rater from 'react-rater';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import StarContainer from '../resources/star-container';

// Styled Components
// -----------------------------------------------
const RatingContainer = styled(StarContainer)`
  display: flex;
  align-items: center;

  .react-rater {
    margin-left: 8px;
  }
`;

const HeaderWithRating = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoltCircle = styled.div`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bolt-icon {
    width: 12px;
    height: 20px;
  }
`;

// -----------------------------------------------
// COMPONENT->SEARCH-ITEM ------------------------
// -----------------------------------------------
const SearchItem = props => {
  const translate = ReactI18n.getIntlMessage;

  const renderPrice = () => {
    const { currency, bookable_nightly_price, listings } = { ...props.result };
    if (listings) {
      const promoPriceHigherThanBase = listings[0]['bookable_nightly_price'] < listings[0]['bookable_nightly_price_before_promotion'];
      return promoPriceHigherThanBase ? 
        <>{renderStrikethroughPrice()}</>
        : (
        <span>{' '}
          |{' '}
          { !props.datesSet && "From " }
          {translate(`global.parsers.currency.${currency}`, {
            value: Math.round(
              props.result.listings[0]['bookable_nightly_price']
            )
          })}
        </span>
      );
    } else {
      return (
        <span>{' '}
          |{' '}
          { !props.datesSet && "From " }
          {translate(`global.parsers.currency.${currency}`, {
            value: Math.round(bookable_nightly_price)
          })}
        </span>
      );
    }
  };

  const renderStrikethroughPrice = () => {
    const { currency, listings } = { ...props.result };
    return (
        <>
          {' '}
          <span>
            |{' '}
            { !props.datesSet && "From " }
            <span style={{ textDecoration: 'line-through', color: 'red' }}>{' '}
              {translate(`global.parsers.currency.${currency}`, {
                value: Math.round(
                  listings[0][
                    'bookable_nightly_price_before_promotion'
                  ]
                )
              })}
            </span>
          </span>
          {' '}
          {' '}
          <span>
            {translate(`global.parsers.currency.${currency}`, {
              value: Math.round(
                listings[0]['bookable_nightly_price']
              )
            })}
          </span>
        </>
    ) 
  }

  const renderAddress = () => {
    const location = props.result.location;
    return (
      <address>
        {location.adr_city}, {location.adr_state}, {location.adr_country}
      </address>
    );
  };

  const renderInstantBooking = instantBooking => {
    return (
      instantBooking &&
      props.datesSet && (
        <BoltCircle>
          <i className="bolt-icon" />
        </BoltCircle>
      )
    );
  };

  const renderInfo = () => {
    const { property, listings } = { ...props.result };
    const listing = listings[0];
    if (property.multi_unit && props.theme == 'default') {
      return (
        <section>
          <ul>
            <li>
              {translate(`global.property_type.${property.property_type}`)}
            </li>
            <li>
              {translate(`cx.search.num_units`, {
                num: listings.length,
                s: listings.length == 1 ? '' : 's'
              })}
            </li>
          </ul>
        </section>
      );
    } else {
      const unit = listing.unit;
      return (
        <section>
          <ul>
            <li>{translate(`global.unit_type.${unit.unit_type}`)}</li>
            <li>
              {translate(`cx.search.num_sleep`, {
                num: unit.num_sleep,
                s: unit.num_sleep == 1 ? '' : 's'
              })}
            </li>
            {unit.num_bedrooms != 0 && (
              <li>
                {translate(`cx.search.num_bedrooms`, {
                  num: unit.num_bedrooms,
                  s: unit.num_bedrooms == 1 ? '' : 's'
                })}
              </li>
            )}
            {unit.num_bathrooms && (
              <li>
                {translate(`cx.search.num_bathrooms`, {
                  num: unit.num_bathrooms,
                  s: unit.num_bathrooms == 1 ? '' :'s'
                })}
              </li>
            )}
          </ul>
        </section>
      );
    }
  };

  const getImageUrl = () => {
    const featuredImage = props.result.featured_image;
    const image = featuredImage && featuredImage.image;
    if (image) {
      if (
        !featuredImage.image_processing &&
        image.small &&
        image.small.url !== ''
      ) {
        return image.small.url;
      } else {
        return image.url;
      }
    } else {
      return '';
    }
  };

  const {
    slug,
    featured,
    name,
    review_count,
    review_average,
    instant_booking
  } = {
    ...props.result
  };

  return (
    <figure className="search-item">
      <Link
        href={ get(props, 'result.room_type_id') ? `/listings/${slug}/unit/${get(props, 'result.default_unit_id') + props.getStringifiedQueryString() + `&room=${get(props, 'result.room_type_id')}`}` : `/listings/${slug + props.getStringifiedQueryString()}` }
        target="_blank"
      >
        <div
          className="featured-image"
          style={{ backgroundImage: `url(${getImageUrl()})` }}
        >
          {featured ? (
            <figure className="featured-listing-banner">
              <i>★</i>
              <span>{translate(`cx.global.listing.featured.single`)}</span>
            </figure>
          ) : null}
          {renderInstantBooking(instant_booking)}
        </div>
        <div
          style={{
            width: 'calc(100% - 272px)',
            borderBottom: '1px solid rgba(0,0,0,0.15)'
          }}
        >
          <HeaderWithRating>
            <span>
              <b>{name}</b>
              <span>{renderPrice()}</span>
            </span>
            {review_count > 0 && (
              <RatingContainer>
                <label>{review_count} Reviews</label>
                <Rater
                  rating={parseFloat(review_average)}
                  interactive={false}
                />
              </RatingContainer>
            )}
          </HeaderWithRating>

          {renderAddress()}
          {renderInfo()}
        </div>
      </Link>
    </figure>
  );
};

export default SearchItem;
