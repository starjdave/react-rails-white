# ================================================
# RUBY->MODEL->HERO-IMAGE ========================
# ================================================
class HeroImage < ApplicationRecord
  # ----------------------------------------------
  # RELATIONS ------------------------------------
  # ----------------------------------------------
  belongs_to :hero_imageable

  # ----------------------------------------------
  # URL ------------------------------------------
  # ----------------------------------------------
  # "#{Rails.env}/tenant/#{model.tenant_id}/hero/#{model.class.to_s.underscore}/#{mounted_as}/#{id}"
  def url
    image_id = self.id.to_s.last(6)
    image_id = image_id.remove("0")
    return "https://versailles.s3.amazonaws.com/production/tenant/#{self.tenant_id}/hero/hero_image/image/#{image_id}/#{self.image}"

    # if self.created_at > "September 9, 2020"
    #   return "https://versailles.s3.amazonaws.com/production/tenant/#{self.tenant_id}/hero/hero_image/image/#{self.id}/#{self.image}"
    # else
    #   return "https://versailles.s3.amazonaws.com/production/tenant/#{self.tenant_id}/hero/hero_image/image/#{image_id}/#{self.image}"
    # end
  end

end
