# ================================================
# RUBY->CONTROLLER->APPLICATION ==================
# ================================================
class ApplicationController < ActionController::Base

  # ----------------------------------------------
  # CALLBACKS ------------------------------------
  # ----------------------------------------------
  before_action :get_brand

  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # GET-BRAND ------------------------------------
  # ----------------------------------------------
  def get_brand
    request_host = request.host
    domain = Domain.find_by(url: request_host)
    @brand = domain.brand
  end

end
