# ================================================
# RUBY->MODEL->BRAND-HOME-PAGE ===================
# ================================================
class BrandHomePage < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand

  has_one :hero_image, as: :hero_imageable

end