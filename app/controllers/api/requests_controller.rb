module Api
  class RequestsController < ApiController
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

    private
    def request_params
      params.require(:request).permit(:material_id, :lat, :lng, :area, :phone_number)
    end
  end
end