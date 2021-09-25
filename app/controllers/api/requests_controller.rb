module Api
  class RequestsController < ApiController
    before_action :load_request, only: [:partners, :make_a_reservation]

    def index
      requests = Request.all.paginate(page: params[:page], per_page: params[:per_page])
      render_success({
        total_items_count: requests.count,
        items: requests.map(&:api_response)
      })
    end

    def create
      request = Request.new(create_params)
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

      partners = Partner.select(:id, :operating_radius, :name, :rating, "#{distance_sql} as distance")
            .joins(:materials)
            .where(materials: @request.material)
            .where("#{distance_sql} < \"partners\".\"operating_radius\"")
            .paginate(page: params[:page], per_page: params[:per_page])
            .order(rating: :desc, distance: :asc)

      render_success({
        total_items_count: partners.count,
        items: partners
      })
    end

    def make_a_reservation
      raise NotFound.new('Record not found') unless Partner.exists?(id: make_a_reservation_params[:partner_id])

      update_params = {
        assigned_id: make_a_reservation_params[:partner_id],
        status: :assigned
      }

      @request.update(update_params)
      @request.reload

      render_success(@request.api_response)
    end

    private
    def create_params
      params.require(:request).permit(:material_id, :lat, :lng, :area, :phone_number)
    end

    def make_a_reservation_params
      params.require(:request).permit(:partner_id)
    end

    def load_request
      raise NotFound.new('Record not found') unless Request.exists?(id: params[:id])
      @request = Request.find(params[:id])
    end
  end
end