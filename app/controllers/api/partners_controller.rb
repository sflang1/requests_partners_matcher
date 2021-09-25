module Api
  class PartnersController < ApiController
    before_action :load_resource, only: [:show]

    def show
      render_success(@partner.api_response)
    end

    private
    def load_resource
      raise NotFound.new('Record not found') unless Partner.exists?(id: params[:id])
      # Eager loading relationships for reducing number of queries
      @partner = Partner.includes(:experiences, :materials).find(params[:id])
    end
  end
end