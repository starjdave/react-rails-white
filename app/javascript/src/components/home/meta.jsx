// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

// -----------------------------------------------
// COMPONENT->META -------------------------------
// -----------------------------------------------
class Meta extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = { canonical: this.props.brand.canonical };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.setCanonical();
  }

  // Set Canonical
  // ---------------------------------------------
  setCanonical = () => {
    let secure = this.state.canonical.startsWith("http");
    if (!secure) {
      this.setState({ canonical: `https://${this.state.canonical}` });
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <Helmet>
        <title>{this.props.brand.home.meta_title}</title>
        <link rel="canonical" href={this.state.canonical} />
        <meta name="description" content={this.props.brand.home.meta_description} />
        <meta itemprop="name" content={this.props.brand.name} />
        <meta itemprop="description" content={this.props.brand.home.meta_description} />
        <meta itemprop="image" content="https://example.com/image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={this.props.brand.brand_info.social.social_twitter} />
        <meta name="twitter:url" content={this.props.brand.canonical} />
        <meta name="twitter:title" content={this.props.brand.home.meta_title} />
        <meta name="twitter:description" content={this.props.brand.home.meta_description} />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:site_name" content={this.props.brand.name} />
        <meta property="og:title" content={this.props.brand.home.meta_title} />
        <meta property="og:description" content={this.props.brand.home.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={this.props.brand.canonical} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:street-address" content={this.props.brand.home.location.adr_street} />
        <meta property="og:locality" content={this.props.brand.home.location.adr_city} />
        <meta property="og:region" content={this.props.brand.home.location.adr_state} />
        <meta property="og:postal-code" content={this.props.brand.home.location.adr_postal_code} />
        <meta property="og:country-name" content={this.props.brand.home.location.adr_country} />
        <meta property="og:email" content={this.props.brand.contact.email} />
        <meta property="og:phone_number" content={this.props.brand.contact.phone_primary.number} />
        {/* JSON/LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "${this.props.brand.name}",
            "url": "${this.props.brand.canonical}",
            "telephone": "${this.props.brand.contact.phone_primary.number}",
            "image": "${this.props.brand.logo_image.url}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${this.props.brand.home.location.adr_street}",
              "addressLocality": "${this.props.brand.home.location.adr_city}",
              "addressRegion": "${this.props.brand.home.location.adr_state}",
              "postalCode": "${this.props.brand.home.location.adr_postal_code}",
              "addressCountry": "${this.props.brand.home.location.adr_country}"
            }
          }
        `}</script>
      </Helmet>
    );
  }
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Meta);