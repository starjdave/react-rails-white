# ================================================
# RUBY->MODEL->BRAND-PAGE ========================
# ================================================
class BrandPage < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :brand

  has_one :hero_image, as: :hero_imageable

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum template: [ :default ]

end
