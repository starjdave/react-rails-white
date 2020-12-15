# ================================================
# RUBY->MODEL->UNIT-IMAGE ========================
# ================================================
class UnitImage < ApplicationRecord

  # ----------------------------------------------
  # DATABASE -------------------------------------
  # ----------------------------------------------
  connects_to database: { writing: :direct, reading: :direct_replica }

  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :unit

  # ----------------------------------------------
  # UNIT-IMAGE-URLS ------------------------------
  # ----------------------------------------------
  def unit_image_urls
    image_id = self.id.to_s.last(6)
    image_id = image_id.sub!(/^[0]+/,'')

    unit_id = self.unit.id.to_s.last(6)
    unit_id = unit_id.sub!(/^[0]+/,'')

    if self.created_at > "October 1, 2020"
      return {
        original: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/#{self.image}",
        xlarge: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/xlarge_#{self.image}",
        large: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/large_#{self.image}",
        medium: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/medium_#{self.image}",
        small: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/small_#{self.image}",
        tiny: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{self.unit.id}/unit_image/image/#{self.id}/tiny_#{self.image}"
      }
    else
      return {
        original: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/#{self.image}",
        xlarge: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/xlarge_#{self.image}",
        large: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/large_#{self.image}",
        medium: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/medium_#{self.image}",
        small: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/small_#{self.image}",
        tiny: "https://versailles.s3.amazonaws.com/production/tenant/#{self.unit.organization.subdomain}/unit/#{unit_id}/unit_image/image/#{image_id}/tiny_#{self.image}"
      }
    end
  end

end
