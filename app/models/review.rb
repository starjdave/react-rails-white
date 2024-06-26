# ================================================
# RUBY->MODEL->REVIEW ============================
# ================================================
class Review < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit

  # ----------------------------------------------
  # ENUMS/CONSTANTS ------------------------------
  # ----------------------------------------------
  enum status: %i[pending rejected published]

  # ----------------------------------------------
  # SCOPES ---------------------------------------
  # ----------------------------------------------
  scope :with_status, -> (status) { where(status: status) }

end
