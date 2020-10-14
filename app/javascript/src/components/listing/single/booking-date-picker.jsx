// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
//import WidgetDatePicker from 'sharedComponents/WidgetDatePicker';

// -----------------------------------------------
// COMPONENT->BOOKING-DATE-PICKER ----------------
// -----------------------------------------------
class BookingDatePicker extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.checkInDate || null,
      endDate: this.props.checkOutDate || null
    };
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  // On Dates Change
  // ---------------------------------------------
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.props.respondToDatesChange(this.state.startDate, this.state.endDate);
    });
  }

  // Is Outside Range
  // ---------------------------------------------
  isOutsideRange = day => {
    const today = moment();
    const limitEnd = moment().add(3, 'years');
    const isBeforeToday = !isInclusivelyAfterDay(day, today);
    const isAfterLimitEnd = !isInclusivelyBeforeDay(day, limitEnd);
    return isBeforeToday || isAfterLimitEnd;
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {/* <WidgetDatePicker
          bookingCalendar={this.props.listing.availability_calendar}
          organizationID={this.props.brand.organization_id}
          unitID={this.props.listing.unit.id}
          onDatesChange={this.onDatesChange}
          initialStartDate={this.state.startDate}
          initialEndDate={this.state.endDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          isOutsideRange={this.isOutsideRange}
          displayFormat={this.props.brand.displayFormat}
          readOnly
        /> */}
      </div>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {},
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(BookingDatePicker);