# ================================================
# RUBY->MODEL->LOCATION ==========================
# ================================================
class Location < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # MAPPABLE -------------------------------------
  # ----------------------------------------------
  acts_as_mappable :default_units => :miles,
                   :default_formula => :sphere,
                   :distance_field_name => :distance,
                   :lat_column_name => :geo_latitude,
                   :lng_column_name => :geo_longitude

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :locationable
  belongs_to :brand
  belongs_to :organization

end