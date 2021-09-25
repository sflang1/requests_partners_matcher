module Api
  class RequestsController < ApiController
    before_action :load_request, only: [:partners]

    def create
      request = Request.new(request_params)
      raise BadRequest.new(request.errors.full_messages.join(', ')) unless request.valid?

      request.save
      if request.persisted?
        render_success(request)
      else
        render_error('Unexpected error happened')
      end
    end

    def partners
      # finding paginated partners for this request. Uses geokit-rails gem
      distance_sql = Partner.distance_sql(@request, :kms)

      partners = Partner.select(:id, :operating_radius, :rating, "#{distance_sql} as distance")
            .where("#{distance_sql} < \"partners\".\"operating_radius\"")
            .paginate(page: params[:page], per_page: params[:per_page])
            .order(rating: :desc, distance: :asc)

      render_success(partners)
    end

    private
    def request_params
      params.require(:request).permit(:material_id, :lat, :lng, :area, :phone_number)
    end

    def load_request
      @request = Request.find(params[:id])
    end
  end
end