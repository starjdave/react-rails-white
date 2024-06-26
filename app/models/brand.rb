# ================================================
# RUBY->MODEL->BRAND =============================
# ================================================
class Brand < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :organization

  has_and_belongs_to_many :employees

  has_many :brand_pages
  has_many :domains
  has_many :unit_listings
  has_many :bookings, through: :unit_listings
  has_many :units, -> { distinct }, through: :unit_listings
  has_many :properties, -> { distinct }, through: :units
  has_many :legacy_redirects
  has_many :menus
  has_one :brand_footer
  has_one :brand_header
  has_one :brand_info
  has_one :brand_home_page
  has_one :location
  has_one :rental_agreement

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum currency: [ :aud, :brl, :cad, :chf, :cny,
                  :eur, :gbp, :hkd, :inr, :jpy,
                  :krw, :mxn, :nok, :nzd, :rub,
                  :sek, :sgd, :try, :usd, :zar, :clp ]

  enum language: [ :ar, :bn, :cs, :da, :nl,
                  :en, :et, :fr, :de, :el,
                  :hi, :hu, :id, :it, :ja,
                  :jv, :ko, :nb, :pa, :pl,
                  :pt, :ru, :es, :sv, :th,
                  :tr, :vi, :zh ]

  # ----------------------------------------------
  # FEATURED-PAGE-CONTENT ------------------------
  # ----------------------------------------------
  def featured_page_content
    if(fp_array = featured_pages)
      fp_links = []
      fp_array.each do |fp|
        fp_obj = {
          name: fp.title,
          url: "/pages/" + fp.slug,
          image: fp.hero_image,
          description: fp.description.truncate(225)
        }
        fp_links.push(fp_obj)
      end
      fp_links
    else
      nil
    end
  end

  # ----------------------------------------------
  # FEATURED-PAGES -------------------------------
  # ----------------------------------------------
  def featured_pages
    brand_pages.includes(:hero_image).where(published:true, featured: true)
  end

  # ----------------------------------------------
  # CITY-OPTIONS ---------------------------------
  # ----------------------------------------------
  def city_options
    return [] if brand_home_page.blank? || (home_search_type != 'dropdown' && home_search_type != 'custom')
    home_search_type == 'custom' ? custom_city_options : default_city_options
  end

  # ----------------------------------------------
  # CUSTOMER-CITY-OPTIONS ------------------------
  # ----------------------------------------------
  def custom_city_options
    JSON.parse(brand_home_page.options['location_search_options'])&.map do |location|
      {
        label: location['name'],
        value: location['query_string']
      }
    end
  end

  # ----------------------------------------------
  # DEFAULT-CITY-OPTIONS -------------------------
  # ----------------------------------------------
  def default_city_options
    locations_info = active_property_locations
                       .pluck(:adr_city, :adr_state)
                       .map { |location| [location[0].strip, location[1].strip] }
                       .uniq
                       .sort_by { |location| [location[1], location[0]] }

    locations_info.map do |location_info|
      info_string = "#{location_info[0]}, #{location_info[1]}"
      {
        label: info_string,
        value: info_string
      }
    end
  end

  # ----------------------------------------------
  # ACTIVE-PROPERTY-LOCATIONS --------------------
  # ----------------------------------------------
  def active_property_locations
    Location.where(
      locationable_id: properties.where(active: true).pluck(:id),
      locationable_type: 'Property'
    )
  end

  # ----------------------------------------------
  # HOME-SEARCH-TYPE -----------------------------
  # ----------------------------------------------
  def home_search_type
    return if brand_home_page.blank?
    return if brand_home_page.options['location_search'] != 'true'

    brand_home_page.options['location_search_type']
  end

  # ----------------------------------------------
  # MAX-GUESTS -----------------------------------
  # ----------------------------------------------
  def max_guests
    units.map(&:num_sleep).max
  end

  # ----------------------------------------------
  # MAX-BATHS ------------------------------------
  # ----------------------------------------------
  def max_baths
    units.where('num_bathrooms > 0').map(&:num_bathrooms).max
  end

  # ----------------------------------------------
  # MAX-BEDROOMS ---------------------------------
  # ----------------------------------------------
  def max_bedrooms
    units.where('num_bedrooms > 0').map(&:num_bedrooms).max
  end
end
